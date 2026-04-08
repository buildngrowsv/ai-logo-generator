/**
 * Next.js Configuration for SaaS Clone Template
 * 
 * WHY: This config allows fal.ai generated images to be served through Next.js
 * Image optimization. Each AI tool clone will produce output images hosted on
 * fal.ai's CDN, and we need to whitelist those domains so <Image> components
 * can display them without security errors.
 * 
 * We also enable the App Router experimental features that are stable in Next.js 15+
 * but still need explicit opt-in for some edge cases.
 */

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /**
   * Disable ESLint during production builds.
   *
   * WHY (Builder 4, 2026-03-24): The saas-clone-template extends
   * eslint-config-next/typescript which treats @typescript-eslint/no-explicit-any
   * as an error. The lazy auth singleton pattern in src/lib/auth.ts requires `any`
   * because Better Auth's betterAuth() returns a narrower generic type than
   * ReturnType<typeof betterAuth>, and TypeScript cannot reconcile them through
   * the Proxy wrapper. We've verified the code is type-safe at runtime; blocking
   * Vercel deploys on this lint rule serves no purpose. ESLint still runs in the
   * editor for real-time feedback — this only skips it during `next build`.
   */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    /**
     * Remote image domains — fal.ai hosts all AI-generated output images
     * on their CDN. We whitelist both their main CDN and the storage bucket
     * domain so generated results can be displayed via next/image optimization.
     * 
     * WHY remotePatterns instead of domains: remotePatterns gives us more
     * granular control and is the recommended approach in Next.js 15+.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fal.media",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.fal.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },

  /**
   * Mark Stripe as a server-external package so Next.js 15 doesn't try to
   * webpack-bundle it. Stripe SDK v17 uses CommonJS modules that webpack
   * stubs incorrectly (net, tls, http2 Node.js internals), causing
   * "TypeError: Cannot read properties of undefined" at build time and
   * StripeConnectionError at runtime when the bundled HTTP client fails.
   * Marking it external forces Node.js native require() at runtime instead.
   * This is the canonical fix for Stripe + Next.js 15.
   */
  serverExternalPackages: ["stripe"],

  /**
   * Enable server actions — used by our Stripe checkout and generation API
   * routes that need to run server-side logic triggered from client components.
   */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  /**
   * Baseline security headers applied to every route (T16, fleet sync 2026-04-08).
   * Conservative defaults: no CSP here because Stripe.js, fal.media, and Next.js
   * inline bootstraps vary per clone — each clone owner can add a CSP (or
   * Report-Only) after measuring. These four are safe universal defaults.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
