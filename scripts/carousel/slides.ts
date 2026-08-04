import { B, THEMES, Theme, FONTS_URL } from './brand';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SlideBase {
  slideNum:    number;
  totalSlides: number;
  headerArabic: string;
  headerLabel:  string;
  /** Optional colour theme — defaults to 'dark'. See brand.THEMES for options. */
  theme?: string;
}

export interface HookSlide extends SlideBase {
  type:        'hook';
  largeArabic: string;
  hookLine:    string;
  payoff:      string;
  subtext:     string;
}

export interface TimelineSlide extends SlideBase {
  type:     'timeline';
  title:    string;
  subtitle: string;
  stages:   { arabic: string; title: string; desc: string }[];
}

export interface ContrastSlide extends SlideBase {
  type:       'contrast';
  title:      string;
  subtitle:   string;
  leftLabel?: string;
  rightLabel?: string;
  pairs:      { left: string; right: string }[];
  insight:    string;
}

export interface QuoteSlide extends SlideBase {
  type:        'quote';
  badge:       string;
  arabic:      string;
  translation: string;
  reference:   string;
  insight:     string;
}

export interface CtaSlide extends SlideBase {
  type:         'cta';
  sectionLabel: string;
  heading:      string;
  questions:    { label: string; question: string; color: string }[];
  closing:      string;
}

export type AnySlide = HookSlide | TimelineSlide | ContrastSlide | QuoteSlide | CtaSlide;

// ── Theme resolver ────────────────────────────────────────────────────────────

function T(slide: SlideBase): Theme {
  return THEMES[slide.theme ?? 'dark'] ?? THEMES.dark;
}

// ── Islamic geometric ornament (hook slide only) ──────────────────────────────
// 8-pointed khatam star rosette, positioned at each corner of the hook frame.
// Built with inline SVG so Puppeteer renders it with no external assets.

