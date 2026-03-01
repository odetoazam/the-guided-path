export type Place = "Makki" | "Madani";

export type SurahMeta = {
  n: number;
  nameAr: string;
  nameEn: string;
  ayahs: number;
  place: Place;
  juz: number;
};

export const SURAHS: SurahMeta[] = [
  { n: 1,   nameAr: "الفاتحة",    nameEn: "Al-Fatiha",      ayahs: 7,   place: "Makki",  juz: 1  },
  { n: 2,   nameAr: "البقرة",     nameEn: "Al-Baqara",      ayahs: 286, place: "Madani", juz: 1  },
  { n: 3,   nameAr: "آل عمران",   nameEn: "Ali 'Imran",     ayahs: 200, place: "Madani", juz: 3  },
  { n: 4,   nameAr: "النساء",     nameEn: "An-Nisa",        ayahs: 176, place: "Madani", juz: 4  },
  { n: 5,   nameAr: "المائدة",    nameEn: "Al-Ma'ida",      ayahs: 120, place: "Madani", juz: 6  },
  { n: 6,   nameAr: "الأنعام",    nameEn: "Al-An'am",       ayahs: 165, place: "Makki",  juz: 7  },
  { n: 7,   nameAr: "الأعراف",    nameEn: "Al-A'raf",       ayahs: 206, place: "Makki",  juz: 8  },
  { n: 8,   nameAr: "الأنفال",    nameEn: "Al-Anfal",       ayahs: 75,  place: "Madani", juz: 9  },
  { n: 9,   nameAr: "التوبة",     nameEn: "At-Tawba",       ayahs: 129, place: "Madani", juz: 10 },
  { n: 10,  nameAr: "يونس",       nameEn: "Yunus",          ayahs: 109, place: "Makki",  juz: 11 },
  { n: 11,  nameAr: "هود",        nameEn: "Hud",            ayahs: 123, place: "Makki",  juz: 11 },
  { n: 12,  nameAr: "يوسف",       nameEn: "Yusuf",          ayahs: 111, place: "Makki",  juz: 12 },
  { n: 13,  nameAr: "الرعد",      nameEn: "Ar-Ra'd",        ayahs: 43,  place: "Madani", juz: 13 },
  { n: 14,  nameAr: "إبراهيم",    nameEn: "Ibrahim",        ayahs: 52,  place: "Makki",  juz: 13 },
  { n: 15,  nameAr: "الحجر",      nameEn: "Al-Hijr",        ayahs: 99,  place: "Makki",  juz: 14 },
  { n: 16,  nameAr: "النحل",      nameEn: "An-Nahl",        ayahs: 128, place: "Makki",  juz: 14 },
  { n: 17,  nameAr: "الإسراء",    nameEn: "Al-Isra",        ayahs: 111, place: "Makki",  juz: 15 },
  { n: 18,  nameAr: "الكهف",      nameEn: "Al-Kahf",        ayahs: 110, place: "Makki",  juz: 15 },
  { n: 19,  nameAr: "مريم",       nameEn: "Maryam",         ayahs: 98,  place: "Makki",  juz: 16 },
  { n: 20,  nameAr: "طه",         nameEn: "Ta-Ha",          ayahs: 135, place: "Makki",  juz: 16 },
  { n: 21,  nameAr: "الأنبياء",   nameEn: "Al-Anbiya",      ayahs: 112, place: "Makki",  juz: 17 },
  { n: 22,  nameAr: "الحج",       nameEn: "Al-Hajj",        ayahs: 78,  place: "Madani", juz: 17 },
  { n: 23,  nameAr: "المؤمنون",   nameEn: "Al-Mu'minun",    ayahs: 118, place: "Makki",  juz: 18 },
  { n: 24,  nameAr: "النور",      nameEn: "An-Nur",         ayahs: 64,  place: "Madani", juz: 18 },
  { n: 25,  nameAr: "الفرقان",    nameEn: "Al-Furqan",      ayahs: 77,  place: "Makki",  juz: 18 },
  { n: 26,  nameAr: "الشعراء",    nameEn: "Ash-Shu'ara",    ayahs: 227, place: "Makki",  juz: 19 },
  { n: 27,  nameAr: "النمل",      nameEn: "An-Naml",        ayahs: 93,  place: "Makki",  juz: 19 },
  { n: 28,  nameAr: "القصص",      nameEn: "Al-Qasas",       ayahs: 88,  place: "Makki",  juz: 20 },
  { n: 29,  nameAr: "العنكبوت",   nameEn: "Al-'Ankabut",    ayahs: 69,  place: "Makki",  juz: 20 },
  { n: 30,  nameAr: "الروم",      nameEn: "Ar-Rum",         ayahs: 60,  place: "Makki",  juz: 21 },
  { n: 31,  nameAr: "لقمان",      nameEn: "Luqman",         ayahs: 34,  place: "Makki",  juz: 21 },
  { n: 32,  nameAr: "السجدة",     nameEn: "As-Sajda",       ayahs: 30,  place: "Makki",  juz: 21 },
  { n: 33,  nameAr: "الأحزاب",    nameEn: "Al-Ahzab",       ayahs: 73,  place: "Madani", juz: 21 },
  { n: 34,  nameAr: "سبأ",        nameEn: "Saba",           ayahs: 54,  place: "Makki",  juz: 22 },
  { n: 35,  nameAr: "فاطر",       nameEn: "Fatir",          ayahs: 45,  place: "Makki",  juz: 22 },
  { n: 36,  nameAr: "يس",         nameEn: "Ya-Sin",         ayahs: 83,  place: "Makki",  juz: 22 },
  { n: 37,  nameAr: "الصافات",    nameEn: "As-Saffat",      ayahs: 182, place: "Makki",  juz: 23 },
  { n: 38,  nameAr: "ص",          nameEn: "Sad",            ayahs: 88,  place: "Makki",  juz: 23 },
  { n: 39,  nameAr: "الزمر",      nameEn: "Az-Zumar",       ayahs: 75,  place: "Makki",  juz: 23 },
  { n: 40,  nameAr: "غافر",       nameEn: "Ghafir",         ayahs: 85,  place: "Makki",  juz: 24 },
  { n: 41,  nameAr: "فصلت",       nameEn: "Fussilat",       ayahs: 54,  place: "Makki",  juz: 24 },
  { n: 42,  nameAr: "الشورى",     nameEn: "Ash-Shura",      ayahs: 53,  place: "Makki",  juz: 25 },
  { n: 43,  nameAr: "الزخرف",     nameEn: "Az-Zukhruf",     ayahs: 89,  place: "Makki",  juz: 25 },
  { n: 44,  nameAr: "الدخان",     nameEn: "Ad-Dukhan",      ayahs: 59,  place: "Makki",  juz: 25 },
  { n: 45,  nameAr: "الجاثية",    nameEn: "Al-Jathiya",     ayahs: 37,  place: "Makki",  juz: 25 },
  { n: 46,  nameAr: "الأحقاف",    nameEn: "Al-Ahqaf",       ayahs: 35,  place: "Makki",  juz: 26 },
  { n: 47,  nameAr: "محمد",       nameEn: "Muhammad",       ayahs: 38,  place: "Madani", juz: 26 },
  { n: 48,  nameAr: "الفتح",      nameEn: "Al-Fath",        ayahs: 29,  place: "Madani", juz: 26 },
  { n: 49,  nameAr: "الحجرات",    nameEn: "Al-Hujurat",     ayahs: 18,  place: "Madani", juz: 26 },
  { n: 50,  nameAr: "ق",          nameEn: "Qaf",            ayahs: 45,  place: "Makki",  juz: 26 },
  { n: 51,  nameAr: "الذاريات",   nameEn: "Adh-Dhariyat",   ayahs: 60,  place: "Makki",  juz: 26 },
  { n: 52,  nameAr: "الطور",      nameEn: "At-Tur",         ayahs: 49,  place: "Makki",  juz: 27 },
  { n: 53,  nameAr: "النجم",      nameEn: "An-Najm",        ayahs: 62,  place: "Makki",  juz: 27 },
  { n: 54,  nameAr: "القمر",      nameEn: "Al-Qamar",       ayahs: 55,  place: "Makki",  juz: 27 },
  { n: 55,  nameAr: "الرحمن",     nameEn: "Ar-Rahman",      ayahs: 78,  place: "Madani", juz: 27 },
  { n: 56,  nameAr: "الواقعة",    nameEn: "Al-Waqi'a",      ayahs: 96,  place: "Makki",  juz: 27 },
  { n: 57,  nameAr: "الحديد",     nameEn: "Al-Hadid",       ayahs: 29,  place: "Madani", juz: 27 },
  { n: 58,  nameAr: "المجادلة",   nameEn: "Al-Mujadila",    ayahs: 22,  place: "Madani", juz: 28 },
  { n: 59,  nameAr: "الحشر",      nameEn: "Al-Hashr",       ayahs: 24,  place: "Madani", juz: 28 },
  { n: 60,  nameAr: "الممتحنة",   nameEn: "Al-Mumtahana",   ayahs: 13,  place: "Madani", juz: 28 },
  { n: 61,  nameAr: "الصف",       nameEn: "As-Saf",         ayahs: 14,  place: "Madani", juz: 28 },
  { n: 62,  nameAr: "الجمعة",     nameEn: "Al-Jumu'a",      ayahs: 11,  place: "Madani", juz: 28 },
  { n: 63,  nameAr: "المنافقون",  nameEn: "Al-Munafiqun",   ayahs: 11,  place: "Madani", juz: 28 },
  { n: 64,  nameAr: "التغابن",    nameEn: "At-Taghabun",    ayahs: 18,  place: "Madani", juz: 28 },
  { n: 65,  nameAr: "الطلاق",     nameEn: "At-Talaq",       ayahs: 12,  place: "Madani", juz: 28 },
  { n: 66,  nameAr: "التحريم",    nameEn: "At-Tahrim",      ayahs: 12,  place: "Madani", juz: 28 },
  { n: 67,  nameAr: "الملك",      nameEn: "Al-Mulk",        ayahs: 30,  place: "Makki",  juz: 29 },
  { n: 68,  nameAr: "القلم",      nameEn: "Al-Qalam",       ayahs: 52,  place: "Makki",  juz: 29 },
  { n: 69,  nameAr: "الحاقة",     nameEn: "Al-Haqqa",       ayahs: 52,  place: "Makki",  juz: 29 },
  { n: 70,  nameAr: "المعارج",    nameEn: "Al-Ma'arij",     ayahs: 44,  place: "Makki",  juz: 29 },
  { n: 71,  nameAr: "نوح",        nameEn: "Nuh",            ayahs: 28,  place: "Makki",  juz: 29 },
  { n: 72,  nameAr: "الجن",       nameEn: "Al-Jinn",        ayahs: 28,  place: "Makki",  juz: 29 },
  { n: 73,  nameAr: "المزمل",     nameEn: "Al-Muzzammil",   ayahs: 20,  place: "Makki",  juz: 29 },
  { n: 74,  nameAr: "المدثر",     nameEn: "Al-Muddathir",   ayahs: 56,  place: "Makki",  juz: 29 },
  { n: 75,  nameAr: "القيامة",    nameEn: "Al-Qiyama",      ayahs: 40,  place: "Makki",  juz: 29 },
  { n: 76,  nameAr: "الإنسان",    nameEn: "Al-Insan",       ayahs: 31,  place: "Madani", juz: 29 },
  { n: 77,  nameAr: "المرسلات",   nameEn: "Al-Mursalat",    ayahs: 50,  place: "Makki",  juz: 29 },
  { n: 78,  nameAr: "النبأ",      nameEn: "An-Naba",        ayahs: 40,  place: "Makki",  juz: 30 },
  { n: 79,  nameAr: "النازعات",   nameEn: "An-Nazi'at",     ayahs: 46,  place: "Makki",  juz: 30 },
  { n: 80,  nameAr: "عبس",        nameEn: "Abasa",          ayahs: 42,  place: "Makki",  juz: 30 },
  { n: 81,  nameAr: "التكوير",    nameEn: "At-Takwir",      ayahs: 29,  place: "Makki",  juz: 30 },
  { n: 82,  nameAr: "الانفطار",   nameEn: "Al-Infitar",     ayahs: 19,  place: "Makki",  juz: 30 },
  { n: 83,  nameAr: "المطففين",   nameEn: "Al-Mutaffifin",  ayahs: 36,  place: "Makki",  juz: 30 },
  { n: 84,  nameAr: "الانشقاق",   nameEn: "Al-Inshiqaq",    ayahs: 25,  place: "Makki",  juz: 30 },
  { n: 85,  nameAr: "البروج",     nameEn: "Al-Buruj",       ayahs: 22,  place: "Makki",  juz: 30 },
  { n: 86,  nameAr: "الطارق",     nameEn: "At-Tariq",       ayahs: 17,  place: "Makki",  juz: 30 },
  { n: 87,  nameAr: "الأعلى",     nameEn: "Al-A'la",        ayahs: 19,  place: "Makki",  juz: 30 },
  { n: 88,  nameAr: "الغاشية",    nameEn: "Al-Ghashiya",    ayahs: 26,  place: "Makki",  juz: 30 },
  { n: 89,  nameAr: "الفجر",      nameEn: "Al-Fajr",        ayahs: 30,  place: "Makki",  juz: 30 },
  { n: 90,  nameAr: "البلد",      nameEn: "Al-Balad",       ayahs: 20,  place: "Makki",  juz: 30 },
  { n: 91,  nameAr: "الشمس",      nameEn: "Ash-Shams",      ayahs: 15,  place: "Makki",  juz: 30 },
  { n: 92,  nameAr: "الليل",      nameEn: "Al-Layl",        ayahs: 21,  place: "Makki",  juz: 30 },
  { n: 93,  nameAr: "الضحى",      nameEn: "Ad-Dhuha",       ayahs: 11,  place: "Makki",  juz: 30 },
  { n: 94,  nameAr: "الشرح",      nameEn: "Ash-Sharh",      ayahs: 8,   place: "Makki",  juz: 30 },
  { n: 95,  nameAr: "التين",      nameEn: "At-Tin",         ayahs: 8,   place: "Makki",  juz: 30 },
  { n: 96,  nameAr: "العلق",      nameEn: "Al-'Alaq",       ayahs: 19,  place: "Makki",  juz: 30 },
  { n: 97,  nameAr: "القدر",      nameEn: "Al-Qadr",        ayahs: 5,   place: "Makki",  juz: 30 },
  { n: 98,  nameAr: "البينة",     nameEn: "Al-Bayyina",     ayahs: 8,   place: "Madani", juz: 30 },
  { n: 99,  nameAr: "الزلزلة",    nameEn: "Az-Zalzala",     ayahs: 8,   place: "Madani", juz: 30 },
  { n: 100, nameAr: "العاديات",   nameEn: "Al-'Adiyat",     ayahs: 11,  place: "Makki",  juz: 30 },
  { n: 101, nameAr: "القارعة",    nameEn: "Al-Qari'a",      ayahs: 11,  place: "Makki",  juz: 30 },
  { n: 102, nameAr: "التكاثر",    nameEn: "At-Takathur",    ayahs: 8,   place: "Makki",  juz: 30 },
  { n: 103, nameAr: "العصر",      nameEn: "Al-'Asr",        ayahs: 3,   place: "Makki",  juz: 30 },
  { n: 104, nameAr: "الهمزة",     nameEn: "Al-Humaza",      ayahs: 9,   place: "Makki",  juz: 30 },
  { n: 105, nameAr: "الفيل",      nameEn: "Al-Fil",         ayahs: 5,   place: "Makki",  juz: 30 },
  { n: 106, nameAr: "قريش",       nameEn: "Quraysh",        ayahs: 4,   place: "Makki",  juz: 30 },
  { n: 107, nameAr: "الماعون",    nameEn: "Al-Ma'un",       ayahs: 7,   place: "Makki",  juz: 30 },
  { n: 108, nameAr: "الكوثر",     nameEn: "Al-Kawthar",     ayahs: 3,   place: "Makki",  juz: 30 },
  { n: 109, nameAr: "الكافرون",   nameEn: "Al-Kafirun",     ayahs: 6,   place: "Makki",  juz: 30 },
  { n: 110, nameAr: "النصر",      nameEn: "An-Nasr",        ayahs: 3,   place: "Madani", juz: 30 },
  { n: 111, nameAr: "المسد",      nameEn: "Al-Masad",       ayahs: 5,   place: "Makki",  juz: 30 },
  { n: 112, nameAr: "الإخلاص",    nameEn: "Al-Ikhlas",      ayahs: 4,   place: "Makki",  juz: 30 },
  { n: 113, nameAr: "الفلق",      nameEn: "Al-Falaq",       ayahs: 5,   place: "Makki",  juz: 30 },
  { n: 114, nameAr: "الناس",      nameEn: "An-Nas",         ayahs: 6,   place: "Makki",  juz: 30 },
];

