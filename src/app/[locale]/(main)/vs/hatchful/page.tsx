/**
 * /vs/hatchful — SSR comparison page targeting "hatchful alternative"
 *
 * WHY THIS EXISTS:
 * Shopify's Hatchful logo maker has been deprecated/sunset. Users searching
 * for "hatchful alternative" are actively looking for a replacement tool.
 * This page captures that high-intent migration traffic by positioning
 * LogoForge AI as the modern AI-powered successor to template-based logo
 * creation.
 *
 * SEO STRATEGY:
 * - Title targets "Best Hatchful Alternative" for replacement seekers
 * - Keywords target deprecated/sunset queries and free logo maker searches
 * - FAQPage + BreadcrumbList JSON-LD for rich snippet eligibility
 * - Honest positioning: Hatchful was free but limited; LogoForge AI is
 *   AI-generated, unique, and actively maintained
 *
 * force-dynamic: prevents SSG prerender crash under [locale] generateStaticParams.
 *
 * Created 2026-04-13 — SEO comparison pages initiative.
 */

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";

const SITE_ORIGIN = "https://generateailogo.com";

export const metadata: Metadata = {
  title: "Best Hatchful Alternative — LogoForge AI Logo Generator (2026)",
  description:
    "Looking for a Hatchful (Shopify) alternative? LogoForge AI generates unique logos with AI — not templates. Free credits, no design skills needed. Compare features and pricing.",
  keywords: [
    "hatchful alternative",
    "shopify logo maker alternative",
    "hatchful replacement",
    "hatchful vs AI logo generator",
    "free logo maker like hatchful",
    "hatchful shut down alternative",
    "AI logo generator free",
    "best free logo maker 2026",
    "logo generator no design skills",
    "hatchful discontinued",
  ],
  alternates: { canonical: `${SITE_ORIGIN}/vs/hatchful` },
  openGraph: {
    title: "LogoForge AI vs Hatchful — AI Logo Generation vs Templates",
    description:
      "Hatchful used templates. LogoForge AI uses generative AI. Free credits, unique logos, no design skills required.",
    url: `${SITE_ORIGIN}/vs/hatchful`,
    type: "website",
    siteName: "LogoForge AI",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LogoForge AI vs Hatchful — 2026 Logo Maker Comparison",
    description:
      "AI-generated unique logos vs template-based logo assembly. See which is better for your brand.",
  },
  robots: { index: true, follow: true },
};

/* ---------- FAQ data — rendered as JSON-LD + visible sections ---------- */

const FAQ_ITEMS = [
  {
    question: "What happened to Hatchful by Shopify?",
    answer:
      "Shopify deprecated Hatchful as part of its product line simplification. The tool is no longer actively maintained or accepting new signups. If you used Hatchful for logo creation, LogoForge AI is a modern AI-powered alternative that generates unique logos from text descriptions.",
  },
  {
    question: "Is LogoForge AI a good replacement for Hatchful?",
    answer:
      "Yes. LogoForge AI improves on Hatchful in key ways: it uses generative AI instead of templates, so every logo is unique. You describe your brand in words and the AI creates original designs — no browsing icon libraries or assembling templates. Free credits let you try before paying.",
  },
  {
    question: "Was Hatchful free? Is LogoForge AI free?",
    answer:
      "Hatchful was free to use but limited to its template library and a basic download. LogoForge AI gives you free credits at signup with no credit card required. Pro plans start at $4.90/month for unlimited AI-generated logos with full resolution downloads.",
  },
  {
    question: "How is AI logo generation different from template-based tools?",
    answer:
      "Template tools like Hatchful combine pre-made icons, fonts, and layouts — meaning thousands of businesses may use similar-looking logos. AI generation creates unique logos from your text description, making each output one-of-a-kind. The AI understands brand context, industry, and style preferences.",
  },
  {
    question: "Do I need design skills to use LogoForge AI?",
    answer:
      "No. Just type a description of your brand, business type, and style preferences. The AI generates multiple logo options. You can iterate by adjusting your description. No Photoshop, no Illustrator, no design experience needed.",
  },
  {
    question: "Can I download logos in high resolution?",
    answer:
      "Yes. Free credits include standard resolution downloads. Pro plans ($4.90/month) unlock high-resolution PNG and SVG downloads suitable for print, web, social media, and merchandise.",
  },
];

