import { createClient } from '@/lib/supabase/server'
import { SurahMap } from '@/components/surah/SurahMap'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { SURAHS, surahSlug } from '@/lib/surahs'

const pageUrl = `${CANONICAL_URL}/surahs`
const DESCRIPTION = '114 chapters. Each one a complete sign pointing toward the Divine. Begin anywhere — or begin at the beginning.'

export const metadata: Metadata = {
  title: 'Surah Map — All 114 Surahs of the Quran',
  description: DESCRIPTION,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Surah Map | ${SITE_NAME}`,
    description: DESCRIPTION,
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: `Surah Map | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
}

async function getPublishedSurahs(): Promise<number[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('surah_number')
      .not('surah_number', 'is', null)
      .eq('status', 'published')
    return (data || []).map((row: { surah_number: number }) => row.surah_number)
  } catch {
    return []
  }
}

export default async function SurahsPage() {
  const publishedSurahs = await getPublishedSurahs()

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'All 114 Surahs of the Quran',
    description: DESCRIPTION,
    url: pageUrl,
    numberOfItems: 114,
    itemListElement: SURAHS.map((surah, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${CANONICAL_URL}/surahs/${surahSlug(surah.nameEn)}`,
      name: `Surah ${surah.nameEn} (${surah.nameAr})`,
    })),
  }

  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="min-h-screen bg-navy-dark">
        {/* Page header */}
        <div className="mx-auto max-w-3xl px-5 pt-10 pb-6 text-center">
          <h1 className="font-serif text-2xl font-bold text-cream sm:text-3xl">
            The Surah Map
          </h1>
          <p className="mt-2 text-sm text-cream/40">
            114 chapters. Each one a complete sign. Begin anywhere — or begin at the beginning.
          </p>
        </div>

        <SurahMap publishedSurahs={publishedSurahs} />
      </div>
    </>
  )
}
