'use client'

// addressShift data shape:
// {
//   title, subtitle, note?,
//   shifts: [{ ayah, kind, from, to, arabic?, transliteration?, desc, color }]
// }
//
// kind is one of: 'person' | 'number' | 'tense' | 'mood' | 'voice'
//
// Distinct from structuralArcs: an arc connects two distant ayahs that speak to
// each other thematically. A shift is anchored at ONE ayah and marks the moment
// the grammar itself turns — who is addressed, when the action sits, whether the
// speech states, asks, or commands. Source: the grammatical audit (Step 0j) of
// the surah-architecture skill.

interface Shift {
  ayah: string
  kind: string
  from: string
  to: string
  arabic?: string
  transliteration?: string
  desc: string
  color: string
}

interface AddressShiftData {
  title: string
  subtitle: string
  note?: string
  shifts: Shift[]
}

const KIND_LABEL: Record<string, string> = {
  person: 'Person',
  number: 'Number',
  tense: 'Tense',
  mood: 'Mood',
  voice: 'Voice',
}

export function AddressShift({ data }: { data: AddressShiftData }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="space-y-2">
        {data.shifts.map((shift, i) => (
          <div
            key={i}
            className="rounded-xl p-4 border border-white/[0.06]"
            style={{
              borderLeftWidth: '3px',
              borderLeftColor: shift.color,
              backgroundColor: shift.color + '08',
            }}
          >
            {/* Kind badge + ayah anchor */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <span
                className="text-xs font-semibold font-sans px-2 py-0.5 rounded-full shrink-0"
                style={{ color: shift.color, backgroundColor: shift.color + '20' }}
              >
                {KIND_LABEL[shift.kind] ?? shift.kind}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans shrink-0">v.{shift.ayah}</span>
            </div>

            {/* The turn: from → to */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="flex-1 rounded-lg bg-white/[0.04] px-3 py-2 min-w-0">
                <div className="text-[10px] uppercase tracking-wide text-cream-muted/40 font-sans mb-0.5">
                  Before
                </div>
                <div className="text-xs text-cream/70 font-body">{shift.from}</div>
              </div>
              <div className="text-cream-muted/30 text-sm shrink-0">→</div>
              <div
                className="flex-1 rounded-lg px-3 py-2 min-w-0"
                style={{ backgroundColor: shift.color + '12' }}
              >
                <div
                  className="text-[10px] uppercase tracking-wide font-sans mb-0.5"
                  style={{ color: shift.color }}
                >
                  After
                </div>
                <div className="text-xs text-cream/70 font-body">{shift.to}</div>
              </div>
            </div>

            {/* Arabic evidence for the turn */}
            {shift.arabic && (
              <div className="mb-2">
                <p className="text-lg font-amiri text-cream/80 text-right leading-relaxed" dir="rtl">
                  {shift.arabic}
                </p>
                {shift.transliteration && (
                  <p className="text-xs font-serif italic text-cream/50 mt-0.5">
                    {shift.transliteration}
                  </p>
                )}
              </div>
            )}

            <p className="text-sm text-cream/60 font-body leading-relaxed">{shift.desc}</p>
          </div>
        ))}
      </div>

      {data.note && (
        <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-3">
          <p className="text-xs text-cream/60 font-body leading-relaxed italic">{data.note}</p>
        </div>
      )}
    </div>
  )
}
