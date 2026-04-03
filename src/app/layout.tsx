/**
 * Root pass-through for next-intl — document shell lives in `[locale]/layout.tsx`.
 *
 * Builder 25 (2026-03-25): T13 routing; keeps Better Auth + messages under locale.
 */
import type { ReactNode } from "react";
import { default as GoogleAnalyticsLoader } from "@/components/GoogleAnalytics";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GoogleAnalyticsLoader />
      {children}
    </>
  );
}
