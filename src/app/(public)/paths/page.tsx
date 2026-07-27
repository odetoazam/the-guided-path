import type { Metadata } from 'next'
import Link from 'next/link'
import { PATHS } from '@/data/paths'
import { createClient } from '@/lib/supabase/server'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/paths`

export const metadata: Metadata = {
  title: 'Guided Paths — Curated Sequences Through the Quran',
  description:
    'Short curated sequences through AyahGuide — ayahs, concept hubs, and close readings arranged in an order that builds. Each path starts from a real arrival state and takes 30–40 minutes.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Guided Paths | ${SITE_NAME}`,
    description:
      'Curated sequences through the Quran — each one starts from where you actually are.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
}

async function getStopLabels(): Promise<Map<string, string>> {
  const labels = new Map<string, string>()
  try {
    const supabase = await createClient()
    const articleSlugs = PATHS.flatMap((p) =>
      p.stops.filter((s) => s.type === 'article').map((s) => s.slug)
    )
    const hubSlugs = PATHS.flatMap((p) =>
      p.stops.filter((s) => s.type === 'hub').map((s) => s.slug)
    )
    const [{ data: posts }, { data: entities }] = await Promise.all([
      supabase.from('posts').select('slug,title').in('slug', articleSlugs),
      supabase.from('entities').select('slug,name_translit').in('slug', hubSlugs),
    ])
    for (const p of posts || []) labels.set(`article:${p.slug}`, p.title)
    for (const e of entities || []) labels.set(`hub:${e.slug}`, e.name_translit)
  } catch {
    // fall through — slugs render as fallback labels
  }
  return labels
}

export default async function PathsIndexPage() {
  const labels = await getStopLabels()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-zinc-200 px-5 pb-12 pt-14 text-center dark:border-white/[0.05]">
        <div className="mx-auto max-w-xl">
          <p className="mb-2 text-xs font-medium tracking-[0.25em] uppercase text-[rgba(212,175,55,0.65)] dark:text-[rgba(212,175,55,0.55)]">
            Guided paths
          </p>
          <h1 className="font-serif text-3xl font-bold text-navy-dark sm:text-4xl dark:text-cream">
            Start from where you are
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Each path is a short curated sequence — ayahs, concept hubs, and close
            readings arranged in an order that builds. Walk one alone in a sitting,
            or use it as a five-session study-circle plan: one stop per session,
            the connecting text as your transition.
          </p>
        </div>
      </div>

      {/* Path cards with stop previews */}
      <div className="px-5 py-12">
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {PATHS.map((path) => (
            <Link
              key={path.slug}
              href={`/paths/${path.slug}`}
              className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-colors duration-300 hover:border-[rgba(201,168,76,0.35)] dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              <h2 className="font-serif text-xl font-bold leading-snug text-navy dark:text-cream group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors">
                {path.title}
              </h2>
              <p className="mt-1.5 text-sm italic text-zinc-400 dark:text-cream/30">
                &ldquo;{path.arrivalStatement}&rdquo;
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
                {path.description}
              </p>
              <ol className="mt-4 space-y-1 border-l border-[rgba(212,175,55,0.25)] pl-3">
                {path.stops.map((stop, i) => {
                  const label =
                    stop.type === 'ayah'
                      ? `Quran ${stop.slug}`
                      : labels.get(`${stop.type}:${stop.slug}`) ?? stop.slug.replace(/-/g, ' ')
                  return (
                    <li key={i} className="text-xs leading-relaxed text-zinc-400 dark:text-cream/35">
                      <span className="text-[rgba(212,175,55,0.55)]">{i + 1}</span>
                      {'  '}
                      {label}
                    </li>
                  )
                })}
              </ol>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-xs text-zinc-400 dark:text-cream/25">
                  {path.stops.length} stops · ~{path.estimatedMinutes} min
                </span>
                <span className="text-xs text-[rgba(212,175,55,0.45)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[rgba(212,175,55,0.8)]">
                  Begin →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
