import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { FinalCta } from '@/components/marketing/FinalCta';
import { ProcessSteps } from '@/components/marketing/ProcessSteps';
import { capabilities, headlineCapabilities } from '@/lib/content/capabilities';

export const metadata: Metadata = {
  title: 'Our Technology Expertise',
  description:
    'Deep technical capabilities across AI, generative AI, software and product engineering, data engineering, cloud modernization and dedicated engineering teams.',
  alternates: { canonical: '/expertise' },
};

const demoted = capabilities.filter((c) => c.demoted);

export default function ExpertisePage() {
  return (
    <>
      <Section ground="dark" tight>
        <Container>
          <Eyebrow accent>Expertise</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-display-xl text-[var(--ground-ink)]">
            Our Technology Expertise
          </h1>
          <p className="measure mt-7 text-lede text-[var(--ground-ink-muted)]">
            Deep technical capabilities to help you build, modernize and scale.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="capabilities-list-heading">
        <Container>
          <h2 id="capabilities-list-heading" className="sr-only">
            Capabilities
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-[var(--ground-line)] bg-[var(--ground-line)] sm:grid-cols-2 lg:grid-cols-3">
            {headlineCapabilities.map((capability, i) => (
              <li key={capability.slug} className="bg-[var(--ground-raised)]">
                <Link
                  href={`/expertise/${capability.slug}`}
                  className="group flex h-full flex-col p-8 transition-colors duration-[var(--duration-base)] hover:bg-[var(--ground-sunken)]"
                >
                  <span className="font-mono text-[0.75rem] tracking-[0.14em] text-[var(--ground-ink-faint)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 text-subheading text-[var(--ground-ink)]">
                    {capability.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    {capability.summary}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-7 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[var(--ground-accent-ink)]"
                  >
                    Learn more
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path
                        d="M8.5 1L12.5 5L8.5 9M12 5H1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {demoted.length > 0 && (
            <div className="mt-12 border-t border-[var(--ground-line)] pt-8">
              <p className="eyebrow text-[var(--ground-ink-faint)]">Also delivered</p>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {demoted.map((capability) => (
                  <li key={capability.slug}>
                    <Link
                      href={`/expertise/${capability.slug}`}
                      className="text-[0.9375rem] text-[var(--ground-ink-muted)] underline-offset-4 hover:text-[var(--ground-ink)] hover:underline"
                    >
                      {capability.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      <ProcessSteps ground="dark" />

      <FinalCta
        heading="Have a Technology Challenge?"
        body="Let’s discuss your requirements and identify the right technical approach."
      />
    </>
  );
}
