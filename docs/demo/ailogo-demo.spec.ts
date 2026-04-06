/**
 * ailogo-demo.spec.ts — Full product demo recording for AI Logo Generator
 *
 * PURPOSE: Records a complete user flow walkthrough of generateailogo.com for operator review,
 * investor demos, and product documentation. Generates a .webm video recording
 * plus screenshots at each major step.
 *
 * TARGET: https://generateailogo.com (HTTP 200 verified 2026-03-28)
 *   Fallback: https://logo.symplyai.io (also 200)
 *
 * DEMO FLOW (9 steps):
 * 1. Landing page — hero, headline, sample logos
 * 2. Pricing/features — pricing section or modal
 * 3. Sign up flow — click signup, show auth form
 * 4. Signed in state — show dashboard/generation area
 * 5. Core feature — logo generation prompt, style selector, output
 * 6. Account page — credits, settings
 * 7. Logout — signed-out state
 * 8. Login — show login form
 * 9. Feature reuse — return to generation UI
 *
 * NOTE: DATABASE_URL missing from Vercel env for ai-logo-generator — auth/credits
 * non-functional in production. Demo captures the UI flows visible to anonymous users
 * and auth redirect behavior. This is documented in findings.
 *
 * USAGE:
 *   cd Github/ai-logo-generator
 *   NODE_PATH=$(pwd)/node_modules DEMO_URL=https://generateailogo.com \
 *   npx playwright test docs/demo/ailogo-demo.spec.ts \
 *     --config docs/demo/playwright.demo.config.ts
 *
 * SWARM: Scout 4, T3, pane1774, 2026-03-28
 */

import { test, expect, Page } from "@playwright/test";
import path from "path";
import fs from "fs";

// ─── Config ─────────────────────────────────────────────────────────────────
const DEMO_BASE_URL =
  process.env.DEMO_URL || "https://generateailogo.com";

const SCREENSHOTS_DIR = path.join(__dirname, "screenshots");

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function step(
  page: Page,
  number: string,
  label: string,
  waitMs = 1500
): Promise<void> {
  await page.waitForTimeout(waitMs);

  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const filename = path.join(SCREENSHOTS_DIR, `${number}-${label}.png`);
  await page.screenshot({ path: filename, fullPage: false });
  console.log(`📸 Screenshot saved: ${number}-${label}.png`);
}

// ─── Test Suite ──────────────────────────────────────────────────────────────

test.describe("AI Logo Generator — Full Product Demo", () => {

  test("complete user flow walkthrough", async ({ page }) => {

    // ── Step 1: Landing Page ─────────────────────────────────────────────────
    console.log("▶ Step 1: Landing Page");
    await page.goto(DEMO_BASE_URL, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(2000);

    const pageTitle = await page.title();
    console.log(`  Page title: ${pageTitle}`);

    await step(page, "01", "landing");

    // ── Step 2: Pricing / Features ────────────────────────────────────────────
    console.log("▶ Step 2: Pricing / Features");

    // Try clicking pricing link in nav
    const pricingLink = page
      .locator('a[href*="pric"], a:has-text("Pricing"), a:has-text("Plans"), button:has-text("Pricing")')
      .first();

    if ((await pricingLink.count()) > 0) {
      await pricingLink.click();
      await page.waitForTimeout(1500);
    } else {
      // Navigate to /pricing
      await page.goto(`${DEMO_BASE_URL}/pricing`, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
      await page.waitForTimeout(1500);
    }

    await step(page, "02", "pricing");

    // ── Step 3: Sign Up Flow ──────────────────────────────────────────────────
    console.log("▶ Step 3: Sign Up Flow");

    await page.goto(DEMO_BASE_URL, { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(1000);

    // Try to find signup button
    const signupBtn = page
      .locator(
        'a[href*="sign-up"], a[href*="signup"], a[href*="register"], a:has-text("Get Started"), a:has-text("Sign Up"), a:has-text("Start Free"), button:has-text("Sign Up"), button:has-text("Get Started")'
      )
      .first();

    if ((await signupBtn.count()) > 0) {
      await signupBtn.click();
      await page.waitForTimeout(2000);
    } else {
      await page.goto(`${DEMO_BASE_URL}/sign-up`, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
      await page.waitForTimeout(1500);
    }

    await step(page, "03", "signup");

    // ── Step 4: Signed-In / Dashboard ─────────────────────────────────────────
    console.log("▶ Step 4: Dashboard / Generator Area");

    await page.goto(`${DEMO_BASE_URL}/dashboard`, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    await page.waitForTimeout(2000);

    await step(page, "04", "signed-in");

    // ── Step 5: Core Feature — Logo Generation ────────────────────────────────
    console.log("▶ Step 5: Core Feature — Logo Generation");

    await page.goto(`${DEMO_BASE_URL}/generate`, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    await page.waitForTimeout(2000);

    // Also try the root if /generate redirects
    const afterGenUrl = page.url();
    if (afterGenUrl.includes("sign-in") || afterGenUrl.includes("login")) {
      // Go back to homepage which should show the tool
      await page.goto(DEMO_BASE_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
      await page.waitForTimeout(1500);
      // Scroll to the generator embed if on the homepage
      await page.evaluate(() => window.scrollTo({ top: 500, behavior: "smooth" }));
      await page.waitForTimeout(800);
    }

    await step(page, "05", "core-feature");

    // ── Step 6: Account / Settings ────────────────────────────────────────────
    console.log("▶ Step 6: Account / Settings");

    await page.goto(`${DEMO_BASE_URL}/settings`, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    await page.waitForTimeout(1500);

    // Fallback to /account
    const settingsUrl = page.url();
    if (settingsUrl.includes("404")) {
      await page.goto(`${DEMO_BASE_URL}/account`, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
      await page.waitForTimeout(1500);
    }

    await step(page, "06", "account");

    // ── Step 7: Logout ────────────────────────────────────────────────────────
    console.log("▶ Step 7: Logout");

    await page.goto(DEMO_BASE_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1000);

    const logoutBtn = page
      .locator(
        'a[href*="sign-out"], a[href*="logout"], a:has-text("Sign Out"), a:has-text("Log Out"), button:has-text("Sign Out")'
      )
      .first();

    if ((await logoutBtn.count()) > 0) {
      await logoutBtn.click();
      await page.waitForTimeout(1500);
    }

    await step(page, "07", "logged-out");

    // ── Step 8: Login ─────────────────────────────────────────────────────────
    console.log("▶ Step 8: Login Page");

    await page.goto(`${DEMO_BASE_URL}/sign-in`, {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    });
    await page.waitForTimeout(2000);

    // Fallback to /login
    const loginUrl = page.url();
    if (loginUrl.includes("404") || loginUrl === DEMO_BASE_URL + "/") {
      await page.goto(`${DEMO_BASE_URL}/login`, {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });
      await page.waitForTimeout(1500);
    }

    await step(page, "08", "login");

    // ── Step 9: Feature Reuse ─────────────────────────────────────────────────
    console.log("▶ Step 9: Feature Reuse");

    await page.goto(DEMO_BASE_URL, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1200);

    // Show the logo generator area
    await page.evaluate(() => window.scrollTo({ top: 350, behavior: "smooth" }));
    await page.waitForTimeout(800);

    await step(page, "09", "feature-reuse");

    console.log("✅ AI Logo Generator demo recording complete!");
    console.log(`📁 Screenshots: ${SCREENSHOTS_DIR}`);
  });
});
