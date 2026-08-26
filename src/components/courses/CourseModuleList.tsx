'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface ModuleRow {
  slug: string
  number: number
  title: string
  teaser: string
  minutes: number
}

interface Props {
  courseSlug: string
  modules: ModuleRow[]
}

/** Module list with per-user completion ticks for logged-in readers. */
export function CourseModuleList({ courseSlug, modules }: Props) {
  const [done, setDone] = useState<Set<string>>(new Set())
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return
      const { data } = await supabase
        .from('user_progress')
        .select('slug')
        .eq('user_id', session.user.id)
        .eq('content_type', 'course')
        .like('slug', `${courseSlug}/%`)
      if (data) setDone(new Set(data.map((r) => r.slug)))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug])

  return (
    <ol className="space-y-3">
      {modules.map((mod) => {
        const finished = done.has(`${courseSlug}/${mod.slug}`)
        return (
          <li key={mod.slug}>
            <Link
              href={`/courses/${courseSlug}/${mod.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors duration-300 hover:border-[rgba(201,168,76,0.35)] dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                  finished
                    ? 'border-[rgba(201,168,76,0.6)] bg-[rgba(201,168,76,0.12)] text-[#b8953f] dark:text-[rgba(212,175,55,0.9)]'
                    : 'border-zinc-300 text-zinc-400 dark:border-white/[0.12] dark:text-cream/30'
                }`}
              >
                {finished ? '✓' : mod.number === 0 ? '·' : mod.number}
              </span>
              <span className="min-w-0">
                <span className="block font-serif text-base font-bold leading-snug text-navy transition-colors group-hover:text-[#b8953f] dark:text-cream dark:group-hover:text-[rgba(212,175,55,0.85)]">
                  {mod.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {mod.teaser}
                </span>
                <span className="mt-1.5 block text-xs text-zinc-400 dark:text-cream/25">
                  ~{mod.minutes} min
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
