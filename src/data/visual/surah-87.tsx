"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-A'LA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-ala
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-A'la",
  arabicName: "الأعلى",
  meaning: "The Most High",
  number: 87,
  ayahCount: 19,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "A nineteen-ayah surah that commands glorification, promises the Prophet he will not forget, and then shows — through one image of darkening grass — why everything else you cling to is already on its way to becoming something else.",
  reflectionUrl: "/surahs/al-ala",
  readTime: "18 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"},{"key":"sarf","english":"Morphology"}],
  heartVerse: {
    arabic: "قَدْ أَفْلَحَ مَن تَزَكَّىٰ",
    ayahRef: "87:14",
    translation: "Truly successful is the one who purifies himself.",
    why: "The surah's definition of success. The verb tazakka carries meanings of purification, growth, and charity simultaneously — inner cleansing and outward generosity fused into a single act. This is where the surah's opening command to glorify meets its human fulfillment.",
  },

  audio: { surahNumber: 87, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى", translation: "Glorify the name of your Lord, the Most High —" },
    { ayah: 2, arabic: "الَّذِي خَلَقَ فَسَوَّىٰ", translation: "who created and then proportioned," },
    { ayah: 3, arabic: "وَالَّذِي قَدَّرَ فَهَدَىٰ", translation: "and who determined and then guided," },
    { ayah: 4, arabic: "وَالَّذِي أَخْرَجَ الْمَرْعَىٰ", translation: "and who brought forth the pasture," },
    { ayah: 5, arabic: "فَجَعَلَهُ غُثَاءً أَحْوَىٰ", translation: "then made it dark stubble." },
    { ayah: 6, arabic: "سَنُقْرِئُكَ فَلَا تَنسَىٰ", translation: "We shall make you recite, and you will not forget —" },
    { ayah: 7, arabic: "إِلَّا مَا شَاءَ اللَّهُ ۚ إِنَّهُ يَعْلَمُ الْجَهْرَ وَمَا يَخْفَىٰ", translation: "except what Allah wills. Indeed, He knows what is open and what is hidden." },
    { ayah: 8, arabic: "وَنُيَسِّرُكَ لِلْيُسْرَىٰ", translation: "And We shall ease you toward ease." },
    { ayah: 9, arabic: "فَذَكِّرْ إِن نَّفَعَتِ الذِّكْرَىٰ", translation: "So remind, if the reminder benefits." },
    { ayah: 10, arabic: "سَيَذَّكَّرُ مَن يَخْشَىٰ", translation: "The one who fears will remember." },
    { ayah: 11, arabic: "وَيَتَجَنَّبُهَا الْأَشْقَى", translation: "And the most wretched will avoid it —" },
    { ayah: 12, arabic: "الَّذِي يَصْلَى النَّارَ الْكُبْرَىٰ", translation: "the one who will enter the greater fire," },
    { ayah: 13, arabic: "ثُمَّ لَا يَمُوتُ فِيهَا وَلَا يَحْيَىٰ", translation: "then he will neither die in it nor live." },
    { ayah: 14, arabic: "قَدْ أَفْلَحَ مَن تَزَكَّىٰ", translation: "Truly successful is the one who purifies himself," },
    { ayah: 15, arabic: "وَذَكَرَ اسْمَ رَبِّهِ فَصَلَّىٰ", translation: "and remembers the name of his Lord, and prays." },
    { ayah: 16, arabic: "بَلْ تُؤْثِرُونَ الْحَيَاةَ الدُّنْيَا", translation: "Yet you prefer the life of this world," },
    { ayah: 17, arabic: "وَالْآخِرَةُ خَيْرٌ وَأَبْقَىٰ", translation: "while the Hereafter is better and more lasting." },
    { ayah: 18, arabic: "إِنَّ هَٰذَا لَفِي الصُّحُفِ الْأُولَىٰ", translation: "Indeed, this is in the earliest scrolls —" },
    { ayah: 19, arabic: "صُحُفِ إِبْرَاهِيمَ وَمُوسَىٰ", translation: "the scrolls of Ibrahim and Musa." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Three Rooms",
      subtitle: "Command to glorify → promise of preservation → division of humanity",
      sections: [
        { ayahs: "1\u20135", title: "The Command & Its Evidence", color: "#4ecdc4", desc: "A single imperative \u2014 sabbih, glorify \u2014 governs everything. Five divine actions follow: created, proportioned, determined, guided, brought forth. The sequence compresses an entire lifecycle into four ayahs, closing with the image of pasture becoming dark stubble \u2014 the only image in the surah drawn from the visible world." },
        { ayahs: "6\u20138", title: "The Promise of Preservation", color: "#9b7fd4", desc: "The same God who creates and proportions the pasture now turns to the Prophet and promises: you will be made to recite and you will not forget. The verb nuqri\u2019uka shares the root q-r-\u2019 with Qur\u2019an itself. The promise of ease \u2014 wa-nuyassiruka lil-yusra \u2014 is spoken during a period of real difficulty." },
        { ayahs: "9", title: "The Pivot", color: "#C9A84C", isPivot: true, desc: "Fa-dhakkir in nafa\u2019at al-dhikra \u2014 so remind, if the reminder benefits. The surah moves from what God does to what the Prophet must do. The conditional does not mean \u2018only remind when useful.\u2019 It means: your task is the reminder; the benefit is God\u2019s domain." },
        { ayahs: "10\u201319", title: "The Two Responses & Ancient Scrolls", color: "#e07a8a", desc: "The world splits along one line: the one who fears will remember, the most wretched will avoid it. Success is defined as purification, remembrance, and prayer. The preference for this world is diagnosed. And the closing declaration anchors everything in the primordial scrolls of Ibrahim and Musa \u2014 this message is not new." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "A quiet symmetry: the name of the Lord opens and centers the surah",
      pairs: [
        {
          left: { label: "God's Creative Power", ayahs: "1\u20135", desc: "Five divine acts in creation, closing with pasture darkening \u2014 the image of transience" },
          right: { label: "Success & Ancient Scrolls", ayahs: "14\u201319", desc: "Purification, remembrance, prayer \u2014 and the revelation that this was already in the scrolls of Ibrahim and Musa" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Promise to the Prophet", ayahs: "6\u20138", desc: "You will not forget, your path is eased \u2014 divine preservation of revelation" },
          right: { label: "Two Responses", ayahs: "10\u201313", desc: "The one who fears remembers; the wretched avoids \u2014 the greater fire, neither death nor life" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Hinge", ayahs: "9",
        desc: "So remind, if the reminder benefits.",
        note: "The command to remind stands at the exact center of a surah whose closing word is that reminding is the oldest human task.",
      },
    },
    threadMap: {
      title: "The Thread",
      subtitle: "Pasture \u2192 preference: the surah\u2019s most quietly powerful structural move",
      threads: [
        {
          label: "The Pasture Image",
          fromAyah: "5",
          fromArabic: "\u063A\u064F\u062B\u0627\u0621\u064B \u0623\u062D\u0652\u0648\u0649\u0670",
          toAyah: "16",
          toArabic: "\u0627\u0644\u0652\u062D\u064E\u064A\u0627\u0629\u064E \u0627\u0644\u062F\u0651\u064F\u0646\u0652\u064A\u0627",
          desc: "In ayah 5, pasture becomes dark stubble. In ayah 16, humans prefer the worldly life. The pasture is the worldly life. The surah showed you its fate eleven ayahs before it named the error of clinging to it.",
          color: "#e07a8a",
        },
        {
          label: "The Name of the Lord",
          fromAyah: "1",
          fromArabic: "\u0633\u064E\u0628\u0651\u0650\u062D\u0650 \u0627\u0633\u0652\u0645\u064E \u0631\u064E\u0628\u0651\u0650\u0643\u064E",
          toAyah: "15",
          toArabic: "\u0648\u064E\u0630\u064E\u0643\u064E\u0631\u064E \u0627\u0633\u0652\u0645\u064E \u0631\u064E\u0628\u0651\u0650\u0647\u0650",
          desc: "The opening commanded glorification of the Lord\u2019s name. Ayah 15 defines the successful one as the one who remembers that name. Command meets fulfillment. The circle closes.",
          color: "#C9A84C",
        },
        {
          label: "Ease Promised, Ease Named",
          fromAyah: "8",
          fromArabic: "\u0644\u0650\u0644\u0652\u064A\u064F\u0633\u0652\u0631\u0649\u0670",
          toAyah: "17",
          toArabic: "\u062E\u064E\u064A\u0652\u0631\u064C \u0648\u064E\u0623\u064E\u0628\u0652\u0642\u0649\u0670",
          desc: "Ease (yusra) is promised to the Prophet during hardship. The Hereafter is declared better and more lasting. The true ease lies beyond the stubble.",
          color: "#9b7fd4",
        },
      ],
    },
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "A surah that builds its argument entirely without narrative, law, or confrontation",
      absences: [
        { item: "No narrative", note: "No destroyed nation, no extended parable, no story of prior peoples. The early Makkan surahs often build through \u2018Ad, Thamud, the people of Lut. Al-A\u2019la skips all of it. Its argument is built on creation, promise, and moral choice." },
        { item: "No legal instruction", note: "No \u2018feed the orphan,\u2019 no behavioral commands. The surah defines success through purification and remembrance, not through specific acts of obedience." },
        { item: "No confrontation", note: "The tone never shifts into threat or direct opposition. Even the mention of the greater fire is delivered with the same serene altitude established by the opening glorification." },
        { item: "No description of the Hereafter", note: "The surah declares the Hereafter is \u2018better and more lasting\u2019 but never describes it. Two comparatives and nothing more. The contrast with the darkening pasture does the rest." },
        { item: "No named antagonist", note: "The \u2018most wretched\u2019 (al-ashqa) is a type, not a person. The surah speaks in universals \u2014 anyone who turns away, anyone who purifies." },
      ],
    },
  },

  contentNodes: [
    { concept: "Sabbih \u2014 the command that precedes everything", type: "surah-specific", articleSlug: "sabbih-command-87" },
    { concept: "The pasture-to-preference thread (5 \u2192 16)", type: "surah-specific", articleSlug: "pasture-preference-thread-87" },
    { concept: "Al-A\u2019la and Al-Ghashiya as liturgical pair", type: "cross-surah", articleSlug: "ala-ghashiya-pair" },
    { concept: "Tazakka \u2014 purification as success", type: "cross-surah", articleSlug: "tazakka-purification-success" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "rooms", label: "Rooms" },
  { id: "ring", label: "Ring" },
  { id: "thread", label: "Thread" },
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
      <span className="text-gold-500/50 text-sm">{"\u06DE"}</span>
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

function ThreadMap({ data }: { data: typeof SURAH_DATA.diagrams.threadMap }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.threads.map((thread, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? thread.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: thread.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: thread.color }}>{thread.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{thread.fromAyah} {"\u2192"} v.{thread.toAyah}</span>
            </div>
            <div className="flex justify-between mt-2 gap-4">
              <p className="text-sm text-cream-muted/50 font-amiri" style={{ direction: "rtl" }}>{thread.fromArabic}</p>
              <p className="text-sm text-cream-muted/50 font-amiri" style={{ direction: "rtl" }}>{thread.toArabic}</p>
            </div>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{thread.desc}</p>}
          </button>
        ))}
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
          {activeTab === "rooms" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "thread" && <ThreadMap data={d.diagrams.threadMap} />}
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
