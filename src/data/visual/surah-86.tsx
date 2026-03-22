"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TARIQ — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-tariq
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Tariq",
  arabicName: "الطّارق",
  meaning: "The Night-Visitor",
  number: 86,
  ayahCount: 17,
  period: "Makki",
  juz: 30,
  movements: 5,
  thesis:
    "Seventeen ayahs that take a single image — a star piercing the night — and drive it through every layer of existence until the listener cannot find a place to hide from its light.",
  reflectionUrl: "/surahs/at-tariq",
  readTime: "18 min read",

  heartVerse: {
    arabic: "إِنَّهُ لَقَوْلٌ فَصْلٌ",
    ayahRef: "86:13",
    translation: "Indeed, it is a decisive word.",
    why: "The surah spends twelve ayahs piercing through layer after layer of reality — star, soul, body, judgment, sky, earth. Then it names what has been doing the piercing all along: the Quran itself. A word that separates truth from falsehood the way light separates night from day.",
  },

  audio: { surahNumber: 86, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَالسَّمَاءِ وَالطَّارِقِ", translation: "By the sky and the night-visitor —" },
    { ayah: 2, arabic: "وَمَا أَدْرَاكَ مَا الطَّارِقُ", translation: "and what can make you know what the night-visitor is?" },
    { ayah: 3, arabic: "النَّجْمُ الثَّاقِبُ", translation: "The piercing star." },
    { ayah: 4, arabic: "إِن كُلُّ نَفْسٍ لَّمَّا عَلَيْهَا حَافِظٌ", translation: "There is no soul but that it has over it a guardian." },
    { ayah: 5, arabic: "فَلْيَنظُرِ الْإِنسَانُ مِمَّ خُلِقَ", translation: "So let man observe from what he was created." },
    { ayah: 6, arabic: "خُلِقَ مِن مَّاءٍ دَافِقٍ", translation: "Created from a fluid ejected," },
    { ayah: 7, arabic: "يَخْرُجُ مِن بَيْنِ الصُّلْبِ وَالتَّرَائِبِ", translation: "emerging from between the backbone and the ribs." },
    { ayah: 8, arabic: "إِنَّهُ عَلَىٰ رَجْعِهِ لَقَادِرٌ", translation: "Indeed, He is, to return him, able." },
    { ayah: 9, arabic: "يَوْمَ تُبْلَى السَّرَائِرُ", translation: "The Day when secrets are examined —" },
    { ayah: 10, arabic: "فَمَا لَهُ مِن قُوَّةٍ وَلَا نَاصِرٍ", translation: "then he will have no power and no helper." },
    { ayah: 11, arabic: "وَالسَّمَاءِ ذَاتِ الرَّجْعِ", translation: "By the sky which returns," },
    { ayah: 12, arabic: "وَالْأَرْضِ ذَاتِ الصَّدْعِ", translation: "and the earth which splits open —" },
    { ayah: 13, arabic: "إِنَّهُ لَقَوْلٌ فَصْلٌ", translation: "indeed, it is a decisive word," },
    { ayah: 14, arabic: "وَمَا هُوَ بِالْهَزْلِ", translation: "and it is no amusement." },
    { ayah: 15, arabic: "إِنَّهُمْ يَكِيدُونَ كَيْدًا", translation: "Indeed, they are planning a plan," },
    { ayah: 16, arabic: "وَأَكِيدُ كَيْدًا", translation: "and I am planning a plan." },
    { ayah: 17, arabic: "فَمَهِّلِ الْكَافِرِينَ أَمْهِلْهُمْ رُوَيْدًا", translation: "So allow time for the disbelievers; leave them awhile." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Penetrations",
      subtitle: "Five movements: sky → body → judgment → earth → revelation",
      sections: [
        { ayahs: "1–4", title: "The Night-Visitor", color: "#4ecdc4", desc: "A cosmic oath opens the surah — the sky and its piercing star. The word tariq carries the image of knocking in the dark. Then the surah pivots from the cosmic to the personal in a single ayah: every soul has a guardian over it. The star watches the night; something watches you." },
        { ayahs: "5–8", title: "The Human Origin", color: "#9b7fd4", desc: "The surah turns inward — into the human body itself. Created from a gushing fluid, emerging from between the backbone and the ribs. Even creation participates in the surah's governing metaphor: life begins as something that breaks through. The argument from creation to resurrection is compressed into a single line." },
        { ayahs: "9–10", title: "The Day of Secrets", color: "#C9A84C", isPivot: true, desc: "The pivot. On that Day, secrets — sara'ir, the innermost hidden things — will be examined, exposed, penetrated. The star that pierces the night, the fluid that pierces forth, the earth that splits: all physical anticipations of this spiritual event. Stripped of secrets, the human stands without power or helper." },
        { ayahs: "11–12", title: "The Two Signs", color: "#4ecdc4", desc: "The sky that returns rain and the earth that splits open with vegetation. The word raj' appeared in ayah 8 about resurrection; here it describes the water cycle. The same word in two contexts creates an argument through vocabulary alone: the rain returns, so will you." },
        { ayahs: "13–17", title: "The Decisive Word", color: "#e07a8a", desc: "The Quran is named — qawlun fasl, a word that separates. It is no amusement. The schemers plan and God plans. The surah ends not with fire but with patience: give them time. The diminutive ruwayda — a little while — carries the weight. The smallness of the wait is itself the threat." },
      ],
    },
    chiasticRing: {
      title: "The Concentric Penetrations",
      subtitle: "The surah spirals inward then back out — one action, many domains",
      pairs: [
        {
          left: { label: "Sky / Piercing Star", ayahs: "1–3", desc: "The outer layer: a star that punctures the darkness, light breaking through the night" },
          right: { label: "Sky Returns / Earth Splits", ayahs: "11–12", desc: "The outer layer returns: the sky performs raj' (return), the earth performs sad' (splitting)" },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Guardian", ayahs: "4", desc: "Every soul has a watcher — the cosmic narrows to the personal" },
          right: { label: "No Power, No Helper", ayahs: "10", desc: "On that Day, the watched soul stands exposed with neither strength nor aid" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Human Origin", ayahs: "5–8", desc: "The body and its fluid — creation as an act of piercing through" },
          right: { label: "Decisive Word", ayahs: "13–17", desc: "The Quran as the ultimate act of penetration — truth piercing denial" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Day of Secrets", ayahs: "9",
        desc: "The Day when all barriers between hidden and known are destroyed.",
        note: "Everything before describes how reality is built. Everything after describes what that reality means for you.",
      },
    },
    deductiveFunnel: {
      title: "One Image, Five Domains",
      subtitle: "The piercing star's action repeated across every layer of existence",
      layers: [
        { depth: 1, label: "The Sky", ayah: "1–3", arabic: "النَّجْمُ الثَّاقِبُ", desc: "The piercing star — light breaking through the night. The root th-q-b means to bore through, to perforate. This image is the surah's DNA; every subsequent image repeats this action.", color: "#4ecdc4" },
        { depth: 2, label: "The Body", ayah: "5–7", arabic: "خُلِقَ مِن مَّاءٍ دَافِقٍ", desc: "A gushing fluid breaking forth from between the backbone and the ribs. Even human creation participates in the metaphor: life begins as something that pierces through.", color: "#9b7fd4" },
        { depth: 3, label: "The Judgment", ayah: "9", arabic: "يَوْمَ تُبْلَى السَّرَائِرُ", desc: "The Day when secrets are exposed — the barrier between hidden and known is destroyed. The moral climax of the piercing metaphor.", color: "#C9A84C" },
        { depth: 4, label: "The Earth", ayah: "11–12", arabic: "وَالْأَرْضِ ذَاتِ الصَّدْعِ", desc: "The sky returns rain, the earth cracks open with vegetation. Seeds break soil the way the star breaks the dark. The same physical action, witnessed every season.", color: "#4ecdc4" },
        { depth: 5, label: "The Quran", ayah: "13", arabic: "إِنَّهُ لَقَوْلٌ فَصْلٌ", desc: "The ultimate piercing: a decisive word that separates truth from falsehood. The Quran pierces through denial the way the star pierces through the night.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah of proofs, not instructions — every absence is a posture",
      absences: [
        { item: "No ethical instruction", note: "At-Tariq does not tell its listeners what to do. It tells them what is real. The sky has a guardian star. The human was made from fluid. The earth splits. The Quran is decisive. The surah's entire posture is evidentiary, not instructional." },
        { item: "No imperative to the believers", note: "No command to pray, give charity, remember, or fear. The only imperative is the final one — fa mahhil al-kafirina — directed at the Prophet: wait. The surah's single command is patience." },
        { item: "No narrative, no dialogue", note: "No prophet's story, no destroyed nation described in detail, no conversation. The surah operates through a series of rapid, piercing observations — each one short enough to fit in a single breath." },
        { item: "No extended description of the Fire", note: "The Day of Judgment appears as exposure, not as punishment. Secrets are examined; the human has no power. But there is no fire described, no blast, no crushing. The consequence is helpless visibility." },
        { item: "No mention of believers or reward", note: "The surah concerns itself only with reality and its deniers. No paradise, no righteous community, no promise of reward. The evidence is presented; the implications are left self-evident." },
      ],
    },
  },

  contentNodes: [
    { concept: "Al-Najm al-Thaqib — the piercing star as governing metaphor", type: "surah-specific", articleSlug: "piercing-star-tariq-86" },
    { concept: "Raj' — one word threading resurrection and rain", type: "surah-specific", articleSlug: "raj-return-86-8-11" },
    { concept: "Buruj-Tariq liturgical pairing", type: "cross-surah", articleSlug: "buruj-tariq-liturgical-pair" },
    { concept: "Qawlun Fasl — the Quran's self-description as decisive", type: "cross-surah", articleSlug: "qawlun-fasl-decisive-word" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "penetrations", label: "Penetrations" },
  { id: "ring", label: "Ring" },
  { id: "domains", label: "Domains" },
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
        Sky → body → judgment → earth → revelation
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
          {activeTab === "penetrations" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "domains" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
