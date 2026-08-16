import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import logo from '@/public/hegtavic-logo.png';

/**
 * The registered Hegtavic mark. Not to be redesigned, recoloured
 * or reproportioned — see the brand brief.
 *
 * ⚠️  ASSET LIMITATION (Q1b)
 * The only supplied artwork is a 605×254 raster, white-and-green
 * on an opaque black ground. The background has been removed for
 * development use, so the mark now sits correctly on graphite —
 * but it is still raster, and there is no variant that works on a
 * light ground.
 *
 * Consequences until an SVG (or a dark-type variant) arrives:
 *   • header and footer are graphite-grounded — which the palette
 *     wants anyway, see tokens.css
 *   • do not place this mark on a light surface
 *   • replace with <svg> here; nothing else needs to change
 */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Hegtavic — home"
      className={cn('inline-flex shrink-0 items-center', className)}
    >
      <Image
        src={logo}
        alt="Hegtavic — Embrace Technology"
        priority={priority}
        sizes="(max-width: 640px) 150px, 176px"
        className="h-auto w-[150px] sm:w-[176px]"
      />
    </Link>
  );
}
