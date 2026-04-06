# LogoForge AI — AI Logo Generator — STATUS

**Last updated:** 2026-04-04 (Vector-1729 — verified live custom domain, GA4 loader, consent banner, and Search Console ownership for `https://generateailogo.com/`; retained `logo.symplyai.io` as a working alias)
**Repo:** github.com/buildngrowsv/ai-logo-generator
**Stack:** Next.js 15 + fal.ai FLUX + Stripe + Better Auth + Drizzle/Neon + Tailwind 4

## Production URLs

- **Primary:** https://generateailogo.com (HTTP 200 ✅)
- **Alias:** https://logo.symplyai.io (HTTP 200 ✅)
- **Vercel:** https://ai-logo-generator.vercel.app

## Dev / Preview URL (develop branch)

- `develop` branch exists on origin (same commit as main as of 2026-03-28)
- **Dev URL:** Will auto-appear at `https://ai-logo-generator-git-develop-buildngrowsvs-projects.vercel.app` once a develop-only commit is pushed
- Set `DEV_BASE_URL=https://ai-logo-generator-git-develop-buildngrowsvs-projects.vercel.app` for E2E runs targeting dev

## Component Status

| Component | Status | Notes |
|-----------|--------|-------|
| Landing page | DONE ✅ | Marketing-polished, LogoForge AI branding, unique SEO |
| Core tool component | DONE ✅ | Business name + style prompt → FLUX logo generation |
| API route (/api/generate) | DONE ✅ | Server-side fal.ai proxy, IP rate-limited (5/day/IP, 429) + auth-gated (401 without session) |
| Stripe checkout endpoint | DONE ✅ | POST /api/stripe/checkout-session — verified returns cs_live_ URL |
| Stripe price IDs | DONE ✅ | 3 subs + 3 packs — all set on Vercel production |
| getStripePriceId fix | DONE ✅ | Static STRIPE_PRICE_ENV_MAP with literal access + .trim() (commit ddec3c6) |
| auth.ts baseURL trim | DONE ✅ | .trim() strips trailing \n from BETTER_AUTH_URL (commit ddec3c6) |
| SEO | DONE ✅ | Unique metadata, JSON-LD structured data, targeted keywords |
| Build | PASSES ✅ | Next.js 15.5.14, 25 static pages |
| Deploy | LIVE ✅ | generateailogo.com |
| FAL_KEY | SET ✅ | Production env var set on Vercel |
| symplyai.io subdomain | LIVE ✅ | `logo.symplyai.io` serves the same app as a working alias |
| **GA4 (web)** | **LIVE VERIFIED** ✅ | **`src/components/GoogleAnalytics.tsx`** loads GA4 only when the public measurement ID is set and applies Consent Mode defaults (`analytics_storage: denied`) before `gtag("config")`. **`src/components/CookieConsentBanner.tsx`** mounts the visible accept/reject banner and replays stored choice. On 2026-04-04, live HTML on **`https://generateailogo.com/`** and **`https://logo.symplyai.io/`** both included the GA loader for **`G-0NW1041TSN`**, and Search Console confirmed **`https://generateailogo.com/`** as **`siteOwner`**. |

## Environment Variables (Vercel Production)

