import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { SURAHS, surahBySlug, surahSlug } from '@/lib/surahs'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const surah = surahBySlug(slug)
  if (!surah) return { title: 'Not Found' }

  const pageUrl = `${CANONICAL_URL}/surahs/${slug}/overview`
  const title = `Surah ${surah.nameEn} — Visual Overview | ${SITE_NAME}`
  const description = `A bird's-eye view of Surah ${surah.nameEn} (${surah.nameAr}): structure, themes, and personality before you read the deep analysis.`

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: { title, description, type: 'article', url: pageUrl, siteName: SITE_NAME },
    twitter: { card: 'summary', title, description },
  }
}

// Generate static params for all 114 surahs
export async function generateStaticParams() {
  return SURAHS.map((s) => ({ slug: surahSlug(s.nameEn) }))
}

// Dynamic import map for all 114 visual pages
function loadVisualPage(surahNumber: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loaders: Record<number, () => Promise<any>> = {}
  for (let i = 1; i <= 114; i++) {
    loaders[i] = () => import(`@/data/visual/surah-${i}`)
  }
  return loaders[surahNumber]
    ? dynamic(loaders[surahNumber], { ssr: true })
    : null
}

export default async function SurahOverviewPage({ params }: Props) {
  const { slug } = await params
  const surah = surahBySlug(slug)
  if (!surah) return notFound()

  const VisualPage = loadVisualPage(surah.n)
  if (!VisualPage) return notFound()

  // Prev / Next surahs
  const prev = surah.n > 1 ? SURAHS[surah.n - 2] : null
  const next = surah.n < 114 ? SURAHS[surah.n] : null

  return (
    <>
      {/* The visual page renders itself (dark bg, gold accents) */}
      <VisualPage />

      {/* Navigation footer — inside the dark theme */}
      <div className="bg-navy-dark px-4 pb-12">
        <div className="mx-auto max-w-2xl">
          {/* Prev / Next */}
          <div className="flex items-stretch gap-3 mb-6">
            {prev ? (
              <Link
                href={`/surahs/${surahSlug(prev.nameEn)}/overview`}
                className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-gold-500/20 hover:bg-white/[0.04]"
              >
                <div className="text-[10px] uppercase tracking-wider text-cream-muted/50 mb-1">← Previous</div>
                <div className="font-serif text-sm text-cream">{prev.nameEn}</div>
                <div className="text-xs text-cream-muted/40 font-amiri">{prev.nameAr}</div>
              </Link>
            ) : <div className="flex-1" />}

            {next ? (
              <Link
                href={`/surahs/${surahSlug(next.nameEn)}/overview`}
                className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-right transition-all hover:border-gold-500/20 hover:bg-white/[0.04]"
              >
                <div className="text-[10px] uppercase tracking-wider text-cream-muted/50 mb-1">Next →</div>
                <div className="font-serif text-sm text-cream">{next.nameEn}</div>
                <div className="text-xs text-cream-muted/40 font-amiri">{next.nameAr}</div>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          {/* Back to index */}
          <div className="text-center">
            <Link
              href="/surahs"
              className="text-sm text-cream-muted/50 transition-colors hover:text-gold-500"
            >
              ← All Surahs
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
