/**
 * src/app/vs/page.tsx — LogoForge AI comparison index page
 *
 * WHY THIS PAGE EXISTS:
 * Hub for all /vs/ competitor comparison pages. Strengthens internal linking
 * for SEO and provides a clean landing for users who navigate to /vs/ without
 * specifying a competitor. Targets high-intent "logo generator alternative"
 * searches where users are actively evaluating tools.
 *
 * MIDDLEWARE NOTE:
 * /vs/ is excluded from next-intl middleware — see middleware.ts matcher.
 * This keeps comparison pages outside the locale routing so they render
 * without the [locale] layout wrapper (same pattern as /privacy and /terms).
 *
 * SEO comparison page initiative, 2026-04-06
 */

import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SeoCrossLinks } from "@/components/SeoCrossLinks";
import { SeoInternalLinks } from "@/components/SeoInternalLinks";
import { siteConfig } from "@/config/site";
// ---------------------------------------------------------------------------
// Metadata — targets "AI logo generator comparison" cluster
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "LogoForge AI vs Competitors — AI Logo Generator Comparisons",
  description:
    "See how LogoForge AI compares to popular logo design tools like Canva and Looka. Honest feature, pricing, and quality comparisons.",
  alternates: {
    canonical: "https://generateailogo.com/vs",
  },
  openGraph: {
    title: "LogoForge AI vs Competitors — AI Logo Generator Comparisons",
    description:
      "Side-by-side comparisons of LogoForge AI with Canva Logo Maker, Looka, and more.",
    url: "https://generateailogo.com/vs",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Comparison entries — add new competitors here as pages are created
// ---------------------------------------------------------------------------
const COMPARISONS = [
  {
    slug: "canva",
    name: "Canva Logo Maker",
    tagline:
      "Dedicated AI logo generator vs Canva's template-based logo maker",
    highlights: [
      "AI-generated unique logos vs templates",
      "Simpler UX for logo-only workflow",
      "Credit-based pricing from $4.90/mo",
    ],
  },
  {
    slug: "looka",
    name: "Looka",
    tagline:
      "Affordable AI logo generation vs Looka's premium brand-kit model",
    highlights: [
      "No $20+ one-time logo fee",
      "Unlimited variations with Pro plan",
      "Free credits to try before paying",
    ],
  },
  {
    slug: "brandmark",
    name: "Brandmark",
    tagline:
      "5 months of unlimited logos for the price of one Brandmark download",
    highlights: [
      "$4.90/mo unlimited vs $25-$175 per logo",
      "Generative AI vs assembled templates",
      "Free downloadable files to try",
    ],
  },
  {
    slug: "hatchful",
    name: "Hatchful (Shopify)",
    tagline:
      "AI-generated unique logos vs Shopify's deprecated template-based logo maker",
    highlights: [
      "Generative AI vs fixed icon library",
      "Actively maintained (Hatchful is sunset)",
      "Free credits + $4.90/mo Pro",
    ],
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsIndexPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* -- Navigation -- */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
        {/* BreadcrumbList JSON-LD — breadcrumb rich snippets in Google SERPs */}
        <BreadcrumbJsonLd
          items={[
            { name: "Home", url: siteConfig.siteUrl },
            { name: "Alternatives", url: `${siteConfig.siteUrl}/vs` },
          ]}
        />

      {/* ItemList JSON-LD — tells Google this is a structured collection page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: metadata.title,
            url: `${siteConfig.siteUrl}/vs`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: COMPARISONS.map((comp, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `vs ${comp.name}`,
                url: `${siteConfig.siteUrl}/vs/${comp.slug}`,
              })),
            },
          }),
        }}
      />
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">{"\u2728"}</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LogoForge AI
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* -- Hero -- */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          How{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            LogoForge AI
          </span>{" "}
          Compares
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Honest, side-by-side comparisons with popular logo design tools and
          AI generators.
        </p>
      </section>

      {/* -- Comparison cards -- */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {COMPARISONS.map((comp) => (
            <Link
              key={comp.slug}
              href={`/vs/${comp.slug}`}
              className="group rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-purple-500/50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                LogoForge AI vs {comp.name}
              </h2>
              <p className="mt-2 text-gray-400">{comp.tagline}</p>
              <ul className="mt-4 space-y-1">
                {comp.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-sm text-gray-500 flex items-center gap-2"
                  >
                    <span className="text-emerald-400">&#10003;</span> {h}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-block text-sm font-semibold text-purple-400 group-hover:underline">
                Read full comparison &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Cross-links and internal links for crawlability */}
      <SeoCrossLinks currentCategory="vs" currentSlug="" />
      <SeoInternalLinks />

      {/* -- Footer -- */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} LogoForge AI. All rights
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
