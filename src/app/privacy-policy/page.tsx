/**
 * /privacy-policy -> /privacy permanent redirect.
 *
 * The canonical privacy page lives at /privacy (outside the [locale] group
 * so it renders without next-intl middleware). This redirect catches legacy
 * links, crawlers, and footer references that used the old /privacy-policy
 * path which only resolved under [locale]/(main)/ and 404d at the root.
 */
import { redirect } from "next/navigation";

export default function PrivacyPolicyRedirect() {
  redirect("/privacy");
}
