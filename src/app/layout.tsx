import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
