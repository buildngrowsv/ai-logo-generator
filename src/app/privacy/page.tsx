/**
 * /privacy — Self-contained privacy policy page (outside [locale] group).
 *
 * This page lives outside the next-intl [locale] directory so it renders
 * without locale middleware involvement. Directories and crawlers expect
 * /privacy at this exact path. The i18n version at /[locale]/(main)/privacy-policy
 * still exists for locale-prefixed access (e.g. /es/privacy-policy).
 *
 * Previously this was a redirect to /privacy-policy, but that path only
 * resolves inside [locale]/(main)/ which causes a 404 when accessed
 * without a locale prefix and the middleware excludes /privacy-policy
 * from intl routing.
 */
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://generateailogo.com";

export const metadata: Metadata = {
  title: "Privacy Policy | LogoForge AI",
  description:
    "Privacy policy for LogoForge AI — what we collect, how we use it, and how to contact us.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: "Privacy Policy | LogoForge AI",
    description:
      "Privacy policy for LogoForge AI — what we collect, how we use it, and how to contact us.",
    url: `${SITE_URL}/privacy`,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
        <a href="/" className="text-sm text-purple-400 hover:text-purple-300">
          Back to LogoForge AI
        </a>
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-gray-400">Last updated: April 2026</p>

        <p className="text-gray-300">
          This policy explains what LogoForge AI collects, how it is used to
          operate the service, and how to contact us about privacy questions.
        </p>

        <section className="space-y-3 text-gray-300">
          <h2 className="text-2xl font-semibold text-white">
            Information we collect
          </h2>
          <p>
            We collect account information you provide during sign-in, basic
            billing metadata returned by our payment processor, and the prompts
            or brand details you submit to generate logos.
          </p>
          <p>
            We also collect technical data needed to secure and operate the
            service, such as request metadata, abuse-prevention signals, and
            application logs.
          </p>
        </section>

        <section className="space-y-3 text-gray-300">
          <h2 className="text-2xl font-semibold text-white">
            How we use information
          </h2>
          <p>
            We use submitted data to authenticate users, process payments,
            generate requested logo outputs, prevent abuse, and support
            customers.
          </p>
          <p>
            We do not sell personal information. Data may be processed by
            infrastructure providers that help us deliver hosting,
            authentication, payments, and AI inference.
          </p>
        </section>

        <section className="space-y-3 text-gray-300">
          <h2 className="text-2xl font-semibold text-white">Data Processors</h2>
          <p>
            We use the following third-party services to operate LogoForge AI.
            Each processor handles data only as needed for its stated purpose:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Google Analytics 4</strong> (Google LLC, USA) — Collects
              anonymized usage data to help us understand how visitors use our
              service. You can opt out via the cookie consent banner. Data is
              processed under{" "}
              <a href="https://policies.google.com/privacy" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">
                Google&apos;s privacy policy
              </a>.
            </li>
            <li>
              <strong>Stripe</strong> (Stripe, Inc., USA) — Processes payment
              information securely. Your payment data is handled directly by
              Stripe and not stored on our servers.{" "}
              <a href="https://stripe.com/privacy" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">
                Stripe privacy policy
              </a>.
            </li>
            <li>
              <strong>fal.ai</strong> (fal.ai, Inc., USA) — Processes your text
              prompts and brand details to generate AI logo outputs. Uploaded
              content is processed temporarily and not retained by fal.ai.{" "}
              <a href="https://fal.ai/privacy" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">
                fal.ai privacy policy
              </a>.
            </li>
            <li>
              <strong>Vercel</strong> (Vercel Inc., USA) — Hosts and serves the
              application. Standard web server logs (IP address, request path)
              may be collected.
            </li>
            <li>
              <strong>Google OAuth</strong> (Google LLC, USA) — Provides
              authentication when you sign in with Google. We receive your name,
              email, and profile picture from Google to manage your account.
            </li>
          </ul>
        </section>

        <section className="space-y-3 text-gray-300">
          <h2 className="text-2xl font-semibold text-white">
            Retention and contact
          </h2>
          <p>
            We retain information only as long as reasonably necessary to operate
            the service, satisfy legal obligations, resolve disputes, and enforce
            agreements.
          </p>
          <p>
            For privacy requests or questions, contact{" "}
            <a
              className="text-purple-400 hover:text-purple-300"
              href="mailto:support@symplyai.io"
            >
              support@symplyai.io
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
