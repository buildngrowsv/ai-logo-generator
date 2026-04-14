/**
 * src/app/vs/looka/page.tsx — LogoForge AI vs Looka comparison page
 *
 * SEO STRATEGY:
 * Targets "looka alternative", "looka vs AI logo generator", "looka pricing
 * alternative" queries. Looka is a well-known AI-powered logo and brand kit
 * platform that charges $20-$96 per logo. Users comparing Looka alternatives
 * are high-intent — they want an AI logo generator but are evaluating whether
 * Looka's one-time pricing model or a subscription model is better value.
 *
 * KEY DIFFERENTIATOR:
 * Looka uses AI to generate logos but monetizes through one-time purchases
 * ($20 for low-res, $65-$96 for full brand kit). LogoForge AI uses a credit
 * and subscription model starting at $4.90/month for unlimited generations,
 * which is better for users who need multiple logos or want to iterate.
 *
 * STRUCTURED DATA:
 * FAQPage JSON-LD for rich snippet eligibility.
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
  title: "LogoForge AI vs Looka — AI Logo Generator Comparison",
  description:
    "Compare LogoForge AI with Looka for AI logo generation. Affordable subscription vs one-time purchase. See pricing, features, and output quality differences.",
  keywords: [
    "looka alternative",
    "looka vs AI logo generator",
    "looka pricing alternative",
    "cheap AI logo generator",
    "best logo AI tool",
    "looka competitor",
    "AI logo maker comparison",
  ],
  alternates: {
    canonical: "https://generateailogo.com/vs/looka",
  },
  openGraph: {
    title: "LogoForge AI vs Looka — Which AI Logo Generator Is Better Value?",
    description:
      "Affordable subscription vs premium one-time pricing. Compare AI logo quality, features, and total cost.",
    url: "https://generateailogo.com/vs/looka",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// FAQ data — addresses Looka-specific pricing and quality concerns
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "How does Looka's pricing work?",
    answer:
      "Looka charges per logo purchase: $20 for a Basic Logo Package (low-res PNG only), $65 for a Premium Package (high-res files + social media templates), and $96 for an Enterprise Package (full brand kit with business card designs). LogoForge AI offers free credits to try, then $4.90/month for unlimited logo generations — no per-logo fees.",
  },
  {
    question: "Is LogoForge AI free to use?",
    answer:
      "Yes. LogoForge AI gives you free credits on signup to generate multiple logos without paying. Looka lets you design logos for free but requires a purchase ($20+) to download any logo file, even in low resolution.",
  },
  {
    question: "Which produces better AI logos?",
    answer:
      "Both use AI to generate logos, but with different approaches. Looka uses AI to combine icons, fonts, and colors based on your preferences — the output is polished and consistent. LogoForge AI uses generative AI (FLUX model) to create logos from scratch, producing more creative and unique results. Looka's logos tend to look more predictable; LogoForge AI's tend to be more distinctive.",
  },
  {
    question: "Can I iterate on my logo design?",
    answer:
      "This is where pricing models matter most. With Looka, every significant change means potentially paying for a new logo package. With LogoForge AI's subscription, you can generate unlimited variations, try different styles, and experiment freely because you are not paying per logo.",
  },
  {
    question: "Does Looka offer a brand kit?",
    answer:
      "Yes, Looka's higher tiers ($65-$96) include a brand kit with business card templates, social media assets, and brand guidelines. LogoForge AI focuses purely on logo generation at a lower price point. If you need a full brand identity package, Looka offers more. If you just need great logos, LogoForge AI is more cost-effective.",
  },
  {
    question: "Which is better for startups on a budget?",
    answer:
      "For budget-conscious startups, LogoForge AI is the clear choice. At $4.90/month with unlimited generations, you can create logos for your main brand, sub-brands, side projects, and marketing experiments without worrying about per-logo costs. A single Looka logo at $20 (low-res only) costs more than a full month of LogoForge AI Pro.",
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
  { feature: "AI Technology", ours: "Generative AI (FLUX model)", theirs: "AI-assisted icon + font combination" },
  { feature: "Logo Uniqueness", ours: "Fully generated from scratch", theirs: "Assembled from curated elements" },
  { feature: "Free Tier", ours: "Free credits, downloadable", theirs: "Design free, pay $20+ to download" },
  { feature: "Pro Price", ours: "$4.90/month unlimited", theirs: "$20-$96 per logo package" },
  { feature: "Iterations", ours: "Unlimited with subscription", theirs: "New purchase per major change" },
  { feature: "Style Categories", ours: "Minimalist, Tech, Luxury, Playful, etc.", theirs: "Industry-based suggestions" },
  { feature: "Brand Kit", ours: "Logo generation focused", theirs: "Business cards, social templates ($65+)" },
  { feature: "Output Formats", ours: "High-res PNG", theirs: "PNG, SVG, EPS (varies by tier)" },
  { feature: "Time to First Logo", ours: "~30 seconds", theirs: "2-5 minutes (questionnaire + generation)" },
  { feature: "Account Required", ours: "Free credits available on signup", theirs: "Required to save or buy designs" },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function VsLookaPage() {
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
            vs Looka
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Looka charges $20-$96 per logo download. LogoForge AI gives you
            unlimited AI-generated logos for $4.90/month. Both use AI — the
            difference is how you pay and how unique the results are.
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
                icon: "\u{1F4B8}",
                title: "No Per-Logo Fees",
                description:
                  "Looka charges $20 for a basic logo, $65-$96 for premium packages. LogoForge AI Pro is $4.90/month with unlimited generations — create as many logos as you need without watching a meter.",
              },
              {
                icon: "\u{1F504}",
                title: "Iterate Without Cost",
                description:
                  "With Looka, major revisions can mean purchasing again. With LogoForge AI, generate unlimited variations across different styles until you find the perfect logo for your brand.",
              },
              {
                icon: "\u{1F3A8}",
                title: "Truly Generative AI",
                description:
                  "Looka assembles logos from curated icons, fonts, and layouts. LogoForge AI uses generative AI (FLUX) to create logos from scratch, resulting in more distinctive and creative designs.",
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
                    Looka
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
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Unlimited logo generations for one monthly fee
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Freedom to iterate without additional cost
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Truly unique AI-generated logos (not assembled)
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Budget-friendly at $4.90/month
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 shrink-0">&#10003;</span>{" "}
                  Free credits to try before subscribing
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">
                Choose Looka if you want:
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span> A
                  full brand identity kit (business cards, social)
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  One-time purchase with no recurring fees
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  Vector file formats (SVG, EPS)
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  Polished, predictable logo aesthetics
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500 shrink-0">&#10003;</span>{" "}
                  Industry-specific design suggestions
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
              Unlimited AI Logos for Less Than One Looka Download
            </h2>
            <p className="mt-3 text-gray-400">
              Free credits to start. $4.90/month for unlimited. No per-logo
              fees, ever.
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
