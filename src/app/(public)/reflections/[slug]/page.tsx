import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { SURAHS, surahSlug } from '@/lib/surahs'
import {
  renderReflection,
  reflectionSlug,
  parseReflectionSlug,
  ayahRef,
} from '@/lib/reflection-render'
import { PathAttribution } from '@/components/paths/PathAttribution'
import { ScrollDepthTracker } from '@/components/providers/scroll-depth-tracker'
import { SelectionQuoteShare } from '@/components/share/SelectionQuoteShare'
import type { Entity } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

interface AyahRecord {
  id: string
  surah_number: number
  ayah_start: number
  ayah_end: number
  arabic_text: string | null
  translation: string | null
  title: string | null
  passage_context: string | null
  estimated_duration: string | null
  layer_a: { linguistic_html?: string | null } | null
  layer_b: { reflection_html?: string | null } | null
  created_at: string | null
  updated_at: string | null
}

// These reads must not be served from a stale Data Cache snapshot — the same
// trap that froze the sitemap against a pre-article view of the database.
export const revalidate = 3600

async function getRecord(slug: string): Promise<AyahRecord | null> {
  const parsed = parseReflectionSlug(slug)
  if (!parsed) return null
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('ayah_records')
      .select('*')
      .eq('status', 'published')
      .eq('surah_number', parsed.surah)
      .eq('ayah_start', parsed.ayahStart)
      .limit(1)
    const record = (data ?? [])[0] as AyahRecord | undefined
    if (!record) return null
    // The ayah range is part of the record's identity: a slug naming a
    // different end verse is not this page.
    if (parsed.ayahEnd !== (record.ayah_end || record.ayah_start)) return null
    return record
  } catch {
    return null
  }
}

/** Concepts this passage is tagged with — the hub links out of the page. */
async function getEntities(recordId: string): Promise<Entity[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('entity_tags')
      .select('is_primary, entities(*)')
      .eq('ayah_record_id', recordId)
    return (data ?? [])
      .map((row: any) => row.entities as Entity)
      .filter(Boolean)
  } catch {
    return []
  }
}

/** Articles that treat the same passage, matched on the surah. */
async function getRelatedPosts(surah: number, ayahStart: number, ayahEnd: number) {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('slug, title, excerpt, content_html')
      .eq('status', 'published')
      .limit(400)
    if (!data) return []
    const pattern = new RegExp(`\\b${surah}:(\\d{1,3})`, 'g')
    return data
      .filter((post: any) => {
        const haystack = `${post.content_html ?? ''}`
        let m
        while ((m = pattern.exec(haystack)) !== null) {
          const a = parseInt(m[1], 10)
          if (a >= ayahStart && a <= ayahEnd) return true
        }
        return false
      })
      .slice(0, 4)
      .map((p: any) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt }))
  } catch {
    return []
  }
}

/**
 * `passage_context` is a production field: some rows open with a clean
 * orienting sentence ("Continuing the Bani Israel favours narrative"), others
 * carry the pipeline's own shorthand ("Key linguistic discoveries: ... Form IV
 * causative ..."). Take the opening sentence, and only when it reads as prose.
 */
function contextLine(record: AyahRecord): string | null {
  const raw = record.passage_context?.replace(/\s+/g, ' ').trim()
  if (!raw) return null
  const first = raw.split(/(?<=[.!?])\s+/)[0] ?? ''
  if (first.length < 20 || first.length > 240) return null
  if (/key linguistic|discoveries:|\bForm [IVX]+\b/i.test(first)) return null
  return first
}

