"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-ADIYAT — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-adiyat
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Adiyat",
  arabicName: "العَادِيَات",
  meaning: "The Charging Horses",
  number: 100,
  ayahCount: 11,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "Eleven ayahs that put an animal's total loyalty next to a human being's barren ingratitude — and then open the ground beneath both. A surah where horses give everything and a species given everything gives nothing back.",
  reflectionUrl: "/surahs/al-adiyat",
  readTime: "15 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"sarf","english":"Morphology"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ",
    ayahRef: "100:6",
    translation: "Indeed, the human being is ungrateful to his Lord.",
    why: "The surah's single-line thesis. Kanud — a hapax legomenon, appearing only this once in the entire Quran — carries the image of soil so barren that nothing grows no matter how much rain falls. The human being receives endlessly and returns nothing. The emphatic construction inna ... la-kanud leaves no room for qualification.",
  },

  audio: { surahNumber: 100, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَالْعَادِيَاتِ ضَبْحًا", translation: "By the charging horses, panting —" },
    { ayah: 2, arabic: "فَالْمُورِيَاتِ قَدْحًا", translation: "striking sparks with their hooves —" },
    { ayah: 3, arabic: "فَالْمُغِيرَاتِ صُبْحًا", translation: "raiding at dawn —" },
    { ayah: 4, arabic: "فَأَثَرْنَ بِهِ نَقْعًا", translation: "raising clouds of dust —" },
    { ayah: 5, arabic: "فَوَسَطْنَ بِهِ جَمْعًا", translation: "and plunging into the midst of the enemy." },
    { ayah: 6, arabic: "إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ", translation: "Indeed, the human being is ungrateful to his Lord —" },
    { ayah: 7, arabic: "وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ", translation: "and he himself is witness to that —" },
    { ayah: 8, arabic: "وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ", translation: "and his love of wealth is fierce." },
    { ayah: 9, arabic: "أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ", translation: "Does he not know that when what is in the graves is overturned," },
    { ayah: 10, arabic: "وَحُصِّلَ مَا فِي الصُّدُورِ", translation: "and what is in the hearts is extracted —" },
    { ayah: 11, arabic: "إِنَّ رَبَّهُم بِهِمْ يَوْمَئِذٍ لَّخَبِيرٌ", translation: "indeed, their Lord, on that Day, is fully aware of them." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Charge",
      subtitle: "Three movements: oath → diagnosis → reckoning",
      sections: [
        { ayahs: "1–5", title: "The Oath", color: "#4ecdc4", desc: "Five images of war horses in battle, each tightening the frame: charging and panting (sound), striking sparks (light), raiding at dawn (time), raising dust (environment), plunging into the center of the mass (arrival). A cinematic escalation that mimics hoofbeats in its Arabic consonants. The horses give everything — breath, body, safety — without holding back." },
        { ayahs: "6–8", title: "The Diagnosis", color: "#C9A84C", isPivot: true, desc: "The pivot is total. From the physical world to the interior. The human being is kanud — barren ground that receives rain and yields nothing. He knows it (shahid — a witness against himself). And his love of wealth is shadid — fierce, clenched, unyielding. Three ayahs, three layers: condition, awareness, cause." },
        { ayahs: "9–11", title: "The Reckoning", color: "#e07a8a", desc: "A devastating question: does he not know what comes? Graves overturned — bu'thira — violently emptied. Hearts smelted — hussila — their contents extracted like ore refined from rock. And their Lord, on that Day, is khabir: intimately, penetratingly informed. He has always known what was held back." },
      ],
    },
    chiasticRing: {
      title: "The Frame",
      subtitle: "The surah opens with total giving and closes with total knowing — the human sits exposed between them",
      pairs: [
        {
          left: { label: "Horses Charge", ayahs: "1", desc: "The horses run, breathing hard — total physical exertion in service to their riders" },
          right: { label: "Graves Overturned", ayahs: "9", desc: "The dead expelled with the same violent energy — bu'thira — as the horses' charge" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Sparks & Dust", ayahs: "2–4", desc: "Friction, dawn, dust — the landscape transformed by the charge" },
          right: { label: "Hearts Smelted", ayahs: "10", desc: "The interior extracted — hussila — refined out like metal from ore" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Penetrate the Center", ayahs: "5", desc: "The horses arrive — wasatna — plunging into the heart of the mass" },
          right: { label: "The Lord Knows", ayahs: "11", desc: "God arrives at the center of the human being — khabir — fully, intimately informed" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Barren Ground", ayahs: "6–8",
        desc: "The human being is kanud to his Lord — and he is witness to it — and his grip on wealth is fierce.",
        note: "The pivot between physical loyalty and interior betrayal. The horses emptied themselves. The human clenched tighter.",
      },
    },
    deductiveFunnel: {
      title: "The Escalation",
      subtitle: "Five sensory layers build the oath, each adding a dimension until you are inside the battle",
      layers: [
        { depth: 1, label: "Sound", ayah: "1", arabic: "وَالْعَادِيَاتِ ضَبْحًا", desc: "The horses charging, breathing hard. Dabh is the guttural, heaving pant of a horse under exertion. The surah opens with sound before sight — you hear the cavalry before you see it.", color: "#4ecdc4" },
        { depth: 2, label: "Light", ayah: "2", arabic: "فَالْمُورِيَاتِ قَدْحًا", desc: "Hooves striking stone, producing sparks in pre-dawn darkness. The verb awra means to produce fire through friction. Sound gives way to light — sparks flying against black sky.", color: "#9b7fd4" },
        { depth: 3, label: "Time", ayah: "3", arabic: "فَالْمُغِيرَاتِ صُبْحًا", desc: "The raid at dawn — subha — when the enemy is most vulnerable and the dust cloud will be backlit by the rising sun. Sound, then light, now time: the moment is fixed.", color: "#e07a8a" },
        { depth: 4, label: "Environment", ayah: "4", arabic: "فَأَثَرْنَ بِهِ نَقْعًا", desc: "The dust cloud rising — naq' — the landscape itself transformed by the charge. The camera has pulled back to show the terrain responding to the cavalry.", color: "#C9A84C" },
        { depth: 5, label: "Arrival", ayah: "5", arabic: "فَوَسَطْنَ بِهِ جَمْعًا", desc: "They penetrate the center — wasatna. The camera plunges into the heart of the mass. The five layers complete: sound → light → time → environment → arrival.", color: "#4ecdc4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah diagnoses — it does not prescribe. Every absence sharpens the accusation.",
      absences: [
        { item: "No mention of Allah by name", note: "Only rabbihi ('his Lord') and rabbahum ('their Lord') — always in the possessive, always intimate. The ingratitude is personal: not disloyalty to a distant deity but to the One who nurtures you." },
        { item: "No moral instruction", note: "No 'so do this' or 'fear that.' The surah does not say 'be more grateful.' It says you are kanud, and you know it, and one day your heart will be smelted. The absence of prescription is the rhetorical strategy: the condition is too structural for a command to fix." },
        { item: "No prophets, no stories, no nations", note: "No destroyed civilizations, no narrative arc. The surah faces the human species as a whole — al-insan — with a single accusation. The scope is universal, not historical." },
        { item: "No explicit bridge between oath and verdict", note: "The surah never says 'the horses are loyal but you are not.' The connection is created entirely by juxtaposition. The listener must cross the gap. This silence between the oath and the diagnosis is the surah's deepest rhetorical act." },
        { item: "No comfort or mercy verse", note: "No consolation, no invitation, no path offered. The surah ends with a divine attribute — khabir — that functions as a verdict, not a reassurance. The ground opens and the surah stops." },
      ],
    },
  },

  contentNodes: [
    { concept: "Kanud — the hapax legomenon of barren ingratitude", type: "surah-specific", articleSlug: "kanud-barren-ground-100-6" },
    { concept: "Hussila — smelting the heart on the Last Day", type: "surah-specific", articleSlug: "hussila-heart-smelting-100-10" },
    { concept: "Az-Zalzalah–Al-Adiyat–Al-Qari'ah cluster", type: "cross-surah", articleSlug: "zalzalah-adiyat-qariah-cluster" },
    { concept: "Oath-surahs of Juz 30 — divine testimony patterns", type: "cross-surah", articleSlug: "oath-surahs-juz-30-patterns" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "charge", label: "Charge" },
  { id: "frame", label: "Frame" },
  { id: "escalation", label: "Escalation" },
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
        Sound → light → time → environment → arrival
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
          {activeTab === "charge" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "frame" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "escalation" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
