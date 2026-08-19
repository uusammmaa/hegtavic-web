import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { fontVariables } from './fonts';
import './globals.css';

/**
 * Resolve the origin used for canonical URLs and OG image paths.
 *
 * Order matters:
 *  1. NEXT_PUBLIC_SITE_URL — set this to the real domain at launch. It is the
 *     only value that survives a move off Vercel, so it always wins.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — the project's stable production host.
 *     Correct on production builds without anyone configuring anything.
 *  3. VERCEL_URL — the per-deployment host, so preview builds describe
 *     themselves rather than inheriting production's canonicals.
 *  4. localhost for `next dev`.
 *
 * Without this, an unset env var silently produced canonicals and OG images
 * pointing at http://localhost:3000 on a live deployment — which breaks every
 * link preview and, once the site is indexable, every canonical tag.
 */
/**
 * ⚠️  Do NOT collapse this into `PRODUCTION_URL ?? VERCEL_URL`.
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL on EVERY deployment,
 * previews included, so a `??` chain never reaches VERCEL_URL and
 * every preview would emit canonicals pointing at production — the
 * exact bug this block exists to avoid. Branch on VERCEL_ENV.
 */
const vercelHost =
  process.env.VERCEL_ENV === 'production'
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : (process.env.VERCEL_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL);

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hegtavic — Technology & AI Engineering Partner',
    template: '%s | Hegtavic',
  },
  description:
    'Hegtavic is an AI and software engineering company helping businesses build, modernize and scale digital products and intelligent systems.',
  applicationName: 'Hegtavic',
  openGraph: {
    type: 'website',
    siteName: 'Hegtavic',
    title: 'Hegtavic — Technology & AI Engineering Partner',
    description:
      'AI and software engineering solutions built around your business. Build Smarter. Scale Faster.',
    url: siteUrl,
  },
  twitter: { card: 'summary_large_image' },
  // Not indexable until launch: the site still carries specimen
  // content and the URL migration map is not yet in place.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#16181A',
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body data-ground="light" className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only rounded-md bg-brand-green px-4 py-2 font-medium text-graphite focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
