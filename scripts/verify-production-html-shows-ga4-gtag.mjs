#!/usr/bin/env node
/**
 * verify-production-html-shows-ga4-gtag.mjs — LogoForge / ai-logo-generator
 *
 * WHAT IT DOES:
 *   Fetches the public homepage and checks for the standard GA4 gtag.js loader URL
 *   including `id=G-…`. Same detection logic as GenFlix (banana HTML was the reference
 *   shape for the regex).
 *
 * WHY:
 *   `layout.tsx` only mounts `@next/third-parties/google` when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is
 *   set at build time. Operators need a quick post-paste verification without opening
 *   DevTools on production.
 *
 * RUN:
 *   npm run verify:ga-gtag-prod
 *   node scripts/verify-production-html-shows-ga4-gtag.mjs "https://ai-logo-generator.vercel.app"
 *
 * DEFAULT URL:
 *   https://logo.symplyai.io (canonical per STATUS.md)
 */

const DEFAULT_PRODUCTION_HOME_PAGE_URL = "https://logo.symplyai.io";

function doesHtmlAppearToLoadGa4GtagWithMeasurementId(html) {
  if (!html || typeof html !== "string") {
    return false;
  }
  if (/googletagmanager\.com\/gtag\/js\?[^"'>\s]*id=G-[A-Z0-9]+/i.test(html)) {
    return true;
  }
  if (/googletagmanager\.com\/gtag\/js[^"'>\s]*[?&]id=G-[A-Z0-9]+/i.test(html)) {
    return true;
  }
  return false;
}

async function fetchHomePageHtml(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": "LogoForge-ga4-verify/1.0 (+pane1774)",
      accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
    },
  });
  const text = await response.text();
  return { ok: response.ok, status: response.status, text };
}

async function main() {
  const url =
    process.argv[2]?.trim() ||
    process.env.VERIFY_GA4_URL?.trim() ||
    DEFAULT_PRODUCTION_HOME_PAGE_URL;

  console.log(`[LogoForge GA4 verify] GET ${url}`);

  let payload;
  try {
    payload = await fetchHomePageHtml(url);
  } catch (err) {
    console.error("[LogoForge GA4 verify] Network error:", err?.message || err);
    process.exit(1);
  }

  if (!payload.ok) {
    console.error(`[LogoForge GA4 verify] HTTP ${payload.status}`);
    process.exit(1);
  }

  if (doesHtmlAppearToLoadGa4GtagWithMeasurementId(payload.text)) {
    console.log("[LogoForge GA4 verify] OK — gtag.js with G-… found.");
    process.exit(0);
  }

  console.error(
    "[LogoForge GA4 verify] FAIL — set NEXT_PUBLIC_GA_MEASUREMENT_ID on Vercel Production, redeploy, re-run."
  );
  process.exit(1);
}

main();
