import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { ROADMAP } from '@/lib/roadmap-data'

export const dynamic = 'force-dynamic'
export const metadata = { robots: { index: false, follow: false } }

/* ── Live stats ──────────────────────────────────────────────────────────── */

async function getLiveStats() {
  try {
    const db = createAdminClient()
    const [posts, surahs, entities, users] = await Promise.all([
      db.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      db.from('posts').select('surah_number', { count: 'exact', head: true })
        .eq('status', 'published').eq('type', 'surah').not('surah_number', 'is', null),
      db.from('entities').select('*', { count: 'exact', head: true }),
      db.auth.admin.listUsers({ perPage: 1 }),
    ])
    return {
      posts: posts.count ?? 0,
      surahsWithContent: surahs.count ?? 0,
      hubs: entities.count ?? 0,
      users: ('total' in (users.data ?? {})) ? (users.data as { total: number }).total : 0,
    }
  } catch {
    return { posts: 0, surahsWithContent: 0, hubs: 0, users: 0 }
  }
}

/* ── Styles ──────────────────────────────────────────────────────────────── */

const CHAIN_STYLE = {
  active: {
    card: 'border-[#C9A84C]/30 bg-[#C9A84C]/[0.05]',
    dot:  'bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.55)]',
    line: 'bg-[#C9A84C]/25',
    badge:'text-[#C9A84C] bg-[#C9A84C]/10 border-[#C9A84C]/20',
    label:'text-white',
    sub:  'text-zinc-400',
    why:  'text-zinc-400',
    stat: 'text-[#C9A84C]',
  },
  queued: {
    card: 'border-zinc-700/50 bg-zinc-900/20',
    dot:  'bg-zinc-600 border-2 border-zinc-700',
    line: 'bg-zinc-800',
    badge:'text-zinc-500 bg-zinc-800/60 border-zinc-700',
    label:'text-zinc-300',
    sub:  'text-zinc-600',
    why:  'text-zinc-600',
    stat: 'text-zinc-600',
  },
  later: {
    card: 'border-zinc-800/40 bg-transparent',
    dot:  'bg-zinc-800 border-2 border-zinc-800',
    line: 'bg-zinc-800/50',
    badge:'text-zinc-700 bg-transparent border-zinc-800',
    label:'text-zinc-600',
    sub:  'text-zinc-700',
    why:  'text-zinc-700',
    stat: 'text-zinc-700',
  },
}

