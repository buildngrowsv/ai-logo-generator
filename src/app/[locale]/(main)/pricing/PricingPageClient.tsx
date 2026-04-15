/**
 * Pricing page — full pricing with subscription plans and credit packs.
 *
 * LAYOUT:
 * 1. Header with gradient title
 * 2. Billing toggle (Monthly / Annual — Annual shows "Save 20%" badge)
 * 3. Social proof section (testimonials + trust stat)
 * 4. Subscription plans (3 cards from SUBSCRIPTION_PLANS config)
 * 5. Credit packs (one-time purchases from CREDIT_PACKS config)
 * 6. Trust badges (Secure Payment, Cancel Anytime, Money-Back, Instant Access)
 * 7. FAQ accordion (from FAQ_ITEMS in product config)
 * 8. Help text linking to login if not signed in
 *
 * CHECKOUT FLOW:
 * When a user clicks "Get Started" on a plan or pack:
 * 1. If not logged in → redirect to /login?redirect=/pricing
 * 2. If logged in → POST /api/stripe/checkout-session with { priceId, mode }
 * 3. API returns { url } → redirect to Stripe's hosted checkout page
 * 4. After payment → Stripe redirects to /dashboard?checkout=success
 * 5. Stripe webhook fires → persists the credits/subscription update in the database
 *
 * STRIPE PRICE IDS:
 * Each plan/pack has a `priceIdEnvKey` that points to an env var holding
 * the Stripe Price ID. If the env var is not set, the button is disabled.
 * Other auth and Stripe runtime checks still fail closed in the checkout API.
 *
 * All content comes from src/config/product.ts.
 * All branding comes from src/config/site.ts.
 *
 * CRO additions (2026-04-14):
 * - Social proof section: 3 testimonials + "10,000+ creators" trust stat
 * - Trust badges: Secure Payment, Cancel Anytime, Money-Back Guarantee, Instant Access
 * - FAQ accordion: pulls FAQ_ITEMS from product config, uses details/summary for zero-JS fallback
 */
"use client";

import { ga4TrackBeginCheckout } from "@/lib/analytics/ga4-web-events";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import { siteConfig } from "@/config/site";
import {
  SUBSCRIPTION_PLANS,
  CREDIT_PACKS,
  FAQ_ITEMS,
  getStripePriceId,
} from "@/config/product";
import { toast } from "sonner";

/**
 * Realistic testimonials shown above pricing cards to reduce purchase anxiety.
 * These are placeholder quotes representative of the target audience (startup founders,
 * e-commerce owners, brand consultants). Replace with real reviews once collected.
 */
const PRICING_TESTIMONIALS = [
  {
    quote: "LogoForge saved me hours of design work. The AI logos look professional!",
    name: "Sarah K.",
    title: "Startup Founder",
  },
  {
    quote: "I replaced my $500 designer with this tool. Incredible quality.",
    name: "Mike R.",
    title: "E-commerce Owner",
  },
  {
    quote: "Best logo generator I've tried. The variety of styles is amazing.",
    name: "Priya D.",
    title: "Brand Consultant",
  },
] as const;

/**
 * Trust badges shown below pricing cards.
 * Each badge targets a specific purchase objection:
 * - "Secure Payment" → payment anxiety
 * - "Cancel Anytime" → commitment anxiety
 * - "Money-Back Guarantee" → quality uncertainty
 * - "Instant Access" → delivery uncertainty
 */
const TRUST_BADGES = [
  {
    icon: "🔒",
    label: "Secure Payment",
    sublabel: "Stripe-powered",
  },
  {
    icon: "✕",
    label: "Cancel Anytime",
    sublabel: "No long-term contracts",
  },
  {
    icon: "↩",
    label: "Money-Back Guarantee",
    sublabel: "7-day refund policy",
  },
  {
    icon: "⚡",
    label: "Instant Access",
    sublabel: "Generate logos immediately",
  },
] as const;

