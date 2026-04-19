import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Roadmap — AyahGuide',
  robots: { index: false, follow: false },
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const LAST_UPDATED = 'April 20, 2026'

const CONTENT = {
  totalAyahs: 6236,
  doneAyahs: 293,
  surahsWithReflection: 5,   // surahs with at least some ayah tadabbur in DB
  surahsComplete: 2,          // fully done surahs (1–2)
  queuePosition: '5:102',
  surahsInDB: 114,
}

const VISION_LAYERS = [
  {
    num: 1,
    label: 'Living map of Quranic meaning',
    detail: 'Every surah, ayah, theme, and entity connected into a semantic web — not linear content.',
    status: 'building' as const,
  },
  {
    num: 2,
    label: 'Personal reflection layer',
    detail: 'Read → reflect → save. A private record of how the Quran meets your life, compounding over time.',
    status: 'shipped' as const,
  },
  {
    num: 3,
    label: 'Contemplation companion',
    detail: '"Here\'s what I\'m dealing with — help me see it through the Quran." Voice-first, calm, grounded.',
    status: 'deferred' as const,
  },
]

type MilestoneStatus = 'shipped' | 'active' | 'queued' | 'deferred'

interface Milestone {
  title: string
  detail: string
  status: MilestoneStatus
  date?: string
}

const MILESTONES: Milestone[] = [
  { title: '114 surah pages', detail: 'All visual overview pages live with structural diagrams.', status: 'shipped', date: 'Mar 2026' },
  { title: 'Entity hub system', detail: 'Shaytan hub complete. 101 hubs live with inline ayah grounding + full audit.', status: 'shipped', date: 'Apr 2026' },
  { title: 'Auth + reading layer', detail: 'Google OAuth + email auth. Reading history + favorites. Private reflection notes.', status: 'shipped', date: 'Apr 2026' },
  { title: 'Institutional pages', detail: '/about, /methodology, /contested-verses — the credibility packet for scholars.', status: 'shipped', date: 'Apr 2026' },
  { title: 'Mobile UX', detail: 'Responsive typography, [PAUSE] dividers, distillation boxes, tappable share card.', status: 'shipped', date: 'Apr 2026' },
  { title: 'Tadabbur corpus', detail: '293 ayahs done across surahs 1–5. Queue at 5:102. 5,943 remaining.', status: 'active' },
  { title: 'Scholar endorsement campaign', detail: 'Methodology page + contested-verse infrastructure ready. Need outreach to 10 scholars.', status: 'queued' },
  { title: 'Audio versions', detail: 'TTS for English reflections + qāri audio for Arabic blocks.', status: 'queued' },
  { title: 'Concept tagging backfill', detail: 'Tag all ~593 existing tadabbur files with canonical concept slugs. Unlocks knowledge base.', status: 'queued' },
  { title: 'Knowledge base + /query-quran', detail: 'Cross-surah concept maps, theme compilation, CLI query interface over corpus.', status: 'deferred' },
  { title: 'Voice contemplation companion', detail: 'Depth-first on a specific ayah. Calm, grounded. Not a chatbot.', status: 'deferred' },
  { title: 'Multilingual expansion', detail: 'Arabic-first, then Urdu/Turkish. Requires translator relationships.', status: 'deferred' },
]

const UNLOCK_CHAIN = [
  {
    id: 'corpus',
    label: 'Tadabbur corpus',
    sublabel: '6,236 ayahs',
    note: 'The moat. Every other layer sits on top of this.',
    current: '293 done (4.7%)',
    status: 'active' as const,
  },
  {
    id: 'tags',
    label: 'Concept tagging',
    sublabel: 'Controlled vocabulary across corpus',
    note: 'Unlocks theme search, cross-surah connections, and eventually semantic recall.',
    current: '~5 files done (Surah 1 only)',
    status: 'queued' as const,
  },
  {
    id: 'kb',
    label: 'Knowledge base',
    sublabel: '/query-quran CLI skill',
    note: 'LLM reads concept indexes → synthesizes answers with ayah citations. Internal tool first.',
    current: 'Not started',
    status: 'deferred' as const,
  },
  {
    id: 'voice',
    label: 'Voice companion',
    sublabel: 'Contemplation layer',
    note: '"Here\'s what I\'m dealing with." Depth-first on a specific ayah. Calm presence.',
    current: 'Not started',
    status: 'deferred' as const,
  },
]

