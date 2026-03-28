type PolicySection = {
  readonly heading: string;
  readonly body: readonly string[];
};

type PolicyPageProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly sections: readonly PolicySection[];
};

export function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
}: PolicyPageProps) {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {intro}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-2xl border border-border/60 bg-card/40 p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
