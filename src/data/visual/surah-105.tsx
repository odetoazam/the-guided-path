"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-FIL — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-fil
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Al-Fil",
  arabicName: "الفيل",
  meaning: "The Elephant",
  number: 105,
  ayahCount: 5,
  period: "Makki",
  juz: 30,
  movements: 4,
  thesis:
    "Al-Fil is a surah that holds up a single piece of evidence, sets it before you without commentary, and waits for you to understand that the largest thing in the room is never the most powerful.",
  reflectionUrl: "/surahs/al-fil",
  readTime: "18 min read",

  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ",
    ayahRef: "105:3",
    translation:
      "And He sent against them birds in successive waves.",
    why: "The fulcrum of the entire surah. The verb arsala — the same word used for sending messengers and angels — transforms these creatures from natural phenomenon to divine deployment. Everything before this verse builds toward the birds; everything after measures their effect.",
    articleAnchor: "#the-instrument",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 105,
    reciter: "ar.alafasy",
  },

  // ── Full Surah Text ────────────────────────────────────────────────────────
  fullText: [
    {
      ayah: 1,
      arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ",
      ayahRef: "105:1",
      translation: "Have you not seen how your Lord dealt with the People of the Elephant?",
    },
    {
      ayah: 2,
      arabic: "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ",
      ayahRef: "105:2",
      translation: "Did He not make their strategy go utterly astray?",
    },
    {
      ayah: 3,
      arabic: "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ",
      ayahRef: "105:3",
      translation: "And He sent against them birds in successive waves,",
    },
    {
      ayah: 4,
      arabic: "تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ",
      ayahRef: "105:4",
      translation: "striking them with stones of baked clay.",
    },
    {
      ayah: 5,
      arabic: "فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ",
      ayahRef: "105:5",
      translation: "And He made them like consumed, chewed-up stalks.",
    },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Section Journey — the controlled descent from question to image
    sectionJourney: {
      title: "The Descent",
      subtitle: "Four movements: question → verdict → instrument → aftermath",
      sections: [
        {
          ayahs: "1",
          title: "The Question That Already Knows",
          color: "#4ecdc4",
          desc: "Alam tara — 'have you not seen' — a rhetorical question that assumes the answer. The listener already knows what happened. The question is not whether you know, but whether you understand who made it happen.",
        },
        {
          ayahs: "2",
          title: "The Strategy Unmade",
          color: "#9b7fd4",
          desc: "The verdict arrives before the method. Their kayd — meticulous, calculated planning — was made to wander off course entirely. The grand strategy did not merely fail. It was led astray, as though the plan itself became lost.",
        },
        {
          ayahs: "3–4",
          title: "The Instrument",
          color: "#d4a853",
          isPivot: true,
          desc: "Arsala — the same verb used for sending messengers and angels — now used for birds. These are not creatures that happened to appear. They are dispatched. The sky fills with divine deployment, carrying stones of sijjil — the same material that destroyed the people of Lut.",
        },
        {
          ayahs: "5",
          title: "The Aftermath",
          color: "#e07a8a",
          desc: "A single devastating simile closes the surah. An army that arrived as the most formidable military force the peninsula had ever seen is reduced to 'asfin ma'kul — chewed-up grain husks. Something no one would bother to pick up.",
        },
      ],
    },

    // 2. Controlled Descent — the surah shrinks its subject with every ayah
    controlledDescent: {
      title: "The Shrinking",
      subtitle: "With each ayah, the surah reduces the army to less and less",
      elements: [
        {
          label: "The Lord & A Named Army",
          ayah: "1",
          desc: "The widest frame: rabbuka — your Lord, the supreme power — and as-hab al-fil, an army named by their most fearsome weapon.",
          color: "#4ecdc4",
        },
        {
          label: "Their Grand Strategy",
          ayah: "2",
          desc: "Kayd — deliberate, calculated military planning. Logistics, supply lines, psychological warfare. All of it made to wander.",
          color: "#9b7fd4",
        },
        {
          label: "Birds & Pebbles",
          ayah: "3–4",
          desc: "The instrument is impossibly small for the target. An elephant-led army versus birds with stones of clay. The asymmetry is the theological point.",
          color: "#d4a853",
        },
        {
          label: "Chewed-Up Chaff",
          ayah: "5",
          desc: "The most powerful army in Arabian memory now occupies less visual space than harvest waste. Rabbuka opened the surah. 'Asfin ma'kul closes it. The distance between those two poles is the entire argument.",
          color: "#e07a8a",
        },
      ],
    },

    // 3. Absence Map — what Al-Fil deliberately leaves out
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence in Al-Fil is a design choice — the surah strips away every explanatory frame",
      absences: [
        {
          item: "No Quraysh named",
          note: "The direct beneficiaries of the event are never mentioned. The surah is not about who was saved — it is about who did the saving.",
        },
        {
          item: "No Ka'bah mentioned",
          note: "The entire reason for the divine intervention — the protection of the Sacred House — is never stated. The surah trusts you to know.",
        },
        {
          item: "No Ibrahim invoked",
          note: "The builder of the House, the patriarch whose legacy is at stake, is completely absent. The surah refuses to anchor itself in prophetic lineage.",
        },
        {
          item: "No moral instruction",
          note: "No 'so take heed.' No 'will you not reflect.' No imperative verb in the entire surah. It presents a fait accompli and walks away. Almost without parallel in the Quran.",
        },
        {
          item: "No reason given for intervention",
          note: "No 'because they sought to destroy My House.' The surah leaves only the raw sequence: they came, God acted, they were finished.",
        },
      ],
    },

    // 4. Inversion Frame — opening vs. closing poles
    inversionFrame: {
      title: "The Inversion",
      subtitle: "The opening and closing form a precise reversal — supreme authority to absolute emptiness",
      poles: {
        opening: {
          arabic: "رَبُّكَ",
          label: "Rabbuka",
          ayah: "1",
          desc: "Your Lord — the supreme power, named in relation to the Prophet specifically. The widest possible frame of divine authority.",
          color: "#4ecdc4",
        },
        closing: {
          arabic: "كَعَصْفٍ مَّأْكُولٍ",
          label: "'Asfin Ma'kul",
          ayah: "5",
          desc: "Consumed, chewed-up stalks — the most abject image of powerlessness in the surah's vocabulary. Harvest waste. Hollow, perforated, empty.",
          color: "#e07a8a",
        },
      },
      connection: "Between these two poles, the entire drama plays out. The Lord acts. The army becomes nothing. The distance between the first word's authority and the last word's emptiness is the surah's entire argument, compressed into a single frame.",
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "Sijjil — the Quran's vocabulary of destruction has a memory",
      type: "cross-surah",
      searchIntent: "sijjil baked clay stones quran lut abraha connection",
      articleSlug: "sijjil-stones-destruction-quran",
      diagramRef: "sectionJourney",
    },
    {
      concept: "Al-Fil and Quraysh as a paired unit",
      type: "cross-surah",
      searchIntent: "surah fil quraysh paired reading twin surahs",
      articleSlug: "fil-quraysh-paired-surahs",
      diagramRef: "controlledDescent",
    },
    {
      concept: "Arsala — the verb of divine deployment",
      type: "surah-specific",
      searchIntent: "arsala quran sending messengers angels birds",
      articleSlug: "arsala-divine-deployment-quran",
      diagramRef: "sectionJourney",
    },
    {
      concept: "Why Al-Fil offers no moral instruction after divine destruction",
      type: "surah-specific",
      searchIntent: "surah fil no moral command absence instruction",
      articleSlug: "al-fil-absence-moral-design",
      diagramRef: "absenceMap",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "descent", label: "Shrinking" },
  { id: "absent", label: "Absences" },
  { id: "inversion", label: "Inversion" },
  { id: "text", label: "Text" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SHARED — Islamic ornament divider (matches surah pages)
// ══════════════════════════════════════════════════════════════════════════════

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="text-gold-500/50 text-sm">۞</span>
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
          {playing ? "⏸" : "▶"}
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
            <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span>
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
              <span className="text-xs text-cream-muted/50 font-sans">Ayah{sec.ayahs.includes("–") ? "s" : ""} {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural fulcrum</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ControlledDescentViz({ data }: { data: typeof SURAH_DATA.diagrams.controlledDescent }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="space-y-2">
        {data.elements.map((el, i) => {
          const widthPercent = 100 - i * 12;
          return (
            <button
              key={i}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="text-left rounded-xl p-3 transition-all border border-white/[0.06] hover:border-white/[0.12] block mx-auto"
              style={{
                backgroundColor: expanded === i ? el.color + "12" : "transparent",
                borderLeftWidth: "3px",
                borderLeftColor: el.color,
                width: `${widthPercent}%`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium font-sans" style={{ color: el.color }}>
                  {el.label}
                </span>
                <span className="text-xs text-cream-muted/50 font-sans">v.{el.ayah}</span>
              </div>
              {expanded === i && (
                <p className="text-sm text-cream/70 mt-2 leading-relaxed font-body">{el.desc}</p>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <div className="text-center text-xs text-cream-muted/50 font-sans">
          <span className="text-[#4ecdc4]">Rabbuka</span>
          {" → "}
          <span className="text-[#e07a8a]">{"\u2018"}Asfin Ma{"\u2018"}kul</span>
          <br />
          Supreme authority → Harvest waste
        </div>
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
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InversionFrame({ data }: { data: typeof SURAH_DATA.diagrams.inversionFrame }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      {/* Opening pole */}
      <div
        className="rounded-xl p-4 space-y-2 border border-white/[0.06]"
        style={{ backgroundColor: data.poles.opening.color + "0a", borderLeftWidth: "3px", borderLeftColor: data.poles.opening.color }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold font-serif" style={{ color: data.poles.opening.color }}>
            {data.poles.opening.label}
          </span>
          <span className="text-xs text-cream-muted/50 font-sans">Ayah {data.poles.opening.ayah}</span>
        </div>
        <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
          {data.poles.opening.arabic}
        </p>
        <p className="text-sm text-cream/70 leading-relaxed font-body">{data.poles.opening.desc}</p>
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-px h-6 bg-white/[0.06]" />
        <div className="text-xs text-cream-muted/50 font-sans">5 ayahs</div>
        <div className="w-px h-6 bg-white/[0.06]" />
      </div>

      {/* Closing pole */}
      <div
        className="rounded-xl p-4 space-y-2 border border-white/[0.06]"
        style={{ backgroundColor: data.poles.closing.color + "0a", borderRightWidth: "3px", borderRightColor: data.poles.closing.color }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold font-serif" style={{ color: data.poles.closing.color }}>
            {data.poles.closing.label}
          </span>
          <span className="text-xs text-cream-muted/50 font-sans">Ayah {data.poles.closing.ayah}</span>
        </div>
        <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
          {data.poles.closing.arabic}
        </p>
        <p className="text-sm text-cream/70 leading-relaxed font-body">{data.poles.closing.desc}</p>
      </div>

      {/* Connection */}
      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <p className="text-sm italic text-cream font-body">{data.connection}</p>
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

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} · {d.period}
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

        {/* ── Tab bar ──────────────────────────────────────────────────────── */}
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

        {/* ── Tab content ──────────────────────────────────────────────────── */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "descent" && <ControlledDescentViz data={d.diagrams.controlledDescent} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "inversion" && <InversionFrame data={d.diagrams.inversionFrame} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
              <AudioPlayer audio={d.audio} />
            </div>
          )}
        </div>

        {/* ── Go Deeper ────────────────────────────────────────────────────── */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
