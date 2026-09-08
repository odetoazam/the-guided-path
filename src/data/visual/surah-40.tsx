"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH GHAFIR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ghafir
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ghafir",
  arabicName: "غَافِر",
  meaning: "The Forgiver",
  number: 40,
  ayahCount: 85,
  period: "Makki",
  juz: 24,
  movements: 4,
  thesis:
    "A surah that holds God's mercy and God's severity in the same breath, places a single believing voice at the center of an empire's denial, and asks you to decide which direction you face while the door is still open.",
  reflectionUrl: "/surahs/ghafir",
  readTime: "22 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"qasas","english":"Quranic Narratives"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ",
    ayahRef: "40:60",
    translation: "And your Lord said, 'Call upon Me; I will respond to you.'",
    why: "After eighty ayahs of argument, counter-argument, historical evidence, and cosmic testimony, the surah arrives at this sentence. One verb. One promise. The entire surah has been building toward the question of whether people will call upon God or upon something else, and here the invitation is issued in its most undressed form.",
  },

  audio: { surahNumber: 40, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Four Movements",
      subtitle: "Declaration, drama, promise, reckoning",
      sections: [
        { ayahs: "1–20", title: "The Divine Self-Portrait", color: "#C9A84C", desc: "Four divine names in a single verse — Forgiver, Accepter of repentance, Severe in punishment, Owner of abundance. Then the angels praying for believers by name and relation, and a Judgment Day courtroom where the disbelievers confess too late." },
        { ayahs: "23–50", title: "The Believing Man's Speech", color: "#9b7fd4", isPivot: true, desc: "Musa sent to Pharaoh, stripped to argument alone — no miracles, no staff, no sea. Then the floor given to a man from Pharaoh's own household who concealed his faith and speaks. His argument builds through four moves: prudential reasoning, historical precedent, eschatological urgency, theological synthesis. Then: 'I entrust my affair to Allah.'" },
        { ayahs: "51–68", title: "The Promise and the Signs", color: "#4ecdc4", desc: "God's sworn promise to support His messengers. The diagnosis of kibr as the root of disputation. Then the simplest invitation in the Quran: 'Call upon Me; I will respond to you.' Creation as context for calling — night, day, earth, sky, the arc of a human life from dust to dust." },
        { ayahs: "69–85", title: "The Final Reckoning", color: "#e07a8a", desc: "Those who reject are dragged through boiling water. The hierarchy of tyranny collapses in the Fire. The established pattern of Allah: faith adopted only at the moment of visible consequence arrives too late. The door that was opened so wide in ayah 3 is shown shut." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Ghafir",
      subtitle: "The surah's entire architecture narrows to one man standing up",
      pairs: [
        {
          left: { label: "Divine Attributes", ayahs: "1–6", desc: "Forgiver, Accepter of repentance, Severe in punishment — the door swung wide open" },
          right: { label: "Sunnat Allah", ayahs: "69–85", desc: "Faith at the moment of punishment is too late — the door shown shut" },
          color: "#C9A84C",
        },
        {
          left: { label: "Angels' Intercession", ayahs: "7–9", desc: "The angels pray for believers, asking for their families, protection from evil deeds" },
          right: { label: "Creation Testifies", ayahs: "61–68", desc: "Night, day, earth, sky — all reasons to call upon the One who made them" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Too-Late Confession", ayahs: "10–20", desc: "Disbelievers confess on the Day — they believed when Allah was diluted, disbelieved when presented alone" },
          right: { label: "Call Upon Me", ayahs: "56–60", desc: "Arrogance diagnosed as the root of disputation, then the invitation: ud'uni astajib lakum" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Pharaoh's Plot", ayahs: "23–27", desc: "Pharaoh frames the murder of a prophet as public safety — the psychology of tyranny" },
          right: { label: "Pharaoh's Punishment", ayahs: "45–50", desc: "The Fire presented morning and evening — followers argue with leaders, hierarchy collapses" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Believing Man", ayahs: "28–44",
        desc: "A man who is not a prophet, has no army, no miracle — only his argument, his faith, and his willingness to speak.",
        note: "The entire surah, with all its cosmic architecture, narrows to one human being standing up. His final words — 'I entrust my affair to Allah' — are the hinge on which the surah turns.",
      },
    },
    deductiveFunnel: {
      title: "The Believing Man's Argument",
      subtitle: "Four rhetorical moves, each escalating the stakes",
      layers: [
        { depth: 1, label: "Prudential Reasoning", ayah: "28–29", arabic: "أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ", desc: "The calculated wager: if Musa is lying, his lie is upon him. If he is truthful, some of what he promises will strike you. An escape route that preserves Pharaoh's dignity.", color: "#4ecdc4" },
        { depth: 2, label: "Historical Precedent", ayah: "30–31", arabic: "إِنِّي أَخَافُ عَلَيْكُم مِّثْلَ يَوْمِ الْأَحْزَابِ", desc: "The destroyed civilizations — Nuh, 'Ad, Thamud. The word da'b (custom, pattern) is precise: destruction is not random divine anger but a recognizable sequence.", color: "#9b7fd4" },
        { depth: 3, label: "Eschatological Urgency", ayah: "32–33", arabic: "إِنِّي أَخَافُ عَلَيْكُمْ يَوْمَ التَّنَادِ", desc: "The Day of Mutual Calling — yawm al-tanad — unique to this surah. The Day of Judgment named by its sound: the day when every voice calls out and no one answers.", color: "#e07a8a" },
        { depth: 4, label: "Surrender", ayah: "44", arabic: "وَأُفَوِّضُ أَمْرِي إِلَى اللَّهِ", desc: "The verbal act of total delegation. He has argued, warned, invited, and testified. Now he releases the outcome. This is the hinge of the entire surah.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah strips the Musa narrative to its rhetorical core — every absence is structural",
      absences: [
        { item: "No miracles displayed", note: "No staff thrown, no plagues unleashed, no sea split. The surah skips the entire narrative of confrontation. What interests Ghafir is the argument, the verbal encounter, the moment where one man's speech stands against an empire's consensus." },
        { item: "No physical Paradise descriptions", note: "The rewards described are relational — being entered into gardens, being with righteous family members, being saved from evil deeds. The mercy in this surah is personal, intimate, familial." },
        { item: "No named Believing Man", note: "He is 'a believing man from Pharaoh's family.' No name, no biography, no backstory. The anonymity makes him a template — not a historical character but a permanent possibility." },
        { item: "No resolution to the concealment", note: "The surah says he concealed his faith and then spoke. It does not narrate the transition. The gap between concealment and speech is left for the reader to fill with their own experience." },
        { item: "No softening of the temporal condition", note: "The surah opens with forgiveness and closes by showing faith at the moment of visible punishment arriving too late. The mercy is infinite. The window is not. The surah holds both truths simultaneously." },
      ],
    },
  },

  contentNodes: [
    { concept: "The Believing Man's speech — courage from within", type: "surah-specific", articleSlug: "believing-man-speech-40-28-44" },
    { concept: "The angels' du'a for believers", type: "surah-specific", articleSlug: "angels-intercession-40-7-9" },
    { concept: "Ud'uni astajib lakum — the simplest invitation", type: "surah-specific", articleSlug: "call-upon-me-40-60" },
    { concept: "Yusuf-to-Musa: the prophetic chain to Egypt", type: "cross-surah", articleSlug: "yusuf-musa-egypt-chain-40-34" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "argument", label: "Argument" },
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
        Reason → precedent → urgency → surrender
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
            Surah {d.number} · {d.period} · Juz {d.juz}
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
          {activeTab === "argument" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
