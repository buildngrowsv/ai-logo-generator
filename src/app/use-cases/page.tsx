/**
 * /use-cases/ index — hub page for all "How to [Use Case]" guide pages.
 *
 * WHY THIS PAGE EXISTS:
 * Google rewards hub-and-spoke site architecture. This page links to every
 * use-case slug defined in SEO_PAGES_CONFIG.useCases, giving Google a single
 * crawl entry point for the entire /use-cases/ cluster. Without it, child
 * pages are orphaned and may not be discovered efficiently by crawlers.
 *
 * ROUTE: /use-cases
 * MIDDLEWARE: /use-cases/ is excluded from next-intl middleware matcher.
 *
 * DATA SOURCE: src/config/seo-pages.ts (SEO_PAGES_CONFIG.useCases)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SEO_PAGES_CONFIG } from "@/config/seo-pages";
import { PRODUCT_CONFIG } from "@/lib/config";
import { siteConfig } from "@/config/site";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SeoInternalLinks } from "@/components/SeoInternalLinks";

const productName = PRODUCT_CONFIG.name;

export const metadata: Metadata = {
  title: `AI Logo Use Cases & Guides — ${productName}`,
  description:
    "Step-by-step guides for using AI to create logos for brand identity, social media branding, merchandise design, and more. Free tools and professional workflows.",
  alternates: { canonical: `${siteConfig.siteUrl}/use-cases` },
  openGraph: {
    title: `AI Logo Use Cases & Guides — ${productName}`,
    description:
      "Step-by-step guides for using AI to create logos for brand identity, social media branding, merchandise design, and more.",
    url: `${siteConfig.siteUrl}/use-cases`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function UseCasesIndexPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* BreadcrumbList JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.siteUrl },
          { name: "Use Cases", url: `${siteConfig.siteUrl}/use-cases` },
        ]}
      />

      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">{"\u2728"}</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {productName}
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold">
          AI Logo{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Use Cases
          </span>{" "}
          &amp; Guides
        </h1>
        <p className="mt-4 text-gray-400">
          Step-by-step guides for creating professional logos with AI — from
          brand identity to merchandise design.
        </p>

        {/* Use case cards */}
        <div className="mt-12 space-y-6">
          {SEO_PAGES_CONFIG.useCases.map((uc) => (
            <Link
              key={uc.slug}
              href={`/use-cases/${uc.slug}`}
              className="block rounded-2xl border border-gray-800 bg-gray-900/50 p-6 text-left hover:border-purple-500/40 transition-colors"
            >
              <h2 className="text-xl font-bold text-white">{uc.name}</h2>
              <p className="mt-2 text-sm text-gray-400">{uc.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {uc.steps.slice(0, 3).map((step, stepIndex) => (
                  <span
                    key={stepIndex}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300"
                  >
                    <span className="text-purple-400 font-bold">
                      {stepIndex + 1}
                    </span>{" "}
                    {step.length > 60 ? `${step.slice(0, 57)}...` : step}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-block text-sm font-semibold text-purple-400">
                Read full guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Internal Links — cross-links to other pSEO hubs */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <SeoInternalLinks />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} {productName}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-300 transition-colors"
            >
              Terms
            </Link>
            <a
              href="https://symplyai.io"
              target="_blank"
              rel="noopener"
              className="hover:text-gray-300 transition-colors"
            >
              Powered by SymplyAI
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
