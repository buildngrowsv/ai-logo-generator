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

/* ─── Auth Rate Limiter (credential stuffing prevention) ───────────────────
 * In-memory sliding window: max 10 requests per 60 s per client IP on
 * sensitive auth endpoints (sign-in, sign-up, password reset, OAuth callback).
 * Returns 429 with Retry-After header when exceeded.
 * Self-contained — no external imports needed.
 */
interface AuthRateLimitEntry { count: number; windowStart: number; }
const AUTH_RATE_LIMIT_MAP = new Map<string, AuthRateLimitEntry>();
const AUTH_RATE_LIMIT_MAX = 10;
const AUTH_RATE_LIMIT_WINDOW_MS = 60_000;

const SENSITIVE_AUTH_PATHS = [
  "/api/auth/signin", "/api/auth/sign-in",
  "/api/auth/signup", "/api/auth/sign-up",
  "/api/auth/callback",
  "/api/auth/forget-password", "/api/auth/reset-password",
];

function extractClientIpFromMiddleware(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkAuthRateLimit(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  const isSensitive = SENSITIVE_AUTH_PATHS.some((p) => pathname.startsWith(p));
  if (!isSensitive) return null;
  const ip = extractClientIpFromMiddleware(request);
  const now = Date.now();
  const entry = AUTH_RATE_LIMIT_MAP.get(ip);
  if (!entry || now - entry.windowStart > AUTH_RATE_LIMIT_WINDOW_MS) {
    AUTH_RATE_LIMIT_MAP.set(ip, { count: 1, windowStart: now });
    return null;
  }
  entry.count++;
  if (entry.count > AUTH_RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((entry.windowStart + AUTH_RATE_LIMIT_WINDOW_MS - now) / 1000);
    return NextResponse.json(
      { error: "Too many authentication attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }
  return null;
}

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

  // Added by merge-pseo-middleware-paths.mjs (Gate 9 compliance)
  "/for",
  "/use-cases",
  "/best",
  "/lp",
  "/testimonials",
  "/ai-",
  "/api/health",
  "/get-started",
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

  // Rate-limit sensitive auth endpoints before allowing them through
  if (pathname.startsWith("/api/auth")) {
    const rateLimitResponse = checkAuthRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;
  }

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|privacy-policy|privacy|terms-of-service|terms|refund-policy|refund)|pricing|vs|for|use-cases|best|blog|lp|testimonials|ai-|get-started.*)"],
};
