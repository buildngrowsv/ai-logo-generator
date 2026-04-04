/**
 * /changelog — public product changelog for LogoForge AI.
 *
 * WHY THIS EXISTS (T118, Builder 2, 2026-04-04):
 * Directory reviewers and potential customers check changelogs to verify
 * the product is actively developed. A dated list of recent improvements
 * builds trust and shows momentum. Entries are curated from real git
 * history — no fabricated dates or features.
 */
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog — What's New | LogoForge AI",
  description:
    "See the latest features, improvements, and fixes in LogoForge AI. Updated regularly with new models, tools, and platform improvements.",
  alternates: { canonical: "https://generateailogo.com/changelog" },
};

/**
 * Changelog entries derived from real git history.
 * Each entry groups related commits into a user-facing update.
 */
const CHANGELOG_ENTRIES = [
  {
    date: "April 4, 2026",
    title: "SEO + trust pages",
    tag: "Content",
    items: [
      "Added /changelog page showing product development history",
      "Added /vs comparison pages for competitor SEO keywords",
      "Added BreadcrumbList and FAQ JSON-LD schema to key pages",
      "Added 'Powered by SymplyAI' footer link for portfolio cross-linking",
    ],
  },
  {
    date: "April 3, 2026",
    title: "Cookie consent + privacy compliance",
    tag: "Compliance",
    items: [
      "Added GDPR-compliant cookie consent banner with GA4 consent mode",
      "Expanded privacy policy to name all data processors: GA4, Stripe, fal.ai, Cloudflare",
      "Added refund policy page",
    ],
  },
  {
    date: "March 28, 2026",
    title: "SEO foundation",
    tag: "SEO",
    items: [
      "Created sitemap.xml with all public routes",
      "Added robots.txt with crawl directives",
      "Added JSON-LD SoftwareApplication structured data",
      "Multi-language support via next-intl",
    ],
  },
  {
    date: "March 25, 2026",
    title: "AI model upgrades",
    tag: "Features",
    items: [
      "Added latest fal.ai logo generation models",
      "Improved generation quality and consistency",
      "Added gallery page for showcasing logo outputs",
    ],
  },
  {
    date: "March 24, 2026",
    title: "Stripe payments + credit system",
    tag: "Payments",
    items: [
      "Full Stripe checkout integration with subscription tiers",
      "Credit pack purchases for pay-as-you-go users",
      "Server-side credit deduction before API calls with refund on failure",
    ],
  },
  {
    date: "March 22, 2026",
    title: "Launch",
    tag: "Features",
    items: [
      "Initial launch of LogoForge AI at generateailogo.com",
      "Text-to-logo generation with style and brand direction controls",
      "Google OAuth authentication",
      "Studio workspace for generating and managing logos",
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  Features: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Content: "bg-green-500/10 text-green-400 border-green-500/20",
  SEO: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Compliance: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Payments: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function ChangelogPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);

  return (
    <div className="bg-background">
      <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Changelog
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            What&apos;s new in LogoForge AI
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            A running log of new features, improvements, and fixes. We ship
            updates regularly — new AI models, better logo quality, and more
            controls to help you create faster.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="space-y-10">
          {CHANGELOG_ENTRIES.map((entry, i) => (
            <article
              key={i}
              className="relative pl-8 border-l-2 border-border/40"
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <time className="text-sm font-medium text-muted-foreground">
                  {entry.date}
                </time>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${TAG_COLORS[entry.tag] || "bg-muted text-muted-foreground"}`}
                >
                  {entry.tag}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-3">{entry.title}</h2>
              <ul className="space-y-1.5">
                {entry.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                  >
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
          <h2 className="text-xl font-semibold">Try the latest features free</h2>
          <p className="mt-2 text-muted-foreground">
            Free credits on signup. No credit card required.
          </p>
          <div className="mt-4">
            <Link
              href="/pricing"
              className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
