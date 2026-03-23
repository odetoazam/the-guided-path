"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-HUMAZA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-humaza
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Humaza",
  arabicName: "الهُمَزة",
  meaning: "The Backbiter",
  number: 104,
  ayahCount: 9,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "A nine-ayah autopsy of the moment a human being replaces faith in God with faith in accumulation — and a fire that knows exactly where that replacement was made.",
  reflectionUrl: "/surahs/al-humaza",
  readTime: "15 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "كَلَّا ۖ لَيُنبَذَنَّ فِي الْحُطَمَةِ",
    ayahRef: "104:4",
    translation: "Absolutely not. He will be thrown into the Crusher.",
    why: "The single-word pivot of the entire surah. Everything before it is the portrait — behavior, psychology, delusion. Everything after is the divine consequence. Kalla is the door between the two worlds, and it swings only one way.",
  },

  audio: { surahNumber: 104, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ", translation: "Destruction to every backbiter, slanderer —" },
    { ayah: 2, arabic: "الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ", translation: "the one who gathered wealth and counted it repeatedly —" },
    { ayah: 3, arabic: "يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ", translation: "thinking that his wealth would make him last forever." },
    { ayah: 4, arabic: "كَلَّا ۖ لَيُنبَذَنَّ فِي الْحُطَمَةِ", translation: "Absolutely not. He will be thrown into the Crusher." },
    { ayah: 5, arabic: "وَمَا أَدْرَاكَ مَا الْحُطَمَةُ", translation: "And what could make you understand what the Crusher is?" },
    { ayah: 6, arabic: "نَارُ اللَّهِ الْمُوقَدَةُ", translation: "The kindled Fire of Allah —" },
    { ayah: 7, arabic: "الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ", translation: "which mounts upon the hearts." },
    { ayah: 8, arabic: "إِنَّهَا عَلَيْهِم مُّؤْصَدَةٌ", translation: "It is sealed over them —" },
    { ayah: 9, arabic: "فِي عَمَدٍ مُّمَدَّدَةٍ", translation: "in pillars, extended." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Courtroom",
      subtitle: "Three movements: portrait → verdict → unveiling",
      sections: [
        { ayahs: "1–3", title: "The Indictment", color: "#e07a8a", desc: "The crime is drawn in three layers. First the behavior — backbiting, slandering. Then the mechanism — obsessive accumulation and counting. Finally the root delusion — he genuinely believes his wealth has made him immortal." },
        { ayahs: "4", title: "The Verdict", color: "#C9A84C", isPivot: true, desc: "One word — kalla — pivots the entire surah. The Quran's most forceful negation. The man who spent his life acquiring is now a passive object, hurled. The verb yunbadh means to be flung like something worthless." },
        { ayahs: "5–9", title: "The Unveiling", color: "#9b7fd4", desc: "A fire with a name no one has heard — al-Hutama, the Crusher. It peers into the hearts, reads what is stored there, and burns according to what it finds. Sealed over him in pillars that stretch beyond sight." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah's opening and closing form a precise inversion",
      pairs: [
        {
          left: { label: "The Crushing", ayahs: "1", desc: "Humaza — one who crushes others with slander and mockery" },
          right: { label: "The Crusher", ayahs: "8–9", desc: "Sealed in al-Hutama — what he did to others becomes what contains him" },
          color: "#e07a8a",
        },
        {
          left: { label: "Gathering", ayahs: "2–3", desc: "Gathering wealth, counting it, believing it grants permanence" },
          right: { label: "True Permanence", ayahs: "5–7", desc: "The Fire of Allah, sustained — which knows the hearts where the delusion was stored" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Door", ayahs: "4",
        desc: "Kalla! He will be thrown into the Crusher.",
        note: "The pivot between the human world and the divine response. The word kalla is the door, and it swings only one way.",
      },
    },
    deductiveFunnel: {
      title: "The Autopsy",
      subtitle: "Each ayah peels back one more layer until the root is exposed",
      layers: [
        { depth: 1, label: "Behavior", ayah: "1", arabic: "هُمَزَةٍ لُّمَزَةٍ", desc: "The visible symptom — backbiting in absence (hamz), mocking to the face (lamz). His fundamental relationship with others is one of diminishment.", color: "#4ecdc4" },
        { depth: 2, label: "Mechanism", ayah: "2", arabic: "جَمَعَ مَالًا وَعَدَّدَهُ", desc: "The engine beneath the cruelty — obsessive accumulation. The verb 'addada is intensive: to count and recount, to keep running the tally.", color: "#9b7fd4" },
        { depth: 3, label: "Delusion", ayah: "3", arabic: "يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ", desc: "The root pathology — he genuinely believes his wealth has made him immortal. Accumulation as substitute theology.", color: "#e07a8a" },
        { depth: 4, label: "Correction", ayah: "4", arabic: "كَلَّا", desc: "Diagnosis complete. One word closes the file. Everything after this is consequence.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah has already closed the file — every absence is a verdict",
      absences: [
        { item: "No name for the subject", note: "The man who slanders, counts, and believes in his own permanence has no name. The anonymity is the universality — a verdict on a type, not a person." },
        { item: "No mention of Allah (until the Fire)", note: "Allah appears only once, in ayah 6, as the owner of the Fire. He is not addressed, not praised, not petitioned." },
        { item: "No address to the Prophet", note: "No 'O Messenger,' no consolation, no instruction. The surah speaks past the Prophet to deliver its verdict directly." },
        { item: "No path to repentance", note: "No tawba, no moral instruction, no opportunity within the surah's frame. This is a surah that has already closed the file." },
        { item: "No believers, no community", note: "No 'O you who believe,' no ummah. The surah exists in a space between the individual and his consequence — no one else is in the room." },
      ],
    },
  },

  contentNodes: [
    { concept: "Al-Hutama — the unique name for the Fire", type: "surah-specific", articleSlug: "al-hutama-crusher-fire-104" },
    { concept: "The fire that reads the hearts", type: "surah-specific", articleSlug: "fire-reads-hearts-104-7" },
    { concept: "Humaza-Takathur diptych", type: "cross-surah", articleSlug: "takathur-humaza-diptych" },
    { concept: "Yahsabu — accumulation as substitute theology", type: "cross-surah", articleSlug: "yahsabu-accumulation-theology" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "courtroom", label: "Courtroom" },
  { id: "mirror", label: "Mirror" },
  { id: "autopsy", label: "Autopsy" },
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
          {playing ? "⏸" : "▶"}
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
        Surface → mechanism → delusion → verdict
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
          {activeTab === "courtroom" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "autopsy" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
