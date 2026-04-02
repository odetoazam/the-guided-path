'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'granted')
    setVisible(false)
    window.dispatchEvent(new Event('cookie_consent_granted'))
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-4 shadow-lg sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          We use optional analytics cookies to understand how visitors use this site.{' '}
          <Link href="/privacy#cookies" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
            Learn more
          </Link>
          . Strictly necessary cookies (authentication) are always active.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={decline}
            className="rounded-md border border-zinc-300 dark:border-zinc-600 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-md bg-[rgba(212,175,55,0.85)] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  )
}
