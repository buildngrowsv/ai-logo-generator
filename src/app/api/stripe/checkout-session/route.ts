/**
 * POST /api/stripe/checkout-session
 *
 * Creates a Stripe Checkout session and returns the redirect URL.
 * The pricing page calls this with { priceId, mode } and redirects
 * the user to Stripe's hosted checkout page on success.
 *
 * WHY THIS VERSION (simplified from DB-backed version):
 * The previous version required a Neon/Drizzle database to look up and
 * create Stripe Customer records. This caused 500 errors when the database
 * schema wasn't applied yet. This version is resilient — it works with
 * just STRIPE_SECRET_KEY + STRIPE_PRICE_IDs configured, which is the
 * minimum viable checkout flow. A Stripe Customer can be created later
 * via webhooks or portal when the DB layer is added.
 *
 * AUTH HANDLING:
 * The pricing page already redirects unauthenticated users to /login before
 * calling this endpoint. We attempt to read the auth session to pre-fill
 * customer_email on the Stripe checkout page (better UX), but we fail
 * gracefully if auth is not configured — Stripe will collect the email itself.
 *
 * REQUEST BODY:
 * { priceId: string, mode: "subscription" | "payment" }
 *
 * RESPONSE:
 * { url: string } — Stripe Checkout URL to redirect to
 *
 * OPERATOR EMERGENCY 2026-03-25:
 * Simplified to remove DB dependency so checkout works immediately.
 * DB-backed customer association can be layered on later.
 *
 * CALLED BY:
 * - src/app/[locale]/(main)/pricing/page.tsx (handleGetStarted function)
 */
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";

/**
 * Lazy Stripe singleton — avoids build-time crash when STRIPE_SECRET_KEY
 * is absent (e.g., in CI or fresh clone without env vars set).
 * The client is created on the first POST request, not at import time.
 */
let _stripeInstance: Stripe | null = null;

function getStripeInstance(): Stripe {
  if (!_stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        "STRIPE_SECRET_KEY is not configured. Set it in Vercel environment variables."
      );
    }
    // Dynamic require so TypeScript doesn't choke on the default import
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const StripeConstructor = require("stripe") as typeof import("stripe").default;
    _stripeInstance = new StripeConstructor(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return _stripeInstance;
}

export async function POST(request: NextRequest) {
  /**
   * STEP 1: Parse and validate the request body.
   * Both priceId and mode are required — without them Stripe can't create a session.
   */
  let body: { priceId?: string; mode?: string };
  try {
    body = (await request.json()) as { priceId?: string; mode?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { priceId, mode } = body;

  if (!priceId) {
    return NextResponse.json(
      {
        error:
          "priceId is required. Stripe Price IDs must be set as environment variables (NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY etc.).",
      },
      { status: 400 }
    );
  }

  if (mode !== "subscription" && mode !== "payment") {
    return NextResponse.json(
      { error: "mode must be 'subscription' or 'payment'." },
      { status: 400 }
    );
  }

  /**
   * STEP 2: Optionally read the auth session to pre-fill customer_email.
   *
   * This is a best-effort operation — if Better Auth isn't fully configured
   * (missing GOOGLE_CLIENT_ID, etc.) or the session cookie is absent, we
   * catch the error and proceed. Stripe will collect the customer's email
   * itself during the hosted checkout flow. This avoids the previous 500
   * errors caused by auth.api.getSession throwing when not configured.
   */
  let customerEmail: string | undefined;
  try {
    const { auth } = await import("@/lib/auth");
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    if (session?.user?.email) {
      customerEmail = session.user.email;
    }
  } catch {
    // Auth not configured or session lookup failed — proceed without email.
    // Stripe will ask for it during checkout.
  }

  /**
   * STEP 3: Build the success and cancel URLs.
   * NEXT_PUBLIC_APP_URL is set in Vercel to the production domain so that
   * success/cancel redirects work in both preview and production environments.
   */
  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL || "https://logo.symplyai.io"
  ).replace(/\/$/, "");

  /**
   * STEP 4: Create the Stripe Checkout session.
   *
   * We do NOT associate a Stripe Customer in this MVP version — that
   * requires the Neon database to look up user profiles. Stripe will
   * create a guest Customer object and attach it to the checkout session.
   * When the DB layer is added, the webhook can back-fill the stripeCustomerId.
   *
   * allow_promotion_codes: true — lets us run discount campaigns without
   * code changes (create coupon in Stripe Dashboard, share the code).
   */
  try {
    const stripe = getStripeInstance();

    const checkoutSessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: mode as "subscription" | "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=canceled`,
      allow_promotion_codes: true,
      metadata: {
        priceId,
        mode,
      },
    };

    // Pre-fill the email field if we have it from auth — nicer UX
    if (customerEmail) {
      checkoutSessionParams.customer_email = customerEmail;
    }

    const checkoutSession = await stripe.checkout.sessions.create(
      checkoutSessionParams
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (stripeError) {
    const errorMessage =
      stripeError instanceof Error ? stripeError.message : "Stripe error.";

    const isConfigError =
      errorMessage.includes("STRIPE_SECRET_KEY") ||
      errorMessage.includes("No such price") ||
      errorMessage.includes("not configured");

    console.error("[checkout-session] Stripe error:", errorMessage);

    return NextResponse.json(
      { error: errorMessage },
      { status: isConfigError ? 500 : 502 }
    );
  }
}
