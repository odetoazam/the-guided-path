import { createClient } from '@/lib/supabase/server'
import { SurahMap } from '@/components/surah/SurahMap'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/surahs`

export const metadata: Metadata = {
  title: 'Surah Map — All 114 Surahs of the Quran',
  description: 'Explore all 114 surahs of the Quran with deep reflections (tadabbur), linguistic analysis, and contemplative insights on each chapter.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `Surah Map | ${SITE_NAME}`,
    description: 'Explore all 114 surahs of the Quran with deep reflections and contemplative insights.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: `Surah Map | ${SITE_NAME}`,
    description: 'Explore all 114 surahs of the Quran with deep reflections and contemplative insights.',
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

  return (
    <div className="min-h-screen bg-navy-dark">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-5 pt-10 pb-6 text-center">
        <h1 className="font-serif text-2xl font-bold text-cream sm:text-3xl">
          The Surah Map
        </h1>
        <p className="mt-2 text-sm text-cream/40">
          All 114 surahs of the Quran — explore reflections on each chapter
        </p>
      </div>

      <SurahMap publishedSurahs={publishedSurahs} />
    </div>
  )
}
