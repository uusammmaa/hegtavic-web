import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function Card({
  interactive = false,
  className,
  children,
}: {
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-[var(--ground-line)] bg-[var(--ground-raised)] p-7',
        interactive &&
          'transition-colors duration-[var(--duration-base)] ease-[var(--ease-out-quart)] hover:border-[var(--ground-line-strong)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
