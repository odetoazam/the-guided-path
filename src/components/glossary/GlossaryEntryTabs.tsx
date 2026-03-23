'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { GlossaryEntry, RootForm, SemanticConnection, SemanticRelationship } from '@/data/glossary'

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = 'root' | 'quran' | 'practice' | 'connections' | 'traditions'

const TABS: { id: Tab; label: string }[] = [
  { id: 'root',        label: 'The Root'      },
  { id: 'quran',       label: 'In the Quran'  },
  { id: 'practice',    label: 'In Practice'   },
  { id: 'connections', label: 'Connections'   },
  { id: 'traditions',  label: 'Traditions'    },
]

// ── Shared ────────────────────────────────────────────────────────────────────

const GOLD = 'rgba(212,175,55,'
const g = (a: number) => `${GOLD}${a})`

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
      {children}
    </p>
  )
}

// ── Tab: The Root ─────────────────────────────────────────────────────────────

function RootFormCard({ form }: { form: RootForm }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.02] p-4 transition-colors hover:border-[rgba(212,175,55,0.18)]">
      {/* Arabic */}
      <div
        className="mb-2 text-right text-3xl leading-none"
        style={{
          fontFamily: "var(--font-amiri,'Amiri'),serif",
          direction: 'rtl',
          color: g(0.80),
          textShadow: `0 0 30px ${g(0.15)}`,
        }}
      >
        {form.arabic}
      </div>
      {/* Transliteration */}
      <p className="mb-1 font-serif text-sm font-semibold italic text-zinc-600 dark:text-zinc-400">
        {form.transliteration}
      </p>
      {/* Type */}
      <p className="mb-2 text-[9px] font-medium uppercase tracking-wider text-zinc-600">
        {form.type}
      </p>
      {/* Meaning */}
      <p className="text-xs leading-relaxed text-zinc-500">{form.meaning}</p>
      {/* Count pill */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className="rounded-full border px-2 py-0.5 text-[9px] font-semibold"
          style={{ borderColor: g(0.18), color: g(0.60), background: g(0.05) }}
        >
          ~{form.approxCount}×{form.verified ? '' : ' approx.'}
        </span>
        {!form.verified && (
          <span className="text-[9px] italic text-zinc-400 dark:text-zinc-700">pending corpus check</span>
        )}
      </div>
    </div>
  )
}

// Decorative SVG showing root letters with radiating lines
function RootRadial({ letters }: { letters: string }) {
  const spokes = 8
  return (
    <svg
      viewBox="0 0 260 260"
      className="mx-auto mb-6 w-40 opacity-60"
      aria-hidden
    >
      {/* Outer rings */}
      <circle cx="130" cy="130" r="110" fill="none" stroke={g(0.06)} strokeWidth="0.8" />
      <circle cx="130" cy="130" r="82"  fill="none" stroke={g(0.08)} strokeWidth="0.6" />
      <circle cx="130" cy="130" r="54"  fill="none" stroke={g(0.12)} strokeWidth="0.5" />
      {/* Spokes */}
      {Array.from({ length: spokes }, (_, i) => {
        const a = (i / spokes) * Math.PI * 2 - Math.PI / 2
        return (
          <line
            key={i}
            x1={130 + Math.cos(a) * 54}
            y1={130 + Math.sin(a) * 54}
            x2={130 + Math.cos(a) * 110}
            y2={130 + Math.sin(a) * 110}
            stroke={g(0.12)}
            strokeWidth="0.6"
          />
        )
      })}
      {/* Center circle */}
      <circle cx="130" cy="130" r="50" fill={g(0.04)} stroke={g(0.22)} strokeWidth="0.8" />
      {/* Root letters */}
      <text
        x="130" y="130"
        textAnchor="middle"
        dominantBaseline="central"
        fill={g(0.85)}
        fontSize="22"
        fontFamily="'Amiri', serif"
        style={{ direction: 'rtl' }}
      >
        {letters}
      </text>
    </svg>
  )
}

