import Link from 'next/link'
import { getPathsContainingStop, type PathStop } from '@/data/paths'

interface PathAttributionProps {
  type: PathStop['type']
  slug: string
  /** instrumentation tag carried into the path URL as ?src= */
  source: string
}

/**
 * "This piece is stop N of M in {path}" strip, shown on content pages that
 * belong to a guided path. This is the primary distribution surface for
 * paths — most readers arrive on content pages from search and never see
 * the homepage. Clicks carry ?src= for PostHog attribution ($pageview
 * current_url), reviewed against the homepage baseline (review date in
 * scripts/article-backlog.md).
 */
export function PathAttribution({ type, slug, source }: PathAttributionProps) {
  const paths = getPathsContainingStop(type, slug)
  if (paths.length === 0) return null

  return (
    <div className="mt-10 space-y-3">
      {paths.map((path) => {
        const stopIndex = path.stops.findIndex(
          (s) => s.type === type && s.slug === slug
        )
        return (
          <Link
            key={path.slug}
            href={`/paths/${path.slug}?src=${source}`}
            className="group flex items-center justify-between gap-4 rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)] px-5 py-4 transition-colors hover:border-[rgba(201,168,76,0.4)]"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[rgba(212,175,55,0.6)]">
                Part of a guided path
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-cream/70">
                This piece is stop {stopIndex + 1} of {path.stops.length} in{' '}
                <span className="font-serif font-semibold text-navy dark:text-cream">
                  {path.title}
                </span>
              </p>
            </div>
            <span className="shrink-0 text-sm text-[rgba(212,175,55,0.6)] transition-transform group-hover:translate-x-0.5">
              Walk it →
            </span>
          </Link>
        )
      })}
    </div>
  )
}
