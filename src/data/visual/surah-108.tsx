"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-KAWTHAR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-kawthar
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Kawthar",
  arabicName: "الكوثر",
  meaning: "Abundance",
  number: 108,
  ayahCount: 3,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "Al-Kawthar is the surah that answers the deepest human grief — the fear of being cut off and forgotten — not with an argument but with a gift so vast that the accusation becomes its own refutation, and the accuser becomes the very thing he accused.",
  reflectionUrl: "/surahs/al-kawthar",
  readTime: "18 min read",

  heartVerse: {
    arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
    ayahRef: "108:1",
    translation: "Indeed, We have given you al-Kawthar.",
    why: "The structural center of the entire surah. Everything that follows — the command and the verdict — is a consequence of this single declaration. The gift precedes the response, and the response precedes the reversal. Ayah 1 already makes the accusation of abtar impossible.",
  },

  audio: { surahNumber: 108, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", translation: "Indeed, We have given you al-Kawthar." },
    { ayah: 2, arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", translation: "So pray to your Lord and sacrifice." },
    { ayah: 3, arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", translation: "Indeed, it is your enemy who is the one cut off." },
  ],

  diagrams: {
    deductiveFunnel: {
      title: "The Funnel",
      subtitle: "Three ayahs, three movements: gift → response → verdict",
      stages: [
        { ayahs: "1", title: "The Gift", arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", color: "#4ecdc4", desc: "The divine 'We,' the past tense of a completed act, the word that overflows its own definition. Before the gift is named, its certainty is established with a force that Arabic grammar reserves for statements that override all prior assumptions.", width: "100%" },
        { ayahs: "2", title: "The Response", arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ", color: "#d4a853", isPivot: true, desc: "The natural movement of a soul that has recognized the size of what it was given. Not an additional obligation — the only coherent answer to having received everything. Turn toward your Lord, not toward the accusers.", width: "75%" },
        { ayahs: "3", title: "The Verdict", arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", color: "#e07a8a", desc: "The accusation returned. The word abtar — spoken at the Prophet in his grief — now permanently fixed to the one who spoke it. The hunter becomes the hunted.", width: "50%" },
      ],
    },

    compression: {
      title: "Ten Words",
      subtitle: "The shortest surah in the Quran — every word is load-bearing",
      elements: [
        { label: "Inna", ayah: "1a", desc: "The emphatic particle that overrides doubt. A nasikh — it seizes control of the sentence, restructuring grammar around divine certainty. The grieving Prophet hears certainty before he hears the gift.", color: "#4ecdc4" },
        { label: "A'taynaka", ayah: "1b", desc: "We gave you. Past tense — already accomplished. The royal 'We' carries the weight of all that exists. The suffix -ka singles the Prophet out with intimate directness: I see you.", color: "#9b7fd4" },
        { label: "Al-Kawthar", ayah: "1c", desc: "The faw'al morphological form — not 'much' but abundance beyond the ability to measure. A river in Paradise, the largest ummah, intercession, the Quran itself. The word overflows its own definition.", color: "#d4a853" },
        { label: "Fa-salli", ayah: "2a", desc: "The consequential 'so' — because you were given everything, therefore pray. The gift creates not a burden but the only coherent response to abundance.", color: "#e0a848" },
        { label: "Li-rabbika", ayah: "2b", desc: "To your Lord — not 'to God' in the abstract but rabbika, the One who nurtures and sustains you. The possessive -ka again. Even in command, the relationship is personal.", color: "#4dbb9b" },
        { label: "Wanhar", ayah: "2c", desc: "And sacrifice. The act of offering back to God what He gave you — the same territory Ibrahim walked. What matters is not what you hold but Whom you hold it toward.", color: "#e07a8a" },
        { label: "Shani'aka", ayah: "3a", desc: "Your hater. Not named — the generality is the point. Anyone whose core orientation is hatred of this message, in any era, falls under this verdict.", color: "#c97a9b" },
        { label: "Huwa", ayah: "3b", desc: "He — the pronoun of separation. It isolates the subject with cold precision: not you, Muhammad. He alone.", color: "#8a88a0" },
        { label: "Al-Abtar", ayah: "3c", desc: "The very word the Quraysh used — cut off, severed, finished. Picked up exactly as spoken and returned to sender. The hunter becomes the hunted.", color: "#e87461" },
      ],
    },

    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence in Al-Kawthar is a design choice",
      absences: [
        { item: "No argument against the accusation", note: "The surah does not reason with the charge of abtar. It does not explain why sonlessness does not equal irrelevance. It simply announces a gift so vast that the accusation becomes absurd." },
        { item: "No enemy named", note: "Al-'As ibn Wa'il, Abu Jahl, Abu Lahab — all absent. The word shani'aka (your hater) is general. The verdict applies to every person, in every era, whose defining orientation is hatred." },
        { item: "No defense of legacy", note: "The surah never says 'actually, you do have a legacy.' It does not engage with the measuring stick at all. It redefines what continuation means — from bloodline to divine gift." },
        { item: "No promise of future sons", note: "The consolation is not biological replacement. The Prophet is not told he will have more children. The answer to 'cut off' is not 'connected' — it is 'overflowing beyond measure.'" },
        { item: "No timeline given", note: "History will confirm the verdict, but the surah does not say 'wait and see.' The past tense a'taynaka and the present-tense al-abtar declare both the gift and the verdict as already true." },
      ],
    },

    pronounMap: {
      title: "The Pronouns",
      subtitle: "How Allah maps three relationships in three ayahs: majesty, intimacy, and judgment",
      layers: [
        { ayahs: "1", pronoun: "Na / نا", label: "The Divine We", color: "#4ecdc4", desc: "Allah speaks of Himself with the royal plural — the pronoun of majesty. The giver is not an angel or a benefactor. The giver is the One who owns everything that exists." },
        { ayahs: "1–2", pronoun: "-ka / ـك", label: "You, Muhammad", color: "#d4a853", isPivot: true, desc: "The intimate possessive, repeated three times: a'taynaka (We gave you), rabbika (your Lord), shani'aka (your hater). In a surah addressed to a man told he is nothing, Allah says: I see you." },
        { ayahs: "3", pronoun: "Huwa / هو", label: "He — the Isolated", color: "#e07a8a", desc: "The cold distance of a verdict. The shift from the divine 'We' to the singular, isolated 'he' of the enemy is itself architecture. Majesty, intimacy, judgment — mapped by pronouns alone." },
      ],
    },
  },

  contentNodes: [
    { concept: "The faw'al morphological form — words that overflow their category", type: "cross-surah", articleSlug: "fawal-morphological-form-arabic" },
    { concept: "Inna as nasikh — words that restructure grammar around certainty", type: "surah-specific", articleSlug: "inna-nasikh-certainty-quran" },
    { concept: "The abtar reversal — when the accuser's word returns to him", type: "surah-specific", articleSlug: "abtar-reversal-surah-kawthar" },
    { concept: "Gift vs. construction — the Quranic grammar of receiving", type: "cross-surah", articleSlug: "gift-vs-construction-quran-grammar" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "funnel", label: "Funnel" },
  { id: "words", label: "Ten Words" },
  { id: "pronouns", label: "Pronouns" },
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

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3 flex flex-col items-center">
        {data.stages.map((stage, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 space-y-2 border ${stage.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`}
            style={{
              backgroundColor: stage.color + "0a",
              borderLeftWidth: "3px",
              borderLeftColor: stage.color,
              width: stage.width,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: stage.color }}>{stage.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayah {stage.ayahs}</span>
            </div>
            <p className="text-base leading-relaxed text-right text-cream-muted/50 font-amiri" style={{ direction: "rtl" }}>
              {stage.arabic}
            </p>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{stage.desc}</p>
            {stage.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        3 ayahs · 10 words · A closed circuit: gift, gratitude, verdict
      </div>
    </div>
  );
}

function CompressionViz({ data }: { data: typeof SURAH_DATA.diagrams.compression }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.elements.map((el, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? el.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: el.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: el.color }}>{el.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{el.ayah}</span>
            </div>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{el.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        3 ayahs · 10 words · The shortest surah in the Quran
      </div>
    </div>
  );
}

function PronounMap({ data }: { data: typeof SURAH_DATA.diagrams.pronounMap }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-3">
        {data.layers.map((layer, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 space-y-2 border ${layer.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`}
            style={{ backgroundColor: layer.color + "0a", borderLeftWidth: "3px", borderLeftColor: layer.color }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-serif" style={{ color: layer.color }}>{layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayah {layer.ayahs}</span>
            </div>
            <div className="text-lg text-center text-cream font-amiri">
              {layer.pronoun}
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{layer.desc}</p>
            {layer.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Repeated three times — the thread of intimacy</div>}
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Majesty → Intimacy → Judgment — mapped by pronouns alone
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
          {activeTab === "funnel" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "words" && <CompressionViz data={d.diagrams.compression} />}
          {activeTab === "pronouns" && <PronounMap data={d.diagrams.pronounMap} />}
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