/* ---------- JSON-LD structured data ---------- */

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
    { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE_ORIGIN}/vs` },
    { "@type": "ListItem", position: 3, name: "vs Hatchful", item: `${SITE_ORIGIN}/vs/hatchful` },
  ],
};

/* ---------- Comparison table data ---------- */

const COMPARISON_ROWS = [
  { feature: "Technology", ours: "Generative AI (unique logos from text)", theirs: "Template assembly (icon + font + layout)" },
  { feature: "Logo Uniqueness", ours: "Every logo is AI-generated and unique", theirs: "Shared templates used by many businesses" },
  { feature: "Design Input", ours: "Text description of your brand", theirs: "Browse and select from icon library" },
  { feature: "Free Tier", ours: "Free credits, no credit card required", theirs: "Was free (now deprecated)" },
  { feature: "Pro Pricing", ours: "From $4.90/month unlimited", theirs: "N/A (discontinued)" },
  { feature: "Output Quality", ours: "AI-generated with style control", theirs: "Basic template combinations" },
  { feature: "Brand Kit", ours: "Logo files + color palette", theirs: "Limited brand package" },
  { feature: "SVG Download", ours: "Yes (Pro plan)", theirs: "Not available" },
  { feature: "Iteration Speed", ours: "Generate new variations in seconds", theirs: "Manual template browsing" },
  { feature: "Account Required", ours: "No (free credits without signup)", theirs: "Shopify account required" },
  { feature: "Active Development", ours: "Actively maintained and improved", theirs: "Deprecated / sunset" },
  { feature: "Industry Customization", ours: "AI understands industry context", theirs: "Generic categories only" },
];

/* ---------- Page component ---------- */

export default function VsHatchfulPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/vs" className="hover:text-white transition-colors">Comparisons</Link>
            </div>
          </div>
        </nav>

        {/* -- Hero -- */}
        <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
          <p className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-4">
            Hatchful Replacement
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Best{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hatchful Alternative
            </span>{" "}
            &mdash; LogoForge AI
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Shopify&apos;s Hatchful logo maker has been deprecated. LogoForge AI is a modern
            AI-powered alternative that generates unique logos from text descriptions &mdash;
            not templates. Free credits, no design skills needed.
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
                title: "AI-Generated, Not Templates",
                description:
                  "Hatchful assembled logos from a fixed icon library. LogoForge AI uses generative AI to create truly unique logos from your text description. Every output is one-of-a-kind.",
              },
              {
                title: "Still Free to Try",
                description:
                  "Like Hatchful, you can start for free. Get free credits at signup with no credit card required. Pro plans offer unlimited AI generations from $4.90/month.",
              },
              {
                title: "Actively Maintained",
                description:
                  "Hatchful was deprecated by Shopify. LogoForge AI is actively developed with regular model improvements, new style options, and ongoing feature updates.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* -- Comparison table -- */}
        <section id="comparison" className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900/80">
                  <th className="px-6 py-4 font-semibold text-gray-300">Feature</th>
                  <th className="px-6 py-4 font-semibold text-purple-400">LogoForge AI</th>
                  <th className="px-6 py-4 font-semibold text-gray-400">Hatchful (Shopify)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-800/50 ${i % 2 === 0 ? "bg-gray-900/30" : ""}`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-200">{row.feature}</td>
                    <td className="px-6 py-4 text-gray-100">{row.ours}</td>
                    <td className="px-6 py-4 text-gray-400">{row.theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* -- Migration guide -- */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Switching from Hatchful?</h2>
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
            <p className="text-gray-300 leading-relaxed mb-6">
              If you previously used Hatchful for logo creation, here is how to get started
              with LogoForge AI in under 2 minutes:
            </p>
            <ol className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">1</span>
                <span>Visit <strong className="text-white">generateailogo.com</strong> and describe your brand, industry, and style preferences.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">2</span>
                <span>Click generate. The AI creates multiple unique logo options in seconds — no template browsing needed.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">3</span>
                <span>Download your favorite. Free credits get you started. Upgrade to Pro ($4.90/mo) for unlimited generations and high-res SVG downloads.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* -- When to choose which -- */}
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Which Tool Is Right for You?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Choose LogoForge AI if:</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2"><span className="text-emerald-400 shrink-0">&#10003;</span> You want a unique, AI-generated logo (not templates)</li>
                <li className="flex gap-2"><span className="text-emerald-400 shrink-0">&#10003;</span> You need a tool that is actively maintained</li>
                <li className="flex gap-2"><span className="text-emerald-400 shrink-0">&#10003;</span> You want to iterate quickly with text descriptions</li>
                <li className="flex gap-2"><span className="text-emerald-400 shrink-0">&#10003;</span> You need SVG and high-resolution downloads</li>
                <li className="flex gap-2"><span className="text-emerald-400 shrink-0">&#10003;</span> Budget-friendly: free credits + $4.90/mo Pro</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-700 bg-gray-900/40 p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-4">Hatchful was good if:</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><span className="text-gray-500 shrink-0">&#10003;</span> You preferred browsing icon libraries over typing descriptions</li>
                <li className="flex gap-2"><span className="text-gray-500 shrink-0">&#10003;</span> You wanted a 100% free tool with no Pro tier</li>
                <li className="flex gap-2"><span className="text-gray-500 shrink-0">&#10003;</span> You were already in the Shopify ecosystem</li>
                <li className="flex gap-2"><span className="text-gray-500 shrink-0">&#10003;</span> <em>Note: Hatchful is no longer available for new users</em></li>
              </ul>
            </div>
          </div>
        </section>

        {/* -- FAQ section -- */}
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="rounded-xl border border-gray-800 bg-gray-900/40 p-6">
                <h3 className="text-base font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* -- Bottom CTA -- */}
        <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-12">
            <h2 className="text-3xl font-bold">Create Your Logo with AI &mdash; Free to Start</h2>
            <p className="mt-3 text-gray-400">
              No templates. No design skills. Just describe your brand and let AI create your logo.
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
            <p>&copy; {new Date().getFullYear()} LogoForge AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
              <a href="https://symplyai.io" target="_blank" rel="noopener" className="hover:text-gray-300 transition-colors">
                Powered by SymplyAI
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
