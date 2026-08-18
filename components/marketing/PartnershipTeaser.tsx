import Link from 'next/link';
import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { partnershipModels } from '@/lib/content/company';

/**
 * Homepage section 12.
 *
 * Language is fixed by the brief: "Technology Partnership",
 * "Dedicated Engineering Teams", "Project-Based Development".
 * Reseller and white-label terminology must not appear in public
 * copy.
 */
export function PartnershipTeaser() {
  return (
    <Section aria-labelledby="partnership-heading">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow accent>Partnership</Eyebrow>
          <h2 id="partnership-heading" className="mt-5 text-display text-[var(--ground-ink)]">
            Partner With Hegtavic
          </h2>
          <p className="measure mt-5 text-lede text-[var(--ground-ink-muted)]">
            Whether you need specialized AI expertise, additional engineering capacity or a
            long-term technology partner, we offer flexible ways to work together.
          </p>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-[var(--ground-line)] bg-[var(--ground-line)] lg:grid-cols-3">
          {partnershipModels.map((model) => (
            <li key={model.title} className="bg-[var(--ground-raised)]">
              <Link
                href={model.href}
                className="flex h-full flex-col p-8 transition-colors duration-[var(--duration-base)] hover:bg-[var(--ground-sunken)]"
              >
                <h3 className="text-subheading text-[var(--ground-ink)]">{model.title}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                  {model.body}
                </p>
                <p className="mt-6 border-t border-[var(--ground-line)] pt-4 text-[0.875rem] text-[var(--ground-ink-faint)]">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
                    Fits
                  </span>
                  <span className="mt-1.5 block">{model.fits}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Button href="/partnership" size="lg">
            LET&rsquo;S DISCUSS A PARTNERSHIP
          </Button>
        </div>
      </Container>
    </Section>
  );
}
