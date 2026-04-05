/**
 * AuthSessionProvider — Better Auth no-op wrapper.
 *
 * This repo uses Better Auth's client hooks directly via `authClient.useSession()`;
 * there is no NextAuth React context to provide anymore. Keeping the wrapper lets
 * the layout structure stay unchanged while removing the stale NextAuth dependency.
 */

"use client";

export function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
