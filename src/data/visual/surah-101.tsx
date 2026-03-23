"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-QARI'AH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-qaria
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Qari'ah",
  arabicName: "القارعة",
  meaning: "The Striking Calamity",
  number: 101,
  ayahCount: 11,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "An eleven-ayah vision that strikes three times with the name of what is coming, shows the world unmade in two domestic images — moths and carded wool — places a scale at the center of everything, and closes with a fire named in two words. The surah begins with the sky and ends in a pit.",
  reflectionUrl: "/surahs/al-qaria",
  readTime: "14 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"},{"key":"ijaz","english":"Inimitability"}],
  heartVerse: {
    arabic: "فَأُمُّهُ هَاوِيَةٌ",
    ayahRef: "101:9",
    translation: "His mother is the Abyss.",
    why: "The word umm means mother — the place of warmth, return, shelter. To say his mother is Hawiyah is to say the Fire becomes his home, his shelter, the thing that receives him the way a mother's lap receives a child. The inversion is devastating: the place of ultimate safety becomes the place of ultimate torment.",
  },

  audio: { surahNumber: 101, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الْقَارِعَةُ", translation: "The Striking Calamity —" },
    { ayah: 2, arabic: "مَا الْقَارِعَةُ", translation: "What is the Striking Calamity?" },
    { ayah: 3, arabic: "وَمَا أَدْرَاكَ مَا الْقَارِعَةُ", translation: "And what will make you realize what the Striking Calamity is?" },
    { ayah: 4, arabic: "يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ", translation: "The Day when people will be like moths scattered about," },
    { ayah: 5, arabic: "وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنفُوشِ", translation: "and the mountains will be like carded wool." },
    { ayah: 6, arabic: "فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ", translation: "As for the one whose scales are heavy —" },
    { ayah: 7, arabic: "فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ", translation: "they will be in a pleasant life." },
    { ayah: 8, arabic: "وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ", translation: "And as for the one whose scales are light —" },
    { ayah: 9, arabic: "فَأُمُّهُ هَاوِيَةٌ", translation: "their mother is the Abyss." },
    { ayah: 10, arabic: "وَمَا أَدْرَاكَ مَا هِيَهْ", translation: "And what will make you realize what it is?" },
    { ayah: 11, arabic: "نَارٌ حَامِيَةٌ", translation: "A scorching fire." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Three Strikes",
      subtitle: "Three movements: spectacle → sorting → consequence",
      sections: [
        { ayahs: "1–5", title: "The Spectacle", color: "#e07a8a", desc: "The surah opens by hammering its own name three times — al-Qari'ah, al-Qari'ah, al-Qari'ah — each strike deeper than the last. The word qar'a means to strike, to pound, to knock. The percussive rhythm mimics what it describes. Then two images from domestic life: people become scattered moths — al-farash al-mabthuth — swarming, chaotic, drawn toward what they cannot understand. Mountains become carded wool — al-'ihn al-manfush — the hardest thing in the visible world becomes the softest. Not crushed, not blown, but pulled apart fiber by fiber." },
        { ayahs: "6–9", title: "The Sorting", color: "#C9A84C", isPivot: true, desc: "The fa-amma...wa amma construction divides humanity into exactly two groups. No spectrum, no ambiguity. Heavy scales earn 'ishatin radiyah — a life of deep satisfaction, from the same root as Allah's pleasure with His servants. Light scales earn something stranger: fa-ummuhu hawiyah — his mother is the Abyss. The place of ultimate safety becomes the place of ultimate torment. The Abyss is where he belongs now. It is home." },
        { ayahs: "10–11", title: "The Naming", color: "#9b7fd4", desc: "The ma adraka formula returns — the second time in eleven ayahs. The first asked about the Striking Hour. This one asks about the Abyss. The answer is two words: narun hamiyah — a fire whose heat guards itself, that does not cool, that repels approach. Where the opening expanded through three repetitions, the closing contracts to a single image. The compression is absolute." },
      ],
    },
    chiasticRing: {
      title: "The Frame",
      subtitle: "Twin towers of incomprehension bracket the moral center",
      pairs: [
        {
          left: { label: "The Event Named", ayahs: "1–3", desc: "Al-Qari'ah repeated three times, expanding into the ma adraka question — reaching for comprehension that cannot arrive" },
          right: { label: "The Fire Named", ayahs: "10–11", desc: "Ma adraka returns — but the answer contracts to two words: narun hamiyah. Expansion meets compression. The asymmetry is the argument." },
          color: "#e07a8a",
        },
        {
          left: { label: "Creation Unmade", ayahs: "4–5", desc: "People like scattered moths, mountains like carded wool — the animate and inanimate both lose their form" },
          right: { label: "The Abyss", ayahs: "9", desc: "Fa-ummuhu hawiyah — his mother is the plunge. The Fire that receives the way a mother receives." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Scales", ayahs: "6–8",
        desc: "Heavy or light. Pleasant life or the Abyss. The moral reckoning sits at the architectural center of the surah.",
        note: "The Event can be shown — moths, wool, scales, a pleasant life. The punishment cannot. It can only be named. The surah puts the weighing at its center and surrounds it with the sensory evidence of its consequences.",
      },
    },
    deductiveFunnel: {
      title: "The Compression",
      subtitle: "From cosmic spectacle to two-word verdict — each layer tighter than the last",
      layers: [
        { depth: 1, label: "The Name", ayah: "1–3", arabic: "الْقَارِعَةُ مَا الْقَارِعَةُ", desc: "Three repetitions of the same word, expanding into a question. The surah knocks three times before it opens the door. The rhyme scheme — ah, ah, ah — hammers through the first five ayahs like a heartbeat accelerating. The surah does not explain the Day of Judgment. It recreates the sensation of it arriving.", color: "#4ecdc4" },
        { depth: 2, label: "The Vision", ayah: "4–5", arabic: "كَالْفَرَاشِ الْمَبْثُوثِ", desc: "Two images chosen from domestic life — insects near a lamp, wool in a woman's hands — to describe the end of the world. The mundane becomes the vehicle for the cosmic. The end of the world described in the language of a household task. Not crushed, not blown, not leveled — carded. Pulled apart fiber by fiber.", color: "#9b7fd4" },
        { depth: 3, label: "The Scales", ayah: "6–9", arabic: "فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ", desc: "The binary that reduces all of human moral life to mass on a scale. The mawazin — plural, suggesting either multiple scales for different categories of deeds or a single scale of such magnitude the plural conveys its weight. The surah does not tell you what makes the scales heavy. The question falls entirely on the listener.", color: "#e07a8a" },
        { depth: 4, label: "The Fire", ayah: "10–11", arabic: "نَارٌ حَامِيَةٌ", desc: "Two words. Every other surah that uses the ma adraka formula expands its answer. This one contracts it. The fire is named and the surah ends. The closing is so compressed it feels like a door slamming.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah builds an entire eschatology in the time it takes to exhale — and leaves out everything else",
      absences: [
        { item: "No argument for resurrection", note: "The Quraysh found bodily resurrection physically absurd. The surah offers no evidence, no reasoning. It simply shows you what it looks like — images so vivid they bypass the intellect and land in the body. The Quraysh were not given a theological argument. They were given a vision." },
        { item: "No content on the scales", note: "The surah never specifies what makes the scales heavy or light. No list of deeds, no commandments, no prohibited acts. In the economy of that Day, what actually weighs something? The question falls on you." },
        { item: "No description of the Fire", note: "The closing asks 'what is the Abyss?' and answers with two words. Every other surah using the ma adraka formula expands its answer. This one contracts it. The fire is named and the surah ends." },
        { item: "No believers, no prophets, no stories", note: "No 'O you who believe,' no Prophetic narrative, no destroyed nation. The surah exists purely as vision — spectacle, sorting, consequence — with no human characters except the anonymous weighed." },
        { item: "No prescription", note: "No moral instruction, no command to pray or give charity. The surah is pure diagnosis and pure consequence. At-Takathur, which follows immediately, names the distraction that kept you from asking the questions this surah raises." },
      ],
    },
  },

  contentNodes: [
    { concept: "Umm as Hawiyah — the mother-abyss inversion", type: "surah-specific", articleSlug: "hawiya-mother-abyss-101-9" },
    { concept: "Mountains as carded wool — the unmaking of permanence", type: "surah-specific", articleSlug: "mountains-wool-dissolution-101" },
    { concept: "Qari'ah-Takathur sequence — scales and what emptied them", type: "cross-surah", articleSlug: "qariah-takathur-sequence" },
    { concept: "Ma adraka — the Quran's formula for incomprehension", type: "cross-surah", articleSlug: "ma-adraka-formula-quran" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "strikes", label: "Strikes" },
  { id: "frame", label: "Frame" },
  { id: "compression", label: "Compression" },
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
        Name → vision → scales → fire
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
              <div className="text-2xl font-bold text-gold-500 font-serif">2</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ma Adraka</div>
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
          {activeTab === "strikes" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "frame" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "compression" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
