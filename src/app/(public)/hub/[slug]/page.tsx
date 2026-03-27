import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { AyahCard } from '@/components/AyahCard'
import type { Entity, EntityCategory } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

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

/* ── Data fetching ─────────────────────────────────────────────────────────── */

async function getHubData(slug: string) {
  const supabase = await createClient()

  // Fetch entity
  const { data: entity } = await supabase
    .from('entities')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!entity) return null

  // Fetch primary-tagged published posts
  const { data: postTags } = await supabase
    .from('entity_tags')
    .select('post_id, posts!inner(id, title, slug, type, excerpt, surah_number, published_at)')
    .eq('entity_id', entity.id)
    .eq('is_primary', true)
    .not('post_id', 'is', null)

  // Fetch primary-tagged ayah records
  const { data: ayahTags } = await supabase
    .from('entity_tags')
    .select('ayah_record_id, ayah_records!inner(id, surah_number, ayah_start, ayah_end, arabic_text, translation, title, layer_a)')
    .eq('entity_id', entity.id)
    .eq('is_primary', true)
    .not('ayah_record_id', 'is', null)

  // Fetch co-occurring entities: other entities that share the same posts/ayah_records
  const taggedPostIds = (postTags ?? []).map((t: any) => t.post_id).filter(Boolean)
  const taggedAyahIds = (ayahTags ?? []).map((t: any) => t.ayah_record_id).filter(Boolean)

  let connections: Entity[] = []
  if (taggedPostIds.length > 0 || taggedAyahIds.length > 0) {
    // Get entities that share at least one post or ayah record with this entity
    let query = supabase
      .from('entity_tags')
      .select('entity_id, entities!inner(id, slug, name_arabic, name_translit, category, one_line)')
      .neq('entity_id', entity.id)
      .eq('is_primary', true)

    if (taggedPostIds.length > 0 && taggedAyahIds.length > 0) {
      query = query.or(`post_id.in.(${taggedPostIds.join(',')}),ayah_record_id.in.(${taggedAyahIds.join(',')})`)
    } else if (taggedPostIds.length > 0) {
      query = query.in('post_id', taggedPostIds)
    } else {
      query = query.in('ayah_record_id', taggedAyahIds)
    }

    const { data: connectionTags } = await query

    // Deduplicate and count co-occurrences
    const entityMap = new Map<string, { entity: any; count: number }>()
    for (const tag of connectionTags ?? []) {
      const e = (tag as any).entities
      if (!e) continue
      const existing = entityMap.get(e.id)
      if (existing) {
        existing.count++
      } else {
        entityMap.set(e.id, { entity: e, count: 1 })
      }
    }
    connections = Array.from(entityMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 12)
      .map((v) => v.entity)
  }

  // Filter posts to only published
  const posts = (postTags ?? [])
    .map((t: any) => t.posts)
    .filter((p: any) => p && p.published_at)

  const ayahRecords = (ayahTags ?? [])
    .map((t: any) => t.ayah_records)
    .filter(Boolean)

  return { entity: entity as Entity, posts, ayahRecords, connections }
}

/* ── Metadata ──────────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await getHubData(slug)
  if (!data) return { title: 'Not Found' }

  const { entity } = data
  const pageUrl = `${CANONICAL_URL}/hub/${slug}`
  const title = `${entity.name_translit} (${entity.name_arabic}) — ${SITE_NAME}`
  const description = entity.one_line

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: { title, description, type: 'article', url: pageUrl, siteName: SITE_NAME },
    twitter: { card: 'summary', title, description },
  }
}

/* ── Page component ────────────────────────────────────────────────────────── */

