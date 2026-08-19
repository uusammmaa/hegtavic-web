/**
 * When fabricated placeholder content may be rendered.
 *
 * Shared by case-studies.ts and team.ts so there is exactly one place
 * this decision is made. Two copies of a security-relevant predicate
 * is one copy too many.
 *
 * ⚠️  Both halves of this are load-bearing.
 *
 * `VERCEL_ENV !== 'production'` alone FAILS OPEN off Vercel: the
 * variable is undefined on any other host, so the comparison is true
 * and the gate collapses to a single public flag. PLAN.md R7 expects
 * this site to be handed over for someone else to deploy, quite
 * possibly not on Vercel, so that is a real deployment path.
 *
 * Requiring `NODE_ENV !== 'production'` instead is too strict the
 * other way: `next build` sets it on Vercel previews too, and a
 * preview URL is exactly where the client is meant to review the
 * case study template before real material exists.
 *
 * So: explicitly allow a Vercel preview, otherwise require a
 * development build, and never allow Vercel production. An unknown
 * host running a production build is treated as production, which is
 * the safe reading — the content behind this gate includes invented
 * client figures and an invented biography attached to a real,
 * named person.
 */

const isVercelProduction = process.env.VERCEL_ENV === 'production';
const isVercelPreview = process.env.VERCEL_ENV === 'preview';
const isDevelopmentBuild = process.env.NODE_ENV !== 'production';

export const specimensVisible =
  process.env.NEXT_PUBLIC_SHOW_SPECIMEN === 'true' &&
  !isVercelProduction &&
  (isVercelPreview || isDevelopmentBuild);
