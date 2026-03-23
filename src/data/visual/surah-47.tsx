"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH MUHAMMAD — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/muhammad
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Muhammad",
  arabicName: "مُحَمَّد",
  meaning: "The Prophet Muhammad",
  number: 47,
  ayahCount: 38,
  period: "Madani",
  juz: 26,
  movements: 4,
  thesis:
    "A surah that holds a sword in one hand and a map of Paradise in the other — legislating the external struggle while diagnosing the locked hearts that make the internal struggle the harder of the two.",
  reflectionUrl: "/surahs/muhammad",
  readTime: "20 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا",
    ayahRef: "47:24",
    translation: "Then do they not reflect upon the Quran, or are there locks upon their hearts?",
    why: "The surah's center of gravity. The image of a heart with its own locks — locks that perhaps it chose — stands between the flowing rivers of Paradise and the sealed fate of those who turn away. The Quran has been offered. The question is whether the listener's heart is open enough to let any of it in.",
  },

  audio: { surahNumber: 47, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الَّذِينَ كَفَرُوا وَصَدُّوا عَن سَبِيلِ اللَّهِ أَضَلَّ أَعْمَالَهُمْ", translation: "Those who disbelieve and obstruct from the path of Allah — He will waste their deeds." },
    { ayah: 2, arabic: "وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَآمَنُوا بِمَا نُزِّلَ عَلَىٰ مُحَمَّدٍ وَهُوَ الْحَقُّ مِن رَّبِّهِمْ ۙ كَفَّرَ عَنْهُمْ سَيِّئَاتِهِمْ وَأَصْلَحَ بَالَهُمْ", translation: "And those who believe and do righteous deeds and believe in what has been revealed to Muhammad — and it is the truth from their Lord — He will remove from them their misdeeds and amend their condition." },
    { ayah: 3, arabic: "ذَٰلِكَ بِأَنَّ الَّذِينَ كَفَرُوا اتَّبَعُوا الْبَاطِلَ وَأَنَّ الَّذِينَ آمَنُوا اتَّبَعُوا الْحَقَّ مِن رَّبِّهِمْ ۚ كَذَٰلِكَ يَضْرِبُ اللَّهُ لِلنَّاسِ أَمْثَالَهُمْ", translation: "That is because those who disbelieve follow falsehood, and those who believe follow the truth from their Lord. Thus does Allah present to the people their comparisons." },
    { ayah: 4, arabic: "فَإِذَا لَقِيتُمُ الَّذِينَ كَفَرُوا فَضَرْبَ الرِّقَابِ حَتَّىٰ إِذَا أَثْخَنتُمُوهُمْ فَشُدُّوا الْوَثَاقَ فَإِمَّا مَنًّا بَعْدُ وَإِمَّا فِدَاءً حَتَّىٰ تَضَعَ الْحَرْبُ أَوْزَارَهَا", translation: "So when you meet those who disbelieve in battle, strike their necks until you have routed them, then bind firmly. Then either favor afterward or ransom until the war lays down its burdens." },
    { ayah: 5, arabic: "ذَٰلِكَ وَلَوْ يَشَاءُ اللَّهُ لَانتَصَرَ مِنْهُمْ وَلَٰكِن لِّيَبْلُوَ بَعْضَكُم بِبَعْضٍ", translation: "That is so. And if Allah had willed, He could have taken vengeance upon them, but He ordered struggle to test some of you by means of others." },
    { ayah: 6, arabic: "وَالَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ فَلَن يُضِلَّ أَعْمَالَهُمْ", translation: "And those who are killed in the cause of Allah — never will He waste their deeds." },
    { ayah: 7, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ", translation: "O you who have believed, if you support Allah, He will support you and plant firmly your feet." },
    { ayah: 8, arabic: "وَالَّذِينَ كَفَرُوا فَتَعْسًا لَّهُمْ وَأَضَلَّ أَعْمَالَهُمْ", translation: "But those who disbelieve — for them is misery, and He will waste their deeds." },
    { ayah: 9, arabic: "ذَٰلِكَ بِأَنَّهُمْ كَرِهُوا مَا أَنزَلَ اللَّهُ فَأَحْبَطَ أَعْمَالَهُمْ", translation: "That is because they disliked what Allah revealed, so He rendered worthless their deeds." },
    { ayah: 10, arabic: "أَفَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِن قَبْلِهِمْ ۚ دَمَّرَ اللَّهُ عَلَيْهِمْ ۖ وَلِلْكَافِرِينَ أَمْثَالُهَا", translation: "Have they not traveled through the land and seen the end of those before them? Allah destroyed them, and for the disbelievers is something comparable." },
    { ayah: 11, arabic: "ذَٰلِكَ بِأَنَّ اللَّهَ مَوْلَى الَّذِينَ آمَنُوا وَأَنَّ الْكَافِرِينَ لَا مَوْلَىٰ لَهُمْ", translation: "That is because Allah is the protector of those who believe, and because the disbelievers have no protector." },
    { ayah: 12, arabic: "إِنَّ اللَّهَ يُدْخِلُ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ ۖ وَالَّذِينَ كَفَرُوا يَتَمَتَّعُونَ وَيَأْكُلُونَ كَمَا تَأْكُلُ الْأَنْعَامُ وَالنَّارُ مَثْوًى لَّهُمْ", translation: "Indeed, Allah will admit those who believe to gardens beneath which rivers flow, but those who disbelieve enjoy themselves and eat as grazing livestock eat, and the Fire will be a residence for them." },
    { ayah: 13, arabic: "وَكَأَيِّن مِّن قَرْيَةٍ هِيَ أَشَدُّ قُوَّةً مِّن قَرْيَتِكَ الَّتِي أَخْرَجَتْكَ أَهْلَكْنَاهُمْ فَلَا نَاصِرَ لَهُمْ", translation: "And how many a city was stronger than your city which drove you out? We destroyed them; and there was no helper for them." },
    { ayah: 14, arabic: "أَفَمَن كَانَ عَلَىٰ بَيِّنَةٍ مِّن رَّبِّهِ كَمَن زُيِّنَ لَهُ سُوءُ عَمَلِهِ وَاتَّبَعُوا أَهْوَاءَهُمْ", translation: "Is one who stands on clear evidence from his Lord like one whose evil deeds have been made attractive to him and who follow their desires?" },
    { ayah: 15, arabic: "مَّثَلُ الْجَنَّةِ الَّتِي وُعِدَ الْمُتَّقُونَ ۖ فِيهَا أَنْهَارٌ مِّن مَّاءٍ غَيْرِ آسِنٍ وَأَنْهَارٌ مِّن لَّبَنٍ لَّمْ يَتَغَيَّرْ طَعْمُهُ وَأَنْهَارٌ مِّن خَمْرٍ لَّذَّةٍ لِّلشَّارِبِينَ وَأَنْهَارٌ مِّن عَسَلٍ مُّصَفًّى", translation: "The description of Paradise promised to the righteous: therein are rivers of water unaltered, rivers of milk whose taste never changes, rivers of wine delicious to those who drink, and rivers of purified honey." },
    { ayah: 16, arabic: "وَمِنْهُم مَّن يَسْتَمِعُ إِلَيْكَ حَتَّىٰ إِذَا خَرَجُوا مِنْ عِندِكَ قَالُوا لِلَّذِينَ أُوتُوا الْعِلْمَ مَاذَا قَالَ آنِفًا", translation: "And among them are those who listen to you, until when they depart from you, they say to those given knowledge, 'What has he just said?'" },
    { ayah: 17, arabic: "وَالَّذِينَ اهْتَدَوْا زَادَهُمْ هُدًى وَآتَاهُمْ تَقْوَاهُمْ", translation: "And those who are guided — He increases them in guidance and gives them their righteousness." },
    { ayah: 18, arabic: "فَهَلْ يَنظُرُونَ إِلَّا السَّاعَةَ أَن تَأْتِيَهُم بَغْتَةً ۖ فَقَدْ جَاءَ أَشْرَاطُهَا", translation: "Do they await except that the Hour should come upon them unexpectedly? Already its indications have come." },
    { ayah: 19, arabic: "فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ", translation: "So know that there is no deity except Allah and ask forgiveness for your sin and for the believing men and believing women." },
    { ayah: 20, arabic: "وَيَقُولُ الَّذِينَ آمَنُوا لَوْلَا نُزِّلَتْ سُورَةٌ ۖ فَإِذَا أُنزِلَتْ سُورَةٌ مُّحْكَمَةٌ وَذُكِرَ فِيهَا الْقِتَالُ ۙ رَأَيْتَ الَّذِينَ فِي قُلُوبِهِم مَّرَضٌ يَنظُرُونَ إِلَيْكَ نَظَرَ الْمَغْشِيِّ عَلَيْهِ مِنَ الْمَوْتِ", translation: "Those who believe say, 'Why has a surah not been sent down?' But when a precise surah is revealed and fighting is mentioned, you see those in whose hearts is disease looking at you with a look of one overcome by death." },
    { ayah: 21, arabic: "طَاعَةٌ وَقَوْلٌ مَّعْرُوفٌ ۚ فَإِذَا عَزَمَ الْأَمْرُ فَلَوْ صَدَقُوا اللَّهَ لَكَانَ خَيْرًا لَّهُمْ", translation: "Obedience and good speech. And when the matter was determined, if they had been true to Allah, it would have been better for them." },
    { ayah: 22, arabic: "فَهَلْ عَسَيْتُمْ إِن تَوَلَّيْتُمْ أَن تُفْسِدُوا فِي الْأَرْضِ وَتُقَطِّعُوا أَرْحَامَكُمْ", translation: "So would you perhaps, if you turned away, cause corruption on earth and sever your ties of kinship?" },
    { ayah: 23, arabic: "أُولَٰئِكَ الَّذِينَ لَعَنَهُمُ اللَّهُ فَأَصَمَّهُمْ وَأَعْمَىٰ أَبْصَارَهُمْ", translation: "Those are the ones that Allah has cursed, so He deafened them and blinded their eyes." },
    { ayah: 24, arabic: "أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا", translation: "Then do they not reflect upon the Quran, or are there locks upon their hearts?" },
    { ayah: 25, arabic: "إِنَّ الَّذِينَ ارْتَدُّوا عَلَىٰ أَدْبَارِهِم مِّن بَعْدِ مَا تَبَيَّنَ لَهُمُ الْهُدَى ۙ الشَّيْطَانُ سَوَّلَ لَهُمْ وَأَمْلَىٰ لَهُمْ", translation: "Indeed, those who reverted back after guidance had become clear to them — Satan enticed them and prolonged hope for them." },
    { ayah: 26, arabic: "ذَٰلِكَ بِأَنَّهُمْ قَالُوا لِلَّذِينَ كَرِهُوا مَا نَزَّلَ اللَّهُ سَنُطِيعُكُمْ فِي بَعْضِ الْأَمْرِ", translation: "That is because they said to those who disliked what Allah sent down, 'We will obey you in part of the matter.'" },
    { ayah: 27, arabic: "فَكَيْفَ إِذَا تَوَفَّتْهُمُ الْمَلَائِكَةُ يَضْرِبُونَ وُجُوهَهُمْ وَأَدْبَارَهُمْ", translation: "Then how will it be when the angels take them in death, striking their faces and their backs?" },
    { ayah: 28, arabic: "ذَٰلِكَ بِأَنَّهُمُ اتَّبَعُوا مَا أَسْخَطَ اللَّهَ وَكَرِهُوا رِضْوَانَهُ فَأَحْبَطَ أَعْمَالَهُمْ", translation: "That is because they followed what angered Allah and disliked what earns His pleasure, so He rendered worthless their deeds." },
    { ayah: 29, arabic: "أَمْ حَسِبَ الَّذِينَ فِي قُلُوبِهِم مَّرَضٌ أَن لَّن يُخْرِجَ اللَّهُ أَضْغَانَهُمْ", translation: "Or do those in whose hearts is disease think that Allah would never expose their grudges?" },
    { ayah: 30, arabic: "وَلَوْ نَشَاءُ لَأَرَيْنَاكَهُمْ فَلَعَرَفْتَهُم بِسِيمَاهُمْ ۚ وَلَتَعْرِفَنَّهُمْ فِي لَحْنِ الْقَوْلِ", translation: "And if We willed, We could show them to you, and you would know them by their marks; but you will surely know them by the tone of their speech." },
    { ayah: 31, arabic: "وَلَنَبْلُوَنَّكُمْ حَتَّىٰ نَعْلَمَ الْمُجَاهِدِينَ مِنكُمْ وَالصَّابِرِينَ وَنَبْلُوَ أَخْبَارَكُمْ", translation: "And We will surely test you until We make evident those who strive among you and the patient, and We will test your affairs." },
    { ayah: 32, arabic: "إِنَّ الَّذِينَ كَفَرُوا وَصَدُّوا عَن سَبِيلِ اللَّهِ وَشَاقُّوا الرَّسُولَ مِن بَعْدِ مَا تَبَيَّنَ لَهُمُ الْهُدَىٰ لَن يَضُرُّوا اللَّهَ شَيْئًا وَسَيُحْبِطُ أَعْمَالَهُمْ", translation: "Indeed, those who disbelieve and obstruct from the path of Allah and oppose the Messenger after guidance has become clear to them — never will they harm Allah at all, and He will render worthless their deeds." },
    { ayah: 33, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَلَا تُبْطِلُوا أَعْمَالَكُمْ", translation: "O you who have believed, obey Allah and obey the Messenger and do not invalidate your deeds." },
    { ayah: 34, arabic: "إِنَّ الَّذِينَ كَفَرُوا وَصَدُّوا عَن سَبِيلِ اللَّهِ ثُمَّ مَاتُوا وَهُمْ كُفَّارٌ فَلَن يَغْفِرَ اللَّهُ لَهُمْ", translation: "Indeed, those who disbelieve and avert from the path of Allah and then die while they are disbelievers — never will Allah forgive them." },
    { ayah: 35, arabic: "فَلَا تَهِنُوا وَتَدْعُوا إِلَى السَّلْمِ وَأَنتُمُ الْأَعْلَوْنَ وَاللَّهُ مَعَكُمْ وَلَن يَتِرَكُمْ أَعْمَالَكُمْ", translation: "So do not weaken and call for peace while you are superior, and Allah is with you and will never deprive you of your deeds." },
    { ayah: 36, arabic: "إِنَّمَا الْحَيَاةُ الدُّنْيَا لَعِبٌ وَلَهْوٌ ۚ وَإِن تُؤْمِنُوا وَتَتَّقُوا يُؤْتِكُمْ أُجُورَكُمْ وَلَا يَسْأَلْكُمْ أَمْوَالَكُمْ", translation: "The life of this world is only amusement and diversion. And if you believe and fear Allah, He will give you your rewards and not ask you for your wealth." },
    { ayah: 37, arabic: "إِن يَسْأَلْكُمُوهَا فَيُحْفِكُمْ تَبْخَلُوا وَيُخْرِجْ أَضْغَانَكُمْ", translation: "If He should ask you for it and press you, you would withhold, and He would expose your grudges." },
    { ayah: 38, arabic: "هَا أَنتُمْ هَٰؤُلَاءِ تُدْعَوْنَ لِتُنفِقُوا فِي سَبِيلِ اللَّهِ فَمِنكُم مَّن يَبْخَلُ ۖ وَمَن يَبْخَلْ فَإِنَّمَا يَبْخَلُ عَن نَّفْسِهِ ۚ وَاللَّهُ الْغَنِيُّ وَأَنتُمُ الْفُقَرَاءُ ۚ وَإِن تَتَوَلَّوْا يَسْتَبْدِلْ قَوْمًا غَيْرَكُمْ ثُمَّ لَا يَكُونُوا أَمْثَالَكُمْ", translation: "Here you are — those invited to spend in the cause of Allah — but among you are those who withhold. And whoever withholds only withholds from himself. And Allah is the Free of need, while you are the needy. And if you turn away, He will replace you with another people, and they will not be the likes of you." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Reckoning",
      subtitle: "Four movements: cosmic terms → two worlds → reluctant hearts → divine test",
      sections: [
        { ayahs: "1–11", title: "The Cosmic Terms", color: "#4ecdc4", desc: "Belief and disbelief placed on opposite sides of a hard line. Deeds are either nullified or accepted. The legislation of battle arrives — not as aggression but as a test that makes inner reality visible. Divine support is conditional: if you support Allah, He will support you." },
        { ayahs: "12–15", title: "The Two Worlds", color: "#9b7fd4", desc: "The surah's most luminous passage: four rivers of Paradise — water unchanged, milk that never sours, wine without degradation, purified honey — placed directly against scalding water that severs the intestines. One world flows. The other cuts." },
        { ayahs: "16–24", title: "The Sealed Hearts", color: "#e07a8a", isPivot: true, desc: "The diagnosis of hypocrisy: people who sit in the Prophet's gatherings and cannot recall what was said. Hearts sealed shut, following desire instead of revelation. The pivot question: are there locks upon their hearts?" },
        { ayahs: "25–38", title: "The Exposure", color: "#C9A84C", desc: "Those who turned back after receiving guidance. Satan prolonged their false hope. God exposes their grudges, tests their affairs, and delivers the final warning: if you turn away, He will replace you with another people who will not be like you." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's opening and closing form a concentric architecture of nullification and warning",
      pairs: [
        {
          left: { label: "Deeds Rendered Worthless", ayahs: "1–3", desc: "Those who disbelieve and obstruct — their deeds are wasted. Belief and disbelief set on a hard line." },
          right: { label: "Deeds Rendered Worthless", ayahs: "32–34", desc: "Identical language returns: those who oppose the Messenger after guidance — their deeds nullified. The frame of futility closes." },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Legislation", ayahs: "4–6", desc: "How to fight: strike necks, bind firmly, then favor or ransom. War as a burden that will be set down." },
          right: { label: "The Command", ayahs: "35–38", desc: "Do not weaken or call for peace from fear. The replacement warning: God will find another people." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Rivers of Paradise", ayahs: "12–15", desc: "Four rivers that never corrupt — water, milk, wine, honey. A world that flows." },
          right: { label: "The Apostates", ayahs: "25–28", desc: "Those who received the rivers' promise and chose to turn back. What was offered is precisely what was abandoned." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Locked Heart", ayahs: "16–24",
        desc: "Hearts sealed, eyes blinded, ears deafened. The pivot question about locks on hearts.",
        note: "Everything before this builds the case for reflection. Everything after deals with the consequences of refusing it.",
      },
    },
    deductiveFunnel: {
      title: "The Diagnosis",
      subtitle: "The surah traces the pathology from hearing without receiving to full spiritual closure",
      layers: [
        { depth: 1, label: "Hearing Without Receiving", ayah: "16", arabic: "مَاذَا قَالَ آنِفًا", desc: "They sit in the Prophet's gatherings, hear the words, and the moment they leave: 'What did he just say?' Revelation has not even had time to cool and already it is lost.", color: "#4ecdc4" },
        { depth: 2, label: "The Sealed Heart", ayah: "16b", arabic: "طَبَعَ اللَّهُ عَلَىٰ قُلُوبِهِمْ", desc: "God has sealed their hearts. A closed system — nothing enters, nothing exits. Not dramatic betrayal but quiet closure: a heart that has stopped being permeable to revelation.", color: "#9b7fd4" },
        { depth: 3, label: "The Look of Death", ayah: "20", arabic: "نَظَرَ الْمَغْشِيِّ عَلَيْهِ مِنَ الْمَوْتِ", desc: "When fighting is mentioned, they look at the Prophet with the look of someone upon whom death is descending. They wanted the idea of sacrifice. They did not want the reality.", color: "#e07a8a" },
        { depth: 4, label: "The Locks", ayah: "24", arabic: "أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا", desc: "The final diagnosis. Are there locks on their hearts? The image is of a heart with its own locks — locks it has perhaps chosen. The file is closing.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A Madinan surah that refuses every comfort its audience might expect",
      absences: [
        { item: "No prophetic narratives", note: "No Musa, Ibrahim, Nuh, or any previous messenger's story. The community has already heard those stories. It is past the stage of inspiration by example. It needs legislation, diagnosis, and a mirror." },
        { item: "No extended eschatological scenes", note: "The Hour is mentioned once, briefly (ayah 18). No trumpet, no reckoning, no detailed Day of Judgment. The surah's eschatology is concentrated in the four rivers and the severed intestines — two images, placed side by side." },
        { item: "No consolation for the Prophet", note: "No 'be patient,' no 'do not grieve.' The Prophet is named (one of only four times in the Quran) but not comforted. The surah speaks through him to the community." },
        { item: "No path back for the worst offenders", note: "Ayah 34: those who die as disbelievers will never be forgiven. The emphatic 'lan' (never) closes the door permanently. The surah draws a line it does not erase." },
        { item: "No guarantee of the community's permanence", note: "The closing ayah warns that God will replace the community if it turns away. The role is conditional. Commitment is not inherited. God's cause will be carried forward, with or without you." },
      ],
    },
  },

  contentNodes: [
    { concept: "The four rivers of Paradise — 47:15", type: "surah-specific", articleSlug: "four-rivers-paradise-47-15" },
    { concept: "Locks on the hearts — the surah's pivot", type: "surah-specific", articleSlug: "locks-hearts-47-24" },
    { concept: "Muhammad–Al-Fath sequence: question and answer", type: "cross-surah", articleSlug: "muhammad-fath-diptych" },
    { concept: "Ihbat — the Quranic vocabulary of nullified deeds", type: "cross-surah", articleSlug: "ihbat-nullified-deeds" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Reckoning" },
  { id: "ring", label: "Ring" },
  { id: "diagnosis", label: "Diagnosis" },
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
      <span className="text-gold-500/50 text-sm">&#x06DE;</span>
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
        Hearing without receiving {"\u2192"} sealed heart {"\u2192"} death-gaze {"\u2192"} locks
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

        {/* -- Hero -- */}
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
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivot</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />

        {/* -- Tab bar -- */}
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

        {/* -- Tab content -- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "diagnosis" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
        </div>

        {/* -- Go Deeper -- */}
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
