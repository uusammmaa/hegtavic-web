import { Container } from '@/components/primitives/Container';

/**
 * Homepage section 02 — "Trust / Expertise".
 *
 * The brief asks for "a compact visual proof of Hegtavic's core
 * technical capabilities" directly under the hero. In practice
 * that slot usually holds client logos or headline metrics.
 *
 * ⚠️  We have neither that can be published honestly:
 *   • no verified client outcome metrics exist yet
 *   • a logo wall is a claim of scale
 *   • the counter values on the previous site were unedited
 *     defaults and are not coming back
 *
 * So this is a restrained capability and stack strip. It fills
 * the slot, reads as deliberate, and claims nothing untrue.
 *
 * REVISIT once third-party reviews are verified — a review badge
 * is exactly what this slot is for.
 *
 * ⚠️  REVISED 18 Aug 2026 from the owner's revision document:
 * "Avoid leading with long technology lists. Explain the business
 * capability first, then show relevant technologies as supporting
 * proof."
 *
 * The raw ten-item technology row that sat here was the most
 * literal instance of that on the site — it was the first thing
 * under the hero. It is removed. Technologies still appear on every
 * capability page and in each homepage spotlight, which is where
 * they read as proof of a capability already explained rather than
 * as a list standing in for one.
 *
 * Each pillar now carries a short outcome phrase, so the slot leads
 * with what the work is for.
 */

const pillars = [
  { name: 'AI', note: 'Decisions and workflows, not demos' },
  { name: 'Software', note: 'Products built to stay maintainable' },
  { name: 'Data', note: 'Foundations you can trust and query' },
  { name: 'Engineering', note: 'Capacity that works as your team' },
];

export function CapabilityStrip() {
  return (
    <section
      data-ground="dark"
      aria-label="Core technical capabilities"
      className="border-y border-[var(--ground-line)] bg-[var(--ground-sunken)]"
    >
      <Container>
        <div className="py-10">
          {/* The green dot leads each pillar rather than sitting
              between them, so a wrap can never leave one dangling. */}
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <li key={pillar.name} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-green"
                />
                <span>
                  <span className="block text-subheading font-medium text-[var(--ground-ink)]">
                    {pillar.name}
                  </span>
                  <span className="mt-1 block text-[0.875rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    {pillar.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
