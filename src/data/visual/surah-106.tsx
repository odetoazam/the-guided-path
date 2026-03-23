"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH QURAYSH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/quraysh
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Quraysh",
  arabicName: "قريش",
  meaning: "The Quraysh",
  number: 106,
  ayahCount: 4,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "Quraysh is a surah that stands in the doorway of a comfortable home and asks — quietly, without raising its voice — whether the family inside remembers who built the house.",
  reflectionUrl: "/surahs/quraysh",
  readTime: "14 min read",

  sciencesActive: [{"key":"nahw","english":"Grammar"},{"key":"balaghah","english":"Rhetoric"},{"key":"munasabat","english":"Inter-surah Connections"}],
  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ",
    ayahRef: "106:3",
    translation:
      "Let them worship the Lord of this House.",
    why: "The surah's entire weight rests on this single imperative. The fa is the hinge between context and command. The choice of Rabb over other divine names, and the demonstrative hadha pointing physically to the Ka'bah, make this one of the most compressed theological arguments in the Quran.",
    articleAnchor: "#the-single-command",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 106,
    reciter: "ar.alafasy",
  },

  // ── Full Surah Text ────────────────────────────────────────────────────────
  fullText: [
    {
      ayah: 1,
      arabic: "لِإِيلَافِ قُرَيْشٍ",
      ayahRef: "106:1",
      translation: "For the solidarity of Quraysh —",
    },
    {
      ayah: 2,
      arabic: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ",
      ayahRef: "106:2",
      translation:
        "their solidarity through the caravan of winter and of summer.",
    },
    {
      ayah: 3,
      arabic: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ",
      ayahRef: "106:3",
      translation: "Let them worship the Lord of this House.",
    },
    {
      ayah: 4,
      arabic: "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ",
      ayahRef: "106:4",
      translation:
        "The One who fed them against hunger and secured them against fear.",
    },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Causal Chain — the surah as a single logical argument
    causalChain: {
      title: "The Argument",
      subtitle:
        "A single causal chain in four links: cause, consequence, evidence",
      links: [
        {
          ayahs: "1",
          label: "The Covenant",
          arabic: "لِإِيلَافِ قُرَيْشٍ",
          role: "Cause (lam)",
          color: "#4ecdc4",
          desc: "The opening lam introduces the reason. Ilaf — a word found nowhere else in the Quran — names the web of trade covenants that held Quraysh's world together.",
        },
        {
          ayahs: "2",
          label: "The Journeys",
          arabic: "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ",
          role: "Specification",
          color: "#9b7fd4",
          desc: "The repetition of ilaf slows the listener down and specifies: winter south to Yemen, summer north to Syria. Two seasons = the totality of time. Everything Quraysh has flows through these journeys.",
        },
        {
          ayahs: "3",
          label: "The Command",
          arabic: "فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ",
          role: "Consequence (fa)",
          color: "#d4a853",
          isPivot: true,
          desc: "The fa is the hinge. Because of all that — worship. Not 'worship Allah' or 'worship the Creator' but Rabb hadha al-bayt: the Lord of this House. The demonstrative hadha points physically at the Ka'bah.",
        },
        {
          ayahs: "4",
          label: "The Two Gifts",
          arabic: "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ",
          role: "Evidence (alladhi)",
          color: "#e07a8a",
          desc: "Two rescues. Food against hunger, safety against fear. The most primal pair of human vulnerabilities, answered. The preposition min carries the meaning of deliverance from.",
        },
      ],
    },

    // 2. Twin Surah — Al-Fil + Quraysh as a paired argument
    twinSurah: {
      title: "The Twin",
      subtitle:
        "Al-Fil (105) and Quraysh (106) — one storm, one morning after",
      left: {
        surah: "Al-Fil (105)",
        theme: "The Storm",
        color: "#e07a8a",
        desc: "God destroys the elephant army of Abraha to protect the House. Dramatic rescue. Cosmic intervention. Destruction of those who threaten the sanctuary.",
        finalImage: "An army reduced to consumed straw",
      },
      right: {
        surah: "Quraysh (106)",
        theme: "The Morning After",
        color: "#4ecdc4",
        desc: "The quiet prosperity that followed. Covenants hold, caravans travel, food arrives, fear departs. The same God, the same House — but now provision instead of destruction.",
        finalImage: "A family fed and made safe",
      },
      connection:
        "Classical scholars debated whether they were originally one surah. The opening lam of Quraysh may be grammatically dependent on Al-Fil: God destroyed the army so that Quraysh could keep their covenants. One shows what He does to those who threaten the House. The other shows what He does for those who live beside it.",
    },

    // 3. Absence Map — what Quraysh deliberately leaves out
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence is a design choice — and this surah's silence is its loudest feature",
      absences: [
        {
          item: "No consequences stated",
          note: "No reward for obedience, no punishment for refusal. Where nearly every Makkan surah pairs its call with a warning, Quraysh simply names the blessings and goes silent. The reader's own conscience supplies what comes next.",
        },
        {
          item: "No afterlife",
          note: "No Day of Judgment, no paradise, no hellfire. The surah strips away every layer of theological argument and leaves only the barest transaction: you received; now respond.",
        },
        {
          item: "No prophets, no scripture, no stories",
          note: "No angels, no destroyed peoples, no prior revelations. The word kafir does not appear. The word iman does not appear. Gratitude is so fundamental it precedes every other religious obligation.",
        },
        {
          item: "No second command",
          note: "Only one verb in the imperative mood in the entire surah: fal-ya'budu. The architecture is a funnel — two ayahs of context, one command, one justification. The surah says one thing and stops.",
        },
      ],
    },

    // 4. Elemental Pair — hunger/food and fear/safety
    elementalPair: {
      title: "The Two Rescues",
      subtitle: "Ayah 4 reduces all blessings to the most primal pair",
      pairs: [
        {
          deprivation: "Hunger (ju')",
          provision: "Food (at'amahum)",
          color: "#d4a853",
          domain: "Body",
          desc: "Makkah sits in a barren valley — wadin ghayri dhi zar', a valley without cultivation. The food came through trade, the trade through covenants, the covenants through divine protection. Every meal is the last link in a chain whose first link is divine intervention.",
        },
        {
          deprivation: "Fear (khawf)",
          provision: "Safety (amanahum)",
          color: "#4ecdc4",
          domain: "Soul",
          desc: "The root a-m-n gives us aman (safety), iman (faith), and amin (trustworthy). Makkah was a haram — a sanctuary of inviolable peace. That peace was granted, not natural. The surah's final word — khawf — names the condition everyone around them lived in and that they, uniquely, did not.",
        },
      ],
      rootNote:
        "The root a-m-n in amanahum connects to Ibrahim's prayer in Al-Baqarah (2:126): 'My Lord, make this a city of safety.' Quraysh's security is the fulfillment of a prophetic supplication made generations before they existed.",
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "Ilaf — the unique Quranic word for Quraysh's trade covenants",
      type: "surah-specific",
      searchIntent: "what is ilaf quraysh trade covenant meaning",
      articleSlug: "ilaf-quraysh-covenant",
      diagramRef: "causalChain",
    },
    {
      concept: "Al-Fil and Quraysh as a twin-surah pair",
      type: "cross-surah",
      searchIntent: "al fil quraysh twin surah connection paired",
      articleSlug: "al-fil-quraysh-twin-surahs",
      diagramRef: "twinSurah",
    },
    {
      concept: "The root a-m-n — from aman to iman",
      type: "cross-surah",
      searchIntent: "root a-m-n aman iman safety faith quran",
      articleSlug: "root-amn-safety-faith-quran",
      diagramRef: "elementalPair",
    },
    {
      concept: "Comfortable forgetfulness — when blessings become invisible",
      type: "surah-specific",
      searchIntent: "quraysh comfortable forgetfulness blessings routine",
      articleSlug: "quraysh-comfortable-forgetfulness",
      diagramRef: "absenceMap",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "chain", label: "Argument" },
  { id: "twin", label: "Twin" },
  { id: "absent", label: "Absences" },
  { id: "rescues", label: "Rescues" },
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

