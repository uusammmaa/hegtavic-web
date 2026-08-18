import { Capabilities } from '@/components/marketing/Capabilities';
import { CapabilitySpotlight } from '@/components/marketing/CapabilitySpotlight';
import { CapabilityStrip } from '@/components/marketing/CapabilityStrip';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Hero } from '@/components/marketing/Hero';
import { Introduction } from '@/components/marketing/Introduction';
import { PartnershipTeaser } from '@/components/marketing/PartnershipTeaser';
import { Philosophy } from '@/components/marketing/Philosophy';
import { ProcessSteps } from '@/components/marketing/ProcessSteps';
import { SelectedWork } from '@/components/marketing/SelectedWork';
import { WhyHegtavic } from '@/components/marketing/WhyHegtavic';
import { SystemDiagram } from '@/components/diagrams/SystemDiagram';
import { requireCapability } from '@/lib/content/capabilities';

/**
 * Homepage — the 14-section flow specified in the brand brief.
 *
 *   01  Hero ................. Build Smarter. Scale Faster.
 *   02  Trust / Expertise .... AI · Software · Data · Engineering
 *   03  Introduction ......... Your Technology Partner for What's Next
 *   04  Capabilities ......... Our Technology Expertise
 *   05  AI ................... Turn Data Into Intelligence
 *   06  Generative AI ........ Build With Generative AI
 *   07  Software ............. Build Digital Products That Scale
 *   08  Teams ................ Extend Your Engineering Team
 *   09  Proof ................ Selected Work
 *   10  Why Hegtavic ......... Why Businesses Choose Hegtavic
 *   11  Process .............. From Business Problem to Working Solution
 *   12  Partnership .......... Partner With Hegtavic
 *   13  Philosophy ........... Technology With Purpose
 *   14  Final CTA ............ Let's Build Something Valuable
 *
 * Grounds alternate on every boundary so the page has rhythm rather
 * than fourteen visually identical bands. Two adjacent sections
 * sharing a ground merge into one band and lose the section break,
 * so the sequence below is deliberate:
 *
 *   dark · dark-sunken · light · sunken · light · dark · light ·
 *   sunken · light · dark · sunken · light · dark · sunken
 */

const ai = requireCapability('ai-machine-learning');
const genAi = requireCapability('generative-ai');
const software = requireCapability('software-product-engineering');
const teams = requireCapability('dedicated-teams');

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <Introduction />
      <Capabilities />

      <CapabilitySpotlight capability={ai} eyebrow="AI" />

      <CapabilitySpotlight
        capability={genAi}
        eyebrow="Generative AI"
        ground="dark"
        reverse
        visual={
          <div className="rounded-lg border border-[var(--ground-line)] bg-[var(--ground-raised)] p-6 sm:p-8">
            <SystemDiagram id="genai-diagram" className="h-auto w-full" />
          </div>
        }
      />

      <CapabilitySpotlight capability={software} eyebrow="Software" />

      <CapabilitySpotlight capability={teams} eyebrow="Teams" ground="sunken" reverse />

      <SelectedWork />
      <WhyHegtavic />
      <ProcessSteps ground="sunken" />
      <PartnershipTeaser />
      <Philosophy />
      <FinalCta />
    </>
  );
}
