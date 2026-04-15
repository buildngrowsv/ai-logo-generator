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
import { FAQ_ITEMS } from "@/config/product";
import PricingPageClient from "./PricingPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://generateailogo.com";

export const metadata: Metadata = {
  title: "Pricing | LogoForge AI — Free & Pro Plans",
  description:
    "Compare LogoForge AI pricing plans. Start free with 3 logo generations, " +
    "then upgrade for unlimited AI logo creation. Affordable plans starting at $4.90/month.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: "Pricing | LogoForge AI — Free & Pro Plans",
    description:
      "Compare LogoForge AI pricing plans. Start free with 3 logo generations, " +
      "then upgrade for unlimited AI logo creation.",
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

/**
 * FAQPage JSON-LD — enables Google FAQ rich results (expandable Q&A blocks in
 * search snippets). Data sourced from FAQ_ITEMS so rendered UI and structured
 * data stay in sync.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/**
 * SoftwareApplication + Offer JSON-LD — enables Google rich snippets showing
 * price and application category for "[product] pricing" queries.
 */
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LogoForge AI",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/pricing`,
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "3 free logo generations (15 credits)",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Starter",
      price: "4.90",
      priceCurrency: "USD",
      description: "30 credits per month",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "14.90",
      priceCurrency: "USD",
      description: "100 credits per month, priority processing",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Business",
      price: "39.90",
      priceCurrency: "USD",
      description: "300 credits per month, team features, API access",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <PricingPageClient />
    </>
  );
}
