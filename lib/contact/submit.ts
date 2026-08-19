'use server';

import { headers } from 'next/headers';
import { contactAreas, budgetRanges } from './fields';

/**
 * Contact form submission.
 *
 * Deliberately dependency-free. Resend and Cloudflare Turnstile are
 * both a single HTTPS POST, so this uses `fetch` rather than adding
 * two SDKs. The site is handed over for someone else to deploy
 * (PLAN.md R7); every dependency is something they have to keep
 * working, so the bar for adding one is high.
 *
 * ⚠️  This collects personal data. It must not be enabled before
 * /privacy is live and linked from the form — see lib/content/legal.ts.
 */

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Field-level messages, keyed by input name. */
  errors?: Record<string, string>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values?: Record<string, string>;
};

const MAX = { name: 100, email: 254, company: 120, country: 60, message: 5000 } as const;

/** RFC-pragmatic: rejects the obvious, does not attempt full RFC 5322. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(data: FormData, key: string): string {
  const raw = data.get(key);
  return typeof raw === 'string' ? raw.trim() : '';
}

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // If no secret is configured the check cannot be performed. Fail
  // closed in production; allow local development to work without it.
  if (!secret) return process.env.NODE_ENV !== 'production';

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
      }),
    });
    const body = (await res.json()) as { success?: boolean };
    return body.success === true;
  } catch {
    return false;
  }
}

function renderEmail(values: Record<string, string>): string {
  const rows = Object.entries(values)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key.padEnd(12)}: ${value}`)
    .join('\n');
  return `New enquiry from hegtavic.com\n\n${rows}\n`;
}

export async function submitContact(
  _previous: ContactState,
  data: FormData,
): Promise<ContactState> {
  const values = {
    name: str(data, 'name'),
    email: str(data, 'email'),
    company: str(data, 'company'),
    country: str(data, 'country'),
    area: str(data, 'area'),
    budget: str(data, 'budget'),
    message: str(data, 'message'),
  };

  // Honeypot. A real person never fills a field they cannot see.
  // Respond as though it succeeded so a bot learns nothing.
  if (str(data, 'website')) return { status: 'success' };

  const errors: Record<string, string> = {};

  if (!values.name) errors.name = 'Please tell us your name.';
  else if (values.name.length > MAX.name) errors.name = 'That name is too long.';

  if (!values.email) errors.email = 'We need an email address to reply to.';
  else if (values.email.length > MAX.email || !EMAIL.test(values.email))
    errors.email = 'That does not look like an email address.';

  if (values.company.length > MAX.company) errors.company = 'That is too long.';
  if (values.country.length > MAX.country) errors.country = 'That is too long.';
  if (values.message.length > MAX.message) errors.message = 'Please shorten your message.';

  // Select values must be one we offered, not whatever was posted.
  if (values.area && !contactAreas.some((a) => a.value === values.area))
    errors.area = 'Please choose one of the listed areas.';
  if (values.budget && !budgetRanges.some((b) => b.value === values.budget))
    errors.budget = 'Please choose one of the listed ranges.';

  if (!data.get('consent')) errors.consent = 'Please confirm you have read the privacy policy.';

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values, message: 'Please check the highlighted fields.' };
  }

  const forwarded = (await headers()).get('x-forwarded-for');
  const ip = forwarded ? (forwarded.split(',')[0]?.trim() ?? null) : null;

  const passed = await verifyTurnstile(str(data, 'cf-turnstile-response'), ip);
  if (!passed) {
    return {
      status: 'error',
      values,
      message: 'We could not verify that submission. Please reload the page and try again.',
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Misconfiguration must not look like the visitor's fault, and
    // must not silently discard an enquiry.
    console.error('[contact] missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL');
    return {
      status: 'error',
      values,
      message: 'Something went wrong on our side. Please email us directly at info@hegtavic.com.',
    };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Enquiry — ${values.name}${values.company ? ` (${values.company})` : ''}`,
        text: renderEmail(values),
      }),
    });

    if (!res.ok) {
      console.error('[contact] resend responded', res.status, await res.text());
      return {
        status: 'error',
        values,
        message: 'We could not send that just now. Please email us directly at info@hegtavic.com.',
      };
    }
  } catch (error) {
    console.error('[contact] resend threw', error);
    return {
      status: 'error',
      values,
      message: 'We could not send that just now. Please email us directly at info@hegtavic.com.',
    };
  }

  return { status: 'success' };
}
