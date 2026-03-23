"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH MARYAM — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/maryam
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Maryam",
  arabicName: "مَرْيَم",
  meaning: "Mary",
  number: 19,
  ayahCount: 98,
  period: "Makki",
  juz: 16,
  movements: 6,
  thesis:
    "A gallery of impossible things — an old man given a son, a virgin given a child, a newborn who speaks — narrated in a voice so quiet and so certain that by the end you are not asking whether they happened but why you ever doubted that they could.",
  reflectionUrl: "/surahs/maryam",
  readTime: "25 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "يَا لَيْتَنِي مِتُّ قَبْلَ هَٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا",
    ayahRef: "19:23",
    translation: "I wish I had died before this and been completely forgotten.",
    why: "The most emotionally exposed moment in the surah. Maryam, alone under a palm tree in labor, wishes for double erasure — forgotten, and the memory of the forgetting itself forgotten. The Quran preserves the words of a woman wishing to be erased, and in preserving them refuses the erasure she asked for.",
  },

  audio: { surahNumber: 19, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "كهيعص", translation: "Kaf-Ha-Ya-'Ayn-Sad." },
    { ayah: 2, arabic: "ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُ زَكَرِيَّا", translation: "A mention of the mercy of your Lord to His servant Zakariyya —" },
    { ayah: 3, arabic: "إِذْ نَادَىٰ رَبَّهُ نِدَاءً خَفِيًّا", translation: "when he called his Lord with a private call." },
    { ayah: 4, arabic: "قَالَ رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُن بِدُعَائِكَ رَبِّ شَقِيًّا", translation: "He said, 'My Lord, my bones have gone soft, and my head has ignited with white hair, and never have I been disappointed in my supplication to You, my Lord.'" },
    { ayah: 5, arabic: "وَإِنِّي خِفْتُ الْمَوَالِيَ مِن وَرَائِي وَكَانَتِ امْرَأَتِي عَاقِرًا فَهَبْ لِي مِن لَّدُنكَ وَلِيًّا", translation: "And I fear the successors after me, and my wife has been barren, so give me from Yourself a guardian." },
    { ayah: 6, arabic: "يَرِثُنِي وَيَرِثُ مِنْ آلِ يَعْقُوبَ ۖ وَاجْعَلْهُ رَبِّ رَضِيًّا", translation: "Who will inherit me and inherit from the family of Yaqub. And make him, my Lord, pleasing." },
    { ayah: 7, arabic: "يَا زَكَرِيَّا إِنَّا نُبَشِّرُكَ بِغُلَامٍ اسْمُهُ يَحْيَىٰ لَمْ نَجْعَل لَّهُ مِن قَبْلُ سَمِيًّا", translation: "O Zakariyya, We give you good tidings of a son whose name is Yahya — We have given no one this name before." },
    { ayah: 8, arabic: "قَالَ رَبِّ أَنَّىٰ يَكُونُ لِي غُلَامٌ وَكَانَتِ امْرَأَتِي عَاقِرًا وَقَدْ بَلَغْتُ مِنَ الْكِبَرِ عِتِيًّا", translation: "He said, 'My Lord, how can I have a son when my wife is barren and I have reached extreme old age?'" },
    { ayah: 9, arabic: "قَالَ كَذَٰلِكَ قَالَ رَبُّكَ هُوَ عَلَيَّ هَيِّنٌ وَقَدْ خَلَقْتُكَ مِن قَبْلُ وَلَمْ تَكُ شَيْئًا", translation: "He said, 'Thus says your Lord: It is easy for Me, and I created you before when you were nothing.'" },
    { ayah: 10, arabic: "قَالَ رَبِّ اجْعَل لِّي آيَةً ۚ قَالَ آيَتُكَ أَلَّا تُكَلِّمَ النَّاسَ ثَلَاثَ لَيَالٍ سَوِيًّا", translation: "He said, 'My Lord, make for me a sign.' He said, 'Your sign is that you will not speak to people for three nights, being sound.'" },
    { ayah: 11, arabic: "فَخَرَجَ عَلَىٰ قَوْمِهِ مِنَ الْمِحْرَابِ فَأَوْحَىٰ إِلَيْهِمْ أَن سَبِّحُوا بُكْرَةً وَعَشِيًّا", translation: "So he came out to his people from the prayer chamber and signaled to them: glorify in the morning and the evening." },
    { ayah: 12, arabic: "يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا", translation: "O Yahya, take the Book with strength. And We gave him wisdom as a child —" },
    { ayah: 13, arabic: "وَحَنَانًا مِّن لَّدُنَّا وَزَكَاةً ۖ وَكَانَ تَقِيًّا", translation: "and tenderness from Us, and purity. And he was God-conscious —" },
    { ayah: 14, arabic: "وَبَرًّا بِوَالِدَيْهِ وَلَمْ يَكُن جَبَّارًا عَصِيًّا", translation: "and good to his parents, and not domineering or rebellious." },
    { ayah: 15, arabic: "وَسَلَامٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا", translation: "And peace be upon him the day he was born, the day he dies, and the day he is raised alive." },
    { ayah: 16, arabic: "وَاذْكُرْ فِي الْكِتَابِ مَرْيَمَ إِذِ انتَبَذَتْ مِنْ أَهْلِهَا مَكَانًا شَرْقِيًّا", translation: "And mention in the Book, Maryam, when she withdrew from her family to a place in the east —" },
    { ayah: 17, arabic: "فَاتَّخَذَتْ مِن دُونِهِمْ حِجَابًا فَأَرْسَلْنَا إِلَيْهَا رُوحَنَا فَتَمَثَّلَ لَهَا بَشَرًا سَوِيًّا", translation: "and put a screen between herself and them. Then We sent Our spirit to her, and he appeared before her as a perfectly formed man." },
    { ayah: 18, arabic: "قَالَتْ إِنِّي أَعُوذُ بِالرَّحْمَٰنِ مِنكَ إِن كُنتَ تَقِيًّا", translation: "She said, 'I seek refuge in the Most Merciful from you, if you are God-conscious.'" },
    { ayah: 19, arabic: "قَالَ إِنَّمَا أَنَا رَسُولُ رَبِّكِ لِأَهَبَ لَكِ غُلَامًا زَكِيًّا", translation: "He said, 'I am only the messenger of your Lord, to give you a pure boy.'" },
    { ayah: 20, arabic: "قَالَتْ أَنَّىٰ يَكُونُ لِي غُلَامٌ وَلَمْ يَمْسَسْنِي بَشَرٌ وَلَمْ أَكُ بَغِيًّا", translation: "She said, 'How can I have a son when no man has touched me, and I have not been unchaste?'" },
    { ayah: 21, arabic: "قَالَ كَذَٰلِكِ قَالَ رَبُّكِ هُوَ عَلَيَّ هَيِّنٌ ۖ وَلِنَجْعَلَهُ آيَةً لِّلنَّاسِ وَرَحْمَةً مِّنَّا ۚ وَكَانَ أَمْرًا مَّقْضِيًّا", translation: "He said, 'Thus says your Lord: It is easy for Me — and We will make him a sign for the people and a mercy from Us. And it is a matter already decreed.'" },
    { ayah: 22, arabic: "فَحَمَلَتْهُ فَانتَبَذَتْ بِهِ مَكَانًا قَصِيًّا", translation: "So she conceived him, and withdrew with him to a far place." },
    { ayah: 23, arabic: "فَأَجَاءَهَا الْمَخَاضُ إِلَىٰ جِذْعِ النَّخْلَةِ قَالَتْ يَا لَيْتَنِي مِتُّ قَبْلَ هَٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا", translation: "The labor pains drove her to the trunk of a palm tree. She said, 'I wish I had died before this and been completely forgotten.'" },
    { ayah: 24, arabic: "فَنَادَاهَا مِن تَحْتِهَا أَلَّا تَحْزَنِي قَدْ جَعَلَ رَبُّكِ تَحْتَكِ سَرِيًّا", translation: "Then he called to her from below her, 'Do not grieve — your Lord has placed beneath you a stream.'" },
    { ayah: 25, arabic: "وَهُزِّي إِلَيْكِ بِجِذْعِ النَّخْلَةِ تُسَاقِطْ عَلَيْكِ رُطَبًا جَنِيًّا", translation: "And shake toward you the trunk of the palm tree — it will drop fresh, ripe dates upon you." },
    { ayah: 26, arabic: "فَكُلِي وَاشْرَبِي وَقَرِّي عَيْنًا ۖ فَإِمَّا تَرَيِنَّ مِنَ الْبَشَرِ أَحَدًا فَقُولِي إِنِّي نَذَرْتُ لِلرَّحْمَٰنِ صَوْمًا فَلَنْ أُكَلِّمَ الْيَوْمَ إِنسِيًّا", translation: "So eat and drink and let your eyes be at ease. And if you see any person, say, 'I have pledged a fast of silence to the Most Merciful.'" },
    { ayah: 27, arabic: "فَأَتَتْ بِهِ قَوْمَهَا تَحْمِلُهُ ۖ قَالُوا يَا مَرْيَمُ لَقَدْ جِئْتِ شَيْئًا فَرِيًّا", translation: "Then she came with him to her people, carrying him. They said, 'O Maryam, you have done something unprecedented.'" },
    { ayah: 28, arabic: "يَا أُخْتَ هَارُونَ مَا كَانَ أَبُوكِ امْرَأَ سَوْءٍ وَمَا كَانَتْ أُمُّكِ بَغِيًّا", translation: "'O sister of Harun, your father was not a bad man, and your mother was not unchaste.'" },
    { ayah: 29, arabic: "فَأَشَارَتْ إِلَيْهِ ۖ قَالُوا كَيْفَ نُكَلِّمُ مَن كَانَ فِي الْمَهْدِ صَبِيًّا", translation: "So she pointed to him. They said, 'How can we speak to one who is a child in the cradle?'" },
    { ayah: 30, arabic: "قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا", translation: "He said, 'I am the servant of Allah. He has given me the Book and made me a prophet.'" },
    { ayah: 31, arabic: "وَجَعَلَنِي مُبَارَكًا أَيْنَ مَا كُنتُ وَأَوْصَانِي بِالصَّلَاةِ وَالزَّكَاةِ مَا دُمْتُ حَيًّا", translation: "And He has made me blessed wherever I am, and has enjoined upon me prayer and zakat as long as I live —" },
    { ayah: 32, arabic: "وَبَرًّا بِوَالِدَتِي وَلَمْ يَجْعَلْنِي جَبَّارًا شَقِيًّا", translation: "and good to my mother, and He has not made me domineering or wretched." },
    { ayah: 33, arabic: "وَالسَّلَامُ عَلَيَّ يَوْمَ وُلِدتُّ وَيَوْمَ أَمُوتُ وَيَوْمَ أُبْعَثُ حَيًّا", translation: "And peace be upon me the day I was born, the day I die, and the day I am raised alive." },
    { ayah: 34, arabic: "ذَٰلِكَ عِيسَى ابْنُ مَرْيَمَ ۚ قَوْلَ الْحَقِّ الَّذِي فِيهِ يَمْتَرُونَ", translation: "That is Isa son of Maryam — the word of truth about which they dispute." },
    { ayah: 35, arabic: "مَا كَانَ لِلَّهِ أَن يَتَّخِذَ مِن وَلَدٍ ۖ سُبْحَانَهُ ۚ إِذَا قَضَىٰ أَمْرًا فَإِنَّمَا يَقُولُ لَهُ كُن فَيَكُونُ", translation: "It is not for Allah to take a son. Glory be to Him. When He decrees a matter, He says to it, 'Be,' and it is." },
    { ayah: 36, arabic: "وَإِنَّ اللَّهَ رَبِّي وَرَبُّكُمْ فَاعْبُدُوهُ ۚ هَٰذَا صِرَاطٌ مُّسْتَقِيمٌ", translation: "And indeed, Allah is my Lord and your Lord, so worship Him. That is a straight path." },
    { ayah: 37, arabic: "فَاخْتَلَفَ الْأَحْزَابُ مِن بَيْنِهِمْ ۖ فَوَيْلٌ لِّلَّذِينَ كَفَرُوا مِن مَّشْهَدِ يَوْمٍ عَظِيمٍ", translation: "Then the factions differed among themselves — so woe to those who disbelieved, from the scene of a tremendous Day." },
    { ayah: 38, arabic: "أَسْمِعْ بِهِمْ وَأَبْصِرْ يَوْمَ يَأْتُونَنَا ۖ لَٰكِنِ الظَّالِمُونَ الْيَوْمَ فِي ضَلَالٍ مُّبِينٍ", translation: "How clearly they will hear and see on the Day they come to Us — but today the wrongdoers are in clear error." },
    { ayah: 39, arabic: "وَأَنذِرْهُمْ يَوْمَ الْحَسْرَةِ إِذْ قُضِيَ الْأَمْرُ وَهُمْ فِي غَفْلَةٍ وَهُمْ لَا يُؤْمِنُونَ", translation: "And warn them of the Day of Regret, when the matter will be decided, while they are in heedlessness and do not believe." },
    { ayah: 40, arabic: "إِنَّا نَحْنُ نَرِثُ الْأَرْضَ وَمَنْ عَلَيْهَا وَإِلَيْنَا يُرْجَعُونَ", translation: "Indeed, We will inherit the earth and everyone on it, and to Us they will be returned." },
    { ayah: 41, arabic: "وَاذْكُرْ فِي الْكِتَابِ إِبْرَاهِيمَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا", translation: "And mention in the Book, Ibrahim. Indeed, he was a man of truth, a prophet." },
    { ayah: 42, arabic: "إِذْ قَالَ لِأَبِيهِ يَا أَبَتِ لِمَ تَعْبُدُ مَا لَا يَسْمَعُ وَلَا يُبْصِرُ وَلَا يُغْنِي عَنكَ شَيْئًا", translation: "When he said to his father, 'O my dear father, why do you worship what does not hear or see or benefit you at all?'" },
    { ayah: 43, arabic: "يَا أَبَتِ إِنِّي قَدْ جَاءَنِي مِنَ الْعِلْمِ مَا لَمْ يَأْتِكَ فَاتَّبِعْنِي أَهْدِكَ صِرَاطًا سَوِيًّا", translation: "'O my dear father, knowledge has come to me that did not come to you, so follow me — I will guide you to a straight path.'" },
    { ayah: 44, arabic: "يَا أَبَتِ لَا تَعْبُدِ الشَّيْطَانَ ۖ إِنَّ الشَّيْطَانَ كَانَ لِلرَّحْمَٰنِ عَصِيًّا", translation: "'O my dear father, do not worship Satan. Indeed, Satan is ever disobedient to the Most Merciful.'" },
    { ayah: 45, arabic: "يَا أَبَتِ إِنِّي أَخَافُ أَن يَمَسَّكَ عَذَابٌ مِّنَ الرَّحْمَٰنِ فَتَكُونَ لِلشَّيْطَانِ وَلِيًّا", translation: "'O my dear father, I fear that a punishment from the Most Merciful will touch you, and you will become a companion of Satan.'" },
    { ayah: 46, arabic: "قَالَ أَرَاغِبٌ أَنتَ عَنْ آلِهَتِي يَا إِبْرَاهِيمُ ۖ لَئِن لَّمْ تَنتَهِ لَأَرْجُمَنَّكَ ۖ وَاهْجُرْنِي مَلِيًّا", translation: "He said, 'Are you turning away from my gods, O Ibrahim? If you do not stop, I will stone you. Now leave me alone for a long time.'" },
    { ayah: 47, arabic: "قَالَ سَلَامٌ عَلَيْكَ ۖ سَأَسْتَغْفِرُ لَكَ رَبِّي ۖ إِنَّهُ كَانَ بِي حَفِيًّا", translation: "He said, 'Peace be upon you. I will ask my Lord to forgive you. He has always been gracious to me.'" },
    { ayah: 48, arabic: "وَأَعْتَزِلُكُمْ وَمَا تَدْعُونَ مِن دُونِ اللَّهِ وَأَدْعُو رَبِّي عَسَىٰ أَلَّا أَكُونَ بِدُعَاءِ رَبِّي شَقِيًّا", translation: "'And I will withdraw from you and what you invoke besides Allah, and I will call upon my Lord — perhaps I will not be disappointed in calling upon my Lord.'" },
    { ayah: 49, arabic: "فَلَمَّا اعْتَزَلَهُمْ وَمَا يَعْبُدُونَ مِن دُونِ اللَّهِ وَهَبْنَا لَهُ إِسْحَاقَ وَيَعْقُوبَ ۖ وَكُلًّا جَعَلْنَا نَبِيًّا", translation: "So when he had withdrawn from them and what they worshipped besides Allah, We gave him Ishaq and Yaqub, and each of them We made a prophet." },
    { ayah: 50, arabic: "وَوَهَبْنَا لَهُم مِّن رَّحْمَتِنَا وَجَعَلْنَا لَهُمْ لِسَانَ صِدْقٍ عَلِيًّا", translation: "And We gave them of Our mercy, and We made for them a reputation of high truth." },
    { ayah: 51, arabic: "وَاذْكُرْ فِي الْكِتَابِ مُوسَىٰ ۚ إِنَّهُ كَانَ مُخْلَصًا وَكَانَ رَسُولًا نَّبِيًّا", translation: "And mention in the Book, Musa. He was chosen, and he was a messenger and a prophet." },
    { ayah: 52, arabic: "وَنَادَيْنَاهُ مِن جَانِبِ الطُّورِ الْأَيْمَنِ وَقَرَّبْنَاهُ نَجِيًّا", translation: "And We called him from the right side of the mountain, and We drew him near, speaking intimately." },
    { ayah: 53, arabic: "وَوَهَبْنَا لَهُ مِن رَّحْمَتِنَا أَخَاهُ هَارُونَ نَبِيًّا", translation: "And We gave him, out of Our mercy, his brother Harun as a prophet." },
    { ayah: 54, arabic: "وَاذْكُرْ فِي الْكِتَابِ إِسْمَاعِيلَ ۚ إِنَّهُ كَانَ صَادِقَ الْوَعْدِ وَكَانَ رَسُولًا نَّبِيًّا", translation: "And mention in the Book, Ismail. He was true to his promise, and he was a messenger and a prophet." },
    { ayah: 55, arabic: "وَكَانَ يَأْمُرُ أَهْلَهُ بِالصَّلَاةِ وَالزَّكَاةِ وَكَانَ عِندَ رَبِّهِ مَرْضِيًّا", translation: "He used to enjoin on his family prayer and zakat, and he was pleasing to his Lord." },
    { ayah: 56, arabic: "وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا", translation: "And mention in the Book, Idris. He was a man of truth, a prophet." },
    { ayah: 57, arabic: "وَرَفَعْنَاهُ مَكَانًا عَلِيًّا", translation: "And We raised him to a high station." },
    { ayah: 58, arabic: "أُولَٰئِكَ الَّذِينَ أَنْعَمَ اللَّهُ عَلَيْهِم مِّنَ النَّبِيِّينَ مِن ذُرِّيَّةِ آدَمَ وَمِمَّنْ حَمَلْنَا مَعَ نُوحٍ وَمِن ذُرِّيَّةِ إِبْرَاهِيمَ وَإِسْرَائِيلَ وَمِمَّنْ هَدَيْنَا وَاجْتَبَيْنَا ۚ إِذَا تُتْلَىٰ عَلَيْهِمْ آيَاتُ الرَّحْمَٰنِ خَرُّوا سُجَّدًا وَبُكِيًّا", translation: "Those were the ones upon whom Allah bestowed favor from among the prophets — from the descendants of Adam, and from those We carried with Nuh, and from the descendants of Ibrahim and Israel, and from those We guided and chose. When the verses of the Most Merciful were recited to them, they fell down in prostration and in tears." },
    { ayah: 59, arabic: "فَخَلَفَ مِن بَعْدِهِمْ خَلْفٌ أَضَاعُوا الصَّلَاةَ وَاتَّبَعُوا الشَّهَوَاتِ ۖ فَسَوْفَ يَلْقَوْنَ غَيًّا", translation: "But there came after them a generation who lost the prayer and followed desires; so they will meet loss —" },
    { ayah: 60, arabic: "إِلَّا مَن تَابَ وَآمَنَ وَعَمِلَ صَالِحًا فَأُولَٰئِكَ يَدْخُلُونَ الْجَنَّةَ وَلَا يُظْلَمُونَ شَيْئًا", translation: "except those who repent and believe and do righteous deeds — they will enter Paradise and will not be wronged at all." },
    { ayah: 61, arabic: "جَنَّاتِ عَدْنٍ الَّتِي وَعَدَ الرَّحْمَٰنُ عِبَادَهُ بِالْغَيْبِ ۚ إِنَّهُ كَانَ وَعْدُهُ مَأْتِيًّا", translation: "Gardens of Eden, which the Most Merciful has promised His servants unseen. His promise will certainly be fulfilled." },
    { ayah: 62, arabic: "لَّا يَسْمَعُونَ فِيهَا لَغْوًا إِلَّا سَلَامًا ۖ وَلَهُمْ رِزْقُهُمْ فِيهَا بُكْرَةً وَعَشِيًّا", translation: "They will not hear therein any vain talk — only peace. And they will have their provision therein, morning and evening." },
    { ayah: 63, arabic: "تِلْكَ الْجَنَّةُ الَّتِي نُورِثُ مِنْ عِبَادِنَا مَن كَانَ تَقِيًّا", translation: "That is the Garden We give as inheritance to those of Our servants who are God-conscious." },
    { ayah: 64, arabic: "وَمَا نَتَنَزَّلُ إِلَّا بِأَمْرِ رَبِّكَ ۖ لَهُ مَا بَيْنَ أَيْدِينَا وَمَا خَلْفَنَا وَمَا بَيْنَ ذَٰلِكَ ۚ وَمَا كَانَ رَبُّكَ نَسِيًّا", translation: "We descend not except by the command of your Lord. To Him belongs what is before us and behind us and between — and your Lord is never forgetful." },
    { ayah: 65, arabic: "رَّبُّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا فَاعْبُدْهُ وَاصْطَبِرْ لِعِبَادَتِهِ ۚ هَلْ تَعْلَمُ لَهُ سَمِيًّا", translation: "Lord of the heavens and the earth and what is between them — so worship Him and be patient in His worship. Do you know of anyone equal to Him?" },
    { ayah: 66, arabic: "وَيَقُولُ الْإِنسَانُ أَإِذَا مَا مِتُّ لَسَوْفَ أُخْرَجُ حَيًّا", translation: "And the human being says, 'When I have died, will I really be brought forth alive?'" },
    { ayah: 67, arabic: "أَوَلَا يَذْكُرُ الْإِنسَانُ أَنَّا خَلَقْنَاهُ مِن قَبْلُ وَلَمْ يَكُ شَيْئًا", translation: "Does the human being not remember that We created him before, when he was nothing?" },
    { ayah: 68, arabic: "فَوَرَبِّكَ لَنَحْشُرَنَّهُمْ وَالشَّيَاطِينَ ثُمَّ لَنُحْضِرَنَّهُمْ حَوْلَ جَهَنَّمَ جِثِيًّا", translation: "So by your Lord, We will surely gather them and the devils, then We will bring them around Hell on their knees." },
    { ayah: 69, arabic: "ثُمَّ لَنَنزِعَنَّ مِن كُلِّ شِيعَةٍ أَيُّهُمْ أَشَدُّ عَلَى الرَّحْمَٰنِ عِتِيًّا", translation: "Then We will extract from every group those who were most defiant against the Most Merciful." },
    { ayah: 70, arabic: "ثُمَّ لَنَحْنُ أَعْلَمُ بِالَّذِينَ هُمْ أَوْلَىٰ بِهَا صِلِيًّا", translation: "Then We know best those who are most deserving of burning therein." },
    { ayah: 71, arabic: "وَإِن مِّنكُمْ إِلَّا وَارِدُهَا ۚ كَانَ عَلَىٰ رَبِّكَ حَتْمًا مَّقْضِيًّا", translation: "And there is not one of you who will not pass over it. That is a decree from your Lord, definitively decided." },
    { ayah: 72, arabic: "ثُمَّ نُنَجِّي الَّذِينَ اتَّقَوا وَّنَذَرُ الظَّالِمِينَ فِيهَا جِثِيًّا", translation: "Then We will save those who had taqwa, and leave the wrongdoers within it, on their knees." },
    { ayah: 73, arabic: "وَإِذَا تُتْلَىٰ عَلَيْهِمْ آيَاتُنَا بَيِّنَاتٍ قَالَ الَّذِينَ كَفَرُوا لِلَّذِينَ آمَنُوا أَيُّ الْفَرِيقَيْنِ خَيْرٌ مَّقَامًا وَأَحْسَنُ نَدِيًّا", translation: "And when Our clear verses are recited to them, the disbelievers say to those who believe, 'Which of the two groups is better in position and more impressive in assembly?'" },
    { ayah: 74, arabic: "وَكَمْ أَهْلَكْنَا قَبْلَهُم مِّن قَرْنٍ هُمْ أَحْسَنُ أَثَاثًا وَرِئْيًا", translation: "And how many a generation before them have We destroyed who were finer in possessions and appearance!" },
    { ayah: 75, arabic: "قُلْ مَن كَانَ فِي الضَّلَالَةِ فَلْيَمْدُدْ لَهُ الرَّحْمَٰنُ مَدًّا ۚ حَتَّىٰ إِذَا رَأَوْا مَا يُوعَدُونَ إِمَّا الْعَذَابَ وَإِمَّا السَّاعَةَ فَسَيَعْلَمُونَ مَنْ هُوَ شَرٌّ مَّكَانًا وَأَضْعَفُ جُندًا", translation: "Say, 'Whoever is in error — the Most Merciful will extend for him until, when they see what they were promised — whether punishment or the Hour — they will know who is worst in position and weakest in soldiers.'" },
    { ayah: 76, arabic: "وَيَزِيدُ اللَّهُ الَّذِينَ اهْتَدَوْا هُدًى ۗ وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًا وَخَيْرٌ مَّرَدًّا", translation: "And Allah increases in guidance those who are guided. And lasting good deeds are better in your Lord's sight in reward and in outcome." },
    { ayah: 77, arabic: "أَفَرَأَيْتَ الَّذِي كَفَرَ بِآيَاتِنَا وَقَالَ لَأُوتَيَنَّ مَالًا وَوَلَدًا", translation: "Have you seen the one who disbelieved in Our signs and said, 'I will surely be given wealth and children'?" },
    { ayah: 78, arabic: "أَطَّلَعَ الْغَيْبَ أَمِ اتَّخَذَ عِندَ الرَّحْمَٰنِ عَهْدًا", translation: "Has he seen the unseen, or has he taken a covenant from the Most Merciful?" },
    { ayah: 79, arabic: "كَلَّا ۚ سَنَكْتُبُ مَا يَقُولُ وَنَمُدُّ لَهُ مِنَ الْعَذَابِ مَدًّا", translation: "Absolutely not. We will record what he says and extend for him from the punishment at length." },
    { ayah: 80, arabic: "وَنَرِثُهُ مَا يَقُولُ وَيَأْتِينَا فَرْدًا", translation: "And We will inherit from him what he claims, and he will come to Us alone." },
    { ayah: 81, arabic: "وَاتَّخَذُوا مِن دُونِ اللَّهِ آلِهَةً لِّيَكُونُوا لَهُمْ عِزًّا", translation: "And they have taken gods besides Allah, that they might be a source of strength for them." },
    { ayah: 82, arabic: "كَلَّا ۚ سَيَكْفُرُونَ بِعِبَادَتِهِمْ وَيَكُونُونَ عَلَيْهِمْ ضِدًّا", translation: "Absolutely not. They will deny their worship and become opponents against them." },
    { ayah: 83, arabic: "أَلَمْ تَرَ أَنَّا أَرْسَلْنَا الشَّيَاطِينَ عَلَى الْكَافِرِينَ تَؤُزُّهُمْ أَزًّا", translation: "Do you not see that We have sent the devils upon the disbelievers, inciting them with incitement?" },
    { ayah: 84, arabic: "فَلَا تَعْجَلْ عَلَيْهِمْ ۖ إِنَّمَا نَعُدُّ لَهُمْ عَدًّا", translation: "So do not be impatient over them. We only count out for them a count." },
    { ayah: 85, arabic: "يَوْمَ نَحْشُرُ الْمُتَّقِينَ إِلَى الرَّحْمَٰنِ وَفْدًا", translation: "On the Day We will gather the God-conscious to the Most Merciful as a delegation —" },
    { ayah: 86, arabic: "وَنَسُوقُ الْمُجْرِمِينَ إِلَىٰ جَهَنَّمَ وِرْدًا", translation: "and drive the sinful to Hell in thirst." },
    { ayah: 87, arabic: "لَّا يَمْلِكُونَ الشَّفَاعَةَ إِلَّا مَنِ اتَّخَذَ عِندَ الرَّحْمَٰنِ عَهْدًا", translation: "They will have no power of intercession, except the one who had taken a covenant with the Most Merciful." },
    { ayah: 88, arabic: "وَقَالُوا اتَّخَذَ الرَّحْمَٰنُ وَلَدًا", translation: "And they say, 'The Most Merciful has taken a son.'" },
    { ayah: 89, arabic: "لَّقَدْ جِئْتُمْ شَيْئًا إِدًّا", translation: "You have brought forth something monstrous —" },
    { ayah: 90, arabic: "تَكَادُ السَّمَاوَاتُ يَتَفَطَّرْنَ مِنْهُ وَتَنشَقُّ الْأَرْضُ وَتَخِرُّ الْجِبَالُ هَدًّا", translation: "at which the heavens almost shatter, the earth almost splits open, and the mountains almost collapse in ruins —" },
    { ayah: 91, arabic: "أَن دَعَوْا لِلرَّحْمَٰنِ وَلَدًا", translation: "that they attribute to the Most Merciful a son." },
    { ayah: 92, arabic: "وَمَا يَنبَغِي لِلرَّحْمَٰنِ أَن يَتَّخِذَ وَلَدًا", translation: "It is not fitting for the Most Merciful to take a son." },
    { ayah: 93, arabic: "إِن كُلُّ مَن فِي السَّمَاوَاتِ وَالْأَرْضِ إِلَّا آتِي الرَّحْمَٰنِ عَبْدًا", translation: "There is not one in the heavens and the earth who will not come to the Most Merciful as a servant." },
    { ayah: 94, arabic: "لَّقَدْ أَحْصَاهُمْ وَعَدَّهُمْ عَدًّا", translation: "He has counted them and numbered them precisely." },
    { ayah: 95, arabic: "وَكُلُّهُمْ آتِيهِ يَوْمَ الْقِيَامَةِ فَرْدًا", translation: "And every one of them will come to Him on the Day of Resurrection alone." },
    { ayah: 96, arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ سَيَجْعَلُ لَهُمُ الرَّحْمَٰنُ وُدًّا", translation: "Those who believe and do righteous deeds — the Most Merciful will place love for them." },
    { ayah: 97, arabic: "فَإِنَّمَا يَسَّرْنَاهُ بِلِسَانِكَ لِتُبَشِّرَ بِهِ الْمُتَّقِينَ وَتُنذِرَ بِهِ قَوْمًا لُّدًّا", translation: "So We have made it easy in your tongue, that you may give glad tidings to the God-conscious and warn therewith a stubborn people." },
    { ayah: 98, arabic: "وَكَمْ أَهْلَكْنَا قَبْلَهُم مِّن قَرْنٍ ۖ هَلْ تُحِسُّ مِنْهُم مِّنْ أَحَدٍ أَوْ تَسْمَعُ لَهُمْ رِكْزًا", translation: "And how many a generation before them have We destroyed — do you perceive a single one of them, or hear even the faintest sound from them?" },
  ],

  diagrams: {
    sectionJourney: {
      title: "Six Rooms",
      subtitle: "Prayer → miracle → speaking child → gallery → rupture → declaration",
      sections: [
        { ayahs: "1–15", title: "The Room of Prayer", color: "#4ecdc4", desc: "An old man whose bones have gone soft and whose hair has caught fire with age calls out in a whisper — nida'an khafiyya. God answers with an unprecedented child: Yahya. A word used nowhere else in the Quran — hanan, a mother's warmth — is given to this boy alone." },
        { ayahs: "16–21", title: "The Annunciation", color: "#9b7fd4", desc: "Maryam withdraws eastward, puts a screen between herself and the world, and encounters a spirit in the form of a man. Her first instinct is taqwa — she invokes the Most Merciful as a shield. The same divine formula given to Zakariyya returns with a single change: rabbuka becomes rabbuki. Same logic, same ease, different gender." },
        { ayahs: "22–40", title: "The Palm Tree and the Cradle", color: "#e07a8a", isPivot: true, desc: "Maryam in labor, alone, wishing for annihilation. Then water, dates, and a command to be silent. Her child speaks from the cradle — and his first word is 'abd, servant. The theological correction begins from the first syllable." },
        { ayahs: "41–57", title: "The Gallery of Prophets", color: "#C9A84C", desc: "Ibrahim and his father — ya abati four times, tenderness persisting through rejection. Musa called to the mountain and drawn near as a confidant. Ismail true to his promise. Idris raised high. Each portrait a single brushstroke, each prophet shown in a moment of isolation." },
        { ayahs: "58–87", title: "The Rupture", color: "#f28585", desc: "The turning point — ayah 58, the verse of prostration. Then the trapdoor opens: after the prophets came a generation that lost the prayer. Two processions emerge — the God-conscious gathered as a delegation, the sinful driven to Hell in thirst." },
        { ayahs: "88–98", title: "The Declaration", color: "#7ec8e3", desc: "The heavens almost shatter at the claim that God has a son. The creation itself recoils. Then the counter-truth: every being comes to the Most Merciful as a servant. He has counted them all. And for those who believe — sa-yaj'alu lahumu-l-rahmanu wudda — He will place love." },
      ],
    },
    chiasticRing: {
      title: "The Whisper and the Silence",
      subtitle: "The surah opens with a secret prayer and closes with the absence of even a whisper",
      pairs: [
        {
          left: { label: "The Whisper", ayahs: "3", desc: "Zakariyya calls his Lord nida'an khafiyya — with a secret call in the dark. The quiet of prayer." },
          right: { label: "The Silence", ayahs: "98", desc: "Do you perceive a single one of them? Or hear even the faintest sound — rikz? The quiet of obliteration." },
          color: "#4ecdc4",
        },
        {
          left: { label: "It Is Easy — rabbuka", ayahs: "9", desc: "Zakariyya asks how. The answer: it is easy for Me. Masculine address — rabbuka." },
          right: { label: "It Is Easy — rabbuki", ayahs: "21", desc: "Maryam asks how. The identical answer with one change: feminine address — rabbuki." },
          color: "#9b7fd4",
        },
        {
          left: { label: "Peace Received", ayahs: "15", desc: "Yahya's peace — spoken about him by God, in the third person: wa salamun 'alayhi." },
          right: { label: "Peace Claimed", ayahs: "33", desc: "Isa's peace — spoken by him from the cradle, in the first person: wa-l-salamu 'alayya." },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Prostration", ayahs: "58",
        desc: "When the verses of the Most Merciful were recited to them, they fell in prostration and in tears.",
        note: "The hinge of the surah. Everything before it builds the prophetic record. Everything after asks: what did you do with that record?",
      },
    },
    deductiveFunnel: {
      title: "Seven Uses of Rahma",
      subtitle: "The word mercy and its root thread through the surah like a pulse",
      layers: [
        { depth: 1, label: "The Opening", ayah: "2", arabic: "ذِكْرُ رَحْمَتِ رَبِّكَ", desc: "The surah's first substantive word after the letters: dhikru rahmati rabbika — a mention of the mercy of your Lord. Mercy is the frame before anything begins.", color: "#4ecdc4" },
        { depth: 2, label: "Yahya's Gift", ayah: "13", arabic: "وَحَنَانًا مِّن لَّدُنَّا", desc: "Hanan — tenderness, a pang of love — given from Us. A word that appears exactly once in the entire Quran, placed here and nowhere else.", color: "#9b7fd4" },
        { depth: 3, label: "Isa as Mercy", ayah: "21", arabic: "وَرَحْمَةً مِّنَّا", desc: "The child himself is described as a mercy from Us — not merely the recipient of mercy but its embodiment for humanity.", color: "#e07a8a" },
        { depth: 4, label: "Ibrahim's Gift", ayah: "50", arabic: "وَوَهَبْنَا لَهُم مِّن رَّحْمَتِنَا", desc: "We gave them of Our mercy — Ibrahim, Ishaq, Yaqub. Mercy extends through the prophetic line as inheritance.", color: "#C9A84C" },
        { depth: 5, label: "Harun as Mercy", ayah: "53", arabic: "مِن رَّحْمَتِنَا أَخَاهُ هَارُونَ", desc: "We gave him, out of Our mercy, his brother Harun. A person given as mercy — companionship itself as divine gift.", color: "#f28585" },
        { depth: 6, label: "The Prostration", ayah: "58", arabic: "آيَاتُ الرَّحْمَٰنِ", desc: "When the verses of al-Rahman were recited, they fell in prostration. The divine name itself — the Most Merciful — saturates the surah's most pivotal verse.", color: "#7ec8e3" },
        { depth: 7, label: "Love Placed", ayah: "96", arabic: "سَيَجْعَلُ لَهُمُ الرَّحْمَٰنُ وُدًّا", desc: "The Most Merciful will place love for them — sa-yaj'alu. Actively. Deliberately. Love as a gift set down by God, not earned by the servant.", color: "#4ecdc4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah trusts the portrait more than the prescription — every absence is a choice",
      absences: [
        { item: "No legal commands", note: "No ethical imperatives, no 'O you who believe,' no instructions about fasting, charity, or prayer. The moral weight is carried entirely by the stories and the contrast between the prophets and those who came after them." },
        { item: "No use of the word Masih", note: "The most extensive account of Isa outside Al Imran — and the surah never once calls him Christ or Messiah. The choice is deliberate: to show Isa as servant, prophet, child, son, before any title enters the room." },
        { item: "No answer to Ibrahim's prayer", note: "Ibrahim promises to ask forgiveness for his idolatrous father. The surah records no response. The love persists even when the request cannot be fulfilled — and in the silence, something about the nature of loving someone who will not turn around becomes visible." },
        { item: "No direct polemic", note: "The correction of the claim about Isa is embedded in the story, not mounted on top of it. Twelve ayahs of portrait before the theological point arrives. The sequencing is the surah's rhetorical genius." },
        { item: "No rikz — only once in the Quran", note: "The final word — rikz, the faintest possible sound — appears nowhere else in all 114 surahs. The surah gave this word to its ending alone, sealing itself with the silence of erased civilizations." },
      ],
    },
  },

  contentNodes: [
    { concept: "The hanan hapax — tenderness used once in the Quran", type: "surah-specific", articleSlug: "hanan-hapax-maryam-13" },
    { concept: "Rabbuka to rabbuki — the mirror formula", type: "surah-specific", articleSlug: "rabbuka-rabbuki-mirror-19" },
    { concept: "Maryam-Kahf-TaHa triptych — survival, mercy, commission", type: "cross-surah", articleSlug: "kahf-maryam-taha-triptych" },
    { concept: "Nasyan mansiyya — the doubled erasure Maryam wished for", type: "surah-specific", articleSlug: "nasyan-mansiyya-19-23" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "rooms", label: "Rooms" },
  { id: "mirror", label: "Mirror" },
  { id: "mercy", label: "Mercy" },
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
              marginLeft: `${layer.depth * 4}px`,
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
        Opening mercy → unique tenderness → embodied mercy → inherited mercy → companionship as mercy → prostration → love placed
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
            Surah {d.number} · {d.period} · Juz {d.juz}
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
          {activeTab === "rooms" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "mercy" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
