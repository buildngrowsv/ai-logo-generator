/**
 * POST /api/stripe/checkout-session
 *
 * Creates a Stripe Checkout session and returns the redirect URL.
 * The pricing page calls this with { priceId, mode } and redirects
 * the user to Stripe's hosted checkout page on success.
 *
 * WHY RAW FETCH INSTEAD OF SDK:
 * Stripe SDK v17 uses an internal HTTP client that fails with
 * StripeConnectionError "An error occurred with our connection to Stripe.
 * Request was retried 2 times." in Vercel serverless functions (Next.js 15),
 * even though raw `fetch()` to api.stripe.com works correctly (verified via
 * /api/stripe-diag diagnostic endpoint). Using native fetch bypasses the
 * SDK's internal http/https module usage and works reliably in serverless.
 *
 * AUTH HANDLING:
 * The pricing page already redirects unauthenticated users to /login before
 * calling this endpoint. We attempt to read the auth session to pre-fill
 * customer_email on the Stripe checkout page (better UX), but we fail
 * gracefully if auth is not configured.
 *
 * REQUEST BODY:
 * { priceId: string, mode: "subscription" | "payment" }
 *
 * RESPONSE:
 * { url: string } — Stripe Checkout URL to redirect to
 *
 * CALLED BY:
 * - src/app/[locale]/(main)/pricing/page.tsx (handleGetStarted function)
 */
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/** URL-encodes a form params object for Stripe's application/x-www-form-urlencoded API */
function encodeFormData(
  obj: Record<string, string>,
  prefix = ""
): string {
  return Object.entries(obj)
    .map(([k, v]) => {
      const key = prefix ? `${prefix}[${k}]` : k;
      return `${encodeURIComponent(key)}=${encodeURIComponent(v)}`;
    })
    .join("&");
}

export async function POST(request: NextRequest) {
  /**
   * STEP 1: Parse and validate the request body.
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
          "priceId is required. Stripe Price IDs must be set as environment variables.",
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

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      {
        error:
          "STRIPE_SECRET_KEY is not configured. Set it in Vercel environment variables.",
      },
      { status: 500 }
    );
  }

  /**
   * STEP 2: Optionally read the auth session to pre-fill customer_email.
   * Best-effort: fail gracefully if Better Auth is not configured.
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
    // Auth not configured or session lookup failed — Stripe will collect email.
  }

  /**
   * STEP 3: Build the success and cancel URLs.
   */
  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL || "https://logo.symplyai.io"
  ).replace(/\/$/, "");

  /**
   * STEP 4: Create the Stripe Checkout session via raw fetch.
   *
   * WHY raw fetch: The Stripe SDK v17 fails with StripeConnectionError in
   * Vercel serverless (Next.js 15) despite the network being accessible.
   * Native fetch to Stripe's REST API works reliably.
   *
   * Stripe's checkout.sessions.create parameters use URL-encoded form data
   * with bracket notation for nested objects (e.g. line_items[0][price]).
   */
  try {
    const formParams: Record<string, string> = {
      mode,
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      success_url: `${appUrl}/dashboard?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=canceled`,
      allow_promotion_codes: "true",
      "metadata[priceId]": priceId,
      "metadata[mode]": mode,
    };

    // Pre-fill email for better UX if we have it from auth
    if (customerEmail) {
      formParams.customer_email = customerEmail;
    }

    const stripeRes = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: Object.entries(formParams)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("&"),
      }
    );

    const stripeData = (await stripeRes.json()) as {
      url?: string;
      error?: { message?: string };
    };

    if (!stripeRes.ok) {
      const errMsg =
        stripeData.error?.message || `Stripe error ${stripeRes.status}`;
      console.error("[checkout-session] Stripe API error:", errMsg);
      return NextResponse.json({ error: errMsg }, { status: 502 });
    }

    if (!stripeData.url) {
      return NextResponse.json(
        { error: "No checkout URL returned from Stripe." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: stripeData.url });
  } catch (fetchError) {
    const errorMessage =
      fetchError instanceof Error ? fetchError.message : "Checkout failed.";
    console.error("[checkout-session] Fetch error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 502 });
  }
}
