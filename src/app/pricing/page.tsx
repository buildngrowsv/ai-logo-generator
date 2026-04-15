/**
 * Standalone /pricing route — redirects to /en/pricing.
 *
 * WHY: With next-intl v3 localePrefix "as-needed", bare /pricing matches the
 * [locale] dynamic segment (locale="pricing") instead of [locale]/(main)/pricing.
 * Vercel's x-matched-path shows /[locale], so the pricing page's generateMetadata
 * never runs — the homepage metadata appears instead.
 *
 * The re-export approach (export { default } from "../[locale]/(main)/pricing/page")
 * fails at build time because PricingPageClient uses useLocale() which requires
 * NextIntlClientProvider — only present in [locale]/layout.tsx.
 *
 * Instead, this route redirects /pricing → /en/pricing, where the full locale
 * layout chain provides i18n context. The redirect is permanent (308) so search
 * engines index /en/pricing as the canonical URL.
 *
 * razor-review-9173 (2026-04-15): Added /pricing to middleware matcher exclusion
 * so next-intl doesn't interfere. This page handles /pricing independently.
 */
import { redirect } from "next/navigation";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://generateailogo.com";

/**
 * Metadata for /pricing — search engines may briefly see this before following
 * the redirect. Matches the [locale]/(main)/pricing/page.tsx metadata.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Logo Generator Pricing — Free & Pro Plans | LogoForge",
    description:
      "Start free — generate 3 logos daily. Upgrade to Pro for unlimited AI logos, commercial license, and high-res downloads. No credit card required.",
    alternates: {
      canonical: `${SITE_URL}/en/pricing`,
    },
  };
}

export default function PricingRedirect() {
  redirect("/en/pricing");
}
