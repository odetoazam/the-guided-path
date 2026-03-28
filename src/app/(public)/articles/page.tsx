import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight, BookOpen, Compass } from 'lucide-react'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/articles`

export const metadata: Metadata = {
  title: 'Articles — Thematic Deep Dives into the Quran',
  description:
    'Thematic articles exploring Quranic characters, concepts, and wisdom — grounded in the Arabic text and classical scholarship.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Articles | ${SITE_NAME}`,
    description:
      'Thematic articles exploring Quranic characters, concepts, and wisdom — grounded in the Arabic text and classical scholarship.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: `Articles | ${SITE_NAME}`,
    description:
      'Thematic articles exploring Quranic characters, concepts, and wisdom.',
  },
}

interface EntityInfo {
  slug: string
  name_translit: string
  name_arabic: string | null
  category: string
  one_line: string | null
}

interface ArticleRow {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string | null
  reading_time_minutes: number | null
  tags: string[] | null
  entity_tags: {
    is_primary: boolean
    entities: EntityInfo | null
  }[]
}

interface HubGroup {
  entity: EntityInfo
  articles: ArticleRow[]
}

async function getArticles(): Promise<ArticleRow[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select(
        `id, title, slug, excerpt, published_at, reading_time_minutes, tags,
         entity_tags ( is_primary, entities:entity_id ( slug, name_translit, name_arabic, category, one_line ) )`
      )
      .eq('status', 'published')
      .eq('type', 'article')
      .order('published_at', { ascending: false })

    return (data as unknown as ArticleRow[]) || []
  } catch {
    return []
  }
}

function groupByHub(articles: ArticleRow[]): { grouped: HubGroup[]; ungrouped: ArticleRow[] } {
  const hubMap = new Map<string, HubGroup>()
  const ungrouped: ArticleRow[] = []

  for (const article of articles) {
    const primaryTags = (article.entity_tags || []).filter(
      (t) => t.is_primary && t.entities
    )

    if (primaryTags.length === 0) {
      ungrouped.push(article)
      continue
    }

    const entity = primaryTags[0].entities!
    if (!hubMap.has(entity.slug)) {
      hubMap.set(entity.slug, { entity, articles: [] })
    }
    hubMap.get(entity.slug)!.articles.push(article)
  }

  const grouped = Array.from(hubMap.values()).sort(
    (a, b) => b.articles.length - a.articles.length
  )

  return { grouped, ungrouped }
}

