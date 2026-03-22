"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH GHAFIR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/ghafir
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Ghafir",
  arabicName: "غَافِر",
  meaning: "The Forgiver",
  number: 40,
  ayahCount: 85,
  period: "Makki",
  juz: 24,
  movements: 4,
  thesis:
    "A surah that holds God's mercy and God's severity in the same breath, places a single believing voice at the center of an empire's denial, and asks you to decide which direction you face while the door is still open.",
  reflectionUrl: "/surahs/ghafir",
  readTime: "22 min read",

  heartVerse: {
    arabic: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ",
    ayahRef: "40:60",
    translation: "And your Lord said, 'Call upon Me; I will respond to you.'",
    why: "After eighty ayahs of argument, counter-argument, historical evidence, and cosmic testimony, the surah arrives at this sentence. One verb. One promise. The entire surah has been building toward the question of whether people will call upon God or upon something else, and here the invitation is issued in its most undressed form.",
  },

  audio: { surahNumber: 40, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "حم", translation: "Ha. Mim." },
    { ayah: 2, arabic: "تَنزِيلُ الْكِتَابِ مِنَ اللَّهِ الْعَزِيزِ الْعَلِيمِ", translation: "The revelation of the Book is from Allah, the Almighty, the All-Knowing." },
    { ayah: 3, arabic: "غَافِرِ الذَّنبِ وَقَابِلِ التَّوْبِ شَدِيدِ الْعِقَابِ ذِي الطَّوْلِ", translation: "Forgiver of sin, Accepter of repentance, Severe in punishment, Owner of abundance." },
    { ayah: 4, arabic: "مَا يُجَادِلُ فِي آيَاتِ اللَّهِ إِلَّا الَّذِينَ كَفَرُوا", translation: "No one disputes the signs of Allah except those who disbelieve." },
    { ayah: 5, arabic: "كَذَّبَتْ قَبْلَهُمْ قَوْمُ نُوحٍ وَالْأَحْزَابُ مِن بَعْدِهِمْ", translation: "Before them the people of Nuh denied, and the factions after them." },
    { ayah: 6, arabic: "وَكَذَٰلِكَ حَقَّتْ كَلِمَتُ رَبِّكَ عَلَى الَّذِينَ كَفَرُوا أَنَّهُمْ أَصْحَابُ النَّارِ", translation: "And thus the word of your Lord has come into effect upon those who disbelieved — that they are companions of the Fire." },
    { ayah: 7, arabic: "الَّذِينَ يَحْمِلُونَ الْعَرْشَ وَمَنْ حَوْلَهُ يُسَبِّحُونَ بِحَمْدِ رَبِّهِمْ وَيُؤْمِنُونَ بِهِ وَيَسْتَغْفِرُونَ لِلَّذِينَ آمَنُوا", translation: "Those who carry the Throne and those around it exalt with praise of their Lord, believe in Him, and ask forgiveness for those who have believed." },
    { ayah: 8, arabic: "رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا", translation: "Our Lord, You have encompassed all things in mercy and knowledge, so forgive those who have repented." },
    { ayah: 9, arabic: "وَقِهِمُ السَّيِّئَاتِ ۚ وَمَن تَقِ السَّيِّئَاتِ يَوْمَئِذٍ فَقَدْ رَحِمْتَهُ", translation: "And protect them from evil deeds. Whoever You protect from evil deeds on that Day — You have shown him mercy." },
    { ayah: 10, arabic: "إِنَّ الَّذِينَ كَفَرُوا يُنَادَوْنَ لَمَقْتُ اللَّهِ أَكْبَرُ مِن مَّقْتِكُمْ أَنفُسَكُمْ", translation: "Those who disbelieved will be told: The hatred of Allah for you is greater than your hatred of yourselves." },
    { ayah: 11, arabic: "قَالُوا رَبَّنَا أَمَتَّنَا اثْنَتَيْنِ وَأَحْيَيْتَنَا اثْنَتَيْنِ فَاعْتَرَفْنَا بِذُنُوبِنَا", translation: "They say: Our Lord, You have caused us to die twice and given us life twice, and we have confessed our sins." },
    { ayah: 12, arabic: "ذَٰلِكُم بِأَنَّهُ إِذَا دُعِيَ اللَّهُ وَحْدَهُ كَفَرْتُمْ ۖ وَإِن يُشْرَكْ بِهِ تُؤْمِنُوا", translation: "That is because when Allah alone was called upon, you disbelieved; but when partners were associated with Him, you believed." },
    { ayah: 13, arabic: "هُوَ الَّذِي يُرِيكُمْ آيَاتِهِ وَيُنَزِّلُ لَكُم مِّنَ السَّمَاءِ رِزْقًا", translation: "He is the one who shows you His signs and sends down provision from the sky for you." },
    { ayah: 14, arabic: "فَادْعُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ", translation: "So call upon Allah, making the religion sincerely for Him, even if the disbelievers dislike it." },
    { ayah: 15, arabic: "رَفِيعُ الدَّرَجَاتِ ذُو الْعَرْشِ يُلْقِي الرُّوحَ مِنْ أَمْرِهِ عَلَىٰ مَن يَشَاءُ مِنْ عِبَادِهِ", translation: "Exalter of ranks, Owner of the Throne — He places the spirit of His command upon whom He wills of His servants." },
    { ayah: 16, arabic: "يَوْمَ هُم بَارِزُونَ ۖ لَا يَخْفَىٰ عَلَى اللَّهِ مِنْهُمْ شَيْءٌ", translation: "The Day they come forth — nothing of them will be concealed from Allah." },
    { ayah: 17, arabic: "لِّمَنِ الْمُلْكُ الْيَوْمَ ۖ لِلَّهِ الْوَاحِدِ الْقَهَّارِ", translation: "To whom belongs the sovereignty this Day? To Allah, the One, the Prevailing." },
    { ayah: 18, arabic: "الْيَوْمَ تُجْزَىٰ كُلُّ نَفْسٍ بِمَا كَسَبَتْ ۚ لَا ظُلْمَ الْيَوْمَ", translation: "This Day every soul will be recompensed for what it earned. No injustice today." },
    { ayah: 19, arabic: "يَعْلَمُ خَائِنَةَ الْأَعْيُنِ وَمَا تُخْفِي الصُّدُورُ", translation: "He knows the treachery of the eyes and what the chests conceal." },
    { ayah: 20, arabic: "وَاللَّهُ يَقْضِي بِالْحَقِّ ۖ وَالَّذِينَ يَدْعُونَ مِن دُونِهِ لَا يَقْضُونَ بِشَيْءٍ", translation: "Allah judges with truth, and those they call upon besides Him judge nothing at all." },
    { ayah: 21, arabic: "أَوَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ كَانُوا مِن قَبْلِهِمْ", translation: "Have they not traveled through the land and seen what was the end of those who were before them?" },
    { ayah: 22, arabic: "كَانُوا هُمْ أَشَدَّ مِنْهُمْ قُوَّةً وَآثَارًا فِي الْأَرْضِ فَأَخَذَهُمُ اللَّهُ بِذُنُوبِهِمْ", translation: "They were greater in strength and in traces upon the land, but Allah seized them for their sins." },
    { ayah: 23, arabic: "وَلَقَدْ أَرْسَلْنَا مُوسَىٰ بِآيَاتِنَا وَسُلْطَانٍ مُّبِينٍ", translation: "And We sent Musa with Our signs and a clear authority." },
    { ayah: 24, arabic: "إِلَىٰ فِرْعَوْنَ وَهَامَانَ وَقَارُونَ فَقَالُوا سَاحِرٌ كَذَّابٌ", translation: "To Pharaoh, Haman, and Qarun — but they said, 'A magician, a great liar.'" },
    { ayah: 25, arabic: "فَلَمَّا جَاءَهُم بِالْحَقِّ مِنْ عِندِنَا قَالُوا اقْتُلُوا أَبْنَاءَ الَّذِينَ آمَنُوا مَعَهُ", translation: "When he brought them the truth from Us, they said, 'Kill the sons of those who believe with him.'" },
    { ayah: 26, arabic: "وَقَالَ فِرْعَوْنُ ذَرُونِي أَقْتُلْ مُوسَىٰ وَلْيَدْعُ رَبَّهُ", translation: "Pharaoh said, 'Let me kill Musa, and let him call upon his Lord.'" },
    { ayah: 27, arabic: "وَقَالَ مُوسَىٰ إِنِّي عُذْتُ بِرَبِّي وَرَبِّكُم مِّن كُلِّ مُتَكَبِّرٍ", translation: "Musa said, 'I seek refuge in my Lord and your Lord from every arrogant one.'" },
    { ayah: 28, arabic: "وَقَالَ رَجُلٌ مُّؤْمِنٌ مِّنْ آلِ فِرْعَوْنَ يَكْتُمُ إِيمَانَهُ أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ", translation: "A believing man from Pharaoh's family who had concealed his faith said, 'Would you kill a man because he says, My Lord is Allah?'" },
    { ayah: 29, arabic: "يَا قَوْمِ لَكُمُ الْمُلْكُ الْيَوْمَ ظَاهِرِينَ فِي الْأَرْضِ", translation: "O my people, sovereignty is yours today, dominant in the land." },
    { ayah: 30, arabic: "يَا قَوْمِ إِنِّي أَخَافُ عَلَيْكُم مِّثْلَ يَوْمِ الْأَحْزَابِ", translation: "O my people, I fear for you something like the Day of the Confederates." },
    { ayah: 31, arabic: "مِثْلَ دَأْبِ قَوْمِ نُوحٍ وَعَادٍ وَثَمُودَ وَالَّذِينَ مِن بَعْدِهِمْ", translation: "Like the custom of the people of Nuh, 'Ad, Thamud, and those after them." },
    { ayah: 32, arabic: "وَيَا قَوْمِ إِنِّي أَخَافُ عَلَيْكُمْ يَوْمَ التَّنَادِ", translation: "O my people, I fear for you the Day of Calling Out." },
    { ayah: 33, arabic: "يَوْمَ تُوَلُّونَ مُدْبِرِينَ مَا لَكُم مِّنَ اللَّهِ مِنْ عَاصِمٍ", translation: "A day you will turn your backs fleeing, having no protector from Allah." },
    { ayah: 34, arabic: "وَلَقَدْ جَاءَكُمْ يُوسُفُ مِن قَبْلُ بِالْبَيِّنَاتِ", translation: "And Yusuf had come to you before with clear proofs." },
    { ayah: 35, arabic: "الَّذِينَ يُجَادِلُونَ فِي آيَاتِ اللَّهِ بِغَيْرِ سُلْطَانٍ أَتَاهُمْ ۖ كَبُرَ مَقْتًا عِندَ اللَّهِ", translation: "Those who dispute about the signs of Allah without authority — great is hatred of them in the sight of Allah." },
    { ayah: 36, arabic: "وَقَالَ فِرْعَوْنُ يَا هَامَانُ ابْنِ لِي صَرْحًا لَّعَلِّي أَبْلُغُ الْأَسْبَابَ", translation: "Pharaoh said, 'O Haman, build for me a tower that I might reach the pathways.'" },
    { ayah: 37, arabic: "أَسْبَابَ السَّمَاوَاتِ فَأَطَّلِعَ إِلَىٰ إِلَٰهِ مُوسَىٰ وَإِنِّي لَأَظُنُّهُ كَاذِبًا", translation: "The pathways into the heavens, and look at the God of Musa, for indeed I think he is a liar." },
    { ayah: 38, arabic: "وَقَالَ الَّذِي آمَنَ يَا قَوْمِ اتَّبِعُونِ أَهْدِكُمْ سَبِيلَ الرَّشَادِ", translation: "The one who believed said, 'O my people, follow me, I will guide you to the path of right conduct.'" },
    { ayah: 39, arabic: "يَا قَوْمِ إِنَّمَا هَٰذِهِ الْحَيَاةُ الدُّنْيَا مَتَاعٌ", translation: "O my people, this worldly life is only temporary enjoyment." },
    { ayah: 40, arabic: "مَنْ عَمِلَ سَيِّئَةً فَلَا يُجْزَىٰ إِلَّا مِثْلَهَا ۖ وَمَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ", translation: "Whoever does evil will not be recompensed except by the like thereof; and whoever does good, male or female, while being a believer..." },
    { ayah: 41, arabic: "وَيَا قَوْمِ مَا لِي أَدْعُوكُمْ إِلَى النَّجَاةِ وَتَدْعُونَنِي إِلَى النَّارِ", translation: "O my people, how is it that I call you to salvation while you call me to the Fire?" },
    { ayah: 42, arabic: "تَدْعُونَنِي لِأَكْفُرَ بِاللَّهِ وَأُشْرِكَ بِهِ مَا لَيْسَ لِي بِهِ عِلْمٌ", translation: "You call me to disbelieve in Allah and associate with Him that of which I have no knowledge." },
    { ayah: 43, arabic: "لَا جَرَمَ أَنَّمَا تَدْعُونَنِي إِلَيْهِ لَيْسَ لَهُ دَعْوَةٌ فِي الدُّنْيَا وَلَا فِي الْآخِرَةِ", translation: "Assuredly, that to which you call me has no call in this world or in the Hereafter." },
    { ayah: 44, arabic: "فَسَتَذْكُرُونَ مَا أَقُولُ لَكُمْ ۚ وَأُفَوِّضُ أَمْرِي إِلَى اللَّهِ", translation: "You will remember what I say to you. And I entrust my affair to Allah." },
    { ayah: 45, arabic: "فَوَقَاهُ اللَّهُ سَيِّئَاتِ مَا مَكَرُوا ۖ وَحَاقَ بِآلِ فِرْعَوْنَ سُوءُ الْعَذَابِ", translation: "So Allah protected him from the evils of what they plotted, and a terrible punishment enveloped Pharaoh's people." },
    { ayah: 46, arabic: "النَّارُ يُعْرَضُونَ عَلَيْهَا غُدُوًّا وَعَشِيًّا", translation: "The Fire — they are presented to it morning and evening." },
    { ayah: 47, arabic: "وَإِذْ يَتَحَاجُّونَ فِي النَّارِ فَيَقُولُ الضُّعَفَاءُ لِلَّذِينَ اسْتَكْبَرُوا", translation: "And when they argue in the Fire, and the weak say to those who were arrogant..." },
    { ayah: 48, arabic: "قَالَ الَّذِينَ اسْتَكْبَرُوا إِنَّا كُلٌّ فِيهَا إِنَّ اللَّهَ قَدْ حَكَمَ بَيْنَ الْعِبَادِ", translation: "Those who were arrogant say, 'Indeed, we are all in it. Indeed, Allah has judged between the servants.'" },
    { ayah: 49, arabic: "وَقَالَ الَّذِينَ فِي النَّارِ لِخَزَنَةِ جَهَنَّمَ ادْعُوا رَبَّكُمْ يُخَفِّفْ عَنَّا يَوْمًا مِّنَ الْعَذَابِ", translation: "And those in the Fire say to the keepers of Hell, 'Call upon your Lord to lighten for us a day of the punishment.'" },
    { ayah: 50, arabic: "قَالُوا أَوَلَمْ تَكُ تَأْتِيكُمْ رُسُلُكُم بِالْبَيِّنَاتِ", translation: "They say, 'Did your messengers not come to you with clear proofs?'" },
    { ayah: 51, arabic: "إِنَّا لَنَنصُرُ رُسُلَنَا وَالَّذِينَ آمَنُوا فِي الْحَيَاةِ الدُّنْيَا وَيَوْمَ يَقُومُ الْأَشْهَادُ", translation: "Indeed, We will support Our messengers and those who believed during the life of this world and on the Day the witnesses stand." },
    { ayah: 52, arabic: "يَوْمَ لَا يَنفَعُ الظَّالِمِينَ مَعْذِرَتُهُمْ ۖ وَلَهُمُ اللَّعْنَةُ وَلَهُمْ سُوءُ الدَّارِ", translation: "The Day their excuse will not benefit the wrongdoers, and for them is the curse and the worst home." },
    { ayah: 53, arabic: "وَلَقَدْ آتَيْنَا مُوسَى الْهُدَىٰ وَأَوْرَثْنَا بَنِي إِسْرَائِيلَ الْكِتَابَ", translation: "And We gave Musa guidance and caused the Children of Israel to inherit the Scripture." },
    { ayah: 54, arabic: "هُدًى وَذِكْرَىٰ لِأُولِي الْأَلْبَابِ", translation: "A guidance and a reminder for those of understanding." },
    { ayah: 55, arabic: "فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ وَاسْتَغْفِرْ لِذَنبِكَ", translation: "So be patient; indeed, the promise of Allah is truth. And seek forgiveness for your sin." },
    { ayah: 56, arabic: "إِنَّ الَّذِينَ يُجَادِلُونَ فِي آيَاتِ اللَّهِ بِغَيْرِ سُلْطَانٍ أَتَاهُمْ ۙ إِن فِي صُدُورِهِمْ إِلَّا كِبْرٌ", translation: "Those who dispute about the signs of Allah without authority — there is nothing in their chests except grandeur they will never attain." },
    { ayah: 57, arabic: "لَخَلْقُ السَّمَاوَاتِ وَالْأَرْضِ أَكْبَرُ مِنْ خَلْقِ النَّاسِ وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يَعْلَمُونَ", translation: "The creation of the heavens and earth is greater than the creation of mankind, but most people do not know." },
    { ayah: 58, arabic: "وَمَا يَسْتَوِي الْأَعْمَىٰ وَالْبَصِيرُ وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَلَا الْمُسِيءُ", translation: "And not equal are the blind and the seeing, nor those who believe and do good and the evildoer." },
    { ayah: 59, arabic: "إِنَّ السَّاعَةَ لَآتِيَةٌ لَّا رَيْبَ فِيهَا وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يُؤْمِنُونَ", translation: "Indeed, the Hour is coming — no doubt about it — but most people do not believe." },
    { ayah: 60, arabic: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ", translation: "And your Lord said, 'Call upon Me; I will respond to you.'" },
    { ayah: 61, arabic: "اللَّهُ الَّذِي جَعَلَ لَكُمُ اللَّيْلَ لِتَسْكُنُوا فِيهِ وَالنَّهَارَ مُبْصِرًا", translation: "Allah is the one who made for you the night for rest and the day for seeing." },
    { ayah: 62, arabic: "ذَٰلِكُمُ اللَّهُ رَبُّكُمْ خَالِقُ كُلِّ شَيْءٍ لَّا إِلَٰهَ إِلَّا هُوَ", translation: "That is Allah, your Lord, Creator of all things. There is no god but Him." },
    { ayah: 63, arabic: "كَذَٰلِكَ يُؤْفَكُ الَّذِينَ كَانُوا بِآيَاتِ اللَّهِ يَجْحَدُونَ", translation: "Thus are deluded those who used to deny the signs of Allah." },
    { ayah: 64, arabic: "اللَّهُ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ قَرَارًا وَالسَّمَاءَ بِنَاءً وَصَوَّرَكُمْ فَأَحْسَنَ صُوَرَكُمْ", translation: "Allah made the earth a stable ground and the sky a structure and formed you and perfected your forms." },
    { ayah: 65, arabic: "هُوَ الْحَيُّ لَا إِلَٰهَ إِلَّا هُوَ فَادْعُوهُ مُخْلِصِينَ لَهُ الدِّينَ", translation: "He is the Living; there is no god but Him. So call upon Him, making the religion sincerely for Him." },
    { ayah: 66, arabic: "قُلْ إِنِّي نُهِيتُ أَنْ أَعْبُدَ الَّذِينَ تَدْعُونَ مِن دُونِ اللَّهِ", translation: "Say: Indeed, I have been forbidden to worship those you call upon besides Allah." },
    { ayah: 67, arabic: "هُوَ الَّذِي خَلَقَكُم مِّن تُرَابٍ ثُمَّ مِن نُّطْفَةٍ ثُمَّ مِنْ عَلَقَةٍ", translation: "He is the one who created you from dust, then from a sperm-drop, then from a clinging clot." },
    { ayah: 68, arabic: "هُوَ الَّذِي يُحْيِي وَيُمِيتُ ۖ فَإِذَا قَضَىٰ أَمْرًا فَإِنَّمَا يَقُولُ لَهُ كُن فَيَكُونُ", translation: "He is the one who gives life and causes death. When He decrees a matter, He only says to it, 'Be,' and it is." },
    { ayah: 69, arabic: "أَلَمْ تَرَ إِلَى الَّذِينَ يُجَادِلُونَ فِي آيَاتِ اللَّهِ أَنَّىٰ يُصْرَفُونَ", translation: "Have you not seen those who dispute about the signs of Allah — how are they turned away?" },
    { ayah: 70, arabic: "الَّذِينَ كَذَّبُوا بِالْكِتَابِ وَبِمَا أَرْسَلْنَا بِهِ رُسُلَنَا ۖ فَسَوْفَ يَعْلَمُونَ", translation: "Those who denied the Book and that with which We sent Our messengers — they will know." },
    { ayah: 71, arabic: "إِذِ الْأَغْلَالُ فِي أَعْنَاقِهِمْ وَالسَّلَاسِلُ يُسْحَبُونَ", translation: "When the shackles are around their necks and the chains — they will be dragged." },
    { ayah: 72, arabic: "فِي الْحَمِيمِ ثُمَّ فِي النَّارِ يُسْجَرُونَ", translation: "Through boiling water, then in the Fire they will be filled." },
    { ayah: 73, arabic: "ثُمَّ قِيلَ لَهُمْ أَيْنَ مَا كُنتُمْ تُشْرِكُونَ", translation: "Then it is said to them, 'Where is what you used to associate?'" },
    { ayah: 74, arabic: "مِن دُونِ اللَّهِ ۖ قَالُوا ضَلُّوا عَنَّا بَل لَّمْ نَكُن نَّدْعُو مِن قَبْلُ شَيْئًا", translation: "Besides Allah?' They say, 'They have departed from us; rather, we did not used to invoke anything before.'" },
    { ayah: 75, arabic: "كَذَٰلِكَ يُضِلُّ اللَّهُ الْكَافِرِينَ", translation: "Thus does Allah lead astray the disbelievers." },
    { ayah: 76, arabic: "ذَٰلِكُم بِمَا كُنتُمْ تَفْرَحُونَ فِي الْأَرْضِ بِغَيْرِ الْحَقِّ وَبِمَا كُنتُمْ تَمْرَحُونَ", translation: "That is because you used to rejoice on earth without right, and because you used to behave insolently." },
    { ayah: 77, arabic: "ادْخُلُوا أَبْوَابَ جَهَنَّمَ خَالِدِينَ فِيهَا ۖ فَبِئْسَ مَثْوَى الْمُتَكَبِّرِينَ", translation: "Enter the gates of Hell to abide eternally therein. Wretched is the residence of the arrogant." },
    { ayah: 78, arabic: "فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ", translation: "So be patient; indeed, the promise of Allah is truth." },
    { ayah: 79, arabic: "فَإِمَّا نُرِيَنَّكَ بَعْضَ الَّذِي نَعِدُهُمْ أَوْ نَتَوَفَّيَنَّكَ فَإِلَيْنَا يُرْجَعُونَ", translation: "Whether We show you some of what We promise them or take you in death, to Us they will be returned." },
    { ayah: 80, arabic: "اللَّهُ الَّذِي جَعَلَ لَكُمُ الْأَنْعَامَ لِتَرْكَبُوا مِنْهَا وَمِنْهَا تَأْكُلُونَ", translation: "Allah is the one who made for you the livestock — some of them you ride and some of them you eat." },
    { ayah: 81, arabic: "وَلَكُمْ فِيهَا مَنَافِعُ وَلِتَبْلُغُوا عَلَيْهَا حَاجَةً فِي صُدُورِكُمْ", translation: "And you have in them benefits, and upon them you reach a need within your breasts." },
    { ayah: 82, arabic: "أَفَلَمْ يَسِيرُوا فِي الْأَرْضِ فَيَنظُرُوا كَيْفَ كَانَ عَاقِبَةُ الَّذِينَ مِن قَبْلِهِمْ", translation: "Have they not traveled through the land and seen what was the end of those before them?" },
    { ayah: 83, arabic: "كَانُوا أَكْثَرَ مِنْهُمْ وَأَشَدَّ قُوَّةً وَآثَارًا فِي الْأَرْضِ فَمَا أَغْنَىٰ عَنْهُم مَّا كَانُوا يَكْسِبُونَ", translation: "They were more numerous and greater in strength and in traces upon the land, but what they earned did not avail them." },
    { ayah: 84, arabic: "فَلَمَّا جَاءَتْهُمْ رُسُلُهُم بِالْبَيِّنَاتِ فَرِحُوا بِمَا عِندَهُم مِّنَ الْعِلْمِ", translation: "When their messengers came to them with clear proofs, they rejoiced in what they had of knowledge." },
    { ayah: 85, arabic: "فَلَمَّا رَأَوْا بَأْسَنَا قَالُوا آمَنَّا بِاللَّهِ وَحْدَهُ وَكَفَرْنَا بِمَا كُنَّا بِهِ مُشْرِكِينَ", translation: "When they saw Our punishment, they said, 'We believe in Allah alone and disbelieve in what we used to associate with Him.'" },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Four Movements",
      subtitle: "Declaration, drama, promise, reckoning",
      sections: [
        { ayahs: "1–20", title: "The Divine Self-Portrait", color: "#C9A84C", desc: "Four divine names in a single verse — Forgiver, Accepter of repentance, Severe in punishment, Owner of abundance. Then the angels praying for believers by name and relation, and a Judgment Day courtroom where the disbelievers confess too late." },
        { ayahs: "23–50", title: "The Believing Man's Speech", color: "#9b7fd4", isPivot: true, desc: "Musa sent to Pharaoh, stripped to argument alone — no miracles, no staff, no sea. Then the floor given to a man from Pharaoh's own household who concealed his faith and speaks. His argument builds through four moves: prudential reasoning, historical precedent, eschatological urgency, theological synthesis. Then: 'I entrust my affair to Allah.'" },
        { ayahs: "51–68", title: "The Promise and the Signs", color: "#4ecdc4", desc: "God's sworn promise to support His messengers. The diagnosis of kibr as the root of disputation. Then the simplest invitation in the Quran: 'Call upon Me; I will respond to you.' Creation as context for calling — night, day, earth, sky, the arc of a human life from dust to dust." },
        { ayahs: "69–85", title: "The Final Reckoning", color: "#e07a8a", desc: "Those who reject are dragged through boiling water. The hierarchy of tyranny collapses in the Fire. The established pattern of Allah: faith adopted only at the moment of visible consequence arrives too late. The door that was opened so wide in ayah 3 is shown shut." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Ghafir",
      subtitle: "The surah's entire architecture narrows to one man standing up",
      pairs: [
        {
          left: { label: "Divine Attributes", ayahs: "1–6", desc: "Forgiver, Accepter of repentance, Severe in punishment — the door swung wide open" },
          right: { label: "Sunnat Allah", ayahs: "69–85", desc: "Faith at the moment of punishment is too late — the door shown shut" },
          color: "#C9A84C",
        },
        {
          left: { label: "Angels' Intercession", ayahs: "7–9", desc: "The angels pray for believers, asking for their families, protection from evil deeds" },
          right: { label: "Creation Testifies", ayahs: "61–68", desc: "Night, day, earth, sky — all reasons to call upon the One who made them" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Too-Late Confession", ayahs: "10–20", desc: "Disbelievers confess on the Day — they believed when Allah was diluted, disbelieved when presented alone" },
          right: { label: "Call Upon Me", ayahs: "56–60", desc: "Arrogance diagnosed as the root of disputation, then the invitation: ud'uni astajib lakum" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Pharaoh's Plot", ayahs: "23–27", desc: "Pharaoh frames the murder of a prophet as public safety — the psychology of tyranny" },
          right: { label: "Pharaoh's Punishment", ayahs: "45–50", desc: "The Fire presented morning and evening — followers argue with leaders, hierarchy collapses" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Believing Man", ayahs: "28–44",
        desc: "A man who is not a prophet, has no army, no miracle — only his argument, his faith, and his willingness to speak.",
        note: "The entire surah, with all its cosmic architecture, narrows to one human being standing up. His final words — 'I entrust my affair to Allah' — are the hinge on which the surah turns.",
      },
    },
    deductiveFunnel: {
      title: "The Believing Man's Argument",
      subtitle: "Four rhetorical moves, each escalating the stakes",
      layers: [
        { depth: 1, label: "Prudential Reasoning", ayah: "28–29", arabic: "أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ", desc: "The calculated wager: if Musa is lying, his lie is upon him. If he is truthful, some of what he promises will strike you. An escape route that preserves Pharaoh's dignity.", color: "#4ecdc4" },
        { depth: 2, label: "Historical Precedent", ayah: "30–31", arabic: "إِنِّي أَخَافُ عَلَيْكُم مِّثْلَ يَوْمِ الْأَحْزَابِ", desc: "The destroyed civilizations — Nuh, 'Ad, Thamud. The word da'b (custom, pattern) is precise: destruction is not random divine anger but a recognizable sequence.", color: "#9b7fd4" },
        { depth: 3, label: "Eschatological Urgency", ayah: "32–33", arabic: "إِنِّي أَخَافُ عَلَيْكُمْ يَوْمَ التَّنَادِ", desc: "The Day of Mutual Calling — yawm al-tanad — unique to this surah. The Day of Judgment named by its sound: the day when every voice calls out and no one answers.", color: "#e07a8a" },
        { depth: 4, label: "Surrender", ayah: "44", arabic: "وَأُفَوِّضُ أَمْرِي إِلَى اللَّهِ", desc: "The verbal act of total delegation. He has argued, warned, invited, and testified. Now he releases the outcome. This is the hinge of the entire surah.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah strips the Musa narrative to its rhetorical core — every absence is structural",
      absences: [
        { item: "No miracles displayed", note: "No staff thrown, no plagues unleashed, no sea split. The surah skips the entire narrative of confrontation. What interests Ghafir is the argument, the verbal encounter, the moment where one man's speech stands against an empire's consensus." },
        { item: "No physical Paradise descriptions", note: "The rewards described are relational — being entered into gardens, being with righteous family members, being saved from evil deeds. The mercy in this surah is personal, intimate, familial." },
        { item: "No named Believing Man", note: "He is 'a believing man from Pharaoh's family.' No name, no biography, no backstory. The anonymity makes him a template — not a historical character but a permanent possibility." },
        { item: "No resolution to the concealment", note: "The surah says he concealed his faith and then spoke. It does not narrate the transition. The gap between concealment and speech is left for the reader to fill with their own experience." },
        { item: "No softening of the temporal condition", note: "The surah opens with forgiveness and closes by showing faith at the moment of visible punishment arriving too late. The mercy is infinite. The window is not. The surah holds both truths simultaneously." },
      ],
    },
  },

  contentNodes: [
    { concept: "The Believing Man's speech — courage from within", type: "surah-specific", articleSlug: "believing-man-speech-40-28-44" },
    { concept: "The angels' du'a for believers", type: "surah-specific", articleSlug: "angels-intercession-40-7-9" },
    { concept: "Ud'uni astajib lakum — the simplest invitation", type: "surah-specific", articleSlug: "call-upon-me-40-60" },
    { concept: "Yusuf-to-Musa: the prophetic chain to Egypt", type: "cross-surah", articleSlug: "yusuf-musa-egypt-chain-40-34" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "argument", label: "Argument" },
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
        Reason → precedent → urgency → surrender
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
          {activeTab === "argument" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
