"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-QAMAR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-qamar
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Qamar",
  arabicName: "القَمَر",
  meaning: "The Moon",
  number: 54,
  ayahCount: 55,
  period: "Makki",
  juz: 27,
  movements: 3,
  thesis:
    "A fifty-five-ayah drumbeat that opens with the moon already split and the sign already refused, then drives through five destroyed nations in accelerating compression — each one shorter than the last — punctuated four times by the same question: is there anyone who will remember? The drumming stops with two ayahs of silence: a garden, a river, and the nearness of God.",
  reflectionUrl: "/surahs/al-qamar",
  readTime: "20 min read",

  heartVerse: {
    arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ",
    ayahRef: "54:17",
    translation: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?",
    why: "The refrain that defines the surah. It appears four times — after Nuh, after 'Ad, after Thamud, after Lut — each time with greater weight. The Quran was made easy. The barrier is not difficulty. The barrier is willingness. After the fifth destruction (Pharaoh), the refrain does not appear. The time for the question has passed.",
  },

  audio: { surahNumber: 54, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ", translation: "The Hour has drawn near, and the moon has split." },
    { ayah: 2, arabic: "وَإِن يَرَوْا آيَةً يُعْرِضُوا وَيَقُولُوا سِحْرٌ مُّسْتَمِرٌّ", translation: "And if they see a sign, they turn away and say, 'Passing magic.'" },
    { ayah: 3, arabic: "وَكَذَّبُوا وَاتَّبَعُوا أَهْوَاءَهُمْ ۚ وَكُلُّ أَمْرٍ مُّسْتَقِرٌّ", translation: "They denied and followed their desires, and every matter will be settled." },
    { ayah: 4, arabic: "وَلَقَدْ جَاءَهُم مِّنَ الْأَنبَاءِ مَا فِيهِ مُزْدَجَرٌ", translation: "And there has already come to them of information that which contains deterrence —" },
    { ayah: 5, arabic: "حِكْمَةٌ بَالِغَةٌ ۖ فَمَا تُغْنِ النُّذُرُ", translation: "extensive wisdom — but the warnings do not benefit." },
    { ayah: 6, arabic: "فَتَوَلَّ عَنْهُمْ ۘ يَوْمَ يَدْعُ الدَّاعِ إِلَىٰ شَيْءٍ نُّكُرٍ", translation: "So turn away from them. The Day the Caller will call to something terrible —" },
    { ayah: 7, arabic: "خُشَّعًا أَبْصَارُهُمْ يَخْرُجُونَ مِنَ الْأَجْدَاثِ كَأَنَّهُمْ جَرَادٌ مُّنتَشِرٌ", translation: "their eyes humbled, they will emerge from the graves as if they were locusts spreading," },
    { ayah: 8, arabic: "مُّهْطِعِينَ إِلَى الدَّاعِ ۖ يَقُولُ الْكَافِرُونَ هَـٰذَا يَوْمٌ عَسِرٌ", translation: "racing toward the Caller. The disbelievers will say, 'This is a difficult day.'" },
    { ayah: 9, arabic: "كَذَّبَتْ قَبْلَهُمْ قَوْمُ نُوحٍ فَكَذَّبُوا عَبْدَنَا وَقَالُوا مَجْنُونٌ وَازْدُجِرَ", translation: "The people of Nuh denied before them. They denied Our servant and said, 'A madman,' and he was repelled." },
    { ayah: 10, arabic: "فَدَعَا رَبَّهُ أَنِّي مَغْلُوبٌ فَانتَصِرْ", translation: "So he called upon his Lord, 'Indeed, I am overpowered, so help.'" },
    { ayah: 11, arabic: "فَفَتَحْنَا أَبْوَابَ السَّمَاءِ بِمَاءٍ مُّنْهَمِرٍ", translation: "Then We opened the gates of heaven with pouring water" },
    { ayah: 12, arabic: "وَفَجَّرْنَا الْأَرْضَ عُيُونًا فَالْتَقَى الْمَاءُ عَلَىٰ أَمْرٍ قَدْ قُدِرَ", translation: "and caused the earth to burst with springs, and the waters met upon a matter already decreed." },
    { ayah: 13, arabic: "وَحَمَلْنَاهُ عَلَىٰ ذَاتِ أَلْوَاحٍ وَدُسُرٍ", translation: "And We carried him on a vessel of planks and nails," },
    { ayah: 14, arabic: "تَجْرِي بِأَعْيُنِنَا جَزَاءً لِّمَن كَانَ كُفِرَ", translation: "sailing under Our watchful care — a recompense for he who had been denied." },
    { ayah: 15, arabic: "وَلَقَدْ تَّرَكْنَاهَا آيَةً فَهَلْ مِن مُّدَّكِرٍ", translation: "And We left it as a sign — so is there any who will remember?" },
    { ayah: 16, arabic: "فَكَيْفَ كَانَ عَذَابِي وَنُذُرِ", translation: "So how were My punishment and My warnings?" },
    { ayah: 17, arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ", translation: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?" },
    { ayah: 18, arabic: "كَذَّبَتْ عَادٌ فَكَيْفَ كَانَ عَذَابِي وَنُذُرِ", translation: "'Ad denied. So how were My punishment and My warnings?" },
    { ayah: 19, arabic: "إِنَّا أَرْسَلْنَا عَلَيْهِمْ رِيحًا صَرْصَرًا فِي يَوْمِ نَحْسٍ مُّسْتَمِرٍّ", translation: "Indeed, We sent upon them a screaming wind on a day of unending misfortune," },
    { ayah: 20, arabic: "تَنزِعُ النَّاسَ كَأَنَّهُمْ أَعْجَازُ نَخْلٍ مُّنقَعِرٍ", translation: "plucking people out as if they were trunks of uprooted palm trees." },
    { ayah: 21, arabic: "فَكَيْفَ كَانَ عَذَابِي وَنُذُرِ", translation: "So how were My punishment and My warnings?" },
    { ayah: 22, arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ", translation: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?" },
    { ayah: 23, arabic: "كَذَّبَتْ ثَمُودُ بِالنُّذُرِ", translation: "Thamud denied the warnings." },
    { ayah: 24, arabic: "فَقَالُوا أَبَشَرًا مِّنَّا وَاحِدًا نَّتَّبِعُهُ إِنَّا إِذًا لَّفِي ضَلَالٍ وَسُعُرٍ", translation: "They said, 'Is it a single human being among us that we should follow? We would then be in error and madness.'" },
    { ayah: 25, arabic: "أَأُلْقِيَ الذِّكْرُ عَلَيْهِ مِن بَيْنِنَا بَلْ هُوَ كَذَّابٌ أَشِرٌ", translation: "'Has the message been cast upon him from among us? Rather, he is an insolent liar.'" },
    { ayah: 26, arabic: "سَيَعْلَمُونَ غَدًا مَّنِ الْكَذَّابُ الْأَشِرُ", translation: "They will know tomorrow who the insolent liar is." },
    { ayah: 27, arabic: "إِنَّا مُرْسِلُو النَّاقَةِ فِتْنَةً لَّهُمْ فَارْتَقِبْهُمْ وَاصْطَبِرْ", translation: "Indeed, We are sending the she-camel as a trial for them, so watch them and be patient." },
    { ayah: 28, arabic: "وَنَبِّئْهُمْ أَنَّ الْمَاءَ قِسْمَةٌ بَيْنَهُمْ ۖ كُلُّ شِرْبٍ مُّحْتَضَرٌ", translation: "And inform them that the water is shared between them, each day of drinking attended." },
    { ayah: 29, arabic: "فَنَادَوْا صَاحِبَهُمْ فَتَعَاطَىٰ فَعَقَرَ", translation: "But they called their companion, and he took a sword and hamstrung her." },
    { ayah: 30, arabic: "فَكَيْفَ كَانَ عَذَابِي وَنُذُرِ", translation: "So how were My punishment and My warnings?" },
    { ayah: 31, arabic: "إِنَّا أَرْسَلْنَا عَلَيْهِمْ صَيْحَةً وَاحِدَةً فَكَانُوا كَهَشِيمِ الْمُحْتَظِرِ", translation: "Indeed, We sent upon them one blast, and they became like the dry twig fragments of a fence-builder." },
    { ayah: 32, arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ", translation: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?" },
    { ayah: 33, arabic: "كَذَّبَتْ قَوْمُ لُوطٍ بِالنُّذُرِ", translation: "The people of Lut denied the warnings." },
    { ayah: 34, arabic: "إِنَّا أَرْسَلْنَا عَلَيْهِمْ حَاصِبًا إِلَّا آلَ لُوطٍ ۖ نَّجَّيْنَاهُم بِسَحَرٍ", translation: "Indeed, We sent upon them a storm of stones, except the family of Lut — We saved them before dawn." },
    { ayah: 35, arabic: "نِّعْمَةً مِّنْ عِندِنَا ۚ كَذَٰلِكَ نَجْزِي مَن شَكَرَ", translation: "As favor from Us. Thus do We reward the grateful." },
    { ayah: 36, arabic: "وَلَقَدْ أَنذَرَهُم بَطْشَتَنَا فَتَمَارَوْا بِالنُّذُرِ", translation: "And he had warned them of Our assault, but they disputed about the warnings." },
    { ayah: 37, arabic: "وَلَقَدْ رَاوَدُوهُ عَن ضَيْفِهِ فَطَمَسْنَا أَعْيُنَهُمْ فَذُوقُوا عَذَابِي وَنُذُرِ", translation: "And they demanded his guests, so We blinded their eyes. 'Taste My punishment and My warnings.'" },
    { ayah: 38, arabic: "وَلَقَدْ صَبَّحَهُم بُكْرَةً عَذَابٌ مُّسْتَقِرٌّ", translation: "And there seized them by early morning an abiding punishment." },
    { ayah: 39, arabic: "فَذُوقُوا عَذَابِي وَنُذُرِ", translation: "'Taste My punishment and My warnings.'" },
    { ayah: 40, arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ", translation: "And We have certainly made the Quran easy for remembrance, so is there any who will remember?" },
    { ayah: 41, arabic: "وَلَقَدْ جَاءَ آلَ فِرْعَوْنَ النُّذُرُ", translation: "And there certainly came to the people of Pharaoh the warnings." },
    { ayah: 42, arabic: "كَذَّبُوا بِآيَاتِنَا كُلِّهَا فَأَخَذْنَاهُمْ أَخْذَ عَزِيزٍ مُّقْتَدِرٍ", translation: "They denied Our signs, all of them, so We seized them with the seizing of One Exalted in Might, Perfect in Ability." },
    { ayah: 43, arabic: "أَكُفَّارُكُمْ خَيْرٌ مِّنْ أُولَـٰئِكُمْ أَمْ لَكُم بَرَاءَةٌ فِي الزُّبُرِ", translation: "Are your disbelievers better than those, or have you been given immunity in the scriptures?" },
    { ayah: 44, arabic: "أَمْ يَقُولُونَ نَحْنُ جَمِيعٌ مُّنتَصِرٌ", translation: "Or do they say, 'We are an assembly who will be victorious'?" },
    { ayah: 45, arabic: "سَيُهْزَمُ الْجَمْعُ وَيُوَلُّونَ الدُّبُرَ", translation: "Their assembly will be defeated, and they will turn their backs." },
    { ayah: 46, arabic: "بَلِ السَّاعَةُ مَوْعِدُهُمْ وَالسَّاعَةُ أَدْهَىٰ وَأَمَرُّ", translation: "Rather, the Hour is their appointment, and the Hour is more grievous and more bitter." },
    { ayah: 47, arabic: "إِنَّ الْمُجْرِمِينَ فِي ضَلَالٍ وَسُعُرٍ", translation: "Indeed, the criminals are in error and madness." },
    { ayah: 48, arabic: "يَوْمَ يُسْحَبُونَ فِي النَّارِ عَلَىٰ وُجُوهِهِمْ ذُوقُوا مَسَّ سَقَرَ", translation: "The Day they are dragged into the Fire on their faces — 'Taste the touch of Saqar.'" },
    { ayah: 49, arabic: "إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ", translation: "Indeed, all things We created with predestination." },
    { ayah: 50, arabic: "وَمَا أَمْرُنَا إِلَّا وَاحِدَةٌ كَلَمْحٍ بِالْبَصَرِ", translation: "And Our command is but one, like a glance of the eye." },
    { ayah: 51, arabic: "وَلَقَدْ أَهْلَكْنَا أَشْيَاعَكُمْ فَهَلْ مِن مُّدَّكِرٍ", translation: "And We have already destroyed your kinds — so is there any who will remember?" },
    { ayah: 52, arabic: "وَكُلُّ شَيْءٍ فَعَلُوهُ فِي الزُّبُرِ", translation: "And everything they did is in the written records." },
    { ayah: 53, arabic: "وَكُلُّ صَغِيرٍ وَكَبِيرٍ مُّسْتَطَرٌ", translation: "And every small and great thing is inscribed." },
    { ayah: 54, arabic: "إِنَّ الْمُتَّقِينَ فِي جَنَّاتٍ وَنَهَرٍ", translation: "Indeed, the righteous will be among gardens and rivers," },
    { ayah: 55, arabic: "فِي مَقْعَدِ صِدْقٍ عِندَ مَلِيكٍ مُّقْتَدِرٍ", translation: "in a seat of honor, near a Sovereign, Perfect in Ability." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Drumbeat",
      subtitle: "Three movements: miracle refused → five destructions → the seat of truth",
      sections: [
        { ayahs: "1–8", title: "The Moon and the Refusal", color: "#e07a8a", desc: "The moon has split. The people who saw it called it magic. The argument is over before the surah begins. What follows is not another attempt to convince — it is a record of what happens to peoples who see the truth and choose to look away." },
        { ayahs: "9–42", title: "The Five Destructions", color: "#9b7fd4", desc: "Nuh (9 ayahs), 'Ad (5), Thamud (10), Lut (8), Pharaoh (2). Each story is shorter than the last. The refrain lands four times — then after Pharaoh, silence. The compression is the argument: by the fifth telling, a single sentence of destruction is sufficient. The listener has been trained." },
        { ayahs: "43–55", title: "The Address and the Garden", color: "#C9A84C", isPivot: true, desc: "Are your disbelievers better than those? Their assembly will be defeated. Everything is decreed. Everything is recorded. And then, after fifty-three ayahs of ruin — two ayahs of silence: gardens, rivers, a seat of truth near a Sovereign Perfect in Ability. The same muqtadir that seized Pharaoh now sustains the garden." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The moon splits at the opening; the righteous sit in peace at the close",
      pairs: [
        {
          left: { label: "The Moon Splits", ayahs: "1–2", desc: "The Hour draws near, the moon has split — and they call it passing magic" },
          right: { label: "The Seat of Truth", ayahs: "54–55", desc: "The righteous in gardens and rivers, in a seat of honor near a Sovereign Perfect in Ability" },
          color: "#C9A84C",
        },
        {
          left: { label: "Locusts from Graves", ayahs: "7–8", desc: "Eyes humbled, emerging like locusts spreading — 'This is a difficult day'" },
          right: { label: "Decree and Recording", ayahs: "49–53", desc: "All things created with predestination. Our command is like a glance of the eye. Everything inscribed." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Five Destructions", ayahs: "9–42", desc: "Nuh, 'Ad, Thamud, Lut, Pharaoh — warned, denied, destroyed. The refrain four times, then silence." },
          right: { label: "The Quraysh Addressed", ayahs: "43–48", desc: "Are your disbelievers better? Their assembly will be defeated. The Hour is their appointment." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Missing Refrain", ayahs: "42–43",
        desc: "After Pharaoh's two-ayah destruction, the refrain does not appear. The question has been asked four times. The fifth time, the surah draws the conclusion.",
        note: "The silence where the refrain should be is the structural pivot — the transition from asking whether anyone will remember to declaring what happens if they do not.",
      },
    },
    deductiveFunnel: {
      title: "The Compression",
      subtitle: "Five destructions in accelerating compression — each needing fewer words because the listener has been trained",
      layers: [
        { depth: 1, label: "Nuh — 9 ayahs", ayah: "9–17", arabic: "أَنِّي مَغْلُوبٌ فَانتَصِرْ", desc: "The longest narrative sets the template. Five words of prayer — 'I am overpowered, so help.' The gates of heaven open. The ark is described as planks and nails. The refrain lands for the first time.", color: "#4ecdc4" },
        { depth: 2, label: "'Ad — 5 ayahs", ayah: "18–22", arabic: "كَأَنَّهُمْ أَعْجَازُ نَخْلٍ مُّنقَعِرٍ", desc: "The screaming wind plucks people like uprooted palm trunks — hollow, broken, discarded. The rhetorical question that closed Nuh's story now opens 'Ad's. The surah is accelerating.", color: "#9b7fd4" },
        { depth: 3, label: "Thamud — 10 ayahs", ayah: "23–32", arabic: "فَكَانُوا كَهَشِيمِ الْمُحْتَظِرِ", desc: "Slightly longer because the she-camel introduces the mechanics of a test offered and violated. One blast, and they became like dry twig fragments gathered for a fence.", color: "#e07a8a" },
        { depth: 4, label: "Pharaoh — 2 ayahs", ayah: "41–42", arabic: "أَخْذَ عَزِيزٍ مُّقْتَدِرٍ", desc: "The most powerful civilization receives the least space. No mention of Musa. No plagues, no sea, no drowning. Two facts: the warnings came, they denied, they were seized. And then — no refrain. The time for asking has passed.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah tells you what happened, not what to do — every absence sharpens the question",
      absences: [
        { item: "Almost no prophetic speech", note: "Nuh's prayer is five words. Salih speaks one line about the she-camel. Lut speaks one line. Musa does not appear at all. The prophets are nearly silent — the surah's interest is in what happens after the message is rejected." },
        { item: "No moral commands", note: "Al-Qamar does not tell you what to do. It tells you what happened to people who refused to listen, and asks if you are paying attention. The entire pedagogy is in the question." },
        { item: "No refrain after Pharaoh", note: "Four stories received the refrain. The fifth does not. The question 'is there anyone who will remember?' has been asked four times. After Pharaoh, the surah stops asking. The time has passed." },
        { item: "No elaboration of Paradise", note: "Two ayahs for the righteous — gardens, rivers, a seat of truth — after forty-two ayahs of destruction. The imbalance is the point. Peace does not need elaboration. It simply is." },
        { item: "No Musa in Pharaoh's story", note: "In every other Quranic telling, Musa is central. Here Pharaoh's story is told entirely from the divine perspective: the warnings came, they denied, We seized them. Pharaoh's people are grammatical objects, not agents." },
      ],
    },
  },

  contentNodes: [
    { concept: "The four-fold refrain — structural rhythm as argument", type: "surah-specific", articleSlug: "refrain-rhythm-54" },
    { concept: "Muqtadir — the same power in destruction and in Paradise", type: "surah-specific", articleSlug: "muqtadir-power-54-42-55" },
    { concept: "Qamar-Rahman pair: the storm and the garden after it", type: "cross-surah", articleSlug: "qamar-rahman-pair" },
    { concept: "Compression as pedagogy — training the listener's attention", type: "cross-surah", articleSlug: "compression-pedagogy-qamar" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "drumbeat", label: "Drumbeat" },
  { id: "mirror", label: "Mirror" },
  { id: "compression", label: "Compression" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

function OrnamentDivider() {
  return (<div className="flex items-center gap-3 py-2"><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /><span className="text-gold-500/50 text-sm">۞</span><div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /></div>);
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
  const seek = (e: React.MouseEvent<HTMLDivElement>) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; };
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2">
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div>
          <div ref={progressRef} onClick={seek} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div>
        </div>
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
  return (<div className="space-y-5">{verses.map((v) => (<div key={v.ayah} className="space-y-1"><p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic} <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p><p className="text-sm text-cream-muted/60 font-body">{v.translation}</p></div>))}</div>);
}

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>);
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>);
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">9 ayahs → 5 ayahs → 10 ayahs → 2 ayahs → silence</div></div>);
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.absences.map((a, i) => (<div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"><div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div><p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p></div>))}</div></div>);
}

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
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>))}
          </div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "drumbeat" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "compression" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (<div className="space-y-6"><FullSurahText verses={d.fullText} /><OrnamentDivider /><HeartVerse verse={d.heartVerse} /><AudioPlayer audio={d.audio} /></div>)}
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
