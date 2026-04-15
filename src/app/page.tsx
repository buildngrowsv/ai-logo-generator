import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import CookieConsent from "@/components/CookieConsent";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import HomePageContent from "@/components/HomePageContent";
import { SeoInternalLinks } from "@/components/SeoInternalLinks";
import TrustBadges from "@/components/TrustBadges";

/**
 * FAQ items for JSON-LD FAQPage schema — enables Google rich snippets
 * and AI search engine (ChatGPT, Perplexity, Gemini) citation.
 * Keep in sync with any visible FAQ section on the landing page.
 */
const FAQ_ITEMS = [
  {
    question: "How does AI logo generation work?",
    answer: "LogoForge AI uses advanced FLUX AI models to generate unique logo designs from your text description. Enter your business name, describe the style you want (minimalist, bold, vintage, etc.), and the AI produces multiple professional logo options in seconds. No design skills needed.",
  },
  {
    question: "Can I use the generated logos commercially?",
    answer: "Yes! You own full commercial rights to every logo you generate. Use them for your business branding, websites, social media, business cards, merchandise, or any commercial purpose. No attribution required.",
  },
  {
    question: "How much does it cost?",
    answer: "We offer flexible pricing: a Starter plan at $4.90/month with 50 logo credits, a Creator plan at $14.90/month with 200 credits (best value for agencies), and an Agency plan at $39.90/month with 500 credits. You can also buy credit packs starting at $9.90 for 5 logos. Try 3 free logos before subscribing.",
  },
  {
    question: "What makes LogoForge AI different from other logo generators?",
    answer: "LogoForge AI is purpose-built for logo design using state-of-the-art FLUX models, not general-purpose image generators. Our prompts are optimized for clean, professional logo aesthetics — sharp lines, proper typography treatment, and brand-ready output. Most competitors use generic image AI that produces illustrations, not actual logos.",
  },
  {
    question: "What file formats do I get?",
    answer: "All generated logos are delivered as high-resolution PNG files at 1024x1024 pixels. This resolution works for websites, social media, and most digital applications. Pro plans will include SVG vector export in a future update.",
  },
  {
    question: "Can I edit or customize the generated logos?",
    answer: "You can regenerate with refined prompts to adjust style, colors, and composition. Each generation gives you a fresh unique design. For pixel-level editing, download the PNG and use any image editor. The AI is best at rapid iteration — try different descriptions until you find the perfect logo.",
  },
];

/**
 * SoftwareApplication JSON-LD — enables Google knowledge panel and rich
 * results for "ai logo generator" queries. Pricing matches product.ts tiers.
 */
const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LogoForge AI",
  description:
    "AI-powered logo generator. Create professional logos for your business in seconds with advanced FLUX AI models. No design skills needed.",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  url: "https://generateailogo.com",
  offers: [
    {
      "@type": "Offer",
      name: "Free Trial",
      price: "0",
      priceCurrency: "USD",
      description: "3 free logo generations",
    },
    {
      "@type": "Offer",
      name: "Starter",
      price: "4.90",
      priceCurrency: "USD",
      billingIncrement: "P1M",
      description: "50 logo credits per month",
    },
    {
      "@type": "Offer",
      name: "Creator",
      price: "14.90",
      priceCurrency: "USD",
      billingIncrement: "P1M",
      description: "200 logo credits per month — best value",
    },
    {
      "@type": "Offer",
      name: "Agency",
      price: "39.90",
      priceCurrency: "USD",
      billingIncrement: "P1M",
      description: "500 logo credits per month for teams",
    },
  ],
};

const faqPageJsonLd = {
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

/**
 * Default-locale homepage shim.
 *
 * WHY THIS FILE EXISTS:
 * The repo's marketing homepage lived only at `src/app/[locale]/(main)/page.tsx`.
 * With `next-intl` using `localePrefix: "as-needed"`, the default-locale root
 * URL `/` still needs an explicit `src/app/page.tsx`. Without it, Vercel serves
 * a 404 on `/` even though locale subroutes like `/pricing` work.
 *
 * IMPLEMENTATION:
 * Reuse the existing homepage component and provide the same minimum client
 * context it expects for the default `en` locale. JSON-LD structured data is
 * injected here (not in the client component) so search engines see it on SSR.
 */
export default async function RootHomePage() {
  const messages = await getMessages({ locale: "en" });

  return (
    <AuthSessionProvider>
      {/* SoftwareApplication JSON-LD — Google knowledge panel + rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      {/* FAQPage JSON-LD — Google rich snippets for FAQ queries */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      <NextIntlClientProvider locale="en" messages={messages}>
        <LanguageSwitcher locale="en" />
        <HomePageContent />
      </NextIntlClientProvider>

      {/* Trust / security badges — conversion-critical social proof strip */}
      <TrustBadges />

      {/* ================================================================
       * PRICING CTA SECTION
       * ================================================================
       * Server-rendered pricing summary so visitors who don't scroll
       * through the client component still see the value proposition.
       * Three tiers matching softwareAppJsonLd offers above.
       * ================================================================ */}
      <section className="py-20 px-4 sm:px-6 bg-surface-primary">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
              Simple, Transparent Pricing
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Try 3 logos free — no account required. Upgrade for more credits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* STARTER */}
            <div className="rounded-2xl border border-white/5 bg-surface-secondary p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Starter</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-text-primary">$4.90</span>
                  <span className="text-text-muted ml-1">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                {["50 logo credits per month", "All AI models", "High-resolution PNG", "Commercial license", "No watermarks"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-text-secondary text-sm">
                    <span className="text-green-400 mt-0.5 shrink-0">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/pricing"
                className="block w-full text-center py-3 rounded-xl border border-white/10 text-text-secondary hover:text-text-primary hover:border-brand-500/40 transition-all duration-300 font-medium"
              >
                Get Started
              </a>
            </div>

            {/* CREATOR — best value */}
            <div className="relative rounded-2xl border-2 border-brand-500/50 bg-surface-secondary p-8 space-y-6 shadow-lg shadow-brand-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                BEST VALUE
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Creator</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-text-primary">$14.90</span>
                  <span className="text-text-muted ml-1">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                {["200 logo credits per month", "All AI models", "High-resolution PNG", "Commercial license", "Priority processing", "No watermarks"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-text-secondary text-sm">
                    <span className="text-green-400 mt-0.5 shrink-0">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/pricing"
                className="block w-full text-center py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all duration-200 hover:scale-[1.02]"
              >
                Start Creating
              </a>
            </div>

            {/* AGENCY */}
            <div className="rounded-2xl border border-white/5 bg-surface-secondary p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Agency</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-text-primary">$39.90</span>
                  <span className="text-text-muted ml-1">/month</span>
                </div>
              </div>
              <ul className="space-y-3">
                {["500 logo credits per month", "All AI models", "High-resolution PNG", "Commercial license", "Priority processing", "Team-ready volume"].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-text-secondary text-sm">
                    <span className="text-green-400 mt-0.5 shrink-0">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/pricing"
                className="block w-full text-center py-3 rounded-xl border border-white/10 text-text-secondary hover:text-text-primary hover:border-brand-500/40 transition-all duration-300 font-medium"
              >
                Scale Up
              </a>
            </div>
          </div>

          <p className="text-center text-text-muted text-sm">
            3 free logos included — no credit card needed to start.
          </p>
        </div>
      </section>

      {/* Internal SEO links — distributes homepage PageRank to pSEO pages */}
      <section className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <SeoInternalLinks />
        </div>
      </section>
      <CookieConsentBanner />
      <CookieConsent />
    </AuthSessionProvider>
  );
}
