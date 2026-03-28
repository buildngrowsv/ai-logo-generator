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
import {
  CREDIT_PACKS,
  SUBSCRIPTION_PLANS,
  getStripePriceId,
} from "@/config/product";
import { createPendingToken } from "@/lib/subscription-store";

type CheckoutCatalogEntry = {
  readonly id: string;
  readonly priceId: string;
  readonly mode: "subscription" | "payment";
  readonly metadataKey: "subscriptionTier" | "packType";
};

function getConfiguredCheckoutCatalog(): CheckoutCatalogEntry[] {
  const catalog: CheckoutCatalogEntry[] = [];

  for (const plan of SUBSCRIPTION_PLANS) {
    const priceId = getStripePriceId(plan.priceIdEnvKey);
    if (!priceId) continue;
    catalog.push({
      id: plan.id,
      priceId,
      mode: "subscription",
      metadataKey: "subscriptionTier",
    });
  }

  for (const pack of CREDIT_PACKS) {
    const priceId = getStripePriceId(pack.priceIdEnvKey);
    if (!priceId) continue;
    catalog.push({
      id: pack.id,
      priceId,
      mode: "payment",
      metadataKey: "packType",
    });
  }

  return catalog;
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

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      {
        error:
          "Self-serve checkout is not enabled on this deployment yet. STRIPE_WEBHOOK_SECRET must be configured so purchases can be fulfilled safely.",
      },
      { status: 503 }
    );
  }

  const appUrl = (
    process.env.NEXT_PUBLIC_APP_URL || ""
  )
    .replace(/\\n/g, "")
    .replace(/\n/g, "")
    .replace(/\/$/, "")
    .trim();

  if (!appUrl) {
    return NextResponse.json(
      {
        error:
          "Self-serve checkout is not enabled on this deployment yet. NEXT_PUBLIC_APP_URL must be configured first.",
      },
      { status: 503 }
    );
  }

  /**
   * STEP 2: Optionally read the auth session to pre-fill customer_email.
   * Best-effort: fail gracefully if Better Auth is not configured.
   */
  let customerEmail: string | undefined;
  let userId: string | undefined;
  try {
    const { auth } = await import("@/lib/auth");
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    if (!session?.user?.email || !session.user.id) {
      return NextResponse.json(
        {
          error:
            "Please sign in before starting checkout. This deployment requires a working auth session so credits can be attached to your account.",
        },
        { status: 401 }
      );
    }
    customerEmail = session.user.email;
    userId = session.user.id;
  } catch {
    return NextResponse.json(
      {
        error:
          "Authentication is not configured correctly on this deployment. Checkout is disabled until auth can identify the buyer account.",
      },
      { status: 503 }
    );
  }

  if (!userId || !customerEmail) {
    return NextResponse.json(
      {
        error:
          "Please sign in before starting checkout. This deployment needs a valid buyer account before it can create a Stripe session.",
      },
      { status: 401 }
    );
  }

  /**
   * STEP 3: Build the success and cancel URLs.
   */
  const configuredCatalog = getConfiguredCheckoutCatalog();
  const selectedCatalogEntry = configuredCatalog.find(
    (entry) => entry.priceId === priceId
  );

  if (!selectedCatalogEntry || selectedCatalogEntry.mode !== mode) {
    return NextResponse.json(
      {
        error:
          "This price is not enabled for checkout on the current deployment. Configure the Stripe price IDs that match the published pricing catalog first.",
      },
      { status: 400 }
    );
  }

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
  // T018: Generate a pending subscription token for this checkout session.
  // The token serves as a stateless Pro entitlement key:
  //   1. Stored in Redis as "pending" (1h TTL) so the webhook can activate it
  //   2. Embedded as client_reference_id so the webhook can look it up
  //   3. Included in success_url so the client can capture it and store in localStorage
  //   4. Used by the generate route as x-pro-token header to bypass IP rate limit
  //
  // NOTE: Previously client_reference_id was set to userId (auth-linked checkout).
  // T018 replaces it with the subscription token — the webhook now reads
  // client_reference_id as the token string, not a user ID. The userId is still
  // preserved in session metadata (metadata[userId]) for credit allocation.
  //
  // See: src/lib/subscription-store.ts for full token lifecycle documentation.
  const subscriptionToken = await createPendingToken();

  try {
    const formParams: Record<string, string> = {
      mode,
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      // T018: embed token in success_url so client can capture it post-payment
      // and store in localStorage for use as x-pro-token header in generate requests
      success_url: `${appUrl}/dashboard?checkout=success&token=${subscriptionToken}`,
      cancel_url: `${appUrl}/pricing?checkout=canceled`,
      allow_promotion_codes: "true",
      "metadata[userId]": userId,
      "metadata[userEmail]": customerEmail,
      "metadata[catalogId]": selectedCatalogEntry.id,
      [`metadata[${selectedCatalogEntry.metadataKey}]`]:
        selectedCatalogEntry.id,
      "metadata[mode]": mode,
      // T018: client_reference_id is now the subscription token (UUID), not userId.
      // The webhook reads this to activate the token in Redis on payment confirmation.
      client_reference_id: subscriptionToken,
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
