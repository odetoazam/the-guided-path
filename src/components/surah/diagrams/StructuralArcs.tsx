'use client'

import { useState } from 'react'

// Handles two data shapes:
// structuralArcs (surahs 2–6): { title, subtitle, arcs: [{ from, to, fromLabel, toLabel, label, desc, color }] }
// threadMap (surah 87):         { title, subtitle, threads: [{ fromAyah, toAyah, fromArabic, toArabic, label, desc, color }] }

interface Arc {
  label: string
  desc: string
  color: string
  // structuralArcs fields
  from?: string
  to?: string
  fromLabel?: string
  toLabel?: string
  // threadMap fields
  fromAyah?: string
  toAyah?: string
  fromArabic?: string
  toArabic?: string
}

interface ArcsData {
  title: string
  subtitle: string
  arcs?: Arc[]
  threads?: Arc[]
}

export function StructuralArcs({ data }: { data: ArcsData }) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const items: Arc[] = data.arcs || data.threads || []

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {items.map((arc, i) => {
          const fromRef = arc.from || arc.fromAyah || ''
          const toRef = arc.to || arc.toAyah || ''
          const fromLbl = arc.fromLabel || arc.fromArabic || ''
          const toLbl = arc.toLabel || arc.toArabic || ''
          const isExpanded = expanded === i

          return (
            <button
              key={i}
              onClick={() => setExpanded(isExpanded ? null : i)}
              className="w-full text-left rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all overflow-hidden"
              style={{ borderLeftWidth: '3px', borderLeftColor: arc.color }}
            >
              {/* Header row */}
              <div className="px-4 pt-3 pb-2">
                <div className="text-sm font-semibold font-serif mb-2" style={{ color: arc.color }}>
                  {arc.label}
                </div>
                {/* Arc endpoints */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-white/[0.04] px-3 py-2 min-w-0">
                    <div className="text-xs text-cream-muted/50 font-sans mb-0.5">v.{fromRef}</div>
                    <div className="text-xs text-cream/70 font-body truncate">{fromLbl}</div>
                  </div>
                  <div className="text-cream-muted/30 text-sm shrink-0">→</div>
                  <div className="flex-1 rounded-lg bg-white/[0.04] px-3 py-2 min-w-0">
                    <div className="text-xs text-cream-muted/50 font-sans mb-0.5">v.{toRef}</div>
                    <div className="text-xs text-cream/70 font-body truncate">{toLbl}</div>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div
                  className="px-4 pb-4 pt-2 border-t border-white/[0.04]"
                  style={{ backgroundColor: arc.color + '08' }}
                >
                  <p className="text-sm text-cream/70 leading-relaxed font-body">{arc.desc}</p>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
