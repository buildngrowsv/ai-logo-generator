/**
 * Root pass-through for next-intl — document shell lives in `[locale]/layout.tsx`.
 *
 * Builder 25 (2026-03-25): T13 routing; keeps Better Auth + messages under locale.
 */
import type { ReactNode } from "react";
import type { Viewport } from "next";
import { default as GoogleAnalyticsLoader } from "@/components/GoogleAnalytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GoogleAnalyticsLoader />
      {children}
    </>
  );
}
