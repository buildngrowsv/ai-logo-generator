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
import type { Viewport } from "next";
import "./globals.css";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