export default async function ArticlesPage() {
  const articles = await getArticles()
  const { grouped, ungrouped } = groupByHub(articles)

  return (
    <div className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-zinc-200 px-5 pb-12 pt-14 text-center dark:border-white/[0.05]">
        {/* Decorative Arabic watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[22rem] leading-none text-zinc-900/[0.03] dark:text-white/[0.015]"
          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
        >
          ق
        </div>

        <div className="relative mx-auto max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.25em] uppercase text-[rgba(212,175,55,0.65)] dark:text-[rgba(212,175,55,0.55)]">
            Thematic Deep Dives
          </p>
          <h1 className="font-serif text-3xl font-bold text-navy-dark sm:text-4xl dark:text-cream">
            Articles
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Each article takes a Quranic character, concept, or scene and follows
            it wherever the text leads — through the Arabic, the structure,
            and the questions it leaves you with.
          </p>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-5 py-14">
        {articles.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-600 mb-4" />
            <p className="font-serif text-lg text-zinc-500 dark:text-cream/40">
              Articles coming soon
            </p>
            <p className="mt-2 text-sm text-zinc-400 dark:text-cream/25">
              Subscribe to be the first to know when new articles are published.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {grouped.map((group) => (
              <section key={group.entity.slug}>
                {/* Hub section header */}
                <div className="flex items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-100 dark:border-white/[0.05]">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h2 className="font-serif text-2xl font-bold text-navy-dark dark:text-cream">
                        {group.entity.name_translit}
                      </h2>
                      {group.entity.name_arabic && (
                        <span
                          className="text-lg text-[rgba(212,175,55,0.5)]"
                          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
                          dir="rtl"
                        >
                          {group.entity.name_arabic}
                        </span>
                      )}
                    </div>
                    {group.entity.one_line && (
                      <p className="mt-1.5 text-sm text-zinc-500 dark:text-cream/35 max-w-lg">
                        {group.entity.one_line}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/hub/${group.entity.slug}`}
                    className="hidden sm:flex items-center gap-1.5 shrink-0 rounded-full border border-[rgba(212,175,55,0.25)] px-3.5 py-1.5 text-xs font-medium text-[rgba(212,175,55,0.7)] dark:text-[rgba(212,175,55,0.55)] hover:bg-[rgba(212,175,55,0.06)] transition-colors"
                  >
                    <Compass className="h-3 w-3" />
                    Explore hub
                  </Link>
                </div>

                {/* Featured + remaining layout */}
                <div className="grid gap-5 lg:grid-cols-5">
                  {/* Featured article — hero card */}
                  <Link
                    href={`/posts/${group.articles[0].slug}`}
                    className="group lg:col-span-3 flex flex-col rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-7 md:p-8 transition-all hover:border-[rgba(212,175,55,0.35)] hover:shadow-lg hover:shadow-[rgba(212,175,55,0.04)]"
                  >
                    <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-cream/25 mb-4">
                      {group.articles[0].published_at && (
                        <time>
                          {new Date(group.articles[0].published_at).toLocaleDateString(
                            'en-US',
                            { month: 'long', day: 'numeric', year: 'numeric' }
                          )}
                        </time>
                      )}
                      {group.articles[0].reading_time_minutes && (
                        <>
                          <span className="text-zinc-300 dark:text-cream/15">·</span>
                          <span>{group.articles[0].reading_time_minutes} min read</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-navy-dark dark:text-cream group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors leading-tight">
                      {group.articles[0].title}
                    </h3>
                    {group.articles[0].excerpt && (
                      <p className="mt-3 font-body text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-4">
                        {group.articles[0].excerpt}
                      </p>
                    )}
                    <div className="mt-auto pt-6 flex items-center gap-1.5 text-xs font-medium text-[rgba(212,175,55,0.7)] dark:text-[rgba(212,175,55,0.55)]">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>

                  {/* Remaining articles — compact stack */}
                  {group.articles.length > 1 ? (
                    <div className="lg:col-span-2 flex flex-col gap-3">
                      {group.articles.slice(1).map((article) => (
                        <Link
                          key={article.id}
                          href={`/posts/${article.slug}`}
                          className="group flex flex-col rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 transition-all hover:border-[rgba(212,175,55,0.3)] hover:shadow-md hover:shadow-[rgba(212,175,55,0.03)]"
                        >
                          {article.reading_time_minutes && (
                            <span className="text-[11px] text-zinc-400 dark:text-cream/25 mb-2">
                              {article.reading_time_minutes} min read
                            </span>
                          )}
                          <h3 className="font-serif text-base font-semibold text-navy-dark dark:text-cream group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors leading-snug">
                            {article.title}
                          </h3>
                          {article.excerpt && (
                            <p className="mt-1.5 text-xs text-zinc-500 dark:text-cream/30 line-clamp-2">
                              {article.excerpt}
                            </p>
                          )}
                        </Link>
                      ))}

                      {/* Mobile hub link */}
                      <Link
                        href={`/hub/${group.entity.slug}`}
                        className="sm:hidden flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-[rgba(212,175,55,0.2)] px-4 py-3 text-xs font-medium text-[rgba(212,175,55,0.6)] hover:bg-[rgba(212,175,55,0.04)] transition-colors"
                      >
                        <Compass className="h-3 w-3" />
                        Explore the {group.entity.name_translit} hub
                      </Link>
                    </div>
                  ) : (
                    /* Single-article group — hub invite */
                    <div className="lg:col-span-2 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 dark:border-white/[0.06] p-8">
                      <Compass className="h-7 w-7 text-[rgba(212,175,55,0.25)] mb-3" />
                      <p className="text-xs text-zinc-400 dark:text-cream/30 text-center mb-4 max-w-[200px]">
                        Ayah records, connections, and linguistic grounding for{' '}
                        {group.entity.name_translit}.
                      </p>
                      <Link
                        href={`/hub/${group.entity.slug}`}
                        className="flex items-center gap-1.5 rounded-full border border-[rgba(212,175,55,0.25)] px-3.5 py-1.5 text-xs font-medium text-[rgba(212,175,55,0.7)] dark:text-[rgba(212,175,55,0.55)] hover:bg-[rgba(212,175,55,0.06)] transition-colors"
                      >
                        <Compass className="h-3 w-3" />
                        Explore hub
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            ))}

            {/* Ungrouped articles */}
            {ungrouped.length > 0 && (
              <section>
                <div className="mb-8 pb-4 border-b border-zinc-100 dark:border-white/[0.05]">
                  <h2 className="font-serif text-2xl font-bold text-navy-dark dark:text-cream">
                    More Articles
                  </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {ungrouped.map((article) => (
                    <Link
                      key={article.id}
                      href={`/posts/${article.slug}`}
                      className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 transition-all hover:border-[rgba(212,175,55,0.35)] hover:shadow-lg hover:shadow-[rgba(212,175,55,0.04)]"
                    >
                      <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-cream/25 mb-3">
                        {article.published_at && (
                          <time>
                            {new Date(article.published_at).toLocaleDateString(
                              'en-US',
                              { month: 'short', day: 'numeric', year: 'numeric' }
                            )}
                          </time>
                        )}
                        {article.reading_time_minutes && (
                          <>
                            <span>·</span>
                            <span>{article.reading_time_minutes} min read</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-navy-dark dark:text-cream group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-center gap-1 text-xs font-medium text-[rgba(212,175,55,0.7)] dark:text-[rgba(212,175,55,0.55)]">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
