"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AZ-ZUKHRUF — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/az-zukhruf
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Az-Zukhruf",
  arabicName: "الزُّخْرُف",
  meaning: "The Gold Ornaments",
  number: 43,
  ayahCount: 89,
  period: "Makki",
  juz: 25,
  movements: 4,
  thesis:
    "The Quran's most sustained dismantling of the logic that equates wealth with worth — a surah that names gold as surface ornamentation and then shows, through Ibrahim, Musa, and ʿĪsā, what it looks like to see through it.",
  reflectionUrl: "/surahs/az-zukhruf",
  readTime: "20 min read",

  heartVerse: {
    arabic: "وَلَوْلَا أَن يَكُونَ النَّاسُ أُمَّةً وَاحِدَةً لَّجَعَلْنَا لِمَن يَكْفُرُ بِالرَّحْمَـٰنِ لِبُيُوتِهِمْ سُقُفًا مِّن فِضَّةٍ وَمَعَارِجَ عَلَيْهَا يَظْهَرُونَ",
    ayahRef: "43:33",
    translation: "And were it not that all people would become one community in disbelief, We would have made for those who disbelieve in the Most Merciful — for their houses — roofs of silver, and staircases upon which to ascend.",
    why: "The theological heart of the surah: Allah would freely distribute every material luxury to the disbelievers if doing so would not corrupt all of humanity. The only reason He withholds it is to protect people — not because it has value. Wealth is zukhruf: surface ornamentation that reveals nothing about the one beneath it.",
  },

  audio: { surahNumber: 43, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "حمٓ", translation: "Ha, Mim." },
    { ayah: 2, arabic: "وَالْكِتَابِ الْمُبِينِ", translation: "By the clear Book." },
    { ayah: 3, arabic: "إِنَّا جَعَلْنَاهُ قُرْآنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ", translation: "Indeed, We have made it an Arabic Quran so that you might use reason." },
    { ayah: 4, arabic: "وَإِنَّهُ فِي أُمِّ الْكِتَابِ لَدَيْنَا لَعَلِيٌّ حَكِيمٌ", translation: "And indeed it is, in the Mother of the Book with Us, exalted and full of wisdom." },
    { ayah: 5, arabic: "أَفَنَضْرِبُ عَنكُمُ الذِّكْرَ صَفْحًا أَن كُنتُمْ قَوْمًا مُّسْرِفِينَ", translation: "Then should We turn away the reminder from you because you are a transgressing people?" },
    { ayah: 6, arabic: "وَكَمْ أَرْسَلْنَا مِن نَّبِيٍّ فِي الْأَوَّلِينَ", translation: "And how many a prophet did We send among the former peoples." },
    { ayah: 7, arabic: "وَمَا يَأْتِيهِم مِّن نَّبِيٍّ إِلَّا كَانُوا بِهِ يَسْتَهْزِئُونَ", translation: "And no prophet came to them except that they used to ridicule him." },
    { ayah: 8, arabic: "فَأَهْلَكْنَا أَشَدَّ مِنْهُم بَطْشًا وَمَضَىٰ مَثَلُ الْأَوَّلِينَ", translation: "And We destroyed those greater than them in power, and the example of the ancients has passed." },
    { ayah: 9, arabic: "وَلَئِن سَأَلْتَهُم مَّنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ لَيَقُولُنَّ خَلَقَهُنَّ الْعَزِيزُ الْعَلِيمُ", translation: "And if you asked them who created the heavens and the earth, they would surely say, 'The Mighty, the Knowing created them.'" },
    { ayah: 10, arabic: "الَّذِي جَعَلَ لَكُمُ الْأَرْضَ مَهْدًا وَجَعَلَ لَكُمْ فِيهَا سُبُلًا لَّعَلَّكُمْ تَهْتَدُونَ", translation: "The One who made for you the earth a cradle and made for you pathways therein, so that you might be guided." },
    { ayah: 11, arabic: "وَالَّذِي نَزَّلَ مِنَ السَّمَاءِ مَاءً بِقَدَرٍ فَأَنشَرْنَا بِهِ بَلْدَةً مَّيْتًا ۚ كَذَٰلِكَ تُخْرَجُونَ", translation: "And the One who sent down water from the sky in measure — then We revived with it a dead land. Thus will you be brought forth." },
    { ayah: 12, arabic: "وَالَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا وَجَعَلَ لَكُم مِّنَ الْفُلْكِ وَالْأَنْعَامِ مَا تَرْكَبُونَ", translation: "And the One who created all the pairs and made for you of ships and animals those which you ride." },
    { ayah: 13, arabic: "لِتَسْتَوُوا عَلَىٰ ظُهُورِهِ ثُمَّ تَذْكُرُوا نِعْمَةَ رَبِّكُمْ إِذَا اسْتَوَيْتُمْ عَلَيْهِ وَتَقُولُوا سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَـٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ", translation: "That you may settle upon their backs and then remember the favor of your Lord when you have settled upon them and say, 'Glory to the One who has subjected this to us, and we could not have done it ourselves.'" },
    { ayah: 14, arabic: "وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ", translation: "And indeed we, to our Lord, will surely return." },
    { ayah: 15, arabic: "وَجَعَلُوا لَهُ مِنْ عِبَادِهِ جُزْءًا ۚ إِنَّ الْإِنسَانَ لَكَفُورٌ مُّبِينٌ", translation: "Yet they have assigned to Him a portion of His own servants. Indeed, man is clearly ungrateful." },
    { ayah: 16, arabic: "أَمِ اتَّخَذَ مِمَّا يَخْلُقُ بَنَاتٍ وَأَصْفَاكُم بِالْبَنِينَ", translation: "Or has He taken from what He creates daughters and chosen for you sons?" },
    { ayah: 17, arabic: "وَإِذَا بُشِّرَ أَحَدُهُم بِمَا ضَرَبَ لِلرَّحْمَـٰنِ مَثَلًا ظَلَّ وَجْهُهُ مُسْوَدًّا وَهُوَ كَظِيمٌ", translation: "And when one of them is given news of that which he attributes to the Most Merciful, his face darkens and he is filled with suppressed grief." },
    { ayah: 18, arabic: "أَوَمَن يُنَشَّأُ فِي الْحِلْيَةِ وَهُوَ فِي الْخِصَامِ غَيْرُ مُبِينٍ", translation: "Is one brought up in ornaments and unable to express themselves clearly in dispute?" },
    { ayah: 19, arabic: "وَجَعَلُوا الْمَلَائِكَةَ الَّذِينَ هُمْ عِبَادُ الرَّحْمَـٰنِ إِنَاثًا ۚ أَشَهِدُوا خَلْقَهُمْ ۚ سَتُكْتَبُ شَهَادَتُهُمْ وَيُسْأَلُونَ", translation: "And they have made the angels, who are servants of the Most Merciful, female. Did they witness their creation? Their testimony will be recorded, and they will be questioned." },
    { ayah: 20, arabic: "وَقَالُوا لَوْ شَاءَ الرَّحْمَـٰنُ مَا عَبَدْنَاهُم ۗ مَّا لَهُم بِذَٰلِكَ مِنْ عِلْمٍ ۖ إِنْ هُمْ إِلَّا يَخْرُصُونَ", translation: "And they said, 'If the Most Merciful had willed, we would not have worshipped them.' They have no knowledge of that. They are only guessing." },
    { ayah: 21, arabic: "أَمْ آتَيْنَاهُمْ كِتَابًا مِّن قَبْلِهِ فَهُم بِهِ مُسْتَمْسِكُونَ", translation: "Or have We given them a book before this to which they are holding?" },
    { ayah: 22, arabic: "بَلْ قَالُوا إِنَّا وَجَدْنَا آبَاءَنَا عَلَىٰ أُمَّةٍ وَإِنَّا عَلَىٰ آثَارِهِم مُّهْتَدُونَ", translation: "Rather, they said, 'We found our fathers upon a way, and we are guided by their footsteps.'" },
    { ayah: 23, arabic: "وَكَذَٰلِكَ مَا أَرْسَلْنَا مِن قَبْلِكَ فِي قَرْيَةٍ مِّن نَّذِيرٍ إِلَّا قَالَ مُتْرَفُوهَا إِنَّا وَجَدْنَا آبَاءَنَا عَلَىٰ أُمَّةٍ وَإِنَّا عَلَىٰ آثَارِهِم مُّقْتَدُونَ", translation: "And similarly, We did not send before you any warner to a city except that its affluent ones said, 'We found our fathers upon a way, and we are following in their footsteps.'" },
    { ayah: 24, arabic: "قَالَ أَوَلَوْ جِئْتُكُم بِأَهْدَىٰ مِمَّا وَجَدتُّمْ عَلَيْهِ آبَاءَكُمْ ۖ قَالُوا إِنَّا بِمَا أُرْسِلْتُم بِهِ كَافِرُونَ", translation: "He said, 'Even if I brought you better guidance than what you found your fathers upon?' They said, 'Indeed, we disbelieve in what you were sent with.'" },
    { ayah: 25, arabic: "فَانتَقَمْنَا مِنْهُمْ ۖ فَانظُرْ كَيْفَ كَانَ عَاقِبَةُ الْمُكَذِّبِينَ", translation: "So We took retribution from them. Then see what was the end of the deniers." },
    { ayah: 26, arabic: "وَإِذْ قَالَ إِبْرَاهِيمُ لِأَبِيهِ وَقَوْمِهِ إِنَّنِي بَرَاءٌ مِّمَّا تَعْبُدُونَ", translation: "And when Ibrahim said to his father and his people, 'Indeed, I am free of what you worship —'" },
    { ayah: 27, arabic: "إِلَّا الَّذِي فَطَرَنِي فَإِنَّهُ سَيَهْدِينِ", translation: "'except the One who originated me, for He will guide me.'" },
    { ayah: 28, arabic: "وَجَعَلَهَا كَلِمَةً بَاقِيَةً فِي عَقِبِهِ لَعَلَّهُمْ يَرْجِعُونَ", translation: "And he made it an enduring word among his descendants, so that they might return." },
    { ayah: 29, arabic: "بَلْ مَتَّعْتُ هَـٰؤُلَاءِ وَآبَاءَهُمْ حَتَّىٰ جَاءَهُمُ الْحَقُّ وَرَسُولٌ مُّبِينٌ", translation: "But I gave enjoyment to these people and their fathers until there came to them the truth and a clear messenger." },
    { ayah: 30, arabic: "وَلَمَّا جَاءَهُمُ الْحَقُّ قَالُوا هَـٰذَا سِحْرٌ وَإِنَّا بِهِ كَافِرُونَ", translation: "And when the truth came to them, they said, 'This is magic, and we disbelieve in it.'" },
    { ayah: 31, arabic: "وَقَالُوا لَوْلَا نُزِّلَ هَـٰذَا الْقُرْآنُ عَلَىٰ رَجُلٍ مِّنَ الْقَرْيَتَيْنِ عَظِيمٍ", translation: "And they said, 'Why was this Quran not sent down to a great man from one of the two cities?'" },
    { ayah: 32, arabic: "أَهُمْ يَقْسِمُونَ رَحْمَتَ رَبِّكَ ۚ نَحْنُ قَسَمْنَا بَيْنَهُم مَّعِيشَتَهُمْ فِي الْحَيَاةِ الدُّنْيَا وَرَفَعْنَا بَعْضَهُمْ فَوْقَ بَعْضٍ دَرَجَاتٍ لِّيَتَّخِذَ بَعْضُهُم بَعْضًا سُخْرِيًّا ۗ وَرَحْمَتُ رَبِّكَ خَيْرٌ مِّمَّا يَجْمَعُونَ", translation: "Do they distribute the mercy of your Lord? It is We who have distributed among them their livelihood in worldly life and raised some above others in degrees so that some may take others in service. And the mercy of your Lord is better than what they accumulate." },
    { ayah: 33, arabic: "وَلَوْلَا أَن يَكُونَ النَّاسُ أُمَّةً وَاحِدَةً لَّجَعَلْنَا لِمَن يَكْفُرُ بِالرَّحْمَـٰنِ لِبُيُوتِهِمْ سُقُفًا مِّن فِضَّةٍ وَمَعَارِجَ عَلَيْهَا يَظْهَرُونَ", translation: "And were it not that all people would become one community, We would have made for those who disbelieve in the Most Merciful — for their houses — roofs of silver, and staircases upon which to ascend," },
    { ayah: 34, arabic: "وَلِبُيُوتِهِمْ أَبْوَابًا وَسُرُرًا عَلَيْهَا يَتَّكِئُونَ", translation: "and for their houses doors, and couches upon which to recline," },
    { ayah: 35, arabic: "وَزُخْرُفًا ۚ وَإِن كُلُّ ذَٰلِكَ لَمَّا مَتَاعُ الْحَيَاةِ الدُّنْيَا ۚ وَالْآخِرَةُ عِندَ رَبِّكَ لِلْمُتَّقِينَ", translation: "and gold ornament. But all of that is only the enjoyment of the worldly life. And the Hereafter with your Lord is for the righteous." },
    { ayah: 36, arabic: "وَمَن يَعْشُ عَن ذِكْرِ الرَّحْمَـٰنِ نُقَيِّضْ لَهُ شَيْطَانًا فَهُوَ لَهُ قَرِينٌ", translation: "And whoever turns blind from the remembrance of the Most Merciful, We assign to him a devil who becomes his constant companion." },
    { ayah: 37, arabic: "وَإِنَّهُمْ لَيَصُدُّونَهُمْ عَنِ السَّبِيلِ وَيَحْسَبُونَ أَنَّهُم مُّهْتَدُونَ", translation: "And indeed, they avert them from the way while they think they are guided." },
    { ayah: 38, arabic: "حَتَّىٰ إِذَا جَاءَنَا قَالَ يَا لَيْتَ بَيْنِي وَبَيْنَكَ بُعْدَ الْمَشْرِقَيْنِ فَبِئْسَ الْقَرِينُ", translation: "Until, when he comes to Us, he says, 'Oh, I wish between me and you was the distance of the two easts — how wretched a companion!'" },
    { ayah: 39, arabic: "وَلَن يَنفَعَكُمُ الْيَوْمَ إِذ ظَّلَمْتُمْ أَنَّكُمْ فِي الْعَذَابِ مُشْتَرِكُونَ", translation: "And it will never benefit you that Day, since you wronged, that you are sharing in the punishment." },
    { ayah: 40, arabic: "أَفَأَنتَ تُسْمِعُ الصُّمَّ أَوْ تَهْدِي الْعُمْيَ وَمَن كَانَ فِي ضَلَالٍ مُّبِينٍ", translation: "Then can you make the deaf hear, or guide the blind and one who is in clear error?" },
    { ayah: 41, arabic: "فَإِمَّا نَذْهَبَنَّ بِكَ فَإِنَّا مِنْهُم مُّنتَقِمُونَ", translation: "And if We take you away, then indeed We will take retribution upon them." },
    { ayah: 42, arabic: "أَوْ نُرِيَنَّكَ الَّذِي وَعَدْنَاهُمْ فَإِنَّا عَلَيْهِم مُّقْتَدِرُونَ", translation: "Or We will show you what We have promised them, for indeed We are over them competent." },
    { ayah: 43, arabic: "فَاسْتَمْسِكْ بِالَّذِي أُوحِيَ إِلَيْكَ ۖ إِنَّكَ عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ", translation: "So hold firmly to that which has been revealed to you. Indeed, you are on a straight path." },
    { ayah: 44, arabic: "وَإِنَّهُ لَذِكْرٌ لَّكَ وَلِقَوْمِكَ ۖ وَسَوْفَ تُسْأَلُونَ", translation: "And indeed, it is a remembrance for you and your people, and you will be questioned." },
    { ayah: 45, arabic: "وَاسْأَلْ مَنْ أَرْسَلْنَا مِن قَبْلِكَ مِن رُّسُلِنَا أَجَعَلْنَا مِن دُونِ الرَّحْمَـٰنِ آلِهَةً يُعْبَدُونَ", translation: "And ask those We sent before you of Our messengers: have We ever made besides the Most Merciful any gods to be worshipped?" },
    { ayah: 46, arabic: "وَلَقَدْ أَرْسَلْنَا مُوسَىٰ بِآيَاتِنَا إِلَىٰ فِرْعَوْنَ وَمَلَئِهِ فَقَالَ إِنِّي رَسُولُ رَبِّ الْعَالَمِينَ", translation: "And We certainly sent Musa with Our signs to Pharaoh and his chiefs, and he said, 'Indeed, I am the messenger of the Lord of all worlds.'" },
    { ayah: 47, arabic: "فَلَمَّا جَاءَهُم بِآيَاتِنَا إِذَا هُم مِّنْهَا يَضْحَكُونَ", translation: "But when he brought them Our signs, at once they laughed at them." },
    { ayah: 48, arabic: "وَمَا نُرِيهِم مِّنْ آيَةٍ إِلَّا هِيَ أَكْبَرُ مِنْ أُخْتِهَا ۖ وَأَخَذْنَاهُم بِالْعَذَابِ لَعَلَّهُمْ يَرْجِعُونَ", translation: "And We showed them not a sign except that it was greater than its sister, and We seized them with affliction so that they might return." },
    { ayah: 49, arabic: "وَقَالُوا يَا أَيُّهَ السَّاحِرُ ادْعُ لَنَا رَبَّكَ بِمَا عَهِدَ عِندَكَ إِنَّنَا لَمُهْتَدُونَ", translation: "And they said, 'O magician, invoke for us your Lord by what He has promised you. Indeed, we will be guided.'" },
    { ayah: 50, arabic: "فَلَمَّا كَشَفْنَا عَنْهُمُ الْعَذَابَ إِذَا هُمْ يَنكُثُونَ", translation: "But when We removed the affliction from them, at once they broke their word." },
    { ayah: 51, arabic: "وَنَادَىٰ فِرْعَوْنُ فِي قَوْمِهِ قَالَ يَا قَوْمِ أَلَيْسَ لِي مُلْكُ مِصْرَ وَهَـٰذِهِ الْأَنْهَارُ تَجْرِي مِن تَحْتِي ۖ أَفَلَا تُبْصِرُونَ", translation: "And Pharaoh called out among his people, saying, 'O my people, do I not possess the kingdom of Egypt, and these rivers flowing beneath me? Do you not see?'" },
    { ayah: 52, arabic: "أَمْ أَنَا خَيْرٌ مِّنْ هَـٰذَا الَّذِي هُوَ مَهِينٌ وَلَا يَكَادُ يُبِينُ", translation: "Am I not better than this one who is insignificant and can barely express himself?" },
    { ayah: 53, arabic: "فَلَوْلَا أُلْقِيَ عَلَيْهِ أَسْوِرَةٌ مِّن ذَهَبٍ أَوْ جَاءَ مَعَهُ الْمَلَائِكَةُ مُقْتَرِنِينَ", translation: "Then why have bracelets of gold not been cast upon him, or come with him angels accompanying?" },
    { ayah: 54, arabic: "فَاسْتَخَفَّ قَوْمَهُ فَأَطَاعُوهُ ۚ إِنَّهُمْ كَانُوا قَوْمًا فَاسِقِينَ", translation: "So he bluffed his people, and they obeyed him. Indeed, they were a defiantly disobedient people." },
    { ayah: 55, arabic: "فَلَمَّا آسَفُونَا انتَقَمْنَا مِنْهُمْ فَأَغْرَقْنَاهُمْ أَجْمَعِينَ", translation: "So when they angered Us, We took retribution from them and drowned them all." },
    { ayah: 56, arabic: "فَجَعَلْنَاهُمْ سَلَفًا وَمَثَلًا لِّلْآخِرِينَ", translation: "And We made them a precedent and an example for later peoples." },
    { ayah: 57, arabic: "وَلَمَّا ضُرِبَ ابْنُ مَرْيَمَ مَثَلًا إِذَا قَوْمُكَ مِنْهُ يَصِدُّونَ", translation: "And when the son of Maryam was presented as an example, your people turned away from it." },
    { ayah: 58, arabic: "وَقَالُوا أَآلِهَتُنَا خَيْرٌ أَمْ هُوَ ۚ مَا ضَرَبُوهُ لَكَ إِلَّا جَدَلًا ۚ بَلْ هُمْ قَوْمٌ خَصِمُونَ", translation: "And they said, 'Are our gods better, or is he?' They did not present the comparison except for argument. Rather, they are a quarrelsome people." },
    { ayah: 59, arabic: "إِنْ هُوَ إِلَّا عَبْدٌ أَنْعَمْنَا عَلَيْهِ وَجَعَلْنَاهُ مَثَلًا لِّبَنِي إِسْرَائِيلَ", translation: "He was only a servant whom We blessed and made an example for the Children of Israel." },
    { ayah: 60, arabic: "وَلَوْ نَشَاءُ لَجَعَلْنَا مِنكُم مَّلَائِكَةً فِي الْأَرْضِ يَخْلُفُونَ", translation: "And if We willed, We could have made from among you angels succeeding one another on the earth." },
    { ayah: 61, arabic: "وَإِنَّهُ لَعِلْمٌ لِّلسَّاعَةِ فَلَا تَمْتَرُنَّ بِهَا وَاتَّبِعُونِ ۚ هَـٰذَا صِرَاطٌ مُّسْتَقِيمٌ", translation: "And indeed, he is knowledge of the Hour. So do not doubt it and follow Me. This is a straight path." },
    { ayah: 62, arabic: "وَلَا يَصُدَّنَّكُمُ الشَّيْطَانُ ۖ إِنَّهُ لَكُمْ عَدُوٌّ مُّبِينٌ", translation: "And let not Satan avert you. Indeed, he is to you a clear enemy." },
    { ayah: 63, arabic: "وَلَمَّا جَاءَ عِيسَىٰ بِالْبَيِّنَاتِ قَالَ قَدْ جِئْتُكُم بِالْحِكْمَةِ وَلِأُبَيِّنَ لَكُم بَعْضَ الَّذِي تَخْتَلِفُونَ فِيهِ ۖ فَاتَّقُوا اللَّهَ وَأَطِيعُونِ", translation: "And when ʿĪsā came with clear proofs, he said, 'I have come to you with wisdom and to make clear to you some of that over which you differ. So fear Allah and obey me.'" },
    { ayah: 64, arabic: "إِنَّ اللَّهَ هُوَ رَبِّي وَرَبُّكُمْ فَاعْبُدُوهُ ۚ هَـٰذَا صِرَاطٌ مُّسْتَقِيمٌ", translation: "Indeed, Allah — He is my Lord and your Lord, so worship Him. This is a straight path." },
    { ayah: 65, arabic: "فَاخْتَلَفَ الْأَحْزَابُ مِن بَيْنِهِمْ ۖ فَوَيْلٌ لِّلَّذِينَ ظَلَمُوا مِنْ عَذَابِ يَوْمٍ أَلِيمٍ", translation: "But the factions among them differed. So woe to those who wronged from the punishment of a painful Day." },
    { ayah: 66, arabic: "هَلْ يَنظُرُونَ إِلَّا السَّاعَةَ أَن تَأْتِيَهُم بَغْتَةً وَهُمْ لَا يَشْعُرُونَ", translation: "Are they waiting except for the Hour, that it should come upon them suddenly while they do not perceive?" },
    { ayah: 67, arabic: "الْأَخِلَّاءُ يَوْمَئِذٍ بَعْضُهُمْ لِبَعْضٍ عَدُوٌّ إِلَّا الْمُتَّقِينَ", translation: "Close friends on that Day will be enemies to one another — except the God-conscious." },
    { ayah: 68, arabic: "يَا عِبَادِ لَا خَوْفٌ عَلَيْكُمُ الْيَوْمَ وَلَا أَنتُمْ تَحْزَنُونَ", translation: "O My servants, no fear will there be concerning you today, nor will you grieve —" },
    { ayah: 69, arabic: "الَّذِينَ آمَنُوا بِآيَاتِنَا وَكَانُوا مُسْلِمِينَ", translation: "those who believed in Our signs and were submitters." },
    { ayah: 70, arabic: "ادْخُلُوا الْجَنَّةَ أَنتُمْ وَأَزْوَاجُكُمْ تُحْبَرُونَ", translation: "Enter paradise, you and your spouses, made joyful." },
    { ayah: 71, arabic: "يُطَافُ عَلَيْهِم بِصِحَافٍ مِّن ذَهَبٍ وَأَكْوَابٍ ۖ وَفِيهَا مَا تَشْتَهِيهِ الْأَنفُسُ وَتَلَذُّ الْأَعْيُنُ ۖ وَأَنتُمْ فِيهَا خَالِدُونَ", translation: "Circulated among them will be plates of gold and cups, and therein is whatever the souls desire and the eyes delight in, and you will abide therein forever." },
    { ayah: 72, arabic: "وَتِلْكَ الْجَنَّةُ الَّتِي أُورِثْتُمُوهَا بِمَا كُنتُمْ تَعْمَلُونَ", translation: "And that is paradise which you are made to inherit for what you used to do." },
    { ayah: 73, arabic: "لَكُمْ فِيهَا فَاكِهَةٌ كَثِيرَةٌ مِّنْهَا تَأْكُلُونَ", translation: "For you therein is abundant fruit from which you will eat." },
    { ayah: 74, arabic: "إِنَّ الْمُجْرِمِينَ فِي عَذَابِ جَهَنَّمَ خَالِدُونَ", translation: "Indeed, the criminals will abide in the punishment of Hell forever." },
    { ayah: 75, arabic: "لَا يُفَتَّرُ عَنْهُمْ وَهُمْ فِيهِ مُبْلِسُونَ", translation: "It will not be lightened for them, and they therein will be in despair." },
    { ayah: 76, arabic: "وَمَا ظَلَمْنَاهُمْ وَلَـٰكِن كَانُوا هُمُ الظَّالِمِينَ", translation: "And We did not wrong them, but it was they who were the wrongdoers." },
    { ayah: 77, arabic: "وَنَادَوْا يَا مَالِكُ لِيَقْضِ عَلَيْنَا رَبُّكَ ۖ قَالَ إِنَّكُم مَّاكِثُونَ", translation: "And they will call out, 'O Malik, let your Lord put an end to us.' He will say, 'You will remain.'" },
    { ayah: 78, arabic: "لَقَدْ جِئْنَاكُم بِالْحَقِّ وَلَـٰكِنَّ أَكْثَرَكُمْ لِلْحَقِّ كَارِهُونَ", translation: "We have brought you the truth, but most of you are averse to the truth." },
    { ayah: 79, arabic: "أَمْ أَبْرَمُوا أَمْرًا فَإِنَّا مُبْرِمُونَ", translation: "Or have they devised a plan? Then We too are devising." },
    { ayah: 80, arabic: "أَمْ يَحْسَبُونَ أَنَّا لَا نَسْمَعُ سِرَّهُمْ وَنَجْوَاهُم ۚ بَلَىٰ وَرُسُلُنَا لَدَيْهِمْ يَكْتُبُونَ", translation: "Or do they think that We do not hear their secrets and their private conversations? Yes — and Our messengers are with them, recording." },
    { ayah: 81, arabic: "قُلْ إِن كَانَ لِلرَّحْمَـٰنِ وَلَدٌ فَأَنَا أَوَّلُ الْعَابِدِينَ", translation: "Say, 'If the Most Merciful had a son, then I would be the first of his worshippers.'" },
    { ayah: 82, arabic: "سُبْحَانَ رَبِّ السَّمَاوَاتِ وَالْأَرْضِ رَبِّ الْعَرْشِ عَمَّا يَصِفُونَ", translation: "Glory to the Lord of the heavens and the earth, Lord of the Throne, above what they describe." },
    { ayah: 83, arabic: "فَذَرْهُمْ يَخُوضُوا وَيَلْعَبُوا حَتَّىٰ يُلَاقُوا يَوْمَهُمُ الَّذِي يُوعَدُونَ", translation: "So leave them to converse vainly and amuse themselves until they meet their Day which they are promised." },
    { ayah: 84, arabic: "وَهُوَ الَّذِي فِي السَّمَاءِ إِلَـٰهٌ وَفِي الْأَرْضِ إِلَـٰهٌ ۚ وَهُوَ الْحَكِيمُ الْعَلِيمُ", translation: "And He is the one who is God in the heaven and God on the earth. And He is the Wise, the Knowing." },
    { ayah: 85, arabic: "وَتَبَارَكَ الَّذِي لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا وَعِندَهُ عِلْمُ السَّاعَةِ وَإِلَيْهِ تُرْجَعُونَ", translation: "And blessed is the One to whom belongs the dominion of the heavens and the earth and whatever is between them, and with Him is knowledge of the Hour, and to Him you will be returned." },
    { ayah: 86, arabic: "وَلَا يَمْلِكُ الَّذِينَ يَدْعُونَ مِن دُونِهِ الشَّفَاعَةَ إِلَّا مَن شَهِدَ بِالْحَقِّ وَهُمْ يَعْلَمُونَ", translation: "And those they invoke besides Him do not possess intercession — except those who testify to the truth while they know." },
    { ayah: 87, arabic: "وَلَئِن سَأَلْتَهُم مَّنْ خَلَقَهُمْ لَيَقُولُنَّ اللَّهُ ۖ فَأَنَّىٰ يُؤْفَكُونَ", translation: "And if you asked them who created them, they would surely say, 'Allah.' So how are they deluded?" },
    { ayah: 88, arabic: "وَقِيلِهِ يَا رَبِّ إِنَّ هَـٰؤُلَاءِ قَوْمٌ لَّا يُؤْمِنُونَ", translation: "And his saying, 'O my Lord, indeed these are a people who do not believe.'" },
    { ayah: 89, arabic: "فَاصْفَحْ عَنْهُمْ وَقُلْ سَلَامٌ ۚ فَسَوْفَ يَعْلَمُونَ", translation: "So turn away from them and say, 'Peace.' For they will come to know." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Cross-Examination",
      subtitle: "Four movements: heavenly book → inherited idols → wealth theology → prophetic witness",
      sections: [
        { ayahs: "1–14", title: "The Heavenly Book & Earthly Signs", color: "#4ecdc4", desc: "The surah opens with an oath by the Clear Book, establishes the Quran's origin in the Umm al-Kitab, then moves through creation — earth as cradle, rain as revival, paired transport — building the case that the Creator's generosity is everywhere visible." },
        { ayahs: "15–25", title: "The Indictment of Inherited Religion", color: "#e07a8a", desc: "The Quraysh assign daughters to Allah while celebrating sons for themselves, claim the angels are female without evidence, and declare: 'We found our fathers upon a way.' Every powerful class in history has said the same sentence. The surah exposes taqlid — blind inheritance — as the enemy of thought." },
        { ayahs: "26–65", title: "Three Prophets, One Argument", color: "#C9A84C", isPivot: true, desc: "Ibrahim breaks with his father's idolatry (personal scale). Musa confronts Pharaoh's rivers-as-theology (political scale). ʿĪsā is made a sign his followers turned into a deity (theological scale). At the center: the gold-ornament passage — Allah would give silver roofs and gold staircases to the disbelievers if it would not corrupt humanity. Wealth is zukhruf — mere surface." },
        { ayahs: "66–89", title: "The Hour & the Parting Word", color: "#9b7fd4", desc: "Friends become enemies except the God-conscious. Gold reappears — but now as plates in Paradise for those who saw through the surface. The condemned cry to Malik: let your Lord end us. He answers: you will remain. The surah closes: turn away from them and say salam. They will come to know." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's concentric structure places the gold-ornament argument at its gravitational center",
      pairs: [
        {
          left: { label: "The Clear Book", ayahs: "1–14", desc: "The Quran's heavenly origin, the signs in creation, the question of who made the heavens and earth" },
          right: { label: "The Closing Declaration", ayahs: "81–89", desc: "He is God in the heaven and God on the earth. Turn away and say peace — they will come to know" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Inherited Religion Exposed", ayahs: "15–25", desc: "Following fathers blindly, the affluent classes always say the same thing, retribution on the deniers" },
          right: { label: "The Day of Judgment", ayahs: "66–80", desc: "Friends become enemies, paradise for the believers, the condemned call to Malik for annihilation" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Ibrahim's Break", ayahs: "26–28", desc: "The formal dissociation from ancestral worship — an enduring word in his descendants" },
          right: { label: "ʿĪsā as Sign", ayahs: "57–65", desc: "A servant whom Allah blessed, made an example — not a deity. The same straight path Ibrahim declared" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Gold Argument & Pharaoh's Rivers", ayahs: "29–56",
        desc: "Allah would give disbelievers silver roofs and gold staircases — all of it mere surface. Pharaoh pointed to his rivers as proof of divinity. He drowned in them.",
        note: "The surah is named after the thing it is dismantling. The center of the ring is the center of the illusion.",
      },
    },
    deductiveFunnel: {
      title: "The Prophetic Triptych",
      subtitle: "Three prophets, three scales, one escalating argument about seeing through the surface",
      layers: [
        { depth: 1, label: "Ibrahim — Personal", ayah: "26–28", arabic: "إِنَّنِي بَرَاءٌ مِّمَّا تَعْبُدُونَ", desc: "The break is familial. A son refuses his father's idols in a culture where paternal authority was almost sacred. Ibrahim walks away with nothing but a declaration — and that declaration becomes an enduring inheritance. The most difficult thing to see through is what your family taught you.", color: "#4ecdc4" },
        { depth: 2, label: "Musa — Political", ayah: "46–56", arabic: "أَلَيْسَ لِي مُلْكُ مِصْرَ", desc: "The confrontation is imperial. Pharaoh argues from economics — do I not possess the kingdom of Egypt and these rivers flowing beneath me? Musa stands before the wealthiest man in the world with nothing but a message and a staff. Pharaoh's rivers become the instrument of his drowning.", color: "#e07a8a" },
        { depth: 3, label: "ʿĪsā — Theological", ayah: "57–64", arabic: "إِنْ هُوَ إِلَّا عَبْدٌ أَنْعَمْنَا عَلَيْهِ", desc: "The error is the most subtle. Not worshipping gold, not worshipping political power, but worshipping a human being whom Allah blessed — mistaking the gift for the Giver. ʿĪsā was a servant, a sign, an example. His followers elevated the sign into the Signifier.", color: "#9b7fd4" },
        { depth: 4, label: "The Pivot — Zukhruf", ayah: "33–35", arabic: "وَزُخْرُفًا", desc: "The gold-ornament passage sits at the center, connecting all three prophetic stories. Every form of idolatry the surah examines — ancestral, imperial, theological — is powered by the same engine: the confusion of visible splendor with invisible truth.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah is entirely diagnostic — what it deliberately excludes sharpens what it includes",
      absences: [
        { item: "No direct ethical commands", note: "No instructions on prayer, fasting, charity, or conduct. The surah is a mirror held up to a civilization, not a prescription. The remedy is implied by the prophetic stories: Ibrahim walked away, Musa confronted, ʿĪsā was made a sign." },
        { item: "No destroyed nations by name", note: "No ʿĀd, no Thamūd, no people of Lūṭ. Pharaoh's drowning is mentioned, but the emphasis is on what his arrogance was, not on the mechanics of destruction. The surah is less interested in consequences than in exposing the reasoning that leads to them." },
        { item: "No mention of salah or ritual", note: "For an 89-ayah surah, the absence of any ritual instruction is a design choice. The surah is entirely occupied with diagnosis: the worship of wealth and inherited tradition." },
        { item: "No address to the believers as a community", note: "The phrase 'O you who believe' does not appear. The surah speaks to the Quraysh, through the Quraysh, about the Quraysh — until the single, brief moment in ayah 68 where Allah addresses His servants in paradise." },
        { item: "No path offered to the deniers", note: "The surah does not say 'repent.' It says 'turn away from them and say peace.' The file has been closed. The verdict is that they will come to know — but the surah does not stay to watch them learn." },
      ],
    },
  },

  contentNodes: [
    { concept: "Zukhruf — gold as surface ornamentation", type: "surah-specific", articleSlug: "zukhruf-gold-surface-43" },
    { concept: "Pharaoh's rivers as wealth-theology", type: "surah-specific", articleSlug: "pharaoh-rivers-theology-43-51" },
    { concept: "The prophetic triptych: Ibrahim, Musa, ʿĪsā", type: "cross-surah", articleSlug: "prophetic-triptych-43" },
    { concept: "Taqlid — the creed of inherited tradition", type: "cross-surah", articleSlug: "taqlid-inherited-tradition" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "triptych", label: "Triptych" },
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
        Personal → political → theological → the surface they all share
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

        {/* -- Hero -- */}
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
              <div className="text-2xl font-bold text-gold-500 font-serif">3</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Prophets</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />

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
          {activeTab === "triptych" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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

        {/* -- Go Deeper -- */}
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
