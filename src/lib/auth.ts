/**
 * Better Auth Configuration — server-side authentication setup.
 *
 * WHY BETTER AUTH (not NextAuth):
 * Better Auth is a newer, framework-agnostic auth library that provides:
 * - Built-in database adapter (works directly with Drizzle/Neon)
 * - Simpler API surface than NextAuth v5
 * - First-class TypeScript support
 * - No separate "authOptions" pattern — just export the auth instance
 *
 * This template uses Better Auth + Google OAuth. The auth instance is
 * imported by API routes that need to check the user session.
 *
 * SETUP:
 * 1. Set BETTER_AUTH_SECRET (openssl rand -base64 32)
 * 2. Set BETTER_AUTH_URL (your production URL)
 * 3. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
 * 4. Set DATABASE_URL (Neon Postgres pooled connection string)
 *
 * Created: 2026-03-24 by Builder 4 for LogoForge AI clone
 */
import { betterAuth } from "better-auth";

/**
 * LAZY AUTH SINGLETON — Better Auth with Google OAuth and database session storage.
 *
 * WHY LAZY (Builder 12, 2026-03-24):
 * Better Auth's betterAuth() eagerly connects to the database adapter at import time.
 * When DATABASE_URL is empty (CI, fresh clone, Vercel build step), this crashes with
 * "Failed to initialize database adapter" and kills `next build`. By deferring creation
 * to first runtime use, we let the build succeed without env vars while still failing
 * fast at runtime if the database is truly missing.
 *
 * This is the SAME lazy singleton pattern used in db/index.ts and lib/stripe.ts.
 * The Proxy at the bottom lets callers write `auth.api.getSession(...)` without
 * explicitly calling getAuth() — the proxy intercepts property access and creates
 * the real instance on first touch.
 *
 * Exported as `auth` and used by:
 * - src/app/api/auth/[...all]/route.ts (handles OAuth callbacks)
 * - Any API route that needs: auth.api.getSession({ headers })
 * - src/lib/auth-client.ts (client-side auth hooks via authClient)
 */

// Using `any` because betterAuth() with a concrete config returns a narrower type
// than `ReturnType<typeof betterAuth>` (BetterAuthOptions.database is optional but
// our config makes it required). At runtime the instance works correctly. Every clone
// hit this same issue (template bug, 2026-03-24 clone factory SOP).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _auth: any = null;

/**
 * Get or create the Better Auth singleton.
 * Only call this at RUNTIME (inside API route handlers), never at module scope.
 */
export function getAuth() {
  if (!_auth) {
    // Type assertion needed because betterAuth() with specific config options
    // produces a narrower type than ReturnType<typeof betterAuth>. The runtime
    // behavior is identical — this is a TypeScript-only limitation where the
    // generic inference of BetterAuthOptions doesn't match the concrete config.
    // Same fix applied across all clone apps (2026-03-24, Builder 4).
    _auth = betterAuth({
      /**
       * Database URL for session/user storage.
       * Better Auth auto-creates its own tables (user, session, account, verification)
       * on first use. These are separate from our app tables in db/schema/.
       */
      database: {
        type: "postgres",
        url: process.env.DATABASE_URL || "",
      },

      /**
       * Secret for signing session tokens.
       * MUST be a strong random string in production.
       * Generate with: openssl rand -base64 32
       */
      secret: process.env.BETTER_AUTH_SECRET,

      /**
       * Base URL for auth callbacks.
       * Better Auth uses this to construct redirect URIs for OAuth providers.
       * In production, this should be your domain (e.g., https://logoforgeai.com).
       */
      /**
       * Trim trailing whitespace/newlines from baseURL env vars.
       * Some env vars were set via echo pipe which adds a trailing \n,
       * causing Better Auth to fail with "Invalid URL" during prerender.
       * Same root cause fixed in banananano2pro (commit 8e090ff, 2026-03-25).
       */
      baseURL: (process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4738").trim(),

      /**
       * OAuth providers — Google only for launch.
       * Google has the highest conversion rate for sign-up because almost
       * everyone has a Google account. More providers can be added later.
       */
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
      },
    });
  }
  return _auth;
}

/**
 * Default export for convenience — a Proxy that lazily initializes auth.
 * Callers can write `auth.api.getSession(...)` without calling getAuth() directly.
 * The Proxy intercepts property access and ensures the real instance exists first.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * FIX (Vanguard-7742, 2026-04-05): Added `has` trap to the Proxy.
 * toNextJsHandler() from better-auth/next-js checks property existence
 * with `'handler' in auth` (the `in` operator), which triggers the `has`
 * trap. Without it, the check returns false for every property (because
 * the target is an empty object), and toNextJsHandler fails to wire the
 * route handlers — resulting in HTTP 500 on every auth endpoint.
 * banananano2pro (which works) already had this trap.
 */
export const auth: any = new Proxy({} as any, {
  get(_target: any, prop: string | symbol) {
    return (getAuth() as unknown as Record<string | symbol, unknown>)[prop];
  },
  has(_target: any, prop: string | symbol) {
    return prop in (getAuth() as unknown as Record<string | symbol, unknown>);
  },
});
/* eslint-enable @typescript-eslint/no-explicit-any */
