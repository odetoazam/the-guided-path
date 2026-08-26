import type { Metadata } from 'next'
import Link from 'next/link'
import { COURSES } from '@/data/courses'
import { courseMinutes } from '@/lib/courses'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/courses`

export const metadata: Metadata = {
  title: 'Courses — Every Verse on One Person, in Order',
  description:
    'Free multi-module courses through everything the Quran says about one person — sequenced, sourced against the classical commentaries, and built to be read start to finish.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Courses | ${SITE_NAME}`,
    description:
      'Free multi-module courses through everything the Quran says about one person.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
}

export default function CoursesIndexPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-zinc-100 px-5 pb-10 pt-14 dark:border-white/[0.04]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[rgba(184,149,63,0.9)] dark:text-[rgba(212,175,55,0.6)]">
            Courses
          </p>
          <h1 className="font-serif text-3xl font-bold text-navy-dark sm:text-4xl dark:text-cream">
            One person. Every verse. In order.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            An article shows you one facet. A course walks you through everything
            the Quran says about one person — the story first, then the scenes up
            close, then the one word it all turns on. Free, and built to be read
            in order.
          </p>
        </div>
      </div>

      {/* Course cards */}
      <div className="px-5 py-12">
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {COURSES.map((course) => {
            const minutes = courseMinutes(course)
            return (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-colors duration-300 hover:border-[rgba(201,168,76,0.35)] dark:border-white/[0.06] dark:bg-white/[0.02]"
              >
                <p
                  dir="rtl"
                  className="font-arabic text-2xl leading-relaxed text-[rgba(184,149,63,0.9)] dark:text-[rgba(212,175,55,0.7)]"
                >
                  {course.figureArabic}
                </p>
                <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-navy transition-colors group-hover:text-[#b8953f] dark:text-cream dark:group-hover:text-[rgba(212,175,55,0.85)]">
                  {course.figure}: {course.title}
                </h2>
                <p className="mt-1.5 text-sm italic text-zinc-400 dark:text-cream/30">
                  {course.question}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {course.description}
                </p>
                <ol className="mt-4 space-y-1 border-l border-[rgba(212,175,55,0.25)] pl-3">
                  {course.modules.map((mod) => (
                    <li
                      key={mod.slug}
                      className="text-xs leading-relaxed text-zinc-400 dark:text-cream/35"
                    >
                      <span className="text-[rgba(212,175,55,0.55)]">
                        {mod.number === 0 ? '·' : mod.number}
                      </span>
                      {'  '}
                      {mod.title}
                    </li>
                  ))}
                </ol>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-xs text-zinc-400 dark:text-cream/25">
                    {course.modules.length} modules · ~{Math.round(minutes / 60)}h{' '}
                    {minutes % 60}m total
                  </span>
                  <span className="text-xs text-[rgba(212,175,55,0.45)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[rgba(212,175,55,0.8)]">
                    Begin →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <p className="mx-auto mt-10 max-w-md text-center text-xs leading-relaxed text-zinc-400 dark:text-cream/25">
          Every quoted ayah is verified against the Uthmani text, and every
          scholarly position is named — the same standard as{' '}
          <Link href="/methodology" className="underline decoration-[rgba(212,175,55,0.4)] underline-offset-2 hover:text-[#b8953f] dark:hover:text-[rgba(212,175,55,0.7)]">
            everything else on this site
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
