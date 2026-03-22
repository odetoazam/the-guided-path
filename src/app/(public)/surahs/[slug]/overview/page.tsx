import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { surahBySlug } from '@/lib/surahs'

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
    openGraph: {
      title,
      description,
      type: 'article',
      url: pageUrl,
      siteName: SITE_NAME,
    },
    twitter: { card: 'summary', title, description },
  }
}

export default async function SurahOverviewPage({ params }: Props) {
  const { slug } = await params
  const surah = surahBySlug(slug)
  if (!surah) return notFound()

  return (
    <div className="min-h-screen bg-navy-dark px-5 py-16 text-center">
      <p className="mb-3 text-xs font-medium tracking-[0.22em] uppercase text-[rgba(212,175,55,0.5)]">
        Visual Overview
      </p>

      <div
        className="mb-4 leading-none text-[rgba(212,175,55,0.75)]"
        style={{
          fontFamily: "var(--font-amiri,'Amiri'),'Amiri','Scheherazade New',serif",
          fontSize: 'clamp(3rem, 12vw, 5rem)',
          direction: 'rtl',
        }}
      >
        {surah.nameAr}
      </div>

      <h1 className="font-serif text-2xl font-bold text-cream sm:text-3xl">
        Surah {surah.nameEn}
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
        The visual architecture page for this surah is being crafted. Check back soon.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href={`/surahs/${slug}`}
          className="inline-flex items-center gap-2 rounded-xl border border-[rgba(212,175,55,0.25)] bg-[rgba(212,175,55,0.08)] px-5 py-2.5 text-sm font-medium text-[#C9A84C] transition-all hover:bg-[rgba(212,175,55,0.14)]"
        >
          Read the full reflection →
        </Link>
        <Link
          href="/surahs"
          className="text-sm text-zinc-600 transition-colors hover:text-zinc-400"
        >
          ← All Surahs
        </Link>
      </div>
    </div>
  )
}
