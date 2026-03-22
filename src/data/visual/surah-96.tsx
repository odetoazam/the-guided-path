"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-'ALAQ — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-alaq
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-'Alaq",
  arabicName: "العَلَق",
  meaning: "The Clinging Clot",
  number: 96,
  ayahCount: 19,
  period: "Makki",
  juz: 30,
  movements: 4,
  thesis:
    "Nineteen verses that hold the first breath of revelation and the first act of defiance against it in a single frame — and answer both with the same command: come closer.",
  reflectionUrl: "/surahs/al-alaq",
  readTime: "18 min read",

  heartVerse: {
    arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
    ayahRef: "96:1",
    translation: "Read, in the name of your Lord who created.",
    why: "The most consequential imperative in human history. The first word God ever spoke to Muhammad — a command to engage, to receive, to enter the act of reading as a mode of being. Everything that follows in 6,236 verses flows from this opening moment.",
  },

  audio: { surahNumber: 96, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", translation: "Read, in the name of your Lord who created —" },
    { ayah: 2, arabic: "خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ", translation: "created the human being from a clinging clot." },
    { ayah: 3, arabic: "اقْرَأْ وَرَبُّكَ الْأَكْرَمُ", translation: "Read, and your Lord is the Most Generous —" },
    { ayah: 4, arabic: "الَّذِي عَلَّمَ بِالْقَلَمِ", translation: "who taught by the pen," },
    { ayah: 5, arabic: "عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ", translation: "taught the human being what he did not know." },
    { ayah: 6, arabic: "كَلَّا إِنَّ الْإِنسَانَ لَيَطْغَىٰ", translation: "No indeed! The human being truly transgresses —" },
    { ayah: 7, arabic: "أَن رَّآهُ اسْتَغْنَىٰ", translation: "because he sees himself as self-sufficient." },
    { ayah: 8, arabic: "إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ", translation: "Indeed, to your Lord is the return." },
    { ayah: 9, arabic: "أَرَأَيْتَ الَّذِي يَنْهَىٰ", translation: "Have you seen the one who forbids —" },
    { ayah: 10, arabic: "عَبْدًا إِذَا صَلَّىٰ", translation: "a servant when he prays?" },
    { ayah: 11, arabic: "أَرَأَيْتَ إِن كَانَ عَلَى الْهُدَىٰ", translation: "Have you considered: what if he is upon guidance," },
    { ayah: 12, arabic: "أَوْ أَمَرَ بِالتَّقْوَىٰ", translation: "or commands righteousness?" },
    { ayah: 13, arabic: "أَرَأَيْتَ إِن كَذَّبَ وَتَوَلَّىٰ", translation: "Have you considered: what if the forbidder has denied and turned away?" },
    { ayah: 14, arabic: "أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ", translation: "Does he not know that Allah sees?" },
    { ayah: 15, arabic: "كَلَّا لَئِن لَّمْ يَنتَهِ", translation: "No indeed! If he does not stop —" },
    { ayah: 16, arabic: "لَنَسْفَعًا بِالنَّاصِيَةِ", translation: "We will seize him by the forelock," },
    { ayah: 17, arabic: "نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ", translation: "a lying, sinful forelock." },
    { ayah: 18, arabic: "فَلْيَدْعُ نَادِيَهُ", translation: "Then let him call his associates." },
    { ayah: 19, arabic: "كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب ۩", translation: "No. Do not obey him. Prostrate. And draw near." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Arc",
      subtitle: "Four movements: commissioning → diagnosis → confrontation → command",
      sections: [
        { ayahs: "1–5", title: "The Commissioning", color: "#4ecdc4", desc: "The first five verses ever revealed. God commands reading, identifies Himself as Creator who formed the human from a clinging clot, declares His generosity, and announces that He taught by the pen — taught the human being what he did not know. A complete theological unit of pure receptivity." },
        { ayahs: "6–8", title: "The Diagnosis", color: "#e07a8a", desc: "The sharpest transition in the Quran. Kalla — a rebuke that slams the door on contemplation. The human being transgresses because he perceives himself as self-sufficient. The verb yatgha (to overflow bounds) uses the same root as the flood waters of Nuh. Self-sufficiency is the disease. The return to God is the reminder." },
        { ayahs: "9–14", title: "The Confrontation", color: "#9b7fd4", desc: "The surah narrows to a specific scene: a man who forbids a servant from praying. Three searing questions — have you considered if he is upon guidance? If he commands righteousness? If the forbidder has denied and turned away? The still point: does he not know that Allah sees?" },
        { ayahs: "15–19", title: "The Command", color: "#C9A84C", isPivot: true, desc: "Escalation from question to warning. If he does not stop, God will seize him by the forelock — a lying, sinful forelock. Let him call his council; We will call the angels. Then the final three imperatives: do not obey him. Prostrate. Draw near." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Command echoes command — the surah opens and closes with divine imperatives",
      pairs: [
        {
          left: { label: "Iqra' — Read", ayahs: "1–2", desc: "The command to read, grounded in God as Creator who formed the human from a clinging clot" },
          right: { label: "Usjud — Prostrate", ayahs: "15–19", desc: "The command to prostrate and draw near — the destination the reading was always leading to" },
          color: "#C9A84C",
        },
        {
          left: { label: "God Teaches", ayahs: "3–5", desc: "God's generosity — He taught by the pen, taught the human what he did not know" },
          right: { label: "God Sees", ayahs: "9–14", desc: "The one who forbids prayer is asked: does he not know that Allah sees? Teaching and seeing — two faces of divine attention" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Disease", ayahs: "6–8",
        desc: "The human being transgresses because he sees himself as self-sufficient.",
        note: "The center of the chiasm is the diagnosis. Everything surrounding it is either the gift that should prevent it or the confrontation it provokes.",
      },
    },
    deductiveFunnel: {
      title: "The Descent",
      subtitle: "From the birth of revelation to the only adequate human response",
      layers: [
        { depth: 1, label: "Command", ayah: "1", arabic: "اقْرَأْ بِاسْمِ رَبِّكَ", desc: "The absolute imperative — read. No object follows the verb. Iqra' stands alone as a mode of being, grounded immediately in the name of the Lord.", color: "#4ecdc4" },
        { depth: 2, label: "Origin", ayah: "2", arabic: "خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ", desc: "The human being's origin is dependence. 'Alaq — clinging, attaching, suspended. The embryo adhering to the uterine wall. You were once a thing that clung.", color: "#9b7fd4" },
        { depth: 3, label: "Delusion", ayah: "6–7", arabic: "إِنَّ الْإِنسَانَ لَيَطْغَىٰ أَن رَّآهُ اسْتَغْنَىٰ", desc: "The creature of dependence convinces himself he needs nothing. Istaghna — self-sufficiency. The perception (ra'ahu) is emphasized over reality. He sees himself as independent. He is wrong.", color: "#e07a8a" },
        { depth: 4, label: "Response", ayah: "19", arabic: "وَاسْجُدْ وَاقْتَرِب", desc: "Two words. Two commands. Prostrate and draw near. The forehead on the ground — the posture your origin already knew. The return to clinging.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah operates in radical directness — two scenes, two encounters, one cosmic argument",
      absences: [
        { item: "No prophetic stories", note: "No destroyed nations. No Musa, no Ibrahim, no Nuh. The surah operates in a space of radical directness — God speaking to one man at the moment of commissioning, then confronting one adversary at the moment of opposition." },
        { item: "No Paradise or Hell", note: "Despite the severity of the warning, neither Paradise nor Hellfire is described. The consequence is physical and immediate — seizure by the forelock — not eschatological." },
        { item: "No community addressed", note: "No 'O you who believe,' no ummah, no congregation. The scale is intimate. Two scenes, two encounters. The birth of the message and the first attempt to silence it." },
        { item: "No object for 'Read'", note: "Iqra' has no direct object. The command is not 'read this text' or 'read these words.' It is an absolute imperative — to enter reading as a mode of being. The absence of an object makes the command universal." },
        { item: "No transition between the two halves", note: "The first five verses (the cave) and the remaining fourteen (the confrontation) were likely revealed at different times. Yet the surah holds both — genesis and crisis — in one architectural unit with no seam." },
      ],
    },
  },

  contentNodes: [
    { concept: "'Alaq — the clinging clot and the theology of dependence", type: "surah-specific", articleSlug: "alaq-clinging-dependence-96" },
    { concept: "Istaghna — self-sufficiency as the primal sin", type: "surah-specific", articleSlug: "istaghna-self-sufficiency-96-7" },
    { concept: "The opening trilogy: Al-'Alaq, Al-Qalam, Al-Muddaththir", type: "cross-surah", articleSlug: "opening-trilogy-prophethood" },
    { concept: "Iqra' to Usjud — the arc from knowledge to worship", type: "cross-surah", articleSlug: "iqra-usjud-knowledge-worship" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "arc", label: "Arc" },
  { id: "ring", label: "Ring" },
  { id: "descent", label: "Descent" },
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
        Command → origin → delusion → response
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
          {activeTab === "arc" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "descent" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
