/**
 * /for — Hub page listing all LogoForge AI audience landing pages.
 *
 * WHY THIS EXISTS:
 * Acts as the parent index for all /for/[audience] pages. Without this,
 * /for returns 404 while /for/startups works. Google and users
 * expect the parent path to render a hub. Also consolidates internal
 * link equity across audience pages and provides a single entry point
 * for the "who is this for?" content cluster.
 *
 * SEO TARGETS: "ai logo generator for businesses",
 * "who uses ai logo tools", "best logo generator for creators"
 *
 * Created 2026-04-14: Custom 2 (pane1776) — fix pSEO 404s.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SEO_PAGES_CONFIG } from "@/config/seo-pages";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://generateailogo.com";

export const metadata: Metadata = {
  title: "Who Uses AI Logo Generator? — Professional Logos for Every Business",
  description:
    "Startups, freelancers, small businesses, and content creators use LogoForge AI to create professional logos in seconds. Find out how it fits your workflow.",
  alternates: { canonical: `${SITE_URL}/for` },
  openGraph: {
    title:
      "Who Uses AI Logo Generator? — Professional Logos for Every Business",
    description:
      "See how startups, freelancers, small businesses, and content creators use LogoForge AI.",
    type: "website",
    url: `${SITE_URL}/for`,
    siteName: "LogoForge AI",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "For", item: `${SITE_URL}/for` },
  ],
};

export default function ForHubPage() {
  const audiences = SEO_PAGES_CONFIG.audiences;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            LogoForge AI
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            LogoForge AI
          </span>{" "}
          for Every Business
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Whether you run a startup, freelance, own a small business, or create
          content — LogoForge AI fits your branding workflow. See how
          professionals in your field use AI logo generation.
        </p>
      </section>

      {/* Audience cards */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {audiences.map((audience) => (
            <Link
              key={audience.slug}
              href={`/for/${audience.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-blue-500/50"
            >
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                For {audience.name}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">
                {audience.howWeHelp.slice(0, 160)}...
              </p>
              <span className="mt-4 text-sm font-semibold text-blue-400 group-hover:underline">
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-20 text-center">
        <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-12">
          <h2 className="text-3xl font-bold">
            Try LogoForge AI Free &mdash; No Signup Required
          </h2>
          <p className="mt-3 text-gray-400">
            Create professional logos in seconds with AI.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 text-lg font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Generate Your Logo Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} LogoForge AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-300 transition-colors"
            >
              Terms
            </Link>
            <a
              href="https://symplyai.io"
              target="_blank"
              rel="noopener"
              className="hover:text-gray-300 transition-colors"
            >
              Powered by SymplyAI
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
