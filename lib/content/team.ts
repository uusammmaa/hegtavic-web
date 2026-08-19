/**
 * The team.
 *
 * ⛔ THE RULE, from CONTENT-SPECIMEN.md §2:
 *   "Name real people with real roles, or name no one. A team section
 *    of invented people is worse than no team section, because it is
 *    the exact claim a buyer verifies on LinkedIn."
 *
 * So this uses the same discriminated union as case-studies.ts. Every
 * member below is a specimen and is excluded from production by
 * construction. The About page renders nothing where there is nothing
 * verified — it does not fall back to placeholder names.
 *
 * Shahzad Rana is a real, publicly recorded name (companies register),
 * but the bio here is still invented, so the entry remains a specimen
 * until he confirms it. A real name attached to an invented biography
 * is not "half true"; it is the most damaging kind of false claim,
 * because it is attributable to a person.
 *
 * ⚠️  Avatars are monograms, never photographs and never generated
 * faces — MEDIA-BRIEF.md §2.
 */

type TeamMemberBase = {
  /** Stable key. Not a URL — there are no per-person pages. */
  id: string;
  role: string;
  /** Initials for the monogram. Two characters reads best. */
  monogram: string;
  bio: string;
};

export type SpecimenTeamMember = TeamMemberBase & {
  status: 'specimen';
  /** Placeholder or real-but-unconfirmed. */
  name: string;
  specimenNotice: string;
};

export type VerifiedTeamMember = TeamMemberBase & {
  status: 'verified';
  name: string;
  /** ISO date the person confirmed their own name, role and bio. */
  confirmedOn: string;
};

export type TeamMember = SpecimenTeamMember | VerifiedTeamMember;

const NOTICE =
  'Placeholder. This person, or their biography, has not been confirmed. Names and bios must be approved by the individuals themselves before publication.';

export const teamMembers: readonly TeamMember[] = [
  {
    status: 'specimen',
    specimenNotice:
      'Real, publicly recorded name — but this biography is invented and must be confirmed or rewritten by him before it is published.',
    id: 'ceo',
    name: 'Shahzad Rana',
    monogram: 'SR',
    role: 'Chief Executive',
    bio: 'Founded Hegtavic and has led it since. Works directly on commercial terms and scoping for every engagement above a threshold size.',
  },
  {
    status: 'specimen',
    specimenNotice: NOTICE,
    id: 'eng-lead',
    name: 'Engineering Lead',
    monogram: 'EL',
    role: 'Engineering Lead',
    bio: 'Runs delivery across all active engagements and sets the technical standard. The final reviewer on any architecture that leaves the building.',
  },
  {
    status: 'specimen',
    specimenNotice: NOTICE,
    id: 'backend',
    name: 'Senior Engineer, Backend',
    monogram: 'BE',
    role: 'Senior Engineer, Backend',
    bio: 'Distributed systems and data infrastructure — pipelines, migrations and the parts of a platform that fail quietly.',
  },
  {
    status: 'specimen',
    specimenNotice: NOTICE,
    id: 'aiml',
    name: 'Senior Engineer, AI/ML',
    monogram: 'AI',
    role: 'Senior Engineer, AI/ML',
    bio: 'Retrieval systems and applied LLM work — evaluation harnesses, grounding, and the unfashionable part of AI engineering that determines whether any of it survives contact with production.',
  },
  {
    status: 'specimen',
    specimenNotice: NOTICE,
    id: 'fullstack-senior',
    name: 'Senior Engineer, Full-stack',
    monogram: 'FS',
    role: 'Senior Engineer, Full-stack',
    bio: 'Product engineering across TypeScript and React. Interested in the parts of the frontend that are actually hard: offline state, conflict resolution, accessibility.',
  },
  {
    status: 'specimen',
    specimenNotice: NOTICE,
    id: 'qa',
    name: 'QA & Delivery',
    monogram: 'QA',
    role: 'QA & Delivery',
    bio: 'Test strategy, release process and client-facing delivery reporting.',
  },
];

export { specimensVisible } from './specimen';
import { specimensVisible } from './specimen';

export const publishedTeam: readonly VerifiedTeamMember[] = teamMembers.filter(
  (member): member is VerifiedTeamMember => member.status === 'verified',
);

export const specimenTeam: readonly SpecimenTeamMember[] = teamMembers.filter(
  (member): member is SpecimenTeamMember => member.status === 'specimen',
);

export const visibleTeam: readonly TeamMember[] = specimensVisible ? teamMembers : publishedTeam;

export function isSpecimenMember(member: TeamMember): member is SpecimenTeamMember {
  return member.status === 'specimen';
}
