"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { SURAHS, surahIdentity, surahSlug, type SurahMeta } from "@/lib/surahs";

// ── Size tiers based on ayah count ───────────────────────────────────────────

type Tier = "xl" | "lg" | "md" | "sm" | "xs";

function getTier(ayahs: number): Tier {
  if (ayahs >= 180) return "xl";
  if (ayahs >= 80)  return "lg";
  if (ayahs >= 35)  return "md";
  if (ayahs >= 12)  return "sm";
  return "xs";
}

const TIER_CFG: Record<Tier, { minH: number; arabicPx: number; medallion: number }> = {
  xl: { minH: 160, arabicPx: 64, medallion: 64 },
  lg: { minH: 120, arabicPx: 50, medallion: 56 },
  md: { minH: 96,  arabicPx: 40, medallion: 48 },
  sm: { minH: 80,  arabicPx: 32, medallion: 44 },
  xs: { minH: 68,  arabicPx: 26, medallion: 38 },
};

// ── Geometric star medallion ──────────────────────────────────────────────────

const POINT_COUNTS = [6, 8, 8, 10, 8, 6, 10, 12, 8, 6, 10, 8];

function GeomMedallion({ n, hue, sat, size }: {
  n: number; hue: number; sat: number; size: number;
}) {
  const points = POINT_COUNTS[n % POINT_COUNTS.length];
  const cx = size / 2, cy = size / 2;
  const outerR = size * 0.40, innerR = outerR * 0.46;
  const rot = (n * 11) % 30;

  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / points;
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }

  const accent = `hsl(${hue},${sat}%,62%)`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle cx={cx} cy={cy} r={outerR * 1.18}
        fill="none" stroke={accent} strokeOpacity="0.15" strokeWidth="0.6" />
      <polygon points={pts.join(" ")} fill="none"
        stroke={accent} strokeOpacity="0.38" strokeWidth="0.7"
        transform={`rotate(${rot},${cx},${cy})`} />
      {Array.from({ length: points }, (_, i) => {
        const a = -Math.PI / 2 + (i / points) * Math.PI * 2 + (rot * Math.PI) / 180;
        const r = outerR * 0.72;
        return <circle key={i} cx={(cx + r * Math.cos(a)).toFixed(1)}
          cy={(cy + r * Math.sin(a)).toFixed(1)} r="0.9" fill={accent} fillOpacity="0.28" />;
      })}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
        fontSize={size * 0.21} fill={accent} fillOpacity="0.65"
        fontFamily="ui-monospace,monospace">
        {n}
      </text>
    </svg>
  );
}

// ── Juz divider ───────────────────────────────────────────────────────────────

function JuzDivider({ juz }: { juz: number }) {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5">
      <div className="h-px flex-1 bg-zinc-800/60" />
      <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden>
        <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.1 8.1,10 5,7.6 1.9,10 3.1,6.1 0,3.8 3.8,3.8"
          fill="rgba(212,175,55,0.25)" />
      </svg>
      <span className="text-[9px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
        Juz {juz}
      </span>
      <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden>
        <polygon points="5,0 6.2,3.8 10,3.8 6.9,6.1 8.1,10 5,7.6 1.9,10 3.1,6.1 0,3.8 3.8,3.8"
          fill="rgba(212,175,55,0.25)" />
      </svg>
      <div className="h-px flex-1 bg-zinc-800/60" />
    </div>
  );
}

// ── Surah row ─────────────────────────────────────────────────────────────────

