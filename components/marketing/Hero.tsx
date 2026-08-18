import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { SystemDiagram } from '@/components/diagrams/SystemDiagram';
import { CTA_HREF, CTA_LABEL } from '@/lib/navigation';

/**
 * Homepage section 01.
 *
 * Headline, supporting line and CTA label are fixed by the brand
 * brief and are not to be reworded without approval.
 */
export function Hero() {
  return (
    <section data-ground="dark" className="relative overflow-hidden">
      {/* Fine grid, authored in CSS rather than shipped as an image. */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(120%_90%_at_15%_0%,black,transparent_70%)]"
      />
      {/* A single restrained accent wash. Green is never a large flat fill. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-56 h-[34rem] w-[34rem] rounded-full bg-brand-green opacity-[0.07] blur-[120px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
          <div>
            <Eyebrow accent>Technology &amp; AI Engineering Partner</Eyebrow>

            <h1 className="mt-6 text-display-xl text-[var(--ground-ink)]">
              Build Smarter.
              <br />
              Scale Faster.
            </h1>

            <p className="measure mt-7 text-lede text-[var(--ground-ink-muted)]">
              AI and software engineering solutions built around your business. We help businesses
              transform ideas, solve complex challenges and build technology that creates lasting
              value.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={CTA_HREF} size="lg">
                {CTA_LABEL}
              </Button>
              <Button href="/expertise" variant="secondary" size="lg">
                Explore our expertise
              </Button>
            </div>

            <p className="mt-6 text-[0.875rem] text-[var(--ground-ink-faint)]">
              Tell us what you&rsquo;re building, improving or trying to solve.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-lg border border-[var(--ground-line)] bg-[var(--ground-raised)]/60 p-6 backdrop-blur-sm sm:p-8">
              <SystemDiagram id="hero-diagram" className="h-auto w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
