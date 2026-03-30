'use client'

// Handles two data shapes that share the "two poles + connection" pattern:
//
// inversionFrame (surah 105):
// { title, subtitle, connection, poles: { opening: { ayah, label, arabic, color, desc }, closing: {...} } }
//
// twinSurah (surah 106):
// { title, subtitle, connection, left: { surah, theme, desc, finalImage, color }, right: {...} }
//
// elementalPair (surah 106):
// { title, subtitle, rootNote, pairs: [{ domain, provision, deprivation, desc, color }] }

interface Pole {
  ayah?: string
  label?: string
  arabic?: string
  color: string
  desc: string
  // twinSurah fields
  surah?: string
  theme?: string
  finalImage?: string
}

interface ElementalPairItem {
  domain: string
  provision: string
  deprivation: string
  desc: string
  color: string
}

interface PolarData {
  title: string
  subtitle: string
  connection?: string
  // inversionFrame
  poles?: { opening: Pole; closing: Pole }
  // twinSurah
  left?: Pole
  right?: Pole
  // elementalPair
  pairs?: ElementalPairItem[]
  rootNote?: string
}

export function PolarMap({ data }: { data: PolarData }) {
  if (data.pairs) return <ElementalPairs data={data} />

  const leftPole = data.poles?.opening || data.left
  const rightPole = data.poles?.closing || data.right
  if (!leftPole || !rightPole) return null

  const isInversion = !!data.poles
  const leftColor = leftPole.color || '#4ecdc4'
  const rightColor = rightPole.color || '#e07a8a'

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      {/* Opening / Left pole */}
      <div
        className="rounded-xl p-4 border border-white/[0.06]"
        style={{ borderLeftWidth: '3px', borderLeftColor: leftColor, backgroundColor: leftColor + '08' }}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-sm font-semibold font-serif" style={{ color: leftColor }}>
            {isInversion ? '↑ Opening' : leftPole.surah}
          </span>
          {leftPole.ayah && (
            <span className="text-xs text-cream-muted/50 font-sans">v.{leftPole.ayah}</span>
          )}
        </div>
        {leftPole.theme && (
          <div className="text-xs font-medium font-sans mb-2" style={{ color: leftColor }}>
            {leftPole.theme}
          </div>
        )}
        {leftPole.label && (
          <div className="text-base text-cream font-serif mb-1">{leftPole.label}</div>
        )}
        {leftPole.arabic && (
          <p className="text-base text-cream/70 font-amiri text-right mb-2" dir="rtl">
            {leftPole.arabic}
          </p>
        )}
        <p className="text-sm text-cream/60 font-body leading-relaxed">{leftPole.desc}</p>
        {leftPole.finalImage && (
          <div className="mt-2 text-xs italic text-cream-muted/50 font-body">{leftPole.finalImage}</div>
        )}
      </div>

      {/* Connection bridge */}
      {data.connection && (
        <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-3">
          <p className="text-sm text-cream/70 font-body leading-relaxed italic">{data.connection}</p>
        </div>
      )}

      {/* Closing / Right pole */}
      <div
        className="rounded-xl p-4 border border-white/[0.06]"
        style={{ borderRightWidth: '3px', borderRightColor: rightColor, backgroundColor: rightColor + '08' }}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-sm font-semibold font-serif" style={{ color: rightColor }}>
            {isInversion ? '↓ Closing' : rightPole.surah}
          </span>
          {rightPole.ayah && (
            <span className="text-xs text-cream-muted/50 font-sans">v.{rightPole.ayah}</span>
          )}
        </div>
        {rightPole.theme && (
          <div className="text-xs font-medium font-sans mb-2" style={{ color: rightColor }}>
            {rightPole.theme}
          </div>
        )}
        {rightPole.label && (
          <div className="text-base text-cream font-serif mb-1">{rightPole.label}</div>
        )}
        {rightPole.arabic && (
          <p className="text-base text-cream/70 font-amiri text-right mb-2" dir="rtl">
            {rightPole.arabic}
          </p>
        )}
        <p className="text-sm text-cream/60 font-body leading-relaxed">{rightPole.desc}</p>
        {rightPole.finalImage && (
          <div className="mt-2 text-xs italic text-cream-muted/50 font-body">{rightPole.finalImage}</div>
        )}
      </div>
    </div>
  )
}

function ElementalPairs({ data }: { data: PolarData }) {
  const pairs = data.pairs || []
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {pairs.map((pair, i) => (
          <div
            key={i}
            className="rounded-xl p-4 border border-white/[0.06]"
            style={{ borderLeftWidth: '3px', borderLeftColor: pair.color, backgroundColor: pair.color + '08' }}
          >
            <div className="text-xs font-semibold font-sans uppercase tracking-wide mb-3" style={{ color: pair.color }}>
              {pair.domain}
            </div>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 text-center rounded-lg bg-white/[0.04] px-3 py-2">
                <div className="text-xs text-cream-muted/50 font-sans mb-0.5">Given</div>
                <div className="text-sm font-semibold text-cream font-sans">{pair.provision}</div>
              </div>
              <div className="flex items-center text-cream-muted/30 text-xs">from</div>
              <div className="flex-1 text-center rounded-lg bg-white/[0.04] px-3 py-2">
                <div className="text-xs text-cream-muted/50 font-sans mb-0.5">Without it</div>
                <div className="text-sm font-semibold text-cream/70 font-sans">{pair.deprivation}</div>
              </div>
            </div>
            <p className="text-sm text-cream/60 font-body leading-relaxed">{pair.desc}</p>
          </div>
        ))}
      </div>
      {data.rootNote && (
        <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-3">
          <p className="text-xs text-cream/60 font-body leading-relaxed">{data.rootNote}</p>
        </div>
      )}
    </div>
  )
}
