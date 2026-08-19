import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { testimonials, testimonialSource } from '@/lib/content/testimonials';

/**
 * Client feedback, quoted from a third-party review platform.
 *
 * The source is named and linked on purpose. An unattributed
 * testimonial on a company's own site is worth very little — anyone
 * can write one. An attributed one a buyer can go and check is worth
 * considerably more, and the link is what makes the difference.
 *
 * Rendered as <blockquote> with <cite>, so the attribution is carried
 * in the markup rather than only visually.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section ground="dark" aria-labelledby="testimonials-heading">
      <Container>
        <Eyebrow accent>Client feedback</Eyebrow>
        <h2 id="testimonials-heading" className="mt-6 text-heading text-[var(--ground-ink)]">
          What clients have said
        </h2>
        <p className="measure mt-5 leading-relaxed text-[var(--ground-ink-muted)]">
          Collected and verified independently by {testimonialSource.platform}, published under each
          client&rsquo;s own name.{' '}
          <a
            href={testimonialSource.url}
            rel="noopener noreferrer nofollow"
            target="_blank"
            className="text-[var(--ground-accent-ink)] underline underline-offset-4"
          >
            Read them on {testimonialSource.platform}
          </a>
          .
        </p>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-[var(--ground-line)] bg-[var(--ground-line)] lg:grid-cols-2">
          {testimonials.map((t) => (
            <li
              key={t.client}
              // An odd final card would leave an empty grid cell showing the
              // list background, which is the divider colour — a solid
              // block of line colour. Span it instead.
              className="bg-[var(--ground-raised)] p-8 lg:last:odd:col-span-2"
            >
              <figure className="flex h-full flex-col">
                <blockquote className="text-[1.0625rem] leading-relaxed text-[var(--ground-ink)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {t.outcome ? (
                  <p className="mt-5 border-l-2 border-[var(--ground-accent-ink)] pl-4 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    {t.outcome}
                  </p>
                ) : null}

                <figcaption className="mt-auto border-t border-[var(--ground-line)] pt-5">
                  <cite className="block not-italic text-[0.9375rem] font-medium text-[var(--ground-ink)]">
                    {t.role}, {t.client}
                  </cite>
                  <span className="mt-1.5 block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--ground-ink-faint)]">
                    {t.industry} · {t.project} · {t.year}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
