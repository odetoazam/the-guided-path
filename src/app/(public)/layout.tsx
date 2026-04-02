import Link from 'next/link'
import { SiteNav } from '@/components/ui/site-nav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark">
      <SiteNav />

      <main id="main-content">{children}</main>

      <footer className="border-t border-zinc-200 dark:border-navy-medium py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-cream/40">&copy; {new Date().getFullYear()} AyahGuide</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500 dark:text-cream/40">
            <Link href="/surahs" className="hover:text-navy dark:hover:text-cream">Surahs</Link>
            <Link href="/glossary" className="hover:text-navy dark:hover:text-cream">Glossary</Link>
            <Link href="/understanding-quran" className="hover:text-navy dark:hover:text-cream">Understanding Quran</Link>
            <Link href="/ulum-al-quran" className="hover:text-navy dark:hover:text-cream">Sciences of the Quran</Link>
            <Link href="/articles" className="hover:text-navy dark:hover:text-cream">Articles</Link>
            <Link href="/#subscribe" className="hover:text-navy dark:hover:text-cream">Subscribe</Link>
            <Link href="/privacy" className="hover:text-navy dark:hover:text-cream">Privacy</Link>
            <Link href="/terms" className="hover:text-navy dark:hover:text-cream">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
