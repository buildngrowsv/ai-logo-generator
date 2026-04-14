import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import CookieConsent from "@/components/CookieConsent";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import HomePage from "./[locale]/(main)/page";

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
 * context it expects for the default `en` locale.
 */
export default async function RootHomePage() {
  const messages = await getMessages({ locale: "en" });

  return (
    <AuthSessionProvider>
      <NextIntlClientProvider locale="en" messages={messages}>
        <LanguageSwitcher locale="en" />
        <HomePage />
      </NextIntlClientProvider>
      <CookieConsentBanner />
      <CookieConsent />
    </AuthSessionProvider>
  );
}
