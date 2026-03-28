/**
 * src/lib/subscription-store.ts — LogoForge AI Pro subscription persistence layer
 *
 * PURPOSE:
 * Provides durable per-token Pro subscription state backed by Upstash Redis.
 * Used by three routes:
 *   - /api/stripe/checkout-session → generates a token, stores "pending" state
 *   - /api/stripe/webhook          → activates the token on checkout.session.completed
 *   - /api/logo/generate           → checks if the request's token is "active" (Pro bypass)
 *
 * TOKEN LIFECYCLE:
 *   pending  → checkout session created but not paid yet (1h TTL)
 *   active   → payment confirmed via Stripe webhook (13-month TTL)
 *   cancelled → subscription cancelled (30-day TTL, informational)
 *
 * WHY TOKEN-BASED:
 * LogoForge AI has a full Better Auth + Drizzle/Neon credit system for authenticated
 * users. The subscription token layer is an ADDTIONAL lightweight bypass for Pro
 * subscribers — it allows the generate route to skip the IP rate limit without
 * requiring a database round-trip. The full credit system remains in place.
 *
 * TOKEN EXPIRY:
 * Active tokens expire after 13 months (covers annual billing cycle + buffer).
 * Pending tokens expire after 1 hour (abandoned checkouts should not linger).
 *
 * GRACEFUL DEGRADATION (fails closed):
 * If UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN are not configured,
 * isProActive() returns false (never grants Pro on Redis error). This is the
 * fail-closed design per T018 spec — missing Redis means no Pro bypass, not
 * a grant. Operators must set the env vars to enable the Pro token path.
 *
 * REDIS KEY NAMESPACE:
 * All keys use `logogen:sub:token:<uuid>` so this app's keys are isolated
 * from other apps sharing the same Upstash Redis instance (fleet standard).
 *
 * REQUIRED ENV VARS (Vercel dashboard):
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * CALLED BY:
 *   src/app/api/stripe/checkout-session/route.ts
 *   src/app/api/stripe/webhook/route.ts
 *   src/app/api/logo/generate/route.ts
 *
 * pane1774 swarm — T018 Upstash Pro subscription token lifecycle, 2026-03-27
 */

import { Redis } from "@upstash/redis";

// -------------------------------------------------------------------------
// Redis client — lazy singleton, fails gracefully if env vars are missing
// -------------------------------------------------------------------------

let _redisClient: Redis | null = null;
let _redisInitAttempted = false;

/**
 * getRedisClient — returns a shared Redis instance, or null if not configured.
 *
 * We use lazy init so the build does not fail when UPSTASH env vars are absent
 * (e.g. local dev, pre-Vercel-setup). The null check at each call site ensures
 * operations simply skip when Redis is unavailable rather than crashing.
 *
 * This function is safe to call from any serverless environment — it does not
 * throw, it just returns null and logs a warning the first time it is called
 * without env vars set.
 */
function getRedisClient(): Redis | null {
  if (_redisInitAttempted) {
    return _redisClient;
  }

  _redisInitAttempted = true;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn(
      "[subscription-store] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set. " +
        "Pro token bypass is DISABLED. Set these Vercel env vars to enable Pro subscription gating."
    );
    return null;
  }

  try {
    _redisClient = new Redis({ url, token });
    return _redisClient;
  } catch (err) {
    console.error("[subscription-store] Failed to initialize Redis client:", err);
    return null;
  }
}

// -------------------------------------------------------------------------
// Token key helpers
// -------------------------------------------------------------------------

/**
 * subTokenKey — builds the Redis key for a given subscription token.
 *
 * Namespace: `logogen:sub:token:` — isolates this app's keys on a shared
 * Upstash instance. Changing the namespace here will orphan existing keys,
 * so treat it as immutable after first deploy.
 */
function subTokenKey(token: string): string {
  return `logogen:sub:token:${token}`;
}

// -------------------------------------------------------------------------
// TTLs
// -------------------------------------------------------------------------

/** Pending checkout session expires after 1 hour — abandoned carts should not grant Pro */
const PENDING_TTL_SECONDS = 60 * 60;

/** Active Pro subscription is valid for 13 months (covers annual billing cycle + buffer) */
const ACTIVE_TTL_SECONDS = 13 * 30 * 24 * 60 * 60;

// -------------------------------------------------------------------------
// Public API
// -------------------------------------------------------------------------

export type SubscriptionStatus = "pending" | "active" | "cancelled";

