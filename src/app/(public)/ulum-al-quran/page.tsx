import type { Metadata } from 'next'
import Link from 'next/link'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import {
  SCIENCES,
  SCALE_META,
  LENS_QUESTIONS,
  FAQ_ITEMS,
  type ScaleLevel,
  type DifficultyTier,
  type QuranicScience,
} from '@/data/ulum-al-quran'

const pageUrl = `${CANONICAL_URL}/ulum-al-quran`

export const metadata: Metadata = {
  title: 'Ulum al-Quran: The Sciences Behind the Quran — A Visual Taxonomy | AyahGuide',
  description:
    'A visual guide to 18 Quranic sciences organized by scale — word, verse, surah, and cross-cutting — with live ayah examples, difficulty tiers, and deep links to applied reflections.',
  keywords: [
    'ulum al-quran', 'sciences of the Quran', 'Quranic sciences',
    'tafsir', 'balaghah', 'tajwid', "i'jaz", 'nazm', 'sarf', 'nahw',
    'Quran linguistics', 'Arabic rhetoric Quran', 'Quranic studies',
    'makki madani', 'nasikh mansukh', "qira'at", 'muhkamat mutashabihat',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Ulum al-Quran: The Sciences Behind the Quran | AyahGuide',
    description:
      'A visual taxonomy of 18 Quranic sciences — organized by scale, with live ayah examples and difficulty tiers.',
    type: 'article',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ulum al-Quran: The Sciences Behind the Quran | AyahGuide',
    description: '18 Quranic sciences organized by scale, with live examples from 114 surah reflections.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': pageUrl,
      headline: 'Ulum al-Quran: The Sciences Behind the Quran',
      description:
        'A visual taxonomy of 18 Quranic sciences organized by scale — word, verse, surah, and cross-cutting — with live ayah examples.',
      url: pageUrl,
      author: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: CANONICAL_URL,
        logo: { '@type': 'ImageObject', url: `${CANONICAL_URL}/logo.png` },
      },
      isPartOf: { '@id': CANONICAL_URL },
      articleSection: 'Quranic Sciences',
      educationalUse: 'Reading Comprehension, Self-Study',
      audience: { '@type': 'Audience', audienceType: 'Students of Quranic sciences' },
      inLanguage: 'en',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
        { '@type': 'ListItem', position: 2, name: 'Sciences of the Quran', item: pageUrl },
      ],
    },
    {
      '@type': 'DefinedTermSet',
      name: 'Quranic Sciences Glossary',
      url: `${pageUrl}#scale-map`,
      hasDefinedTerm: SCIENCES.map((s) => ({
        '@type': 'DefinedTerm',
        name: s.transliteration,
        termCode: s.arabic,
        description: s.tagline,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const SCALE_ORDER: ScaleLevel[] = ['word', 'verse', 'surah', 'cross-cutting']

const SCALE_COLORS: Record<ScaleLevel, { border: string; bg: string; text: string; light: string }> = {
  word: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/5',
    text: 'text-amber-600 dark:text-amber-400',
    light: 'bg-amber-500/10',
  },
  verse: {
    border: 'border-violet-500/40',
    bg: 'bg-violet-500/5',
    text: 'text-violet-600 dark:text-violet-400',
    light: 'bg-violet-500/10',
  },
  surah: {
    border: 'border-teal-500/40',
    bg: 'bg-teal-500/5',
    text: 'text-teal-600 dark:text-teal-400',
    light: 'bg-teal-500/10',
  },
  'cross-cutting': {
    border: 'border-indigo-500/40',
    bg: 'bg-indigo-500/5',
    text: 'text-indigo-600 dark:text-indigo-400',
    light: 'bg-indigo-500/10',
  },
}

const DIFFICULTY_STYLES: Record<DifficultyTier, { bg: string; text: string; label: string }> = {
  'start-here': {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    text: 'text-emerald-700 dark:text-emerald-400',
    label: 'Start Here',
  },
  'go-deeper': {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-700 dark:text-amber-400',
    label: 'Go Deeper',
  },
  advanced: {
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    text: 'text-rose-700 dark:text-rose-400',
    label: 'Advanced',
  },
}

// ── Inline Components ─────────────────────────────────────────────────────────

function DifficultyBadge({ tier }: { tier: DifficultyTier }) {
  const s = DIFFICULTY_STYLES[tier]
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  )
}

function ScaleHeader({ scale }: { scale: ScaleLevel }) {
  const meta = SCALE_META[scale]
  const colors = SCALE_COLORS[scale]
  const sciences = SCIENCES.filter((s) => s.scale === scale)

  return (
    <div className={`mb-8 mt-16 border-l-4 ${colors.border} ${colors.bg} -mx-5 px-5 py-6 sm:rounded-lg sm:mx-0 sm:px-6`}>
      <div className="flex flex-wrap items-baseline gap-2 mb-1">
        <span className="font-amiri text-xl text-[rgba(212,175,55,0.85)]">{meta.arabic}</span>
        <span className="text-xs italic text-zinc-500 dark:text-zinc-400">{meta.transliteration}</span>
      </div>
      <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">{meta.english}</h2>
      <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{meta.subtitle}</p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{meta.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {sciences.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${DIFFICULTY_STYLES[s.difficulty].bg} ${DIFFICULTY_STYLES[s.difficulty].text} hover:opacity-80`}>
            {s.transliteration}
          </a>
        ))}
      </div>
    </div>
  )
}

function ScienceCard({ science }: { science: QuranicScience }) {
  const { ayahExample } = science

  return (
    <div id={science.id} className="scroll-mt-24 space-y-4">
      {/* Heading */}
      <div className="border-l-2 border-[rgba(212,175,55,0.4)] pl-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-amiri text-xl text-[rgba(212,175,55,0.85)]">{science.arabic}</span>
          <span className="text-xs italic text-zinc-500 dark:text-zinc-400">{science.transliteration}</span>
          <DifficultyBadge tier={science.difficulty} />
        </div>
        <h3 className="mt-0.5 font-serif text-base font-semibold text-zinc-900 dark:text-white">{science.english}</h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{science.tagline}</p>
      </div>

      {/* Description */}
      <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {science.description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Ayah Example */}
      <div className="rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-900/30 p-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-600">
          See it in action — {ayahExample.ref}
        </p>
        <blockquote className="border-l-2 border-[rgba(212,175,55,0.35)] pl-4">
          <p className="font-amiri text-lg leading-loose text-[rgba(212,175,55,0.8)]" dir="rtl">
            {ayahExample.arabic}
          </p>
          <p className="mt-1 text-sm italic text-zinc-500 dark:text-zinc-400">
            &ldquo;{ayahExample.translation}&rdquo;
          </p>
        </blockquote>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {ayahExample.analysis}
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 text-xs">
        {ayahExample.surahLink && (
          <Link
            href={ayahExample.surahLink}
            className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline"
          >
            See it applied in {ayahExample.surahName} &rarr;
          </Link>
        )}
        {science.glossarySlug && (
          <Link
            href={`/glossary/${science.glossarySlug}`}
            className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline"
          >
            In the Glossary &rarr;
          </Link>
        )}
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function UlumAlQuranPage() {
  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white dark:bg-navy-dark">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-5 pb-10 pt-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-600">
            <Link href="/" className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-400">Home</Link>
            <span>/</span>
            <span className="text-zinc-500 dark:text-zinc-400">Sciences of the Quran</span>
          </nav>

          <div className="text-center">
            <div className="mb-4 font-amiri text-2xl text-[rgba(212,175,55,0.7)]">
              بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl sm:leading-snug">
              Ulum al-Quran<br className="hidden sm:block" />
              <span className="text-zinc-500 dark:text-zinc-400 text-lg sm:text-xl font-normal">The Sciences Behind the Quran</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              A visual taxonomy of <strong className="font-medium text-zinc-700 dark:text-zinc-300">18 disciplines</strong> that
              scholars have developed over 1,400 years to study the Quran — organized by{' '}
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">scale</strong>, with live ayah examples
              and difficulty tiers.
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-600">
              Not a textbook. A map — with links to the territory.
            </p>
          </div>

          {/* Table of Contents */}
          <nav aria-label="Table of contents" className="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/50 px-5 py-4">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-600">In this guide</p>
            <ol className="space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="#scale-map" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">The Scale Map — All 18 Sciences at a Glance</a></li>
              {SCALE_ORDER.map((scale) => (
                <li key={scale}>
                  <a href={`#scale-${scale}`} className="hover:text-[rgba(212,175,55,0.9)] transition-colors">
                    {SCALE_META[scale].english} — {SCIENCES.filter((s) => s.scale === scale).map((s) => s.transliteration).join(', ')}
                  </a>
                </li>
              ))}
              <li><a href="#which-lens" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Which Lens Do I Need?</a></li>
              <li><a href="#faq" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Frequently Asked Questions</a></li>
            </ol>
          </nav>
        </div>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-5 pb-16">

          {/* ── Introduction ── */}
          <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-900/30 p-6 mb-6">
            <h2 className="mb-3 font-serif text-base font-semibold text-zinc-900 dark:text-white">
              What Is Ulum al-Quran?
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Ulum al-Quran (&ldquo;Sciences of the Quran&rdquo;) is the umbrella term for every scholarly
              discipline developed to study, preserve, recite, and interpret the Quran. These sciences emerged
              in the first centuries of Islam and have been refined for over a millennium. They range from
              the accessible (knowing when a surah was revealed) to the highly technical (analyzing
              morphological verb forms for theological implications).
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              This page organizes 18 core sciences by <strong className="text-zinc-700 dark:text-zinc-300">scale</strong> —
              what level of the Quran they operate on. Some examine individual <em>words</em>. Some examine
              how <em>verses</em> are constructed. Some examine the architecture of entire <em>surahs</em>.
              And some cut across all levels. Each science includes a live ayah example from our{' '}
              <Link href="/surahs" className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                surah reflections
              </Link>{' '}
              so you can see it in action — not just read about it.
            </p>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
              Looking for a practical &ldquo;how to read&rdquo; guide instead?{' '}
              <Link href="/understanding-quran" className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                Start with Understanding the Quran
              </Link>.
            </p>
          </div>

          {/* ── Visual Scale Map ── */}
          <section id="scale-map" aria-labelledby="scale-map-heading" className="mb-10">
            <h2 id="scale-map-heading" className="sr-only">Scale Map</h2>

            {/* Cross-cutting (top bar) */}
            <div className={`rounded-t-xl border border-b-0 ${SCALE_COLORS['cross-cutting'].border} ${SCALE_COLORS['cross-cutting'].bg} px-4 py-3`}>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${SCALE_COLORS['cross-cutting'].text} mb-2`}>
                Cross-Cutting Sciences
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SCIENCES.filter((s) => s.scale === 'cross-cutting').map((s) => (
                  <a key={s.id} href={`#${s.id}`} className={`rounded-full border border-zinc-200/60 dark:border-zinc-700/60 px-2.5 py-1 text-[10px] font-medium transition-all hover:scale-105 ${DIFFICULTY_STYLES[s.difficulty].bg} ${DIFFICULTY_STYLES[s.difficulty].text}`}>
                    {s.transliteration}
                  </a>
                ))}
              </div>
            </div>

            {/* Middle row: Surah + Verse */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border-x border-zinc-200 dark:border-zinc-800">
              <div className={`border-b sm:border-b-0 sm:border-r border-zinc-200 dark:border-zinc-800 ${SCALE_COLORS.surah.bg} px-4 py-3`}>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${SCALE_COLORS.surah.text} mb-2`}>
                  Surah Level
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SCIENCES.filter((s) => s.scale === 'surah').map((s) => (
                    <a key={s.id} href={`#${s.id}`} className={`rounded-full border border-zinc-200/60 dark:border-zinc-700/60 px-2.5 py-1 text-[10px] font-medium transition-all hover:scale-105 ${DIFFICULTY_STYLES[s.difficulty].bg} ${DIFFICULTY_STYLES[s.difficulty].text}`}>
                      {s.transliteration}
                    </a>
                  ))}
                </div>
              </div>
              <div className={`${SCALE_COLORS.verse.bg} px-4 py-3`}>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${SCALE_COLORS.verse.text} mb-2`}>
                  Verse Level
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SCIENCES.filter((s) => s.scale === 'verse').map((s) => (
                    <a key={s.id} href={`#${s.id}`} className={`rounded-full border border-zinc-200/60 dark:border-zinc-700/60 px-2.5 py-1 text-[10px] font-medium transition-all hover:scale-105 ${DIFFICULTY_STYLES[s.difficulty].bg} ${DIFFICULTY_STYLES[s.difficulty].text}`}>
                      {s.transliteration}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Word level (bottom bar) */}
            <div className={`rounded-b-xl border border-t-0 ${SCALE_COLORS.word.border} ${SCALE_COLORS.word.bg} px-4 py-3`}>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${SCALE_COLORS.word.text} mb-2`}>
                Word Level
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SCIENCES.filter((s) => s.scale === 'word').map((s) => (
                  <a key={s.id} href={`#${s.id}`} className={`rounded-full border border-zinc-200/60 dark:border-zinc-700/60 px-2.5 py-1 text-[10px] font-medium transition-all hover:scale-105 ${DIFFICULTY_STYLES[s.difficulty].bg} ${DIFFICULTY_STYLES[s.difficulty].text}`}>
                    {s.transliteration}
                  </a>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[10px] text-zinc-500 dark:text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500/60" />
                Start Here
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-500/60" />
                Go Deeper
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-rose-500/60" />
                Advanced
              </span>
            </div>
          </section>

          {/* ── Scale Sections ── */}
          {SCALE_ORDER.map((scale) => {
            const sciences = SCIENCES.filter((s) => s.scale === scale)
            return (
              <section key={scale} id={`scale-${scale}`} aria-label={SCALE_META[scale].english}>
                <ScaleHeader scale={scale} />
                <div className="space-y-12">
                  {sciences.map((science) => (
                    <ScienceCard key={science.id} science={science} />
                  ))}
                </div>

                {/* Mid-section CTA after verse level */}
                {scale === 'verse' && (
                  <div className="my-10 rounded-xl border border-[rgba(212,175,55,0.15)] bg-[rgba(212,175,55,0.04)] px-6 py-5">
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      <strong className="text-zinc-700 dark:text-zinc-300">Want to see these sciences in action?</strong>{' '}
                      Our reflection on{' '}
                      <Link href="/surahs/al-kawthar/overview" className="text-[rgba(212,175,55,0.8)] hover:text-[rgba(212,175,55,1)] transition-colors underline underline-offset-2">
                        Surah Al-Kawthar
                      </Link>{' '}
                      demonstrates morphology, rhetoric, and i&apos;jaz in three verses and ten words — the shortest surah in the Quran,
                      and one of its most compressed miracles.
                    </p>
                  </div>
                )}
              </section>
            )
          })}

          {/* ── Which Lens Do I Need? ── */}
          <section id="which-lens" className="mt-16" aria-labelledby="which-lens-heading">
            <div className="mb-8 border-t border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 -mx-5 px-5 py-6 sm:rounded-lg sm:mx-0 sm:px-6">
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[rgba(212,175,55,0.6)]">Practical Guide</p>
              <h2 id="which-lens-heading" className="font-serif text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
                Which Lens Do I Need?
              </h2>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                Start with a question you actually have — and let it lead you to the right science.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {LENS_QUESTIONS.map((lq, i) => {
                const sciences = lq.scienceIds
                  .map((id) => SCIENCES.find((s) => s.id === id))
                  .filter(Boolean) as QuranicScience[]

                return (
                  <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/30 p-4">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      &ldquo;{lq.question}&rdquo;
                    </p>
                    <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 mb-3">
                      {lq.explanation}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {sciences.map((s) => (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${DIFFICULTY_STYLES[s.difficulty].bg} ${DIFFICULTY_STYLES[s.difficulty].text} hover:opacity-80`}
                        >
                          {s.transliteration}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── Connection Section ── */}
          <section className="mt-16" aria-label="Related pages">
            <div className="grid gap-4 sm:grid-cols-3">
              <Link href="/understanding-quran" className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/30 p-4 transition-colors hover:border-[rgba(212,175,55,0.3)]">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[rgba(212,175,55,0.6)] mb-1">How to Read</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-[rgba(212,175,55,0.9)]">Understanding the Quran</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">The practical guide — how to apply these sciences when you sit with the Quran.</p>
              </Link>
              <Link href="/surahs" className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/30 p-4 transition-colors hover:border-[rgba(212,175,55,0.3)]">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[rgba(212,175,55,0.6)] mb-1">Applied</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-[rgba(212,175,55,0.9)]">Surah Map</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">114 surahs with reflections that demonstrate these sciences in practice.</p>
              </Link>
              <Link href="/glossary" className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/30 p-4 transition-colors hover:border-[rgba(212,175,55,0.3)]">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[rgba(212,175,55,0.6)] mb-1">Vocabulary</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-[rgba(212,175,55,0.9)]">Glossary</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Deep entries on Quranic terms — root analysis, key ayahs, scholarly commentary.</p>
              </Link>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="mt-16" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="mb-6 font-serif text-lg font-bold text-zinc-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} className="group rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-zinc-900 dark:text-white [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span className="ml-2 text-zinc-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── Closing CTA ── */}
          <div className="mt-16 text-center">
            <blockquote className="mx-auto max-w-lg">
              <p className="font-amiri text-lg text-[rgba(212,175,55,0.8)]" dir="rtl">
                أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا
              </p>
              <p className="mt-2 text-sm italic text-zinc-500 dark:text-zinc-400">
                &ldquo;Do they not reflect on the Quran, or are there locks upon their hearts?&rdquo;
                <span className="ml-1 not-italic text-zinc-400 dark:text-zinc-500">— 47:24</span>
              </p>
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/surahs"
                className="rounded-lg bg-[rgba(212,175,55,0.12)] px-5 py-2.5 text-sm font-medium text-[rgba(212,175,55,0.9)] transition-colors hover:bg-[rgba(212,175,55,0.2)]"
              >
                Explore the Surah Map
              </Link>
              <Link
                href="/#subscribe"
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:border-zinc-300 dark:hover:border-zinc-600"
              >
                Subscribe to AyahGuide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
