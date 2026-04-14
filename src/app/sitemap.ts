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
import { siteConfig } from "@/config/site";
import { SEO_PAGES_CONFIG } from "@/config/seo-pages";

const BASE_URL = siteConfig.siteUrl.replace(/\/$/, "");

/**
 * Includes Spanish locale URLs for hreflang coverage (Builder 25, T13).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  /**
   * Static paths — core app pages that always exist.
   * Dynamic pSEO paths are generated from SEO_PAGES_CONFIG below.
   */
  const staticPaths = [
    "",
    "/pricing",
    "/login",
    "/gallery",
    "/about",
    "/looka-alternative",
    "/free-ai-logo-generator",
    "/ai-logo-generator-small-business",
    "/privacy",
    "/terms",
  ];

  /** Programmatic SEO paths — /vs/, /for/, /best/ generated from config */
  const vsPagePaths = SEO_PAGES_CONFIG.competitors.map((c) => `/vs/${c.slug}`);
  const forPagePaths = SEO_PAGES_CONFIG.audiences.map((a) => `/for/${a.slug}`);
  const bestPagePaths = SEO_PAGES_CONFIG.bestPages.map((b) => `/best/${b.slug}`);
  const useCasePagePaths = SEO_PAGES_CONFIG.useCases.map((u) => `/use-cases/${u.slug}`);

  const paths = [
    ...staticPaths,
    ...vsPagePaths,
    ...forPagePaths,
    ...bestPagePaths,
    ...useCasePagePaths,
  ];
  const entries: MetadataRoute.Sitemap = [];
  for (const path of paths) {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: path === "" ? 1.0 : 0.85,
      alternates: { languages: { en: `${BASE_URL}${path}`, es: `${BASE_URL}/es${path || ""}` } },
    });
    entries.push({
      url: `${BASE_URL}/es${path || ""}`,
      lastModified,
      changeFrequency: "weekly",
      priority: path === "" ? 0.95 : 0.8,
    });
  }
  return entries;
}
