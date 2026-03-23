"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TUR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-tur
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Tur",
  arabicName: "الطُّور",
  meaning: "The Mount",
  number: 52,
  ayahCount: 49,
  period: "Makki",
  juz: 27,
  movements: 4,
  thesis:
    "A forty-nine-ayah cross-examination that swears by five cosmic realities, shows you the fire and the garden, dismantles every excuse for denial with fifteen unanswerable questions, and then leaves you standing alone before dawn — glorifying your Lord while the stars retreat.",
  reflectionUrl: "/surahs/at-tur",
  readTime: "20 min read",

  sciencesActive: [{"key":"qasam","english":"Oaths"},{"key":"balaghah","english":"Rhetoric"},{"key":"ijaz","english":"Inimitability"}],
  heartVerse: {
    arabic: "أَمْ خُلِقُوا مِنْ غَيْرِ شَيْءٍ أَمْ هُمُ الْخَالِقُونَ",
    ayahRef: "52:35",
    translation: "Were they created from nothing, or are they themselves the creators?",
    why: "The question that has no answer. If you were not created by anything, you emerged from absolute nothing — and nothing does not produce something. If you created yourselves, you existed before you existed. Both options are impossible. The only remaining possibility is the one the denier refuses to name. This is the hinge of the entire surah — the question everything before has been building toward and everything after radiates from.",
  },

  audio: { surahNumber: 52, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "وَالطُّورِ", translation: "By the Mount," },
    { ayah: 2, arabic: "وَكِتَابٍ مَّسْطُورٍ", translation: "and a Book inscribed," },
    { ayah: 3, arabic: "فِي رَقٍّ مَّنشُورٍ", translation: "in parchment unrolled," },
    { ayah: 4, arabic: "وَالْبَيْتِ الْمَعْمُورِ", translation: "and the frequented House," },
    { ayah: 5, arabic: "وَالسَّقْفِ الْمَرْفُوعِ", translation: "and the raised ceiling," },
    { ayah: 6, arabic: "وَالْبَحْرِ الْمَسْجُورِ", translation: "and the sea set aflame —" },
    { ayah: 7, arabic: "إِنَّ عَذَابَ رَبِّكَ لَوَاقِعٌ", translation: "indeed, the punishment of your Lord will occur." },
    { ayah: 8, arabic: "مَّا لَهُ مِن دَافِعٍ", translation: "There is nothing to avert it." },
    { ayah: 9, arabic: "يَوْمَ تَمُورُ السَّمَاءُ مَوْرًا", translation: "The Day the sky will sway with circular motion," },
    { ayah: 10, arabic: "وَتَسِيرُ الْجِبَالُ سَيْرًا", translation: "and the mountains will walk with movement." },
    { ayah: 11, arabic: "فَوَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ", translation: "Woe, that Day, to the deniers —" },
    { ayah: 12, arabic: "الَّذِينَ هُمْ فِي خَوْضٍ يَلْعَبُونَ", translation: "those who were in discourse, amusing themselves." },
    { ayah: 13, arabic: "يَوْمَ يُدَعُّونَ إِلَىٰ نَارِ جَهَنَّمَ دَعًّا", translation: "The Day they are thrust toward the fire of Hell with a violent thrust." },
    { ayah: 14, arabic: "هَـٰذِهِ النَّارُ الَّتِي كُنتُم بِهَا تُكَذِّبُونَ", translation: "'This is the Fire which you used to deny.'" },
    { ayah: 15, arabic: "أَفَسِحْرٌ هَـٰذَا أَمْ أَنتُمْ لَا تُبْصِرُونَ", translation: "'Is this magic, or do you not see?'" },
    { ayah: 16, arabic: "اصْلَوْهَا فَاصْبِرُوا أَوْ لَا تَصْبِرُوا سَوَاءٌ عَلَيْكُمْ ۖ إِنَّمَا تُجْزَوْنَ مَا كُنتُمْ تَعْمَلُونَ", translation: "'Burn therein. Be patient or impatient — it is all the same for you. You are only recompensed for what you used to do.'" },
    { ayah: 17, arabic: "إِنَّ الْمُتَّقِينَ فِي جَنَّاتٍ وَنَعِيمٍ", translation: "Indeed, the righteous will be in gardens and pleasure," },
    { ayah: 18, arabic: "فَاكِهِينَ بِمَا آتَاهُمْ رَبُّهُمْ وَوَقَاهُمْ رَبُّهُمْ عَذَابَ الْجَحِيمِ", translation: "enjoying what their Lord has given them, and their Lord protected them from the punishment of Hellfire." },
    { ayah: 19, arabic: "كُلُوا وَاشْرَبُوا هَنِيئًا بِمَا كُنتُمْ تَعْمَلُونَ", translation: "'Eat and drink in satisfaction for what you used to do.'" },
    { ayah: 20, arabic: "مُتَّكِئِينَ عَلَىٰ سُرُرٍ مَّصْفُوفَةٍ ۖ وَزَوَّجْنَاهُم بِحُورٍ عِينٍ", translation: "Reclining on thrones arranged in rows, and We will marry them to fair women with large, beautiful eyes." },
    { ayah: 21, arabic: "وَالَّذِينَ آمَنُوا وَاتَّبَعَتْهُمْ ذُرِّيَّتُهُم بِإِيمَانٍ أَلْحَقْنَا بِهِمْ ذُرِّيَّتَهُمْ وَمَا أَلَتْنَاهُم مِّنْ عَمَلِهِم مِّن شَيْءٍ", translation: "And those who believed and whose descendants followed them in faith — We will join with them their descendants, and We will not deprive them of anything of their deeds." },
    { ayah: 22, arabic: "كُلُّ امْرِئٍ بِمَا كَسَبَ رَهِينٌ", translation: "Every person is pledged for what he has earned." },
    { ayah: 23, arabic: "وَأَمْدَدْنَاهُم بِفَاكِهَةٍ وَلَحْمٍ مِّمَّا يَشْتَهُونَ", translation: "And We will provide them with fruit and meat from whatever they desire." },
    { ayah: 24, arabic: "يَتَنَازَعُونَ فِيهَا كَأْسًا لَّا لَغْوٌ فِيهَا وَلَا تَأْثِيمٌ", translation: "They will exchange a cup in which there is no ill speech and no sin." },
    { ayah: 25, arabic: "وَيَطُوفُ عَلَيْهِمْ غِلْمَانٌ لَّهُمْ كَأَنَّهُمْ لُؤْلُؤٌ مَّكْنُونٌ", translation: "And there will circulate among them young attendants as if they were pearls well-protected." },
    { ayah: 26, arabic: "وَأَقْبَلَ بَعْضُهُمْ عَلَىٰ بَعْضٍ يَتَسَاءَلُونَ", translation: "And they will turn to one another, asking each other," },
    { ayah: 27, arabic: "قَالُوا إِنَّا كُنَّا قَبْلُ فِي أَهْلِنَا مُشْفِقِينَ", translation: "'Indeed, we were previously among our people, fearful.'" },
    { ayah: 28, arabic: "فَمَنَّ اللَّهُ عَلَيْنَا وَوَقَانَا عَذَابَ السَّمُومِ", translation: "'So Allah conferred favor upon us and protected us from the punishment of the Scorching Fire.'" },
    { ayah: 29, arabic: "فَذَكِّرْ فَمَا أَنتَ بِنِعْمَتِ رَبِّكَ بِكَاهِنٍ وَلَا مَجْنُونٍ", translation: "So remind, for you are not, by the favor of your Lord, a soothsayer or a madman." },
    { ayah: 30, arabic: "أَمْ يَقُولُونَ شَاعِرٌ نَّتَرَبَّصُ بِهِ رَيْبَ الْمَنُونِ", translation: "Or do they say, 'A poet — we await for him a misfortune of time'?" },
    { ayah: 31, arabic: "قُلْ تَرَبَّصُوا فَإِنِّي مَعَكُم مِّنَ الْمُتَرَبِّصِينَ", translation: "Say, 'Wait, for indeed I am, with you, among those who wait.'" },
    { ayah: 32, arabic: "أَمْ تَأْمُرُهُمْ أَحْلَامُهُم بِهَـٰذَا ۚ أَمْ هُمْ قَوْمٌ طَاغُونَ", translation: "Or do their minds command them to do this, or are they a transgressing people?" },
    { ayah: 33, arabic: "أَمْ يَقُولُونَ تَقَوَّلَهُ ۚ بَل لَّا يُؤْمِنُونَ", translation: "Or do they say, 'He made it up'? Rather, they do not believe." },
    { ayah: 34, arabic: "فَلْيَأْتُوا بِحَدِيثٍ مِّثْلِهِ إِن كَانُوا صَادِقِينَ", translation: "Then let them produce a statement like it, if they are truthful." },
    { ayah: 35, arabic: "أَمْ خُلِقُوا مِنْ غَيْرِ شَيْءٍ أَمْ هُمُ الْخَالِقُونَ", translation: "Or were they created from nothing, or are they themselves the creators?" },
    { ayah: 36, arabic: "أَمْ خَلَقُوا السَّمَاوَاتِ وَالْأَرْضَ ۚ بَل لَّا يُوقِنُونَ", translation: "Or did they create the heavens and the earth? Rather, they are not certain." },
    { ayah: 37, arabic: "أَمْ عِندَهُمْ خَزَائِنُ رَبِّكَ أَمْ هُمُ الْمُصَيْطِرُونَ", translation: "Or do they possess the treasuries of your Lord, or are they the controllers?" },
    { ayah: 38, arabic: "أَمْ لَهُمْ سُلَّمٌ يَسْتَمِعُونَ فِيهِ ۖ فَلْيَأْتِ مُسْتَمِعُهُم بِسُلْطَانٍ مُّبِينٍ", translation: "Or do they have a stairway by which they listen? Then let their listener produce a clear authority." },
    { ayah: 39, arabic: "أَمْ لَهُ الْبَنَاتُ وَلَكُمُ الْبَنُونَ", translation: "Or does He have daughters while you have sons?" },
    { ayah: 40, arabic: "أَمْ تَسْأَلُهُمْ أَجْرًا فَهُم مِّن مَّغْرَمٍ مُّثْقَلُونَ", translation: "Or do you ask of them a payment, so they are burdened by debt?" },
    { ayah: 41, arabic: "أَمْ عِندَهُمُ الْغَيْبُ فَهُمْ يَكْتُبُونَ", translation: "Or do they possess the unseen, so they write it down?" },
    { ayah: 42, arabic: "أَمْ يُرِيدُونَ كَيْدًا ۖ فَالَّذِينَ كَفَرُوا هُمُ الْمَكِيدُونَ", translation: "Or do they intend a plan? But those who disbelieve — they are the object of a plan." },
    { ayah: 43, arabic: "أَمْ لَهُمْ إِلَـٰهٌ غَيْرُ اللَّهِ ۚ سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ", translation: "Or do they have a deity other than Allah? Exalted is Allah above whatever they associate with Him." },
    { ayah: 44, arabic: "وَإِن يَرَوْا كِسْفًا مِّنَ السَّمَاءِ سَاقِطًا يَقُولُوا سَحَابٌ مَّرْكُومٌ", translation: "And if they see a piece of the sky falling, they would say, 'Clouds heaped up.'" },
    { ayah: 45, arabic: "فَذَرْهُمْ حَتَّىٰ يُلَاقُوا يَوْمَهُمُ الَّذِي فِيهِ يُصْعَقُونَ", translation: "So leave them until they meet their Day in which they will be struck insensible." },
    { ayah: 46, arabic: "يَوْمَ لَا يُغْنِي عَنْهُمْ كَيْدُهُمْ شَيْئًا وَلَا هُمْ يُنصَرُونَ", translation: "The Day their plan will not avail them at all, nor will they be helped." },
    { ayah: 47, arabic: "وَإِنَّ لِلَّذِينَ ظَلَمُوا عَذَابًا دُونَ ذَٰلِكَ وَلَـٰكِنَّ أَكْثَرَهُمْ لَا يَعْلَمُونَ", translation: "And indeed, for those who have wronged is a punishment before that, but most of them do not know." },
    { ayah: 48, arabic: "وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا ۖ وَسَبِّحْ بِحَمْدِ رَبِّكَ حِينَ تَقُومُ", translation: "And be patient for the decision of your Lord, for indeed you are in Our eyes. And exalt with praise of your Lord when you arise." },
    { ayah: 49, arabic: "وَمِنَ اللَّيْلِ فَسَبِّحْهُ وَإِدْبَارَ النُّجُومِ", translation: "And in the night glorify Him, and after the setting of the stars." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Cross-Examination",
      subtitle: "Four waves: cosmic oaths → garden → demolition → predawn worship",
      sections: [
        { ayahs: "1–16", title: "The Oaths and the Fire", color: "#e07a8a", desc: "Five cosmic oaths — mountain, book, frequented house, raised ceiling, sea set aflame — each larger than the last, building until the verdict crashes down: the punishment will occur, and nothing can avert it. The Day itself is compressed to two images: the sky churning, the mountains walking. Then the deniers are shoved into the Fire they called a lie." },
        { ayahs: "17–28", title: "The Garden and the Reunion", color: "#4ecdc4", desc: "The sharpest pivot in the Quran. Without transition, gardens and pleasure replace fire and ruin. The believers recline on thrones, their children joined to them with no one's reward diminished. Cups are passed without empty talk. And looking back, they say: 'We were previously fearful' — and discover that Allah was al-Barr al-Rahim all along." },
        { ayahs: "29–47", title: "The Fifteen Questions", color: "#C9A84C", isPivot: true, desc: "The intellectual core. Fifteen rhetorical questions driven by the particle am — each one removing a floor from beneath the skeptic's position. Were you created from nothing? Did you create the heavens? Do you possess God's treasuries? Do you have a stairway to heaven? The questions accumulate until there is nowhere left to stand." },
        { ayahs: "48–49", title: "The Predawn Commission", color: "#9b7fd4", desc: "The confrontation ends. The tone shifts to intimate counsel: be patient, for you are in Our eyes. Glorify your Lord when you arise, and in the night, and after the retreat of the stars. The surah that opened with a mountain closes with one man's worship before dawn." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Cosmic testimony resolves into personal worship, reason at the center",
      pairs: [
        {
          left: { label: "Cosmic Oaths", ayahs: "1–8", desc: "Five oaths building from mountain to sea set aflame — the certainty of punishment, with nothing to avert it" },
          right: { label: "Final Warning", ayahs: "44–47", desc: "Even a piece of the sky falling would be rationalized — their denial is not about evidence but will" },
          color: "#e07a8a",
        },
        {
          left: { label: "Day of Fire", ayahs: "9–16", desc: "The sky churns, mountains walk, the deniers are thrust into the Fire — 'Is this magic, or do you not see?'" },
          right: { label: "Predawn Worship", ayahs: "48–49", desc: "You are in Our eyes. Glorify Him when you arise, and after the setting of the stars" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Paradise Reunion", ayahs: "17–28", desc: "Gardens, thrones, children reunited, cups without sin — 'We were fearful, and Allah was al-Barr'" },
          right: { label: "Accusations Dismissed", ayahs: "29–34", desc: "Not a soothsayer, not a madman, not a poet — the Prophet asked for nothing and fabricated nothing" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Unanswerable Questions", ayahs: "35–43",
        desc: "Were they created from nothing? Did they create the heavens? Do they have a deity other than Allah?",
        note: "Reason sits at the heart of the surah, flanked by consequence and reward. The architecture argues that reason is the corridor from cosmic reality to personal devotion.",
      },
    },
    deductiveFunnel: {
      title: "The Rabb Thread",
      subtitle: "The word Rabb (Lord) threads through the surah at every structurally significant point",
      layers: [
        { depth: 1, label: "Lord of Punishment", ayah: "7", arabic: "إِنَّ عَذَابَ رَبِّكَ لَوَاقِعٌ", desc: "The punishment of your Lord will occur. Rabb as the sovereign whose judgment is inescapable — the name that means master, sustainer, the one who raises and nourishes.", color: "#e07a8a" },
        { depth: 2, label: "Lord of Provision", ayah: "17–18", arabic: "بِمَا آتَاهُمْ رَبُّهُمْ", desc: "Enjoying what their Lord has given them, and their Lord protected them. Rabb as the source of every good thing in Paradise — the sustainer whose care extends beyond death.", color: "#4ecdc4" },
        { depth: 3, label: "Lord of the Treasuries", ayah: "37", arabic: "أَمْ عِندَهُمْ خَزَائِنُ رَبِّكَ", desc: "Do they possess the treasuries of your Lord? Rabb as the owner of all provision, all decree. The question strips the denier of any claim to self-sufficiency.", color: "#C9A84C" },
        { depth: 4, label: "Lord of Patience", ayah: "48", arabic: "وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا", desc: "Be patient for the decision of your Lord, for you are in Our eyes. Rabb as the intimate guardian — the same name that carried punishment, provision, and sovereignty now carries personal care.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah strips away everything except argument, consequence, and worship",
      absences: [
        { item: "No extended narrative", note: "No prophets named, no destroyed nations recounted, no stories retold. For a Makkan surah of this length, the absence is extraordinary. The surahs around it include prophetic narratives; At-Tur strips all of that away." },
        { item: "No historical parable", note: "The warning comes entirely from cosmic imagery and logical argument. The surah's case rests on the structure of reality itself — no story to hide behind." },
        { item: "No legislative content", note: "No moral instruction, no commands directed at the community about how to live. The surah's only imperative is to the Prophet: be patient, glorify your Lord." },
        { item: "No transition between fire and garden", note: "The pivot from punishment (ayah 16) to Paradise (ayah 17) is one of the sharpest in the Quran — no bridge, no 'on the other hand.' The surah simply turns." },
        { item: "No answer to the central question", note: "Ayah 35 — 'Were they created from nothing, or are they the creators?' — leaves unstated the only remaining possibility. The listener must complete the syllogism in their own mind." },
      ],
    },
  },

  contentNodes: [
    { concept: "Ayah 35 — the unanswerable ontological question", type: "surah-specific", articleSlug: "created-from-nothing-52-35" },
    { concept: "Ayah 21 — children reunited in Paradise", type: "surah-specific", articleSlug: "family-reunion-paradise-52-21" },
    { concept: "Dhariyat–Tur diptych: evidence file meets cross-examination", type: "cross-surah", articleSlug: "dhariyat-tur-diptych" },
    { concept: "Bi-a'yunina — divine watchfulness over the vulnerable", type: "cross-surah", articleSlug: "bi-ayunina-divine-watchfulness" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "cross", label: "Cross-Exam" },
  { id: "ring", label: "Ring" },
  { id: "rabb", label: "Rabb" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider
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
  const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; };
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div>
          <div ref={progressRef} onClick={seek} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative">
            <div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
        <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} />
    </div>
  );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) {
  return (
    <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3">
      <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p>
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
          <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic} <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p>
          <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p>
        </div>
      ))}
    </div>
  );
}

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return (
    <div className="space-y-5">
      <div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>
      <div className="space-y-3">
        {data.sections.map((sec, i) => (
          <div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}>
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
      <div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>
      {data.pairs.map((pair, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}>
            <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div>
            <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p>
          </div>
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}>
            <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div>
            <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p>
          </div>
        </div>
      ))}
      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div>
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
      <div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>
      <div className="space-y-2">
        {data.layers.map((layer, i) => (
          <button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span>
            </div>
            <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Punishment → provision → sovereignty → intimate care
      </div>
    </div>
  );
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (
    <div className="space-y-5">
      <div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>
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
// PAGE SHELL
// ══════════════════════════════════════════════════════════════════════════════

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;
  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} · {d.period} · Juz {d.juz}</p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>
          <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">{d.thesis}</p>
          <div className="flex justify-center gap-10 pt-4">
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.ayahCount}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayahs</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.movements}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Movements</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">1</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivot</div></div>
          </div>
        </header>
        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>
            ))}
          </div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "cross" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "rabb" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
        </div>
        <OrnamentDivider />
        <a href={d.reflectionUrl} className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all">
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div>
        </a>
      </div>
    </div>
  );
}
