"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-QIYAMAH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-qiyama
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Qiyamah",
  arabicName: "القِيَامَة",
  meaning: "The Resurrection",
  number: 75,
  ayahCount: 40,
  period: "Makki",
  juz: 29,
  movements: 5,
  thesis:
    "A forty-ayah surah that places the Day of Resurrection and a single deathbed in the same frame, and shows you they are the same event at different scales.",
  reflectionUrl: "/surahs/al-qiyama",
  readTime: "18 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"qasam","english":"Oaths"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "بَلِ الْإِنسَانُ عَلَىٰ نَفْسِهِ بَصِيرَةٌ",
    ayahRef: "75:14",
    translation: "Man is a witness against himself.",
    why: "The self-reproaching soul the surah swore by in its opening becomes the self-witnessing soul of the courtroom. No external accuser is needed. The conscience the surah elevated to the rank of an oath is the same conscience that delivers the verdict.",
  },

  audio: { surahNumber: 75, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Oscillation",
      subtitle: "Five movements: oath → Day → revelation → deathbed → confrontation",
      sections: [
        { ayahs: "1–6", title: "The Double Oath", color: "#4ecdc4", desc: "God swears by the Day of Resurrection itself and by the self-reproaching soul — the cosmic and the intimate, side by side. The Quraysh mocked the idea of reassembled bones; the surah points to the fingertip, where identity is most particular." },
        { ayahs: "7–15", title: "The Day Arrives", color: "#e07a8a", desc: "The mocker's question is answered with a scene, not a date. Eyes dazzled, moon eclipsed, sun and moon fused. Man cries 'Where is the escape?' and finds none. Then the courtroom: man is a witness against himself, no matter what excuses he throws." },
        { ayahs: "16–19", title: "The Revelation Pause", color: "#C9A84C", isPivot: true, desc: "The surah stops its own argument to address the Prophet directly — do not hasten your tongue with it. The gathering of the Quran uses the same root (j-m-ʿ) as the gathering of bones and of the cosmos. The quiet center of a relentless surah." },
        { ayahs: "20–30", title: "The Deathbed", color: "#9b7fd4", desc: "The surah descends into a single room. The soul reaches the collarbones. Someone asks 'Who will cure him?' The dying person knows it is the parting. The legs wind around each other. Every detail comes from watching someone die — and the argument becomes somatic." },
        { ayahs: "31–40", title: "The Closed Door", color: "#e07a8a", desc: "The denier is stripped bare: he neither believed nor prayed, he denied and swaggered home. Then the surah returns to creation — fluid, clinging form, male and female — and closes on a question that expects only one answer: Is He not able to give life to the dead?" },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's outer frame asks about resurrection; its center is about how God gathers His word",
      pairs: [
        {
          left: { label: "Resurrection Challenge", ayahs: "1–6", desc: "Does man think We cannot assemble his bones? Yes — even his fingertips." },
          right: { label: "Resurrection Proof", ayahs: "31–40", desc: "Was he not fluid, then clinging form? Is that One not able to give life to the dead?" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Day of Judgment", ayahs: "7–15", desc: "Cosmic collapse. Man as self-witness. Excuses cannot cover self-knowledge." },
          right: { label: "The Deathbed", ayahs: "20–30", desc: "Personal death. The soul at the collarbones. The parting known. Legs going still." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Gathering of the Word", ayahs: "16–19",
        desc: "Do not hasten your tongue. Its collection and recitation are upon Us.",
        note: "The center of the ring is God's gathering of speech — the same root (j-m-ʿ) as gathering bones and gathering the cosmos. If this speech can be gathered, the body is a lesser feat.",
      },
    },
    deductiveFunnel: {
      title: "The Gathering Root",
      subtitle: "The root j-m-ʿ threads through three scales — body, cosmos, scripture",
      layers: [
        { depth: 1, label: "Body", ayah: "3", arabic: "أَلَّن نَّجْمَعَ عِظَامَهُ", desc: "Gathering the bones. The resurrection of the body — the smallest scale of divine assembly, and the one the mockers denied.", color: "#4ecdc4" },
        { depth: 2, label: "Cosmos", ayah: "9", arabic: "وَجُمِعَ الشَّمْسُ وَالْقَمَرُ", desc: "Gathering the sun and moon. Cosmic collapse — the same verb applied to celestial bodies. What God gathers, He gathers at every scale.", color: "#9b7fd4" },
        { depth: 3, label: "Scripture", ayah: "17", arabic: "إِنَّ عَلَيْنَا جَمْعَهُ", desc: "Gathering the Quran. The preservation of revelation — God who gathers scattered speech into coherent Book can surely gather scattered bones into a body.", color: "#C9A84C" },
        { depth: 4, label: "The Question", ayah: "40", arabic: "أَلَيْسَ ذَٰلِكَ بِقَادِرٍ عَلَىٰ أَن يُحْيِيَ الْمَوْتَىٰ", desc: "The surah transfers the burden. The truth is no longer something announced to you. It is something you are asked to speak.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah strips away every category and faces the human creature directly",
      absences: [
        { item: "No mention of 'Allah' by name", note: "God is referred to only through pronouns and through His creative acts. The surah does not even use the word Allah — forcing the encounter to become personal rather than doctrinal." },
        { item: "No prophetic stories", note: "No destroyed nations. No Pharaoh, no ʿAd, no Thamud. The surah does not argue through precedent. It argues through the body." },
        { item: "No Paradise or Hell descriptions", note: "Two faces — radiant and contorted — in two ayahs, and the surah moves on. It refuses the comfort of detailed eschatology." },
        { item: "No moral commandments", note: "No ethical instruction, no legal rulings. The surah is not prescribing behavior. It is confronting existence." },
        { item: "No labels for the denier", note: "No kafiroon, no mushrikoon. The denier is simply al-insan — man, the human being. The category is universal." },
      ],
    },
  },

  contentNodes: [
    { concept: "The nafs al-lawwamah — conscience as oath-worthy", type: "surah-specific", articleSlug: "nafs-lawwamah-conscience-75" },
    { concept: "The deathbed sequence — soul at the collarbones", type: "surah-specific", articleSlug: "deathbed-collarbones-75-26" },
    { concept: "The gathering root (j-m-ʿ) across three scales", type: "cross-surah", articleSlug: "gathering-root-jma-75" },
    { concept: "Fingertip and sawwa — creation as resurrection proof", type: "cross-surah", articleSlug: "fingertip-sawwa-creation-resurrection" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "gathering", label: "Gathering" },
  { id: "absent", label: "Absences" },
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
        Body → cosmos → scripture → question
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "gathering" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
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
