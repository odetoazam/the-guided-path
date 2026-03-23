"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-FAJR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-fajr
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Fajr",
  arabicName: "الفَجر",
  meaning: "The Dawn",
  number: 89,
  ayahCount: 30,
  period: "Makki",
  juz: 30,
  movements: 5,
  thesis:
    "A surah that opens with the dawn and closes with a whisper to a single soul — tracing the disease of confusing provision with worth from the ruins of empires to the interior of the human heart, and curing it with four words of divine intimacy.",
  reflectionUrl: "/surahs/al-fajr",
  readTime: "20 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"qasas","english":"Quranic Narratives"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً",
    ayahRef: "89:27–28",
    translation: "O soul at rest, return to your Lord, well-pleased and well-pleasing.",
    why: "After twenty-six ayahs of civilizational destruction, moral exposure, and eschatological reckoning, the surah narrows to a single soul addressed in the feminine singular — intimate, personal, tender. The shift from plural judgment to singular invitation is one of the most dramatic rhetorical moves in the final juz.",
  },

  audio: { surahNumber: 89, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَالْفَجْرِ", translation: "By the dawn," },
    { ayah: 2, arabic: "وَلَيَالٍ عَشْرٍ", translation: "and the ten nights," },
    { ayah: 3, arabic: "وَالشَّفْعِ وَالْوَتْرِ", translation: "and the even and the odd," },
    { ayah: 4, arabic: "وَاللَّيْلِ إِذَا يَسْرِ", translation: "and the night as it departs —" },
    { ayah: 5, arabic: "هَلْ فِي ذَٰلِكَ قَسَمٌ لِّذِي حِجْرٍ", translation: "is there in that an oath for one of understanding?" },
    { ayah: 6, arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِعَادٍ", translation: "Have you not seen how your Lord dealt with 'Ad —" },
    { ayah: 7, arabic: "إِرَمَ ذَاتِ الْعِمَادِ", translation: "Iram, of the lofty pillars," },
    { ayah: 8, arabic: "الَّتِي لَمْ يُخْلَقْ مِثْلُهَا فِي الْبِلَادِ", translation: "the like of which had never been created in the land?" },
    { ayah: 9, arabic: "وَثَمُودَ الَّذِينَ جَابُوا الصَّخْرَ بِالْوَادِ", translation: "And Thamud, who carved the rocks in the valley?" },
    { ayah: 10, arabic: "وَفِرْعَوْنَ ذِي الْأَوْتَادِ", translation: "And Pharaoh, of the stakes?" },
    { ayah: 11, arabic: "الَّذِينَ طَغَوْا فِي الْبِلَادِ", translation: "All of whom transgressed in the lands" },
    { ayah: 12, arabic: "فَأَكْثَرُوا فِيهَا الْفَسَادَ", translation: "and spread much corruption therein." },
    { ayah: 13, arabic: "فَصَبَّ عَلَيْهِمْ رَبُّكَ سَوْطَ عَذَابٍ", translation: "So your Lord poured upon them a scourge of punishment." },
    { ayah: 14, arabic: "إِنَّ رَبَّكَ لَبِالْمِرْصَادِ", translation: "Indeed, your Lord is ever watchful." },
    { ayah: 15, arabic: "فَأَمَّا الْإِنسَانُ إِذَا مَا ابْتَلَاهُ رَبُّهُ فَأَكْرَمَهُ وَنَعَّمَهُ فَيَقُولُ رَبِّي أَكْرَمَنِ", translation: "As for the human being — when his Lord tests him by honoring and favoring him, he says: 'My Lord has honored me.'" },
    { ayah: 16, arabic: "وَأَمَّا إِذَا مَا ابْتَلَاهُ فَقَدَرَ عَلَيْهِ رِزْقَهُ فَيَقُولُ رَبِّي أَهَانَنِ", translation: "But when He tests him by restricting his provision, he says: 'My Lord has humiliated me.'" },
    { ayah: 17, arabic: "كَلَّا ۖ بَل لَّا تُكْرِمُونَ الْيَتِيمَ", translation: "No! Rather, you do not honor the orphan," },
    { ayah: 18, arabic: "وَلَا تَحَاضُّونَ عَلَىٰ طَعَامِ الْمِسْكِينِ", translation: "nor do you encourage the feeding of the poor," },
    { ayah: 19, arabic: "وَتَأْكُلُونَ التُّرَاثَ أَكْلًا لَّمًّا", translation: "and you consume the inheritance with sweeping greed," },
    { ayah: 20, arabic: "وَتُحِبُّونَ الْمَالَ حُبًّا جَمًّا", translation: "and you love wealth with an excessive love." },
    { ayah: 21, arabic: "كَلَّا إِذَا دُكَّتِ الْأَرْضُ دَكًّا دَكًّا", translation: "No! When the earth is crushed, pounding upon pounding," },
    { ayah: 22, arabic: "وَجَاءَ رَبُّكَ وَالْمَلَكُ صَفًّا صَفًّا", translation: "and your Lord comes, and the angels rank upon rank," },
    { ayah: 23, arabic: "وَجِيءَ يَوْمَئِذٍ بِجَهَنَّمَ ۚ يَوْمَئِذٍ يَتَذَكَّرُ الْإِنسَانُ وَأَنَّىٰ لَهُ الذِّكْرَىٰ", translation: "and Jahannam is brought near — on that Day, the human being will remember. But what good will remembrance be to him?" },
    { ayah: 24, arabic: "يَقُولُ يَا لَيْتَنِي قَدَّمْتُ لِحَيَاتِي", translation: "He will say: 'If only I had sent ahead something for my life.'" },
    { ayah: 25, arabic: "فَيَوْمَئِذٍ لَّا يُعَذِّبُ عَذَابَهُ أَحَدٌ", translation: "On that Day, none will punish as He punishes," },
    { ayah: 26, arabic: "وَلَا يُوثِقُ وَثَاقَهُ أَحَدٌ", translation: "and none will bind as He binds." },
    { ayah: 27, arabic: "يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ", translation: "O soul at rest," },
    { ayah: 28, arabic: "ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً", translation: "return to your Lord, well-pleased and well-pleasing." },
    { ayah: 29, arabic: "فَادْخُلِي فِي عِبَادِي", translation: "Enter among My servants," },
    { ayah: 30, arabic: "وَادْخُلِي جَنَّتِي", translation: "and enter My garden." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Reckoning",
      subtitle: "Five movements: oaths \u2192 civilizational evidence \u2192 human diagnosis \u2192 Day of Regret \u2192 invitation home",
      sections: [
        { ayahs: "1\u20135", title: "The Oaths", color: "#4ecdc4", desc: "Four oaths stacked without explanation \u2014 dawn, ten nights, the even and odd, the departing night \u2014 creating a pressure that demands resolution. None are explained. The answer to the oath is debated, but many scholars locate it at ayah 14: your Lord is ever watchful." },
        { ayahs: "6\u201314", title: "The Civilizational Evidence", color: "#e07a8a", desc: "\u02BFAd\u2019s impossible pillars, Thamud\u2019s rock-carved cities, Pharaoh\u2019s stakes \u2014 presented as forensic evidence, not narratives. No prophets are named. No dialogue is recorded. These civilizations appear as exhibits in a case, arriving at a five-word verdict: your Lord is at the watchtower." },
        { ayahs: "15\u201320", title: "The Human Diagnosis", color: "#C9A84C", isPivot: true, desc: "The sharpest pivot in the surah. From empires to the individual heart. The human reads wealth as honor, poverty as humiliation \u2014 and the surah issues kalla. Then four failures: not honoring orphans, not feeding the poor, devouring inheritance, loving wealth excessively. The disease that destroyed empires operates at the personal scale." },
        { ayahs: "21\u201326", title: "The Day and the Regret", color: "#9b7fd4", desc: "The earth is crushed, Jahannam is brought near, and the human being finally remembers \u2014 but remembrance has come too late. The regret is voiced: if only I had sent ahead something for my real life. The One who watched now acts." },
        { ayahs: "27\u201330", title: "The Invitation Home", color: "#4ecdc4", desc: "The voice changes entirely. After twenty-six ayahs of reckoning, a private address to a single soul \u2014 O soul at rest, return to your Lord, well-pleased and well-pleasing. Enter among My servants. Enter My garden. The possessive is striking: not the garden, but My garden." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah\u2019s opening and closing form a precise arc from the cosmic to the intimate",
      pairs: [
        {
          left: { label: "Dawn & cosmic oaths", ayahs: "1\u20135", desc: "The universe governed by rhythms \u2014 dawn, night, the even and odd. Impersonal, majestic, awaiting resolution." },
          right: { label: "The invitation home", ayahs: "27\u201330", desc: "A single soul addressed by name, called home, invited into a garden that belongs to God personally. Intimacy replaces grandeur." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Civilizational excess", ayahs: "6\u20138", desc: "\u02BFAd\u2019s pillars, the like of which had never been created \u2014 unprecedented power at civilizational scale." },
          right: { label: "Personal excess", ayahs: "19\u201320", desc: "Devouring inheritance with sweeping greed, loving wealth with excessive love \u2014 unprecedented appetite at personal scale." },
          color: "#e07a8a",
        },
        {
          left: { label: "God at the watchtower", ayahs: "14", desc: "Inna rabbaka la-bi-l-mirsad \u2014 divine surveillance, five words carrying three civilizations\u2019 weight." },
          right: { label: "God acts", ayahs: "25\u201326", desc: "None will punish as He punishes, none will bind as He binds \u2014 the watcher steps forward." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Diagnosis", ayahs: "15\u201318",
        desc: "Kalla \u2014 No. The human reads provision as verdict on their worth. The same disease that built and destroyed empires now diagnosed in you.",
        note: "The pivot from external to internal. From \u02BFAd\u2019s pillars to the individual heart. The scale changes; the pathology doesn\u2019t.",
      },
    },
    deductiveFunnel: {
      title: "The Exposure",
      subtitle: "From cosmic oath to personal psychology \u2014 each layer strips one more covering",
      layers: [
        { depth: 1, label: "Cosmic frame", ayah: "1\u20135", arabic: "\u0648\u064E\u0627\u0644\u0652\u0641\u064E\u062C\u0652\u0631\u0650", desc: "Oaths invoking dawn, night, rhythms of the universe. The grandest possible frame, establishing that what follows carries divine weight.", color: "#4ecdc4" },
        { depth: 2, label: "Historical wreckage", ayah: "6\u201314", arabic: "\u0623\u064E\u0644\u064E\u0645\u0652 \u062A\u064E\u0631\u064E \u0643\u064E\u064A\u0652\u0641\u064E \u0641\u064E\u0639\u064E\u0644\u064E \u0631\u064E\u0628\u064F\u0643\u064E \u0628\u0650\u0639\u064E\u0627\u062F\u064D", desc: "From cosmic imagery to civilizational ruins. Three empires reduced to single identifying features and one shared verdict: they spread corruption, and God was watching.", color: "#e07a8a" },
        { depth: 3, label: "Personal pathology", ayah: "15\u201320", arabic: "\u0641\u064E\u0623\u064E\u0645\u064E\u0651\u0627 \u0627\u0644\u0652\u0625\u0650\u0646\u0633\u064E\u0627\u0646\u064F", desc: "The sharpest transition. From \u02BFAd\u2019s pillars to the human soul. The disease is the same at every scale: confusing provision with divine commentary on your worth.", color: "#C9A84C" },
        { depth: 4, label: "The soul addressed", ayah: "27\u201330", arabic: "\u064A\u064E\u0627 \u0623\u064E\u064A\u064E\u0651\u062A\u064F\u0647\u064E\u0627 \u0627\u0644\u0646\u064E\u0651\u0641\u0652\u0633\u064F \u0627\u0644\u0652\u0645\u064F\u0637\u0652\u0645\u064E\u0626\u0650\u0646\u064E\u0651\u0629\u064F", desc: "After cosmic oaths, empires, and psychology \u2014 the surah arrives at a single soul. The journey from the impersonal to the intensely personal is the argument itself.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "The surah diagnoses, exposes, warns, and invites \u2014 but it never legislates",
      absences: [
        { item: "No commands", note: "No moral instructions. No \u2018do this\u2019 or \u2018avoid that.\u2019 For a surah so concerned with moral failure \u2014 devouring inheritance, neglecting orphans, loving wealth \u2014 the absence of any imperative directed at reform is striking. The disease is in how the human reads reality." },
        { item: "No prophets in the civilizational reckoning", note: "Hud is not mentioned with \u02BFAd. Salih is not mentioned with Thamud. Musa is not mentioned with Pharaoh. The messengers are erased entirely \u2014 what remains is the civilization and its destruction as forensic evidence." },
        { item: "No narrative", note: "No dialogue, no story, no chronology. The three civilizations are presented as exhibits, not episodes. The surah is not interested in what happened to them but in what their destruction proves." },
        { item: "No mention of paradise by description", note: "The soul is invited into \u2018My garden\u2019 \u2014 but no rivers, no shade, no fruit. The garden is identified only by its possessor: God. The intimacy of the possessive replaces all decoration." },
        { item: "No jawab al-qasam (explicit oath-answer)", note: "The four grand oaths of the opening never receive an explicit grammatical answer. The resolution is debated \u2014 some scholars locate it at ayah 14, others say it is implied. The oaths hang open, creating a pressure that the whole surah must resolve." },
      ],
    },
  },

  contentNodes: [
    { concept: "Al-nafs al-mutma\u2019inna \u2014 the soul at rest", type: "surah-specific", articleSlug: "nafs-mutmainna-soul-at-rest-89" },
    { concept: "Mirsad \u2014 the divine watchtower", type: "surah-specific", articleSlug: "mirsad-watchtower-89-14" },
    { concept: "Fajr-Balad-Shams triad \u2014 three scales of moral reckoning", type: "cross-surah", articleSlug: "fajr-balad-shams-triad" },
    { concept: "Kalla as structural pivot", type: "cross-surah", articleSlug: "kalla-structural-pivot-quran" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "reckoning", label: "Reckoning" },
  { id: "mirror", label: "Mirror" },
  { id: "exposure", label: "Exposure" },
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
        Cosmic frame {"\u2192"} historical wreckage {"\u2192"} personal pathology {"\u2192"} soul addressed
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
              <div className="text-2xl font-bold text-gold-500 font-serif">2</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivots</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />

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
          {activeTab === "reckoning" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "exposure" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
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
