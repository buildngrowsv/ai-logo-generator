/**
 * Composed middleware — next-intl locale routing + Better Auth cookie gate.
 *
 * Order: skip `/api` entirely (APIs do their own auth). Run intl for pages.
 * Then strip `/es` prefix mentally to match legacy PUBLIC_PATHS from the
 * pre-i18n middleware (Builder 25, pane1774 T13).
 */
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function stripLocalePrefix(pathname: string): string {
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const rest = pathname === "/es" ? "" : pathname.slice(3);
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

const PUBLIC_PATHS = [
  "/",
  "/pricing",
  "/login",
  "/about",
  "/privacy-policy",
  "/privacy",
  "/terms-of-service",
  "/terms",
  "/refund-policy",
  "/refund",
  "/gallery",
  /* SEO comparison pages — must be public for Google indexing */
  "/vs",
  /* Blog content */
  "/blog",
  /* Sitemap and OG image routes */
  "/sitemap.xml",
  "/robots.txt",
  "/opengraph-image",
];

function isPublicPath(strippedPathname: string): boolean {
  if (strippedPathname.startsWith("/api/auth") || strippedPathname.startsWith("/api/stripe/webhook")) {
    return true;
  }
  return PUBLIC_PATHS.some(
    (publicPath) => strippedPathname === publicPath || strippedPathname.startsWith(`${publicPath}/`),
  );
}

function isStaticAssetPath(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/icons") ||
    /\.[a-zA-Z0-9]+$/.test(pathname.split("/").pop() ?? "")
  );
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (isStaticAssetPath(pathname)) {
    return NextResponse.next();
  }

  const intlResponse = intlMiddleware(request);

  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  const stripped = stripLocalePrefix(request.nextUrl.pathname);

  if (isPublicPath(stripped)) {
    return intlResponse;
  }

  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    const usesSpanishLocale = pathname === "/es" || pathname.startsWith("/es/");
    const loginPath = usesSpanishLocale ? "/es/login" : "/login";
    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|privacy|terms|refund-policy).*)"],
};
