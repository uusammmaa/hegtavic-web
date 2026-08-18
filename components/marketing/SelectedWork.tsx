import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { selectedWork } from '@/lib/content/company';

/**
 * Homepage section 09 — "Selected Work".
 *
 * ⚠️  Named "Selected Work" rather than "Case Studies" on purpose:
 * it is a lighter promise, and it is what can honestly be made
 * today. No outcome, metric or testimonial is attached to any
 * entry, because none has been verified.
 *
 * Four entries rather than the full list. A thin, well-presented
 * selection reads as considered; an exhaustive grid of small
 * projects reads as an agency portfolio, which is the opposite of
 * the positioning.
 *
 * Placed below capabilities and process so the technical story
 * lands before the portfolio does.
 *
 * The cards are not links. Every project would resolve to /work,
 * which lists the same four names and the same one-line
 * descriptions — four distinct link targets leading to no further
 * information. They become links when each has a case study behind
 * it. The single "View all work" button carries the navigation.
 */
export function SelectedWork({ ground = 'light' }: { ground?: 'light' | 'sunken' | 'dark' }) {
  return (
    <Section ground={ground} aria-labelledby="work-heading">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow accent>Proof</Eyebrow>
            <h2 id="work-heading" className="mt-5 text-display text-[var(--ground-ink)]">
              Selected Work
            </h2>
            <p className="measure mt-5 text-lede text-[var(--ground-ink-muted)]">
              A selection of technology solutions we have designed and developed for our clients.
            </p>
          </div>

          <Button href="/work" variant="secondary" className="self-start lg:self-auto">
            View all work
          </Button>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
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
      </Container>
    </Section>
  );
}
