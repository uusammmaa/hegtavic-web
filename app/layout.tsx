import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { siteUrl } from '@/lib/seo/site-url';
import { fontVariables } from './fonts';
import './globals.css';

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
    locale: 'en',
    title: 'Hegtavic — Technology & AI Engineering Partner',
    description:
      'AI and software engineering solutions built around your business. Build Smarter. Scale Faster.',
    url: siteUrl,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Hegtavic — Embrace Technology',
      },
    ],
  },
  /**
   * The card renders the page title and description as text beside the
   * image, so the image carries the mark only. Text baked into it would
   * duplicate what the card already shows — and the site's typeface
   * ships as woff2, which cannot be rendered into a raster here without
   * substituting a different font and looking off-brand.
   */
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
        <OrganizationSchema />
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
