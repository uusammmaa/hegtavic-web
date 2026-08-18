import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { philosophy } from '@/lib/content/company';

/**
 * Homepage section 13.
 *
 * Set as a single large statement. This is the one place on the
 * page where the copy is about belief rather than capability, so it
 * gets quiet treatment and no competing elements.
 */
export function Philosophy() {
  return (
    <Section ground="dark" aria-labelledby="philosophy-heading">
      <Container width="narrow">
        <div className="text-center">
          <Eyebrow accent>Philosophy</Eyebrow>
          <h2 id="philosophy-heading" className="mt-6 text-display text-[var(--ground-ink)]">
            {philosophy.title}
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lede text-[var(--ground-ink-muted)]">
            {philosophy.body}
          </p>
        </div>
      </Container>
    </Section>
  );
}
