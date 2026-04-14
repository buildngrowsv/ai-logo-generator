/**
 * src/app/vs/canva/page.tsx — LogoForge AI vs Canva Logo Maker comparison page
 *
 * SEO STRATEGY:
 * Targets "canva logo maker alternative", "canva logo generator vs AI",
 * "AI logo generator vs canva" queries. Canva is a household name in design
 * tools. Users searching "canva logo" alternatives are high-intent because
 * they already want a logo and are evaluating whether Canva's template
 * approach or a dedicated AI generator is better for their use case.
 *
 * KEY DIFFERENTIATOR:
 * Canva Logo Maker uses templates that users customize manually. LogoForge AI
 * generates unique logos with AI based on a business name and style preference,
 * meaning every output is one-of-a-kind rather than a rearrangement of shared
 * template elements that thousands of other businesses also use.
 *
 * STRUCTURED DATA:
 * FAQPage JSON-LD for rich snippet eligibility on comparison queries.
 *
 * MIDDLEWARE NOTE:
 * /vs/ is excluded from next-intl middleware — see middleware.ts matcher.
 *
 * SEO comparison page initiative, 2026-04-06
 */

import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "LogoForge AI vs Canva Logo Maker — AI Logo Generator Comparison",
  description:
    "Compare LogoForge AI with Canva Logo Maker. AI-generated unique logos vs template-based designs. See pricing, features, and quality differences.",
  keywords: [
    "canva logo maker alternative",
    "canva logo generator vs AI",
    "AI logo generator free",
    "canva vs logoforge",
    "best AI logo generator",
    "logo maker comparison",
    "canva alternative for logos",
  ],
  alternates: {
    canonical: "https://generateailogo.com/vs/canva",
  },
  openGraph: {
    title: "LogoForge AI vs Canva — Which Logo Maker Is Better?",
    description:
      "AI-generated unique logos vs Canva templates. Compare pricing, quality, and ease of use for logo design.",
    url: "https://generateailogo.com/vs/canva",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// FAQ data — covers the questions comparison shoppers actually ask
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "Does Canva have an AI logo generator?",
    answer:
      "Canva offers a logo maker that uses pre-designed templates. Users pick a template, then customize colors, fonts, and icons. While Canva has added some AI features to its broader platform, the logo maker is still primarily template-driven. LogoForge AI generates completely unique logos from scratch using AI based on your business name and style preferences.",
  },
  {
    question: "Is LogoForge AI free to use?",
    answer:
      "Yes. LogoForge AI gives you free credits on signup so you can generate several logos at no cost with no watermarks. Canva's free tier also lets you create logos, but many premium template elements require a Canva Pro subscription ($12.99/month).",
  },
  {
    question: "Will my logo look like someone else's with Canva?",
    answer:
      "This is Canva's main limitation for logos. Since Canva templates are shared among millions of users, it is possible for two businesses to have very similar logos. LogoForge AI generates each logo uniquely using AI, so your logo is one-of-a-kind by default.",
  },
  {
    question: "Which is cheaper for logo creation?",
    answer:
      "Canva Free lets you use basic templates at no cost, and Canva Pro costs $12.99/month for the full suite (design, presentations, social media, AND logos). LogoForge AI Pro is $4.90/month for unlimited AI logo generations. If you only need logos, LogoForge AI is more affordable. If you need an entire design suite, Canva Pro offers more breadth.",
  },
  {
    question: "Can I get high-resolution logo files?",
    answer:
      "Both tools offer high-resolution downloads. Canva Pro provides SVG and transparent PNG exports. LogoForge AI delivers high-resolution PNG files ready for web and print use. For vector formats, Canva currently has the edge.",
  },
  {
    question: "Do I need design skills to use either tool?",
    answer:
      "Neither requires design skills. However, Canva's template approach still requires you to make design decisions (font pairing, color selection, layout adjustments). LogoForge AI handles all of that automatically — just enter your business name, pick a style category, and the AI does the rest.",
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
  { feature: "Logo Creation Method", ours: "AI-generated from text prompt", theirs: "Template customization" },
  { feature: "Uniqueness", ours: "Every logo is one-of-a-kind", theirs: "Shared templates across users" },
  { feature: "Design Skills Needed", ours: "None — AI handles design", theirs: "Minimal — but layout/font choices required" },
  { feature: "Price (Free)", ours: "Free credits, no watermark", theirs: "Free with limited elements" },
  { feature: "Price (Pro)", ours: "$4.90/month (logos only)", theirs: "$12.99/month (full design suite)" },
  { feature: "Style Categories", ours: "Minimalist, Tech, Luxury, Playful, etc.", theirs: "Browse by industry/theme" },
  { feature: "Output Format", ours: "High-res PNG", theirs: "PNG, JPG, SVG (Pro)" },
  { feature: "Brand Kit", ours: "Logo generation focused", theirs: "Full brand kit (colors, fonts, templates)" },
  { feature: "Other Design Tools", ours: "Logo only (purpose-built)", theirs: "Presentations, social media, videos, docs" },
  { feature: "Time to First Logo", ours: "~30 seconds (AI generation)", theirs: "5-15 minutes (browsing + customizing)" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsCanvaPage() {
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
            vs Canva Logo Maker
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Canva is a powerful all-in-one design platform with a template-based
            logo maker. LogoForge AI is a dedicated AI logo generator that
            creates unique logos from scratch in seconds — no templates, no
            shared designs.
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
                title: "AI-Generated, Not Templated",
                description:
                  "Canva logos start from shared templates that millions of users access. LogoForge AI generates each logo uniquely using AI, so your brand identity is truly yours.",
              },
              {
                icon: "\u26A1",
                title: "30 Seconds to a Logo",
                description:
                  "No browsing templates, no adjusting layouts. Type your business name, pick a style, and get multiple unique logo variations in about 30 seconds.",
              },
              {
                icon: "\u{1F4B0}",
                title: "$4.90/mo vs $12.99/mo",
                description:
                  "If you only need logos, LogoForge AI Pro costs less than half of Canva Pro. Pay for what you actually use instead of a full design suite you may not need.",
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
                    Canva Logo Maker
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
                  Logo in 30 seconds without design decisions
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Affordable $4.90/mo pricing for unlimited logos
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Multiple style categories (Minimalist, Tech, Luxury, etc.)
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Free credits to try without commitment
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">
                Choose Canva if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span> A
                  full design suite (presentations, social, video)
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  Manual control over every design element
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span> SVG
                  vector logo exports
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  Complete brand kit management (colors, fonts)
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span> Team
                  collaboration features
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
              Try the Logo Generator That Creates, Not Copies
            </h2>
            <p className="mt-3 text-gray-400">
              Free credits on signup. AI-generated unique logos. Your brand,
              nobody else&apos;s.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Try LogoForge AI Free
            </Link>
          </div>
        </section>

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
