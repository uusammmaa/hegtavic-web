import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Width = 'default' | 'narrow' | 'wide';

const widths: Record<Width, string> = {
  narrow: 'max-w-[52rem]',
  default: 'max-w-[77.5rem]',
  wide: 'max-w-[88rem]',
};

export function Container({
  width = 'default',
  className,
  children,
}: {
  width?: Width;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('mx-auto w-full px-6 sm:px-8 lg:px-12', widths[width], className)}>
      {children}
    </div>
  );
}
