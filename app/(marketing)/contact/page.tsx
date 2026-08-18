import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Section } from '@/components/primitives/Section';
import { headlineCapabilities } from '@/lib/content/capabilities';

export const metadata: Metadata = {
  title: "Let's Talk",
  description:
    'Tell us what you are building, improving or trying to solve, and we will come back with the right technical approach.',
  alternates: { canonical: '/contact' },
};

/**
 * ⚠️  The form is presentational in this phase.
 *
 * Submission needs a server action, Resend and Cloudflare Turnstile,
 * which land with the CMS phase. The fields, labels, validation
 * affordances and layout are final so the page can be reviewed;
 * `disabled` on the submit control makes the state explicit rather
 * than silently dropping an enquiry.
 *
 * ⚠️  No office address or phone number is published here. The form
 * of the Australian presence is not established, and a location
 * claim is exactly what a buyer's due diligence checks. The email
 * address is the one contact detail that is known to be correct.
 */

const budgets = [
  'Under $25,000',
  '$25,000 – $75,000',
  '$75,000 – $200,000',
  'Over $200,000',
  'Not sure yet',
] as const;

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
            <form className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Work email" name="email" type="email" required />
              <Field label="Company" name="company" />
              <Field label="Country" name="country" />

              <div className="sm:col-span-2">
                <Label htmlFor="interest">What do you need help with?</Label>
                <select
                  id="interest"
                  name="interest"
                  className="mt-2 h-11 w-full rounded-md border border-[var(--ground-line-strong)] bg-[var(--ground-raised)] px-3 text-[0.9375rem] text-[var(--ground-ink)]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an area
                  </option>
                  {headlineCapabilities.map((capability) => (
                    <option key={capability.slug} value={capability.slug}>
                      {capability.title}
                    </option>
                  ))}
                  <option value="other">Something else</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="budget">Indicative budget</Label>
                <select
                  id="budget"
                  name="budget"
                  className="mt-2 h-11 w-full rounded-md border border-[var(--ground-line-strong)] bg-[var(--ground-raised)] px-3 text-[0.9375rem] text-[var(--ground-ink)]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="message">Tell us about the project</Label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="mt-2 w-full rounded-md border border-[var(--ground-line-strong)] bg-[var(--ground-raised)] px-3 py-2.5 text-[0.9375rem] leading-relaxed text-[var(--ground-ink)]"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled
                  className="inline-flex h-13 items-center justify-center rounded-md bg-brand-green px-7 font-medium text-graphite disabled:pointer-events-none disabled:opacity-50"
                >
                  LET&rsquo;S TALK
                </button>
                <p className="mt-3 text-[0.8125rem] text-[var(--ground-ink-faint)]">
                  Form submission is not yet connected. Please email us in the meantime.
                </p>
              </div>
            </form>

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

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-[0.875rem] font-medium text-[var(--ground-ink)]">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-[var(--ground-accent-ink)]">
            {' '}
            *
          </span>
        )}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 h-11 w-full rounded-md border border-[var(--ground-line-strong)] bg-[var(--ground-raised)] px-3 text-[0.9375rem] text-[var(--ground-ink)]"
      />
    </div>
  );
}
