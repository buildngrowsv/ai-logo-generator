/**
 * Blog index page — /blog
 *
 * WHY THIS EXISTS:
 * A blog with comparison, roundup, tutorial, and guide content targets
 * mid-to-bottom-of-funnel search traffic for "AI logo generator" related
 * queries. Each article captures users at different stages of the buyer
 * journey and funnels them to the free trial CTA.
 *
 * SEO STRATEGY:
 * - Title targets "AI logo generator blog" + brand name
 * - Structured data: CollectionPage + BlogPosting breadcrumbs
 * - Category filters improve internal linking signals
 * - Each post card links to /blog/[slug] for deep indexing
 *
 * PATTERN: Server Component with metadata export (same as pricing/page.tsx).
 * No "use client" — all rendering is static and cacheable.
 *
 * Created: 2026-04-14
 */

import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/config/blog-posts";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://generateailogo.com";

export const metadata: Metadata = {
  title: "Blog | LogoForge AI — AI Logo Generator Tips, Guides & Comparisons",
  description:
    "Learn how to create professional logos with AI. Honest tool comparisons, step-by-step tutorials, and complete guides to logo design for startups and freelancers.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog | LogoForge AI — AI Logo Generator Tips & Comparisons",
    description:
      "Honest comparisons, tutorials, and guides for AI logo generation. Learn which tools are worth it and how to get the best results.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "LogoForge AI",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LogoForge AI Blog — AI Logo Generator Tips & Comparisons",
    description:
      "Honest comparisons, tutorials, and guides for AI logo generation.",
  },
  robots: { index: true, follow: true },
};

/** Category badge colors — matches the purple/pink site theme */
const CATEGORY_STYLES: Record<string, string> = {
  Comparison: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Roundup: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
  Tutorial: "bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30",
  Guide: "bg-violet-500/20 text-violet-400 border border-violet-500/30",
};

export default function BlogIndexPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "LogoForge AI Blog",
    description:
      "AI logo generator tips, comparisons, tutorials, and guides for founders and freelancers.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "LogoForge AI",
      url: SITE_URL,
    },
    hasPart: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      description: post.excerpt,
    })),
  };

  return (
    <>
      {/* Structured data — CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-background min-h-screen">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-purple-500/5 via-fuchsia-500/5 to-transparent py-20">
          <div className="container mx-auto max-w-5xl px-4">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Blog</span>
            </nav>

            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
                LogoForge AI Blog
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                AI Logo Generator{" "}
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Tips &amp; Guides
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Honest comparisons, step-by-step tutorials, and complete guides to logo design
                for founders, freelancers, and agencies — written by people who build and test
                AI tools professionally.
              </p>
            </div>
          </div>

          {/* Decorative gradient orb */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
          />
        </section>

        {/* ── Post Grid ────────────────────────────────────────────────────── */}
        <section className="container mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-6 sm:grid-cols-2">
            {BLOG_POSTS.map((post, index) => {
              const categoryStyle =
                CATEGORY_STYLES[post.category] ??
                "bg-purple-500/20 text-purple-400 border border-purple-500/30";

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/40 p-6 shadow-sm transition-all duration-200 hover:border-purple-500/40 hover:bg-card/60 hover:shadow-md"
                >
                  {/* Category badge */}
                  <span
                    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium ${categoryStyle}`}
                  >
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="mt-4 text-xl font-bold leading-snug tracking-tight text-foreground group-hover:text-purple-300 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  {/* Meta footer */}
                  <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span>{post.readingTimeMinutes} min read</span>
                  </div>

                  {/* Read more arrow */}
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-purple-400 group-hover:gap-2 transition-all">
                    Read article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Featured indicator on first post */}
                  {index === 0 && (
                    <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Featured
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────────────── */}
        <section className="border-t border-border/60 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 py-16">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to create your logo?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Try LogoForge AI free — 3 logos, no credit card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-purple-600 hover:to-pink-600 hover:shadow-purple-500/25"
              >
                Start for Free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-xl border border-border/60 bg-card/40 px-8 py-3 text-sm font-semibold text-foreground transition-all hover:border-purple-500/40 hover:bg-card/60"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
