import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { GLOSSARY_ENTRIES, GLOSSARY_TERMS, type GlossaryCategory } from '@/data/glossary'
import { CategoryBadge } from '@/components/glossary/GlossaryGrid'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = GLOSSARY_ENTRIES[slug]
  if (!entry) return { title: 'Not Found' }

  const pageUrl = `${CANONICAL_URL}/glossary/${slug}`
  const title = `${entry.transliteration} (${entry.term}) — ${SITE_NAME} Glossary`
  const description = entry.summary.slice(0, 160)

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

// ── Shared section heading ─────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 font-serif text-lg font-semibold text-cream/90">
      <span className="h-px flex-1 bg-gradient-to-r from-[rgba(212,175,55,0.25)] to-transparent" />
      {children}
      <span className="h-px flex-1 bg-gradient-to-l from-[rgba(212,175,55,0.25)] to-transparent" />
    </h2>
  )
}

// ── Related term card ──────────────────────────────────────────────────────────

function RelatedCard({
  slug,
  term,
  transliteration,
}: {
  slug: string
  term: string
  transliteration: string
}) {
  const meta = GLOSSARY_TERMS.find((t) => t.slug === slug)
  const hasEntry = meta?.hasFullEntry ?? false

  const card = (
    <div className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all hover:border-[rgba(212,175,55,0.2)] hover:bg-[rgba(212,175,55,0.03)]">
      <span
        className="text-2xl leading-none text-[rgba(212,175,55,0.7)]"
        style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", direction: 'rtl' }}
      >
        {term}
      </span>
      <span className="font-serif text-sm text-zinc-400 group-hover:text-zinc-300">
        {transliteration}
      </span>
    </div>
  )

  if (hasEntry) {
    return <Link href={`/glossary/${slug}`}>{card}</Link>
  }
  return <div className="cursor-default opacity-60">{card}</div>
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function GlossaryEntryPage({ params }: Props) {
  const { slug } = await params
  const entry = GLOSSARY_ENTRIES[slug]
  if (!entry) return notFound()

  const paragraphs = entry.acrossTransitions
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)

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
    url: `${CANONICAL_URL}/glossary/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-navy-dark">
        {/* ── Above the fold: Identity ──────────────────────────────────── */}
        <div className="relative overflow-hidden border-b border-white/[0.05] px-5 pb-14 pt-12 text-center">
          {/* Radial glow behind Arabic */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Back link */}
          <div className="relative mb-8">
            <Link
              href="/glossary"
              className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
            >
              ← Glossary
            </Link>
          </div>

          {/* Arabic — large, centered */}
          <div
            className="relative mb-4 leading-none text-[rgba(212,175,55,0.85)]"
            style={{
              fontFamily: "var(--font-amiri,'Amiri'),'Amiri','Scheherazade New',serif",
              fontSize: 'clamp(4rem, 15vw, 7rem)',
              direction: 'rtl',
              textShadow: '0 0 80px rgba(212,175,55,0.20)',
            }}
          >
            {entry.term}
          </div>

          {/* Transliteration */}
          <h1 className="font-serif text-2xl font-bold text-cream sm:text-3xl">
            {entry.transliteration}
          </h1>

          {/* Pronunciation */}
          <p className="mt-1.5 text-xs text-zinc-600 italic">{entry.pronunciation}</p>

          {/* Summary */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            {entry.summary}
          </p>

          {/* Quick stats bar */}
          <div className="mx-auto mt-8 flex max-w-sm flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-6 py-4">
            <div className="text-center">
              <div
                className="text-lg text-[rgba(212,175,55,0.8)]"
                style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
              >
                {entry.root.letters}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-600">Root</div>
            </div>
            <div className="h-6 w-px bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-lg font-semibold text-cream/80">{entry.occurrenceCount}</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-600">Quranic occurrences</div>
            </div>
            <div className="h-6 w-px bg-white/[0.06]" />
            <div className="text-center">
              <CategoryBadge category={entry.category as GlossaryCategory} />
            </div>
          </div>
        </div>

        {/* ── Deep content ──────────────────────────────────────────────── */}
        <div className="mx-auto max-w-2xl space-y-16 px-5 py-14">

          {/* 1. The Root */}
          <section>
            <SectionTitle>The Root</SectionTitle>
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6">
              <div className="mb-4 flex items-baseline gap-3">
                <span
                  className="text-3xl text-[rgba(212,175,55,0.8)]"
                  style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", direction: 'rtl' }}
                >
                  {entry.root.letters}
                </span>
                <span className="font-serif text-sm text-zinc-500 italic">
                  {entry.root.transliteration}
                </span>
              </div>
              <p className="mb-3 font-serif text-base font-medium text-cream/80">
                {entry.root.meaning}
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                {entry.root.elaboration}
              </p>
            </div>
          </section>

          {/* 2. In the Quran */}
          <section>
            <SectionTitle>In the Quran</SectionTitle>
            <p className="mb-6 text-xs text-zinc-600 italic">
              {entry.occurrenceNote}
            </p>
            <div className="space-y-6">
              {entry.keyAyahs.map((ayah) => (
                <div
                  key={ayah.ref}
                  className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6"
                >
                  {/* Ref badge */}
                  <div className="mb-4 inline-flex items-center rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.07)] px-3 py-0.5">
                    <span className="text-[10px] font-medium tracking-wider text-[rgba(212,175,55,0.7)]">
                      {ayah.ref}
                    </span>
                  </div>

                  {/* Arabic */}
                  <p
                    className="mb-4 text-right text-xl leading-loose text-cream/80"
                    style={{
                      fontFamily: "var(--font-amiri,'Amiri'),'Amiri','Scheherazade New',serif",
                      direction: 'rtl',
                    }}
                  >
                    {ayah.arabic}
                  </p>

                  {/* Divider */}
                  <div className="mb-4 h-px bg-white/[0.05]" />

                  {/* Translation */}
                  <p className="mb-4 text-sm leading-relaxed text-zinc-300 italic">
                    &ldquo;{ayah.translation}&rdquo;
                  </p>

                  {/* Note */}
                  <p className="text-xs leading-relaxed text-zinc-500">
                    {ayah.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. What the Scholars Said */}
          <section>
            <SectionTitle>What the Scholars Said</SectionTitle>
            <div className="space-y-5">
              {entry.scholarsSaid.map((s, i) => (
                <blockquote
                  key={i}
                  className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6"
                >
                  <p className="mb-4 text-sm leading-relaxed text-zinc-400 italic">
                    &ldquo;{s.text}&rdquo;
                  </p>
                  <footer className="text-xs text-zinc-600">
                    — {s.scholar}
                    {s.source && <span className="ml-1 italic">({s.source})</span>}
                  </footer>
                </blockquote>
              ))}

              {entry.hadith && entry.hadith.length > 0 && (
                <>
                  <p className="pt-2 text-xs font-medium tracking-wider uppercase text-zinc-700">
                    Hadith
                  </p>
                  {entry.hadith.map((h, i) => (
                    <blockquote
                      key={i}
                      className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6"
                    >
                      <p className="mb-3 text-sm leading-relaxed text-zinc-400 italic">
                        &ldquo;{h.text}&rdquo;
                      </p>
                      <footer className="text-xs text-zinc-600">{h.source}</footer>
                    </blockquote>
                  ))}
                </>
              )}
            </div>
          </section>

          {/* 4. Across Traditions */}
          <section>
            <SectionTitle>Across Traditions</SectionTitle>
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-zinc-400">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* 5. Related Terms */}
          {entry.relatedTerms.length > 0 && (
            <section>
              <SectionTitle>Related Terms</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                {entry.relatedTerms.map((t) => (
                  <RelatedCard key={t.slug} {...t} />
                ))}
              </div>
            </section>
          )}

          {/* 6. Go Deeper */}
          {entry.goDeeper.length > 0 && (
            <section>
              <SectionTitle>Go Deeper</SectionTitle>
              <p className="mb-5 text-xs text-zinc-600">
                Surah pages where this concept does significant work.
              </p>
              <div className="space-y-3">
                {entry.goDeeper.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/surahs/${d.slug}`}
                    className="group flex items-start gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-5 py-4 transition-all hover:border-[rgba(212,175,55,0.2)] hover:bg-[rgba(212,175,55,0.03)]"
                  >
                    <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(212,175,55,0.4)] transition-colors group-hover:bg-[rgba(212,175,55,0.7)]" />
                    <div>
                      <div className="font-serif text-sm font-medium text-zinc-300 group-hover:text-cream">
                        {d.surahName}
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-600">{d.note}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to glossary */}
          <div className="border-t border-white/[0.05] pt-8 text-center">
            <Link
              href="/glossary"
              className="text-sm text-zinc-600 transition-colors hover:text-[#C9A84C]"
            >
              ← Back to the Glossary
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
