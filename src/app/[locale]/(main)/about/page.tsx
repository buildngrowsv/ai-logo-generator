/**
 * About page for LogoForge AI (AI Logo Generator).
 *
 * Provides product description, SymplyAI attribution, contact info, and
 * navigation back to the homepage. Uses the shared PolicyPage layout for
 * consistent dark-theme styling across legal/info pages.
 *
 * Added 2026-04-03, Builder 3 pane1775 — enhanced with SymplyAI link,
 * contact email, and breadcrumb navigation.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "About | AI Logo Generator",
  description:
    "Learn about AI Logo Generator — create professional logos using AI. Upload concepts or describe your brand, get multiple logo options instantly.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
        {/* Breadcrumb navigation */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">About</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            About
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            About AI Logo Generator
          </h1>
        </div>

        {/* Product description */}
        <section className="mb-8 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">What we do</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              AI Logo Generator helps founders, freelancers, and agencies create
              professional logos using AI. Upload concepts or describe your brand
              vision, and get multiple polished logo options instantly. Whether
              you are launching a startup, refreshing an existing identity, or
              exploring creative directions for a client, our tool accelerates
              the branding process from hours to seconds.
            </p>
          </div>
        </section>

        {/* Built by SymplyAI */}
        <section className="mb-8 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Built by SymplyAI</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              AI Logo Generator is part of the{" "}
              <a
                href="https://symplyai.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                SymplyAI
              </a>{" "}
              suite of AI-powered creative tools. SymplyAI builds accessible,
              browser-first AI products that help people create professional
              content without specialized skills or expensive software.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-8 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Contact</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              Questions, feedback, or support requests? Reach us at{" "}
              <a
                href="mailto:support@symplyai.io"
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                support@symplyai.io
              </a>
              .
            </p>
          </div>
        </section>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-card/80"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
