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
  title: "AI Logo Generator — Create Professional Logos with AI | LogoForge",
  description:
    "Create professional logos in seconds using AI. Enter your business name, pick a style, and get multiple logo variations. Free to try — no sign-up required.",
  alternates: {
    canonical: "https://generateailogo.com",
  },
  openGraph: {
    title: "AI Logo Generator — Create Professional Logos with AI | LogoForge",
    description:
      "Create professional logos in seconds using AI. Free to try — no sign-up required.",
    type: "website",
    url: "https://generateailogo.com",
    siteName: "LogoForge AI",
  },
  twitter: { card: "summary_large_image" },
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
 * FAQPage JSON-LD — enables Google rich snippets (expandable Q&A in SERP).
 * Placed in root layout for guaranteed SSR rendering. The page.tsx also has
 * this schema, but Next.js RSC streaming does not reliably flush page-level
 * script tags into initial HTML.
 */
const jsonLdFaqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does AI logo generation work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LogoForge AI uses advanced FLUX AI models to generate unique logo designs from your text description. Enter your business name, describe the style you want, and the AI produces multiple professional logo options in seconds.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the generated logos commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You own full commercial rights to every logo you generate. Use them for your business branding, websites, social media, business cards, merchandise, or any commercial purpose.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter plan at $4.90/month with 50 logo credits, Creator plan at $14.90/month with 200 credits, and Agency plan at $39.90/month with 500 credits. Try 3 free logos before subscribing.",
      },
    },
    {
      "@type": "Question",
      name: "What file formats do I get?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All generated logos are delivered as high-resolution PNG files at 1024x1024 pixels, suitable for websites, social media, and most digital applications.",
      },
    },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqPage) }}
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
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <ExitIntentCapture />
      </body>
    </html>
  );
}
