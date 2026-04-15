/**
 * Standalone /pricing route — provides own locale context for next-intl components.
 *
 * WHY: With next-intl localePrefix "as-needed", bare /pricing matches the
 * [locale] dynamic segment (locale="pricing") instead of [locale]/(main)/pricing.
 * Vercel's x-matched-path shows /[locale], so the pricing page's generateMetadata
 * never runs — the homepage metadata appears instead.
 *
 * Simple re-export fails because PricingPageClient uses @/i18n/navigation Link
 * which calls useLocale() — requires NextIntlClientProvider from [locale]/layout.
 *
 * This standalone route:
 * 1. Exports its own generateMetadata (pricing-specific title/canonical/OG)
 * 2. Wraps PricingPageClient in NextIntlClientProvider with default locale
 *
 * Pattern: extends ai-product-photo-generator standalone pricing approach.
 */
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import PricingPageClient from "../[locale]/(main)/pricing/PricingPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://generateailogo.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Logo Generator Pricing — Free & Pro Plans | LogoForge",
    description:
      "Start free — generate 3 logos daily. Upgrade to Pro for unlimited AI logos, commercial license, and high-res downloads. No credit card required.",
    alternates: {
      canonical: `${SITE_URL}/pricing`,
    },
    openGraph: {
      title: "AI Logo Generator Pricing — Free & Pro Plans | LogoForge",
      description:
        "Start free — generate 3 logos daily. Upgrade to Pro for unlimited AI logos, commercial license, and high-res downloads.",
      url: `${SITE_URL}/pricing`,
      type: "website",
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` },
  ],
};

export default async function StandalonePricingPage() {
  const messages = (await import("../../messages/en.json")).default as Record<string, unknown>;
  return (
    <NextIntlClientProvider locale="en" messages={messages as never}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PricingPageClient />
    </NextIntlClientProvider>
  );
}
