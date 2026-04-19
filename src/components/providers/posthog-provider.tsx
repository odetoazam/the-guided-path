'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef, Suspense } from 'react'
import { trackGuidanceEntryPoint, trackSessionDepth } from '@/lib/analytics'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

let posthogInitialized = false

function initPostHog() {
  if (!POSTHOG_KEY || posthogInitialized) return
  posthog.init(POSTHOG_KEY, {
    api_host: '/ingest',
    ui_host: POSTHOG_HOST,
    defaults: '2026-01-30',
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') ph.debug()
    },
  })
  posthogInitialized = true
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const ph = usePostHog()
  const pageCountRef = useRef(0)
  const isFirstPageRef = useRef(true)

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname
      const search = searchParams.toString()
      if (search) url += '?' + search
      ph.capture('$pageview', { $current_url: url })

      pageCountRef.current += 1

      // First page of session — record entry point
      if (isFirstPageRef.current) {
        isFirstPageRef.current = false
        trackGuidanceEntryPoint(pathname, document.referrer)
      }

      // 3+ pages in session — active seeker signal
      if (pageCountRef.current === 3) {
        trackSessionDepth(3, pathname)
      }
    }
  }, [pathname, searchParams, ph])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initPostHog()
    setReady(true)
  }, [])

  if (!POSTHOG_KEY || !ready) return <>{children}</>

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}
