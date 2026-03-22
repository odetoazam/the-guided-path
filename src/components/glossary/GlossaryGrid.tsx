'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { GLOSSARY_TERMS, type GlossaryCategory, type GlossaryMeta } from '@/data/glossary'

const CATEGORIES: GlossaryCategory[] = [
  'States of the Heart',
  'The Unseen',
  'Quranic Characters',
  'Nations & Peoples',
  'Study Terms',
]

export function CategoryBadge({ category }: { category: GlossaryCategory }) {
  const styles: Record<GlossaryCategory, string> = {
    'States of the Heart': 'bg-rose-500/10 text-rose-300/70 border-rose-500/15',
    'The Unseen':          'bg-violet-500/10 text-violet-300/70 border-violet-500/15',
    'Quranic Characters':  'bg-amber-500/10 text-amber-300/70 border-amber-500/15',
    'Nations & Peoples':   'bg-teal-500/10 text-teal-300/70 border-teal-500/15',
    'Study Terms':         'bg-sky-500/10 text-sky-300/70 border-sky-500/15',
  }
  return (
    <span className={`inline-block rounded-full border px-2 py-0.5 text-[9px] font-medium tracking-wider uppercase ${styles[category]}`}>
      {category}
    </span>
  )
}

function GlossaryCard({ entry }: { entry: GlossaryMeta }) {
  const inner = (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-[rgba(212,175,55,0.22)] hover:bg-[rgba(212,175,55,0.03)]">
      {/* Hover bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 20%, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Arabic — the visual anchor */}
      <div
        className="mb-3 leading-none text-[rgba(212,175,55,0.72)] transition-colors duration-300 group-hover:text-[rgba(212,175,55,0.90)]"
        style={{
          fontFamily: "var(--font-amiri,'Amiri'),'Amiri','Scheherazade New',serif",
          fontSize: '2.6rem',
          direction: 'rtl',
          textShadow: '0 0 40px rgba(212,175,55,0.16)',
        }}
      >
        {entry.term}
      </div>

      {/* Transliteration */}
      <div className="mb-1 font-serif text-base font-semibold text-cream/75 transition-colors group-hover:text-cream/95">
        {entry.transliteration}
      </div>

      {/* Evocative line */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400">
        {entry.evocativeLine}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <CategoryBadge category={entry.category} />
        {entry.hasFullEntry ? (
          <span className="text-[10px] text-[rgba(212,175,55,0.45)] transition-colors group-hover:text-[rgba(212,175,55,0.75)]">
            Read →
          </span>
        ) : (
          <span className="text-[10px] italic text-zinc-700">Coming soon</span>
        )}
      </div>
    </div>
  )

  if (entry.hasFullEntry) {
    return (
      <Link href={`/glossary/${entry.slug}`} className="block h-full">
        {inner}
      </Link>
    )
  }

  return <div className="h-full cursor-default opacity-60">{inner}</div>
}

export function GlossaryGrid() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'All'>('All')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return GLOSSARY_TERMS.filter((t) => {
      if (activeCategory !== 'All' && t.category !== activeCategory) return false
      if (!q) return true
      return (
        t.transliteration.toLowerCase().includes(q) ||
        t.term.includes(q) ||
        t.evocativeLine.toLowerCase().includes(q)
      )
    })
  }, [search, activeCategory])

  return (
    <>
      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 border-b border-white/[0.04] bg-navy-dark/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto max-w-4xl space-y-3">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or transliteration…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 pl-9 pr-4 text-sm text-zinc-300 outline-none placeholder:text-zinc-600 focus:border-zinc-700"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(['All', ...CATEGORIES] as (GlossaryCategory | 'All')[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.12)] text-[#C9A84C]'
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 py-10">
        {filtered.length === 0 ? (
          <div className="py-24 text-center font-serif text-sm text-zinc-500">
            No terms match
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry) => (
              <GlossaryCard key={entry.slug} entry={entry} />
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-zinc-700">
          {filtered.length} of {GLOSSARY_TERMS.length} terms
          {activeCategory !== 'All' ? ` · ${activeCategory}` : ''}
          {search ? ` · "${search}"` : ''}
        </p>
      </div>
    </>
  )
}
