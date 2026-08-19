import type { Metadata } from 'next';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { process } from '@/lib/content/company';
import { roles } from '@/lib/content/roles';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Open roles at Hegtavic. A small senior engineering team building AI and software systems for international clients.',
  alternates: { canonical: '/careers' },
};

/**
 * ⚠️  No headcount, no office photographs, no invented benefits.
 * Everything on this page is either true today or absent — see the
 * note at the top of lib/content/roles.ts.
 *
 * Applications go to email rather than a form. PLAN.md R7 removed the
 * database, and a CV upload with nowhere durable to land is worse than
 * an address a person actually reads.
 */
export default function CareersPage() {
  return (
    <>
      <Section ground="dark" tight>
        <Container>
          <Eyebrow accent>Careers</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-display-xl text-[var(--ground-ink)]">
            Work On Systems That Run
          </h1>
          <p className="measure mt-7 text-lede text-[var(--ground-ink-muted)]">
            We are a small engineering team working with clients internationally. The work is real
            and so is the review — nothing here is a sandbox.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="openings-heading">
        <Container>
          <h2 id="openings-heading" className="text-heading text-[var(--ground-ink)]">
            {roles.length > 0 ? 'Open roles' : 'No open roles right now'}
          </h2>

          {roles.length === 0 ? (
            <p className="measure mt-5 leading-relaxed text-[var(--ground-ink-muted)]">
              We are not hiring at the moment. If you think you would be a fit anyway, write to us —
              we would rather hear from you early than not at all.
            </p>
          ) : (
            <div className="mt-10 space-y-16">
              {roles.map((role) => (
                <article key={role.slug} id={role.slug}>
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <h3 className="text-subheading text-[var(--ground-ink)]">{role.title}</h3>
                    <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[var(--ground-ink-faint)]">
                      {role.location} · {role.type}
                    </p>
                  </div>

                  {role.intro.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="measure mt-5 leading-relaxed text-[var(--ground-ink-muted)]"
                    >
                      {paragraph}
                    </p>
                  ))}

                  <div className="mt-10 grid gap-10 lg:grid-cols-2">
                    <RoleList heading="What you will do" items={role.responsibilities} />
                    <RoleList heading="What we need from you" items={role.requirements} />
                    <RoleList heading="Useful, not required" items={role.niceToHave} />
                    <RoleList heading="What we offer" items={role.offer} />
                  </div>

                  <div className="mt-10 border-t border-[var(--ground-line)] pt-6">
                    <p className="measure leading-relaxed text-[var(--ground-ink-muted)]">
                      {role.applyNote}
                    </p>
                    <p className="mt-4">
                      <a
                        href={`mailto:${role.applyEmail}?subject=${encodeURIComponent(role.title)}`}
                        className="text-subheading text-[var(--ground-accent-ink)] underline-offset-4 hover:underline"
                      >
                        {role.applyEmail}
                      </a>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section ground="sunken" aria-labelledby="how-we-work-heading">
        <Container>
          <Eyebrow>How we work</Eyebrow>
          <h2 id="how-we-work-heading" className="mt-6 text-heading text-[var(--ground-ink)]">
            The same process, whoever you are
          </h2>
          <p className="measure mt-5 leading-relaxed text-[var(--ground-ink-muted)]">
            Client work and internal work run through the same steps. You will see all six.
          </p>
          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step) => (
              <li key={step.step}>
                <p className="font-mono text-[0.75rem] text-[var(--ground-ink-faint)]">
                  {step.step}
                </p>
                <h3 className="mt-2 text-[1.0625rem] font-medium text-[var(--ground-ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <FinalCta
        heading="Not a role, but still want to talk?"
        body="If you build things and think we would get on, write to us anyway."
      />
    </>
  );
}

function RoleList({ heading, items }: { heading: string; items: readonly string[] }) {
  return (
    <div>
      <h4 className="eyebrow text-[var(--ground-ink-faint)]">{heading}</h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="relative pl-6 leading-relaxed text-[var(--ground-ink-muted)] before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--ground-accent-ink)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