function RootTab({ entry }: { entry: GlossaryEntry }) {
  return (
    <div className="space-y-8">
      {/* Hero root display */}
      <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.02] px-6 py-8 text-center">
        <RootRadial letters={entry.root.letters} />
        <div className="mb-1 flex items-center justify-center gap-3">
          <span
            className="text-4xl"
            style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", color: g(0.85), direction: 'rtl' }}
          >
            {entry.root.letters}
          </span>
          <span className="font-serif text-sm italic text-zinc-500">
            {entry.root.transliteration}
          </span>
        </div>
        <p className="mb-3 font-serif text-lg font-semibold text-navy-dark dark:text-cream/80">
          {entry.root.meaning}
        </p>
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {entry.root.elaboration}
        </p>
      </div>

      {/* Derived forms grid */}
      {entry.rootForms && (
        <>
          <div>
            <SectionLabel>Derived forms in the Quran</SectionLabel>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {entry.rootForms.map((f) => (
                <RootFormCard key={f.arabic} form={f} />
              ))}
            </div>
            <p className="mt-3 text-[10px] text-zinc-400 dark:text-zinc-700 italic">
              Counts marked "approx." are based on classical corpus analysis and will be verified against the Quranic morphology API.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

// ── Tab: In the Quran ─────────────────────────────────────────────────────────

function OccurrenceBar({ count, label }: { count: number; label: string }) {
  const max = 100
  const pct = Math.min(count / max, 1) * 100
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-right text-xs text-zinc-500">{label}</span>
      <div className="relative h-1.5 flex-1 rounded-full bg-zinc-200 dark:bg-white/[0.05]">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: `linear-gradient(to right, ${g(0.5)}, ${g(0.8)})` }}
        />
      </div>
      <span className="w-8 text-xs text-zinc-600">{count}</span>
    </div>
  )
}

