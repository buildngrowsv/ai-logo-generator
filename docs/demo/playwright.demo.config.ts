/**
 * playwright.demo.config.ts — Demo recording config for AI Logo Generator
 *
 * PURPOSE: Enables video:on for product demo recordings.
 * Lives in docs/demo/ — run from repo root with NODE_PATH fix for module resolution.
 *
 * USAGE from ai-logo-generator/ root:
 *   NODE_PATH=$(pwd)/node_modules DEMO_URL=https://generateailogo.com \
 *   npx playwright test docs/demo/ailogo-demo.spec.ts \
 *     --config docs/demo/playwright.demo.config.ts
 *
 * SWARM: Scout 4, T3, pane1774, 2026-03-28
 */

import { defineConfig, devices } from "@playwright/test";
import path from "path";

const DEMO_BASE_URL =
  process.env.DEMO_URL || "https://generateailogo.com";

export default defineConfig({
  testDir: __dirname,
  testMatch: "*-demo.spec.ts",

  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ["line"],
    ["html", {
      outputFolder: path.join(__dirname, "playwright-report"),
      open: "never",
    }],
  ],

  use: {
    baseURL: DEMO_BASE_URL,
    headless: true,
    trace: "retain-on-failure",

    video: {
      mode: "on",
      size: { width: 1280, height: 720 },
    },

    screenshot: "on",
    viewport: { width: 1280, height: 720 },
  },

  outputDir: path.join(__dirname, "videos"),

  projects: [
    {
      name: "demo-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
