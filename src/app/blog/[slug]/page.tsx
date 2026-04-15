/**
 * /blog/[slug] — Standalone blog post page (no locale prefix).
 *
 * Imports from @/config/blog-posts (canonical source) to match the sitemap.
 * The config interface uses `contentHtml` (full HTML), `metaDescription`,
 * `metaTitle`, `readingTimeMinutes` (number), and `getRelatedPosts(slug, limit)`.
 *
 * vortex-build-4821 (2026-04-15): Rewired to use @/config/blog-posts.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/config/blog-posts";

const SITE_URL = "https://generateailogo.com";

/* ── Static generation ─────────────────────────────────────────────── */

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

/* ── Metadata ──────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.metaTitle} | GenerateAILogo`,
    description: post.metaDescription,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      siteName: "GenerateAILogo",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true },
  };
}

/* ── Category badge colors ─────────────────────────────────────────── */

function categoryBadgeClasses(category: string): string {
  switch (category.toLowerCase()) {
    case "comparison":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "roundup":
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "tutorial":
      return "bg-violet-500/20 text-violet-300 border-violet-500/30";
    case "guide":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    default:
      return "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";
  }
}

/* ── Page component ────────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: "GenerateAILogo", url: SITE_URL },
    publisher: { "@type": "Organization", name: "GenerateAILogo", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/opengraph-image`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
        <article className="mx-auto max-w-3xl px-4 pt-20 pb-16">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-200 line-clamp-1">{post.title}</span>
          </nav>

          {/* Article header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs mb-4">
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 font-medium ${categoryBadgeClasses(post.category)}`}
              >
                {post.category}
              </span>
              <span className="text-zinc-500">{post.readingTimeMinutes} min read</span>
              <span className="text-zinc-600">|</span>
              <time className="text-zinc-500" dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl leading-tight bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Article body (HTML from config/blog-posts.ts) */}
          <div
            className="prose prose-invert prose-zinc max-w-none prose-headings:text-white prose-a:text-violet-400 prose-strong:text-white prose-li:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Mid-article CTA */}
          <div className="my-10 rounded-xl border border-violet-500/20 bg-violet-950/30 p-6 text-center">
            <p className="text-sm font-medium text-violet-300 mb-2">Try it yourself</p>
            <p className="text-zinc-400 text-sm mb-4">
              Generate 3 free AI logos — no sign-up required.
            </p>
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-colors"
            >
              Create Your Logo Free
            </Link>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
                Related Articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:border-violet-500/40 hover:bg-zinc-900"
                  >
                    <span
                      className={`inline-block self-start rounded-full border px-2 py-0.5 text-xs font-medium mb-2 ${categoryBadgeClasses(related.category)}`}
                    >
                      {related.category}
                    </span>
                    <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-violet-300 transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      {related.readingTimeMinutes} min read
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <section className="text-center">
            <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/50 to-fuchsia-950/50 p-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                Ready to Create Your Logo?
              </h2>
              <p className="text-zinc-300 mb-6">
                Try GenerateAILogo free — 3 AI-generated logos, no sign-up required.
              </p>
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 hover:bg-violet-500 transition-colors"
              >
                Generate Your Logo Now
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
