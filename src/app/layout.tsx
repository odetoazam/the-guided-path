import type { Metadata } from 'next'
import { Inter, Playfair_Display, Source_Serif_4, Amiri, Vazirmatn } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap', style: ['normal', 'italic'], weight: ['400', '500', '600', '700'] })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-body', display: 'swap', style: ['normal', 'italic'], weight: ['300', '400', '500', '600'] })
const amiri = Amiri({ subsets: ['arabic', 'latin'], variable: '--font-amiri', display: 'swap', weight: ['400', '700'], style: ['normal', 'italic'] })
const vazirmatn = Vazirmatn({ subsets: ['arabic', 'latin'], variable: '--font-arabic', display: 'swap', weight: ['300', '400', '500', '600', '700'] })
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
    images: [
      {
        url: '/api/og/quote?text=A%20contemplative%20companion%20for%20reading%20the%20Qur%27an.&cite=AyahGuide',
        width: 1200,
        height: 630,
        alt: 'AyahGuide — a contemplative companion for reading the Quran',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AyahGuide - Quranic Reflections',
    description: SITE_DESCRIPTION + '. Journey through the Quran with contemplative insight.',
    images: ['/api/og/quote?text=A%20contemplative%20companion%20for%20reading%20the%20Qur%27an.&cite=AyahGuide'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${sourceSerif.variable} ${amiri.variable} ${vazirmatn.variable}`}>
      <body className="min-h-screen bg-white dark:bg-navy-dark text-navy dark:text-cream antialiased">
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
