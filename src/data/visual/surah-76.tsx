"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-INSAN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-insan
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Insan",
  arabicName: "الإنسَان",
  meaning: "Man / The Human Being",
  number: 76,
  ayahCount: 31,
  period: "Madani",
  juz: 29,
  movements: 5,
  thesis:
    "A thirty-one-ayah surah that furnishes Paradise in silver and silk and ginger-flavored springs, then reveals that the key to the door was a single meal given to a hungry stranger with no expectation of thanks.",
  reflectionUrl: "/surahs/al-insan",
  readTime: "20 min read",

  heartVerse: {
    arabic: "إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا",
    ayahRef: "76:9",
    translation: "We feed you only for the face of Allah. We desire from you neither reward nor thanks.",
    why: "The ethical and theological center of the entire surah. The righteous disclaim every form of return — social, emotional, transactional — in the very act of giving. The eighteen ayahs of Paradise that follow are architecturally downstream of this single declaration of pure intention.",
  },

  audio: { surahNumber: 76, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "هَلْ أَتَىٰ عَلَى الْإِنسَانِ حِينٌ مِّنَ الدَّهْرِ لَمْ يَكُن شَيْئًا مَّذْكُورًا", translation: "Has there not come upon man a period of time when he was nothing worth mentioning?" },
    { ayah: 2, arabic: "إِنَّا خَلَقْنَا الْإِنسَانَ مِن نُّطْفَةٍ أَمْشَاجٍ نَّبْتَلِيهِ فَجَعَلْنَاهُ سَمِيعًا بَصِيرًا", translation: "Indeed, We created man from a mixed drop to test him; and We made him hearing and seeing." },
    { ayah: 3, arabic: "إِنَّا هَدَيْنَاهُ السَّبِيلَ إِمَّا شَاكِرًا وَإِمَّا كَفُورًا", translation: "Indeed, We guided him to the path — whether he be grateful or ungrateful." },
    { ayah: 4, arabic: "إِنَّا أَعْتَدْنَا لِلْكَافِرِينَ سَلَاسِلَ وَأَغْلَالًا وَسَعِيرًا", translation: "Indeed, We have prepared for the disbelievers chains and shackles and a blazing fire." },
    { ayah: 5, arabic: "إِنَّ الْأَبْرَارَ يَشْرَبُونَ مِن كَأْسٍ كَانَ مِزَاجُهَا كَافُورًا", translation: "Indeed, the righteous will drink from a cup whose mixture is of camphor —" },
    { ayah: 6, arabic: "عَيْنًا يَشْرَبُ بِهَا عِبَادُ اللَّهِ يُفَجِّرُونَهَا تَفْجِيرًا", translation: "a spring from which the servants of Allah will drink, making it gush forth abundantly." },
    { ayah: 7, arabic: "يُوفُونَ بِالنَّذْرِ وَيَخَافُونَ يَوْمًا كَانَ شَرُّهُ مُسْتَطِيرًا", translation: "They fulfill their vows and fear a Day whose evil is widespread." },
    { ayah: 8, arabic: "وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا", translation: "And they give food, despite their love for it, to the poor, the orphan, and the captive." },
    { ayah: 9, arabic: "إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا", translation: "We feed you only for the face of Allah. We desire from you neither reward nor thanks." },
    { ayah: 10, arabic: "إِنَّا نَخَافُ مِن رَّبِّنَا يَوْمًا عَبُوسًا قَمْطَرِيرًا", translation: "Indeed, we fear from our Lord a Day austere and distressful." },
    { ayah: 11, arabic: "فَوَقَاهُمُ اللَّهُ شَرَّ ذَٰلِكَ الْيَوْمِ وَلَقَّاهُمْ نَضْرَةً وَسُرُورًا", translation: "So Allah protected them from the evil of that Day and granted them radiance and joy." },
    { ayah: 12, arabic: "وَجَزَاهُم بِمَا صَبَرُوا جَنَّةً وَحَرِيرًا", translation: "And He rewarded them for their patience with a garden and silk." },
    { ayah: 13, arabic: "مُّتَّكِئِينَ فِيهَا عَلَى الْأَرَائِكِ ۖ لَا يَرَوْنَ فِيهَا شَمْسًا وَلَا زَمْهَرِيرًا", translation: "Reclining therein on adorned couches, they will see neither scorching sun nor bitter cold." },
    { ayah: 14, arabic: "وَدَانِيَةً عَلَيْهِمْ ظِلَالُهَا وَذُلِّلَتْ قُطُوفُهَا تَذْلِيلًا", translation: "And near above them are its shades, and its fruit clusters brought within easy reach." },
    { ayah: 15, arabic: "وَيُطَافُ عَلَيْهِم بِآنِيَةٍ مِّن فِضَّةٍ وَأَكْوَابٍ كَانَتْ قَوَارِيرَا", translation: "And there will be circulated among them vessels of silver and cups of crystal —" },
    { ayah: 16, arabic: "قَوَارِيرَ مِن فِضَّةٍ قَدَّرُوهَا تَقْدِيرًا", translation: "crystal from silver, which they have determined the measure thereof." },
    { ayah: 17, arabic: "وَيُسْقَوْنَ فِيهَا كَأْسًا كَانَ مِزَاجُهَا زَنجَبِيلًا", translation: "And they will be given to drink a cup whose mixture is of ginger —" },
    { ayah: 18, arabic: "عَيْنًا فِيهَا تُسَمَّىٰ سَلْسَبِيلًا", translation: "a spring therein named Salsabil." },
    { ayah: 19, arabic: "وَيَطُوفُ عَلَيْهِمْ وِلْدَانٌ مُّخَلَّدُونَ إِذَا رَأَيْتَهُمْ حَسِبْتَهُمْ لُؤْلُؤًا مَّنثُورًا", translation: "There will circulate among them young attendants made eternal — when you see them, you would think them scattered pearls." },
    { ayah: 20, arabic: "وَإِذَا رَأَيْتَ ثَمَّ رَأَيْتَ نَعِيمًا وَمُلْكًا كَبِيرًا", translation: "And when you look there, you will see bliss and a great kingdom." },
    { ayah: 21, arabic: "عَالِيَهُمْ ثِيَابُ سُندُسٍ خُضْرٌ وَإِسْتَبْرَقٌ ۖ وَحُلُّوا أَسَاوِرَ مِن فِضَّةٍ وَسَقَاهُمْ رَبُّهُمْ شَرَابًا طَهُورًا", translation: "Upon them will be garments of green silk and brocade. They will be adorned with bracelets of silver, and their Lord will give them a purifying drink." },
    { ayah: 22, arabic: "إِنَّ هَـٰذَا كَانَ لَكُمْ جَزَاءً وَكَانَ سَعْيُكُم مَّشْكُورًا", translation: "Indeed, this is for you a reward, and your striving has been appreciated." },
    { ayah: 23, arabic: "إِنَّا نَحْنُ نَزَّلْنَا عَلَيْكَ الْقُرْآنَ تَنزِيلًا", translation: "Indeed, it is We who have sent down to you the Quran progressively." },
    { ayah: 24, arabic: "فَاصْبِرْ لِحُكْمِ رَبِّكَ وَلَا تُطِعْ مِنْهُمْ آثِمًا أَوْ كَفُورًا", translation: "So be patient for the ruling of your Lord, and do not obey among them any sinner or ungrateful one." },
    { ayah: 25, arabic: "وَاذْكُرِ اسْمَ رَبِّكَ بُكْرَةً وَأَصِيلًا", translation: "And mention the name of your Lord morning and evening." },
    { ayah: 26, arabic: "وَمِنَ اللَّيْلِ فَاسْجُدْ لَهُ وَسَبِّحْهُ لَيْلًا طَوِيلًا", translation: "And during the night prostrate to Him and exalt Him a long part of the night." },
    { ayah: 27, arabic: "إِنَّ هَـٰؤُلَاءِ يُحِبُّونَ الْعَاجِلَةَ وَيَذَرُونَ وَرَاءَهُمْ يَوْمًا ثَقِيلًا", translation: "Indeed, these people love the immediate life and leave behind them a heavy Day." },
    { ayah: 28, arabic: "نَّحْنُ خَلَقْنَاهُمْ وَشَدَدْنَا أَسْرَهُمْ ۖ وَإِذَا شِئْنَا بَدَّلْنَا أَمْثَالَهُمْ تَبْدِيلًا", translation: "We created them and strengthened their forms. And when We will, We can replace them with others like them." },
    { ayah: 29, arabic: "إِنَّ هَـٰذِهِ تَذْكِرَةٌ ۖ فَمَن شَاءَ اتَّخَذَ إِلَىٰ رَبِّهِ سَبِيلًا", translation: "Indeed, this is a reminder. So whoever wills may take to his Lord a path." },
    { ayah: 30, arabic: "وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ اللَّهُ ۚ إِنَّ اللَّهَ كَانَ عَلِيمًا حَكِيمًا", translation: "And you do not will except that Allah wills. Indeed, Allah is ever Knowing and Wise." },
    { ayah: 31, arabic: "يُدْخِلُ مَن يَشَاءُ فِي رَحْمَتِهِ ۚ وَالظَّالِمِينَ أَعَدَّ لَهُمْ عَذَابًا أَلِيمًا", translation: "He admits whom He wills into His mercy; but the wrongdoers — He has prepared for them a painful punishment." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Gift Unwrapped",
      subtitle: "Five movements: nothingness → fork → deed → garden → sovereignty",
      sections: [
        { ayahs: "1–3", title: "The Question of Origin", color: "#4ecdc4", desc: "You were nothing worth mentioning. Then fluid, then hearing and sight, then the path — grateful or ungrateful. Two words set up everything: shakir and kafur." },
        { ayahs: "4–6", title: "The Fork", color: "#e07a8a", desc: "Punishment dispatched in a single ayah — chains, shackles, fire. Then the door opens to the righteous: a cup mixed with camphor, a spring that responds to their will. The surah has no interest in lingering with punishment." },
        { ayahs: "7–10", title: "The Deed That Earned It", color: "#C9A84C", isPivot: true, desc: "They fulfill vows. They feed the poor, the orphan, the captive — despite loving the food. Their motive, spoken in the first person: 'We feed you only for the face of Allah.' This is the pivot on which the entire Paradise rests." },
        { ayahs: "11–22", title: "The Garden Unfurled", color: "#9b7fd4", desc: "Eighteen ayahs of unbroken reward. Radiance and joy. Silk and shade. Silver vessels, crystal cups. Camphor, ginger, Salsabil. Attendants like scattered pearls. And the final gift: a purifying drink from their Lord's own hand." },
        { ayahs: "23–31", title: "The Return to Sovereignty", color: "#4ecdc4", desc: "Direct address to the Prophet — patience, worship, refusal to obey the sinful. Then the widest frame: creation, divine will, the reminder that choice operates within permission. Mercy and punishment, both under Allah's sovereign decision." },
      ],
    },
    chiasticRing: {
      title: "The Echo",
      subtitle: "Grateful/ungrateful at the opening mirrors mercy/punishment at the close",
      pairs: [
        {
          left: { label: "Nothing Worth Mentioning", ayahs: "1", desc: "You were absent from existence — no one spoke your name, no one knew you were coming" },
          right: { label: "Divine Sovereignty", ayahs: "29–31", desc: "He admits whom He wills into mercy. Your existence was a grant; your return is under His will" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Grateful or Ungrateful", ayahs: "3", desc: "Shakir and kafur — the fork that governs everything that follows" },
          right: { label: "Appreciated", ayahs: "22", desc: "Mashkura — your striving is recognized. The thanks you refused from people, Allah gives Himself" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Pure Intention", ayahs: "8–9",
        desc: "They give food despite their love for it. We feed you only for the face of Allah.",
        note: "The ethical center: one act of feeding, performed with complete sincerity, generates eighteen ayahs of divine response. The quantity of the deed is not what earns Paradise — the quality of intention is.",
      },
    },
    deductiveFunnel: {
      title: "The Three Drinks",
      subtitle: "A journey inward from a public spring to a cup from the hand of Allah",
      layers: [
        { depth: 1, label: "Camphor", ayah: "5", arabic: "كَانَ مِزَاجُهَا كَافُورًا", desc: "Cool, fragrant, soothing. The first taste of Paradise — described by its ingredient. A hapax legomenon: kafur appears only here in the entire Quran.", color: "#4ecdc4" },
        { depth: 2, label: "Ginger", ayah: "17", arabic: "كَانَ مِزَاجُهَا زَنجَبِيلًا", desc: "Warm, stimulating, invigorating. Described by its source — a spring named Salsabil. Another hapax legomenon: zanjabil appears only here. The surah alternates coolness and warmth.", color: "#e07a8a" },
        { depth: 3, label: "The Purifying Drink", ayah: "21", arabic: "وَسَقَاهُمْ رَبُّهُمْ شَرَابًا طَهُورًا", desc: "Described not by ingredient or source, but by its giver — their Lord Himself. Tahur means both purifying and pure. After all physical luxury, the final gift cleanses whatever remains of earthly residue.", color: "#C9A84C" },
        { depth: 4, label: "The Seeker Finds", ayah: "9→21", arabic: "لِوَجْهِ اللَّهِ → سَقَاهُمْ رَبُّهُمْ", desc: "The face sought in 76:9 becomes, in 76:21, the Lord who personally serves the drink. The seeker of Allah's face finds Allah facing them.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah draws through desire, not through fear — and its absences prove it",
      absences: [
        { item: "No destroyed nations", note: "No Pharaoh, no ʿAd, no Thamud. The surah does not warn through history. It draws through the promise of what generosity earns." },
        { item: "No prophets' stories", note: "No narrative of any messenger. The surah speaks directly about the righteous as a type — unnamed, unlocated, defined only by their deeds and their intention." },
        { item: "No extended debate with disbelievers", note: "Their arguments are never cited, never refuted. Punishment is dispatched in one ayah and left behind. The surah has chosen its audience: those who might be drawn, not those who must be warned." },
        { item: "Near-total absence of Hell imagery", note: "One ayah of chains and fire (76:4), then silence. The surah devotes roughly five times as much space to reward as to punishment. The design choice is unmistakable." },
        { item: "No mention of rahma as a word (until the last ayah)", note: "The word 'mercy' appears only in 76:31, at the very end. The entire surah performs mercy without naming it — until the closing frame reveals that everything described was an expression of it." },
      ],
    },
  },

  contentNodes: [
    { concept: "Li-wajhillah — feeding for the face of Allah", type: "surah-specific", articleSlug: "li-wajhillah-feeding-76-9" },
    { concept: "The three drinks — camphor, ginger, purifying", type: "surah-specific", articleSlug: "three-drinks-paradise-76" },
    { concept: "Shakir-kafur to mashkura — the gratitude arc", type: "cross-surah", articleSlug: "shakir-kafur-mashkura-gratitude" },
    { concept: "Al-Qiyamah to Al-Insan — courtroom then garden", type: "cross-surah", articleSlug: "qiyamah-insan-courtroom-garden" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "echo", label: "Echo" },
  { id: "drinks", label: "Drinks" },
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
        Cool → warm → purifying → the seeker finds the Sought
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
              <div className="text-2xl font-bold text-gold-500 font-serif">3</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Drinks</div>
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "echo" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "drinks" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
