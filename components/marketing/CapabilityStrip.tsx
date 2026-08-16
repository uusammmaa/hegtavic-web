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
 */

const pillars = ['AI', 'Software', 'Data', 'Engineering'];

const stack = [
  'Python',
  'LLMs',
  'RAG',
  'React',
  'Next.js',
  'Node.js',
  'FastAPI',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
];

export function CapabilityStrip() {
  return (
    <section
      data-ground="dark"
      aria-label="Core technical capabilities"
      className="border-y border-[var(--ground-line)] bg-[var(--ground-sunken)]"
    >
      <Container>
        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* The green dot leads each pillar rather than sitting
              between them, so a wrap can never leave one dangling. */}
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 lg:flex-nowrap">
            {pillars.map((pillar) => (
              <li key={pillar} className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-brand-green"
                />
                <span className="text-subheading font-medium text-[var(--ground-ink)]">
                  {pillar}
                </span>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:max-w-[32rem] lg:justify-end">
            {stack.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[0.75rem] tracking-wide text-[var(--ground-ink-faint)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
