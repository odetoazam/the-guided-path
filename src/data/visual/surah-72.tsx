"use client";
import React, { useState, useRef } from "react";

// ==============================================================================
// SURAH AL-JINN — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-jinn
// ==============================================================================

const SURAH_DATA = {
  name: "Al-Jinn",
  arabicName: "\u0627\u0644\u0652\u062C\u0650\u0646\u0651",
  meaning: "The Jinn",
  number: 72,
  ayahCount: 28,
  period: "Makki",
  juz: 29,
  movements: 3,
  thesis:
    "Twenty-eight ayahs that prove the Quran\u2019s argument through its least expected witnesses \u2014 invisible beings who heard what the visible audience refused to hear, and whose honesty about their own confusion became the most compelling evidence for the truth they had just received.",
  reflectionUrl: "/surahs/al-jinn",
  readTime: "20 min read",

  heartVerse: {
    arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651 \u0627\u0644\u0652\u0645\u064E\u0633\u064E\u0627\u062C\u0650\u062F\u064E \u0644\u0650\u0644\u064E\u0651\u0647\u0650 \u0641\u064E\u0644\u064E\u0627 \u062A\u064E\u062F\u0652\u0639\u064F\u0648\u0627 \u0645\u064E\u0639\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0623\u064E\u062D\u064E\u062F\u064B\u0627",
    ayahRef: "72:18",
    translation: "The mosques belong to Allah, so do not invoke anyone alongside Allah.",
    why: "The structural hinge of the entire surah. Everything before it describes the problem \u2014 mixed invocations, false assumptions, the old disordered relationship between humans and jinn and the divine. Everything after it describes the solution \u2014 pure worship, prophetic limitation, divine omniscience. The brevity is the authority.",
  },

  audio: { surahNumber: 72, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "\u0642\u064F\u0644\u0652 \u0623\u064F\u0648\u062D\u0650\u064A\u064E \u0625\u0650\u0644\u064E\u064A\u064E\u0651 \u0623\u064E\u0646\u064E\u0651\u0647\u064F \u0627\u0633\u0652\u062A\u064E\u0645\u064E\u0639\u064E \u0646\u064E\u0641\u064E\u0631\u064C \u0645\u0650\u0651\u0646\u064E \u0627\u0644\u0652\u062C\u0650\u0646\u0650\u0651 \u0641\u064E\u0642\u064E\u0627\u0644\u064F\u0648\u0627 \u0625\u0650\u0646\u064E\u0651\u0627 \u0633\u064E\u0645\u0650\u0639\u0652\u0646\u064E\u0627 \u0642\u064F\u0631\u0652\u0622\u0646\u064B\u0627 \u0639\u064E\u062C\u064E\u0628\u064B\u0627", translation: "Say: It has been revealed to me that a group of jinn listened and said: 'We have heard a wondrous Quran.'" },
    { ayah: 2, arabic: "\u064A\u064E\u0647\u0652\u062F\u0650\u064A \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0631\u0651\u064F\u0634\u0652\u062F\u0650 \u0641\u064E\u0622\u0645\u064E\u0646\u064E\u0651\u0627 \u0628\u0650\u0647\u0650 \u06DA \u0648\u064E\u0644\u064E\u0646 \u0646\u0651\u064F\u0634\u0652\u0631\u0650\u0643\u064E \u0628\u0650\u0631\u064E\u0628\u0650\u0651\u0646\u064E\u0627 \u0623\u064E\u062D\u064E\u062F\u064B\u0627", translation: "'It guides to right conduct, so we have believed in it, and we will never associate anyone with our Lord.'" },
    { ayah: 3, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0647\u064F \u062A\u064E\u0639\u064E\u0627\u0644\u064E\u0649\u0670 \u062C\u064E\u062F\u0651\u064F \u0631\u064E\u0628\u0651\u0650\u0646\u064E\u0627 \u0645\u064E\u0627 \u0627\u062A\u0651\u064E\u062E\u064E\u0630\u064E \u0635\u064E\u0627\u062D\u0650\u0628\u064E\u0629\u064B \u0648\u064E\u0644\u064E\u0627 \u0648\u064E\u0644\u064E\u062F\u064B\u0627", translation: "'Exalted is the majesty of our Lord — He has taken neither wife nor child.'" },
    { ayah: 4, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0647\u064F \u0643\u064E\u0627\u0646\u064E \u064A\u064E\u0642\u064F\u0648\u0644\u064F \u0633\u064E\u0641\u0650\u064A\u0647\u064F\u0646\u064E\u0627 \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0634\u064E\u0637\u064E\u0637\u064B\u0627", translation: "'And the foolish among us used to speak lies about Allah.'" },
    { ayah: 5, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0627 \u0638\u064E\u0646\u064E\u0646\u064E\u0651\u0627 \u0623\u064E\u0646 \u0644\u0651\u064E\u0646 \u062A\u064E\u0642\u064F\u0648\u0644\u064E \u0627\u0644\u0652\u0625\u0650\u0646\u0633\u064F \u0648\u064E\u0627\u0644\u0652\u062C\u0650\u0646\u0651\u064F \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0643\u064E\u0630\u0650\u0628\u064B\u0627", translation: "'We had assumed that neither humans nor jinn would ever speak a lie about Allah.'" },
    { ayah: 6, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0647\u064F \u0643\u064E\u0627\u0646\u064E \u0631\u0650\u062C\u064E\u0627\u0644\u064C \u0645\u0651\u0650\u0646\u064E \u0627\u0644\u0652\u0625\u0650\u0646\u0633\u0650 \u064A\u064E\u0639\u064F\u0648\u0630\u064F\u0648\u0646\u064E \u0628\u0650\u0631\u0650\u062C\u064E\u0627\u0644\u064D \u0645\u0651\u0650\u0646\u064E \u0627\u0644\u0652\u062C\u0650\u0646\u0651\u0650 \u0641\u064E\u0632\u064E\u0627\u062F\u064F\u0648\u0647\u064F\u0645\u0652 \u0631\u064E\u0647\u064E\u0642\u064B\u0627", translation: "'Some humans used to seek refuge with some jinn, but they only increased them in burden.'" },
    { ayah: 7, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0647\u064F\u0645\u0652 \u0638\u064E\u0646\u0651\u064F\u0648\u0627 \u0643\u064E\u0645\u064E\u0627 \u0638\u064E\u0646\u064E\u0646\u062A\u064F\u0645\u0652 \u0623\u064E\u0646 \u0644\u0651\u064E\u0646 \u064A\u064E\u0628\u0652\u0639\u064E\u062B\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u064F \u0623\u064E\u062D\u064E\u062F\u064B\u0627", translation: "'And they assumed, as you assumed, that Allah would never raise anyone.'" },
    { ayah: 8, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0627 \u0644\u064E\u0645\u064E\u0633\u0652\u0646\u064E\u0627 \u0627\u0644\u0633\u0651\u064E\u0645\u064E\u0627\u0621\u064E \u0641\u064E\u0648\u064E\u062C\u064E\u062F\u0652\u0646\u064E\u0627\u0647\u064E\u0627 \u0645\u064F\u0644\u0650\u0626\u064E\u062A\u0652 \u062D\u064E\u0631\u064E\u0633\u064B\u0627 \u0634\u064E\u062F\u0650\u064A\u062F\u064B\u0627 \u0648\u064E\u0634\u064F\u0647\u064F\u0628\u064B\u0627", translation: "'We reached for the heaven and found it filled with stern guards and shooting stars.'" },
    { ayah: 9, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0627 \u0643\u064F\u0646\u064E\u0651\u0627 \u0646\u064E\u0642\u0652\u0639\u064F\u062F\u064F \u0645\u0650\u0646\u0652\u0647\u064E\u0627 \u0645\u064E\u0642\u064E\u0627\u0639\u0650\u062F\u064E \u0644\u0650\u0644\u0633\u0651\u064E\u0645\u0652\u0639\u0650 \u06DA \u0641\u064E\u0645\u064E\u0646 \u064A\u064E\u0633\u0652\u062A\u064E\u0645\u0650\u0639\u0650 \u0627\u0644\u0652\u0622\u0646\u064E \u064A\u064E\u062C\u0650\u062F\u0652 \u0644\u064E\u0647\u064F \u0634\u0650\u0647\u064E\u0627\u0628\u064B\u0627 \u0631\u0651\u064E\u0635\u064E\u062F\u064B\u0627", translation: "'We used to sit in positions to listen, but whoever tries to listen now finds a shooting star in wait.'" },
    { ayah: 10, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0627 \u0644\u064E\u0627 \u0646\u064E\u062F\u0652\u0631\u0650\u064A \u0623\u064E\u0634\u064E\u0631\u0651\u064C \u0623\u064F\u0631\u0650\u064A\u062F\u064E \u0628\u0650\u0645\u064E\u0646 \u0641\u0650\u064A \u0627\u0644\u0652\u0623\u064E\u0631\u0652\u0636\u0650 \u0623\u064E\u0645\u0652 \u0623\u064E\u0631\u064E\u0627\u062F\u064E \u0628\u0650\u0647\u0650\u0645\u0652 \u0631\u064E\u0628\u0651\u064F\u0647\u064F\u0645\u0652 \u0631\u064E\u0634\u064E\u062F\u064B\u0627", translation: "'We do not know whether ill is intended for those on earth, or whether their Lord intends for them right guidance.'" },
    { ayah: 11, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0627 \u0645\u0650\u0646\u064E\u0651\u0627 \u0627\u0644\u0635\u0651\u064E\u0627\u0644\u0650\u062D\u064F\u0648\u0646\u064E \u0648\u064E\u0645\u0650\u0646\u064E\u0651\u0627 \u062F\u064F\u0648\u0646\u064E \u0630\u064E\u0670\u0644\u0650\u0643\u064E \u06DA \u0643\u064F\u0646\u064E\u0651\u0627 \u0637\u064E\u0631\u064E\u0627\u0626\u0650\u0642\u064E \u0642\u0650\u062F\u064E\u062F\u064B\u0627", translation: "'Among us are the righteous, and among us are those less than that — we have been of diverse factions.'" },
    { ayah: 12, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0627 \u0638\u064E\u0646\u064E\u0646\u064E\u0651\u0627 \u0623\u064E\u0646 \u0644\u0651\u064E\u0646 \u0646\u0651\u064F\u0639\u0652\u062C\u0650\u0632\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u064E \u0641\u0650\u064A \u0627\u0644\u0652\u0623\u064E\u0631\u0652\u0636\u0650 \u0648\u064E\u0644\u064E\u0646 \u0646\u0651\u064F\u0639\u0652\u062C\u0650\u0632\u064E\u0647\u064F \u0647\u064E\u0631\u064E\u0628\u064B\u0627", translation: "'We know that we can never escape Allah on earth, nor can we escape Him by fleeing.'" },
    { ayah: 13, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0627 \u0644\u064E\u0645\u064E\u0651\u0627 \u0633\u064E\u0645\u0650\u0639\u0652\u0646\u064E\u0627 \u0627\u0644\u0652\u0647\u064F\u062F\u064E\u0649\u0670 \u0622\u0645\u064E\u0646\u064E\u0651\u0627 \u0628\u0650\u0647\u0650 \u06DA \u0641\u064E\u0645\u064E\u0646 \u064A\u064F\u0624\u0652\u0645\u0650\u0646 \u0628\u0650\u0631\u064E\u0628\u0651\u0650\u0647\u0650 \u0641\u064E\u0644\u064E\u0627 \u064A\u064E\u062E\u064E\u0627\u0641\u064F \u0628\u064E\u062E\u0652\u0633\u064B\u0627 \u0648\u064E\u0644\u064E\u0627 \u0631\u064E\u0647\u064E\u0642\u064B\u0627", translation: "'When we heard the guidance, we believed in it. Whoever believes in their Lord will fear neither deprivation nor burden.'" },
    { ayah: 14, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0627 \u0645\u0650\u0646\u064E\u0651\u0627 \u0627\u0644\u0652\u0645\u064F\u0633\u0652\u0644\u0650\u0645\u064F\u0648\u0646\u064E \u0648\u064E\u0645\u0650\u0646\u064E\u0651\u0627 \u0627\u0644\u0652\u0642\u064E\u0627\u0633\u0650\u0637\u064F\u0648\u0646\u064E \u06DA \u0641\u064E\u0645\u064E\u0646\u0652 \u0623\u064E\u0633\u0652\u0644\u064E\u0645\u064E \u0641\u064E\u0623\u064F\u0648\u0644\u064E\u0670\u0626\u0650\u0643\u064E \u062A\u064E\u062D\u064E\u0631\u0651\u064E\u0648\u0652\u0627 \u0631\u064E\u0634\u064E\u062F\u064B\u0627", translation: "'Among us are those who have submitted, and among us are the unjust. Those who submitted have found right guidance.'" },
    { ayah: 15, arabic: "\u0648\u064E\u0623\u064E\u0645\u064E\u0651\u0627 \u0627\u0644\u0652\u0642\u064E\u0627\u0633\u0650\u0637\u064F\u0648\u0646\u064E \u0641\u064E\u0643\u064E\u0627\u0646\u064F\u0648\u0627 \u0644\u0650\u062C\u064E\u0647\u064E\u0646\u064E\u0651\u0645\u064E \u062D\u064E\u0637\u064E\u0628\u064B\u0627", translation: "'And as for the unjust, they will be fuel for Hell.'" },
    { ayah: 16, arabic: "\u0648\u064E\u0623\u064E\u0644\u0651\u064E\u0648\u0650 \u0627\u0633\u0652\u062A\u064E\u0642\u064E\u0627\u0645\u064F\u0648\u0627 \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0637\u0651\u064E\u0631\u0650\u064A\u0642\u064E\u0629\u0650 \u0644\u064E\u0623\u064E\u0633\u0652\u0642\u064E\u064A\u0652\u0646\u064E\u0627\u0647\u064F\u0645 \u0645\u0651\u064E\u0627\u0621\u064B \u063A\u064E\u062F\u064E\u0642\u064B\u0627", translation: "Had they remained on the right path, We would have given them abundant water." },
    { ayah: 17, arabic: "\u0644\u0651\u0650\u0646\u064E\u0641\u0652\u062A\u0650\u0646\u064E\u0647\u064F\u0645\u0652 \u0641\u0650\u064A\u0647\u0650 \u06DA \u0648\u064E\u0645\u064E\u0646 \u064A\u064F\u0639\u0652\u0631\u0650\u0636\u0652 \u0639\u064E\u0646 \u0630\u0650\u0643\u0652\u0631\u0650 \u0631\u064E\u0628\u0651\u0650\u0647\u0650 \u064A\u064E\u0633\u0652\u0644\u064F\u0643\u0652\u0647\u064F \u0639\u064E\u0630\u064E\u0627\u0628\u064B\u0627 \u0635\u064E\u0639\u064E\u062F\u064B\u0627", translation: "To test them through it. And whoever turns away from the remembrance of his Lord, He will drive him into an ever-mounting punishment." },
    { ayah: 18, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651 \u0627\u0644\u0652\u0645\u064E\u0633\u064E\u0627\u062C\u0650\u062F\u064E \u0644\u0650\u0644\u064E\u0651\u0647\u0650 \u0641\u064E\u0644\u064E\u0627 \u062A\u064E\u062F\u0652\u0639\u064F\u0648\u0627 \u0645\u064E\u0639\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0623\u064E\u062D\u064E\u062F\u064B\u0627", translation: "The mosques belong to Allah, so do not invoke anyone alongside Allah." },
    { ayah: 19, arabic: "\u0648\u064E\u0623\u064E\u0646\u064E\u0651\u0647\u064F \u0644\u064E\u0645\u064E\u0651\u0627 \u0642\u064E\u0627\u0645\u064E \u0639\u064E\u0628\u0652\u062F\u064F \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u064A\u064E\u062F\u0652\u0639\u064F\u0648\u0647\u064F \u0643\u064E\u0627\u062F\u064F\u0648\u0627 \u064A\u064E\u0643\u064F\u0648\u0646\u064F\u0648\u0646\u064E \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0650 \u0644\u0650\u0628\u064E\u062F\u064B\u0627", translation: "When the servant of Allah stood to pray, they nearly swarmed over him." },
    { ayah: 20, arabic: "\u0642\u064F\u0644\u0652 \u0625\u0650\u0646\u064E\u0651\u0645\u064E\u0627 \u0623\u064E\u062F\u0652\u0639\u064F\u0648 \u0631\u064E\u0628\u0651\u0650\u064A \u0648\u064E\u0644\u064E\u0627 \u0623\u064F\u0634\u0652\u0631\u0650\u0643\u064F \u0628\u0650\u0647\u0650 \u0623\u064E\u062D\u064E\u062F\u064B\u0627", translation: "Say: 'I only call upon my Lord and do not associate anyone with Him.'" },
    { ayah: 21, arabic: "\u0642\u064F\u0644\u0652 \u0625\u0650\u0646\u0651\u0650\u064A \u0644\u064E\u0627 \u0623\u064E\u0645\u0652\u0644\u0650\u0643\u064F \u0644\u064E\u0643\u064F\u0645\u0652 \u0636\u064E\u0631\u0651\u064B\u0627 \u0648\u064E\u0644\u064E\u0627 \u0631\u064E\u0634\u064E\u062F\u064B\u0627", translation: "Say: 'I have no power to cause you harm or to bring you right guidance.'" },
    { ayah: 22, arabic: "\u0642\u064F\u0644\u0652 \u0625\u0650\u0646\u0651\u0650\u064A \u0644\u064E\u0646 \u064A\u064F\u062C\u0650\u064A\u0631\u064E\u0646\u0650\u064A \u0645\u0650\u0646\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0623\u064E\u062D\u064E\u062F\u064C \u0648\u064E\u0644\u064E\u0646\u0652 \u0623\u064E\u062C\u0650\u062F\u064E \u0645\u0650\u0646 \u062F\u064F\u0648\u0646\u0650\u0647\u0650 \u0645\u064F\u0644\u0652\u062A\u064E\u062D\u064E\u062F\u064B\u0627", translation: "Say: 'No one can protect me from Allah, and I will never find a refuge besides Him.'" },
    { ayah: 23, arabic: "\u0625\u0650\u0644\u0651\u064E\u0627 \u0628\u064E\u0644\u064E\u0627\u063A\u064B\u0627 \u0645\u0651\u0650\u0646\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0648\u064E\u0631\u0650\u0633\u064E\u0627\u0644\u064E\u0627\u062A\u0650\u0647\u0650 \u06DA \u0648\u064E\u0645\u064E\u0646 \u064A\u064E\u0639\u0652\u0635\u0650 \u0627\u0644\u0644\u064E\u0651\u0647\u064E \u0648\u064E\u0631\u064E\u0633\u064F\u0648\u0644\u064E\u0647\u064F \u0641\u064E\u0625\u0650\u0646\u064E\u0651 \u0644\u064E\u0647\u064F \u0646\u064E\u0627\u0631\u064E \u062C\u064E\u0647\u064E\u0646\u064E\u0651\u0645\u064E \u062E\u064E\u0627\u0644\u0650\u062F\u0650\u064A\u0646\u064E \u0641\u0650\u064A\u0647\u064E\u0627 \u0623\u064E\u0628\u064E\u062F\u064B\u0627", translation: "'My duty is only to convey from Allah and deliver His messages. Whoever disobeys Allah and His Messenger — for him is the Fire of Hell, dwelling therein forever.'" },
    { ayah: 24, arabic: "\u062D\u064E\u062A\u0651\u064E\u0649\u0670 \u0625\u0650\u0630\u064E\u0627 \u0631\u064E\u0623\u064E\u0648\u0652\u0627 \u0645\u064E\u0627 \u064A\u064F\u0648\u0639\u064E\u062F\u064F\u0648\u0646\u064E \u0641\u064E\u0633\u064E\u064A\u064E\u0639\u0652\u0644\u064E\u0645\u064F\u0648\u0646\u064E \u0645\u064E\u0646\u0652 \u0623\u064E\u0636\u0652\u0639\u064E\u0641\u064F \u0646\u064E\u0627\u0635\u0650\u0631\u064B\u0627 \u0648\u064E\u0623\u064E\u0642\u064E\u0644\u0651\u064F \u0639\u064E\u062F\u064E\u062F\u064B\u0627", translation: "Until they see what they have been promised — then they will know who is weaker in helpers and fewer in number." },
    { ayah: 25, arabic: "\u0642\u064F\u0644\u0652 \u0625\u0650\u0646\u0652 \u0623\u064E\u062F\u0652\u0631\u0650\u064A \u0623\u064E\u0642\u064E\u0631\u0650\u064A\u0628\u064C \u0645\u0651\u064E\u0627 \u062A\u064F\u0648\u0639\u064E\u062F\u064F\u0648\u0646\u064E \u0623\u064E\u0645\u0652 \u064A\u064E\u062C\u0652\u0639\u064E\u0644\u064F \u0644\u064E\u0647\u064F \u0631\u064E\u0628\u0651\u0650\u064A \u0623\u064E\u0645\u064E\u062F\u064B\u0627", translation: "Say: 'I do not know whether what you are promised is near, or whether my Lord will extend it for a period.'" },
    { ayah: 26, arabic: "\u0639\u064E\u0627\u0644\u0650\u0645\u064F \u0627\u0644\u0652\u063A\u064E\u064A\u0652\u0628\u0650 \u0641\u064E\u0644\u064E\u0627 \u064A\u064F\u0638\u0652\u0647\u0650\u0631\u064F \u0639\u064E\u0644\u064E\u0649\u0670 \u063A\u064E\u064A\u0652\u0628\u0650\u0647\u0650 \u0623\u064E\u062D\u064E\u062F\u064B\u0627", translation: "He is the Knower of the unseen, and He does not reveal His unseen to anyone —" },
    { ayah: 27, arabic: "\u0625\u0650\u0644\u0651\u064E\u0627 \u0645\u064E\u0646\u0650 \u0627\u0631\u0652\u062A\u064E\u0636\u064E\u0649\u0670 \u0645\u0650\u0646 \u0631\u0651\u064E\u0633\u064F\u0648\u0644\u064D \u0641\u064E\u0625\u0650\u0646\u064E\u0651\u0647\u064F \u064A\u064E\u0633\u0652\u0644\u064F\u0643\u064F \u0645\u0650\u0646 \u0628\u064E\u064A\u0652\u0646\u0650 \u064A\u064E\u062F\u064E\u064A\u0652\u0647\u0650 \u0648\u064E\u0645\u0650\u0646\u0652 \u062E\u064E\u0644\u0652\u0641\u0650\u0647\u0650 \u0631\u064E\u0635\u064E\u062F\u064B\u0627", translation: "except a messenger He has approved — then He places before him and behind him watchers." },
    { ayah: 28, arabic: "\u0644\u0650\u064A\u064E\u0639\u0652\u0644\u064E\u0645\u064E \u0623\u064E\u0646 \u0642\u064E\u062F\u0652 \u0623\u064E\u0628\u0652\u0644\u064E\u063A\u064F\u0648\u0627 \u0631\u0650\u0633\u064E\u0627\u0644\u064E\u0627\u062A\u0650 \u0631\u064E\u0628\u0651\u0650\u0647\u0650\u0645\u0652 \u0648\u064E\u0623\u064E\u062D\u064E\u0627\u0637\u064E \u0628\u0650\u0645\u064E\u0627 \u0644\u064E\u062F\u064E\u064A\u0652\u0647\u0650\u0645\u0652 \u0648\u064E\u0623\u064E\u062D\u0652\u0635\u064E\u0649\u0670 \u0643\u064F\u0644\u064E\u0651 \u0634\u064E\u064A\u0652\u0621\u064D \u0639\u064E\u062F\u064E\u062F\u064B\u0627", translation: "So that He may know that they have conveyed the messages of their Lord. He encompasses what is with them and has counted everything in number." },
  ],

  diagrams: {
    sectionJourney: {
      title: "Three Witnesses",
      subtitle: "Testimony \u2192 cosmology \u2192 prophetic declaration",
      sections: [
        { ayahs: "1\u201315", title: "The Jinn\u2019s Testimony", color: "#4ecdc4", desc: "Fifteen ayahs of sustained first-person speech from beings who heard the Quran cold and were honest enough to change. They confess their wonder, name their fools, admit their false assumptions, describe the sealed heavens, and divide themselves into Muslim and unjust \u2014 all without defensiveness." },
        { ayahs: "16\u201318", title: "The Divine Commentary", color: "#C9A84C", isPivot: true, desc: "Allah speaks in His own register. Had they stayed on the path, abundant water. But abundance itself is a test. And then the single absolute command at the surah\u2019s hinge: the mosques belong to Allah alone." },
        { ayahs: "19\u201328", title: "The Prophetic Declaration", color: "#9b7fd4", desc: "The Prophet is told to declare his own limitations \u2014 he owns nothing, controls nothing, delivers only what he has been given. Each qul strips away another dimension of independent authority. The surah closes with Allah\u2019s total knowledge: He has counted everything in number." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "Every layer converges on \u2014 and radiates from \u2014 the singularity of worship at ayah 18",
      pairs: [
        {
          left: { label: "Hearing", ayahs: "1\u20132", desc: "The jinn hear and believe \u2014 reception, astonishment, immediate conversion without demand for signs" },
          right: { label: "Knowing", ayahs: "28", desc: "Allah knows they have conveyed, encompasses what is with them, has counted everything \u2014 total omniscience" },
          color: "#4ecdc4",
        },
        {
          left: { label: "False Claims", ayahs: "3\u20134", desc: "Lies spoken about Allah \u2014 wife, child, the foolish among us who fabricated claims about the divine" },
          right: { label: "True Knowledge", ayahs: "26\u201327", desc: "Allah alone knows the unseen; reveals it only to chosen messengers surrounded by watchful guardians" },
          color: "#9b7fd4",
        },
        {
          left: { label: "False Refuge", ayahs: "6", desc: "Humans sought refuge with jinn \u2014 the old arrangement that increased both in burden (rahaq)" },
          right: { label: "True Refuge", ayahs: "22", desc: "No one can protect me from Allah, and I will never find a refuge besides Him" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Hinge", ayahs: "18",
        desc: "The mosques belong to Allah, so do not invoke anyone alongside Him.",
        note: "Every layer of the ring converges on this point. The jinn\u2019s testimony, the cosmic order, the prophetic declaration \u2014 all serve the same architectural purpose of arriving at, and then radiating from, the absolute singularity of worship.",
      },
    },
    deductiveFunnel: {
      title: "Progressive Stripping",
      subtitle: "Each qul narrows what the Prophet claims \u2014 and expands what belongs to Allah",
      layers: [
        { depth: 1, label: "Pure Invocation", ayah: "20", arabic: "\u0625\u0650\u0646\u064E\u0651\u0645\u064E\u0627 \u0623\u064E\u062F\u0652\u0639\u064F\u0648 \u0631\u064E\u0628\u0651\u0650\u064A", desc: "I only call upon my Lord. The first declaration: what the Prophet does. His activity is singular \u2014 invocation of Allah alone, with no partner.", color: "#4ecdc4" },
        { depth: 2, label: "No Independent Power", ayah: "21", arabic: "\u0644\u064E\u0627 \u0623\u064E\u0645\u0652\u0644\u0650\u0643\u064F \u0644\u064E\u0643\u064F\u0645\u0652 \u0636\u064E\u0631\u0651\u064B\u0627 \u0648\u064E\u0644\u064E\u0627 \u0631\u064E\u0634\u064E\u062F\u064B\u0627", desc: "I have no power to cause you harm or bring you guidance. The second stripping: what the Prophet cannot do. He controls neither your harm nor your benefit.", color: "#9b7fd4" },
        { depth: 3, label: "No Refuge But Allah", ayah: "22", arabic: "\u0644\u064E\u0646 \u064A\u064F\u062C\u0650\u064A\u0631\u064E\u0646\u0650\u064A \u0645\u0650\u0646\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u0650 \u0623\u064E\u062D\u064E\u062F\u064C", desc: "No one can protect me from Allah. The third stripping: even the Prophet himself has no immunity. He is as vulnerable before Allah as anyone.", color: "#e07a8a" },
        { depth: 4, label: "Pure Channel", ayah: "23", arabic: "\u0625\u0650\u0644\u0651\u064E\u0627 \u0628\u064E\u0644\u064E\u0627\u063A\u064B\u0627 \u0645\u0651\u0650\u0646\u064E \u0627\u0644\u0644\u064E\u0651\u0647\u0650", desc: "My duty is only to convey from Allah. What remains after everything else is removed: delivery. The channel does not own what flows through it.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "The surah does not argue with disbelievers \u2014 it narrates what happened to beings who actually listened",
      absences: [
        { item: "No destroyed nations", note: "No \u2018Ad, no Thamud, no cautionary ruins. The surah does not threaten through historical precedent. It persuades through unexpected testimony \u2014 beings from another order of creation who recognized what the visible audience refuses to see." },
        { item: "No direct engagement with Quraysh", note: "No debate about resurrection, no refutation of polytheistic theology in the usual Makkan mode. The absence of direct confrontation is the confrontation. The mirror is held up sideways." },
        { item: "No human acceptance", note: "The entire surah is about non-human beings accepting what humans refused. The human audience is conspicuously absent from the list of those who believed. The structural implication is devastating." },
        { item: "No demand for signs", note: "The jinn hear the Quran and believe immediately. No deliberation, no request for miracles. The Quran\u2019s own language was sufficient. The speed of their conversion is part of the argument." },
        { item: "No description of the jinn", note: "We never learn what they look like, where they came from, or how they traveled. They are voices without bodies \u2014 the most credible kind of witness, because their testimony carries no tribal loyalty, no social pressure, no history with Quraysh." },
      ],
    },
  },

  contentNodes: [
    { concept: "The jinn as unexpected witnesses \u2014 testimony from the unseen", type: "surah-specific", articleSlug: "jinn-unexpected-witnesses-72" },
    { concept: "Ayah 18 \u2014 the mosques belong to Allah (structural hinge)", type: "surah-specific", articleSlug: "masajid-lillah-72-18" },
    { concept: "Nuh\u2013Jinn diptych \u2014 centuries of refusal vs. a single night of acceptance", type: "cross-surah", articleSlug: "nuh-jinn-diptych-71-72" },
    { concept: "The guarded heavens \u2014 Al-Mulk and Al-Jinn read together", type: "cross-surah", articleSlug: "guarded-heavens-mulk-jinn-67-72" },
  ],
};

// ==============================================================================
// TABS
// ==============================================================================

const TABS = [
  { id: "witnesses", label: "Witnesses" },
  { id: "ring", label: "Ring" },
  { id: "stripping", label: "Stripping" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

// ==============================================================================
// SHARED — Islamic ornament divider (matches surah pages)
// ==============================================================================

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">{"\u06DE"}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </div>
  );
}

// ==============================================================================
// COMPONENTS
// ==============================================================================

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
          {playing ? "\u23F8" : "\u25B6"}
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
            <span className="text-sm text-cream-muted/50">{"\uFD3F"}{v.ayah}{"\uFD3E"}</span>
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">{"\u2726"} Structural hinge</div>}
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
        Pure invocation {"\u2192"} no independent power {"\u2192"} no refuge but Allah {"\u2192"} pure channel
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

// ==============================================================================
// PAGE SHELL — v3 (brand-aligned, proper tabs, ornaments)
// ==============================================================================

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;

  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">

        {/* -- Hero --------------------------------------------------------- */}
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
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Hinge</div>
            </div>
          </div>
        </header>

        <OrnamentDivider />

        {/* -- Tab bar ------------------------------------------------------ */}
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

        {/* -- Tab content -------------------------------------------------- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "witnesses" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "stripping" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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

        {/* -- Go Deeper --------------------------------------------------- */}
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
