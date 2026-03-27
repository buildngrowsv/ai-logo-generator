/**
 * playwright.config.ts — Ai Logo Generator E2E test configuration
 *
 * Pro price: $4.90/month.
 * Note: These repos use T131 pricing (no T018 token lifecycle).
 * Phase 2 checkout test verifies Stripe redirect + success URL.
 * No Phase 3 token entitlement test (T018 not implemented).
 *
 * BASE_URL=https://logo-generator.symplyai.io npx playwright test
 *
 * pane1774 swarm — Scout 16, 2026-03-27
 */

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "line",

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:4837",
    headless: !process.env.PWDEBUG,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
