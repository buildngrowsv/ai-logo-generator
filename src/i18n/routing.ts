/**
 * Locale routing — LogoForge AI (ai-logo-generator).
 *
 * Builder 25 (2026-03-25): T13 EN+ES for symplyai.io / clone fleet SEO.
 * Expanded 2026-04-08 to EN+ES+FR+DE+PT (T-MULTILINGUAL-TOP5, steel-prism-8463).
 * French/German/Portuguese cover EU + LatAm markets with hreflang signaling.
 */
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "fr", "de", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
