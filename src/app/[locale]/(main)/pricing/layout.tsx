import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/config/product";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://generateailogo.com";

/* async generateMetadata forces Next.js to flush metadata in SSR when parent layout also uses generateMetadata */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing — LogoForge AI | Free & Pro Plans",
    description:
      "Compare LogoForge AI pricing plans. Start free with daily generations or upgrade to Pro for unlimited AI logo generation, priority processing, and commercial usage rights.",
    alternates: { canonical: `${APP_URL}/pricing` },
    openGraph: {
      title: "Pricing — LogoForge AI",
      description:
        "See LogoForge AI pricing. Free plan to try AI logo generation, Pro plan for unlimited use and commercial rights.",
      url: `${APP_URL}/pricing`,
    },
  };
}

/**
 * SoftwareApplication + Offer JSON-LD — enables Google rich snippets showing
 * price and application category in search results for "[product] pricing" queries.
 */
const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LogoForge AI",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  url: `${APP_URL}/pricing`,
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "3 AI logo generations per day",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Basic",
      price: "4.90",
      priceCurrency: "USD",
      description: "More daily generations, all styles, commercial rights",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "14.90",
      priceCurrency: "USD",
      description: "Unlimited generations, priority processing, all features",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
    },
  ],
};

/**
 * FAQPage JSON-LD — structured data for Google AI Overviews and rich FAQ snippets.
 *
 * WHY THIS EXISTS:
 * Google's AI Overviews cite pages with FAQPage schema at a much higher rate than
 * those without. Each Question/Answer pair in the schema targets a long-tail query
 * in the AI logo generation category. The questions are pulled from FAQ_ITEMS in
 * product.ts so the schema and the visible UI stay in sync automatically.
 *
 * This is separate from the SoftwareApplication schema above — both are valid on
 * a single page. Google processes multiple JSON-LD blocks independently.
 */
const faqPageJsonLd = {
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

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* SoftwareApplication + Offer schema — price/rating rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      {/* FAQPage schema — AI Overview citations + rich FAQ accordion in SERP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      {children}
    </>
  );
}
