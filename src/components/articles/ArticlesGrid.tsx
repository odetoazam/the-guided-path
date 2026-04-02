'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Clock, ArrowRight } from 'lucide-react'

/* ── Category config ────────────────────────────────────────────── */

const CATEGORY_CONFIG: Record<string, {
  label: string
  tint: string
  hoverBorder: string
  badge: string
}> = {
  quranic_characters: {
    label: 'Prophets & Characters',
    tint: 'rgba(245,158,11,0.05)',
    hoverBorder: 'rgba(245,158,11,0.22)',
    badge: 'bg-amber-500/10 text-amber-400/80 border-amber-500/20',
  },
  the_unseen: {
    label: 'The Unseen',
    tint: 'rgba(139,92,246,0.05)',
    hoverBorder: 'rgba(139,92,246,0.22)',
    badge: 'bg-violet-500/10 text-violet-400/80 border-violet-500/20',
  },
  theology_and_ethics: {
    label: 'Theology & Ethics',
    tint: 'rgba(99,102,241,0.05)',
    hoverBorder: 'rgba(99,102,241,0.22)',
    badge: 'bg-indigo-500/10 text-indigo-400/80 border-indigo-500/20',
  },
  states_of_the_heart: {
    label: 'States of Heart',
    tint: 'rgba(244,63,94,0.05)',
    hoverBorder: 'rgba(244,63,94,0.22)',
    badge: 'bg-rose-500/10 text-rose-400/80 border-rose-500/20',
  },
  concepts_of_existence: {
    label: 'Concepts',
    tint: 'rgba(16,185,129,0.05)',
    hoverBorder: 'rgba(16,185,129,0.22)',
    badge: 'bg-emerald-500/10 text-emerald-400/80 border-emerald-500/20',
  },
  nations_and_peoples: {
    label: 'Nations & Peoples',
    tint: 'rgba(20,184,166,0.05)',
    hoverBorder: 'rgba(20,184,166,0.22)',
    badge: 'bg-teal-500/10 text-teal-400/80 border-teal-500/20',
  },
}

// Quranic mysterious letters — used as decorative fallback when no entity name exists
const MUQATTAAT = ['الٓمٓ', 'الٓرٰ', 'حٰمٓ', 'طٰسٓ', 'يٰسٓ', 'صٓ', 'قٓ', 'نٓ', 'طٰهٰ', 'كٓهٓيٓعٓصٓ']

const FALLBACK_CONFIG = {
  label: 'Article',
  tint: 'rgba(212,175,55,0.04)',
  hoverBorder: 'rgba(212,175,55,0.22)',
  badge: 'bg-[rgba(212,175,55,0.08)] text-[rgba(212,175,55,0.7)] border-[rgba(212,175,55,0.15)]',
}

/* ── Types ──────────────────────────────────────────────────────── */

interface EntityInfo {
  slug: string
  name_translit: string
  name_arabic: string | null
  category: string
}

export interface ArticleItem {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string | null
  reading_time_minutes: number | null
  featured: boolean
  entity_tags: {
    is_primary: boolean
    entities: EntityInfo | null
  }[]
}

function getPrimaryEntity(article: ArticleItem): EntityInfo | null {
  return article.entity_tags?.find(t => t.is_primary && t.entities)?.entities ?? null
}

function getCfg(category: string | undefined) {
  return (category && CATEGORY_CONFIG[category]) ? CATEGORY_CONFIG[category] : FALLBACK_CONFIG
}

/* ── Featured hero card ─────────────────────────────────────────── */

function FeaturedCard({ article }: { article: ArticleItem }) {
  const entity = getPrimaryEntity(article)
  const cfg = getCfg(entity?.category)

  return (
    <Link
      href={`/posts/${article.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-zinc-200 bg-white p-7 sm:p-10 transition-all duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]"
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cfg.hoverBorder }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: cfg.tint }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(212,175,55,0.07) 0%, transparent 70%)' }}
      />
      {/* Decorative large Arabic — background */}
      {entity?.name_arabic && (
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none leading-none transition-all duration-500"
          style={{
            fontFamily: "var(--font-amiri,'Amiri'),serif",
            fontSize: 'clamp(5rem,12vw,9rem)',
            direction: 'rtl',
            color: 'rgba(212,175,55,0.07)',
          }}
        >
          {entity.name_arabic}
        </div>
      )}

      <div className="relative flex flex-wrap items-center gap-3 mb-5">
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[rgba(212,175,55,0.5)]">
          Featured
        </span>
        {entity && (
          <>
            <span className="text-zinc-300 dark:text-white/10">·</span>
            <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-medium tracking-wider uppercase ${cfg.badge}`}>
              {getCfg(entity.category).label}
            </span>
          </>
        )}
      </div>

      <h2 className="relative font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-dark dark:text-cream leading-tight group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors max-w-2xl">
        {article.title}
      </h2>

      {article.excerpt && (
        <p className="relative mt-4 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
          {article.excerpt}
        </p>
      )}

      <div className="relative mt-6 flex items-center gap-4">
        <span className="flex items-center gap-2 text-sm font-medium text-[rgba(212,175,55,0.75)] dark:text-[rgba(212,175,55,0.6)]">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
        {article.reading_time_minutes && (
          <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-cream/25">
            <Clock className="h-3.5 w-3.5" />
            {article.reading_time_minutes} min
          </span>
        )}
      </div>
    </Link>
  )
}

