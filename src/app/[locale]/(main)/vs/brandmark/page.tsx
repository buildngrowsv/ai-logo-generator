/**
 * /vs/brandmark — SSR comparison page targeting "brandmark alternative"
 *
 * WHY THIS EXISTS:
 * Brandmark charges $25-$175 per single logo download. Users searching for
 * "brandmark alternative" are cost-sensitive buyers who want similar AI logo
 * quality without the per-logo pricing wall. LogoForge AI's subscription model
 * ($4.90/mo for unlimited logos) is a strong value proposition against
 * Brandmark's per-download pricing.
 *
 * SEO STRATEGY:
 * - Title: "LogoForge AI vs Brandmark (2026)" for freshness signal
 * - Description anchors on the price differential ($4.90/mo vs $25-$175 each)
 * - FAQPage JSON-LD targets "is brandmark worth it" search queries
 * - BreadcrumbList JSON-LD for SERP breadcrumb display
 * - Honest: acknowledge Brandmark's design quality and brand kit features
 *
 * Originally created Builder 3, 2026-04-03. Rewritten 2026-04-04 with full
 * SEO metadata, BreadcrumbList, OG/Twitter, visible FAQ, and /login CTA.
 *
 * force-dynamic: prevents SSG prerender crash under [locale] generateStaticParams.
 */

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";

const SITE_ORIGIN = "https://generateailogo.com";

export const metadata: Metadata = {
  title: "LogoForge AI vs Brandmark (2026) — Unlimited AI Logos at $4.90/mo vs $25-$175 Each",
  description:
    "Compare LogoForge AI and Brandmark: unlimited AI logos for $4.90/mo vs $25-$175 per logo download. Freelancers and agencies save 80-97%. Feature table, pricing, and FAQ.",
  keywords: [
    "brandmark alternative",
    "brandmark alternative cheaper",
    "brandmark vs logoforge",
    "AI logo generator unlimited",
    "cheap AI logo maker",
    "is brandmark worth it",
    "brandmark pricing too expensive",
    "logo maker subscription",
  ],
  alternates: { canonical: `${SITE_ORIGIN}/vs/brandmark` },
  openGraph: {
    title: "LogoForge AI vs Brandmark (2026) — $4.90/mo vs $25-$175 per Logo",
    description:
      "Unlimited AI logo generation for $4.90/month vs Brandmark's $25-$175 per download. Feature comparison and honest pros/cons.",
    type: "website",
    url: `${SITE_ORIGIN}/vs/brandmark`,
    siteName: "LogoForge AI",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LogoForge AI vs Brandmark — 2026 comparison",
    description:
      "Unlimited AI logos at $4.90/mo vs $25-$175 per download. Honest feature comparison.",
  },
  robots: { index: true, follow: true },
};

type FaqEntry = {
  "@type": "Question";
  name: string;
  acceptedAnswer: { "@type": "Answer"; text: string };
};

const faqJsonLd: { "@context": string; "@type": "FAQPage"; mainEntity: FaqEntry[] } = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is LogoForge AI cheaper than Brandmark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Significantly. Brandmark charges $25-$175 per logo download. LogoForge AI offers unlimited logos starting at $4.90/month. A freelancer creating 12 logos per year pays ~$59 on LogoForge AI vs $300-$2,100 on Brandmark — savings of 80-97%.",
      },
    },
    {
      "@type": "Question",
      name: "Can I try LogoForge AI without paying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. LogoForge AI gives you 3 free logo downloads — full quality, no watermark, no credit card required. Brandmark lets you design logos for free but requires $25+ to download any usable file.",
      },
    },
    {
      "@type": "Question",
      name: "Which produces better logo designs: LogoForge AI or Brandmark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brandmark is known for clean, polished typography and professionally composed logos. LogoForge AI generates more creative and varied designs from text prompts using FLUX AI. For a single premium logo, Brandmark's output tends to be more refined. For exploring multiple creative directions quickly, LogoForge AI excels.",
      },
    },
    {
      "@type": "Question",
      name: "Which is better for agencies: LogoForge AI or Brandmark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LogoForge AI's subscription model is dramatically better for agencies. Creating logos for 10 clients costs $4.90/month total on LogoForge AI vs $250-$1,750 on Brandmark. That's 80-97% savings with unlimited iterations per client.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
    { "@type": "ListItem", position: 2, name: "LogoForge AI vs Brandmark", item: `${SITE_ORIGIN}/vs/brandmark` },
  ],
};

