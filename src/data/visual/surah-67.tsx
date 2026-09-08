"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MULK — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-mulk
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Mulk",
  arabicName: "المُلك",
  meaning: "The Dominion",
  number: 67,
  ayahCount: 30,
  period: "Makki",
  juz: 29,
  movements: 4,
  thesis:
    "A thirty-ayah prosecution in which creation itself takes the witness stand — the flawless sky, the docile earth, the suspended birds — and the silence after the final question about vanishing water is the verdict.",
  reflectionUrl: "/surahs/al-mulk",
  readTime: "20 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ",
    ayahRef: "67:12",
    translation: "Indeed, those who fear their Lord in the unseen will have forgiveness and a great reward.",
    why: "The surah's quiet hinge. Everything before it is evidence and punishment. Everything after it is signs and questions. This single ayah names the one response that separates the two groups: awe of God when no one is watching.",
  },

  audio: { surahNumber: 67, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Prosecution",
      subtitle: "Four waves: declaration → confession → signs → silence",
      sections: [
        { ayahs: "1–5", title: "The Declaration", color: "#4ecdc4", desc: "Sovereignty is declared and immediately translated into visible evidence. The heavens stacked in layers, flawless under any scrutiny. Stars that are simultaneously lamps and missiles. Beauty and threat sharing the same object." },
        { ayahs: "6–11", title: "The Confession", color: "#e07a8a", desc: "Hell inhales. Its keepers interrogate every new group: did a warner not come to you? The damned confess fully — they heard, they denied, they said God sent nothing. Their final words name the faculties they wasted: had we listened or reasoned." },
        { ayahs: "12–14", title: "The Hinge", color: "#C9A84C", isPivot: true, desc: "A single ayah of clemency between two walls of evidence. Those who fear their Lord in the unseen receive forgiveness. The surah shifts from what God does to what you do. The offer of mercy converts the prosecution into an invitation." },
        { ayahs: "15–30", title: "The Cross-Examination", color: "#9b7fd4", desc: "The surah re-enters the visible world — the tamed earth, the suspended birds, the provision that could be withheld — and asks sixteen questions. Each one tightens the argument until the final question about vanishing water hangs in the air, unanswered. The silence is the verdict." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's concentric structure places God's grip at the center",
      pairs: [
        {
          left: { label: "Sovereignty & Creation", ayahs: "1–5", desc: "God's dominion declared through the flawless heavens, stars as lamps and missiles" },
          right: { label: "Provision & Water", ayahs: "28–30", desc: "The final questions — if the messenger dies, then what? If the water vanishes, then who?" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Hell's Confession", ayahs: "6–11", desc: "The damned admit: we had the faculties, we refused to use them" },
          right: { label: "The Mockers", ayahs: "23–27", desc: "The faculties named — hearing, sight, hearts — and the mockery of those who waste them" },
          color: "#e07a8a",
        },
        {
          left: { label: "Fear in the Unseen", ayahs: "12", desc: "Those who fear their Lord when no one is watching receive forgiveness" },
          right: { label: "Walking Upright", ayahs: "22", desc: "The one who walks upright on a straight path versus the one fallen on his face" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "God's Grip", ayahs: "15–21",
        desc: "The earth made docile — and could swallow you. The birds held aloft — and could fall. The provision sustained — and could be withheld.",
        note: "The same verb (m-s-k) threads holding birds and withholding provision. The center of the surah is about grip — God's grip on the world you walk on.",
      },
    },
    deductiveFunnel: {
      title: "The Ratchet",
      subtitle: "Sixteen questions that never repeat — each one tightens the argument further",
      layers: [
        { depth: 1, label: "Evidence", ayah: "3–4", arabic: "فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ", desc: "Look at the sky. Find a crack. Look again. Your gaze returns humbled. The argument begins with an invitation to test creation's perfection — and the test fails every time.", color: "#4ecdc4" },
        { depth: 2, label: "Consequence", ayah: "10", arabic: "لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ", desc: "The damned confess they had the instruments — hearing and reason — and refused to engage either one. The evidence was always available. The failure was always theirs.", color: "#e07a8a" },
        { depth: 3, label: "Dependence", ayah: "19", arabic: "مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ", desc: "Birds held in empty sky by nothing visible. The same God who sustains flight could release it. Every moment of suspension is an act of mercy and an argument for sovereignty.", color: "#9b7fd4" },
        { depth: 4, label: "Silence", ayah: "30", arabic: "فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ", desc: "The surah ends mid-question. No answer. No closing formula. The listener knows. The water comes from Him. Everything comes from Him. The abstract has become thirst.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence is a structural choice — the argument is stripped to two parties: Creator and you",
      absences: [
        { item: "No prophetic narratives", note: "No Moses, no Abraham, no Noah. No destroyed nations named by title — no 'Ad, no Thamud, no Pharaoh. The surah strips the argument down to what you can see when you look up and look down." },
        { item: "No moral legislation", note: "No commands about prayer, fasting, charity, or social conduct. The only behavioral prescription is ayah 12: fear God when you are alone with what you know. Everything else is evidence and interrogation." },
        { item: "No repeated refrain", note: "Unlike Ar-Rahman's thirty-one repetitions, Al-Mulk's sixteen questions are never repeated. Each question is new. Each one tightens the argument. The surah is a ratchet, not a refrain." },
        { item: "No answer to the final question", note: "The surah ends mid-question — if your water sank, who could bring you flowing water? — and provides no answer. The silence is the argument. The listener's own dependence is the reply." },
        { item: "No closing formula", note: "No sadaqa Allahu al-'azim, no final declaration. The surah hangs in the air like the birds in ayah 19 — suspended, held by nothing visible. You are left standing at the edge of the well." },
      ],
    },
  },

  contentNodes: [
    { concept: "Khashya bil-ghayb — awe when unseen", type: "surah-specific", articleSlug: "khashya-bil-ghayb-67-12" },
    { concept: "Dhalul — the earth as tamed mount", type: "surah-specific", articleSlug: "dhalul-earth-tamed-67-15" },
    { concept: "Al-Mulk–Al-Qalam diptych: cosmos and character", type: "cross-surah", articleSlug: "mulk-qalam-diptych-67-68" },
    { concept: "Al-Mulk–Al-Kahf water echo", type: "cross-surah", articleSlug: "mulk-kahf-water-echo" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "prosecution", label: "Prosecution" },
  { id: "ring", label: "Ring" },
  { id: "ratchet", label: "Ratchet" },
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
        Evidence → consequence → dependence → silence
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
          {activeTab === "prosecution" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "ratchet" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
