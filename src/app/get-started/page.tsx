/**
 * src/app/get-started/page.tsx — LogoForge AI Getting Started Guide
 *
 * SEO STRATEGY:
 * Targets "how to use ai logo generator", "get started with logoforge ai",
 * and "ai logo generator tutorial" queries. Informational intent pages that convert
 * readers into users by walking them through the product step-by-step.
 *
 * STRUCTURED DATA:
 * HowTo JSON-LD for rich snippets (step-by-step in search results).
 * FAQPage JSON-LD for FAQ rich snippets.
 * BreadcrumbList JSON-LD for breadcrumb trail.
 *
 * INTERNAL LINKS:
 * Links to /pricing (monetization) and /for/ audience pages (pSEO distribution).
 *
 * MIDDLEWARE NOTE:
 * /get-started is excluded from next-intl middleware — see middleware.ts matcher.
 */

import type { Metadata } from "next";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Metadata — targets informational "how to" queries
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Get Started with LogoForge AI — AI Logo Generator Tutorial",
  description:
    "Learn how to use LogoForge AI in 4 simple steps. Create Professional Logos with AI — free, fast, and no design skills required.",
  keywords: [
    "how to use ai logo generator",
    "ai logo generator tutorial",
    "logoforge ai guide",
    "ai logo generator for beginners",
    "get started ai logo generator",
    "free ai logo generator",
  ],
  alternates: {
    canonical: "https://generateailogo.com/get-started",
  },
  openGraph: {
    title: "Get Started with LogoForge AI — Step-by-Step Guide",
    description:
      "Learn how to create your first AI-generated logo in minutes. Free, fast, no design skills required.",
    url: "https://generateailogo.com/get-started",
    type: "article",
  },
};

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "Is LogoForge AI really free?",
    answer: "Yes. You get free credits on signup with no watermarks on your downloads. Free credits let you generate several logos. For unlimited generations, Pro plans start at $4.90/month.",
  },
  {
    question: "Do I need design skills?",
    answer: "Not at all. Just type your business name, pick a style, and the AI handles all the design work — color palettes, typography, iconography, and composition.",
  },
  {
    question: "Can I use the logo commercially?",
    answer: "Yes. All logos generated with LogoForge AI are yours to use for any commercial purpose — websites, marketing, print, packaging, and more.",
  },
  {
    question: "How is this different from Canva or template-based tools?",
    answer: "Template tools give you layouts that thousands of other businesses also use. LogoForge AI generates each logo uniquely with AI, so your brand stands out with a one-of-a-kind design.",
  },
  {
    question: "What file formats do I get?",
    answer: "Downloads are high-resolution PNG files suitable for web, social media, and print. Pro users get access to additional format options.",
  },
];

// ---------------------------------------------------------------------------
// HowTo JSON-LD — step-by-step rich snippets in Google Search
// ---------------------------------------------------------------------------
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use LogoForge AI",
  description:
    "A step-by-step guide to create your first AI-generated logo using LogoForge AI.",
  step: [
    { "@type": "HowToStep", name: "Create a Free Account", text: "Click \"Get Started\" on the homepage or navigate to the sign-up page. Sign in with your Google account — it takes under 10 seconds. You'll receive free credits immediately so you can start creating logos right away." },
    { "@type": "HowToStep", name: "Enter Your Business Name & Style", text: "Head to the Logo Studio. Type in your business or brand name, then select a style category that matches your vision — minimalist, tech, luxury, playful, vintage, or bold. The more specific your description, the better the AI can tailor the output." },
    { "@type": "HowToStep", name: "Generate Logo Concepts", text: "Click \"Generate\" and the AI will produce multiple unique logo concepts in about 30 seconds. Each design is completely original — not a template rearrangement. If you want more options, adjust your style description and generate again." },
    { "@type": "HowToStep", name: "Download Your Favorite", text: "Browse through the generated options, pick the logo that best represents your brand, and download it in high-resolution PNG format. Your logo is ready to use on websites, social media, business cards, and print materials." },
  ],
};

