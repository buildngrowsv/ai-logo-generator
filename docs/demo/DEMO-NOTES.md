# AI Logo Generator — Demo Notes

**Captured:** 2026-03-28
**Live URL:** https://logo.symplyai.io
**Brand:** LogoForge AI
**Vercel URL:** https://ai-logo-generator.vercel.app (redirects to banananano2pro.com — aliased incorrectly)

## Screenshots Captured

| File | URL | Notes |
|------|-----|-------|
| `01-homepage.png` | https://logo.symplyai.io/ | Marketing landing page — H1 "LogoForge AI", hero with Get Started / View Pricing CTAs |
| `02-pricing.png` | https://logo.symplyai.io/en/pricing | Full pricing page — Starter $4.90/mo, Creator $14.90/mo, Agency $39.90/mo + credit packs |
| `03-login-studio.png` | https://logo.symplyai.io/login | Login page — "Sign in to create logos", Google OAuth CTA |

## Site Health

- **HTTP Status:** 200 OK on all pages
- **Page loads cleanly** at logo.symplyai.io
- **Auth gating works:** /studio redirects to /login (correct behavior)
- **Locale redirect issue:** Headless browsers may redirect to /es (Spanish) depending on Accept-Language. Use /en/ prefix to force English.
- **Console errors:** Auth session API returns 500 (auth.ts baseURL mismatch) — known issue from audit, does not break public landing
- **generateailogo.com DNS:** Not resolving — domain not live or not pointed correctly

## Issues Found

1. **`ai-logo-generator.vercel.app` redirects to `banananano2pro.com`** — Vercel alias conflict. The canonical domain is `logo.symplyai.io`. Anyone using the .vercel.app URL lands on the wrong product.
2. **`generateailogo.com` not resolving** — 404/ERR_NAME_NOT_RESOLVED. If this domain was intended as the primary brand domain, DNS needs to be configured.
3. **Auth session 500 errors** — `/api/auth/session` returns 500 in console. Auth may not fully work in production.
4. **Locale auto-redirect to Spanish** — Headless browsers without Accept-Language header may land on `/es`. Real users with EN browsers will be fine.

## Content Verified

- Hero: "Create stunning professional logos in seconds with AI"
- 3 plans: Starter (30 credits/$4.90), Creator (150 credits/$14.90), Agency (500 credits/$39.90)
- Credit packs: 25 credits/$9.90, more tiers up
- FAQ section present (6 questions)
- Footer with Product/Company links
- Free tier: 3 logos (15 credits) on signup
