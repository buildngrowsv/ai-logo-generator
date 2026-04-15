/**
 * src/app/vs/brandmark/page.tsx — LogoForge AI vs Brandmark comparison page
 *
 * SEO STRATEGY:
 * Targets "brandmark alternative", "brandmark vs AI logo generator",
 * "brandmark pricing" queries. Brandmark is a premium AI logo generator
 * charging $25 for basic and up to $175 for enterprise. High-intent users
 * searching for cheaper alternatives are the exact audience for LogoForge AI.
 *
 * MARKET CONTEXT (from wiki analysis):
 * AI Logo Generator category has ~177 tools on Toolify. LogoForge AI has
 * zero social following — this is a PURE SEO play. Comparison pages targeting
 * branded competitor queries are the highest-leverage organic traffic source
 * when you have no social distribution.
 *
 * KEY DIFFERENTIATOR:
 * Brandmark uses AI to generate logos but charges $25-$175 per logo with
 * a questionnaire-driven flow. LogoForge AI uses generative AI (FLUX model)
 * at $4.90/month unlimited — 5x cheaper than a single Brandmark basic logo.
 *
 * STRUCTURED DATA:
 * FAQPage JSON-LD for rich snippet eligibility.
 *
 * MIDDLEWARE NOTE:
 * /vs/ is excluded from next-intl middleware — see middleware.ts matcher.
 *
 * SEO comparison page initiative, 2026-04-10
 */