function CompRow({ feature, us, them }: { feature: string; us: string; them: string }) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-2.5 px-4 text-sm text-gray-300">{feature}</td>
      <td className="py-2.5 px-4 text-sm text-center">{us}</td>
      <td className="py-2.5 px-4 text-sm text-center">{them}</td>
    </tr>
  );
}

export default function VsBrandmarkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-gray-950 text-gray-200 px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {/* Breadcrumb nav */}
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
            {" / "}
            <span>vs Brandmark</span>
          </nav>

          {/* Hero */}
          <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full">
            Brandmark alternative — honest comparison — April 2026
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            LogoForge AI vs Brandmark: Unlimited AI Logos at $4.90/mo vs $25-$175 per Download
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Brandmark creates beautiful AI logos — then charges <strong className="text-white/80 font-semibold">$25-$175
            to download one</strong>. LogoForge AI gives you unlimited logos for $4.90/month. If you
            need a single premium logo and budget is not a concern, Brandmark delivers quality. If
            you&apos;re a freelancer or agency creating logos regularly, the math is not close.
          </p>

          {/* TL;DR */}
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 mb-10">
            <h2 className="text-lg font-semibold text-violet-400 mb-2">TL;DR</h2>
            <p className="text-gray-300 leading-relaxed">
              <strong>Choose LogoForge AI</strong> for unlimited logos at $4.90/month — ideal for
              freelancers, agencies, and serial launchers who need multiple logos.{" "}
              <strong>Choose Brandmark</strong> if you need one premium logo with a full brand kit
              (business cards, social headers, typography guide) and are willing to pay $65-$175.
            </p>
          </div>

          {/* Feature comparison table */}
          <h2 className="text-2xl font-bold text-white mb-4">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-lg border border-white/10 mb-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Feature</th>
                  <th className="py-3 px-4 text-sm font-medium text-violet-400 text-center">LogoForge AI</th>
                  <th className="py-3 px-4 text-sm font-medium text-cyan-400 text-center">Brandmark</th>
                </tr>
              </thead>
              <tbody>
                <CompRow feature="AI model" us="FLUX (text-to-logo)" them="Wizard-based + AI assist" />
                <CompRow feature="Pricing model" us="Subscription ($4.90-$9.90/mo)" them="Per-logo ($25/$65/$175)" />
                <CompRow feature="Free downloads" us="Yes (3 logos, no card)" them="No (design free, pay to download)" />
                <CompRow feature="Generation speed" us="~10 seconds" them="2-3 minutes (wizard)" />
                <CompRow feature="Download formats" us="PNG (high-res)" them="PNG, SVG, PDF, EPS" />
                <CompRow feature="Color customization" us="Prompt-based" them="AI color suggestions + manual" />
                <CompRow feature="Font pairing" us="AI-selected" them="Typography guide included" />
                <CompRow feature="Brand guide" us="Logo only" them="$65 Designer / $175 Enterprise" />
                <CompRow feature="Business card mockups" us="Not included" them="Enterprise tier ($175)" />
                <CompRow feature="Social media kit" us="Not included" them="Enterprise tier ($175)" />
                <CompRow feature="Commercial license" us="Yes (all plans)" them="Yes (all plans)" />
                <CompRow feature="Revisions" us="Unlimited (subscription)" them="Revise until satisfied, pay once" />
              </tbody>
            </table>
          </div>

          {/* Pricing */}
          <h2 className="text-2xl font-bold text-white mb-4">Pricing Comparison</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
              <h3 className="font-semibold text-violet-400 mb-2">LogoForge AI</h3>
              <ul className="text-sm space-y-1">
                <li>Free: <strong className="text-green-400">3 logos (no card)</strong></li>
                <li>Starter: $4.90/month (unlimited)</li>
                <li>Pro: $9.90/month</li>
                <li>Annual: ~$59/year</li>
              </ul>
            </div>
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
              <h3 className="font-semibold text-cyan-400 mb-2">Brandmark</h3>
              <ul className="text-sm space-y-1">
                <li>Free to design, pay to download</li>
                <li>Basic: $25 (1 PNG logo)</li>
                <li>Designer: $65 (SVG + variations)</li>
                <li>Enterprise: $175 (full brand kit)</li>
              </ul>
            </div>
          </div>

          {/* Cost comparison scenario */}
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5 mb-10">
            <h3 className="text-lg font-semibold text-white mb-3">Cost Scenario: Freelancer Creating 12 Logos/Year</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-gray-400">Scenario</th>
                    <th className="py-2 px-3 text-violet-400 text-center">LogoForge AI</th>
                    <th className="py-2 px-3 text-cyan-400 text-center">Brandmark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 text-gray-300">12 basic logos</td>
                    <td className="py-2 px-3 text-center">$59/year</td>
                    <td className="py-2 px-3 text-center text-gray-400">$300/year</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3 text-gray-300">12 premium logos</td>
                    <td className="py-2 px-3 text-center">$59/year</td>
                    <td className="py-2 px-3 text-center text-gray-400">$780/year</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-300">12 logos + brand kits</td>
                    <td className="py-2 px-3 text-center">$59/year</td>
                    <td className="py-2 px-3 text-center text-gray-400">$2,100/year</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">LogoForge AI subscription covers unlimited logos. Brandmark charges per download.</p>
          </div>

          {/* Where LogoForge AI wins */}
          <h2 className="text-2xl font-bold text-white mb-4">Where LogoForge AI Wins</h2>
          <div className="space-y-3 mb-8">
            {[
              ["Unlimited logos for $4.90/month", "Brandmark charges per logo. A freelancer creating logos for 3 clients/month pays $75-$195/month on Brandmark vs $4.90 on LogoForge AI. For agencies and serial launchers, the subscription model saves 80-97%."],
              ["Free downloads without paywall tricks", "LogoForge AI gives 3 free full-quality downloads with no watermark. Brandmark lets you design all day but will not let you download without paying $25+. You cannot evaluate real output quality on Brandmark without spending money."],
              ["Speed of exploration", "Type your brand description, get multiple logo concepts in 10 seconds. Brandmark's wizard (industry, keywords, styles, colors) takes 2-3 minutes before you see results. For rapid client mockups and iteration, speed matters."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-white/10 p-4">
                <h3 className="font-semibold text-violet-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>

          {/* Where Brandmark wins */}
          <h2 className="text-2xl font-bold text-white mb-4">Where Brandmark Wins</h2>
          <div className="space-y-3 mb-10">
            {[
              ["Design polish and typography", "Brandmark's logos have cleaner typography, better spacing, and more professionally composed layouts. If you are creating ONE logo for a brand you will use for years, paying $65 for a polished result can make sense."],
              ["Full brand kit at $175", "The Enterprise tier includes business cards, social media headers, letterheads, and a typography guide — a complete brand identity package. LogoForge AI generates logos only."],
              ["File format variety", "Brandmark provides EPS and PDF alongside PNG and SVG. For print production and professional pre-press workflows, EPS is often a requirement. LogoForge AI covers digital use cases well with high-resolution PNG."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-white/10 p-4">
                <h3 className="font-semibold text-cyan-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">
              Generate Your Logo Free — No Credit Card
            </h2>
            <p className="text-gray-400 mb-6">
              3 free logo downloads included. Unlimited logos from $4.90/month. No per-logo fees — ever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="inline-block px-8 py-3 font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
              >
                Create Your Logo Free
              </Link>
              <Link
                href="/pricing"
                className="inline-block px-8 py-3 font-semibold border border-white/10 rounded-lg hover:bg-white/5 transition"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Visible FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {(faqJsonLd.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>).map((faq, i) => (
                <details key={i} className="group border border-white/10 rounded-lg">
                  <summary className="p-4 cursor-pointer font-medium hover:bg-white/5 transition flex items-center justify-between">
                    {faq.name}
                    <span className="text-white/40 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">{faq.acceptedAnswer.text}</div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-gray-500 text-center">
            Last updated April 2026. Brandmark pricing from their public pricing page.
          </p>
        </article>
      </main>
    </>
  );
}
