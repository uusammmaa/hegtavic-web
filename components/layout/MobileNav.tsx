'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { capabilities, CTA_HREF, CTA_LABEL, expertiseIndex, primaryNav } from '@/lib/navigation';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Lock scroll and return focus to the trigger on close, so the
  // drawer is usable by keyboard and screen reader alike.
  useEffect(() => {
    if (!open) return;

    // Captured now: by cleanup time the ref may point elsewhere.
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--ground-ink)]"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M5 5l12 12M17 5L5 17"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6.5h16M3 15.5h16"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          tabIndex={-1}
          data-ground="dark"
          className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-[var(--ground-line)] px-6 py-8"
        >
          <nav aria-label="Mobile">
            <p className="eyebrow text-[var(--ground-ink-faint)]">Expertise</p>
            <ul className="mt-4 space-y-1">
              {capabilities.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-[1.0625rem] text-[var(--ground-ink)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={expertiseIndex.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-[1.0625rem] font-medium text-[var(--ground-accent-ink)]"
                >
                  {expertiseIndex.label}
                </Link>
              </li>
            </ul>

            <hr className="my-7 border-[var(--ground-line)]" />

            <ul className="space-y-1">
              {primaryNav
                .filter((l) => l.label !== 'Expertise')
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 text-[1.0625rem] text-[var(--ground-ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>

            <Button href={CTA_HREF} size="lg" className="mt-8 w-full">
              {CTA_LABEL}
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
