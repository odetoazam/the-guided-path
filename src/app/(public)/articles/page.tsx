import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight, BookOpen, Clock, Compass } from 'lucide-react'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/articles`

export const metadata: Metadata = {
  title: 'Articles — Quranic Reflections & Deep Dives',
  description:
    'Read the latest Quranic reflections, character studies, and thematic explorations — deep tadabbur grounded in the Arabic text and classical scholarship.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Articles | ${SITE_NAME}`,
    description:
      'Read the latest Quranic reflections, character studies, and thematic explorations.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: `Articles | ${SITE_NAME}`,
    description:
      'Quranic reflections, character studies, and thematic deep dives.',
  },
}

/* ── Types ──────────────────────────────────────────── */

interface EntityInfo {
  slug: string
  name_translit: string
  name_arabic: string | null
  category: string
}

interface ArticleRow {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string | null
  reading_time_minutes: number | null
  entity_tags: {
    is_primary: boolean
    entities: EntityInfo | null
  }[]
}

/* ── Data fetching ──────────────────────────────────── */

async function getArticles(): Promise<ArticleRow[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select(
        `id, title, slug, excerpt, published_at, reading_time_minutes,
         entity_tags ( is_primary, entities:entity_id ( slug, name_translit, name_arabic, category ) )`
      )
      .eq('status', 'published')
      .eq('type', 'article')
      .order('published_at', { ascending: false })

    return (data as unknown as ArticleRow[]) || []
  } catch {
    return []
  }
}

function primaryEntity(article: ArticleRow): EntityInfo | null {
  const tag = (article.entity_tags || []).find(t => t.is_primary && t.entities)
  return tag?.entities || null
}

function formatDate(iso: string | null, style: 'long' | 'short' = 'long'): string {
  if (!iso) return ''
  const opts: Intl.DateTimeFormatOptions =
    style === 'long'
      ? { month: 'long', day: 'numeric', year: 'numeric' }
      : { month: 'short', day: 'numeric' }
  return new Date(iso).toLocaleDateString('en-US', opts)
}

function categoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    quranic_characters: 'Quranic Character',
    the_unseen: 'The Unseen',
    prophets: 'Prophet',
    spiritual_concepts: 'Spiritual Concept',
    quranic_concepts: 'Quranic Concept',
    concepts_of_existence: 'Concept',
    theology_and_ethics: 'Theology',
    character: 'Character',
    concept: 'Concept',
  }
  return labels[cat.toLowerCase()] || cat.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/* ── Entity badge ───────────────────────────────────── */

