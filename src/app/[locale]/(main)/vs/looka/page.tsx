/**
 * /vs/looka — SEO comparison page: AI Logo Generator vs Looka
 *
 * WHY THIS EXISTS (Builder 3, 2026-04-03):
 * "looka alternative" and "free AI logo generator" are high-volume keywords.
 * Looka is the biggest name in AI logo design. This comparison targets users
 * actively evaluating logo tools — bottom-of-funnel buyers.
 *
 * force-dynamic: same pattern as other [locale] pages to avoid SSG prerender issues.
 */

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Logo Generator vs Looka — Free Logo Maker Comparison (2026)",
  description:
    "Compare our free AI Logo Generator with Looka. Feature comparison, pricing ($0 vs $20-65), and which tool is right for your brand.",
  keywords: [
    "looka alternative",
    "free AI logo generator",
    "AI logo maker comparison",
    "looka vs free logo generator",
    "best logo maker 2026",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this AI Logo Generator really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can generate AI logos for free with credits included at signup. Looka lets you design for free but charges $20-65 to download high-resolution files.",
      },
    },
    {
      "@type": "Question",
      name: "How does this compare to Looka for logo design?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our tool uses AI to generate logos from text prompts — describe your brand and get instant designs. Looka uses a wizard-style builder with templates. Our approach is faster for exploration; Looka offers more customization control.",
      },
    },
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

export default function VsLookaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="min-h-screen bg-gray-950 text-gray-200 px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
            {" / "}
            <span>vs Looka</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            AI Logo Generator vs Looka — Which Logo Maker Should You Use?
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Looka is the most popular AI logo maker, used by millions. Our AI Logo
            Generator takes a different approach — describe your brand in text and
            get instant AI-generated logo concepts. Here&apos;s an honest comparison.
          </p>

          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 mb-10">
            <h2 className="text-lg font-semibold text-violet-400 mb-2">TL;DR</h2>
            <p className="text-gray-300 leading-relaxed">
              <strong>Choose our AI Logo Generator</strong> for instant AI-generated
              logos from text prompts — free to try, fast exploration.{" "}
              <strong>Choose Looka</strong> if you want a guided wizard with templates,
              brand kit integration, and social media asset packages.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-lg border border-white/10 mb-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Feature</th>
                  <th className="py-3 px-4 text-sm font-medium text-violet-400 text-center">AI Logo Generator</th>
                  <th className="py-3 px-4 text-sm font-medium text-orange-400 text-center">Looka</th>
                </tr>
              </thead>
              <tbody>
                <CompRow feature="AI logo generation" us="✅ Text-to-logo" them="✅ Wizard + templates" />
                <CompRow feature="Free to design" us="✅ Free credits" them="✅ Free to explore" />
                <CompRow feature="Free HD download" us="✅ With credits" them="❌ $20-65 to download" />
                <CompRow feature="Generation speed" us="~10 seconds" them="~30 seconds (wizard)" />
                <CompRow feature="Style variety" us="AI-driven (unlimited)" them="Template-based" />
                <CompRow feature="Brand kit" us="❌" them="✅ Colors, fonts, social" />
                <CompRow feature="Social media assets" us="❌" them="✅ (paid packages)" />
                <CompRow feature="Business card design" us="❌" them="✅ ($65 package)" />
                <CompRow feature="SVG export" us="PNG output" them="✅ SVG on paid" />
                <CompRow feature="Customization" us="Prompt-based iteration" them="Color, font, layout controls" />
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">Pricing</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
              <h3 className="font-semibold text-violet-400 mb-2">AI Logo Generator</h3>
              <ul className="text-sm space-y-1">
                <li>• Free credits on signup</li>
                <li>• Generate + download included</li>
                <li>• Pro plan for more generations</li>
              </ul>
            </div>
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
              <h3 className="font-semibold text-orange-400 mb-2">Looka</h3>
              <ul className="text-sm space-y-1">
                <li>• Free to explore designs</li>
                <li>• Basic Logo: $20 (1 PNG)</li>
                <li>• Premium Logo: $65 (SVG + variations)</li>
                <li>• Brand Kit: $96/yr</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">Where AI Logo Generator Wins</h2>
          <div className="space-y-3 mb-8">
            {[
              ["Truly free downloads", "Generate and download logos with credits included at signup. Looka lets you design but charges $20-65 to download usable files."],
              ["Faster exploration", "Describe your brand in one sentence, get 4+ logo concepts in 10 seconds. Looka's wizard takes 2-3 minutes of clicking through options."],
              ["AI creativity", "Our AI generates unique designs from scratch — no templates, no limitations. Every logo is one-of-a-kind."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-white/10 p-4">
                <h3 className="font-semibold text-violet-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">Where Looka Wins</h2>
          <div className="space-y-3 mb-10">
            {[
              ["Brand kit ecosystem", "Logo + business cards + social media headers + email signatures in one package. Full brand identity suite."],
              ["Fine-grained customization", "Change colors, fonts, icon placement, and layout with precise controls. Our tool relies on prompt iteration."],
              ["SVG vector output", "Looka's premium plan includes SVG files for unlimited scaling. Our tool currently outputs PNG."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-white/10 p-4">
                <h3 className="font-semibold text-orange-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8 text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">
              Generate Your Logo Free
            </h2>
            <p className="text-gray-400 mb-6">
              Describe your brand and get AI-generated logo concepts in seconds.
              Free credits included.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
            >
              Create Your Logo
            </Link>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Last updated April 2026. Looka pricing from their public pricing page.
          </p>
        </article>
      </main>
    </>
  );
}
