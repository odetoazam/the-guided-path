// AyahGuide brand tokens — single source of truth for carousel system

export const B = {
  bg:        '#0D1B2A',
  bgCard:    '#162F3D',
  gold:      '#C9A84C',
  goldLight: '#DBBF6A',
  goldDark:  '#B8960C',
  cream:     '#F5F0E8',
  muted:     '#D8D0C4',
  dim:       'rgba(245,240,232,0.45)',
} as const;

// ── Color themes ──────────────────────────────────────────────────────────────
// Each theme exposes the same shape as B so render functions can swap T for B.
export interface Theme {
  bg:         string;
  bgCard:     string;
  gold:       string;
  goldLight:  string;
  goldDark:   string;
  cream:      string;    // primary text
  muted:      string;    // secondary text
  dim:        string;    // tertiary text / subtext
  // Pre-computed rgba helpers for the accent colour
  accentAlpha06:  string;
  accentAlpha10:  string;
  accentAlpha14:  string;
  accentAlpha16:  string;
  accentAlpha18:  string;
  accentAlpha25:  string;
  accentAlpha30:  string;
  accentAlpha35:  string;
  accentAlpha38:  string;
  accentAlpha40:  string;
  accentAlpha55:  string;
  textAlpha07:    string; // faint text line separators
  textAlpha22:    string; // slide counter opacity
  textAlpha45:    string; // === dim alias
}

function makeTheme(
  bg: string, bgCard: string,
  gold: string, goldLight: string, goldDark: string,
  cream: string, muted: string,
  dimStr: string,
  goldRgb: string,   // "r,g,b" of gold for rgba helpers
  textRgb: string,   // "r,g,b" of cream for rgba helpers
): Theme {
  const ga = (a: number) => `rgba(${goldRgb},${a})`;
  const ta = (a: number) => `rgba(${textRgb},${a})`;
  return {
    bg, bgCard, gold, goldLight, goldDark, cream, muted,
    dim:            dimStr,
    accentAlpha06:  ga(0.06),
    accentAlpha10:  ga(0.10),
    accentAlpha14:  ga(0.14),
    accentAlpha16:  ga(0.16),
    accentAlpha18:  ga(0.18),
    accentAlpha25:  ga(0.25),
    accentAlpha30:  ga(0.30),
    accentAlpha35:  ga(0.35),
    accentAlpha38:  ga(0.38),
    accentAlpha40:  ga(0.40),
    accentAlpha55:  ga(0.55),
    textAlpha07:    ta(0.07),
    textAlpha22:    ta(0.22),
    textAlpha45:    ta(0.45),
  };
}

export const THEMES: Record<string, Theme> = {
  // ── dark (default) — navy bg, cream text, gold accent ──────────────────────
  dark: makeTheme(
    '#0D1B2A', '#162F3D',
    '#C9A84C', '#DBBF6A', '#B8960C',
    '#F5F0E8', '#D8D0C4', 'rgba(245,240,232,0.45)',
    '201,168,76', '245,240,232',
  ),

  // ── light — brand cream bg, navy text, gold accent (pure inversion) ────────
  // Same three brand colours; foreground/background swapped.
  light: makeTheme(
    '#F5F0E8', '#EBE4D4',
    '#C9A84C', '#B8960C', '#A07820',
    '#0D1B2A', '#2A3D52', 'rgba(13,27,42,0.55)',
    '201,168,76', '13,27,42',
  ),

  // ── deep — same palette, richer/darker navy for heavier content ────────────
  deep: makeTheme(
    '#06101A', '#0D1E2E',
    '#C9A84C', '#DBBF6A', '#B8960C',
    '#F5F0E8', '#D8D0C4', 'rgba(245,240,232,0.45)',
    '201,168,76', '245,240,232',
  ),

  // ── gold — gold bg, deep navy text (bold, high-contrast, eye-catching) ──────
  gold: makeTheme(
    '#C9A84C', '#B8960C',
    '#0D1B2A', '#162F3D', '#06101A',
    '#0D1B2A', '#1A2E40', 'rgba(13,27,42,0.62)',
    '13,27,42',  '13,27,42',
  ),
};

// Named palettes for content categories (unchanged)
export const PALETTE = {
  faith:     { main: '#C9A84C', bg: 'rgba(201,168,76,0.11)',  border: 'rgba(201,168,76,0.38)' },
  power:     { main: '#6B9FAF', bg: 'rgba(107,159,175,0.11)', border: 'rgba(107,159,175,0.32)' },
  knowledge: { main: '#82AF8A', bg: 'rgba(130,175,138,0.16)', border: 'rgba(130,175,138,0.65)' },
} as const;

export const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400' +
  '&family=Playfair+Display:ital,wght@0,600;0,700;1,400' +
  '&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400' +
  '&family=Inter:wght@400;500;600&display=swap';
