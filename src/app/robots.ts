/**
 * robots.ts — Generated robots.txt for LogoMint AI (AI Logo Generator)
 *
 * Allows all crawlers to index all public pages.
 * Blocks /api/ and /_next/ from indexing (not useful for SEO).
 * References sitemap.xml for crawler discovery.
 * Added 2026-03-24 as part of SEO rollout across all clone apps.
 */
import type { MetadataRoute } from "next";

const BASE_URL = "https://ai-logo-generator.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
