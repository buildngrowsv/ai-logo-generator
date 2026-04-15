/**
 * =============================================================================
 * /blog — Blog Index Page
 * =============================================================================
 *
 * PURPOSE:
 * Lists all blog posts as a card grid for organic traffic discovery.
 * Each card links to /blog/[slug]. The page targets broad "AI logo" keywords
 * and acts as a hub for internal linking.
 *
 * LAYOUT NOTE:
 * The root layout (src/app/layout.tsx) provides <html> and <body> tags.
 * This page renders content directly — no document wrapper needed.
 *
 * SEO:
 * - Static metadata with canonical URL
 * - BreadcrumbList JSON-LD for Google breadcrumb rich results
 * - Open Graph tags for social sharing
 * =============================================================================
 */
import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "./blog-posts";

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Blog — AI Logo Generator Tips, Comparisons & Guides | GenerateAILogo",
  description:
    "Read expert guides, tool comparisons, and tutorials about AI logo design. Learn how to create professional logos with AI, compare top tools, and get branding tips for startups.",
  alternates: {
    canonical: "https://generateailogo.com/blog",
  },
  openGraph: {
    title: "Blog — AI Logo Generator Tips, Comparisons & Guides",
    description:
      "Expert guides, tool comparisons, and tutorials about AI logo design.",
    type: "website",
    url: "https://generateailogo.com/blog",
    siteName: "GenerateAILogo",
  },
  robots: { index: true, follow: true },
};

/* ------------------------------------------------------------------ */
/* JSON-LD (BreadcrumbList)                                            */
/* ------------------------------------------------------------------ */

const breadcrumbJsonLd = {
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
  ],
};

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

export default function BlogIndexPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
        {/* ---- Header / hero ---- */}
        <section className="mx-auto max-w-5xl px-4 pt-20 pb-12 text-center">
          <nav className="mb-6 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
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

        {/* ---- Post grid ---- */}
        <section className="mx-auto max-w-5xl px-4 pb-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all hover:border-violet-500/50 hover:bg-zinc-900"
              >
                {/* Category badge + read time */}
                <div className="flex items-center gap-2 text-xs mb-3">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 font-medium capitalize ${categoryBadgeClasses(post.category)}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-zinc-500">{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold leading-snug text-zinc-100 group-hover:text-violet-300 transition-colors mb-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <span className="mt-4 inline-flex items-center text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
                  Read more
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---- Bottom CTA ---- */}
        <section className="mx-auto max-w-3xl px-4 pb-20 text-center">
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
      </main>
    </>
  );
}
