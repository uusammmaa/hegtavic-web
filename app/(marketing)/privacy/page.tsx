import type { Metadata } from 'next';
import { LegalPage } from '@/components/marketing/LegalPage';
import { privacySections } from '@/lib/content/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What this site collects, why, on what legal basis, who processes it, and how to exercise your rights.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="What we collect through this website, why we collect it, and what you can ask us to do about it."
      sections={privacySections}
    />
  );
}
