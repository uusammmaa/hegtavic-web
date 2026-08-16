import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

/**
 * The primary variant is brand green with graphite text — 7.65:1.
 *
 * The obvious alternative, white text on brand green, measures
 * 2.33:1 and fails AA. See styles/tokens.css. This is why the
 * button looks the way it does; it is not a stylistic whim.
 */
const variants: Record<Variant, string> = {
  primary: cn(
    'bg-brand-green text-graphite',
    'hover:bg-green-bright active:bg-brand-green',
    'shadow-[0_1px_0_0_rgba(0,0,0,0.06)]',
  ),
  secondary: cn(
    'bg-transparent text-[var(--ground-ink)]',
    'border border-[var(--ground-line-strong)]',
    'hover:border-[var(--ground-ink)] hover:bg-[var(--ground-raised)]',
  ),
  ghost: cn('bg-transparent text-[var(--ground-ink-muted)]', 'hover:text-[var(--ground-ink)]'),
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
};

const base = cn(
  'inline-flex items-center justify-center gap-2',
  'rounded-md font-medium whitespace-nowrap',
  'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-quart)]',
  'disabled:pointer-events-none disabled:opacity-50',
);

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className' | 'children'>;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link {...rest} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