function QuranTab({ entry }: { entry: GlossaryEntry }) {
  return (
    <div className="space-y-8">
      {/* Occurrence visual */}
      <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.02] p-6">
        <SectionLabel>Root occurrence breakdown</SectionLabel>
        <div className="space-y-2.5">
          {entry.rootForms?.map((f) => (
            <OccurrenceBar key={f.arabic} count={f.approxCount} label={f.transliteration} />
          ))}
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          {entry.occurrenceNote}
        </p>
      </div>

      {/* Key ayahs */}
      <div>
        <SectionLabel>Key ayahs</SectionLabel>
        <div className="space-y-5">
          {entry.keyAyahs.map((ayah) => (
            <div
              key={ayah.ref}
              className="rounded-2xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.02] p-6"
            >
              <div
                className="mb-3 inline-flex items-center rounded-full border px-3 py-0.5"
                style={{ borderColor: g(0.18), background: g(0.07) }}
              >
                <span className="text-[10px] font-semibold tracking-wider" style={{ color: g(0.70) }}>
                  {ayah.ref}
                </span>
              </div>
              <p
                className="mb-4 text-right text-xl leading-loose text-navy-dark dark:text-cream/80"
                style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", direction: 'rtl' }}
              >
                {ayah.arabic}
              </p>
              <div className="my-4 h-px bg-zinc-200 dark:bg-white/[0.05]" />
              <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
                &ldquo;{ayah.translation}&rdquo;
              </p>
              <p className="text-xs leading-relaxed text-zinc-500">{ayah.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Tab: In Practice ─────────────────────────────────────────────────────────

function ConditionCard({ cond }: { cond: NonNullable<GlossaryEntry['practicalSection']>['conditions'][number] }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.02] p-5 transition-colors hover:border-[rgba(212,175,55,0.15)]">
      {/* Number */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
        style={{ background: g(0.10), color: g(0.85), border: `1px solid ${g(0.20)}` }}
      >
        {cond.number}
      </div>
      <div className="flex-1">
        <div className="mb-0.5 flex items-baseline gap-2">
          <span className="font-serif text-base font-semibold text-navy-dark dark:text-cream/80">{cond.title}</span>
          <span
            className="text-sm"
            style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", color: g(0.65), direction: 'rtl' }}
          >
            {cond.arabic}
          </span>
          <span className="text-[10px] italic text-zinc-600">{cond.arabicTranslit}</span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{cond.description}</p>
      </div>
    </div>
  )
}

function StationCard({ station, index }: { station: NonNullable<GlossaryEntry['practicalSection']>['stations'][number]; index: number }) {
  const opacities = ['0.90', '0.70', '0.55']
  return (
    <div className="relative flex gap-4">
      {/* Vertical connector */}
      {index < 2 && (
        <div className="absolute left-[17px] top-10 h-full w-px" style={{ background: g(0.12) }} />
      )}
      {/* Dot */}
      <div
        className="mt-1 h-9 w-9 shrink-0 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: g(0.25), background: g(0.06) }}
      >
        <div className="h-2.5 w-2.5 rounded-full" style={{ background: g(Number(opacities[index])) }} />
      </div>
      <div className="pb-6">
        <p className="mb-1 font-serif text-sm font-semibold text-navy-dark/80 dark:text-cream/75">{station.name}</p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{station.description}</p>
      </div>
    </div>
  )
}

function QAItem({ qa, open, onToggle }: {
  qa: NonNullable<GlossaryEntry['practicalSection']>['questions'][number]
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-zinc-200 dark:border-white/[0.05] last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-3 py-4 text-left"
      >
        <span
          className="mt-0.5 shrink-0 text-sm transition-transform duration-200"
          style={{ color: g(0.60), transform: open ? 'rotate(90deg)' : 'none' }}
        >
          ›
        </span>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{qa.question}</span>
      </button>
      {open && (
        <p className="pb-4 pl-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{qa.answer}</p>
      )}
    </div>
  )
}

function PracticeTab({ entry }: { entry: GlossaryEntry }) {
  const [openQA, setOpenQA] = useState<number | null>(null)
  const ps = entry.practicalSection
  if (!ps) return null

  return (
    <div className="space-y-10">
      {/* Conditions */}
      <div>
        <SectionLabel>The conditions of valid tawbah</SectionLabel>
        <div className="space-y-3">
          {ps.conditions.map((c) => (
            <ConditionCard key={c.number} cond={c} />
          ))}
        </div>
        <p className="mt-3 text-xs italic text-zinc-600">
          As defined by Ibn Rajab al-Hanbali in Jāmiʿ al-ʿUlūm wa-l-Ḥikam; echoed across the classical tradition.
        </p>
      </div>

      {/* Spiritual stations */}
      <div>
        <SectionLabel>Tawbah across spiritual stations</SectionLabel>
        <div className="pl-1">
          {ps.stations.map((s, i) => (
            <StationCard key={i} station={s} index={i} />
          ))}
        </div>
      </div>

      {/* Q&A accordion */}
      <div>
        <SectionLabel>Common questions</SectionLabel>
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.02] px-5">
          {ps.questions.map((qa, i) => (
            <QAItem
              key={i}
              qa={qa}
              open={openQA === i}
              onToggle={() => setOpenQA(openQA === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Tab: Connections ──────────────────────────────────────────────────────────

const RELATIONSHIP_STYLES: Record<SemanticRelationship, { label: string; color: string; bg: string }> = {
  'precedes':        { label: 'Precedes',        color: 'text-rose-300/70',    bg: 'bg-rose-500/8 border-rose-500/15'   },
  'parallels':       { label: 'Parallels',        color: 'text-sky-300/70',     bg: 'bg-sky-500/8 border-sky-500/15'     },
  'deepens':         { label: 'Deepens',          color: 'text-teal-300/70',    bg: 'bg-teal-500/8 border-teal-500/15'   },
  'divine-response': { label: 'Divine Response',  color: 'text-amber-300/70',   bg: 'bg-amber-500/8 border-amber-500/15' },
  'intensifies':     { label: 'Intensifies',      color: 'text-violet-300/70',  bg: 'bg-violet-500/8 border-violet-500/15'},
}

// Horizontal flow diagram: nadam → tawbah → inabah | tawwāb above
function SemanticFlowDiagram({ connections, thisTerm }: {
  connections: SemanticConnection[]
  thisTerm: string
}) {
  const precedes  = connections.filter(c => c.relationship === 'precedes')
  const deepens   = connections.filter(c => c.relationship === 'deepens')
  const divine    = connections.filter(c => c.relationship === 'divine-response')
  const parallel  = connections.filter(c => c.relationship === 'parallels')
  const intensify = connections.filter(c => c.relationship === 'intensifies')

  return (
    <div className="mb-8 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.02] p-6">
      <SectionLabel>Semantic field map</SectionLabel>

      {/* Main horizontal axis: precedes → THIS → deepens */}
      <div className="flex min-w-max items-center gap-0">
        {/* Precedes */}
        {precedes.map((c) => (
          <div key={c.slug} className="text-center">
            <div className="mb-1 rounded-xl border border-rose-500/15 bg-rose-500/8 px-4 py-3">
              <div style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", color: g(0.7), fontSize: '1.4rem', direction: 'rtl' }}>
                {c.arabic}
              </div>
              <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{c.transliteration}</div>
              <div className="text-[9px] uppercase tracking-wider text-rose-300/60 mt-0.5">Precedes</div>
            </div>
          </div>
        ))}

        {/* Arrow */}
        {precedes.length > 0 && (
          <div className="flex items-center px-2" style={{ color: g(0.25) }}>
            <div className="h-px w-6 bg-current" />
            <div className="text-xs">›</div>
          </div>
        )}

        {/* THIS TERM — center */}
        <div className="text-center">
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: g(0.08),
              border: `1px solid ${g(0.30)}`,
              boxShadow: `0 0 24px ${g(0.08)}`,
            }}
          >
            <div style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", color: g(0.90), fontSize: '1.8rem', direction: 'rtl' }}>
              {thisTerm}
            </div>
            <div className="mt-0.5 text-xs font-bold text-[#C9A84C]">Tawbah</div>
            <div className="mt-0.5 text-[9px] uppercase tracking-wider" style={{ color: g(0.5) }}>The Return</div>
          </div>
        </div>

        {/* Arrow */}
        {deepens.length > 0 && (
          <div className="flex items-center px-2" style={{ color: g(0.25) }}>
            <div className="h-px w-6 bg-current" />
            <div className="text-xs">›</div>
          </div>
        )}

        {/* Deepens */}
        {deepens.map((c) => (
          <div key={c.slug} className="text-center">
            <div className="mb-1 rounded-xl border border-teal-500/15 bg-teal-500/8 px-4 py-3">
              <div style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", color: g(0.7), fontSize: '1.4rem', direction: 'rtl' }}>
                {c.arabic}
              </div>
              <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{c.transliteration}</div>
              <div className="text-[9px] uppercase tracking-wider text-teal-300/60 mt-0.5">Deepens into</div>
            </div>
          </div>
        ))}
      </div>

      {/* Below axis: parallels & intensifies */}
      {(parallel.length > 0 || intensify.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t border-zinc-200/70 dark:border-white/[0.04]">
          {[...parallel, ...intensify].map((c) => {
            const rel = RELATIONSHIP_STYLES[c.relationship]
            return (
              <div key={c.slug} className={`rounded-xl border px-3 py-2 ${rel.bg}`}>
                <div style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", color: g(0.7), fontSize: '1.1rem', direction: 'rtl' }}>
                  {c.arabic}
                </div>
                <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{c.transliteration}</div>
                <div className={`text-[9px] uppercase tracking-wider ${rel.color} mt-0.5`}>{rel.label}</div>
              </div>
            )
          })}
        </div>
      )}

      {/* Divine response — above, distinct */}
      {divine.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t border-zinc-200/70 dark:border-white/[0.04]">
          <p className="w-full text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-700">Divine mirror</p>
          {divine.map((c) => (
            <div key={c.slug} className="rounded-xl border border-amber-500/15 bg-amber-500/8 px-3 py-2">
              <div style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", color: g(0.8), fontSize: '1.1rem', direction: 'rtl' }}>
                {c.arabic}
              </div>
              <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{c.transliteration}</div>
              <div className="text-[9px] uppercase tracking-wider text-amber-300/60 mt-0.5">Divine Response</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ConnectionCard({ conn }: { conn: SemanticConnection }) {
  const meta = GLOSSARY_TERMS_MINI[conn.slug]
  const style = RELATIONSHIP_STYLES[conn.relationship]

  const card = (
    <div className="group rounded-2xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.02] p-5 transition-all hover:border-[rgba(212,175,55,0.15)]">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <span
            className="text-2xl leading-none"
            style={{ fontFamily: "var(--font-amiri,'Amiri'),serif", color: g(0.75), direction: 'rtl' }}
          >
            {conn.arabic}
          </span>
          <span className="ml-2 font-serif text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {conn.transliteration}
          </span>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider ${style.bg} ${style.color}`}>
          {style.label}
        </span>
      </div>
      {/* Relationship label */}
      <p className="mb-2 text-xs font-medium italic text-zinc-500">{conn.relationshipLabel}</p>
      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{conn.description}</p>
    </div>
  )

  if (meta?.hasEntry) {
    return <Link href={`/glossary/${conn.slug}`}>{card}</Link>
  }
  return <div>{card}</div>
}

// Mini lookup so ConnectionCard knows if a term has a full entry
const GLOSSARY_TERMS_MINI: Record<string, { hasEntry: boolean }> = {
  nadam:      { hasEntry: false },
  istighfar:  { hasEntry: false },
  inabah:     { hasEntry: false },
  tawwab:     { hasEntry: false },
  awwab:      { hasEntry: false },
}

function ConnectionsTab({ entry }: { entry: GlossaryEntry }) {
  if (!entry.semanticField) return null
  return (
    <div className="space-y-6">
      <SemanticFlowDiagram connections={entry.semanticField} thisTerm={entry.term} />
      <div>
        <SectionLabel>Full semantic portraits</SectionLabel>
        <div className="space-y-4">
          {entry.semanticField.map((c) => (
            <ConnectionCard key={c.slug} conn={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Tab: Traditions ───────────────────────────────────────────────────────────

function TraditionsTab({ entry }: { entry: GlossaryEntry }) {
  const paragraphs = entry.acrossTransitions
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="space-y-10">
      {/* Scholar notes */}
      <div>
        <SectionLabel>What the scholars said</SectionLabel>
        <div className="space-y-4">
          {entry.scholarsSaid.map((s, i) => (
            <blockquote
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.02] p-6"
            >
              <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 italic">
                &ldquo;{s.text}&rdquo;
              </p>
              <footer className="text-xs text-zinc-600">
                — {s.scholar}
                {s.source && <span className="ml-1 italic">({s.source})</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      {/* Hadith */}
      {entry.hadith && entry.hadith.length > 0 && (
        <div>
          <SectionLabel>Hadith</SectionLabel>
          <div className="space-y-4">
            {entry.hadith.map((h, i) => (
              <blockquote
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.02] p-6"
              >
                <p className="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 italic">
                  &ldquo;{h.text}&rdquo;
                </p>
                <footer className="text-xs text-zinc-600">{h.source}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      )}

      {/* Across traditions */}
      <div>
        <SectionLabel>Across traditions</SectionLabel>
        <div className="space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main exported component ───────────────────────────────────────────────────

export function GlossaryEntryTabs({ entry }: { entry: GlossaryEntry }) {
  const [tab, setTab] = useState<Tab>('root')

  return (
    <div>
      {/* ── Tab navigation ──────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 dark:border-white/[0.05] bg-white/95 dark:bg-navy-dark/95 backdrop-blur-md">
        <div className="mx-auto max-w-2xl overflow-x-auto px-4">
          <div className="flex min-w-max gap-1 py-2">
            {TABS.map((t) => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 whitespace-nowrap"
                  style={{
                    background:  active ? g(0.12) : 'transparent',
                    color:       active ? '#C9A84C' : 'rgb(113,113,122)',
                    border:      active ? `1px solid ${g(0.28)}` : '1px solid transparent',
                  }}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Tab content ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl px-5 py-10">
        {tab === 'root'        && <RootTab        entry={entry} />}
        {tab === 'quran'       && <QuranTab       entry={entry} />}
        {tab === 'practice'    && <PracticeTab    entry={entry} />}
        {tab === 'connections' && <ConnectionsTab entry={entry} />}
        {tab === 'traditions'  && <TraditionsTab  entry={entry} />}

        {/* ── Bottom nav ──────────────────────────────────────────────── */}
        <div className="mt-14 border-t border-zinc-200 dark:border-white/[0.05] pt-8">
          {/* Go Deeper */}
          {entry.goDeeper.length > 0 && (
            <div className="mb-8">
              <SectionLabel>Go deeper — surah pages</SectionLabel>
              <div className="space-y-3">
                {entry.goDeeper.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/surahs/${d.slug}`}
                    className="group flex items-start gap-4 rounded-2xl border border-zinc-200 dark:border-white/[0.05] bg-zinc-50 dark:bg-white/[0.02] px-5 py-4 transition-all hover:border-[rgba(212,175,55,0.18)]"
                  >
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: g(0.4) }} />
                    <div>
                      <div className="font-serif text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-navy-dark dark:group-hover:text-cream">
                        {d.surahName}
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-600">{d.note}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/glossary"
              className="text-sm text-zinc-600 transition-colors hover:text-[#C9A84C]"
            >
              ← Back to the Glossary
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