export const MAX_AYAHS = 286; // Al-Baqara

/** Deterministic thematic color identity per surah */
export function surahIdentity(n: number) {
  // Thematic bands mapping Quranic structure to color regions
  type Band = { baseHue: number; sat: number };
  const band: Band =
    n === 1  ? { baseHue: 43,  sat: 90 } : // Al-Fatiha: pure gold
    n <= 9   ? { baseHue: 215, sat: 70 } : // Long Madani: sapphire
    n <= 20  ? { baseHue: 35,  sat: 78 } : // Makki prophetic: amber
    n <= 35  ? { baseHue: 162, sat: 65 } : // Wisdom surahs: teal
    n <= 49  ? { baseHue: 272, sat: 60 } : // Warning surahs: violet
    n <= 66  ? { baseHue: 342, sat: 72 } : // Short Madani: rose
    n <= 77  ? { baseHue: 22,  sat: 76 } : // Late Makki: copper
                { baseHue: 44,  sat: 70 };  // Final Makki: warm gold

  // ±10° variation within band for uniqueness, without feeling random
  const hueShift = ((n * 7) % 21) - 10;
  const hue = (band.baseHue + hueShift + 360) % 360;
  const lightness = 58 + ((n * 11) % 12); // 58–70%
  const glow = 0.20 + ((n * 13) % 20) / 100; // 0.20–0.40
  const grain = 0.07 + ((n * 17) % 10) / 100; // 0.07–0.17

  return { hue, sat: band.sat, lightness, glow, grain };
}

/** Arabic font size tuned to string length for card display */
export function arabicSize(text: string): string {
  const len = text.length;
  if (len <= 2) return "2rem";
  if (len <= 4) return "1.7rem";
  if (len <= 6) return "1.4rem";
  if (len <= 8) return "1.2rem";
  return "1.05rem";
}
