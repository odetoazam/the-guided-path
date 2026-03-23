"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AR-RA'D — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ar-rad
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ar-Ra'd",
  arabicName: "الرَّعد",
  meaning: "The Thunder",
  number: 13,
  ayahCount: 43,
  period: "Madani",
  juz: 13,
  movements: 4,
  thesis:
    "A forty-three-ayah argument that the physical world is already saying everything God needs said — thunder doing tasbih, soil preaching, foam vanishing — and the only question left is whether you have the kind of heart that can hear it.",
  reflectionUrl: "/surahs/ar-rad",
  readTime: "20 min read",

  sciencesActive: [{"key":"amthal","english":"Parables"},{"key":"balaghah","english":"Rhetoric"},{"key":"aqeedah","english":"Theology"}],
  heartVerse: {
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    ayahRef: "13:28",
    translation: "Truly, in the remembrance of God do hearts find rest.",
    why: "Embedded not in a devotional passage but inside the surah's ethical portrait — between people who keep covenants and people who break them. The rest it names is not emotional comfort; it is the settledness of ground after rain. The heart that remembers is like soil that holds water.",
  },

  audio: { surahNumber: 13, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "المر ۚ تِلْكَ آيَاتُ الْكِتَابِ ۗ وَالَّذِي أُنزِلَ إِلَيْكَ مِن رَّبِّكَ الْحَقُّ وَلَـٰكِنَّ أَكْثَرَ النَّاسِ لَا يُؤْمِنُونَ", translation: "Alif Lam Mim Ra. These are the signs of the Book. And what has been revealed to you from your Lord is the truth, but most people do not believe." },
    { ayah: 2, arabic: "اللَّهُ الَّذِي رَفَعَ السَّمَاوَاتِ بِغَيْرِ عَمَدٍ تَرَوْنَهَا ۖ ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ ۖ وَسَخَّرَ الشَّمْسَ وَالْقَمَرَ ۖ كُلٌّ يَجْرِي لِأَجَلٍ مُّسَمًّى ۚ يُدَبِّرُ الْأَمْرَ يُفَصِّلُ الْآيَاتِ لَعَلَّكُم بِلِقَاءِ رَبِّكُمْ تُوقِنُونَ", translation: "It is Allah who raised the heavens without pillars that you can see, then established Himself above the Throne. He subjected the sun and the moon, each running for a specified term. He arranges all affairs and details the signs so that you may be certain of the meeting with your Lord." },
    { ayah: 3, arabic: "وَهُوَ الَّذِي مَدَّ الْأَرْضَ وَجَعَلَ فِيهَا رَوَاسِيَ وَأَنْهَارًا ۖ وَمِن كُلِّ الثَّمَرَاتِ جَعَلَ فِيهَا زَوْجَيْنِ اثْنَيْنِ ۖ يُغْشِي اللَّيْلَ النَّهَارَ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ", translation: "And it is He who spread out the earth and placed therein firm mountains and rivers, and from every fruit He made pairs. He covers the night with the day. Indeed, in that are signs for people who reflect." },
    { ayah: 4, arabic: "وَفِي الْأَرْضِ قِطَعٌ مُّتَجَاوِرَاتٌ وَجَنَّاتٌ مِّنْ أَعْنَابٍ وَزَرْعٌ وَنَخِيلٌ صِنْوَانٌ وَغَيْرُ صِنْوَانٍ يُسْقَىٰ بِمَاءٍ وَاحِدٍ وَنُفَضِّلُ بَعْضَهَا عَلَىٰ بَعْضٍ فِي الْأُكُلِ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَعْقِلُونَ", translation: "And in the earth are neighboring tracts, and gardens of grapevines and crops and palms, clustered and separate, watered with the same water; yet We make some of them exceed others in fruit. Indeed, in that are signs for people who reason." },
    { ayah: 5, arabic: "وَإِن تَعْجَبْ فَعَجَبٌ قَوْلُهُمْ أَإِذَا كُنَّا تُرَابًا أَإِنَّا لَفِي خَلْقٍ جَدِيدٍ ۗ أُولَـٰئِكَ الَّذِينَ كَفَرُوا بِرَبِّهِمْ ۖ وَأُولَـٰئِكَ الْأَغْلَالُ فِي أَعْنَاقِهِمْ ۖ وَأُولَـٰئِكَ أَصْحَابُ النَّارِ ۖ هُمْ فِيهَا خَالِدُونَ", translation: "And if you wonder — then wondrous is their saying: 'When we are dust, will we be in a new creation?' Those are the ones who have disbelieved in their Lord, and those will have shackles upon their necks, and those are the companions of the Fire; they will abide therein eternally." },
    { ayah: 6, arabic: "وَيَسْتَعْجِلُونَكَ بِالسَّيِّئَةِ قَبْلَ الْحَسَنَةِ وَقَدْ خَلَتْ مِن قَبْلِهِمُ الْمَثُلَاتُ ۗ وَإِنَّ رَبَّكَ لَذُو مَغْفِرَةٍ لِّلنَّاسِ عَلَىٰ ظُلْمِهِمْ ۖ وَإِنَّ رَبَّكَ لَشَدِيدُ الْعِقَابِ", translation: "They ask you to hasten the punishment rather than the good, though examples of punishment have already passed before them. And indeed, your Lord is full of forgiveness for people despite their wrongdoing, and indeed, your Lord is severe in punishment." },
    { ayah: 7, arabic: "وَيَقُولُ الَّذِينَ كَفَرُوا لَوْلَا أُنزِلَ عَلَيْهِ آيَةٌ مِّن رَّبِّهِ ۗ إِنَّمَا أَنتَ مُنذِرٌ ۖ وَلِكُلِّ قَوْمٍ هَادٍ", translation: "And those who disbelieve say: 'Why has a sign not been sent down to him from his Lord?' You are only a warner, and for every people is a guide." },
    { ayah: 8, arabic: "اللَّهُ يَعْلَمُ مَا تَحْمِلُ كُلُّ أُنثَىٰ وَمَا تَغِيضُ الْأَرْحَامُ وَمَا تَزْدَادُ ۖ وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ", translation: "Allah knows what every female carries, and what the wombs lose and what they gain. And everything with Him is by due measure." },
    { ayah: 9, arabic: "عَالِمُ الْغَيْبِ وَالشَّهَادَةِ الْكَبِيرُ الْمُتَعَالِ", translation: "Knower of the unseen and the witnessed, the Grand, the Exalted." },
    { ayah: 10, arabic: "سَوَاءٌ مِّنكُم مَّنْ أَسَرَّ الْقَوْلَ وَمَن جَهَرَ بِهِ وَمَنْ هُوَ مُسْتَخْفٍ بِاللَّيْلِ وَسَارِبٌ بِالنَّهَارِ", translation: "It is the same whether any of you conceals his speech or declares it, or hides by night or goes forth by day." },
    { ayah: 11, arabic: "لَهُ مُعَقِّبَاتٌ مِّن بَيْنِ يَدَيْهِ وَمِنْ خَلْفِهِ يَحْفَظُونَهُ مِنْ أَمْرِ اللَّهِ ۗ إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ ۗ وَإِذَا أَرَادَ اللَّهُ بِقَوْمٍ سُوءًا فَلَا مَرَدَّ لَهُ ۚ وَمَا لَهُم مِّن دُونِهِ مِن وَالٍ", translation: "For each one there are successive angels before and behind him who guard him by Allah's command. Indeed, Allah does not change the condition of a people until they change what is in themselves. And when Allah intends for a people ill, there is no repelling it. And there is not for them besides Him any protector." },
    { ayah: 12, arabic: "هُوَ الَّذِي يُرِيكُمُ الْبَرْقَ خَوْفًا وَطَمَعًا وَيُنشِئُ السَّحَابَ الثِّقَالَ", translation: "It is He who shows you lightning, causing fear and aspiration, and He produces the heavy clouds." },
    { ayah: 13, arabic: "وَيُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ وَيُرْسِلُ الصَّوَاعِقَ فَيُصِيبُ بِهَا مَن يَشَاءُ وَهُمْ يُجَادِلُونَ فِي اللَّهِ وَهُوَ شَدِيدُ الْمِحَالِ", translation: "The thunder glorifies His praise, and the angels out of awe of Him. And He sends the thunderbolts and strikes therewith whom He wills while they dispute about Allah — and He is severe in assault." },
    { ayah: 14, arabic: "لَهُ دَعْوَةُ الْحَقِّ ۖ وَالَّذِينَ يَدْعُونَ مِن دُونِهِ لَا يَسْتَجِيبُونَ لَهُم بِشَيْءٍ إِلَّا كَبَاسِطِ كَفَّيْهِ إِلَى الْمَاءِ لِيَبْلُغَ فَاهُ وَمَا هُوَ بِبَالِغِهِ ۚ وَمَا دُعَاءُ الْكَافِرِينَ إِلَّا فِي ضَلَالٍ", translation: "To Him alone is the true call. And those they call upon besides Him do not respond to them at all — except as one who stretches his hands toward water so that it might reach his mouth, but it will never reach him. And the supplication of the disbelievers is nothing but error." },
    { ayah: 15, arabic: "وَلِلَّهِ يَسْجُدُ مَن فِي السَّمَاوَاتِ وَالْأَرْضِ طَوْعًا وَكَرْهًا وَظِلَالُهُم بِالْغُدُوِّ وَالْآصَالِ ۩", translation: "And to Allah prostrates whoever is in the heavens and the earth, willingly or unwillingly, and their shadows in the mornings and afternoons." },
    { ayah: 16, arabic: "قُلْ مَن رَّبُّ السَّمَاوَاتِ وَالْأَرْضِ قُلِ اللَّهُ ۚ قُلْ أَفَاتَّخَذْتُم مِّن دُونِهِ أَوْلِيَاءَ لَا يَمْلِكُونَ لِأَنفُسِهِمْ نَفْعًا وَلَا ضَرًّا ۚ قُلْ هَلْ يَسْتَوِي الْأَعْمَىٰ وَالْبَصِيرُ أَمْ هَلْ تَسْتَوِي الظُّلُمَاتُ وَالنُّورُ ۗ أَمْ جَعَلُوا لِلَّهِ شُرَكَاءَ خَلَقُوا كَخَلْقِهِ فَتَشَابَهَ الْخَلْقُ عَلَيْهِمْ ۚ قُلِ اللَّهُ خَالِقُ كُلِّ شَيْءٍ وَهُوَ الْوَاحِدُ الْقَهَّارُ", translation: "Say: 'Who is Lord of the heavens and the earth?' Say: 'Allah.' Say: 'Have you then taken besides Him allies who do not possess for themselves any benefit or harm?' Say: 'Is the blind equal to the seeing? Or is darkness equal to light? Or have they attributed to Allah partners who created like His creation so that the creation seemed similar to them?' Say: 'Allah is the Creator of all things, and He is the One, the Prevailing.'" },
    { ayah: 17, arabic: "أَنزَلَ مِنَ السَّمَاءِ مَاءً فَسَالَتْ أَوْدِيَةٌ بِقَدَرِهَا فَاحْتَمَلَ السَّيْلُ زَبَدًا رَّابِيًا ۚ وَمِمَّا يُوقِدُونَ عَلَيْهِ فِي النَّارِ ابْتِغَاءَ حِلْيَةٍ أَوْ مَتَاعٍ زَبَدٌ مِّثْلُهُ ۚ كَذَٰلِكَ يَضْرِبُ اللَّهُ الْحَقَّ وَالْبَاطِلَ ۚ فَأَمَّا الزَّبَدُ فَيَذْهَبُ جُفَاءً ۖ وَأَمَّا مَا يَنفَعُ النَّاسَ فَيَمْكُثُ فِي الْأَرْضِ ۚ كَذَٰلِكَ يَضْرِبُ اللَّهُ الْأَمْثَالَ", translation: "He sends down water from the sky, and the valleys flow according to their capacity. The torrent carries rising foam. And from what they heat in the fire to make ornaments or tools is foam like it. Thus does Allah set forth truth and falsehood. As for the foam, it vanishes as refuse; but as for what benefits people, it remains in the earth. Thus does Allah set forth parables." },
    { ayah: 18, arabic: "لِلَّذِينَ اسْتَجَابُوا لِرَبِّهِمُ الْحُسْنَىٰ ۚ وَالَّذِينَ لَمْ يَسْتَجِيبُوا لَهُ لَوْ أَنَّ لَهُم مَّا فِي الْأَرْضِ جَمِيعًا وَمِثْلَهُ مَعَهُ لَافْتَدَوْا بِهِ ۚ أُولَـٰئِكَ لَهُمْ سُوءُ الْحِسَابِ وَمَأْوَاهُمْ جَهَنَّمُ ۖ وَبِئْسَ الْمِهَادُ", translation: "For those who answered their Lord is the best reward. But those who did not respond to Him — if they had all that is on the earth and the like of it with it, they would offer it as ransom. Those will have the worst account, and their refuge is Hell, and wretched is the resting place." },
    { ayah: 19, arabic: "أَفَمَن يَعْلَمُ أَنَّمَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ الْحَقُّ كَمَنْ هُوَ أَعْمَىٰ ۚ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ", translation: "Then is he who knows that what has been revealed to you from your Lord is the truth like one who is blind? Only those of understanding will be mindful." },
    { ayah: 20, arabic: "الَّذِينَ يُوفُونَ بِعَهْدِ اللَّهِ وَلَا يَنقُضُونَ الْمِيثَاقَ", translation: "Those who fulfill the covenant of Allah and do not break the pledge." },
    { ayah: 21, arabic: "وَالَّذِينَ يَصِلُونَ مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ وَيَخْشَوْنَ رَبَّهُمْ وَيَخَافُونَ سُوءَ الْحِسَابِ", translation: "And those who join what Allah has ordered to be joined, and fear their Lord, and are afraid of the evil of the account." },
    { ayah: 22, arabic: "وَالَّذِينَ صَبَرُوا ابْتِغَاءَ وَجْهِ رَبِّهِمْ وَأَقَامُوا الصَّلَاةَ وَأَنفَقُوا مِمَّا رَزَقْنَاهُمْ سِرًّا وَعَلَانِيَةً وَيَدْرَءُونَ بِالْحَسَنَةِ السَّيِّئَةَ أُولَـٰئِكَ لَهُمْ عُقْبَى الدَّارِ", translation: "And those who are patient, seeking the face of their Lord, and establish prayer and spend from what We have provided them secretly and publicly, and repel evil with good — those will have the final home." },
    { ayah: 23, arabic: "جَنَّاتُ عَدْنٍ يَدْخُلُونَهَا وَمَن صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ ۖ وَالْمَلَائِكَةُ يَدْخُلُونَ عَلَيْهِم مِّن كُلِّ بَابٍ", translation: "Gardens of perpetual residence — they will enter them with whoever was righteous among their fathers, spouses, and descendants. And the angels will enter upon them from every gate." },
    { ayah: 24, arabic: "سَلَامٌ عَلَيْكُم بِمَا صَبَرْتُمْ ۚ فَنِعْمَ عُقْبَى الدَّارِ", translation: "'Peace be upon you for what you patiently endured.' How excellent is the final home!" },
    { ayah: 25, arabic: "وَالَّذِينَ يَنقُضُونَ عَهْدَ اللَّهِ مِن بَعْدِ مِيثَاقِهِ وَيَقْطَعُونَ مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ وَيُفْسِدُونَ فِي الْأَرْضِ ۙ أُولَـٰئِكَ لَهُمُ اللَّعْنَةُ وَلَهُمْ سُوءُ الدَّارِ", translation: "And those who break the covenant of Allah after its confirmation, and sever what Allah has ordered to be joined, and spread corruption on earth — for them is the curse, and they will have the worst home." },
    { ayah: 26, arabic: "اللَّهُ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ وَيَقْدِرُ ۚ وَفَرِحُوا بِالْحَيَاةِ الدُّنْيَا وَمَا الْحَيَاةُ الدُّنْيَا فِي الْآخِرَةِ إِلَّا مَتَاعٌ", translation: "Allah extends provision for whom He wills and restricts it. And they rejoice in the worldly life, while the worldly life is not, compared to the Hereafter, except brief enjoyment." },
    { ayah: 27, arabic: "وَيَقُولُ الَّذِينَ كَفَرُوا لَوْلَا أُنزِلَ عَلَيْهِ آيَةٌ مِّن رَّبِّهِ ۗ قُلْ إِنَّ اللَّهَ يُضِلُّ مَن يَشَاءُ وَيَهْدِي إِلَيْهِ مَنْ أَنَابَ", translation: "And those who disbelieve say: 'Why is a sign not sent down to him from his Lord?' Say: 'Indeed, Allah leaves astray whom He wills and guides to Himself whoever turns back to Him.'" },
    { ayah: 28, arabic: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", translation: "Those who believe, and whose hearts find rest in the remembrance of Allah — truly, in the remembrance of Allah do hearts find rest." },
    { ayah: 29, arabic: "الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ طُوبَىٰ لَهُمْ وَحُسْنُ مَآبٍ", translation: "Those who believe and do good works — joy is theirs and a beautiful return." },
    { ayah: 30, arabic: "كَذَٰلِكَ أَرْسَلْنَاكَ فِي أُمَّةٍ قَدْ خَلَتْ مِن قَبْلِهَا أُمَمٌ لِّتَتْلُوَ عَلَيْهِمُ الَّذِي أَوْحَيْنَا إِلَيْكَ وَهُمْ يَكْفُرُونَ بِالرَّحْمَـٰنِ ۚ قُلْ هُوَ رَبِّي لَا إِلَـٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ مَتَابِ", translation: "Thus have We sent you to a community before which communities have passed, that you might recite to them what We revealed to you, while they disbelieve in the Most Merciful. Say: 'He is my Lord; there is no god except Him. Upon Him I rely, and to Him is my return.'" },
    { ayah: 31, arabic: "وَلَوْ أَنَّ قُرْآنًا سُيِّرَتْ بِهِ الْجِبَالُ أَوْ قُطِّعَتْ بِهِ الْأَرْضُ أَوْ كُلِّمَ بِهِ الْمَوْتَىٰ ۗ بَل لِّلَّهِ الْأَمْرُ جَمِيعًا ۗ أَفَلَمْ يَيْأَسِ الَّذِينَ آمَنُوا أَن لَّوْ يَشَاءُ اللَّهُ لَهَدَى النَّاسَ جَمِيعًا", translation: "And if there were a Quran by which mountains could be moved, or the earth could be broken apart, or the dead could be spoken to... Rather, the command belongs entirely to Allah. Have the believers not yet realized that if Allah had willed, He could have guided all of humanity?" },
    { ayah: 32, arabic: "وَلَقَدِ اسْتُهْزِئَ بِرُسُلٍ مِّن قَبْلِكَ فَأَمْلَيْتُ لِلَّذِينَ كَفَرُوا ثُمَّ أَخَذْتُهُمْ ۖ فَكَيْفَ كَانَ عِقَابِ", translation: "And messengers before you were mocked, but I gave respite to those who disbelieved; then I seized them. And how was My punishment?" },
    { ayah: 33, arabic: "أَفَمَنْ هُوَ قَائِمٌ عَلَىٰ كُلِّ نَفْسٍ بِمَا كَسَبَتْ ۗ وَجَعَلُوا لِلَّهِ شُرَكَاءَ قُلْ سَمُّوهُمْ ۚ أَمْ تُنَبِّئُونَهُ بِمَا لَا يَعْلَمُ فِي الْأَرْضِ أَم بِظَاهِرٍ مِّنَ الْقَوْلِ", translation: "Is He who stands over every soul for what it has earned [not sufficient]? Yet they attribute partners to Allah. Say: 'Name them. Or do you inform Him of something He does not know upon the earth, or is it by apparent speech only?'" },
    { ayah: 34, arabic: "لَهُمْ عَذَابٌ فِي الْحَيَاةِ الدُّنْيَا ۖ وَلَعَذَابُ الْآخِرَةِ أَشَقُّ ۖ وَمَا لَهُم مِّنَ اللَّهِ مِن وَاقٍ", translation: "For them is punishment in the life of this world, and the punishment of the Hereafter is more severe. And they will have no protector from Allah." },
    { ayah: 35, arabic: "مَّثَلُ الْجَنَّةِ الَّتِي وُعِدَ الْمُتَّقُونَ ۖ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ ۖ أُكُلُهَا دَائِمٌ وَظِلُّهَا ۚ تِلْكَ عُقْبَى الَّذِينَ اتَّقَوا ۖ وَّعُقْبَى الْكَافِرِينَ النَّارُ", translation: "The description of the Garden promised to the righteous: beneath it rivers flow; its fruit is lasting and so is its shade. That is the consequence for those who feared Allah, and the consequence for the disbelievers is the Fire." },
    { ayah: 36, arabic: "وَالَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَفْرَحُونَ بِمَا أُنزِلَ إِلَيْكَ ۖ وَمِنَ الْأَحْزَابِ مَن يُنكِرُ بَعْضَهُ ۚ قُلْ إِنَّمَا أُمِرْتُ أَنْ أَعْبُدَ اللَّهَ وَلَا أُشْرِكَ بِهِ ۚ إِلَيْهِ أَدْعُو وَإِلَيْهِ مَآبِ", translation: "And those to whom We have given the Book rejoice at what has been revealed to you, but among the factions are those who deny part of it. Say: 'I have only been commanded to worship Allah and not associate anything with Him. To Him I invite, and to Him is my return.'" },
    { ayah: 37, arabic: "وَكَذَٰلِكَ أَنزَلْنَاهُ حُكْمًا عَرَبِيًّا ۚ وَلَئِنِ اتَّبَعْتَ أَهْوَاءَهُم بَعْدَ مَا جَاءَكَ مِنَ الْعِلْمِ مَا لَكَ مِنَ اللَّهِ مِن وَلِيٍّ وَلَا وَاقٍ", translation: "And thus We have revealed it as an Arabic legislation. And if you should follow their desires after what has come to you of knowledge, you would not have from Allah any ally or any protector." },
    { ayah: 38, arabic: "وَلَقَدْ أَرْسَلْنَا رُسُلًا مِّن قَبْلِكَ وَجَعَلْنَا لَهُمْ أَزْوَاجًا وَذُرِّيَّةً ۚ وَمَا كَانَ لِرَسُولٍ أَن يَأْتِيَ بِآيَةٍ إِلَّا بِإِذْنِ اللَّهِ ۗ لِكُلِّ أَجَلٍ كِتَابٌ", translation: "And We have already sent messengers before you and assigned to them wives and descendants. It was not for a messenger to come with a sign except by permission of Allah. For every term is a decree." },
    { ayah: 39, arabic: "يَمْحُو اللَّهُ مَا يَشَاءُ وَيُثْبِتُ ۖ وَعِندَهُ أُمُّ الْكِتَابِ", translation: "Allah eliminates what He wills and confirms, and with Him is the Mother of the Book." },
    { ayah: 40, arabic: "وَإِن مَّا نُرِيَنَّكَ بَعْضَ الَّذِي نَعِدُهُمْ أَوْ نَتَوَفَّيَنَّكَ فَإِنَّمَا عَلَيْكَ الْبَلَاغُ وَعَلَيْنَا الْحِسَابُ", translation: "And whether We show you some of what We have promised them, or We take you in death — upon you is only the duty of notification, and upon Us is the account." },
    { ayah: 41, arabic: "أَوَلَمْ يَرَوْا أَنَّا نَأْتِي الْأَرْضَ نَنقُصُهَا مِنْ أَطْرَافِهَا ۚ وَاللَّهُ يَحْكُمُ لَا مُعَقِّبَ لِحُكْمِهِ ۚ وَهُوَ سَرِيعُ الْحِسَابِ", translation: "Have they not seen that We come to the land, reducing it from its borders? And Allah decides — no adjuster of His decision. And He is swift in account." },
    { ayah: 42, arabic: "وَقَدْ مَكَرَ الَّذِينَ مِن قَبْلِهِمْ فَلِلَّهِ الْمَكْرُ جَمِيعًا ۚ يَعْلَمُ مَا تَكْسِبُ كُلُّ نَفْسٍ ۗ وَسَيَعْلَمُ الْكُفَّارُ لِمَنْ عُقْبَى الدَّارِ", translation: "And those before them had plotted, but all planning belongs to Allah. He knows what every soul earns, and the disbelievers will know for whom is the final home." },
    { ayah: 43, arabic: "وَيَقُولُ الَّذِينَ كَفَرُوا لَسْتَ مُرْسَلًا ۚ قُلْ كَفَىٰ بِاللَّهِ شَهِيدًا بَيْنِي وَبَيْنَكُمْ وَمَنْ عِندَهُ عِلْمُ الْكِتَابِ", translation: "And those who disbelieve say: 'You are not a messenger.' Say: 'Sufficient is Allah as a witness between me and you, and whoever has knowledge of the Book.'" },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Evidence",
      subtitle: "Four movements: earth as book → demand & knowledge → moral center → prophetic witness",
      sections: [
        { ayahs: "1–4", title: "The Earth Speaks", color: "#4ecdc4", desc: "The surah opens the earth like a book — rivers running through it, fruit in pairs, adjacent plots receiving the same rain and yielding different harvests. The double meaning of ayat (verses and signs) is the surah's organizing engine. Creation is the evidence, laid out with the calm of someone presenting something obvious." },
        { ayahs: "5–18", title: "The Demand & the Answer", color: "#e07a8a", desc: "Those who look at all this and demand something else — miracles, spectacle. The surah answers with God's total knowledge (what every womb carries, measured to the atom), the thunder doing tasbih, and the parable of foam and water: falsehood rises, looks dominant, vanishes. What benefits people stays in the earth." },
        { ayahs: "19–29", title: "The Moral Center", color: "#C9A84C", isPivot: true, desc: "The ulu al-albab — people of deep understanding — drawn in the most detailed ethical portrait in the Quran. They keep covenants, join what should be joined, repel evil with good. Between their portrait and its opposite sits 13:28: 'In the remembrance of God do hearts find rest.' The heart that remembers is ground that holds rain." },
        { ayahs: "30–43", title: "The Witness", color: "#9b7fd4", desc: "The surah returns to the Prophet, addresses his grief directly, reminds him that guidance belongs to God, and closes with the question of witness: 'God is sufficient as a witness between me and you, and whoever has knowledge of the Book.' The surah spent its length showing you creation — and ends asking you to testify." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's opening and closing form a concentric architecture around the thunder",
      pairs: [
        {
          left: { label: "Signs of the Book", ayahs: "1–4", desc: "The Book's signs presented through creation — rivers, fruit, soil receiving the same rain" },
          right: { label: "Knowledge of the Book", ayahs: "36–43", desc: "Knowledge of the Book qualifies one to be a witness — from signs presented to testimony accepted" },
          color: "#4ecdc4",
        },
        {
          left: { label: "The Demand", ayahs: "5–7", desc: "Why no miracle? The Quraysh want spectacle. The surah describes what is already there" },
          right: { label: "God Could Have Guided All", ayahs: "30–35", desc: "If God willed, all humanity would be guided — the weight of refusal was never the Prophet's to carry" },
          color: "#e07a8a",
        },
        {
          left: { label: "God's Knowledge", ayahs: "8–11", desc: "Total surveillance and the mechanism of change: God does not change a people until they change themselves" },
          right: { label: "The Ethical Portrait", ayahs: "19–29", desc: "The ulu al-albab — what the inner change looks like in practice, and the rest hearts find in remembrance" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Thunder", ayahs: "12–18",
        desc: "The thunder glorifies His praise, and the angels out of awe of Him. The foam vanishes; what benefits people stays in the earth.",
        note: "The surah's center of gravity is not an argument or a command — it is an image of the physical world doing theology on its own.",
      },
    },
    deductiveFunnel: {
      title: "The Soil Parable",
      subtitle: "The surah builds from evidence through denial to the principle that makes sense of both",
      layers: [
        { depth: 1, label: "Same Water, Different Fruit", ayah: "4", arabic: "يُسْقَىٰ بِمَاءٍ وَاحِدٍ", desc: "Adjacent plots of soil receive the same rain and yield radically different harvests. The parable of revelation itself: the same message falls on different hearts. What grows depends on the soil.", color: "#4ecdc4" },
        { depth: 2, label: "The Mechanism of Change", ayah: "11", arabic: "لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ", desc: "The surah's argumentative hinge. God built the system; you operate within it. The soil does not choose its rain, but the heart chooses its orientation. The harvest follows.", color: "#C9A84C" },
        { depth: 3, label: "Foam and Water", ayah: "17", arabic: "فَأَمَّا الزَّبَدُ فَيَذْهَبُ جُفَاءً", desc: "Falsehood is the foam — visible, loud, apparently dominant, temporary. Truth is what settles into the ground and remains. You do not need to defeat the foam. You need to be the thing that remains.", color: "#e07a8a" },
        { depth: 4, label: "Hearts at Rest", ayah: "28", arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", desc: "The heart that remembers God is like soil that receives rain and holds it. Itmi'nan — the deep settledness — is connected to how you live, not only how you pray. Same system, same logic.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "What the surah leaves out tells you what it has already settled",
      absences: [
        { item: "No single sustained narrative", note: "After Surah Yusuf told the most sustained story in the Quran, Ar-Ra'd follows by doing something entirely different — no prophet's story, but a panoramic argument built from creation itself. As if the Quran, having shown what a story can do, now shows what looking can do." },
        { item: "No miracle produced", note: "The Quraysh wanted the Prophet to move a mountain. The surah describes a mountain, describes a river, describes the drama in the sky — and asks why this drama does not count. The demand for spectacle is answered by pointing at what is already spectacular." },
        { item: "No resolution for the Prophet's grief", note: "The surah addresses the Prophet's pain directly but does not resolve it — it reframes it. Guidance belongs to God. The weight of people's refusal was never his to carry. The consolation is theological, not emotional." },
        { item: "No separation between devotion and ethics", note: "The verse about hearts finding rest (13:28) appears inside an ethical portrait, not a devotional one. The surah refuses to separate how you pray from how you live — rest of the heart is connected to covenant-keeping, patience, and repelling evil with good." },
        { item: "No heavenly focus without earthly ground", note: "Where other surahs look up, Ar-Ra'd keeps pulling the gaze down. The sky appears — thunder, lightning, rain — but always in service of what happens when it reaches the earth. The earth is where the meaning lands." },
      ],
    },
  },

  contentNodes: [
    { concept: "The thunder that does tasbih — creation as worship", type: "surah-specific", articleSlug: "thunder-tasbih-13-13" },
    { concept: "Foam and water — the parable of truth and falsehood", type: "surah-specific", articleSlug: "foam-water-parable-13-17" },
    { concept: "Ar-Ra'd–Ibrahim triptych: from soil to tree", type: "cross-surah", articleSlug: "rad-ibrahim-triptych" },
    { concept: "Itmi'nan — the settledness of ground after rain", type: "cross-surah", articleSlug: "itminan-settled-hearts-13-28" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "evidence", label: "Evidence" },
  { id: "ring", label: "Ring" },
  { id: "soil", label: "Soil" },
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
        Evidence → mechanism → parable → settledness
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
          {activeTab === "evidence" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "soil" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
