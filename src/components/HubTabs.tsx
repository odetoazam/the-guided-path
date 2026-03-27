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

/* ── Types ─────────────────────────────────────────────────────────────────── */

type TabKey = 'articles' | 'ayahs' | 'connections'

interface HubTabsProps {
  posts: any[]
  ayahRecords: any[]
  connections: any[]
  entitySlug: string
  entityName?: string
  entityArabic?: string
}

/* ── Component ─────────────────────────────────────────────────────────────── */

export function HubTabs({
  posts,
  ayahRecords,
  connections,
  entitySlug,
  entityName,
  entityArabic,
}: HubTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('articles')

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'articles', label: 'Articles', count: posts.length },
    { key: 'ayahs', label: 'Ayah Records', count: ayahRecords.length },
    { key: 'connections', label: 'Connections', count: connections.length },
  ]

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
              <span
                className={`inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                  activeTab === tab.key
                    ? 'bg-[#C9A84C]/15 text-[#C9A84C]'
                    : 'bg-zinc-200/60 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-500'
                }`}
              >
                {tab.count}
              </span>
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
                  {connections.map((e: any, i: number) => {
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
                    connections.reduce<Record<string, any[]>>((acc, e: any) => {
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
                        {entities.map((e: any) => {
                          const style =
                            CATEGORY_STYLES[e.category as EntityCategory] || ''
                          return (
                            <Link
                              key={e.id}
                              href={`/hub/${e.slug}`}
                              className={`group flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition hover:scale-[1.02] hover:shadow-sm ${style}`}
                            >
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
