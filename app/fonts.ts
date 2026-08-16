import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

/**
 * Self-hosted variable fonts — no external requests, no layout
 * shift, and nothing for a third party to log.
 */
export const fontVariables = `${GeistSans.variable} ${GeistMono.variable}`;
