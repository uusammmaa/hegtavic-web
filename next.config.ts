import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Allow a build to write somewhere other than .next.
   *
   * A `next dev` server writes to .next continuously. Running
   * `next build` at the same time makes the two fight over the same
   * files, and the build fails with a missing manifest that has
   * nothing to do with the code. Setting NEXT_DIST_DIR lets a
   * verification build run without stopping anyone's dev server.
   *
   * Unset in CI and on Vercel, so those use the default .next.
   */
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
