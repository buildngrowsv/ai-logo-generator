/**
 * playwright.config.ts — Ai Logo Generator E2E test configuration
 *
 * Starter price: $4.90/month. Pro price: $14.90/month.
 * Note: These repos use T131 pricing (no T018 token lifecycle).
 * Phase 2 checkout test verifies Stripe redirect + success URL.
 * No Phase 3 token entitlement test (T018 not implemented).
 *
 * BASE_URL=https://logo-generator.symplyai.io npx playwright test
 *
 * pane1774 swarm — Scout 16, 2026-03-27
 */

import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL || "http://localhost:4837";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "line",

  use: {
    baseURL,
    headless: !process.env.PWDEBUG,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "rm -rf .next && npm run dev",
        env: {
          ...process.env,
          NEXTAUTH_URL: baseURL,
          AUTH_URL: baseURL,
        },
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 300_000,
      },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
