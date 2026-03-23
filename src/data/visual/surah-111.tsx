"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MASAD — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-masad
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Al-Masad",
  arabicName: "المسد",
  meaning: "The Palm Fiber",
  number: 111,
  ayahCount: 5,
  period: "Makki",
  juz: 30,
  movements: 2,
  thesis:
    "Al-Masad is the Quran's closed file — the one surah that names its subject, renders its verdict, and leaves no door open, teaching that divine patience is vast but not infinite, and that some opposition writes its own sentence.",
  reflectionUrl: "/surahs/al-masad",
  readTime: "15 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"},{"key":"ijaz","english":"Inimitability"}],
  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
    ayahRef: "111:1",
    translation:
      "May the hands of Abu Lahab be ruined, and ruined is he.",
    why: "The only place the Quran uses a man's own curse-word as the verb of his divine sentence. The root ta-ba-ba, the naming of the hands before the person, and the unprecedented act of naming a living opponent all converge in this single opening line.",
    articleAnchor: "#the-sentence",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 111,
    reciter: "ar.alafasy",
  },

  // ── Full Surah Text (micro surah — displayed above tabs) ──────────────────
  fullText: [
    {
      ayah: 1,
      arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
      ayahRef: "111:1",
      translation: "May the hands of Abu Lahab be ruined, and ruined is he.",
    },
    {
      ayah: 2,
      arabic: "مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ",
      ayahRef: "111:2",
      translation:
        "His wealth will not avail him or that which he gained.",
    },
    {
      ayah: 3,
      arabic: "سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ",
      ayahRef: "111:3",
      translation: "He will enter to burn in a Fire of blazing flame.",
    },
    {
      ayah: 4,
      arabic: "وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ",
      ayahRef: "111:4",
      translation: "And his wife — the carrier of firewood.",
    },
    {
      ayah: 5,
      arabic: "فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ",
      ayahRef: "111:5",
      translation:
        "Around her neck is a rope of twisted palm fiber.",
    },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Ring Structure — chiastic frame around the fire
    ringStructure: {
      title: "The Ring",
      subtitle: "How Al-Masad frames its verdict around a burning center",
      pairs: [
        {
          left: {
            label: "Ruin of Hands",
            ayahs: "1a",
            desc: "Tabbat yada Abi Lahab — the instruments of his agency are broken",
          },
          right: {
            label: "Rope on Neck",
            ayahs: "5",
            desc: "Fi jidiha hablun min masad — bondage replaces agency",
          },
          color: "#e07a8a",
        },
        {
          left: {
            label: "Total Ruin",
            ayahs: "1b–2",
            desc: "Wa tabb — his wealth and earnings will not avail him",
          },
          right: {
            label: "Carrier of Firewood",
            ayahs: "4",
            desc: "Hammalat al-hatab — defined by her labor of hostility",
          },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "Fire of Lahab",
        ayahs: "3",
        desc: "Sa-yasla naran dhata lahab — a fire defined by the flame in his own name",
        note: "The Father of Flame meets a fire of flame. The whole surah radiates outward from this burning core.",
      },
    },

    // 2. Section Journey — the two movements
    sectionJourney: {
      title: "Two Movements",
      subtitle: "The man and his ruin, then the woman and her rope",
      sections: [
        {
          ayahs: "1–3",
          title: "The Sentence",
          color: "#e07a8a",
          desc: "Abu Lahab's hands are ruined. His wealth and earnings will not save him. He will enter a fire of blazing flame. The tense is past — tabbat — placing the ruin in completed time while the man is still alive.",
        },
        {
          ayahs: "3",
          title: "The Fire",
          color: "#d4a853",
          isPivot: true,
          desc: "Naran dhata lahab — the only future-tense marker (sa-yasla) in the entire surah. Everything else is past or nominal. This single arrow points forward in a surah that otherwise reads like an inscription.",
        },
        {
          ayahs: "4–5",
          title: "The Wife",
          color: "#9b7fd4",
          desc: "Umm Jamil is joined to his fate by a single conjunction — wa. She receives her own portrait, her own title, her own punishment. The neck that wore jewels now bears a rope of twisted palm fiber.",
        },
      ],
    },

    // 3. Absence Map — what is conspicuously missing
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence in Al-Masad reshapes how you read the surah",
      absences: [
        {
          item: "No call to repentance",
          note: "Every other Makki condemnation surah leaves a door open — a kalla that implies the possibility of stopping. Al-Masad has no such door. The verdict is complete.",
        },
        {
          item: "No name of Allah",
          note: "No Rahman, no Rabb, no Ilah. The divine voice speaks entirely through the force of the declaration. The authority is present in the grammar without ever naming itself.",
        },
        {
          item: "No conditional threat",
          note: "Other surahs use 'if... then...' — warning that implies choice. Here the sentence is already rendered in completed past tense. The case is closed.",
        },
        {
          item: "No anonymity",
          note: "Unlike Al-Humaza (104) or Al-Takathur (102) which describe archetypes, this surah names a real, living person — Abu Lahab — by his known epithet. Unique in the entire Quran.",
        },
      ],
    },

    // 4. Word Mirror — lahab in name and sentence
    wordMirror: {
      title: "The Name Becomes the Sentence",
      subtitle: "How Abu Lahab's own language is turned back upon him",
      mirrors: [
        {
          word: "Lahab",
          inName: "Abu Lahab — 'Father of Flame' — his kunya, chosen by his own family",
          inSentence: "Naran dhata lahab — a fire possessing lahab. The man named after flame meets a fire defined by flame.",
          color: "#e07a8a",
        },
        {
          word: "Tabb",
          inName: "Abu Lahab cursed the Prophet: tabban laka — 'May you perish!'",
          inSentence: "Tabbat yada Abi Lahab — the curse he hurled is returned. His own word becomes the verb of his sentence.",
          color: "#d4a853",
        },
        {
          word: "Jid / Masad",
          inName: "Umm Jamil wore necklaces of gold — jid is the neck of ornament and status",
          inSentence: "Fi jidiha hablun min masad — where there was gold, now coarse rope. Adornment replaced by bondage.",
          color: "#9b7fd4",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "Named opponents in the Quran — Abu Lahab as the sole living individual condemned by name",
      type: "surah-specific",
      searchIntent: "abu lahab named in quran unique condemnation",
      articleSlug: "abu-lahab-named-condemnation",
      diagramRef: "absenceMap",
    },
    {
      concept: "Chiastic ring composition in short Makki surahs",
      type: "cross-surah",
      searchIntent: "chiastic ring structure short makki surahs quran",
      articleSlug: "ring-composition-short-surahs",
      diagramRef: "ringStructure",
    },
    {
      concept: "Al-Masad and Al-Humaza as companion portraits — anonymous archetype vs. named decree",
      type: "cross-surah",
      searchIntent: "al masad al humaza companion surahs wealth fire",
      articleSlug: "masad-humaza-companion-portraits",
      diagramRef: "wordMirror",
    },
    {
      concept: "Umm Jamil as independent moral agent — hammalat al-hatab",
      type: "surah-specific",
      searchIntent: "umm jamil carrier firewood quran women accountability",
      articleSlug: "umm-jamil-moral-agency",
      diagramRef: "sectionJourney",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "ring", label: "Ring" },
  { id: "journey", label: "Movements" },
  { id: "mirror", label: "Name = Sentence" },
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

function WordMirror({ data }: { data: typeof SURAH_DATA.diagrams.wordMirror }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-4">
        {data.mirrors.map((m, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden border border-white/[0.06]"
            style={{ backgroundColor: m.color + "08" }}
          >
            <div
              className="px-4 py-2 text-sm font-semibold font-serif"
              style={{ color: m.color, backgroundColor: m.color + "12" }}
            >
              {m.word}
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <div className="text-xs font-medium text-cream-muted/50 uppercase tracking-wider font-sans">
                  In His Name
                </div>
                <p className="text-sm text-cream/70 leading-relaxed font-body">{m.inName}</p>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <div className="space-y-1">
                <div className="text-xs font-medium text-cream-muted/50 uppercase tracking-wider font-sans">
                  In His Sentence
                </div>
                <p className="text-sm text-cream/70 leading-relaxed font-body">{m.inSentence}</p>
              </div>
            </div>
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
          {activeTab === "mirror" && <WordMirror data={d.diagrams.wordMirror} />}
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
