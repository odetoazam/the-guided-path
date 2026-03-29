'use client'

import { useState } from 'react'

interface FunnelLayer {
  depth?: number
  label: string
  ayah?: string
  ayahs?: string
  arabic?: string
  text?: string
  desc: string
  color: string
  width?: string
  isPivot?: boolean
  title?: string
}

interface FunnelData {
  title: string
  subtitle: string
  layers?: FunnelLayer[]
  stages?: FunnelLayer[]
}

export function DeductiveFunnel({ data }: { data: FunnelData }) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const items = data.layers || data.stages || []

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {items.map((layer, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? layer.color + '12' : 'transparent',
              borderLeftWidth: '3px',
              borderLeftColor: layer.color,
              marginLeft: layer.depth ? `${layer.depth * 6}px` : undefined,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>
                {layer.depth ? `${layer.depth}. ` : ''}{layer.label || layer.title}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">
                v.{layer.ayah || layer.ayahs}
              </span>
            </div>
            {(layer.arabic || layer.text) && (
              <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: 'rtl' }}>
                {layer.arabic || layer.text}
              </p>
            )}
            {expanded === i && (
              <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
