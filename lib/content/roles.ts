/**
 * Open roles.
 *
 * ⚠️  A job post is a claim about the company as much as a case study
 * is. Everything here must be true on the day it is published: if the
 * role is not actually open, or the company will not actually do what
 * the post says, take it down rather than leaving it up as decoration.
 *
 * ⛔ Do NOT state a salary, a headcount, an office address or a start
 * date that has not been confirmed. An unconfirmed benefit in a job
 * post is the same class of error as an invented client metric — it is
 * just aimed at a candidate instead of a buyer.
 *
 * The Senior Business Development Manager role was deferred: its spec
 * was never supplied in a form that could be quoted, and job
 * responsibilities are not something to invent.
 */

export type Role = {
  slug: string;
  title: string;
  location: string;
  type: string;
  /** One line for the listing card. */
  summary: string;
  intro: readonly string[];
  responsibilities: readonly string[];
  requirements: readonly string[];
  niceToHave: readonly string[];
  /** What the company commits to. Only what it will actually do. */
  offer: readonly string[];
  applyEmail: string;
  applyNote: string;
};

export const roles: readonly Role[] = [
  {
    slug: 'full-stack-engineering-intern',
    title: 'Full-Stack Engineering Intern',
    location: 'Lahore, Pakistan · On-site',
    type: 'Internship',
    summary:
      'Work on real client software with senior engineers, on a small team where your code reaches production rather than a sandbox.',
    intro: [
      'We are a small engineering team. That is the whole pitch: there is no bench, no shadow project and no six-month onboarding programme. You will work on software that clients actually use, reviewed by people who have shipped and maintained it.',
      'We are looking for someone early in their career who is genuinely curious about how systems behave in production — not just how to make them run once.',
    ],
    responsibilities: [
      'Build and modify features in TypeScript and React, or Python, depending on what is in flight.',
      'Write tests for what you build, and learn why the untested parts are the ones that break.',
      'Read existing code before changing it, and ask when something does not make sense.',
      'Take review seriously — give it and receive it. Most of the learning here happens in review.',
      'Help investigate real issues, including the unglamorous ones.',
    ],
    requirements: [
      'A working knowledge of JavaScript or Python, and enough HTML and CSS to build an interface that holds together.',
      'Something you have built that you can walk us through and explain the decisions in. A course project is fine. It does not need to be finished or impressive.',
      'Comfort with Git, or the willingness to be comfortable with it within a week.',
      'Written English good enough to explain a technical problem clearly. Much of our work is with clients in other time zones, so writing matters more than speaking.',
      'Available on-site in Lahore.',
    ],
    niceToHave: [
      'Exposure to React, Next.js, FastAPI or Node.js.',
      'Any experience with LLM APIs, automation tooling or data pipelines.',
      'A habit of reading documentation before searching for an answer.',
    ],
    offer: [
      'Real work from the first week, with your code reviewed properly rather than merged to be polite.',
      'Direct access to senior engineers — the team is small enough that you will work alongside them, not below them.',
      'Exposure to production systems: deployment, monitoring, and what happens when something breaks.',
      'An honest reference at the end, whatever the outcome.',
    ],
    applyEmail: 'info@hegtavic.com',
    applyNote:
      'Send your CV and a short note about something you have built. Tell us what you would change about it now. We read every application and reply either way.',
  },
];

export function getRole(slug: string): Role | undefined {
  return roles.find((role) => role.slug === slug);
}
