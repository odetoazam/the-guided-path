"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-AHQAF — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-ahqaf
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Ahqaf",
  arabicName: "الأحقاف",
  meaning: "The Sand Dunes",
  number: 46,
  ayahCount: 35,
  period: "Makki",
  juz: 26,
  movements: 4,
  thesis:
    "The closing movement of the Ha Mim symphony — a surah that holds a mother's labor pain and a civilization's annihilation in the same breath, and asks whether the capacity for gratitude formed between a child and their parents is the same capacity that determines whether a person, a people, or an entire world survives the arrival of truth.",
  reflectionUrl: "/surahs/al-ahqaf",
  readTime: "19 min read",

  heartVerse: {
    arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا ۖ حَمَلَتْهُ أُمُّهُ كُرْهًا وَوَضَعَتْهُ كُرْهًا ۖ وَحَمْلُهُ وَفِصَالُهُ ثَلَاثُونَ شَهْرًا",
    ayahRef: "46:15",
    translation: "And We have enjoined upon the human being goodness toward their parents. His mother carried him with hardship and gave birth to him with hardship, and his bearing and weaning is thirty months.",
    why: "The surah's gravitational center. The Quran does not sentimentalize motherhood — it names the cost. The word kurh means difficulty borne against the body's comfort. From this single verse jurists derived the minimum viable pregnancy (six months). The prayer that follows — a forty-year-old asking for gratitude, righteousness, and the repair of their offspring — moves backward to parents, upward to God, and forward to the next generation.",
  },

  audio: { surahNumber: 46, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "حمٓ", translation: "Ha, Mim." },
    { ayah: 2, arabic: "تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْحَكِيمِ", translation: "The revelation of the Book is from Allah, the Mighty, the Wise." },
    { ayah: 3, arabic: "مَا خَلَقْنَا السَّمَاوَاتِ وَالْأَرْضَ وَمَا بَيْنَهُمَا إِلَّا بِالْحَقِّ وَأَجَلٍ مُّسَمًّى ۚ وَالَّذِينَ كَفَرُوا عَمَّا أُنذِرُوا مُعْرِضُونَ", translation: "We did not create the heavens and the earth and what is between them except in truth and for a specified term. And those who disbelieve, from that of which they are warned, are turning away." },
    { ayah: 4, arabic: "قُلْ أَرَأَيْتُم مَّا تَدْعُونَ مِن دُونِ اللَّهِ أَرُونِي مَاذَا خَلَقُوا مِنَ الْأَرْضِ أَمْ لَهُمْ شِرْكٌ فِي السَّمَاوَاتِ ۖ ائْتُونِي بِكِتَابٍ مِّن قَبْلِ هَـٰذَا أَوْ أَثَارَةٍ مِّنْ عِلْمٍ إِن كُنتُمْ صَادِقِينَ", translation: "Say, 'Show me what those you invoke besides Allah have created of the earth, or do they have a share in the heavens? Bring me a scripture before this one, or a remnant of knowledge, if you are truthful.'" },
    { ayah: 5, arabic: "وَمَنْ أَضَلُّ مِمَّن يَدْعُو مِن دُونِ اللَّهِ مَن لَّا يَسْتَجِيبُ لَهُ إِلَىٰ يَوْمِ الْقِيَامَةِ وَهُمْ عَن دُعَائِهِمْ غَافِلُونَ", translation: "And who is more astray than one who invokes besides Allah those who will not respond to him until the Day of Resurrection, and they are unaware of their invocation?" },
    { ayah: 6, arabic: "وَإِذَا حُشِرَ النَّاسُ كَانُوا لَهُمْ أَعْدَاءً وَكَانُوا بِعِبَادَتِهِمْ كَافِرِينَ", translation: "And when the people are gathered, they will be enemies to them, and they will deny their worship." },
    { ayah: 7, arabic: "وَإِذَا تُتْلَىٰ عَلَيْهِمْ آيَاتُنَا بَيِّنَاتٍ قَالَ الَّذِينَ كَفَرُوا لِلْحَقِّ لَمَّا جَاءَهُمْ هَـٰذَا سِحْرٌ مُّبِينٌ", translation: "And when Our clear signs are recited to them, those who disbelieve say of the truth when it comes to them, 'This is clear magic.'" },
    { ayah: 8, arabic: "أَمْ يَقُولُونَ افْتَرَاهُ ۖ قُلْ إِنِ افْتَرَيْتُهُ فَلَا تَمْلِكُونَ لِي مِنَ اللَّهِ شَيْئًا ۖ هُوَ أَعْلَمُ بِمَا تُفِيضُونَ فِيهِ ۖ كَفَىٰ بِهِ شَهِيدًا بَيْنِي وَبَيْنَكُمْ ۖ وَهُوَ الْغَفُورُ الرَّحِيمُ", translation: "Or do they say, 'He has fabricated it'? Say, 'If I have fabricated it, then you cannot protect me from Allah at all. He knows best what you engage in. Sufficient is He as a witness between me and you. And He is the Forgiving, the Merciful.'" },
    { ayah: 9, arabic: "قُلْ مَا كُنتُ بِدْعًا مِّنَ الرُّسُلِ وَمَا أَدْرِي مَا يُفْعَلُ بِي وَلَا بِكُمْ ۖ إِنْ أَتَّبِعُ إِلَّا مَا يُوحَىٰ إِلَيَّ وَمَا أَنَا إِلَّا نَذِيرٌ مُّبِينٌ", translation: "Say, 'I am not something new among the messengers, nor do I know what will be done with me or with you. I only follow what is revealed to me, and I am only a clear warner.'" },
    { ayah: 10, arabic: "قُلْ أَرَأَيْتُمْ إِن كَانَ مِنْ عِندِ اللَّهِ وَكَفَرْتُم بِهِ وَشَهِدَ شَاهِدٌ مِّن بَنِي إِسْرَائِيلَ عَلَىٰ مِثْلِهِ فَآمَنَ وَاسْتَكْبَرْتُمْ ۖ إِنَّ اللَّهَ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ", translation: "Say, 'Have you considered: if it is from Allah and you disbelieved in it while a witness from the Children of Israel has testified to something similar and believed while you were arrogant? Indeed, Allah does not guide the wrongdoing people.'" },
    { ayah: 11, arabic: "وَقَالَ الَّذِينَ كَفَرُوا لِلَّذِينَ آمَنُوا لَوْ كَانَ خَيْرًا مَّا سَبَقُونَا إِلَيْهِ ۚ وَإِذْ لَمْ يَهْتَدُوا بِهِ فَسَيَقُولُونَ هَـٰذَا إِفْكٌ قَدِيمٌ", translation: "And those who disbelieve say of those who believe, 'If it had been good, they would not have preceded us to it.' And when they are not guided by it, they will say, 'This is an ancient falsehood.'" },
    { ayah: 12, arabic: "وَمِن قَبْلِهِ كِتَابُ مُوسَىٰ إِمَامًا وَرَحْمَةً ۚ وَهَـٰذَا كِتَابٌ مُّصَدِّقٌ لِّسَانًا عَرَبِيًّا لِّيُنذِرَ الَّذِينَ ظَلَمُوا وَبُشْرَىٰ لِلْمُحْسِنِينَ", translation: "And before it was the Book of Musa as a guide and a mercy. And this is a confirming Book in an Arabic tongue to warn those who have wronged and as good tidings for the doers of good." },
    { ayah: 13, arabic: "إِنَّ الَّذِينَ قَالُوا رَبُّنَا اللَّهُ ثُمَّ اسْتَقَامُوا فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ", translation: "Indeed, those who said, 'Our Lord is Allah,' and then remained upright — no fear will there be concerning them, nor will they grieve." },
    { ayah: 14, arabic: "أُولَـٰئِكَ أَصْحَابُ الْجَنَّةِ خَالِدِينَ فِيهَا جَزَاءً بِمَا كَانُوا يَعْمَلُونَ", translation: "Those are the companions of paradise, abiding eternally therein as reward for what they used to do." },
    { ayah: 15, arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا ۖ حَمَلَتْهُ أُمُّهُ كُرْهًا وَوَضَعَتْهُ كُرْهًا ۖ وَحَمْلُهُ وَفِصَالُهُ ثَلَاثُونَ شَهْرًا ۚ حَتَّىٰ إِذَا بَلَغَ أَشُدَّهُ وَبَلَغَ أَرْبَعِينَ سَنَةً قَالَ رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي ۖ إِنِّي تُبْتُ إِلَيْكَ وَإِنِّي مِنَ الْمُسْلِمِينَ", translation: "And We have enjoined upon the human being goodness toward his parents. His mother carried him with hardship and gave birth to him with hardship, and his bearing and weaning is thirty months. Until, when he reaches maturity and reaches forty years, he says, 'My Lord, enable me to be grateful for Your favor which You bestowed upon me and upon my parents, and to do righteous deeds that please You, and make righteous for me my offspring. Indeed, I have turned to You, and indeed, I am of the Muslims.'" },
    { ayah: 16, arabic: "أُولَـٰئِكَ الَّذِينَ نَتَقَبَّلُ عَنْهُمْ أَحْسَنَ مَا عَمِلُوا وَنَتَجَاوَزُ عَن سَيِّئَاتِهِمْ فِي أَصْحَابِ الْجَنَّةِ ۖ وَعْدَ الصِّدْقِ الَّذِي كَانُوا يُوعَدُونَ", translation: "Those are the ones from whom We will accept the best of what they did and overlook their misdeeds, among the companions of paradise. That is the true promise they were promised." },
    { ayah: 17, arabic: "وَالَّذِي قَالَ لِوَالِدَيْهِ أُفٍّ لَّكُمَا أَتَعِدَانِنِي أَنْ أُخْرَجَ وَقَدْ خَلَتِ الْقُرُونُ مِن قَبْلِي وَهُمَا يَسْتَغِيثَانِ اللَّهَ وَيْلَكَ آمِنْ إِنَّ وَعْدَ اللَّهِ حَقٌّ فَيَقُولُ مَا هَـٰذَا إِلَّا أَسَاطِيرُ الْأَوَّلِينَ", translation: "But the one who says to his parents, 'Uff to you both! Do you promise me that I will be brought forth when generations before me have already passed?' And they call to Allah for help, saying, 'Woe to you — believe! Indeed, the promise of Allah is true.' But he says, 'This is nothing but legends of the former peoples.'" },
    { ayah: 18, arabic: "أُولَـٰئِكَ الَّذِينَ حَقَّ عَلَيْهِمُ الْقَوْلُ فِي أُمَمٍ قَدْ خَلَتْ مِن قَبْلِهِم مِّنَ الْجِنِّ وَالْإِنسِ ۖ إِنَّهُمْ كَانُوا خَاسِرِينَ", translation: "Those are the ones upon whom the decree has come into effect among nations that passed before them of jinn and mankind. Indeed, they were losers." },
    { ayah: 19, arabic: "وَلِكُلٍّ دَرَجَاتٌ مِّمَّا عَمِلُوا ۖ وَلِيُوَفِّيَهُمْ أَعْمَالَهُمْ وَهُمْ لَا يُظْلَمُونَ", translation: "And for all there are degrees for what they have done, and so He may fully compensate them for their deeds, and they will not be wronged." },
    { ayah: 20, arabic: "وَيَوْمَ يُعْرَضُ الَّذِينَ كَفَرُوا عَلَى النَّارِ أَذْهَبْتُمْ طَيِّبَاتِكُمْ فِي حَيَاتِكُمُ الدُّنْيَا وَاسْتَمْتَعْتُم بِهَا فَالْيَوْمَ تُجْزَوْنَ عَذَابَ الْهُونِ بِمَا كُنتُمْ تَسْتَكْبِرُونَ فِي الْأَرْضِ بِغَيْرِ الْحَقِّ وَبِمَا كُنتُمْ تَفْسُقُونَ", translation: "And the Day those who disbelieved are exposed to the Fire: 'You exhausted your pleasures during your worldly life and enjoyed them, so today you will be awarded the punishment of humiliation because you were arrogant upon the earth without right and because you were defiantly disobedient.'" },
    { ayah: 21, arabic: "وَاذْكُرْ أَخَا عَادٍ إِذْ أَنذَرَ قَوْمَهُ بِالْأَحْقَافِ وَقَدْ خَلَتِ النُّذُرُ مِن بَيْنِ يَدَيْهِ وَمِنْ خَلْفِهِ أَلَّا تَعْبُدُوا إِلَّا اللَّهَ إِنِّي أَخَافُ عَلَيْكُمْ عَذَابَ يَوْمٍ عَظِيمٍ", translation: "And mention the brother of ʿĀd, when he warned his people at the sand dunes — and warners had already passed before him and after him — saying, 'Worship none but Allah. Indeed, I fear for you the punishment of a tremendous day.'" },
    { ayah: 22, arabic: "قَالُوا أَجِئْتَنَا لِتَأْفِكَنَا عَنْ آلِهَتِنَا فَأْتِنَا بِمَا تَعِدُنَا إِن كُنتَ مِنَ الصَّادِقِينَ", translation: "They said, 'Have you come to divert us from our gods? Then bring us what you promise us, if you are truthful.'" },
    { ayah: 23, arabic: "قَالَ إِنَّمَا الْعِلْمُ عِندَ اللَّهِ وَأُبَلِّغُكُم مَّا أُرْسِلْتُ بِهِ وَلَـٰكِنِّي أَرَاكُمْ قَوْمًا تَجْهَلُونَ", translation: "He said, 'The knowledge is only with Allah, and I convey to you that with which I have been sent, but I see you are a people behaving ignorantly.'" },
    { ayah: 24, arabic: "فَلَمَّا رَأَوْهُ عَارِضًا مُّسْتَقْبِلَ أَوْدِيَتِهِمْ قَالُوا هَـٰذَا عَارِضٌ مُّمْطِرُنَا ۚ بَلْ هُوَ مَا اسْتَعْجَلْتُم بِهِ ۖ رِيحٌ فِيهَا عَذَابٌ أَلِيمٌ", translation: "And when they saw it as a cloud approaching their valleys, they said, 'This is a cloud bringing us rain.' Rather, it is that for which you were impatient: a wind, within it a painful punishment." },
    { ayah: 25, arabic: "تُدَمِّرُ كُلَّ شَيْءٍ بِأَمْرِ رَبِّهَا فَأَصْبَحُوا لَا يُرَىٰ إِلَّا مَسَاكِنُهُمْ ۚ كَذَٰلِكَ نَجْزِي الْقَوْمَ الْمُجْرِمِينَ", translation: "Destroying everything by the command of its Lord. And they became such that nothing was visible except their dwellings. Thus do We recompense the criminal people." },
    { ayah: 26, arabic: "وَلَقَدْ مَكَّنَّاهُمْ فِيمَا إِن مَّكَّنَّاكُمْ فِيهِ وَجَعَلْنَا لَهُمْ سَمْعًا وَأَبْصَارًا وَأَفْئِدَةً فَمَا أَغْنَىٰ عَنْهُمْ سَمْعُهُمْ وَلَا أَبْصَارُهُمْ وَلَا أَفْئِدَتُهُم مِّن شَيْءٍ إِذْ كَانُوا يَجْحَدُونَ بِآيَاتِ اللَّهِ وَحَاقَ بِهِم مَّا كَانُوا بِهِ يَسْتَهْزِئُونَ", translation: "And We had established them in that which We have not established you, and We made for them hearing, sight, and hearts. But their hearing, sight, and hearts did not avail them at all when they rejected the signs of Allah, and they were enveloped by what they used to mock." },
    { ayah: 27, arabic: "وَلَقَدْ أَهْلَكْنَا مَا حَوْلَكُم مِّنَ الْقُرَىٰ وَصَرَّفْنَا الْآيَاتِ لَعَلَّهُمْ يَرْجِعُونَ", translation: "And We have already destroyed what surrounds you of cities, and We have diversified the signs that perhaps they might return." },
    { ayah: 28, arabic: "فَلَوْلَا نَصَرَهُمُ الَّذِينَ اتَّخَذُوا مِن دُونِ اللَّهِ قُرْبَانًا آلِهَةً ۖ بَلْ ضَلُّوا عَنْهُمْ ۚ وَذَٰلِكَ إِفْكُهُمْ وَمَا كَانُوا يَفْتَرُونَ", translation: "Then why did those they took besides Allah as gods to bring them nearer not aid them? But they vanished from them. And that was their falsehood and what they were inventing." },
    { ayah: 29, arabic: "وَإِذْ صَرَفْنَا إِلَيْكَ نَفَرًا مِّنَ الْجِنِّ يَسْتَمِعُونَ الْقُرْآنَ فَلَمَّا حَضَرُوهُ قَالُوا أَنصِتُوا ۖ فَلَمَّا قُضِيَ وَلَّوْا إِلَىٰ قَوْمِهِم مُّنذِرِينَ", translation: "And when We directed to you a group of jinn listening to the Quran, when they attended it they said, 'Be silent!' And when it was concluded, they went back to their people as warners." },
    { ayah: 30, arabic: "قَالُوا يَا قَوْمَنَا إِنَّا سَمِعْنَا كِتَابًا أُنزِلَ مِن بَعْدِ مُوسَىٰ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ يَهْدِي إِلَى الْحَقِّ وَإِلَىٰ طَرِيقٍ مُّسْتَقِيمٍ", translation: "They said, 'O our people, indeed we have heard a book revealed after Musa confirming what came before it, guiding to the truth and to a straight path.'" },
    { ayah: 31, arabic: "يَا قَوْمَنَا أَجِيبُوا دَاعِيَ اللَّهِ وَآمِنُوا بِهِ يَغْفِرْ لَكُم مِّن ذُنُوبِكُمْ وَيُجِرْكُم مِّنْ عَذَابٍ أَلِيمٍ", translation: "O our people, respond to the caller of Allah and believe in him; He will forgive you your sins and protect you from a painful punishment." },
    { ayah: 32, arabic: "وَمَن لَّا يُجِبْ دَاعِيَ اللَّهِ فَلَيْسَ بِمُعْجِزٍ فِي الْأَرْضِ وَلَيْسَ لَهُ مِن دُونِهِ أَوْلِيَاءُ ۚ أُولَـٰئِكَ فِي ضَلَالٍ مُّبِينٍ", translation: "And whoever does not respond to the caller of Allah will not escape on earth, and he will have no allies besides Him. Those are in clear error." },
    { ayah: 33, arabic: "أَوَلَمْ يَرَوْا أَنَّ اللَّهَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَلَمْ يَعْيَ بِخَلْقِهِنَّ بِقَادِرٍ عَلَىٰ أَن يُحْيِيَ الْمَوْتَىٰ ۚ بَلَىٰ إِنَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", translation: "Do they not see that Allah, who created the heavens and the earth and was not wearied by their creation, is able to give life to the dead? Yes indeed. He is over all things competent." },
    { ayah: 34, arabic: "وَيَوْمَ يُعْرَضُ الَّذِينَ كَفَرُوا عَلَى النَّارِ أَلَيْسَ هَـٰذَا بِالْحَقِّ ۖ قَالُوا بَلَىٰ وَرَبِّنَا ۚ قَالَ فَذُوقُوا الْعَذَابَ بِمَا كُنتُمْ تَكْفُرُونَ", translation: "And the Day those who disbelieve are exposed to the Fire: 'Is this not the truth?' They will say, 'Yes, by our Lord.' He will say, 'Then taste the punishment because you used to disbelieve.'" },
    { ayah: 35, arabic: "فَاصْبِرْ كَمَا صَبَرَ أُولُو الْعَزْمِ مِنَ الرُّسُلِ وَلَا تَسْتَعْجِل لَّهُمْ ۚ كَأَنَّهُمْ يَوْمَ يَرَوْنَ مَا يُوعَدُونَ لَمْ يَلْبَثُوا إِلَّا سَاعَةً مِّن نَّهَارٍ ۚ بَلَاغٌ ۚ فَهَلْ يُهْلَكُ إِلَّا الْقَوْمُ الْفَاسِقُونَ", translation: "So be patient, as the messengers of determination were patient, and do not be impatient for them. It will be — on the Day they see what they are promised — as though they had not remained except an hour of a day. This is a notification. And will any be destroyed except the defiantly disobedient people?" },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Closing Symphony",
      subtitle: "Four movements: defense → intimacy → destruction → witness",
      sections: [
        { ayahs: "1–14", title: "The Defense of the Book", color: "#4ecdc4", desc: "The seventh and final Ha Mim opening. The surah restates the case for revelation with the confidence of a closing witness: show me what your gods have created, bring me a scripture before this one, bring me any remnant of knowledge. The Prophet is told: I am not something new among the messengers. I only follow what is revealed." },
        { ayahs: "15–20", title: "The Intimate Center", color: "#C9A84C", isPivot: true, desc: "The surah turns from eschatology to the womb in a single breath. A mother's hardship named in bodily terms. Thirty months of bearing and weaning. A forty-year-old praying for gratitude and righteous offspring. Then the counter-figure: the child who says 'uff' and refuses to believe while the parents plead. Rejection of the message played out in a living room." },
        { ayahs: "21–28", title: "The Sand Dunes of ʿĀd", color: "#e07a8a", desc: "Hud warned his people at the ahqaf — the only mention of these sand dunes in the entire Quran. They saw a cloud approaching and said: this will bring us rain. It brought annihilation. By morning, nothing was visible except their dwellings. They had hearing, sight, and hearts — and none of it availed them." },
        { ayahs: "29–35", title: "The Jinn & the Final Command", color: "#9b7fd4", desc: "A group of jinn hear the Quran, hush each other, and within minutes become warners to their people. They accomplish in four ayahs what the Quraysh have resisted across thirty. The surah closes: be patient as the messengers of determination were patient. On the Day they see what was promised, it will feel like they lived an entire life in a single hour of an afternoon." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's concentric structure places the parental passage at its thematic center",
      pairs: [
        {
          left: { label: "Defense of Revelation", ayahs: "1–14", desc: "The Book from the Mighty, the Wise. Challenge to the deniers: bring evidence, bring a scripture, bring anything. The Prophet: I am not new among the messengers." },
          right: { label: "Witness & Patience", ayahs: "21–35", desc: "ʿĀd's destruction for refusing. The jinn's instant reception. Be patient as the ulu al-azm were patient. A lifetime compressed to an hour of a day." },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "Parents, Children & the Test of Reception", ayahs: "15–20",
        desc: "The most intimate human relationship as the template for every act of reception or refusal. The grateful child at forty, praying backward to parents and forward to offspring. The dismissive child who says uff to the truth.",
        note: "Everything before this builds the theological case. Everything after shows the consequences at civilizational scale (ʿĀd), at supernatural scale (the jinn), and at the scale of time itself (the hour-of-a-day image). The center argues that if you cannot receive the gift that arrived through your own mother's body, you will not receive the gift that arrives through the mouth of a prophet.",
      },
    },
    deductiveFunnel: {
      title: "The Parallel Witnesses",
      subtitle: "Two groups encounter truth — one refuses, one accepts. The surah places them side by side without commentary.",
      layers: [
        { depth: 1, label: "ʿĀd — Refusal", ayah: "21–25", arabic: "هَـٰذَا عَارِضٌ مُّمْطِرُنَا", desc: "A human civilization with every advantage — hearing, sight, hearts, and power exceeding what the Quraysh possessed. They saw the approaching cloud and called it rain. It was annihilation. By morning: empty dwellings. The faculties themselves become useless when the will to perceive is absent.", color: "#e07a8a" },
        { depth: 2, label: "The Jinn — Reception", ayah: "29–32", arabic: "قَالُوا أَنصِتُوا", desc: "A group of jinn encounter the Quran for the first time with no preparation. They hush each other. They listen. They identify it as confirming what came before, call their people to respond, and warn of consequences. In four ayahs they become what the Quraysh refuse to become: receivers who carry the message to others.", color: "#4ecdc4" },
        { depth: 3, label: "The Domestic Mirror", ayah: "15–17", arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ إِحْسَانًا", desc: "The same pattern at the smallest scale. Two children, same parents. One reaches forty and prays for gratitude. The other says uff and calls resurrection a fairy tale. The family argument and the civilizational one are the same refusal at different scales.", color: "#9b7fd4" },
        { depth: 4, label: "The Question Left Hanging", ayah: "35", arabic: "فَاصْبِرْ كَمَا صَبَرَ أُولُو الْعَزْمِ", desc: "ʿĀd refused and was erased. The jinn accepted instantly. The Quraysh are positioned between these two responses, and the surah leaves the question hanging: which of these two will yours be?", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The farewell surah of the Ha Mim series — what it excludes completes what the series has said",
      absences: [
        { item: "No legislative content", note: "No legal rulings, no ritual instructions, no communal regulations. The surah is entirely occupied with whether the message will be received or refused. There are no instructions for how to live once you believe — only the question of whether you will believe at all." },
        { item: "No extended prophetic biography", note: "Hud appears but only as a voice delivering a warning. We learn almost nothing about him as a person. The ʿĀd narrative is compressed to its essential elements: warning, refusal, wind, silence. The economy is striking compared to the fuller treatments in Surahs 7, 11, and 26." },
        { item: "No address to the believers as a community", note: "No 'O you who believe.' The surah speaks to the Prophet, through the Prophet, about the people who refuse. The believers are implied but never directly addressed with instructions." },
        { item: "No resolution of the parental tension", note: "The child who says uff and the parents who plead — the surah does not resolve this scene. Both voices are given and the tension is left hanging. Rejection played out in a living room, between people who love each other." },
        { item: "No cosmic spectacle in the jinn encounter", note: "The jinn arrive, listen, respond, and leave. Four ayahs. No fireworks, no dramatic revelation scene. The most significant moment of inter-species reception in the Quran is handled with the restraint of a closing argument that trusts the jury has been listening." },
      ],
    },
  },

  contentNodes: [
    { concept: "The parental verse and the thirty-month calculation", type: "surah-specific", articleSlug: "parental-verse-thirty-months-46-15" },
    { concept: "Rain or annihilation — ʿĀd's fatal misreading", type: "surah-specific", articleSlug: "rain-annihilation-ad-46-24" },
    { concept: "The jinn as parallel witnesses to the Quraysh", type: "cross-surah", articleSlug: "jinn-witnesses-46-72" },
    { concept: "Ulu al-azm — the patience of the greatest messengers", type: "cross-surah", articleSlug: "ulu-azm-patience-46-35" },
  ],
};

const TABS = [
  { id: "symphony", label: "Symphony" },
  { id: "ring", label: "Ring" },
  { id: "witnesses", label: "Witnesses" },
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
        <div className="flex-1 min-w-0"><div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div><div ref={progressRef} onClick={seek} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"><div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div></div></div>
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
  return (<div className="space-y-5">{verses.map((v) => (<div key={v.ayah} className="space-y-1"><p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic}{" "}<span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p><p className="text-sm text-cream-muted/60 font-body">{v.translation}</p></div>))}</div>);
}

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.sections.map((sec, i) => (<div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span><span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span></div><p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>{sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}</div>))}</div></div>);
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div>{data.pairs.map((pair, i) => (<div key={i} className="flex gap-2"><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}><div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div><p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p></div><div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}><div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div><p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p></div></div>))}<div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"><div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div><p className="text-sm italic text-cream font-body">{data.center.desc}</p><p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p></div></div>);
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-2">{data.layers.map((layer, i) => (<button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}><div className="flex items-center justify-between"><span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span><span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span></div><p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p>{expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}</button>))}</div><div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Civilization refused → jinn accepted → family mirrors both → the question hangs</div></div>);
}

function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) {
  return (<div className="space-y-5"><div><h3 className="text-lg font-serif text-cream">{data.title}</h3><p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p></div><div className="space-y-3">{data.absences.map((a, i) => (<div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"><div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div><p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p></div>))}</div></div>);
}

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
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">7th</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ha Mim</div></div>
          </div>
        </header>
        <OrnamentDivider />
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">{TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button>))}</div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "symphony" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "witnesses" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
