/**
 * /vs/canva — SSR comparison page targeting "canva logo maker alternative"
 *
 * WHY THIS EXISTS:
 * Canva is a household name with a built-in logo maker (free + $13/mo Pro).
 * Users searching "canva logo maker alternative" or "canva vs AI logo generator"
 * are evaluating whether a dedicated AI logo tool is better than Canva's
 * generalist design suite for logo creation specifically. This page captures
 * that high-intent search traffic.
 *
 * SEO STRATEGY:
 * - Title: "LogoForge AI vs Canva Logo Maker (2026)" for freshness
 * - Description targets "canva logo maker alternative"
 * - FAQPage JSON-LD for rich snippet eligibility
 * - BreadcrumbList JSON-LD for SERP breadcrumbs
 * - Honest positioning: Canva is great for general design, LogoForge AI is
 *   purpose-built for logos — specialist vs generalist argument
 *
 * Created 2026-04-04 as part of SEO comparison page rollout.
 *
 * force-dynamic: prevents SSG prerender crash under [locale] generateStaticParams.
 */

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";

const SITE_ORIGIN = "https://generateailogo.com";

export const metadata: Metadata = {
  title: "LogoForge AI vs Canva Logo Maker (2026) — Which Creates Better Logos?",
  description:
    "LogoForge AI vs Canva logo maker: AI-generated logos from text prompts vs Canva's template editor. Compare pricing (free + $4.90/mo vs free + $13/mo), speed, and output quality.",
  keywords: [
    "canva logo maker alternative",
    "canva vs AI logo generator",
    "canva logo alternative",
    "better than canva for logos",
    "AI logo generator vs canva",
    "logoforge ai vs canva",
    "best AI logo maker 2026",
    "dedicated logo generator",
  ],
  alternates: { canonical: `${SITE_ORIGIN}/vs/canva` },
  openGraph: {
    title: "LogoForge AI vs Canva Logo Maker (2026)",
    description:
      "Dedicated AI logo generation vs Canva's template editor. Pricing, features, and which is better for logo design specifically.",
    type: "website",
    url: `${SITE_ORIGIN}/vs/canva`,
    siteName: "LogoForge AI",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LogoForge AI vs Canva Logo Maker — 2026 comparison",
    description:
      "Purpose-built AI logo generation vs Canva's generalist design suite. Honest comparison.",
  },
  robots: { index: true, follow: true },
};

