/**
 * Stripe Webhook Handler — POST /api/stripe/webhook
 *
 * WHY WEBHOOKS:
 * Stripe is the durable source of truth for completed payments, renewals,
 * cancellations, and one-time pack purchases. This route verifies Stripe's
 * signatures, then syncs the result into our database-backed credit system.
 *
 * WHAT THIS FILE NOW DOES:
 * - Verifies webhook authenticity with STRIPE_WEBHOOK_SECRET
 * - Materializes/updates user_profiles rows using checkout metadata
 * - Writes subscription lifecycle state into subscriptions
 * - Allocates credits idempotently via credit_transactions
 *
 * This keeps the buyer-facing pricing/checkout story aligned with the real
 * runtime contract: successful payments only become usable credits after a
 * verified webhook updates the database.
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { and, eq, sql } from "drizzle-orm";
import { stripeServerClient } from "@/lib/stripe";
import { db } from "@/db";
import { PLAN_CREDITS_ALLOCATION, PACK_CREDITS_ALLOCATION, SUBSCRIPTION_PLANS, CREDIT_PACKS, getStripePriceId } from "@/config/product";
import { userProfiles } from "@/db/schema/users";
import { subscriptions } from "@/db/schema/subscriptions";
import { creditTransactions } from "@/db/schema/credit-transactions";
import { activateToken, cancelToken, storeSubscriptionTokenMapping, getTokenForSubscription } from "@/lib/subscription-store";

// T018: Require Node.js runtime for crypto.subtle HMAC (used by Stripe SDK signature
// verification) and for Upstash Redis client which requires Node APIs.
// Edge runtime does not support all Node.js built-ins needed here.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SupportedPlanId = keyof typeof PLAN_CREDITS_ALLOCATION;
type SupportedPackId = keyof typeof PACK_CREDITS_ALLOCATION;

function toStripeCustomerId(customer: Stripe.Subscription["customer"] | Stripe.Checkout.Session["customer"]): string | null {
  if (!customer) return null;
  if (typeof customer === "string") return customer;
  return customer.id;
}

function getPeriodEndDate(subscription: Stripe.Subscription): Date {
  return new Date(subscription.current_period_end * 1000);
}

function getPlanIdFromPriceId(priceId: string | null | undefined): SupportedPlanId | null {
  if (!priceId) return null;

  for (const plan of SUBSCRIPTION_PLANS) {
    if (getStripePriceId(plan.priceIdEnvKey) === priceId) {
      return plan.id as SupportedPlanId;
    }
  }

  return null;
}

async function upsertUserProfile(params: {
  userId: string;
  email: string;
  stripeCustomerId?: string | null;
  plan?: string;
}) {
  await db
    .insert(userProfiles)
    .values({
      userId: params.userId,
      email: params.email,
      stripeCustomerId: params.stripeCustomerId ?? null,
      plan: params.plan ?? "free",
    })
    .onConflictDoUpdate({
      target: userProfiles.userId,
      set: {
        email: params.email,
        stripeCustomerId: params.stripeCustomerId ?? undefined,
        plan: params.plan ?? undefined,
        updatedAt: new Date(),
      },
    });
}

async function allocateCreditsIfMissing(
  userId: string,
  amount: number,
  reason: string
) {
  if (amount <= 0) return;

  const [existingTransaction] = await db
    .select({ id: creditTransactions.id })
    .from(creditTransactions)
    .where(
      and(
        eq(creditTransactions.userId, userId),
        eq(creditTransactions.reason, reason)
      )
    )
    .limit(1);

  if (existingTransaction) {
    return;
  }

    await db.transaction(async (transaction) => {
      await transaction
      .update(userProfiles)
      .set({
        credits: sql`${userProfiles.credits} + ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.userId, userId));

    await transaction.insert(creditTransactions).values({
      userId,
      amount,
      reason,
    });
  });
}

async function syncSubscriptionRecord(params: {
  userId: string;
  stripeSubscriptionId: string;
  plan: string;
  status: string;
  currentPeriodEnd: Date;
}) {
  await db
    .insert(subscriptions)
    .values({
      userId: params.userId,
      stripeSubscriptionId: params.stripeSubscriptionId,
      plan: params.plan,
      status: params.status,
      currentPeriodEnd: params.currentPeriodEnd,
    })
    .onConflictDoUpdate({
      target: subscriptions.stripeSubscriptionId,
      set: {
        plan: params.plan,
        status: params.status,
        currentPeriodEnd: params.currentPeriodEnd,
        updatedAt: new Date(),
      },
    });
}

async function handleCheckoutCompleted(event: Stripe.Event) {
  const completedCheckoutSession = event.data.object as Stripe.Checkout.Session;
  const checkoutMetadata = completedCheckoutSession.metadata ?? {};

  // ---- DB writes FIRST, then Redis token activation ----
  //
  // WHY THIS ORDER (changed 2026-04-14, pane1776 Coordinator 1):
  // Previously, Redis activateToken() ran first and returned HTTP 500 on failure,
  // which blocked ALL downstream DB writes (upsertUserProfile, syncSubscriptionRecord,
  // allocateCreditsIfMissing). This meant: user pays → card charged → nothing persisted
  // → guaranteed chargebacks. The DB is the durable source of truth for credits and
  // subscription state; Redis is a performance optimization for the Pro bypass check.
  // DB writes must always complete; Redis activation is best-effort on top.
  //
  // T018 context: client_reference_id holds the subscription token UUID (not userId).
  // The userId is in session metadata (metadata.userId). Both the credit system (DB)
  // and the token bypass (Redis) are served from this single webhook event.
  const subscriptionToken = completedCheckoutSession.client_reference_id;

  const userId = checkoutMetadata.userId;
  const userEmail =
    checkoutMetadata.userEmail ??
    completedCheckoutSession.customer_details?.email ??
    completedCheckoutSession.customer_email ??
    undefined;

  if (!userId || !userEmail) {
    console.warn(
      "[Stripe Webhook] checkout.session.completed missing user metadata; skipping credit fulfillment"
    );
    return;
  }

  const stripeCustomerId = toStripeCustomerId(completedCheckoutSession.customer);
  const checkoutMode = checkoutMetadata.mode;

  if (checkoutMode === "payment") {
    const packType = checkoutMetadata.packType as SupportedPackId | undefined;
    const packCredits = packType ? PACK_CREDITS_ALLOCATION[packType] : undefined;

    await upsertUserProfile({
      userId,
      email: userEmail,
      stripeCustomerId,
    });

    if (!packType || !packCredits) {
      console.warn(
        `[Stripe Webhook] Completed payment for ${userId} missing packType metadata; no credits allocated`
      );
      return;
    }

    await allocateCreditsIfMissing(
      userId,
      packCredits,
      `pack_purchase:${packType}:${completedCheckoutSession.id}`
    );

    return;
  }

  if (checkoutMode === "subscription") {
    const subscriptionTier = checkoutMetadata.subscriptionTier as SupportedPlanId | undefined;
    const tierCredits = subscriptionTier
      ? PLAN_CREDITS_ALLOCATION[subscriptionTier]
      : undefined;

    await upsertUserProfile({
      userId,
      email: userEmail,
      stripeCustomerId,
      plan: subscriptionTier ?? "free",
    });

    const stripeSubscriptionId =
      typeof completedCheckoutSession.subscription === "string"
        ? completedCheckoutSession.subscription
        : null;

    if (stripeSubscriptionId && subscriptionTier) {
      const stripeSubscription = await stripeServerClient.subscriptions.retrieve(
        stripeSubscriptionId
      );

      await syncSubscriptionRecord({
        userId,
        stripeSubscriptionId,
        plan: subscriptionTier,
        status: stripeSubscription.status,
        currentPeriodEnd: getPeriodEndDate(stripeSubscription),
      });
    }

    if (!subscriptionTier || !tierCredits) {
      console.warn(
        `[Stripe Webhook] Completed subscription for ${userId} missing subscriptionTier metadata; no credits allocated`
      );
      return;
    }

    await allocateCreditsIfMissing(
      userId,
      tierCredits,
      `subscription_activation:${subscriptionTier}:${stripeSubscriptionId ?? completedCheckoutSession.id}`
    );
  }

  // ---- Redis token activation (best-effort, AFTER all DB writes) ----
  //
  // The DB writes above are the durable record of payment. Redis token activation
  // is an optimization that lets the generate route skip the DB round-trip for Pro
  // checks. If Redis fails here, the user's payment is still recorded in the DB,
  // and isProActive() will fall back to querying the subscriptions table.
  //
  // We return 200 regardless of Redis outcome so Stripe does not retry — the
  // critical DB work is already done. Redis will catch up when provisioned.
  // Extract stripeSubscriptionId for the mapping (scoped above for subscription mode,
  // but we also need it here for the token→subscriptionId reverse lookup on cancellation)
  const subscriptionIdForMapping =
    typeof completedCheckoutSession.subscription === "string"
      ? completedCheckoutSession.subscription
      : null;

  if (subscriptionToken && subscriptionToken.length >= 10) {
    const activated = await activateToken(subscriptionToken);
    if (activated) {
      console.log("[Stripe Webhook] checkout.session.completed — Pro token activated in Redis (T018)", {
        token: subscriptionToken.slice(0, 8) + "…",
        customer: completedCheckoutSession.customer,
        email: completedCheckoutSession.customer_details?.email ?? completedCheckoutSession.customer_email,
      });

      // Store reverse mapping: stripeSubscriptionId → token so the
      // customer.subscription.deleted handler can find and cancel the token.
      // Without this, cancelled subscribers retain Pro access for 13 months
      // (the token's TTL) because the deletion event doesn't carry the token.
      if (subscriptionIdForMapping) {
        await storeSubscriptionTokenMapping(subscriptionIdForMapping, subscriptionToken);
      }
    } else {
      // Redis unavailable — log but do NOT fail the webhook. DB writes already succeeded.
      // The generate route's isProActive() will fall back to querying the subscriptions
      // table, so the user still gets Pro access, just with an extra DB read per request.
      console.warn(
        "[Stripe Webhook] checkout.session.completed — Redis activateToken failed (Redis unavailable?). " +
          "DB writes succeeded — user has credits and subscription record. Pro bypass will use DB fallback. " +
          "Customer:", completedCheckoutSession.customer_email
      );
    }
  } else {
    console.warn(
      "[Stripe Webhook] checkout.session.completed — no subscription token in client_reference_id (pre-T018 session?). " +
        "Pro bypass token not activated. Customer:", completedCheckoutSession.customer_email
    );
  }
}

async function handleSubscriptionUpdated(event: Stripe.Event) {
  const updatedSubscription = event.data.object as Stripe.Subscription;
  const stripeCustomerId = toStripeCustomerId(updatedSubscription.customer);

  if (!stripeCustomerId) {
    console.warn("[Stripe Webhook] Subscription update missing customer id");
    return;
  }

  const [existingUserProfile] = await db
    .select({
      userId: userProfiles.userId,
      email: userProfiles.email,
      plan: userProfiles.plan,
    })
    .from(userProfiles)
    .where(eq(userProfiles.stripeCustomerId, stripeCustomerId))
    .limit(1);

  if (!existingUserProfile) {
    console.warn(
      `[Stripe Webhook] No user profile found for Stripe customer ${stripeCustomerId}`
    );
    return;
  }

  const planId = getPlanIdFromPriceId(
    updatedSubscription.items.data[0]?.price?.id ?? null
  );
  const normalizedPlan =
    updatedSubscription.status === "active" || updatedSubscription.status === "trialing"
      ? planId ?? existingUserProfile.plan
      : "free";

  const [existingSubscriptionRecord] = await db
    .select({
      currentPeriodEnd: subscriptions.currentPeriodEnd,
    })
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, updatedSubscription.id))
    .limit(1);

  const currentPeriodEnd = getPeriodEndDate(updatedSubscription);

  await syncSubscriptionRecord({
    userId: existingUserProfile.userId,
    stripeSubscriptionId: updatedSubscription.id,
    plan: planId ?? existingUserProfile.plan,
    status: updatedSubscription.status,
    currentPeriodEnd,
  });

  await upsertUserProfile({
    userId: existingUserProfile.userId,
    email: existingUserProfile.email,
    stripeCustomerId,
    plan: normalizedPlan,
  });

  if (
    planId &&
    updatedSubscription.status === "active" &&
    existingSubscriptionRecord &&
    currentPeriodEnd.getTime() >
      existingSubscriptionRecord.currentPeriodEnd.getTime()
  ) {
    await allocateCreditsIfMissing(
      existingUserProfile.userId,
      PLAN_CREDITS_ALLOCATION[planId],
      `subscription_renewal:${updatedSubscription.id}:${currentPeriodEnd.getTime()}`
    );
  }
}

async function handleSubscriptionDeleted(event: Stripe.Event) {
  const deletedSubscription = event.data.object as Stripe.Subscription;
  const stripeCustomerId = toStripeCustomerId(deletedSubscription.customer);

  if (!stripeCustomerId) {
    console.warn("[Stripe Webhook] Subscription deletion missing customer id");
    return;
  }

  const [existingUserProfile] = await db
    .select({
      userId: userProfiles.userId,
      email: userProfiles.email,
    })
    .from(userProfiles)
    .where(eq(userProfiles.stripeCustomerId, stripeCustomerId))
    .limit(1);

  if (!existingUserProfile) {
    console.warn(
      `[Stripe Webhook] No user profile found for Stripe customer ${stripeCustomerId}`
    );
    return;
  }

  await syncSubscriptionRecord({
    userId: existingUserProfile.userId,
    stripeSubscriptionId: deletedSubscription.id,
    plan: "free",
    status: deletedSubscription.status,
    currentPeriodEnd: getPeriodEndDate(deletedSubscription),
  });

  await upsertUserProfile({
    userId: existingUserProfile.userId,
    email: existingUserProfile.email,
    stripeCustomerId,
    plan: "free",
  });

  // ---- Redis token cancellation (best-effort, AFTER DB writes) ----
  //
  // Look up the subscription token via the stripeSubscriptionId → token mapping
  // stored at checkout time, then mark the token as "cancelled" in Redis.
  // Without this, the token stays "active" for its 13-month TTL — cancelled
  // subscribers retain Pro access until the token naturally expires.
  //
  // If the mapping doesn't exist (pre-mapping checkout, Redis was unavailable
  // at checkout time, or mapping TTL expired), the DB writes above already
  // revoked Pro access via the DB fallback path (isProActiveFromDb checks
  // subscription status = "active", which is now "canceled").
  const tokenToCancel = await getTokenForSubscription(deletedSubscription.id);
  if (tokenToCancel) {
    await cancelToken(tokenToCancel);
    console.log("[Stripe Webhook] customer.subscription.deleted — Pro token cancelled in Redis", {
      subscriptionId: deletedSubscription.id,
      token: tokenToCancel.slice(0, 8) + "…",
    });
  } else {
    console.log("[Stripe Webhook] customer.subscription.deleted — no token mapping found (pre-mapping checkout or Redis unavailable). DB writes already revoked Pro access.", {
      subscriptionId: deletedSubscription.id,
    });
  }
}

/**
 * WHY we read the raw body:
 * Stripe webhook verification requires the raw request body (not parsed JSON).
 * If we let Next.js parse it first, the signature verification will fail because
 * the parsed-then-re-stringified body won't match the original byte-for-byte.
 */
export async function POST(request: NextRequest) {
  try {
    const rawRequestBody = await request.text();
    const stripeSignatureHeader = request.headers.get("stripe-signature");

    if (!stripeSignatureHeader) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("STRIPE_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    let verifiedStripeEvent: Stripe.Event;

    try {
      verifiedStripeEvent = stripeServerClient.webhooks.constructEvent(
        rawRequestBody,
        stripeSignatureHeader,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (signatureVerificationError) {
      console.error(
        "Webhook signature verification failed:",
        signatureVerificationError
      );
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    switch (verifiedStripeEvent.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(verifiedStripeEvent);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(verifiedStripeEvent);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(verifiedStripeEvent);
        break;
      default:
        console.log(
          `[Stripe Webhook] Unhandled event type: ${verifiedStripeEvent.type}`
        );
    }

    return NextResponse.json({ received: true });
  } catch (webhookProcessingError) {
    // Return 200 despite the error so Stripe does NOT retry indefinitely.
    // Code bugs (missing metadata, wrong schema) won't self-fix on retry.
    console.error("Webhook processing error:", webhookProcessingError);
    return NextResponse.json(
      { received: true, error: "Handler error logged" },
      { status: 200 }
    );
  }
}
