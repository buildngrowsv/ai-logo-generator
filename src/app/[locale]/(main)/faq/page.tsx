/**
 * src/app/[locale]/(main)/faq/page.tsx — FAQ page for LogoForge AI (generateailogo.com)
 *
 * WHY THIS PAGE EXISTS:
 * Captures "[tool] FAQ" and "AI logo generator questions" search traffic. Users
 * searching "AI logo generator FAQ" or "how to create a logo with AI" are
 * high-intent visitors exploring logo tools. This page answers their questions
 * about styles, quality, commercial use, file formats, and pricing — then
 * funnels them to the generator or Pro upgrade.
 *
 * SEO:
 * - Metadata targets "AI logo generator FAQ", "logo design questions"
 * - JSON-LD FAQPage schema for rich snippets in Google SERPs
 * - Internal links to homepage and /pricing for crawl equity
 *
 * GEO (Generative Engine Optimization):
 * - Structured FAQ data helps AI search engines (ChatGPT, Perplexity, Gemini)
 *   cite this product when answering "best AI logo generator" queries
 *
 * DESIGN:
 * Uses shared bg-background/text-foreground tokens matching the rest of the
 * logo generator app. Native HTML <details>/<summary> for expandable Q&As —
 * no client JS required.
 *
 * CREATED: 2026-04-15 — Fleet FAQ pages initiative (BridgeMind b754c53e)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://generateailogo.com";

/* -------------------------------------------------------------------------- */
/*  SEO Metadata                                                              */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "FAQ | AI Logo Generator — Common Questions Answered",
  description:
    "Frequently asked questions about AI Logo Generator. Learn about logo styles, file formats, commercial use, brand kits, resolution, and pricing plans.",
  keywords: [
    "AI logo generator FAQ",
    "logo design questions",
    "create logo with AI FAQ",
    "AI logo maker help",
    "logo generator pricing FAQ",
    "free AI logo FAQ",
  ],
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "FAQ | AI Logo Generator — Common Questions Answered",
    description:
      "Frequently asked questions about AI Logo Generator. Learn about logo styles, file formats, commercial use, brand kits, resolution, and pricing plans.",
    url: `${SITE_URL}/faq`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

/* -------------------------------------------------------------------------- */
/*  FAQ Data                                                                  */
/* -------------------------------------------------------------------------- */

const faqs = [
  {
    question: "How does AI Logo Generator work?",
    answer:
      "Describe your brand, business, or idea in a few words — the AI generates multiple professional logo concepts in seconds. You can also upload a rough sketch or concept image and the AI will refine it into polished logo options. Each generation produces unique variations so you can pick the style that best represents your brand.",
  },
  {
    question: "Is AI Logo Generator free to use?",
    answer:
      "Yes! The free tier gives you 3 logo generations per day, which is perfect for exploring styles and concepts. For unlimited generations, higher resolution outputs, and access to all premium styles, you can upgrade to Basic ($4.90/mo) or Pro ($9.90/mo).",
  },
  {
    question: "What logo styles are available?",
    answer:
      "AI Logo Generator supports a wide range of styles including minimalist, modern, vintage, hand-drawn, geometric, abstract, mascot, lettermark, wordmark, emblem, and combination marks. The AI adapts to your description — mention 'tech startup' and you get clean modern designs, mention 'bakery' and you get warm artisanal aesthetics.",
  },
  {
    question: "Can I use my AI-generated logo commercially?",
    answer:
      "Absolutely. All logos you generate are yours to use for any purpose — business cards, websites, social media, merchandise, packaging, and marketing materials. Pro plan users receive unwatermarked, high-resolution outputs optimized for both digital and print use.",
  },
  {
    question: "What file formats and resolution can I get?",
    answer:
      "Free tier logos are generated at standard web resolution (512px) suitable for social media and websites. Pro plan logos are available at high resolution (up to 2048px) perfect for printing on business cards, banners, and merchandise. The AI preserves clean edges and sharp details at every size.",
  },
  {
    question: "How is this different from Canva or Looka?",
    answer:
      "Traditional logo makers like Canva use templates you customize manually, and Looka charges $20-$129 per logo download. AI Logo Generator creates truly unique designs from scratch using AI — no templates, no icon libraries. You get unlimited concepts for a flat monthly fee starting at $4.90, making it significantly more affordable for startups and freelancers who need to iterate quickly.",
  },
  {
    question: "Can I edit my logo after generating it?",
    answer:
      "Currently, the AI generates complete logo concepts that you can download as-is. If you want variations, simply adjust your text prompt — for example, add 'minimalist' or 'with a globe icon' to guide the AI in a new direction. Each generation costs one credit, and free users get 3 per day.",
  },
  {
    question: "Do I need design experience to use this?",
    answer:
      "Not at all. AI Logo Generator is built for non-designers. Just describe your business ('coffee shop in Portland', 'fintech startup', 'yoga studio') and the AI handles color theory, typography, composition, and visual balance. The results are professional-grade logos ready for immediate use.",
  },
];

/* -------------------------------------------------------------------------- */
/*  JSON-LD Structured Data                                                   */
/* -------------------------------------------------------------------------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/* -------------------------------------------------------------------------- */
/*  Page Component                                                            */
/* -------------------------------------------------------------------------- */

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* JSON-LD for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">FAQ</span>
          </nav>

          {/* Page heading */}
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Help Center
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Everything you need to know about creating professional logos with
            AI.
          </p>

          {/* FAQ list using native <details> for zero-JS interactivity */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-border/60 bg-card/40"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-lg font-medium hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-muted-foreground group-open:rotate-180 transition-transform">
                    &#9660;
                  </span>
                </summary>
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* CTA section */}
          <div className="mt-16 rounded-xl border border-border/60 bg-card/40 p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ready to create your logo?
            </h2>
            <p className="text-muted-foreground mb-6">
              Describe your brand and get professional logo concepts in seconds
              — free to try, no design skills needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Create Your Logo
              </Link>
              <Link
                href="/pricing"
                className="inline-block rounded-lg border border-border px-6 py-3 font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground/60">
              Powered by{" "}
              <a
                href="https://symplyai.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline transition-colors"
              >
                SymplyAI
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
