"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-ASR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-asr
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Al-'Asr",
  arabicName: "العصر",
  meaning: "The Declining Day",
  number: 103,
  ayahCount: 3,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "Al-Asr holds the entire human species over the ledger of time and shows that the only transactions that survive the audit are faith carried into action and truth carried between people.",
  reflectionUrl: "/surahs/al-asr",
  readTime: "20 min read",

  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ",
    ayahRef: "103:2",
    translation: "Indeed, humanity is in loss.",
    why: "The most universal negative statement about the human condition in the entire Quran. Double emphasis — inna and the lam of emphasis together — grammatically seals every exit. Every single human being is included.",
    articleAnchor: "#the-verdict",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 103,
    reciter: "ar.alafasy",
  },

  // ── Full Surah Text ────────────────────────────────────────────────────────
  fullText: [
    {
      ayah: 1,
      arabic: "وَٱلْعَصْرِ",
      ayahRef: "103:1",
      translation: "By time.",
    },
    {
      ayah: 2,
      arabic: "إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ",
      ayahRef: "103:2",
      translation: "Indeed, humanity is in loss.",
    },
    {
      ayah: 3,
      arabic:
        "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ",
      ayahRef: "103:3",
      translation:
        "Except those who believe, and do righteous deeds, and counsel one another to truth, and counsel one another to patience.",
    },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Deductive Funnel — oath → verdict → exception
    deductiveFunnel: {
      title: "The Funnel",
      subtitle: "Three ayahs, one airtight syllogism: oath → verdict → exception",
      stages: [
        {
          ayahs: "1",
          title: "The Oath",
          arabic: "وَٱلْعَصْرِ",
          color: "#4ecdc4",
          width: "100%",
          desc: "God swears by al-\u2018asr — time, the declining afternoon, the epoch. The root \u2018ayn-sad-ra holds the image of pressing or squeezing. Time is not neutral; it is an active force that diminishes everything it touches.",
        },
        {
          ayahs: "2",
          title: "The Verdict",
          arabic: "إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ",
          color: "#e07a8a",
          width: "70%",
          isPivot: true,
          desc: "All of humanity is in loss — khusr, a commercial term for capital bleeding away. The preposition fi means immersion: you are inside loss the way a fish is in water. Two emphatic particles seal every exit.",
        },
        {
          ayahs: "3",
          title: "The Exception",
          arabic:
            "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ",
          color: "#d4a853",
          width: "40%",
          desc: "After total closure, illa opens like a door in a wall with no visible seam. Four conditions joined by wa (and) — not a menu but a compound key. Remove any one and the equation returns to loss.",
        },
      ],
    },

    // 2. Four Conditions — the compound key from ayah 3
    fourConditions: {
      title: "The Four Conditions",
      subtitle: "The only exit from loss — all four required simultaneously",
      pairs: [
        {
          title: "Individual",
          color: "#4ecdc4",
          conditions: [
            {
              label: "Āmanū — Faith",
              arabic: "ءَامَنُوا۟",
              desc: "The internal foundation. What you hold to be true. Vertical — between the person and God. Faith comes first because you cannot act rightly without a foundation of belief.",
            },
            {
              label: "'Amilu al-ṣāliḥāt — Righteous Deeds",
              arabic: "عَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ",
              desc: "The external expression. What truth produces in the world. Action inseparable from faith — belief without deeds is a seed that never breaks soil.",
            },
          ],
        },
        {
          title: "Communal",
          color: "#9b7fd4",
          conditions: [
            {
              label: "Tawāṣaw bi al-ḥaqq — Mutual Counsel to Truth",
              arabic: "تَوَاصَوْا۟ بِٱلْحَقِّ",
              desc: "The tafa\u2018ul form — reciprocal action. Not one person advising another, but a community where truth-telling flows in every direction. Al-haqq: what actually is, what is actually required. The opposite of illusion.",
            },
            {
              label: "Tawāṣaw bi al-ṣabr — Mutual Counsel to Patience",
              arabic: "تَوَاصَوْا۟ بِٱلصَّبْرِ",
              desc: "Al-sabr from the root sad-ba-ra: binding, restraining, holding firm. Not passive waiting but active restraint under pressure. Truth without patience produces burnout. Patience without truth is endurance in the wrong direction.",
            },
          ],
        },
      ],
      logic: "everything → loss → except (A and B and C and D). Take away any variable and the equation returns to loss.",
    },

    // 3. Compression Viz — 14 words containing the entire human condition
    compression: {
      title: "The Density",
      subtitle:
        "14 Arabic words. Imam al-Shafi\u2018i said if nothing else had been revealed, this surah alone would have been enough.",
      elements: [
        {
          label: "Time as Force",
          ayah: "1",
          desc: "Al-\u2018asr — not a neutral medium but an active force that squeezes, extracts, diminishes. The oath names the evidence and the crime in a single word.",
          color: "#4ecdc4",
        },
        {
          label: "Universal Loss",
          ayah: "2",
          desc: "The most absolute negative claim about humanity in the Quran. Inna + la-fi: double grammatical emphasis. No other ayah seals the exits this completely.",
          color: "#e07a8a",
        },
        {
          label: "The Pivot Word",
          ayah: "3a",
          desc: "Illa — \u2018except\u2019 — carries the weight of the entire surah\u2019s mercy. Without it, this surah is a death sentence. With it, the condemnation becomes a rescue manual.",
          color: "#d4a853",
        },
        {
          label: "Individual Escape",
          ayah: "3b",
          desc: "Faith and righteous deeds — the private, vertical relationship. What you believe and what that belief produces. Necessary but insufficient.",
          color: "#9b7fd4",
        },
        {
          label: "Communal Escape",
          ayah: "3c",
          desc: "Mutual truth and mutual patience — the radical social claim. Individual righteousness is structurally insufficient. You cannot exit loss alone.",
          color: "#e0a848",
        },
        {
          label: "Cosmic → Intimate",
          ayah: "1–3",
          desc: "The surah moves from the largest scale — time, the epoch — to the most intimate: two people reminding each other to hold on. The answer to cosmic-scale loss is found in the smallest human act.",
          color: "#4dbb9b",
        },
      ],
    },

    // 4. Absence Map — what Al-Asr deliberately leaves out
    absenceMap: {
      title: "What's Missing",
      subtitle: "The absence of every conventional rhetorical tool is itself the strategy",
      absences: [
        {
          item: "No mention of Allah by name",
          note: "The divine voice is unmistakable — who else swears by time itself? The speaker\u2019s identity is encoded in the grammar, not the vocabulary. The oath form (wa al-\u2018asr) is a speech act only God performs.",
        },
        {
          item: "No Prophet mentioned",
          note: "No Muhammad, no Ibrahim, no Musa. The surah delivers a universal principle without any narrative vehicle. Direct declaration, not prophetic story.",
        },
        {
          item: "No paradise or hellfire",
          note: "No promise of reward, no threat of punishment. Only a diagnosis and a prescription. The surah does not argue, persuade, threaten, or console. It declares.",
        },
        {
          item: "No stories, no commands, no questions",
          note: "Every conventional Quranic rhetorical tool is absent. When the truth is this compressed, ornament would be noise. Three ayahs. Fourteen words. Nothing to hide behind.",
        },
        {
          item: "No possibility of going solo",
          note: "The four conditions require community — tawasaw is reciprocal. A person with faith and good deeds but no community of mutual truth-telling is still, by the logic of this surah, inside the loss.",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "Khusr — the commercial metaphor for existential loss",
      type: "cross-surah",
      searchIntent: "khusr loss commercial metaphor quran al asr",
      articleSlug: "khusr-loss-commercial-metaphor",
      diagramRef: "deductiveFunnel",
    },
    {
      concept: "Tafa\u2018ul verb form — reciprocity as grammatical structure",
      type: "surah-specific",
      searchIntent: "tafaul mutual verb form arabic quran tawasaw",
      articleSlug: "tafaul-reciprocity-quran",
      diagramRef: "fourConditions",
    },
    {
      concept: "Al-Asr and Al-Fatiha — the path and its four requirements",
      type: "cross-surah",
      searchIntent: "al asr al fatiha four conditions straight path",
      articleSlug: "asr-fatiha-path-conditions",
      diagramRef: "compression",
    },
    {
      concept: "The surah\u2019s frame: al-\u2018asr (time presses) to al-sabr (patience holds)",
      type: "surah-specific",
      searchIntent: "al asr sabr time patience frame structure",
      articleSlug: "asr-sabr-frame-structure",
      diagramRef: "absenceMap",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "funnel", label: "Funnel" },
  { id: "conditions", label: "Conditions" },
  { id: "density", label: "Density" },
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

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * audioRef.current.duration;
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
            onClick={seek}
            className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"
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
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="space-y-3 flex flex-col items-center">
        {data.stages.map((stage, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 space-y-2 border ${stage.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`}
            style={{
              width: stage.width,
              backgroundColor: stage.color + "0a",
              borderLeftWidth: "3px",
              borderLeftColor: stage.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: stage.color }}>{stage.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayah {stage.ayahs}</span>
            </div>
            <p className="text-base leading-relaxed text-right text-cream font-amiri" style={{ direction: "rtl" }}>
              {stage.arabic}
            </p>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{stage.desc}</p>
            {stage.isPivot && (
              <div className="text-xs text-gold-500 font-medium font-sans">✦ The universal verdict — double emphasis, no exit</div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center space-y-1">
        <div className="text-xs text-cream-muted/50 font-sans">
          100% of humanity → all in loss → except those who meet all 4 conditions
        </div>
        <div className="text-xs text-gold-500 font-sans">
          The narrowing is the argument
        </div>
      </div>
    </div>
  );
}

function FourConditions({ data }: { data: typeof SURAH_DATA.diagrams.fourConditions }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      {data.pairs.map((pair, pi) => (
        <div key={pi} className="space-y-2">
          <div className="text-xs font-medium tracking-wider uppercase font-sans" style={{ color: pair.color }}>
            {pair.title}
          </div>
          {pair.conditions.map((cond, ci) => {
            const key = `${pi}-${ci}`;
            return (
              <button
                key={key}
                onClick={() => setExpanded(expanded === key ? null : key)}
                className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
                style={{
                  backgroundColor: expanded === key ? pair.color + "12" : "transparent",
                  borderLeftWidth: "3px",
                  borderLeftColor: pair.color,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium font-sans" style={{ color: pair.color }}>
                    {cond.label}
                  </span>
                  <span className="text-base text-cream font-amiri">
                    {cond.arabic}
                  </span>
                </div>
                {expanded === key && (
                  <p className="text-sm text-cream/70 mt-2 leading-relaxed font-body">{cond.desc}</p>
                )}
              </button>
            );
          })}
          {pi < data.pairs.length - 1 && (
            <div className="flex justify-center py-1">
              <div className="text-xs text-cream-muted/50 font-sans">+</div>
            </div>
          )}
        </div>
      ))}

      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">✦ The Compound Key</div>
        <p className="text-xs text-cream/70 leading-relaxed font-mono font-body">
          {data.logic}
        </p>
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
            className="w-full text-left rounded-xl p-3 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? el.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: el.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium font-sans" style={{ color: el.color }}>
                {el.label}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{el.ayah}</span>
            </div>
            {expanded === i && (
              <p className="text-sm text-cream/70 mt-2 leading-relaxed font-body">{el.desc}</p>
            )}
          </button>
        ))}
      </div>

      <div className="text-center text-xs text-cream-muted/50 font-sans">
        3 ayahs · 14 words · The entire human condition
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
          {activeTab === "conditions" && <FourConditions data={d.diagrams.fourConditions} />}
          {activeTab === "density" && <CompressionViz data={d.diagrams.compression} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
              <AudioPlayer audio={d.audio} />
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
