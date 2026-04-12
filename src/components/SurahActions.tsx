'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { trackContentReturn } from '@/lib/analytics'

interface Props {
  slug: string
}

export function SurahActions({ slug }: Props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isRead, setIsRead] = useState(false)
  const [favLoading, setFavLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return
      setLoggedIn(true)

      const [favRes, progRes] = await Promise.all([
        supabase.from('user_favorites').select('id').eq('user_id', session.user.id).eq('slug', slug).eq('content_type', 'surah').maybeSingle(),
        supabase.from('user_progress').select('id').eq('user_id', session.user.id).eq('slug', slug).eq('content_type', 'surah').maybeSingle(),
      ])
      setIsFavorited(!!favRes.data)
      const alreadyRead = !!progRes.data
      setIsRead(alreadyRead)
      if (alreadyRead) trackContentReturn(slug, 'surah')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(!!session)
    })
    return () => subscription.unsubscribe()
  }, [slug])

  useEffect(() => {
    if (!sentinelRef.current) return
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && loggedIn && !isRead) {
          const { data: { session } } = await supabase.auth.getSession()
          if (!session) return
          const res = await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, type: 'surah' }),
          })
          if (res.ok) setIsRead(true)
        }
      },
      { threshold: 1.0 }
    )
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [loggedIn, isRead, slug])

  async function toggleFavorite() {
    if (!loggedIn) return
    setFavLoading(true)
    const method = isFavorited ? 'DELETE' : 'POST'
    const res = await fetch('/api/favorites', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, type: 'surah' }),
    })
    if (res.ok) setIsFavorited(!isFavorited)
    setFavLoading(false)
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {loggedIn ? (
          <>
            <button
              onClick={toggleFavorite}
              disabled={favLoading}
              title={isFavorited ? 'Remove from saved' : 'Save this surah'}
              className={[
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                isFavorited
                  ? 'border-gold-500/40 bg-gold-500/10 text-gold-500'
                  : 'border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-500 dark:text-cream/50 hover:border-gold-500/30 hover:text-gold-500',
                favLoading ? 'opacity-60' : '',
              ].join(' ')}
            >
              <span className="text-sm leading-none">{isFavorited ? '♥' : '♡'}</span>
              {isFavorited ? 'Saved' : 'Save'}
            </button>

            {isRead && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700/50 bg-transparent px-3 py-1.5 text-xs text-zinc-400 dark:text-cream/30">
                <span className="text-emerald-500">✓</span> Explored
              </span>
            )}
          </>
        ) : (
          <Link
            href={`/auth/sign-in?next=/surahs/${slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 dark:text-cream/40 hover:text-gold-500 hover:border-gold-500/30 transition-colors"
          >
            <span className="text-sm leading-none">♡</span>
            Sign in to save
          </Link>
        )}
      </div>

      {/* Sentinel — triggers mark-as-explored when bottom of page is reached */}
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />
    </>
  )
}
