/**
 * /vs/looka — SSR comparison page targeting "looka alternative"
 *
 * WHY THIS EXISTS:
 * "looka alternative" is a high-volume, high-intent keyword. Looka is the #1
 * competitor in AI logo generation (~$20-$129 per download). Users searching for
 * alternatives are bottom-of-funnel buyers actively comparing options. This page
 * targets those searchers with an honest feature comparison, transparent pricing,
 * and structured data for rich SERP results (FAQ snippets, breadcrumbs).
 *
 * SEO STRATEGY:
 * - Title targets "LogoForge AI vs Looka (2026)" for freshness signal
 * - Description targets "looka alternative" + price anchor
 * - FAQPage JSON-LD for featured snippet eligibility
 * - BreadcrumbList JSON-LD for breadcrumb rich results
 * - OpenGraph + Twitter cards for social sharing
 *
 * Originally created Builder 3, 2026-04-03. Rewritten 2026-04-04 with full
 * SEO metadata, BreadcrumbList schema, visible FAQ section, and /login CTA.
 *
 * force-dynamic: prevents SSG prerender crash under [locale] generateStaticParams.
 */

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";

const SITE_ORIGIN = "https://generateailogo.com";

export const metadata: Metadata = {
  title: "LogoForge AI vs Looka (2026) — Free AI Logo Generator Alternative",
  description:
    "Honest LogoForge AI vs Looka comparison: AI-generated logos from text prompts with free downloads vs Looka's wizard at $20-$129 per logo. Feature table, pricing, and FAQ.",
  keywords: [
    "looka alternative",
    "looka alternative free",
    "free AI logo generator",
    "AI logo maker comparison",
    "looka vs logoforge",
    "best logo maker 2026",
    "cheap logo design AI",
    "logo generator no watermark",
  ],
  alternates: { canonical: `${SITE_ORIGIN}/vs/looka` },
  openGraph: {
    title: "LogoForge AI vs Looka (2026) — Free AI Logo Alternative",
    description:
      "AI-generated logos from text prompts with free downloads vs Looka's wizard at $20-$129. See the pricing table and decide.",
    type: "website",
    url: `${SITE_ORIGIN}/vs/looka`,
    siteName: "LogoForge AI",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LogoForge AI vs Looka — 2026 comparison",
    description:
      "Free AI logos from text prompts vs Looka's $20-$129 download fees. Honest comparison table.",
  },
  robots: { index: true, follow: true },
};

/**
 * FAQ entries — used for both JSON-LD schema (rich snippets) and the visible
 * expandable FAQ section at the bottom of the page. Single source of truth
 * so the structured data and rendered content always match.
 */
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
      name: "Is LogoForge AI really free compared to Looka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. LogoForge AI includes free credits on signup for full-quality logo downloads with no watermark and no credit card required. Looka lets you design for free but charges $20-$129 to download usable high-resolution files.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI logo generation differ between LogoForge AI and Looka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LogoForge AI uses a text-to-logo approach powered by FLUX AI — describe your brand and get instant unique designs in about 10 seconds. Looka uses a guided wizard where you pick industry, icons, colors, and fonts from templates over 2-3 minutes. LogoForge AI is faster for exploration; Looka gives more template-based customization control.",
      },
    },
    {
      "@type": "Question",
      name: "Does Looka offer SVG files that LogoForge AI doesn't?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Looka's Premium plan ($65) includes SVG vector files. LogoForge AI outputs high-resolution PNG files suitable for digital use. For print production requiring vector formats, Looka has an advantage at the premium tier — though the per-logo cost is significantly higher.",
      },
    },
    {
      "@type": "Question",
      name: "Which is better for freelancers: LogoForge AI or Looka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For freelancers creating logos for multiple clients, LogoForge AI's subscription model ($4.90/month for unlimited logos) is dramatically cheaper than Looka's per-logo pricing ($20-$129 each). Creating logos for 5 clients costs $4.90 on LogoForge AI vs $100-$645 on Looka.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
    { "@type": "ListItem", position: 2, name: "LogoForge AI vs Looka", item: `${SITE_ORIGIN}/vs/looka` },
  ],
};

/**
 * Reusable comparison table row — keeps the feature table DRY and consistent.
 * "us" = LogoForge AI column, "them" = competitor column.
 */
function CompRow({ feature, us, them }: { feature: string; us: string; them: string }) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-2.5 px-4 text-sm text-gray-300">{feature}</td>
      <td className="py-2.5 px-4 text-sm text-center">{us}</td>
      <td className="py-2.5 px-4 text-sm text-center">{them}</td>
    </tr>
  );
}

