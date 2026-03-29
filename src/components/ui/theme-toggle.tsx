'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { trackThemeToggle } from '@/lib/analytics'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return <div className="h-9 w-9" />
  }

  return (
    <button
      onClick={() => { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); trackThemeToggle(next) }}
      className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-navy-medium/60 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-zinc-400 hover:text-[#C9A84C]" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-600 hover:text-[#C9A84C]" />
      )}
    </button>
  )
}
