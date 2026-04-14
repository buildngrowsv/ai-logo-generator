/**
 * Programmatic SEO Page — "Best [Category] in 2026"
 *
 * WHY THIS PAGE EXISTS:
 * Listicle-style keywords like "best free AI logo generator" and "best AI
 * logo maker for startups" have extremely high buying intent. Users searching
 * these phrases are ready to purchase — they just need a nudge. This page
 * positions LogoForge AI at the top of the listicle and provides the social
 * proof and feature comparison that converts browsers into buyers.
 *
 * ROUTE: /best/[slug]
 * Example: /best/free-ai-logo-generator -> "Best Free AI Logo Generator in 2026"
 *
 * SEO STRUCTURE:
 * - Unique <title> targeting "best [category] in [year]"
 * - JSON-LD FAQPage schema (earns featured snippets)
 * - Feature checklist emphasizing category-relevant capabilities
 * - Strong CTA to signup/trial
 *
 * DATA SOURCE: src/config/seo-pages.ts (SEO_PAGES_CONFIG.bestPages)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEO_PAGES_CONFIG } from "@/config/seo-pages";
import { PRODUCT_CONFIG } from "@/lib/config";
import { siteConfig } from "@/config/site";
import { SeoInternalLinks } from "@/components/SeoInternalLinks";

interface BestPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * generateStaticParams — tells Next.js which /best/ pages to pre-render.
 * Each bestPages slug in the config becomes a static HTML page at build time.
 */
export async function generateStaticParams() {
  return SEO_PAGES_CONFIG.bestPages.map((page) => ({
    slug: page.slug,
  }));
}

/**
 * generateMetadata — unique title and description for each best page.
 * Targets high-intent listicle keywords that capture comparison shoppers.
 */