export default function VsLookaPage() {
  return (
    <>
      {/* JSON-LD structured data for FAQ rich results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* JSON-LD breadcrumb for SERP breadcrumb display */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-gray-950 text-gray-200 px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {/* Breadcrumb navigation — matches the BreadcrumbList JSON-LD above */}
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
            {" / "}
            <span>vs Looka</span>
          </nav>

          {/* Hero — H1 includes primary keyword "Looka alternative" naturally */}
          <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full">
            Looka alternative — honest comparison — April 2026
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            LogoForge AI vs Looka: Free AI Logos vs $20-$129 Downloads
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Looking for a <strong className="text-white/80 font-semibold">Looka alternative</strong>?
            Looka is the most popular AI logo maker — used by millions. LogoForge AI takes a different
            approach: describe your brand in text, get AI-generated logo concepts in seconds, and
            download for free. Here&apos;s an honest side-by-side comparison.
          </p>

          {/* TL;DR summary box */}
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 mb-10">
            <h2 className="text-lg font-semibold text-violet-400 mb-2">TL;DR</h2>
            <p className="text-gray-300 leading-relaxed">
              <strong>Choose LogoForge AI</strong> for instant AI-generated logos from text prompts
              — free to try, fast exploration, unlimited logos from $4.90/month.{" "}
              <strong>Choose Looka</strong> if you want a guided wizard with templates, brand kit
              integration, and social media asset packages ($20-$129 per logo).
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
                  <th className="py-3 px-4 text-sm font-medium text-orange-400 text-center">Looka</th>
                </tr>
              </thead>
              <tbody>
                <CompRow feature="AI model" us="FLUX (text-to-logo)" them="Template wizard + AI" />
                <CompRow feature="Price" us="Free credits + $4.90/mo" them="$20-$129 per logo" />
                <CompRow feature="Free downloads" us="Yes (credits on signup)" them="No ($20+ to download)" />
                <CompRow feature="Generation speed" us="~10 seconds" them="~2-3 min (wizard)" />
                <CompRow feature="Customization" us="Prompt-based iteration" them="Color, font, layout controls" />
                <CompRow feature="Download formats" us="PNG (high-res)" them="PNG, SVG ($65+)" />
                <CompRow feature="Brand kit" us="Logo only" them="Logo + cards + social ($65-$129)" />
                <CompRow feature="Commercial rights" us="Yes (all plans)" them="Yes (all plans)" />
                <CompRow feature="Style variety" us="AI-generated (unlimited)" them="Template-based" />
                <CompRow feature="Revisions" us="Unlimited (subscription)" them="Revise before download" />
              </tbody>
            </table>
          </div>

          {/* Pricing comparison */}
          <h2 className="text-2xl font-bold text-white mb-4">Pricing Comparison</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
              <h3 className="font-semibold text-violet-400 mb-2">LogoForge AI</h3>
              <ul className="text-sm space-y-1">
                <li>Free: <strong className="text-green-400">3 logos (no card)</strong></li>
                <li>Starter: $4.90/month (unlimited)</li>
                <li>Pro: $9.90/month</li>
                <li>Annual: ~$59/year</li>
              </ul>
            </div>
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
              <h3 className="font-semibold text-orange-400 mb-2">Looka</h3>
              <ul className="text-sm space-y-1">
                <li>Free to explore designs</li>
                <li>Basic Logo: $20 (1 PNG)</li>
                <li>Premium Logo: $65 (SVG + variations)</li>
                <li>Brand Kit: $96/year subscription</li>
                <li>Brand Kit + Web: $129/year</li>
              </ul>
            </div>
          </div>

          {/* Where LogoForge AI wins */}
          <h2 className="text-2xl font-bold text-white mb-4">Where LogoForge AI Wins</h2>
          <div className="space-y-3 mb-8">
            {[
              ["Truly free downloads", "Generate and download logos with credits included at signup — full quality, no watermark. Looka lets you design all day but charges $20-$65 to download a usable file. You can't evaluate real output quality on Looka without paying."],
              ["Faster exploration", "Describe your brand in one sentence, get multiple logo concepts in 10 seconds. Looka's wizard takes 2-3 minutes of clicking through industry, icon, color, and font options before you see anything."],
              ["Subscription beats per-logo fees", "A freelancer creating logos for 5 clients pays $4.90/month on LogoForge AI vs $100-$325 on Looka. For anyone creating more than one logo, the subscription model wins decisively."],
              ["AI creativity without templates", "Every LogoForge AI logo is generated from scratch by AI — no templates, no limitations. Each design is unique to your prompt. Looka remixes the same template library for everyone."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-white/10 p-4">
                <h3 className="font-semibold text-violet-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>

          {/* Where Looka wins — honest about competitor strengths */}
          <h2 className="text-2xl font-bold text-white mb-4">Where Looka Wins</h2>
          <div className="space-y-3 mb-10">
            {[
              ["Brand kit ecosystem", "Looka's premium tiers include business cards, social media headers, email signatures, and a typography guide — a complete brand identity package. LogoForge AI focuses on logo generation only."],
              ["Fine-grained customization", "Looka lets you adjust colors, fonts, icon placement, and layout with precise controls. LogoForge AI relies on prompt-based iteration — powerful but less predictable for exact design preferences."],
              ["SVG vector output", "Looka's $65 Premium plan includes SVG files for unlimited scaling. LogoForge AI outputs high-resolution PNG — excellent for digital but not ideal for large-format print."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-white/10 p-4">
                <h3 className="font-semibold text-orange-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA — links to /login as the conversion entry point */}
          <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">
              Try LogoForge AI Free — No Credit Card
            </h2>
            <p className="text-gray-400 mb-6">
              3 free logo downloads included. Unlimited logos from $4.90/month. No per-logo fees.
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

          {/* Visible FAQ section — matches the FAQPage JSON-LD above for consistency */}
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
            Last updated April 2026. Looka pricing from their public pricing page.
          </p>
        </article>
      </main>
    </>
  );
}
