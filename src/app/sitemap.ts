/**
 * =============================================================================
 * AI Logo Generator — Sitemap Configuration
 * =============================================================================
 *
 * PURPOSE:
 * Generates sitemap.xml for search engine discovery. This app already has a
 * static robots.txt in public/ — this sitemap complements it by giving crawlers
 * an explicit list of pages to index.
 *
 * NOTE: This app uses the saas-clone-template with PRODUCT_CONFIG from
 * src/lib/config.ts.
 *
 * BASE URL: Vercel deployment URL. Update when custom domain is configured.
 *
 * ADDED: 2026-03-24 as part of SEO rollout across all clone apps.
 * =============================================================================
 */

import type { MetadataRoute } from "next";

const BASE_URL = "https://ai-logo-generator.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
