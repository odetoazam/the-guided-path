import { B, FONTS_URL } from './brand';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SlideBase {
  slideNum: number;
  totalSlides: number;
  /** Arabic name shown in the header (surah title or prophet name) */
  headerArabic: string;
  /** English label shown below the Arabic in the header */
  headerLabel: string;
}

export interface HookSlide extends SlideBase {
  type: 'hook';
  largeArabic: string;
  hookLine: string;
  payoff: string;
  subtext: string;
}

export interface TimelineSlide extends SlideBase {
  type: 'timeline';
  title: string;
  subtitle: string;
  stages: { arabic: string; title: string; desc: string }[];
}

export interface ContrastSlide extends SlideBase {
  type: 'contrast';
  title: string;
  subtitle: string;
  leftLabel?: string;
  rightLabel?: string;
  pairs: { left: string; right: string }[];
  insight: string;
}

export interface QuoteSlide extends SlideBase {
  type: 'quote';
  badge: string;
  arabic: string;
  translation: string;
  reference: string;
  insight: string;
}

export interface CtaSlide extends SlideBase {
  type: 'cta';
  sectionLabel: string;
  heading: string;
  questions: { label: string; question: string; color: string }[];
  closing: string;
}

export type AnySlide = HookSlide | TimelineSlide | ContrastSlide | QuoteSlide | CtaSlide;

// ── Shared building blocks ────────────────────────────────────────────────────

const ambientGlow = (opacity = '0.05') =>
  `<div style="position:absolute;top:-120px;left:50%;transform:translateX(-50%);width:800px;height:380px;background:radial-gradient(ellipse,rgba(201,168,76,${opacity}) 0%,transparent 68%);pointer-events:none;"></div>`;

const slideHeader = (arabic: string, label: string, num: number, total: number) => `
<div style="display:flex;align-items:center;justify-content:space-between;padding:40px 60px 0;z-index:1;">
  <div style="display:flex;align-items:center;gap:14px;">
    <div style="width:4px;height:48px;background:${B.gold};border-radius:3px;flex-shrink:0;"></div>
    <div>
      <div style="font-size:24px;font-family:'Amiri',serif;color:${B.gold};line-height:1.2;">${arabic}</div>
      <div style="font-size:12px;font-family:'Inter',sans-serif;color:${B.muted};letter-spacing:4px;text-transform:uppercase;margin-top:3px;">${label}</div>
    </div>
  </div>
  <div style="font-size:15px;font-family:'Inter',sans-serif;color:rgba(245,240,232,0.22);letter-spacing:2px;">${num} / ${total}</div>
</div>`;

const slideFooter = (cta = false) => cta
  ? `<div style="padding:0 60px 40px;display:flex;align-items:center;justify-content:space-between;z-index:1;">
       <div style="display:flex;align-items:center;gap:8px;">
         <span style="font-size:15px;font-family:'Inter',sans-serif;color:${B.dim};letter-spacing:2px;">swipe</span>
         <span style="font-size:20px;color:${B.dim};">›</span>
       </div>
       <div style="font-size:15px;font-family:'Inter',sans-serif;color:${B.gold};letter-spacing:2px;border:1px solid rgba(201,168,76,0.35);border-radius:40px;padding:8px 24px;">ayahguide.com</div>
     </div>`
  : `<div style="padding:0 60px 40px;display:flex;justify-content:flex-end;z-index:1;">
       <div style="font-size:13px;font-family:'Inter',sans-serif;color:rgba(201,168,76,0.4);letter-spacing:4px;text-transform:uppercase;">ayahguide.com</div>
     </div>`;

const wrapSlide = (num: number, content: string) =>
  `<div data-slide="${num}" style="position:relative;width:1080px;height:1080px;background:${B.bg};display:flex;flex-direction:column;overflow:hidden;">${content}</div>`;

// ── Hook slide ────────────────────────────────────────────────────────────────

