"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH SABA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/saba
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Saba",
  arabicName: "سَبَأ",
  meaning: "The Kingdom of Sheba",
  number: 34,
  ayahCount: 54,
  period: "Makki",
  juz: 22,
  movements: 4,
  thesis:
    "A surah that opens with praise for a God who gives everything and closes with the image of a hand reaching for what it once held and can no longer touch — the arithmetic of blessing, measured in the distance between gratitude and ruin.",
  reflectionUrl: "/surahs/saba",
  readTime: "25 min read",

  sciencesActive: [{"key":"amthal","english":"Parables"},{"key":"qasas","english":"Quranic Narratives"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "وَقَلِيلٌ مِّنْ عِبَادِيَ الشَّكُورُ",
    ayahRef: "34:13",
    translation: "And few of My servants are truly grateful.",
    why: "Five words carrying the surah's entire thesis. Placed at the exact seam between the grateful prophets and the ungrateful nation, this parenthetical transforms the Saba narrative from history into diagnosis. The word qalil (few) against 'ibad (My servants) creates the tension the surah never resolves.",
  },

  audio: { surahNumber: 34, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Arithmetic of Blessing",
      subtitle: "Four movements: sovereignty → dynasties → confrontation → reckoning",
      sections: [
        { ayahs: "1–9", title: "The Praise & the Denial", color: "#4ecdc4", desc: "Opens with total praise — al-hamdu lillah — and total divine knowledge, down to sub-atomic detail. Against that backdrop, the deniers say the Hour will never come. The argument is surgical: if God knows every atom, the idea He cannot reassemble a body is not reason but failure of imagination." },
        { ayahs: "10–21", title: "The Parallel Dynasties", color: "#C9A84C", isPivot: true, desc: "Two dynasties blessed by God: Dawud and Sulayman, who channeled blessing through gratitude, and the people of Saba, who received gardens on their right and left and turned away. Same God, same generosity, opposite responses, opposite endings. The pivot: 'few of My servants are truly grateful.'" },
        { ayahs: "22–42", title: "The Confrontation", color: "#e07a8a", desc: "Every false support is stripped away. False gods own nothing, share nothing, help nothing. Intercession requires divine permission. Wealth is reframed as test, not proof. The social mechanism of denial is named: the wealthy mock the poor believers, using material status as theological evidence." },
        { ayahs: "43–54", title: "The Final Question", color: "#9b7fd4", desc: "Every ally collapses. The single prescription: stand alone before God and reflect. The deniers on Judgment Day reach for faith — tanawush — but the distance has become unbridgeable. A barrier is placed between them and what they desire. Time has run out." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's opening praise and closing barrier form a precise inversion",
      pairs: [
        {
          left: { label: "Divine Knowledge", ayahs: "1–9", desc: "Al-hamdu lillah — everything belongs to God, who knows what enters the earth and exits the sky. The Hour is certain." },
          right: { label: "The Hour Arrives", ayahs: "43–54", desc: "The denial is proven wrong. Faith is reached for too late. A barrier is placed between them and what they desire." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Blessings: the Grateful", ayahs: "10–14", desc: "Dawud and Sulayman — iron made soft, mountains singing, jinn laboring. Blessing channeled through worship." },
          right: { label: "False Supports Exposed", ayahs: "22–42", desc: "False gods own nothing. Wealth is test, not proof. Every intermediary between creature and Creator is removed." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Ungrateful Nation", ayahs: "15–21",
        desc: "Saba — two gardens, good land, a forgiving Lord. They turned away. God sent the flood. He tore them to utter pieces.",
        note: "Iblis confirmed his assumption about them. The Saba story is evidence in a trial that has been running since Adam.",
      },
    },
    deductiveFunnel: {
      title: "The Distance",
      subtitle: "Each stage measures the gap that ingratitude creates",
      layers: [
        { depth: 1, label: "Limitless Knowledge", ayah: "1–3", arabic: "الْحَمْدُ لِلَّهِ", desc: "God knows every atom in heaven and earth. His knowledge is the premise: if He knows all things, He can do all things, and resurrection is a promise, not a problem.", color: "#4ecdc4" },
        { depth: 2, label: "Gratitude as Labor", ayah: "13", arabic: "اعْمَلُوا آلَ دَاوُودَ شُكْرًا", desc: "The command to Dawud's household: work in gratitude. Blessing does not arrive for enjoyment — it arrives to be channeled back into worship. And few of His servants are truly grateful.", color: "#C9A84C" },
        { depth: 3, label: "The Squandered Garden", ayah: "15–19", arabic: "فَأَعْرَضُوا", desc: "They turned away. Two words. No catalog of sins, no explanation. The gardens become thorns. The people become a proverb. Mazzaqnahum kulla mumazzaq — torn to utter pieces.", color: "#e07a8a" },
        { depth: 4, label: "The Unreachable", ayah: "52–54", arabic: "وَأَنَّىٰ لَهُمُ التَّنَاوُشُ", desc: "The hand reaching for faith from too far away. The desire is sincere. The barrier is absolute. The surah that opened with limitless provision closes with a limitation no power can overcome.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence in Saba is a diagnosis — the surah is medicine for one specific disease",
      absences: [
        { item: "No extended comfort for the believers", note: "The surah mentions believers only glancingly (34:4, 34:37). No 'fear not,' no consolation passage, no paradise described in sensory detail. This is a surah written to confront the comfortable, not to console the suffering." },
        { item: "No command to worship", note: "No 'establish prayer,' no 'give zakah,' no ritual instruction. The single prescription is solitary reflection: stand before God, in pairs or alone, and think (34:46). The cure is not more practice but more honesty." },
        { item: "No paradise scene", note: "In a surah about provision and blessing, the afterlife reward is not described. The surah's energy is directed entirely at the living, at those who still have time, at those who have not yet become Saba." },
        { item: "No answer to the mockery", note: "The Quraysh's insults appear verbatim — 'a man who claims you'll be resurrected,' 'nothing but a man who wants to turn you from your fathers.' The surah does not defend the Prophet. It reframes: the objectors' problem is not intellectual but moral." },
        { item: "No repentance offered to Saba", note: "Unlike Thamud or 'Ad, who receive warnings and deadlines, Saba simply turned away and were torn apart. The absence of a prophetic warning in their story makes the parable more terrifying: the signs were the warning, and ignoring signs has no appeal process." },
      ],
    },
  },

  contentNodes: [
    { concept: "Mazzaqnahum — the tearing that became a proverb", type: "surah-specific", articleSlug: "mazzaqnahum-saba-proverb-34-19" },
    { concept: "Tanawush — reaching for faith too late", type: "surah-specific", articleSlug: "tanawush-unreachable-faith-34-52" },
    { concept: "Saba-Fatir diptych — paired openings of praise", type: "cross-surah", articleSlug: "saba-fatir-praise-diptych" },
    { concept: "Sulayman's death and the jinn — appearances masking reality", type: "cross-surah", articleSlug: "sulayman-death-jinn-34-14" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "distance", label: "Distance" },
  { id: "absent", label: "Absences" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider (matches surah pages)
// ══════════════════════════════════════════════════════════════════════════════

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">۞</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`;

  const toggle = () => {
    if (!audioRef.current) return;
    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };

  const seekTo = (clientX: number) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    seekTo(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 0) return;
    seekTo(e.clientX);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div>
          <div
            ref={progressRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"
          >
            <div
              className="h-full rounded-full bg-gold-500 transition-all duration-200 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">
          {fmt(currentTime)}/{fmt(duration)}
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          const t = e.currentTarget;
          setCurrentTime(t.currentTime);
          setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0);
        }}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }}
      />
    </div>
  );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) {
  return (
    <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3">
      <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
        {verse.arabic}
      </p>
      <p className="text-sm italic text-cream/70 font-body">{verse.translation}</p>
      <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p>
    </div>
  );
}


function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.sections.map((sec, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`}
            style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      {data.pairs.map((pair, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}>
            <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>
              {pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span>
            </div>
            <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p>
          </div>
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}>
            <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}>
              <span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}
            </div>
            <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p>
          </div>
        </div>
      ))}
      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">
          ✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span>
        </div>
        <p className="text-sm italic text-cream font-body">{data.center.desc}</p>
        <p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p>
      </div>
    </div>
  );
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.layers.map((layer, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? layer.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: layer.color,
              marginLeft: `${layer.depth * 6}px`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span>
            </div>
            <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>
              {layer.arabic}
            </p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Praise → gratitude → squandering → unreachable
      </div>
    </div>
  );
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.absences.map((a, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2">
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE SHELL — v3 (brand-aligned, proper tabs, ornaments)
// ══════════════════════════════════════════════════════════════════════════════

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;

  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} · {d.period}
          </p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>

          <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">
            {d.thesis}
          </p>

          <div className="flex justify-center gap-10 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500 font-serif">{d.ayahCount}</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayahs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500 font-serif">{d.movements}</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Movements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-500 font-serif">1</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivot</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />

        {/* ── Tab bar ──────────────────────────────────────────────────────── */}
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${
                  activeTab === tab.id
                    ? "bg-gold-500 text-navy-dark shadow-sm"
                    : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab content ──────────────────────────────────────────────────── */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "distance" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
        </div>

        {/* ── Go Deeper ────────────────────────────────────────────────────── */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
