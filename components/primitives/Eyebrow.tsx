import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * Small mono label above a heading. Uses the accent that is
 * text-safe on the current ground.
 */
export function Eyebrow({
  accent = false,
  className,
  children,
}: {
  accent?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        'eyebrow',
        accent ? 'text-[var(--ground-accent-ink)]' : 'text-[var(--ground-ink-muted)]',
        className,
      )}
    >
      {children}
    </p>
  );
}
