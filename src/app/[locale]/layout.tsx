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
  const { locale: rawLocale } = await params;
  /**
   * Graceful locale fallback for metadata generation.
   *
   * WHY NOT notFound(): With localePrefix "as-needed", bare paths like /pricing
   * arrive as [locale]="pricing". Calling notFound() here injects
   * <meta name="robots" content="noindex"/> — making the pricing page invisible
   * to Google. Instead, fall back to default locale metadata so the page gets
   * proper SEO tags. The page content already falls back via i18n/request.ts.
   *
   * ROOT CAUSE: next-intl middleware rewrite sometimes doesn't fire for
   * non-locale path segments when force-dynamic is set, causing the URL
   * to hit [locale] with the path segment as the locale value.
   */
  const locale = routing.locales.includes(rawLocale as "en" | "es" | "fr" | "de" | "pt")
    ? rawLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const dict = (await import(`../../messages/${locale}.json`)).default as {
    Meta: { keywordList: string[] };
  };
  const ogLocale = locale === "es" ? "es_ES" : "en_US";
  const canonicalPath = locale === "es" ? `${productionSiteUrl}/es` : productionSiteUrl;
  return {
    metadataBase: new URL(productionSiteUrl),
    title: {
      template: `%s | ${t("siteName")}`,
      default: t("title"),
    },
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
  const { locale: rawLocale } = await params;
  /**
   * Same graceful fallback as generateMetadata — render with default locale
   * instead of 404 when the path segment isn't a valid locale. Matches the
   * behavior of i18n/request.ts which also falls back to defaultLocale.
   */
  const locale = routing.locales.includes(rawLocale as "en" | "es" | "fr" | "de" | "pt")
    ? rawLocale
    : routing.defaultLocale;
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
