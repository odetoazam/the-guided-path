'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AyahCard } from '@/components/AyahCard'
import type { EntityCategory } from '@/types'

/* ── Category display helpers ──────────────────────────────────────────────── */

const CATEGORY_LABELS: Record<EntityCategory, string> = {
  states_of_the_heart: 'States of the Heart',
  the_unseen: 'The Unseen',
  quranic_characters: 'Quranic Characters',
  nations_and_peoples: 'Nations & Peoples',
  study_terms: 'Study Terms',
  concepts_of_existence: 'Concepts of Existence',
  theology_and_ethics: 'Theology & Ethics',
}

const CATEGORY_STYLES: Record<EntityCategory, string> = {
  states_of_the_heart: 'bg-rose-500/10 text-rose-300/70 border-rose-500/15',
  the_unseen: 'bg-violet-500/10 text-violet-300/70 border-violet-500/15',
  quranic_characters: 'bg-amber-500/10 text-amber-300/70 border-amber-500/15',
  nations_and_peoples: 'bg-teal-500/10 text-teal-300/70 border-teal-500/15',
  concepts_of_existence: 'bg-sky-500/10 text-sky-300/70 border-sky-500/15',
  theology_and_ethics: 'bg-indigo-500/10 text-indigo-300/70 border-indigo-500/15',
  study_terms: 'bg-zinc-500/10 text-zinc-300/70 border-zinc-500/15',
}

/* ── Ring layout helpers for connection graph ──────────────────────────────── */

const RING_RADIUS = 160
const INNER_RING_RADIUS = 110

function getNodePositions(count: number) {
  // Place nodes in concentric rings: first 6 on outer ring, rest on inner
  const positions: { x: number; y: number }[] = []
  const outerCount = Math.min(count, 6)
  const innerCount = count - outerCount

  for (let i = 0; i < outerCount; i++) {
    const angle = (2 * Math.PI * i) / outerCount - Math.PI / 2
    positions.push({
      x: Math.cos(angle) * RING_RADIUS,
      y: Math.sin(angle) * RING_RADIUS,
    })
  }

  for (let i = 0; i < innerCount; i++) {
    const angle = (2 * Math.PI * i) / innerCount - Math.PI / 2 + Math.PI / innerCount
    positions.push({
      x: Math.cos(angle) * INNER_RING_RADIUS,
      y: Math.sin(angle) * INNER_RING_RADIUS,
    })
  }

  return positions
}

/* ── Glossary field display labels ─────────────────────────────────────────── */

const GLOSSARY_FIELD_LABELS: Record<string, string> = {
  summary: 'Summary',
  rootForms: 'Root Forms',
  keyAyahs: 'Key Ayahs',
  scholarsSaid: 'What the Scholars Said',
  hadith: 'Hadith',
  acrossTransitions: 'Across Transitions',
  semanticField: 'Semantic Field',
  practicalSection: 'Practical Application',
  relatedTerms: 'Related Terms',
  goDeeper: 'Go Deeper',
}

/* ── Glossary list renderer for structured arrays ─────────────────────────── */

