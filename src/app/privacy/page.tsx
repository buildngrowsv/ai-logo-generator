/**
 * /privacy — convenience redirect to /privacy-policy.
 *
 * Directories and users expect /privacy at a standard path.
 * The actual content lives at /[locale]/(main)/privacy-policy.
 * This page lives outside [locale] so the next-intl middleware
 * does not wrap it — it just redirects.
 */
import { permanentRedirect } from "next/navigation";

export default function PrivacyRedirect() {
  permanentRedirect("/privacy-policy");
}
