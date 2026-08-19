import { headlineCapabilities } from '@/lib/content/capabilities';

/**
 * The option sets offered by the contact form.
 *
 * Shared by the client component that renders them and the server
 * action that validates against them, so a posted value can be
 * checked against exactly what was offered rather than trusted.
 * Keeping this in one module is what makes that guarantee real.
 */

export type Option = { value: string; label: string };

export const contactAreas: readonly Option[] = [
  ...headlineCapabilities.map((capability) => ({
    value: capability.slug,
    label: capability.title,
  })),
  { value: 'other', label: 'Something else' },
];

export const budgetRanges: readonly Option[] = [
  { value: 'under-25k', label: 'Under $25,000' },
  { value: '25k-75k', label: '$25,000 – $75,000' },
  { value: '75k-150k', label: '$75,000 – $150,000' },
  { value: 'over-150k', label: 'Over $150,000' },
  { value: 'unsure', label: 'Not sure yet' },
];
