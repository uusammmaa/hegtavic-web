import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import type { Capability } from '@/lib/content/capabilities';
import { cn } from '@/lib/utils/cn';

/**
 * Homepage sections 05-08.
 *
 * One component rather than four near-identical ones. The brief
 * specifies each capability as its own section with its own
 * heading; the variation between them is layout and ground, not
 * structure.
 */
export function CapabilitySpotlight({
  capability,
  ground = 'light',
  reverse = false,
  eyebrow,
  visual,
}: {
  capability: Capability;
  ground?: 'light' | 'sunken' | 'dark';
  reverse?: boolean;
  eyebrow: string;
  visual?: ReactNode;
}) {
  const headingId = `capability-${capability.slug}`;

  return (
    <Section ground={ground} tight aria-labelledby={headingId}>
      <Container>
        <div
          className={cn(
            'grid gap-12 lg:grid-cols-2 lg:gap-20',
            reverse && 'lg:[&>*:first-child]:order-2',
          )}
        >
          <div>
            <Eyebrow accent>{eyebrow}</Eyebrow>
            <h2 id={headingId} className="mt-5 text-heading text-[var(--ground-ink)]">
              {capability.sectionHeading ?? capability.title}
            </h2>
            <p className="measure mt-5 text-lede text-[var(--ground-ink-muted)]">
              {capability.summary}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {capability.stack.slice(0, 6).map((tech) => (
                <li
                  key={tech}
                  className="rounded-sm border border-[var(--ground-line)] px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-[var(--ground-ink-muted)]"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <Link
              href={`/expertise/${capability.slug}`}
              className="mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-[var(--ground-accent-ink)] underline-offset-4 hover:underline"
            >
              {capability.title}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path
                  d="M8.5 1L12.5 5L8.5 9M12 5H1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div>
            {visual ?? (
              <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {capability.delivers.slice(0, 4).map((item) => (
                  <div key={item.title} className="border-t border-[var(--ground-line)] pt-4">
                    <dt className="text-[1rem] font-medium text-[var(--ground-ink)]">
                      {item.title}
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
