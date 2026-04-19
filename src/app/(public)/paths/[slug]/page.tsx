import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { PATHS, PATHS_BY_SLUG, type Path, type PathStop } from '@/data/paths'
import { createClient } from '@/lib/supabase/server'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

// ─── Types ─────────────────────────────────────────────────────────────────

interface ResolvedStop extends PathStop {
  resolvedTitle: string
  resolvedExcerpt: string | null
  resolvedHref: string | null // null = ayah (displayed inline, no link)
  resolvedArabic?: string
  resolvedTranslation?: string
  found: boolean
}

// ─── Ayah slug parser ──────────────────────────────────────────────────────

function parseAyahSlug(slug: string): {
  surah: number
  ayahStart: number
  ayahEnd: number
} {
  const [surahPart, ayahPart] = slug.split(':')
  const [start, end] = (ayahPart ?? '1').split('-')
  return {
    surah: parseInt(surahPart ?? '1'),
    ayahStart: parseInt(start ?? '1'),
    ayahEnd: end ? parseInt(end) : parseInt(start ?? '1'),
  }
}

// ─── Data fetching ─────────────────────────────────────────────────────────

async function resolveStops(path: Path): Promise<ResolvedStop[]> {
  const supabase = await createClient()

  const articleSlugs = path.stops.filter((s) => s.type === 'article').map((s) => s.slug)
  const hubSlugs = path.stops.filter((s) => s.type === 'hub').map((s) => s.slug)
  const ayahRefs = path.stops.filter((s) => s.type === 'ayah').map((s) => parseAyahSlug(s.slug))
  const uniqueSurahNums = [...new Set(ayahRefs.map((r) => r.surah))]

  const [articlesResult, entitiesResult, ayahsResult] = await Promise.all([
    articleSlugs.length
      ? supabase
          .from('posts')
          .select('slug, title, excerpt, reading_time_minutes')
          .in('slug', articleSlugs)
          .eq('status', 'published')
      : { data: [] as { slug: string; title: string; excerpt: string | null; reading_time_minutes: number | null }[] },

    hubSlugs.length
      ? supabase
          .from('entities')
          .select('slug, name_translit, name_arabic, one_line')
          .in('slug', hubSlugs)
      : { data: [] as { slug: string; name_translit: string; name_arabic: string; one_line: string | null }[] },

    uniqueSurahNums.length
      ? supabase
          .from('ayah_records')
          .select('surah_number, ayah_start, ayah_end, arabic_text, translation, title')
          .eq('status', 'published')
          .in('surah_number', uniqueSurahNums)
      : { data: [] as { surah_number: number; ayah_start: number; ayah_end: number; arabic_text: string | null; translation: string | null; title: string | null }[] },
  ])

  const articles = articlesResult.data ?? []
  const entities = entitiesResult.data ?? []
  const ayahRecords = ayahsResult.data ?? []

  return path.stops.map((stop) => {
    if (stop.type === 'article') {
      const match = articles.find((a) => a.slug === stop.slug)
      return {
        ...stop,
        resolvedTitle: match?.title ?? stop.slug,
        resolvedExcerpt: match?.excerpt ?? null,
        resolvedHref: match ? `/posts/${match.slug}` : null,
        found: !!match,
      }
    }

    if (stop.type === 'hub') {
      const match = entities.find((e) => e.slug === stop.slug)
      return {
        ...stop,
        resolvedTitle: match
          ? `${match.name_translit}${match.name_arabic ? ` — ${match.name_arabic}` : ''}`
          : stop.slug,
        resolvedExcerpt: match?.one_line ?? null,
        resolvedHref: match ? `/hub/${match.slug}` : null,
        found: !!match,
      }
    }

    // ayah
    const ref = parseAyahSlug(stop.slug)
    const match = ayahRecords.find(
      (r) =>
        r.surah_number === ref.surah &&
        r.ayah_start === ref.ayahStart
    )
    const label = match?.title ?? `${ref.surah}:${ref.ayahStart}${ref.ayahEnd !== ref.ayahStart ? `–${ref.ayahEnd}` : ''}`
    return {
      ...stop,
      resolvedTitle: label,
      resolvedExcerpt: match?.translation ?? null,
      resolvedArabic: match?.arabic_text ?? undefined,
      resolvedHref: null,
      found: !!match,
    }
  })
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const path = PATHS_BY_SLUG[slug]
  if (!path) return { title: 'Not Found' }
  const url = `${CANONICAL_URL}/paths/${slug}`
  return {
    title: path.title,
    description: path.description,
    alternates: { canonical: url },
    openGraph: {
      title: path.title,
      description: path.description,
      url,
      siteName: SITE_NAME,
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return PATHS.map((p) => ({ slug: p.slug }))
}

// ─── Type badge ────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<PathStop['type'], string> = {
  article: 'Article',
  hub: 'Concept',
  ayah: 'Reflection',
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function PathPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const path = PATHS_BY_SLUG[slug]
  if (!path) notFound()

  const stops = await resolveStops(path)

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-white/[0.05] px-5 pb-12 pt-10">
        <div className="mx-auto max-w-2xl">
          {/* Breadcrumb */}
          <Link
            href="/articles"
            className="mb-8 inline-flex items-center gap-1.5 text-xs text-zinc-400 dark:text-cream/30 hover:text-zinc-600 dark:hover:text-cream/50 transition-colors"
          >
            <span>←</span>
            <span>Find your path</span>
          </Link>

          {/* Arrival statement */}
          <p className="mt-6 text-sm italic text-zinc-400 dark:text-cream/30 leading-relaxed">
            &ldquo;{path.arrivalStatement}&rdquo;
          </p>

          {/* Title */}
          <h1 className="mt-3 font-serif text-3xl font-bold text-navy dark:text-cream sm:text-4xl leading-tight">
            {path.title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-base text-zinc-500 dark:text-cream/60 leading-relaxed max-w-xl">
            {path.description}
          </p>

          {/* Meta */}
          <p className="mt-5 text-xs text-zinc-400 dark:text-cream/25">
            {path.stops.length} stops · ~{path.estimatedMinutes} min
          </p>
        </div>
      </div>

      {/* Stop list */}
      <div className="px-5 py-16">
        <div className="mx-auto max-w-2xl">
          <ol className="relative">
            {stops.map((stop, i) => {
              const isLast = i === stops.length - 1
              return (
                <li key={`${stop.type}-${stop.slug}`} className="relative flex gap-6">
                  {/* Left column: number + connector line */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(212,175,55,0.06)] text-xs font-semibold text-[rgba(212,175,55,0.7)]">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {!isLast && (
                      <div className="mt-2 w-px flex-1 bg-zinc-200 dark:bg-white/[0.05]" />
                    )}
                  </div>

                  {/* Right column: stop content + connector text */}
                  <div className={`pb-${isLast ? '0' : '10'} flex-1 min-w-0 pb-10`}>
                    {/* Stop card */}
                    {stop.found && stop.resolvedHref ? (
                      <Link
                        href={stop.resolvedHref}
                        className="group block rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 hover:border-[rgba(201,168,76,0.3)] transition-all duration-200"
                      >
                        <StopCardInner stop={stop} />
                      </Link>
                    ) : (
                      <div className="rounded-xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5">
                        <StopCardInner stop={stop} />
                      </div>
                    )}

                    {/* Connector text to next stop */}
                    {!isLast && (
                      <p className="mt-5 text-sm italic text-zinc-400 dark:text-cream/30 leading-relaxed pl-1">
                        {stop.connectorText}
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          {/* End marker */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(201,168,76,0.2)]" />
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="text-[rgba(201,168,76,0.3)]">
              <polygon
                points="12,2 14.5,8.5 21.5,9 16,13.5 17.5,21 12,17 6.5,21 8,13.5 2.5,9 9.5,8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(201,168,76,0.2)]" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Stop card inner ───────────────────────────────────────────────────────

function StopCardInner({ stop }: { stop: ResolvedStop }) {
  return (
    <>
      {/* Type badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-block rounded-full border border-zinc-200 dark:border-white/[0.08] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-zinc-400 dark:text-cream/30">
          {TYPE_LABELS[stop.type]}
        </span>
        {!stop.found && (
          <span className="inline-block rounded-full bg-zinc-100 dark:bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-zinc-400 dark:text-cream/25">
            Coming soon
          </span>
        )}
      </div>

      {/* Arabic (ayah only) */}
      {stop.type === 'ayah' && stop.resolvedArabic && (
        <p
          dir="rtl"
          className="mb-3 font-amiri text-xl leading-loose text-navy dark:text-cream/80"
        >
          {stop.resolvedArabic}
        </p>
      )}

      {/* Title */}
      <h3 className="font-serif text-base font-semibold text-navy dark:text-cream leading-snug group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors">
        {stop.resolvedTitle}
      </h3>

      {/* Excerpt / translation */}
      {stop.resolvedExcerpt && (
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-cream/50 leading-relaxed line-clamp-2">
          {stop.resolvedExcerpt}
        </p>
      )}

      {stop.found && stop.resolvedHref && (
        <p className="mt-3 text-xs text-[rgba(212,175,55,0.6)] group-hover:text-[rgba(212,175,55,0.9)] transition-colors">
          {stop.type === 'hub' ? 'Explore hub →' : 'Read →'}
        </p>
      )}
    </>
  )
}
