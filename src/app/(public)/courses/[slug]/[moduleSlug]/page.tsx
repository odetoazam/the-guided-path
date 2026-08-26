import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { COURSES, COURSES_BY_SLUG, moduleProgressSlug } from '@/data/courses'
import { loadModuleHtml, moduleMinutes } from '@/lib/courses'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { CourseModuleActions } from '@/components/courses/CourseModuleActions'
import { NewsletterSignup } from '@/components/blog/newsletter-signup'

interface Props {
  params: Promise<{ slug: string; moduleSlug: string }>
}

export function generateStaticParams() {
  return COURSES.flatMap((c) =>
    c.modules.map((m) => ({ slug: c.slug, moduleSlug: m.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, moduleSlug } = await params
  const course = COURSES_BY_SLUG[slug]
  const mod = course?.modules.find((m) => m.slug === moduleSlug)
  if (!course || !mod) return {}
  const url = `${CANONICAL_URL}/courses/${course.slug}/${mod.slug}`
  return {
    title: `${mod.title} — ${course.figure}: ${course.title}`,
    description: mod.teaser,
    alternates: { canonical: url },
    openGraph: {
      title: `${mod.title} | ${course.figure} course`,
      description: mod.teaser,
      type: 'article',
      url,
      siteName: SITE_NAME,
    },
  }
}

export default async function CourseModulePage({ params }: Props) {
  const { slug, moduleSlug } = await params
  const course = COURSES_BY_SLUG[slug]
  const mod = course?.modules.find((m) => m.slug === moduleSlug)
  if (!course || !mod) notFound()

  const html = loadModuleHtml(course, mod)
  if (!html) notFound()

  const idx = course.modules.findIndex((m) => m.slug === mod.slug)
  const prev = idx > 0 ? course.modules[idx - 1] : null
  const next = idx < course.modules.length - 1 ? course.modules[idx + 1] : null
  const minutes = moduleMinutes(html)

  // The module file carries its own <h1>; the page frame stays above it.
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-5 pb-16 pt-10">
        {/* Course frame */}
        <div className="mb-8 flex items-center justify-between border-b border-zinc-100 pb-4 text-xs dark:border-white/[0.05]">
          <Link
            href={`/courses/${course.slug}`}
            className="font-medium uppercase tracking-[0.15em] text-[rgba(184,149,63,0.9)] hover:text-[#b8953f] dark:text-[rgba(212,175,55,0.6)] dark:hover:text-[rgba(212,175,55,0.85)]"
          >
            ← {course.figure}: {course.title}
          </Link>
          <span className="text-zinc-400 dark:text-cream/25">
            {mod.number === 0 ? 'Start here' : `Module ${mod.number} of ${course.modules.length - 1}`} · ~{minutes} min
          </span>
        </div>

        {/* Module body */}
        <article
          className="prose-blog course-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Mark-complete sentinel + next-module CTA (client) */}
        <CourseModuleActions
          progressSlug={moduleProgressSlug(course, mod)}
          nextHref={next ? `/courses/${course.slug}/${next.slug}` : null}
          nextTitle={next ? next.title : null}
          courseHref={`/courses/${course.slug}`}
        />

        {/* Prev / next */}
        <div className="mt-10 flex items-center justify-between border-t border-zinc-100 pt-6 text-sm dark:border-white/[0.05]">
          {prev ? (
            <Link
              href={`/courses/${course.slug}/${prev.slug}`}
              className="text-zinc-500 hover:text-[#b8953f] dark:text-zinc-400 dark:hover:text-[rgba(212,175,55,0.85)]"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/courses/${course.slug}/${next.slug}`}
              className="text-right text-[#b8953f] dark:text-[rgba(212,175,55,0.85)]"
            >
              {next.title} →
            </Link>
          ) : (
            <Link
              href={`/courses/${course.slug}`}
              className="text-right text-[#b8953f] dark:text-[rgba(212,175,55,0.85)]"
            >
              Course complete — back to overview →
            </Link>
          )}
        </div>

        {/* One soft ask, only after the reader has something worth having */}
        {mod.number === 2 && (
          <div className="mt-12">
            <NewsletterSignup />
          </div>
        )}
      </div>
    </div>
  )
}
