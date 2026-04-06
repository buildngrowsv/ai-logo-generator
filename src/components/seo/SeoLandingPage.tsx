import Link from "next/link";

type ComparisonRow = {
  feature: string;
  logoforge: string;
  competitor: string;
};

type SectionItem = {
  title: string;
  description: string;
  tone?: "primary" | "secondary";
};

type FaqItem = {
  question: string;
  answer: string;
};

type SeoLandingPageProps = {
  badge: string;
  canonicalPath: string;
  breadcrumbLabel: string;
  headline: string;
  intro: string;
  tldr: string;
  comparisonTitle: string;
  comparisonHeaders: {
    competitorName: string;
  };
  comparisonRows: ComparisonRow[];
  sections: Array<{
    title: string;
    items: SectionItem[];
  }>;
  buyerGuideTitle: string;
  buyerGuideParagraphs: string[];
  faqItems: FaqItem[];
  ctaTitle: string;
  ctaBody: string;
  updatedLabel: string;
};

const SITE_ORIGIN = "https://generateailogo.com";

function CompRow({ feature, logoforge, competitor }: ComparisonRow) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-2.5 px-4 text-sm text-gray-300">{feature}</td>
      <td className="py-2.5 px-4 text-sm text-center">{logoforge}</td>
      <td className="py-2.5 px-4 text-sm text-center">{competitor}</td>
    </tr>
  );
}

export default function SeoLandingPage({
  badge,
  canonicalPath,
  breadcrumbLabel,
  headline,
  intro,
  tldr,
  comparisonTitle,
  comparisonHeaders,
  comparisonRows,
  sections,
  buyerGuideTitle,
  buyerGuideParagraphs,
  faqItems,
  ctaTitle,
  ctaBody,
  updatedLabel,
}: SeoLandingPageProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: breadcrumbLabel, item: `${SITE_ORIGIN}${canonicalPath}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gray-950 px-4 py-12 text-gray-200 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="transition-colors hover:text-violet-400">
              Home
            </Link>
            {" / "}
            <span>{breadcrumbLabel}</span>
          </nav>

          <span className="mb-3 inline-block rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
            {badge}
          </span>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{headline}</h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-400">{intro}</p>

          <div className="mb-10 rounded-xl border border-violet-500/20 bg-violet-500/5 p-6">
            <h2 className="mb-2 text-lg font-semibold text-violet-400">TL;DR</h2>
            <p className="leading-relaxed text-gray-300">{tldr}</p>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-white">{comparisonTitle}</h2>
          <div className="mb-10 overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Feature</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-violet-400">LogoForge AI</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-orange-400">
                    {comparisonHeaders.competitorName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <CompRow key={row.feature} {...row} />
                ))}
              </tbody>
            </table>
          </div>

          {sections.map((section) => (
            <section key={section.title} className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-white">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const accentClass =
                    item.tone === "secondary" ? "text-orange-400" : "text-violet-400";
                  return (
                    <div key={item.title} className="rounded-lg border border-white/10 p-4">
                      <h3 className={`mb-1 font-semibold ${accentClass}`}>{item.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-white">{buyerGuideTitle}</h2>
            <div className="space-y-4 text-sm leading-7 text-gray-300">
              {buyerGuideParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <div className="mb-12 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">{ctaTitle}</h2>
            <p className="mb-6 text-gray-400">{ctaBody}</p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-block rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                Create Your Logo Free
              </Link>
              <Link
                href="/pricing"
                className="inline-block rounded-lg border border-white/10 px-8 py-3 font-semibold transition hover:bg-white/5"
              >
                View Pricing
              </Link>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <details key={faq.question} className="group rounded-lg border border-white/10">
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-medium transition hover:bg-white/5">
                    {faq.question}
                    <span className="text-white/40 transition-transform group-open:rotate-180">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm leading-relaxed text-gray-400">{faq.answer}</div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-center text-xs text-gray-500">{updatedLabel}</p>
        </article>
      </main>
    </>
  );
}
