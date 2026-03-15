'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const links = [
  { href: '/surah', label: 'Surahs' },
  { href: '/understanding-quran', label: 'Understanding Quran' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1.5">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'group relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-[#D4AF37] bg-[rgba(212,175,55,0.10)]'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60',
                ].join(' ')}
              >
                {label}
                <span
                  className={[
                    'absolute bottom-1.5 left-3.5 right-3.5 h-[1.5px] rounded-full bg-[#D4AF37]/60 transition-transform duration-300 ease-out origin-left',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  ].join(' ')}
                />
              </Link>
            )
          })}
          <ThemeToggle />
          <Link
            href="/#subscribe"
            className="ml-2 rounded-full bg-[#D4AF37] px-4 py-1.5 text-sm font-medium text-black hover:bg-[#B8960C] transition-colors"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            className="rounded-full p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
          >
            {open ? (
              /* X icon */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={[
                  'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-[#D4AF37] bg-[rgba(212,175,55,0.10)]'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60',
                ].join(' ')}
              >
                {label}
              </Link>
            )
          })}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-1">
            <Link
              href="/#subscribe"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-[#D4AF37] px-4 py-2.5 text-sm font-medium text-black text-center hover:bg-[#B8960C] transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
