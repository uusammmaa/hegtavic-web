import type { Metadata } from 'next';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { selectedWork } from '@/lib/content/company';

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'A selection of technology solutions we have designed and developed for our clients.',
  alternates: { canonical: '/work' },
};

/**
 * ⚠️  This page is honest about being thin, and that is the right
 * trade until real case studies exist.
 *
 * No outcome, metric or testimonial appears here because none has
 * been verified. Each entry states the sector and the type of
 * system only.
 *
 * ⛔ BEFORE LAUNCH: three case studies with at least one verified
 * number each. The case study template and this page's upgrade
 * path land with the CMS; the blocker is the client's own delivery
 * records, not the build.
 */
export default function WorkPage() {
  return (
    <>
      <Section ground="dark" tight>
        <Container>
          <Eyebrow accent>Proof</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-display-xl text-[var(--ground-ink)]">
            Selected Work
          </h1>
          <p className="measure mt-7 text-lede text-[var(--ground-ink-muted)]">
            A selection of technology solutions we have designed and developed for our clients.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="projects-heading">
        <Container>
          <h2 id="projects-heading" className="sr-only">
            Projects
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {selectedWork.map((project) => (
              <li
                key={project.name}
                className="flex flex-col rounded-lg border border-[var(--ground-line)] bg-[var(--ground-raised)] p-8"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--ground-accent-ink)]">
                  {project.sector}
                </span>
                <h3 className="mt-4 text-subheading text-[var(--ground-ink)]">{project.name}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                  {project.body}
                </p>
              </li>
            ))}
          </ul>

          <p className="measure mt-12 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
            Detailed case studies — covering the business challenge, our solution, the technology
            used and the measurable outcome — are in preparation.
          </p>
        </Container>
      </Section>

      <FinalCta
        heading="Have a Technology Challenge?"
        body="Let’s discuss your requirements and identify the right technical approach."
      />
    </>
  );
}
