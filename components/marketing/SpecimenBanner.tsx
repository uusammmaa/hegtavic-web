import { Container } from '@/components/primitives/Container';

/**
 * Renders above any fabricated content.
 *
 * Deliberately loud. This is not a subtle developer affordance — it
 * exists so that if a specimen page is ever screenshotted, forwarded,
 * or reached by someone outside the project, there is no possible
 * reading in which the numbers on it look real.
 *
 * The gate in lib/content/case-studies.ts should mean this is never
 * reachable in production. This is the second line of defence, not
 * the first.
 */
export function SpecimenBanner({ notice }: { notice: string }) {
  return (
    <div
      data-ground="dark"
      role="alert"
      className="border-b-2 border-brand-green bg-[var(--color-graphite-sunken)] py-4"
    >
      <Container>
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-brand-green">
          Specimen — not real
        </p>
        <p className="mt-2 max-w-[68ch] text-[0.9375rem] leading-relaxed text-[var(--ground-ink)]">
          {notice}
        </p>
      </Container>
    </div>
  );
}
