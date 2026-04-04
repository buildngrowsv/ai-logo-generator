/**
 * /terms — convenience redirect to /terms-of-service.
 *
 * Directories and users expect /terms at a standard path.
 * The actual content lives at /[locale]/(main)/terms-of-service.
 */
import { permanentRedirect } from "next/navigation";

export default function TermsRedirect() {
  permanentRedirect("/terms-of-service");
}
