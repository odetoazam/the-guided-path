"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AN-NAS — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/an-nas
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "An-Nas",
  arabicName: "الناس",
  meaning: "Mankind",
  number: 114,
  ayahCount: 6,
  period: "Makki",
  juz: 30,
  movements: 2,
  thesis:
    "An-Nas is the Quran's last breath — a prayer placed at the end of all revelation, teaching that the most dangerous enemy you will ever face is the one that whispers inside your chest and disappears the moment you turn toward God, only to return the moment you turn away.",
  reflectionUrl: "/surahs/an-nas",
  readTime: "16 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"aqeedah","english":"Theology"},{"key":"munasabat","english":"Inter-surah Connections"}],
  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ",
    ayahRef: "114:4",
    translation:
      "From the evil of the retreating whisperer.",
    why: "The pivot of the entire surah. Everything before it is invocation — three divine names summoned as fortress. Everything after it is identification — where the whisperer operates and where it comes from. This verse is the moment prayer becomes diagnosis.",
    articleAnchor: "#the-threat",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 114,
    reciter: "ar.alafasy",
  },

  // ── Full Surah Text ───────────────────────────────────────────────────────
  fullText: [
    {
      ayah: 1,
      arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ",
      ayahRef: "114:1",
      translation: "Say: I seek refuge in the Lord of mankind.",
    },
    {
      ayah: 2,
      arabic: "مَلِكِ ٱلنَّاسِ",
      ayahRef: "114:2",
      translation: "The King of mankind.",
    },
    {
      ayah: 3,
      arabic: "إِلَـٰهِ ٱلنَّاسِ",
      ayahRef: "114:3",
      translation: "The God of mankind.",
    },
    {
      ayah: 4,
      arabic: "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ",
      ayahRef: "114:4",
      translation: "From the evil of the retreating whisperer,",
    },
    {
      ayah: 5,
      arabic: "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ",
      ayahRef: "114:5",
      translation: "Who whispers in the chests of mankind,",
    },
    {
      ayah: 6,
      arabic: "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
      ayahRef: "114:6",
      translation: "From among jinn and mankind.",
    },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Two Breaths — the surah's binary architecture
    twoBreaths: {
      title: "Two Breaths",
      subtitle: "Three verses of invocation, then three verses naming the threat — the symmetry is exact",
      sections: [
        {
          ayahs: "1\u20133",
          title: "The Invocation",
          color: "#d4a853",
          isPivot: false,
          desc: "Pure calling. Three divine names summoned in ascending order — Lord, King, God — building a fortress of names because what comes next is terrifying. You are not praising. You are arming yourself.",
        },
        {
          ayahs: "4",
          title: "The Pivot",
          color: "#e07a8a",
          isPivot: true,
          desc: "Min sharr — from the evil of. The temperature changes. The three verses of calling God's names suddenly reveal their purpose. Prayer becomes diagnosis. The whisperer is named: al-waswas al-khannas.",
        },
        {
          ayahs: "5\u20136",
          title: "The Identification",
          color: "#9b7fd4",
          isPivot: false,
          desc: "The enemy is located — in the chests of mankind — and its origin revealed: both jinn and human beings. The God of the entire cosmos has been called upon to protect the innermost chamber of a single heart.",
        },
      ],
    },

    // 2. Components — the three divine names
    components: {
      title: "Three Names, One Crescendo",
      subtitle: "Each name escalates the claim on divine sovereignty — the invocation climbs to the name most relevant to the threat",
      elements: [
        {
          label: "Rabb al-Nas",
          ayah: "1",
          desc: "Lord of mankind — the name of intimate care. The God who nurtures, sustains, and raises you from nothing. Addresses your dependency.",
          color: "#4ecdc4",
        },
        {
          label: "Malik al-Nas",
          ayah: "2",
          desc: "King of mankind — the name of absolute authority. The God who governs everything, from whom there is no appeal. Addresses His sovereignty.",
          color: "#e0a848",
        },
        {
          label: "Ilah al-Nas",
          ayah: "3",
          desc: "God of mankind — the sole object of the heart's devotion. The most intimate name, addressing the exact location where the whisperer operates: the seat of worship.",
          color: "#d4a853",
        },
        {
          label: "Al-Waswas al-Khannas",
          ayah: "4",
          desc: "The whisperer who withdraws. Two words creating a portrait of an enemy unlike any other — it whispers and hides, suggests and retreats, operates and vanishes when you turn to God.",
          color: "#e07a8a",
        },
      ],
    },

    // 3. Absence Map — what An-Nas deliberately leaves out
    absenceMap: {
      title: "What's Missing",
      subtitle: "The Quran's final surah strips away nearly everything",
      absences: [
        {
          item: "No moral commands",
          note: "No instructions to pray, give charity, or be patient. The entire apparatus of Quranic persuasion — narrative, law, eschatology, polemic — is set aside. What remains is: help me.",
        },
        {
          item: "No stories of prophets",
          note: "No Ibrahim, no Musa, no narrative at all. The surah does not try to convince anyone of anything. It assumes the reader already knows the danger and has come to the only door.",
        },
        {
          item: "No mention of the hereafter",
          note: "No paradise, no hellfire, no Day of Judgment. The threat is here, now, inside your chest. The surah addresses the present moment with absolute urgency.",
        },
        {
          item: "No counter-strategy",
          note: "The surah offers no technique for defeating the whisperer. No method, no practice. Only the act of seeking refuge. The medicine is the prayer itself — spoken aloud, breaking the silence in which the whisperer operates.",
        },
      ],
    },

    // 4. Compression Viz — the telescoping from cosmic to interior
    compression: {
      title: "The Telescope",
      subtitle: "The surah telescopes from the vastness of God to the interior of a single chest",
      elements: [
        {
          label: "Lord of all mankind",
          ayah: "1",
          desc: "The widest possible scope — God's nurturing care over the entire human race",
          color: "#4ecdc4",
        },
        {
          label: "King of all mankind",
          ayah: "2",
          desc: "Absolute sovereignty — authority over everything that exists",
          color: "#e0a848",
        },
        {
          label: "God of all mankind",
          ayah: "3",
          desc: "The heart's devotion — the deepest claim, reaching toward the seat of worship",
          color: "#d4a853",
        },
        {
          label: "The whisperer",
          ayah: "4",
          desc: "Named at last — the enemy that whispers and retreats, persistent as erosion",
          color: "#e07a8a",
        },
        {
          label: "Inside the chest",
          ayah: "5",
          desc: "The battlefield located — fi sudur al-nas — the most intimate space you possess, under siege",
          color: "#9b7fd4",
        },
        {
          label: "Jinn and mankind",
          ayah: "6",
          desc: "The origin revealed — the whisperer comes from both the unseen world and your own kind",
          color: "#e87461",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "Al-waswas al-khannas — the Quran's psychology of the whisperer",
      type: "surah-specific",
      searchIntent: "waswas khannas whisperer retreats quran psychology",
      articleSlug: "waswas-khannas-whisperer-quran",
      diagramRef: "components",
    },
    {
      concept: "Rabb, Malik, Ilah — the ascending divine names in An-Nas",
      type: "surah-specific",
      searchIntent: "rabb malik ilah three names an nas ascending",
      articleSlug: "three-divine-names-an-nas",
      diagramRef: "components",
    },
    {
      concept: "Iqra to Qul — how the Quran's first and last commands frame the entire revelation",
      type: "cross-surah",
      searchIntent: "iqra first command qul last command quran frame",
      articleSlug: "iqra-to-qul-quran-frame",
      diagramRef: "twoBreaths",
    },
    {
      concept: "Sudur — the Quran's geography of the chest as seat of faith and intention",
      type: "cross-surah",
      searchIntent: "sudur sadr chest quran faith intention heart",
      articleSlug: "sudur-chest-quran-interior-geography",
      diagramRef: "compression",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "breaths", label: "Two Breaths" },
  { id: "names", label: "Three Names" },
  { id: "telescope", label: "Telescope" },
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

function TwoBreaths({ data }: { data: typeof SURAH_DATA.diagrams.twoBreaths }) {
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

function ComponentsViz({ data }: { data: typeof SURAH_DATA.diagrams.components }) {
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
        Care → Sovereignty → Devotion → The threat they guard against
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
        6 ayahs · Infinite sovereignty invoked for the most intimate rescue
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
          {activeTab === "breaths" && <TwoBreaths data={d.diagrams.twoBreaths} />}
          {activeTab === "names" && <ComponentsViz data={d.diagrams.components} />}
          {activeTab === "telescope" && <CompressionViz data={d.diagrams.compression} />}
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
