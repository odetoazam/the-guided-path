"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TIN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-tin
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Tin",
  arabicName: "التِّين",
  meaning: "The Fig",
  number: 95,
  ayahCount: 8,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "Eight ayahs that function as a courtroom — sacred places summoned as witnesses, a verdict on human nature delivered in two sentences, and a closing question that expects no answer because none is available.",
  reflectionUrl: "/surahs/at-tin",
  readTime: "16 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"ijaz","english":"Inimitability"}],
  heartVerse: {
    arabic: "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ",
    ayahRef: "95:4",
    translation: "We created the human being in the finest form.",
    why: "The phrase ahsan taqwim appears nowhere else in the Quran. A unique descriptor for a unique claim: the human being was made upright in every sense — physically, morally, spiritually. This is the starting position, the factory setting, the station from which the fall is measured.",
  },

  audio: { surahNumber: 95, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَالتِّينِ وَالزَّيْتُونِ", translation: "By the fig and the olive —" },
    { ayah: 2, arabic: "وَطُورِ سِينِينَ", translation: "and Mount Sinai —" },
    { ayah: 3, arabic: "وَهَـٰذَا الْبَلَدِ الْأَمِينِ", translation: "and this secure city —" },
    { ayah: 4, arabic: "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ", translation: "We created the human being in the finest form." },
    { ayah: 5, arabic: "ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ", translation: "Then We reduced him to the lowest of the low —" },
    { ayah: 6, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ", translation: "except those who believe and do righteous deeds — for them is an uninterrupted reward." },
    { ayah: 7, arabic: "فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ", translation: "So what, after this, makes you deny the judgment?" },
    { ayah: 8, arabic: "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ", translation: "Is Allah not the wisest of judges?" },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Courtroom",
      subtitle: "Three movements: witnesses summoned → verdict delivered → question unanswered",
      sections: [
        { ayahs: "1–3", title: "The Witnesses", color: "#4ecdc4", desc: "Four sacred places called to testify. The fig and olive point to the Levant — the land of prophets. Mount Sinai is where Musa received the Torah. 'This secure city' is Makkah, where the final revelation descends. Three locations. Three revelatory traditions. Three moments when heaven touched earth." },
        { ayahs: "4–6", title: "The Verdict", color: "#C9A84C", isPivot: true, desc: "The claim the witnesses were summoned to confirm. The human being was created at the highest station (ahsan taqwim) — then reduced to the lowest (asfala safilin). But the word illa stops the fall. Those who believe and act righteously are exempt. The exception is the entire argument compressed into a grammatical particle." },
        { ayahs: "7–8", title: "The Question", color: "#9b7fd4", desc: "A sudden shift to second person singular — you. After all this evidence, what grounds remain for denying judgment? The surah closes by naming Allah as ahkam al-hakimin — the wisest of judges, the One who measures the distance between what you were made to be and what you chose to become." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah opens in the soil and closes at the throne — the distance between fig trees and the Judge of all judges",
      pairs: [
        {
          left: { label: "Lands of Revelation", ayahs: "1–3", desc: "Sacred places where human beings encountered the divine and were elevated by it — the Levant, Sinai, Makkah. Earthly, tangible, rooted in soil." },
          right: { label: "The Divine Judge", ayahs: "7–8", desc: "Allah as ahkam al-hakimin — the wisest of judges. The One who measures the distance between the two stations. From ground to throne." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Highest Station", ayahs: "4", desc: "Ahsan taqwim — the finest form. Physically upright, morally upright in capacity, spiritually upright in potential. The factory setting." },
          right: { label: "The Lowest Depth", ayahs: "5", desc: "Asfala safilin — the lowest of the low. A superlative stacked upon a superlative. The distance between these two phrases is the surah's argument." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Exception", ayahs: "6",
        desc: "Except those who believe and do righteous deeds — for them is an uninterrupted reward.",
        note: "The word illa stops the fall. Without it, the surah is a tragedy. With it, the surah becomes a challenge: the fall is not inevitable. The door marked exit is clearly labeled.",
      },
    },
    deductiveFunnel: {
      title: "The Argument",
      subtitle: "Each layer tightens the case until no response remains",
      layers: [
        { depth: 1, label: "Witnesses", ayah: "1–3", arabic: "وَالتِّينِ وَالزَّيْتُونِ", desc: "The courtroom opens. Sacred geography is summoned — every place where revelation landed is called to confirm what comes next. The only fruits used as oaths in the Quran. Every other short-surah oath invokes cosmic phenomena. At-Tin opens with something you can hold in your hand.", color: "#4ecdc4" },
        { depth: 2, label: "The Height", ayah: "4", arabic: "فِي أَحْسَنِ تَقْوِيمٍ", desc: "The claim the witnesses testify to. The human being occupies the highest station in creation. The root q-w-m carries meanings of standing, uprightness, correct proportion. A unique phrase — ahsan taqwim appears nowhere else in the Quran.", color: "#C9A84C" },
        { depth: 3, label: "The Fall", ayah: "5–6", arabic: "ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ", desc: "The descent — and its exception. The fall is moral, not physical: the exception (illa — those who believe and act) makes no sense as an exception to aging. The fall is a choice, not a design flaw. Faith and righteous action are the means by which a human being remains human in the fullest sense.", color: "#e07a8a" },
        { depth: 4, label: "The Question", ayah: "7–8", arabic: "فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ", desc: "The closing argument. A sudden shift to second person. What makes you deny the judgment? A being made for the lowest would have nothing to fear from assessment. A being made for the highest has everything to fear — and everything to hope for.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah that presents evidence and delivers a verdict — everything absent is a choice",
      absences: [
        { item: "No prophets named", note: "The oaths invoke the lands where prophets walked — the Levant, Sinai, Makkah — but no prophet is mentioned by name. The testimony is about places, not persons. The argument is geographic, not biographical." },
        { item: "No commands", note: "Not a single imperative verb in the entire surah. No 'say,' no 'worship,' no 'remember.' At-Tin does not instruct. It presents evidence, delivers a verdict, and asks a question. The correction is implicit in the diagnosis." },
        { item: "No narrative or parable", note: "No destroyed nations, no scenes of hellfire or paradise. Where other Makki surahs build through stories, At-Tin builds through a single observation about human nature and dares the listener to refute it." },
        { item: "No answer to the closing question", note: "The surah ends on fama yukadhdhibuka — what makes you deny? It does not answer. The silence after the question is the point. No answer is available." },
        { item: "No detail on the exception", note: "Faith and righteous action are named but not described. The surah does not list the actions or define the faith. It simply names the door and leaves it open." },
      ],
    },
  },

  contentNodes: [
    { concept: "Ahsan taqwim — the unique phrase for human dignity", type: "surah-specific", articleSlug: "ahsan-taqwim-human-dignity-95-4" },
    { concept: "The illa exception — grammar as escape clause", type: "surah-specific", articleSlug: "illa-exception-grammar-95-6" },
    { concept: "Tin-Inshirah pair — from the personal to the universal", type: "cross-surah", articleSlug: "tin-inshirah-personal-universal-94-95" },
    { concept: "Ahkam al-hakimin — judgment as wisdom not punishment", type: "cross-surah", articleSlug: "ahkam-hakimin-judgment-wisdom" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "courtroom", label: "Courtroom" },
  { id: "mirror", label: "Mirror" },
  { id: "argument", label: "Argument" },
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
          {playing ? "\u23F8" : "\u25B6"}
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
            <span className="text-sm text-cream-muted/50">{"\uFD3E"}{v.ayah}{"\uFD3F"}</span>
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">{"\u2726"} Structural pivot</div>}
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
          {"\u2726"} {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span>
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
        Witnesses → height → fall → unanswerable question
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
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div>
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

        {/* -- Hero --------------------------------------------------------- */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} {"\u00B7"} {d.period}
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

        {/* -- Tab bar ------------------------------------------------------ */}
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

        {/* -- Tab content -------------------------------------------------- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "courtroom" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "argument" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
        </div>

        {/* -- Go Deeper --------------------------------------------------- */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} {"\u00B7"} The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
