"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-IKHLAS — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-ikhlas
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Al-Ikhlas",
  arabicName: "الإخلاص",
  meaning: "The Sincerity",
  number: 112,
  ayahCount: 4,
  period: "Makki",
  juz: 30,
  movements: 2,
  thesis:
    "Al-Ikhlas answers the largest question a human being can ask — who is God? — in four statements so compressed that nothing can be added to them and nothing can be removed.",
  reflectionUrl: "/surahs/al-ikhlas",
  readTime: "18 min read",

  sciencesActive: [{"key":"aqeedah","english":"Theology"},{"key":"ijaz","english":"Inimitability"},{"key":"nahw","english":"Grammar"}],
  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "ٱللَّهُ ٱلصَّمَدُ",
    ayahRef: "112:2",
    translation:
      "God, the Eternal Refuge — the one all things depend upon.",
    why: "The structural hinge between positive declaration and negation. Ayah 1 faces inward — who God is in Himself. Ayah 2 faces outward — who God is to everything else. It is the pivot where identity meets cosmic dependence, and everything after it is negation.",
    articleAnchor: "#the-cosmic-dependence",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 112,
    reciter: "ar.alafasy",
  },

  // ── Full Surah Text (micro surah — displayed above tabs) ──────────────────
  fullText: [
    {
      ayah: 1,
      arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
      ayahRef: "112:1",
      translation: "Say: He is God, the One — the Absolute.",
    },
    {
      ayah: 2,
      arabic: "ٱللَّهُ ٱلصَّمَدُ",
      ayahRef: "112:2",
      translation:
        "God, the Eternal Refuge — the one all things depend upon.",
    },
    {
      ayah: 3,
      arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      ayahRef: "112:3",
      translation: "He neither begets nor is He begotten.",
    },
    {
      ayah: 4,
      arabic: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ",
      ayahRef: "112:4",
      translation: "And there is none comparable to Him.",
    },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Deductive Funnel — command → attributes → negations
    deductiveFunnel: {
      title: "The Funnel",
      subtitle:
        "Command to declare, then positive identity, then systematic negation",
      layers: [
        {
          label: "Command",
          ayah: "1a",
          text: "Qul — Say",
          desc: "An imperative. Not information for consideration — a declaration being commanded. The grammar places the speaker in a posture of testimony.",
          color: "#d4a853",
          width: "100%",
        },
        {
          label: "Positive Identity",
          ayah: "1b",
          text: "Allāhu Aḥad",
          desc: "Who God is in Himself. Not wāḥid (numerical one) but Aḥad — an absolute, indivisible oneness that admits no comparison. The entire theological foundation of Islam in a single phrase.",
          color: "#4ecdc4",
          width: "85%",
        },
        {
          label: "Positive Relation",
          ayah: "2",
          text: "Allāhu'ṣ-Ṣamad",
          desc: "Who God is to everything else. The one all creation turns to in need. A hapax legomenon — this word appears nowhere else in the entire Quran.",
          color: "#9b7fd4",
          width: "70%",
        },
        {
          label: "First Negation",
          ayah: "3",
          text: "Lam yalid wa lam yūlad",
          desc: "What God does not do. The entire axis of biological metaphor applied to divinity is severed — no offspring forward, no origin backward.",
          color: "#e07a8a",
          width: "55%",
        },
        {
          label: "Final Seal",
          ayah: "4",
          text: "Wa lam yakun lahu kufuwan Aḥad",
          desc: "What nothing else can claim to be. The word Aḥad returns — first as divine attribute, now as emphatic negation. The surah is framed by this word.",
          color: "#e87461",
          width: "40%",
        },
      ],
    },

    // 2. Compression Viz — 4 ayahs = complete theology
    compression: {
      title: "The Diamond",
      subtitle:
        "One-third of the Quran compressed into four ayahs — the entirety of Islamic theology",
      elements: [
        {
          label: "Tawḥīd",
          ayah: "1",
          desc: "The oneness of God — not numerical oneness (wāḥid) but absolute, indivisible, unparalleled oneness (Aḥad). A word applied to God in this form only here.",
          color: "#4ecdc4",
        },
        {
          label: "Cosmic Dependence",
          ayah: "2",
          desc: "Aṣ-Ṣamad — the well in the desert, the refuge in the storm. Everything in creation moves toward God because everything is in need, and God is the only one who is not.",
          color: "#9b7fd4",
        },
        {
          label: "Anti-Genealogy",
          ayah: "3",
          desc: "The severing of every divine family tree. Active voice denies offspring; passive voice denies origin. Two directions, one clean cut.",
          color: "#e07a8a",
        },
        {
          label: "Incomparability",
          ayah: "4",
          desc: "The final wall. You cannot say 'God is like...' and complete the sentence truthfully. The mind reaches here and finds the end of its analogical capacity.",
          color: "#e87461",
        },
      ],
    },

    // 3. Absence Map — what Al-Ikhlas deliberately leaves out
    absenceMap: {
      title: "What's Missing",
      subtitle:
        "Every absence is a design choice — the surah discusses God's nature in relationship to nothing",
      absences: [
        {
          item: "No verb of divine action",
          note: "No 'He created,' 'He sustains,' 'He judges.' The most concentrated theological statement in the Quran does not describe God through what He does, but through what He is.",
        },
        {
          item: "No mercy attribute",
          note: "Ar-Raḥmān, ar-Raḥīm — absent. No divine attributes of mercy, power, knowledge, or creative force that populate the rest of the Quran. Everything stripped to identity alone.",
        },
        {
          item: "No narrative, no eschatology",
          note: "No creation account, no Day of Judgment, no destroyed nation, no parable, no angels, no jinn, no heaven, no hell. The surah answers one question and refuses to be distracted by any other.",
        },
        {
          item: "No persuasion",
          note: "No 'do you not see?' or 'have you not considered?' The surah does not build a case for monotheism. It announces it. The absence of any persuasive apparatus is itself the argument.",
        },
        {
          item: "No ethical instruction",
          note: "No command to pray, give charity, or treat others well. Al-Ikhlas tells you who God is. From that single piece of knowledge, everything else follows.",
        },
      ],
    },

    // 4. Sealed Room — four walls, each facing a different direction
    sealedRoom: {
      title: "The Sealed Room",
      subtitle:
        "Four walls, each closing off a different direction of theological escape",
      walls: [
        {
          direction: "Identity",
          ayah: "1",
          label: "Who God is in Himself",
          desc: "Absolute oneness — Aḥad. Not one among many, not one in a category. A oneness so singular that comparison requires two things of the same kind, and there is nothing of the same kind.",
          color: "#4ecdc4",
          facing: "inward",
        },
        {
          direction: "Relation",
          ayah: "2",
          label: "Who God is to everything else",
          desc: "Aṣ-Ṣamad — nominal sentence, no verb, timeless. This is not something God does or did. It is what God is. A verbal sentence would place the attribute in time. A nominal sentence places it outside time.",
          color: "#9b7fd4",
          facing: "outward",
        },
        {
          direction: "Negation",
          ayah: "3",
          label: "What God does not participate in",
          desc: "Generation in either direction. Lam yalid looks forward — nothing comes from God as offspring. Lam yūlad looks backward — nothing precedes God as origin. The entire generative chain is severed.",
          color: "#e07a8a",
          facing: "backward & forward",
        },
        {
          direction: "Incomparability",
          ayah: "4",
          label: "What nothing else can claim to be",
          desc: "Kufuwan fronted for emphasis — the negation is made comprehensive before the subject arrives. The mind reaches here and finds the end of its analogical capacity. That finding is itself a form of knowledge.",
          color: "#e87461",
          facing: "everywhere",
        },
      ],
      chiasm: {
        outer: "Identity ↔ Identity — Ayahs 1 & 4 address what God is and what nothing else is",
        inner: "Relation ↔ Relation — Ayahs 2 & 3 address the relationship between God and creation, first positively, then negatively",
        note: "The chiastic structure: Identity → Relation → Relation → Identity. The center of gravity falls between ayahs 2 and 3 — the hinge where affirming who God is becomes dismantling who God is not.",
      },
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "Aḥad versus Wāḥid — two kinds of oneness in the Quran",
      type: "surah-specific",
      searchIntent: "ahad vs wahid difference quran oneness",
      articleSlug: "ahad-wahid-oneness-quran",
      diagramRef: "deductiveFunnel",
    },
    {
      concept: "Aṣ-Ṣamad — the Quran's only hapax legomenon as divine name",
      type: "surah-specific",
      searchIntent: "what does as-samad mean quran hapax legomenon",
      articleSlug: "as-samad-hapax-quran",
      diagramRef: "compression",
    },
    {
      concept: "Al-Ikhlas and Āyat al-Kursī — cathedral versus diamond",
      type: "cross-surah",
      searchIntent: "al ikhlas ayat al kursi comparison theology",
      articleSlug: "ikhlas-kursi-theological-pair",
      diagramRef: "sealedRoom",
    },
    {
      concept: "The protective quartet — Al-Kāfirūn, Al-Ikhlas, Al-Falaq, An-Nās",
      type: "cross-surah",
      searchIntent: "four surahs before sleep protection quran",
      articleSlug: "protective-quartet-surahs",
      diagramRef: "absenceMap",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "funnel", label: "Funnel" },
  { id: "diamond", label: "Diamond" },
  { id: "room", label: "Sealed Room" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
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

function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) {
  return (
    <div className="space-y-5">
      {verses.map((v) => (
        <div key={v.ayah} className="space-y-1">
          <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
            {v.arabic}{" "}
            <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span>
          </p>
          <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p>
        </div>
      ))}
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
      <div className="space-y-2 flex flex-col items-center">
        {data.layers.map((layer, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              width: layer.width,
              backgroundColor: expanded === i ? layer.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: layer.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span>
            </div>
            <div className="text-xs italic text-cream/60 mt-1 font-body">{layer.text}</div>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Command → Positive identity → Positive relation → Negation → Seal
      </div>
    </div>
  );
}

function CompressionViz({ data }: { data: typeof SURAH_DATA.diagrams.compression }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.elements.map((el, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? el.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: el.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: el.color }}>{el.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{el.ayah}</span>
            </div>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{el.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        4 ayahs · 30 words · One-third of the Quran
      </div>
    </div>
  );
}

function SealedRoom({ data }: { data: typeof SURAH_DATA.diagrams.sealedRoom }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.walls.map((wall, i) => (
          <div
            key={i}
            className="rounded-xl p-4 space-y-2 border border-white/[0.06]"
            style={{
              backgroundColor: wall.color + "0a",
              borderLeftWidth: "3px",
              borderLeftColor: wall.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: wall.color }}>
                {wall.direction}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">
                Ayah {wall.ayah} · faces {wall.facing}
              </span>
            </div>
            <div className="text-xs font-medium text-cream font-sans">{wall.label}</div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{wall.desc}</p>
          </div>
        ))}
      </div>
      {/* Chiastic structure */}
      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 space-y-3">
        <div className="text-sm font-semibold text-gold-500 text-center font-serif">
          ✦ Chiastic Structure
        </div>
        <div className="space-y-2 text-xs text-cream/70 font-body">
          <p>
            <span className="text-[#4ecdc4] font-medium font-sans">Outer pair:</span>{" "}
            {data.chiasm.outer}
          </p>
          <p>
            <span className="text-[#9b7fd4] font-medium font-sans">Inner pair:</span>{" "}
            {data.chiasm.inner}
          </p>
        </div>
        <p className="text-xs text-cream-muted/60 font-body">{data.chiasm.note}</p>
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
          {activeTab === "funnel" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "diamond" && <CompressionViz data={d.diagrams.compression} />}
          {activeTab === "room" && <SealedRoom data={d.diagrams.sealedRoom} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
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
