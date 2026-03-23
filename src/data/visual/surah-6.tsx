"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-AN'AM — Visual Architecture Page (v3 — brand-aligned, Long Surah)
// Generated from vetted written article at /surahs/al-anam
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Al-An'am",
  arabicName: "الأنعام",
  meaning: "The Cattle",
  number: 6,
  ayahCount: 165,
  period: "Makki",
  juz: "7–8",
  movements: 7,
  thesis:
    "The Quran's longest single breath — a surah revealed whole, escorted by seventy thousand angels, that asks one question across 165 ayahs: by whose authority do you live the way you live? And it will not let you change the subject until you have answered.",
  reflectionUrl: "/surahs/al-anam",
  readTime: "24 min read",

  sciencesActive: [{"key":"aqeedah","english":"Theology"},{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"}],
  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "لَّا تُدْرِكُهُ ٱلْأَبْصَـٰرُ وَهُوَ يُدْرِكُ ٱلْأَبْصَـٰرَ ۖ وَهُوَ ٱللَّطِيفُ ٱلْخَبِيرُ",
    ayahRef: "6:103",
    translation:
      "Vision cannot grasp Him, but He grasps all vision. And He is the Subtle, the All-Aware.",
    why: "The same verb — adraka — used in both directions, yielding opposite results. You look for Him and cannot find the edges. He looks at you and misses nothing. The relationship between Creator and created, rendered in eight words.",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 6,
    reciter: "ar.alafasy",
  },

  // ── Section Map (long surah — replaces full text) ─────────────────────────
  sectionMap: [
    { ayahs: "1–12", label: "The Opening Declaration", color: "#4ecdc4", size: 12 },
    { ayahs: "13–39", label: "Signs Everywhere", color: "#9b7fd4", size: 27 },
    { ayahs: "40–73", label: "The Debate Intensifies", color: "#e07a8a", size: 34 },
    { ayahs: "74–83", label: "Ibrahim Among the Stars", color: "#C9A84C", size: 10, isPivot: true },
    { ayahs: "84–90", label: "The Prophetic Line", color: "#e0a848", size: 7 },
    { ayahs: "91–117", label: "The Quran's Authority", color: "#4dbb9b", size: 27 },
    { ayahs: "118–153", label: "The Trial of the Cattle", color: "#d4a853", size: 36 },
    { ayahs: "154–165", label: "The Verdict", color: "#9b7fd4", size: 12 },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Section Journey — 7 movements through the surah
    sectionJourney: {
      title: "The Prosecution",
      subtitle: "Seven movements: declaration → signs → debate → Ibrahim → prophets → Quran → cattle trial → verdict",
      sections: [
        {
          ayahs: "1–12",
          title: "The Opening Declaration",
          color: "#4ecdc4",
          desc: "The only surah besides Al-Fatiha to open with alhamdulillah. The claim is immediate and total: everything that exists was made, and the one who made it deserves exclusive praise. By the second ayah — 'He created you from clay, then decreed a term' — the surah has moved from cosmology to mortality. Darknesses, plural; light, singular. The asymmetry is structural.",
        },
        {
          ayahs: "13–39",
          title: "The Signs Everywhere",
          color: "#9b7fd4",
          desc: "The surah builds its case through creation. The rain, the gardens, the date palms with clustered fruit hanging low, the olive and the pomegranate — 'similar and dissimilar.' Each thing is named the way a witness names exhibits in a trial. The surah weaves between the ayahs of creation and the ayahs of the Quran itself, making reading the world and reading the Book the same act of attention.",
        },
        {
          ayahs: "40–73",
          title: "The Debate Intensifies",
          color: "#e07a8a",
          desc: "The qul commands multiply — over forty across the surah, more than any other. Muhammad is given his lines for a debate already underway. Every objection is quoted and dismantled: why no miracle, why no angel, why this messenger? Then at ayah 59 — the keys of the unseen. Not a leaf falls but He knows it. The sheer volume of what God tracks makes the Qurayshi claim to independent authority absurd.",
        },
        {
          ayahs: "74–83",
          title: "Ibrahim Among the Stars",
          color: "#C9A84C",
          isPivot: true,
          desc: "After seventy-three ayahs of theological argument, the surah tells a story. Ibrahim looks at a star: this is my Lord. It sets. The moon: this is my Lord. It sets. The sun — the greatest. It sets. Then: 'I have turned my face toward the one who created the heavens and the earth.' The argument from impermanence — whatever is truly God cannot disappear.",
        },
        {
          ayahs: "84–90",
          title: "The Prophetic Line",
          color: "#e0a848",
          desc: "Eighteen prophets listed in a single inheritance of guidance — Ishaq, Ya'qub, Nuh, Dawud, Sulayman, Ayyub, Yusuf, Musa, Harun, Zakariyya, Yahya, 'Isa, Ilyas, Al-Yasa', Yunus, Lut. 'These are the ones God guided, so follow their guidance.' The prophetic project is one project. The guidance is one guidance.",
        },
        {
          ayahs: "91–117",
          title: "The Quran's Authority",
          color: "#4dbb9b",
          desc: "The hinge — from the God who creates to the God who speaks. 'They did not give God His true estimate when they said: God has not revealed anything to a human being.' The surah anticipates every objection to its own authority. The word sultan — authority, proof, warrant — recurs: where is your sultan for what you claim?",
        },
        {
          ayahs: "118–153",
          title: "The Trial of the Cattle",
          color: "#d4a853",
          desc: "The surah arrives at its namesake. A systematic dismantling of Qurayshi livestock superstitions — the bahirah, the sa'ibah, the wasilah, the ham. 'Who authorized this?' Then, after all the demolition, the surah builds: 'Come, let me recite what your Lord has actually prohibited' (6:151). The Quranic Ten Commandments arrive only after the question of authority has been settled.",
          keyAyahs: [
            { ref: "6:59", label: "Not a leaf falls" },
            { ref: "6:103", label: "Vision cannot grasp Him" },
            { ref: "6:151", label: "What God actually prohibited" },
          ],
        },
        {
          ayahs: "154–165",
          title: "The Verdict",
          color: "#9b7fd4",
          desc: "The surah that opened with 'praise belongs to God who created the heavens and the earth' closes with a human being surrendering prayer, sacrifice, life, and death to that same God. The opening was cosmic. The closing is personal. 'Say: my prayer and my sacrifice and my living and my dying are for God, Lord of the worlds.'",
        },
      ],
    },

    // 2. Structural Arcs — the large-scale literary movements
    structuralArcs: {
      title: "The Arcs",
      subtitle: "Three structural threads that span the surah",
      arcs: [
        {
          label: "Creation → Surrender",
          from: "6:1",
          to: "6:162",
          fromLabel: "God created the heavens",
          toLabel: "My living & dying are for God",
          color: "#4ecdc4",
          desc: "The surah's argument compressed into two points: He made you, so give yourself back. Creation at the start; surrender at the end. The distance between them is the distance the surah has traveled.",
        },
        {
          label: "Theology → Legislation",
          from: "6:1–150",
          to: "6:151–153",
          fromLabel: "150 ayahs of argument",
          toLabel: "Three ayahs of law",
          color: "#e0a848",
          desc: "The legislation arrives only once the question of authority has been settled. After 150 ayahs establishing that God alone has the right to command — only then does He command. Law after theology, command after argument. You do not get the rules until you understand who is giving them.",
        },
        {
          label: "Abstract → Specific",
          from: "6:1–73",
          to: "6:118–153",
          fromLabel: "Theological argument",
          toLabel: "Qurayshi cattle practices",
          color: "#e07a8a",
          desc: "The debate passages confront the opposition abstractly. The trial of Qurayshi customs is devastatingly specific — naming the bahirah, the sa'ibah, the wasilah by name. The same argument, two registers: philosophical and then forensic.",
        },
      ],
    },

    // 3. Key Ayahs — landmark verses
    keyAyahs: {
      title: "Landmarks",
      subtitle: "Five verses that define the surah's landscape",
      verses: [
        {
          ref: "6:59",
          arabic: "وَعِندَهُۥ مَفَاتِحُ ٱلْغَيْبِ لَا يَعْلَمُهَآ إِلَّا هُوَ",
          ayahRef: "6:59",
          translation: "With Him are the keys of the unseen; none knows them except Him.",
          context: "The density of divine knowledge compressed into a single ayah. He knows what is on the land and in the sea. Not a leaf falls but He knows it. No seed in the darkness of the earth, no wet thing nor dry — all in a clear record.",
          color: "#9b7fd4",
        },
        {
          ref: "6:79",
          arabic: "إِنِّى وَجَّهْتُ وَجْهِىَ لِلَّذِى فَطَرَ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ حَنِيفًا",
          ayahRef: "6:79",
          translation: "I have turned my face toward the one who created the heavens and the earth, inclining to truth.",
          context: "Ibrahim's declaration after the stars, moon, and sun all set. What the entire surah has been building toward, given voice by the patriarch who did not inherit his faith but reasoned his way to it.",
          color: "#C9A84C",
        },
        {
          ref: "6:103",
          arabic: "لَّا تُدْرِكُهُ ٱلْأَبْصَـٰرُ وَهُوَ يُدْرِكُ ٱلْأَبْصَـٰرَ",
          ayahRef: "6:103",
          translation: "Vision cannot grasp Him, but He grasps all vision.",
          context: "The mirrored verb structure — la tudrikuhu / wa huwa yudriku — among the most precise in the Quran. The divine name that follows, al-Latif (the Subtle), carries a root meaning of present in everything, visible in nothing.",
          color: "#4ecdc4",
        },
        {
          ref: "6:151",
          arabic: "قُلْ تَعَالَوْا۟ أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ",
          ayahRef: "6:151",
          translation: "Come, let me recite what your Lord has actually prohibited.",
          context: "After 150 ayahs of dismantling false authority, the surah exercises true authority. The Quranic Ten Commandments. Theology becomes ethics. The abstract becomes lived.",
          color: "#e0a848",
        },
        {
          ref: "6:162",
          arabic: "قُلْ إِنَّ صَلَاتِى وَنُسُكِى وَمَحْيَاىَ وَمَمَاتِى لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
          ayahRef: "6:162",
          translation: "Say: my prayer and my sacrifice and my living and my dying are for God, Lord of the worlds.",
          context: "The surah's closing personal surrender. The opening was cosmic — God created the heavens and the earth. The closing is a human being giving everything back. The distance between them is the surah's argument.",
          color: "#e07a8a",
        },
      ],
    },

    // 4. Absence Map
    absenceMap: {
      title: "What's Missing",
      subtitle: "What 165 ayahs of sustained argument conspicuously leave out",
      absences: [
        {
          item: "No stories of destroyed nations",
          note: "A Makki surah of this length would be expected to carry warnings through the fates of 'Ad, Thamud, the people of Lut. Al-An'am mentions them only in passing (6:6). It chose argument over warning, evidence over threat. The destroyed nations appear in Al-A'raf, its twin.",
        },
        {
          item: "No extended narrative until Ibrahim",
          note: "Seventy-three ayahs of pure theological argument before the first story. When narrative finally arrives — Ibrahim among the stars — it functions as the argument given human form, not as relief from it.",
        },
        {
          item: "No legislation until ayah 151",
          note: "The most conspicuous structural absence. 150 ayahs of theological argument, then three ayahs of law. The placement is the statement: you do not get the rules until you understand who is giving them.",
        },
        {
          item: "No Madani-style community building",
          note: "No 'O you who believe,' no legislation for communal life, no family law, no inheritance. This surah addresses the individual standing before the question of ultimate authority — not the community that will be built after the question is answered.",
        },
        {
          item: "No soft entry point",
          note: "The surah opens with a total cosmological claim and never relents. There is no parable to ease into, no story to warm up with. The very first ayah announces that God made the heavens and the earth and the darknesses and the light, and the argument begins.",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "Ibrahim's journey through the celestial bodies",
      type: "surah-specific" as const,
      articleSlug: "ibrahim-stars-moon-sun-6-75-79",
    },
    {
      concept: "6:103 — Vision cannot grasp Him",
      type: "surah-specific" as const,
      articleSlug: "la-tudrikuhu-al-absar-6-103",
    },
    {
      concept: "The Quranic Ten Commandments (6:151–153)",
      type: "cross-surah" as const,
      articleSlug: "quranic-ten-commandments-6-151",
    },
    {
      concept: "Al-An'am & Al-A'raf — the twin surahs",
      type: "cross-surah" as const,
      articleSlug: "anam-araf-twin-surahs-argument-narrative",
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

function SectionMap({ sections, ayahCount, note }: { sections: typeof SURAH_DATA.sectionMap; ayahCount: number; note: string }) {
  const total = sections.reduce((sum, s) => sum + s.size, 0);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">Surah Map</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">
          {ayahCount} ayahs · {sections.length} movements · {note}
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
        The longest sections — Debate &amp; Cattle Trial — are each 34-36 ayahs of sustained argument
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
                    ✦ Structural pivot — the argument given human form
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


        <AudioPlayer audio={d.audio} />

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
              <SectionMap sections={d.sectionMap} ayahCount={d.ayahCount} note="Revealed as a single breath" />
              <KeyAyahs data={d.diagrams.keyAyahs} />
            </div>
          )}
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "arcs" && <StructuralArcs data={d.diagrams.structuralArcs} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMap sections={d.sectionMap} ayahCount={d.ayahCount} note="Revealed as a single breath" />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
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
