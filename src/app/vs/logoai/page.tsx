/**
 * src/app/vs/logoai/page.tsx — LogoForge AI vs Logo AI comparison page
 *
 * SEO STRATEGY:
 * Targets "logo ai alternative", "logoai pricing", "logo.com alternative",
 * "logoai vs AI logo generator", and "logoai review 2026" queries.
 * LogoAI (logoai.com / logo.com) is a heavily-searched AI logo brand —
 * users landing here are evaluating whether to pay $29+ for a single
 * logo file or get ongoing AI generation for $4.90/mo with free credits.
 *
 * KEY DIFFERENTIATOR:
 * LogoAI charges $29 for its basic package, which does NOT include editable
 * source files. The premium tier runs $59 and the brand kit is $99+.
 * LogoForge AI gives free credits on signup with hi-res downloads included,
 * and Pro is $4.90/month for unlimited generations — less than 1/6th the
 * cost of a single LogoAI basic logo purchase.
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
  title: "LogoForge AI vs Logo AI — Best Logo AI Alternative in 2026",
  description:
    "Compare LogoForge AI with LogoAI (logo.com). 3 free logos, $4.90/mo unlimited vs $29+ per logo download. See pricing, features, and output quality differences.",
  keywords: [
    "logo ai alternative",
    "logoai pricing",
    "logo.com alternative",
    "logoai vs AI logo generator",
    "free logo ai alternative",
    "AI logo generator free",
    "logoforge vs logoai",
    "best AI logo generator 2026",
    "cheap logoai alternative",
    "logo ai review 2026",
  ],
  alternates: {
    canonical: "https://generateailogo.com/vs/logoai",
  },
  openGraph: {
    title: "LogoForge AI vs Logo AI — Which AI Logo Maker Wins?",
    description:
      "3 free logos and $4.90/mo unlimited vs $29–$99 per Logo AI purchase. Compare features, output quality, and value.",
    url: "https://generateailogo.com/vs/logoai",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// FAQ data — covers the questions comparison shoppers actually ask
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "Is there a free alternative to Logo AI?",
    answer:
      "Yes — LogoForge AI gives you 3 free logo generations on signup with no watermark and hi-res downloads included. Logo AI (logoai.com) requires you to pay $29 at minimum before you can download any usable file. With LogoForge AI you can generate, compare, and download multiple AI logos before spending a single dollar.",
  },
  {
    question: "Why is Logo AI so expensive for just a basic logo?",
    answer:
      "Logo AI's $29 basic package is priced as a one-time purchase for a single logo — it doesn't include editable source files, which are locked behind the $59 premium tier or higher. If you want to iterate on your brand or try multiple concepts, costs multiply fast. LogoForge AI's $4.90/month Pro plan gives you unlimited AI logo generations, so you can try 20 concepts for the price Logo AI charges for one.",
  },
  {
    question: "How does Logo AI compare to LogoForge AI in output quality?",
    answer:
      "Logo AI uses AI to compose logos from a curated style system, producing results that can feel templated when many businesses use the same platform. LogoForge AI uses generative AI to produce one-of-a-kind logos — each output is unique to your text prompt and style selection. Both produce professional-grade outputs, but LogoForge AI offers more creative variation and uniqueness per generation.",
  },
  {
    question: "Does Logo AI offer a subscription plan?",
    answer:
      "Logo AI is primarily a one-time purchase model: you pay per logo ($29 basic, $59 premium, $99 brand kit). There is no monthly subscription that gives you ongoing unlimited generations. LogoForge AI operates on a subscription model — $4.90/month for the Basic plan (unlimited generations) — making it far more cost-effective for businesses that need to iterate on their brand over time.",
  },
  {
    question: "Can I get source files from Logo AI on the basic plan?",
    answer:
      "No. Logo AI's $29 basic package does not include editable source files (SVG or AI formats). You'd need to upgrade to the $59 premium package to get vector source files. LogoForge AI includes downloadable hi-res PNG files in the free tier and full-format downloads with paid plans — no hidden tier upgrades required to get usable files.",
  },
  {
    question: "Which is better for a small business — Logo AI or LogoForge AI?",
    answer:
      "For most small businesses, LogoForge AI offers better value. You can generate multiple logo concepts for free to find the right fit, then pay $4.90/month if you want ongoing access — less than the cost of Logo AI's cheapest single logo download. LogoForge AI also lets you iterate as your business evolves without paying per revision, which matters when your branding needs to grow with you.",
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
  { feature: "Pricing Model", ours: "$4.90/mo unlimited (subscription)", theirs: "$29–$99 one-time per logo (no subscription)" },
  { feature: "Free Tier", ours: "3 free logos, hi-res, no watermark", theirs: "No free downloads — must purchase first" },
  { feature: "Editable Source Files", ours: "Included with paid plans", theirs: "$59 premium tier required (not in $29 basic)" },
  { feature: "Logo Generation Method", ours: "Generative AI from text prompt", theirs: "AI composition from curated style system" },
  { feature: "Uniqueness of Output", ours: "One-of-a-kind generative output per prompt", theirs: "Template-influenced — similar styles across users" },
  { feature: "Unlimited Iterations", ours: "Yes — unlimited on $4.90/mo Pro plan", theirs: "No — pay per logo; no iteration subscription" },
  { feature: "Social Media Kit", ours: "Included with paid plans", theirs: "Locked behind $99 brand kit tier" },
  { feature: "Hi-Res Downloads", ours: "Included in free credits and all paid tiers", theirs: "Included, but only after purchase ($29+)" },
  { feature: "Style Control", ours: "Text prompt + style categories (Minimalist, Tech, etc.)", theirs: "Style filters applied during AI generation" },
  { feature: "Multiple Variations", ours: "Multiple AI variations per generation", theirs: "Limited variations; must regenerate with new prompts" },
  { feature: "Cost for 5 Logo Concepts", ours: "Free (5 × free credits) or $4.90/mo", theirs: "$145+ ($29 × 5 basic purchases)" },
  { feature: "Brand Kit", ours: "Available on Pro plan at $4.90/mo", theirs: "$99 one-time brand kit tier required" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsLogoAiPage() {
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
            vs Logo AI
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Logo AI (logoai.com) charges $29–$99 per logo with no subscription
            and no editable files on the basic plan. LogoForge AI gives you 3
            free logos to start, then unlimited AI generations for $4.90/month
            — less than a sixth of Logo AI&apos;s cheapest purchase.
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
                icon: "\uD83C\uDF89",
                title: "3 Free Logos Before You Pay Anything",
                description:
                  "Logo AI makes you pay $29 minimum before downloading a single usable file. LogoForge AI gives you 3 free logo generations with hi-res downloads and no watermark — so you can see the quality and pick the right direction before committing a cent.",
              },
              {
                icon: "\uD83D\uDCB8",
                title: "$4.90/mo vs $29+ Per Logo",
                description:
                  "Logo AI's one-time purchase model means every concept costs money. Need to explore 5 logo directions? That's $145+ on Logo AI. With LogoForge AI Pro at $4.90/month, you can generate and regenerate unlimited concepts — iterate freely without paying per attempt.",
              },
              {
                icon: "\u2728",
                title: "Truly Generative — Not Template-Constrained",
                description:
                  "Logo AI composes logos within a curated style system that many businesses share. LogoForge AI's generative AI produces a unique logo from your exact text prompt every time — no two outputs are the same, and no other business gets your logo.",
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
                    Logo AI
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
                  <span className="text-purple-400 shrink-0">&#10003;</span> 3
                  free logos to evaluate quality before paying
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Unlimited AI logo iterations for $4.90/month
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Truly generative AI — unique output per prompt
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Multiple variations to compare before downloading
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  A cost-effective subscription for ongoing brand needs
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">
                Consider Logo AI if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span> A
                  one-time purchase you own permanently with no subscription
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  Logo AI&apos;s specific curated style system and brand aesthetic
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  A full brand kit in a single platform purchase ($99 tier)
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  You only ever need one logo and won&apos;t iterate further
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  A social media kit bundled in a brand package
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
              Why Pay $29 Per Logo? Start Free.
            </h2>
            <p className="mt-3 text-gray-400">
              3 free AI-generated logos on signup. Unlimited generations from
              $4.90/month. No per-logo fees, no watermarks, no waiting.
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
        <SeoCrossLinks currentCategory="vs" currentSlug="logoai" />
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