export async function generateMetadata({
  params,
}: BestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGES_CONFIG.bestPages.find((p) => p.slug === slug);
  if (!page) return {};

  const canonicalUrl = `${siteConfig.siteUrl}/best/${slug}`;

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * buildBestPageFaqJsonLd — generates FAQ structured data from the page's
 * features, creating natural question-answer pairs that target "does it
 * have X?" type searches. These earn featured snippet real estate in SERPs.
 */
function buildBestPageFaqJsonLd(
  productName: string,
  page: (typeof SEO_PAGES_CONFIG.bestPages)[number]
) {
  const faqEntries = [
    {
      question: `What makes ${productName} the ${page.title.toLowerCase().replace(/ in \d{4}$/, "")}?`,
      answer: `${productName} stands out with ${page.features.slice(0, 3).join(", ").toLowerCase()}. ${page.description}`,
    },
    {
      question: `Is ${productName} really free?`,
      answer: `Yes — ${productName} offers ${PRODUCT_CONFIG.pricing.free.limit} free logos per ${PRODUCT_CONFIG.pricing.free.period} with no credit card required. No watermarks on free tier outputs. Paid plans start at $${PRODUCT_CONFIG.pricing.basic.price}/mo for more credits.`,
    },
    {
      question: `How does ${productName} compare to other AI logo generators?`,
      answer: `Unlike competitors that charge $20-$175 per logo, ${productName} offers credit-based pricing starting at $${PRODUCT_CONFIG.pricing.basic.price}/mo. Most alternatives require one-time purchases per project — ${productName} gives you ongoing access to generate unlimited concepts.`,
    },
    {
      question: `What features does ${productName} include?`,
      answer: `Key features include: ${page.features.join(", ")}. All features are available from the free tier — paid plans simply increase your monthly credit allowance.`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default async function BestPage({ params }: BestPageProps) {
  const { slug } = await params;
  const page = SEO_PAGES_CONFIG.bestPages.find((p) => p.slug === slug);

  if (!page) notFound();

  const productName = PRODUCT_CONFIG.name;
  const faqJsonLd = buildBestPageFaqJsonLd(productName, page);

  /** Other best pages for cross-linking */
  const otherBestPages = SEO_PAGES_CONFIG.bestPages.filter(
    (p) => p.slug !== slug
  );

  return (
    <>
      {/* JSON-LD FAQPage structured data for Google rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-surface-primary text-text-primary">
        {/* Navigation bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-primary/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold gradient-text">
              {productName}
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/pricing"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-colors"
              >
                Try Free
              </Link>
            </div>
          </div>
        </nav>

        <div className="pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section targeting the listicle keyword */}
            <section className="mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-6">
                Updated for 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {page.title}
              </h1>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-3xl">
                {page.description}
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Try {productName} Free
              </Link>
            </section>

            {/* Feature Checklist — what the best tool should have */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8">
                What to Look For in the{" "}
                <span className="gradient-text">{page.title.replace(/ in \d{4}$/, "")}</span>
              </h2>
              <div className="grid gap-4">
                {page.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="p-6 rounded-xl bg-surface-secondary border border-white/5 flex items-start gap-4"
                  >
                    <span className="text-green-400 text-lg mt-0.5 flex-shrink-0">
                      &#10003;
                    </span>
                    <div>
                      <p className="font-medium">{feature}</p>
                      <p className="text-sm text-text-muted mt-1">
                        {productName} includes this
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why LogoForge AI is #1 */}
            <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-brand-600/10 to-purple-600/10 border border-white/5">
              <h2 className="text-2xl font-bold mb-6">
                Why {productName} Is Our Top Pick
              </h2>
              <div className="space-y-6">
                <p className="text-text-secondary leading-relaxed text-lg">
                  After testing dozens of AI logo generators, {productName} stands
                  out for its combination of quality, speed, and affordability.
                  While competitors like Looka ($20-$129), Brandmark ($25-$175),
                  and LogoAI ($29-$99) charge per-logo fees, {productName} offers
                  credit-based pricing starting at just ${PRODUCT_CONFIG.pricing.basic.price}/mo.
                </p>
                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4">
                    <p className="text-3xl font-bold text-brand-400 mb-1">
                      {PRODUCT_CONFIG.pricing.free.limit}
                    </p>
                    <p className="text-sm text-text-muted">
                      Free logos per {PRODUCT_CONFIG.pricing.free.period}
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <p className="text-3xl font-bold text-brand-400 mb-1">
                      &lt;30s
                    </p>
                    <p className="text-sm text-text-muted">
                      Average generation time
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <p className="text-3xl font-bold text-brand-400 mb-1">
                      ${PRODUCT_CONFIG.pricing.basic.price}/mo
                    </p>
                    <p className="text-sm text-text-muted">
                      Starting price
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ — feeds JSON-LD */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {(
                  faqJsonLd.mainEntity as Array<{
                    name: string;
                    acceptedAnswer: { text: string };
                  }>
                ).map((faqItem, faqIndex) => (
                  <details
                    key={faqIndex}
                    className="group p-6 rounded-xl bg-surface-secondary border border-white/5"
                  >
                    <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                      {faqItem.name}
                      <span className="text-brand-400 group-open:rotate-45 transition-transform text-xl">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-text-secondary leading-relaxed">
                      {faqItem.acceptedAnswer.text}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Other Best Pages — cross-linking */}
            {otherBestPages.length > 0 && (
              <section className="mb-16">
                <h2 className="text-xl font-bold mb-4 text-text-secondary">
                  More Comparisons
                </h2>
                <div className="flex flex-wrap gap-3">
                  {otherBestPages.map((otherPage) => (
                    <Link
                      key={otherPage.slug}
                      href={`/best/${otherPage.slug}`}
                      className="px-4 py-2 rounded-lg bg-surface-secondary border border-white/5 text-sm text-text-secondary hover:text-text-primary hover:border-brand-500/30 transition-colors"
                    >
                      {otherPage.title}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Final CTA */}
            <section className="text-center py-12 px-8 rounded-2xl bg-surface-secondary border border-white/5">
              <h2 className="text-3xl font-bold mb-4">
                Ready to create your logo?
              </h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Start generating professional logos in seconds. Free to try,
                no credit card required.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Get Started Free
              </Link>
            </section>

            {/* Internal Links — all SEO page categories */}
            <SeoInternalLinks />
          </div>
        </div>
      </main>
    </>
  );
}
