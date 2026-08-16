/**
 * Join class names, dropping falsy values.
 *
 * Deliberately dependency-free: the component layer uses simple
 * variant maps rather than runtime class merging, so the extra
 * weight of clsx + tailwind-merge is not justified here.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
