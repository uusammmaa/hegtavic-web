import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { CTA_HREF, CTA_LABEL } from '@/lib/navigation';

/** Homepage section 14. Also closes the capability and about pages. */
export function FinalCta({
  heading = "Let's Build Something Valuable",
  body = 'Have a project, technology challenge or engineering requirement? Let’s talk about how Hegtavic can help.',
  ground = 'sunken',
}: {
  heading?: string;
  body?: string;
  ground?: 'light' | 'sunken' | 'dark';
}) {
  return (
    <Section ground={ground} aria-labelledby="final-cta-heading">
      <Container>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="final-cta-heading" className="text-display text-[var(--ground-ink)]">
              {heading}
            </h2>
            <p className="measure mt-5 text-lede text-[var(--ground-ink-muted)]">{body}</p>
          </div>
          <Button href={CTA_HREF} size="lg" className="shrink-0">
            {CTA_LABEL}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
