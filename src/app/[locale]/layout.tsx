/**
 * Locale layout — LogoForge AI branding, hreflang metadata, providers.
 *
 * Aligns public SEO with `siteConfig` (LogoForge) instead of legacy “LogoMint”
 * strings that drifted in root metadata (Scout 13 branding note).
 */
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  if (!routing.locales.includes(locale as "en" | "es")) {
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
        text: "Yes. New accounts receive free credits to generate logos before upgrading.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use logos commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Generated logos are yours to use commercially subject to plan terms.",
      },
    },
  ],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "es")) {
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
        {/* GA4 — conditionally rendered; set NEXT_PUBLIC_GA_ID in Vercel env to activate. */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <AuthSessionProvider>
          <NextIntlClientProvider messages={messages}>
            {/* Language switcher — EN | ES toggle, visible on all pages */}
            <LanguageSwitcher locale={locale} />
            {children}
          </NextIntlClientProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
