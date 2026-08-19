import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FinalCta } from '@/components/marketing/FinalCta';
import { OutcomeMetrics } from '@/components/marketing/OutcomeMetrics';
import { SpecimenBanner } from '@/components/marketing/SpecimenBanner';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { getCaseStudy, isSpecimen, visibleCaseStudies } from '@/lib/content/case-studies';

type Params = { slug: string };

/**
 * Only case studies that are actually visible get a route.
 *
 * In production `visibleCaseStudies` contains verified studies only,
 * so today this prerenders nothing and /work/<anything> is a 404 —
 * which is the correct behaviour while every study is a specimen.
 */
export function generateStaticParams(): Params[] {
  return visibleCaseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    // Belt and braces: a specimen must never be indexable even if it
    // somehow becomes reachable.
    ...(isSpecimen(study) ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const facts: ReadonlyArray<[string, string]> = [
    ['Client', study.client],
    ['Industry', study.industry],
    ['Region', study.region],
    ['Engagement', study.engagement],
    ['Duration', study.duration],
    ['Team', study.team],
  ];

  return (
    <>
      {isSpecimen(study) ? <SpecimenBanner notice={study.specimenNotice} /> : null}

      <Section ground="dark">
        <Container>
          <Eyebrow>Case study</Eyebrow>
          <h1 className="text-display mt-6 max-w-[18ch] text-[var(--ground-ink)]">{study.title}</h1>
          <p className="measure text-lede mt-8 text-[var(--ground-ink-muted)]">{study.summary}</p>

          <dl className="mt-14 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--ground-ink-faint)]">
                  {term}
                </dt>
                <dd className="mt-2 text-[0.9375rem] text-[var(--ground-ink)]">{value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <li
                key={item}
                className="rounded border border-[var(--ground-line-strong)] px-3 py-1.5 font-mono text-[0.75rem] text-[var(--ground-ink-muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="measure">
            <h2 className="text-heading text-[var(--ground-ink)]">The problem</h2>
            {study.problem.map((paragraph) => (
              <p key={paragraph} className="mt-5 leading-relaxed text-[var(--ground-ink-muted)]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="measure mt-16">
            <h2 className="text-heading text-[var(--ground-ink)]">
              The constraint that made it interesting
            </h2>
            {study.constraint.map((paragraph) => (
              <p key={paragraph} className="mt-5 leading-relaxed text-[var(--ground-ink-muted)]">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section ground="sunken">
        <Container>
          <h2 className="text-heading text-[var(--ground-ink)]">What we built</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[var(--ground-line)] bg-[var(--ground-line)]">
            {study.built.map((block) => (
              <li key={block.title} className="bg-[var(--ground-raised)] p-8">
                <h3 className="text-subheading text-[var(--ground-ink)]">{block.title}</h3>
                <p className="measure mt-3 leading-relaxed text-[var(--ground-ink-muted)]">
                  {block.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section ground="dark">
        <Container>
          <h2 className="text-heading text-[var(--ground-ink)]">Outcomes</h2>
          <div className="mt-10">
            <OutcomeMetrics metrics={study.metrics} />
          </div>
          {study.outcomeNote ? (
            <p className="measure mt-8 leading-relaxed text-[var(--ground-ink-muted)]">
              {study.outcomeNote}
            </p>
          ) : null}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="measure">
            <h2 className="text-heading text-[var(--ground-ink)]">What we would do differently</h2>
            {study.retrospective.map((paragraph) => (
              <p key={paragraph} className="mt-5 leading-relaxed text-[var(--ground-ink-muted)]">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-14">
            <Link
              href="/work"
              className="text-[var(--ground-accent-ink)] underline-offset-4 hover:underline"
            >
              ← All work
            </Link>
          </p>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
