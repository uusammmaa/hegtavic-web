import type { Metadata } from 'next';
import Link from 'next/link';
import { FinalCta } from '@/components/marketing/FinalCta';
import { ProcessSteps } from '@/components/marketing/ProcessSteps';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { partnershipModels } from '@/lib/content/company';

export const metadata: Metadata = {
  title: 'Partner With Hegtavic',
  description:
    'Specialized AI expertise, additional engineering capacity or a long-term technology partnership — flexible ways to work together.',
  alternates: { canonical: '/partnership' },
};

/**
 * ⚠️  Public partnership language only.
 *
 * The brief is explicit that reselling and under-the-client-brand
 * terminology must not appear in public copy. Preferred terms:
 * Technology Partnership, Dedicated Engineering Teams,
 * Project-Based Development, Technology Delivery Partner.
 *
 * ⚠️  No rates or ranges are published. That is a commercial
 * decision the client has not yet made; until then the engagement
 * models describe shape and fit but not price.
 */

const engagement = [
  {
    title: 'Small, senior teams',
    body: 'We staff squads of two to four experienced engineers rather than large blended teams. Being explicitly small and senior sets the right expectation from the first conversation.',
  },
  {
    title: 'Continuity by design',
    body: 'Rotation is what destroys the value of a long engagement. Handovers are planned with overlap, and an unplanned rotation is treated as our failure, not yours.',
  },
  {
    title: 'Overlapping working hours',
    body: 'For North American engagements our engineers work afternoons and evenings Pakistan time — morning on the US East Coast. One named engineer is reachable in your working hours.',
  },
  {
    title: 'You own what we build',
    body: 'Code in your repository, infrastructure on your accounts, documentation written to be handed over. Every engagement is designed to be able to end.',
  },
] as const;

export default function PartnershipPage() {
  return (
    <>
      <Section ground="dark" tight>
        <Container>
          <Eyebrow accent>Partnership</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-display-xl text-[var(--ground-ink)]">
            Partner With Hegtavic
          </h1>
          <p className="measure mt-7 text-lede text-[var(--ground-ink-muted)]">
            Whether you need specialized AI expertise, additional engineering capacity or a
            long-term technology partner, we offer flexible ways to work together.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="models-heading">
        <Container>
          <h2 id="models-heading" className="text-display text-[var(--ground-ink)]">
            Ways to work together
          </h2>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-[var(--ground-line)] bg-[var(--ground-line)] lg:grid-cols-3">
            {partnershipModels.map((model) => (
              <li key={model.title} className="flex flex-col bg-[var(--ground-raised)] p-8">
                <h3 className="text-subheading text-[var(--ground-ink)]">{model.title}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                  {model.body}
                </p>
                <p className="mt-6 border-t border-[var(--ground-line)] pt-4 text-[0.875rem] text-[var(--ground-ink-muted)]">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--ground-ink-faint)]">
                    Fits
                  </span>
                  <span className="mt-1.5 block">{model.fits}</span>
                </p>
                <Link
                  href={model.href}
                  className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[var(--ground-accent-ink)] underline-offset-4 hover:underline"
                >
                  Learn more
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path
                      d="M8.5 1L12.5 5L8.5 9M12 5H1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section ground="sunken" aria-labelledby="engagement-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <Eyebrow accent>How we engage</Eyebrow>
              <h2 id="engagement-heading" className="mt-5 text-display text-[var(--ground-ink)]">
                What working with us is like
              </h2>
            </div>
            <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {engagement.map((item) => (
                <div key={item.title} className="border-t border-[var(--ground-line)] pt-5">
                  <dt className="text-subheading text-[var(--ground-ink)]">{item.title}</dt>
                  <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <ProcessSteps />

      <FinalCta
        heading="Let’s Discuss a Partnership"
        body="Tell us what you need and we’ll explore the right way to work together."
      />
    </>
  );
}
