/**
 * Stripe Client — lazy singleton initialization for payment processing.
 *
 * WHY LAZY INIT:
 * The original eager initialization (creating Stripe at module-load time)
 * crashes during Next.js build when STRIPE_SECRET_KEY isn't set. This is
 * the same pattern used in banananano2pro's production-hardened codebase:
 * create the client on first use, not at import time. This lets the build
 * succeed without env vars, while still failing fast when a route actually
 * needs Stripe.
 *
 * IMPORTANT: This file should ONLY be imported in server-side code (API routes).
 * The STRIPE_SECRET_KEY must never be exposed to the client.
 *
 * Fixed: 2026-03-24 by Builder 4 — changed from eager to lazy init for build safety
 */
import Stripe from "stripe";

let _stripeClient: Stripe | null = null;

/**
 * Get or create the Stripe client singleton.
 * Validates STRIPE_SECRET_KEY on first use — not at module load time.
 */
export function getStripeClient(): Stripe {
  if (!_stripeClient) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. Get your key from https://dashboard.stripe.com/apikeys"
      );
    }
    _stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return _stripeClient;
}

/**
 * Legacy export name for backward compatibility with template routes.
 * Routes that import stripeServerClient will get the lazy singleton.
 */
export const stripeServerClient = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripeClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

/**
 * Helper to get the Stripe publishable key for client-side usage.
 */
export function getStripePublishableKey(): string {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
  }
  return publishableKey;
}