import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SeoCrossLinks } from "@/components/SeoCrossLinks";
import { SeoInternalLinks } from "@/components/SeoInternalLinks";
// ---------------------------------------------------------------------------
// Metadata — targets "brandmark alternative" and related queries
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "LogoForge AI vs Brandmark (2026) — AI Logo Generator Comparison",
  description:
    "Compare LogoForge AI with Brandmark for AI logo generation. $4.90/month unlimited vs $25-$175 per logo. See pricing, features, and output quality side by side.",
  keywords: [
    "brandmark alternative",
    "brandmark vs AI logo generator",
    "brandmark pricing alternative",
    "cheap AI logo generator",
    "best AI logo maker 2026",
    "brandmark competitor",
    "AI logo maker comparison",
    "brandmark free alternative",
  ],
  alternates: {
    canonical: "https://generateailogo.com/vs/brandmark",
  },
  openGraph: {
    title: "LogoForge AI vs Brandmark — Which AI Logo Generator Is Better Value?",
    description:
      "$4.90/month unlimited logos vs $25-$175 per logo. Honest pricing and feature comparison for 2026.",
    url: "https://generateailogo.com/vs/brandmark",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// FAQ data — addresses Brandmark-specific pricing and quality concerns
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "How much does Brandmark cost?",
    answer:
      "Brandmark charges per logo: $25 for a Basic package (PNG only), $65 for a Designer package (PNG, SVG, PDF + brand guidelines), and $175 for an Enterprise package (full brand identity with business cards, social media kits, and letterheads). LogoForge AI offers free credits to try, then $4.90/month for unlimited logo generations — no per-logo fees.",
  },
  {
    question: "Is LogoForge AI better than Brandmark?",
    answer:
      "It depends on what you need. Brandmark excels at producing polished brand identity packages with business cards and social templates — but you pay $65-$175 per logo set. LogoForge AI is better if you want unlimited AI-generated logos for experimentation, A/B testing, or multiple projects at $4.90/month. For a startup testing multiple brand directions, LogoForge AI is dramatically more cost-effective.",
  },
  {
    question: "Does Brandmark use real AI?",
    answer:
      "Yes. Brandmark uses machine learning to combine typography, iconography, and color palettes based on your business description and style preferences. LogoForge AI uses generative AI (FLUX model) to create logos entirely from scratch — the output tends to be more creative and unexpected, while Brandmark's results are more predictable and template-influenced.",
  },
  {
    question: "Can I get a free logo from Brandmark?",
    answer:
      "Brandmark lets you generate logos for free to preview, but downloading any file requires a $25+ purchase — even for a low-resolution PNG. LogoForge AI gives you free credits on signup that include downloadable high-resolution files, so you can actually use your logo before paying anything.",
  },
  {
    question: "Which is better for startups on a tight budget?",
    answer:
      "LogoForge AI is the clear winner for budget-conscious founders. A single Brandmark Basic logo ($25) costs more than 5 months of LogoForge AI Pro ($4.90/month). With the subscription, you can generate logos for your main brand, sub-brands, side projects, and pivot experiments without worrying about per-logo costs.",
  },
  {
    question: "Does Brandmark offer SVG files?",
    answer:
      "Yes, but only in the Designer ($65) and Enterprise ($175) packages. The Basic $25 package is PNG-only. LogoForge AI currently outputs high-resolution PNG files. If you specifically need vector formats for large-scale printing, Brandmark's higher tiers offer that — but at a significantly higher price point.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD — FAQPage structured data for rich snippets
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Comparison table data
// ---------------------------------------------------------------------------
const COMPARISON_ROWS = [
  { feature: "AI Technology", ours: "Generative AI (FLUX model)", theirs: "ML-assisted icon + typography combination" },
  { feature: "Logo Uniqueness", ours: "Generated from scratch each time", theirs: "Assembled from curated elements" },
  { feature: "Free Tier", ours: "Free credits, downloadable files", theirs: "Preview only, $25+ to download" },
  { feature: "Pro Price", ours: "$4.90/month unlimited", theirs: "$25-$175 per logo package" },
  { feature: "Iterations", ours: "Unlimited with subscription", theirs: "New purchase per design set" },
  { feature: "Brand Kit", ours: "Logo generation focused", theirs: "Business cards, social templates ($65+)" },
  { feature: "Output Formats", ours: "High-res PNG", theirs: "PNG ($25), SVG/PDF ($65+)" },
  { feature: "Time to First Logo", ours: "~30 seconds", theirs: "3-5 minutes (questionnaire + generation)" },
  { feature: "Style Control", ours: "Minimalist, Tech, Luxury, Playful, etc.", theirs: "Industry + style preference quiz" },
  { feature: "Account Required", ours: "Free credits on signup", theirs: "Required to save or purchase" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsBrandmarkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* BreadcrumbList JSON-LD — breadcrumb rich snippets in Google SERPs */}

      <BreadcrumbJsonLd

        items={[

          { name: "Home", url: "" },

          { name: "Alternatives", url: `${""}/vs` },

        ]}

      />

      <main className="min-h-screen bg-gray-950 text-gray-100">
        {/* -- Navigation -- */}
        <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
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
              <Link href="/vs" className="hover:text-white transition-colors">
                Comparisons
              </Link>
            </div>
          </div>
        </nav>

        {/* -- Hero -- */}
        <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LogoForge AI
            </span>{" "}
            vs Brandmark
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Brandmark charges $25-$175 per logo download. LogoForge AI gives you
            unlimited AI-generated logos for $4.90/month. One Brandmark basic
            logo costs more than 5 months of LogoForge AI Pro.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-base font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Try LogoForge AI Free
            </Link>
            <a
              href="#comparison"
              className="inline-flex items-center justify-center rounded-full border border-gray-700 px-8 py-3 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              See Full Comparison
            </a>
          </div>
        </section>

        {/* -- Key differentiator cards -- */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "\u{1F4B0}",
                title: "5x Cheaper Than One Brandmark Logo",
                description:
                  "A single Brandmark Basic logo costs $25 for a PNG file. LogoForge AI Pro is $4.90/month with unlimited generations. You get 5+ months of unlimited logos for the price of one Brandmark download.",
              },
              {
                icon: "\u{1F3A8}",
                title: "Truly Generative, Not Assembled",
                description:
                  "Brandmark assembles logos from pre-designed icons, fonts, and color schemes. LogoForge AI uses FLUX generative AI to create entirely unique logos from scratch — more creative, more distinctive, more yours.",
              },
              {
                icon: "\u{1F4E5}",
                title: "Download Free, Not Just Preview",
                description:
                  "Brandmark lets you design for free but locks downloads behind a $25+ paywall. LogoForge AI gives you free credits with actual downloadable high-res files so you can use your logo immediately.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6"
              >
                <span className="text-3xl">{card.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* -- Comparison table -- */}
        <section id="comparison" className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/80">
                  <th className="px-6 py-4 font-semibold text-gray-300">
                    Feature
                  </th>
                  <th className="px-6 py-4 font-semibold text-purple-400">
                    LogoForge AI
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-400">
                    Brandmark
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-800/50 ${
                      i % 2 === 0 ? "bg-gray-900/30" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-200">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-gray-100">{row.ours}</td>
                    <td className="px-6 py-4 text-gray-400">{row.theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -- Pricing deep dive -- */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Pricing Breakdown
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8">
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                LogoForge AI
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Free Tier</span>
                  <span className="text-purple-400 font-medium">Free credits, downloadable</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Pro Monthly</span>
                  <span className="text-purple-400 font-medium">$4.90/month</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Generations</span>
                  <span className="text-purple-400 font-medium">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per 10 logos</span>
                  <span className="text-purple-400 font-medium">$4.90 (or free)</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-2">
                Brandmark
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Basic (PNG only)</span>
                  <span className="font-medium">$25 per logo</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Designer (SVG, PDF, brand guide)</span>
                  <span className="font-medium">$65 per logo</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/50 pb-2">
                  <span>Enterprise (full brand kit)</span>
                  <span className="font-medium">$175 per logo</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per 10 logos</span>
                  <span className="font-medium">$250-$1,750</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -- When to choose section -- */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Which Tool Is Right for You?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8">
              <h3 className="text-xl font-bold text-purple-400 mb-4">
                Choose LogoForge AI if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>
                  Unlimited logo generations for one low monthly fee
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>
                  Freedom to experiment without per-logo costs
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>
                  Truly unique AI-generated logos (not template-assembled)
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>
                  Logos for multiple brands or projects
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>
                  Free downloadable files to try before subscribing
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">
                Choose Brandmark if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  A complete brand identity package in one purchase
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Vector formats (SVG, EPS, PDF) for print
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  One-time payment with no recurring fees
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Brand guidelines document included
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>
                  Predictable, polished corporate aesthetics
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* -- FAQ -- */}
        <section id="faq" className="mx-auto max-w-3xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-gray-800 bg-gray-900/40 p-6"
              >
                <h3 className="text-base font-semibold text-white">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* -- CTA -- */}
        <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-12">
            <h2 className="text-3xl font-bold">
              5 Months of Unlimited Logos for the Price of One Brandmark Download
            </h2>
            <p className="mt-3 text-gray-400">
              Free credits to start. $4.90/month for unlimited. No per-logo fees, ever.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Try LogoForge AI Free
            </Link>
          </div>
        </section>

        {/* Cross-links and internal links for crawlability */}
        <SeoCrossLinks currentCategory="vs" currentSlug="brandmark" />
        <SeoInternalLinks />

        {/* -- Footer -- */}
        <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
          <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>
              &copy; {new Date().getFullYear()} LogoForge AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">
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
    </>
  );
}