function GlossaryList({ items, fieldKey }: { items: any[]; fieldKey: string }) {
  // keyAyahs: [{ref, note, arabic, translation}]
  if (fieldKey === 'keyAyahs') {
    return (
      <div className="space-y-5">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="border-l-2 border-[#C9A84C]/30 pl-4">
            {item.arabic && (
              <p
                className="mb-1.5 text-lg leading-[2] text-[rgba(201,168,76,0.85)]"
                style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", direction: 'rtl', textAlign: 'right' }}
              >
                {item.arabic}
              </p>
            )}
            {item.translation && (
              <p className="mb-1.5 text-sm italic text-zinc-500 dark:text-zinc-400">
                {item.translation}
              </p>
            )}
            {item.ref && (
              <span className="text-[10px] font-medium uppercase tracking-wide text-[#C9A84C]/60">
                {item.ref}
              </span>
            )}
            {item.note && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.note}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  }

  // hadith: [{ref, note, arabic, translation}]
  if (fieldKey === 'hadith') {
    return (
      <div className="space-y-5">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="border-l-2 border-[#C9A84C]/30 pl-4">
            {item.arabic && (
              <p
                className="mb-1.5 text-base leading-[2] text-[rgba(201,168,76,0.85)]"
                style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", direction: 'rtl', textAlign: 'right' }}
              >
                {item.arabic}
              </p>
            )}
            {item.translation && (
              <p className="mb-1.5 text-sm italic text-zinc-500 dark:text-zinc-400">
                {item.translation}
              </p>
            )}
            {item.ref && (
              <span className="text-[10px] font-medium uppercase tracking-wide text-[#C9A84C]/60">
                {item.ref}
              </span>
            )}
            {item.note && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.note}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  }

  // goDeeper: [{note, slug, surahName}]
  if (fieldKey === 'goDeeper') {
    return (
      <div className="space-y-4">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]/40" />
            <div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.note}
              </p>
              {item.surahName && item.slug && (
                <Link
                  href={`/surahs/${item.slug}`}
                  className="mt-1 inline-block text-xs font-medium text-[#C9A84C] hover:text-[#C9A84C]/80"
                >
                  {item.surahName} &rarr;
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // scholarsSaid: [{scholar, quote}] or strings
  if (fieldKey === 'scholarsSaid') {
    return (
      <div className="space-y-4">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="border-l-2 border-zinc-200 pl-4 dark:border-white/[0.06]">
            {typeof item === 'string' ? (
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item}</p>
            ) : (
              <>
                <p className="text-sm italic leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.quote || item.note || item.text}
                </p>
                {item.scholar && (
                  <span className="mt-1 block text-[10px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-600">
                    — {item.scholar}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    )
  }

  // relatedTerms: [{slug, transliteration, term}]
  if (fieldKey === 'relatedTerms') {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item: any, idx: number) => (
          <Link
            key={idx}
            href={item.slug ? `/hub/${item.slug}` : '#'}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/50 px-3.5 py-2.5 transition hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/[0.03] dark:border-white/[0.05] dark:bg-white/[0.015] dark:hover:border-[#C9A84C]/20"
          >
            {item.term && (
              <span
                className="text-base text-[rgba(201,168,76,0.7)]"
                style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", direction: 'rtl' }}
              >
                {item.term}
              </span>
            )}
            <span className="text-sm font-medium text-[#0D1B2A] dark:text-[#F5F0E8]/80">
              {item.transliteration || item.name || item.text || String(item)}
            </span>
          </Link>
        ))}
      </div>
    )
  }

  // semanticField: [{term, transliteration, connection}]
  if (fieldKey === 'semanticField') {
    return (
      <div className="space-y-3">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]/40" />
            <div>
              <span className="font-medium text-sm text-[#0D1B2A] dark:text-[#F5F0E8]/80">
                {item.transliteration || item.term}
              </span>
              {item.connection && (
                <span className="text-sm text-zinc-500 dark:text-zinc-400"> — {item.connection}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default: simple list of strings or objects with a note/text field
  return (
    <ul className="space-y-1.5">
      {items.map((item: any, idx: number) => (
        <li
          key={idx}
          className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
        >
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C9A84C]/40" />
          <span className="leading-relaxed">
            {typeof item === 'string'
              ? item
              : (item.note || item.text || item.name || item.transliteration || JSON.stringify(item))}
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ── Types ─────────────────────────────────────────────────────────────────── */

type TabKey = 'overview' | 'articles' | 'ayahs' | 'connections'

interface ConnectionEntity {
  id: string
  slug: string
  name_arabic: string
  name_translit: string
  category: string
  one_line?: string
  coOccurrenceCount?: number
}

interface HubTabsProps {
  posts: any[]
  ayahRecords: any[]
  connections: ConnectionEntity[]
  entitySlug: string
  entityName?: string
  entityArabic?: string
  /* Overview fields */
  rootLetters?: string | null
  rootMeaning?: string | null
  rootElaboration?: string | null
  occurrenceCount?: number | null
  occurrenceNote?: string | null
  pronunciation?: string | null
  oneLine?: string | null
  glossaryData?: Record<string, any> | null
  synthesisHtml?: string | null
}

/* ── Component ─────────────────────────────────────────────────────────────── */

export function HubTabs({
  posts,
  ayahRecords,
  connections,
  entitySlug,
  entityName,
  entityArabic,
  rootLetters,
  rootMeaning,
  rootElaboration,
  occurrenceCount,
  occurrenceNote,
  pronunciation,
  oneLine,
  glossaryData,
  synthesisHtml,
}: HubTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'articles', label: 'Articles', count: posts.length },
    { key: 'ayahs', label: 'Ayah Records', count: ayahRecords.length },
    { key: 'connections', label: 'Connections', count: connections.length },
  ]

  // Filter glossary data to only non-empty string/array fields, skip hadith for now
  const HIDDEN_GLOSSARY_FIELDS = new Set(['hadith'])
  const glossaryEntries = glossaryData
    ? Object.entries(glossaryData).filter(([key, v]) => {
        if (HIDDEN_GLOSSARY_FIELDS.has(key)) return false
        if (typeof v === 'string') return v.trim().length > 0
        if (Array.isArray(v)) return v.length > 0
        return false
      })
    : []

  return (
    <div className="mx-auto max-w-3xl px-5 pb-16">
      {/* ── Sticky tab bar ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 -mx-5 border-b border-zinc-200 bg-white/80 px-5 backdrop-blur-md dark:border-white/[0.05] dark:bg-[#0D1B2A]/80">
        <nav className="flex gap-1" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-[#C9A84C]'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                    activeTab === tab.key
                      ? 'bg-[#C9A84C]/15 text-[#C9A84C]'
                      : 'bg-zinc-200/60 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {/* Gold underline indicator */}
              {activeTab === tab.key && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#C9A84C]" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Tab panels ─────────────────────────────────────────────────── */}
      <div className="pt-8">
        {/* Overview panel */}
        {activeTab === 'overview' && (
          <div role="tabpanel" className="space-y-8">
            {/* Synthesized overview */}
            {synthesisHtml ? (
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: synthesisHtml }}
              />
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-8 dark:border-white/[0.05] dark:bg-white/[0.015]">
                <p className="text-sm leading-relaxed text-zinc-400 dark:text-zinc-500">
                  A synthesized overview will appear here as content grows.
                </p>
              </div>
            )}

            {/* Knowledge card */}
            {(rootLetters || rootElaboration || occurrenceNote || glossaryEntries.length > 0) && (
              <div className="space-y-6">
                {/* Root elaboration */}
                {rootElaboration && (
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-7 dark:border-white/[0.05] dark:bg-white/[0.015]">
                    <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-600">
                      Root Analysis
                    </h3>
                    {rootLetters && (
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className="text-2xl text-[rgba(201,168,76,0.8)]"
                          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
                        >
                          {rootLetters}
                        </span>
                        {rootMeaning && (
                          <>
                            <span className="text-zinc-300 dark:text-white/[0.08]">/</span>
                            <span className="text-sm font-medium text-[#0D1B2A] dark:text-[#F5F0E8]/80">
                              {rootMeaning}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {rootElaboration}
                    </p>
                  </div>
                )}

                {/* Occurrence note */}
                {occurrenceNote && (
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-7 dark:border-white/[0.05] dark:bg-white/[0.015]">
                    <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-600">
                      Quranic Occurrence
                    </h3>
                    {occurrenceCount && (
                      <div className="mb-2 flex items-baseline gap-2">
                        <span className="text-2xl font-semibold text-[#0D1B2A] dark:text-[#F5F0E8]/80">
                          {occurrenceCount}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-600">times in the Quran</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {occurrenceNote}
                    </p>
                  </div>
                )}

                {/* Glossary data sections */}
                {glossaryEntries.length > 0 && (
                  <div className="space-y-5">
                    {glossaryEntries.map(([key, value]) => (
                      <div
                        key={key}
                        className="rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-7 dark:border-white/[0.05] dark:bg-white/[0.015]"
                      >
                        <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-600">
                          {GLOSSARY_FIELD_LABELS[key] || key.replace(/_/g, ' ')}
                        </h3>
                        {typeof value === 'string' ? (
                          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {value}
                          </p>
                        ) : Array.isArray(value) ? (
                          <GlossaryList items={value} fieldKey={key} />
                        ) : (
                          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {String(value)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Articles panel */}
        {activeTab === 'articles' && (
          <div role="tabpanel">
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post: any) => (
                  <Link
                    key={post.id}
                    href={
                      post.type === 'surah' && post.surah_number
                        ? `/surahs/${post.slug}`
                        : `/posts/${post.slug}`
                    }
                    className="group block rounded-xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/[0.03] dark:border-white/[0.05] dark:bg-white/[0.015] dark:hover:border-[#C9A84C]/20"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-base font-semibold text-[#0D1B2A] group-hover:text-[#C9A84C] dark:text-[#F5F0E8] dark:group-hover:text-[#C9A84C]">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mt-1.5 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      {post.surah_number && (
                        <span className="shrink-0 rounded-lg bg-[#C9A84C]/10 px-2 py-1 text-xs font-medium text-[#C9A84C]">
                          Surah {post.surah_number}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400 dark:text-zinc-600">
                No articles tagged yet.
              </p>
            )}
          </div>
        )}

        {/* Ayah Records panel */}
        {activeTab === 'ayahs' && (
          <div role="tabpanel">
            {ayahRecords.length > 0 ? (
              <div className="space-y-4">
                {ayahRecords.map((ar: any) => (
                  <AyahCard
                    key={ar.id}
                    surahNumber={ar.surah_number}
                    ayahStart={ar.ayah_start}
                    ayahEnd={ar.ayah_end}
                    arabic={ar.arabic_text}
                    translation={ar.translation}
                    title={ar.title}
                    layerA={ar.layer_a}
                    expandable
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400 dark:text-zinc-600">
                No ayah records tagged yet.
              </p>
            )}
          </div>
        )}

        {/* Connections panel — graph explorer */}
        {activeTab === 'connections' && (
          <div role="tabpanel">
            {connections.length > 0 ? (
              <div>
                {/* Visual graph area */}
                <div className="relative mx-auto mb-10 aspect-square max-w-md">
                  {/* Subtle ring guides */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="-220 -220 440 440"
                    fill="none"
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r={RING_RADIUS}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-zinc-200 dark:text-white/[0.04]"
                    />
                    {connections.length > 6 && (
                      <circle
                        cx="0"
                        cy="0"
                        r={INNER_RING_RADIUS}
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-zinc-200 dark:text-white/[0.04]"
                      />
                    )}
                    {/* Connector lines from center to each node */}
                    {getNodePositions(connections.length).map((pos, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1="0"
                        x2={pos.x}
                        y2={pos.y}
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-zinc-200 dark:text-white/[0.06]"
                      />
                    ))}
                  </svg>

                  {/* Center node — current entity */}
                  <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#C9A84C]/40 bg-[#C9A84C]/10 shadow-lg shadow-[#C9A84C]/5">
                      <span
                        className="text-2xl text-[#C9A84C]"
                        style={{
                          fontFamily: "var(--font-amiri,'Amiri'),serif",
                          direction: 'rtl',
                        }}
                      >
                        {entityArabic}
                      </span>
                    </div>
                    {entityName && (
                      <div className="mt-1 text-center text-[10px] font-medium text-[#0D1B2A] dark:text-[#F5F0E8]/70">
                        {entityName}
                      </div>
                    )}
                  </div>

                  {/* Connected entity nodes */}
                  {connections.map((e, i) => {
                    const positions = getNodePositions(connections.length)
                    const pos = positions[i]
                    if (!pos) return null
                    const category = e.category as EntityCategory
                    const style = CATEGORY_STYLES[category] || ''

                    return (
                      <Link
                        key={e.id}
                        href={`/hub/${e.slug}`}
                        className="group absolute left-1/2 top-1/2 z-10"
                        style={{
                          transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                        }}
                      >
                        <div
                          className={`flex flex-col items-center gap-1 rounded-2xl border px-3 py-2 transition hover:scale-105 hover:shadow-md ${style}`}
                        >
                          <span
                            className="text-base leading-none text-[rgba(201,168,76,0.7)]"
                            style={{
                              fontFamily: "var(--font-amiri,'Amiri'),serif",
                              direction: 'rtl',
                            }}
                          >
                            {e.name_arabic}
                          </span>
                          <span className="max-w-[5rem] truncate text-[10px] font-medium leading-tight">
                            {e.name_translit}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* Grouped list below the graph */}
                <div className="space-y-6">
                  {Object.entries(
                    connections.reduce<Record<string, ConnectionEntity[]>>((acc, e) => {
                      const cat = e.category as string
                      if (!acc[cat]) acc[cat] = []
                      acc[cat].push(e)
                      return acc
                    }, {})
                  ).map(([category, entities]) => (
                    <div key={category}>
                      <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-600">
                        {CATEGORY_LABELS[category as EntityCategory] || category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {entities.map((e) => {
                          const style =
                            CATEGORY_STYLES[e.category as EntityCategory] || ''
                          return (
                            <Link
                              key={e.id}
                              href={`/hub/${e.slug}`}
                              className={`group flex flex-col rounded-xl border px-3.5 py-2.5 transition hover:scale-[1.02] hover:shadow-sm ${style}`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-base text-[rgba(201,168,76,0.7)]"
                                  style={{
                                    fontFamily: "var(--font-amiri,'Amiri'),serif",
                                    direction: 'rtl',
                                  }}
                                >
                                  {e.name_arabic}
                                </span>
                                <span className="text-sm font-medium text-[#0D1B2A] dark:text-[#F5F0E8]/80">
                                  {e.name_translit}
                                </span>
                              </div>
                              {e.coOccurrenceCount && e.coOccurrenceCount > 0 && (
                                <span className="mt-0.5 text-[10px] text-zinc-400 dark:text-zinc-600">
                                  Co-occurs in {e.coOccurrenceCount} article{e.coOccurrenceCount === 1 ? '' : 's'}
                                </span>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-400 dark:text-zinc-600">
                No connections discovered yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
