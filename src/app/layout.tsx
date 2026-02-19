import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AyahGuide - Quranic Reflections',
    template: '%s | AyahGuide',
  },
  description: 'Deep Quranic reflections (tadabbur) delivered to your inbox. Journey through the Quran with contemplative insight.',
  keywords: ['Quran', 'tadabbur', 'Islamic', 'reflection', 'newsletter', 'Quranic studies'],
  authors: [{ name: 'AyahGuide' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'AyahGuide',
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