function islamicStar(accent: string, size = 130): string {
  // 8-pointed star polygon: alternating outer (r=48) and inner (r=19) vertices
  // centred in a 130×130 viewBox at (65,65)
  const cx = 65, cy = 65, R = 48, r = 19;
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const outerA = (i * 45 - 90) * Math.PI / 180;
    const innerA = ((i * 45 + 22.5) - 90) * Math.PI / 180;
    pts.push(`${(cx + R * Math.cos(outerA)).toFixed(2)},${(cy + R * Math.sin(outerA)).toFixed(2)}`);
    pts.push(`${(cx + r * Math.cos(innerA)).toFixed(2)},${(cy + r * Math.sin(innerA)).toFixed(2)}`);
  }
  const poly = pts.join(' ');

  // Second star rotated 22.5° for a layered geometric look
  const pts2: string[] = [];
  for (let i = 0; i < 8; i++) {
    const outerA = (i * 45 - 90 + 22.5) * Math.PI / 180;
    const innerA = ((i * 45 + 22.5 + 22.5) - 90) * Math.PI / 180;
    pts2.push(`${(cx + R * Math.cos(outerA)).toFixed(2)},${(cy + R * Math.sin(outerA)).toFixed(2)}`);
    pts2.push(`${(cx + r * Math.cos(innerA)).toFixed(2)},${(cy + r * Math.sin(innerA)).toFixed(2)}`);
  }
  const poly2 = pts2.join(' ');

  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="57" fill="none" stroke="${accent}" stroke-width="0.6" opacity="0.18"/>
    <circle cx="${cx}" cy="${cy}" r="50" fill="none" stroke="${accent}" stroke-width="0.4" opacity="0.12"/>
    <polygon points="${poly2}" fill="none" stroke="${accent}" stroke-width="0.75" opacity="0.18"/>
    <polygon points="${poly}"  fill="${accent}" fill-opacity="0.07" stroke="${accent}" stroke-width="0.9" opacity="0.55"/>
    <circle cx="${cx}" cy="${cy}" r="6"  fill="${accent}" opacity="0.35"/>
    <circle cx="${cx}" cy="${cy}" r="3"  fill="${accent}" opacity="0.55"/>
  </svg>`;
}

// Corner positions: we nudge each ornament so it sits centred on the frame corner,
// slightly overlapping the border — 50 % inside, 50 % clipped at slide edge.
function islamicCornerOrnaments(accent: string): string {
  const s = 140; // ornament size in px
  const inset = 28; // frame inset in px
  // Centre of each ornament sits ON the frame corner point
  const offset = inset - s / 2; // will be negative → slides under/off the edge

  const positions = [
    `top:${offset}px;left:${offset}px;`,
    `top:${offset}px;right:${offset}px;`,
    `bottom:${offset}px;left:${offset}px;`,
    `bottom:${offset}px;right:${offset}px;`,
  ];

  return positions.map(pos =>
    `<div style="position:absolute;${pos}width:${s}px;height:${s}px;pointer-events:none;">${islamicStar(accent, s)}</div>`
  ).join('');
}

// Small diamond accent — used at the mid-point of each frame edge
function midEdgeDiamond(accent: string): string {
  return `<svg viewBox="0 0 28 28" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
    <polygon points="14,2 26,14 14,26 2,14" fill="none" stroke="${accent}" stroke-width="1" opacity="0.35"/>
    <polygon points="14,6 22,14 14,22 6,14"  fill="none" stroke="${accent}" stroke-width="0.6" opacity="0.22"/>
    <circle cx="14" cy="14" r="2.5" fill="${accent}" opacity="0.45"/>
  </svg>`;
}

function islamicHookDecoration(t: Theme): string {
  const accent = t.gold;
  const border = t.accentAlpha25;
  const inset = 28;

  return `
  <div style="position:absolute;inset:0;pointer-events:none;z-index:0;">
    <!-- Outer frame border -->
    <div style="position:absolute;top:${inset}px;right:${inset}px;bottom:${inset}px;left:${inset}px;
                border:1px solid ${border};border-radius:2px;"></div>
    <!-- Corner ornaments -->
    ${islamicCornerOrnaments(accent)}
    <!-- Mid-edge diamonds -->
    <div style="position:absolute;top:${inset - 14}px;left:50%;transform:translateX(-50%);">${midEdgeDiamond(accent)}</div>
    <div style="position:absolute;bottom:${inset - 14}px;left:50%;transform:translateX(-50%);">${midEdgeDiamond(accent)}</div>
    <div style="position:absolute;left:${inset - 14}px;top:50%;transform:translateY(-50%);">${midEdgeDiamond(accent)}</div>
    <div style="position:absolute;right:${inset - 14}px;top:50%;transform:translateY(-50%);">${midEdgeDiamond(accent)}</div>
    <!-- Subtle inner glow at top (behind content) -->
    <div style="position:absolute;top:-100px;left:50%;transform:translateX(-50%);
                width:720px;height:320px;
                background:radial-gradient(ellipse,${t.accentAlpha06} 0%,transparent 68%);"></div>
  </div>`;
}

// ── Shared building blocks ────────────────────────────────────────────────────

const ambientGlow = (t: Theme, opacity = '0.05') =>
  `<div style="position:absolute;top:-120px;left:50%;transform:translateX(-50%);width:800px;height:380px;background:radial-gradient(ellipse,${t.accentAlpha06} 0%,transparent 68%);pointer-events:none;"></div>`;

function slideHeader(t: Theme, arabic: string, label: string, num: number, total: number): string {
  return `
<div style="display:flex;align-items:center;justify-content:space-between;padding:40px 60px 0;z-index:1;">
  <div style="display:flex;align-items:center;gap:14px;">
    <div style="width:4px;height:48px;background:${t.gold};border-radius:3px;flex-shrink:0;"></div>
    <div>
      <div style="font-size:24px;font-family:'Amiri',serif;color:${t.gold};line-height:1.2;">${arabic}</div>
      <div style="font-size:12px;font-family:'Inter',sans-serif;color:${t.muted};letter-spacing:4px;text-transform:uppercase;margin-top:3px;">${label}</div>
    </div>
  </div>
  <div style="font-size:15px;font-family:'Inter',sans-serif;color:${t.textAlpha22};letter-spacing:2px;">${num} / ${total}</div>
