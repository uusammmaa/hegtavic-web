import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { isSpecimenMember, visibleTeam } from '@/lib/content/team';

/**
 * Monogram avatars — initials on a tinted tile, drawn in code.
 *
 * No photographs and no generated faces (MEDIA-BRIEF.md §1–2). A
 * generated headshot presented as a member of staff is the single
 * most damaging thing this site could publish: it takes a buyer
 * fifteen seconds to reverse-image-search, and being caught destroys
 * every other credibility signal at once.
 *
 * Monograms are a permanent answer, not a stopgap. If real photographs
 * never arrive, nothing here is broken.
 *
 * Renders nothing when no member has been confirmed, which is the
 * correct behaviour — see the rule at the top of lib/content/team.ts.
 */
function Monogram({ initials }: { initials: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--ground-line-strong)] bg-[var(--ground-sunken)] font-mono text-[0.9375rem] tracking-[0.06em] text-[var(--ground-accent-ink)]"
    >
      {initials}
    </span>
  );
}

export function TeamGrid() {
  if (visibleTeam.length === 0) return null;

  return (
    <Section ground="sunken" aria-labelledby="team-heading">
      <Container>
        <Eyebrow>People</Eyebrow>
        <h2 id="team-heading" className="mt-6 text-heading text-[var(--ground-ink)]">
          Who you work with
        </h2>
        <p className="measure mt-5 leading-relaxed text-[var(--ground-ink-muted)]">
          We are a small senior team. You work with the people who do the work, not with an account
          layer in front of them.
        </p>

        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTeam.map((member) => (
            <li key={member.id} className="flex gap-5">
              <Monogram initials={member.monogram} />
              <div>
                <h3 className="text-[1.0625rem] font-medium text-[var(--ground-ink)]">
                  {member.name}
                  {isSpecimenMember(member) ? (
                    <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-[var(--ground-accent-ink)]">
                      specimen
                    </span>
                  ) : null}
                </h3>
                <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-[var(--ground-ink-faint)]">
                  {member.role}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                  {member.bio}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
