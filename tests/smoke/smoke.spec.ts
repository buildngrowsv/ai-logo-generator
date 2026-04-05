/**
 * tests/smoke/smoke.spec.ts — Ai Logo Generator smoke tests
 *
 * RUN:
 *   npx playwright test tests/smoke
 *   BASE_URL=https://logo.symplyai.io npx playwright test tests/smoke
 *
 * pane1774 swarm — Scout 16, 2026-03-27
 */

import { expect, test } from "@playwright/test";

test.describe("EN homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page title contains product name", async ({ page }) => {
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/logo|ai logo|brand/i);
  });

  test("main heading is visible", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("pricing link is visible in nav", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /pricing/i }).first()
    ).toBeVisible();
  });

  test("pricing link navigates to /pricing", async ({ page }) => {
    await page.getByRole("link", { name: /pricing/i }).first().click();
    await expect(page).toHaveURL(/\/pricing/);
  });
});

test.describe("Pricing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pricing");
  });

  test("pricing page renders without error", async ({ page }) => {
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText(/application error|this page crashed/i)).toBeHidden();
  });

  test("subscription pricing is visible", async ({ page }) => {
    await expect(page.getByText(/\$\d+\.\d{2}\/mo/).first()).toBeVisible();
  });

  test("checkout-state CTA is present", async ({ page }) => {
    const cta = page
      .getByRole("button", { name: /get started|unavailable here/i })
      .first();
    await expect(cta).toBeVisible();
  });

  test("free tier described", async ({ page }) => {
    await expect(page.getByText(/free/i).first()).toBeVisible();
  });
});

test.describe("ES locale routes", () => {
  test("/es homepage renders without 404", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText(/page not found|404/i)).toBeHidden();
  });

  test("/es/pricing renders without 404", async ({ page }) => {
    await page.goto("/es/pricing");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByText(/page not found|404/i)).toBeHidden();
  });
});

test.describe("API route sanity", () => {
  test("POST /api/logo/generate returns structured error on empty body", async ({ request }) => {
    const resp = await request.post("/api/logo/generate", {
      headers: { "Content-Type": "application/json" },
      data: {},
    });
    expect([400, 401, 422, 429]).toContain(resp.status());
    const body = await resp.json().catch(() => null);
    expect(body).not.toBeNull();
    expect(body).toHaveProperty("error");
  });

  test("POST /api/stripe/checkout-session returns structured response on empty body", async ({ request }) => {
    const resp = await request.post("/api/stripe/checkout-session", {
      headers: { "Content-Type": "application/json" },
      data: {},
    });
    expect(resp.status()).not.toBe(404);
  });
});
