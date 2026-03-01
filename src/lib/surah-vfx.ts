export type RendererType =
  | "yusuf"          // 12: the dream — 11 stars, sun, moon orbiting
  | "light-pillars"  // 1, 24, 97: radiating shafts of light
  | "cave"           // 18: darkness with entering light shafts
  | "waves"          // 55, 2: rhythmic dual waves
  | "starfield"      // 67, 85, 86, 53, 54: deep space parallax
  | "unity"          // 112: expanding concentric circles, pure oneness
  | "dawn"           // 89, 91, 93: horizon brightening
  | "organic"        // 19, 36: flowing pollen / growth
  | "sand-wind"      // 51, 77, 81: sweeping scattered particles
  | "flowing-field"; // default: curl-like flowing field

export type Palette = {
  bg: string;
  primary: string;
  secondary: string;
  accent: string;
};

export type SurahVFX = {
  renderer: RendererType;
  palette: Palette;
  speed: number;     // 0.3 slow → 1.5 fast
  intensity: number; // 0.6 subtle → 1.5 vivid
  motif: string;     // thematic label shown in UI
};

const W = "#FFFFFF";

export function getSurahVFX(n: number): SurahVFX {
  // ── Specific surahs with bespoke renderers ──────────────────────────
  switch (n) {
    case 1:
      return vfx("light-pillars",
        { bg: "#020108", primary: "#FFD700", secondary: W, accent: "#FFF8C0" },
        0.65, 1.0, "Seven gates of light");

    case 2:
      return vfx("waves",
        { bg: "#010310", primary: "#4A80FF", secondary: "#8AACFF", accent: "#C0D4FF" },
        0.55, 1.2, "Vast rivers of guidance");

    case 12:
      return vfx("yusuf",
        { bg: "#020212", primary: "#FFD700", secondary: "#C8C8FF", accent: "#FFA020" },
        0.32, 1.0, "Eleven stars, the sun, and the moon");

    case 17:
      return vfx("light-pillars",
        { bg: "#030212", primary: "#C0B0FF", secondary: "#8070D0", accent: W },
        0.5, 1.1, "The night journey through the heavens");

    case 18:
      return vfx("cave",
        { bg: "#050403", primary: "#FFFBE0", secondary: "#FFE090", accent: W },
        0.6, 0.9, "Light entering the cave");

    case 19:
      return vfx("organic",
        { bg: "#030806", primary: "#90E0A0", secondary: "#60C070", accent: "#C0F0C0" },
        0.7, 0.9, "Life from the desert");

    case 24:
      return vfx("light-pillars",
        { bg: "#030308", primary: "#FFFDE8", secondary: "#FFE080", accent: W },
        0.5, 1.3, "Light upon light");

    case 36:
      return vfx("organic",
        { bg: "#030607", primary: "#70D090", secondary: "#40A060", accent: "#A0F0B0" },
        0.85, 1.0, "Heart of the Quran");

    case 44:
      return vfx("cave",
        { bg: "#040206", primary: "#D0A0E8", secondary: "#9060C0", accent: "#E8C0F8" },
        0.45, 0.9, "Smoke veiling the sky");

    case 53:
      return vfx("starfield",
        { bg: "#020108", primary: "#FFE8A0", secondary: "#FFD060", accent: W },
        0.45, 1.0, "By the star when it descends");

    case 54:
      return vfx("starfield",
        { bg: "#010210", primary: "#A0C0FF", secondary: "#8090FF", accent: "#C8D8FF" },
        0.5, 0.9, "The moon was split");

    case 55:
      return vfx("waves",
        { bg: "#010A08", primary: "#20D4A0", secondary: "#FFD060", accent: "#80FFD0" },
        0.72, 1.15, "Which of the favors of your Lord will you deny?");

    case 67:
      return vfx("starfield",
        { bg: "#010108", primary: "#D8E8FF", secondary: "#7090FF", accent: "#FFD0A0" },
        0.42, 1.0, "Kingdom of the seven heavens");

    case 81:
      return vfx("sand-wind",
        { bg: "#020108", primary: "#C0B0FF", secondary: "#8060D0", accent: "#E0D0FF" },
        1.3, 1.1, "When the stars are extinguished");

    case 85:
      return vfx("starfield",
        { bg: "#020108", primary: "#FFD0A0", secondary: "#FF8060", accent: "#FFE8D0" },
        0.48, 0.9, "The great constellations");

    case 86:
      return vfx("starfield",
        { bg: "#010208", primary: "#C0D8FF", secondary: "#A0B0FF", accent: W },
        0.55, 0.85, "The piercing star");

    case 89:
      return vfx("dawn",
        { bg: "#010008", primary: "#FFB040", secondary: "#FF6020", accent: "#FFE090" },
        0.38, 1.0, "By the dawn");

    case 91:
      return vfx("dawn",
        { bg: "#020108", primary: "#FFD060", secondary: "#FFA020", accent: "#FFF0A0" },
        0.5, 0.9, "By the sun and its brightness");

    case 92:
      return vfx("starfield",
        { bg: "#010108", primary: "#9080FF", secondary: "#6060D0", accent: "#C0C0FF" },
        0.38, 0.85, "By the night when it covers");

    case 93:
      return vfx("dawn",
        { bg: "#020108", primary: "#FFD080", secondary: "#FFB030", accent: "#FFF0C0" },
        0.52, 0.85, "By the morning brightness");

    case 97:
      return vfx("light-pillars",
        { bg: "#010012", primary: "#D0D0FF", secondary: "#8080FF", accent: W },
        0.35, 1.45, "A thousand months — the descending of angels");

    case 99:
      return vfx("sand-wind",
        { bg: "#050402", primary: "#E0A060", secondary: "#C08040", accent: "#F0C080" },
        1.6, 1.4, "The earth shakes violently");

    case 112:
      return vfx("unity",
        { bg: "#020106", primary: "#FFD700", secondary: "#FFF0B0", accent: W },
        0.42, 1.0, "He is One");

    case 113:
      return vfx("dawn",
        { bg: "#010108", primary: "#FFD090", secondary: "#FFA040", accent: W },
        0.48, 0.9, "Lord of the daybreak");
  }

  // ── Thematic group fallbacks ────────────────────────────────────────

  // Scattering winds
  if ([51, 77, 79, 100, 101].includes(n)) {
    const p: Record<number, Palette> = {
      51: { bg: "#060502", primary: "#E0B060", secondary: "#C09040", accent: "#F0D090" },
      77: { bg: "#050402", primary: "#D0A050", secondary: "#B08030", accent: "#E8C070" },
      79: { bg: "#040402", primary: "#C8A050", secondary: "#A07030", accent: "#E0C070" },
      100: { bg: "#060302", primary: "#E0A040", secondary: "#C07020", accent: "#F0C060" },
      101: { bg: "#060302", primary: "#E86040", secondary: "#C04020", accent: "#FF9060" },
    };
    return vfx("sand-wind", p[n] ?? p[51], 1.2, 1.1, "Winds and scattering");
  }

  // Garden / organic growth
  if ([20, 95, 96].includes(n)) {
    const p: Record<number, Palette> = {
      20: { bg: "#040602", primary: "#90E080", secondary: "#50B050", accent: "#C0F0A0" },
      95: { bg: "#030503", primary: "#80D070", secondary: "#40A040", accent: "#B0E090" },
      96: { bg: "#030408", primary: "#9080FF", secondary: "#6050C0", accent: "#C0B0FF" },
    };
    return vfx("organic", p[n] ?? p[20], 0.8, 0.9, "Creation unfolding");
  }

  // Default flowing field — pull from surahIdentity color bands
  return defaultFlowingField(n);
}

