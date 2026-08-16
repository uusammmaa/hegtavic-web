/**
 * Ambient declarations for things Next.js does not declare itself.
 *
 * Next provides `*.module.css` (node_modules/next/types/global.d.ts)
 * and the image formats (next/image-types/global.d.ts), but not a
 * plain `*.css` side-effect import — so `import './globals.css'`
 * has no declaration to resolve to.
 *
 * TypeScript only reports this (TS2882) when
 * `noUncheckedSideEffectImports` is on, which is why it surfaces in
 * an editor running a newer tsserver while `tsc` on the pinned
 * version stays quiet. Declaring it here fixes it for every
 * TypeScript version and every editor, rather than for whichever
 * one happens to be checking.
 *
 * The wildcard does not shadow `*.module.css`: TypeScript resolves
 * to the most specific matching pattern, so CSS Modules keep their
 * typed default export.
 */

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
