'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/surah', label: 'Surahs' },
  { href: '/understanding-quran', label: 'Understanding Quran' },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <>
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
            {/* animated gold underline on hover */}
            <span
              className={[
                'absolute bottom-1.5 left-3.5 right-3.5 h-[1.5px] rounded-full bg-[#D4AF37]/60 transition-transform duration-300 ease-out origin-left',
                isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
              ].join(' ')}
            />
          </Link>
        )
      })}
    </>
  )
}
