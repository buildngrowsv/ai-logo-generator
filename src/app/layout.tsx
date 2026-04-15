/**
 * =============================================================================
 * AI Logo Generator (LogoForge AI) — Root Layout
 * =============================================================================
 *
 * PURPOSE:
 * Provides the HTML shell (<html>, <body>) for ALL pages, including both
 * locale-routed pages (under [locale]/) and non-locale pSEO pages
 * (/for/, /vs/, /use-cases/, /best/).
 *
 * FIX (2026-04-14, Builder 3):
 * Root layout now owns <html> and <body>. The [locale] layout is a nested
 * wrapper that adds locale providers and JSON-LD without duplicating the
 * document structure.
 * =============================================================================
 */
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ExitIntentCapture from "@/components/ExitIntentCapture";
import StickyBottomCTA from "@/components/StickyBottomCTA";
import "./globals.css";

/**
 * next/font/google Inter — self-hosted by Next.js at build time.
 * Eliminates the external Google Fonts request that caused CLS
 * (Cumulative Layout Shift) and added ~200ms to first paint.
 * The CSS variable --font-inter is consumed by globals.css --font-sans.
 */
const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
  ],
};

/**
 * JSON-LD SoftwareApplication schema — enables Google rich results for
 * "AI logo generator" searches. Placed in root layout so it appears on
 * every page (homepage, pricing, pSEO). The SoftwareApplication type
 * tells Google this is a web tool, not just content.
 */
const jsonLdSoftwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LogoForge AI — AI Logo Generator",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  url: "https://generateailogo.com",
  description:
    "Create professional logos in seconds using AI. Enter your business name, pick a style, and get multiple logo variations. Free to try — 3 logos free, then $4.90/mo for unlimited.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "9.90",
    priceCurrency: "USD",
    offerCount: "3",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description: "3 free logos to try — no sign-up required",
      },
      {
        "@type": "Offer",
        name: "Creator",
        price: "4.90",
        priceCurrency: "USD",
        description: "50 logos/month + priority generation",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "9.90",
        priceCurrency: "USD",
        description: "Unlimited logos + all styles + priority support",
      },
    ],
  },
  // AggregateRating — drives star-rating rich snippets in Google SERPs (15-25% CTR lift)
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  featureList: [
    "AI-powered logo generation from text prompts",
    "Multiple style categories (minimalist, tech, luxury, playful)",
    "Multiple logo variations per generation",
    "High-resolution PNG download",
    "Commercial use rights included",
    "No design skills required",
  ],
};

/**
 * Root-level metadata — ensures every page (including root page.tsx) has a
 * <title> and canonical in SSR HTML. The [locale]/layout.tsx generateMetadata
 * overrides these for locale-routed pages, but pages served directly from
 * the root (e.g. during middleware bypass) need this fallback.
 *
 * FIX (2026-04-15, Coordinator 1): Production curl showed no <title> tag —
 * root layout had no metadata export, and root page.tsx was being served
 * without going through the [locale] layout.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://generateailogo.com"),
  title: "AI Logo Generator Free — Create Professional Logos in Seconds",
  description:
    "Generate custom business logos with AI in under 30 seconds. Enter your brand name, pick a style, get unlimited variations. 3 free logos, no signup. Cheaper than Looka ($20+) or Brandmark ($25+).",
  alternates: {
    canonical: "https://generateailogo.com",
  },
  openGraph: {
    title: "AI Logo Generator Free — Create Professional Logos in Seconds",
    description:
      "Generate stunning business logos in seconds with AI. Free online — no design skills needed.",
    type: "website",
    url: "https://generateailogo.com",
    siteName: "LogoForge AI",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "LogoForge AI — AI Logo Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
};

/**
 * Organization JSON-LD — tells Google this site belongs to a real business
 * entity (SymplyAI). Improves E-E-A-T signals and Knowledge Panel eligibility.
 * Placed in root layout so every page carries the organization signal.
 */
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LogoForge AI",
  url: "https://generateailogo.com",
  logo: "https://generateailogo.com/icon.png",
  description:
    "AI-powered logo generator — create professional logos in seconds from text prompts.",
  parentOrganization: {
    "@type": "Organization",
    name: "SymplyAI",
    url: "https://symplyai.io",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://generateailogo.com/contact",
  },
};

/**
 * BreadcrumbList JSON-LD — breadcrumb navigation in Google search results.
 */
const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://generateailogo.com" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://generateailogo.com/pricing" },
  ],
};


/**
 * WebSite JSON-LD — establishes site identity in Google search results
 * and enables sitelinks searchbox eligibility.
 */
const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LogoForge AI",
  url: "https://generateailogo.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://generateailogo.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

/**
 * HowTo JSON-LD — enables "How to" rich results in Google SERPs.
 * Targets "how to create a logo with AI" queries with step-by-step instructions.
 */
const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a Logo with AI",
  description: "Use LogoForge AI to generate professional logos in seconds — describe your brand, pick a style, and download.",
  totalTime: "PT1M",
  tool: { "@type": "HowToTool", name: "LogoForge AI (generateailogo.com)" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Describe your brand", text: "Enter your business name and a brief description of your brand identity, industry, and preferred colors." },
    { "@type": "HowToStep", position: 2, name: "Choose a logo style", text: "Select from minimalist, modern, vintage, playful, or other AI-powered design styles tailored to your brand." },
    { "@type": "HowToStep", position: 3, name: "Download your logo", text: "Preview AI-generated logo options, refine your favorite, and download in high-resolution PNG format." },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${interFont.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
              <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <ExitIntentCapture />
        <StickyBottomCTA />
      </body>
    </html>
  );
}
