/**
 * Root Layout — The outermost wrapper for every page in the app.
 * 
 * WHY THIS STRUCTURE:
 * Next.js App Router requires a root layout.tsx that wraps all pages.
 * We use it to:
 *   1. Set the HTML lang and dark class (dark theme by default)
 *   2. Load global CSS (Tailwind + our custom styles)
 *   3. Wrap everything in the NextAuth SessionProvider so any component
 *      can access the user's auth state via useSession()
 *   4. Set meta tags for SEO (title, description, Open Graph)
 * 
 * ARCHITECTURE NOTE:
 * The SessionProvider is a client component, but we keep the layout as a
 * server component. The trick is to extract the SessionProvider into a
 * separate client component (AuthSessionProvider) and use it here.
 * This is the standard pattern recommended by NextAuth for App Router.
 */

import type { Metadata } from "next";
import { PRODUCT_CONFIG } from "@/lib/config";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import "./globals.css";

/**
 * Dynamic metadata generated from PRODUCT_CONFIG.
 * WHY: By deriving metadata from config, cloning a new product automatically
 * updates all SEO tags. No need to manually edit layout.tsx for each clone.
 */
export const metadata: Metadata = {
  title: {
    default: `${PRODUCT_CONFIG.name} — ${PRODUCT_CONFIG.tagline}`,
    template: `%s | ${PRODUCT_CONFIG.name}`,
  },
  description: PRODUCT_CONFIG.description,
  openGraph: {
    title: PRODUCT_CONFIG.name,
    description: PRODUCT_CONFIG.description,
    type: "website",
  },
  /**
   * Twitter card meta — uses the large image format for maximum visibility
   * in Twitter/X feeds. Added 2026-03-24 as part of SEO rollout (Scout 15).
   */
  twitter: {
    card: "summary_large_image",
    title: PRODUCT_CONFIG.name,
    description: PRODUCT_CONFIG.description,
  },
};

/**
 * Root layout component.
 * 
 * WHY "dark" class on <html>:
 * We default to dark mode because AI tools look better dark (industry standard).
 * If we ever want to add a light mode toggle, the class-based dark mode from
 * Tailwind makes it straightforward — just toggle the class.
 * 
 * WHY suppressHydrationWarning:
 * The dark class on <html> can cause a hydration mismatch if the client
 * has a different preference cached. suppressHydrationWarning prevents
 * React from throwing an error for this known, harmless mismatch.
 */
/**
 * JSON-LD STRUCTURED DATA — Helps Google show rich snippets in search results.
 *
 * SoftwareApplication schema tells Google this is a web app, its category,
 * pricing model, and feature list. FAQPage schema provides expandable
 * Q&A rich results that increase SERP click-through rate.
 *
 * WHY JSON-LD OVER MICRODATA:
 * Google recommends JSON-LD as the preferred structured data format.
 * It lives in a <script> tag in <head>, separate from the HTML structure,
 * so it does not interfere with component rendering or styling.
 *
 * Added 2026-03-24 by Scout 15 as part of SEO meta tag rollout across all
 * clone apps. Part of the marketplace listing preparation for Toolify,
 * FutureTools, and other AI tool directories.
 */
const jsonLdStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AI Logo Generator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "description": "Generate unique, professional logos from text descriptions using AI. Perfect for startups, small businesses, and side projects that need brand identity fast.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free tier with credits. Pro plans for unlimited logo generation and high-resolution downloads."
  },
  "featureList": [
    "AI-powered logo generation from text prompts",
    "Multiple logo styles and aesthetics",
    "High-resolution SVG and PNG downloads",
    "No design skills required",
    "Instant results in seconds"
  ]
};

const jsonLdFaqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the AI Logo Generator free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! You get free credits to generate logos. Pro plans are available for unlimited generations and high-resolution downloads."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use the generated logos commercially?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all logos you generate are yours to use for any purpose including commercial branding, websites, social media, and printed materials."
      }
    },
    {
      "@type": "Question",
      "name": "How does AI logo generation work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Describe your brand and the style you want, and our AI creates unique logo concepts in seconds. You can iterate on designs by refining your description until you get the perfect logo."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqData) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
