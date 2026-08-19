import type { Metadata } from 'next';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Testimonials } from '@/components/marketing/Testimonials';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import Link from 'next/link';
import { isSpecimen, visibleCaseStudies } from '@/lib/content/case-studies';
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
 * number each. The template now exists (/work/[slug]) and this page
 * lists whatever `visibleCaseStudies` contains — which in production
 * is verified studies only. The remaining blocker is the client's own
 * delivery records, not the build.
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

      {visibleCaseStudies.length > 0 ? (
        <Section aria-labelledby="case-studies-heading">
          <Container>
            <h2 id="case-studies-heading" className="text-heading text-[var(--ground-ink)]">
              Case studies
            </h2>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[var(--ground-line)] bg-[var(--ground-line)] lg:grid-cols-2">
              {visibleCaseStudies.map((study) => (
                <li key={study.slug} className="bg-[var(--ground-raised)]">
                  <Link
                    href={`/work/${study.slug}`}
                    className="flex h-full flex-col p-8 transition-colors duration-[var(--duration-base)] hover:bg-[var(--ground-sunken)]"
                  >
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--ground-accent-ink)]">
                      {study.industry}
                      {isSpecimen(study) ? ' · specimen' : null}
                    </span>
                    <h3 className="mt-4 text-subheading text-[var(--ground-ink)]">{study.title}</h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                      {study.summary}
                    </p>
                    <span className="mt-6 font-mono text-[0.8125rem] text-[var(--ground-accent-ink)]">
                      Read the case study →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section ground="sunken" aria-labelledby="projects-heading">
        <Container>
          {/* "Other" only makes sense relative to the case-study
              section above, which renders nothing until a study is
              verified. Without this the live page would head its only
              content block "Other projects" with nothing to be other
              than. */}
          <h2 id="projects-heading" className="text-heading text-[var(--ground-ink)]">
            {visibleCaseStudies.length > 0 ? 'Other projects' : 'Projects'}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
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

          {visibleCaseStudies.length === 0 ? (
            <p className="measure mt-12 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
              Detailed case studies — covering the business challenge, our solution, the technology
              used and the measurable outcome — are in preparation.
            </p>
          ) : null}
        </Container>
      </Section>

      <Testimonials />

      <FinalCta
        heading="Have a Technology Challenge?"
        body="Let’s discuss your requirements and identify the right technical approach."
      />
    </>
  );
}