function vfx(
  renderer: RendererType,
  palette: Palette,
  speed: number,
  intensity: number,
  motif: string
): SurahVFX {
  return { renderer, palette, speed, intensity, motif };
}

function defaultFlowingField(n: number): SurahVFX {
  // Pull color from thematic band (mirrors surahIdentity bands)
  type Band = Palette;
  const band: Band =
    n === 1  ? { bg: "#020108", primary: "#FFD700", secondary: "#FFF0A0", accent: W } :
    n <= 9   ? { bg: "#010310", primary: "#6090FF", secondary: "#4060D0", accent: "#90B8FF" } :
    n <= 20  ? { bg: "#080401", primary: "#E09040", secondary: "#C06820", accent: "#F0C060" } :
    n <= 35  ? { bg: "#010806", primary: "#40D090", secondary: "#209060", accent: "#80F0B0" } :
    n <= 49  ? { bg: "#050108", primary: "#A060D0", secondary: "#7040A0", accent: "#C890E0" } :
    n <= 66  ? { bg: "#080108", primary: "#D06080", secondary: "#A04060", accent: "#F090A0" } :
    n <= 77  ? { bg: "#060301", primary: "#D07030", secondary: "#A04010", accent: "#F0A050" } :
               { bg: "#060501", primary: "#D0A030", secondary: "#A07010", accent: "#F0C860" };

  const speed = 0.65 + ((n * 11) % 7) / 14;
  const intensity = 0.75 + ((n * 13) % 5) / 10;
  const motifs = [
    "Verses in motion", "Flowing revelation", "Quranic current",
    "Words of the unseen", "The living word",
  ];

  return vfx("flowing-field", band, speed, intensity, motifs[n % motifs.length]);
}
