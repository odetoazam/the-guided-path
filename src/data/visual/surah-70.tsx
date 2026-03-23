"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MAARIJ — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-maarij
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Ma\u2019arij",
  arabicName: "\u0627\u0644\u0645\u0639\u0627\u0631\u0650\u062C",
  meaning: "The Ascending Stairways",
  number: 70,
  ayahCount: 44,
  period: "Makki",
  juz: 29,
  movements: 4,
  thesis:
    "The surah that holds up a mirror to the anxious, hoarding creature and then, with the patience of a physician, names exactly what would heal it \u2014 beginning and ending with prayer.",
  reflectionUrl: "/surahs/al-maarij",
  readTime: "18 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0652\u0625\u0650\u0646\u0633\u064E\u0627\u0646\u064E \u062E\u064F\u0644\u0650\u0642\u064E \u0647\u064E\u0644\u064F\u0648\u0639\u064B\u0627",
    ayahRef: "70:19",
    translation: "Indeed, the human being was created anxious \u2014",
    why: "The hinge on which the entire surah turns. Everything before it describes the external reality of judgment. Everything after it describes the internal reality of the creature being judged \u2014 its flaws, its potential remedies, and the mockery of those who refuse the remedy. The pivot from cosmology to psychology happens on this single ayah.",
  },

  audio: { surahNumber: 70, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "\u0633\u064E\u0623\u064E\u0644\u064E \u0633\u064E\u0627\u0626\u0650\u0644\u064C \u0628\u0650\u0639\u064E\u0630\u064E\u0627\u0628\u064D \u0648\u064E\u0627\u0642\u0650\u0639\u064D", translation: "A questioner asked about a punishment that is falling \u2014" },
    { ayah: 2, arabic: "\u0644\u0650\u0644\u0652\u0643\u064E\u0627\u0641\u0650\u0631\u0650\u064A\u0646\u064E \u0644\u064E\u064A\u0652\u0633\u064E \u0644\u064E\u0647\u064F \u062F\u064E\u0627\u0641\u0650\u0639\u064C", translation: "upon the disbelievers \u2014 none can repel it \u2014" },
    { ayah: 3, arabic: "\u0645\u0650\u0646\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0630\u0650\u064A \u0627\u0644\u0652\u0645\u064E\u0639\u064E\u0627\u0631\u0650\u062C\u0650", translation: "from Allah, Lord of the Ascending Stairways." },
    { ayah: 4, arabic: "\u062A\u064E\u0639\u0652\u0631\u064F\u062C\u064F \u0627\u0644\u0652\u0645\u064E\u0644\u064E\u0627\u0626\u0650\u0643\u064E\u0629\u064F \u0648\u064E\u0627\u0644\u0631\u0651\u064F\u0648\u062D\u064F \u0625\u0650\u0644\u064E\u064A\u0652\u0647\u0650 \u0641\u0650\u064A \u064A\u064E\u0648\u0652\u0645\u064D \u0643\u064E\u0627\u0646\u064E \u0645\u0650\u0642\u0652\u062F\u064E\u0627\u0631\u064F\u0647\u064F \u062E\u064E\u0645\u0652\u0633\u0650\u064A\u0646\u064E \u0623\u064E\u0644\u0652\u0641\u064E \u0633\u064E\u0646\u064E\u0629\u064D", translation: "The angels and the Spirit ascend to Him in a Day whose span is fifty thousand years." },
    { ayah: 5, arabic: "\u0641\u064E\u0627\u0635\u0652\u0628\u0650\u0631\u0652 \u0635\u064E\u0628\u0652\u0631\u064B\u0627 \u062C\u064E\u0645\u0650\u064A\u0644\u064B\u0627", translation: "So be patient, with a beautiful patience." },
    { ayah: 6, arabic: "\u0625\u0650\u0646\u0651\u064E\u0647\u064F\u0645\u0652 \u064A\u064E\u0631\u064E\u0648\u0652\u0646\u064E\u0647\u064F \u0628\u064E\u0639\u0650\u064A\u062F\u064B\u0627", translation: "Indeed, they see it as distant," },
    { ayah: 7, arabic: "\u0648\u064E\u0646\u064E\u0631\u064E\u0627\u0647\u064F \u0642\u064E\u0631\u0650\u064A\u0628\u064B\u0627", translation: "but We see it as near." },
    { ayah: 8, arabic: "\u064A\u064E\u0648\u0652\u0645\u064E \u062A\u064E\u0643\u064F\u0648\u0646\u064F \u0627\u0644\u0633\u0651\u064E\u0645\u064E\u0627\u0621\u064F \u0643\u064E\u0627\u0644\u0652\u0645\u064F\u0647\u0652\u0644\u0650", translation: "The Day the sky will become like molten metal," },
    { ayah: 9, arabic: "\u0648\u064E\u062A\u064E\u0643\u064F\u0648\u0646\u064F \u0627\u0644\u0652\u062C\u0650\u0628\u064E\u0627\u0644\u064F \u0643\u064E\u0627\u0644\u0652\u0639\u0650\u0647\u0652\u0646\u0650", translation: "and the mountains will become like tufts of wool," },
    { ayah: 10, arabic: "\u0648\u064E\u0644\u064E\u0627 \u064A\u064E\u0633\u0652\u0623\u064E\u0644\u064F \u062D\u064E\u0645\u0650\u064A\u0645\u064C \u062D\u064E\u0645\u0650\u064A\u0645\u064B\u0627", translation: "and no close friend will ask about another." },
    { ayah: 11, arabic: "\u064A\u064F\u0628\u064E\u0635\u0651\u064E\u0631\u064F\u0648\u0646\u064E\u0647\u064F\u0645\u0652 \u06DA \u064A\u064E\u0648\u064E\u062F\u0651\u064F \u0627\u0644\u0652\u0645\u064F\u062C\u0652\u0631\u0650\u0645\u064F \u0644\u064E\u0648\u0652 \u064A\u064E\u0641\u0652\u062A\u064E\u062F\u0650\u064A \u0645\u0650\u0646\u0652 \u0639\u064E\u0630\u064E\u0627\u0628\u0650 \u064A\u064E\u0648\u0652\u0645\u0650\u0626\u0650\u0630\u064D \u0628\u0650\u0628\u064E\u0646\u0650\u064A\u0647\u0650", translation: "They will be made to see one another. The criminal will wish to ransom himself from the punishment of that Day with his own children," },
    { ayah: 12, arabic: "\u0648\u064E\u0635\u064E\u0627\u062D\u0650\u0628\u064E\u062A\u0650\u0647\u0650 \u0648\u064E\u0623\u064E\u062E\u0650\u064A\u0647\u0650", translation: "and his wife, and his brother," },
    { ayah: 13, arabic: "\u0648\u064E\u0641\u064E\u0635\u0650\u064A\u0644\u064E\u062A\u0650\u0647\u0650 \u0627\u0644\u0651\u064E\u062A\u0650\u064A \u062A\u064F\u0624\u0652\u0648\u0650\u064A\u0647\u0650", translation: "and his nearest kindred who sheltered him," },
    { ayah: 14, arabic: "\u0648\u064E\u0645\u064E\u0646 \u0641\u0650\u064A \u0627\u0644\u0652\u0623\u064E\u0631\u0652\u0636\u0650 \u062C\u064E\u0645\u0650\u064A\u0639\u064B\u0627 \u062B\u064F\u0645\u0651\u064E \u064A\u064F\u0646\u062C\u0650\u064A\u0647\u0650", translation: "and everyone on earth \u2014 if only it would save him." },
    { ayah: 15, arabic: "\u0643\u064E\u0644\u0651\u064E\u0627 \u06DB \u0625\u0650\u0646\u0651\u064E\u0647\u064E\u0627 \u0644\u064E\u0638\u064E\u0649\u0670", translation: "Never! Indeed, it is the Scorching Fire," },
    { ayah: 16, arabic: "\u0646\u064E\u0632\u0651\u064E\u0627\u0639\u064E\u0629\u064B \u0644\u0650\u0644\u0634\u0651\u064E\u0648\u064E\u0649\u0670", translation: "a remover of the scalps," },
    { ayah: 17, arabic: "\u062A\u064E\u062F\u0652\u0639\u064F\u0648 \u0645\u064E\u0646\u0652 \u0623\u064E\u062F\u0652\u0628\u064E\u0631\u064E \u0648\u064E\u062A\u064E\u0648\u064E\u0644\u0651\u064E\u0649\u0670", translation: "calling the one who turned his back and turned away," },
    { ayah: 18, arabic: "\u0648\u064E\u062C\u064E\u0645\u064E\u0639\u064E \u0641\u064E\u0623\u064E\u0648\u0652\u0639\u064E\u0649\u0670", translation: "and gathered wealth and hoarded it." },
    { ayah: 19, arabic: "\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0652\u0625\u0650\u0646\u0633\u064E\u0627\u0646\u064E \u062E\u064F\u0644\u0650\u0642\u064E \u0647\u064E\u0644\u064F\u0648\u0639\u064B\u0627", translation: "Indeed, the human being was created anxious \u2014" },
    { ayah: 20, arabic: "\u0625\u0650\u0630\u064E\u0627 \u0645\u064E\u0633\u0651\u064E\u0647\u064F \u0627\u0644\u0634\u0651\u064E\u0631\u0651\u064F \u062C\u064E\u0632\u064F\u0648\u0639\u064B\u0627", translation: "when evil touches him, he is filled with panic," },
    { ayah: 21, arabic: "\u0648\u064E\u0625\u0650\u0630\u064E\u0627 \u0645\u064E\u0633\u0651\u064E\u0647\u064F \u0627\u0644\u0652\u062E\u064E\u064A\u0652\u0631\u064F \u0645\u064E\u0646\u064F\u0648\u0639\u064B\u0627", translation: "and when good touches him, he is withholding \u2014" },
    { ayah: 22, arabic: "\u0625\u0650\u0644\u0651\u064E\u0627 \u0627\u0644\u0652\u0645\u064F\u0635\u064E\u0644\u0651\u0650\u064A\u0646\u064E", translation: "except those who pray," },
    { ayah: 23, arabic: "\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0647\u064F\u0645\u0652 \u0639\u064E\u0644\u064E\u0649\u0670 \u0635\u064E\u0644\u064E\u0627\u062A\u0650\u0647\u0650\u0645\u0652 \u062F\u064E\u0627\u0626\u0650\u0645\u064F\u0648\u0646\u064E", translation: "those who are constant in their prayer," },
    { ayah: 24, arabic: "\u0648\u064E\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0641\u0650\u064A \u0623\u064E\u0645\u0652\u0648\u064E\u0627\u0644\u0650\u0647\u0650\u0645\u0652 \u062D\u064E\u0642\u0651\u064C \u0645\u0651\u064E\u0639\u0652\u0644\u064F\u0648\u0645\u064C", translation: "and those in whose wealth is a recognized right" },
    { ayah: 25, arabic: "\u0644\u0650\u0644\u0633\u0651\u064E\u0627\u0626\u0650\u0644\u0650 \u0648\u064E\u0627\u0644\u0652\u0645\u064E\u062D\u0652\u0631\u064F\u0648\u0645\u0650", translation: "for the beggar and the deprived," },
    { ayah: 26, arabic: "\u0648\u064E\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u064A\u064F\u0635\u064E\u062F\u0651\u0650\u0642\u064F\u0648\u0646\u064E \u0628\u0650\u064A\u064E\u0648\u0652\u0645\u0650 \u0627\u0644\u062F\u0651\u0650\u064A\u0646\u0650", translation: "and those who believe in the Day of Judgment," },
    { ayah: 27, arabic: "\u0648\u064E\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0647\u064F\u0645 \u0645\u0651\u0650\u0646\u0652 \u0639\u064E\u0630\u064E\u0627\u0628\u0650 \u0631\u064E\u0628\u0651\u0650\u0647\u0650\u0645 \u0645\u0651\u064F\u0634\u0652\u0641\u0650\u0642\u064F\u0648\u0646\u064E", translation: "and those who are fearful of the punishment of their Lord \u2014" },
    { ayah: 28, arabic: "\u0625\u0650\u0646\u0651\u064E \u0639\u064E\u0630\u064E\u0627\u0628\u064E \u0631\u064E\u0628\u0651\u0650\u0647\u0650\u0645\u0652 \u063A\u064E\u064A\u0652\u0631\u064F \u0645\u064E\u0623\u0652\u0645\u064F\u0648\u0646\u064D", translation: "indeed, the punishment of their Lord is not a thing from which one is safe \u2014" },
    { ayah: 29, arabic: "\u0648\u064E\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0647\u064F\u0645\u0652 \u0644\u0650\u0641\u064F\u0631\u064F\u0648\u062C\u0650\u0647\u0650\u0645\u0652 \u062D\u064E\u0627\u0641\u0650\u0638\u064F\u0648\u0646\u064E", translation: "and those who guard their private parts," },
    { ayah: 30, arabic: "\u0625\u0650\u0644\u0651\u064E\u0627 \u0639\u064E\u0644\u064E\u0649\u0670 \u0623\u064E\u0632\u0652\u0648\u064E\u0627\u062C\u0650\u0647\u0650\u0645\u0652 \u0623\u064E\u0648\u0652 \u0645\u064E\u0627 \u0645\u064E\u0644\u064E\u0643\u064E\u062A\u0652 \u0623\u064E\u064A\u0652\u0645\u064E\u0627\u0646\u064F\u0647\u064F\u0645\u0652 \u0641\u064E\u0625\u0650\u0646\u0651\u064E\u0647\u064F\u0645\u0652 \u063A\u064E\u064A\u0652\u0631\u064F \u0645\u064E\u0644\u064F\u0648\u0645\u0650\u064A\u0646\u064E", translation: "except from their spouses or those their right hands possess \u2014 they are not blameworthy." },
    { ayah: 31, arabic: "\u0641\u064E\u0645\u064E\u0646\u0650 \u0627\u0628\u0652\u062A\u064E\u063A\u064E\u0649\u0670 \u0648\u064E\u0631\u064E\u0627\u0621\u064E \u0630\u064E\u0670\u0644\u0650\u0643\u064E \u0641\u064E\u0623\u064F\u0648\u0644\u064E\u0670\u0626\u0650\u0643\u064E \u0647\u064F\u0645\u064F \u0627\u0644\u0652\u0639\u064E\u0627\u062F\u064F\u0648\u0646\u064E", translation: "But whoever seeks beyond that \u2014 they are the transgressors." },
    { ayah: 32, arabic: "\u0648\u064E\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0647\u064F\u0645\u0652 \u0644\u0650\u0623\u064E\u0645\u064E\u0627\u0646\u064E\u0627\u062A\u0650\u0647\u0650\u0645\u0652 \u0648\u064E\u0639\u064E\u0647\u0652\u062F\u0650\u0647\u0650\u0645\u0652 \u0631\u064E\u0627\u0639\u064F\u0648\u0646\u064E", translation: "And those who are faithful to their trusts and their covenants," },
    { ayah: 33, arabic: "\u0648\u064E\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0647\u064F\u0645 \u0628\u0650\u0634\u064E\u0647\u064E\u0627\u062F\u064E\u0627\u062A\u0650\u0647\u0650\u0645\u0652 \u0642\u064E\u0627\u0626\u0650\u0645\u064F\u0648\u0646\u064E", translation: "and those who stand by their testimonies," },
    { ayah: 34, arabic: "\u0648\u064E\u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0647\u064F\u0645\u0652 \u0639\u064E\u0644\u064E\u0649\u0670 \u0635\u064E\u0644\u064E\u0627\u062A\u0650\u0647\u0650\u0645\u0652 \u064A\u064F\u062D\u064E\u0627\u0641\u0650\u0638\u064F\u0648\u0646\u064E", translation: "and those who guard their prayers \u2014" },
    { ayah: 35, arabic: "\u0623\u064F\u0648\u0644\u064E\u0670\u0626\u0650\u0643\u064E \u0641\u0650\u064A \u062C\u064E\u0646\u0651\u064E\u0627\u062A\u064D \u0645\u0651\u064F\u0643\u0652\u0631\u064E\u0645\u064F\u0648\u0646\u064E", translation: "those are in gardens, honored." },
    { ayah: 36, arabic: "\u0641\u064E\u0645\u064E\u0627\u0644\u0650 \u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0643\u064E\u0641\u064E\u0631\u064F\u0648\u0627 \u0642\u0650\u0628\u064E\u0644\u064E\u0643\u064E \u0645\u064F\u0647\u0652\u0637\u0650\u0639\u0650\u064A\u0646\u064E", translation: "What is wrong with those who disbelieve, rushing toward you," },
    { ayah: 37, arabic: "\u0639\u064E\u0646\u0650 \u0627\u0644\u0652\u064A\u064E\u0645\u0650\u064A\u0646\u0650 \u0648\u064E\u0639\u064E\u0646\u0650 \u0627\u0644\u0634\u0651\u0650\u0645\u064E\u0627\u0644\u0650 \u0639\u0650\u0632\u0650\u064A\u0646\u064E", translation: "from the right and from the left, in groups?" },
    { ayah: 38, arabic: "\u0623\u064E\u064A\u064E\u0637\u0652\u0645\u064E\u0639\u064F \u0643\u064F\u0644\u0651\u064F \u0627\u0645\u0652\u0631\u0650\u0626\u064D \u0645\u0650\u0646\u0652\u0647\u064F\u0645\u0652 \u0623\u064E\u0646 \u064A\u064F\u062F\u0652\u062E\u064E\u0644\u064E \u062C\u064E\u0646\u0651\u064E\u0629\u064E \u0646\u064E\u0639\u0650\u064A\u0645\u064D", translation: "Does each of them aspire to be entered into a Garden of Bliss?" },
    { ayah: 39, arabic: "\u0643\u064E\u0644\u0651\u064E\u0627 \u06DB \u0625\u0650\u0646\u0651\u064E\u0627 \u062E\u064E\u0644\u064E\u0642\u0652\u0646\u064E\u0627\u0647\u064F\u0645 \u0645\u0651\u0650\u0645\u0651\u064E\u0627 \u064A\u064E\u0639\u0652\u0644\u064E\u0645\u064F\u0648\u0646\u064E", translation: "Never! Indeed, We created them from what they know." },
    { ayah: 40, arabic: "\u0641\u064E\u0644\u064E\u0627 \u0623\u064F\u0642\u0652\u0633\u0650\u0645\u064F \u0628\u0650\u0631\u064E\u0628\u0651\u0650 \u0627\u0644\u0652\u0645\u064E\u0634\u064E\u0627\u0631\u0650\u0642\u0650 \u0648\u064E\u0627\u0644\u0652\u0645\u064E\u063A\u064E\u0627\u0631\u0650\u0628\u0650", translation: "I swear by the Lord of every sunrise and sunset \u2014" },
    { ayah: 41, arabic: "\u0625\u0650\u0646\u0651\u064E\u0627 \u0644\u064E\u0642\u064E\u0627\u062F\u0650\u0631\u064F\u0648\u0646\u064E \u0639\u064E\u0644\u064E\u0649\u0670 \u0623\u064E\u0646 \u0646\u0651\u064F\u0628\u064E\u062F\u0651\u0650\u0644\u064E \u062E\u064E\u064A\u0652\u0631\u064B\u0627 \u0645\u0651\u0650\u0646\u0652\u0647\u064F\u0645\u0652 \u0648\u064E\u0645\u064E\u0627 \u0646\u064E\u062D\u0652\u0646\u064F \u0628\u0650\u0645\u064E\u0633\u0652\u0628\u064F\u0648\u0642\u0650\u064A\u0646\u064E", translation: "We are certainly able to replace them with better \u2014 and We are not to be outdone." },
    { ayah: 42, arabic: "\u0641\u064E\u0630\u064E\u0631\u0652\u0647\u064F\u0645\u0652 \u064A\u064E\u062E\u064F\u0648\u0636\u064F\u0648\u0627 \u0648\u064E\u064A\u064E\u0644\u0652\u0639\u064E\u0628\u064F\u0648\u0627", translation: "So leave them to plunge and play" },
    { ayah: 43, arabic: "\u062D\u064E\u062A\u0651\u064E\u0649\u0670 \u064A\u064F\u0644\u064E\u0627\u0642\u064F\u0648\u0627 \u064A\u064E\u0648\u0652\u0645\u064E\u0647\u064F\u0645\u064F \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u064A\u064F\u0648\u0639\u064E\u062F\u064F\u0648\u0646\u064E", translation: "until they meet their Day which they are promised \u2014" },
    { ayah: 44, arabic: "\u064A\u064E\u0648\u0652\u0645\u064E \u064A\u064E\u062E\u0652\u0631\u064F\u062C\u064F\u0648\u0646\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u0652\u0623\u064E\u062C\u0652\u062F\u064E\u0627\u062B\u0650 \u0633\u0650\u0631\u064E\u0627\u0639\u064B\u0627 \u0643\u064E\u0623\u064E\u0646\u0651\u064E\u0647\u064F\u0645\u0652 \u0625\u0650\u0644\u064E\u0649\u0670 \u0646\u064F\u0635\u064F\u0628\u064D \u064A\u064F\u0648\u0641\u0650\u0636\u064F\u0648\u0646\u064E \u062E\u064E\u0627\u0634\u0650\u0639\u064E\u0629\u064B \u0623\u064E\u0628\u0652\u0635\u064E\u0627\u0631\u064F\u0647\u064F\u0645\u0652 \u062A\u064E\u0631\u0652\u0647\u064E\u0642\u064F\u0647\u064F\u0645\u0652 \u0630\u0650\u0644\u0651\u064E\u0629\u064C \u06DA \u0630\u064E\u0670\u0644\u0650\u0643\u064E \u0627\u0644\u0652\u064A\u064E\u0648\u0652\u0645\u064F \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0643\u064E\u0627\u0646\u064F\u0648\u0627 \u064A\u064F\u0648\u0639\u064E\u062F\u064F\u0648\u0646\u064E", translation: "The Day they will emerge from the graves rapidly, as though racing toward erected markers \u2014 their eyes humbled, humiliation covering them. That is the Day which they were promised." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Diagnosis",
      subtitle: "Four movements: challenge \u2192 apocalypse \u2192 human nature \u2192 replacement",
      sections: [
        { ayahs: "1\u20137", title: "The Challenge and the Answer", color: "#C9A84C", isPivot: false, desc: "A questioner demands the promised punishment. The surah responds with a timescale that renders the challenge absurd: the angels ascend to God in a Day of fifty thousand years. The Prophet is told: be patient, with a beautiful patience. They see it as distant. We see it as near." },
        { ayahs: "8\u201318", title: "The Day Described", color: "#e07a8a", desc: "The sky becomes molten metal, mountains become wool. No friend asks about another. The criminal wishes to ransom himself with his children, his wife, his brother, everyone on earth. Then Lazza \u2014 the Scorching Fire, a word used only here in the Quran \u2014 calling the one who turned away and hoarded wealth." },
        { ayahs: "19\u201335", title: "The Portrait of Human Nature", color: "#9b7fd4", isPivot: true, desc: "The surah\u2019s centerpiece. The human being was created halu\u2019a \u2014 anxious: panicking at hardship, withholding at ease. Then the exception, quality by quality: constant prayer, systematic charity, belief in the Day, fear of God, guarding chastity, faithfulness to trusts, standing by testimony, and guarding prayer again. The list begins and ends with prayer." },
        { ayahs: "36\u201344", title: "The Mockery and the Oath", color: "#4ecdc4", desc: "The disbelievers crowd around the Prophet as though Paradise is a public garden anyone can enter. Kalla \u2014 never. Then the widest oath: the Lord of every sunrise and sunset swears He can replace them all. Leave them to plunge and play until they emerge from their graves, humbled, rushing toward markers \u2014 that is the Day they were promised." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah\u2019s opening question and closing answer frame the diagnosis at the center",
      pairs: [
        {
          left: { label: "Punishment Demanded", ayahs: "1\u20132", desc: "A questioner asks about a falling punishment \u2014 calling the bluff, demanding it be brought forward" },
          right: { label: "Promise Fulfilled", ayahs: "42\u201344", desc: "Leave them to plunge and play until they meet their Day \u2014 emerging from graves, humiliation covering them" },
          color: "#C9A84C",
        },
        {
          left: { label: "Divine Scale", ayahs: "3\u20137", desc: "The Lord of the Ascending Stairways, a Day of fifty thousand years \u2014 they see it distant, We see it near" },
          right: { label: "Divine Oath", ayahs: "40\u201341", desc: "The Lord of every sunrise and sunset swears He can replace them with better \u2014 scope answering scope" },
          color: "#e07a8a",
        },
        {
          left: { label: "The Day\u2019s Horror", ayahs: "8\u201318", desc: "Molten sky, scattered mountains, no friend for another \u2014 and the Fire that calls the one who hoarded" },
          right: { label: "The Mockers", ayahs: "36\u201339", desc: "Crowding around the Prophet, assuming entry into Paradise \u2014 Kalla! You are made from what you know" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Human Condition", ayahs: "19\u201335",
        desc: "The creature was created anxious: panicking under hardship, hoarding under ease. Except those who pray, give, believe, fear, guard, and keep their word.",
        note: "The ring places the full portrait of human possibility between the question about punishment and the answer. The diagnosis is the surah\u2019s center of gravity.",
      },
    },
    deductiveFunnel: {
      title: "The Prescription",
      subtitle: "The qualities of the exception \u2014 each one answering one dimension of the halu\u2019 condition",
      layers: [
        { depth: 1, label: "Constant Prayer", ayah: "22\u201323", arabic: "\u0625\u0650\u0644\u0651\u064E\u0627 \u0627\u0644\u0652\u0645\u064F\u0635\u064E\u0644\u0651\u0650\u064A\u0646\u064E", desc: "Prayer as the baseline discipline \u2014 the word da\u2019imun means persistent, continual. The first and most fundamental remedy for the anxious soul.", color: "#C9A84C" },
        { depth: 2, label: "Systematic Charity", ayah: "24\u201325", arabic: "\u062D\u064E\u0642\u0651\u064C \u0645\u0651\u064E\u0639\u0652\u0644\u064F\u0648\u0645\u064C", desc: "A known, established portion in their wealth for the beggar and the deprived. Not spontaneous generosity but structural generosity \u2014 built into the architecture of one\u2019s life.", color: "#4ecdc4" },
        { depth: 3, label: "Belief and Fear", ayah: "26\u201328", arabic: "\u064A\u064F\u0635\u064E\u062F\u0651\u0650\u0642\u064F\u0648\u0646\u064E \u0628\u0650\u064A\u064E\u0648\u0652\u0645\u0650 \u0627\u0644\u062F\u0651\u0650\u064A\u0646\u0650", desc: "Belief in the Day of Judgment and conscious fear of God\u2019s punishment \u2014 with the sobering parenthetical that no one is safe from it. The center of the ring within the ring.", color: "#9b7fd4" },
        { depth: 4, label: "Guarding Prayer", ayah: "34", arabic: "\u0639\u064E\u0644\u064E\u0649\u0670 \u0635\u064E\u0644\u064E\u0627\u062A\u0650\u0647\u0650\u0645\u0652 \u064A\u064F\u062D\u064E\u0627\u0641\u0650\u0638\u064F\u0648\u0646\u064E", desc: "The list closes where it opened. Prayer is the container, and everything else is what prayer is meant to produce. The ring structure argues that the entire ethical life begins and ends in standing before God.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "The surah diagnoses rather than narrates \u2014 every absence sharpens the clinical gaze",
      absences: [
        { item: "No prophetic stories", note: "No Musa, no Ibrahim, no destroyed nations. The surah is not interested in history as a warning. Its gaze is fixed on something more elemental: the raw material of the human soul." },
        { item: "No legal instructions", note: "No communal legislation, no specific commands beyond the ethical portrait. The surah is a diagnosis and a prescription, not a code of law." },
        { item: "No consolation to the Prophet", note: "Despite the Makkan context that would support it, no direct comfort is offered. Instead, sabr jamil \u2014 beautiful patience \u2014 the same phrase spoken by Ya\u2019qub when his sons lied about Yusuf." },
        { item: "No extended dialogue", note: "No back-and-forth. The questioner asks and the surah answers not with a date but with a mirror \u2014 redirecting the gaze from the sky to the soul." },
        { item: "No abstract theology", note: "The surah\u2019s portrait of the righteous (22\u201335) is not a list of beliefs but a list of practices \u2014 specific, concrete, and ordered. Faith is rendered as a discipline, not an opinion." },
      ],
    },
  },

  contentNodes: [
    { concept: "Halu\u2019 \u2014 the Quran\u2019s unique diagnosis of human anxiety", type: "surah-specific", articleSlug: "halu-human-anxiety-70-19" },
    { concept: "Sabr jamil \u2014 the phrase shared with Ya\u2019qub in Surah Yusuf", type: "cross-surah", articleSlug: "sabr-jamil-70-12" },
    { concept: "Lazza \u2014 the fire-name used only in Al-Ma\u2019arij", type: "surah-specific", articleSlug: "lazza-scorching-fire-70-15" },
    { concept: "The ring of the righteous \u2014 prayer bookending the ethical life", type: "surah-specific", articleSlug: "ring-righteous-prayer-70-22-34" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "courtroom", label: "Diagnosis" },
  { id: "mirror", label: "Ring" },
  { id: "autopsy", label: "Prescription" },
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
      <span className="text-gold-500/50 text-sm">{"\u06DE"}</span>
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
        Prayer \u2192 charity \u2192 belief \u2192 prayer
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

        {/* -- Hero --------------------------------------------------------- */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} {"\u00B7"} {d.period}
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
          {activeTab === "courtroom" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "autopsy" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
        </div>

        {/* -- Go Deeper ---------------------------------------------------- */}
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
