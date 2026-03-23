"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-KAHF — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-kahf
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Kahf",
  arabicName: "الكَهْف",
  meaning: "The Cave",
  number: 18,
  ayahCount: 110,
  period: "Makki",
  juz: "15–16",
  movements: 7,
  thesis:
    "Four stories drawn from four human stations — faith under persecution, wealth, knowledge, power — with Iblis at the structural center, mapping the four permanent trials of the human condition and the precise difference between the soul that survives and the soul that does not.",
  reflectionUrl: "/surahs/al-kahf",
  readTime: "30 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"nazm","english":"Structural Coherence"},{"key":"amthal","english":"Parables"}],
  heartVerse: {
    arabic: "قُلْ إِنَّمَا أَنَا بَشَرٌ مِّثْلُكُمْ يُوحَىٰ إِلَيَّ أَنَّمَا إِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ",
    ayahRef: "18:110",
    translation: "Say: I am only a human being like you. It has been revealed to me that your God is one God.",
    why: "The surah opens with the Prophet nearly destroying himself with grief (ayah 6). It closes with this calm declaration of shared humanity and singular purpose. The distance between those two states — from near-collapse to grounded clarity — is the surah's entire argument made visible in its structure.",
  },

  audio: { surahNumber: 18, reciter: "ar.alafasy" },

  diagrams: {
    sectionMap: {
      title: "The Four Trials",
      subtitle: "Seven movements: frame → faith → wealth → center → knowledge → power → judgment",
      sections: [
        { ayahs: "1–8", title: "The Frame: Grief and Test", color: "#C9A84C", desc: "Praise for the Quran — a book with no crookedness. Then: perhaps you would destroy yourself with grief over them (ayah 6). The thesis: We have made what is on earth an adornment to test them. And We will make it barren ground." },
        { ayahs: "9–26", title: "Trial One: Faith Under Persecution", color: "#4ecdc4", desc: "Young men flee a society that demands they worship other than Allah. Their prayer: grant us mercy and prepare for us right guidance. Allah puts them to sleep for 309 years. The trial of faith when faith itself is dangerous — survival through sincerity and surrender." },
        { ayahs: "27–44", title: "Trial Two: Wealth", color: "#9b7fd4", desc: "A man with two flourishing gardens says three things: this will not perish, the Hour will not come, and even if it does I will be fine. Three sentences, three forms of the same disease. The corrective: ma sha'Allah, la quwwata illa billah. Then the gardens are destroyed." },
        { ayahs: "45–59", title: "The Center: Rain, Iblis, and Origin", color: "#e07a8a", isPivot: true, desc: "The structural heart. Life is like rain that becomes dry remnants. Wealth and children are the adornment of this world. Then the Iblis verse (ayah 50) — will you take him as an ally? The four trials are four theaters of a single ancient enmity." },
        { ayahs: "60–82", title: "Trial Three: Knowledge", color: "#9b7fd4", desc: "Moses — prophet, Torah-recipient, liberator — told that a servant of God possesses knowledge he does not have. Three events, three objections, three explanations. What appeared to be harm was mercy operating beneath visible events. I did not do it of my own accord." },
        { ayahs: "83–98", title: "Trial Four: Power", color: "#4ecdc4", desc: "Dhul-Qarnayn traverses the earth with authority and means. At each stop, justice calibrated to the individual. He builds an iron wall — and summarizes: this is a mercy from my Lord. The wall is explicitly impermanent. The trial of power is the assumption that what you build is yours." },
        { ayahs: "99–110", title: "The Closing: Loss and Declaration", color: "#C9A84C", desc: "The trumpet, Judgment, Hell displayed. Then the surah's deepest warning: the greatest losers are those whose effort is lost while they think they are doing well. The final ayah resolves everything: I am only a human being like you." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The four stories mirror each other concentrically — Journey-Encounter-Center-Encounter-Journey",
      pairs: [
        {
          left: { label: "The Cave (Faith)", ayahs: "9–26", desc: "Physical journey, divine intervention in the material world (sleep), protagonists attribute everything to Allah. The outer ring." },
          right: { label: "Dhul-Qarnayn (Power)", ayahs: "83–98", desc: "Physical journey, divine intervention in the material world (iron wall), protagonist attributes everything to Allah. The outer ring." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Two Gardens (Wealth)", ayahs: "32–44", desc: "Encounter between two people with different understanding. Ends in separation — the companion rebukes the garden owner." },
          right: { label: "Moses & Al-Khidr (Knowledge)", ayahs: "60–82", desc: "Encounter between two people with different understanding. Ends in separation — Al-Khidr parts from Moses." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Iblis Verse", ayahs: "50",
        desc: "Will you then take him and his descendants as allies instead of Me, while they are enemies to you? The origin of all four trials.",
        note: "Everything before this verse describes what happens when the soul forgets its dependence on Allah. Everything after describes what happens when the soul navigates that dependence well or poorly.",
      },
    },
    deductiveFunnel: {
      title: "Zinah's Thread",
      subtitle: "The word zinah (adornment) threads through the surah — each trial is a form of adornment that deceives",
      layers: [
        { depth: 1, label: "The Thesis", ayah: "7", arabic: "إِنَّا جَعَلْنَا مَا عَلَى الْأَرْضِ زِينَةً لَّهَا", desc: "We have made what is on the earth an adornment for it, to test them. The word zinah appears here for the first time — everything on earth is decoration designed as a test.", color: "#C9A84C" },
        { depth: 2, label: "Social Adornment", ayah: "28", arabic: "تُرِيدُ زِينَةَ الْحَيَاةِ الدُّنْيَا", desc: "Do not let your eyes pass beyond the believers, desiring the zinah of the worldly life. Faith as social status — the powerful Quraysh want the Prophet to dismiss the poor believers.", color: "#4ecdc4" },
        { depth: 3, label: "Material Adornment", ayah: "46", arabic: "الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا", desc: "Wealth and children are the zinah of the life of this world. The garden owner's two flourishing gardens are the physical form of this adornment.", color: "#9b7fd4" },
        { depth: 4, label: "What Endures", ayah: "46", arabic: "وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ", desc: "But the enduring good deeds are better with your Lord for reward and better for hope. The antidote to zinah is not asceticism but reorientation — what outlasts the adornment.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Al-Kahf warns through self-recognition rather than spectacle",
      absences: [
        { item: "No collective divine punishment", note: "In 110 ayahs of Makki revelation — a period when warnings about destroyed nations are most frequent — there is no flood, no earthquake, no nation wiped away. The consequences are individual, interior, and often quiet." },
        { item: "No easy answers", note: "Moses could not sustain patience with Al-Khidr, and he was a prophet. The surah is honest about how difficult it is to accept that the world operates on a logic you cannot fully see." },
        { item: "No guarantee of belief through signs", note: "The Quraysh asked questions designed to test the Prophet. The surah answered expansively — and yet the questioners did not believe. More signs do not produce more belief." },
        { item: "No villain who knows he is wrong", note: "The garden owner does not see his sin until his gardens are destroyed. The greatest losers think they are doing well (ayah 104). The surah's deepest warning is addressed to those who are busy and productive and convinced — and wrong." },
        { item: "No permanence for any human construction", note: "The cave is sealed. The gardens are destroyed. Al-Khidr's interventions are temporary fixes. Dhul-Qarnayn's wall will eventually crumble. Every structure in the surah has an expiration date, including the ones built by the righteous." },
      ],
    },
  },

  contentNodes: [
    { concept: "The four trials — faith, wealth, knowledge, power", type: "surah-specific", articleSlug: "kahf-four-trials-typology" },
    { concept: "Ayah 50 — Iblis at the structural center", type: "surah-specific", articleSlug: "kahf-iblis-center-ayah-50" },
    { concept: "Al-Isra 17:85 and Moses with Al-Khidr — knowledge's limits dramatized", type: "cross-surah", articleSlug: "isra-kahf-knowledge-dramatized" },
    { concept: "Friday recitation — the Dajjal and the four trials", type: "cross-surah", articleSlug: "kahf-friday-dajjal-trials" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "sections", label: "Sections" },
  { id: "ring", label: "Ring" },
  { id: "zinah", label: "Zinah" },
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

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionMap }) {
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
        Thesis → social pull → material pull → what outlasts it all
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
          {activeTab === "sections" && <SectionJourney data={d.diagrams.sectionMap} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "zinah" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <HeartVerse verse={d.heartVerse} />
              <OrnamentDivider />
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