</div>`;
}

function slideFooter(t: Theme, cta = false): string {
  return cta
    ? `<div style="padding:0 60px 40px;display:flex;align-items:center;justify-content:space-between;z-index:1;">
         <div style="display:flex;align-items:center;gap:8px;">
           <span style="font-size:15px;font-family:'Inter',sans-serif;color:${t.textAlpha45};letter-spacing:2px;">swipe</span>
           <span style="font-size:20px;color:${t.textAlpha45};">›</span>
         </div>
         <div style="font-size:15px;font-family:'Inter',sans-serif;color:${t.gold};letter-spacing:2px;border:1px solid ${t.accentAlpha35};border-radius:40px;padding:8px 24px;">ayahguide.com</div>
       </div>`
    : `<div style="padding:0 60px 40px;display:flex;justify-content:flex-end;z-index:1;">
         <div style="font-size:13px;font-family:'Inter',sans-serif;color:${t.accentAlpha40};letter-spacing:4px;text-transform:uppercase;">ayahguide.com</div>
       </div>`;
}

function wrapSlide(num: number, bg: string, content: string): string {
  return `<div data-slide="${num}" style="position:relative;width:1080px;height:1080px;background:${bg};display:flex;flex-direction:column;overflow:hidden;">${content}</div>`;
}

// ── Hook slide ────────────────────────────────────────────────────────────────

export function hookSlide(d: HookSlide): string {
  const t = T(d);
  const dots = Array.from({ length: d.totalSlides }, (_, i) =>
    `<div style="width:${i === 0 ? '32px' : '10px'};height:10px;border-radius:5px;background:${i === 0 ? t.gold : t.accentAlpha18};"></div>`
  ).join('');

  return wrapSlide(d.slideNum, t.bg, `
    ${islamicHookDecoration(t)}
    ${slideHeader(t, d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 160px;text-align:center;z-index:1;">
      <div style="font-size:108px;font-family:'Amiri',serif;color:${t.gold};line-height:1.3;margin-bottom:36px;letter-spacing:4px;">${d.largeArabic}</div>
      <div style="display:flex;align-items:center;gap:18px;margin-bottom:44px;width:76%;">
        <div style="flex:1;height:1px;background:${t.accentAlpha16};"></div>
        <div style="width:7px;height:7px;border-radius:50%;background:${t.gold};opacity:0.5;"></div>
        <div style="flex:1;height:1px;background:${t.accentAlpha16};"></div>
      </div>
      <div style="font-size:64px;font-family:'Playfair Display',serif;color:${t.cream};line-height:1.3;margin-bottom:20px;font-style:italic;">${d.hookLine}</div>
      <div style="font-size:84px;font-family:'Playfair Display',serif;font-weight:700;line-height:1.15;background:linear-gradient(135deg,${t.goldLight} 0%,${t.goldDark} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:28px;">${d.payoff}</div>
      <div style="font-size:32px;font-family:'Source Serif 4',serif;color:${t.dim};line-height:1.8;max-width:680px;">${d.subtext}</div>
    </div>
    <div style="position:absolute;bottom:96px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;z-index:1;">${dots}</div>
    ${slideFooter(t, false)}
  `);
}

// ── Timeline slide ────────────────────────────────────────────────────────────

export function timelineSlide(d: TimelineSlide): string {
  const t = T(d);
  const stagesHtml = d.stages.map((stage, i) => `
    <div style="display:flex;gap:24px;align-items:flex-start;position:relative;z-index:1;">
      <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;">
        <div style="width:56px;height:56px;border-radius:50%;background:${t.accentAlpha10};border:1.5px solid ${t.accentAlpha35};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="font-size:22px;font-family:'Amiri',serif;color:${t.gold};">${stage.arabic}</span>
        </div>
        ${i < d.stages.length - 1 ? `<div style="width:1px;flex:1;min-height:24px;background:${t.accentAlpha16};margin-top:4px;"></div>` : ''}
      </div>
      <div style="padding-top:8px;padding-bottom:${i < d.stages.length - 1 ? '24px' : '0'};">
        <div style="font-size:46px;font-family:'Playfair Display',serif;color:${t.cream};line-height:1.25;margin-bottom:10px;">${stage.title}</div>
        <div style="font-size:36px;font-family:'Source Serif 4',serif;color:${t.dim};line-height:1.65;font-style:italic;">${stage.desc}</div>
      </div>
    </div>
  `).join('');

  return wrapSlide(d.slideNum, t.bg, `
    ${ambientGlow(t)}
    ${slideHeader(t, d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="padding:28px 60px 0;z-index:1;">
      <div style="font-size:60px;font-family:'Playfair Display',serif;color:${t.cream};margin-bottom:8px;">${d.title}</div>
      <div style="font-size:32px;font-family:'Inter',sans-serif;color:${t.dim};">${d.subtitle}</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:28px 60px;z-index:1;">
      ${stagesHtml}
    </div>
    ${slideFooter(t, true)}
  `);
}

// ── Contrast slide ────────────────────────────────────────────────────────────

export function contrastSlide(d: ContrastSlide): string {
  const t = T(d);
  const pairsHtml = d.pairs.map((p, i) => `
    <div style="display:flex;align-items:center;gap:0;${i > 0 ? `border-top:1px solid ${t.textAlpha07};padding-top:16px;margin-top:16px;` : ''}">
      <div style="flex:1;">
        <div style="font-size:34px;font-family:'Playfair Display',serif;color:${t.cream};line-height:1.25;">${p.left}</div>
      </div>
      <div style="padding:0 24px;color:${t.accentAlpha30};font-size:28px;flex-shrink:0;">→</div>
      <div style="flex:1;text-align:right;">
        <div style="font-size:34px;font-family:'Source Serif 4',serif;color:${t.dim};font-style:italic;line-height:1.25;">${p.right}</div>
      </div>
    </div>
  `).join('');

  return wrapSlide(d.slideNum, t.bg, `
    ${ambientGlow(t)}
    ${slideHeader(t, d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="padding:28px 60px 0;z-index:1;">
      <div style="font-size:60px;font-family:'Playfair Display',serif;color:${t.cream};margin-bottom:8px;">${d.title}</div>
      <div style="font-size:32px;font-family:'Inter',sans-serif;color:${t.dim};">${d.subtitle}</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:24px 60px;z-index:1;">
      <div style="display:flex;justify-content:space-between;margin-bottom:16px;">
        <div style="font-size:28px;font-family:'Inter',sans-serif;color:${t.gold};letter-spacing:3px;text-transform:uppercase;">${d.leftLabel ?? 'The Gift'}</div>
        <div style="font-size:28px;font-family:'Inter',sans-serif;color:${t.dim};letter-spacing:3px;text-transform:uppercase;">${d.rightLabel ?? 'The Trial'}</div>
      </div>
      <div style="border:1px solid ${t.accentAlpha14};border-radius:18px;padding:24px 30px;margin-bottom:24px;">
        ${pairsHtml}
      </div>
      <div style="border-left:4px solid ${t.gold};padding-left:28px;">
        <div style="font-size:40px;font-family:'Source Serif 4',serif;color:${t.cream};line-height:1.55;font-style:italic;">${d.insight}</div>
      </div>
    </div>
    ${slideFooter(t, true)}
  `);
}

// ── Quote slide ───────────────────────────────────────────────────────────────

export function quoteSlide(d: QuoteSlide): string {
  const t = T(d);
  return wrapSlide(d.slideNum, t.bg, `
    ${ambientGlow(t, '0.08')}
    ${slideHeader(t, d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:16px 64px;z-index:1;">
      <div style="display:inline-flex;align-self:flex-start;align-items:center;gap:10px;background:${t.accentAlpha10};border:1px solid ${t.accentAlpha30};border-radius:40px;padding:8px 22px;margin-bottom:36px;">
        <div style="width:8px;height:8px;border-radius:50%;background:${t.gold};"></div>
        <span style="font-size:28px;font-family:'Inter',sans-serif;color:${t.gold};letter-spacing:3px;text-transform:uppercase;">${d.badge}</span>
      </div>
      <div style="font-size:100px;font-family:'Amiri',serif;color:${t.gold};line-height:1.55;direction:rtl;text-align:right;margin-bottom:24px;">${d.arabic}</div>
      <div style="border-left:4px solid ${t.accentAlpha40};padding-left:28px;margin-bottom:36px;">
        <div style="font-size:46px;font-family:'Source Serif 4',serif;color:${t.cream};line-height:1.7;font-style:italic;margin-bottom:14px;">"${d.translation}"</div>
        <div style="font-size:28px;font-family:'Inter',sans-serif;color:${t.accentAlpha55};letter-spacing:2px;text-transform:uppercase;">${d.reference}</div>
      </div>
      <div style="background:${t.accentAlpha06};border:1px solid ${t.accentAlpha16};border-radius:16px;padding:28px 32px;">
        <div style="font-size:42px;font-family:'Source Serif 4',serif;color:${t.cream};line-height:1.85;">${d.insight}</div>
      </div>
    </div>
    ${slideFooter(t, true)}
  `);
}

// ── CTA slide ─────────────────────────────────────────────────────────────────

export function ctaSlide(d: CtaSlide): string {
  const t = T(d);
  const questionsHtml = d.questions.map(q => `
    <div style="display:flex;align-items:flex-start;gap:16px;">
      <div style="width:8px;height:8px;border-radius:50%;background:${q.color};margin-top:13px;flex-shrink:0;"></div>
      <div>
        <span style="font-size:22px;font-family:'Inter',sans-serif;color:${q.color};font-weight:600;text-transform:uppercase;letter-spacing:1.5px;margin-right:10px;">${q.label}</span>
        <span style="font-size:34px;font-family:'Source Serif 4',serif;color:${t.dim};font-style:italic;line-height:1.5;">${q.question}</span>
      </div>
    </div>
  `).join('');

  return wrapSlide(d.slideNum, t.bg, `
    ${ambientGlow(t, '0.04')}
    <div style="position:absolute;bottom:-60px;left:50%;transform:translateX(-50%);width:900px;height:380px;background:radial-gradient(ellipse,${t.accentAlpha06} 0%,transparent 68%);pointer-events:none;"></div>
    ${slideHeader(t, d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:20px 60px;z-index:1;">
      <div style="font-size:28px;font-family:'Inter',sans-serif;color:${t.muted};letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">${d.sectionLabel}</div>
      <div style="font-size:64px;font-family:'Playfair Display',serif;color:${t.cream};line-height:1.25;margin-bottom:36px;">${d.heading}</div>
      <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:36px;">${questionsHtml}</div>
      <div style="border-left:4px solid ${t.gold};padding-left:28px;">
        <div style="font-size:44px;font-family:'Source Serif 4',serif;color:${t.cream};line-height:1.8;font-style:italic;">${d.closing}</div>
      </div>
    </div>
    <div style="padding:0 60px 40px;display:flex;align-items:center;justify-content:space-between;z-index:1;">
      <div style="font-size:32px;font-family:'Source Serif 4',serif;color:${t.dim};font-style:italic;">Explore the full reflection →</div>
      <div style="font-size:30px;font-family:'Inter',sans-serif;color:${t.gold};letter-spacing:2.5px;border:1px solid ${t.accentAlpha35};border-radius:40px;padding:10px 28px;">ayahguide.com</div>
    </div>
  `);
}

// ── Dispatch + document builder ───────────────────────────────────────────────

export function renderSlide(slide: AnySlide): string {
  switch (slide.type) {
    case 'hook':     return hookSlide(slide);
    case 'timeline': return timelineSlide(slide);
    case 'contrast': return contrastSlide(slide);
    case 'quote':    return quoteSlide(slide);
    case 'cta':      return ctaSlide(slide);
  }
}

export function buildDocument(slides: AnySlide[]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
  <link rel="stylesheet" href="${FONTS_URL}"/>
  <style>* { margin: 0; padding: 0; box-sizing: border-box; } body { background: #030810; }</style>
</head>
<body>
${slides.map(renderSlide).join('\n')}
</body>
</html>`;
}
