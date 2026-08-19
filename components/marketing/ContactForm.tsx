'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useActionState, useId } from 'react';
import { useFormStatus } from 'react-dom';
import { contactAreas, budgetRanges } from '@/lib/contact/fields';
import { submitContact, type ContactState } from '@/lib/contact/submit';

/**
 * The enquiry form.
 *
 * ⚠️  This collects personal data, so it renders a link to /privacy
 * and requires an explicit consent checkbox. Do not remove either —
 * see lib/content/legal.ts for why the page had to exist first.
 *
 * Errors are surfaced per field with aria-describedby and the server
 * echoes submitted values back, so a rejected submission never wipes
 * what someone typed. Turnstile only renders when a site key is
 * configured, so local development and previews work without one.
 */

const initialState: ContactState = { status: 'idle' };

const inputClass =
  'mt-2 h-11 w-full rounded-md border border-[var(--ground-line-strong)] bg-[var(--ground-raised)] px-3 text-[0.9375rem] text-[var(--ground-ink)]';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-13 items-center justify-center rounded-md bg-brand-green px-7 font-medium text-graphite transition-opacity disabled:cursor-progress disabled:opacity-60"
    >
      {pending ? 'SENDING…' : "LET'S TALK"}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.8125rem] text-[var(--ground-accent-ink)]">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const uid = useId();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const err = (name: string) => state.errors?.[name];
  const errId = (name: string) => `${uid}-${name}-error`;
  const value = (name: string) => state.values?.[name] ?? '';

  if (state.status === 'success') {
    return (
      <div
        role="status"
        className="rounded-lg border border-[var(--ground-line-strong)] bg-[var(--ground-sunken)] p-8"
      >
        <h2 className="text-subheading text-[var(--ground-ink)]">Thank you — that reached us.</h2>
        <p className="measure mt-3 leading-relaxed text-[var(--ground-ink-muted)]">
          We read every enquiry properly and will reply within two working days. If it is urgent,
          email us directly at{' '}
          <a
            href="mailto:info@hegtavic.com"
            className="text-[var(--ground-accent-ink)] underline-offset-4 hover:underline"
          >
            info@hegtavic.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      {siteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      ) : null}

      <form action={formAction} className="grid gap-6 sm:grid-cols-2" noValidate>
        {state.message ? (
          <p
            role="alert"
            className="sm:col-span-2 rounded-md border border-[var(--ground-accent-ink)] bg-[var(--ground-sunken)] px-4 py-3 text-[0.9375rem] text-[var(--ground-ink)]"
          >
            {state.message}
          </p>
        ) : null}

        <div>
          <label htmlFor={`${uid}-name`} className="text-[0.9375rem] text-[var(--ground-ink)]">
            Name <span className="text-[var(--ground-accent-ink)]">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            required
            defaultValue={value('name')}
            aria-invalid={Boolean(err('name'))}
            aria-describedby={err('name') ? errId('name') : undefined}
            className={inputClass}
          />
          <FieldError id={errId('name')} message={err('name')} />
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className="text-[0.9375rem] text-[var(--ground-ink)]">
            Work email <span className="text-[var(--ground-accent-ink)]">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            defaultValue={value('email')}
            aria-invalid={Boolean(err('email'))}
            aria-describedby={err('email') ? errId('email') : undefined}
            className={inputClass}
          />
          <FieldError id={errId('email')} message={err('email')} />
        </div>

        <div>
          <label htmlFor={`${uid}-company`} className="text-[0.9375rem] text-[var(--ground-ink)]">
            Company
          </label>
          <input
            id={`${uid}-company`}
            name="company"
            defaultValue={value('company')}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor={`${uid}-country`} className="text-[0.9375rem] text-[var(--ground-ink)]">
            Country
          </label>
          <input
            id={`${uid}-country`}
            name="country"
            defaultValue={value('country')}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-area`} className="text-[0.9375rem] text-[var(--ground-ink)]">
            What do you need help with?
          </label>
          <select
            id={`${uid}-area`}
            name="area"
            defaultValue={value('area')}
            className={inputClass}
          >
            <option value="">Select an area</option>
            {contactAreas.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-budget`} className="text-[0.9375rem] text-[var(--ground-ink)]">
            Indicative budget
          </label>
          <select
            id={`${uid}-budget`}
            name="budget"
            defaultValue={value('budget')}
            className={inputClass}
          >
            <option value="">Select a range</option>
            {budgetRanges.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className="text-[0.9375rem] text-[var(--ground-ink)]">
            Tell us about the project
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={6}
            defaultValue={value('message')}
            className="mt-2 w-full rounded-md border border-[var(--ground-line-strong)] bg-[var(--ground-raised)] px-3 py-2.5 text-[0.9375rem] leading-relaxed text-[var(--ground-ink)]"
          />
        </div>

        {/* Honeypot — hidden from people, not from bots. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex gap-3 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
            <input
              type="checkbox"
              name="consent"
              required
              aria-invalid={Boolean(err('consent'))}
              aria-describedby={err('consent') ? errId('consent') : undefined}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--ground-accent-ink)]"
            />
            <span>
              I have read the{' '}
              <Link
                href="/privacy"
                className="text-[var(--ground-accent-ink)] underline underline-offset-4"
              >
                privacy policy
              </Link>{' '}
              and understand how my enquiry will be handled.
            </span>
          </label>
          <FieldError id={errId('consent')} message={err('consent')} />
        </div>

        {siteKey ? (
          <div className="sm:col-span-2">
            <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto" />
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <SubmitButton />
        </div>
      </form>
    </>
  );
}
