/**
 * Homepage route — renders HomePageContent client component.
 *
 * WHY THIS IS A SERVER COMPONENT WRAPPER:
 * Vercel's build fails with "ENOENT: page_client-reference-manifest.js"
 * when a page.tsx inside a dynamic [locale] route group directly uses
 * "use client". Moving the client logic to a component file and keeping
 * this page as a thin Server Component fixes the manifest generation.
 */
import HomePageContent from "@/components/HomePageContent";

export default function HomePage() {
  return <HomePageContent />;
}
