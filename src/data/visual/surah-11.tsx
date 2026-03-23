"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH HUD — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/hud
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Hud",
  arabicName: "هُود",
  meaning: "The Prophet Hud",
  number: 11,
  ayahCount: 123,
  period: "Makki",
  juz: "11–12",
  movements: 3,
  thesis:
    "The surah that turned the Prophet's hair white — seven prophets standing alone in seven cities, each one offering a door their people would not walk through, each one watching the consequences from the other side — and then the surah turns to you and says: now it is your turn to stand.",
  reflectionUrl: "/surahs/hud",
  readTime: "25 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"nazm","english":"Structural Coherence"},{"key":"munasabat","english":"Inter-surah Connections"}],
  heartVerse: {
    arabic: "فَاسْتَقِمْ كَمَا أُمِرْتَ وَمَن تَابَ مَعَكَ وَلَا تَطْغَوْا",
    ayahRef: "11:112",
    translation: "So be steadfast as you have been commanded — you and those who have turned back with you — and do not transgress.",
    why: "The verse the Prophet himself said aged him most. It lands after one hundred and eleven ayahs of watching what steadfastness cost every prophet before him. The command has not changed. The person hearing it has.",
  },

  audio: { surahNumber: 11, reciter: "ar.alafasy" },

  sectionMap: [
    { ayahs: "1–4", title: "The Book Perfected", color: "#4ecdc4", desc: "Alif-lam-ra. A Book whose verses have been perfected and then made clear, from One who is Wise and Aware. The word uhkimat — made precise — sets the tone for a surah that builds its argument with architectural precision." },
    { ayahs: "5–24", title: "The Stakes", color: "#4ecdc4", desc: "Portraits of human nature: exultant in relief, desperate in hardship, forgetting in comfort. The challenge to produce ten surahs. A parable of the blind and the seeing that crystallizes the choice the entire surah will dramatize." },
    { ayahs: "25–49", title: "Nuh & the Flood", color: "#e07a8a", desc: "The longest and most devastating narrative. The ark built while the elites mock. The son who refuses to board. The father's plea across the rising water. The divine correction: faith, not blood, defines family. The silence that follows." },
    { ayahs: "50–60", title: "Hud & 'Ad", color: "#e07a8a", desc: "The surah's namesake. Hud's defiance: 'I call Allah to witness that I am free of what you associate with Him.' A wind. Erasure so complete it is as though they never lived there." },
    { ayahs: "61–68", title: "Salih & Thamud", color: "#e07a8a", desc: "The she-camel as test. They hamstring her. Three days of knowing what comes. The horror is not the punishment but the interval of certainty before it arrives." },
    { ayahs: "69–76", title: "Ibrahim & the Angels", color: "#C9A84C", isPivot: true, desc: "The pattern breaks. Ibrahim as host, not warner. The roasted calf refused. Two pieces of news: a son for his wife, destruction for Lut's city. Ibrahim intercedes and is told to stop. At the center of the ring: prophetic compassion meeting divine decree." },
    { ayahs: "77–83", title: "Lut & the Destruction", color: "#e07a8a", desc: "The most claustrophobic scene. Angels at the door, the city's men demanding access. Lut's anguish: 'If only I had strength against you.' His wife among the lost — another prophet whose family is among the refused." },
    { ayahs: "84–95", title: "Shu'ayb & Madyan", color: "#e07a8a", desc: "Economic justice alongside worship. The mocking response: 'Does your prayer command you that we leave what our fathers worshipped?' Shu'ayb's integrity: 'I do not wish to do behind your backs what I forbid you.' The sayha — the shriek." },
    { ayahs: "96–99", title: "Musa & Fir'awn", color: "#e07a8a", desc: "Compressed to a few verses. The shepherd who led his flock to drink, and what they drank was ruin. The word awrada used with bitter irony." },
    { ayahs: "100–111", title: "Drawing the Lesson", color: "#9b7fd4", desc: "'Some are still standing and some have been reaped.' Standing ruins and vanished ones. Evidence in the landscape for anyone willing to look." },
    { ayahs: "112–123", title: "The Command", color: "#1A7A54", desc: "Fa-staqim — be upright, hold firm. The verse that aged the Prophet. The surah closes watching: 'Your Lord is not unaware of what you do.'" },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Weight",
      subtitle: "Three movements: stakes → seven prophets → the command to stand",
      sections: [
        { ayahs: "1–24", title: "The Stakes", color: "#4ecdc4", desc: "The Book perfected, the creation tested, a humanity that forgets its Creator the moment relief arrives. The surah sets its terms early and without apology — the principle is laid out, and now it will be shown across seven lifetimes." },
        { ayahs: "25–99", title: "The Prophetic Cycle", color: "#e07a8a", desc: "Seven prophets in sequence, each following the same arc: call, rejection, warning, ruin. The phrase 'And to [the people of X] We sent their brother [Y]' marks each new story like a tolling bell. But within each iteration something unique ruptures the pattern — a detail that belongs to this prophet alone, a grief that cannot be absorbed into any template." },
        { ayahs: "100–123", title: "The Command", color: "#1A7A54", desc: "The surah pulls back from narrative and speaks directly. Fa-staqim kama umirta — be steadfast as you have been commanded. Every story before this verse has been building the case for what steadfastness means by showing what it has cost. Every verse after is instruction on how to carry that weight without breaking." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Seven prophets arranged in concentric correspondence with Ibrahim at the center",
      pairs: [
        {
          left: { label: "Nuh", ayahs: "25–49", desc: "Outer frame — the longest telling, a father losing his son to the water, the grief that opens the cycle" },
          right: { label: "Musa/Fir'awn", ayahs: "96–99", desc: "Outer frame — the most compressed telling, a leader drowning his people, the irony that closes the cycle" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Hud / 'Ad", ayahs: "50–60", desc: "People who mock the messenger's person as much as his message — total erasure follows" },
          right: { label: "Shu'ayb / Madyan", ayahs: "84–95", desc: "People who mock the messenger's prayer life — 'Does your prayer command you?' — the same totality of destruction" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Salih / Thamud", ayahs: "61–68", desc: "A physical sign given as test — the she-camel — violated by the people" },
          right: { label: "Lut", ayahs: "77–83", desc: "A physical sign arriving as guests — the angels — whose sanctity the people attempt to violate" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "Ibrahim", ayahs: "69–76",
        desc: "The prophet who receives news of both life and death — a son promised, a city condemned — who intercedes and is told to stop.",
        note: "The hinge between the prophets who came before and the ones whose stories his visit sets in motion. He embodies the surah's deepest tension: the prophet who feels everything and must accept what he cannot change.",
      },
    },
    deductiveFunnel: {
      title: "The Pattern & Its Ruptures",
      subtitle: "Each prophet follows the template — and each one breaks it in a unique place",
      layers: [
        { depth: 1, label: "Nuh's Rupture", ayah: "42–47", arabic: "يَا بُنَيَّ ارْكَب مَّعَنَا", desc: "The son who refuses to board. A father calling across the rising water. The divine correction: 'He is not of your family — he is an act of unrighteousness.' A prophet repenting for having loved his son too much to accept that faith, not blood, is the bond that matters.", color: "#4ecdc4" },
        { depth: 2, label: "Ibrahim's Rupture", ayah: "69–76", arabic: "فَلَمَّا ذَهَبَ عَنْ إِبْرَاهِيمَ الرَّوْعُ", desc: "Not a warner to a hostile people but a host receiving guests. The domestic detail — the uneaten calf — shifts the register from public confrontation to private encounter. He argues for the people of Lut and is told to let it go.", color: "#C9A84C" },
        { depth: 3, label: "Lut's Rupture", ayah: "80", arabic: "لَوْ أَنَّ لِي بِكُمْ قُوَّةً", desc: "'If only I had strength against you.' A prophet at his most exposed — physically threatened, wishing for power he does not have. His wife among the lost. The third prophet in the surah whose family is among the refused.", color: "#e07a8a" },
        { depth: 4, label: "Shu'ayb's Rupture", ayah: "88", arabic: "وَمَا أُرِيدُ أَنْ أُخَالِفَكُمْ", desc: "'I do not wish to do behind your backs what I forbid you from doing.' The most personally revealing speech — prophetic integrity defined as alignment between public teaching and private conduct, and then the admission of dependence on Allah even for that.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's silences carry the weight of what it chose not to say",
      absences: [
        { item: "No vindication that feels satisfying", note: "After each destruction: silence and sorrow. The surah does not linger on the justice of each punishment. It lingers on the emptiness that follows. 'As though they had never lived there' (11:68)." },
        { item: "No triumph for any prophet", note: "Nuh is corrected for grieving his son. Ibrahim is told to stop interceding. Shu'ayb does not see the fruits of his integrity. The vindication is always attended by loss." },
        { item: "No safe family for any messenger", note: "Nuh's son drowns. Lut's wife is among the destroyed. Ibrahim must accept that his intercession has limits. Prophethood in this surah means carrying the message while watching those closest to you refuse it." },
        { item: "No instruction on how steadfastness gets easier", note: "The surah has spent a hundred verses showing that steadfastness does not mean things get easier. It means you remain upright while they remain hard. The command is structural, not motivational." },
        { item: "No mention of the Prophet's name", note: "Muhammad is not named. He is addressed directly — 'so be steadfast as you have been commanded' — but the surah places him inside the lineage of unnamed, unrecognized, grief-bearing prophets without singling him out by name." },
      ],
    },
  },

  contentNodes: [
    { concept: "Fa-staqim — the command that aged the Prophet", type: "surah-specific", articleSlug: "fastaqim-steadfastness-11-112" },
    { concept: "Nuh's son and the theology of family", type: "surah-specific", articleSlug: "nuh-son-faith-blood-11-46" },
    { concept: "Ibrahim at the center of the ring", type: "surah-specific", articleSlug: "ibrahim-center-ring-hud" },
    { concept: "Yunus–Hud–Yusuf triptych", type: "cross-surah", articleSlug: "yunus-hud-yusuf-triptych" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "weight", label: "Weight" },
  { id: "ring", label: "Ring" },
  { id: "ruptures", label: "Ruptures" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider
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

function SectionMap({ sections }: { sections: typeof SURAH_DATA.sectionMap }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">Section Map</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">123 ayahs across three movements — stakes, seven prophets, the command</p>
      </div>
      <div className="space-y-2">
        {sections.map((sec, i) => (
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural center</div>}
          </div>
        ))}
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
            className="rounded-xl p-4 space-y-2 border border-white/[0.06]"
            style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
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
        Each prophet follows the template — each one breaks it somewhere only he can
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
// PAGE SHELL — v3
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
              <div className="text-2xl font-bold text-gold-500 font-serif">7</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Prophets</div>
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
          {activeTab === "weight" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "ruptures" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMap sections={d.sectionMap} />
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
