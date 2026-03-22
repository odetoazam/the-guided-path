"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AZ-ZALZALAH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/az-zalzala
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Az-Zalzalah",
  arabicName: "الزَّلْزَلَة",
  meaning: "The Earthquake",
  number: 99,
  ayahCount: 8,
  period: "Madani",
  juz: 30,
  movements: 2,
  thesis:
    "Eight ayahs that turn the ground beneath your feet into a witness and the atom into a courtroom — a surah where the most familiar surface in human life reports everything it has seen, and the smallest unit of moral weight becomes the measure of eternity.",
  reflectionUrl: "/surahs/az-zalzala",
  readTime: "14 min read",

  heartVerse: {
    arabic: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا",
    ayahRef: "99:4",
    translation: "On that Day, it will report its news.",
    why: "The moment the earth speaks. The root h-d-th — the same root that gives us hadith — places the ground in the role of a muhaddith: a narrator transmitting what it has witnessed. The earth has been in silent communication with God, and now it has been given permission to testify. Everything before this ayah builds to it. Everything after flows from it.",
  },

  audio: { surahNumber: 99, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", translation: "When the earth is shaken with its ultimate shaking," },
    { ayah: 2, arabic: "وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا", translation: "and the earth brings forth its burdens," },
    { ayah: 3, arabic: "وَقَالَ الْإِنسَانُ مَا لَهَا", translation: "and the human being says, 'What is wrong with it?' —" },
    { ayah: 4, arabic: "يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا", translation: "On that Day, it will report its news," },
    { ayah: 5, arabic: "بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا", translation: "because your Lord has inspired it [to do so]." },
    { ayah: 6, arabic: "يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِّيُرَوْا أَعْمَالَهُمْ", translation: "On that Day, people will come forth in scattered groups to be shown their deeds." },
    { ayah: 7, arabic: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", translation: "Then whoever has done an atom's weight of good will see it." },
    { ayah: 8, arabic: "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ", translation: "And whoever has done an atom's weight of evil will see it." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Ledger",
      subtitle: "Two movements: cosmic testimony → cosmic accounting",
      sections: [
        { ayahs: "1–3", title: "The Shaking", color: "#4ecdc4", desc: "The earth convulses with its ultimate, appointed earthquake — zilzalaha, the one it has been holding back. It empties its burdens: the dead, the secrets, everything absorbed into the soil across all of human history. The human being, bewildered, asks: what is wrong with it? He does not yet understand that the earth is not malfunctioning. It is fulfilling its purpose." },
        { ayahs: "4–5", title: "The Testimony", color: "#C9A84C", isPivot: true, desc: "The earth speaks — tuhaddithu akhbaraha — narrates its reports with the same root used for prophetic hadith. Every footstep, every prostration, every act of cruelty committed on its surface. The mechanism: God sent it wahy, the same word used for revelation to prophets. The ground has been in divine communication." },
        { ayahs: "6–8", title: "The Reckoning", color: "#9b7fd4", desc: "People emerge scattered — ashtatan — each facing their record alone. Then the famous couplet: whoever has done an atom's weight of good will see it, and whoever has done an atom's weight of evil will see it. The surah does not say punished or rewarded. It says you will see. Seeing is sufficient." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's architecture bends from the largest scale to the smallest, mirrored around the earth's testimony",
      pairs: [
        {
          left: { label: "Cosmic Upheaval", ayahs: "1", desc: "The earth shakes — al-ard as subject of its final, appointed convulsion" },
          right: { label: "Moral Atoms", ayahs: "7–8", desc: "An atom's weight of good or evil — the smallest unit becomes the measure" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Earth Reveals", ayahs: "2", desc: "The earth brings forth its burdens — athqalaha — what was hidden inside" },
          right: { label: "Deeds Revealed", ayahs: "7", desc: "Good is brought forth and made visible — the hidden becomes seen" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Human Confusion", ayahs: "3", desc: "The human asks 'What is wrong with it?' — bewilderment, ignorance of what is unfolding" },
          right: { label: "Human Exposure", ayahs: "6", desc: "People come forth scattered — ashtatan — awareness replaces confusion" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Earth Speaks", ayahs: "4–5",
        desc: "On that Day it will report its news — because your Lord has inspired it.",
        note: "The structural thesis: the ground receives wahy and becomes a muhaddith. The entire architecture bends toward this moment.",
      },
    },
    deductiveFunnel: {
      title: "The Descent of Scale",
      subtitle: "From the entire planet to a single atom — the surah's structural argument in miniature",
      layers: [
        { depth: 1, label: "Planet", ayah: "1", arabic: "زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", desc: "The largest possible scale: the entire earth in its final, appointed convulsion. Zilzal — an intensive form, onomatopoeic — the sound of the word mimics the tremor it describes.", color: "#4ecdc4" },
        { depth: 2, label: "Contents", ayah: "2", arabic: "أَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا", desc: "The earth empties itself. Athqal — heaviness, burdens. The dead of all human history, the secrets absorbed into the soil, the treasures and the deeds. Everything carried. Now expelled.", color: "#9b7fd4" },
        { depth: 3, label: "Testimony", ayah: "4", arabic: "تُحَدِّثُ أَخْبَارَهَا", desc: "The earth narrates — tuhaddithu — with the same root as hadith. The ground becomes a muhaddith: a reporter of events. Not merely shaking off contents, but testifying.", color: "#C9A84C" },
        { depth: 4, label: "Atom", ayah: "7–8", arabic: "مِثْقَالَ ذَرَّةٍ", desc: "The smallest visible particle — a mote of dust in sunlight. The earthquake that ends the world exists for the purpose of weighing this. The glance. The coin almost given. The word said under your breath.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence is a design choice — the surah argues that seeing the record is enough",
      absences: [
        { item: "No command or prohibition", note: "Not a single imperative verb in all eight ayahs. The surah does not tell you what to do. It tells you what will be shown. The absence of instruction is the argument: when the full record is displayed, no command will be necessary." },
        { item: "No mention of Allah by name", note: "God appears only as rabbaka — 'your Lord' — at the moment of authorizing testimony. He is the unseen commander behind the visible witness. His role in this surah is the judge who tells the witness: now speak." },
        { item: "No description of punishment or reward", note: "The surah says you will see — yarahu — not that you will be punished or rewarded. The seeing is treated as sufficient. The verdict is self-evident once the record is clear." },
        { item: "No address to the Prophet", note: "No 'O Messenger,' no consolation, no instruction. The surah speaks directly to the listener through the scene itself. The only 'you' is rabbaka — your Lord — embedded in the mechanism of testimony." },
        { item: "No gathering — only scattering", note: "People emerge ashtatan — scattered, dispersed. Each person faces their record alone. The surah's vision of the Day is not communal assembly but radical individual exposure." },
      ],
    },
  },

  contentNodes: [
    { concept: "The earth as muhaddith — hadith roots in testimony", type: "surah-specific", articleSlug: "earth-muhaddith-99-4" },
    { concept: "Mithqal dharra — the atom's weight as divine unit", type: "surah-specific", articleSlug: "atom-weight-99-7-8" },
    { concept: "Az-Zalzalah–Al-Adiyat–Al-Qari'ah cluster", type: "cross-surah", articleSlug: "zalzalah-adiyat-qariah-cluster" },
    { concept: "Wahy to non-prophets — earth receives revelation", type: "cross-surah", articleSlug: "wahy-earth-fussilat-connection" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "ledger", label: "Ledger" },
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
        Planet → contents → testimony → atom
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
          {activeTab === "ledger" && <SectionJourney data={d.diagrams.sectionJourney} />}
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
