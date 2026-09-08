"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH ASH-SHURA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ash-shura
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ash-Shura",
  arabicName: "الشُّورَىٰ",
  meaning: "The Consultation",
  number: 42,
  ayahCount: 53,
  period: "Makki",
  juz: "25",
  movements: 4,
  thesis:
    "A fifty-three-ayah constitutional vision that plants the principles of a just civilization — consultation, calibrated justice, forgiveness — in the hearts of a persecuted minority, insisting that the architecture of community is built in character before it is built in institutions.",
  reflectionUrl: "/surahs/ash-shura",
  readTime: "20 min read",

  sciencesActive: [{"key":"aqeedah","english":"Theology"},{"key":"nazm","english":"Structural Coherence"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "وَالَّذِينَ اسْتَجَابُوا لِرَبِّهِمْ وَأَقَامُوا الصَّلَاةَ وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
    ayahRef: "42:38",
    translation: "Those who respond to their Lord, establish prayer, conduct their affairs by mutual consultation, and spend from what We have provided them.",
    why: "The constitutional center of the surah. Shura is placed between prayer and charitable spending — sandwiched between the two most foundational acts of worship in Islam. Consultation is presented as an act of devotion, not merely of governance. The nominal sentence structure (amruhum shura baynahum) states it as an identity rather than a command: their affairs are consultation.",
  },

  audio: { surahNumber: 42, reciter: "ar.alafasy" },


  diagrams: {
    sectionJourney: {
      title: "The Constitutional Plan",
      subtitle: "Four movements: sovereignty \u2192 division \u2192 community \u2192 revelation",
      sections: [
        { ayahs: "1\u20139", title: "The Divine Claim", color: "#4ecdc4", desc: "The surah opens with its unique double disconnected letters \u2014 Ha Mim, then Ayn Sin Qaf \u2014 and immediately declares: thus does He reveal to you. To Allah belongs everything in the heavens and the earth. The heavens nearly rupture from above while angels seek forgiveness for those on earth. Allah could have made humanity one community. He chose otherwise." },
        { ayahs: "10\u201220", title: "The Problem of Division", color: "#9b7fd4", desc: "Whatever you disagree about, its judgment rests with Allah. The surah diagnoses why people who share the same truth divide: not ignorance but baghyan \u2014 jealous rivalry, ego dressed as conviction. Five prophets received one religion and were told not to fragment. The word tatafarraqu carries the image of something whole being pulled apart." },
        { ayahs: "21\u201243", title: "The Portrait of Community", color: "#C9A84C", isPivot: true, desc: "The surah's longest section and its constitutional center. The believers avoid major sins, forgive when angry, establish prayer, conduct affairs by mutual consultation, spend from provision, and defend against oppression. Forgiveness is elevated. Self-defense is permitted. Aggression is condemned. The three lines are drawn with the precision of constitutional drafting." },
        { ayahs: "44\u201253", title: "The Mechanics of Revelation", color: "#e07a8a", desc: "The Prophet is not a guardian \u2014 only a deliverer. Then comes the Quran\u2019s most systematic statement about how Allah communicates: by revelation, from behind a veil, or through a messenger-angel. Three modes, no exceptions. The surah closes with the Quran as ruh (spirit) and light, and the final phrase returns to the opening claim: all things belong to Allah." },
      ],
    },
    chiasticRing: {
      title: "The Frame",
      subtitle: "The surah opens and closes with the same truth, understood more deeply by the end",
      pairs: [
        {
          left: { label: "Revelation Descends", ayahs: "1\u20139", desc: "Thus does He reveal to you. Everything in the heavens and earth belongs to Allah. A declaration of divine authority over creation and communication." },
          right: { label: "Revelation as Spirit", ayahs: "44\u201253", desc: "Thus We have revealed to you a ruh of Our command. Three modes of divine communication. The Quran as light, the Prophet as guide to the path of Allah." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Division Diagnosed", ayahs: "10\u201214", desc: "They did not divide except after knowledge came, out of baghyan. Five prophets, one religion, one instruction: hold together." },
          right: { label: "Conflict Calibrated", ayahs: "40\u201243", desc: "Equal retaliation, but forgiveness is higher. Self-defense is blameless. Aggression is condemned. Patience and pardon are of the matters of determination." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Shura Verse", ayahs: "36\u201239",
        desc: "Their affairs are conducted by consultation among them \u2014 placed between prayer and spending, as an identity rather than a command.",
        note: "Everything before builds toward this portrait. Everything after works outward from it. Consultation is the architectural pivot around which the entire surah is organized \u2014 the human-scale reflection of divine revelation.",
      },
    },
    deductiveFunnel: {
      title: "The Two Channels",
      subtitle: "Divine communication flows down; human consultation flows laterally. The surah maps both.",
      layers: [
        { depth: 1, label: "Wahy (Revelation)", ayah: "3", arabic: "كَذَٰلِكَ يُوحِي إِلَيْكَ", desc: "The surah's first substantive word after the mysterious letters is about communication. The verb yuhi (He reveals) appears before Allah's name, placing the act of revelation at the very front. The word wahy and its derivatives appear approximately seven times across the surah, saturating the text.", color: "#4ecdc4" },
        { depth: 2, label: "One Religion", ayah: "13", arabic: "شَرَعَ لَكُم مِّنَ الدِّينِ مَا وَصَّىٰ بِهِ نُوحًا", desc: "Five prophets \u2014 Nuh, Ibrahim, Musa, Isa, Muhammad \u2014 all given the same instruction: establish the religion and do not divide. The content of revelation is one. Division was always the human addition.", color: "#9b7fd4" },
        { depth: 3, label: "Shura (Consultation)", ayah: "38", arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ", desc: "The word shura appears only once, at the center. Divine communication is pervasive; human consultation is singular but pivotal. Shura among believers is the earthly echo of wahy from Allah. One flows down; the other flows laterally. Both are forms of guided communication.", color: "#C9A84C" },
        { depth: 4, label: "Three Modes", ayah: "51", arabic: "وَمَا كَانَ لِبَشَرٍ أَن يُكَلِّمَهُ اللَّهُ إِلَّا وَحْيًا", desc: "The Quran's most systematic statement about how Allah communicates with human beings: by revelation, from behind a veil, or through a messenger-angel. Every prophetic encounter in the entire Quran falls under one of these three categories. The surah that began with the fact of revelation arrives at its mechanics.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah legislates where its neighbors narrate \u2014 and its silences are deliberate",
      absences: [
        { item: "No prophetic narrative", note: "In a Makkan surah of this length, you would expect at least one extended story \u2014 Musa at the sea, Ibrahim and the fire. Ash-Shura contains none. It mentions prophets only in passing (ayah 13) as recipients of the same religion. The surah is not interested in what happened. It is interested in the principles that govern all communities." },
        { item: "No detailed eschatology", note: "References to the Day of Judgment exist (ayahs 7, 45, 47), but no scenes of resurrection, no weighing of deeds, no depictions of paradise or hellfire in any detail. For a Makkan surah, this is striking. The warning is present but abstract \u2014 the surah trusts its audience to already know what is at stake." },
        { item: "No single hero or villain", note: "Where Ghafir has the believing man from Pharaoh's court and Fussilat has Utbah's encounter, Ash-Shura has no individual character. It thinks in principles rather than persons \u2014 a constitutional document rather than a dramatic narrative." },
        { item: "No political vocabulary", note: "Despite being the Quran's foundational text for governance theory, the surah contains no words for state, ruler, law, or authority in the political sense. Shura is placed between prayer and spending, not between taxation and military strategy. The surah insists that governance is a spiritual practice before it is a political mechanism." },
        { item: "No claim that agreement is required", note: "The surah's prescription is not that everyone must agree. It is that the process of disagreement must be governed by consultation and that forgiveness must be the default. Unity is the natural state; division is the deviation caused by ego, not by the complexity of the truth." },
      ],
    },
  },

  contentNodes: [
    { concept: "The shura verse \u2014 consultation as devotion, not governance", type: "surah-specific", articleSlug: "shura-verse-42-38" },
    { concept: "Three modes of divine communication (42:51)", type: "surah-specific", articleSlug: "three-modes-wahy-42-51" },
    { concept: "Ha Mim family \u2014 revelation and resistance across surahs 40\u201346", type: "cross-surah", articleSlug: "ha-mim-family-40-46" },
    { concept: "Baghyan \u2014 ego dressed as conviction, the engine of division", type: "cross-surah", articleSlug: "baghyan-division-42-14" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "plan", label: "Plan" },
  { id: "frame", label: "Frame" },
  { id: "channels", label: "Channels" },
  { id: "absent", label: "Absences" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider (matches surah pages)
// ══════════════════════════════════════════════════════════════════════════════

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">&#x06DE;</span>
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">&#x2726; Structural pivot</div>}
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
          &#x2726; {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span>
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
        Revelation &#x2192; one religion &#x2192; consultation &#x2192; three modes
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
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">&#x2205; {a.item}</div>
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
            Surah {d.number} &middot; {d.period} &middot; Juz {d.juz}
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

        {/* -- Tab bar ------------------------------------------------------- */}
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
          {activeTab === "plan" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "frame" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "channels" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          <div className="space-y-6 pt-6 border-t border-white/[0.06]"><HeartVerse verse={d.heartVerse} /></div>
        </div>

        {/* -- Go Deeper ---------------------------------------------------- */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} &middot; The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
