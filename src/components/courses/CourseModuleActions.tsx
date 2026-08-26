'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Props {
  progressSlug: string // '<course>/<module-slug>'
  nextHref: string | null
  nextTitle: string | null
  courseHref: string
}

/**
 * End-of-module sentinel: when a logged-in reader reaches the bottom, the module
 * is marked complete (content_type 'course'). Mirrors PostActions' pattern.
 */
export function CourseModuleActions({ progressSlug, nextHref, nextTitle, courseHref }: Props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return
      setLoggedIn(true)
      const { data } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('slug', progressSlug)
        .eq('content_type', 'course')
        .maybeSingle()
      setIsDone(!!data)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(!!session)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressSlug])

  useEffect(() => {
    if (!sentinelRef.current) return
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && loggedIn && !isDone) {
          const res = await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: progressSlug, type: 'course' }),
          })
          if (res.ok) setIsDone(true)
        }
      },
      { threshold: 1.0 }
    )
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [loggedIn, isDone, progressSlug])

  return (
    <div>
      <div ref={sentinelRef} className="h-px" aria-hidden />
      {isDone && (
        <p className="mt-6 text-center text-xs text-[rgba(184,149,63,0.9)] dark:text-[rgba(212,175,55,0.6)]">
          ✓ Module complete
        </p>
      )}
      {nextHref ? (
        <div className="mt-8 text-center">
          <Link
            href={nextHref}
            className="inline-block rounded-full border border-[rgba(201,168,76,0.4)] px-6 py-2.5 text-sm font-medium text-[#b8953f] transition-colors hover:bg-[rgba(201,168,76,0.08)] dark:text-[rgba(212,175,55,0.85)]"
          >
            Continue: {nextTitle} →
          </Link>
        </div>
      ) : (
        <div className="mt-8 text-center">
          <Link
            href={courseHref}
            className="inline-block rounded-full border border-[rgba(201,168,76,0.4)] px-6 py-2.5 text-sm font-medium text-[#b8953f] transition-colors hover:bg-[rgba(201,168,76,0.08)] dark:text-[rgba(212,175,55,0.85)]"
          >
            You finished the course — back to the overview →
          </Link>
        </div>
      )}
    </div>
  )
}
