/**
 * src/app/vs/logomakr/page.tsx — LogoForge AI vs LogoMakr comparison page
 *
 * SEO STRATEGY:
 * Targets "logomakr alternative", "logomakr vs AI logo generator",
 * "free logo maker alternative to logomakr", and "logomakr review" queries.
 * LogoMakr is one of the most searched free logo makers — users landing here
 * are actively evaluating whether to spend time in a manual drag-and-drop
 * editor or get an AI-generated logo instantly.
 *
 * KEY DIFFERENTIATOR:
 * LogoMakr is a manual drag-and-drop editor with no AI generation. Users must
 * hand-place icons, choose fonts, and arrange elements themselves — often
 * spending 20-40 minutes to produce results that look like clip-art composites.
 * LogoForge AI generates fully composed, unique logos from a text prompt in
 * about 30 seconds. The high-res download on LogoMakr requires a $19 one-time
 * purchase; LogoForge AI gives free credits on signup with no watermark.
 *
 * STRUCTURED DATA:
 * FAQPage JSON-LD for rich snippet eligibility on comparison queries.
 * BreadcrumbList JSON-LD for breadcrumb rich results.
 *
 * MIDDLEWARE NOTE:
 * /vs/ is excluded from next-intl middleware — see middleware.ts matcher.
 *
 * SEO comparison page initiative, 2026-04-15
 */