export function hookSlide(d: HookSlide): string {
  const dots = Array.from({ length: d.totalSlides }, (_, i) =>
    `<div style="width:${i === 0 ? '32px' : '10px'};height:10px;border-radius:5px;background:${i === 0 ? B.gold : 'rgba(201,168,76,0.18)'};"></div>`
  ).join('');

  return wrapSlide(d.slideNum, `
    ${ambientGlow('0.06')}
    ${slideHeader(d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 120px;text-align:center;z-index:1;">
      <div style="font-size:112px;font-family:'Amiri',serif;color:${B.gold};line-height:1.3;margin-bottom:44px;letter-spacing:4px;">${d.largeArabic}</div>
      <div style="display:flex;align-items:center;gap:18px;margin-bottom:50px;width:78%;">
        <div style="flex:1;height:1px;background:rgba(201,168,76,0.16);"></div>
        <div style="width:7px;height:7px;border-radius:50%;background:${B.gold};opacity:0.5;"></div>
        <div style="flex:1;height:1px;background:rgba(201,168,76,0.16);"></div>
      </div>
      <div style="font-size:54px;font-family:'Playfair Display',serif;color:${B.cream};line-height:1.3;margin-bottom:24px;font-style:italic;">${d.hookLine}</div>
      <div style="font-size:70px;font-family:'Playfair Display',serif;font-weight:700;line-height:1.15;background:linear-gradient(135deg,${B.goldLight} 0%,${B.goldDark} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:32px;">${d.payoff}</div>
      <div style="font-size:25px;font-family:'Source Serif 4',serif;color:${B.dim};line-height:1.8;max-width:700px;">${d.subtext}</div>
    </div>
    <div style="position:absolute;bottom:96px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;z-index:1;">${dots}</div>
    ${slideFooter(false)}
  `);
}

// ── Timeline slide ────────────────────────────────────────────────────────────

export function timelineSlide(d: TimelineSlide): string {
  const stagesHtml = d.stages.map((stage, i) => `
    <div style="display:flex;gap:24px;align-items:flex-start;position:relative;z-index:1;">
      <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;">
        <div style="width:56px;height:56px;border-radius:50%;background:rgba(201,168,76,0.1);border:1.5px solid rgba(201,168,76,0.35);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="font-size:22px;font-family:'Amiri',serif;color:${B.gold};">${stage.arabic}</span>
        </div>
        ${i < d.stages.length - 1 ? `<div style="width:1px;flex:1;min-height:24px;background:rgba(201,168,76,0.15);margin-top:4px;"></div>` : ''}
      </div>
      <div style="padding-top:8px;padding-bottom:${i < d.stages.length - 1 ? '24px' : '0'};">
        <div style="font-size:26px;font-family:'Playfair Display',serif;color:${B.cream};line-height:1.25;margin-bottom:8px;">${stage.title}</div>
        <div style="font-size:20px;font-family:'Source Serif 4',serif;color:${B.dim};line-height:1.65;font-style:italic;">${stage.desc}</div>
      </div>
    </div>
  `).join('');

  return wrapSlide(d.slideNum, `
    ${ambientGlow()}
    ${slideHeader(d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="padding:28px 60px 0;z-index:1;">
      <div style="font-size:42px;font-family:'Playfair Display',serif;color:${B.cream};margin-bottom:6px;">${d.title}</div>
      <div style="font-size:19px;font-family:'Inter',sans-serif;color:${B.dim};">${d.subtitle}</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:28px 60px;z-index:1;">
      ${stagesHtml}
    </div>
    ${slideFooter(true)}
  `);
}

// ── Contrast slide ────────────────────────────────────────────────────────────

export function contrastSlide(d: ContrastSlide): string {
  const pairsHtml = d.pairs.map((p, i) => `
    <div style="display:flex;align-items:center;gap:0;${i > 0 ? 'border-top:1px solid rgba(245,240,232,0.07);padding-top:22px;margin-top:22px;' : ''}">
      <div style="flex:1;">
        <div style="font-size:27px;font-family:'Playfair Display',serif;color:${B.cream};line-height:1.3;">${p.left}</div>
      </div>
      <div style="padding:0 28px;color:rgba(201,168,76,0.3);font-size:26px;flex-shrink:0;">→</div>
      <div style="flex:1;text-align:right;">
        <div style="font-size:27px;font-family:'Source Serif 4',serif;color:${B.dim};font-style:italic;line-height:1.3;">${p.right}</div>
      </div>
    </div>
  `).join('');

  return wrapSlide(d.slideNum, `
    ${ambientGlow()}
    ${slideHeader(d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="padding:28px 60px 0;z-index:1;">
      <div style="font-size:42px;font-family:'Playfair Display',serif;color:${B.cream};margin-bottom:6px;">${d.title}</div>
      <div style="font-size:19px;font-family:'Inter',sans-serif;color:${B.dim};">${d.subtitle}</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:24px 60px;z-index:1;">
      <div style="display:flex;justify-content:space-between;margin-bottom:16px;">
        <div style="font-size:11px;font-family:'Inter',sans-serif;color:${B.gold};letter-spacing:3px;text-transform:uppercase;">${d.leftLabel ?? 'The Gift'}</div>
        <div style="font-size:11px;font-family:'Inter',sans-serif;color:${B.dim};letter-spacing:3px;text-transform:uppercase;">${d.rightLabel ?? 'The Trial'}</div>
      </div>
      <div style="border:1px solid rgba(201,168,76,0.14);border-radius:18px;padding:32px 36px;margin-bottom:36px;">
        ${pairsHtml}
      </div>
      <div style="border-left:4px solid ${B.gold};padding-left:28px;">
        <div style="font-size:29px;font-family:'Source Serif 4',serif;color:${B.cream};line-height:1.7;font-style:italic;">${d.insight}</div>
      </div>
    </div>
    ${slideFooter(true)}
  `);
}

