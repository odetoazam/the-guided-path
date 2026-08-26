import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { COURSES, COURSES_BY_SLUG } from '@/data/courses'
import { loadModuleHtml, moduleMinutes } from '@/lib/courses'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { CourseModuleList } from '@/components/courses/CourseModuleList'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = COURSES_BY_SLUG[slug]
  if (!course) return {}
  const url = `${CANONICAL_URL}/courses/${course.slug}`
  return {
    title: `${course.figure}: ${course.title} — a Free Course`,
    description: `${course.question} ${course.description}`,
    alternates: { canonical: url },
    openGraph: {
      title: `${course.figure}: ${course.title} | ${SITE_NAME}`,
      description: course.question,
      type: 'website',
      url,
      siteName: SITE_NAME,
    },
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const course = COURSES_BY_SLUG[slug]
  if (!course) notFound()

  const modules = course.modules.map((mod) => {
    const html = loadModuleHtml(course, mod)
    return { ...mod, minutes: html ? moduleMinutes(html) : 0 }
  })
  const totalMinutes = modules.reduce((a, m) => a + m.minutes, 0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${course.figure}: ${course.title}`,
    description: course.description,
    provider: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
    isAccessibleForFree: true,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${Math.round(totalMinutes / 60)}H${totalMinutes % 60}M`,
    },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="border-b border-zinc-100 px-5 pb-10 pt-14 dark:border-white/[0.04]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[rgba(184,149,63,0.9)] dark:text-[rgba(212,175,55,0.6)]">
            <Link href="/courses" className="hover:text-[#b8953f] dark:hover:text-[rgba(212,175,55,0.85)]">
              Courses
            </Link>{' '}
            · Free
          </p>
          <p
            dir="rtl"
            className="font-arabic text-3xl leading-relaxed text-[rgba(184,149,63,0.9)] dark:text-[rgba(212,175,55,0.7)]"
          >
            {course.figureArabic}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-navy-dark sm:text-4xl dark:text-cream">
            {course.figure}: {course.title}
          </h1>
          <p className="mt-3 text-base italic text-zinc-500 dark:text-cream/40">
            {course.question}
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {course.description}
          </p>
          <p className="mt-4 text-xs text-zinc-400 dark:text-cream/25">
            {course.modules.length} modules · ~{Math.round(totalMinutes / 60)}h{' '}
            {totalMinutes % 60}m · read in order
          </p>
          <Link
            href={`/courses/${course.slug}/${course.modules[0].slug}`}
            className="mt-6 inline-block rounded-full border border-[rgba(201,168,76,0.4)] px-6 py-2.5 text-sm font-medium text-[#b8953f] transition-colors hover:bg-[rgba(201,168,76,0.08)] dark:text-[rgba(212,175,55,0.85)]"
          >
            Start with the story →
          </Link>
        </div>
      </div>

      {/* Module list (client component adds per-user progress ticks) */}
      <div className="px-5 py-12">
        <div className="mx-auto max-w-2xl">
          <CourseModuleList courseSlug={course.slug} modules={modules} />

          <div className="mt-10 rounded-2xl border border-zinc-200 p-5 text-center dark:border-white/[0.06]">
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Want the shorter pieces on {course.figure} too? The{' '}
              <Link
                href={`/hub/${course.hubSlug}`}
                className="text-[#b8953f] underline decoration-[rgba(212,175,55,0.4)] underline-offset-2 dark:text-[rgba(212,175,55,0.8)]"
              >
                {course.figure} hub
              </Link>{' '}
              collects every article and close reading on this site that touches
              him.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
