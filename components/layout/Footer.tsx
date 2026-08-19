import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { Logo } from '@/components/layout/Logo';
import { footerNav } from '@/lib/navigation';

/**
 * One reconciled service menu, matching the primary nav.
 *
 * ⚠️  Deliberately absent until confirmed (see the open questions):
 *   • office addresses. SETTLED 19 Aug 2026: the overseas entity is
 *     under a different name and must not be claimed. (Previously
 *     not yet established, so no location is claimed here
 *   • award badges — none are displayed until verified as current
 *   • client logos — a logo wall is a claim of scale
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-ground="dark" className="border-t border-[var(--ground-line)]">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2.6fr] lg:gap-20 lg:py-20">
          <div>
            <Logo />
            <p className="measure-tight mt-6 text-[0.9375rem] leading-relaxed text-[var(--ground-ink-muted)]">
              Technology &amp; AI engineering partner. AI, software engineering, data and technology
              partnerships.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h2 className="eyebrow text-[var(--ground-ink-faint)]">{group.heading}</h2>
                <ul className="mt-4 space-y-0.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block py-3 text-[0.9375rem] text-[var(--ground-ink-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--ground-ink)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--ground-line)] py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-[var(--ground-ink-faint)]">
            © {year} Hegtavic Tech Co. All rights reserved.
          </p>
          <p className="eyebrow text-[var(--ground-accent-ink)]">Embrace Technology</p>
        </div>
      </Container>
    </footer>
  );
}
