"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-INFITAR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-infitar
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Infitar",
  arabicName: "الانفِطار",
  meaning: "The Splitting Open",
  number: 82,
  ayahCount: 19,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "Nineteen ayahs that split the sky open to ask a single question — and name the One asking it by His generosity, so the question becomes both an indictment and an open door.",
  reflectionUrl: "/surahs/al-infitar",
  readTime: "18 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ",
    ayahRef: "82:6",
    translation: "O mankind, what has deceived you concerning your Lord, the Generous?",
    why: "The surah's fulcrum. Everything before it is cosmic demolition — sky, stars, seas, graves. Everything after it is the answer: creation, surveillance, two destinations, sovereignty. The question is placed only five ayahs in because Al-Infitar does not build slowly — it confronts immediately. And the word that ends it — al-Karim, the Generous — is the door left open inside the rebuke.",
  },

  audio: { surahNumber: 82, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "إِذَا السَّمَاءُ انفَطَرَتْ", translation: "When the sky breaks apart," },
    { ayah: 2, arabic: "وَإِذَا الْكَوَاكِبُ انتَثَرَتْ", translation: "and when the stars scatter," },
    { ayah: 3, arabic: "وَإِذَا الْبِحَارُ فُجِّرَتْ", translation: "and when the seas erupt," },
    { ayah: 4, arabic: "وَإِذَا الْقُبُورُ بُعْثِرَتْ", translation: "and when the graves are overturned —" },
    { ayah: 5, arabic: "عَلِمَتْ نَفْسٌ مَّا قَدَّمَتْ وَأَخَّرَتْ", translation: "every soul will know what it has sent ahead and what it has held back." },
    { ayah: 6, arabic: "يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ", translation: "O mankind, what has deceived you concerning your Lord, the Generous?" },
    { ayah: 7, arabic: "الَّذِي خَلَقَكَ فَسَوَّاكَ فَعَدَلَكَ", translation: "He who created you, proportioned you, and balanced you," },
    { ayah: 8, arabic: "فِي أَيِّ صُورَةٍ مَّا شَاءَ رَكَّبَكَ", translation: "and assembled you in whatever form He willed." },
    { ayah: 9, arabic: "كَلَّا بَلْ تُكَذِّبُونَ بِالدِّينِ", translation: "But you deny the Judgment." },
    { ayah: 10, arabic: "وَإِنَّ عَلَيْكُمْ لَحَافِظِينَ", translation: "And indeed, over you are guardians —" },
    { ayah: 11, arabic: "كِرَامًا كَاتِبِينَ", translation: "noble ones, recording." },
    { ayah: 12, arabic: "يَعْلَمُونَ مَا تَفْعَلُونَ", translation: "They know what you do." },
    { ayah: 13, arabic: "إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ", translation: "Indeed, the righteous will be in bliss," },
    { ayah: 14, arabic: "وَإِنَّ الْفُجَّارَ لَفِي جَحِيمٍ", translation: "and indeed, the wicked will be in hellfire." },
    { ayah: 15, arabic: "يَصْلَوْنَهَا يَوْمَ الدِّينِ", translation: "They will burn therein on the Day of Judgment," },
    { ayah: 16, arabic: "وَمَا هُمْ عَنْهَا بِغَائِبِينَ", translation: "and they will not be absent from it." },
    { ayah: 17, arabic: "وَمَا أَدْرَاكَ مَا يَوْمُ الدِّينِ", translation: "And what will make you realize what the Day of Judgment is?" },
    { ayah: 18, arabic: "ثُمَّ مَا أَدْرَاكَ مَا يَوْمُ الدِّينِ", translation: "Then — what will make you realize what the Day of Judgment is?" },
    { ayah: 19, arabic: "يَوْمَ لَا تَمْلِكُ نَفْسٌ لِّنَفْسٍ شَيْئًا ۖ وَالْأَمْرُ يَوْمَئِذٍ لِّلَّهِ", translation: "The Day when no soul will have power over another soul in any way — and the command that Day will belong entirely to Allah." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Three Stages",
      subtitle: "Cosmic demolition → personal confrontation → absolute sovereignty",
      sections: [
        { ayahs: "1–5", title: "The Four Fractures", color: "#e07a8a", desc: "Four conditional clauses unmake the visible world — sky splitting, stars scattering, seas erupting, graves overturned. Then the response: every soul will know what it sent ahead and what it held back. The reckoning includes both action and inaction — the two columns of the ledger." },
        { ayahs: "6–12", title: "The Question & the Witnesses", color: "#C9A84C", isPivot: true, desc: "The surah's hinge: a direct address to the human being by name. What deceived you about your Lord, the Generous? Four verbs of creation answer the question. Then kalla — the sharp rebuke — and the revelation of the kiraman katibin, noble recording angels who know everything you do." },
        { ayahs: "13–19", title: "The Two Destinations", color: "#9b7fd4", desc: "Two parallel declarations — the righteous in bliss, the wicked in fire. The question 'what will make you realize?' is asked twice, intensified by thumma. The answer: a Day when no soul can help another, and all command belongs to Allah alone." },
      ],
    },
    chiasticRing: {
      title: "The Frame",
      subtitle: "The surah opens with creation dissolving and closes with sovereignty revealed — the surface giving way to what was always underneath",
      pairs: [
        {
          left: { label: "Creation Undone", ayahs: "1–4", desc: "Sky splits, stars scatter, seas erupt, graves overturn — the physical order dissolves" },
          right: { label: "Sovereignty Declared", ayahs: "17–19", desc: "All authority collapses into one point: the command belongs entirely to Allah" },
          color: "#e07a8a",
        },
        {
          left: { label: "The Ledger Opens", ayahs: "5", desc: "Every soul knows what it sent forward and held back — both columns in full light" },
          right: { label: "The Two Fates", ayahs: "13–16", desc: "Righteous in bliss, wicked in fire — the ledger's two sides become two destinations" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Question", ayahs: "6–12",
        desc: "What has deceived you concerning your Lord, the Generous?",
        note: "Placed only five ayahs in — the surah confronts immediately. The k-r-m root threads through: al-Karim (the Generous Lord, v.6) and kiraman (the noble angels, v.11) share one root, linking generosity with accountability.",
      },
    },
    deductiveFunnel: {
      title: "The Thread of K-R-M",
      subtitle: "The root k-r-m weaves through the surah, linking generosity to accountability",
      layers: [
        { depth: 1, label: "The Generous Lord", ayah: "6", arabic: "بِرَبِّكَ الْكَرِيمِ", desc: "Allah names Himself by His generosity at the exact moment He questions human ingratitude. The deception was made possible by divine generosity — because He was patient, you assumed He was absent.", color: "#C9A84C" },
        { depth: 2, label: "The Fourfold Making", ayah: "7–8", arabic: "خَلَقَكَ فَسَوَّاكَ فَعَدَلَكَ", desc: "Four verbs of creation answer the question: created (khalaqa), proportioned (sawwa), balanced ('adala), assembled (rakkaba). Each verb adds specificity — the progression from general creation to particular form.", color: "#4ecdc4" },
        { depth: 3, label: "The Noble Witnesses", ayah: "11", arabic: "كِرَامًا كَاتِبِينَ", desc: "The angels share the k-r-m root with al-Karim: the generosity of the Lord and the nobility of His witnesses are the same quality at two scales. The ones recording your deeds carry the attribute of the One whose generosity you exploited.", color: "#9b7fd4" },
        { depth: 4, label: "The Sole Command", ayah: "19", arabic: "وَالْأَمْرُ يَوْمَئِذٍ لِّلَّهِ", desc: "The generosity was real. So is the sovereignty. Total, unshared authority. No soul helping another. The surah holds both without explaining away either.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence sharpens the surah's focus — intimacy, not spectacle",
      absences: [
        { item: "No judicial process", note: "At-Takwir has scrolls spread open, souls paired, the buried girl's testimony. Al-Infitar skips all courtroom procedure — it moves straight from 'what deceived you?' to the two outcomes. The concern is the defendant's state of mind, not the trial." },
        { item: "No prophetic stories", note: "No destroyed nations, no narratives, no historical examples. The surah's only example is the reader's own behavior." },
        { item: "No moral legislation", note: "No commands, no prohibitions, no instructions to the Prophet. The surah is not telling you what to do — it is showing you what is already true about the architecture of accountability." },
        { item: "No bridge between cosmos and question", note: "The transition from four cosmic disruptions to 'O mankind, what deceived you?' has no 'therefore,' no connector. Cosmic destruction and personal confrontation are presented as the same event — simultaneous, not sequential." },
        { item: "No repeated refrain", note: "Ar-Rahman asks 'which of your Lord's favors will you deny?' seventy-eight times. Al-Infitar asks its question once. The single question, unrepeated, hits harder for its solitude." },
      ],
    },
  },

  contentNodes: [
    { concept: "Ma gharraka — the question between rebuke and invitation", type: "surah-specific", articleSlug: "ma-gharraka-question-82-6" },
    { concept: "Kiraman katibin — the noble recording angels", type: "surah-specific", articleSlug: "kiraman-katibin-82-11" },
    { concept: "At-Takwir / Al-Infitar twin pair", type: "cross-surah", articleSlug: "takwir-infitar-twin-surahs" },
    { concept: "Qaddamat wa akhkharat — the two columns of the ledger", type: "cross-surah", articleSlug: "qaddamat-akhkharat-ledger" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "stages", label: "Stages" },
  { id: "frame", label: "Frame" },
  { id: "thread", label: "K-R-M" },
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
        Generosity → creation → witness → sovereignty
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
          {activeTab === "stages" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "frame" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "thread" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