const OPEN_QUESTIONS = [
  'Do we collect user reflections? (Product identity decision — content platform vs. personal companion)',
  'Monetization path: premium tier, institutional licensing, or donation-based?',
  'Scholar endorsements: who to approach first, and what the ask looks like',
  'Audio: TTS vs. real reciter partnerships — quality bar vs. speed',
]

/* ── Helpers ──────────────────────────────────────────────────────────────── */

const STATUS_LABEL: Record<MilestoneStatus, string> = {
  shipped: 'Shipped',
  active: 'Active',
  queued: 'Queued',
  deferred: 'Later',
}

const STATUS_COLORS: Record<MilestoneStatus, string> = {
  shipped: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  active:  'text-[#C9A84C] bg-[#C9A84C]/10 border-[#C9A84C]/25',
  queued:  'text-zinc-400 bg-zinc-400/8 border-zinc-700',
  deferred:'text-zinc-600 bg-zinc-900/40 border-zinc-800',
}

const CHAIN_COLORS: Record<'active'|'queued'|'deferred', { ring: string; dot: string; text: string }> = {
  active:  { ring: 'border-[#C9A84C]/50', dot: 'bg-[#C9A84C]', text: 'text-[#C9A84C]' },
  queued:  { ring: 'border-zinc-700', dot: 'bg-zinc-600', text: 'text-zinc-500' },
  deferred:{ ring: 'border-zinc-800', dot: 'bg-zinc-800', text: 'text-zinc-700' },
}

const LAYER_STATUS_STYLE: Record<'shipped'|'building'|'deferred', string> = {
  shipped:  'border-emerald-500/30 bg-emerald-500/5',
  building: 'border-[#C9A84C]/30 bg-[#C9A84C]/5',
  deferred: 'border-zinc-800 bg-zinc-900/30',
}

const LAYER_STATUS_LABEL: Record<'shipped'|'building'|'deferred', string> = {
  shipped:  'Live',
  building: 'Building',
  deferred: 'Later',
}

