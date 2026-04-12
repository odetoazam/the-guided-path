import Link from 'next/link'
import type { Path } from '@/data/paths'

interface PathCardProps {
  path: Path
  index: number
}

export function PathCard({ path }: PathCardProps) {
  return (
    <Link
      href={`/paths/${path.slug}`}
      className="group relative flex flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 hover:border-[rgba(201,168,76,0.35)] transition-all duration-300"
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(212,175,55,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Arrival statement — the emotional hook */}
      <p className="relative text-sm italic text-zinc-400 dark:text-cream/30 leading-relaxed">
        &ldquo;{path.arrivalStatement}&rdquo;
      </p>

      {/* Path title */}
      <h3 className="relative font-serif text-lg font-bold text-navy dark:text-cream leading-snug group-hover:text-[#b8953f] dark:group-hover:text-[rgba(212,175,55,0.85)] transition-colors">
        {path.title}
      </h3>

      {/* Footer */}
      <div className="relative mt-auto flex items-center justify-between pt-1">
        <span className="text-xs text-zinc-400 dark:text-cream/25">
          {path.stops.length} stops · ~{path.estimatedMinutes} min
        </span>
        <span className="text-xs text-[rgba(212,175,55,0.45)] group-hover:text-[rgba(212,175,55,0.8)] transition-all duration-200 group-hover:translate-x-0.5 inline-block">
          Begin →
        </span>
      </div>
    </Link>
  )
}
