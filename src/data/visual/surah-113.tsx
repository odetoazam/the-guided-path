"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-FALAQ — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-falaq
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Al-Falaq",
  arabicName: "الفلق",
  meaning: "The Daybreak",
  number: 113,
  ayahCount: 5,
  period: "Makki",
  juz: 30,
  movements: 2,
  thesis:
    "Al-Falaq is a five-line prayer that moves from the widest evil in creation to the narrowest evil in a human heart, and places one shelter over all of it — the Lord who splits every darkness open.",
  reflectionUrl: "/surahs/al-falaq",
  readTime: "14 min read",

  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ",
    ayahRef: "113:1",
    translation:
      "Say: I seek refuge in the Lord of the Daybreak.",
    why: "The single declaration that governs the entire surah. The name Rabb al-Falaq — Lord of the Daybreak — appears nowhere else in the Quran. The remedy is named before the disease: the One who splits every darkness open.",
    articleAnchor: "#the-command-and-the-shelter",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 113,
    reciter: "ar.alafasy",
  },

  // ── Full Surah Text ───────────────────────────────────────────────────────
  fullText: [
    {
      ayah: 1,
      arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ",
      ayahRef: "113:1",
      translation: "Say: I seek refuge in the Lord of the Daybreak.",
    },
    {
      ayah: 2,
      arabic: "مِن شَرِّ مَا خَلَقَ",
      ayahRef: "113:2",
      translation: "From the evil of what He created.",
    },
    {
      ayah: 3,
      arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      ayahRef: "113:3",
      translation: "And from the evil of the darkness when it settles.",
    },
    {
      ayah: 4,
      arabic: "وَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ",
      ayahRef: "113:4",
      translation: "And from the evil of those who blow on knots.",
    },
    {
      ayah: 5,
      arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      ayahRef: "113:5",
      translation: "And from the evil of the envier when he envies.",
    },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Funnel — the narrowing sequence from cosmic to intimate
    funnel: {
      title: "The Funnel",
      subtitle: "Four evils descend from the cosmic to the intimate — each one closer than the last",
      sections: [
        {
          ayahs: "1",
          title: "The Shelter",
          color: "#d4a853",
          isPivot: false,
          desc: "One declaration of refuge in the Lord of the Daybreak — the single roof placed over four storms. The remedy is named before the disease.",
        },
        {
          ayahs: "2",
          title: "All Created Evil",
          color: "#4ecdc4",
          isPivot: false,
          desc: "The widest possible net. Whatever evil exists in the created world, before any of it is named, you seek refuge from all of it.",
        },
        {
          ayahs: "3",
          title: "The Settling Dark",
          color: "#9b7fd4",
          isPivot: false,
          desc: "A natural phenomenon — the night at its deepest, when visibility disappears. The darkness does not know you. It is indifferent.",
        },
        {
          ayahs: "4",
          title: "Those Who Blow on Knots",
          color: "#e07a8a",
          isPivot: true,
          desc: "The threshold. Evil shifts from the natural world to human agency. Sorcery is deliberate, secret, directed. Someone is doing something to you.",
        },
        {
          ayahs: "5",
          title: "The Envier",
          color: "#e87461",
          isPivot: false,
          desc: "The most intimate evil. An envier has seen your blessings closely enough to want them gone. The surah ends here — the prayer hangs open, still being spoken.",
        },
      ],
    },

    // 2. Components — the four evils sought refuge from
    components: {
      title: "Four Storms, One Roof",
      subtitle: "Each evil requires more knowledge of you, more proximity to your life",
      elements: [
        {
          label: "Created Evil",
          ayah: "2",
          desc: "The comprehensive opening — all harm in existence, before any is specified",
          color: "#4ecdc4",
        },
        {
          label: "Darkness",
          ayah: "3",
          desc: "Ghasiq idha waqab — the deep dark when it presses in and fills every space. Rooted in the natural world.",
          color: "#9b7fd4",
        },
        {
          label: "Sorcery",
          ayah: "4",
          desc: "Al-naffathat fi al-'uqad — those who blow on knots. Hidden, deliberate, directed harm. The evil crosses from indifferent to intentional.",
          color: "#e07a8a",
        },
        {
          label: "Envy",
          ayah: "5",
          desc: "Hasid idha hasad — the envier at the moment envy becomes active. The most personal evil: someone close enough to see what you have.",
          color: "#e87461",
        },
      ],
    },

    // 3. Absence Map — what Al-Falaq deliberately leaves out
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence in Al-Falaq is a design choice",
      absences: [
        {
          item: "No moral instructions",
          note: "No commands to pray, give charity, be patient, or fear the Day of Judgment. The surah strips everything down to the most elemental posture: vulnerability before threat, turned toward shelter.",
        },
        {
          item: "The word Allah does not appear",
          note: "Only Rabb — the intimate name, the name that implies a relationship of care and nurture. Not sovereignty, not majesty. Closeness.",
        },
        {
          item: "No story, no argument, no narrative",
          note: "No prophets, no destroyed nations, no parables. The entire apparatus of Quranic persuasion is set aside. What remains is pure seeking.",
        },
        {
          item: "No closing formula",
          note: "The surah ends on the word hasad — envy. No return to the refuge, no summation. The prayer hangs open, still in progress, still needed.",
        },
        {
          item: "No counter-strategy against envy",
          note: "The Quran's response to being envied is not a defense but a prayer. No instruction on how to defeat envy — only where to turn when it is aimed at you.",
        },
      ],
    },

    // 4. Compression Viz — the structural spine of sharr
    compression: {
      title: "The Spine",
      subtitle: "The word sharr (evil) appears four times — each occurrence narrows what it means",
      elements: [
        {
          label: "sharr ma khalaq",
          ayah: "2",
          desc: "Evil of all creation — the widest possible scope. Everything that can harm.",
          color: "#4ecdc4",
        },
        {
          label: "sharr ghasiqin",
          ayah: "3",
          desc: "Evil of the settling dark — narrowed to a natural condition. Universal but impersonal.",
          color: "#9b7fd4",
        },
        {
          label: "sharr al-naffathat",
          ayah: "4",
          desc: "Evil of those who blow on knots — narrowed to deliberate human practice. Secret, directed, intentional.",
          color: "#e07a8a",
        },
        {
          label: "sharr hasid",
          ayah: "5",
          desc: "Evil of the envier — narrowed to a feeling inside someone who knows you. By the end, sharr is something you can feel in your chest.",
          color: "#e87461",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "The root f-l-q — splitting, cleaving, the daybreak image across the Quran",
      type: "cross-surah",
      searchIntent: "falaq root f-l-q splitting daybreak quran",
      articleSlug: "root-falaq-splitting-dawn-quran",
      diagramRef: "funnel",
    },
    {
      concept: "Al-Mu'awwidhatayn — why the Quran's last two surahs are a matched pair",
      type: "cross-surah",
      searchIntent: "muawwidhatayn al falaq an nas paired surahs refuge",
      articleSlug: "muawwidhatayn-paired-surahs-refuge",
      diagramRef: "absenceMap",
    },
    {
      concept: "Hasad — the Quran's anatomy of envy and why Al-Falaq ends on it",
      type: "surah-specific",
      searchIntent: "hasad envy quran al falaq ending",
      articleSlug: "hasad-envy-quran-al-falaq",
      diagramRef: "components",
    },
    {
      concept: "The word sharr as structural spine — four occurrences, four narrowing circles",
      type: "surah-specific",
      searchIntent: "sharr evil al falaq four repetitions narrowing",
      articleSlug: "sharr-spine-al-falaq-structure",
      diagramRef: "compression",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "funnel", label: "Funnel" },
  { id: "storms", label: "Four Storms" },
  { id: "spine", label: "Spine" },
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

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.funnel }) {
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
              <span className="text-xs text-cream-muted/50 font-sans">Ayah {sec.ayahs}</span>
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
        Cosmic → Natural → Deliberate → Intimate
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
        5 ayahs · 23 words · One shelter, four storms
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
          {activeTab === "funnel" && <SectionJourney data={d.diagrams.funnel} />}
          {activeTab === "storms" && <ComponentsViz data={d.diagrams.components} />}
          {activeTab === "spine" && <CompressionViz data={d.diagrams.compression} />}
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
