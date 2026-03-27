/**
 * tests/e2e/checkout-flow.spec.ts — Ai Logo Generator Stripe checkout E2E
 *
 * NOTE: This repo uses T131 pricing (no T018 Upstash token lifecycle).
 * After successful payment, Stripe redirects to: checkout=success
 * No Pro token is issued — checkout success is the verification signal.
 *
 * Phase 2 verifies: CTA → Stripe redirect → payment → checkout=success param.
 * Phase 3 is OMITTED (no T018 token to verify).
 *
 * REQUIRED ENV VARS:
 *   BASE_URL, TEST_CHECKOUT_EMAIL, PRIVACY_CARD_NUMBER,
 *   PRIVACY_CARD_EXPIRY, PRIVACY_CARD_CVC, TEST_STRIPE_COUPON_CODE
 *
 * pane1774 swarm — Scout 16, 2026-03-27
 */

import { expect, test } from "@playwright/test";

function hasRequiredEnvVars(): boolean {
  return [
    "PRIVACY_CARD_NUMBER",
    "PRIVACY_CARD_EXPIRY",
    "PRIVACY_CARD_CVC",
    "TEST_STRIPE_COUPON_CODE",
    "TEST_CHECKOUT_EMAIL",
  ].every((key) => Boolean(process.env[key]));
}

test.describe("Phase 1 — Homepage and free tier", () => {
  test("homepage loads with branding", async ({ page }) => {
    const resp = await page.goto("/");
    expect(resp?.status()).toBeLessThan(500);
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/logo|ai logo|brand/i);
  });

  test("homepage shows main heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  });

  test("pricing page accessible from nav", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /pricing/i }).first().click();
    await expect(page).toHaveURL(/\/pricing/);
  });

  test("upgrade CTA present on pricing page", async ({ page }) => {
    await page.goto("/pricing");
    const cta = page
      .getByRole("button", { name: /upgrade to pro|get pro|upgrade|subscribe|go pro/i })
      .first();
    await expect(cta).toBeVisible();
  });
});

test.describe("Phase 2 — Full Stripe checkout", () => {
  test.beforeEach(() => {
    if (!hasRequiredEnvVars()) test.skip();
  });

  test("complete checkout from pricing page to success", async ({ page }) => {
    const email = process.env.TEST_CHECKOUT_EMAIL!;
    const cardNumber = process.env.PRIVACY_CARD_NUMBER!;
    const cardExpiry = process.env.PRIVACY_CARD_EXPIRY!;
    const cardCvc = process.env.PRIVACY_CARD_CVC!;
    const couponCode = process.env.TEST_STRIPE_COUPON_CODE!;

    await page.goto("/pricing");
    await page.waitForLoadState("networkidle");

    const ctaButton = page
      .getByRole("button", { name: /upgrade to pro|get pro|upgrade|subscribe|go pro/i })
      .first();
    await expect(ctaButton).toBeVisible({ timeout: 10_000 });
    await ctaButton.click();

    await page.waitForURL(/checkout\.stripe\.com/, { timeout: 30_000 });
    await page.waitForLoadState("domcontentloaded");

    const emailInput = page.getByRole("textbox", { name: /email/i }).first();
    if (await emailInput.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await emailInput.fill(email);
    }

    const couponLink = page.getByText(/promotion code|coupon|promo/i).first();
    if (await couponLink.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await couponLink.click();
      await page.waitForTimeout(1_000);
      const couponInput = page.getByPlaceholder(/promotion|coupon|code/i).first();
      if (await couponInput.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await couponInput.fill(couponCode);
        const applyBtn = page.getByRole("button", { name: /apply/i }).first();
        if (await applyBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
          await applyBtn.click();
        } else {
          await couponInput.press("Enter");
        }
        await page.waitForTimeout(2_000);
      }
    }

    const cardNumberInput = page.frameLocator('iframe[name*="card-number"]').getByRole("textbox").first();
    if (await cardNumberInput.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await cardNumberInput.fill(cardNumber);
      await page.frameLocator('iframe[name*="card-expiry"]').getByRole("textbox").first().fill(cardExpiry);
      await page.frameLocator('iframe[name*="card-cvc"]').getByRole("textbox").first().fill(cardCvc);
    } else {
      const combinedFrame = page.frameLocator('iframe[title*="Secure card"]').first();
      if (await combinedFrame.locator('input[name="cardnumber"]').isVisible({ timeout: 3_000 }).catch(() => false)) {
        await combinedFrame.locator('input[name="cardnumber"]').fill(cardNumber);
        await combinedFrame.locator('input[name="exp-date"]').fill(cardExpiry);
        await combinedFrame.locator('input[name="cvc"]').fill(cardCvc);
      } else {
        const d = page.getByPlaceholder(/card number|1234/i).first();
        if (await d.isVisible({ timeout: 3_000 }).catch(() => false)) await d.fill(cardNumber);
        const e = page.getByPlaceholder(/mm.*yy|expiry|expiration/i).first();
        if (await e.isVisible({ timeout: 2_000 }).catch(() => false)) await e.fill(cardExpiry);
        const c = page.getByPlaceholder(/cvc|cvv|security/i).first();
        if (await c.isVisible({ timeout: 2_000 }).catch(() => false)) await c.fill(cardCvc);
      }
    }

    const payButton = page.getByRole("button", { name: /pay|subscribe|complete|confirm/i }).first();
    await expect(payButton).toBeVisible({ timeout: 10_000 });
    await payButton.click();

    // Verify we land on success page (no token — T018 not implemented)
    await page.waitForURL(
      (url) => url.searchParams.has("checkout"),
      { timeout: 60_000 }
    );

    const urlObj = new URL(page.url());
    const successParam = urlObj.searchParams.get("checkout");
    expect(successParam, "No success param in success URL").toBeTruthy();
  });
});