export default async function HubPage({ params }: Props) {
  const { slug } = await params
  const data = await getHubData(slug)
  if (!data) return notFound()

  const { entity, posts, ayahRecords, connections } = data

  return (
    <div className="min-h-screen bg-white dark:bg-navy-dark text-navy dark:text-cream">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-zinc-200 px-5 pb-12 pt-14 text-center dark:border-white/[0.05]">
        {/* Radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-xl">
          {/* Category badge */}
          <div className="mb-5 flex justify-center">
            <span
              className={`inline-block rounded-full border px-3 py-1 text-[10px] font-medium tracking-widest uppercase ${CATEGORY_STYLES[entity.category]}`}
            >
              {CATEGORY_LABELS[entity.category]}
            </span>
          </div>

          {/* Arabic name */}
          <div
            className="mb-3 leading-none text-[rgba(201,168,76,0.85)]"
            style={{
              fontFamily: "var(--font-amiri,'Amiri'),'Scheherazade New',serif",
              fontSize: 'clamp(3.5rem, 14vw, 6rem)',
              direction: 'rtl',
              textShadow: '0 0 80px rgba(201,168,76,0.20)',
            }}
          >
            {entity.name_arabic}
          </div>

          {/* Transliteration */}
          <h1 className="font-serif text-2xl font-bold text-navy-dark sm:text-3xl dark:text-cream">
            {entity.name_translit}
          </h1>

          {/* Pronunciation */}
          {entity.pronunciation && (
            <p className="mt-1.5 text-xs italic text-zinc-500 dark:text-zinc-600">
              {entity.pronunciation}
            </p>
          )}

          {/* One-line */}
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed italic text-zinc-600 dark:text-zinc-400">
            {entity.one_line}
          </p>

          {/* Stats bar */}
          <div className="mx-auto mt-7 flex max-w-sm flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-white/[0.05] dark:bg-white/[0.02]">
            {entity.root_letters && (
              <>
                <div className="text-center">
                  <div
                    className="text-xl text-[rgba(201,168,76,0.8)]"
                    style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
                  >
                    {entity.root_letters}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Root</div>
                </div>
                {entity.root_meaning && (
                  <>
                    <div className="h-6 w-px bg-zinc-200 dark:bg-white/[0.06]" />
                    <div className="text-center">
                      <div className="text-sm font-medium text-navy-dark dark:text-cream/80">{entity.root_meaning}</div>
                      <div className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Meaning</div>
                    </div>
                  </>
                )}
              </>
            )}
            {entity.occurrence_count && (
              <>
                <div className="h-6 w-px bg-zinc-200 dark:bg-white/[0.06]" />
                <div className="text-center">
                  <div className="text-xl font-semibold text-navy-dark dark:text-cream/80">{entity.occurrence_count}</div>
                  <div className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Occurrences</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Synthesis placeholder ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-5 pt-10">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-8 py-10 text-center dark:border-white/[0.05] dark:bg-white/[0.015]">
          <p className="text-sm text-zinc-400 dark:text-zinc-600">
            A synthesized overview will appear here as content grows.
          </p>
        </div>
      </div>

      {/* ── Tabbed content ─────────────────────────────────────────────────── */}
      <HubTabs
        posts={posts}
        ayahRecords={ayahRecords}
        connections={connections}
        entitySlug={slug}
      />
    </div>
  )
}

/* ── Tabs (client-side interactivity) ──────────────────────────────────────── */

function HubTabs({
  posts,
  ayahRecords,
  connections,
  entitySlug,
}: {
  posts: any[]
  ayahRecords: any[]
  connections: any[]
  entitySlug: string
}) {
  // Server component — render all tabs with anchor-based tab switching via CSS
  // For simplicity, render all three sections vertically with clear section headers
  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-8">
      {/* ── Articles ────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-serif text-lg font-bold text-navy-dark dark:text-cream">
            Articles
          </h2>
          <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-xs font-medium text-gold-500">
            {posts.length}
          </span>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={post.type === 'surah' && post.surah_number ? `/surahs/${post.slug}` : `/posts/${post.slug}`}
                className="group block rounded-xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-gold-500/30 hover:bg-gold-500/[0.03] dark:border-white/[0.05] dark:bg-white/[0.015] dark:hover:border-gold-500/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-base font-semibold text-navy-dark group-hover:text-gold-600 dark:text-cream dark:group-hover:text-gold-400">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-1.5 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  {post.surah_number && (
                    <span className="shrink-0 rounded-lg bg-gold-500/10 px-2 py-1 text-xs font-medium text-gold-500">
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
      </section>

      {/* ── Ayah Records ────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-serif text-lg font-bold text-navy-dark dark:text-cream">
            Ayah Records
          </h2>
          <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-xs font-medium text-gold-500">
            {ayahRecords.length}
          </span>
        </div>

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
      </section>

      {/* ── Connections ─────────────────────────────────────────────────── */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-serif text-lg font-bold text-navy-dark dark:text-cream">
            Connections
          </h2>
          <span className="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-xs font-medium text-gold-500">
            {connections.length}
          </span>
        </div>

        {connections.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {connections.map((e: any) => (
              <Link
                key={e.id}
                href={`/hub/${e.slug}`}
                className="group flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 transition hover:border-gold-500/30 hover:bg-gold-500/[0.03] dark:border-white/[0.05] dark:bg-white/[0.015] dark:hover:border-gold-500/20"
              >
                <span
                  className="text-lg text-[rgba(201,168,76,0.7)]"
                  style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", direction: 'rtl' }}
                >
                  {e.name_arabic}
                </span>
                <span className="text-sm font-medium text-navy-dark group-hover:text-gold-600 dark:text-cream/80 dark:group-hover:text-gold-400">
                  {e.name_translit}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400 dark:text-zinc-600">
            No connections discovered yet.
          </p>
        )}
      </section>
    </div>
  )
}
