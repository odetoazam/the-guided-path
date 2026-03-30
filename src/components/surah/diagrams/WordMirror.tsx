'use client'

// wordMirror (surah 111) and smallestWord (surah 107) data shapes
//
// wordMirror:
// { title, subtitle, mirrors: [{ word, color, inName, inSentence }] }
//
// smallestWord:
// { title, subtitle, arc, keyInsight, poles: [{ position, ayah, arabic, transliteration, meaning, color }] }

interface Mirror {
  word: string
  color: string
  inName: string
  inSentence: string
}

interface WordMirrorData {
  title: string
  subtitle: string
  mirrors: Mirror[]
}

interface Pole {
  position: string
  ayah: string
  arabic: string
  transliteration: string
  meaning: string
  color: string
}

interface SmallestWordData {
  title: string
  subtitle: string
  arc: string
  keyInsight: string
  poles: Pole[]
}

type WordDiagramData = WordMirrorData | SmallestWordData

function isSmallestWord(data: WordDiagramData): data is SmallestWordData {
  return 'poles' in data
}

export function WordMirror({ data }: { data: WordDiagramData }) {
  if (isSmallestWord(data)) return <SmallestWordView data={data} />
  return <MirrorView data={data as WordMirrorData} />
}

function MirrorView({ data }: { data: WordMirrorData }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-4">
        {data.mirrors.map((mirror, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.06] overflow-hidden"
            style={{ borderLeftWidth: '3px', borderLeftColor: mirror.color }}
          >
            {/* Word header */}
            <div className="px-4 pt-3 pb-2 flex items-center gap-2">
              <span
                className="text-sm font-semibold font-serif px-2 py-0.5 rounded-full"
                style={{ color: mirror.color, backgroundColor: mirror.color + '20' }}
              >
                {mirror.word}
              </span>
            </div>

            {/* Two columns: in the name vs in the sentence */}
            <div className="px-4 pb-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/[0.04] p-3">
                <div className="text-xs font-semibold font-sans mb-1.5 text-cream-muted/50">
                  In the name
                </div>
                <p className="text-xs text-cream/60 font-body leading-relaxed">{mirror.inName}</p>
              </div>
              <div
                className="rounded-lg p-3"
                style={{ backgroundColor: mirror.color + '10' }}
              >
                <div className="text-xs font-semibold font-sans mb-1.5" style={{ color: mirror.color }}>
                  In the sentence
                </div>
                <p className="text-xs text-cream/70 font-body leading-relaxed">{mirror.inSentence}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SmallestWordView({ data }: { data: SmallestWordData }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      {/* Two poles */}
      <div className="space-y-2">
        {data.poles.map((pole, i) => (
          <div
            key={i}
            className="rounded-xl p-4 border border-white/[0.06]"
            style={{ borderLeftWidth: '3px', borderLeftColor: pole.color, backgroundColor: pole.color + '08' }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-semibold font-sans uppercase tracking-wide" style={{ color: pole.color }}>
                {pole.position}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{pole.ayah}</span>
            </div>
            <p className="text-xl font-amiri text-cream/80 text-right mb-1" dir="rtl">{pole.arabic}</p>
            <p className="text-sm font-serif italic text-cream/70 mb-1">{pole.transliteration}</p>
            <p className="text-xs text-cream/50 font-body">{pole.meaning}</p>
          </div>
        ))}
      </div>

      {/* Arc connection */}
      <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-3">
        <p className="text-sm text-cream/70 font-body leading-relaxed">{data.arc}</p>
      </div>

      {/* Key insight */}
      {data.keyInsight && (
        <div className="rounded-xl border border-white/[0.06] px-4 py-3">
          <div className="text-xs font-semibold text-cream-muted/50 font-sans uppercase tracking-wide mb-1.5">
            Key Insight
          </div>
          <p className="text-sm text-cream/70 font-body leading-relaxed italic">{data.keyInsight}</p>
        </div>
      )}
    </div>
  )
}