import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SeoCrossLinks } from "@/components/SeoCrossLinks";
import { SeoInternalLinks } from "@/components/SeoInternalLinks";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "LogoForge AI vs LogoMakr — AI Logo Generator vs Manual Editor",
  description:
    "Compare LogoForge AI with LogoMakr. AI-generated unique logos in 30 seconds vs a manual drag-and-drop editor. See pricing, features, and quality differences.",
  keywords: [
    "logomakr alternative",
    "logomakr vs AI logo generator",
    "free logo maker alternative",
    "AI logo generator free",
    "logoforge vs logomakr",
    "best AI logo generator 2026",
    "logo maker without drag and drop",
    "instant AI logo generator",
  ],
  alternates: {
    canonical: "https://generateailogo.com/vs/logomakr",
  },
  openGraph: {
    title: "LogoForge AI vs LogoMakr — Which Logo Maker Wins?",
    description:
      "AI-generated unique logos in 30 seconds vs LogoMakr's manual drag-and-drop editor. Compare pricing, quality, and ease of use.",
    url: "https://generateailogo.com/vs/logomakr",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// FAQ data — covers the questions comparison shoppers actually ask
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "Does LogoMakr use AI to generate logos?",
    answer:
      "No. LogoMakr is a manual drag-and-drop editor — you select icons from their library, add text, arrange shapes, and adjust colors yourself. It does not generate logos automatically. LogoForge AI takes the opposite approach: describe your brand and style in a text prompt and the AI generates fully composed, unique logo designs for you in about 30 seconds.",
  },
  {
    question: "Is LogoMakr really free?",
    answer:
      "LogoMakr lets you create logos for free, but high-resolution PNG downloads cost a one-time $19 fee per logo. Low-resolution exports are free but not suitable for print or professional use. LogoForge AI gives you free credits on signup so you can generate multiple logos and download them at no cost with no watermark — no per-download fees.",
  },
  {
    question: "How long does it take to make a logo in LogoMakr vs LogoForge AI?",
    answer:
      "LogoMakr typically takes 20-40 minutes per logo because you manually place every element: search the icon library, position the icon, type and style your text, choose colors, and adjust the layout. LogoForge AI generates a polished logo in approximately 30 seconds from a text prompt. You enter your business name and style preference, and multiple unique logo variations appear instantly.",
  },
  {
    question: "Will my LogoMakr logo look unique?",
    answer:
      "This is LogoMakr's core limitation: everyone searches the same icon library and uses the same editor defaults, so logos tend to look similar — especially for common industries. Many businesses end up with nearly identical logos because they picked the same stock icon. LogoForge AI generates each logo uniquely using generative AI, so your output is one-of-a-kind and not assembled from a shared clip-art catalog.",
  },
  {
    question: "Which is cheaper for getting a professional logo?",
    answer:
      "LogoMakr charges $19 per high-resolution logo download. If you want to try multiple concepts (recommended for getting the right logo), costs add up quickly. LogoForge AI Pro is $4.90/month for unlimited AI logo generations — less than the cost of one LogoMakr hi-res download. The free tier also lets you generate and download several logos at no cost to try before committing.",
  },
  {
    question: "Do I need design experience to use LogoMakr or LogoForge AI?",
    answer:
      "LogoMakr requires at least basic design intuition — you need to make decisions about icon selection, font pairing, color harmony, and layout spacing. Mistakes in any of these areas lead to an unprofessional result. LogoForge AI requires no design experience at all: the AI handles composition, typography, color selection, and visual balance automatically from your text description.",
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
// Comparison table data — honest feature-by-feature breakdown
// ---------------------------------------------------------------------------
const COMPARISON_ROWS = [
  { feature: "Logo Creation Method", ours: "AI-generated from text prompt", theirs: "Manual drag-and-drop editor" },
  { feature: "Time to First Logo", ours: "~30 seconds (AI generation)", theirs: "20-40 minutes (manual assembly)" },
  { feature: "Uniqueness", ours: "Every logo is one-of-a-kind", theirs: "Shared icon library — similar logos common" },
  { feature: "Design Skills Needed", ours: "None — AI handles all design decisions", theirs: "Basic design skills required" },
  { feature: "AI Generation", ours: "Yes — generative AI core feature", theirs: "No — traditional clip-art editor" },
  { feature: "Free Tier", ours: "Free credits, no watermark, hi-res downloads", theirs: "Free low-res only (watermarked)" },
  { feature: "High-Res Downloads", ours: "Included with free credits and Pro plan", theirs: "$19 one-time fee per logo" },
  { feature: "Price (Pro / Unlimited)", ours: "$4.90/month — unlimited generations", theirs: "$19 per hi-res download (no subscription)" },
  { feature: "Style Categories", ours: "Minimalist, Tech, Luxury, Playful, and more", theirs: "None — you choose icons manually" },
  { feature: "Multiple Variations", ours: "Multiple AI variations per prompt", theirs: "One design at a time, manually adjusted" },
  { feature: "Output Quality", ours: "AI-composed, print-ready high-res PNG", theirs: "Low-res free / hi-res with $19 purchase" },
  { feature: "Design Freshness", ours: "Modern AI-generated aesthetic", theirs: "Dated clip-art aesthetic, circa 2015 UI" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsLogomakrPage() {
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
            vs LogoMakr
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            LogoMakr is a free manual drag-and-drop logo editor — no AI, no
            automation, just clip-art icons and text you arrange yourself.
            LogoForge AI generates unique, professional logos from a text prompt
            in 30 seconds, with no design experience required.
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
                icon: "\u{1F9E0}",
                title: "AI-Generated, Not Hand-Assembled",
                description:
                  "LogoMakr makes you search an icon library, place elements, pick fonts, and guess at color combinations. LogoForge AI composes the entire logo automatically — the AI makes every design decision from a single text prompt.",
              },
              {
                icon: "\u26A1",
                title: "30 Seconds vs 30 Minutes",
                description:
                  "The average LogoMakr session takes 20-40 minutes of manual editing. LogoForge AI generates multiple unique logo variations in about 30 seconds. Get a professional logo and move on to running your business.",
              },
              {
                icon: "\u{1F4B0}",
                title: "Free Hi-Res vs $19 Per Download",
                description:
                  "LogoMakr charges $19 for every high-resolution download. LogoForge AI includes hi-res downloads in the free tier credits. Pro is $4.90/month for unlimited generations — less than one LogoMakr hi-res export.",
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
                    LogoMakr
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
                  <span className="text-purple-400 shrink-0">&#10003;</span> A
                  unique AI-generated logo nobody else has
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  A professional logo in 30 seconds — no design work
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Hi-res downloads included in free credits
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Multiple AI variations to compare instantly
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Affordable $4.90/mo for unlimited logo generations
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">
                Consider LogoMakr if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span> Full
                  manual pixel-level control of every element
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  To browse and hand-pick icons from a library
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  A low-res free export and don&apos;t need print quality
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  Familiarity with drag-and-drop editors
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  A one-off logo with no ongoing subscription
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
              Stop Dragging Icons. Start Generating Logos.
            </h2>
            <p className="mt-3 text-gray-400">
              Free credits on signup. AI-generated unique logos in 30 seconds.
              No design experience required.
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
        <SeoCrossLinks currentCategory="vs" currentSlug="logomakr" />
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
    </>
  );
}
