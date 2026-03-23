"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH YA-SIN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ya-sin
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ya-Sin",
  arabicName: "يس",
  meaning: "Ya-Sin",
  number: 36,
  ayahCount: 83,
  period: "Makki",
  juz: "22–23",
  movements: 5,
  thesis:
    "The surah the Prophet called the heart of the Quran — building from a murdered believer's Paradise to the orbits of moons to the dust of bones, and landing on a single syllable of divine power that renders every objection irrelevant.",
  reflectionUrl: "/surahs/ya-sin",
  readTime: "25 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ",
    ayahRef: "36:82",
    translation: "His command, when He wills a thing, is only to say to it: Be — and it is.",
    why: "The verse the entire surah funnels toward. Every parable, every cosmic sign, every argument about resurrection converges on this single sentence. The God whose speech warns you is the God whose speech creates worlds.",
  },

  audio: { surahNumber: 36, reciter: "ar.alafasy" },

  // ── Section-map approach for medium surahs ──────────────────────────────
  sectionMap: [
    { ayahs: "1–6", label: "The Oath & the Mission", arabic: "يس ۝ وَالْقُرْآنِ الْحَكِيمِ", summary: "The disconnected letters, an oath on the wise Quran, and the declaration that Muhammad is among the messengers — sent to warn a heedless people." },
    { ayahs: "7–12", label: "The Sealed & the Recorded", arabic: "لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ", summary: "Most have earned the word against them. Shackles on necks, barriers before and behind — they cannot see. Yet everything is recorded in a clear register." },
    { ayahs: "13–27", label: "The Parable of the Town", arabic: "وَجَاءَ مِنْ أَقْصَا الْمَدِينَةِ رَجُلٌ يَسْعَىٰ", summary: "Two, then three messengers sent to a town that rejects them all. A man runs from the farthest end of the city to plead with his people — and is killed. He enters Paradise and grieves for his killers." },
    { ayahs: "28–32", label: "The Single Blast", arabic: "إِن كَانَتْ إِلَّا صَيْحَةً وَاحِدَةً", summary: "No army, no flood — a single cry extinguishes the town. Then the cosmic grief: 'Oh, the regret upon the servants! No messenger comes to them except that they mock him.'" },
    { ayahs: "33–40", label: "Cosmic Signs", arabic: "وَآيَةٌ لَّهُمُ الْأَرْضُ الْمَيْتَةُ", summary: "Dead earth brought to life, night peeled from day, the sun running to its station, the moon curving like an old date-stalk, each in its orbit — none transgressing its boundary." },
    { ayahs: "41–44", label: "The Ships", arabic: "وَآيَةٌ لَّهُمْ أَنَّا حَمَلْنَا ذُرِّيَّتَهُمْ", summary: "The laden ship echoing Nuh's ark. If Allah willed, He could drown them — no one to hear their cry, no rescuer — except as a mercy." },
    { ayahs: "45–50", label: "The Turning Away", arabic: "وَمَا تَأْتِيهِم مِّنْ آيَةٍ مِّنْ آيَاتِ رَبِّهِمْ", summary: "Every sign met with turning away. The heedlessness diagnosed at the opening has become a choice. They argue about spending, mock the promise — while the blast approaches." },
    { ayahs: "51–58", label: "The Trumpet & Paradise", arabic: "وَنُفِخَ فِي الصُّورِ", summary: "The trumpet, sudden and without warning. The dead slip from their graves. 'Who raised us from our resting place?' The people of Paradise in joyful occupation — and God Himself speaks the word salam." },
    { ayahs: "59–68", label: "The Fire & the Sealed Mouths", arabic: "وَامْتَازُوا الْيَوْمَ أَيُّهَا الْمُجْرِمُونَ", summary: "The criminals commanded to separate. Their mouths sealed — their hands speak, their feet testify. The body that turned from signs now turns against its owner." },
    { ayahs: "69–76", label: "Not a Poet", arabic: "وَمَا عَلَّمْنَاهُ الشِّعْرَ وَمَا يَنبَغِي لَهُ", summary: "Poetry is not fitting for this message — the same word (yanbaghi) used for the sun not overtaking the moon. Cattle, mounts, drink — evidence they ride on, eat from, and deny." },
    { ayahs: "77–83", label: "Kun Fa-Yakun", arabic: "أَوَلَيْسَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِقَادِرٍ", summary: "A man crumbles a bone and asks who can revive it. Five ayahs of escalating proof — first creation, fire from green wood, heavens and earth — then the syllable: Be. And glory to Him in whose hand is the dominion of all things." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Escalation",
      subtitle: "Five movements: oath → parable → cosmos → trumpet → the Word",
      sections: [
        { ayahs: "1–12", title: "The Oath & the Sealed", color: "#4ecdc4", desc: "An oath on the wise Quran, establishing Muhammad as a messenger on a straight path. A people in shackles they cannot see — barriers before and behind — heedless (ghafilun). The word that opens the surah's diagnosis." },
        { ayahs: "13–32", title: "The Parable of the Town", color: "#e07a8a", desc: "Three messengers rejected. A man runs from the margins of the city — unnamed, powerless, urgent. His people kill him. He enters Paradise and his first words are grief for his killers. Then one blast, and the town is silenced. Ya hasratan 'ala al-'ibad." },
        { ayahs: "33–44", title: "The Cosmic Testimony", color: "#9b7fd4", isPivot: true, desc: "Dead earth, living grain. Night peeled from day. Sun and moon in measured orbits — la al-shamsu yanbaghi laha an tudrika al-qamar. Ships on the sea. The pivot of the surah: the physical evidence that connects the parable's warning to the trumpet's reality." },
        { ayahs: "45–68", title: "The Trumpet & Judgment", color: "#C9A84C", desc: "Every sign met with turning away. Then — sudden — the trumpet. The dead slip from graves. Paradise: God speaks salam. Fire: mouths sealed, limbs testify. The heedlessness that was diagnosed is now judged." },
        { ayahs: "69–83", title: "The Final Proof", color: "#e07a8a", desc: "He is not a poet. The cattle you ride are evidence you deny. A bone crumbled in mockery is answered by five ayahs of escalating proof — and then the word: kun fa-yakun. The surah lands on a single syllable of omnipotence." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Ya-Sin's opening and closing form a deliberate correspondence",
      pairs: [
        {
          left: { label: "The Prophet Affirmed", ayahs: "1–6", desc: "An oath on the Quran to establish: you are a messenger on a straight path, sent to warn a heedless people" },
          right: { label: "The Prophet Vindicated", ayahs: "69–83", desc: "He is not a poet. The final proof of resurrection. Kun fa-yakun — the speech that warns and the speech that creates" },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Parable", ayahs: "7–32", desc: "Messengers rejected. The believing man killed. The town destroyed by a single blast" },
          right: { label: "The Judgment", ayahs: "45–68", desc: "Signs rejected. The trumpet sounds. Paradise and Fire — the messengers spoke the truth" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Cosmic Signs", ayahs: "33–44",
        desc: "Earth, night, sun, moon, ships — the physical evidence that connects warning to reality.",
        note: "The signs of creation are the pivot the entire surah turns on. They are the proof that makes the parable a warning and the trumpet a certainty.",
      },
    },
    deductiveFunnel: {
      title: "The Closing Proof",
      subtitle: "Five ayahs of escalating argument, each layer pressing harder — until the Word",
      layers: [
        { depth: 1, label: "First Creation", ayah: "79", arabic: "أَنشَأَهَا أَوَّلَ مَرَّةٍ", desc: "He who produced them the first time will give them life. The logic is irresistible — the first creation is harder than the second.", color: "#4ecdc4" },
        { depth: 2, label: "Fire from Green", ayah: "80", arabic: "مِنَ الشَّجَرِ الْأَخْضَرِ نَارًا", desc: "He made fire from the green tree. Life from what looks dead. Fire from what looks wet. The proof is in the tree you already use.", color: "#9b7fd4" },
        { depth: 3, label: "Heavens & Earth", ayah: "81", arabic: "خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ", desc: "Is not He who created the heavens and the earth able to create the likes of them? The question scales upward — from bones to trees to the cosmos.", color: "#e07a8a" },
        { depth: 4, label: "Bala", ayah: "81", arabic: "بَلَىٰ", desc: "Yes, indeed. One word. The shortest and most decisive answer in the Quran's vocabulary.", color: "#C9A84C" },
        { depth: 5, label: "Kun Fa-Yakun", ayah: "82", arabic: "كُن فَيَكُونُ", desc: "His command, when He wills a thing, is only to say to it: Be — and it is. The verse the entire surah funnels toward.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence is a design choice — what Ya-Sin leaves out shapes its argument",
      absences: [
        { item: "No named prophets", note: "Isa, Musa, Ibrahim, Nuh — all absent. The parable's messengers are anonymous. The warning becomes universal: this is every messenger and every town." },
        { item: "No historical destructions", note: "Ad, Thamud, the people of Lut — the destroyed civilizations that populate neighboring surahs are missing. One anonymous parable carries the weight of all of them." },
        { item: "No legal commands", note: "No rules about prayer, fasting, inheritance, or conduct. Ya-Sin is pure argument — evidence, warning, proof — with no legislation." },
        { item: "No du'a from the Prophet", note: "The Prophet does not speak in this surah. Allah addresses him, affirms him, defends him — but he does not respond within the text. The surah speaks for him." },
        { item: "No escape clause for the sealed", note: "Ayahs 7–10 describe people with shackles on their necks, barriers before and behind, a covering over their eyes. No remedy is offered within this passage. The sealing is described as complete." },
      ],
    },
  },

  contentNodes: [
    { concept: "The man from the farthest end of the city", type: "surah-specific", articleSlug: "believing-man-ya-sin-20-27" },
    { concept: "Kun fa-yakun — the creative word", type: "surah-specific", articleSlug: "kun-fa-yakun-36-82" },
    { concept: "Cosmic adab: the sun, the moon, and yanbaghi", type: "cross-surah", articleSlug: "cosmic-adab-yanbaghi-36-40" },
    { concept: "Ya hasratan 'ala al-'ibad — cosmic grief", type: "cross-surah", articleSlug: "ya-hasratan-ala-al-ibad-36-30" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "proof", label: "Proof" },
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

function SectionMapText({ sections }: { sections: typeof SURAH_DATA.sectionMap }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {sections.map((sec, i) => (
        <button
          key={i}
          onClick={() => setExpanded(expanded === i ? null : i)}
          className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
          style={{ backgroundColor: expanded === i ? "rgba(201,168,76,0.06)" : "transparent" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gold-500 font-sans">{sec.label}</span>
            <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
          </div>
          <p className="text-base text-cream-muted/50 text-right font-amiri leading-relaxed" style={{ direction: "rtl" }}>
            {sec.arabic}
          </p>
          {expanded === i && (
            <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{sec.summary}</p>
          )}
        </button>
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
        First creation → green tree → heavens & earth → bala → kun fa-yakun
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
            Surah {d.number} · {d.period} · Juz {d.juz}
          </p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">The Heart of the Quran</p>

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
          {activeTab === "proof" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMapText sections={d.sectionMap} />
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
