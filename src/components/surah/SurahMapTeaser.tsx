import Link from 'next/link'
import { SURAHS, surahSlug } from '@/lib/surahs'

interface Props {
  publishedSurahs: number[]
}

export function SurahMapTeaser({ publishedSurahs }: Props) {
  const publishedSet = new Set(publishedSurahs)
  const total = SURAHS.length
  const explored = publishedSurahs.length

  return (
    <section className="relative bg-navy-dark border-t border-navy-medium py-20 px-6 overflow-hidden">
      {/* Subtle radial glow from center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_800px_400px_at_50%_50%,_rgba(201,168,76,0.04),_transparent)]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-500/60 mb-3">
            The Surah Map
          </p>
          <h2 className="font-serif text-2xl font-bold text-cream sm:text-3xl">
            114 Surahs. Each one a world.
          </h2>
          <p className="mt-3 text-sm text-cream/50">
            <span className="text-gold-500 font-semibold">{explored}</span> of {total} explored so far — new depths added regularly
          </p>
        </div>

        {/* Grid of 114 cells */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {SURAHS.map((surah) => {
            const isPublished = publishedSet.has(surah.n)
            const slug = surahSlug(surah.nameEn)

            if (isPublished) {
              return (
                <Link
                  key={surah.n}
                  href={`/surahs/${slug}`}
                  title={`${surah.n}. ${surah.nameEn}`}
                  className="group relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-gold-500/30 bg-gold-500/10 text-xs font-medium text-gold-400 transition-all duration-200 hover:bg-gold-500/20 hover:border-gold-500/60 hover:text-gold-300 hover:scale-110"
                >
                  {surah.n}
                  {/* Tiny glow dot */}
                  <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-gold-500/70" />
                </Link>
              )
            }

            return (
              <div
                key={surah.n}
                title={`${surah.n}. ${surah.nameEn} — coming soon`}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-navy-medium/80 bg-navy-medium/30 text-xs text-cream/15 select-none"
              >
                {surah.n}
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-8 mx-auto max-w-xs">
          <div className="h-0.5 w-full rounded-full bg-navy-medium overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1000"
              style={{ width: `${(explored / total) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-center text-xs text-cream/30">
            {((explored / total) * 100).toFixed(1)}% complete
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/surahs"
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 px-6 py-2.5 text-sm font-medium text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/50 transition-all duration-200"
          >
            Explore the full map
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
