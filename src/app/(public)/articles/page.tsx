import { createClient } from '@/lib/supabase/server'
import { ArticlesGrid, type ArticleItem } from '@/components/articles/ArticlesGrid'
import { PathCard } from '@/components/paths/PathCard'
import { PATHS } from '@/data/paths'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/articles`

export const metadata: Metadata = {
  title: 'Articles — Explorations in Quranic Meaning',
  description:
    'Thematic explorations and deep dives into the signs — entities, stories, and concepts as they unfold across the Quran.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Articles | ${SITE_NAME}`,
    description: 'Character studies, linguistic deep dives, and thematic explorations.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: `Articles | ${SITE_NAME}`,
    description: 'Quranic reflections, character studies, and thematic deep dives.',
  },
}

async function getArticles(): Promise<ArticleItem[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select(
        `id, title, slug, excerpt, published_at, reading_time_minutes, featured,
         entity_tags ( is_primary, entities:entity_id ( slug, name_translit, name_arabic, category ) )`
      )
      .eq('status', 'published')
      .eq('type', 'article')
      .order('featured', { ascending: false })
      .order('published_at', { ascending: false })

    return (data as unknown as ArticleItem[]) || []
  } catch {
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-zinc-200 px-5 pb-12 pt-14 text-center dark:border-white/[0.05]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[20rem] leading-none text-zinc-900/[0.025] dark:text-white/[0.012]"
          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
        >
          ب
        </div>
        <div className="relative mx-auto max-w-xl">
          <p className="mb-2 text-xs font-medium tracking-[0.25em] uppercase text-[rgba(212,175,55,0.65)] dark:text-[rgba(212,175,55,0.55)]">
            Explorations
          </p>
          <h1 className="font-serif text-3xl font-bold text-navy-dark sm:text-4xl dark:text-cream">
            Articles
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Thematic explorations and deep dives into the signs — entities, stories, and concepts as they unfold across the Quran.
          </p>
        </div>
      </div>

      {/* Guided paths strip */}
      <div className="border-b border-zinc-200 dark:border-white/[0.04] px-5 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-cream/30">
            Not sure where to start? Try a guided path
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PATHS.map((path, i) => (
              <PathCard key={path.slug} path={path} index={i} />
            ))}
          </div>
        </div>
      </div>

      <ArticlesGrid articles={articles} />
    </div>
  )
}
