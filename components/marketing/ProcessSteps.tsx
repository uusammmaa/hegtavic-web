import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { process } from '@/lib/content/company';

/** Homepage section 11. Also used on the partnership page. */
export function ProcessSteps({ ground = 'light' }: { ground?: 'light' | 'sunken' | 'dark' }) {
  return (
    <Section ground={ground} aria-labelledby="process-heading">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow accent>Process</Eyebrow>
          <h2 id="process-heading" className="mt-5 text-display text-[var(--ground-ink)]">
            From Business Problem to Working Solution
          </h2>
          <p className="measure mt-5 text-lede text-[var(--ground-ink-muted)]">
            A structured approach that takes an idea from discovery to production and beyond.
          </p>
        </div>

        <ol className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((stage) => (
            <li key={stage.step} className="relative border-t border-[var(--ground-line)] pt-6">
              {/* The accent tick that marks each step start. */}
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-10 bg-[var(--color-brand-green)]"
              />
              <span className="font-mono text-[0.75rem] tracking-[0.14em] text-[var(--ground-ink-faint)]">
                {stage.step}
              </span>
              <h3 className="mt-4 text-subheading text-[var(--ground-ink)]">{stage.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
