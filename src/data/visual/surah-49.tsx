"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-HUJURAT — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-hujurat
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Hujurat",
  arabicName: "الحُجُرات",
  meaning: "The Private Chambers",
  number: 49,
  ayahCount: 18,
  period: "Madani",
  juz: 26,
  movements: 4,
  thesis:
    "Eighteen ayahs, every one of them a law — the Quran's social constitution, built on the premise that you do not know what God knows about the person standing in front of you.",
  reflectionUrl: "/surahs/al-hujurat",
  readTime: "20 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"usul_tafsir","english":"Principles of Interpretation"},{"key":"nahw","english":"Grammar"}],
  heartVerse: {
    arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ",
    ayahRef: "49:13",
    translation: "O mankind, We have created you from male and female and made you into peoples and tribes that you may know one another. Indeed, the most noble of you in the sight of Allah is the most righteous of you.",
    why: "The surah's summit. For the first and only time, the address shifts from 'O you who have believed' to 'O mankind' — the scope expands to the entire human race. Every prohibition that precedes this ayah clears the ground for it. You cannot hear that all human beings are equal before God while you are still laughing at the person next to you.",
  },

  audio: { surahNumber: 49, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُقَدِّمُوا بَيْنَ يَدَيِ اللَّهِ وَرَسُولِهِ ۖ وَاتَّقُوا اللَّهَ ۚ إِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ", translation: "O you who have believed, do not put yourselves ahead of Allah and His Messenger, and fear Allah. Indeed, Allah is Hearing and Knowing." },
    { ayah: 2, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَرْفَعُوا أَصْوَاتَكُمْ فَوْقَ صَوْتِ النَّبِيِّ وَلَا تَجْهَرُوا لَهُ بِالْقَوْلِ كَجَهْرِ بَعْضِكُمْ لِبَعْضٍ أَن تَحْبَطَ أَعْمَالُكُمْ وَأَنتُمْ لَا تَشْعُرُونَ", translation: "O you who have believed, do not raise your voices above the voice of the Prophet or speak loudly to him as you speak to one another, lest your deeds become worthless while you do not perceive." },
    { ayah: 3, arabic: "إِنَّ الَّذِينَ يَغُضُّونَ أَصْوَاتَهُمْ عِندَ رَسُولِ اللَّهِ أُولَٰئِكَ الَّذِينَ امْتَحَنَ اللَّهُ قُلُوبَهُمْ لِلتَّقْوَىٰ", translation: "Indeed, those who lower their voices in the presence of the Messenger of Allah — they are the ones whose hearts Allah has tested for taqwa." },
    { ayah: 4, arabic: "إِنَّ الَّذِينَ يُنَادُونَكَ مِن وَرَاءِ الْحُجُرَاتِ أَكْثَرُهُمْ لَا يَعْقِلُونَ", translation: "Indeed, those who call you from behind the private chambers — most of them do not use reason." },
    { ayah: 5, arabic: "وَلَوْ أَنَّهُمْ صَبَرُوا حَتَّىٰ تَخْرُجَ إِلَيْهِمْ لَكَانَ خَيْرًا لَّهُمْ ۚ وَاللَّهُ غَفُورٌ رَّحِيمٌ", translation: "And if they had been patient until you came out to them, it would have been better for them. And Allah is Forgiving and Merciful." },
    { ayah: 6, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن جَاءَكُمْ فَاسِقٌ بِنَبَإٍ فَتَبَيَّنُوا أَن تُصِيبُوا قَوْمًا بِجَهَالَةٍ فَتُصْبِحُوا عَلَىٰ مَا فَعَلْتُمْ نَادِمِينَ", translation: "O you who have believed, if a corrupt person comes to you with news, verify it, lest you harm a people out of ignorance and then become regretful over what you have done." },
    { ayah: 7, arabic: "وَاعْلَمُوا أَنَّ فِيكُمْ رَسُولَ اللَّهِ ۚ لَوْ يُطِيعُكُمْ فِي كَثِيرٍ مِّنَ الْأَمْرِ لَعَنِتُّمْ وَلَٰكِنَّ اللَّهَ حَبَّبَ إِلَيْكُمُ الْإِيمَانَ وَزَيَّنَهُ فِي قُلُوبِكُمْ", translation: "And know that among you is the Messenger of Allah. If he were to obey you in much of the matter, you would be in difficulty, but Allah has made faith beloved to you and beautified it in your hearts." },
    { ayah: 8, arabic: "فَضْلًا مِّنَ اللَّهِ وَنِعْمَةً ۚ وَاللَّهُ عَلِيمٌ حَكِيمٌ", translation: "A bounty from Allah and a favor. And Allah is Knowing and Wise." },
    { ayah: 9, arabic: "وَإِن طَائِفَتَانِ مِنَ الْمُؤْمِنِينَ اقْتَتَلُوا فَأَصْلِحُوا بَيْنَهُمَا ۖ فَإِن بَغَتْ إِحْدَاهُمَا عَلَى الْأُخْرَىٰ فَقَاتِلُوا الَّتِي تَبْغِي حَتَّىٰ تَفِيءَ إِلَىٰ أَمْرِ اللَّهِ", translation: "And if two factions among the believers fight, make peace between them. But if one transgresses against the other, fight the transgressor until it returns to the command of Allah." },
    { ayah: 10, arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ", translation: "The believers are but brothers, so make reconciliation between your brothers and have taqwa of Allah, that you may receive mercy." },
    { ayah: 11, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَسْخَرْ قَوْمٌ مِّن قَوْمٍ عَسَىٰ أَن يَكُونُوا خَيْرًا مِّنْهُمْ وَلَا نِسَاءٌ مِّن نِّسَاءٍ عَسَىٰ أَن يَكُنَّ خَيْرًا مِّنْهُنَّ", translation: "O you who have believed, let not a people ridicule another people; perhaps they may be better than them. Nor let women ridicule other women; perhaps they may be better than them." },
    { ayah: 12, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ ۖ وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا", translation: "O you who have believed, avoid much suspicion — indeed, some suspicion is sin. And do not spy, and do not backbite one another." },
    { ayah: 13, arabic: "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ", translation: "O mankind, We have created you from male and female and made you into peoples and tribes that you may know one another. Indeed, the most noble of you in the sight of Allah is the most righteous of you." },
    { ayah: 14, arabic: "قَالَتِ الْأَعْرَابُ آمَنَّا ۖ قُل لَّمْ تُؤْمِنُوا وَلَٰكِن قُولُوا أَسْلَمْنَا وَلَمَّا يَدْخُلِ الْإِيمَانُ فِي قُلُوبِكُمْ", translation: "The desert Arabs say, 'We have believed.' Say: You have not believed; rather say, 'We have submitted,' for faith has not yet entered your hearts." },
    { ayah: 15, arabic: "إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ آمَنُوا بِاللَّهِ وَرَسُولِهِ ثُمَّ لَمْ يَرْتَابُوا وَجَاهَدُوا بِأَمْوَالِهِمْ وَأَنفُسِهِمْ فِي سَبِيلِ اللَّهِ ۚ أُولَٰئِكَ هُمُ الصَّادِقُونَ", translation: "The believers are only those who have believed in Allah and His Messenger and then doubted not, and fought with their wealth and their lives in the cause of Allah. It is those who are the truthful ones." },
    { ayah: 16, arabic: "قُلْ أَتُعَلِّمُونَ اللَّهَ بِدِينِكُمْ وَاللَّهُ يَعْلَمُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۚ وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ", translation: "Say: Would you inform Allah about your religion while Allah knows whatever is in the heavens and whatever is on the earth, and Allah is Knowing of all things?" },
    { ayah: 17, arabic: "يَمُنُّونَ عَلَيْكَ أَنْ أَسْلَمُوا ۖ قُل لَّا تَمُنُّوا عَلَيَّ إِسْلَامَكُمْ ۖ بَلِ اللَّهُ يَمُنُّ عَلَيْكُمْ أَنْ هَدَاكُمْ لِلْإِيمَانِ إِن كُنتُمْ صَادِقِينَ", translation: "They consider it a favor to you that they have accepted Islam. Say: Do not consider your Islam a favor to me. Rather, Allah has conferred favor upon you that He has guided you to faith, if you should be truthful." },
    { ayah: 18, arabic: "إِنَّ اللَّهَ يَعْلَمُ غَيْبَ السَّمَاوَاتِ وَالْأَرْضِ ۚ وَاللَّهُ بَصِيرٌ بِمَا تَعْمَلُونَ", translation: "Indeed, Allah knows the unseen of the heavens and the earth. And Allah is Seeing of what you do." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Social Constitution",
      subtitle: "Four movements: prophetic protocol → verification → the ethical core → Islam vs. iman",
      sections: [
        { ayahs: "1-5", title: "The Protocol of the Sacred Presence", color: "#4ecdc4", desc: "How to conduct yourself before God and His Messenger. Do not put yourselves ahead, do not raise your voices, be patient. Your voice reveals the condition of your heart — lowering it is evidence that the heart has already passed a divine examination." },
        { ayahs: "6-10", title: "The Verification Principle", color: "#9b7fd4", desc: "If a corrupt person brings you news, verify it — fatabayyanuu. The word legislates epistemology itself. Before you act on information, establish its truth. Then the law of reconciliation: the believers are brothers, so make peace between them with justice." },
        { ayahs: "11-13", title: "The Ethical Core", color: "#C9A84C", isPivot: true, desc: "The most densely packed ethical legislation in the Quran. Do not mock, do not insult, do not suspect, do not spy, do not backbite. Then the summit: the address shifts from believers to all mankind, and the declaration of human equality sealed by taqwa alone." },
        { ayahs: "14-18", title: "Islam and Iman", color: "#e07a8a", desc: "The final distinction: the difference between outward submission and inner faith. The desert Arabs have submitted but faith has not entered their hearts. The surah closes with God's comprehensive knowledge — He is Seeing of what you do." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah's opening and closing face each other across the entire behavioral code",
      pairs: [
        {
          left: { label: "Conduct Toward the Prophet", ayahs: "1-5", desc: "Do not put yourselves ahead of God and His Messenger. Have taqwa — God is Hearing and Knowing." },
          right: { label: "Conduct Toward God", ayahs: "17-18", desc: "Do not consider your Islam a favor. God knows the unseen and is Seeing of what you do." },
          color: "#4ecdc4",
        },
        {
          left: { label: "Epistemology", ayahs: "6-8", desc: "A fasiq brings unverified news — verify before you act. God made faith beloved to your hearts." },
          right: { label: "Epistemology Reversed", ayahs: "15-16", desc: "True faith defined — belief without doubt, followed by sacrifice. Would you inform God about your religion?" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Brotherhood", ayahs: "9-10", desc: "Believers are brothers — reconcile with justice. The command to make peace." },
          right: { label: "Brotherhood Examined", ayahs: "14", desc: "The desert Arabs claim brotherhood but faith has not entered their hearts. The claim is tested." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Declaration", ayahs: "11-13",
        desc: "Do not mock. Do not suspect. Do not spy. Do not backbite. Then: O mankind — the most noble of you is the most righteous.",
        note: "The pivot from 'O you who have believed' to 'O mankind.' Everything before addresses the community's internal conduct. Ayah 13 lifts the lens to encompass all of humanity.",
      },
    },
    deductiveFunnel: {
      title: "The Pathology of Contempt",
      subtitle: "Ayahs 11-12 trace the entire disease from seed to fruit",
      layers: [
        { depth: 1, label: "Mockery", ayah: "11a", arabic: "لَا يَسْخَرْ قَوْمٌ مِّن قَوْمٍ", desc: "The visible symptom: ridiculing others. The root yaskhar carries the image of subjugation — pressing someone into service beneath you. Mockery is a claim of superiority, and the surah identifies it as such before prohibiting it.", color: "#4ecdc4" },
        { depth: 2, label: "Insult", ayah: "11b", arabic: "وَلَا تَنَابَزُوا بِالْأَلْقَابِ", desc: "Moving from laughter to language: do not insult one another with offensive names. The prohibition targets the weaponization of naming — reducing a person to a label designed to diminish them.", color: "#9b7fd4" },
        { depth: 3, label: "Suspicion", ayah: "12a", arabic: "اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ", desc: "From the external to the internal: avoid much suspicion, for some suspicion is sin. The seed from which spying and backbiting grow. A state of mind that generates investigation.", color: "#e07a8a" },
        { depth: 4, label: "Spying → Backbiting", ayah: "12b", arabic: "وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا", desc: "The fruit of suspicion: first you investigate in private, then you speak in absence. The surah seals it with the image of cannibalism — eating the flesh of your dead brother. The revulsion the reader feels is the surah's intended response to gossip.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah has stripped away everything except the essential legislation",
      absences: [
        { item: "No afterlife as motivation", note: "No paradise is promised for obedience. No hellfire is threatened for violation. The prohibitions against mockery and backbiting carry no eschatological consequence within the surah. The motivation is entirely immediate: perhaps they are better than you." },
        { item: "No prophetic narrative", note: "No story of a previous nation, no destroyed city, no reference to Adam, Ibrahim, Musa, or Isa. The community's own behavior is the only text under examination." },
        { item: "No cosmic signs", note: "No mention of the sky, the earth, the mountains, the rain, or any of the natural signs the Quran uses elsewhere. The surah has no interest in the external world. Its entire field of vision is the space between human beings." },
        { item: "No description of God's power", note: "God is described as Knowing, Wise, Aware, Seeing — attributes of perception, not power. The surah's God is a witness and a judge of the social order, not a creator displaying His might." },
        { item: "No gradual approach", note: "Five times in eighteen ayahs the surah opens with 'O you who have believed' — the highest concentration of this address in the Quran. Each time, another demand follows. The surah treats belief as a promissory note and presents the bill." },
      ],
    },
  },

  contentNodes: [
    { concept: "Fatabayyanuu — the verification principle (49:6)", type: "surah-specific", articleSlug: "fatabayyanuu-verification-49-6" },
    { concept: "Ta'arafu — diversity for the purpose of mutual knowledge", type: "surah-specific", articleSlug: "taarafu-mutual-knowledge-49-13" },
    { concept: "Al-Fath to Al-Hujurat: portrait to protocol", type: "cross-surah", articleSlug: "fath-hujurat-portrait-protocol" },
    { concept: "Islam and iman — the distinction and the invitation", type: "cross-surah", articleSlug: "islam-iman-distinction" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "journey", label: "Constitution" },
  { id: "ring", label: "Mirror" },
  { id: "pathology", label: "Pathology" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

function OrnamentDivider() {
  return (<div className="flex items-center gap-3 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /><span className="text-gold-500/50 text-sm">&#x06DE;</span><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /></div>);
}

function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`;
  const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); };
  const seekTo = (clientX: number) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => { e.preventDefault(); (e.target as HTMLDivElement).setPointerCapture(e.pointerId); seekTo(e.clientX); };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (e.buttons === 0) return; seekTo(e.clientX); };
  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; };
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "\u23F8" : "\u25B6"}</button>
        <div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div>
        <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} />
    </div>
  );
}

function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) {
  return (<div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"><p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p><p className="text-sm italic text-cream/70 font-body">{verse.translation}</p><p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p></div>);
}

function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) {
  return (<div className="space-y-5">{verses.map((v) => (<div key={v.ayah} className="space-y-1"><p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic}{" "}<span className="text-sm text-cream-muted/50">{"\uFD3E"}{v.ayah}{"\uFD3F"}</span></p><p className="text-sm text-cream-muted/60 font-body">{v.translation}</p></div>))}</div>);
}

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">{"\u2726"} Structural pivot</div>}</div>))}</div></div>);
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">{"\u2726"} {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>);
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Mockery {"\u2192"} insult {"\u2192"} suspicion {"\u2192"} spying {"\u2192"} backbiting</div></div>);
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.absences.map((a, i) => (<div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"><div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div><p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p></div>))}</div></div>);
}

// ══════════════════════════════════════════════════════════════════════════════
export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;
  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} {"\u00B7"} {d.period} {"\u00B7"} Juz {d.juz}</p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>
          <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">{d.thesis}</p>
          <div className="flex justify-center gap-10 pt-4">
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.ayahCount}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayahs</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.movements}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Movements</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">5</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ya Ayyuha</div></div>
          </div>
        </header>
        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>))}
          </div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "pathology" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (<div className="space-y-6"><FullSurahText verses={d.fullText} /><OrnamentDivider /><HeartVerse verse={d.heartVerse} /><AudioPlayer audio={d.audio} /></div>)}
        </div>
        <OrnamentDivider />
        <a href={d.reflectionUrl} className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all">
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} {"\u00B7"} The complete written exploration</div>
        </a>
      </div>
    </div>
  );
}
