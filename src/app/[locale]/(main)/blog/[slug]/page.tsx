/**
 * Blog post detail page — /blog/[slug]
 *
 * WHY THIS DESIGN:
 * Each blog post is a statically generated page (generateStaticParams) so
 * search engines can index the full content without JavaScript execution.
 * Metadata is generated per-post for accurate title, description, canonical,
 * and OpenGraph — critical for SEO performance on comparison and roundup posts.
 *
 * STRUCTURED DATA:
 * Article JSON-LD signals to Google that this is editorial content, improving
 * eligibility for rich results. BreadcrumbList JSON-LD enables breadcrumb
 * display in SERPs.
 *
 * CONTENT RENDERING:
 * Post body HTML comes from blog-posts.ts contentHtml field.
 * dangerouslySetInnerHTML is safe here because the content is authored
 * entirely in-repo — there is no user-generated content.
 *
 * PATTERN:
 * - generateStaticParams → static generation (no force-dynamic needed)
 * - generateMetadata → per-post SEO metadata
 * - Related posts → internal linking signal to other blog posts
 * - CTA → conversion path from content to free trial
 *
 * Created: 2026-04-14
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/config/blog-posts";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://generateailogo.com";

/** Category badge colors — same as blog index, kept consistent */
const CATEGORY_STYLES: Record<string, string> = {
  Comparison: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Roundup: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
  Tutorial: "bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30",
  Guide: "bg-violet-500/20 text-violet-400 border border-violet-500/30",
};

// ── Static params ─────────────────────────────────────────────────────────────
/**
 * generateStaticParams — tells Next.js which [slug] values exist at build time.
 * This enables static generation (HTML pre-rendered) rather than server rendering
 * on each request, which is faster and cheaper at scale.
 */
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

// ── Per-post metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | LogoForge AI Blog",
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      type: "article",
      siteName: "LogoForge AI",
      locale: "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["LogoForge AI"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 2);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const categoryStyle =
    CATEGORY_STYLES[post.category] ??
    "bg-purple-500/20 text-purple-400 border border-purple-500/30";

  // ── Article JSON-LD ──────────────────────────────────────────────────────
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url: canonicalUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "LogoForge AI",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "LogoForge AI",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  // ── BreadcrumbList JSON-LD ───────────────────────────────────────────────
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <div className="bg-background min-h-screen">
        {/* ── Article header ─────────────────────────────────────────────── */}
        <header className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-purple-500/5 via-fuchsia-500/5 to-transparent py-16">
          <div className="container mx-auto max-w-3xl px-4">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground line-clamp-1">{post.title}</span>
            </nav>

            {/* Category badge */}
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${categoryStyle}`}
            >
              {post.category}
            </span>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.readingTimeMinutes} min read</span>
              <span>·</span>
              <span>LogoForge AI</span>
            </div>
          </div>

          {/* Decorative orb */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-500/8 blur-3xl"
          />
        </header>

        {/* ── Article body ───────────────────────────────────────────────── */}
        <div className="container mx-auto max-w-3xl px-4 py-12">
          {/*
            Prose-like article styles applied via className on the wrapper.
            These target the h2, h3, p, ul, ol, table, blockquote tags
            in the HTML content from blog-posts.ts.
            We do not use @tailwindcss/typography — custom styles match the site theme.
          */}
          <article
            className="
              blog-article
              text-foreground
              [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight
              [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold
              [&_p]:mb-5 [&_p]:leading-7 [&_p]:text-muted-foreground [&_p]:text-base
              [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:pl-0
              [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:pl-0 [&_ol]:list-decimal [&_ol]:list-inside
              [&_li]:text-muted-foreground [&_li]:leading-7
              [&_ul_li]:flex [&_ul_li]:items-start [&_ul_li]:gap-2
              [&_ul_li]:before:mt-2 [&_ul_li]:before:h-1.5 [&_ul_li]:before:w-1.5 [&_ul_li]:before:shrink-0 [&_ul_li]:before:rounded-full [&_ul_li]:before:bg-purple-400
              [&_strong]:text-foreground [&_strong]:font-semibold
              [&_em]:text-foreground [&_em]:italic
              [&_a]:text-purple-400 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-purple-300
              [&_blockquote]:my-6 [&_blockquote]:rounded-xl [&_blockquote]:border [&_blockquote]:border-purple-500/30 [&_blockquote]:bg-purple-500/5 [&_blockquote]:px-6 [&_blockquote]:py-4
              [&_blockquote_p]:mb-0 [&_blockquote_p]:text-foreground [&_blockquote_p]:font-medium
              [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
              [&_thead]:border-b [&_thead]:border-border/60
              [&_th]:py-3 [&_th]:px-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground
              [&_td]:py-3 [&_td]:px-4 [&_td]:text-muted-foreground [&_td]:border-b [&_td]:border-border/40
              [&_tr:last-child_td]:border-b-0
              [&_tr:nth-child(even)]:bg-card/30
            "
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* ── CTA inline ────────────────────────────────────────────────── */}
          <div className="my-12 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 p-8 text-center">
            <h2 className="text-xl font-bold sm:text-2xl">
              Try LogoForge AI Free
            </h2>
            <p className="mt-2 text-muted-foreground text-sm">
              3 free logo generations — no credit card required.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-purple-600 hover:to-pink-600 hover:shadow-purple-500/25"
            >
              Create Your Logo →
            </Link>
          </div>

          {/* ── Related posts ────────────────────────────────────────────── */}
          {relatedPosts.length > 0 && (
            <aside className="mt-12 border-t border-border/60 pt-12">
              <h2 className="mb-6 text-xl font-bold">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((relatedPost) => {
                  const relatedCategoryStyle =
                    CATEGORY_STYLES[relatedPost.category] ??
                    "bg-purple-500/20 text-purple-400 border border-purple-500/30";

                  return (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group flex flex-col rounded-xl border border-border/60 bg-card/40 p-5 transition-all hover:border-purple-500/40 hover:bg-card/60"
                    >
                      <span
                        className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${relatedCategoryStyle}`}
                      >
                        {relatedPost.category}
                      </span>
                      <h3 className="mt-3 text-base font-semibold leading-snug text-foreground group-hover:text-purple-300 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <span className="mt-4 text-xs font-medium text-purple-400">
                        Read article →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </aside>
          )}

          {/* ── Back to blog ────────────────────────────────────────────── */}
          <div className="mt-12 border-t border-border/60 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
