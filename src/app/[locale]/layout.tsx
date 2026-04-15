/**
 * Locale layout — LogoForge AI branding, hreflang metadata, providers.
 *
 * Aligns public SEO with `siteConfig` (LogoForge) instead of legacy “LogoMint”
 * strings that drifted in root metadata (Scout 13 branding note).
 */
import type { Metadata } from "next";
import GoogleAnalyticsLoader from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import { routing } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { siteConfig } from "@/config/site";
/* globals.css is now imported in the root layout (src/app/layout.tsx) */

/**
 * Force dynamic rendering for ALL locale-routed pages.
 *
 * ROOT CAUSE: With localePrefix "as-needed", next-intl middleware rewrites
 * /pricing → /en/pricing internally. But Next.js 15 pre-renders these pages
 * statically via generateStaticParams at build time. When the rewritten
 * request arrives at runtime, next-intl's getRequestConfig reads headers()
 * to determine the locale — which conflicts with the static pre-render,
 * throwing "Page changed from static to dynamic at runtime, reason: headers".
 *
 * force-dynamic tells Next.js to always server-render these pages, allowing
 * next-intl's header-based locale detection to work correctly. Performance
 * impact is minimal — Vercel's Edge Network and ISR cache the responses.
 *
 * This affects: /pricing, /about, /faq, /blog, /login, and all other pages
 * under [locale]/ that are routed through next-intl middleware.
 */
export const dynamic = "force-dynamic";

const productionSiteUrl = siteConfig.siteUrl;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "es" | "fr" | "de" | "pt")) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: "Meta" });
  const dict = (await import(`../../messages/${locale}.json`)).default as {
    Meta: { keywordList: string[] };
  };
  const ogLocale = locale === "es" ? "es_ES" : "en_US";
  const canonicalPath = locale === "es" ? `${productionSiteUrl}/es` : productionSiteUrl;
  return {
    metadataBase: new URL(productionSiteUrl),
    title: t("title"),
    description: t("description"),
    keywords: dict.Meta.keywordList,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: productionSiteUrl,
        es: `${productionSiteUrl}/es`,
        "x-default": productionSiteUrl,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      siteName: t("siteName"),
      locale: ogLocale,
      url: canonicalPath,
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
    verification: {
      google: "CJx0tLzl09NcMkFKu5fAayPbWhxzqVJTyyERVA37s78",
    },
    robots: { index: true, follow: true },
  };
}

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LogoForge AI",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  description:
    "Create professional logos with AI — business name, style categories, and instant variations.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free credits to try; subscriptions and packs for more generations.",
  },
  featureList: [
    "AI logo generation with FLUX",
    "Multiple style categories",
    "High-resolution exports",
    "Credit-based pricing",
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is LogoForge AI free to try?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. New accounts receive free credits to generate logos before upgrading. No credit card required to start.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use logos commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Generated logos are yours to use commercially for business cards, websites, social media, and merchandise subject to plan terms.",
      },
    },
    {
      "@type": "Question",
      name: "How does LogoForge AI compare to Looka or Brandmark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LogoForge AI uses FLUX AI models to generate logos from text prompts with multiple style categories. Plans start at $4.90/month versus Looka ($20+) and Brandmark ($25+). LogoForge offers a free tier so you can try before buying.",
      },
    },
    {
      "@type": "Question",
      name: "What file formats can I download my logo in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LogoForge AI generates high-resolution logo images that you can download and use across all platforms including websites, print materials, and social media profiles.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to generate a logo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Logo generation typically takes 10-30 seconds. Enter your business name, select a style category, and the AI produces multiple variations you can choose from instantly.",
      },
    },
  ],
};

/**
 * HowTo JSON-LD — targets "how to make a logo with AI" instructional queries.
 * Google displays step-by-step rich snippets; AI engines cite steps directly.
 */
const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a Professional Logo with AI",
  description:
    "Design a professional logo in 3 easy steps using LogoForge AI — free, no design skills needed.",
  totalTime: "PT60S",
  tool: {
    "@type": "HowToTool",
    name: "LogoForge AI (generateailogo.com)",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your business name",
      text: "Type your business or brand name and optionally add a tagline or description. No account required to start.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose a style category",
      text: "Select from style categories like minimalist, tech, luxury, or playful. The AI generates multiple logo variations based on your choice.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Download your logo",
      text: "Pick your favorite variation and download a high-resolution PNG. Use it for websites, business cards, social media, and merchandise.",
    },
  ],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "es" | "fr" | "de" | "pt")) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      {/* Set correct lang attribute — root layout hardcodes "en" for pSEO pages */}
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="${locale}"` }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      {/* GA4 with consent mode — GoogleAnalyticsLoader reads env var internally */}
      <GoogleAnalyticsLoader />
      <AuthSessionProvider>
        <NextIntlClientProvider messages={messages}>
          {/* Language switcher — EN | ES toggle, visible on all pages */}
          <LanguageSwitcher locale={locale} />
          {children}
        </NextIntlClientProvider>
      </AuthSessionProvider>
      <CookieConsentBanner />
      <CookieConsent />
    </>
  );
}
