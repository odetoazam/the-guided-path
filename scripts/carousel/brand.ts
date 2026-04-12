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

// Named palettes for content categories
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
