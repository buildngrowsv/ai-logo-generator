/**
 * Root pass-through for next-intl — document shell lives in `[locale]/layout.tsx`.
 *
 * Builder 25 (2026-03-25): T13 routing; keeps Better Auth + messages under locale.
 */
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
