"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-FATIHA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-fatiha
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Al-Fatiha",
  arabicName: "الفاتحة",
  meaning: "The Opening",
  number: 1,
  ayahCount: 7,
  period: "Makki",
  juz: 1,
  movements: 3,
  thesis:
    "Al-Fatiha is the conversation God designed for you to have with Him — direct, unmediated, and so perfectly constructed that you can recite it ten thousand times and still find something you hadn't seen.",
  reflectionUrl: "/surahs/al-fatiha",
  readTime: "18 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"nahw","english":"Grammar"},{"key":"aqeedah","english":"Theology"}],
  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    ayahRef: "1:5",
    translation:
      "You alone we worship, and You alone we ask for help.",
    why: "The hinge of the entire surah. Everything before it describes God in third person; this verse turns and speaks to Him directly. It is the moment of arrival.",
    articleAnchor: "#the-hinge",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 1,
    reciter: "ar.alafasy",
  },

  // ── Full Surah Text ───────────────────────────────────────────────────────
  fullText: [
    {
      ayah: 1,
      arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
      ayahRef: "1:1",
      translation: "In the name of God, the Most Gracious, the Most Merciful.",
    },
    {
      ayah: 2,
      arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
      ayahRef: "1:2",
      translation: "All praise is due to God, Lord of all the worlds.",
    },
    {
      ayah: 3,
      arabic: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
      ayahRef: "1:3",
      translation: "The Most Gracious, the Most Merciful.",
    },
    {
      ayah: 4,
      arabic: "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
      ayahRef: "1:4",
      translation: "Master of the Day of Judgment.",
    },
    {
      ayah: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      ayahRef: "1:5",
      translation: "You alone we worship, and You alone we ask for help.",
    },
    {
      ayah: 6,
      arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
      ayahRef: "1:6",
      translation: "Guide us to the straight path —",
    },
    {
      ayah: 7,
      arabic:
        "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      ayahRef: "1:7",
      translation:
        "the path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who have gone astray.",
    },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Ring Structure — chiastic pairs around verse 5
    ringStructure: {
      title: "The Ring",
      subtitle: "How Al-Fatiha mirrors itself around a single meeting point",
      pairs: [
        {
          left: {
            label: "Praise",
            ayahs: "2",
            desc: "All praise to God — recognition of genuine excellence",
          },
          right: {
            label: "Wrong Paths",
            ayahs: "7b",
            desc: "Those who earned anger or went astray — praise inverted",
          },
          color: "#4ecdc4",
        },
        {
          left: {
            label: "Mercy",
            ayahs: "3",
            desc: "The Most Gracious, the Most Merciful — mercy named again",
          },
          right: {
            label: "Favored Path",
            ayahs: "7a",
            desc: "Path of those You blessed — mercy received",
          },
          color: "#9b7fd4",
        },
        {
          left: {
            label: "Sovereignty",
            ayahs: "4",
            desc: "Master of the Day of Judgment — power and accountability",
          },
          right: {
            label: "Guidance",
            ayahs: "6",
            desc: "Guide us to the straight path — petition born from awe",
          },
          color: "#e0a848",
        },
      ],
      center: {
        label: "The Meeting",
        ayahs: "5",
        desc: "You alone we worship, You alone we ask for help",
        note: "The grammatical hinge. Third person becomes second person. Description becomes encounter. The servant arrives.",
      },
    },

    // 2. Compression Viz — all of Quran compressed into 7 ayahs
    compression: {
      title: "The Seed",
      subtitle:
        "Scholars say every theme of the Quran is compressed into these 7 ayahs",
      elements: [
        {
          label: "Tawḥīd",
          ayah: "2",
          desc: "The oneness of God — Lord of all worlds, not one tribe",
          color: "#4ecdc4",
        },
        {
          label: "Mercy",
          ayah: "3",
          desc: "God's defining attribute, named before power or judgment",
          color: "#9b7fd4",
        },
        {
          label: "Eschatology",
          ayah: "4",
          desc: "The Day of Judgment — accountability is real",
          color: "#e07a8a",
        },
        {
          label: "Worship",
          ayah: "5a",
          desc: "Exclusive devotion — the first half of the declaration",
          color: "#e0a848",
        },
        {
          label: "Reliance",
          ayah: "5b",
          desc: "Exclusive dependence — the second half, inseparable from the first",
          color: "#d4a853",
        },
        {
          label: "Guidance",
          ayah: "6",
          desc: "The single petition — not wealth, health, or victory, but direction",
          color: "#4dbb9b",
        },
        {
          label: "Moral Landscape",
          ayah: "7",
          desc: "Three paths laid out — favored, angered, lost",
          color: "#e87461",
        },
      ],
    },

    // 3. Absence Map — what Al-Fatiha deliberately leaves out
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence in Al-Fatiha is a design choice",
      absences: [
        {
          item: "No prophet named",
          note: "Muhammad ﷺ, Ibrahim, Musa — all absent. The first relationship is unmediated. You and God, directly.",
        },
        {
          item: "No community addressed",
          note: "No 'O believers,' no 'O people of the book.' This prayer is universal — every person is inside it.",
        },
        {
          item: "No story told",
          note: "No narrative, no history, no parable. Direct encounter, not observation from a distance.",
        },
        {
          item: "God does not speak",
          note: "The entire surah is the human addressing God. His response exists — in the hadith qudsi — but unseen in the text itself.",
        },
      ],
    },

    // 4. Three Movements — the directional journey
    sectionJourney: {
      title: "The Journey",
      subtitle: "Three movements: awareness → arrival → petition",
      sections: [
        {
          ayahs: "1–4",
          title: "The Throne Room",
          color: "#4ecdc4",
          desc: "Standing in a vast space. God is described in third person — praised, named in mercy, acknowledged as sovereign. You are becoming aware of who you are speaking to.",
        },
        {
          ayahs: "5",
          title: "The Hinge",
          color: "#d4a853",
          isPivot: true,
          desc: "The grammar turns. 'He' becomes 'You.' Description becomes encounter. This is iltifāt — the sudden address shift that marks arrival in the divine presence.",
        },
        {
          ayahs: "6–7",
          title: "The One Request",
          color: "#9b7fd4",
          desc: "Having arrived, you make exactly one request: guide us. Not wealth, not victory, not forgiveness — direction. And three paths are laid before you.",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "Iltifāt — the sudden address shift in the Quran",
      type: "cross-surah",
      searchIntent: "what is iltifat in the Quran address shift",
      articleSlug: "iltifat-quran-address-shift",
      diagramRef: "sectionJourney",
    },
    {
      concept: "Al-Fatiha as chiastic ring composition",
      type: "surah-specific",
      searchIntent: "ring composition al fatiha structure",
      articleSlug: "ring-composition-al-fatiha",
      diagramRef: "ringStructure",
    },
    {
      concept: "The root r-ḥ-m — mercy from the womb",
      type: "cross-surah",
      searchIntent: "what does rahman rahim mean root rahm womb",
      articleSlug: "root-rahm-mercy-womb-quran",
      diagramRef: "compression",
    },
    {
      concept: "Why Al-Fatiha has no prophets, no stories, no commands",
      type: "surah-specific",
      searchIntent: "why al fatiha no prophet mentioned",
      articleSlug: "al-fatiha-absences-design",
      diagramRef: "absenceMap",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "ring", label: "Ring" },
  { id: "journey", label: "Journey" },
  { id: "seed", label: "The Seed" },
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

function RingStructure({ data }: { data: typeof SURAH_DATA.diagrams.ringStructure }) {
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
        7 ayahs · 40 words · Every theme of the Quran
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
          {activeTab === "ring" && <RingStructure data={d.diagrams.ringStructure} />}
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "seed" && <CompressionViz data={d.diagrams.compression} />}
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
