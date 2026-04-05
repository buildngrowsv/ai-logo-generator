/**
 * AI Logo Generator — GA4 recommended events (`@next/third-parties/google`).
 *
 * Locale layout injects **GoogleAnalytics** when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
 * Fires **begin_checkout** before Stripe redirect for funnel reporting.
 *
 * Operator 2026-03-31 — Builder 2 — BridgeMind P0 GA4 task (generateailogo).
 */

"use client";

import { sendGAEvent } from "@next/third-parties/google";

export function ga4TrackBeginCheckout(payload: {
  priceId: string;
  mode: "subscription" | "payment";
}): void {
  try {
    sendGAEvent("event", "begin_checkout", {
      currency: "USD",
      items: [{ item_id: payload.priceId, item_category: payload.mode }],
    });
  } catch {
    /* non-fatal */
  }
}

/** OAuth on locale login — before Google redirect (Reviewer 5 backlog). */
export function ga4TrackOAuthProviderClick(payload: {
  provider: "google";
  surface: "login";
}): void {
  try {
    sendGAEvent("event", "oauth_signin_click", {
      method: payload.provider,
      surface: payload.surface,
    });
  } catch {
    /* non-fatal */
  }
}

/**
 * Post-Stripe return: success URL carries real `session_id` from Stripe plus the
 * app’s subscription token (T018). We only use `cs_…` as GA4 `transaction_id`.
 */
export function ga4TrackPurchaseFromStripeReturn(payload: {
  transactionId: string;
  value?: number;
  items?: Array<{
    item_id?: string;
    item_name?: string;
    price?: number;
    quantity?: number;
  }>;
}): void {
  try {
    if (typeof window === "undefined") return;
    if (!payload.transactionId.startsWith("cs_")) return;
    const dedupeKey = `ga4_purchase_logged_${payload.transactionId}`;
    if (sessionStorage.getItem(dedupeKey)) return;
    sendGAEvent("event", "purchase", {
      transaction_id: payload.transactionId,
      currency: "USD",
      ...(payload.value != null ? { value: payload.value } : {}),
      ...(payload.items?.length ? { items: payload.items } : {}),
    });
    sessionStorage.setItem(dedupeKey, "1");
  } catch {
    /* non-fatal */
  }
}

/**
 * **POST /api/logo/generate** submitted — core product action for GA4 once **`NEXT_PUBLIC_GA_MEASUREMENT_ID`** exists.
 *
 * WHY (Reviewer 5 analytics continuation, 2026-03-31):
 * Checkout events alone miss the **free-tier** funnel; Coordinators asked for **meaningful actions**
 * across the site. We send **style_category** (not business name) to avoid PII in analytics params.
 *
 * **Surface** distinguishes normal studio flow vs email-gate bonus path (`studio_post_email_gate`).
 */
export function ga4TrackLogoGenerationRequested(payload: {
  surface: "studio" | "studio_post_email_gate";
  styleCategory: string;
}): void {
  try {
    sendGAEvent("event", "logo_generation_requested", {
      surface: payload.surface,
      style_category: payload.styleCategory,
    });
  } catch {
    /* non-fatal */
  }
}