// ---------------------------------------------------------------------------
// FAQPage JSON-LD
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
// BreadcrumbList JSON-LD
// ---------------------------------------------------------------------------
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://generateailogo.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Get Started",
      item: "https://generateailogo.com/get-started",
    },
  ],
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function GetStartedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gray-950 text-gray-100">
        {/* -- Navigation -- */}
        <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold text-white">
              LogoForge AI
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/pricing"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 transition-colors"
              >
                Try Free
              </Link>
            </div>
          </div>
        </nav>

        {/* -- Hero -- */}
        <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get Started with{"\u00A0"}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LogoForge AI
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
            Learn how to create your first AI-generated logo in just a few minutes. No design skills
            needed — our AI does the heavy lifting.
          </p>
          <div className="mt-8">
            <Link
              href="{c['ctaHref']}"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              Create Your Logo Free
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* -- Step-by-Step Guide -- */}
        <section className="mx-auto max-w-3xl px-6 pb-20">
          <h2 className="text-2xl font-bold mb-10">
            How to Use LogoForge AI — Step by Step
          </h2>
          <div className="space-y-10">
            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-lg font-bold text-purple-400">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">Create a Free Account</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    Click "Get Started" on the homepage or navigate to the sign-up page. Sign in with your Google account — it takes under 10 seconds. You'll receive free credits immediately so you can start creating logos right away.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-lg font-bold text-blue-400">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">Enter Your Business Name & Style</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    Head to the Logo Studio. Type in your business or brand name, then select a style category that matches your vision — minimalist, tech, luxury, playful, vintage, or bold. The more specific your description, the better the AI can tailor the output.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-lg font-bold text-emerald-400">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">Generate Logo Concepts</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    Click "Generate" and the AI will produce multiple unique logo concepts in about 30 seconds. Each design is completely original — not a template rearrangement. If you want more options, adjust your style description and generate again.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-lg font-bold text-amber-400">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">Download Your Favorite</h3>
                  <p className="mt-2 text-gray-400 leading-relaxed">
                    Browse through the generated options, pick the logo that best represents your brand, and download it in high-resolution PNG format. Your logo is ready to use on websites, social media, business cards, and print materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -- CTA Banner -- */}
        <section className="border-t border-gray-800">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to create your first AI-generated logo?
            </h2>
            <p className="mt-4 text-gray-400">
              It takes less than a minute. Start for free — no credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="{c['ctaHref']}"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                Create Your Logo Free
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-gray-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                View pricing plans
              </Link>
            </div>
          </div>
        </section>

        {/* -- FAQ -- */}
        <section className="border-t border-gray-800">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <h2 className="text-2xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl bg-gray-900 border border-gray-800 transition-all"
                >
                  <summary className="cursor-pointer px-6 py-4 font-medium list-none flex justify-between items-center">
                    {item.question}
                    <span className="ml-4 text-gray-500 transition-transform duration-200 group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* -- Internal Links — pSEO distribution + pricing -- */}
        <section className="border-t border-gray-800">
          <div className="mx-auto max-w-3xl px-6 py-12">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Explore More
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/for/startups" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                LogoForge AI for Startups
              </Link>
              <Link href="/for/freelancers" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                LogoForge AI for Freelancers
              </Link>
              <Link href="/for/small-businesses" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                LogoForge AI for Small Businesses
              </Link>
              <Link href="/pricing" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                View All Plans &amp; Pricing
              </Link>
              <Link href="/blog" className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2">
                Read the Blog
              </Link>
            </div>
          </div>
        </section>

        {/* -- Footer -- */}
        <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} LogoForge AI. All rights reserved.</p>
          <div className="mt-3 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link>
          </div>
        </footer>
      </main>
    </>
  );
}