/* ── Regular article card ───────────────────────────────────────── */

function ArticleCard({ article }: { article: ArticleItem }) {
  const entity = getPrimaryEntity(article)
  const cfg = getCfg(entity?.category)

  return (
    <Link
      href={`/posts/${article.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]"
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = cfg.hoverBorder }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: cfg.tint }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 20%, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
      />

      {/* Arabic entity name — visual anchor, or decorative fallback */}
      <div
        className="relative mb-2 leading-none text-[rgba(212,175,55,0.6)] transition-colors duration-300 group-hover:text-[rgba(212,175,55,0.85)]"
        style={{
          fontFamily: "var(--font-amiri,'Amiri'),serif",
          fontSize: '2.2rem',
          direction: 'rtl',
          textShadow: '0 0 40px rgba(212,175,55,0.1)',
        }}
      >
        {entity?.name_arabic ?? MUQATTAAT[article.slug.charCodeAt(0) % MUQATTAAT.length]}
      </div>

      {/* Category badge */}
      <div className="relative mb-3">
        <span className={`inline-block rounded-full border px-2 py-0.5 text-[9px] font-medium tracking-wider uppercase ${cfg.badge}`}>
          {entity ? getCfg(entity.category).label : 'Article'}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative font-serif text-[15px] font-bold leading-snug text-navy-dark/90 transition-colors group-hover:text-navy-dark dark:text-cream/80 dark:group-hover:text-cream mb-2 flex-1">
        {article.title}
      </h3>

      {/* Excerpt */}
      {article.excerpt && (
        <p className="relative text-sm leading-relaxed text-zinc-500 dark:text-zinc-500 line-clamp-2 mb-4">
          {article.excerpt}
        </p>
      )}

      {/* Footer */}
      <div className="relative mt-auto flex items-center justify-between">
        {article.reading_time_minutes ? (
          <span className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-cream/25">
            <Clock className="h-3 w-3" />
            {article.reading_time_minutes} min
          </span>
        ) : <span />}
        <span className="text-[10px] text-[rgba(212,175,55,0.45)] transition-colors group-hover:text-[rgba(212,175,55,0.8)]">
          Read →
        </span>
      </div>
    </Link>
  )
}

/* ── Main grid component ────────────────────────────────────────── */

const FILTER_CATS = Object.entries(CATEGORY_CONFIG).map(([key, v]) => ({ key, label: v.label }))

export function ArticlesGrid({ articles }: { articles: ArticleItem[] }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const isSearching = search.trim().length > 0
  const isFiltering = activeCategory !== 'All'

  const featuredArticles = useMemo(
    () => articles.filter(a => a.featured),
    [articles]
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return articles.filter(a => {
      // In default view, featured articles appear in the hero — exclude from grid
      if (!isSearching && !isFiltering && a.featured) return false

      if (isFiltering) {
        const entity = getPrimaryEntity(a)
        if (!entity || entity.category !== activeCategory) return false
      }

      if (q) {
        return (
          a.title.toLowerCase().includes(q) ||
          (a.excerpt ?? '').toLowerCase().includes(q) ||
          (getPrimaryEntity(a)?.name_translit ?? '').toLowerCase().includes(q)
        )
      }

      return true
    })
  }, [articles, search, activeCategory, isSearching, isFiltering])

  return (
    <>
      {/* ── Sticky controls ───────────────────────────────────────── */}
      <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur-md dark:border-white/[0.04] dark:bg-navy-dark/95">
        <div className="mx-auto max-w-5xl space-y-3">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600"
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-2.5 pl-9 pr-4 text-sm text-zinc-700 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:placeholder:text-zinc-600 dark:focus:border-zinc-700"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(['All', ...FILTER_CATS.map(c => c.key)] as string[]).map(cat => {
              const label = cat === 'All' ? 'All' : (CATEGORY_CONFIG[cat]?.label ?? cat)
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? 'border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.12)] text-[#C9A84C]'
                      : 'border-zinc-300 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">
        {/* ── Featured hero ─────────────────────────────────────── */}
        {featuredArticles.length > 0 && !isSearching && !isFiltering && (
          <div className="space-y-4">
            {featuredArticles.map(a => <FeaturedCard key={a.id} article={a} />)}
          </div>
        )}

        {/* ── Grid ──────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center font-serif text-sm text-zinc-500 dark:text-zinc-600">
            No articles match
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        )}

        <p className="text-center text-xs text-zinc-400 dark:text-zinc-700">
          {filtered.length} of {articles.length} articles
          {isFiltering ? ` · ${CATEGORY_CONFIG[activeCategory]?.label ?? activeCategory}` : ''}
          {isSearching ? ` · "${search.trim()}"` : ''}
        </p>
      </div>
    </>
  )
}
