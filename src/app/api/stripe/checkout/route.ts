/**
 * POST /api/stripe/checkout — fleet-standard path alias
 *
 * PURPOSE:
 * Exposes the /api/stripe/checkout URL that the swarm fleet smoke tests use
 * (Scout 13 T73, Scout 15 rev17). Logo generator's existing checkout logic
 * lives at /api/stripe/checkout-session (different path convention).
 * This route re-exports that handler so both paths are live.
 *
 * DELEGATES TO: /api/stripe/checkout-session/route.ts
 * CREATED BY: Reviewer 17, 2026-03-25, BridgeSwarm pane1774
 *
 * Path resolution:
 *   From: src/app/api/stripe/checkout/route.ts
 *   To:   src/app/api/stripe/checkout-session/route.ts
 *   Rel:  ../checkout-session/route (one level up within stripe/)
 */
export { POST } from "../checkout-session/route";
