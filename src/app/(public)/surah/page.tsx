import { createClient } from '@/lib/supabase/server'
import { SurahMap } from '@/components/surah/SurahMap'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import Link from 'next/link'

const pageUrl = `${CANONICAL_URL}/surah`

export const metadata: Metadata = {
  title: 'Surah Map — All 114 Surahs of the Quran | AyahGuide',
  description: 'Explore all 114 surahs of the Quran with deep tadabbur (contemplative reflection), linguistic analysis, and thematic insights. Published reflections on Al-Fatiha, Al-Maidah, Al-Mulk, and more.',
  keywords: [
    'surah', 'surahs of the Quran', 'Quran chapters', 'tadabbur', 'tafsir',
    'Quranic reflection', 'Al-Fatiha', 'Al-Mulk', 'Al-Maidah',
    'Quran study', 'Islamic reflection', 'Quran contemplation',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: `Surah Map — All 114 Surahs of the Quran | ${SITE_NAME}`,
    description: 'Explore deep tadabbur and linguistic reflections on every surah of the Quran — organized by number, revelation type (Makki/Madani), and ayah count.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: `Surah Map | ${SITE_NAME}`,
    description: 'Deep reflections on all 114 surahs of the Quran — tadabbur, linguistics, and contemplative insights.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': pageUrl,
      name: 'Surah Map — All 114 Surahs of the Quran',
      description: 'A complete, navigable index of all 114 surahs (chapters) of the Quran, with deep tadabbur (contemplative Quranic reflection) and linguistic analysis for each published chapter.',
      url: pageUrl,
      isPartOf: { '@id': CANONICAL_URL },
      about: {
        '@type': 'Thing',
        name: 'The Quran',
        description: 'The central religious text of Islam, composed of 114 surahs (chapters) revealed to the Prophet Muhammad ﷺ over 23 years.',
      },
      educationalUse: 'Quranic Study and Reflection',
      audience: {
        '@type': 'Audience',
        audienceType: 'Muslims and students of the Quran seeking deep understanding through tadabbur',
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#surah-list`,
      name: 'All 114 Surahs of the Quran',
      description: 'Complete ordered list of the 114 surahs of the Quran, from Al-Fatiha (The Opening) to An-Nas (Mankind).',
      numberOfItems: 114,
      url: pageUrl,
    },
    {
      '@type': 'DefinedTermSet',
      '@id': `${pageUrl}#definitions`,
      name: 'Quranic Reflection Terminology',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Tadabbur',
          termCode: 'تدبّر',
          description: 'Deep, sustained, contemplative reflection on the Quran — not just understanding what it says, but being transformed by it. Allah commands it directly in Surah An-Nisa (4:82): "Afala yatadabbaroona al-Quran" — Do they not reflect deeply on the Quran?',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tafsir',
          termCode: 'تفسير',
          description: 'The scholarly discipline of explaining and interpreting the Quran — drawing on Arabic language, prophetic tradition, the understanding of the companions, and rational analysis.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Surah',
          termCode: 'سورة',
          description: 'A chapter of the Quran. The Quran contains 114 surahs, ranging from Al-Baqarah (286 ayahs) to Al-Kawthar (3 ayahs). Surahs are categorized as Makki (revealed in Mecca) or Madani (revealed in Medina).',
        },
      ],
    },
    {
      '@type': 'EducationalResource',
      '@id': `${CANONICAL_URL}/guides/tafsir-tadabbur-guide.pdf`,
      name: 'A Practical Guide to Tafsir and Tadabbur',
      description: 'A comprehensive guide explaining how to read the Quran with understanding — covering the tools, lenses, and questions scholars ask, as well as how to bring contemplative reflection (tadabbur) to your own reading.',
      url: `${CANONICAL_URL}/guides/tafsir-tadabbur-guide.pdf`,
      publisher: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
      educationalUse: 'Reading Comprehension, Study Guide',
      inLanguage: 'en',
      isAccessibleForFree: true,
      fileFormat: 'application/pdf',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
        { '@type': 'ListItem', position: 2, name: 'Surah Map', item: pageUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many surahs are in the Quran?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Quran contains 114 surahs (chapters), ranging from Al-Fatiha (The Opening, 7 ayahs) to An-Nas (Mankind, 6 ayahs). The longest surah is Al-Baqarah with 286 ayahs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is tadabbur of the Quran?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tadabbur (تدبّر) is deep, sustained, contemplative reflection on the Quran — not just understanding what the text says, but being transformed by it. The word comes from the root d-b-r, meaning to look carefully at what lies behind the surface. Allah directly commands it in 4:82: "Afala yatadabbaroona al-Quran?" (Do they not reflect deeply on the Quran?)',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between Makki and Madani surahs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Makki surahs were revealed before the Prophet\'s ﷺ migration (Hijra) to Medina, typically addressing belief, the unseen, and the hereafter. Madani surahs were revealed after the Hijra, often addressing community law, social ethics, and the expansion of the Muslim community. This distinction affects both the tone and purpose of each surah.',
          },
        },
      ],
    },
  ],
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-zinc-950">
        {/* Page header */}
        <div className="mx-auto max-w-3xl px-5 pt-10 pb-5 text-center">
          {/* Breadcrumb — GEO + internal linking signal */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-1.5 text-[11px] text-zinc-600">
            <Link href="/" className="transition-colors hover:text-zinc-400">Home</Link>
            <span>/</span>
            <span className="text-zinc-500">Surah Map</span>
          </nav>

          <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl">
            The Surah Map
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            All 114 surahs of the Quran — organized by number, revelation type,
            and ayah count. Deep{' '}
            <abbr title="Contemplative Quranic reflection" className="cursor-help no-underline">
              tadabbur
            </abbr>{' '}
            reflections for each published chapter.
          </p>

          {/* Guide callout */}
          <a
            href="/guides/tafsir-tadabbur-guide.pdf"
            target="_blank"
            rel="noopener"
            className="group mt-5 inline-flex items-center gap-2.5 rounded-full border border-zinc-700/60 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-400 transition-all duration-200 hover:border-[rgba(212,175,55,0.35)] hover:bg-zinc-900 hover:text-zinc-200"
            aria-label="Download: A Practical Guide to Tafsir and Tadabbur (free PDF)"
          >
            {/* Book icon */}
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              className="shrink-0 text-[rgb(212,175,55)] opacity-80"
              aria-hidden
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>
              New to tadabbur?{' '}
              <span className="text-[rgb(212,175,55)] opacity-90 transition-opacity group-hover:opacity-100">
                Free guide: How to Read the Quran with Understanding →
              </span>
            </span>
          </a>
        </div>

        <SurahMap publishedSurahs={publishedSurahs} />

        {/* Footer context — helps GEO / semantic SEO */}
        <section
          className="mx-auto max-w-3xl border-t border-zinc-800/60 px-5 py-10"
          aria-label="About this page"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-2 font-serif text-sm font-semibold text-zinc-300">
                What is tadabbur?
              </h2>
              <p className="text-xs leading-relaxed text-zinc-500">
                Tadabbur (تدبّر) is the Quran's own word for deep, contemplative
                reflection. Allah asks directly: <em>"Afala yatadabbaroona al‑Quran?"</em>{' '}
                — Do they not reflect deeply on the Quran? (4:82). AyahGuide's
                reflections are written in that spirit — not just explaining what
                a verse says, but helping you feel what it means.
              </p>
            </div>
            <div>
              <h2 className="mb-2 font-serif text-sm font-semibold text-zinc-300">
                How to use this map
              </h2>
              <p className="text-xs leading-relaxed text-zinc-500">
                Published surahs are available now — click any to read the full
                reflection. Unpublished surahs are shown dimmed. New reflections
                are released regularly;{' '}
                <Link
                  href="/#subscribe"
                  className="text-[rgba(212,175,55,0.75)] underline-offset-2 hover:text-[rgba(212,175,55,1)] hover:underline"
                >
                  subscribe to get them in your inbox
                </Link>{' '}
                as they drop — along with a free guide to tafsir and tadabbur.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