const LAYER_STYLE = {
  shipped:  { pill: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', label: 'Live' },
  building: { pill: 'text-[#C9A84C] bg-[#C9A84C]/10 border-[#C9A84C]/20',     label: 'Building' },
  later:    { pill: 'text-zinc-700 bg-transparent border-zinc-800',             label: 'Later' },
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default async function RoadmapPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  const live = await getLiveStats()
  const { content, unlockChain, visionLayers, openQuestions, shipped, lastUpdated } = ROADMAP
  const pct = ((content.doneAyahs / content.totalAyahs) * 100).toFixed(1)
  const remaining = content.totalAyahs - content.doneAyahs

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-cream/80 selection:bg-[#C9A84C]/20">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16 space-y-14">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#C9A84C]/40 mb-3 font-sans">
            AyahGuide · Internal · {lastUpdated}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            Product Roadmap
          </h1>
        </div>

        {/* ── Vision + layers ─────────────────────────────────────────── */}
        <div className="rounded-2xl border border-[#C9A84C]/12 bg-[#C9A84C]/[0.03] px-6 py-5 space-y-5">
          <p className="font-serif text-lg sm:text-xl text-white/90 leading-snug">
            A personal, living interface to the Quran — helping you reflect, understand,{' '}
            and navigate your life through its meaning.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {visionLayers.map((l) => {
              const s = LAYER_STYLE[l.status]
              return (
                <span key={l.num} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${s.pill}`}>
                  <span className="font-mono text-[9px] opacity-50">0{l.num}</span>
                  {l.label}
                  <span className="text-[9px] opacity-70">{s.label}</span>
                </span>
              )
            })}
          </div>
        </div>

        {/* ── Live stats ──────────────────────────────────────────────── */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-700 mb-4 font-sans">Live</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { value: live.posts,            label: 'Published posts' },
              { value: live.hubs,             label: 'Entity hubs' },
              { value: live.surahsWithContent,label: 'Surahs with content' },
              { value: live.users,            label: 'Registered users' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-900/20 px-4 py-4 text-center">
                <p className="font-serif text-3xl font-bold text-white tabular-nums">{s.value.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-600 mt-1 font-sans">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Content progress ────────────────────────────────────────── */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-700 mb-4 font-sans">Content build</p>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 px-6 py-6">
            <div className="flex items-end justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-5xl font-bold text-white tabular-nums">{content.doneAyahs.toLocaleString()}</span>
                <span className="text-zinc-600">/ {content.totalAyahs.toLocaleString()} ayahs</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#C9A84C] tabular-nums">{pct}%</p>
                <p className="text-[10px] text-zinc-600 mt-0.5">{remaining.toLocaleString()} remain</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#C9A84C]/60 to-[#C9A84C]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-700 mt-3 font-mono">queue · {content.queuePosition}</p>
          </div>
        </div>

        {/* ── Unlock chain ────────────────────────────────────────────── */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-700 mb-6 font-sans">What remains — in order</p>
          <div className="relative">
            {/* Spine */}
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-[#C9A84C]/30 via-zinc-700/20 to-zinc-800/10" />

            <div className="space-y-2">
              {unlockChain.map((node, i) => {
                const s = CHAIN_STYLE[node.status]
                const isLast = i === unlockChain.length - 1
                return (
                  <div key={node.id}>
                    <div className="flex gap-4">
                      {/* Dot */}
                      <div className="relative flex-shrink-0 mt-5">
                        <div className={`h-[11px] w-[11px] rounded-full ${s.dot}`} />
                      </div>

                      {/* Card */}
                      <div className={`flex-1 rounded-xl border px-5 py-4 ${s.card}`}>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <p className={`text-sm font-semibold ${s.label}`}>{node.label}</p>
                            <p className={`text-[11px] mt-0.5 ${s.sub}`}>{node.sub}</p>
                          </div>
                          <span className={`text-[9px] uppercase tracking-[0.15em] border rounded-full px-2 py-0.5 font-medium shrink-0 ${s.badge}`}>
                            {node.status === 'active' ? 'Now' : node.status === 'queued' ? 'Next' : 'Later'}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed mb-3 ${s.why}`}>{node.why}</p>
                        <div className="flex items-center justify-between">
                          <p className={`text-[10px] font-mono ${s.stat}`}>{node.current}</p>
                          {node.blockedBy && (
                            <p className="text-[9px] text-zinc-700 font-sans">
                              needs: {node.blockedBy}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {!isLast && (
                      <div className="flex items-center gap-2 pl-[30px] py-1.5">
                        <span className="text-[9px] text-zinc-800 font-sans tracking-widest">↓ unlocks</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Open questions ──────────────────────────────────────────── */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-700 mb-4 font-sans">Open questions</p>
          <div className="space-y-2">
            {openQuestions.map((q, i) => (
              <div key={i} className="flex gap-3 px-4 py-3 rounded-lg border border-zinc-800/40">
                <span className="text-zinc-700 font-mono text-[10px] mt-0.5 shrink-0">?</span>
                <p className="text-sm text-zinc-500 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Shipped ─────────────────────────────────────────────────── */}
        <details className="group">
          <summary className="text-[9px] uppercase tracking-[0.25em] text-zinc-800 hover:text-zinc-600 cursor-pointer font-sans transition-colors list-none flex items-center gap-2">
            <span className="group-open:rotate-90 transition-transform inline-block">›</span>
            What shipped
          </summary>
          <div className="mt-4 space-y-1.5">
            {shipped.map((s) => (
              <div key={s.title} className="flex items-baseline justify-between gap-4 px-3 py-2 rounded-lg border border-zinc-800/30">
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-600 text-[10px] shrink-0">✓</span>
                  <p className="text-xs text-zinc-500">{s.title}</p>
                </div>
                <span className="text-[10px] text-zinc-700 shrink-0 font-mono">{s.date}</span>
              </div>
            ))}
          </div>
        </details>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <div className="border-t border-zinc-800/40 pt-6 flex items-center justify-between">
          <p className="text-[9px] text-zinc-800 font-sans">localhost only · updated each session</p>
          <p className="font-amiri text-[#C9A84C]/20 text-lg">۞</p>
        </div>

      </div>
    </div>
  )
}
