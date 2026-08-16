import Link from 'next/link';
import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { capabilities } from '@/lib/navigation';

/**
 * Homepage section 04 — "Our Technology Expertise".
 *
 * Six headline capabilities, per the brand brief. Body copy is
 * outcome-first; the technology names live in the stack strip and
 * on the individual capability pages, not here — the brief is
 * explicit that technology should be evidence of delivery
 * capability rather than the value proposition itself.
 */

const summaries: Record<string, string> = {
  '/expertise/ai-machine-learning':
    'Turn data into intelligence with machine learning, deep learning, NLP, computer vision and predictive analytics.',
  '/expertise/generative-ai':
    'Build intelligent applications with LLMs, RAG, AI assistants, agents, document intelligence and workflow automation.',
  '/expertise/software-product-engineering':
    'Scalable digital products, web applications, SaaS platforms, APIs and custom software built around your requirements.',
  '/expertise/data-engineering':
    'Reliable data foundations, pipelines, analytics and dashboards that help businesses make better decisions.',
  '/expertise/cloud-modernization':
    'Modernize existing applications and infrastructure to improve scalability, reliability and maintainability.',
  '/expertise/dedicated-teams':
    'Extend your capacity with AI/ML, software, backend, frontend and data engineers working as part of your team.',
};

export function Capabilities() {
  return (
    <Section ground="sunken" aria-labelledby="capabilities-heading">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow accent>Capabilities</Eyebrow>
            <h2 id="capabilities-heading" className="mt-5 text-display text-[var(--ground-ink)]">
              Our Technology Expertise
            </h2>
            <p className="measure mt-5 text-lede text-[var(--ground-ink-muted)]">
              Deep technical capabilities to help you build, modernize and scale.
            </p>
          </div>

          <Button href="/expertise" variant="secondary" className="self-start lg:self-auto">
            Explore Our Expertise
          </Button>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-[var(--ground-line)] bg-[var(--ground-line)] sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => (
            <li key={capability.href} className="bg-[var(--ground-raised)]">
              <Link
                href={capability.href}
                className="group flex h-full flex-col p-8 transition-colors duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:bg-[var(--ground-sunken)]"
              >
                <span className="font-mono text-[0.75rem] tracking-[0.14em] text-[var(--ground-ink-faint)]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <h3 className="mt-6 text-subheading text-[var(--ground-ink)]">
                  {capability.label}
                </h3>

                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                  {summaries[capability.href]}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-7 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[var(--ground-accent-ink)]"
                >
                  Learn more
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-1"
                  >
                    <path
                      d="M8.5 1L12.5 5L8.5 9M12 5H1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
