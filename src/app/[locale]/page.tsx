/**
 * Locale homepage — renders the marketing landing page.
 *
 * WHY THIS IS HERE (not in (main)/page.tsx):
 * Vercel's Next.js 15 build fails with "ENOENT: page_client-reference-manifest.js"
 * when a client component import chain exists inside a route group under a dynamic
 * [locale] segment. Moving the homepage page to [locale]/page.tsx (outside the route
 * group) avoids the issue. The SiteHeader/SiteFooter layout is applied explicitly
 * since this page doesn't inherit the (main) route group layout.
 */
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import HomePageContent from "@/components/HomePageContent";

export default function LocaleHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HomePageContent />
      </main>
      <SiteFooter />
    </div>
  );
}