| Var | Status | Notes |
|-----|--------|-------|
| `FAL_KEY` | ✅ Set | fal.ai key verified |
| `STRIPE_SECRET_KEY` | ✅ Set | sk_live_ key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ✅ Set | pk_live_ key |
| `NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY` | ✅ Set | price_1TEk7MGsPhSTDD4xTSe3mbro (Starter $4.90/mo) |
| `NEXT_PUBLIC_STRIPE_PRICE_STANDARD_MONTHLY` | ✅ Set | (Creator $14.90/mo) |
| `NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY` | ✅ Set | (Agency $39.90/mo) |
| `NEXT_PUBLIC_STRIPE_PRICE_STARTER_PACK` | ✅ Set | (5 Logos $9.90) |
| `NEXT_PUBLIC_STRIPE_PRICE_GROWTH_PACK` | ✅ Set | (25 Logos $29.90) |
| `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL_PACK` | ✅ Set | (100 Logos $79.90) |
| `BETTER_AUTH_URL` | VERIFY (BC1) | Public canonical currently resolves as `https://generateailogo.com`; verify the env value in Vercel before rotating auth config |
| `BETTER_AUTH_SECRET` | ✅ Set | Generated secret |
| `NEXT_PUBLIC_APP_URL` | VERIFY (BC1) | Public canonical currently resolves as `https://generateailogo.com`; verify the env value in Vercel before rotating domain config |
| `NEXT_PUBLIC_GA_ID` | ✅ Live | Live production HTML loads **`https://www.googletagmanager.com/gtag/js?id=G-0NW1041TSN`** on `generateailogo.com` and the alias domain |
| `DATABASE_URL` | ❌ MISSING | **BLOCKER** — Neon Postgres needed for user auth/credits |
| `GOOGLE_CLIENT_ID` | ❌ MISSING | **BLOCKER** — Google OAuth broken without this |
| `GOOGLE_CLIENT_SECRET` | ❌ MISSING | **BLOCKER** — Google OAuth broken without this |
| `STRIPE_WEBHOOK_SECRET` | ❌ MISSING | Webhook signature verification fails — credits not allocated after payment |

## What Works Right Now

- Landing page renders fully ✅ (HTTP 200 verified on `generateailogo.com`)
- Pricing page renders with real price IDs ✅ (3 subs + 3 packs configured)
- POST /api/stripe/checkout-session → returns real cs_live_ Stripe checkout URL ✅ (verified 2026-03-25)
- POST /api/stripe/webhook → correctly rejects missing/invalid signatures ✅
- POST /api/logo/generate → IP rate limit (5/day/IP) fires first → 429 after quota ✅; then auth gate → 401 for unauthenticated ✅
- Credit deduction: ⚠️ TODO — credits not actually deducted (requires DATABASE_URL)

## What Requires BCL/Dashboard Work

1. **DATABASE_URL** — Create Neon Postgres project for ai-logo-generator, run `npm run db:push` to create schema, set DATABASE_URL on Vercel
2. **GOOGLE_CLIENT_ID/SECRET** — Add `https://generateailogo.com` to Google Cloud Console OAuth credentials (authorized origins + redirect URIs: `https://generateailogo.com/api/auth/callback/google`). Keep `logo.symplyai.io` only if the alias still needs interactive auth.
3. **STRIPE_WEBHOOK_SECRET** — Add webhook endpoint `https://generateailogo.com/api/stripe/webhook` in Stripe dashboard, copy whsec_ to Vercel

## Critical Bug Fixes Applied (Builder 6, 2026-03-25)

### Bug 1: getStripePriceId used dynamic process.env access (checkout broken in browser)
Next.js replaces `process.env.NEXT_PUBLIC_*` only when accessed as literal strings at build time.
Dynamic `process.env[envKey]` = undefined in browser. All checkout buttons showed "not configured" error.
**Fix:** STRIPE_PRICE_ENV_MAP in `src/config/product.ts` with literal access per key.

### Bug 2: BETTER_AUTH_URL trailing \n caused "Invalid URL" during SSR prerender
env vars set via echo pipe append \n. Better Auth failed with ERR_INVALID_URL.
**Fix:** `.trim()` on baseURL in `src/lib/auth.ts`.

Both fixes deployed at commit ddec3c6 (2026-03-25).

### Bug 3: auth.api.getSession throws 500 when DATABASE_URL missing (T021-04, Builder 6)
`auth.api.getSession` was called outside the try/catch. When DATABASE_URL is not set, it throws
a connection error → Next.js returns empty 500 body to unauthenticated callers instead of 401.
**Fix:** Wrapped in try/catch; any auth error treated as no-session → 401. Protection unchanged.
**Status:** Committed, pending redeploy.

## Revenue Config

- **Product:** LogoForge AI — AI logo generator for small businesses and startups
- **Pricing:** Starter $4.90/mo (30 credits) | Creator $14.90/mo (150 credits) | Agency $39.90/mo (500 credits)
- **Credit packs:** 5 Logos $9.90 | 25 Logos $29.90 | 100 Logos $79.90
- **Competitor undercut:** vs Looka ($20-$129), Brandmark ($25-$175), LogoAI ($29-$99)
- **Category:** ~177 tools on Toolify, significant demand from small biz/startup market
