"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AS-SAFFAT — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/as-saffat
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "As-Saffat",
  arabicName: "الصَّافَّات",
  meaning: "Those Ranged in Rows",
  number: 37,
  ayahCount: 182,
  period: "Makki",
  juz: 23,
  movements: 4,
  thesis:
    "A surah that lines up the entire universe — angels, prophets, stars, the damned, the saved — and asks you where you stand. A cosmic parade where everything moves in formation and the only question is whether you will hold your rank.",
  reflectionUrl: "/surahs/as-saffat",
  readTime: "28 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"qasam","english":"Oaths"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ",
    ayahRef: "37:102",
    translation: "O my father, do what you are commanded. You will find me, God willing, among the patient.",
    why: "A son, standing at the edge of the most unthinkable command, volunteers for the row. He places himself in the same rank as the prophets the surah has been honoring — mina as-sabireen, among the steadfast. This single response is what the entire architecture of ranks and rows has been building toward.",
  },

  audio: { surahNumber: 37, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَالصَّافَّاتِ صَفًّا", translation: "By those ranged in rows —" },
    { ayah: 2, arabic: "فَالزَّاجِرَاتِ زَجْرًا", translation: "then those who drive with reproof —" },
    { ayah: 3, arabic: "فَالتَّالِيَاتِ ذِكْرًا", translation: "then those who recite the reminder —" },
    { ayah: 4, arabic: "إِنَّ إِلَٰهَكُمْ لَوَاحِدٌ", translation: "indeed, your God is One." },
    { ayah: 25, arabic: "مَا لَكُمْ لَا تَنَاصَرُونَ", translation: "What is wrong with you that you do not help one another?" },
    { ayah: 35, arabic: "إِنَّهُمْ كَانُوا إِذَا قِيلَ لَهُمْ لَا إِلَٰهَ إِلَّا اللَّهُ يَسْتَكْبِرُونَ", translation: "When it was said to them, 'There is no god but Allah,' they were arrogant." },
    { ayah: 37, arabic: "بَلْ جَاءَ بِالْحَقِّ وَصَدَّقَ الْمُرْسَلِينَ", translation: "Rather, he came with the truth and confirmed the messengers." },
    { ayah: 79, arabic: "سَلَامٌ عَلَىٰ نُوحٍ فِي الْعَالَمِينَ", translation: "Peace be upon Nuh among all peoples." },
    { ayah: 84, arabic: "إِذْ جَاءَ رَبَّهُ بِقَلْبٍ سَلِيمٍ", translation: "When he came to his Lord with a sound heart." },
    { ayah: 102, arabic: "يَا بُنَيَّ إِنِّي أَرَىٰ فِي الْمَنَامِ أَنِّي أَذْبَحُكَ فَانظُرْ مَاذَا تَرَىٰ ۚ قَالَ يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ", translation: "'O my son, I have seen in a dream that I am slaughtering you, so look — what do you see?' He said, 'O my father, do what you are commanded.'" },
    { ayah: 103, arabic: "فَلَمَّا أَسْلَمَا وَتَلَّهُ لِلْجَبِينِ", translation: "And when they had both submitted and he had laid him down on his forehead —" },
    { ayah: 109, arabic: "سَلَامٌ عَلَىٰ إِبْرَاهِيمَ", translation: "Peace be upon Ibrahim." },
    { ayah: 165, arabic: "وَإِنَّا لَنَحْنُ الصَّافُّونَ", translation: "And indeed, we are those who stand in rows." },
    { ayah: 166, arabic: "وَإِنَّا لَنَحْنُ الْمُسَبِّحُونَ", translation: "And indeed, we are those who glorify." },
    { ayah: 180, arabic: "سُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُونَ", translation: "Glorified is your Lord, the Lord of Might, above what they describe." },
    { ayah: 181, arabic: "وَسَلَامٌ عَلَى الْمُرْسَلِينَ", translation: "And peace be upon the messengers." },
    { ayah: 182, arabic: "وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "And praise be to Allah, Lord of all the worlds." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The March",
      subtitle: "Four movements: cosmic order → reckoning → honor roll → doxology",
      sections: [
        { ayahs: "1–21", title: "The Cosmic Oath", color: "#4ecdc4", desc: "Three oaths sworn by angels in their functions — those ranged in rows, those who drive with reproof, those who recite the reminder. The oaths resolve into a single declaration: your God is One. The heaven is fortified. Stars serve as both ornament and ordnance against eavesdropping devils." },
        { ayahs: "22–74", title: "The Reckoning Dialogues", color: "#e07a8a", desc: "The damned are gathered and marched. Followers turn on leaders: 'You used to come to us from the right.' Leaders fire back: 'You yourselves were not believers.' Blame ricochets. The tree of Zaqqum. One paradise-dweller looks down and recognizes a former companion in the fire. The exception: 'except the devoted servants of Allah.'" },
        { ayahs: "75–148", title: "The Prophetic Honor Roll", color: "#C9A84C", isPivot: true, desc: "Each prophet steps forward: Nuh, Ibrahim, Musa, Harun, Ilyas, Lut, Yunus. Each receives salaamun 'alaa — peace be upon. Each is ranked among the muhsineen. At the center: Ibrahim and Ismail at the sacrifice — the moment that makes the whole procession meaningful. They both submitted. Aslamaa." },
        { ayahs: "149–182", title: "The Closing Doxology", color: "#9b7fd4", desc: "The Qurayshi theology of divine daughters is dismantled. The angels identify themselves: 'We are those who stand in rows. We are those who glorify.' The closing three ayahs seal everything: Transcendence. Salaam. Praise. The march is complete." },
      ],
    },
    chiasticRing: {
      title: "The Formation",
      subtitle: "The opening oath and closing doxology form a precise pairing — the army viewed from afar, then heard speaking",
      pairs: [
        {
          left: { label: "The Cosmic Oath", ayahs: "1–21", desc: "Angels in rows. Tawhid declared. Heavens fortified. Stars as projectiles. An unnamed army viewed from a distance." },
          right: { label: "The Doxology", ayahs: "149–182", desc: "Angels name themselves: 'We are those who stand in rows.' Tawhid reaffirmed. Subhana rabbika. Salaam upon all messengers. The army speaks." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Reckoning Dialogues", ayahs: "22–74", desc: "The damned argue, blame, and discover that their alliances were illusions. Speech as accusation. Every bond dissolves." },
          right: { label: "The Prophetic Honor Roll", ayahs: "75–148", desc: "The prophets are greeted one by one. Speech as blessing. Salaamun 'alaa — peace be upon. Each bond confirmed." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Sacrifice", ayahs: "102–103",
        desc: "Ibrahim and Ismail — fa-lammaa aslamaa — and when they had both submitted. The act that makes the whole procession meaningful.",
        note: "Standing in rank means nothing unless you are willing to sacrifice what you love most while standing there. This is what the angels in the opening only symbolize: complete submission expressed as complete stillness.",
      },
    },
    deductiveFunnel: {
      title: "The Rank",
      subtitle: "From cosmic display to the cost of holding formation",
      layers: [
        { depth: 1, label: "The Oath", ayah: "1–4", arabic: "وَالصَّافَّاتِ صَفًّا", desc: "Angels standing in rows, driving with reproof, reciting the reminder. Their very existence, their ranked obedience, is the evidence for the Oneness they serve. The surah does not argue for tawhid philosophically. It displays the cosmic order that tawhid produces.", color: "#4ecdc4" },
        { depth: 2, label: "The Blame", ayah: "25–37", arabic: "مَا لَكُمْ لَا تَنَاصَرُونَ", desc: "The damned are asked: 'Why don't you help one another?' The people who formed alliances against the truth now stand exposed. Followers blame leaders. Leaders blame followers. The arrogance that refused la ilaha illa Allah is named as the root cause.", color: "#e07a8a" },
        { depth: 3, label: "The Salaam", ayah: "79–109", arabic: "سَلَامٌ عَلَىٰ نُوحٍ", desc: "Each prophet is called forward, greeted with peace, ranked among the muhsineen, and claimed as a believing servant. The refrain is the surah's heartbeat: honor, rank, consequence. The rhythm is processional, almost liturgical.", color: "#C9A84C" },
        { depth: 4, label: "The Submission", ayah: "102–103", arabic: "فَلَمَّا أَسْلَمَا", desc: "Two human beings standing in perfect alignment with a command that exceeds all instinct. The verb aslamaa shares the root of Islam itself. The surah's architecture of ranks and rows leads to this moment: what it looks like to hold formation when the cost is absolute.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah of procession, not legislation — what it leaves out defines what it is",
      absences: [
        { item: "No direct ethical commands", note: "In 182 ayahs, no instruction to pray, give charity, fast, or observe any specific obligation. The surah is not legislating. It is displaying — showing the cosmic order, the consequences of alignment and rebellion, the prophets who stood where they were supposed to stand." },
        { item: "No extended prophetic narratives", note: "The stories are compressed to essentials, stripped of detail, presented as entries in a roster. Even Ibrahim's sacrifice — the surah's emotional center — is told in fewer than ten ayahs. The surah is not interested in narrative arc. It is interested in the verdict." },
        { item: "No salaam for Yunus", note: "Every prophet receives salaamun 'alaa except Yunus. His story is one of rescue from error — he left his post. God restored him, but the honor-roll refrain, reserved for those who held rank, does not fall on his name. The absence within the procession is the judgment." },
        { item: "No philosophical argument for tawhid", note: "The surah does not argue for God's oneness intellectually. It displays the cosmic order that oneness produces — angels in formation, heavens fortified, stars deployed — and lets the display serve as the proof. The order is the argument." },
        { item: "No comfort passage", note: "No 'fear not,' no direct consolation to the believers. Instead, the surah shows them the parade they belong to — the prophets honored, the angels ranked, their place in the line confirmed by the closing salaam upon all messengers. The honor is the comfort." },
      ],
    },
  },

  contentNodes: [
    { concept: "Aslamaa — the verb that shares the root of Islam", type: "surah-specific", articleSlug: "aslamaa-submission-37-103" },
    { concept: "The seven salaams — the processional refrain", type: "surah-specific", articleSlug: "seven-salaams-honor-roll-37" },
    { concept: "As-Saffat and Sad diptych — medal ceremony and battlefield", type: "cross-surah", articleSlug: "saffat-sad-diptych" },
    { concept: "The sacrifice — Al-Hajj 22:37 and As-Saffat 37:107", type: "cross-surah", articleSlug: "sacrifice-hajj-saffat" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "march", label: "March" },
  { id: "formation", label: "Formation" },
  { id: "rank", label: "Rank" },
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
        Oath → blame → salaam → submission
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
          {activeTab === "march" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "formation" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "rank" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
