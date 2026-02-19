import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold">
            <span className="text-gold-gradient">AyahGuide</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/tadabbur" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Reflections
            </Link>
            <ThemeToggle />
            <Link
              href="/#subscribe"
              className="rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-medium text-black hover:bg-[#B8960C] transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">&copy; {new Date().getFullYear()} AyahGuide</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/tadabbur" className="hover:text-zinc-900 dark:hover:text-white">Reflections</Link>
            <Link href="/#subscribe" className="hover:text-zinc-900 dark:hover:text-white">Subscribe</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
