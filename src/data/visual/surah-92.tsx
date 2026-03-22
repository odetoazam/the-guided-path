"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-LAYL — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-layl
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Layl",
  arabicName: "اللَّيْل",
  meaning: "The Night",
  number: 92,
  ayahCount: 21,
  period: "Makki",
  juz: 30,
  movements: 5,
  thesis:
    "A surah that draws a line between the hand that opens and the hand that closes, and shows you that the line runs through everything — your wealth, your soul, your path, your eternity.",
  reflectionUrl: "/surahs/al-layl",
  readTime: "18 min read",

  heartVerse: {
    arabic: "وَمَا لِأَحَدٍ عِندَهُ مِن نِّعْمَةٍ تُجْزَىٰ",
    ayahRef: "92:19",
    translation: "And he has no favor owed to anyone that he is repaying.",
    why: "The psychological masterpiece of the surah. This person gives, and there is no one who has done him a favor that he is returning. His generosity is not gratitude, not social obligation, not reputation. It is structurally uncaused by any human relationship. The only cause is the face of his Lord.",
  },

  audio: { surahNumber: 92, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَاللَّيْلِ إِذَا يَغْشَىٰ", translation: "By the night when it covers —" },
    { ayah: 2, arabic: "وَالنَّهَارِ إِذَا تَجَلَّىٰ", translation: "and the day when it shines forth —" },
    { ayah: 3, arabic: "وَمَا خَلَقَ الذَّكَرَ وَالْأُنثَىٰ", translation: "and the One who created male and female —" },
    { ayah: 4, arabic: "إِنَّ سَعْيَكُمْ لَشَتَّىٰ", translation: "your efforts are truly diverse." },
    { ayah: 5, arabic: "فَأَمَّا مَنْ أَعْطَىٰ وَاتَّقَىٰ", translation: "As for the one who gives and is mindful of God —" },
    { ayah: 6, arabic: "وَصَدَّقَ بِالْحُسْنَىٰ", translation: "and affirms the good —" },
    { ayah: 7, arabic: "فَسَنُيَسِّرُهُ لِلْيُسْرَىٰ", translation: "We will ease his way to ease." },
    { ayah: 8, arabic: "وَأَمَّا مَن بَخِلَ وَاسْتَغْنَىٰ", translation: "And as for the one who is miserly and considers himself self-sufficient —" },
    { ayah: 9, arabic: "وَكَذَّبَ بِالْحُسْنَىٰ", translation: "and denies the good —" },
    { ayah: 10, arabic: "فَسَنُيَسِّرُهُ لِلْعُسْرَىٰ", translation: "We will ease his way to difficulty." },
    { ayah: 11, arabic: "وَمَا يُغْنِي عَنْهُ مَالُهُ إِذَا تَرَدَّىٰ", translation: "And his wealth will not avail him when he falls." },
    { ayah: 12, arabic: "إِنَّ عَلَيْنَا لَلْهُدَىٰ", translation: "Guidance is upon Us." },
    { ayah: 13, arabic: "وَإِنَّ لَنَا لَلْآخِرَةَ وَالْأُولَىٰ", translation: "And to Us belongs the Hereafter and the first life." },
    { ayah: 14, arabic: "فَأَنذَرْتُكُمْ نَارًا تَلَظَّىٰ", translation: "So I have warned you of a raging Fire —" },
    { ayah: 15, arabic: "لَا يَصْلَاهَا إِلَّا الْأَشْقَى", translation: "none will enter it except the most wretched —" },
    { ayah: 16, arabic: "الَّذِي كَذَّبَ وَتَوَلَّىٰ", translation: "the one who denied and turned away." },
    { ayah: 17, arabic: "وَسَيُجَنَّبُهَا الْأَتْقَى", translation: "And the most God-conscious will be kept far from it —" },
    { ayah: 18, arabic: "الَّذِي يُؤْتِي مَالَهُ يَتَزَكَّىٰ", translation: "the one who gives his wealth to purify himself —" },
    { ayah: 19, arabic: "وَمَا لِأَحَدٍ عِندَهُ مِن نِّعْمَةٍ تُجْزَىٰ", translation: "and he has no favor owed to anyone that he is repaying —" },
    { ayah: 20, arabic: "إِلَّا ابْتِغَاءَ وَجْهِ رَبِّهِ الْأَعْلَىٰ", translation: "seeking only the face of his Lord, the Most High." },
    { ayah: 21, arabic: "وَلَسَوْفَ يَرْضَىٰ", translation: "And he will surely be satisfied." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Fork",
      subtitle: "Five beats: oaths → twin paths → divine claim → fire → the generous soul",
      sections: [
        { ayahs: "1–4", title: "Cosmic Contrast", color: "#4ecdc4", desc: "Three oaths establish contrast as the law of creation — night and day, male and female, concealment and disclosure. Then the thesis: your efforts are truly diverse (shatta). Duality is the operating system of creation, and human striving diverges along moral lines." },
        { ayahs: "5–11", title: "The Twin Paths", color: "#9b7fd4", desc: "Two portraits in perfect parallel. The one who gives, is mindful, and affirms the good — eased toward ease. The one who hoards, considers himself self-sufficient, and denies the good — eased toward difficulty. The same verb (yassara) used for both: God eases the descent too. The path to ruin feels smooth while you are on it." },
        { ayahs: "12–13", title: "The Divine Claim", color: "#C9A84C", isPivot: true, desc: "Two short declarations at the surah's center. Guidance belongs to God. Both worlds — the next and this one — belong to Him. The paths are real, the choice is real, but the guidance that makes right choice possible belongs to God. Human agency within divine sovereignty." },
        { ayahs: "14–16", title: "The Fire", color: "#e07a8a", desc: "A raging fire (talazza — the Arabic mimics the crackling of flame). None enters it except the most wretched (al-ashqa) — the one who denied and turned away. The superlative corresponds to al-atqa in ayah 17. The surah builds toward its final contrast: the most wretched against the most pious." },
        { ayahs: "17–21", title: "The Generous Soul", color: "#4ecdc4", desc: "Where the surah has been heading all along. The most God-conscious is kept far from the fire — the one who gives to purify himself, owes no favor to anyone, seeks only the face of his Lord, the Most High. And he will surely be satisfied. The final word: contentment that outlasts everything." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Mirror structure — the surah gives more space to what it loves",
      pairs: [
        {
          left: { label: "Cosmic Oaths", ayahs: "1–3", desc: "Night covers, day shines, male and female created — contrast as the law of existence" },
          right: { label: "The Generous Soul", ayahs: "17–21", desc: "The most God-conscious, giving to purify, seeking God's face — satisfaction promised" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Striving Diverges", ayahs: "4", desc: "Your efforts are truly diverse (shatta) — moral divergence declared" },
          right: { label: "The Fire", ayahs: "14–16", desc: "A raging fire for the most wretched — who denied and turned away" },
          color: "#e07a8a",
        },
        {
          left: { label: "Path of Ease", ayahs: "5–7", desc: "Gives, is mindful, affirms the good — eased toward ease" },
          right: { label: "Path of Difficulty", ayahs: "8–11", desc: "Hoards, self-sufficient, denies the good — eased toward difficulty" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "Guidance Belongs to God", ayahs: "12–13",
        desc: "Guidance is upon Us. And to Us belongs the Hereafter and the first life.",
        note: "The pivot between human agency and divine sovereignty. Everything before it describes human action and its consequences. Everything after it operates under a different logic: God warns, God burns, God rescues, God satisfies.",
      },
    },
    deductiveFunnel: {
      title: "The Scales",
      subtitle: "Each quality on one side has its precise inversion on the other",
      layers: [
        { depth: 1, label: "Gives (a'ta) vs. Hoards (bakhila)", ayah: "5, 8", arabic: "أَعْطَىٰ ↔ بَخِلَ", desc: "The first and most visible divergence. One hand opens, the other closes. The verb a'ta is general — giving of any kind. Bakhila is specific — hoarding, clutching, the refusal to release.", color: "#4ecdc4" },
        { depth: 2, label: "Mindful (ittaqa) vs. Self-sufficient (istaghna)", ayah: "5, 8", arabic: "اتَّقَىٰ ↔ اسْتَغْنَىٰ", desc: "The interior divergence. Taqwa is awareness of God — the sense that you are watched, accountable, dependent. Istaghna is the belief that you need no one — not even God. The quiet catastrophe of the self-sufficient heart.", color: "#9b7fd4" },
        { depth: 3, label: "Affirms the good (saddaqa) vs. Denies it (kadhdhaba)", ayah: "6, 9", arabic: "صَدَّقَ بِالْحُسْنَىٰ ↔ كَذَّبَ بِالْحُسْنَىٰ", desc: "The theological divergence. Al-husna — the good, the beautiful, the best promise — is the hinge. To affirm it is to believe that reality is structured toward goodness. To deny it is to reject that structure entirely.", color: "#e07a8a" },
        { depth: 4, label: "Eased to ease vs. Eased to difficulty", ayah: "7, 10", arabic: "لِلْيُسْرَىٰ ↔ لِلْعُسْرَىٰ", desc: "The devastating consequence. The same verb — yassara — for both. God eases both paths. The ease of the descent is part of the punishment. The path to ruin feels smooth while you are on it.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah of pure principle — no narrative, no history, no softening",
      absences: [
        { item: "No prophet mentioned", note: "No name, no messenger, no narrative figure. The surah operates entirely at the level of principle. Two paths, two outcomes, and a God who owns the crossroads." },
        { item: "No destroyed nation", note: "Where Ash-Shams cited Thamud, Al-Layl cites nothing. No history, no precedent, no parable. The surah does not need an example because it is describing something so fundamental it precedes every story." },
        { item: "No middle ground", note: "No gray zone between the generous and the miser. The binary that opens the surah with night and day reaches its human extreme in al-ashqa vs. al-atqa — the most wretched against the most God-conscious. The surah refuses gradations." },
        { item: "No paradise described", note: "The reward is not gardens or rivers. It is a single verb: yarda — he will be satisfied. The surah promises contentment, not scenery. What the generous soul receives is the fulfillment of what he was seeking — the face of his Lord." },
        { item: "No social context for the giving", note: "Ayah 19 deliberately removes every human motive — no favor is being repaid, no debt honored, no reciprocity expected. The giving exists in a space emptied of all audience except God." },
      ],
    },
  },

  contentNodes: [
    { concept: "Al-husna — the beautiful promise affirmed or denied", type: "surah-specific", articleSlug: "al-husna-beautiful-promise-92" },
    { concept: "Istaghna — self-sufficiency as spiritual catastrophe", type: "surah-specific", articleSlug: "istaghna-self-sufficiency-92-8" },
    { concept: "Ash-Shams and Al-Layl — diagnosis and prescription", type: "cross-surah", articleSlug: "shams-layl-twin-surahs" },
    { concept: "Wajh Allah — giving for the face of God across the Quran", type: "cross-surah", articleSlug: "wajh-allah-face-of-god-giving" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "fork", label: "Fork" },
  { id: "mirror", label: "Mirror" },
  { id: "scales", label: "Scales" },
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
        Action → interior → theology → consequence
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
          {activeTab === "fork" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "scales" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
