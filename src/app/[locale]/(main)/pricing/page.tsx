/**
 * Pricing page — Server Component wrapper that exports SEO metadata
 * and renders the interactive PricingPageClient.
 *
 * WHY SERVER/CLIENT SPLIT:
 * Next.js App Router only allows metadata exports from Server Components.
 * The pricing page needs client-side interactivity (billing toggle, checkout
 * button handlers, session checks), so the interactive logic lives in
 * PricingPageClient.tsx as a "use client" component. This wrapper exists
 * solely to provide metadata for search engines.
 *
 * SEO VALUE:
 * /pricing is a high-intent page — users searching "AI logo generator pricing"
 * are close to conversion. Proper metadata (title, description, canonical,
 * OpenGraph) ensures search engines index and display this page correctly.
 *
 * PATTERN REFERENCE:
 * Matches ai-manga-generator/src/app/[locale]/pricing/page.tsx (Reviewer 13 APPROVED).
 */

import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://generateailogo.com";

export const metadata: Metadata = {
  title: "AI Logo Generator Pricing — Free & Pro Plans | LogoForge",
  description:
    "Start free — generate 3 logos daily. Upgrade to Pro for unlimited AI logos, commercial license, and high-res downloads. No credit card required.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: "AI Logo Generator Pricing — Free & Pro Plans | LogoForge",
    description:
      "Start free — generate 3 logos daily. Upgrade to Pro for unlimited AI logos, commercial license, and high-res downloads. No credit card required.",
    url: `${SITE_URL}/pricing`,
    type: "website",
  },
};

/**
 * BreadcrumbList JSON-LD — helps Google display breadcrumb navigation
 * (Home > Pricing) in search results, improving click-through rate.
 */
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE_URL}/pricing` },
  ],
};

/* FAQPage + SoftwareApplication JSON-LD removed — pricing/layout.tsx already provides both.
   Duplicate JSON-LD on the same page causes Google "duplicate field" warnings. */

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* FAQPage + SoftwareApplication provided by pricing/layout.tsx */}
      <PricingPageClient />
    </>
  );
}
