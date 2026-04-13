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
import "../globals.css";

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
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "LogoForge — AI Logo Generator" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/opengraph-image"],
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

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "es" | "fr" | "de" | "pt")) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="min-h-screen antialiased">
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
      </body>
    </html>
  );
}
