'use client'

import { useState } from 'react'
import { AyahCard } from '@/components/AyahCard'
import { DiagramRenderer, AudioPlayer, OrnamentDivider } from '@/components/surah/diagrams'
import { NewsletterSignup } from '@/components/blog/newsletter-signup'
import { ShareLink } from '@/components/analytics/share-link'
import { ScrollDepthTracker } from '@/components/providers/scroll-depth-tracker'
import { trackSurahTabSwitch } from '@/lib/analytics'
import { Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'

/* ── Types ─────────────────────────────────────────────────────────────────── */

interface DiagramTab {
  id: string
  label: string
  diagramKey?: string
  renderer: string
}

interface VisualData {
  diagrams: Record<string, any>
  tabs: DiagramTab[]
  full_text?: any[]
  heart_verse?: any
  audio?: { surahNumber: number; reciter: string }
  thesis?: string
  why_this_surah?: string
  sciences_active?: Array<{ key: string; english: string }>
  content_nodes?: any[]
}

interface SurahTabsProps {
  visualData: VisualData | null
  post: {
    title: string
    slug: string
    excerpt?: string
    content_html: string
    published_at?: string
    reading_time_minutes?: number
    featured_image?: string
  } | null
  ayahRecords: any[]
  surahNumber: number
  surahSlug: string
  glowColor: string
  pageUrl: string
}

type TopTab = 'overview' | 'reflection' | 'passages'

/* ── Component ─────────────────────────────────────────────────────────────── */

export function SurahTabs({
  visualData,
  post,
  ayahRecords,
  surahNumber: _surahNumber,
  surahSlug,
  glowColor,
  pageUrl,
}: SurahTabsProps) {
  const defaultTab: TopTab = visualData ? 'overview' : post ? 'reflection' : 'overview'
  const [activeTab, setActiveTab] = useState<TopTab>(defaultTab)
  // "why" tab is always first if why_this_surah exists
  const hasWhyTab = !!visualData?.why_this_surah
  const defaultSubTab = hasWhyTab ? 'why' : (visualData?.tabs?.[0]?.id || '')
  const [activeSubTab, setActiveSubTab] = useState<string>(defaultSubTab)

  const topTabs: { key: TopTab; label: string; count?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'reflection', label: 'Reflection' },
    ...(ayahRecords.length > 0
      ? [{ key: 'passages' as TopTab, label: 'Passages', count: ayahRecords.length }]
      : []),
  ]

  const switchTopTab = (key: TopTab) => {
    setActiveTab(key)
    trackSurahTabSwitch(surahSlug, key)
  }

  const switchSubTab = (id: string) => {
    setActiveSubTab(id)
    trackSurahTabSwitch(surahSlug, 'overview', id)
  }

  const contentHtml = post?.content_html?.replace(/^<h1[^>]*>.*?<\/h1>\s*/i, '') || ''

  return (
    <div className="mx-auto max-w-3xl px-5 pb-16">
      {/* ── Sticky top-level tab bar ───────────────────────────────────── */}
      <div className="sticky top-0 z-20 -mx-5 border-b border-white/[0.05] bg-[#0D1B2A]/80 px-5 backdrop-blur-md">
        <nav className="flex gap-1" role="tablist">
          {topTabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => switchTopTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-[#C9A84C]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                    activeTab === tab.key
                      ? 'bg-[#C9A84C]/15 text-[#C9A84C]'
                      : 'bg-white/[0.06] text-zinc-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {activeTab === tab.key && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#C9A84C]" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Tab panels ─────────────────────────────────────────────────── */}
      <div className="pt-8">
        {/* ━━ Overview panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {activeTab === 'overview' && (
          <div role="tabpanel" className="space-y-6">
            {visualData ? (
              <>
                {/* Audio player */}
                {visualData.audio && <AudioPlayer audio={visualData.audio} />}

                {/* Sub-tabs: Why Learn + diagram tabs */}
                {(() => {
                  const allSubTabs = [
                    ...(hasWhyTab ? [{ id: 'why', label: 'Why Learn' }] : []),
                    ...visualData.tabs,
                  ]
                  return allSubTabs.length > 0 ? (
                    <>
                      <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
                        {allSubTabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => switchSubTab(tab.id)}
                            className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${
                              activeSubTab === tab.id
                                ? 'bg-gold-500 text-navy-dark shadow-sm'
                                : 'text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <div className="min-h-[300px]">
                        {/* Why Learn tab content */}
                        {activeSubTab === 'why' && (
                          <div className="space-y-6">
                            <div className="rounded-xl border border-gold-500/20 bg-gold-500/[0.04] px-6 py-5">
                              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500/70 font-sans mb-3">
                                Why Learn This Surah
                              </div>
                              <p className="text-[16px] text-cream/85 leading-[1.75] font-body">
                                {visualData.why_this_surah}
                              </p>
                            </div>

                            {/* Thesis */}
                            {visualData.thesis && (
                              <p className="text-sm text-cream/60 leading-relaxed font-body italic max-w-xl mx-auto text-center">
                                {visualData.thesis}
                              </p>
                            )}

                            {/* Sciences badges */}
                            {visualData.sciences_active && visualData.sciences_active.length > 0 && (
                              <div className="flex flex-wrap justify-center gap-2 pt-2">
                                {visualData.sciences_active.map((s) => (
                                  <span
                                    key={s.key}
                                    className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] font-medium text-cream-muted/50 font-sans"
                                  >
                                    {s.english}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Diagram tab content */}
                        {visualData.tabs.map((tab) =>
                          activeSubTab === tab.id ? (
                            <DiagramRenderer
                              key={tab.id}
                              tab={tab}
                              diagrams={visualData.diagrams}
                              fullText={visualData.full_text}
                              heartVerse={visualData.heart_verse}
                            />
                          ) : null
                        )}
                      </div>
                    </>
                  ) : null
                })()}

                {/* Go deeper CTA */}
                {post && (
                  <>
                    <OrnamentDivider />
                    <button
                      onClick={() => switchTopTab('reflection')}
                      className="w-full rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
                    >
                      <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">
                        Go Deeper
                      </div>
                      <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] px-8 py-12 text-center">
                <p className="text-sm text-zinc-500">
                  Visual architecture for this surah is coming soon.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ━━ Reflection panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {activeTab === 'reflection' && (
          <div role="tabpanel">
            {post ? (
              <article>
                <header className="mb-10">
                  <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
                    {post.published_at && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                      </div>
                    )}
                    {post.reading_time_minutes && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.reading_time_minutes} min read</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
                    <span className="text-[#C9A84C]/50 text-sm">۞</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
                  </div>
                </header>

                {post.featured_image && (
                  <div className="mb-10 overflow-hidden rounded-2xl">
                    <img src={post.featured_image} alt={post.title} className="w-full object-cover" />
                  </div>
                )}

                <div
                  className="prose-blog"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                {/* Bottom divider */}
                <div className="mt-12 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
                  <span className="text-[#C9A84C]/50 text-sm">۞</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
                </div>

                {/* Share */}
                <div className="mt-8 flex items-center justify-center gap-6 text-sm">
                  <span className="text-zinc-500">Share:</span>
                  <ShareLink
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}`}
                    platform="twitter"
                    contentType="surah"
                    slug={surahSlug}
                    className="text-zinc-400 hover:text-[#C9A84C] transition-colors font-medium"
                  >
                    Twitter/X
                  </ShareLink>
                  <ShareLink
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${pageUrl}`)}`}
                    platform="whatsapp"
                    contentType="surah"
                    slug={surahSlug}
                    className="text-zinc-400 hover:text-[#C9A84C] transition-colors font-medium"
                  >
                    WhatsApp
                  </ShareLink>
                  <ShareLink
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this reflection: ${pageUrl}`)}`}
                    platform="email"
                    contentType="surah"
                    slug={surahSlug}
                    className="text-zinc-400 hover:text-[#C9A84C] transition-colors font-medium"
                  >
                    Email
                  </ShareLink>
                </div>
                <ScrollDepthTracker slug={surahSlug} contentType="surah" />

                {/* Newsletter CTA */}
                <div className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 sm:p-10 text-center">
                  <p className="text-[#C9A84C]/60 text-sm mb-3">۞</p>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Enjoyed this reflection?
                  </h3>
                  <p className="mt-2 text-zinc-500">
                    Get tadabbur delivered to your inbox.
                  </p>
                  <div className="mt-6 mx-auto max-w-md">
                    <NewsletterSignup source="surah_page" />
                  </div>
                </div>
              </article>
            ) : (
              <div
                className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] px-8 py-16 text-center"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${glowColor}0.07) 0%, transparent 80%)`,
                  }}
                />
                <p className="relative text-sm text-white/25">
                  Tadabbur for this surah is coming soon.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ━━ Passages panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {activeTab === 'passages' && (
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
              <p className="text-sm text-zinc-500">
                Passage-level tadabbur for this surah is coming soon.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
