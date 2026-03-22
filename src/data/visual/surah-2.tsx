"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-BAQARAH — Visual Architecture Page (v3 — brand-aligned, Long Surah)
// Generated from vetted written article at /surahs/al-baqarah
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Al-Baqarah",
  arabicName: "البقرة",
  meaning: "The Cow",
  number: 2,
  ayahCount: 286,
  period: "Madani",
  juz: "1–3",
  movements: 7,
  thesis:
    "A constitution that only works for perfect people is not a constitution. Al-Baqarah builds the entire architecture and then writes, into its last line, the prayer of the people who will live inside it imperfectly.",
  reflectionUrl: "/surahs/al-baqarah",
  readTime: "29 min read",

  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "وَكَذَٰلِكَ جَعَلْنَـٰكُمْ أُمَّةً وَسَطًا لِّتَكُونُوا۟ شُهَدَآءَ عَلَى ٱلنَّاسِ",
    ayahRef: "2:143",
    translation:
      "And thus We made you a middle community, that you may be witnesses over humanity.",
    why: "The structural hinge. Everything before it builds the case from history. Everything after it builds the community's future. The qiblah changes — and so does the surah's direction.",
    articleAnchor: "#the-qiblah-changes",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 2,
    reciter: "ar.alafasy",
  },

  // ── Section Map (long surah — replaces full text) ─────────────────────────
  sectionMap: [
    { ayahs: "1–20", label: "Three Hearts", color: "#4ecdc4", size: 20 },
    { ayahs: "21–39", label: "The Original Trust", color: "#9b7fd4", size: 19 },
    { ayahs: "40–121", label: "The Long Reckoning", color: "#e07a8a", size: 82 },
    { ayahs: "122–141", label: "The Ibrahim Pivot", color: "#e0a848", size: 20 },
    { ayahs: "142–152", label: "The Qiblah Changes", color: "#d4a853", size: 11, isPivot: true },
    { ayahs: "153–252", label: "Community Charter", color: "#4dbb9b", size: 100 },
    { ayahs: "253–286", label: "The Final Ascent", color: "#9b7fd4", size: 34 },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Section Journey — 7 movements through the surah
    sectionJourney: {
      title: "The Journey",
      subtitle: "Six movements building from diagnosis to covenant",
      sections: [
        {
          ayahs: "1–20",
          title: "The Three Portraits",
          color: "#4ecdc4",
          desc: "Three kinds of hearts: those that receive guidance, those that refuse it, and those that perform acceptance while withholding it inside. The hypocrites get 12 of the 20 ayahs — more troubling than outright rejection.",
        },
        {
          ayahs: "21–39",
          title: "The Original Trust",
          color: "#9b7fd4",
          desc: "Adam, the garden, the fall — and then the moment: God gives Adam the words of return. The first human failure is met with the first divine gift of the vocabulary needed to come back. Repentance is not something Adam invents — it is something he is given.",
        },
        {
          ayahs: "40–121",
          title: "The Long Reckoning",
          color: "#e07a8a",
          desc: "Over 80 ayahs of sustained address to Bani Isra'il — the longest directed at any single community in the Quran. A judicial review of covenant-received-then-renegotiated. The cow story lives here: obedience delayed by reasonable-sounding questions until compliance became nearly impossible.",
        },
        {
          ayahs: "122–141",
          title: "The Ibrahim Pivot",
          color: "#e0a848",
          desc: "Before commissioning the new community, the surah goes behind all competing claims to Ibrahim — who predates them all. Standing at the Ka'ba's foundations, millennia before Medina, he prays for a people who will not exist for thousands of years.",
        },
        {
          ayahs: "142–152",
          title: "The Qiblah Changes",
          color: "#d4a853",
          isPivot: true,
          desc: "The structural hinge. Mid-prayer, the congregation turns from Jerusalem to Mecca. Every ayah before this looks backward. Every ayah after it builds forward. The physical act mirrors the structural one.",
        },
        {
          ayahs: "153–252",
          title: "The Charter",
          color: "#4dbb9b",
          desc: "The legislative voice takes over. Fasting, pilgrimage, marriage, divorce, debt, orphan wealth, charity, warfare — the full architecture of a community's life. And buried in the Ramadan legislation: 'When My servants ask you about Me — I am near.' God removes the intermediary and answers directly.",
          keyAyahs: [
            { ref: "2:186", label: "I am near" },
            { ref: "2:255", label: "Ayat al-Kursi" },
            { ref: "2:256", label: "No compulsion" },
          ],
        },
        {
          ayahs: "253–286",
          title: "The Final Ascent",
          color: "#9b7fd4",
          desc: "Ayat al-Kursi — the summit. Then 'no compulsion in religion' immediately after the most majestic description of divine power. The surah closes with the community speaking in first person: 'We hear and we obey. Forgive us.' A constitution sealed with a prayer for the imperfect people who will live inside it.",
        },
      ],
    },

    // 2. Structural Arcs — the large-scale literary movements
    structuralArcs: {
      title: "The Arcs",
      subtitle: "Three structural arguments that span the surah",
      arcs: [
        {
          label: "3rd Person → 1st Person",
          from: "1–5",
          to: "285–286",
          fromLabel: "They believe in the unseen",
          toLabel: "We hear and we obey",
          color: "#4ecdc4",
          desc: "A community begins as a description and becomes a community that can speak. The distance between 'these are the ones who believe' and 'our Lord, do not burden us' is the distance between being defined and being able to pray.",
        },
        {
          label: "Adam's Words → Community's Du'a",
          from: "2:37",
          to: "2:286",
          fromLabel: "Adam received from his Lord words",
          toLabel: "Our Lord, do not burden us",
          color: "#d4a853",
          desc: "The first human failure is met with divinely given words of return. The surah closes with a community exercising that same capacity on its own. From receiving the vocabulary of return to using it.",
        },
        {
          label: "Backward Gaze → Forward Build",
          from: "1–141",
          to: "142–286",
          fromLabel: "History & evidence",
          toLabel: "Law & construction",
          color: "#e07a8a",
          desc: "The qiblah change at ayah 142 is the exact point where the surah's argument pivots. The community turns. The surah turns. The direction of attention shifts from the evidence of the past to the construction of the future.",
        },
      ],
    },

    // 3. Key Ayahs — landmark verses in the surah
    keyAyahs: {
      title: "Landmarks",
      subtitle: "Five verses that define the surah's landscape",
      verses: [
        {
          ref: "2:30",
          arabic: "إِنِّى جَاعِلٌ فِى ٱلْأَرْضِ خَلِيفَةً",
          ayahRef: "2:30",
          translation: "I am placing a steward in the earth.",
          context: "God's announcement to the angels. Knowledge as the ground of stewardship — you can carry the trust because you can name what is in it.",
          color: "#9b7fd4",
        },
        {
          ref: "2:143",
          arabic: "وَكَذَٰلِكَ جَعَلْنَـٰكُمْ أُمَّةً وَسَطًا",
          ayahRef: "2:143",
          translation: "And thus We made you a middle community.",
          context: "The hinge. The word wasat — middle, balanced, median — defines the community's identity. Witnesses positioned between extremes.",
          color: "#d4a853",
        },
        {
          ref: "2:186",
          arabic: "وَإِذَا سَأَلَكَ عِبَادِى عَنِّى فَإِنِّى قَرِيبٌ",
          ayahRef: "2:186",
          translation: "When My servants ask you about Me — I am near.",
          context: "Placed inside fasting legislation. The expected 'say' (qul) never comes — God removes the intermediary and answers directly. The grammar enacts the closeness.",
          color: "#4dbb9b",
        },
        {
          ref: "2:255",
          arabic: "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
          ayahRef: "2:255",
          translation: "Allah — there is no deity except Him, the Ever-Living, the Self-Sustaining.",
          context: "Ayat al-Kursi. After 254 ayahs of human effort and failure — the surah pauses. Here is who holds the covenant on the other side. He does not grow drowsy.",
          color: "#e0a848",
        },
        {
          ref: "2:286",
          arabic: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
          ayahRef: "2:286",
          translation: "Allah does not burden a soul beyond what it can bear.",
          context: "The closing du'a. Three verbs for burden, escalating. A constitution that accounts for the imperfection of those who will live inside it.",
          color: "#e07a8a",
        },
      ],
    },

    // 4. Absence Map
    absenceMap: {
      title: "What's Missing",
      subtitle: "What 286 ayahs conspicuously leave out",
      absences: [
        {
          item: "Extended scenes of the afterlife",
          note: "The vivid descriptions of paradise and hellfire that fill Makki surahs are barely present. Al-Baqarah is aimed at this life — this community, this covenant, this city, this moment of construction.",
        },
        {
          item: "Personal, intimate consolation",
          note: "The tenderness of Al-Duha ('your Lord has not abandoned you'), the reassurance of Al-Inshirah — that register barely surfaces. The mercy here is structural. Al-Baqarah's kindness is architectural.",
        },
        {
          item: "A simple name",
          note: "The longest surah names itself after a cow no one wanted to slaughter — a five-ayah episode about obedience delayed by reasonable-sounding questions. Because that is the disease the entire surah is written to treat.",
        },
        {
          item: "A closing statement of achievement",
          note: "After 285 ayahs of instruction, the final words are not triumph — they are a prayer: 'do not hold us accountable if we forget.' The constitution is sealed by the frailty of those who will live inside it.",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "The cow story — obedience delayed by reasonable questions",
      type: "surah-specific",
      searchIntent: "story of the cow in quran surah baqarah meaning",
      articleSlug: "cow-story-baqarah-obedience-delayed",
      diagramRef: "sectionJourney",
    },
    {
      concept: "Ayat al-Kursi — the greatest ayah",
      type: "cross-surah",
      searchIntent: "ayat al kursi meaning significance greatest verse",
      articleSlug: "ayat-al-kursi-deep-analysis",
      diagramRef: "keyAyahs",
    },
    {
      concept: "2:186 — God removes the intermediary",
      type: "surah-specific",
      searchIntent: "when my servants ask about me I am near meaning",
      articleSlug: "i-am-near-2-186-fasting-intimacy",
      diagramRef: "keyAyahs",
    },
    {
      concept: "The Qiblah change as structural hinge",
      type: "surah-specific",
      searchIntent: "change of qiblah quran significance structure",
      articleSlug: "qiblah-change-structural-hinge-baqarah",
      diagramRef: "structuralArcs",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "map", label: "Map" },
  { id: "journey", label: "Journey" },
  { id: "arcs", label: "Arcs" },
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

function SectionMap({ sections }: { sections: typeof SURAH_DATA.sectionMap }) {
  const total = sections.reduce((sum, s) => sum + s.size, 0);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">Surah Map</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">
          286 ayahs · 7 movements · The floor of the palace
        </p>
      </div>

      {/* Proportional bar */}
      <div className="flex rounded-lg overflow-hidden h-4 gap-px">
        {sections.map((sec, i) => (
          <div
            key={i}
            className="relative"
            style={{
              width: `${(sec.size / total) * 100}%`,
              backgroundColor: sec.color + "50",
              borderBottom: sec.isPivot ? `3px solid ${sec.color}` : undefined,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {sections.map((sec, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: sec.color }}
            />
            <div className="flex-1 flex items-center justify-between">
              <span className="text-xs font-medium text-cream font-sans">
                {sec.label}
                {sec.isPivot && (
                  <span className="ml-1 text-gold-500">✦</span>
                )}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">{sec.ayahs}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-cream-muted/50 font-sans">
        The longest section — The Long Reckoning — is 82 ayahs of sustained
        address to Bani Isra&apos;il
      </div>
    </div>
  );
}

function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="space-y-2">
        {data.sections.map((sec, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className={`w-full text-left rounded-xl p-4 transition-all border ${
              sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"
            } hover:border-white/[0.12]`}
            style={{
              backgroundColor:
                expanded === i ? sec.color + "20" : sec.color + "0a",
              borderLeftWidth: "3px",
              borderLeftColor: sec.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-semibold font-serif"
                style={{ color: sec.color }}
              >
                {sec.title}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">
                Ayahs {sec.ayahs}
              </span>
            </div>
            {expanded === i && (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-cream/70 leading-relaxed font-body">
                  {sec.desc}
                </p>
                {sec.isPivot && (
                  <div className="text-xs text-gold-500 font-medium font-sans">
                    ✦ Structural pivot — the surah turns here
                  </div>
                )}
                {sec.keyAyahs && (
                  <div className="flex flex-wrap gap-2">
                    {sec.keyAyahs.map((ka, j) => (
                      <span
                        key={j}
                        className="text-xs rounded-full px-2.5 py-1 bg-gold-500/15 text-gold-500 font-sans"
                      >
                        {ka.ref} — {ka.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StructuralArcs({ data }: { data: typeof SURAH_DATA.diagrams.structuralArcs }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="space-y-3">
        {data.arcs.map((arc, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl overflow-hidden transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{ backgroundColor: arc.color + "10" }}
          >
            {/* Arc header */}
            <div className="px-4 pt-4 pb-2">
              <div
                className="text-sm font-semibold font-serif"
                style={{ color: arc.color }}
              >
                {arc.label}
              </div>
            </div>

            {/* Arc visual */}
            <div className="px-4 pb-2">
              <div className="flex items-center gap-2">
                <div
                  className="rounded px-2 py-1 text-[10px] font-medium text-cream font-sans"
                  style={{ backgroundColor: arc.color + "30" }}
                >
                  {arc.fromLabel}
                </div>
                <div className="flex-1 relative h-6">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 200 24"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 10 20 Q 100 -5 190 20"
                      fill="none"
                      stroke={arc.color}
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                    <polygon
                      points="185,18 190,20 185,22"
                      fill={arc.color}
                    />
                  </svg>
                </div>
                <div
                  className="rounded px-2 py-1 text-[10px] font-medium text-cream font-sans"
                  style={{ backgroundColor: arc.color + "30" }}
                >
                  {arc.toLabel}
                </div>
              </div>
            </div>

            {/* Arc description */}
            {expanded === i && (
              <div className="px-4 pb-4">
                <p className="text-sm text-cream/70 leading-relaxed font-body">
                  {arc.desc}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-cream-muted/50 font-sans">
                  <span>From: {arc.from}</span>
                  <span className="text-white/[0.06]">|</span>
                  <span>To: {arc.to}</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function KeyAyahs({ data }: { data: typeof SURAH_DATA.diagrams.keyAyahs }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>

      <div className="space-y-3">
        {data.verses.map((v, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? v.color + "18" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: v.color,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium font-sans" style={{ color: v.color }}>
                {v.ref}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">
                {expanded === i ? "▾" : "▸"}
              </span>
            </div>
            <p className="text-lg leading-loose text-right text-cream mb-2 font-amiri" style={{ direction: "rtl" }}>
              {v.arabic}
            </p>
            <p className="text-xs italic text-cream/70 font-body">{v.translation}</p>
            {expanded === i && (
              <p className="text-sm text-cream-muted/60 mt-3 leading-relaxed font-body">
                {v.context}
              </p>
            )}
          </button>
        ))}
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
          {activeTab === "map" && (
            <div className="space-y-8">
              <SectionMap sections={d.sectionMap} />
              <KeyAyahs data={d.diagrams.keyAyahs} />
            </div>
          )}
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "arcs" && <StructuralArcs data={d.diagrams.structuralArcs} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMap sections={d.sectionMap} />
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
