import Link from 'next/link'
import { SiteNav } from '@/components/ui/site-nav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <SiteNav />

      <main>{children}</main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} AyahGuide</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/surah" className="hover:text-zinc-900 dark:hover:text-white">Surahs</Link>
            <Link href="/understanding-quran" className="hover:text-zinc-900 dark:hover:text-white">Understanding Quran</Link>
            <Link href="/posts" className="hover:text-zinc-900 dark:hover:text-white">Posts</Link>
            <Link href="/#subscribe" className="hover:text-zinc-900 dark:hover:text-white">Subscribe</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
