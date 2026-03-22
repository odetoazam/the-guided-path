"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MA'UN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-maun
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Ma'un",
  arabicName: "الماعون",
  meaning: "Small Kindnesses",
  number: 107,
  ayahCount: 7,
  period: "Makki",
  juz: 30,
  movements: 2,
  thesis:
    "Al-Ma'un asked the largest question in religion — who denies the din? — and answered it with a cooking pot. The denial of faith is not a grand philosophical position. It is a daily, quiet, small refusal.",
  reflectionUrl: "/surahs/al-maun",
  readTime: "15 min read",

  heartVerse: {
    arabic: "فَوَيْلٌ لِّلْمُصَلِّينَ",
    ayahRef: "107:4",
    translation: "So destruction to those who pray.",
    why: "The hinge of the entire surah. Four words that bind cruelty to hollow worship with the conjunction fa — therefore. The people who push away orphans and the people who pray are the same person.",
  },

  audio: { surahNumber: 107, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", translation: "Have you seen the one who denies the religion?" },
    { ayah: 2, arabic: "فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", translation: "That is the one who pushes away the orphan," },
    { ayah: 3, arabic: "وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ", translation: "and does not encourage the feeding of the poor." },
    { ayah: 4, arabic: "فَوَيْلٌ لِّلْمُصَلِّينَ", translation: "So destruction to those who pray —" },
    { ayah: 5, arabic: "الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ", translation: "those who are heedless of their prayer," },
    { ayah: 6, arabic: "الَّذِينَ هُمْ يُرَاءُونَ", translation: "those who make a show," },
    { ayah: 7, arabic: "وَيَمْنَعُونَ الْمَاعُونَ", translation: "and withhold small kindnesses." },
  ],

  diagrams: {
    ringStructure: {
      title: "The Chiastic Mirror",
      subtitle: "Seven ayahs folded around a devastating pivot",
      pairs: [
        {
          left: { label: "The Question", ayahs: "1", desc: "Who denies the din? — the theological question, the largest frame" },
          right: { label: "The Answer", ayahs: "6–7", desc: "Those who perform worship to be seen and withhold ma'un — the practical answer" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Social Cruelty", ayahs: "2–3", desc: "The orphan pushed away, the poor left unfed — denial defined by action" },
          right: { label: "Spiritual Emptiness", ayahs: "5", desc: "Heedless of prayer — distant from it, using 'an not fi" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Pivot", ayahs: "4",
        desc: "So destruction to those who pray",
        note: "The fa binds cruelty to worship. The people who push away orphans are the same people who pray. Four words. No softening, no qualification.",
      },
    },

    sectionJourney: {
      title: "Two Movements",
      subtitle: "Anatomy of denial, then anatomy of hollow worship — bound by fa",
      sections: [
        { ayahs: "1–3", title: "The Anatomy of Denial", color: "#e07a8a", desc: "The surah opens with a question — have you seen the one who denies the din? — then answers it by pointing at cruelty: the orphan pushed away, the poor ignored. Denial is defined not by creed but by conduct." },
        { ayahs: "4", title: "The Hinge", color: "#d4a853", isPivot: true, desc: "Fa-waylun lil-musallin. The conjunction fa makes the logic inescapable: because of the cruelty just described, therefore woe to those who pray. The word al-musallin, honorific everywhere else, arrives here as a verdict." },
        { ayahs: "5–7", title: "The Anatomy of Hollow Worship", color: "#4ecdc4", desc: "Heedless of prayer (not in it, but away from it), performing worship for a human audience, and withholding ma'un — the smallest acts of human decency. The surah lands on a cooking pot." },
      ],
    },

    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah of pure diagnosis — no prescription, no consolation",
      absences: [
        { item: "No commands", note: "The surah contains no imperatives. It does not say 'feed the orphan' or 'pray sincerely.' It diagnoses a disease and walks away." },
        { item: "No paradise or hellfire", note: "No descriptions of reward or punishment. Only waylun — destruction — aimed at the worshipper. The weight of the silence is the point." },
        { item: "No prophets or parables", note: "No story, no historical narrative, no messenger named. Pure portrait — four strokes of a brush that leave no room for evasion." },
        { item: "No cure offered", note: "The surah identifies the separation of worship from compassion and then offers neither remedy nor consolation. The diagnosis is the message." },
      ],
    },

    smallestWord: {
      title: "The Smallest Word",
      subtitle: "The surah opens with the largest frame and closes with the smallest object",
      poles: [
        { position: "opening", arabic: "الدِّينِ", transliteration: "ad-din", meaning: "The religion — the entire system of faith, reckoning, and way of living", ayah: "1", color: "#9b7fd4" },
        { position: "closing", arabic: "الْمَاعُونَ", transliteration: "al-ma'un", meaning: "Small kindnesses — a cooking pot, a bucket, a handful of salt, a needle", ayah: "7", color: "#e0a848" },
      ],
      arc: "The distance between these two poles is the surah's thesis: the denial of religion is not a grand philosophical position. It is the pot you did not lend. The meal you did not share. The kindness so trivial it barely registers as a choice.",
      keyInsight: "The entire surah builds toward a word it has not yet said. When al-ma'un arrives — the very last word — it is the smallest word it could possibly be. The cosmic funnels into the domestic.",
    },
  },

  contentNodes: [
    { concept: "The preposition 'an vs fi with prayer — a single letter that changes everything", type: "surah-specific", articleSlug: "an-vs-fi-prayer-heedlessness" },
    { concept: "Al-Ma'un and Al-Bayyina — sincerity present vs sincerity drained", type: "cross-surah", articleSlug: "maun-bayyina-sincerity-comparison" },
    { concept: "The root r-'-y in yura'un — worship as performance for a human audience", type: "surah-specific", articleSlug: "riya-root-worship-performance" },
    { concept: "Why Al-Ma'un has no commands, no cure, no consolation", type: "surah-specific", articleSlug: "al-maun-silence-as-argument" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "chiasm", label: "Mirror" },
  { id: "journey", label: "Movements" },
  { id: "smallest", label: "Smallest Word" },
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

function SmallestWord({ data }: { data: typeof SURAH_DATA.diagrams.smallestWord }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.poles.map((pole, i) => (
          <div
            key={i}
            className="rounded-xl p-4 space-y-3 border border-white/[0.06]"
            style={{ backgroundColor: pole.color + "0a", borderLeftWidth: "3px", borderLeftColor: pole.color }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider font-sans" style={{ color: pole.color }}>
                {pole.position === "opening" ? "Surah Opens" : "Surah Closes"}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{pole.ayah}</span>
            </div>
            <p className="text-2xl text-right text-cream font-amiri" style={{ direction: "rtl" }}>
              {pole.arabic}
            </p>
            <div>
              <p className="text-sm font-medium font-sans" style={{ color: pole.color }}>
                {pole.transliteration}
              </p>
              <p className="text-sm text-cream/70 mt-1 leading-relaxed font-body">{pole.meaning}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <p className="text-sm text-cream/70 leading-relaxed italic font-body">{data.arc}</p>
        <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{data.keyInsight}</p>
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
          {activeTab === "chiasm" && <RingStructure data={d.diagrams.ringStructure} />}
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "smallest" && <SmallestWord data={d.diagrams.smallestWord} />}
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
