import Link from 'next/link'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { SURAHS } from '@/lib/surahs'
import { reflectionSlug, ayahRef } from '@/lib/reflection-render'

export const revalidate = 3600

const TITLE = 'Ayah Reflections'
const DESCRIPTION =
  'Verse-by-verse tadabbur of the Quran — each passage read closely for its language, structure and meaning, with every Arabic claim checked against the text.'

interface Row {
  surah_number: number
  ayah_start: number
  ayah_end: number
  title: string | null
  translation: string | null
}

async function getRecords(): Promise<Row[]> {
  try {
    const supabase = await createClient()
    const rows: Row[] = []
    // Paginated: PostgREST caps an un-ranged read at 1000 rows, and this list
    // is meant to be complete.
    for (let from = 0; ; from += 500) {
      const { data } = await supabase
        .from('ayah_records')
        .select('surah_number, ayah_start, ayah_end, title, translation')
        .eq('status', 'published')
        .order('surah_number', { ascending: true })
        .order('ayah_start', { ascending: true })
        .range(from, from + 499)
      if (!data?.length) break
      rows.push(...(data as Row[]))
      if (data.length < 500) break
    }
    return rows
  } catch {
    return []
  }
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${CANONICAL_URL}/reflections` },
  // NORTH-STAR decision 4 (Jul 7, 2026): the ayah corpus stays off the public
  // web. This index is reachable by direct link only — not indexed, not in the
  // sitemap, not in the nav.
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${CANONICAL_URL}/reflections`,
    siteName: SITE_NAME,
    type: 'website',
  },
}

export default async function ReflectionsIndexPage() {
  const records = await getRecords()

  const bySurah = new Map<number, Row[]>()
  for (const record of records) {
    const list = bySurah.get(record.surah_number) ?? []
    list.push(record)
    bySurah.set(record.surah_number, list)
  }
  const surahNumbers = [...bySurah.keys()].sort((a, b) => a - b)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${CANONICAL_URL}/reflections`,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: CANONICAL_URL },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: records.length,
      itemListElement: records.slice(0, 100).map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.title ?? `${SURAHS[r.surah_number - 1]?.nameEn} ${ayahRef(r.surah_number, r.ayah_start, r.ayah_end)}`,
        url: `${CANONICAL_URL}/reflections/${reflectionSlug(r.surah_number, r.ayah_start, r.ayah_end)}`,
      })),
    },
  }

  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white dark:bg-navy-dark">
        <header className="border-b border-zinc-200 px-5 pb-12 pt-14 dark:border-white/[0.05]">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-serif text-3xl font-bold leading-tight text-navy dark:text-cream sm:text-4xl">
              {TITLE}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-cream/60">
              {DESCRIPTION}
            </p>
            <p className="mt-5 text-xs text-zinc-400 dark:text-cream/25">
              {records.length} passages across {surahNumbers.length} surahs
            </p>
          </div>
        </header>

        <div className="px-5 py-14">
          <div className="mx-auto max-w-3xl space-y-14">
            {surahNumbers.map((n) => {
              const meta = SURAHS[n - 1]
              const list = bySurah.get(n) ?? []
              return (
                <section key={n}>
                  <div className="mb-5 flex items-baseline gap-3 border-b border-zinc-200 pb-2 dark:border-white/[0.05]">
                    <h2 className="font-serif text-lg font-semibold text-navy dark:text-cream">
                      {meta?.nameEn}
                    </h2>
                    <span className="font-amiri text-base text-zinc-400 dark:text-cream/30">
                      {meta?.nameAr}
                    </span>
                    <span className="ml-auto text-xs tabular-nums text-zinc-400 dark:text-cream/25">
                      {list.length} {list.length === 1 ? 'passage' : 'passages'}
                    </span>
                  </div>

                  <ul className="space-y-5">
                    {list.map((r) => (
                      <li key={`${r.surah_number}-${r.ayah_start}-${r.ayah_end}`}>
                        <Link
                          href={`/reflections/${reflectionSlug(r.surah_number, r.ayah_start, r.ayah_end)}`}
                          className="group flex gap-4"
                        >
                          <span className="mt-0.5 shrink-0 rounded-md bg-gold-500/10 px-2 py-0.5 text-xs font-medium tabular-nums text-gold-500">
                            {ayahRef(r.surah_number, r.ayah_start, r.ayah_end)}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-serif text-base font-semibold leading-snug text-navy transition-colors group-hover:text-[#b8953f] dark:text-cream dark:group-hover:text-[rgba(212,175,55,0.85)]">
                              {r.title ?? `${meta?.nameEn} ${ayahRef(r.surah_number, r.ayah_start, r.ayah_end)}`}
                            </span>
                            {r.translation && (
                              <span className="mt-1 block line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-cream/50">
                                {r.translation}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
