/**
 * /terms-of-service -> /terms permanent redirect.
 *
 * The canonical terms page lives at /terms (outside the [locale] group
 * so it renders without next-intl middleware). This redirect catches legacy
 * links, crawlers, and footer references that used the old /terms-of-service
 * path which only resolved under [locale]/(main)/ and 404d at the root.
 */
import { redirect } from "next/navigation";

export default function TermsOfServiceRedirect() {
  redirect("/terms");
}