/**
 * FAQ entries — rendered as both JSON-LD schema and visible expandable sections.
 * Targets questions like "is canva good for logo design" that appear in
 * People Also Ask boxes on Google.
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
      name: "Is Canva good enough for logo design?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Canva is excellent for general graphic design, but its logo maker relies on templates and manual editing. The results can look generic because thousands of other businesses use the same templates. A dedicated AI logo generator like LogoForge AI creates unique designs from scratch based on your text description.",
      },
    },
    {
      "@type": "Question",
      name: "Is LogoForge AI cheaper than Canva Pro for logos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For logo creation specifically, LogoForge AI's Starter plan ($4.90/month) is cheaper than Canva Pro ($13/month). Canva's free tier includes logo templates, but premium templates, brand kit features, and SVG export require Pro. If you only need logos and not Canva's full design suite, LogoForge AI is the more focused and affordable option.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI generate better logos than Canva templates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI-generated logos are unique to your brand description — no two businesses get the same design. Canva templates are shared across millions of users, meaning your logo may look similar to other businesses. However, Canva gives you pixel-level editing control that AI generation currently does not match.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use Canva or LogoForge AI for my startup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use LogoForge AI for your logo — it's faster, cheaper, and produces unique designs. Use Canva for everything else (social media graphics, presentations, marketing materials). The two tools complement each other well.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
    { "@type": "ListItem", position: 2, name: "LogoForge AI vs Canva", item: `${SITE_ORIGIN}/vs/canva` },
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

export default function VsCanvaPage() {
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
            <span>vs Canva</span>
          </nav>

          {/* Hero */}
          <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full">
            Canva logo maker alternative — honest comparison — April 2026
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            LogoForge AI vs Canva Logo Maker: Specialist AI vs Generalist Design Suite
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Canva is the world&apos;s most popular design tool — and it includes a logo maker.
            But is a generalist design suite the best choice for{" "}
            <strong className="text-white/80 font-semibold">logo design specifically</strong>?
            LogoForge AI is purpose-built for logos: describe your brand, get unique AI-generated
            designs in seconds. Here&apos;s how they compare.
          </p>

          {/* TL;DR */}
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 mb-10">
            <h2 className="text-lg font-semibold text-violet-400 mb-2">TL;DR</h2>
            <p className="text-gray-300 leading-relaxed">
              <strong>Choose LogoForge AI</strong> for fast, unique AI-generated logos from text
              prompts — cheaper than Canva Pro for logos specifically ($4.90/mo vs $13/mo).{" "}
              <strong>Choose Canva</strong> if you need logos <em>plus</em> social media graphics,
              presentations, and marketing materials in one subscription.
            </p>
          </div>

          {/* Feature table */}
          <h2 className="text-2xl font-bold text-white mb-4">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-lg border border-white/10 mb-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Feature</th>
                  <th className="py-3 px-4 text-sm font-medium text-violet-400 text-center">LogoForge AI</th>
                  <th className="py-3 px-4 text-sm font-medium text-blue-400 text-center">Canva</th>
                </tr>
              </thead>
              <tbody>
                <CompRow feature="Logo approach" us="AI-generated from text" them="Template editor + AI assist" />
                <CompRow feature="Price (logo focus)" us="Free + $4.90/mo" them="Free + $13/mo Pro" />
                <CompRow feature="Free logo downloads" us="Yes (credits on signup)" them="Yes (basic templates)" />
                <CompRow feature="Logo uniqueness" us="Unique per prompt" them="Shared templates" />
                <CompRow feature="Generation speed" us="~10 seconds" them="Manual editing (5-15 min)" />
                <CompRow feature="Design customization" us="Prompt-based iteration" them="Full drag-and-drop editor" />
                <CompRow feature="Download formats" us="PNG (high-res)" them="PNG, JPG, PDF, SVG (Pro)" />
                <CompRow feature="Other design tools" us="Logo only" them="5,000+ templates for everything" />
                <CompRow feature="Brand kit" us="Logo only" them="Brand Kit (Pro)" />
                <CompRow feature="Commercial rights" us="Yes (all plans)" them="Yes (all plans)" />
              </tbody>
            </table>
          </div>

          {/* Pricing */}
          <h2 className="text-2xl font-bold text-white mb-4">Pricing Comparison</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
              <h3 className="font-semibold text-violet-400 mb-2">LogoForge AI</h3>
              <ul className="text-sm space-y-1">
                <li>Free: <strong className="text-green-400">3 logos (no card)</strong></li>
                <li>Starter: $4.90/month (unlimited logos)</li>
                <li>Pro: $14.90/month</li>
                <li>Purpose: <em>Logos only</em></li>
              </ul>
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
              <h3 className="font-semibold text-blue-400 mb-2">Canva</h3>
              <ul className="text-sm space-y-1">
                <li>Free: Basic logo templates + export</li>
                <li>Canva Pro: $13/month (all design tools)</li>
                <li>Canva Teams: $15/person/month</li>
                <li>Purpose: <em>Full design suite</em></li>
              </ul>
            </div>
          </div>

          {/* Where LogoForge AI wins */}
          <h2 className="text-2xl font-bold text-white mb-4">Where LogoForge AI Wins</h2>
          <div className="space-y-3 mb-8">
            {[
              ["Unique designs, not shared templates", "Canva's logo templates are used by millions of businesses — your logo may look almost identical to someone else's. LogoForge AI generates every logo from scratch using AI, based on your specific brand description. No two businesses get the same design."],
              ["Faster logo creation", "Describe your brand in one sentence, get multiple concepts in 10 seconds. Canva's logo maker requires manual browsing through templates, swapping icons, adjusting fonts, and tweaking layouts — typically 5-15 minutes for a decent result."],
              ["Cheaper for logo-only needs", "If you only need logos, LogoForge AI's $4.90/month is 62% cheaper than Canva Pro's $13/month. You're not paying for Canva's presentation maker, video editor, and social media tools that you don't need for logo design."],
              ["AI-native design approach", "LogoForge AI understands your brand concept semantically — 'minimalist tech startup' or 'playful children's brand' produces genuinely different design directions. Canva's AI features are add-ons to a template-based system."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-white/10 p-4">
                <h3 className="font-semibold text-violet-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>

          {/* Where Canva wins */}
          <h2 className="text-2xl font-bold text-white mb-4">Where Canva Wins</h2>
          <div className="space-y-3 mb-10">
            {[
              ["Complete design suite", "Canva does everything: social media graphics, presentations, videos, business cards, posters, flyers. If you need a single subscription for all design work, Canva Pro's $13/month covers far more than logos."],
              ["Pixel-perfect editing control", "Canva's drag-and-drop editor lets you adjust every element precisely — exact font size, spacing, color values, positioning. LogoForge AI's prompt-based approach is faster but less predictable for exact specifications."],
              ["SVG and multi-format export", "Canva Pro exports logos as SVG, PDF, PNG, and JPG. LogoForge AI currently outputs high-resolution PNG, which covers digital use cases but may not suit large-format print."],
              ["Brand Kit management", "Canva Pro's Brand Kit stores your logo, colors, and fonts so all your design materials stay consistent. It's a full brand management system, not just a logo maker."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-white/10 p-4">
                <h3 className="font-semibold text-blue-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">
              Try LogoForge AI Free — Purpose-Built for Logos
            </h2>
            <p className="text-gray-400 mb-6">
              3 free logo downloads. AI-generated from your brand description. No templates, no credit card.
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

          {/* Visible FAQ — matches FAQPage JSON-LD for Google consistency */}
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
            Last updated April 2026. Canva pricing from their public pricing page.
          </p>
        </article>
      </main>
    </>
  );
}
