"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-BALAD — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-balad
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Balad",
  arabicName: "البَلَد",
  meaning: "The City",
  number: 90,
  ayahCount: 20,
  period: "Makki",
  juz: 30,
  movements: 4,
  thesis:
    "A twenty-ayah surah that grabs you by the collar at the foot of the mountain pass and says: you were made for this climb. Stop boasting about what you have spent and start freeing the people chained beside you.",
  reflectionUrl: "/surahs/al-balad",
  readTime: "18 min read",

  heartVerse: {
    arabic: "\u0641\u064E\u0644\u064E\u0627 \u0627\u0642\u0652\u062A\u064E\u062D\u064E\u0645\u064E \u0627\u0644\u0652\u0639\u064E\u0642\u064E\u0628\u064E\u0629\u064E",
    ayahRef: "90:11",
    translation: "But he has not charged the steep path.",
    why: "The structural and emotional center of the entire surah. The verb iqtahama means to plunge into, to storm, to assault \u2014 language of military courage applied to moral action. The surah takes the very language of masculine strength that Makkan culture celebrated and redirects it: you want to prove your strength? Here is the real battle.",
  },

  audio: { surahNumber: 90, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "\u0644\u064E\u0627 \u0623\u064F\u0642\u0652\u0633\u0650\u0645\u064F \u0628\u0650\u0647\u064E\u0670\u0630\u064E\u0627 \u0627\u0644\u0652\u0628\u064E\u0644\u064E\u062F\u0650", translation: "I do swear by this city \u2014" },
    { ayah: 2, arabic: "\u0648\u064E\u0623\u064E\u0646\u062A\u064E \u062D\u0650\u0644\u064C\u0651 \u0628\u0650\u0647\u064E\u0670\u0630\u064E\u0627 \u0627\u0644\u0652\u0628\u064E\u0644\u064E\u062F\u0650", translation: "and you are a lawful resident of this city \u2014" },
    { ayah: 3, arabic: "\u0648\u064E\u0648\u064E\u0627\u0644\u0650\u062F\u064D \u0648\u064E\u0645\u064E\u0627 \u0648\u064E\u0644\u064E\u062F\u064E", translation: "and by a parent and what he fathered \u2014" },
    { ayah: 4, arabic: "\u0644\u064E\u0642\u064E\u062F\u0652 \u062E\u064E\u0644\u064E\u0642\u0652\u0646\u064E\u0627 \u0627\u0644\u0652\u0625\u0650\u0646\u0633\u064E\u0627\u0646\u064E \u0641\u0650\u064A \u0643\u064E\u0628\u064E\u062F\u064D", translation: "We created the human being in toil." },
    { ayah: 5, arabic: "\u0623\u064E\u064A\u064E\u062D\u0652\u0633\u064E\u0628\u064F \u0623\u064E\u0646 \u0644\u064E\u0651\u0646 \u064A\u064E\u0642\u0652\u062F\u0650\u0631\u064E \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650 \u0623\u064E\u062D\u064E\u062F\u0652", translation: "Does he think that no one has power over him?" },
    { ayah: 6, arabic: "\u064A\u064E\u0642\u064F\u0648\u0644\u064F \u0623\u064E\u0647\u0652\u0644\u064E\u0643\u0652\u062A\u064F \u0645\u064E\u0627\u0644\u064B\u0627 \u0644\u064F\u0628\u064E\u062F\u064B\u0627", translation: "He says: 'I have spent wealth in abundance.'" },
    { ayah: 7, arabic: "\u0623\u064E\u064A\u064E\u062D\u0652\u0633\u064E\u0628\u064F \u0623\u064E\u0646 \u0644\u064E\u0651\u0645\u0652 \u064A\u064E\u0631\u064E\u0647\u064F \u0623\u064E\u062D\u064E\u062F\u0652", translation: "Does he think no one has seen him?" },
    { ayah: 8, arabic: "\u0623\u064E\u0644\u064E\u0645\u0652 \u0646\u064E\u062C\u0652\u0639\u064E\u0644 \u0644\u064E\u0651\u0647\u064F \u0639\u064E\u064A\u0652\u0646\u064E\u064A\u0652\u0646\u0650", translation: "Did We not make for him two eyes," },
    { ayah: 9, arabic: "\u0648\u064E\u0644\u0650\u0633\u064E\u0627\u0646\u064B\u0627 \u0648\u064E\u0634\u064E\u0641\u064E\u062A\u064E\u064A\u0652\u0646\u0650", translation: "and a tongue and two lips," },
    { ayah: 10, arabic: "\u0648\u064E\u0647\u064E\u062F\u064E\u064A\u0652\u0646\u064E\u0627\u0647\u064F \u0627\u0644\u0646\u064E\u0651\u062C\u0652\u062F\u064E\u064A\u0652\u0646\u0650", translation: "and shown him the two paths?" },
    { ayah: 11, arabic: "\u0641\u064E\u0644\u064E\u0627 \u0627\u0642\u0652\u062A\u064E\u062D\u064E\u0645\u064E \u0627\u0644\u0652\u0639\u064E\u0642\u064E\u0628\u064E\u0629\u064E", translation: "But he has not charged the steep path." },
    { ayah: 12, arabic: "\u0648\u064E\u0645\u064E\u0627 \u0623\u064E\u062F\u0652\u0631\u064E\u0627\u0643\u064E \u0645\u064E\u0627 \u0627\u0644\u0652\u0639\u064E\u0642\u064E\u0628\u064E\u0629\u064F", translation: "And what will make you know what the steep path is?" },
    { ayah: 13, arabic: "\u0641\u064E\u0643\u064F\u0651 \u0631\u064E\u0642\u064E\u0628\u064E\u0629\u064D", translation: "It is the freeing of a neck," },
    { ayah: 14, arabic: "\u0623\u064E\u0648\u0652 \u0625\u0650\u0637\u0652\u0639\u064E\u0627\u0645\u0652 \u0641\u0650\u064A \u064A\u064E\u0648\u0652\u0645\u064D \u0630\u0650\u064A \u0645\u064E\u0633\u0652\u063A\u064E\u0628\u064E\u0629\u064D", translation: "or feeding on a day of hunger" },
    { ayah: 15, arabic: "\u064A\u064E\u062A\u0650\u064A\u0645\u064B\u0627 \u0630\u064E\u0627 \u0645\u064E\u0642\u0652\u0631\u064E\u0628\u064E\u0629\u064D", translation: "an orphan of near relation," },
    { ayah: 16, arabic: "\u0623\u064E\u0648\u0652 \u0645\u0650\u0633\u0652\u0643\u0650\u064A\u0646\u064B\u0627 \u0630\u064E\u0627 \u0645\u064E\u062A\u0652\u0631\u064E\u0628\u064E\u0629\u064D", translation: "or a destitute person in the dust." },
    { ayah: 17, arabic: "\u062B\u064F\u0645\u064E\u0651 \u0643\u064E\u0627\u0646\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u064E\u0651\u0630\u0650\u064A\u0646\u064E \u0622\u0645\u064E\u0646\u064F\u0648\u0627 \u0648\u064E\u062A\u064E\u0648\u064E\u0627\u0635\u064E\u0648\u0652\u0627 \u0628\u0650\u0627\u0644\u0635\u064E\u0651\u0628\u0652\u0631\u0650 \u0648\u064E\u062A\u064E\u0648\u064E\u0627\u0635\u064E\u0648\u0652\u0627 \u0628\u0650\u0627\u0644\u0652\u0645\u064E\u0631\u0652\u062D\u064E\u0645\u064E\u0629\u0650", translation: "Then to be among those who believe and urge one another to patience and urge one another to mercy." },
    { ayah: 18, arabic: "\u0623\u064F\u0648\u0644\u064E\u0670\u0626\u0650\u0643\u064E \u0623\u064E\u0635\u0652\u062D\u064E\u0627\u0628\u064F \u0627\u0644\u0652\u0645\u064E\u064A\u0652\u0645\u064E\u0646\u064E\u0629\u0650", translation: "Those are the companions of the right hand." },
    { ayah: 19, arabic: "\u0648\u064E\u0627\u0644\u064E\u0651\u0630\u0650\u064A\u0646\u064E \u0643\u064E\u0641\u064E\u0631\u064F\u0648\u0627 \u0628\u0650\u0622\u064A\u064E\u0627\u062A\u0650\u0646\u064E\u0627 \u0647\u064F\u0645\u0652 \u0623\u064E\u0635\u0652\u062D\u064E\u0627\u0628\u064F \u0627\u0644\u0652\u0645\u064E\u0634\u0652\u0623\u064E\u0645\u064E\u0629\u0650", translation: "And those who disbelieve in Our signs \u2014 those are the companions of the left hand." },
    { ayah: 20, arabic: "\u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650\u0645\u0652 \u0646\u064E\u0627\u0631\u0651 \u0645\u064F\u0651\u0624\u0652\u0635\u064E\u062F\u064E\u0629\u0652", translation: "Over them is a fire, sealed in." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Ascent",
      subtitle: "Four movements: oath \u2192 indictment \u2192 the steep path \u2192 verdict",
      sections: [
        { ayahs: "1\u20134", title: "The Oath and the Claim", color: "#4ecdc4", desc: "God swears by Makkah while the Prophet walks its streets unprotected. The city is sacred, but its finest inhabitant has been made lawful to harm. Then the foundational claim: We created the human being in toil. Life is struggle by design \u2014 not punishment but the basic terms of existence." },
        { ayahs: "5\u201310", title: "The Indictment", color: "#e07a8a", desc: "The arrogant spender appears \u2014 boasting of wealth consumed, imagining no one sees. Two paired delusions: he thinks no one overpowers him, he thinks no one watches. Then the voice quiets and inventories divine gifts \u2014 two eyes, a tongue, two lips, and the two paths. The problem is not capacity. It is will." },
        { ayahs: "11\u201317", title: "The Steep Path", color: "#C9A84C", isPivot: true, desc: "The surah\u2019s structural center. The \u02BFaqabah \u2014 the mountain pass \u2014 defined with radical specificity: freeing a neck from bondage, feeding an orphan of relation, feeding a destitute person in the dust. Then: to be among those who believe and urge one another to patience and mercy. The moral vision is radically physical." },
        { ayahs: "18\u201320", title: "The Verdict", color: "#9b7fd4", desc: "Swift and binary. Companions of the right hand, companions of the left hand. Over the second group: fire, sealed in \u2014 mu\u2019sadah. After a surah of open images \u2014 the city, the mountain pass \u2014 the final image is confinement. The one who refused to free the neck finds their own space sealed." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The open city and the sealed fire \u2014 the surah\u2019s architecture bends around a single question",
      pairs: [
        {
          left: { label: "The open city", ayahs: "1\u20132", desc: "Makkah, wide, sacred, full of people \u2014 but its prophet walks unprotected. The oath sanctifies the space while exposing its failure." },
          right: { label: "The sealed fire", ayahs: "19\u201320", desc: "Fire mu\u2019sadah \u2014 closed, vaulted, sealed. After the surah\u2019s open images, the final image is total confinement." },
          color: "#e07a8a",
        },
        {
          left: { label: "Created in toil", ayahs: "3\u20134", desc: "The human being made for struggle \u2014 kabad. The condition is named but not yet given direction." },
          right: { label: "Patience and mercy", ayahs: "17", desc: "The communal response to struggle \u2014 urging one another to sabr and marhama. The condition now has its answer." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The arrogant spender", ayahs: "5\u20137", desc: "Wealth consumed as spectacle, the delusion that no one watches. The wrong use of strength." },
          right: { label: "Freeing and feeding", ayahs: "13\u201316", desc: "The right use of strength \u2014 breaking a yoke, placing food before a child, sitting in dust with the destitute." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Steep Path", ayahs: "11\u201312",
        desc: "Fa-la qtahama l-\u2019aqabah. But he has not charged the steep path. And what will make you know what the steep path is?",
        note: "The question at the top of the pass, looking both ways. Everything before it shows what you are wasting. Everything after shows what the ascent requires.",
      },
    },
    deductiveFunnel: {
      title: "The Confrontation",
      subtitle: "From the city to the body to the mountain pass \u2014 each layer gets closer to the bone",
      layers: [
        { depth: 1, label: "The city", ayah: "1\u20132", arabic: "\u0644\u064E\u0627 \u0623\u064F\u0642\u0652\u0633\u0650\u0645\u064F \u0628\u0650\u0647\u064E\u0670\u0630\u064E\u0627 \u0627\u0644\u0652\u0628\u064E\u0644\u064E\u062F\u0650", desc: "Makkah sworn by as sacred, but its prophet made lawful to harm. The widest frame \u2014 a whole city, its honor and its dishonor.", color: "#4ecdc4" },
        { depth: 2, label: "The body", ayah: "8\u201310", arabic: "\u0623\u064E\u0644\u064E\u0645\u0652 \u0646\u064E\u062C\u0652\u0639\u064E\u0644 \u0644\u064E\u0651\u0647\u064F \u0639\u064E\u064A\u0652\u0646\u064E\u064A\u0652\u0646\u0650", desc: "The frame narrows to the human body \u2014 eyes to see, tongue and lips to speak, two paths to choose. An anatomical inventory of capacity.", color: "#e07a8a" },
        { depth: 3, label: "The pass", ayah: "11\u201312", arabic: "\u0641\u064E\u0644\u064E\u0627 \u0627\u0642\u0652\u062A\u064E\u062D\u064E\u0645\u064E \u0627\u0644\u0652\u0639\u064E\u0642\u064E\u0628\u064E\u0629\u064E", desc: "The narrowest point \u2014 the mountain pass itself. Military language applied to moral action. The real battle is not conquest but mercy.", color: "#C9A84C" },
        { depth: 4, label: "The neck and the dust", ayah: "13\u201316", arabic: "\u0641\u064E\u0643\u064F\u0651 \u0631\u064E\u0642\u064E\u0628\u064E\u0629\u064D", desc: "The most specific point \u2014 a neck locked in a yoke, a hungry child who shares your blood, a body in the dirt. The surah will not let you generalize your way past it.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "The surah strips the moral argument to its most elemental form",
      absences: [
        { item: "No theology until the end", note: "The word Allah does not appear until the closing formula about the companions of the left hand. No Day of Judgment by name. No angels. No revelation. The surah makes its moral case without theological apparatus \u2014 making the indictment more, not less, severe." },
        { item: "No stories, no prophets, no destroyed nations", note: "Unlike Al-Fajr directly before it, there are no narratives, no civilizational ruins, no historical evidence. Just the city, the human being, and the mountain pass. The argument is entirely present-tense." },
        { item: "No description of paradise", note: "The companions of the right hand receive no reward description. No rivers, no shade, no gardens. The surah defines the right path but does not decorate the destination. The steep path is its own justification." },
        { item: "No abstract ethics", note: "The surah does not say \u2018be generous.\u2019 It says: here is the neck in chains, here is the hungry child, here is the body in the dirt. Act. The moral vision is radically physical and will not accept generalization." },
        { item: "No ease", note: "The surah opens with kabad \u2014 toil \u2014 and never promises its absence. Both paths are uphill (najdayn shares a root with elevated ground). The alternative to the wrong struggle is not comfort but the right struggle, taken with others who urge patience and mercy." },
      ],
    },
  },

  contentNodes: [
    { concept: "Al-\u2019aqabah \u2014 the steep path as moral metaphor", type: "surah-specific", articleSlug: "aqabah-steep-path-90" },
    { concept: "Tawassaw bi-l-marhamah \u2014 the unique mercy formula", type: "surah-specific", articleSlug: "tawassaw-marhamah-90-17" },
    { concept: "Fajr-Balad-Shams triad \u2014 three scales of moral reckoning", type: "cross-surah", articleSlug: "fajr-balad-shams-triad" },
    { concept: "Kabad \u2014 creation into struggle", type: "cross-surah", articleSlug: "kabad-creation-struggle-90-4" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "ascent", label: "Ascent" },
  { id: "ring", label: "Ring" },
  { id: "confrontation", label: "Confrontation" },
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
          {playing ? "\u23F8" : "\u25B6"}
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
        City {"\u2192"} body {"\u2192"} mountain pass {"\u2192"} neck and dust
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

        {/* -- Tab bar ------------------------------------------------------- */}
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

        {/* -- Tab content --------------------------------------------------- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "ascent" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "confrontation" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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

        {/* -- Go Deeper ----------------------------------------------------- */}
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
