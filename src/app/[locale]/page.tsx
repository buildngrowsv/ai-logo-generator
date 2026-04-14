/**
 * Locale homepage — delegates to (main)/page.tsx.
 *
 * WHY NOT `export { default }`:
 * Re-exporting a "use client" component from a dynamic [locale] route
 * causes Vercel's build to fail with a missing
 * `page_client-reference-manifest.js` error. Wrapping in a thin Server
 * Component avoids the issue while keeping the same render output.
 */
import HomePage from "./(main)/page";

export default function LocaleHomePage() {
  return <HomePage />;
}
