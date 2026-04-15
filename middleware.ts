/**
 * middleware.ts — next-intl locale routing middleware.
 *
 * Intercepts all non-API, non-static requests and redirects/rewrites them
 * to the correct locale prefix. English stays at "/" (no /en prefix) and
 * Spanish moves to "/es/*" — defined in src/i18n/routing.ts.
 *
 * Builder 11 (2026-03-25): Added for pane1774 swarm T13 — clone fleet EN+ES.
 *
 * KNOWN ISSUE (razor-review-9173, 2026-04-15): next-intl v3 with localePrefix
 * "as-needed" and force-dynamic doesn't rewrite bare paths like /pricing →
 * /en/pricing. The first path segment gets treated as [locale] parameter,
 * rendering the homepage instead. Fix: standalone src/app/pricing/ route
 * that redirects to /en/pricing. See also src/app/pricing/page.tsx.
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all routes except: API routes, Next.js internals, Vercel internals,
  // static files, and /pricing (handled by standalone src/app/pricing/ route)
  matcher: ["/((?!api|_next|_vercel|privacy|terms|refund-policy|vs|for|best|use-cases|lp|testimonials|ai-|get-started|blog|contact|pricing|.*\\..*).*)"],
};
