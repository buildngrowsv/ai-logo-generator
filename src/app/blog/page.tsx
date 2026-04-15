/**
 * /blog — Standalone blog index page (no locale prefix).
 *
 * Imports from @/config/blog-posts (canonical source) to match the sitemap.
 * vortex-build-4821 (2026-04-15): Rewired to use @/config/blog-posts.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/config/blog-posts";

const SITE_URL = "https://generateailogo.com";

export const metadata: Metadata = {
  title: "Blog — AI Logo Generator Tips, Comparisons & Guides | GenerateAILogo",
  description:
    "Read expert guides, tool comparisons, and tutorials about AI logo design. Learn how to create professional logos with AI, compare top tools, and get branding tips for startups.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog — AI Logo Generator Tips, Comparisons & Guides",
    description:
      "Expert guides, tool comparisons, and tutorials about AI logo design.",
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "GenerateAILogo",
  },
  robots: { index: true, follow: true },
};

/* Category badge colors matching the config's capitalized categories */
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

export default function BlogIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
        {/* Header */}
        <section className="mx-auto max-w-5xl px-4 pt-20 pb-12 text-center">
          <nav className="mb-6 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-200">Blog</span>
          </nav>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            AI Logo Generator Blog
          </h1>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Comparisons, guides, and tutorials to help you create the perfect
            logo with AI — no design skills required.
          </p>
        </section>

        {/* Post grid */}
        <section className="mx-auto max-w-5xl px-4 pb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all hover:border-violet-500/50 hover:bg-zinc-900"
              >
                <div className="flex items-center gap-2 text-xs mb-3">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 font-medium ${categoryBadgeClasses(post.category)}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-zinc-500">{post.readingTimeMinutes} min read</span>
                </div>
                <h2 className="text-lg font-semibold leading-snug text-zinc-100 group-hover:text-violet-300 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-3xl px-4 pb-20 text-center">
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
      </main>
    </>
  );
}
