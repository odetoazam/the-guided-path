"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-INSHIQAQ — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-inshiqaq
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Inshiqaq",
  arabicName: "الانشِقاق",
  meaning: "The Splitting",
  number: 84,
  ayahCount: 25,
  period: "Makki",
  juz: 30,
  movements: 4,
  thesis:
    "A twenty-five-ayah surah that holds up the sky's obedience as a mirror to the human being's resistance — then swears by the twilight, the enfolding night, and the full moon that you are already in transit between stages you did not choose, laboring toward a meeting you cannot postpone.",
  reflectionUrl: "/surahs/al-inshiqaq",
  readTime: "18 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"}],
  heartVerse: {
    arabic: "يَا أَيُّهَا الْإِنسَانُ إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا فَمُلَاقِيهِ",
    ayahRef: "84:6",
    translation: "O human being, you are laboring toward your Lord with great effort — and you will meet Him.",
    why: "The surah's most direct address. The word kadih — to toil with strain — describes every human life. The meeting is not optional. The labor is not wasted. Everything before this verse is cosmic obedience; everything after is what that meeting looks like for two different kinds of people.",
  },

  audio: { surahNumber: 84, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "إِذَا السَّمَاءُ انشَقَّتْ", translation: "When the sky has split open —" },
    { ayah: 2, arabic: "وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ", translation: "and listened to its Lord, as it must —" },
    { ayah: 3, arabic: "وَإِذَا الْأَرْضُ مُدَّتْ", translation: "and when the earth has been extended —" },
    { ayah: 4, arabic: "وَأَلْقَتْ مَا فِيهَا وَتَخَلَّتْ", translation: "and has cast out what is within it and become empty —" },
    { ayah: 5, arabic: "وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ", translation: "and listened to its Lord, as it must —" },
    { ayah: 6, arabic: "يَا أَيُّهَا الْإِنسَانُ إِنَّكَ كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا فَمُلَاقِيهِ", translation: "O human being, you are laboring toward your Lord with great effort — and you will meet Him." },
    { ayah: 7, arabic: "فَأَمَّا مَنْ أُوتِيَ كِتَابَهُ بِيَمِينِهِ", translation: "As for the one given his record in his right hand —" },
    { ayah: 8, arabic: "فَسَوْفَ يُحَاسَبُ حِسَابًا يَسِيرًا", translation: "he will be judged with an easy accounting —" },
    { ayah: 9, arabic: "وَيَنقَلِبُ إِلَىٰ أَهْلِهِ مَسْرُورًا", translation: "and return to his family in happiness." },
    { ayah: 10, arabic: "وَأَمَّا مَنْ أُوتِيَ كِتَابَهُ وَرَاءَ ظَهْرِهِ", translation: "But as for the one given his record behind his back —" },
    { ayah: 11, arabic: "فَسَوْفَ يَدْعُو ثُبُورًا", translation: "he will cry out for destruction —" },
    { ayah: 12, arabic: "وَيَصْلَىٰ سَعِيرًا", translation: "and will burn in a blaze." },
    { ayah: 13, arabic: "إِنَّهُ كَانَ فِي أَهْلِهِ مَسْرُورًا", translation: "He used to be among his people in happiness —" },
    { ayah: 14, arabic: "إِنَّهُ ظَنَّ أَن لَّن يَحُورَ", translation: "he thought he would never return." },
    { ayah: 15, arabic: "بَلَىٰ إِنَّ رَبَّهُ كَانَ بِهِ بَصِيرًا", translation: "But yes — his Lord was watching him." },
    { ayah: 16, arabic: "فَلَا أُقْسِمُ بِالشَّفَقِ", translation: "I swear by the twilight —" },
    { ayah: 17, arabic: "وَاللَّيْلِ وَمَا وَسَقَ", translation: "and by the night and what it gathers —" },
    { ayah: 18, arabic: "وَالْقَمَرِ إِذَا اتَّسَقَ", translation: "and by the moon when it becomes full —" },
    { ayah: 19, arabic: "لَتَرْكَبُنَّ طَبَقًا عَن طَبَقٍ", translation: "you will surely travel from stage to stage." },
    { ayah: 20, arabic: "فَمَا لَهُمْ لَا يُؤْمِنُونَ", translation: "So what is the matter with them that they do not believe?" },
    { ayah: 21, arabic: "وَإِذَا قُرِئَ عَلَيْهِمُ الْقُرْآنُ لَا يَسْجُدُونَ", translation: "And when the Quran is recited to them, they do not prostrate?" },
    { ayah: 22, arabic: "بَلِ الَّذِينَ كَفَرُوا يُكَذِّبُونَ", translation: "Rather, those who disbelieve deny." },
    { ayah: 23, arabic: "وَاللَّهُ أَعْلَمُ بِمَا يُوعُونَ", translation: "And Allah knows best what they contain." },
    { ayah: 24, arabic: "فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ", translation: "So give them tidings of a painful punishment —" },
    { ayah: 25, arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ", translation: "except those who believe and do righteous deeds — for them is a reward uninterrupted." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Four Registers",
      subtitle: "Cosmic awe → personal reckoning → contemplative wonder → moral urgency",
      sections: [
        { ayahs: "1–5", title: "The Cosmic Prelude", color: "#4ecdc4", desc: "The sky splits itself open — the reflexive verb means the action comes from within, not from an external force. Then the refrain that governs the entire surah: wa-adhinat li-rabbiha wa-huqqat — it listened to its Lord, as it must. Sky and earth both obey with the ease of natural necessity. The human being is about to be measured against this standard." },
        { ayahs: "6–15", title: "The Two Fates", color: "#e07a8a", desc: "Every human being is laboring toward a meeting — kadih, toil with strain. The record in the right hand brings an easy accounting and return to family in happiness. The record behind the back — not the left hand, but behind, where the person spent their life keeping it — brings a cry for destruction. The root error: he thought he would never return." },
        { ayahs: "16–20", title: "The Oaths & the Stages", color: "#C9A84C", isPivot: true, desc: "Three images of transition — the twilight fading, the night gathering all things in, the moon arriving at fullness — sworn to introduce the surah's thesis: you will travel from stage to stage. The oath passage appears after the judgment scenes, not before them. It is the surah taking a breath before its final word." },
        { ayahs: "21–25", title: "The Closing Warning", color: "#9b7fd4", desc: "The sky heard and obeyed. These people hear the Quran and do not prostrate. The contrast is structural. Then the savage irony of bashshir — 'give glad tidings' — introducing torment. And the final exception: a reward uninterrupted, ghayru mamnun, for those who believed." },
      ],
    },
    chiasticRing: {
      title: "The Inversion",
      subtitle: "The opening's cosmic obedience frames the closing's human refusal — and the final exception resolves the tension",
      pairs: [
        {
          left: { label: "Sky Heard & Obeyed", ayahs: "1–2", desc: "The sky splits in obedience — adhinat li-rabbiha. The action is reflexive, willing, natural." },
          right: { label: "They Hear & Refuse", ayahs: "21–22", desc: "The Quran is recited and they do not prostrate — la yasjudun. The same act of hearing, opposite response." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Earth Obeys", ayahs: "3–5", desc: "The earth extends, empties its contents, listens — the refrain repeated for both witnesses of creation." },
          right: { label: "God Knows What They Contain", ayahs: "23–24", desc: "Allah knows what they harbor inside — yu'un. The earth emptied itself; they refuse to open." },
          color: "#e07a8a",
        },
        {
          left: { label: "The Two Fates", ayahs: "6–15", desc: "Right hand: easy accounting, family, happiness. Behind the back: destruction, fire, the assumption of no return." },
          right: { label: "The Exception", ayahs: "25", desc: "Those who believe and do good — a reward uninterrupted. The humans who responded the way the sky did." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Stages", ayahs: "16–20",
        desc: "You will surely travel from stage to stage — tabaqan 'an tabaq.",
        note: "The hinge that universalizes everything. The splitting sky is a future event. The movement from stage to stage is happening now, in every twilight that yields to night.",
      },
    },
    deductiveFunnel: {
      title: "The Threshold Sequence",
      subtitle: "Every element crosses from one state to another — the surah asks whether you recognize your own crossing",
      layers: [
        { depth: 1, label: "The Sky's Crossing", ayah: "1–2", arabic: "إِذَا السَّمَاءُ انشَقَّتْ", desc: "From intact to split. The reflexive form — inshaqqat — means the sky tears itself open from within. Its obedience is not reluctant compliance; it is the only response that makes sense.", color: "#4ecdc4" },
        { depth: 2, label: "The Human Crossing", ayah: "6", arabic: "كَادِحٌ إِلَىٰ رَبِّكَ كَدْحًا فَمُلَاقِيهِ", desc: "From labor to meeting. The word kadih — toil, strain — describes every human life without distinction. The labor is universal. What differs is the meeting.", color: "#e07a8a" },
        { depth: 3, label: "The Natural Crossings", ayah: "16–18", arabic: "بِالشَّفَقِ...وَمَا وَسَقَ...إِذَا اتَّسَقَ", desc: "Twilight to night to full moon. Three images from the same root w-s-q — gathering and becoming full are two faces of the same process. The cosmos demonstrates the stages the surah names.", color: "#C9A84C" },
        { depth: 4, label: "The Named Crossing", ayah: "19", arabic: "لَتَرْكَبُنَّ طَبَقًا عَن طَبَقٍ", desc: "The thesis-bearing verse. Layer upon layer, stage upon stage. The emphatic la- with the heavy nun makes this one of the Quran's strongest declarations. You are already in transit.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence sharpens the surah's architecture — no buffer between you and the reckoning",
      absences: [
        { item: "No prophetic narratives", note: "No Musa, no Ibrahim, no mediating example between the listener and the judgment. You hear about the sky's obedience, then you hear about your own reckoning. There is no buffer." },
        { item: "No direct address to the Prophet", note: "The word qul ('say') does not appear. The surah addresses humanity in the second person plural — la-tarkabunna, 'you will surely travel.' The message is unmediated." },
        { item: "No named individuals", note: "The person who receives the record behind the back is unnamed. The universality is the point — a type, not a person, described by an assumption: he thought he would never return." },
        { item: "No legislative instruction", note: "No halal, no haram, no command structure. The surah operates entirely in the register of witness and warning — the sky that obeys, the human who does not, the stages that continue regardless." },
        { item: "No opening oaths", note: "Unlike most Makkan surahs, the oaths appear in the third quarter (ayahs 16-18), after the judgment scenes. The structural reversal creates contemplative rest between drama and final warning." },
      ],
    },
  },

  contentNodes: [
    { concept: "Tabaqan 'an tabaq — the stages of existence", type: "surah-specific", articleSlug: "tabaq-stages-existence-84" },
    { concept: "Wara'a zahrihi — the record behind the back", type: "surah-specific", articleSlug: "record-behind-back-84-10" },
    { concept: "Inshiqaq-Infitar pair — two verbs of splitting", type: "cross-surah", articleSlug: "inshiqaq-infitar-splitting-pair" },
    { concept: "Kadih — universal labor toward the meeting", type: "cross-surah", articleSlug: "kadih-labor-meeting-84-6" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "registers", label: "Registers" },
  { id: "inversion", label: "Inversion" },
  { id: "thresholds", label: "Thresholds" },
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
        Sky's crossing → human crossing → natural crossings → named crossing
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
          {activeTab === "registers" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "inversion" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "thresholds" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
