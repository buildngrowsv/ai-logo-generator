/**
 * =============================================================================
 * /blog/[slug] — Individual Blog Post Page
 * =============================================================================
 *
 * PURPOSE:
 * Renders a single blog post with full article content, structured data for
 * Google rich results (Article, FAQPage, BreadcrumbList), and internal linking
 * via related posts and CTAs.
 *
 * STATIC GENERATION:
 * - dynamicParams = false ensures unknown slugs return 404 instead of hanging.
 * - generateStaticParams() builds all known slugs at build time.
 * - generateMetadata() creates per-post OG tags and canonical URLs.
 *
 * LAYOUT NOTE:
 * Root layout provides <html>/<body>. This page renders content only.
 *
 * NEXT.JS 15+ NOTE:
 * params is Promise<{ slug: string }> — must be awaited.
 * =============================================================================
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  getRelatedPosts,
} from "../blog-posts";

/* ------------------------------------------------------------------ */
/* Static generation config                                            */
/* ------------------------------------------------------------------ */

/** Prevents Next.js from attempting to SSR unknown slugs dynamically. */
export const dynamicParams = false;

/** Build a static page for every blog post at build time. */
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | GenerateAILogo`,
    description: post.metaDescription,
    alternates: {
      canonical: `https://generateailogo.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      url: `https://generateailogo.com/blog/${post.slug}`,
      siteName: "GenerateAILogo",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    robots: { index: true, follow: true },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD helpers                                                     */
/* ------------------------------------------------------------------ */

function buildArticleJsonLd(post: NonNullable<ReturnType<typeof getBlogPostBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    url: `https://generateailogo.com/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "GenerateAILogo",
      url: "https://generateailogo.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://generateailogo.com/blog/${post.slug}`,
    },
  };
}

function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildBreadcrumbJsonLd(postTitle: string, postSlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://generateailogo.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://generateailogo.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: postTitle,
        item: `https://generateailogo.com/blog/${postSlug}`,
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Category badge color helper                                         */
/* ------------------------------------------------------------------ */

function categoryBadgeClasses(
  category: "comparison" | "guide" | "listicle" | "tutorial",
): string {
  switch (category) {
    case "comparison":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "guide":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "listicle":
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "tutorial":
      return "bg-violet-500/20 text-violet-300 border-violet-500/30";
  }
}

/* ------------------------------------------------------------------ */
/* Page component                                                      */
/* ------------------------------------------------------------------ */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.relatedSlugs);

  return (
    <>
      {/* ---- JSON-LD structured data ---- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildArticleJsonLd(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(post.title, post.slug)),
        }}
      />
      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildFaqJsonLd(post.faqs)),
          }}
        />
      )}

      <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
        <article className="mx-auto max-w-3xl px-4 pt-20 pb-16">
          {/* ---- Breadcrumb navigation ---- */}
          <nav className="mb-8 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-200 line-clamp-1">{post.title}</span>
          </nav>

          {/* ---- Article header ---- */}
          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs mb-4">
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 font-medium capitalize ${categoryBadgeClasses(post.category)}`}
              >
                {post.category}
              </span>
              <span className="text-zinc-500">{post.readTime}</span>
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

          {/* ---- Article sections ---- */}
          {post.sections.map((section, sectionIndex) => (
            <section key={section.heading} className="mb-10">
              <h2 className="text-2xl font-semibold text-zinc-100 mb-4">
                {section.heading}
              </h2>

              {section.body.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-zinc-300 leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}

              {section.listItems && section.listItems.length > 0 && (
                <ul className="list-disc list-inside space-y-2 text-zinc-300 mb-4 pl-2">
                  {section.listItems.map((item, liIndex) => (
                    <li key={liIndex} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* ---- Mid-article CTA (after the 2nd section) ---- */}
              {sectionIndex === 1 && (
                <div className="my-8 rounded-xl border border-violet-500/20 bg-violet-950/30 p-6 text-center">
                  <p className="text-sm font-medium text-violet-300 mb-2">
                    Try it yourself
                  </p>
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
              )}
            </section>
          ))}

          {/* ---- FAQ accordion ---- */}
          {post.faqs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-zinc-100 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-zinc-800 bg-zinc-900/60 open:border-violet-500/30"
                  >
                    <summary className="cursor-pointer select-none px-5 py-4 text-zinc-100 font-medium flex items-center justify-between">
                      {faq.question}
                      <svg
                        className="h-5 w-5 text-zinc-500 transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* ---- Related posts ---- */}
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
                      className={`inline-block self-start rounded-full border px-2 py-0.5 text-xs font-medium capitalize mb-2 ${categoryBadgeClasses(related.category)}`}
                    >
                      {related.category}
                    </span>
                    <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-violet-300 transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      {related.readTime}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ---- Bottom CTA ---- */}
          <section className="text-center">
            <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/50 to-fuchsia-950/50 p-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                Ready to Create Your Logo?
              </h2>
              <p className="text-zinc-300 mb-6">
                Try GenerateAILogo free — 3 AI-generated logos, no sign-up
                required.
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
