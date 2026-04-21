import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { GLOSSARY_ENTRIES, GLOSSARY_TERMS } from '@/data/glossary'
import { CategoryBadge } from '@/components/glossary/GlossaryGrid'
import { GlossaryEntryTabs } from '@/components/glossary/GlossaryEntryTabs'
import type { GlossaryCategory } from '@/data/glossary'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = GLOSSARY_ENTRIES[slug]
  if (!entry) return { title: 'Not Found' }

  const pageUrl = `${CANONICAL_URL}/glossary/${slug}`
  const title = `${entry.transliteration} (${entry.term}) — Glossary`
  const description = entry.summary.slice(0, 160)
  const ogImage = `/api/og/quote?text=${encodeURIComponent(description)}&cite=${encodeURIComponent(entry.transliteration)}&arabic=${encodeURIComponent(entry.term ?? '')}`

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export default async function GlossaryEntryPage({ params }: Props) {
  const { slug } = await params
  const entry = GLOSSARY_ENTRIES[slug]
  if (!entry) {
    // Check if the term exists but has no full entry yet
    const meta = GLOSSARY_TERMS.find((t) => t.slug === slug)
    if (meta) {
      return (
        <div className="min-h-screen px-5 py-16 text-center">
          <Link href="/glossary" className="mb-8 inline-block text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-600 dark:hover:text-zinc-400">
            ← Glossary
          </Link>
          <div
            className="mb-4 text-[5rem] leading-none"
            style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", color: 'rgba(212,175,55,0.7)', direction: 'rtl' }}
          >
            {meta.term}
          </div>
          <h1 className="font-serif text-2xl font-bold text-navy-dark dark:text-cream">{meta.transliteration}</h1>
          <p className="mx-auto mt-4 max-w-xs text-sm text-zinc-600 dark:text-zinc-500">
            This entry is being written. Check back soon.
          </p>
          <Link
            href="/glossary"
            className="mt-8 inline-block rounded-xl border border-[rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.06)] px-5 py-2.5 text-sm text-[#C9A84C] transition hover:bg-[rgba(212,175,55,0.12)]"
          >
            Browse all terms
          </Link>
        </div>
      )
    }
    return notFound()
  }

  const pageUrl = `${CANONICAL_URL}/glossary/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.transliteration,
    alternateName: entry.term,
    description: entry.summary,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: `${SITE_NAME} Glossary`,
      url: `${CANONICAL_URL}/glossary`,
    },
    url: pageUrl,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${CANONICAL_URL}/glossary` },
      { '@type': 'ListItem', position: 3, name: entry.transliteration, item: pageUrl },
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

      <article className="min-h-screen">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden border-b border-zinc-200 px-5 pb-10 pt-10 text-center dark:border-white/[0.05]">
          {/* Radial glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)' }}
          />

          {/* Back */}
          <div className="relative mb-6">
            <Link href="/glossary" className="text-xs text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-600 dark:hover:text-zinc-400">
              ← Glossary
            </Link>
          </div>

          {/* Arabic */}
          <div
            className="relative mb-3 leading-none text-[rgba(212,175,55,0.85)]"
            style={{
              fontFamily: "var(--font-amiri,'Amiri'),'Amiri','Scheherazade New',serif",
              fontSize: 'clamp(3.5rem, 14vw, 6rem)',
              direction: 'rtl',
              textShadow: '0 0 80px rgba(212,175,55,0.20)',
            }}
          >
            {entry.term}
          </div>

          <h1 className="font-serif text-2xl font-bold text-navy-dark sm:text-3xl dark:text-cream">
            {entry.transliteration}
          </h1>
          <p className="mt-1.5 text-xs italic text-zinc-500 dark:text-zinc-600">{entry.pronunciation}</p>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 italic">
            {entry.evocativeLine}
          </p>

          {/* Stats bar */}
          <div className="mx-auto mt-7 flex max-w-sm flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-white/[0.05] dark:bg-white/[0.02]">
            <div className="text-center">
              <div
                className="text-xl text-[rgba(212,175,55,0.8)]"
                style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
              >
                {entry.root.letters}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Root</div>
            </div>
            <div className="h-6 w-px bg-zinc-200 dark:bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-xl font-semibold text-navy-dark dark:text-cream/80">{entry.occurrenceCount}</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-600">Quranic occurrences</div>
            </div>
            <div className="h-6 w-px bg-zinc-200 dark:bg-white/[0.06]" />
            <CategoryBadge category={entry.category as GlossaryCategory} />
          </div>
        </div>

        {/* ── Tabbed deep content ───────────────────────────────────────── */}
        <GlossaryEntryTabs entry={entry} />
      </article>
    </>
  )
}
