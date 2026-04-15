/**
 * /get-started — Onboarding landing page for LogoForge AI.
 *
 * PURPOSE:
 * Marketing-optimized entry point targeting "how to create a logo with AI"
 * search intent. Shows 3-step process, feature highlights, and CTAs.
 *
 * Created 2026-04-15 — W4-06 pSEO expansion.
 */

import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://generateailogo.com";
const PRODUCT_NAME = "LogoForge AI";

export const metadata: Metadata = {
  title: `Get Started — ${PRODUCT_NAME}`,
  description:
    "Create a professional logo in 3 easy steps. Enter your business name, choose a style, and download your logo — free, no design skills required.",
  alternates: { canonical: `${SITE_URL}/get-started` },
  openGraph: {
    title: `Get Started with ${PRODUCT_NAME}`,
    description: "Create stunning logos with AI in seconds. No design skills needed.",
    url: `${SITE_URL}/get-started`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: PRODUCT_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Get Started with ${PRODUCT_NAME}`,
    description: "AI logo generator — professional logos in seconds.",
    images: ["/opengraph-image"],
  },
};

const STEPS = [
  {
    number: "1",
    title: "Enter Your Business Name",
    description: "Type your brand name and optionally add a tagline or description. The AI uses this to generate relevant logo concepts.",
  },
  {
    number: "2",
    title: "Choose a Style",
    description: "Select from modern, vintage, minimalist, bold, playful, and more. Each style generates unique logo variations tailored to your brand.",
  },
  {
    number: "3",
    title: "Download Your Logo",
    description: "Pick your favorite design and download high-resolution files ready for websites, business cards, social media, and print materials.",
  },
];

const FEATURES = [
  { title: "No Design Skills Needed", description: "AI handles typography, color theory, and composition — you just pick what you like." },
  { title: "Free Generations", description: "Create up to 3 logo concepts for free. Upgrade for unlimited variations and high-res downloads." },
  { title: "Multiple Formats", description: "Download logos in PNG format optimized for web, social, and print use cases." },
  { title: "Instant Results", description: "From business name to finished logo in under 30 seconds. No waiting for designers." },
];

const FAQS = [
  { question: "How do I create a logo with AI?", answer: "Enter your business name and optional tagline, choose a style (modern, vintage, minimalist, bold, playful, etc.), and click 'Generate.' The AI creates multiple unique logo concepts in seconds that you can download immediately." },
  { question: "Is LogoForge AI free to use?", answer: "Yes — you get 3 free logo generations per day with no account required. For unlimited generations, more styles, and higher resolution downloads, upgrade to Pro starting at $4.99/month." },
  { question: "What file formats can I download?", answer: "Free tier logos download as high-quality PNG files suitable for web, social media, and presentations. Pro plans include additional format options and higher resolution outputs for print materials." },
  { question: "Can I use the logo for my business?", answer: "Absolutely. All logos generated with LogoForge AI are yours to use commercially — on websites, business cards, social media, packaging, and more. Pro plans include full commercial licensing." },
  { question: "How is this different from hiring a designer?", answer: "LogoForge AI generates professional logos in seconds instead of days or weeks. You get instant iterations at a fraction of the cost. Many users start with AI-generated concepts and refine with a designer later if needed." },
];

const AUDIENCE_LINKS = [
  { slug: "startups", label: "Startups" },
  { slug: "freelancers", label: "Freelancers & Solopreneurs" },
  { slug: "small-businesses", label: "Small Business Owners" },
  { slug: "content-creators", label: "Content Creators" },
  { slug: "agencies", label: "Design Agencies" },
];

export default function GetStartedPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Get Started", item: `${SITE_URL}/get-started` },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            {PRODUCT_NAME}
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Create Your Logo in{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            3 Simple Steps
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          No design experience needed. Enter your brand name, pick a style, and
          get a professional logo in seconds.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative rounded-2xl border border-gray-800 bg-gray-900/50 p-8 text-center">
              <span className="absolute top-4 left-4 text-xs font-bold text-violet-400">STEP {step.number}</span>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10 text-2xl">
                {["✏️", "🎨", "⬇️"][i]}
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{step.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Why Choose {PRODUCT_NAME}?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 to-purple-950/20 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">Ready? Create Your Logo Now.</h2>
          <p className="mt-2 text-gray-400">Free to try — no account needed.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-8 py-3.5 text-base font-semibold text-white hover:opacity-90 transition-opacity">
              Create Your Logo &rarr;
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-gray-700 px-8 py-3.5 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-all">
              View Pro Plans
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} {PRODUCT_NAME}. All rights reserved.</p>
      </footer>
    </main>
  );
}
