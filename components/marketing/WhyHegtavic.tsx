import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { differentiators } from '@/lib/content/company';

/**
 * Homepage section 10.
 *
 * ⚠️  These are commitments about how we work, not claims about
 * results. That is deliberate: a "why us" section is where invented
 * statistics usually appear, and none are available that could be
 * verified.
 */
export function WhyHegtavic() {
  return (
    <Section ground="dark" aria-labelledby="why-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <Eyebrow accent>Why Hegtavic</Eyebrow>
            <h2 id="why-heading" className="mt-5 text-display text-[var(--ground-ink)]">
              Why Businesses Choose Hegtavic
            </h2>
            <p className="measure mt-5 text-lede text-[var(--ground-ink-muted)]">
              Technical expertise, business understanding, transparent collaboration, flexible
              engagement and long-term partnership.
            </p>
          </div>

          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item.title}>
                <dt className="flex items-start gap-3 text-subheading text-[var(--ground-ink)]">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-green"
                  />
                  {item.title}
                </dt>
                <dd className="mt-2.5 pl-[1.125rem] text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