/**
 * createPendingToken — called by /api/stripe/checkout-session when creating a session.
 *
 * Stores the token as "pending" so we can later activate it when the webhook
 * fires. The token is also passed as `client_reference_id` in the Stripe
 * session so the webhook can look it up, and embedded in the success URL so
 * the client can capture it in localStorage.
 *
 * IMPORTANT: The existing checkout route already sets client_reference_id to
 * userId from the auth session. T018 replaces this with the subscription token —
 * the webhook must read client_reference_id as the token (not the userId).
 *
 * Returns the token string. If Redis is unavailable, the token is still
 * returned (checkout flow continues) but nothing is stored in Redis — Pro
 * bypass will not work until Redis is configured.
 */
export async function createPendingToken(): Promise<string> {
  // Cryptographically random UUID — safe to expose in the success URL
  const token = crypto.randomUUID();

  const redis = getRedisClient();
  if (!redis) {
    // No Redis — token is returned but Pro bypass will not work after payment.
    // This is the fail-closed design: missing Redis = no Pro bypass, not a grant.
    console.warn(
      "[subscription-store] createPendingToken: Redis unavailable — token not stored. " +
        "Pro bypass disabled until UPSTASH env vars are set.",
      { token }
    );
    return token;
  }

  try {
    await redis.setex(subTokenKey(token), PENDING_TTL_SECONDS, "pending");
  } catch (err) {
    console.error("[subscription-store] createPendingToken: Redis write failed:", err);
    // Still return the token so checkout doesn't break — Pro bypass just won't work
  }

  return token;
}

/**
 * activateToken — called by /api/stripe/webhook on checkout.session.completed.
 *
 * Upgrades the token status from "pending" to "active" and extends its TTL
 * to 13 months. If the token was never stored (no Redis at checkout time),
 * we create it as "active" directly so webhooks still work retroactively.
 *
 * Called with the value from `session.client_reference_id`.
 */
export async function activateToken(token: string): Promise<void> {
  const redis = getRedisClient();
  if (!redis) {
    console.warn(
      "[subscription-store] activateToken: Redis unavailable — cannot persist Pro status. " +
        "Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN on Vercel.",
      { token }
    );
    return;
  }

  try {
    await redis.setex(subTokenKey(token), ACTIVE_TTL_SECONDS, "active");
    console.log("[subscription-store] activateToken: Pro token activated in Redis", { token });
  } catch (err) {
    console.error("[subscription-store] activateToken: Redis write failed:", err);
    // Log but do not throw — webhook must return 200 to Stripe to avoid retries
  }
}

/**
 * cancelToken — marks token as cancelled on subscription deletion.
 *
 * Kept in Redis for 30 days so the client gets a clear "subscription cancelled"
 * message instead of a generic "invalid token" when they try to use the Pro feature.
 *
 * NOTE: The webhook's customer.subscription.deleted event doesn't carry
 * client_reference_id, so we cannot always resolve the token. This function
 * is available for future use when we store subscriptionId → token mapping.
 */
export async function cancelToken(token: string): Promise<void> {
  const redis = getRedisClient();
  if (!redis) return;

  try {
    // Keep cancelled tokens for 30 days — informational, not a security boundary
    await redis.setex(subTokenKey(token), 30 * 24 * 60 * 60, "cancelled");
  } catch (err) {
    console.error("[subscription-store] cancelToken: Redis write failed:", err);
  }
}

/**
 * checkTokenStatus — returns the subscription status for a given token.
 *
 * Returns null if the token is not found, expired, or Redis is unavailable.
 * The caller (generate route) should treat null as "not Pro" — fail closed.
 */
export async function checkTokenStatus(
  token: string
): Promise<SubscriptionStatus | null> {
  if (!token || typeof token !== "string" || token.length < 10) {
    return null;
  }

  const redis = getRedisClient();
  if (!redis) {
    // Redis not configured — treat all tokens as unverifiable, fail closed
    return null;
  }

  try {
    const status = await redis.get<string>(subTokenKey(token));
    if (!status) return null;

    // Validate the stored value is one of our known statuses
    if (status === "active" || status === "pending" || status === "cancelled") {
      return status as SubscriptionStatus;
    }

    // Unknown status value in Redis — ignore it, fail closed
    return null;
  } catch (err) {
    console.error("[subscription-store] checkTokenStatus: Redis read failed:", err);
    // Fail conservatively — Redis flakiness must not grant Pro access
    return null;
  }
}

/**
 * isProActive — convenience wrapper; returns true only if the token is "active".
 *
 * This is the function called by the generate route. The design is:
 *   - null or missing token → false (free tier)
 *   - "pending" token → false (payment not yet confirmed)
 *   - "active" token → true (Pro bypass granted)
 *   - "cancelled" token → false (subscription ended)
 *   - Redis error → false (fail closed — never grant Pro on Redis error)
 *
 * CALLED BY: src/app/api/logo/generate/route.ts
 */
export async function isProActive(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  const status = await checkTokenStatus(token);
  return status === "active";
}
