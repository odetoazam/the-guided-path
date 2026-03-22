"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AD-DUHA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ad-dhuha
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ad-Duha",
  arabicName: "الضُّحَىٰ",
  meaning: "The Morning Brightness",
  number: 93,
  ayahCount: 11,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "Eleven ayahs in which God lifts the face of the one He loves and says: the evidence that I will never leave you is that I never have.",
  reflectionUrl: "/surahs/ad-dhuha",
  readTime: "16 min read",

  heartVerse: {
    arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
    ayahRef: "93:5",
    translation: "And your Lord will give you, and you will be satisfied.",
    why: "An open-ended promise with no limit named, no condition attached. The giving will continue until the recipient — not the giver — says it is enough. The verse remains one of the richest single ayahs in the Quran for contemplative study.",
  },

  audio: { surahNumber: 93, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَالضُّحَىٰ", translation: "By the morning brightness," },
    { ayah: 2, arabic: "وَاللَّيْلِ إِذَا سَجَىٰ", translation: "and the night when it covers with stillness —" },
    { ayah: 3, arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", translation: "your Lord has not abandoned you, nor has He despised you." },
    { ayah: 4, arabic: "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ", translation: "And the Hereafter is better for you than the first life." },
    { ayah: 5, arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", translation: "And your Lord will give you, and you will be satisfied." },
    { ayah: 6, arabic: "أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ", translation: "Did He not find you an orphan and give you shelter?" },
    { ayah: 7, arabic: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ", translation: "And He found you searching, so He guided you." },
    { ayah: 8, arabic: "وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ", translation: "And He found you in need, so He made you self-sufficient." },
    { ayah: 9, arabic: "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ", translation: "So as for the orphan, do not oppress him." },
    { ayah: 10, arabic: "وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ", translation: "And as for the one who asks, do not repel him." },
    { ayah: 11, arabic: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ", translation: "And as for the blessing of your Lord, proclaim it." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Triptych",
      subtitle: "Three panels: reassurance → evidence → instruction",
      sections: [
        { ayahs: "1–5", title: "The Reassurance", color: "#C9A84C", desc: "An oath sworn on morning light and the stillness of night. Two denials — your Lord has not abandoned you, nor despised you. Then two promises — the Hereafter is better than this life, and God will give until you are satisfied. The comfort addresses the past, the present, and the future, closing every direction from which despair could enter." },
        { ayahs: "6–8", title: "The Evidence", color: "#9b7fd4", desc: "Three rhetorical questions, each beginning with 'Did He not find you...' — orphaned and He sheltered, searching and He guided, in need and He provided. The Prophet's own biography converted into evidence. Three forms of human vulnerability answered before revelation even began." },
        { ayahs: "9–11", title: "The Instruction", color: "#4ecdc4", desc: "Three commands mirroring the three reminders. Do not oppress the orphan (you were one). Do not repel the one who asks (you were searching). Proclaim God's blessings (you were in need). Each mercy received becomes an obligation extended. The surah's final word is haddith — speak. The silence is over." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "Each mercy received becomes conduct required — the surah's skeleton",
      pairs: [
        {
          left: { label: "Orphan Sheltered", ayahs: "6", desc: "Did He not find you an orphan and give you shelter?" },
          right: { label: "Do Not Crush", ayahs: "9", desc: "So as for the orphan, do not oppress him." },
          color: "#e07a8a",
        },
        {
          left: { label: "Searching, Guided", ayahs: "7", desc: "He found you searching, so He guided you." },
          right: { label: "Do Not Repel", ayahs: "10", desc: "As for the one who asks, do not repel him." },
          color: "#9b7fd4",
        },
        {
          left: { label: "In Need, Provided", ayahs: "8", desc: "He found you in need, so He made you self-sufficient." },
          right: { label: "Proclaim", ayahs: "11", desc: "As for the blessing of your Lord, proclaim it." },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Open-Ended Promise", ayahs: "5",
        desc: "Your Lord will give you, and you will be satisfied.",
        note: "The pivot between divine reassurance and human responsibility. No limit named. No condition attached. The giving continues until the recipient says it is enough.",
      },
    },
    deductiveFunnel: {
      title: "From Light to Speech",
      subtitle: "The surah's arc: what God does → what the Prophet must do because of it",
      layers: [
        { depth: 1, label: "The Oath", ayah: "1–2", arabic: "وَالضُّحَىٰ · وَاللَّيْلِ إِذَا سَجَىٰ", desc: "Morning light and the still night. The pairing is the argument before the argument begins: the night is real, but morning always follows. Darkness is not absence — it is the quiet form of God's presence.", color: "#C9A84C" },
        { depth: 2, label: "The Denial", ayah: "3", arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", desc: "Two fears answered. Wadda'a — He has not left. Qala — He has not despised you. The first addresses the fear of being abandoned. The second addresses the deeper fear of being found unworthy.", color: "#e07a8a" },
        { depth: 3, label: "The Promise", ayah: "4–5", arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ", desc: "The Hereafter is better than this life. God will give until you are satisfied. The comfort addresses past and present; this promise addresses the future. Every direction from which despair could enter is sealed.", color: "#9b7fd4" },
        { depth: 4, label: "The Evidence", ayah: "6–8", arabic: "أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ", desc: "Three biographical proofs. Orphanhood answered with shelter. Searching answered with guidance. Need answered with sufficiency. The sequence follows the arc of the Prophet's life and is also universal.", color: "#4ecdc4" },
        { depth: 5, label: "The Speech", ayah: "9–11", arabic: "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ", desc: "The final word is haddith — speak. After a period of silence, God's last command is testimony. The silence is over, and the new speech is the voice of someone who was sheltered, guided, and provided for.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah with only two inhabitants — the Lord and the one He is consoling",
      absences: [
        { item: "No disbelievers mentioned", note: "No enemy is named. No category of opponent appears. The surah exists in a space between God and His messenger, and for these eleven ayahs everyone else is irrelevant." },
        { item: "No warnings or descriptions of judgment", note: "No fire, no punishment, no threat. The Hereafter appears only as a promise of something better. The surah's emotional register is entirely consolation." },
        { item: "No commands of worship", note: "No prayer, no fasting, no charity in the technical sense. The three commands are ethical — do not crush, do not repel, proclaim — not ritual. The surah addresses conduct toward others, not worship of God." },
        { item: "No theological argument", note: "No creation signs, no proofs of God's existence, no invitation to reflect on the natural world. The surah takes the relationship between God and the Prophet as already established and speaks entirely within it." },
        { item: "No explanation of the silence", note: "The surah does not explain why revelation paused. It does not promise it will never pause again. It says only: I am still here. I have always been here. And I have evidence." },
      ],
    },
  },

  contentNodes: [
    { concept: "Fa-tarda — the open-ended divine promise", type: "surah-specific", articleSlug: "fa-tarda-open-promise-93-5" },
    { concept: "The three-three mirror: mercy received → conduct required", type: "surah-specific", articleSlug: "three-three-mirror-93" },
    { concept: "Duha-Inshirah twin theology of consolation", type: "cross-surah", articleSlug: "duha-inshirah-consolation-pair" },
    { concept: "Haddith — from silence to testimony", type: "cross-surah", articleSlug: "haddith-silence-to-speech" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "triptych", label: "Triptych" },
  { id: "mirror", label: "Mirror" },
  { id: "arc", label: "Arc" },
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
            className={`rounded-xl p-4 space-y-2 border ${"isPivot" in sec && sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`}
            style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
            {"isPivot" in sec && (sec as { isPivot?: boolean }).isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}
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
        Oath → denial → promise → evidence → speech
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
          {activeTab === "triptych" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "arc" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
