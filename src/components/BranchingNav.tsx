import Link from 'next/link'

interface Suggestion {
  title: string
  slug: string
  type: 'article' | 'surah'
  excerpt?: string
}

interface BranchingNavProps {
  suggestions: Suggestion[]
}

export function BranchingNav({ suggestions }: BranchingNavProps) {
  if (suggestions.length === 0) return null

  const items = suggestions.slice(0, 3)

  return (
    <div className="mt-14">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <h3 className="font-serif text-sm font-semibold tracking-wide text-gold-500/70">
          Where to next?
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const href =
            item.type === 'surah' ? `/surahs/${item.slug}` : `/posts/${item.slug}`

          return (
            <Link
              key={item.slug}
              href={href}
              className="group flex flex-col rounded-xl border border-gold-500/15 bg-gold-500/[0.02] p-5 transition hover:border-gold-500/30 hover:bg-gold-500/[0.05] dark:border-gold-500/10 dark:bg-gold-500/[0.01] dark:hover:border-gold-500/25 dark:hover:bg-gold-500/[0.04]"
            >
              {/* Type label */}
              <span className="mb-2 text-[10px] font-medium uppercase tracking-widest text-gold-500/50">
                {item.type === 'surah' ? 'Surah Reflection' : 'Article'}
              </span>

              {/* Title */}
              <h4 className="font-serif text-base font-semibold text-navy-dark group-hover:text-gold-600 dark:text-cream dark:group-hover:text-gold-400">
                {item.title}
              </h4>

              {/* Excerpt */}
              {item.excerpt && (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {item.excerpt}
                </p>
              )}

              {/* Arrow */}
              <span className="mt-auto pt-3 text-xs font-medium text-gold-500/50 transition-colors group-hover:text-gold-500">
                Read &rarr;
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
