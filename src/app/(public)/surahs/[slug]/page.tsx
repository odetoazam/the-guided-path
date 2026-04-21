import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SURAHS, surahIdentity, surahSlug, surahBySlug } from '@/lib/surahs'
import { getSurahVFX } from '@/lib/surah-vfx'
import { SurahCanvas } from '@/components/surah/SurahCanvas'
import { SurahTabs } from '@/components/surah/SurahTabs'
import { SurahActions } from '@/components/SurahActions'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const BISMILLAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'

interface Props {
  params: Promise<{ slug: string }>
}

async function getSurahPost(surahNumber: number) {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('surah_number', surahNumber)
      .eq('status', 'published')
      .single()
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const surah = surahBySlug(slug)
  if (!surah) return { title: 'Not Found' }

  const n = surah.n
  const post = await getSurahPost(n)
  const pageUrl = `${CANONICAL_URL}/surahs/${slug}`

  const title = post?.seo_title || `Surah ${surah.nameEn} (${surah.nameAr}) — Reflections & Analysis`
  const description = post?.seo_description || post?.excerpt ||
    `Deep Quranic reflection (tadabbur) on Surah ${surah.nameEn}, the ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} chapter of the Quran.`
  const fallbackOg = `/api/og/quote?text=${encodeURIComponent((post?.excerpt || description).slice(0, 200))}&cite=${encodeURIComponent(`Surah ${surah.nameEn}`)}&arabic=${encodeURIComponent(surah.nameAr)}`
  const ogImages = post?.featured_image
    ? [{ url: post.featured_image, alt: title }]
    : [{ url: fallbackOg, width: 1200, height: 630, alt: title }]

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
      publishedTime: post?.published_at || undefined,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post?.featured_image ?? fallbackOg],
    },
  }
}

async function getSurahVisualData(surahNumber: number) {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('surah_visual_data')
      .select('*')
      .eq('surah_number', surahNumber)
      .single()
    return data
  } catch {
    return null
  }
}


