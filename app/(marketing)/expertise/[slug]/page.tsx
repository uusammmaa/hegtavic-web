import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FinalCta } from '@/components/marketing/FinalCta';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { capabilities, getCapability, headlineCapabilities } from '@/lib/content/capabilities';

type Params = { slug: string };

/** Every capability page is known at build time and prerendered. */
export function generateStaticParams(): Params[] {
  return capabilities.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return {};

  return {
    title: capability.title,
    description: capability.summary,
    alternates: { canonical: `/expertise/${capability.slug}` },
  };
}

export default async function CapabilityPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();

  const related = headlineCapabilities.filter((c) => c.slug !== capability.slug).slice(0, 3);

  return (
    <>
      <Section ground="dark" tight>
        <Container>
          <nav aria-label="Breadcrumb">
            <Link
              href="/expertise"
              className="eyebrow text-[var(--ground-accent-ink)] underline-offset-4 hover:underline"
            >
              Expertise
            </Link>
          </nav>

          <h1 className="mt-6 max-w-4xl text-display text-[var(--ground-ink)]">
            {capability.title}
          </h1>
          <p className="measure mt-7 text-lede text-[var(--ground-ink-muted)]">{capability.lede}</p>

          <ul className="mt-10 flex flex-wrap gap-2">
            {capability.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-[var(--ground-line)] px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-[var(--ground-ink-muted)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="delivers-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <Eyebrow accent>What we deliver</Eyebrow>
              <h2 id="delivers-heading" className="mt-5 text-heading text-[var(--ground-ink)]">
                {capability.summary}
              </h2>
            </div>

            <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {capability.delivers.map((item) => (
                <div key={item.title} className="border-t border-[var(--ground-line)] pt-5">
                  <dt className="text-subheading text-[var(--ground-ink)]">{item.title}</dt>
                  <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section ground="sunken" aria-labelledby="approach-heading">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow accent>How we work</Eyebrow>
            <h2 id="approach-heading" className="mt-5 text-display text-[var(--ground-ink)]">
              Our approach
            </h2>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            {capability.approach.map((item, i) => (
              <article
                key={item.title}
                className="rounded-lg border border-[var(--ground-line)] bg-[var(--ground-raised)] p-8"
              >
                <span className="font-mono text-[0.75rem] tracking-[0.14em] text-[var(--ground-ink-faint)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-subheading text-[var(--ground-ink)]">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tight aria-labelledby="related-heading">
        <Container>
          <h2 id="related-heading" className="eyebrow text-[var(--ground-ink-faint)]">
            Related expertise
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/expertise/${item.slug}`}
                  className="block rounded-lg border border-[var(--ground-line)] p-6 transition-colors duration-[var(--duration-base)] hover:border-[var(--ground-line-strong)]"
                >
                  <h3 className="text-[1rem] font-medium text-[var(--ground-ink)]">{item.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FinalCta
        heading="Have a Technology Challenge?"
        body="Let’s discuss your requirements and identify the right technical approach."
      />
    </>
  );
}
