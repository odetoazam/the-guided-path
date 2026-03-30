'use client'

// contrastPairs data shape:
// {
//   title, subtitle,
//   pairs: [{
//     color,
//     left:  { label, ayahs, items: [{ term, arabic, meaning }] },
//     right: { label, ayahs, items: [{ term, arabic, meaning }] }
//   }]
// }
//
// Also used for fourSigns:
// {
//   title, subtitle,
//   signs: [{ ayah, label, arabic, verb, desc, color }]
// }

interface ContrastItem {
  term: string
  arabic: string
  meaning: string
}

interface ContrastSide {
  label: string
  ayahs: string
  items: ContrastItem[]
}

interface ContrastPair {
  color: string
  left: ContrastSide
  right: ContrastSide
}

interface Sign {
  ayah: string
  label: string
  arabic: string
  verb: string
  desc: string
  color: string
}

interface ContrastData {
  title: string
  subtitle: string
  pairs?: ContrastPair[]
  signs?: Sign[]
}

export function ContrastMap({ data }: { data: ContrastData }) {
  if (data.signs) {
    return <SignsList data={data} />
  }
  return <PairsList data={data} />
}

function SignsList({ data }: { data: ContrastData }) {
  const signs = data.signs || []
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {signs.map((sign, i) => (
          <div
            key={i}
            className="rounded-xl p-4 border border-white/[0.06]"
            style={{ borderLeftWidth: '3px', borderLeftColor: sign.color, backgroundColor: sign.color + '08' }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-sm font-semibold font-serif" style={{ color: sign.color }}>
                {sign.label}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans shrink-0">v.{sign.ayah}</span>
            </div>
            {sign.arabic && (
              <p className="text-base text-cream/70 font-amiri text-right mb-2" dir="rtl">
                {sign.arabic}
              </p>
            )}
            <div
              className="inline-block text-xs font-sans px-2 py-0.5 rounded-full mb-2"
              style={{ color: sign.color, backgroundColor: sign.color + '20' }}
            >
              {sign.verb}
            </div>
            <p className="text-sm text-cream/60 font-body leading-relaxed">{sign.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PairsList({ data }: { data: ContrastData }) {
  const pairs = data.pairs || []
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      {pairs.map((pair, i) => (
        <div key={i} className="space-y-2">
          <div className="flex gap-2">
            {/* Left side */}
            <div
              className="flex-1 rounded-xl p-3 border border-white/[0.06]"
              style={{ borderLeftWidth: '3px', borderLeftColor: pair.color }}
            >
              <div className="text-xs font-semibold font-sans mb-2" style={{ color: pair.color }}>
                {pair.left.label}
                <span className="text-cream-muted/40 ml-1">v.{pair.left.ayahs}</span>
              </div>
              <div className="space-y-1.5">
                {pair.left.items.map((item, j) => (
                  <div key={j} className="space-y-0.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-semibold text-cream/80 font-sans">{item.term}</span>
                      <span className="text-xs text-cream-muted/50 font-amiri" dir="rtl">{item.arabic}</span>
                    </div>
                    <p className="text-xs text-cream/50 font-body">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div
              className="flex-1 rounded-xl p-3 border border-white/[0.06]"
              style={{ borderRightWidth: '3px', borderRightColor: pair.color }}
            >
              <div className="text-xs font-semibold font-sans text-right mb-2" style={{ color: pair.color }}>
                <span className="text-cream-muted/40 mr-1">v.{pair.right.ayahs}</span>
                {pair.right.label}
              </div>
              <div className="space-y-1.5">
                {pair.right.items.map((item, j) => (
                  <div key={j} className="space-y-0.5 text-right">
                    <div className="flex items-baseline justify-end gap-1.5">
                      <span className="text-xs text-cream-muted/50 font-amiri" dir="rtl">{item.arabic}</span>
                      <span className="text-xs font-semibold text-cream/80 font-sans">{item.term}</span>
                    </div>
                    <p className="text-xs text-cream/50 font-body">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