function CausalChain({ data }: { data: typeof SURAH_DATA.diagrams.causalChain }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="space-y-3">
        {data.links.map((link, i) => (
          <div key={i}>
            <div
              className={`rounded-xl p-4 space-y-2 border ${link.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`}
              style={{
                backgroundColor: link.color + "0a",
                borderLeftWidth: "3px",
                borderLeftColor: link.color,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold font-serif" style={{ color: link.color }}>
                  {link.label}
                </span>
                <span className="text-xs text-cream-muted/50 font-sans">
                  Ayah {link.ayahs} · {link.role}
                </span>
              </div>
              <p className="text-base leading-relaxed text-right text-cream font-amiri" style={{ direction: "rtl" }}>
                {link.arabic}
              </p>
              <p className="text-sm text-cream/70 leading-relaxed font-body">{link.desc}</p>
              {link.isPivot && (
                <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot — the only imperative in the surah</div>
              )}
            </div>
            {i < data.links.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="text-cream-muted/50 text-xs font-sans">↓</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-cream-muted/50 font-sans">
        4 ayahs · 27 words · A syllogism dressed as a hymn
      </div>
    </div>
  );
}

function TwinSurah({ data }: { data: typeof SURAH_DATA.diagrams.twinSurah }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="flex gap-2">
        <div
          className="flex-1 rounded-xl p-3 border border-white/[0.06] space-y-3"
          style={{ borderLeftWidth: "3px", borderLeftColor: data.left.color }}
        >
          <div className="text-xs font-semibold font-sans" style={{ color: data.left.color }}>
            {data.left.surah}
          </div>
          <div className="text-sm font-medium font-serif" style={{ color: data.left.color }}>
            {data.left.theme}
          </div>
          <p className="text-xs text-cream/60 leading-relaxed font-body">{data.left.desc}</p>
          <div className="text-xs text-cream-muted/50 italic font-body">{data.left.finalImage}</div>
        </div>
        <div
          className="flex-1 rounded-xl p-3 border border-white/[0.06] space-y-3"
          style={{ borderRightWidth: "3px", borderRightColor: data.right.color }}
        >
          <div className="text-xs font-semibold text-right font-sans" style={{ color: data.right.color }}>
            {data.right.surah}
          </div>
          <div className="text-sm font-medium text-right font-serif" style={{ color: data.right.color }}>
            {data.right.theme}
          </div>
          <p className="text-xs text-cream/60 leading-relaxed text-right font-body">{data.right.desc}</p>
          <div className="text-xs text-cream-muted/50 italic text-right font-body">{data.right.finalImage}</div>
        </div>
      </div>

      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">✦ The Connection</div>
        <p className="text-sm text-cream/70 leading-relaxed font-body">{data.connection}</p>
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

function ElementalPair({ data }: { data: typeof SURAH_DATA.diagrams.elementalPair }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="space-y-3">
        {data.pairs.map((pair, i) => (
          <div
            key={i}
            className="rounded-xl p-4 space-y-3 border border-white/[0.06]"
            style={{
              backgroundColor: pair.color + "0a",
              borderLeftWidth: "3px",
              borderLeftColor: pair.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: pair.color }}>
                {pair.domain}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">
                {pair.deprivation} → {pair.provision}
              </span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{pair.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">✦ Root Connection: a-m-n</div>
        <p className="text-sm text-cream/70 leading-relaxed font-body">{data.rootNote}</p>
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
          {activeTab === "chain" && <CausalChain data={d.diagrams.causalChain} />}
          {activeTab === "twin" && <TwinSurah data={d.diagrams.twinSurah} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "rescues" && <ElementalPair data={d.diagrams.elementalPair} />}
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
