'use client'

// refrainPattern (surah 109) data shape:
// {
//   title, subtitle, rootNote,
//   elements: [{ ayah, form, role, desc, color, hasRoot }]
// }

interface RefrainElement {
  ayah: string
  form: string
  role: string
  desc: string
  color: string
  hasRoot: boolean
}

interface RefrainData {
  title: string
  subtitle: string
  rootNote?: string
  elements: RefrainElement[]
}

export function RefrainPattern({ data }: { data: RefrainData }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="space-y-2">
        {data.elements.map((el, i) => (
          <div
            key={i}
            className="rounded-xl p-4 border border-white/[0.06]"
            style={{
              borderLeftWidth: '3px',
              borderLeftColor: el.hasRoot ? el.color : 'transparent',
              backgroundColor: el.hasRoot ? el.color + '08' : 'transparent',
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                {el.hasRoot && (
                  <span
                    className="text-xs font-semibold font-amiri shrink-0"
                    style={{ color: el.color }}
                    dir="rtl"
                  >
                    {el.form}
                  </span>
                )}
                <span className="text-xs font-semibold font-sans" style={{ color: el.color }}>
                  {el.role}
                </span>
              </div>
              <span className="text-xs text-cream-muted/50 font-sans shrink-0">v.{el.ayah}</span>
            </div>
            {el.hasRoot && (
              <div
                className="inline-block text-xs font-sans px-2 py-0.5 rounded-full mb-2"
                style={{ color: el.color, backgroundColor: el.color + '20' }}
              >
                {el.form}
              </div>
            )}
            <p className="text-sm text-cream/60 font-body leading-relaxed">{el.desc}</p>
          </div>
        ))}
      </div>

      {data.rootNote && (
        <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-3">
          <p className="text-xs text-cream/60 font-body leading-relaxed italic">{data.rootNote}</p>
        </div>
      )}
    </div>
  )
}
