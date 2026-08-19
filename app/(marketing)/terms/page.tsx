import type { Metadata } from 'next';
import { LegalPage } from '@/components/marketing/LegalPage';
import { termsSections } from '@/lib/content/legal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing use of this website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Service"
      intro="These terms cover this website. Any engagement between us is governed by a separate written agreement."
      sections={termsSections}
    />
  );
}
