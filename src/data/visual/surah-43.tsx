"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AZ-ZUKHRUF — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/az-zukhruf
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Az-Zukhruf",
  arabicName: "الزُّخْرُف",
  meaning: "The Gold Ornaments",
  number: 43,
  ayahCount: 89,
  period: "Makki",
  juz: 25,
  movements: 4,
  thesis:
    "The Quran's most sustained dismantling of the logic that equates wealth with worth — a surah that names gold as surface ornamentation and then shows, through Ibrahim, Musa, and ʿĪsā, what it looks like to see through it.",
  reflectionUrl: "/surahs/az-zukhruf",
  readTime: "20 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"amthal","english":"Parables"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "وَلَوْلَا أَن يَكُونَ النَّاسُ أُمَّةً وَاحِدَةً لَّجَعَلْنَا لِمَن يَكْفُرُ بِالرَّحْمَـٰنِ لِبُيُوتِهِمْ سُقُفًا مِّن فِضَّةٍ وَمَعَارِجَ عَلَيْهَا يَظْهَرُونَ",
    ayahRef: "43:33",
    translation: "And were it not that all people would become one community in disbelief, We would have made for those who disbelieve in the Most Merciful — for their houses — roofs of silver, and staircases upon which to ascend.",
    why: "The theological heart of the surah: Allah would freely distribute every material luxury to the disbelievers if doing so would not corrupt all of humanity. The only reason He withholds it is to protect people — not because it has value. Wealth is zukhruf: surface ornamentation that reveals nothing about the one beneath it.",
  },

  audio: { surahNumber: 43, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Cross-Examination",
      subtitle: "Four movements: heavenly book → inherited idols → wealth theology → prophetic witness",
      sections: [
        { ayahs: "1–14", title: "The Heavenly Book & Earthly Signs", color: "#4ecdc4", desc: "The surah opens with an oath by the Clear Book, establishes the Quran's origin in the Umm al-Kitab, then moves through creation — earth as cradle, rain as revival, paired transport — building the case that the Creator's generosity is everywhere visible." },
        { ayahs: "15–25", title: "The Indictment of Inherited Religion", color: "#e07a8a", desc: "The Quraysh assign daughters to Allah while celebrating sons for themselves, claim the angels are female without evidence, and declare: 'We found our fathers upon a way.' Every powerful class in history has said the same sentence. The surah exposes taqlid — blind inheritance — as the enemy of thought." },
        { ayahs: "26–65", title: "Three Prophets, One Argument", color: "#C9A84C", isPivot: true, desc: "Ibrahim breaks with his father's idolatry (personal scale). Musa confronts Pharaoh's rivers-as-theology (political scale). ʿĪsā is made a sign his followers turned into a deity (theological scale). At the center: the gold-ornament passage — Allah would give silver roofs and gold staircases to the disbelievers if it would not corrupt humanity. Wealth is zukhruf — mere surface." },
        { ayahs: "66–89", title: "The Hour & the Parting Word", color: "#9b7fd4", desc: "Friends become enemies except the God-conscious. Gold reappears — but now as plates in Paradise for those who saw through the surface. The condemned cry to Malik: let your Lord end us. He answers: you will remain. The surah closes: turn away from them and say salam. They will come to know." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's concentric structure places the gold-ornament argument at its gravitational center",
      pairs: [
        {
          left: { label: "The Clear Book", ayahs: "1–14", desc: "The Quran's heavenly origin, the signs in creation, the question of who made the heavens and earth" },
          right: { label: "The Closing Declaration", ayahs: "81–89", desc: "He is God in the heaven and God on the earth. Turn away and say peace — they will come to know" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Inherited Religion Exposed", ayahs: "15–25", desc: "Following fathers blindly, the affluent classes always say the same thing, retribution on the deniers" },
          right: { label: "The Day of Judgment", ayahs: "66–80", desc: "Friends become enemies, paradise for the believers, the condemned call to Malik for annihilation" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Ibrahim's Break", ayahs: "26–28", desc: "The formal dissociation from ancestral worship — an enduring word in his descendants" },
          right: { label: "ʿĪsā as Sign", ayahs: "57–65", desc: "A servant whom Allah blessed, made an example — not a deity. The same straight path Ibrahim declared" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Gold Argument & Pharaoh's Rivers", ayahs: "29–56",
        desc: "Allah would give disbelievers silver roofs and gold staircases — all of it mere surface. Pharaoh pointed to his rivers as proof of divinity. He drowned in them.",
        note: "The surah is named after the thing it is dismantling. The center of the ring is the center of the illusion.",
      },
    },
    deductiveFunnel: {
      title: "The Prophetic Triptych",
      subtitle: "Three prophets, three scales, one escalating argument about seeing through the surface",
      layers: [
        { depth: 1, label: "Ibrahim — Personal", ayah: "26–28", arabic: "إِنَّنِي بَرَاءٌ مِّمَّا تَعْبُدُونَ", desc: "The break is familial. A son refuses his father's idols in a culture where paternal authority was almost sacred. Ibrahim walks away with nothing but a declaration — and that declaration becomes an enduring inheritance. The most difficult thing to see through is what your family taught you.", color: "#4ecdc4" },
        { depth: 2, label: "Musa — Political", ayah: "46–56", arabic: "أَلَيْسَ لِي مُلْكُ مِصْرَ", desc: "The confrontation is imperial. Pharaoh argues from economics — do I not possess the kingdom of Egypt and these rivers flowing beneath me? Musa stands before the wealthiest man in the world with nothing but a message and a staff. Pharaoh's rivers become the instrument of his drowning.", color: "#e07a8a" },
        { depth: 3, label: "ʿĪsā — Theological", ayah: "57–64", arabic: "إِنْ هُوَ إِلَّا عَبْدٌ أَنْعَمْنَا عَلَيْهِ", desc: "The error is the most subtle. Not worshipping gold, not worshipping political power, but worshipping a human being whom Allah blessed — mistaking the gift for the Giver. ʿĪsā was a servant, a sign, an example. His followers elevated the sign into the Signifier.", color: "#9b7fd4" },
        { depth: 4, label: "The Pivot — Zukhruf", ayah: "33–35", arabic: "وَزُخْرُفًا", desc: "The gold-ornament passage sits at the center, connecting all three prophetic stories. Every form of idolatry the surah examines — ancestral, imperial, theological — is powered by the same engine: the confusion of visible splendor with invisible truth.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah is entirely diagnostic — what it deliberately excludes sharpens what it includes",
      absences: [
        { item: "No direct ethical commands", note: "No instructions on prayer, fasting, charity, or conduct. The surah is a mirror held up to a civilization, not a prescription. The remedy is implied by the prophetic stories: Ibrahim walked away, Musa confronted, ʿĪsā was made a sign." },
        { item: "No destroyed nations by name", note: "No ʿĀd, no Thamūd, no people of Lūṭ. Pharaoh's drowning is mentioned, but the emphasis is on what his arrogance was, not on the mechanics of destruction. The surah is less interested in consequences than in exposing the reasoning that leads to them." },
        { item: "No mention of salah or ritual", note: "For an 89-ayah surah, the absence of any ritual instruction is a design choice. The surah is entirely occupied with diagnosis: the worship of wealth and inherited tradition." },
        { item: "No address to the believers as a community", note: "The phrase 'O you who believe' does not appear. The surah speaks to the Quraysh, through the Quraysh, about the Quraysh — until the single, brief moment in ayah 68 where Allah addresses His servants in paradise." },
        { item: "No path offered to the deniers", note: "The surah does not say 'repent.' It says 'turn away from them and say peace.' The file has been closed. The verdict is that they will come to know — but the surah does not stay to watch them learn." },
      ],
    },
  },

  contentNodes: [
    { concept: "Zukhruf — gold as surface ornamentation", type: "surah-specific", articleSlug: "zukhruf-gold-surface-43" },
    { concept: "Pharaoh's rivers as wealth-theology", type: "surah-specific", articleSlug: "pharaoh-rivers-theology-43-51" },
    { concept: "The prophetic triptych: Ibrahim, Musa, ʿĪsā", type: "cross-surah", articleSlug: "prophetic-triptych-43" },
    { concept: "Taqlid — the creed of inherited tradition", type: "cross-surah", articleSlug: "taqlid-inherited-tradition" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "triptych", label: "Triptych" },
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
        Personal → political → theological → the surface they all share
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

        {/* -- Hero -- */}
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
              <div className="text-2xl font-bold text-gold-500 font-serif">3</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Prophets</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />

        {/* -- Tab bar -- */}
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

        {/* -- Tab content -- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "triptych" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
        </div>

        {/* -- Go Deeper -- */}
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