// ── Quote slide ───────────────────────────────────────────────────────────────

export function quoteSlide(d: QuoteSlide): string {
  return wrapSlide(d.slideNum, `
    ${ambientGlow('0.08')}
    ${slideHeader(d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:16px 64px;z-index:1;">
      <div style="display:inline-flex;align-self:flex-start;align-items:center;gap:10px;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:40px;padding:8px 22px;margin-bottom:36px;">
        <div style="width:8px;height:8px;border-radius:50%;background:${B.gold};"></div>
        <span style="font-size:13px;font-family:'Inter',sans-serif;color:${B.gold};letter-spacing:3px;text-transform:uppercase;">${d.badge}</span>
      </div>
      <div style="font-size:84px;font-family:'Amiri',serif;color:${B.gold};line-height:1.55;direction:rtl;text-align:right;margin-bottom:24px;">${d.arabic}</div>
      <div style="border-left:4px solid rgba(201,168,76,0.4);padding-left:28px;margin-bottom:36px;">
        <div style="font-size:27px;font-family:'Source Serif 4',serif;color:${B.cream};line-height:1.7;font-style:italic;margin-bottom:10px;">"${d.translation}"</div>
        <div style="font-size:14px;font-family:'Inter',sans-serif;color:rgba(201,168,76,0.55);letter-spacing:2px;text-transform:uppercase;">${d.reference}</div>
      </div>
      <div style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.16);border-radius:16px;padding:28px 32px;">
        <div style="font-size:24px;font-family:'Source Serif 4',serif;color:${B.cream};line-height:1.85;">${d.insight}</div>
      </div>
    </div>
    ${slideFooter(true)}
  `);
}

// ── CTA slide ─────────────────────────────────────────────────────────────────

export function ctaSlide(d: CtaSlide): string {
  const questionsHtml = d.questions.map(q => `
    <div style="display:flex;align-items:flex-start;gap:16px;">
      <div style="width:8px;height:8px;border-radius:50%;background:${q.color};margin-top:13px;flex-shrink:0;"></div>
      <div>
        <span style="font-size:12px;font-family:'Inter',sans-serif;color:${q.color};font-weight:600;text-transform:uppercase;letter-spacing:1.5px;margin-right:10px;">${q.label}</span>
        <span style="font-size:22px;font-family:'Source Serif 4',serif;color:${B.dim};font-style:italic;line-height:1.5;">${q.question}</span>
      </div>
    </div>
  `).join('');

  return wrapSlide(d.slideNum, `
    ${ambientGlow('0.04')}
    <div style="position:absolute;bottom:-60px;left:50%;transform:translateX(-50%);width:900px;height:380px;background:radial-gradient(ellipse,rgba(201,168,76,0.04) 0%,transparent 68%);pointer-events:none;"></div>
    ${slideHeader(d.headerArabic, d.headerLabel, d.slideNum, d.totalSlides)}
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:20px 60px;z-index:1;">
      <div style="font-size:12px;font-family:'Inter',sans-serif;color:${B.muted};letter-spacing:4px;text-transform:uppercase;margin-bottom:14px;">${d.sectionLabel}</div>
      <div style="font-size:46px;font-family:'Playfair Display',serif;color:${B.cream};line-height:1.25;margin-bottom:36px;">${d.heading}</div>
      <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:36px;">${questionsHtml}</div>
      <div style="border-left:4px solid ${B.gold};padding-left:28px;">
        <div style="font-size:25px;font-family:'Source Serif 4',serif;color:${B.cream};line-height:1.8;font-style:italic;">${d.closing}</div>
      </div>
    </div>
    <div style="padding:0 60px 40px;display:flex;align-items:center;justify-content:space-between;z-index:1;">
      <div style="font-size:18px;font-family:'Source Serif 4',serif;color:${B.dim};font-style:italic;">Explore the full reflection →</div>
      <div style="font-size:16px;font-family:'Inter',sans-serif;color:${B.gold};letter-spacing:2.5px;border:1px solid rgba(201,168,76,0.35);border-radius:40px;padding:10px 28px;">ayahguide.com</div>
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
