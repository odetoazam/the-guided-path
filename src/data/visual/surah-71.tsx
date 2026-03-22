"use client";
import React, { useState, useRef } from "react";

// ==============================================================================
// SURAH NUH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/nuh
// ==============================================================================

const SURAH_DATA = {
  name: "Nuh",
  arabicName: "نُوح",
  meaning: "Noah",
  number: 71,
  ayahCount: 28,
  period: "Makki",
  juz: 29,
  movements: 4,
  thesis:
    "Twenty-eight ayahs that give us the most intimate portrait of prophetic exhaustion in revelation — a nine-hundred-and-fifty-year deposition filed by the most patient man in sacred history, in which every method tried is recorded with divine care and the only flood is the one still gathering behind his final prayer.",
  reflectionUrl: "/surahs/nuh",
  readTime: "20 min read",

  heartVerse: {
    arabic: "قَالَ رَبِّ إِنِّي دَعَوْتُ قَوْمِي لَيْلًا وَنَهَارًا",
    ayahRef: "71:5",
    translation: "He said: 'My Lord, I invited my people night and day.'",
    why: "The opening line of Nuh's deposition. With two words — laylan wa naharan — he establishes the surah's defining pattern: exhaustive merism, the listing of opposites to mean 'everything, without exception.' He did not call them sometimes. He called them at every hour. The entire surah that follows is the evidence for this claim.",
  },

  audio: { surahNumber: 71, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "إِنَّا أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ أَنْ أَنذِرْ قَوْمَكَ مِن قَبْلِ أَن يَأْتِيَهُمْ عَذَابٌ أَلِيمٌ", translation: "Indeed, We sent Nuh to his people: 'Warn your people before there comes to them a painful punishment.'" },
    { ayah: 2, arabic: "قَالَ يَا قَوْمِ إِنِّي لَكُمْ نَذِيرٌ مُّبِينٌ", translation: "He said: 'O my people, I am to you a clear warner.'" },
    { ayah: 3, arabic: "أَنِ اعْبُدُوا اللَّهَ وَاتَّقُوهُ وَأَطِيعُونِ", translation: "'Worship Allah, fear Him, and obey me.'" },
    { ayah: 4, arabic: "يَغْفِرْ لَكُم مِّن ذُنُوبِكُمْ وَيُؤَخِّرْكُمْ إِلَىٰ أَجَلٍ مُّسَمًّى ۚ إِنَّ أَجَلَ اللَّهِ إِذَا جَاءَ لَا يُؤَخَّرُ ۖ لَوْ كُنتُمْ تَعْلَمُونَ", translation: "'He will forgive your sins and delay you until an appointed term. Indeed, the time set by Allah, when it comes, cannot be delayed — if only you knew.'" },
    { ayah: 5, arabic: "قَالَ رَبِّ إِنِّي دَعَوْتُ قَوْمِي لَيْلًا وَنَهَارًا", translation: "He said: 'My Lord, I invited my people night and day.'" },
    { ayah: 6, arabic: "فَلَمْ يَزِدْهُمْ دُعَائِي إِلَّا فِرَارًا", translation: "'But my calling only increased them in flight.'" },
    { ayah: 7, arabic: "وَإِنِّي كُلَّمَا دَعَوْتُهُمْ لِتَغْفِرَ لَهُمْ جَعَلُوا أَصَابِعَهُمْ فِي آذَانِهِمْ وَاسْتَغْشَوْا ثِيَابَهُمْ وَأَصَرُّوا وَاسْتَكْبَرُوا اسْتِكْبَارًا", translation: "'Every time I invited them so that You might forgive them, they put their fingers in their ears, covered themselves with their garments, persisted, and were arrogant with great arrogance.'" },
    { ayah: 8, arabic: "ثُمَّ إِنِّي دَعَوْتُهُمْ جِهَارًا", translation: "'Then I called them publicly.'" },
    { ayah: 9, arabic: "ثُمَّ إِنِّي أَعْلَنتُ لَهُمْ وَأَسْرَرْتُ لَهُمْ إِسْرَارًا", translation: "'Then I announced to them in public and confided to them privately.'" },
    { ayah: 10, arabic: "فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا", translation: "'I said: Ask forgiveness of your Lord — indeed, He is ever a Perpetual Forgiver.'" },
    { ayah: 11, arabic: "يُرْسِلِ السَّمَاءَ عَلَيْكُم مِّدْرَارًا", translation: "'He will send rain upon you in abundance.'" },
    { ayah: 12, arabic: "وَيُمْدِدْكُم بِأَمْوَالٍ وَبَنِينَ وَيَجْعَل لَّكُمْ جَنَّاتٍ وَيَجْعَل لَّكُمْ أَنْهَارًا", translation: "'And give you increase in wealth and children, and provide for you gardens and rivers.'" },
    { ayah: 13, arabic: "مَّا لَكُمْ لَا تَرْجُونَ لِلَّهِ وَقَارًا", translation: "'What is the matter with you that you do not attribute to Allah due grandeur?'" },
    { ayah: 14, arabic: "وَقَدْ خَلَقَكُمْ أَطْوَارًا", translation: "'While He has created you in stages.'" },
    { ayah: 15, arabic: "أَلَمْ تَرَوْا كَيْفَ خَلَقَ اللَّهُ سَبْعَ سَمَاوَاتٍ طِبَاقًا", translation: "'Do you not see how Allah created seven heavens in layers?'" },
    { ayah: 16, arabic: "وَجَعَلَ الْقَمَرَ فِيهِنَّ نُورًا وَجَعَلَ الشَّمْسَ سِرَاجًا", translation: "'And made the moon therein a light and the sun a lamp?'" },
    { ayah: 17, arabic: "وَاللَّهُ أَنبَتَكُم مِّنَ الْأَرْضِ نَبَاتًا", translation: "'And Allah has caused you to grow from the earth a progressive growth.'" },
    { ayah: 18, arabic: "ثُمَّ يُعِيدُكُمْ فِيهَا وَيُخْرِجُكُمْ إِخْرَاجًا", translation: "'Then He will return you into it and bring you out in a resurrection.'" },
    { ayah: 19, arabic: "وَاللَّهُ جَعَلَ لَكُمُ الْأَرْضَ بِسَاطًا", translation: "'And Allah has made for you the earth a wide expanse.'" },
    { ayah: 20, arabic: "لِّتَسْلُكُوا مِنْهَا سُبُلًا فِجَاجًا", translation: "'That you may follow therein roads of passage.'" },
    { ayah: 21, arabic: "قَالَ نُوحٌ رَّبِّ إِنَّهُمْ عَصَوْنِي وَاتَّبَعُوا مَن لَّمْ يَزِدْهُ مَالُهُ وَوَلَدُهُ إِلَّا خَسَارًا", translation: "Nuh said: 'My Lord, they have disobeyed me and followed the one whose wealth and children only increase him in loss.'" },
    { ayah: 22, arabic: "وَمَكَرُوا مَكْرًا كُبَّارًا", translation: "'And they devised an immense plan.'" },
    { ayah: 23, arabic: "وَقَالُوا لَا تَذَرُنَّ آلِهَتَكُمْ وَلَا تَذَرُنَّ وَدًّا وَلَا سُوَاعًا وَلَا يَغُوثَ وَيَعُوقَ وَنَسْرًا", translation: "'And they said: Do not leave your gods. Do not leave Wadd, nor Suwa', nor Yaghuth, nor Ya'uq, nor Nasr.'" },
    { ayah: 24, arabic: "وَقَدْ أَضَلُّوا كَثِيرًا ۖ وَلَا تَزِدِ الظَّالِمِينَ إِلَّا ضَلَالًا", translation: "'And they have already misled many. And increase the wrongdoers only in error.'" },
    { ayah: 25, arabic: "مِّمَّا خَطِيئَاتِهِمْ أُغْرِقُوا فَأُدْخِلُوا نَارًا فَلَمْ يَجِدُوا لَهُم مِّن دُونِ اللَّهِ أَنصَارًا", translation: "Because of their sins they were drowned and put into the Fire, and they found no helpers besides Allah." },
    { ayah: 26, arabic: "وَقَالَ نُوحٌ رَّبِّ لَا تَذَرْ عَلَى الْأَرْضِ مِنَ الْكَافِرِينَ دَيَّارًا", translation: "And Nuh said: 'My Lord, do not leave upon the earth any inhabitant from among the disbelievers.'" },
    { ayah: 27, arabic: "إِنَّكَ إِن تَذَرْهُمْ يُضِلُّوا عِبَادَكَ وَلَا يَلِدُوا إِلَّا فَاجِرًا كَفَّارًا", translation: "'Indeed, if You leave them, they will mislead Your servants and will not beget except every wicked disbeliever.'" },
    { ayah: 28, arabic: "رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ وَلَا تَزِدِ الظَّالِمِينَ إِلَّا تَبَارًا", translation: "'My Lord, forgive me and my parents and whoever enters my house as a believer, and the believing men and the believing women. And do not increase the wrongdoers except in destruction.'" },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Deposition",
      subtitle: "Four movements: commission \u2192 exhaustion \u2192 evidence \u2192 verdict",
      sections: [
        { ayahs: "1\u20134", title: "The Divine Commission", color: "#4ecdc4", desc: "Allah frames the mission in His own voice \u2014 the only section where He speaks directly. A man was sent with a message and a deadline. The punishment is named before Nuh even begins to speak. Everything that follows lives under this shadow." },
        { ayahs: "5\u201312", title: "The Exhaustion Report", color: "#9b7fd4", desc: "Nuh turns to Allah and reports, method by method, everything he tried. Night and day. Publicly and privately. With promises of rain, wealth, children, gardens. The keyword da\u2018awtu threads through like a rhythm of persistence meeting refusal. The quality of a man laying evidence before a judge." },
        { ayahs: "13\u201320", title: "The Cosmic Evidence", color: "#C9A84C", isPivot: true, desc: "The structural center of the surah. Nuh points at the sky \u2014 seven heavens in layers, the moon as nur, the sun as siraj, humanity grown from the earth like plants. The signs were his strongest argument, the evidence most deserving of attention, and the thing his people most catastrophically ignored." },
        { ayahs: "21\u201328", title: "The Collapse & Du\u2018a", color: "#e07a8a", desc: "The pivot word \u2018asawni (\u2018they disobeyed me\u2019) crosses from effort to verdict. The same wealth and children offered as blessings in ayah 12 are now the instruments of ruin. Five idol names preserved as fossils of how monotheism decays. Then the most severe prophetic du\u2018a in the Quran, followed immediately by the most tender." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah\u2019s opening and closing form a concentric architecture around the cosmic center",
      pairs: [
        {
          left: { label: "Commission", ayahs: "1\u20134", desc: "Allah sends Nuh outward, toward a people, with a warning before a painful punishment" },
          right: { label: "Final Du\u2018a", ayahs: "26\u201328", desc: "Nuh turns inward, toward Allah, asking for the smallest circle of mercy \u2014 himself, his parents, his household" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Da\u2018wah Methods", ayahs: "5\u20139", desc: "Night and day, publicly and privately \u2014 every mode of calling, every hour, every strategy" },
          right: { label: "Consequence", ayahs: "25", desc: "Because of their sins they were drowned and put into the Fire \u2014 the past tense of certainty" },
          color: "#9b7fd4",
        },
        {
          left: { label: "The Promise", ayahs: "10\u201312", desc: "Forgiveness, rain, wealth, children, gardens \u2014 da\u2018wah calibrated to an agricultural people" },
          right: { label: "The Inversion", ayahs: "21\u201324", desc: "The same wealth and children now fuel disbelief \u2014 the surah\u2019s deepest irony made visible" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "Cosmic Signs", ayahs: "13\u201320",
        desc: "Seven heavens, moon as light, sun as lamp, humanity grown from the earth like plants.",
        note: "The surah\u2019s architectural weight rests here \u2014 the center of the ring is the center of the tragedy. The signs were the strongest argument, and the thing most catastrophically ignored.",
      },
    },
    deductiveFunnel: {
      title: "The Catalogue of Refusal",
      subtitle: "Each layer of Nuh\u2019s report reveals a deeper stratum of rejection",
      layers: [
        { depth: 1, label: "Flight", ayah: "6", arabic: "\u0641\u0650\u0631\u064E\u0627\u0631\u064B\u0627", desc: "The people bolt from Nuh\u2019s invitation as an animal bolts from danger. The irony is structural: they fled from the one calling them away from the thing they should have been fleeing.", color: "#4ecdc4" },
        { depth: 2, label: "Physical Refusal", ayah: "7", arabic: "\u062C\u064E\u0639\u064E\u0644\u064F\u0648\u0627 \u0623\u064E\u0635\u064E\u0627\u0628\u0650\u0639\u064E\u0647\u064F\u0645\u0652 \u0641\u0650\u064A \u0622\u0630\u064E\u0627\u0646\u0650\u0647\u0650\u0645\u0652", desc: "Fingers in ears, garments pulled over heads. The most visceral body language of rejection in the Quran \u2014 the physical gestures that express a spiritual closing.", color: "#9b7fd4" },
        { depth: 3, label: "Conspiracy", ayah: "22", arabic: "\u0645\u064E\u0643\u064E\u0631\u064F\u0648\u0627 \u0645\u064E\u0643\u0652\u0631\u064B\u0627 \u0643\u064F\u0628\u0651\u064E\u0627\u0631\u064B\u0627", desc: "From passive refusal to active plotting. The word makr \u2014 the same word used for the plotting of Quraysh against Muhammad \u2014 bridges two moments in prophetic history.", color: "#e07a8a" },
        { depth: 4, label: "Fossilized Idolatry", ayah: "23", arabic: "\u0648\u064E\u062F\u064B\u0651\u0627 \u0648\u064E\u0644\u064E\u0627 \u0633\u064F\u0648\u064E\u0627\u0639\u064B\u0627", desc: "Five idol names preserved nowhere else in the Quran \u2014 Wadd, Suwa\u2018, Yaghuth, Ya\u2018uq, Nasr. A fossil record of how monotheism decays into idolatry across generations.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "Every absence in this surah is an argument \u2014 what is not narrated shapes the meaning of what is",
      absences: [
        { item: "No flood", note: "The most famous element of Nuh\u2019s story \u2014 the ark, the water, the drowning \u2014 does not appear. This is a surah about the nine hundred and fifty years before the flood, not the flood itself. It is about the calling, not the catastrophe." },
        { item: "No direct address to Quraysh", note: "No \u2018say to them,\u2019 no \u2018do they not see,\u2019 no pivot from Nuh\u2019s story to the present audience. The mirror is held up without commentary. The absence of explicit application makes the application more devastating." },
        { item: "No voice for the people", note: "Nuh\u2019s people never speak, never argue back, never offer a counter-position. We hear only his account of their refusal, giving the surah the quality of a deposition \u2014 a final testimony delivered before the court of divine justice." },
        { item: "No miraculous intervention", note: "Where other prophet surahs give us dramatic confrontation or divine signs, this one gives us the interior life of a man who kept going long after most would have stopped. The miracle is the persistence itself." },
        { item: "No divine consolation within the surah", note: "Allah speaks only in the opening commission (ayahs 1\u20134). After that, He listens. The entire surah is Nuh speaking to God, and God\u2019s response is the surah\u2019s existence \u2014 that He considered Nuh\u2019s exhaustion worthy of recording." },
      ],
    },
  },

  contentNodes: [
    { concept: "Da\u2018wah as deposition \u2014 the forensic voice of prophetic exhaustion", type: "surah-specific", articleSlug: "nuh-dawah-deposition-71" },
    { concept: "The five idol names \u2014 archaeology of shirk", type: "surah-specific", articleSlug: "five-idols-wadd-nasr-71-23" },
    { concept: "Nuh\u2013Jinn diptych \u2014 centuries of refusal vs. a single night of acceptance", type: "cross-surah", articleSlug: "nuh-jinn-diptych-71-72" },
    { concept: "The promise\u2013inversion mirror \u2014 wealth as blessing and as ruin", type: "cross-surah", articleSlug: "wealth-blessing-ruin-71" },
  ],
};

// ==============================================================================
// TABS
// ==============================================================================

const TABS = [
  { id: "deposition", label: "Deposition" },
  { id: "ring", label: "Ring" },
  { id: "refusal", label: "Refusal" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ==============================================================================
// SHARED — Islamic ornament divider (matches surah pages)
// ==============================================================================

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">{"\u06DE"}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </div>
  );
}

// ==============================================================================
// COMPONENTS
// ==============================================================================

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
            <span className="text-sm text-cream-muted/50">{"\uFD3F"}{v.ayah}{"\uFD3E"}</span>
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">{"\u2726"} Structural center</div>}
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
        Flight {"\u2192"} physical refusal {"\u2192"} conspiracy {"\u2192"} fossilized idolatry
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

// ==============================================================================
// PAGE SHELL — v3 (brand-aligned, proper tabs, ornaments)
// ==============================================================================

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;

  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">

        {/* -- Hero --------------------------------------------------------- */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} {"\u00B7"} {d.period} {"\u00B7"} Juz {d.juz}
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
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Center</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />

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
          {activeTab === "deposition" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "refusal" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
