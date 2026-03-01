"use client";

import { useEffect, useRef } from "react";
import type { SurahVFX, Palette } from "@/lib/surah-vfx";

const TAU = Math.PI * 2;

// ── Colour helper ────────────────────────────────────────────────────────────

function rgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Component ────────────────────────────────────────────────────────────────

export function SurahCanvas({ vfx }: { vfx: SurahVFX }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf: number;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const start = performance.now();

    const tick = () => {
      const t = performance.now() - start;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      dispatch(ctx, w, h, t, vfx);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [vfx]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

// ── Dispatcher ───────────────────────────────────────────────────────────────

function dispatch(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  vfx: SurahVFX
) {
  const s = vfx.speed;
  const iv = vfx.intensity;
  const p = vfx.palette;
  switch (vfx.renderer) {
    case "yusuf":        return renderYusuf(ctx, w, h, t, p);
    case "light-pillars": return renderLightPillars(ctx, w, h, t, p, s, iv);
    case "cave":         return renderCave(ctx, w, h, t, p, iv);
    case "waves":        return renderWaves(ctx, w, h, t, p, s, iv);
    case "starfield":    return renderStarfield(ctx, w, h, t, p, s);
    case "unity":        return renderUnity(ctx, w, h, t, p);
    case "dawn":         return renderDawn(ctx, w, h, t, p, s);
    case "organic":      return renderOrganic(ctx, w, h, t, p, s);
    case "sand-wind":    return renderSandWind(ctx, w, h, t, p, s, iv);
    default:             return renderFlowingField(ctx, w, h, t, p, s);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// RENDERER: YUSUF — The Dream (Surah 12)
// "I saw eleven stars and the sun and the moon prostrating to me."
// ════════════════════════════════════════════════════════════════════════════

function renderYusuf(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette
) {
  const ms = t * 0.001;
  const cx = w * 0.5;
  const cy = h * 0.46;
  const R = Math.min(w, h) * 0.34; // orbit radius base

  // — Background —
  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  // Nebula cloud (indigo wash)
  const nebula = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.8);
  nebula.addColorStop(0, rgba("#1A0840", 0.35));
  nebula.addColorStop(0.5, rgba("#08021A", 0.2));
  nebula.addColorStop(1, "transparent");
  ctx.fillStyle = nebula;
  ctx.fillRect(0, 0, w, h);

  // Well darkness at bottom
  const well = ctx.createLinearGradient(0, h * 0.55, 0, h);
  well.addColorStop(0, "transparent");
  well.addColorStop(1, rgba("#000000", 0.75));
  ctx.fillStyle = well;
  ctx.fillRect(0, 0, w, h);

  // — Background micro-stars (deterministic) —
  for (let i = 0; i < 90; i++) {
    const bx = (Math.sin(i * 4.13 + 2) * 0.5 + 0.5) * w;
    const by = (Math.sin(i * 7.71 + 5) * 0.5 + 0.5) * h * 0.9;
    const br = 0.25 + (Math.sin(i * 11.3) * 0.5 + 0.5) * 0.5;
    const ba = 0.15 + (Math.sin(i * 5.7) * 0.5 + 0.5) * 0.2
               + Math.sin(ms * (0.4 + (i % 5) * 0.08) + i) * 0.07;
    ctx.globalAlpha = Math.max(0, ba);
    ctx.fillStyle = pal.secondary;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // — Joseph's implied presence: central golden pulse —
  const josephPulse = 0.06 + Math.sin(ms * 0.7) * 0.02;
  const jg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.55);
  jg.addColorStop(0, rgba(pal.accent, josephPulse * 1.5));
  jg.addColorStop(1, "transparent");
  ctx.fillStyle = jg;
  ctx.fillRect(0, 0, w, h);

  // — 11 stars + sun + moon —
  // All orbit in gentle ellipses, slightly inclined (the bowing)

  type Body = {
    orbitR: number; // fraction of R
    speed: number;  // rad/sec
    phase: number;
    size: number;
    type: "star" | "sun" | "moon";
  };

  const bodies: Body[] = [
    // 11 stars
    ...Array.from({ length: 11 }, (_, i): Body => ({
      type: "star",
      orbitR: R * (0.55 + (i % 4) * 0.12),
      speed: 0.055 + i * 0.004,
      phase: (i / 11) * TAU,
      size: 2.2 + (i % 3) * 0.6,
    })),
    // The sun
    { type: "sun", orbitR: R * 1.08, speed: 0.018, phase: Math.PI * 0.6, size: 7 },
    // The moon
    { type: "moon", orbitR: R * 0.88, speed: 0.028, phase: Math.PI * 1.5, size: 5.5 },
  ];

  const positions = bodies.map((b) => {
    const angle = ms * b.speed * vfx_YUSUF_speed + b.phase;
    // Slightly elliptical — narrower vertically (the "bowing" inclination)
    const rx = b.orbitR * 1.18;
    const ry = b.orbitR * 0.72;
    return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry, b };
  });

  // — Constellation lines between stars —
  const starPos = positions.slice(0, 11);
  ctx.save();
  ctx.strokeStyle = rgba(pal.primary, 0.05);
  ctx.lineWidth = 0.6;
  ctx.setLineDash([3, 12]);
  for (let i = 0; i < starPos.length; i++) {
    const a = starPos[i];
    const b = starPos[(i + 3) % 11]; // skip-connect for a web pattern
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.setLineDash([]);
  ctx.restore();

  // — Bow lines toward center —
  positions.forEach(({ x, y }) => {
    const bowAlpha = 0.035 + Math.sin(ms * 0.4) * 0.008;
    ctx.beginPath();
    ctx.strokeStyle = rgba(pal.primary, bowAlpha);
    ctx.lineWidth = 0.5;
    ctx.moveTo(x, y);
    // Line points 35% toward center, not all the way
    ctx.lineTo(cx + (x - cx) * 0.35, cy + (y - cy) * 0.35);
    ctx.stroke();
  });

  // — Draw each celestial body —
  positions.forEach(({ x, y, b }) => {
    if (b.type === "moon") {
      // Crescent: draw full circle then mask a slightly offset circle
      ctx.save();
      ctx.globalAlpha = 0.82 + Math.sin(ms * 0.25) * 0.08;
      ctx.fillStyle = pal.secondary;
      ctx.beginPath(); ctx.arc(x, y, b.size, 0, TAU); ctx.fill();
      // Subtract a chunk to make crescent
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x + b.size * 0.55, y - b.size * 0.15, b.size * 0.82, 0, TAU);
      ctx.fill();
      ctx.restore();

    } else {
      // Glow halo
      const glowR = b.size * (b.type === "sun" ? 5.5 : 3.5);
      const glowAlpha = b.type === "sun" ? 0.55 : 0.35;
      const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
      glowGrad.addColorStop(0, rgba(b.type === "sun" ? pal.accent : pal.primary, glowAlpha));
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath(); ctx.arc(x, y, glowR, 0, TAU); ctx.fill();

      // Sun corona rays
      if (b.type === "sun") {
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = pal.accent;
        ctx.lineWidth = 0.8;
        for (let r = 0; r < 8; r++) {
          const ra = (r / 8) * TAU + ms * 0.05;
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(ra) * b.size * 1.3, y + Math.sin(ra) * b.size * 1.3);
          ctx.lineTo(x + Math.cos(ra) * b.size * 4, y + Math.sin(ra) * b.size * 4);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Core dot
      const twinkle = 0.75 + Math.sin(ms * (1.2 + b.phase) + b.size) * 0.22;
      ctx.globalAlpha = twinkle;
      ctx.fillStyle = b.type === "sun" ? pal.accent : pal.primary;
      ctx.beginPath(); ctx.arc(x, y, b.size, 0, TAU); ctx.fill();
      ctx.globalAlpha = 1;
    }
  });

  // — Occasional shooting star —
  const shootCycle = 22000;
  const shootPhase = (t % shootCycle) / shootCycle;
  if (shootPhase < 0.035) {
    const progress = shootPhase / 0.035;
    const seed = Math.floor(t / shootCycle);
    const sx = w * (0.1 + (Math.sin(seed * 3.7) * 0.5 + 0.5) * 0.6);
    const sy = h * 0.05;
    const ex = sx + w * 0.28 * progress;
    const ey = sy + h * 0.18 * progress;
    ctx.strokeStyle = rgba(pal.primary, (1 - progress) * 0.9);
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.strokeStyle = rgba(pal.primary, (1 - progress) * 0.25);
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
  }
}

// Small constant to make the closure work (speed is captured from VFX config in dispatch)
const vfx_YUSUF_speed = 1; // speed baked in


// ════════════════════════════════════════════════════════════════════════════
// RENDERER: LIGHT PILLARS (Al-Fatiha 1, An-Nur 24, Al-Qadr 97)
// ════════════════════════════════════════════════════════════════════════════

function renderLightPillars(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette, speed: number, intensity: number
) {
  const ms = t * 0.001 * speed;
  const cx = w * 0.5;
  const cy = h * 1.05; // source just below bottom — pillars rise up

  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  // Ambient base glow from center
  const baseGlow = ctx.createRadialGradient(cx, h, 0, cx, h, h * 1.2);
  baseGlow.addColorStop(0, rgba(pal.primary, 0.08 * intensity));
  baseGlow.addColorStop(1, "transparent");
  ctx.fillStyle = baseGlow;
  ctx.fillRect(0, 0, w, h);

  const count = 7; // Al-Fatiha has 7 ayahs; 7 pillars

  for (let i = 0; i < count; i++) {
    const t_offset = (i / count) - 0.5; // -0.5 to 0.5
    const spread = w * 0.78;
    const px = cx + t_offset * spread;

    // Each pillar breathes slightly out of phase
    const breathe = 0.7 + Math.sin(ms * 0.6 + i * 1.1) * 0.3;
    const pillarAlpha = (0.06 + Math.sin(ms * 0.4 + i * 0.9) * 0.025) * intensity * breathe;
    const pillarW = w * 0.055 * (1 - Math.abs(t_offset) * 0.4); // narrower at edges

    // Pillar gradient: bright at bottom, fades toward top
    const pg = ctx.createLinearGradient(px, cy, px, 0);
    pg.addColorStop(0, rgba(pal.primary, pillarAlpha * 2.5));
    pg.addColorStop(0.3, rgba(pal.primary, pillarAlpha));
    pg.addColorStop(0.7, rgba(pal.secondary, pillarAlpha * 0.5));
    pg.addColorStop(1, "transparent");

    ctx.fillStyle = pg;
    ctx.beginPath();
    ctx.moveTo(px - pillarW * 0.5, cy);
    ctx.lineTo(px + pillarW * 0.5, cy);
    ctx.lineTo(px + pillarW * 0.8, 0);
    ctx.lineTo(px - pillarW * 0.8, 0);
    ctx.fill();

    // Bright core edge
    const coreAlpha = pillarAlpha * 1.8;
    ctx.strokeStyle = rgba(pal.accent, coreAlpha);
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(px, cy);
    ctx.lineTo(px, 0);
    ctx.stroke();
  }

  // Rising particles along pillars
  for (let i = 0; i < 55; i++) {
    const seed = i * 3.17;
    const pillarIdx = Math.floor((Math.sin(seed * 4.3) * 0.5 + 0.5) * count);
    const t_offset = (pillarIdx / count - 0.5);
    const px = cx + t_offset * w * 0.78 + (Math.sin(seed * 2.1) - 0.5) * w * 0.04;
    const rawY = 1 - ((i / 55 + ms * (0.04 + (i % 5) * 0.008)) % 1);
    const py = rawY * h;
    const pa = (0.15 + Math.sin(seed * 5.1) * 0.1) * (1 - rawY * 0.6) * intensity;

    ctx.globalAlpha = Math.max(0, pa);
    ctx.fillStyle = pal.accent;
    ctx.beginPath();
    ctx.arc(px, py, 0.8 + Math.sin(seed * 3.7) * 0.4, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}


// ════════════════════════════════════════════════════════════════════════════
// RENDERER: CAVE — Al-Kahf (18)
// Darkness with shafts of light entering
// ════════════════════════════════════════════════════════════════════════════

function renderCave(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette, intensity: number
) {
  const ms = t * 0.001;

  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  // Three light shafts — enter from upper area
  const shaftCenters = [0.32, 0.5, 0.66];
  shaftCenters.forEach((xr, i) => {
    const sx = w * xr;
    const breathe = 0.75 + Math.sin(ms * 0.28 + i * 1.3) * 0.25;
    const alpha = (0.12 + i * 0.025) * intensity * breathe;
    const shaftW = w * (0.055 + i * 0.008);

    const sg = ctx.createLinearGradient(sx, 0, sx, h * 0.85);
    sg.addColorStop(0, rgba(pal.primary, alpha * 1.8));
    sg.addColorStop(0.4, rgba(pal.secondary, alpha));
    sg.addColorStop(1, "transparent");

    ctx.fillStyle = sg;
    ctx.beginPath();
    // Slightly tapered shafts
    ctx.moveTo(sx - shaftW * 0.4, 0);
    ctx.lineTo(sx + shaftW * 0.4, 0);
    ctx.lineTo(sx + shaftW * 0.9, h);
    ctx.lineTo(sx - shaftW * 0.9, h);
    ctx.fill();
  });

  // Dust motes floating in shafts
  for (let i = 0; i < 50; i++) {
    const seed = i * 7.71;
    const shaftIdx = i % 3;
    const sx = w * shaftCenters[shaftIdx];
    const px = sx + (Math.sin(seed * 2.1) - 0.5) * w * 0.045;
    const rawY = ((i / 50 + ms * (0.008 + (i % 4) * 0.002)) % 1);
    const py = rawY * h;
    const wander = Math.sin(ms * 0.5 + seed) * 3;

    // Only visible inside shaft region
    const inShaft = Math.abs(px - sx) < w * 0.06;
    if (!inShaft) continue;

    const da = (0.08 + Math.sin(seed * 5.1) * 0.05) * (1 - rawY * 0.5);
    ctx.globalAlpha = Math.max(0, da);
    ctx.fillStyle = pal.accent;
    ctx.beginPath();
    ctx.arc(px + wander, py, 0.7 + Math.sin(seed * 3.7) * 0.3, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Cave silhouette — rough ceiling
  ctx.fillStyle = rgba("#000000", 0.95);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w, 0);
  ctx.lineTo(w, h * 0.07);
  ctx.quadraticCurveTo(w * 0.75, h * 0.04, w * 0.5, h * 0.065);
  ctx.quadraticCurveTo(w * 0.25, h * 0.09, 0, h * 0.055);
  ctx.fill();

  // Cave silhouette — rough floor
  ctx.fillStyle = rgba("#000000", 0.9);
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(w, h);
  ctx.lineTo(w, h * 0.8);
  ctx.quadraticCurveTo(w * 0.65, h * 0.77, w * 0.5, h * 0.79);
  ctx.quadraticCurveTo(w * 0.3, h * 0.82, 0, h * 0.78);
  ctx.fill();

  // Vignette on sides
  const leftVig = ctx.createLinearGradient(0, 0, w * 0.2, 0);
  leftVig.addColorStop(0, rgba("#000000", 0.8));
  leftVig.addColorStop(1, "transparent");
  ctx.fillStyle = leftVig; ctx.fillRect(0, 0, w, h);
  const rightVig = ctx.createLinearGradient(w, 0, w * 0.8, 0);
  rightVig.addColorStop(0, rgba("#000000", 0.8));
  rightVig.addColorStop(1, "transparent");
  ctx.fillStyle = rightVig; ctx.fillRect(0, 0, w, h);
}


// ════════════════════════════════════════════════════════════════════════════
// RENDERER: WAVES — Ar-Rahman (55)
// Dual interweaving waves — the two-ness of mercy
// ════════════════════════════════════════════════════════════════════════════

function renderWaves(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette, speed: number, intensity: number
) {
  const ms = t * 0.001 * speed;

  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  const waveCount = 5;
  const lineCount = 2; // two wave systems (jinn + humans)

  for (let sys = 0; sys < lineCount; sys++) {
    const isWarm = sys === 0;
    const color = isWarm ? pal.primary : pal.secondary;
    const phaseOffset = sys * Math.PI;

    for (let wi = 0; wi < waveCount; wi++) {
      const t_wave = wi / waveCount;
      const yCenter = h * (0.2 + t_wave * 0.6);
      const amplitude = h * (0.04 + (waveCount - wi) * 0.006) * intensity;
      const freq = 0.006 + wi * 0.001;
      const waveSpeed = ms * (0.4 + wi * 0.06) + phaseOffset;
      const alpha = (0.06 + (waveCount - wi) * 0.02) * intensity;

      ctx.beginPath();
      ctx.moveTo(0, yCenter);

      for (let x = 0; x <= w; x += 3) {
        const y = yCenter
          + Math.sin(x * freq + waveSpeed) * amplitude
          + Math.sin(x * freq * 2.1 + waveSpeed * 1.3) * amplitude * 0.35;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = rgba(color, alpha);
      ctx.lineWidth = 1.2 + (waveCount - wi) * 0.15;
      ctx.stroke();
    }
  }

  // Shimmer particles on wave crests
  for (let i = 0; i < 40; i++) {
    const seed = i * 4.13;
    const x = (Math.sin(seed * 3.7) * 0.5 + 0.5) * w;
    const waveY = h * (0.2 + (i % waveCount) / waveCount * 0.6);
    const y = waveY + Math.sin(x * 0.006 + ms) * h * 0.04;
    const pa = 0.25 + Math.sin(ms + seed) * 0.15;
    const color = i % 2 === 0 ? pal.primary : pal.secondary;

    ctx.globalAlpha = Math.max(0, pa * intensity * 0.6);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 1 + Math.sin(seed * 2.1) * 0.5, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}


// ════════════════════════════════════════════════════════════════════════════
// RENDERER: STARFIELD — Al-Mulk (67), Al-Buruj (85), An-Najm (53)
// Deep space parallax — vast and humbling
// ════════════════════════════════════════════════════════════════════════════

function renderStarfield(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette, speed: number
) {
  const ms = t * 0.001 * speed;

  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  // Layers of stars at different parallax depths
  const layers = [
    { count: 120, r: [0.3, 0.7], speed: 0.008, alpha: [0.15, 0.35] },
    { count: 60,  r: [0.7, 1.3], speed: 0.022, alpha: [0.3, 0.55]  },
    { count: 20,  r: [1.5, 2.5], speed: 0.05,  alpha: [0.5, 0.8]   },
  ];

  layers.forEach(({ count, r, speed: ls, alpha }, li) => {
    for (let i = 0; i < count; i++) {
      const seed = i * 3.17 + li * 97.3;
      const sx = (Math.sin(seed * 4.1) * 0.5 + 0.5);
      const sy = (Math.sin(seed * 7.3) * 0.5 + 0.5);

      // Parallax drift
      const px = ((sx * w + ms * ls * w * 0.3) % w + w) % w;
      const py = ((sy * h + ms * ls * h * 0.1) % h + h) % h;

      const starR = r[0] + (Math.sin(seed * 5.7) * 0.5 + 0.5) * (r[1] - r[0]);
      const baseAlpha = alpha[0] + (Math.sin(seed * 11.3) * 0.5 + 0.5) * (alpha[1] - alpha[0]);
      const twinkle = baseAlpha + Math.sin(ms * (0.5 + (i % 7) * 0.12) + seed) * 0.12;

      ctx.globalAlpha = Math.max(0, twinkle);
      ctx.fillStyle = i % 8 === 0 ? pal.secondary : pal.primary;
      ctx.beginPath();
      ctx.arc(px, py, starR, 0, TAU);
      ctx.fill();
    }
  });
  ctx.globalAlpha = 1;

  // Nebula cloud
  const ng = ctx.createRadialGradient(w * 0.35, h * 0.4, 0, w * 0.35, h * 0.4, w * 0.45);
  ng.addColorStop(0, rgba(pal.secondary, 0.04));
  ng.addColorStop(1, "transparent");
  ctx.fillStyle = ng;
  ctx.fillRect(0, 0, w, h);

  // Occasional shooting star
  const shootCycle = 18000;
  const sp = (t % shootCycle) / shootCycle;
  if (sp < 0.04) {
    const prog = sp / 0.04;
    const seed = Math.floor(t / shootCycle);
    const sx = w * (0.05 + (Math.sin(seed * 3.7) * 0.5 + 0.5) * 0.7);
    const sy = h * 0.08;
    ctx.strokeStyle = rgba(pal.accent, (1 - prog) * 0.85);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + w * 0.22 * prog, sy + h * 0.14 * prog);
    ctx.stroke();
  }
}


// ════════════════════════════════════════════════════════════════════════════
// RENDERER: UNITY — Al-Ikhlas (112)
// Pure oneness: expanding concentric circles from center
// ════════════════════════════════════════════════════════════════════════════

function renderUnity(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette
) {
  const ms = t * 0.001;
  const cx = w * 0.5;
  const cy = h * 0.5;
  const maxR = Math.max(w, h) * 0.65;

  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  const ringCount = 7;
  const period = 4000; // ms per ring cycle

  for (let i = 0; i < ringCount; i++) {
    const phase = ((t + i * (period / ringCount)) % period) / period;
    const r = phase * maxR;
    const alpha = (1 - phase) * 0.22;

    ctx.strokeStyle = rgba(pal.primary, alpha);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.stroke();
  }

  // Central emanating glow
  const pulse = 0.5 + Math.sin(ms * 1.2) * 0.35;
  const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
  cg.addColorStop(0, rgba(pal.primary, 0.6 * pulse));
  cg.addColorStop(0.4, rgba(pal.secondary, 0.2 * pulse));
  cg.addColorStop(1, "transparent");
  ctx.fillStyle = cg;
  ctx.beginPath();
  ctx.arc(cx, cy, 40, 0, TAU);
  ctx.fill();

  // Central dot
  ctx.fillStyle = pal.accent;
  ctx.globalAlpha = 0.9 * pulse;
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Subtle cross-hairs of light (very faint)
  for (let a = 0; a < 4; a++) {
    const ang = (a / 4) * TAU + ms * 0.05;
    const rayAlpha = 0.025 + Math.sin(ms * 0.6 + a) * 0.01;
    ctx.strokeStyle = rgba(pal.secondary, rayAlpha);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * maxR, cy + Math.sin(ang) * maxR);
    ctx.stroke();
  }
}


// ════════════════════════════════════════════════════════════════════════════
// RENDERER: DAWN — Al-Fajr (89), Ad-Dhuha (93)
// Horizon brightening — transition from night to light
// ════════════════════════════════════════════════════════════════════════════

function renderDawn(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette, speed: number
) {
  const ms = t * 0.001 * speed;

  // Slowly oscillate between pre-dawn and full dawn
  const dawnProgress = (Math.sin(ms * 0.15) * 0.5 + 0.5);

  // Sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, pal.bg);
  skyGrad.addColorStop(0.45, rgba("#1A0830", 0.9));
  skyGrad.addColorStop(0.6, rgba(pal.secondary, 0.25 * dawnProgress));
  skyGrad.addColorStop(0.75, rgba(pal.primary, 0.35 * dawnProgress));
  skyGrad.addColorStop(1, pal.bg);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Horizon glow (sun just below)
  const horizonY = h * 0.62;
  const horizonGlow = ctx.createRadialGradient(w * 0.5, horizonY, 0, w * 0.5, horizonY, w * 0.55);
  horizonGlow.addColorStop(0, rgba(pal.primary, 0.3 * dawnProgress));
  horizonGlow.addColorStop(0.4, rgba(pal.secondary, 0.12 * dawnProgress));
  horizonGlow.addColorStop(1, "transparent");
  ctx.fillStyle = horizonGlow;
  ctx.fillRect(0, 0, w, h);

  // Horizon line
  ctx.strokeStyle = rgba(pal.accent, 0.18 * dawnProgress);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(w, horizonY);
  ctx.stroke();

  // Fading stars above horizon
  for (let i = 0; i < 60; i++) {
    const seed = i * 4.17;
    const sx = (Math.sin(seed * 3.9) * 0.5 + 0.5) * w;
    const sy = (Math.sin(seed * 7.1) * 0.5 + 0.5) * horizonY * 0.9;
    const sa = (0.2 + Math.sin(seed * 5.3) * 0.12) * (1 - dawnProgress * 0.85);
    const sr = 0.4 + Math.sin(seed * 9.1) * 0.2;

    ctx.globalAlpha = Math.max(0, sa);
    ctx.fillStyle = pal.secondary;
    ctx.beginPath(); ctx.arc(sx, sy, sr, 0, TAU); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Dawn rays spreading from horizon
  const rayCount = 9;
  for (let i = 0; i < rayCount; i++) {
    const angle = Math.PI + (i / (rayCount - 1) - 0.5) * Math.PI * 0.85;
    const ra = 0.025 * dawnProgress * (0.7 + Math.sin(ms * 0.3 + i * 0.7) * 0.3);
    ctx.strokeStyle = rgba(pal.primary, ra);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w * 0.5, horizonY);
    ctx.lineTo(
      w * 0.5 + Math.cos(angle) * w * 0.7,
      horizonY + Math.sin(angle) * h * 0.7
    );
    ctx.stroke();
  }
}


// ════════════════════════════════════════════════════════════════════════════
// RENDERER: ORGANIC — Maryam (19), Ya-Sin (36)
// Flowing pollen / seeds drifting
// ════════════════════════════════════════════════════════════════════════════

function renderOrganic(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette, speed: number
) {
  const ms = t * 0.001 * speed;

  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  // Soft ground glow
  const groundGlow = ctx.createLinearGradient(0, h * 0.6, 0, h);
  groundGlow.addColorStop(0, "transparent");
  groundGlow.addColorStop(1, rgba(pal.primary, 0.04));
  ctx.fillStyle = groundGlow;
  ctx.fillRect(0, 0, w, h);

  // Floating particles — pollen / seeds drifting on breeze
  for (let i = 0; i < 80; i++) {
    const seed = i * 2.71;
    const baseX = (Math.sin(seed * 3.7) * 0.5 + 0.5) * w;
    const baseY = (Math.sin(seed * 6.3) * 0.5 + 0.5) * h;

    // Sinusoidal drift (breeze simulation)
    const windX = Math.sin(ms * 0.3 + seed * 1.3) * 25 + ms * 8 * (0.5 + (i % 3) * 0.25);
    const windY = Math.cos(ms * 0.22 + seed * 1.7) * 12 + Math.sin(ms * 0.15 + seed) * 8;

    const px = ((baseX + windX) % w + w) % w;
    const py = ((baseY + windY) % h + h) % h;

    const size = 0.8 + Math.sin(seed * 4.1) * 0.5;
    const alpha = 0.2 + Math.sin(ms * 0.5 + seed * 2.3) * 0.1;

    // Color: mix primary and secondary
    const color = i % 3 === 0 ? pal.secondary : pal.primary;

    // Small glow
    ctx.globalAlpha = alpha * 0.35;
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(px, py, size * 4, 0, TAU); ctx.fill();

    // Core
    ctx.globalAlpha = alpha;
    ctx.fillStyle = pal.accent;
    ctx.beginPath(); ctx.arc(px, py, size, 0, TAU); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // A few larger drifting "leaves"
  for (let i = 0; i < 8; i++) {
    const seed = i * 13.7 + 50;
    const bx = (Math.sin(seed * 4.1) * 0.5 + 0.5) * w;
    const by = (Math.sin(seed * 7.3) * 0.5 + 0.5) * h;
    const px = ((bx + ms * 12 * (0.6 + i * 0.1)) % w + w) % w;
    const py = by + Math.sin(ms * 0.25 + seed) * 15;
    const rot = ms * 0.3 + seed;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(rot);
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = pal.primary;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 3, 0, 0, TAU);
    ctx.stroke();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}


// ════════════════════════════════════════════════════════════════════════════
// RENDERER: SAND-WIND — Adh-Dhariyat (51), At-Takwir (81)
// Sweeping particles — like wind-scattered sand or folding stars
// ════════════════════════════════════════════════════════════════════════════

function renderSandWind(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette, speed: number, intensity: number
) {
  const ms = t * 0.001 * speed;

  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  const N = 130;

  for (let i = 0; i < N; i++) {
    const seed = i * 2.39;
    const lane = Math.sin(seed * 5.1) * 0.5 + 0.5; // 0-1 horizontal band
    const py = lane * h;
    const turbulence = Math.sin(py * 0.012 + ms * 0.5 + seed) * h * 0.06;

    const rawX = ((i / N + ms * (0.06 + lane * 0.04)) % 1);
    const px = rawX * w;
    const finalY = py + turbulence;

    const size = 0.6 + (Math.sin(seed * 3.7) * 0.5 + 0.5) * 1.2;
    const alpha = (0.12 + Math.sin(seed * 7.3) * 0.08) * intensity
                  * (0.5 + Math.sin(ms * 0.4 + seed) * 0.3);

    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = i % 4 === 0 ? pal.accent : pal.primary;
    ctx.beginPath();
    ctx.arc(px, finalY, size, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Wind streaks
  for (let i = 0; i < 15; i++) {
    const seed = i * 11.3 + 200;
    const sy = (Math.sin(seed * 3.7) * 0.5 + 0.5) * h;
    const sx = ((ms * 0.15 + seed * 0.1) % 1) * w;
    const len = w * (0.04 + Math.sin(seed * 5.1) * 0.03);
    const alpha = 0.04 + Math.sin(ms * 0.6 + seed) * 0.02;

    ctx.strokeStyle = rgba(pal.secondary, alpha * intensity);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + len, sy + (Math.sin(seed * 2.3)) * 5);
    ctx.stroke();
  }
}


// ════════════════════════════════════════════════════════════════════════════
// RENDERER: FLOWING FIELD (default)
// Curl-like flowing particles — meditative Quranic atmosphere
// ════════════════════════════════════════════════════════════════════════════

function renderFlowingField(
  ctx: CanvasRenderingContext2D,
  w: number, h: number, t: number,
  pal: Palette, speed: number
) {
  const ms = t * 0.001 * speed;

  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  // Ambient central glow
  const ag = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.55);
  ag.addColorStop(0, rgba(pal.primary, 0.04));
  ag.addColorStop(1, "transparent");
  ctx.fillStyle = ag; ctx.fillRect(0, 0, w, h);

  // Flow field: particles follow a curl-noise-approximation
  const N = 100;

  for (let i = 0; i < N; i++) {
    const seed = i * 2.3791;
    const baseX = (Math.sin(seed * 4.1) * 0.5 + 0.5);
    const baseY = (Math.sin(seed * 7.3) * 0.5 + 0.5);

    // Curl-like motion: angle driven by multi-frequency sine field
    const px0 = baseX * w + Math.sin(ms * 0.28 + seed * 1.7) * w * 0.15;
    const py0 = baseY * h + Math.cos(ms * 0.21 + seed * 2.1) * h * 0.12;
    const drift = ms * (4 + (i % 5));

    const angle = (
      Math.sin(px0 * 0.007 + ms * 0.22 + seed * 0.5) +
      Math.sin(py0 * 0.008 - ms * 0.18 + seed * 0.7)
    ) * Math.PI;

    const px = ((px0 + Math.cos(angle) * drift) % w + w) % w;
    const py = ((py0 + Math.sin(angle) * drift) % h + h) % h;

    const size = 1.0 + Math.sin(seed * 3.1) * 0.6;
    const baseA = 0.15 + (Math.sin(seed * 7.3) * 0.5 + 0.5) * 0.2;
    const pulse = baseA + Math.sin(ms * 0.7 + seed * 1.9) * 0.06;

    // Soft glow
    ctx.globalAlpha = Math.max(0, pulse * 0.3);
    ctx.fillStyle = pal.primary;
    ctx.beginPath(); ctx.arc(px, py, size * 5, 0, TAU); ctx.fill();

    // Core
    ctx.globalAlpha = Math.max(0, pulse);
    ctx.fillStyle = i % 5 === 0 ? pal.accent : pal.primary;
    ctx.beginPath(); ctx.arc(px, py, size, 0, TAU); ctx.fill();
  }
  ctx.globalAlpha = 1;
}
