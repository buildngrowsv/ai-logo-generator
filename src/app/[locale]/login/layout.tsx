/**
 * Login page layout — provides SEO metadata for the login page.
 *
 * WHY A SEPARATE LAYOUT:
 * The login page component is "use client" (it needs onClick handlers
 * for the Google sign-in button). Client components cannot export metadata.
 * So we use this server-side layout to set the page title and description.
 *
 * The login page does NOT use the (main) layout — no header or footer.
 * This creates a clean, focused authentication experience.
 */
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Force dynamic rendering — same reason as (main)/layout.tsx.
 * next-intl middleware rewrites /login → /en/login; without this,
 * the static-to-dynamic runtime error kills the page with 500.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Login | ${siteConfig.siteName}`,
  description: `Sign in to ${siteConfig.siteName} with your Google account.`,
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
