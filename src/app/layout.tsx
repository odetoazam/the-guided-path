import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/next'
import { PostHogProvider } from '@/components/providers/posthog-provider'
import { CookieBanner } from '@/components/ui/cookie-banner'
import { CANONICAL_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_URL),
  title: {
    default: 'AyahGuide - Quranic Reflections',
    template: '%s | AyahGuide',
  },
  description: SITE_DESCRIPTION + '. Journey through the Quran with contemplative insight.',
  keywords: ['Quran', 'tadabbur', 'Islamic reflection', 'Quranic studies', 'Quran commentary', 'Islamic learning', 'Surah reflection', 'ayah meaning'],
  authors: [{ name: SITE_NAME, url: CANONICAL_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: CANONICAL_URL,
    siteName: SITE_NAME,
    title: 'AyahGuide - Quranic Reflections',
    description: SITE_DESCRIPTION + '. Journey through the Quran with contemplative insight.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AyahGuide - Quranic Reflections',
    description: SITE_DESCRIPTION + '. Journey through the Quran with contemplative insight.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: CANONICAL_URL,
  logo: `${CANONICAL_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  sameAs: [],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: CANONICAL_URL,
  description: SITE_DESCRIPTION,
  publisher: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${CANONICAL_URL}/posts?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-navy-dark text-navy dark:text-cream antialiased">
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900 focus:shadow-md focus:outline-none"
        >
          Skip to main content
        </a>
        <PostHogProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <CookieBanner />
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700',
            }}
          />
        </ThemeProvider>
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  )
}
