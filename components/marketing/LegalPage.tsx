import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { legalMeta, type LegalSection } from '@/lib/content/legal';

/**
 * Shared shell for /privacy and /terms.
 *
 * `outstanding` items render as a visible callout rather than being
 * hidden in a code comment. A policy with an unresolved fact should
 * look unfinished to the person who can resolve it — the client will
 * read these pages, and a comment in a TypeScript file is not a place
 * they will ever look.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly LegalSection[];
}) {
  return (
    <>
      <Section ground="dark" tight>
        <Container>
          <Eyebrow accent>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display text-[var(--ground-ink)]">{title}</h1>
          <p className="measure text-lede mt-7 text-[var(--ground-ink-muted)]">{intro}</p>
          <p className="mt-8 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[var(--ground-ink-faint)]">
            Last updated {legalMeta.lastUpdated}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="measure">
            {sections.map((section) => (
              <section key={section.heading} className="mt-14 first:mt-0">
                <h2 className="text-subheading text-[var(--ground-ink)]">{section.heading}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-relaxed text-[var(--ground-ink-muted)]">
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className="mt-4 space-y-3">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="relative pl-6 leading-relaxed text-[var(--ground-ink-muted)] before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--ground-accent-ink)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.outstanding ? (
                  <p className="mt-5 border-l-2 border-[var(--ground-accent-ink)] bg-[var(--ground-sunken)] py-4 pl-5 pr-4 text-[0.875rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--ground-ink)]">
                      Not yet confirmed
                    </span>
                    <span className="mt-2 block">{section.outstanding}</span>
                  </p>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
