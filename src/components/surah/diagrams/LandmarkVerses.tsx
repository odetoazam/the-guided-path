'use client'

import { useState } from 'react'

// keyAyahs data shape:
// { title, subtitle, verses: [{ ref, ayahRef, arabic, translation, context, color }] }

interface LandmarkVerse {
  ref: string
  ayahRef?: string
  arabic: string
  translation: string
  context: string
  color: string
}

interface LandmarkData {
  title: string
  subtitle: string
  verses: LandmarkVerse[]
}

export function LandmarkVerses({ data }: { data: LandmarkData }) {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.verses.map((verse, i) => {
          const isExpanded = expanded === i
          return (
            <button
              key={i}
              onClick={() => setExpanded(isExpanded ? null : i)}
              className="w-full text-left rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all overflow-hidden"
              style={{ borderLeftWidth: '3px', borderLeftColor: verse.color }}
            >
              <div
                className="px-4 py-3"
                style={{ backgroundColor: isExpanded ? verse.color + '10' : 'transparent' }}
              >
                {/* Ayah ref badge */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span
                    className="text-xs font-semibold font-sans px-2 py-0.5 rounded-full"
                    style={{ color: verse.color, backgroundColor: verse.color + '18' }}
                  >
                    {verse.ref || verse.ayahRef}
                  </span>
                </div>

                {/* Arabic text */}
                <p
                  className="text-base text-cream/80 font-amiri text-right leading-relaxed mb-2"
                  dir="rtl"
                >
                  {verse.arabic}
                </p>

                {/* Translation */}
                <p className="text-sm text-cream/60 font-body italic mb-1">{verse.translation}</p>

                {/* Context — shown on expand */}
                {isExpanded && (
                  <p className="text-sm text-cream/70 font-body leading-relaxed mt-3 pt-3 border-t border-white/[0.06]">
                    {verse.context}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
