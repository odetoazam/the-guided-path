'use client'

import { useState } from 'react'

interface AyahCardProps {
  surahNumber: number
  ayahStart: number
  ayahEnd: number
  arabic: string
  translation: string
  title?: string
  layerA?: Record<string, any>
  expandable?: boolean
}

export function AyahCard({
  surahNumber,
  ayahStart,
  ayahEnd,
  arabic,
  translation,
  title,
  layerA,
  expandable = false,
}: AyahCardProps) {
  const [expanded, setExpanded] = useState(false)

  const ref =
    ayahStart === ayahEnd
      ? `${surahNumber}:${ayahStart}`
      : `${surahNumber}:${ayahStart}-${ayahEnd}`

  const hasGrounding = expandable && layerA && Object.keys(layerA).length > 0

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 dark:border-white/[0.05] dark:bg-white/[0.015]">
      {/* Gold left accent via inner wrapper */}
      <div className="border-l-[3px] border-gold-500/50 p-5">
        {/* Reference badge + title */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {title && (
              <h3 className="font-serif text-sm font-semibold text-navy-dark dark:text-cream">
                {title}
              </h3>
            )}
          </div>
          <span className="shrink-0 rounded-md bg-gold-500/10 px-2 py-0.5 text-xs font-medium tabular-nums text-gold-500">
            {ref}
          </span>
        </div>

        {/* Arabic text */}
        <div
          className="mb-3 text-right text-xl leading-[2.2] text-navy-dark dark:text-cream/90"
          style={{
            fontFamily: "var(--font-amiri,'Amiri'),'Scheherazade New',serif",
            direction: 'rtl',
          }}
        >
          {arabic}
        </div>

        {/* Translation */}
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {translation}
        </p>

        {/* Expandable grounding section */}
        {hasGrounding && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs font-medium text-gold-500 transition-colors hover:text-gold-400"
            >
              <span>{expanded ? 'Hide Grounding' : 'Show Grounding'}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {expanded && (
              <div className="mt-3 rounded-lg border border-zinc-200 bg-white p-4 text-sm dark:border-white/[0.05] dark:bg-navy-medium/30">
                <GroundingContent layerA={layerA!} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Grounding content renderer ────────────────────────────────────────────── */

function GroundingContent({ layerA }: { layerA: Record<string, any> }) {
  // Layer A typically has structured fields — render key-value pairs
  const entries = Object.entries(layerA).filter(
    ([, v]) => v !== null && v !== undefined && v !== ''
  )

  if (entries.length === 0) {
    return <p className="text-zinc-400 dark:text-zinc-600">No grounding data.</p>
  }

  return (
    <dl className="space-y-2.5">
      {entries.map(([key, value]) => (
        <div key={key}>
          <dt className="mb-0.5 text-[10px] font-medium uppercase tracking-widest text-gold-500/60">
            {key.replace(/_/g, ' ')}
          </dt>
          <dd className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
          </dd>
        </div>
      ))}
    </dl>
  )
}
