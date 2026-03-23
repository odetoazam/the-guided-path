"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AZ-ZUMAR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/az-zumar
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Az-Zumar",
  arabicName: "الزُّمَر",
  meaning: "The Groups",
  number: 39,
  ayahCount: 75,
  period: "Makki",
  juz: "23–24",
  movements: 4,
  thesis:
    "A seventy-five-ayah argument that sincerity is the only worship that counts — and then, at its structural center, the widest door of mercy ever opened in the Quran, placed there so that the demand does not crush the one who hears it.",
  reflectionUrl: "/surahs/az-zumar",
  readTime: "20 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"amthal","english":"Parables"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
    ayahRef: "39:53",
    translation: "Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.",
    why: "The most hopeful verse in the Quran, placed at the structural center of the surah that demands the most. The address is 'My servants' — even after transgression, the relationship is not severed. The scope is total: jami'an, all sins, every last one. The surah holds the highest demand and the widest mercy in the same hand.",
  },

  audio: { surahNumber: 39, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْحَكِيمِ", translation: "The revelation of this Book is from Allah, the Almighty, the Wise." },
    { ayah: 2, arabic: "إِنَّا أَنزَلْنَا إِلَيْكَ الْكِتَابَ بِالْحَقِّ فَاعْبُدِ اللَّهَ مُخْلِصًا لَّهُ الدِّينَ", translation: "Indeed, We have sent down to you the Book in truth, so worship Allah, making the religion sincerely for Him." },
    { ayah: 3, arabic: "أَلَا لِلَّهِ الدِّينُ الْخَالِصُ", translation: "Is pure religion not for Allah alone?" },
    { ayah: 4, arabic: "لَّوْ أَرَادَ اللَّهُ أَن يَتَّخِذَ وَلَدًا لَّاصْطَفَىٰ مِمَّا يَخْلُقُ مَا يَشَاءُ ۚ سُبْحَانَهُ", translation: "If Allah had intended to take a son, He could have chosen from what He creates whatever He willed. Exalted is He." },
    { ayah: 5, arabic: "خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ ۖ يُكَوِّرُ اللَّيْلَ عَلَى النَّهَارِ وَيُكَوِّرُ النَّهَارَ عَلَى اللَّيْلِ", translation: "He created the heavens and the earth in truth. He wraps the night over the day and wraps the day over the night." },
    { ayah: 6, arabic: "خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ ثُمَّ جَعَلَ مِنْهَا زَوْجَهَا", translation: "He created you from a single soul, then made from it its mate." },
    { ayah: 7, arabic: "إِن تَكْفُرُوا فَإِنَّ اللَّهَ غَنِيٌّ عَنكُمْ", translation: "If you disbelieve, indeed Allah is free from need of you." },
    { ayah: 8, arabic: "وَإِذَا مَسَّ الْإِنسَانَ ضُرٌّ دَعَا رَبَّهُ مُنِيبًا إِلَيْهِ", translation: "And when adversity touches the human being, he calls upon his Lord, turning to Him." },
    { ayah: 9, arabic: "أَمَّنْ هُوَ قَانِتٌ آنَاءَ اللَّيْلِ سَاجِدًا وَقَائِمًا يَحْذَرُ الْآخِرَةَ وَيَرْجُو رَحْمَةَ رَبِّهِ", translation: "Is one who worships devoutly during the hours of the night, prostrating and standing, fearing the Hereafter and hoping for the mercy of his Lord [like one who does not]?" },
    { ayah: 10, arabic: "قُلْ يَا عِبَادِ الَّذِينَ آمَنُوا اتَّقُوا رَبَّكُمْ", translation: "Say: O My servants who believe, be mindful of your Lord." },
    { ayah: 11, arabic: "قُلْ إِنِّي أُمِرْتُ أَنْ أَعْبُدَ اللَّهَ مُخْلِصًا لَّهُ الدِّينَ", translation: "Say: Indeed, I have been commanded to worship Allah, making the religion sincerely for Him." },
    { ayah: 12, arabic: "وَأُمِرْتُ لِأَنْ أَكُونَ أَوَّلَ الْمُسْلِمِينَ", translation: "And I have been commanded to be the first of the Muslims." },
    { ayah: 13, arabic: "قُلْ إِنِّي أَخَافُ إِنْ عَصَيْتُ رَبِّي عَذَابَ يَوْمٍ عَظِيمٍ", translation: "Say: Indeed, I fear, if I should disobey my Lord, the punishment of a tremendous Day." },
    { ayah: 14, arabic: "قُلِ اللَّهَ أَعْبُدُ مُخْلِصًا لَّهُ دِينِي", translation: "Say: Allah I worship, making my religion sincerely for Him." },
    { ayah: 15, arabic: "فَاعْبُدُوا مَا شِئْتُم مِّن دُونِهِ", translation: "So worship what you will besides Him." },
    { ayah: 16, arabic: "قُلْ إِنَّ الْخَاسِرِينَ الَّذِينَ خَسِرُوا أَنفُسَهُمْ وَأَهْلِيهِمْ يَوْمَ الْقِيَامَةِ", translation: "Say: Indeed, the losers are those who will lose themselves and their families on the Day of Resurrection." },
    { ayah: 17, arabic: "لَهُم مِّن فَوْقِهِمْ ظُلَلٌ مِّنَ النَّارِ وَمِن تَحْتِهِمْ ظُلَلٌ", translation: "They will have canopies of fire above them and below them, canopies." },
    { ayah: 18, arabic: "الَّذِينَ يَسْتَمِعُونَ الْقَوْلَ فَيَتَّبِعُونَ أَحْسَنَهُ", translation: "Those who listen to speech and follow the best of it." },
    { ayah: 19, arabic: "أَفَمَنْ حَقَّ عَلَيْهِ كَلِمَةُ الْعَذَابِ أَفَأَنتَ تُنقِذُ مَن فِي النَّارِ", translation: "Is one upon whom the word of punishment has come due [to be rescued]? Can you save one who is in the Fire?" },
    { ayah: 20, arabic: "لَٰكِنِ الَّذِينَ اتَّقَوْا رَبَّهُمْ لَهُمْ غُرَفٌ مِّن فَوْقِهَا غُرَفٌ مَّبْنِيَّةٌ", translation: "But those who fear their Lord — for them are chambers, above them chambers built high." },
    { ayah: 21, arabic: "أَلَمْ تَرَ أَنَّ اللَّهَ أَنزَلَ مِنَ السَّمَاءِ مَاءً فَسَلَكَهُ يَنَابِيعَ فِي الْأَرْضِ", translation: "Do you not see that Allah sends down rain from the sky and guides it through springs in the earth?" },
    { ayah: 22, arabic: "أَفَمَن شَرَحَ اللَّهُ صَدْرَهُ لِلْإِسْلَامِ فَهُوَ عَلَىٰ نُورٍ مِّن رَّبِّهِ", translation: "So is one whose chest Allah has opened to Islam, and he is upon a light from his Lord [like one whose heart is hardened]?" },
    { ayah: 23, arabic: "اللَّهُ نَزَّلَ أَحْسَنَ الْحَدِيثِ كِتَابًا مُّتَشَابِهًا مَّثَانِيَ", translation: "Allah has sent down the best of speech: a Book, consistent, oft-repeated." },
    { ayah: 24, arabic: "أَفَمَن يَتَّقِي بِوَجْهِهِ سُوءَ الْعَذَابِ يَوْمَ الْقِيَامَةِ", translation: "Is one who shields with his face the worst of the punishment on the Day of Resurrection [like one secure]?" },
    { ayah: 25, arabic: "كَذَّبَ الَّذِينَ مِن قَبْلِهِمْ فَأَتَاهُمُ الْعَذَابُ مِنْ حَيْثُ لَا يَشْعُرُونَ", translation: "Those before them denied, and punishment came upon them from where they did not perceive." },
    { ayah: 26, arabic: "فَأَذَاقَهُمُ اللَّهُ الْخِزْيَ فِي الْحَيَاةِ الدُّنْيَا ۖ وَلَعَذَابُ الْآخِرَةِ أَكْبَرُ", translation: "So Allah made them taste disgrace in worldly life. But the punishment of the Hereafter is greater." },
    { ayah: 27, arabic: "وَلَقَدْ ضَرَبْنَا لِلنَّاسِ فِي هَٰذَا الْقُرْآنِ مِن كُلِّ مَثَلٍ لَّعَلَّهُمْ يَتَذَكَّرُونَ", translation: "And We have certainly presented in this Quran every kind of example, that they might remember." },
    { ayah: 28, arabic: "قُرْآنًا عَرَبِيًّا غَيْرَ ذِي عِوَجٍ لَّعَلَّهُمْ يَتَّقُونَ", translation: "An Arabic Quran, without any crookedness, that they might be mindful." },
    { ayah: 29, arabic: "ضَرَبَ اللَّهُ مَثَلًا رَّجُلًا فِيهِ شُرَكَاءُ مُتَشَاكِسُونَ وَرَجُلًا سَلَمًا لِّرَجُلٍ", translation: "Allah presents an example: a man owned by quarreling partners and a man belonging exclusively to one man — are they equal?" },
    { ayah: 30, arabic: "إِنَّكَ مَيِّتٌ وَإِنَّهُم مَّيِّتُونَ", translation: "Indeed, you are to die, and indeed, they are to die." },
    { ayah: 31, arabic: "ثُمَّ إِنَّكُمْ يَوْمَ الْقِيَامَةِ عِندَ رَبِّكُمْ تَخْتَصِمُونَ", translation: "Then indeed, on the Day of Resurrection, before your Lord you will dispute." },
    { ayah: 32, arabic: "فَمَنْ أَظْلَمُ مِمَّن كَذَبَ عَلَى اللَّهِ وَكَذَّبَ بِالصِّدْقِ إِذْ جَاءَهُ", translation: "Who is more unjust than one who lies about Allah and denies the truth when it comes to him?" },
    { ayah: 33, arabic: "وَالَّذِي جَاءَ بِالصِّدْقِ وَصَدَّقَ بِهِ ۙ أُولَٰئِكَ هُمُ الْمُتَّقُونَ", translation: "And the one who has brought the truth and those who confirm it — those are the righteous." },
    { ayah: 34, arabic: "لَهُم مَّا يَشَاءُونَ عِندَ رَبِّهِمْ ۚ ذَٰلِكَ جَزَاءُ الْمُحْسِنِينَ", translation: "They will have whatever they wish with their Lord. That is the reward of the doers of good." },
    { ayah: 35, arabic: "لِيُكَفِّرَ اللَّهُ عَنْهُمْ أَسْوَأَ الَّذِي عَمِلُوا وَيَجْزِيَهُمْ أَجْرَهُم بِأَحْسَنِ الَّذِي كَانُوا يَعْمَلُونَ", translation: "That Allah may remove from them the worst of what they did and reward them according to the best of what they used to do." },
    { ayah: 36, arabic: "أَلَيْسَ اللَّهُ بِكَافٍ عَبْدَهُ", translation: "Is Allah not sufficient for His servant?" },
    { ayah: 37, arabic: "وَمَن يَهْدِ اللَّهُ فَمَا لَهُ مِن مُّضِلٍّ ۗ أَلَيْسَ اللَّهُ بِعَزِيزٍ ذِي انتِقَامٍ", translation: "And whoever Allah guides — for him there is no misleader. Is not Allah Almighty, Owner of retribution?" },
    { ayah: 38, arabic: "وَلَئِن سَأَلْتَهُم مَّنْ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ لَيَقُولُنَّ اللَّهُ", translation: "And if you asked them, 'Who created the heavens and the earth?' they would surely say, 'Allah.'" },
    { ayah: 39, arabic: "قُلْ أَفَرَأَيْتُم مَّا تَدْعُونَ مِن دُونِ اللَّهِ إِنْ أَرَادَنِيَ اللَّهُ بِضُرٍّ", translation: "Say: Have you considered those you invoke besides Allah? If Allah intended for me some harm..." },
    { ayah: 40, arabic: "قُلْ يَا قَوْمِ اعْمَلُوا عَلَىٰ مَكَانَتِكُمْ إِنِّي عَامِلٌ ۖ فَسَوْفَ تَعْلَمُونَ", translation: "Say: O my people, work according to your position; indeed, I am working. You will know." },
    { ayah: 41, arabic: "إِنَّا أَنزَلْنَا عَلَيْكَ الْكِتَابَ لِلنَّاسِ بِالْحَقِّ", translation: "Indeed, We sent down to you the Book for the people in truth." },
    { ayah: 42, arabic: "اللَّهُ يَتَوَفَّى الْأَنفُسَ حِينَ مَوْتِهَا وَالَّتِي لَمْ تَمُتْ فِي مَنَامِهَا", translation: "Allah takes the souls at the time of their death, and those that have not died, during their sleep." },
    { ayah: 43, arabic: "أَمِ اتَّخَذُوا مِن دُونِ اللَّهِ شُفَعَاءَ", translation: "Have they taken intercessors besides Allah?" },
    { ayah: 44, arabic: "قُل لِّلَّهِ الشَّفَاعَةُ جَمِيعًا", translation: "Say: To Allah belongs all intercession entirely." },
    { ayah: 45, arabic: "وَإِذَا ذُكِرَ اللَّهُ وَحْدَهُ اشْمَأَزَّتْ قُلُوبُ الَّذِينَ لَا يُؤْمِنُونَ بِالْآخِرَةِ", translation: "When Allah alone is mentioned, the hearts of those who do not believe in the Hereafter recoil with aversion." },
    { ayah: 46, arabic: "قُلِ اللَّهُمَّ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ", translation: "Say: O Allah, Creator of the heavens and the earth, Knower of the unseen and the witnessed." },
    { ayah: 47, arabic: "وَلَوْ أَنَّ لِلَّذِينَ ظَلَمُوا مَا فِي الْأَرْضِ جَمِيعًا وَمِثْلَهُ مَعَهُ", translation: "And if those who did wrong had all that is on earth and its equivalent with it..." },
    { ayah: 48, arabic: "وَبَدَا لَهُم مِّنَ اللَّهِ مَا لَمْ يَكُونُوا يَحْتَسِبُونَ", translation: "There will appear to them from Allah what they had not expected." },
    { ayah: 49, arabic: "فَإِذَا مَسَّ الْإِنسَانَ ضُرٌّ دَعَانَا", translation: "When adversity touches the human being, he calls upon Us." },
    { ayah: 50, arabic: "قَدْ قَالَهَا الَّذِينَ مِن قَبْلِهِمْ فَمَا أَغْنَىٰ عَنْهُم مَّا كَانُوا يَكْسِبُونَ", translation: "Those before them had already said it, but what they earned did not avail them." },
    { ayah: 51, arabic: "فَأَصَابَهُمْ سَيِّئَاتُ مَا كَسَبُوا", translation: "So the evil consequences of what they earned struck them." },
    { ayah: 52, arabic: "أَوَلَمْ يَعْلَمُوا أَنَّ اللَّهَ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ وَيَقْدِرُ", translation: "Do they not know that Allah extends provision for whom He wills and restricts it?" },
    { ayah: 53, arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا", translation: "Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins." },
    { ayah: 54, arabic: "وَأَنِيبُوا إِلَىٰ رَبِّكُمْ وَأَسْلِمُوا لَهُ", translation: "Turn back to your Lord and submit to Him." },
    { ayah: 55, arabic: "وَاتَّبِعُوا أَحْسَنَ مَا أُنزِلَ إِلَيْكُم مِّن رَّبِّكُمْ", translation: "And follow the best of what was revealed to you from your Lord." },
    { ayah: 56, arabic: "أَن تَقُولَ نَفْسٌ يَا حَسْرَتَا عَلَىٰ مَا فَرَّطتُ فِي جَنبِ اللَّهِ", translation: "Lest a soul should say, 'Oh, how great is my regret over what I neglected in regard to Allah.'" },
    { ayah: 57, arabic: "أَوْ تَقُولَ لَوْ أَنَّ اللَّهَ هَدَانِي لَكُنتُ مِنَ الْمُتَّقِينَ", translation: "Or it should say, 'If only Allah had guided me, I would have been among the righteous.'" },
    { ayah: 58, arabic: "أَوْ تَقُولَ حِينَ تَرَى الْعَذَابَ لَوْ أَنَّ لِي كَرَّةً فَأَكُونَ مِنَ الْمُحْسِنِينَ", translation: "Or it should say when it sees the punishment, 'If only I had another chance, I would be among the doers of good.'" },
    { ayah: 59, arabic: "بَلَىٰ قَدْ جَاءَتْكَ آيَاتِي فَكَذَّبْتَ بِهَا وَاسْتَكْبَرْتَ", translation: "But yes, My verses had come to you, and you denied them and were arrogant." },
    { ayah: 60, arabic: "وَيَوْمَ الْقِيَامَةِ تَرَى الَّذِينَ كَذَبُوا عَلَى اللَّهِ وُجُوهُهُم مُّسْوَدَّةٌ", translation: "And on the Day of Resurrection you will see those who lied about Allah, their faces darkened." },
    { ayah: 61, arabic: "وَيُنَجِّي اللَّهُ الَّذِينَ اتَّقَوْا بِمَفَازَتِهِمْ", translation: "And Allah will save those who feared Him by their attainment." },
    { ayah: 62, arabic: "اللَّهُ خَالِقُ كُلِّ شَيْءٍ ۖ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ وَكِيلٌ", translation: "Allah is the Creator of all things, and He is, over all things, Disposer of affairs." },
    { ayah: 63, arabic: "لَّهُ مَقَالِيدُ السَّمَاوَاتِ وَالْأَرْضِ", translation: "To Him belong the keys of the heavens and the earth." },
    { ayah: 64, arabic: "قُلْ أَفَغَيْرَ اللَّهِ تَأْمُرُونِّي أَعْبُدُ أَيُّهَا الْجَاهِلُونَ", translation: "Say: Is it other than Allah that you order me to worship, O ignorant ones?" },
    { ayah: 65, arabic: "وَلَقَدْ أُوحِيَ إِلَيْكَ وَإِلَى الَّذِينَ مِن قَبْلِكَ لَئِنْ أَشْرَكْتَ لَيَحْبَطَنَّ عَمَلُكَ", translation: "And it was revealed to you and to those before you: If you associate others with Allah, your deeds would surely become worthless." },
    { ayah: 66, arabic: "بَلِ اللَّهَ فَاعْبُدْ وَكُن مِّنَ الشَّاكِرِينَ", translation: "Rather, worship Allah and be among the grateful." },
    { ayah: 67, arabic: "وَمَا قَدَرُوا اللَّهَ حَقَّ قَدْرِهِ وَالْأَرْضُ جَمِيعًا قَبْضَتُهُ يَوْمَ الْقِيَامَةِ", translation: "They have not appraised Allah with true appraisal. The entire earth will be within His grip on the Day of Resurrection." },
    { ayah: 68, arabic: "وَنُفِخَ فِي الصُّورِ فَصَعِقَ مَن فِي السَّمَاوَاتِ وَمَن فِي الْأَرْضِ إِلَّا مَن شَاءَ اللَّهُ", translation: "The trumpet will be blown, and whoever is in the heavens and whoever is on the earth will fall dead, except whom Allah wills." },
    { ayah: 69, arabic: "وَأَشْرَقَتِ الْأَرْضُ بِنُورِ رَبِّهَا وَوُضِعَ الْكِتَابُ", translation: "And the earth will shine with the light of its Lord, and the record will be placed." },
    { ayah: 70, arabic: "وَوُفِّيَتْ كُلُّ نَفْسٍ مَّا عَمِلَتْ وَهُوَ أَعْلَمُ بِمَا يَفْعَلُونَ", translation: "And every soul will be fully compensated for what it did, and He is most knowing of what they do." },
    { ayah: 71, arabic: "وَسِيقَ الَّذِينَ كَفَرُوا إِلَىٰ جَهَنَّمَ زُمَرًا", translation: "And those who disbelieved will be driven to Hell in groups." },
    { ayah: 72, arabic: "قِيلَ ادْخُلُوا أَبْوَابَ جَهَنَّمَ خَالِدِينَ فِيهَا ۖ فَبِئْسَ مَثْوَى الْمُتَكَبِّرِينَ", translation: "It will be said: Enter the gates of Hell to abide eternally therein. Wretched is the residence of the arrogant." },
    { ayah: 73, arabic: "وَسِيقَ الَّذِينَ اتَّقَوْا رَبَّهُمْ إِلَى الْجَنَّةِ زُمَرًا", translation: "And those who feared their Lord will be driven to Paradise in groups." },
    { ayah: 74, arabic: "وَقَالُوا الْحَمْدُ لِلَّهِ الَّذِي صَدَقَنَا وَعْدَهُ وَأَوْرَثَنَا الْأَرْضَ", translation: "And they will say: Praise to Allah, who has fulfilled His promise to us and has made us inherit the earth." },
    { ayah: 75, arabic: "وَتَرَى الْمَلَائِكَةَ حَافِّينَ مِنْ حَوْلِ الْعَرْشِ يُسَبِّحُونَ بِحَمْدِ رَبِّهِمْ ۚ وَقِيلَ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "And you will see the angels surrounding the Throne, exalting with praise of their Lord. And it will be said: Praise to Allah, Lord of all worlds." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Architecture of Sincerity",
      subtitle: "Four movements: demand, counsel, argument, finale",
      sections: [
        { ayahs: "1–9", title: "The Declaration", color: "#4ecdc4", desc: "The surah opens with its non-negotiable demand: sincerity in worship, pure devotion to Allah alone. The phrase mukhlisan lahu al-din appears here for the first time and echoes through the surah like a refrain. The nighttime worshipper — alone, unseen — is the icon of ikhlas." },
        { ayahs: "10–21", title: "The Counsel", color: "#9b7fd4", desc: "Addressing the believers directly for the first time: patience, spacious earth, and a lifecycle parable — rain to spring to growth to yellowing to debris. Everything you worship besides Allah has this trajectory." },
        { ayahs: "22–52", title: "The Sustained Argument", color: "#e07a8a", desc: "The longest movement: the chest opened to Islam, the man owned by quarreling masters versus the man devoted to one, the soul taken in sleep, the heart that recoils when Allah alone is mentioned. Every parable approaches the same truth from a different angle." },
        { ayahs: "53–75", title: "The Mercy and the Finale", color: "#C9A84C", isPivot: true, desc: "The mercy verse opens the widest door — then urgency, three forms of too-late regret, the trumpet blast, the earth shining with the light of its Lord, and two processions driven in groups toward two destinations. The final word: al-hamdu lillahi rabbi al-'alamin." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Sincerity",
      subtitle: "The surah's opening demand and closing fulfillment mirror each other around the mercy verse at the center",
      pairs: [
        {
          left: { label: "The Demand", ayahs: "1–3", desc: "The command to worship Allah with sincerity — is pure religion not for Allah alone?" },
          right: { label: "The Fulfillment", ayahs: "71–75", desc: "Two groups driven in processions — those who gave sincerity and those who withheld it — and the final praise" },
          color: "#C9A84C",
        },
        {
          left: { label: "Divided Worship", ayahs: "29", desc: "The man owned by quarreling partners versus the man belonging to one — the parable of tawhid" },
          right: { label: "Divided Fates", ayahs: "71–73", desc: "The two zumar: one driven to Hell, one to Paradise — the word appears only here in the entire Quran" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Insincere Heart", ayahs: "8", desc: "Calls on Allah in hardship, forgets Him in ease — the psychology of inconsistency" },
          right: { label: "Too-Late Regret", ayahs: "56–58", desc: "Three forms of regret catalogued: negligence, wishing for guidance, wishing for another chance" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Widest Door", ayahs: "53",
        desc: "O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.",
        note: "The structural center of a surah about sincerity is mercy. The demand is real. The mercy is equally real. And between them, the human being finds the only ground on which sincere worship becomes possible.",
      },
    },
    deductiveFunnel: {
      title: "The Diagnostic",
      subtitle: "Each layer peels back the psychology of insincerity until the root is exposed",
      layers: [
        { depth: 1, label: "Inconsistency", ayah: "8", arabic: "وَإِذَا مَسَّ الْإِنسَانَ ضُرٌّ دَعَا رَبَّهُ", desc: "The surface symptom: calling on Allah in hardship, forgetting Him in ease. Sincerity is what remains when comfort returns.", color: "#4ecdc4" },
        { depth: 2, label: "Recoil", ayah: "45", arabic: "وَإِذَا ذُكِرَ اللَّهُ وَحْدَهُ اشْمَأَزَّتْ", desc: "The involuntary contraction of the heart when Allah is mentioned alone. The rare verb ishma'azzat describes a physical, visceral shrinking. The test of sincerity is not what you profess but what your heart does.", color: "#9b7fd4" },
        { depth: 3, label: "Self-Attribution", ayah: "49", arabic: "إِنَّمَا أُوتِيتُهُ عَلَىٰ عِلْمٍ", desc: "The deepest layer: not mere forgetfulness but active self-attribution. 'I was given this because of my knowledge.' The insincere heart takes credit for what Allah gave.", color: "#e07a8a" },
        { depth: 4, label: "Misappraisal", ayah: "67", arabic: "وَمَا قَدَرُوا اللَّهَ حَقَّ قَدْرِهِ", desc: "The root cause of all insincerity: they never measured Allah with His true measure. They never understood how vast He is.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah replaces external warning with internal encounter — every absence is a design choice",
      absences: [
        { item: "No detailed prophetic narratives", note: "No destroyed nations, no Pharaoh, no 'Ad, no Thamud. In a late Makkan surah where historical destruction is most common, their absence is deliberate. Az-Zumar replaces external warning with an internal one: the soul's own encounter with its sincerity." },
        { item: "No prophets as characters", note: "Prophets are mentioned only in passing, as recipients of revelation (39:65), never as narrative figures. The surah keeps its gaze fixed on the listener's interior." },
        { item: "No physical Paradise descriptions", note: "The surah's rewards are relational — chambers above chambers, the angels' greeting, the phrase 'you have been good.' The pleasures are about relationship, not consumption." },
        { item: "No intercession loophole", note: "Ayah 44 forecloses every exit: 'To Allah belongs all intercession entirely.' No one mediates without His permission, and the permission itself belongs to Him. The surah demands direct encounter." },
        { item: "No softening of the demand", note: "The surah does not dilute its call for sincerity in order to offer mercy. It holds both at full strength — the demand and the door — and insists that this is the only ground on which real worship is possible." },
      ],
    },
  },

  contentNodes: [
    { concept: "The mercy verse — structural center and widest door", type: "surah-specific", articleSlug: "mercy-verse-39-53" },
    { concept: "The two zumar — processions toward two destinations", type: "surah-specific", articleSlug: "two-zumar-processions-39-71-73" },
    { concept: "Quarreling masters — tawhid as a single image", type: "surah-specific", articleSlug: "quarreling-masters-parable-39-29" },
    { concept: "The soul taken in sleep — consciousness as borrowed gift", type: "cross-surah", articleSlug: "soul-sleep-death-39-42" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "diagnostic", label: "Diagnostic" },
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
        Inconsistency → recoil → self-attribution → misappraisal
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "diagnostic" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