export default async function SurahDetailPage({ params }: Props) {
  const { slug } = await params
  const surah = surahBySlug(slug)
  if (!surah) return notFound()

  const n = surah.n
  const prev = n > 1 ? SURAHS[n - 2] : null
  const next = n < 114 ? SURAHS[n] : null
  const id = surahIdentity(n)
  const vfx = getSurahVFX(n)

  // Parallel fetches
  const [post, visualData] = await Promise.all([
    getSurahPost(n),
    getSurahVisualData(n),
  ])

  const glowColor = `hsla(${id.hue},${id.sat}%,${id.lightness}%,`
  const accentColor = `hsl(${id.hue},${id.sat}%,${id.lightness + 18}%)`
  const pageUrl = `${CANONICAL_URL}/surahs/${slug}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
      { '@type': 'ListItem', position: 2, name: 'Surahs', item: `${CANONICAL_URL}/surahs` },
      { '@type': 'ListItem', position: 3, name: `Surah ${surah.nameEn}`, item: pageUrl },
    ],
  }

  const surahOgImage = post?.featured_image ||
    `${CANONICAL_URL}/api/og/quote?text=${encodeURIComponent((post?.seo_description || post?.excerpt || `Surah ${surah.nameEn}`).slice(0, 200))}&cite=${encodeURIComponent(`Surah ${surah.nameEn}`)}&arabic=${encodeURIComponent(surah.nameAr)}`

  const articleJsonLd = post ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seo_title || post.title,
    description: (post.seo_description || post.excerpt || '').slice(0, 160),
    image: { '@type': 'ImageObject', url: surahOgImage, width: 1200, height: 630 },
    articleBody: post.content_html
      ? post.content_html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
      : '',
    url: pageUrl,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    author: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: CANONICAL_URL,
      logo: { '@type': 'ImageObject', url: `${CANONICAL_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    keywords: `Surah ${surah.nameEn}, ${surah.nameAr}, Quran, tadabbur, Quranic reflection`,
    inLanguage: 'en-US',
  } : null

  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {articleJsonLd && (
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}

      {/* Hero with canvas background */}
      <div className="relative overflow-hidden border-b border-white/[0.06]" style={{ minHeight: '480px' }}>
        <SurahCanvas vfx={vfx} />

        {/* Readability gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(9,9,11,0.45) 0%,
              rgba(9,9,11,0.15) 40%,
              rgba(9,9,11,0.35) 75%,
              rgba(9,9,11,0.85) 100%)`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-1.5 text-xs text-white/35">
              <li>
                <Link href="/" className="transition hover:text-white/60">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/surahs" className="transition hover:text-white/60">Surahs</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white/50">{surah.nameEn}</li>
            </ol>
          </nav>

          {/* Surah number */}
          <div className="mt-8 text-xs font-medium tracking-[0.18em] uppercase text-white/30">
            Surah {n}
          </div>

          {/* Arabic name */}
          <h1
            className="mt-4 leading-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]"
            style={{
              fontFamily: "var(--font-amiri), 'Scheherazade New', 'Traditional Arabic', Georgia, serif",
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              color: accentColor,
              direction: 'rtl',
              textShadow: `0 0 60px ${glowColor}0.45), 0 2px 24px rgba(0,0,0,0.7)`,
            }}
          >
            {surah.nameAr}
          </h1>

          {/* English name */}
          <div className="mt-2 font-serif text-lg text-white/60 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
            {surah.nameEn}
          </div>

          {/* Stats row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/35">
            <span>{surah.ayahs} ayahs</span>
            <span className="h-px w-4" style={{ background: `${glowColor}0.4)` }} />
            <span
              className="flex items-center gap-1.5"
              style={{
                color: surah.place === 'Makki' ? 'hsla(43,75%,65%,0.65)' : 'hsla(180,50%,65%,0.65)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: surah.place === 'Makki' ? 'hsla(43,75%,60%,0.8)' : 'hsla(180,50%,60%,0.8)',
                }}
              />
              {surah.place}
            </span>
            <span className="h-px w-4" style={{ background: `${glowColor}0.4)` }} />
            <span>Juz {surah.juz}</span>
          </div>

          {/* Bismillah — omitted for At-Tawba (9) */}
          {n !== 9 && (
            <div className="mt-10">
              <div
                className="inline-block"
                style={{
                  fontFamily: "var(--font-amiri), 'Scheherazade New', 'Traditional Arabic', Georgia, serif",
                  fontSize: '1.5rem',
                  color: `${glowColor}0.60)`,
                  direction: 'rtl',
                  letterSpacing: '0.01em',
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                }}
              >
                {BISMILLAH}
              </div>
            </div>
          )}

          {/* VFX motif label */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-px w-8" style={{ background: `${glowColor}0.3)` }} />
            <span
              className="font-serif text-[11px] tracking-[0.12em] italic"
              style={{ color: `${glowColor}0.4)` }}
            >
              {vfx.motif}
            </span>
            <span className="h-px w-8" style={{ background: `${glowColor}0.3)` }} />
          </div>
        </div>
      </div>

      {/* Save / explored tracking */}
      <div className="mx-auto max-w-3xl px-5 pt-5 pb-1">
        <SurahActions slug={slug} />
      </div>

      {/* Tabbed content */}
      <SurahTabs
        visualData={visualData}
        post={post}
        surahNumber={n}
        surahName={surah.nameEn}
        surahSlug={slug}
        glowColor={glowColor}
        pageUrl={pageUrl}
      />

      {/* Prev / Next navigation */}
      <div className="mx-auto max-w-3xl border-t border-white/[0.06] px-5 py-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            {prev ? (
              <Link
                href={`/surahs/${surahSlug(prev.nameEn)}`}
                className="group flex flex-col gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02]
                           p-4 transition hover:border-white/10 hover:bg-white/[0.04]"
              >
                <span className="flex items-center gap-1 text-[10px] text-white/30">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Previous
                </span>
                <span
                  className="font-serif text-sm transition group-hover:text-white/80"
                  style={{
                    fontFamily: "var(--font-amiri), Georgia, serif",
                    direction: 'rtl',
                    color: `hsl(${surahIdentity(prev.n).hue},${surahIdentity(prev.n).sat}%,${surahIdentity(prev.n).lightness + 16}%)`,
                  }}
                >
                  {prev.nameAr}
                </span>
                <span className="text-[11px] text-white/35">{prev.nameEn}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className="flex justify-end">
            {next ? (
              <Link
                href={`/surahs/${surahSlug(next.nameEn)}`}
                className="group flex flex-col items-end gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02]
                           p-4 transition hover:border-white/10 hover:bg-white/[0.04] w-full text-right"
              >
                <span className="flex items-center gap-1 text-[10px] text-white/30">
                  Next
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
                <span
                  className="font-serif text-sm transition group-hover:text-white/80"
                  style={{
                    fontFamily: "var(--font-amiri), Georgia, serif",
                    direction: 'rtl',
                    color: `hsl(${surahIdentity(next.n).hue},${surahIdentity(next.n).sat}%,${surahIdentity(next.n).lightness + 16}%)`,
                  }}
                >
                  {next.nameAr}
                </span>
                <span className="text-[11px] text-white/35">{next.nameEn}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