function summarise(record: AyahRecord): string {
  const base = record.translation?.replace(/\s+/g, ' ').trim() || contextLine(record) || ''
  const meta = SURAHS[record.surah_number - 1]
  const ref = ayahRef(record.surah_number, record.ayah_start, record.ayah_end)
  const prefix = `Surah ${meta?.nameEn ?? record.surah_number} ${ref} — a verse-by-verse tadabbur: `
  const room = 158 - prefix.length
  const body = base.length > room ? `${base.slice(0, room - 1).replace(/\s+\S*$/, '')}…` : base
  return `${prefix}${body}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const record = await getRecord(slug)
  if (!record) return { title: 'Not Found' }

  const meta = SURAHS[record.surah_number - 1]
  const ref = ayahRef(record.surah_number, record.ayah_start, record.ayah_end)
  const canonical = `${CANONICAL_URL}/reflections/${reflectionSlug(
    record.surah_number,
    record.ayah_start,
    record.ayah_end
  )}`
  const title = record.title
    ? `${record.title} — ${meta?.nameEn ?? ''} ${ref}`
    : `${meta?.nameEn ?? 'Quran'} ${ref}`
  const description = summarise(record)
  const ogImage = `/api/og/quote?text=${encodeURIComponent(
    (record.translation ?? record.title ?? '').slice(0, 200)
  )}&cite=${encodeURIComponent(`${meta?.nameEn ?? ''} ${ref}`)}`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonical,
      siteName: SITE_NAME,
      publishedTime: record.created_at ?? undefined,
      modifiedTime: record.updated_at ?? undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export default async function ReflectionPage({ params }: Props) {
  const { slug } = await params
  const record = await getRecord(slug)
  if (!record) notFound()

  const canonicalSlug = reflectionSlug(record.surah_number, record.ayah_start, record.ayah_end)
  const meta = SURAHS[record.surah_number - 1]
  const ref = ayahRef(record.surah_number, record.ayah_start, record.ayah_end)
  const url = `${CANONICAL_URL}/reflections/${canonicalSlug}`

  const { html, wordCount } = renderReflection(record)
  const [entities, relatedPosts] = await Promise.all([
    getEntities(record.id),
    getRelatedPosts(record.surah_number, record.ayah_start, record.ayah_end),
  ])

  const readingMinutes = Math.max(1, Math.round(wordCount / 220))
  const description = summarise(record)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: record.title ?? `${meta?.nameEn} ${ref}`,
    description,
    url,
    datePublished: record.created_at,
    dateModified: record.updated_at,
    wordCount,
    inLanguage: 'en-US',
    isBasedOn: {
      '@type': 'Book',
      name: 'The Quran',
      about: `Surah ${meta?.nameEn ?? record.surah_number} ${ref}`,
    },
    author: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: CANONICAL_URL,
      logo: { '@type': 'ImageObject', url: `${CANONICAL_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: entities.map((e) => e.name_translit).join(', '),
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.reflection-translation'] },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
      { '@type': 'ListItem', position: 2, name: 'Reflections', item: `${CANONICAL_URL}/reflections` },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${meta?.nameEn ?? ''} ${ref}`,
        item: url,
      },
    ],
  }

  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ScrollDepthTracker slug={canonicalSlug} contentType="reflection" />

      <article className="min-h-screen bg-white dark:bg-navy-dark">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="border-b border-zinc-200 px-5 pb-12 pt-10 dark:border-white/[0.05]">
          <div className="mx-auto max-w-2xl">
            <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-zinc-400 dark:text-cream/30">
              <Link href="/reflections" className="transition-colors hover:text-zinc-600 dark:hover:text-cream/50">
                Reflections
              </Link>
              <span aria-hidden>/</span>
              <Link
                href={`/surahs/${surahSlug(meta?.nameEn ?? '')}`}
                className="transition-colors hover:text-zinc-600 dark:hover:text-cream/50"
              >
                {meta?.nameEn}
              </Link>
              <span aria-hidden>/</span>
              <span className="tabular-nums text-zinc-500 dark:text-cream/50">{ref}</span>
            </nav>

            <p className="text-xs uppercase tracking-[0.2em] text-[rgba(212,175,55,0.7)]">
              Surah {meta?.nameEn} · {ref} · {meta?.place}
            </p>

            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-navy dark:text-cream sm:text-4xl">
              {record.title ?? `${meta?.nameEn} ${ref}`}
            </h1>

            {contextLine(record) && (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-cream/50">
                {contextLine(record)}
              </p>
            )}

            <p className="mt-5 text-xs text-zinc-400 dark:text-cream/25">
              {wordCount.toLocaleString()} words · ~{readingMinutes} min read
              {record.estimated_duration ? ` · ${record.estimated_duration} guided` : ''}
            </p>
          </div>
        </header>

        {/* ── The passage ────────────────────────────────────────────────── */}
        {(record.arabic_text || record.translation) && (
          <div className="border-b border-zinc-200 px-5 py-12 dark:border-white/[0.05]">
            <div className="mx-auto max-w-2xl">
              {record.arabic_text && (
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-amiri text-2xl leading-[2.4] text-navy dark:text-cream/90 sm:text-[1.75rem]"
                >
                  {record.arabic_text}
                </p>
              )}
              {record.translation && (
                <p className="reflection-translation mt-6 border-l-2 border-[rgba(201,168,76,0.3)] pl-5 text-base leading-relaxed text-zinc-600 dark:text-cream/60">
                  {record.translation}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── The reflection ─────────────────────────────────────────────── */}
        <div className="px-5 py-16">
          <div className="mx-auto max-w-2xl">
            <SelectionQuoteShare
              cite={`${meta?.nameEn} ${ref} — ${SITE_NAME}`}
              arabic={record.arabic_text ?? undefined}
            />

            <div
              className="prose-blog reflection-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <PathAttribution type="ayah" slug={`${record.surah_number}:${record.ayah_start}-${record.ayah_end}`} source="reflection-strip" />

            {/* Concepts */}
            {entities.length > 0 && (
              <section className="mt-14 border-t border-zinc-200 pt-8 dark:border-white/[0.05]">
                <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-cream/30">
                  Concepts in this passage
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entities.map((entity) => (
                    <Link
                      key={entity.slug}
                      href={`/hub/${entity.slug}`}
                      className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-[rgba(201,168,76,0.4)] hover:text-navy dark:border-white/[0.08] dark:text-cream/60 dark:hover:text-cream"
                    >
                      {entity.name_translit}
                      {entity.name_arabic && (
                        <span className="ml-1.5 font-amiri text-zinc-400 dark:text-cream/30">
                          {entity.name_arabic}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related articles */}
            {relatedPosts.length > 0 && (
              <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-white/[0.05]">
                <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-cream/30">
                  Articles on this passage
                </h2>
                <ul className="mt-4 space-y-4">
                  {relatedPosts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/posts/${post.slug}`} className="group block">
                        <p className="font-serif text-base font-semibold leading-snug text-navy transition-colors group-hover:text-[#b8953f] dark:text-cream dark:group-hover:text-[rgba(212,175,55,0.85)]">
                          {post.title}
                        </p>
                        {post.excerpt && (
                          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-cream/50">
                            {post.excerpt}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Back to the surah */}
            <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-white/[0.05]">
              <Link
                href={`/surahs/${surahSlug(meta?.nameEn ?? '')}`}
                className="text-sm text-[rgba(212,175,55,0.7)] transition-colors hover:text-[rgba(212,175,55,1)]"
              >
                ← All of Surah {meta?.nameEn}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
