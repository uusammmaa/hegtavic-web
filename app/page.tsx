import { Capabilities } from '@/components/marketing/Capabilities';
import { CapabilityStrip } from '@/components/marketing/CapabilityStrip';
import { Hero } from '@/components/marketing/Hero';
import { Introduction } from '@/components/marketing/Introduction';

/**
 * Homepage.
 *
 * Section order follows the flow set out in the brand brief.
 * Phase 1 delivers 01–04; 05–14 land in Phase 2.
 *
 *   01  Hero ................. Build Smarter. Scale Faster.
 *   02  Trust / Expertise .... AI · Software · Data · Engineering
 *   03  Introduction ......... Your Technology Partner for What's Next
 *   04  Capabilities ......... Our Technology Expertise
 *   05  AI                          ── Phase 2
 *   06  Generative AI               ── Phase 2
 *   07  Software                    ── Phase 2
 *   08  Teams                       ── Phase 2
 *   09  Proof / Selected Work       ── Phase 2
 *   10  Why Hegtavic                ── Phase 2
 *   11  Process                     ── Phase 2
 *   12  Partnership                 ── Phase 2
 *   13  Philosophy                  ── Phase 2
 *   14  Final CTA                   ── Phase 2
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <Introduction />
      <Capabilities />
    </>
  );
}