const LAYER_STATUS_TEXT: Record<'shipped'|'building'|'deferred', string> = {
  shipped:  'text-emerald-400',
  building: 'text-[#C9A84C]',
  deferred: 'text-zinc-700',
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function RoadmapPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  const pct = Math.round((CONTENT.doneAyahs / CONTENT.totalAyahs) * 100 * 10) / 10

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-cream/80">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:py-16">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A84C]/50 mb-3">AyahGuide — Internal</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Product Roadmap
          </h1>
          <p className="text-sm text-zinc-500">Last updated {LAST_UPDATED}</p>
        </div>

        {/* Vision one-liner */}
        <div className="mb-14 rounded-2xl border border-[#C9A84C]/15 bg-[#C9A84C]/[0.04] px-7 py-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]/50 mb-3">The north star</p>
          <p className="font-serif text-xl sm:text-2xl text-white leading-snug">
            A personal, living interface to the Quran — helping you reflect, understand, and navigate your life through its meaning.
          </p>
        </div>

        {/* Vision layers */}
        <section className="mb-14">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-5">Three layers</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {VISION_LAYERS.map((layer) => (
              <div key={layer.num} className={`rounded-xl border p-5 ${LAYER_STATUS_STYLE[layer.status]}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-zinc-700">0{layer.num}</span>
                  <span className={`text-[9px] uppercase tracking-[0.15em] font-medium ${LAYER_STATUS_TEXT[layer.status]}`}>
                    {LAYER_STATUS_LABEL[layer.status]}
                  </span>
                </div>
                <p className="font-serif text-sm font-semibold text-white mb-2">{layer.label}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{layer.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Content progress */}
        <section className="mb-14">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-5">Content build</h2>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white">{CONTENT.doneAyahs.toLocaleString()}</span>
                <span className="text-zinc-600 text-lg ml-2">/ {CONTENT.totalAyahs.toLocaleString()} ayahs</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-semibold text-[#C9A84C]">{pct}%</span>
                <p className="text-[11px] text-zinc-600 mt-0.5">complete</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-6">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C9A84C]/70 to-[#C9A84C]"
                style={{ width: `${pct}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { label: 'Queue position', value: CONTENT.queuePosition },
                { label: 'Surahs in progress', value: `1–${CONTENT.surahsWithReflection}` },
                { label: 'Remaining', value: (CONTENT.totalAyahs - CONTENT.doneAyahs).toLocaleString() },
                { label: 'Overview pages', value: `${CONTENT.surahsInDB} / 114` },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-zinc-800/60 bg-zinc-900/20 px-3 py-3">
                  <p className="text-base sm:text-lg font-semibold text-white">{s.value}</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unlock chain */}
        <section className="mb-14">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-5">What unlocks what</h2>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-[#C9A84C]/40 via-zinc-700/40 to-zinc-800/20" />

            <div className="space-y-0">
              {UNLOCK_CHAIN.map((node, i) => {
                const c = CHAIN_COLORS[node.status]
                return (
                  <div key={node.id} className="relative">
                    {/* Dot */}
                    <div className={`absolute -left-5 top-5 h-2.5 w-2.5 rounded-full border-2 ${c.ring} ${node.status === 'active' ? node.dot + ' shadow-[0_0_8px_rgba(201,168,76,0.5)]' : 'bg-[#0D1B2A] ' + c.dot}`} />

                    <div className={`ml-3 mb-2 rounded-xl border px-5 py-4 ${node.status === 'active' ? 'border-[#C9A84C]/20 bg-[#C9A84C]/[0.04]' : 'border-zinc-800/60 bg-zinc-900/20'}`}>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <p className={`text-sm font-semibold ${node.status === 'active' ? 'text-white' : node.status === 'queued' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            {node.label}
                          </p>
                          <p className="text-[11px] text-zinc-600 mt-0.5">{node.sublabel}</p>
                        </div>
                        <span className={`text-[9px] uppercase tracking-[0.15em] font-medium shrink-0 mt-0.5 ${c.text}`}>
                          {STATUS_LABEL[node.status]}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed mb-2">{node.note}</p>
                      <p className={`text-[10px] font-mono ${c.text}`}>{node.current}</p>
                    </div>

                    {/* Arrow connector */}
                    {i < UNLOCK_CHAIN.length - 1 && (
                      <div className="ml-6 flex items-center gap-1.5 mb-2 pl-2">
                        <span className="text-zinc-800 text-xs">↓</span>
                        <span className="text-[9px] text-zinc-800 tracking-wide">unlocks</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="mb-14">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-5">Milestones</h2>

          {(['shipped', 'active', 'queued', 'deferred'] as MilestoneStatus[]).map((status) => {
            const items = MILESTONES.filter((m) => m.status === status)
            if (!items.length) return null
            return (
              <div key={status} className="mb-6">
                <p className={`text-[9px] uppercase tracking-[0.2em] font-medium mb-2.5 ${STATUS_COLORS[status].split(' ')[0]}`}>
                  {STATUS_LABEL[status]}
                </p>
                <div className="space-y-2">
                  {items.map((m) => (
                    <div
                      key={m.title}
                      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${
                        status === 'shipped' ? 'border-zinc-800/50 bg-zinc-900/20' :
                        status === 'active'  ? 'border-[#C9A84C]/20 bg-[#C9A84C]/[0.04]' :
                        'border-zinc-800/40 bg-transparent'
                      }`}
                    >
                      {status === 'shipped' && (
                        <span className="text-emerald-500 mt-0.5 shrink-0 text-xs">✓</span>
                      )}
                      {status === 'active' && (
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#C9A84C] shrink-0 shadow-[0_0_6px_rgba(201,168,76,0.6)]" />
                      )}
                      {(status === 'queued' || status === 'deferred') && (
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-700 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className={`text-sm font-medium ${status === 'deferred' ? 'text-zinc-600' : status === 'queued' ? 'text-zinc-400' : 'text-white'}`}>
                            {m.title}
                          </p>
                          {m.date && <span className="text-[10px] text-zinc-700 shrink-0">{m.date}</span>}
                        </div>
                        <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">{m.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        {/* Open questions */}
        <section className="mb-14">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-5">Open questions</h2>
          <div className="space-y-2">
            {OPEN_QUESTIONS.map((q, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-zinc-800/40 px-4 py-3.5">
                <span className="text-[10px] font-mono text-zinc-700 mt-0.5 shrink-0">?</span>
                <p className="text-sm text-zinc-500 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-zinc-800/60 pt-8 flex items-center justify-between">
          <p className="text-[10px] text-zinc-700">Updated each session · Not indexed</p>
          <p className="font-amiri text-[#C9A84C]/30 text-lg">۞</p>
        </div>

      </div>
    </div>
  )
}
