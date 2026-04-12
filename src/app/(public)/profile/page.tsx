'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { SURAHS, surahSlug } from '@/lib/surahs'
import type { User } from '@supabase/supabase-js'

interface ProgressRow { slug: string; content_type: string; read_at: string }
interface FavoriteRow { slug: string; content_type: string; favorited_at: string }
interface PostTitle { slug: string; title: string }

function getInitials(user: User) {
  const name = user.user_metadata?.full_name as string | undefined
  if (name) {
    const parts = name.trim().split(' ')
    return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : parts[0].slice(0, 2).toUpperCase()
  }
  return (user.email ?? 'U').slice(0, 2).toUpperCase()
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [progress, setProgress] = useState<ProgressRow[]>([])
  const [favorites, setFavorites] = useState<FavoriteRow[]>([])
  const [titles, setTitles] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.replace('/auth/sign-in?next=/profile'); return }
      setUser(session.user)

      const [progRes, favRes] = await Promise.all([
        supabase.from('user_progress').select('slug, content_type, read_at').eq('user_id', session.user.id).order('read_at', { ascending: false }),
        supabase.from('user_favorites').select('slug, content_type, favorited_at').eq('user_id', session.user.id).order('favorited_at', { ascending: false }),
      ])

      const prog = progRes.data ?? []
      const favs = favRes.data ?? []
      setProgress(prog)
      setFavorites(favs)

      // Fetch real titles for post-type entries
      const postSlugs = [...new Set([
        ...prog.filter(r => r.content_type === 'post').map(r => r.slug),
        ...favs.filter(r => r.content_type === 'post').map(r => r.slug),
      ])]

      if (postSlugs.length > 0) {
        const { data: postData } = await supabase
          .from('posts')
          .select('slug, title')
          .in('slug', postSlugs)
        const map: Record<string, string> = {}
        ;(postData ?? []).forEach((p: PostTitle) => { map[p.slug] = p.title })
        setTitles(map)
      }

      setLoading(false)
    }
    load()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Build a set of explored surah slugs for the grid
  const exploredSurahSlugs = new Set(
    progress.filter(r => r.content_type === 'surah').map(r => r.slug)
  )

  function getLabel(row: ProgressRow | FavoriteRow) {
    if (row.content_type === 'surah') {
      const surah = SURAHS.find(s => surahSlug(s.nameEn) === row.slug)
      return surah ? `Surah ${surah.n}: ${surah.nameEn}` : row.slug
    }
    return titles[row.slug] ?? row.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  }

  function getHref(row: { slug: string; content_type: string }) {
    return row.content_type === 'surah' ? `/surahs/${row.slug}` : `/posts/${row.slug}`
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <p className="text-sm text-zinc-400">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  const surahsExplored = exploredSurahSlugs.size

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16">

      {/* Header */}
      <div className="mb-12 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-navy-dark overflow-hidden"
            style={user.user_metadata?.avatar_url ? {
              backgroundImage: `url(${user.user_metadata.avatar_url})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            } : undefined}
          >
            {!user.user_metadata?.avatar_url && getInitials(user)}
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
              {user.user_metadata?.full_name ?? 'My account'}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-cream/40">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm text-zinc-500 dark:text-cream/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* ── Quran Journey Map ── */}
      <section className="mb-14">
        <div className="mb-4 flex items-baseline gap-3">
          <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
            Your journey
          </h2>
          <span className="text-sm text-zinc-400 dark:text-cream/30">
            {surahsExplored} of 114 surahs
          </span>
        </div>

        {/* 114 surah cells */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(36px,1fr))] gap-1.5">
          {SURAHS.map(surah => {
            const slug = surahSlug(surah.nameEn)
            const explored = exploredSurahSlugs.has(slug)
            return (
              <Link
                key={surah.n}
                href={`/surahs/${slug}`}
                title={`${surah.n}. ${surah.nameEn}`}
                className={[
                  'flex h-9 w-full items-center justify-center rounded-lg text-[11px] font-medium transition-all',
                  explored
                    ? 'bg-gold-500/20 text-gold-500 border border-gold-500/30 hover:bg-gold-500/30'
                    : 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-cream/25 border border-zinc-200 dark:border-zinc-700/40 hover:border-gold-500/30 hover:text-gold-500',
                ].join(' ')}
              >
                {surah.n}
              </Link>
            )
          })}
        </div>

        {surahsExplored === 0 && (
          <p className="mt-4 text-sm text-zinc-400 dark:text-cream/30">
            Contemplate a surah and scroll to the end — it will appear here.
          </p>
        )}
      </section>

      {/* ── Saved ── */}
      <section className="mb-12">
        <div className="mb-5 flex items-baseline gap-2">
          <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">Saved</h2>
          {favorites.length > 0 && <span className="text-sm text-zinc-400">{favorites.length}</span>}
        </div>
        {favorites.length === 0 ? (
          <p className="text-sm text-zinc-400 dark:text-cream/40">
            Nothing saved yet. Hit ♡ on any surah or article that resonates — it will live here.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {favorites.map(f => (
              <Link
                key={`${f.content_type}:${f.slug}`}
                href={getHref(f)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 px-4 py-3.5 transition-all hover:border-gold-500/30 hover:bg-gold-500/5"
              >
                <span className="text-sm font-medium text-zinc-800 dark:text-cream/80 group-hover:text-gold-500 transition-colors leading-snug">
                  {getLabel(f)}
                </span>
                <span className="shrink-0 text-xs text-zinc-400 dark:text-cream/30">
                  {'favorited_at' in f ? formatDate(f.favorited_at) : ''}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Reading history ── */}
      <section>
        <div className="mb-5 flex items-baseline gap-2">
          <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">Where you&apos;ve been</h2>
          {progress.length > 0 && <span className="text-sm text-zinc-400">{progress.length}</span>}
        </div>
        {progress.length === 0 ? (
          <p className="text-sm text-zinc-400 dark:text-cream/40">
            Your contemplation history will appear here as you go deeper.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {progress.map(p => (
              <Link
                key={`${p.content_type}:${p.slug}`}
                href={getHref(p)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 px-4 py-3.5 transition-all hover:border-gold-500/30 hover:bg-gold-500/5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {p.content_type === 'surah' && (
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-gold-500/60 bg-gold-500/10 px-1.5 py-0.5 rounded">
                      Surah
                    </span>
                  )}
                  <span className="truncate text-sm font-medium text-zinc-800 dark:text-cream/80 group-hover:text-gold-500 transition-colors">
                    {getLabel(p)}
                  </span>
                </div>
                <span className="shrink-0 text-xs text-zinc-400 dark:text-cream/30">
                  {formatDate(p.read_at)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
