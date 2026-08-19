import type { Metadata } from 'next';
import { FinalCta } from '@/components/marketing/FinalCta';
import { TeamGrid } from '@/components/marketing/TeamGrid';
import { WhyHegtavic } from '@/components/marketing/WhyHegtavic';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import {
  aboutIntro,
  brandStory,
  industries,
  journey,
  mission,
  philosophy,
  values,
  vision,
  whoWeHelp,
} from '@/lib/content/company';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Hegtavic combines AI, software engineering and data expertise to build reliable, scalable solutions tailored to each client’s needs.',
  alternates: { canonical: '/about' },
};

/**
 * ⚠️  Deliberately absent until confirmed by the client:
 *   • founding year
 *   • headcount and team composition
 *   • named leadership and team members
 *   • office locations (the form of the Australian presence is
 *     not established, so no location is claimed)
 *   • award badges
 *
 * These are the facts an About page normally carries, and every one
 * of them is currently unverified. They are omitted rather than
 * approximated. A team section is added once real names, roles and
 * photographs exist — an About page with invented people is worse
 * than one without a team section, because it is exactly the claim
 * a buyer checks.
 */
export default function AboutPage() {
  return (
    <>
      <Section ground="dark" tight>
        <Container>
          <Eyebrow accent>About</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-display-xl text-[var(--ground-ink)]">
            {aboutIntro.title}
          </h1>
          <p className="measure mt-7 text-lede text-[var(--ground-ink-muted)]">{aboutIntro.body}</p>
        </Container>
      </Section>

      <Section aria-labelledby="journey-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <Eyebrow accent>Our story</Eyebrow>
              <h2 id="journey-heading" className="mt-5 text-display text-[var(--ground-ink)]">
                {journey.title}
              </h2>
            </div>
            <div>
              {/* The owner's line, 18 Aug 2026 — see brandStory in
                  lib/content/company.ts for why only the line is used. */}
              <p className="text-display text-balance text-[var(--ground-ink)]">
                {brandStory.line}
              </p>
              <p className="measure text-lede mt-8 text-[var(--ground-ink)]">{journey.body}</p>

              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                <div className="border-t border-[var(--ground-line)] pt-5">
                  <h3 className="text-subheading text-[var(--ground-ink)]">{vision.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    {vision.body}
                  </p>
                </div>
                <div className="border-t border-[var(--ground-line)] pt-5">
                  <h3 className="text-subheading text-[var(--ground-ink)]">{mission.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    {mission.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section ground="sunken" aria-labelledby="values-heading">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow accent>Principles</Eyebrow>
            <h2 id="values-heading" className="mt-5 text-display text-[var(--ground-ink)]">
              The Principles Behind Our Work
            </h2>
          </div>
          <ul className="mt-12 flex flex-wrap gap-3">
            {values.map((value) => (
              <li
                key={value}
                className="rounded-md border border-[var(--ground-line)] bg-[var(--ground-raised)] px-4 py-2.5 text-[0.9375rem] text-[var(--ground-ink)]"
              >
                {value}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="industries-heading">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow accent>Industries</Eyebrow>
            <h2 id="industries-heading" className="mt-5 text-display text-[var(--ground-ink)]">
              Technology Across Industries
            </h2>
            <p className="measure mt-5 text-lede text-[var(--ground-ink-muted)]">
              Our solutions adapt to different business environments, challenges and operational
              requirements.
            </p>
          </div>

          {/* Only sectors evidenced by delivered projects are listed. */}
          <dl className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div key={industry.name} className="border-t border-[var(--ground-line)] pt-5">
                <dt className="text-subheading text-[var(--ground-ink)]">{industry.name}</dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                  {industry.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <WhyHegtavic />

      <Section ground="sunken" aria-labelledby="who-we-help-heading">
        <Container>
          <Eyebrow>Who we help</Eyebrow>
          <h2 id="who-we-help-heading" className="mt-6 text-heading text-[var(--ground-ink)]">
            Businesses at different stages
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-[var(--ground-line)] bg-[var(--ground-line)] lg:grid-cols-3">
            {whoWeHelp.map((segment) => (
              <li key={segment.title} className="bg-[var(--ground-raised)] p-8">
                <h3 className="text-subheading text-[var(--ground-ink)]">{segment.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--ground-ink-muted)]">
                  {segment.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="philosophy-about-heading">
        <Container width="narrow">
          <div className="text-center">
            <Eyebrow accent>What Hegtavic stands for</Eyebrow>
            <h2
              id="philosophy-about-heading"
              className="mt-6 text-display text-[var(--ground-ink)]"
            >
              {philosophy.title}
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lede text-[var(--ground-ink-muted)]">
              {philosophy.body}
            </p>
          </div>
        </Container>
      </Section>

      <TeamGrid />

      <FinalCta />
    </>
  );
}