function SurahRow({ surah, published }: { surah: SurahMeta; published: boolean }) {
  const id = surahIdentity(surah.n);
  const tier = getTier(surah.ayahs);
  const cfg = TIER_CFG[tier];

  const accentHsl = `hsl(${id.hue},${id.sat}%,${id.lightness + 14}%)`;
  const glowHsl   = `hsl(${id.hue},${id.sat}%,${id.lightness}%)`;

  const tileAngle = (surah.n * 15) % 90;
  const tileBg = `repeating-conic-gradient(
    from ${tileAngle}deg at 82% 50%,
    hsl(${id.hue},${id.sat}%,55%,0.026) 0deg 45deg,
    transparent 45deg 90deg
  )`;

  const inner = (
    <>
      {/* Tile pattern */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: tileBg }} />

      {/* Hover bloom — only for published */}
      {published && (
        <div aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse 55% 90% at 88% 50%,
              hsl(${id.hue},${id.sat}%,${id.lightness}%,0.09) 0%,
              transparent 70%)`,
          }} />
      )}

      {/* Left accent bar */}
      <div aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] transition-all duration-300 group-hover:w-[3px]"
        style={{
          background: `linear-gradient(to bottom,
            transparent, ${glowHsl} 30%, ${glowHsl} 70%, transparent)`,
          opacity: published ? 0.4 : 0.15,
        }} />

      {/* Medallion */}
      <div className="relative z-10 flex shrink-0 items-center justify-center pl-4"
        style={{ width: cfg.medallion + 24 }}>
        <GeomMedallion n={surah.n} hue={id.hue} sat={id.sat} size={cfg.medallion} />
      </div>

      {/* Stats — hidden on mobile */}
      <div className="relative z-10 hidden w-28 shrink-0 flex-col gap-1 pl-2 sm:flex">
        <span className="text-[9px] font-medium tracking-[0.14em] uppercase"
          style={{
            color: surah.place === "Makki"
              ? "hsla(43,65%,60%,0.50)"
              : "hsla(185,50%,60%,0.50)",
          }}>
          {surah.place}
        </span>
        <span className="text-[9px] text-zinc-500">{surah.ayahs} ayahs</span>
        <span className="text-[9px] text-zinc-600">Juz {surah.juz}</span>
      </div>

      {/* English name + mobile stats */}
      <div className="relative z-10 min-w-0 flex-1 px-3 sm:px-4">
        <div className="flex items-center gap-2">
          <span className="font-serif text-xs text-zinc-400 transition-colors group-hover:text-zinc-300">
            {surah.nameEn}
          </span>
          {!published && (
            <span className="text-[9px] italic text-zinc-600">
              Coming soon
            </span>
          )}
        </div>
        <div className="mt-0.5 flex gap-2 text-[9px] text-zinc-500 sm:hidden">
          <span style={{
            color: surah.place === "Makki" ? "hsla(43,60%,55%,0.45)" : "hsla(185,45%,55%,0.45)",
          }}>{surah.place}</span>
          <span>·</span>
          <span>{surah.ayahs} ayahs</span>
        </div>
      </div>

      {/* Arabic name */}
      <div className="relative z-10 shrink-0 pr-5 text-right leading-none"
        style={{
          fontFamily: "var(--font-amiri,'Amiri'),Amiri,'Scheherazade New','Traditional Arabic',Georgia,serif",
          fontSize: `${cfg.arabicPx}px`,
          color: accentHsl,
          direction: "rtl",
          textShadow: published
            ? `0 0 ${Math.round(cfg.arabicPx * 0.9)}px hsl(${id.hue},${id.sat}%,${id.lightness}%,0.28)`
            : "none",
        }}>
        {surah.nameAr}
      </div>
    </>
  );

  const baseClasses = `relative flex items-center overflow-hidden border-b border-zinc-800/50 transition-all duration-300`;

  if (published) {
    return (
      <Link
        href={`/surah/${surahSlug(surah.nameEn)}`}
        className={`group ${baseClasses} hover:border-zinc-700/60`}
        style={{ minHeight: `${cfg.minH}px` }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      className={`${baseClasses} cursor-default opacity-[0.35]`}
      style={{ minHeight: `${cfg.minH}px` }}
    >
      {inner}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Filter = "all" | "available";

export function SurahMap({ publishedSurahs }: { publishedSurahs: number[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const publishedSet = useMemo(() => new Set(publishedSurahs), [publishedSurahs]);

  const visible = useMemo(() => (
    SURAHS.filter((s) => {
      if (filter === "available" && !publishedSet.has(s.n)) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return s.nameEn.toLowerCase().includes(q) || s.nameAr.includes(q) || String(s.n).includes(q);
    })
  ), [search, filter, publishedSet]);

  const juzFirstMap = useMemo(() => {
    const seen = new Set<number>();
    const map = new Map<number, number>();
    visible.forEach((s) => { if (!seen.has(s.juz)) { seen.add(s.juz); map.set(s.n, s.juz); } });
    return map;
  }, [visible]);

  const isFiltering = search.trim().length > 0 || filter !== "all";

  return (
    <>
      {/* Search + filter */}
      <div className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/92 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="relative flex-1">
            <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search by name or number…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50
                         py-2 pl-9 pr-3 text-sm text-zinc-300 outline-none
                         placeholder:text-zinc-600 focus:border-zinc-700" />
          </div>
          <div className="flex gap-1.5">
            {(["all", "available"] as Filter[]).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="rounded-full px-3 py-1.5 text-[11px] transition-all"
                style={{
                  background: filter === f ? "rgba(212,175,55,0.12)" : "transparent",
                  color: filter === f ? "rgb(212,175,55)" : "rgb(113,113,122)",
                  border: `1px solid ${filter === f ? "rgba(212,175,55,0.25)" : "rgba(63,63,70,0.5)"}`,
                }}>
                {f === "all" ? "All" : "Available"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="mx-auto max-w-3xl">
        {visible.length === 0
          ? <div className="py-24 text-center font-serif text-sm text-zinc-500">No surahs match</div>
          : visible.map((s) => (
              <div key={s.n}>
                {!isFiltering && juzFirstMap.has(s.n) && (
                  <JuzDivider juz={juzFirstMap.get(s.n)!} />
                )}
                <SurahRow surah={s} published={publishedSet.has(s.n)} />
              </div>
            ))}
      </div>
    </>
  );
}
