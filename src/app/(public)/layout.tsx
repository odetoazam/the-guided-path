import Link from 'next/link'
import { SiteNav } from '@/components/ui/site-nav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark">
      <SiteNav />

      <main>{children}</main>

      <footer className="border-t border-zinc-200 dark:border-navy-medium py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-cream/40">&copy; {new Date().getFullYear()} AyahGuide</p>
          <div className="flex gap-6 text-sm text-zinc-500 dark:text-cream/40">
            <Link href="/surahs" className="hover:text-navy dark:hover:text-cream">Surahs</Link>
            <Link href="/understanding-quran" className="hover:text-navy dark:hover:text-cream">Understanding Quran</Link>
            <Link href="/posts" className="hover:text-navy dark:hover:text-cream">Posts</Link>
            <Link href="/#subscribe" className="hover:text-navy dark:hover:text-cream">Subscribe</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
