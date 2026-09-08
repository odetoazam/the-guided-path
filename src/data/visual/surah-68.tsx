"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-QALAM — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-qalam
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Qalam",
  arabicName: "القَلَم",
  meaning: "The Pen",
  number: 68,
  ayahCount: 52,
  period: "Makki",
  juz: 29,
  movements: 4,
  thesis:
    "A surah that swears by the instrument of truth, declares the character of the one who carries it, and then shows — through a ruined garden and a returned accusation — what happens to those who dismiss both.",
  reflectionUrl: "/surahs/al-qalam",
  readTime: "25 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"qasas","english":"Quranic Narratives"}],
  heartVerse: {
    arabic: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ",
    ayahRef: "68:4",
    translation: "And indeed, you are of a great moral character.",
    why: "The single most important divine testimony about the Prophet's person. The word khuluq is not conduct or behaviour but the deep interior formation of a person. The surah argues that the Prophet's character is itself the refutation of every accusation against him.",
  },

  audio: { surahNumber: 68, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Trial",
      subtitle: "Four movements: vindication → parable → dismantling → return",
      sections: [
        { ayahs: "1–16", title: "The Defence and the Counter-Portrait", color: "#4ecdc4", desc: "The surah opens with an oath by the pen, declares the Prophet's supreme character, then pivots to paint a devastating portrait of his chief opponent — nine qualities of moral degradation catalogued in staccato rhythm, each landing like a gavel strike. Against the single quality of the Prophet (khuluq azim), the opponent requires nine descriptors." },
        { ayahs: "17–33", title: "The Parable of the Garden", color: "#e07a8a", desc: "Wealthy garden owners swear to harvest at dawn, deliberately timing their work so the poor will not come asking. They wake to find their garden destroyed overnight. They planned to deprive the poor. They became the deprived. The Arabic mahrum carries the weight of the entire surah's argument." },
        { ayahs: "34–41", title: "The Theological Dismantling", color: "#C9A84C", isPivot: true, desc: "A cascade of rhetorical questions, each removing one ground for the disbelievers' confidence. You have no book. You have no covenant. You have no guarantor. You have no partners. The earthly garden that was destroyed mirrors the heavenly garden that endures." },
        { ayahs: "42–52", title: "The Return", color: "#9b7fd4", desc: "The Day arrives — the shin laid bare, the call to prostrate they cannot answer. The Prophet is told to be patient, not to be like the companion of the whale. The accusation of madness returns from ayah 2, now exposed for what it always was. The surah closes on dhikr — remembrance, the deepest form of speech." },
      ],
    },
    chiasticRing: {
      title: "The Frame",
      subtitle: "The divine declaration and the human accusation bookend the surah — the distance between them is the argument",
      pairs: [
        {
          left: { label: "You Are Not Mad", ayahs: "1–7", desc: "Divine oath by the pen, supreme character declared, the accusation of madness refuted" },
          right: { label: "They Say: He Is Mad", ayahs: "48–52", desc: "The Yunus warning, patience commanded, the accusation repeated — now exposed as empty" },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Opponent's Portrait", ayahs: "8–16", desc: "Nine qualities of degradation in earthly glory — wealthy, surrounded by sons, morally bankrupt" },
          right: { label: "The Day's Portrait", ayahs: "42–47", desc: "The same type on Judgment Day — eyes humbled, unable to prostrate, progressively led to ruin" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "Character and Consequence", ayahs: "17–41",
        desc: "The garden parable shows the earthly cost of selfishness. The theological section shows the eternal cost. Together: what character costs is the same whether the garden is earthly or heavenly.",
        note: "The pivot falls at ayahs 26-27 — the moment the garden owners see the destruction and say: 'We are the deprived.' The people who planned to deprive others discover they have deprived themselves.",
      },
    },
    deductiveFunnel: {
      title: "From Speech to Silence",
      subtitle: "The surah tracks a movement from human noise to divine remembrance",
      layers: [
        { depth: 1, label: "Oaths & Declarations", ayah: "1–4", arabic: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ", desc: "The opening is full of speech acts — divine oaths, declarations, commands. The pen is invoked. The Prophet's character is proclaimed. Every word carries cosmic weight.", color: "#4ecdc4" },
        { depth: 2, label: "Slander & Conspiracy", ayah: "10–24", arabic: "وَهُمْ يَتَخَافَتُونَ", desc: "The opponent is defined by corrupt speech: swearing, slandering, gossiping, dismissing. The garden owners speak constantly: planning, whispering, conspiring to exclude the poor. Speech misused at every level.", color: "#e07a8a" },
        { depth: 3, label: "Questions & Dismantling", ayah: "35–41", arabic: "مَا لَكُمْ كَيْفَ تَحْكُمُونَ", desc: "A cascade of unanswerable questions. Each one strips away a false assurance. The questions tighten like a vise until nothing remains but the bare assumption that has already been demolished.", color: "#9b7fd4" },
        { depth: 4, label: "Patience & Remembrance", ayah: "48–52", arabic: "وَمَا هُوَ إِلَّا ذِكْرٌ لِّلْعَالَمِينَ", desc: "The Prophet is told to be patient — to not speak in frustration. The accusers try to unsettle him with their eyes, not words. The surah ends on dhikr — remembrance directed toward God rather than against people. The pen opened the surah. Remembrance closes it.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah operates entirely in the domain of character and consequence",
      absences: [
        { item: "No legal commands", note: "No dietary laws, no prayer instructions, no social legislation. The surah does not instruct. It vindicates the Prophet, tells a parable, and dismantles the accusers' position. The entire argument is about character." },
        { item: "No destroyed ancient nations", note: "No 'Ad, no Thamud, no people of Lot. The usual Makkan catalogue of civilizational destruction is replaced by a story about rich people who didn't share their food. The scale shrinks to make the moral larger." },
        { item: "No dramatic sin in the parable", note: "The garden owners did not commit violence or worship idols. They adjusted their schedule. They set their alarm earlier. They harvested before the poor arrived. The sin is the quiet engineering of exclusion." },
        { item: "No answer to the accusation", note: "The surah does not refute the accusation of madness at the end. It simply lets the accusers repeat it after fifty ayahs of evidence. The repetition indicts them. Their inability to say anything new is itself the proof." },
        { item: "No resolution for the garden owners", note: "Their final words contain fragile hope — perhaps our Lord will substitute for us one better. The surah does not say whether this hope was fulfilled. It draws the lesson and moves on." },
      ],
    },
  },

  contentNodes: [
    { concept: "Khuluq 'azim — character as proof of prophethood", type: "surah-specific", articleSlug: "khuluq-azim-68-4" },
    { concept: "The garden parable — engineering exclusion", type: "surah-specific", articleSlug: "garden-parable-68-17-33" },
    { concept: "Al-Mulk–Al-Qalam diptych: cosmos and character", type: "cross-surah", articleSlug: "mulk-qalam-diptych-67-68" },
    { concept: "Yunus and the whale — patience under siege", type: "cross-surah", articleSlug: "yunus-whale-patience-68-48" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "trial", label: "Trial" },
  { id: "frame", label: "Frame" },
  { id: "speech", label: "Speech" },
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
        Oaths → slander → dismantling → remembrance
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
          {activeTab === "trial" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "frame" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "speech" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
