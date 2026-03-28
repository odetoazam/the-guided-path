import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight, BookOpen, Compass, Layers } from 'lucide-react'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/articles`

export const metadata: Metadata = {
  title: 'Explore — Quranic Characters, Concepts & Themes',
  description:
    'Explore the Quran through its characters, concepts, and themes — each hub collects articles, ayah records, and linguistic grounding in one place.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Explore | ${SITE_NAME}`,
    description:
      'Explore the Quran through its characters, concepts, and themes — each hub collects articles, ayah records, and linguistic grounding in one place.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: `Explore | ${SITE_NAME}`,
    description:
      'Explore the Quran through its characters, concepts, and themes.',
  },
}

interface HubData {
  slug: string
  name_translit: string
  name_arabic: string | null
  category: string
  one_line: string | null
  article_count: number
  ayah_record_count: number
  latest_article_title: string | null
  latest_article_slug: string | null
}

interface UngroupedArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  reading_time_minutes: number | null
}

async function getHubsWithContent(): Promise<{ hubs: HubData[]; ungrouped: UngroupedArticle[] }> {
  try {
    const supabase = await createClient()

    // Get all entities that have at least one published article tagged to them
    const { data: entityTags } = await supabase
      .from('entity_tags')
      .select(`
        is_primary,
        entities:entity_id ( slug, name_translit, name_arabic, category, one_line ),
        posts:post_id ( id, title, slug, status, type, published_at, excerpt, reading_time_minutes ),
        ayah_record_id
      `)
      .eq('is_primary', true)

    if (!entityTags) return { hubs: [], ungrouped: [] }

    // Build hub map
    const hubMap = new Map<string, {
      entity: { slug: string; name_translit: string; name_arabic: string | null; category: string; one_line: string | null }
      articles: { title: string; slug: string; published_at: string | null }[]
      ayah_record_count: number
    }>()

    for (const tag of entityTags) {
      const entity = tag.entities as unknown as { slug: string; name_translit: string; name_arabic: string | null; category: string; one_line: string | null } | null
      if (!entity) continue

      if (!hubMap.has(entity.slug)) {
        hubMap.set(entity.slug, { entity, articles: [], ayah_record_count: 0 })
      }

      const hub = hubMap.get(entity.slug)!

      // Count article if it's a published article
      const post = tag.posts as unknown as { id: string; title: string; slug: string; status: string; type: string; published_at: string | null } | null
      if (post && post.status === 'published' && post.type === 'article') {
        // Avoid duplicates
        if (!hub.articles.some(a => a.slug === post.slug)) {
          hub.articles.push({ title: post.title, slug: post.slug, published_at: post.published_at })
        }
      }

      // Count ayah record
      if (tag.ayah_record_id) {
        hub.ayah_record_count++
      }
    }

    // Convert to HubData, filter to only those with articles
    const hubs: HubData[] = Array.from(hubMap.values())
      .filter(h => h.articles.length > 0)
      .map(h => {
        const sorted = [...h.articles].sort((a, b) =>
          (b.published_at || '').localeCompare(a.published_at || '')
        )
        return {
          slug: h.entity.slug,
          name_translit: h.entity.name_translit,
          name_arabic: h.entity.name_arabic,
          category: h.entity.category,
          one_line: h.entity.one_line,
          article_count: h.articles.length,
          ayah_record_count: h.ayah_record_count,
          latest_article_title: sorted[0]?.title || null,
          latest_article_slug: sorted[0]?.slug || null,
        }
      })
      .sort((a, b) => b.article_count - a.article_count)

    // Get ungrouped articles (published articles with no primary entity tag)
    const { data: allArticles } = await supabase
      .from('posts')
      .select(`id, title, slug, excerpt, reading_time_minutes,
               entity_tags ( is_primary, entities:entity_id ( slug ) )`)
      .eq('status', 'published')
      .eq('type', 'article')
      .order('published_at', { ascending: false })

    const ungrouped: UngroupedArticle[] = []
    if (allArticles) {
      for (const article of allArticles) {
        const tags = (article.entity_tags || []) as unknown as { is_primary: boolean; entities: { slug: string } | null }[]
        const hasPrimary = tags.some(t => t.is_primary && t.entities)
        if (!hasPrimary) {
          ungrouped.push({
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            reading_time_minutes: article.reading_time_minutes,
          })
        }
      }
    }

    return { hubs, ungrouped }
  } catch {
    return { hubs: [], ungrouped: [] }
  }
}

function categoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    character: 'Quranic Character',
    quranic_characters: 'Quranic Character',
    concept: 'Concept',
    the_unseen: 'The Unseen',
    place: 'Place',
    event: 'Event',
    group: 'Group',
    prophets: 'Prophet',
    spiritual_concepts: 'Spiritual Concept',
    quranic_concepts: 'Quranic Concept',
  }
  return labels[cat.toLowerCase()] || cat.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export default async function ArticlesPage() {
  const { hubs, ungrouped } = await getHubsWithContent()

  return (
    <div className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-zinc-200 px-5 pb-12 pt-14 text-center dark:border-white/[0.05]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[22rem] leading-none text-zinc-900/[0.03] dark:text-white/[0.015]"
          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
        >
          ع
        </div>

        <div className="relative mx-auto max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.25em] uppercase text-[rgba(212,175,55,0.65)] dark:text-[rgba(212,175,55,0.55)]">
            Knowledge Graph
          </p>
          <h1 className="font-serif text-3xl font-bold text-navy-dark sm:text-4xl dark:text-cream">
            Explore
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Each hub collects everything the Quran says about a character,
            concept, or theme — articles, ayah records, and linguistic
            grounding in one place.
          </p>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-5 py-14">
        {hubs.length === 0 && ungrouped.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-600 mb-4" />
            <p className="font-serif text-lg text-zinc-500 dark:text-cream/40">
              Content coming soon
            </p>
            <p className="mt-2 text-sm text-zinc-400 dark:text-cream/25">
              Subscribe to be the first to know when new hubs are published.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Hub Cards */}
            <div className="grid gap-5 md:grid-cols-2">
              {hubs.map((hub) => (
                <Link
                  key={hub.slug}
                  href={`/hub/${hub.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-7 transition-all hover:border-[rgba(212,175,55,0.35)] hover:shadow-lg hover:shadow-[rgba(212,175,55,0.04)]"
                >
                  {/* Category badge */}
                  <span className="self-start rounded-full border border-[rgba(212,175,55,0.2)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(212,175,55,0.6)] dark:text-[rgba(212,175,55,0.45)] mb-4">
                    {categoryLabel(hub.category)}
                  </span>

                  {/* Entity name */}
                  <div className="flex items-baseline gap-3 mb-2">
                    <h2 className="font-serif text-xl font-bold text-navy-dark dark:text-cream group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors">
                      {hub.name_translit}
                    </h2>
                    {hub.name_arabic && (
                      <span
                        className="text-lg text-[rgba(212,175,55,0.45)]"
                        style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
                        dir="rtl"
                      >
                        {hub.name_arabic}
                      </span>
                    )}
                  </div>

                  {/* One-liner */}
                  {hub.one_line && (
                    <p className="text-sm text-zinc-500 dark:text-cream/35 leading-relaxed mb-5 line-clamp-2">
                      {hub.one_line}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="mt-auto flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-white/[0.04]">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-cream/25">
                      <BookOpen className="h-3 w-3" />
                      <span>{hub.article_count} {hub.article_count === 1 ? 'article' : 'articles'}</span>
                    </div>
                    {hub.ayah_record_count > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-cream/25">
                        <Layers className="h-3 w-3" />
                        <span>{hub.ayah_record_count} ayah {hub.ayah_record_count === 1 ? 'record' : 'records'}</span>
                      </div>
                    )}
                    <div className="ml-auto flex items-center gap-1.5 text-xs font-medium text-[rgba(212,175,55,0.7)] dark:text-[rgba(212,175,55,0.55)]">
                      <Compass className="h-3.5 w-3.5" />
                      Explore
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Ungrouped articles */}
            {ungrouped.length > 0 && (
              <section>
                <div className="mb-6 pb-3 border-b border-zinc-100 dark:border-white/[0.05]">
                  <h2 className="font-serif text-xl font-bold text-navy-dark dark:text-cream">
                    More Articles
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {ungrouped.map((article) => (
                    <Link
                      key={article.id}
                      href={`/posts/${article.slug}`}
                      className="group flex flex-col rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 transition-all hover:border-[rgba(212,175,55,0.3)] hover:shadow-md hover:shadow-[rgba(212,175,55,0.03)]"
                    >
                      <h3 className="font-serif text-base font-semibold text-navy-dark dark:text-cream group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors leading-snug">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="mt-2 text-xs text-zinc-500 dark:text-cream/30 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="mt-auto pt-3 flex items-center gap-1 text-xs font-medium text-[rgba(212,175,55,0.7)] dark:text-[rgba(212,175,55,0.55)]">
                        Read
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
