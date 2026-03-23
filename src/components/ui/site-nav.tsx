'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const topLinks = [
  { href: '/surahs', label: 'Surahs' },
]

const learnLinks = [
  { href: '/understanding-quran', label: 'Understanding Quran', desc: 'How to read with depth' },
  { href: '/ulum-al-quran', label: 'Sciences of the Quran', desc: '18 disciplines, mapped' },
  { href: '/glossary', label: 'Glossary', desc: 'Key Arabic & Quranic terms' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [learnOpen, setLearnOpen] = useState(false)

  const isLearnActive = learnLinks.some(
    (l) => pathname === l.href || pathname.startsWith(l.href + '/')
  )

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-navy-medium bg-white/80 dark:bg-navy-dark/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1.5">
          {topLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'group relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-gold-500 bg-[rgba(201,168,76,0.10)]'
                    : 'text-zinc-500 dark:text-cream/60 hover:text-navy dark:hover:text-cream hover:bg-zinc-100 dark:hover:bg-navy-medium/60',
                ].join(' ')}
              >
                {label}
                <span
                  className={[
                    'absolute bottom-1.5 left-3.5 right-3.5 h-[1.5px] rounded-full bg-gold-500/60 transition-transform duration-300 ease-out origin-left',
                    isActive ? 'scale-x-100 bg-gold-500/60' : 'scale-x-0 group-hover:scale-x-100',
                  ].join(' ')}
                />
              </Link>
            )
          })}

          {/* Desktop Learn dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLearnOpen(true)}
            onMouseLeave={() => setLearnOpen(false)}
          >
            <button
              onClick={() => setLearnOpen((o) => !o)}
              className={[
                'group relative flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                isLearnActive
                  ? 'text-gold-500 bg-[rgba(201,168,76,0.10)]'
                  : 'text-zinc-500 dark:text-cream/60 hover:text-navy dark:hover:text-cream hover:bg-zinc-100 dark:hover:bg-navy-medium/60',
              ].join(' ')}
            >
              Learn
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={`transition-transform duration-200 ${learnOpen ? 'rotate-180' : ''}`}
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
              <span
                className={[
                  'absolute bottom-1.5 left-3.5 right-3.5 h-[1.5px] rounded-full bg-gold-500/60 transition-transform duration-300 ease-out origin-left',
                  isLearnActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                ].join(' ')}
              />
            </button>

            {/* Dropdown panel */}
            {learnOpen && (
              <div className="absolute left-0 top-full pt-1.5 z-50">
                <div className="w-64 rounded-xl border border-zinc-200 dark:border-navy-medium bg-white dark:bg-navy-dark shadow-lg overflow-hidden">
                  {learnLinks.map(({ href, label, desc }) => {
                    const isActive = pathname === href || pathname.startsWith(href + '/')
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setLearnOpen(false)}
                        className={[
                          'block px-4 py-3 transition-colors',
                          isActive
                            ? 'bg-[rgba(201,168,76,0.08)]'
                            : 'hover:bg-zinc-50 dark:hover:bg-navy-medium/40',
                        ].join(' ')}
                      >
                        <p className={`text-sm font-medium ${isActive ? 'text-gold-500' : 'text-zinc-900 dark:text-cream/90'}`}>
                          {label}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-cream/40 mt-0.5">{desc}</p>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />
          <Link
            href="/#subscribe"
            className="ml-2 rounded-full bg-gold-500 px-4 py-1.5 text-sm font-medium text-navy-dark hover:bg-gold-600 transition-colors"
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
            className="rounded-full p-2 text-zinc-500 dark:text-cream/60 hover:bg-zinc-100 dark:hover:bg-navy-medium/60 transition-colors"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
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
        <div className="md:hidden border-t border-zinc-200 dark:border-navy-medium bg-white/95 dark:bg-navy-dark/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-1">
          {topLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={[
                  'rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-gold-500 bg-[rgba(201,168,76,0.10)]'
                    : 'text-zinc-600 dark:text-cream/60 hover:text-navy dark:hover:text-cream hover:bg-zinc-100 dark:hover:bg-navy-medium/60',
                ].join(' ')}
              >
                {label}
              </Link>
            )
          })}

          {/* Mobile Learn section — flat, no nested dropdown */}
          <div className="mt-1">
            <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400 dark:text-cream/30">
              Learn
            </p>
            {learnLinks.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={[
                    'rounded-xl px-4 py-3 text-sm font-medium transition-colors block',
                    isActive
                      ? 'text-gold-500 bg-[rgba(201,168,76,0.10)]'
                      : 'text-zinc-600 dark:text-cream/60 hover:text-navy dark:hover:text-cream hover:bg-zinc-100 dark:hover:bg-navy-medium/60',
                  ].join(' ')}
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-navy-medium mt-1">
            <Link
              href="/#subscribe"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-gold-500 px-4 py-2.5 text-sm font-medium text-navy-dark text-center hover:bg-gold-600 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