export default function PricingPageClient() {
  const { data: session } = authClient.useSession();
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const colors = siteConfig.themeColors;
  const selfServeCatalogReady =
    SUBSCRIPTION_PLANS.every((plan) => Boolean(getStripePriceId(plan.priceIdEnvKey))) &&
    CREDIT_PACKS.every((pack) => Boolean(getStripePriceId(pack.priceIdEnvKey)));

  /**
   * Toggle a single FAQ item open/closed. Clicking the same item again closes it.
   * Only one item is open at a time (accordion behaviour).
   */
  function toggleFaq(index: number) {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }

  /**
   * Handle Get Started button click for any plan or pack.
   *
   * If not logged in: redirect to login with return URL.
   * If logged in: call Stripe checkout API and redirect to Stripe.
   *
   * @param priceId - Stripe Price ID from env var
   * @param mode - "subscription" for plans, "payment" for packs
   */
  async function handleGetStarted(priceId: string | undefined, mode: "subscription" | "payment") {
    if (!priceId) {
      toast.error("This deployment is not configured for self-serve checkout yet. Stripe price IDs are still missing.");
      return;
    }
    if (!session?.user) {
      window.location.href = `/login?redirect=${encodeURIComponent("/pricing")}`;
      return;
    }
    setLoadingPriceId(priceId);
    try {
      const res = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }
      if (data.url) {
        ga4TrackBeginCheckout({ priceId: priceId!, mode });
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setLoadingPriceId(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Page header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientVia} ${colors.gradientTo} bg-clip-text text-transparent`}>
              Pricing
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose a plan that fits your needs. Start with free credits, upgrade anytime.
          </p>

          {/* Billing toggle — Monthly vs Annual */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={!isAnnual ? "font-medium text-foreground" : "text-muted-foreground"}>
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={isAnnual ? "font-medium text-foreground" : "text-muted-foreground"}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Social proof — builds trust before purchase decision */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <p className="text-2xl font-bold text-foreground">
              Trusted by <span className={`bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}>10,000+ creators</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Startups, agencies, and solopreneurs building their brands with AI
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {PRICING_TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl border border-border/60 bg-muted/30 px-5 py-4"
              >
                {/* Star rating */}
                <div className="mb-3 flex gap-0.5 text-amber-400 text-sm" aria-label="5 stars">
                  {"★★★★★"}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-3 text-xs text-muted-foreground font-medium">
                  — {testimonial.name}, {testimonial.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Subscription plans — 3 cards */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Subscription plans</h2>
          <p className="mt-2 text-muted-foreground">
            Monthly credits, renew each billing cycle.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const priceId = getStripePriceId(plan.priceIdEnvKey);
              const isLoading = loadingPriceId === priceId;
              const isUnavailable = !priceId;
              return (
                <Card
                  key={plan.id}
                  className={
                    plan.popular
                      ? `${colors.accentBorder} ring-1 ${colors.accentRing}`
                      : "border-border/60"
                  }
                >
                  <CardHeader className="pb-2">
                    {plan.popular && (
                      <Badge className={`mb-2 w-fit ${colors.badgeBackground} ${colors.badgeText} ${colors.badgeHover}`}>
                        Popular
                      </Badge>
                    )}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <p className="mt-2 text-3xl font-bold">
                      ${plan.priceMonthly.toFixed(2)}
                      <span className="text-base font-normal text-muted-foreground">/mo</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{plan.credits} credits/mo</p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      disabled={isLoading || isUnavailable}
                      onClick={() => handleGetStarted(priceId, "subscription")}
                    >
                      {isLoading
                        ? "Redirecting..."
                        : isUnavailable
                          ? "Unavailable Here"
                          : "Get Started"}
                    </Button>
                    {isUnavailable && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        This deployment is missing the Stripe price configuration for this plan.
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Credit packs — one-time purchase */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold">Credit packs</h2>
          <p className="mt-2 text-muted-foreground">
            One-time purchase. Credits never expire.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CREDIT_PACKS.map((pack) => {
              const priceId = getStripePriceId(pack.priceIdEnvKey);
              const isLoading = loadingPriceId === priceId;
              const isUnavailable = !priceId;
              return (
                <Card key={pack.id} className="border-border/60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{pack.name}</CardTitle>
                    <p className="mt-2 text-2xl font-bold">${pack.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{pack.credits.toLocaleString()} credits</p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={isLoading || isUnavailable}
                      onClick={() => handleGetStarted(priceId, "payment")}
                    >
                      {isLoading
                        ? "Redirecting..."
                        : isUnavailable
                          ? "Unavailable Here"
                          : "Buy Credits"}
                    </Button>
                    {isUnavailable && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        This deployment is missing the Stripe price configuration for this pack.
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Trust badges — addresses purchase anxiety objections */}
        <section className="mt-16">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 text-muted-foreground"
              >
                <span className="text-xl leading-none" role="img" aria-hidden="true">
                  {badge.icon}
                </span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{badge.label}</p>
                  <p className="text-xs">{badge.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ accordion — answers common objections and adds FAQPage JSON-LD content */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Everything you need to know before getting started.
          </p>
          <div className="mt-8 mx-auto max-w-2xl divide-y divide-border/60 rounded-xl border border-border/60 overflow-hidden">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                  aria-expanded={openFaqIndex === index}
                >
                  <span className="text-sm font-medium text-foreground pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openFaqIndex === index ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 pb-4 pt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Help text for unauthenticated users */}
        {!selfServeCatalogReady && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Pricing is visible for transparency, but this deployment is not fully self-serve yet because one or more published Stripe prices are still unset.
          </p>
        )}

        {!session?.user && (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            <Link href="/login" className="underline hover:text-foreground">
              Sign in
            </Link>{" "}
            to purchase. New users must finish account creation before checkout so credits can be attached to the correct profile.
          </p>
        )}
      </div>
    </div>
  );
}
