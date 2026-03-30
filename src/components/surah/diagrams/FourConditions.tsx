'use client'

// fourConditions data shape (surah 103):
// {
//   title, subtitle, logic,
//   pairs: [{
//     color, title: "Individual" | "Communal",
//     conditions: [{ label, arabic, desc }]
//   }]
// }

interface Condition {
  label: string
  arabic: string
  desc: string
}

interface ConditionGroup {
  color: string
  title: string
  conditions: Condition[]
}

interface FourConditionsData {
  title: string
  subtitle: string
  logic?: string
  pairs: ConditionGroup[]
}

export function FourConditions({ data }: { data: FourConditionsData }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      {data.logic && (
        <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-3">
          <p className="text-sm text-cream/70 font-body leading-relaxed italic">{data.logic}</p>
        </div>
      )}

      <div className="space-y-4">
        {data.pairs.map((group, gi) => (
          <div key={gi}>
            {/* Group header */}
            <div
              className="text-xs font-semibold font-sans uppercase tracking-wider mb-2 px-1"
              style={{ color: group.color }}
            >
              {group.title}
            </div>

            {/* Conditions in group */}
            <div className="space-y-2 pl-2 border-l-2" style={{ borderColor: group.color + '40' }}>
              {group.conditions.map((cond, ci) => (
                <div
                  key={ci}
                  className="rounded-xl p-4 border border-white/[0.06]"
                  style={{ borderLeftWidth: '3px', borderLeftColor: group.color }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-sm font-semibold font-sans" style={{ color: group.color }}>
                      {cond.label}
                    </span>
                    <span className="text-sm font-amiri text-cream/70 text-right" dir="rtl">
                      {cond.arabic}
                    </span>
                  </div>
                  <p className="text-sm text-cream/60 font-body leading-relaxed">{cond.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
