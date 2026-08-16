'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { Logo } from '@/components/layout/Logo';
import { MobileNav } from '@/components/layout/MobileNav';
import { capabilities, CTA_HREF, CTA_LABEL, primaryNav } from '@/lib/navigation';
import { cn } from '@/lib/utils/cn';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // A small close delay stops the panel flickering shut as the
  // pointer crosses the gap between trigger and panel.
  const open = () => {
    clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const close = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 120);
  };

  return (
    <header
      data-ground="dark"
      className="sticky top-0 z-50 border-b border-[var(--ground-line)]"
      onKeyDown={(e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      }}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-8">
          <Logo priority />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li className="relative" onMouseEnter={open} onMouseLeave={close}>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="expertise-menu"
                  onClick={() => setMenuOpen((v) => !v)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[0.9375rem]',
                    'text-[var(--ground-ink-muted)] transition-colors duration-[var(--duration-fast)]',
                    'hover:text-[var(--ground-ink)]',
                    menuOpen && 'text-[var(--ground-ink)]',
                  )}
                >
                  Expertise
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                    className={cn(
                      'transition-transform duration-[var(--duration-fast)]',
                      menuOpen && 'rotate-180',
                    )}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div
                  id="expertise-menu"
                  hidden={!menuOpen}
                  className={cn(
                    'absolute left-0 top-full w-[36rem] pt-3',
                    'motion-safe:animate-[fadeIn_var(--duration-base)_var(--ease-out-quart)]',
                  )}
                >
                  <div className="rounded-lg border border-[var(--ground-line)] bg-[var(--ground-raised)] p-2 shadow-2xl shadow-black/40">
                    <ul className="grid grid-cols-2 gap-1">
                      {capabilities.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="block rounded-md p-3 transition-colors duration-[var(--duration-fast)] hover:bg-[var(--ground-sunken)]"
                          >
                            <span className="block text-[0.9375rem] font-medium text-[var(--ground-ink)]">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-[0.8125rem] leading-snug text-[var(--ground-ink-muted)]">
                              {item.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>

              {primaryNav
                .filter((l) => l.label !== 'Expertise')
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-2 text-[0.9375rem] text-[var(--ground-ink-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--ground-ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button href={CTA_HREF} size="md">
              {CTA_LABEL}
            </Button>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
