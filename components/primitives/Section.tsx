import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Ground = 'light' | 'dark' | 'sunken';

/**
 * Sections declare their ground; the semantic tokens in
 * tokens.css flip so descendants never reference a raw brand
 * colour. This is what keeps the contrast rule enforceable.
 */
export function Section({
  ground = 'light',
  tight = false,
  as: Tag = 'section',
  className,
  children,
  ...rest
}: {
  ground?: Ground;
  tight?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
  'aria-labelledby'?: string;
}) {
  return (
    <Tag
      data-ground={ground}
      className={cn(
        'relative',
        tight ? 'py-[var(--spacing-section-tight)]' : 'py-[var(--spacing-section)]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
