import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async redirects() {
    return [
      {
        source: '/surah',
        destination: '/surahs',
        permanent: true,
      },
      {
        source: '/surah/:slug',
        destination: '/surahs/:slug',
        permanent: true,
      },
      {
        source: '/surahs/:slug/overview',
        destination: '/surahs/:slug',
        permanent: true,
      },
      {
        source: '/surahs/al-baqara',
        destination: '/surahs/al-baqarah',
        permanent: true,
      },
      // Tadabbur post slug migrations (bare surah-ayah refs → title slugs)
      {
        source: '/posts/004-135',
        destination: '/posts/against-yourself-first',
        permanent: true,
      },
      {
        source: '/posts/041-034-035',
        destination: '/posts/turn-your-enemy-into-your-closest-friend',
        permanent: true,
      },
      {
        source: '/posts/057-016',
        destination: '/posts/has-the-time-not-come',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://va.vercel-scripts.com https://us-assets.i.posthog.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com https://vitals.vercel-insights.com https://us.i.posthog.com https://*.ingest.us.sentry.io",
              "media-src 'self' https://cdn.islamic.network",
              "frame-src https://challenges.cloudflare.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
})
