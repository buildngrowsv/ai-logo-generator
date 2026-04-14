/**
 * Credit System — Database-Backed Usage Tracking and Rate Limiting
 *
 * WHY THIS EXISTS:
 * Every AI tool SaaS needs usage limits to control costs. Each fal.ai API call
 * costs us money (GPU inference), so we need to ensure:
 *   - Free users get a taste (3/day) but can't bankrupt us
 *   - Basic users get reasonable usage (50/month) for their $4.99
 *   - Pro users get unlimited (we eat the cost, but they're paying $9.99/mo)
 *
 * ARCHITECTURE — Database-Backed (Production):
 * Credits are tracked in the `user_profiles` table (credits column) and every
 * change is audit-logged in `credit_transactions`. This persists across Vercel
 * cold starts, deploys, and multi-instance scaling. The previous in-memory Map
 * implementation reset on every cold start, effectively giving everyone unlimited
 * usage and was the ROOT CAUSE of $0 revenue across the fleet.
 *
 * GATE 8 FIX (flux-exec-4419, 2026-04-14):
 * Replaced in-memory Map with DB-backed version from saas-clone-template.
 * The DB schema (user_profiles, credit_transactions) already existed in this repo.
 *
 * HOW PERIOD RESETS WORK:
 * Free tier resets daily, paid tiers reset monthly. We use the `credit_transactions`
 * table to determine when the last period started. On each credit check, we look
 * at deductions in the current period window. This is a "lazy reset" — no cron needed.
 */

import { PRODUCT_CONFIG, type ProductPricingTier } from "@/lib/config";
import { db } from "@/db";
import { userProfiles } from "@/db/schema/users";
import { creditTransactions } from "@/db/schema/credit-transactions";
import { eq, and, gte, sql } from "drizzle-orm";

/**
 * Subscription tier names — must match the keys in PRODUCT_CONFIG.pricing.
 * "none" means the user has never subscribed (treated same as "free").
 */
export type SubscriptionTier = "free" | "basic" | "pro" | "none";

/**
 * Result of a credit availability check.
 *
 * WHY we return the full object instead of just a boolean:
 * The API route needs to include remaining credits in the response so the
 * frontend can show "3 of 50 credits used" in the UI. This helps users
 * understand their usage and creates natural upgrade pressure when they
 * see credits running low.
 */
export interface CreditCheckResult {
  readonly hasCreditsRemaining: boolean;
  readonly remainingCreditsCount: number;
  readonly tierCreditLimit: number;
  readonly currentUsageCount: number;
}

/**
 * Determines the pricing tier configuration for a given subscription level.
 * Maps the tier name to the actual limits/pricing defined in PRODUCT_CONFIG.
 */
function getPricingTierForSubscription(
  subscriptionTier: SubscriptionTier
): ProductPricingTier {
  if (subscriptionTier === "none") {
    return PRODUCT_CONFIG.pricing.free;
  }
  return PRODUCT_CONFIG.pricing[subscriptionTier];
}

/**
 * Counts how many credits a user has consumed in the current billing period.
 *
 * For free tier: counts deductions in the last 24 hours.
 * For paid tiers: counts deductions in the last 30 days.
 *
 * We count negative transactions (deductions) since the period start.
 */
async function getUsageInCurrentPeriod(
  userId: string,
  pricingTier: ProductPricingTier
): Promise<number> {
  const periodStartMs =
    pricingTier.period === "day"
      ? Date.now() - 24 * 60 * 60 * 1000
      : Date.now() - 30 * 24 * 60 * 60 * 1000;

  const periodStart = new Date(periodStartMs);

  const result = await db
    .select({
      totalDeducted: sql<number>`COALESCE(ABS(SUM(CASE WHEN ${creditTransactions.amount} < 0 THEN ${creditTransactions.amount} ELSE 0 END)), 0)`,
    })
    .from(creditTransactions)
    .where(
      and(
        eq(creditTransactions.userId, userId),
        gte(creditTransactions.createdAt, periodStart)
      )
    );

  return Number(result[0]?.totalDeducted ?? 0);
}

/**
 * Ensures a user_profiles row exists for the given user.
 * Creates one with default values if it doesn't exist yet.
 */
async function ensureUserProfile(
  userId: string,
  email?: string
): Promise<void> {
  const existing = await db
    .select({ userId: userProfiles.userId })
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(userProfiles).values({
      userId,
      email: email ?? "unknown",
      credits: 0,
      plan: "free",
    });
  }
}

/**
 * Looks up the user's subscription tier from the database.
 */
export async function getUserSubscriptionTierFromDb(
  userId: string
): Promise<SubscriptionTier> {
  const profile = await db
    .select({ plan: userProfiles.plan })
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  if (!profile[0]) {
    return "free";
  }

  const plan = profile[0].plan;
  if (plan === "basic" || plan === "pro") {
    return plan;
  }
  return "free";
}

/**
 * Checks whether a user has credits remaining for a generation.
 *
 * Now async because it queries the database. Callers must await.
 */
export async function checkUserCreditAvailability(
  userId: string,
  subscriptionTier: SubscriptionTier
): Promise<CreditCheckResult> {
  const pricingTier = getPricingTierForSubscription(subscriptionTier);

  if (pricingTier.limit === -1) {
    const usageCount = await getUsageInCurrentPeriod(userId, pricingTier);
    return {
      hasCreditsRemaining: true,
      remainingCreditsCount: -1,
      tierCreditLimit: -1,
      currentUsageCount: usageCount,
    };
  }

  const usageCount = await getUsageInCurrentPeriod(userId, pricingTier);
  const remainingCredits = pricingTier.limit - usageCount;

  return {
    hasCreditsRemaining: remainingCredits > 0,
    remainingCreditsCount: Math.max(0, remainingCredits),
    tierCreditLimit: pricingTier.limit,
    currentUsageCount: usageCount,
  };
}

/**
 * Deducts one credit from the user's balance after a successful generation.
 *
 * IMPORTANT: Call this AFTER the fal.ai API call succeeds, not before.
 * Records the deduction as a -1 transaction in the audit log.
 */
export async function deductOneCreditForUser(
  userId: string,
  subscriptionTier: SubscriptionTier
): Promise<void> {
  await ensureUserProfile(userId);

  await db.insert(creditTransactions).values({
    userId,
    amount: -1,
    reason: `action:${PRODUCT_CONFIG.name || "generation"}`,
  });

  await db
    .update(userProfiles)
    .set({ credits: sql`${userProfiles.credits} - 1` })
    .where(eq(userProfiles.userId, userId));
}

/**
 * Adds credits to a user's account — typically called from the Stripe webhook
 * when a subscription is activated or renewed.
 */
export async function addCredits(
  userId: string,
  creditAmount: number,
  subscriptionTier: SubscriptionTier,
  reason?: string
): Promise<void> {
  await ensureUserProfile(userId);

  await db.insert(creditTransactions).values({
    userId,
    amount: creditAmount,
    reason: reason ?? `subscription_renewal:${subscriptionTier}`,
  });

  await db
    .update(userProfiles)
    .set({
      credits: sql`${userProfiles.credits} + ${creditAmount}`,
      plan: subscriptionTier === "none" ? "free" : subscriptionTier,
      updatedAt: new Date(),
    })
    .where(eq(userProfiles.userId, userId));
}
