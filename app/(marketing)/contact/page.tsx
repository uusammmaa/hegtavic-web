import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { ContactForm } from '@/components/marketing/ContactForm';
import { Section } from '@/components/primitives/Section';

export const metadata: Metadata = {
  title: "Let's Talk",
  description:
    'Tell us what you are building, improving or trying to solve, and we will come back with the right technical approach.',
  alternates: { canonical: '/contact' },
};

/**
 * The form submits for real as of Phase 3 — see
 * components/marketing/ContactForm.tsx and lib/contact/submit.ts.
 *
 * ⚠️  It collects personal data, so it may only be enabled while
 * /privacy is published and linked from the consent checkbox. If
 * that page is ever taken down, disable this form in the same
 * change.
 *
 * ⚠️  No office address or phone number is published here. The form
 * SETTLED 19 Aug 2026: the owner confirmed the overseas entity is
 * registered under a different name and asked that it not be claimed.
 * No office address appears here. Previously the form of that presence
 * was merely unestablished; it is now a decision. A location
 * claim is exactly what a buyer's due diligence checks. The email
 * address is the one contact detail that is known to be correct.
 */

export default function ContactPage() {
  return (
    <>
      <Section ground="dark" tight>
        <Container>
          <Eyebrow accent>Contact</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-display-xl text-[var(--ground-ink)]">
            Let&rsquo;s Talk
          </h1>
          <p className="measure mt-7 text-lede text-[var(--ground-ink-muted)]">
            Tell us what you&rsquo;re building, improving or trying to solve. We&rsquo;ll come back
            with an honest view of the right technical approach — including whether we are the
            right people for it.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-24">
            <ContactForm />

            <aside className="lg:border-l lg:border-[var(--ground-line)] lg:pl-12">
              <h2 className="eyebrow text-[var(--ground-ink-faint)]">Direct</h2>
              <p className="mt-5">
                <a
                  href="mailto:info@hegtavic.com"
                  className="text-subheading text-[var(--ground-accent-ink)] underline-offset-4 hover:underline"
                >
                  info@hegtavic.com
                </a>
              </p>

              <h2 className="eyebrow mt-12 text-[var(--ground-ink-faint)]">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {[
                  'We read it properly and reply within two working days.',
                  'A 30-minute call to understand the problem, not to pitch.',
                  'A written view of the approach, scope and rough shape of the work.',
                ].map((step, i) => (
                  <li key={step} className="flex gap-3 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
                    <span className="font-mono text-[0.75rem] text-[var(--ground-ink-faint)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