function EntityBadge({ entity, size = 'sm' }: { entity: EntityInfo | null; size?: 'sm' | 'default' }) {
  if (!entity) return null
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs'
  const arabicSize = size === 'sm' ? 'text-xs' : 'text-sm'
  const py = size === 'sm' ? 'py-0.5' : 'py-1'

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.15)] px-2.5 ${py}`}
    >
      <span className={`${textSize} font-medium uppercase tracking-[0.08em] text-[rgba(212,175,55,0.55)]`}>
        {categoryLabel(entity.category)}
      </span>
      <span className={`${textSize} text-zinc-300 dark:text-cream/15`}>·</span>
      <span className={`${textSize} font-medium text-zinc-600 dark:text-cream/50`}>
        {entity.name_translit}
      </span>
      {entity.name_arabic && (
        <span
          className={`${arabicSize} text-[rgba(212,175,55,0.4)]`}
          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
          dir="rtl"
        >
          {entity.name_arabic}
        </span>
      )}
    </span>
  )
}

/* ── Page ────────────────────────────────────────────── */

export default async function ArticlesPage() {
  const articles = await getArticles()
  const featured = articles[0] || null
  const secondary = articles.slice(1, 3)
  const remaining = articles.slice(3)

  // Entity counts for bottom explorer
  const entityMap = new Map<string, { name: string; arabic: string | null; count: number }>()
  for (const article of articles) {
    const entity = primaryEntity(article)
    if (entity) {
      const existing = entityMap.get(entity.slug)
      if (existing) existing.count++
      else entityMap.set(entity.slug, { name: entity.name_translit, arabic: entity.name_arabic, count: 1 })
    }
  }
  const entityCounts = Array.from(entityMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .map(([slug, data]) => ({ slug, ...data }))

  return (
    <div className="min-h-screen">
      {/* ── Zone 1: Page Hero ────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-zinc-200 px-5 pb-10 pt-12 text-center dark:border-white/[0.05]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[18rem] sm:text-[22rem] leading-none text-zinc-900/[0.03] dark:text-white/[0.015]"
          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
        >
          ق
        </div>
        <div className="relative mx-auto max-w-xl">
          <p className="mb-2 text-xs font-medium tracking-[0.25em] uppercase text-[rgba(212,175,55,0.65)] dark:text-[rgba(212,175,55,0.55)]">
            Latest Reflections
          </p>
          <h1 className="font-serif text-3xl font-bold text-navy-dark sm:text-4xl dark:text-cream">
            Articles
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Character studies, linguistic deep dives, and thematic explorations
            — grounded in the Arabic text.
          </p>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        {articles.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-600 mb-4" />
            <p className="font-serif text-lg text-zinc-500 dark:text-cream/40">
              Articles coming soon
            </p>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-14">
            {/* ── Zone 2: Featured Article ──────────────── */}
            {featured && (
              <Link
                href={`/posts/${featured.slug}`}
                className="group block rounded-2xl border-t-2 border-[rgba(212,175,55,0.25)] bg-white dark:bg-white/[0.02] border-x border-b border-zinc-200 dark:border-white/[0.06] p-6 sm:p-8 lg:p-10 transition-all hover:border-[rgba(212,175,55,0.35)] hover:shadow-xl hover:shadow-[rgba(212,175,55,0.05)]"
              >
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <EntityBadge entity={primaryEntity(featured)} size="default" />
                  <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-cream/25">
                    {featured.published_at && (
                      <time>{formatDate(featured.published_at)}</time>
                    )}
                    {featured.reading_time_minutes && (
                      <>
                        <span className="text-zinc-300 dark:text-cream/15">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featured.reading_time_minutes} min
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-navy-dark dark:text-cream leading-tight group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors">
                  {featured.title}
                </h2>

                {featured.excerpt && (
                  <p className="mt-4 font-body text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3 max-w-3xl">
                    {featured.excerpt}
                  </p>
                )}

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[rgba(212,175,55,0.7)] dark:text-[rgba(212,175,55,0.55)]">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )}

            {/* ── Zone 3: Secondary Pair ────────────────── */}
            {secondary.length > 0 && (
              <div className="grid gap-5 lg:grid-cols-12">
                {secondary.map((article, i) => (
                  <Link
                    key={article.id}
                    href={`/posts/${article.slug}`}
                    className={`group flex flex-col rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 sm:p-7 transition-all hover:border-[rgba(212,175,55,0.35)] hover:shadow-lg hover:shadow-[rgba(212,175,55,0.04)] ${
                      i === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <EntityBadge entity={primaryEntity(article)} />
                      {article.reading_time_minutes && (
                        <span className="text-[11px] text-zinc-400 dark:text-cream/25 flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          {article.reading_time_minutes} min
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-dark dark:text-cream leading-snug group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors">
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-500 dark:text-cream/35 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}

                    <div className="mt-auto pt-5 flex items-center gap-1.5 text-xs font-medium text-[rgba(212,175,55,0.7)] dark:text-[rgba(212,175,55,0.55)]">
                      Read
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* ── Zone 4: Section Divider ───────────────── */}
            {remaining.length > 0 && (
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.2)] to-transparent" />
                <div className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[rgba(212,175,55,0.3)]">
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" fill="currentColor" />
                  </svg>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(212,175,55,0.45)]">
                    More Reflections
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[rgba(212,175,55,0.3)]">
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.2)] to-transparent" />
              </div>
            )}

            {/* ── Zone 5: Compact Grid ──────────────────── */}
            {remaining.length > 0 && (
              <div className="grid gap-x-8 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
                {remaining.map((article) => (
                  <Link
                    key={article.id}
                    href={`/posts/${article.slug}`}
                    className="group flex flex-col py-5 border-b border-zinc-100 dark:border-white/[0.04] last:border-b-0"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      {primaryEntity(article) && (
                        <span
                          className="text-[10px] font-medium uppercase tracking-[0.08em] text-[rgba(212,175,55,0.5)]"
                        >
                          {primaryEntity(article)!.name_translit}
                        </span>
                      )}
                      {article.published_at && (
                        <>
                          {primaryEntity(article) && (
                            <span className="text-zinc-300 dark:text-cream/10">·</span>
                          )}
                          <time className="text-[11px] text-zinc-400 dark:text-cream/20">
                            {formatDate(article.published_at, 'short')}
                          </time>
                        </>
                      )}
                      {article.reading_time_minutes && (
                        <>
                          <span className="text-zinc-300 dark:text-cream/10">·</span>
                          <span className="text-[11px] text-zinc-400 dark:text-cream/20">
                            {article.reading_time_minutes} min
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-serif text-[15px] font-semibold text-navy-dark dark:text-cream leading-snug group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}

            {/* ── Zone 6: Entity Explorer ───────────────── */}
            {entityCounts.length > 0 && (
              <div className="pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-cream/25 mb-4">
                  Explore by topic
                </p>
                <div className="flex flex-wrap gap-2">
                  {entityCounts.map(({ slug, name, arabic, count }) => (
                    <Link
                      key={slug}
                      href={`/hub/${slug}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/[0.06] px-3.5 py-1.5 text-xs hover:border-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.04)] transition-colors"
                    >
                      <span className="font-medium text-zinc-700 dark:text-cream/60 group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.8)] transition-colors">
                        {name}
                      </span>
                      {arabic && (
                        <span
                          className="text-sm text-[rgba(212,175,55,0.35)]"
                          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
                          dir="rtl"
                        >
                          {arabic}
                        </span>
                      )}
                      <span className="text-[10px] text-zinc-400 dark:text-cream/20">
                        {count}
                      </span>
                      <Compass className="h-3 w-3 text-zinc-300 dark:text-cream/15 group-hover:text-[rgba(212,175,55,0.5)] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
