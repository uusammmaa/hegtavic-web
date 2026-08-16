import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';

/**
 * Homepage section 03. Copy fixed by the brand brief.
 *
 * First light-grounded section: the page opens dark, then opens
 * up. The three supporting points are capability statements, not
 * claims about clients or scale — nothing here needs verifying.
 */

const points = [
  {
    title: 'Build',
    body: 'New products and platforms, engineered to hold up once they are in real use.',
  },
  {
    title: 'Modernize',
    body: 'Existing systems made scalable, reliable and maintainable without a rewrite.',
  },
  {
    title: 'Scale',
    body: 'Engineering capacity that grows with the work, as an extension of your team.',
  },
];

export function Introduction() {
  return (
    <Section aria-labelledby="introduction-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <Eyebrow accent>Introduction</Eyebrow>
            <h2 id="introduction-heading" className="mt-5 text-display text-[var(--ground-ink)]">
              Your Technology Partner for What&rsquo;s Next
            </h2>
          </div>

          <div>
            <p className="measure text-lede text-[var(--ground-ink)]">
              Hegtavic is an AI and software engineering company helping businesses build, modernize
              and scale digital products and intelligent systems.
            </p>

            <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-3">
              {points.map((point) => (
                <div key={point.title} className="border-t border-[var(--ground-line)] pt-5">
                  <dt className="text-subheading text-[var(--ground-ink)]">{point.title}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    {point.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
