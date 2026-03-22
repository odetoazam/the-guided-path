"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MUZZAMMIL — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-muzzammil
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Muzzammil",
  arabicName: "المُزَّمِّل",
  meaning: "The One Wrapped in Garments",
  number: 73,
  ayahCount: 20,
  period: "Makki",
  juz: 29,
  movements: 4,
  thesis:
    "A surah that gave the Prophet his first assignment before his first sermon — stand in the dark, recite slowly, because what is coming is heavy — and then, years later, arrived a single ayah to ease the burden, proving that grace follows discipline, never the reverse.",
  reflectionUrl: "/surahs/al-muzzammil",
  readTime: "18 min read",

  heartVerse: {
    arabic: "إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا",
    ayahRef: "73:5",
    translation: "We are going to cast upon you a heavy word.",
    why: "The hinge of the entire surah. Everything before it is command — stand, pray, recite. Everything after it is the reason that command exists. The night prayer is not devotion for its own sake; it is preparation for carrying revelation. The word thaqil radiates through the rest of the surah: the Quran is heavy, the day is heavy, Pharaoh's seizure was heavy, the Day of Judgment turns children gray. Night prayer is the only thing strong enough to bear it.",
  },

  audio: { surahNumber: 73, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "يَا أَيُّهَا الْمُزَّمِّلُ", translation: "O you who wraps himself in garments —" },
    { ayah: 2, arabic: "قُمِ اللَّيْلَ إِلَّا قَلِيلًا", translation: "stand in prayer through the night, except a little —" },
    { ayah: 3, arabic: "نِّصْفَهُ أَوِ انقُصْ مِنْهُ قَلِيلًا", translation: "half of it, or reduce from it slightly —" },
    { ayah: 4, arabic: "أَوْ زِدْ عَلَيْهِ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا", translation: "or add to it, and recite the Quran in slow, measured recitation." },
    { ayah: 5, arabic: "إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا", translation: "We are going to cast upon you a heavy word." },
    { ayah: 6, arabic: "إِنَّ نَاشِئَةَ اللَّيْلِ هِيَ أَشَدُّ وَطْئًا وَأَقْوَمُ قِيلًا", translation: "Indeed, the rising at night is stronger in impression and more precise in speech." },
    { ayah: 7, arabic: "إِنَّ لَكَ فِي النَّهَارِ سَبْحًا طَوِيلًا", translation: "Indeed, for you during the day is a long stretch of occupation." },
    { ayah: 8, arabic: "وَاذْكُرِ اسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًا", translation: "Remember the name of your Lord and devote yourself to Him completely." },
    { ayah: 9, arabic: "رَّبُّ الْمَشْرِقِ وَالْمَغْرِبِ لَا إِلَٰهَ إِلَّا هُوَ فَاتَّخِذْهُ وَكِيلًا", translation: "Lord of the East and the West; there is no god but He, so take Him as your trustee." },
    { ayah: 10, arabic: "وَاصْبِرْ عَلَىٰ مَا يَقُولُونَ وَاهْجُرْهُمْ هَجْرًا جَمِيلًا", translation: "And be patient over what they say, and leave them with a graceful departure." },
    { ayah: 11, arabic: "وَذَرْنِي وَالْمُكَذِّبِينَ أُولِي النَّعْمَةِ وَمَهِّلْهُمْ قَلِيلًا", translation: "Leave Me with the deniers of comfort, and give them respite for a little while." },
    { ayah: 12, arabic: "إِنَّ لَدَيْنَا أَنكَالًا وَجَحِيمًا", translation: "Indeed, with Us are shackles and a blazing fire —" },
    { ayah: 13, arabic: "وَطَعَامًا ذَا غُصَّةٍ وَعَذَابًا أَلِيمًا", translation: "and food that chokes and a painful punishment —" },
    { ayah: 14, arabic: "يَوْمَ تَرْجُفُ الْأَرْضُ وَالْجِبَالُ وَكَانَتِ الْجِبَالُ كَثِيبًا مَّهِيلًا", translation: "on the Day the earth and mountains will tremble, and the mountains become a heap of sand pouring down." },
    { ayah: 15, arabic: "إِنَّا أَرْسَلْنَا إِلَيْكُمْ رَسُولًا شَاهِدًا عَلَيْكُمْ كَمَا أَرْسَلْنَا إِلَىٰ فِرْعَوْنَ رَسُولًا", translation: "Indeed, We have sent to you a messenger as a witness over you, just as We sent to Pharaoh a messenger." },
    { ayah: 16, arabic: "فَعَصَىٰ فِرْعَوْنُ الرَّسُولَ فَأَخَذْنَاهُ أَخْذًا وَبِيلًا", translation: "But Pharaoh disobeyed the messenger, so We seized him with a terrible seizing." },
    { ayah: 17, arabic: "فَكَيْفَ تَتَّقُونَ إِن كَفَرْتُمْ يَوْمًا يَجْعَلُ الْوِلْدَانَ شِيبًا", translation: "How will you protect yourselves, if you disbelieve, from a Day that will turn children gray-haired?" },
    { ayah: 18, arabic: "السَّمَاءُ مُنفَطِرٌ بِهِ ۚ كَانَ وَعْدُهُ مَفْعُولًا", translation: "The sky will be torn apart by it. His promise is ever fulfilled." },
    { ayah: 19, arabic: "إِنَّ هَٰذِهِ تَذْكِرَةٌ ۖ فَمَن شَاءَ اتَّخَذَ إِلَىٰ رَبِّهِ سَبِيلًا", translation: "Indeed, this is a reminder; so whoever wills may take a path to his Lord." },
    { ayah: 20, arabic: "إِنَّ رَبَّكَ يَعْلَمُ أَنَّكَ تَقُومُ أَدْنَىٰ مِن ثُلُثَيِ اللَّيْلِ وَنِصْفَهُ وَثُلُثَهُ وَطَائِفَةٌ مِّنَ الَّذِينَ مَعَكَ ۚ وَاللَّهُ يُقَدِّرُ اللَّيْلَ وَالنَّهَارَ ۚ عَلِمَ أَن لَّن تُحْصُوهُ فَتَابَ عَلَيْكُمْ ۖ فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ", translation: "Your Lord knows that you stand nearly two-thirds of the night, and half of it, and a third of it, and so does a group of those with you... So recite what is easy for you of the Quran." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Night Forge",
      subtitle: "Four movements: command \u2192 patience \u2192 warning \u2192 easing",
      sections: [
        { ayahs: "1\u20139", title: "The Command to Rise", color: "#4ecdc4", desc: "Allah addresses His Prophet by his condition \u2014 O you wrapped in garments \u2014 and commands him to stand through the night, recite the Quran slowly, and devote himself completely. The reason follows: a heavy word is coming, and the night is where the strength to carry it is built." },
        { ayahs: "10\u201314", title: "Patience with the Deniers", color: "#9b7fd4", desc: "The surah turns outward. The Prophet is told to be patient with what people say and to leave them with a graceful departure \u2014 hajran jamila. Then the lens turns on the deniers: their comfort is temporary, and a Day is coming that will dissolve the mountains into pouring sand." },
        { ayahs: "15\u201318", title: "The Pharaoh Warning", color: "#e07a8a", isPivot: true, desc: "In just four ayahs, the entire arc of Pharaoh's refusal and destruction. Then the surah leaps forward: how will you protect yourselves from a Day that turns children gray-haired? The sky itself will be torn apart. The compression is the argument \u2014 Pharaoh's story needs no elaboration." },
        { ayahs: "19\u201320", title: "The Easing", color: "#C9A84C", desc: "Years later, a single Medinan ayah arrives. Allah says: I know you have been standing. I watched. Now recite what is easy for you. The easing came after the discipline, and the discipline was real. Grace that follows effort is mercy." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The opening and closing form a precise structural mirror",
      pairs: [
        {
          left: { label: "Night Prayer Commanded", ayahs: "1\u20134", desc: "Stand through the night except a little \u2014 half, or less, or more. Recite the Quran in slow, measured recitation." },
          right: { label: "Night Prayer Eased", ayahs: "20", desc: "Your Lord knows you stand two-thirds, half, a third. Recite what is easy for you." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Quran: Recite Slowly", ayahs: "4", desc: "Rattil al-Qur'ana tartila \u2014 give each word its space, its weight, its due." },
          right: { label: "The Quran: Recite What Is Easy", ayahs: "20", desc: "Fa-qra'u ma tayassara min al-Qur'an \u2014 the relationship has matured from forging to sustaining." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Complete Devotion", ayahs: "8", desc: "Tabattal ilayhi tabtila \u2014 cut off from everything else, dedicate yourself entirely." },
          right: { label: "Prayer & Charity", ayahs: "20", desc: "Establish prayer, give zakah, lend Allah a goodly loan \u2014 devotion woven into daily life." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Pivot: Pharaoh & the Day", ayahs: "15\u201318",
        desc: "Pharaoh refused a messenger and was seized. A Day is coming that turns children gray.",
        note: "The center holds the consequence. Everything outside it is preparation and response.",
      },
    },
    deductiveFunnel: {
      title: "The Weight",
      subtitle: "The word thaqil (heavy) radiates through the entire surah",
      layers: [
        { depth: 1, label: "The Command", ayah: "1\u20134", arabic: "قُمِ اللَّيْلَ إِلَّا قَلِيلًا", desc: "Stand through the night. Recite slowly. The command arrives before the reason \u2014 practice before explanation. Allah gave His Prophet a discipline before He gave him a theology.", color: "#4ecdc4" },
        { depth: 2, label: "The Reason", ayah: "5", arabic: "إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا", desc: "A heavy word is coming. The verb ulqi \u2014 to cast, to hurl upon \u2014 suggests revelation is not gently handed over. It lands. The night prayer is the preparation for impact.", color: "#C9A84C" },
        { depth: 3, label: "The Alignment", ayah: "6", arabic: "إِنَّ نَاشِئَةَ اللَّيْلِ هِيَ أَشَدُّ وَطْئًا", desc: "The night hours produce a different quality of alignment between heart and tongue \u2014 ashaddu wat'an wa aqwamu qila. The day is long with occupation. The night is where you are most honest.", color: "#9b7fd4" },
        { depth: 4, label: "The Grace", ayah: "20", arabic: "فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ", desc: "The easing. After watching them strive, Allah lightens the load. The sequence matters: discipline first, then grace. The standard was set high, the striving was honored, and then mercy arrived to make it sustainable.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence is a window into the surah's purpose",
      absences: [
        { item: "No detailed engagement with disbelievers' arguments", note: "Other early Makkan surahs debate, challenge, interrogate. Al-Muzzammil barely glances at opposition. Quraysh appears only as a backdrop \u2014 people to be patient with. The surah's energy is directed inward, toward the Prophet's spiritual preparation." },
        { item: "No stories of previous prophets (except Pharaoh)", note: "The Pharaoh reference is compressed into two ayahs \u2014 sent a messenger, Pharaoh refused, he was seized. No elaboration, no narrative arc. The pattern is stated, not told." },
        { item: "No description of Paradise", note: "The surah describes shackles, fire, choking food, mountains dissolving, children turning gray \u2014 but never once describes the reward of those who listen. The entire frame is warning and preparation." },
        { item: "No mention of community (until the final ayah)", note: "For nineteen ayahs the Prophet is alone with his Lord. Only in ayah 20 \u2014 the Medinan addition \u2014 do others appear: 'a group of those with you.' The private conversation has become a communal reality." },
        { item: "No explanation of why the Quran is heavy", note: "Ayah 5 announces that the coming word is thaqil \u2014 heavy. But it never explains what makes divine speech heavy. The weight is stated as self-evident. The surah trusts the Prophet to discover the meaning through the carrying." },
      ],
    },
  },

  contentNodes: [
    { concept: "Tartil \u2014 the Quran's command for its own recitation", type: "surah-specific", articleSlug: "tartil-recitation-73-4" },
    { concept: "Qawlan thaqila \u2014 the weight of revelation", type: "surah-specific", articleSlug: "qawlan-thaqila-heavy-word-73-5" },
    { concept: "Al-Muzzammil \u2013 Al-Muddaththir diptych", type: "cross-surah", articleSlug: "muzzammil-muddaththir-diptych" },
    { concept: "Hajran jamila \u2014 the theology of graceful departure", type: "cross-surah", articleSlug: "hajran-jamila-graceful-leaving" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "weight", label: "Weight" },
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
        Command {"\u2192"} reason {"\u2192"} alignment {"\u2192"} grace
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "weight" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
