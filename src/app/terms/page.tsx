/**
 * /terms — Self-contained terms of service page (outside [locale] group).
 *
 * Same rationale as /privacy: lives outside next-intl so /terms renders
 * without locale middleware. Previously redirected to /terms-of-service
 * which only exists inside [locale]/(main)/ and 404d without a locale
 * prefix.
 */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | LogoForge AI",
  description:
    "Terms of service for LogoForge AI — usage rules, billing, and disclaimers.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
        <a href="/" className="text-sm text-purple-400 hover:text-purple-300">
          Back to LogoForge AI
        </a>
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="text-sm text-gray-400">Last updated: April 2026</p>

        <p className="text-gray-300">
          These terms govern access to and use of LogoForge AI. By using the
          service, you agree to the terms below.
        </p>

        <section className="space-y-3 text-gray-300">
          <h2 className="text-2xl font-semibold text-white">
            Use of the service
          </h2>
          <p>
            You may use LogoForge AI only in compliance with applicable law and
            these terms. You are responsible for the content you submit and for
            maintaining the confidentiality of your account credentials.
          </p>
          <p>
            You may not use the service to violate intellectual property rights,
            abuse infrastructure, or attempt unauthorized access to the platform.
          </p>
        </section>

        <section className="space-y-3 text-gray-300">
          <h2 className="text-2xl font-semibold text-white">
            Billing and access
          </h2>
          <p>
            Paid subscriptions and credit packs are billed through our payment
            provider. Access to paid features depends on successful payment
            processing and applicable account configuration.
          </p>
          <p>
            We may suspend or limit access if abuse, fraud, chargebacks, or
            technical misuse is detected.
          </p>
        </section>

        <section className="space-y-3 text-gray-300">
          <h2 className="text-2xl font-semibold text-white">
            Outputs and disclaimers
          </h2>
          <p>
            AI-generated outputs may require human review before production use.
            You are responsible for evaluating generated assets for brand
            suitability, legal clearance, and trademark risk.
          </p>
          <p>
            The service is provided on an as-is basis to the maximum extent
            permitted by law.
          </p>
        </section>

        <section className="space-y-3 text-gray-300">
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p>
            For questions about these terms, contact{" "}
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
