import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://generateailogo.com";

export const metadata: Metadata = {
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

/**
 * SoftwareApplication + Offer JSON-LD — enables Google rich snippets showing
 * price and application category in search results for "[product] pricing" queries.
 */
const pricingJsonLd = {
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

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      {children}
    </>
  );
}
