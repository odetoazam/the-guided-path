"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH IBRAHIM — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ibrahim
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ibrahim",
  arabicName: "إبراهيم",
  meaning: "Abraham",
  number: 14,
  ayahCount: 52,
  period: "Makki",
  juz: 13,
  movements: 4,
  thesis:
    "A surah about the weight of words — what kind of word have you built your life on, and will it hold? — answered through two trees, Satan's courtroom confession, and Ibrahim's prayer planted in barren ground.",
  reflectionUrl: "/surahs/ibrahim",
  readTime: "22 min read",

  sciencesActive: [{"key":"amthal","english":"Parables"},{"key":"balaghah","english":"Rhetoric"},{"key":"qasas","english":"Quranic Narratives"}],
  heartVerse: {
    arabic: "أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ",
    ayahRef: "14:24",
    translation: "Have you not seen how Allah sets forth a parable? A good word is like a good tree: its root is firm and its branch is in the sky.",
    why: "The surah's thesis made visible. The good tree has three qualities — deep roots, high branches, continuous fruit. The evil tree has one: no place to stand. The entire surah builds toward this image: messengers spoke true words and were rejected; nations spoke false words and were destroyed. The parable makes the pattern visible in a single image.",
  },

  audio: { surahNumber: 14, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الر ۚ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ لِتُخْرِجَ النَّاسَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ بِإِذْنِ رَبِّهِمْ إِلَىٰ صِرَاطِ الْعَزِيزِ الْحَمِيدِ", translation: "Alif Lam Ra. A Book We have sent down to you so that you may bring people out of darknesses into light, by permission of their Lord, to the path of the Almighty, the Praiseworthy." },
    { ayah: 2, arabic: "اللَّهِ الَّذِي لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ وَوَيْلٌ لِّلْكَافِرِينَ مِنْ عَذَابٍ شَدِيدٍ", translation: "Allah, to whom belongs whatever is in the heavens and whatever is on the earth. And woe to the disbelievers from a severe punishment." },
    { ayah: 3, arabic: "الَّذِينَ يَسْتَحِبُّونَ الْحَيَاةَ الدُّنْيَا عَلَى الْآخِرَةِ وَيَصُدُّونَ عَن سَبِيلِ اللَّهِ وَيَبْغُونَهَا عِوَجًا ۚ أُولَـٰئِكَ فِي ضَلَالٍ بَعِيدٍ", translation: "Those who prefer the life of this world over the Hereafter and avert people from the way of Allah, seeking to make it crooked — those are in extreme error." },
    { ayah: 4, arabic: "وَمَا أَرْسَلْنَا مِن رَّسُولٍ إِلَّا بِلِسَانِ قَوْمِهِ لِيُبَيِّنَ لَهُمْ ۖ فَيُضِلُّ اللَّهُ مَن يَشَاءُ وَيَهْدِي مَن يَشَاءُ ۚ وَهُوَ الْعَزِيزُ الْحَكِيمُ", translation: "And We did not send any messenger except in the language of his people to make things clear to them. Then Allah leads astray whom He wills and guides whom He wills. And He is the Almighty, the Wise." },
    { ayah: 5, arabic: "وَلَقَدْ أَرْسَلْنَا مُوسَىٰ بِآيَاتِنَا أَنْ أَخْرِجْ قَوْمَكَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ وَذَكِّرْهُم بِأَيَّامِ اللَّهِ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّكُلِّ صَبَّارٍ شَكُورٍ", translation: "And We certainly sent Musa with Our signs, saying: 'Bring your people out of darknesses into light and remind them of the days of Allah.' Indeed, in that are signs for everyone patient and grateful." },
    { ayah: 7, arabic: "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ", translation: "And when your Lord proclaimed: 'If you are grateful, I will give you more; but if you are ungrateful, My punishment is severe.'" },
    { ayah: 8, arabic: "وَقَالَ مُوسَىٰ إِن تَكْفُرُوا أَنتُمْ وَمَن فِي الْأَرْضِ جَمِيعًا فَإِنَّ اللَّهَ لَغَنِيٌّ حَمِيدٌ", translation: "And Musa said: 'If you disbelieve — you and everyone on earth together — indeed, Allah is Self-Sufficient, Praiseworthy.'" },
    { ayah: 22, arabic: "وَقَالَ الشَّيْطَانُ لَمَّا قُضِيَ الْأَمْرُ إِنَّ اللَّهَ وَعَدَكُمْ وَعْدَ الْحَقِّ وَوَعَدتُّكُمْ فَأَخْلَفْتُكُمْ ۖ وَمَا كَانَ لِيَ عَلَيْكُم مِّن سُلْطَانٍ إِلَّا أَن دَعَوْتُكُمْ فَاسْتَجَبْتُمْ لِي ۖ فَلَا تَلُومُونِي وَلُومُوا أَنفُسَكُمْ", translation: "And Satan will say when the matter has been decided: 'Indeed, Allah promised you the promise of truth, and I promised you, but I betrayed you. I had no authority over you except that I called you and you responded to me. So do not blame me; blame yourselves.'" },
    { ayah: 24, arabic: "أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ", translation: "Have you not seen how Allah sets forth a parable? A good word is like a good tree: its root is firm and its branch is in the sky." },
    { ayah: 25, arabic: "تُؤْتِي أُكُلَهَا كُلَّ حِينٍ بِإِذْنِ رَبِّهَا ۗ وَيَضْرِبُ اللَّهُ الْأَمْثَالَ لِلنَّاسِ لَعَلَّهُمْ يَتَذَكَّرُونَ", translation: "It gives its fruit in every season by permission of its Lord. And Allah sets forth parables for people so that they may remember." },
    { ayah: 26, arabic: "وَمَثَلُ كَلِمَةٍ خَبِيثَةٍ كَشَجَرَةٍ خَبِيثَةٍ اجْتُثَّتْ مِن فَوْقِ الْأَرْضِ مَا لَهَا مِن قَرَارٍ", translation: "And the parable of an evil word is like an evil tree, uprooted from the surface of the earth — it has no stability." },
    { ayah: 27, arabic: "يُثَبِّتُ اللَّهُ الَّذِينَ آمَنُوا بِالْقَوْلِ الثَّابِتِ فِي الْحَيَاةِ الدُّنْيَا وَفِي الْآخِرَةِ ۖ وَيُضِلُّ اللَّهُ الظَّالِمِينَ ۚ وَيَفْعَلُ اللَّهُ مَا يَشَاءُ", translation: "Allah keeps firm those who believe with the firm word in the life of this world and in the Hereafter. And Allah lets the wrongdoers go astray. And Allah does what He wills." },
    { ayah: 34, arabic: "وَإِن تَعُدُّوا نِعْمَتَ اللَّهِ لَا تُحْصُوهَا ۗ إِنَّ الْإِنسَانَ لَظَلُومٌ كَفَّارٌ", translation: "And if you should count the blessings of Allah, you could not enumerate them. Indeed, the human being is truly unjust and ungrateful." },
    { ayah: 35, arabic: "وَإِذْ قَالَ إِبْرَاهِيمُ رَبِّ اجْعَلْ هَـٰذَا الْبَلَدَ آمِنًا وَاجْنُبْنِي وَبَنِيَّ أَن نَّعْبُدَ الْأَصْنَامَ", translation: "And when Ibrahim said: 'My Lord, make this city secure and keep me and my sons away from worshipping idols.'" },
    { ayah: 37, arabic: "رَّبَّنَا إِنِّي أَسْكَنتُ مِن ذُرِّيَّتِي بِوَادٍ غَيْرِ ذِي زَرْعٍ عِندَ بَيْتِكَ الْمُحَرَّمِ رَبَّنَا لِيُقِيمُوا الصَّلَاةَ فَاجْعَلْ أَفْئِدَةً مِّنَ النَّاسِ تَهْوِي إِلَيْهِمْ وَارْزُقْهُم مِّنَ الثَّمَرَاتِ لَعَلَّهُمْ يَشْكُرُونَ", translation: "Our Lord, I have settled some of my descendants in a valley without cultivation near Your Sacred House — our Lord, that they may establish prayer. So make hearts among the people incline toward them, and provide them with fruits that they might be grateful." },
    { ayah: 40, arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ", translation: "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, accept my prayer." },
    { ayah: 41, arabic: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ", translation: "Our Lord, forgive me and my parents and the believers on the Day the account is established." },
    { ayah: 42, arabic: "وَلَا تَحْسَبَنَّ اللَّهَ غَافِلًا عَمَّا يَعْمَلُ الظَّالِمُونَ ۚ إِنَّمَا يُؤَخِّرُهُمْ لِيَوْمٍ تَشْخَصُ فِيهِ الْأَبْصَارُ", translation: "Do not think that Allah is unaware of what the wrongdoers do. He only delays them for a Day when eyes will stare in horror." },
    { ayah: 48, arabic: "يَوْمَ تُبَدَّلُ الْأَرْضُ غَيْرَ الْأَرْضِ وَالسَّمَاوَاتُ ۖ وَبَرَزُوا لِلَّهِ الْوَاحِدِ الْقَهَّارِ", translation: "On the Day the earth will be replaced by another earth, and the heavens as well, and all will come forth before Allah, the One, the Prevailing." },
    { ayah: 52, arabic: "هَـٰذَا بَلَاغٌ لِّلنَّاسِ وَلِيُنذَرُوا بِهِ وَلِيَعْلَمُوا أَنَّمَا هُوَ إِلَـٰهٌ وَاحِدٌ وَلِيَذَّكَّرَ أُولُو الْأَلْبَابِ", translation: "This is a message for humanity, that they may be warned by it, and that they may know that He is One God, and that people of understanding may remember." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Architecture",
      subtitle: "Four movements: mission → consequences → two trees → Ibrahim's prayer",
      sections: [
        { ayahs: "1–12", title: "From Darkness to Light", color: "#4ecdc4", desc: "Every messenger sent with the same mission: bring people from darknesses (plural) into light (singular). Musa reminds Banu Isra'il. The anchor verse: 'If you are grateful, I will give you more; if you are ungrateful, My punishment is severe.' Gratitude and ingratitude — shukr and kufr — will run through the entire surah." },
        { ayahs: "13–22", title: "The Consequences", color: "#e07a8a", desc: "Rejection plays out in visceral images: water like pus, deeds like ashes in a storm. Then the scene found nowhere else in the Quran — Satan stands on Judgment Day and confesses: 'I had no authority over you. I only called and you answered. Blame yourselves.' His empty words are the evil tree about to be described." },
        { ayahs: "23–34", title: "The Two Trees", color: "#C9A84C", isPivot: true, desc: "The surah's center. A good word is a tree with firm roots and branches in the sky, bearing fruit every season. An evil word is a tree torn from the earth, holding nothing. Then the signs of provision — sun, moon, rivers — and the diagnosis: the human being is truly unjust and ungrateful." },
        { ayahs: "35–52", title: "Ibrahim's Prayer", color: "#9b7fd4", desc: "Ibrahim stands in a barren valley and plants a prayer. Make this city safe. Establish prayer. Draw hearts here. Forgive me and my parents and all believers on the Day of Reckoning. His du'a is the living example of kalima tayyiba — rooted in tawhid, reaching upward, bearing fruit in every generation." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's ring structure centers on the parable of the two trees",
      pairs: [
        {
          left: { label: "Darkness → Light", ayahs: "1–8", desc: "The Book's mission: bring people from darknesses into light — offered as path, not compulsion" },
          right: { label: "The Final Gathering", ayahs: "42–52", desc: "The Day when the earth is replaced with another earth, all stand before the One, the Prevailing" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Rejected Messengers", ayahs: "9–12", desc: "Prophets rejected by their nations — 'We are only humans like you, but Allah favors whom He wills'" },
          right: { label: "Ibrahim's Prayer", ayahs: "35–41", desc: "Rejection's mirror: a prophet who builds through prayer in a valley where nothing grows" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Satan's Confession", ayahs: "22", desc: "Satan admits he had no authority — his call had nothing behind it, no force, no proof" },
          right: { label: "Signs of Real Power", ayahs: "28–34", desc: "The sun, moon, rivers, night and day — Allah's actual provision, uncountable blessings" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Two Trees", ayahs: "24–27",
        desc: "A good word is like a good tree — root firm, branch in the sky, fruit every season. An evil word is a tree torn from the earth, no stability.",
        note: "Satan's speech is what a kalima khabitha sounds like when it finally tells the truth about itself. Ibrahim's prayer is what a kalima tayyiba sounds like when it is planted in barren ground and bears fruit for fourteen centuries.",
      },
    },
    deductiveFunnel: {
      title: "The Weight of Words",
      subtitle: "Each layer strips away one more illusion about what holds and what collapses",
      layers: [
        { depth: 1, label: "The Mission", ayah: "1", arabic: "لِتُخْرِجَ النَّاسَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ", desc: "Darknesses (plural) versus light (singular). Darkness comes in varieties; light is one. That asymmetry shapes the whole surah — disbelief is fractured, faith is unified, and the question is which direction you are walking.", color: "#4ecdc4" },
        { depth: 2, label: "The Confession", ayah: "22", arabic: "مَا كَانَ لِيَ عَلَيْكُم مِّن سُلْطَانٍ", desc: "Satan's admission: sultan means authority, proof, compelling power. He never had any. His entire operation was an invitation with nothing behind it. Every person who followed did so freely. The responsibility rests entirely with the one who chose.", color: "#e07a8a" },
        { depth: 3, label: "The Firm Word", ayah: "27", arabic: "يُثَبِّتُ اللَّهُ الَّذِينَ آمَنُوا بِالْقَوْلِ الثَّابِتِ", desc: "Al-qawl al-thabit — the word that holds. The root system of the good tree. The word you live by is the word that holds you when the ground gives way.", color: "#C9A84C" },
        { depth: 4, label: "The Barren Valley", ayah: "37", arabic: "بِوَادٍ غَيْرِ ذِي زَرْعٍ", desc: "Ibrahim plants prayer in a valley without cultivation. No trees grow there. Yet from this planting comes Makkah, the Ka'bah, the entire prophetic line. The kalima tayyiba does not need fertile soil — it makes its own fertility.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah is interested in the logic of acceptance and rejection, not the details of either",
      absences: [
        { item: "No legal commands", note: "Almost no legal content — no prayer times, dietary laws, inheritance, or social conduct. The surah works through images and arguments, not prescriptions. It is diagnosis: what happens when you receive a message and what happens when you refuse it." },
        { item: "No extended narratives", note: "Musa appears in a few ayahs, the destroyed nations in a few more, Ibrahim only at the end. The surah is not telling stories — it is extracting the logic that runs through all of them. The pattern matters more than the plot." },
        { item: "No speech for Ibrahim — only prayer", note: "Satan gets a speech (horizontal, to his followers, disowning them). Ibrahim gets a prayer (vertical, to his Lord, asking for them). The difference between a speech and a prayer is the surah's deepest argument about what a kalima is for." },
        { item: "No fertile ground for Ibrahim's planting", note: "The surah describes Ibrahim's valley as 'without cultivation' — ghayri dhi zar'. The good tree of the parable is planted in the worst possible soil. The argument: rootedness does not depend on circumstances. It depends on who you are speaking to." },
        { item: "No certainty about outcomes for Ibrahim", note: "Ibrahim asks God to accept his prayer — Rabbana taqabbal du'a'. A prophet unsure that his prayer will be heard, asking for the acceptance of the very asking. Rootedness is not certainty about outcomes. It is certainty about who you are speaking to." },
      ],
    },
  },

  contentNodes: [
    { concept: "The two trees — kalima tayyiba and kalima khabitha", type: "surah-specific", articleSlug: "two-trees-parable-14-24" },
    { concept: "Satan's courtroom confession — the powerless deceiver", type: "surah-specific", articleSlug: "satan-confession-14-22" },
    { concept: "Ibrahim–Ar-Ra'd triptych: from soil to tree", type: "cross-surah", articleSlug: "rad-ibrahim-triptych" },
    { concept: "Zulumaat vs Nur — plural darkness, singular light", type: "cross-surah", articleSlug: "zulumaat-nur-darkness-light" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "architecture", label: "Architecture" },
  { id: "ring", label: "Ring" },
  { id: "words", label: "Words" },
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
        Mission → confession → firmness → planting
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
          {activeTab === "architecture" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "words" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
