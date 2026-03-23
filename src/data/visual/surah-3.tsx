"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH ALI 'IMRAN — Visual Architecture Page (v3 — brand-aligned, Long Surah)
// Generated from vetted written article at /surahs/ali-imran
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Ali \u2018Imran",
  arabicName: "\u0622\u0644 \u0639\u0650\u0645\u0652\u0631\u0627\u0646",
  meaning: "The Family of Imran",
  number: 3,
  ayahCount: 200,
  period: "Madani",
  juz: "3\u20134",
  movements: 5,
  thesis:
    "A surah that finds you in the rubble, calls the collapse by its right name, refuses to let you blame anyone you shouldn\u2019t or excuse anything you can\u2019t, and then sits with you until you can stand again \u2014 and look at the sky \u2014 and say: You did not make this for nothing.",
  reflectionUrl: "/surahs/ali-imran",
  readTime: "25 min read",

  sciencesActive: [{"key":"nazm","english":"Structural Coherence"},{"key":"muhkamat","english":"Clear & Ambiguous Verses"},{"key":"munasabat","english":"Inter-surah Connections"}],
  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "\u0648\u062A\u0650\u0644\u0652\u0643\u064E \u0627\u0644\u0652\u0623\u064E\u064A\u0651\u064E\u0627\u0645\u064F \u0646\u064F\u062F\u064E\u0627\u0648\u0650\u0644\u064F\u0647\u064E\u0627 \u0628\u064E\u064A\u0652\u0646\u064E \u0627\u0644\u0646\u0651\u064E\u0627\u0633\u0650",
    ayahRef: "3:140",
    translation: "And these days, We alternate them among the people.",
    why: "The pivot on which the entire surah turns. The verb nudawiluhaa \u2014 from the root that gives Arabic the word dawla (state, cycle, currency) \u2014 compresses a philosophy of history into four syllables. The days of victory and defeat are not random. They are circulated by design. The God who alternates night and day alternates the fortunes of nations by the same principle.",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: { surahNumber: 3, reciter: "ar.alafasy" },

  // ── Section Map (long surah — replaces full text) ─────────────────────────
  sectionMap: [
    { ayahs: "1\u201332", label: "The Ground Beneath the Ground", color: "#4ecdc4", size: 32 },
    { ayahs: "33\u201363", label: "The House of Miracles", color: "#9b7fd4", size: 31 },
    { ayahs: "64\u2013120", label: "Common & Contested Ground", color: "#e0a848", size: 57 },
    { ayahs: "121\u2013175", label: "The Reckoning (Uhud)", color: "#e07a8a", size: 55, isPivot: true },
    { ayahs: "176\u2013200", label: "Those Who Remain", color: "#4dbb9b", size: 25 },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Section Journey — 5 movements through the surah
    sectionJourney: {
      title: "The Journey",
      subtitle: "Five movements: theology \u2192 narrative \u2192 argument \u2192 wound \u2192 stillness",
      sections: [
        {
          ayahs: "1\u201332",
          title: "The Ground Beneath the Ground",
          color: "#4ecdc4",
          desc: "Opens with al-Hayy al-Qayyum \u2014 the Living, the Self-Sustaining \u2014 the same names that anchor Ayat al-Kursi. Then ayah 7: the muhkam/mutashabih distinction, the Quran\u2019s only direct statement about its own internal structure. Clear verses are the load-bearing walls; ambiguous ones shimmer with more than one meaning. The posture of the firmly rooted is not to chase ambiguity but to hold it: \u2018We believe in it. All of it is from our Lord.\u2019",
        },
        {
          ayahs: "33\u201363",
          title: "The House of Miracles",
          color: "#9b7fd4",
          desc: "The family of Imran unfolds through escalating impossibilities. Hanna expects a son; she receives a daughter who will become the mother of a prophet. Zakariyya sees Maryam\u2019s miraculous provision and is moved to request his own impossible child. Then Maryam herself: a son without a father. Each miracle builds on the one before. The architecture of the family is the argument. Ayah 59 redirects: the likeness of Isa before Allah is like Adam \u2014 the miracle points to the Maker.",
          keyAyahs: [{ ref: "3:59", label: "Isa-Adam parallel" }],
        },
        {
          ayahs: "64\u2013120",
          title: "Common & Contested Ground",
          color: "#e0a848",
          desc: "The interfaith argument sharpens. \u2018Come to a word that is equitable between us and you\u2019 \u2014 kalima sawa\u2019 assumes shared ground before it asks anything. Then ayah 110 defines the Muslim community by a function: commanding good and preventing harm. The Mubahala challenge (ayah 61) marks the outer limit of theological argument \u2014 a mutual oath of imprecation that the Najran delegation declined.",
          keyAyahs: [
            { ref: "3:64", label: "Come to common ground" },
            { ref: "3:110", label: "Best community" },
          ],
        },
        {
          ayahs: "121\u2013175",
          title: "The Reckoning",
          color: "#e07a8a",
          isPivot: true,
          desc: "The longest sustained battle narrative in the Quran \u2014 55 ayahs of Uhud. The archers left their posts. The rumor spread that the Prophet \uFEDB was dead. Three failures named in a single breath: loss of nerve, internal disagreement, disobedience after a clear sign. And yet the quality that held everything together was not strength \u2014 it was softness. \u2018By the mercy of Allah, you were lenient with them.\u2019 The community survived because its leader refused to harden.",
          keyAyahs: [
            { ref: "3:140", label: "Days alternate" },
            { ref: "3:159", label: "You were gentle" },
          ],
        },
        {
          ayahs: "176\u2013200",
          title: "Those Who Remain",
          color: "#4dbb9b",
          desc: "The surah\u2019s most contemplative section. People who remember Allah standing, sitting, lying on their sides. They look at the heavens and earth and say: \u2018Our Lord, You did not create this without purpose.\u2019 The final ayah compresses the entire argument into four imperatives: persevere, endure, remain stationed, be conscious of Allah.",
          keyAyahs: [
            { ref: "3:190\u2013191", label: "Those of understanding" },
            { ref: "3:200", label: "Four imperatives" },
          ],
        },
      ],
    },

    // 2. Structural Arcs — the large-scale literary movements
    structuralArcs: {
      title: "The Arcs",
      subtitle: "Three structural arguments that span the surah",
      arcs: [
        {
          label: "Ulu al-Albab Envelope",
          from: "3:7",
          to: "3:190",
          fromLabel: "Hold ambiguity in revelation",
          toLabel: "See purpose in creation",
          color: "#4ecdc4",
          desc: "The phrase \u2018those of innermost understanding\u2019 appears at ayah 7 (responding to textual ambiguity) and returns at ayah 190 (responding to cosmic signs). The surah argues that reading revelation rightly and reading creation rightly require the same posture: willingness to see pattern and purpose in what is not fully explicable.",
        },
        {
          label: "Al-Hayy al-Qayyum \u2192 Rabitu",
          from: "3:2",
          to: "3:200",
          fromLabel: "God is Self-Sustaining",
          toLabel: "Hold your position",
          color: "#e0a848",
          desc: "The divine attribute at the entrance \u2014 al-Qayyum, the one who sustains without faltering \u2014 becomes an ethical demand at the exit: rabitu, remain stationed. The surah argues that the divine attribute of self-sustaining existence has a corresponding human practice: the refusal to leave your post.",
        },
        {
          label: "Miraculous Family \u2192 Battlefield Faith",
          from: "33\u201363",
          to: "121\u2013175",
          fromLabel: "God\u2019s power transcends mechanism",
          toLabel: "Victory from apparent defeat",
          color: "#9b7fd4",
          desc: "The family narrative establishes that Allah\u2019s agency is not constrained by expected mechanism. This is exactly what the community needs when it reaches Uhud. The God who produced Isa without biological precedent is the same God who can produce meaning from what looks like ruin.",
        },
      ],
    },

    // 3. Key Ayahs — landmark verses in the surah
    keyAyahs: {
      title: "Landmarks",
      subtitle: "Five verses that define the surah\u2019s landscape",
      verses: [
        {
          ref: "3:7",
          arabic: "\u0647\u064F\u0648\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0623\u064E\u0646\u0632\u064E\u0644\u064E \u0639\u064E\u0644\u064E\u064A\u0652\u0643\u064E \u0627\u0644\u0652\u0643\u0650\u062A\u064E\u0627\u0628\u064E \u0645\u0650\u0646\u0652\u0647\u064F \u0622\u064A\u064E\u0627\u062A\u064C \u0645\u0651\u064F\u062D\u0652\u0643\u064E\u0645\u064E\u0627\u062A\u064C",
          ayahRef: "3:7",
          translation: "It is He who sent down to you the Book; in it are verses that are clear and foundational...",
          context: "The Quran\u2019s only direct statement about its own internal structure. The muhkam/mutashabih distinction maps two postures before ambiguity: the one who chases it to destabilize, and the one who holds it in trust.",
          color: "#4ecdc4",
        },
        {
          ref: "3:59",
          arabic: "\u0625\u0650\u0646\u0651\u064E \u0645\u064E\u062B\u064E\u0644\u064E \u0639\u0650\u064A\u0633\u064E\u0649\u0670 \u0639\u0650\u0646\u062F\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0643\u064E\u0645\u064E\u062B\u064E\u0644\u0650 \u0622\u062F\u064E\u0645\u064E",
          ayahRef: "3:59",
          translation: "The likeness of Jesus before Allah is the likeness of Adam.",
          context: "If miraculous origin proves divinity, then Adam\u2019s claim is stronger \u2014 no mother and no father. The miracle points to the Maker. It always pointed to the Maker.",
          color: "#9b7fd4",
        },
        {
          ref: "3:140",
          arabic: "\u0648\u062A\u0650\u0644\u0652\u0643\u064E \u0627\u0644\u0652\u0623\u064E\u064A\u0651\u064E\u0627\u0645\u064F \u0646\u064F\u062F\u064E\u0627\u0648\u0650\u0644\u064F\u0647\u064E\u0627 \u0628\u064E\u064A\u0652\u0646\u064E \u0627\u0644\u0646\u0651\u064E\u0627\u0633\u0650",
          ayahRef: "3:140",
          translation: "And these days, We alternate them among the people.",
          context: "The pivot. The verb nudawiluhaa carries the image of something being handed around like currency. The days of victory and defeat are circulated by design. Defeat is not the absence of God \u2014 it is one of the days He circulates.",
          color: "#e07a8a",
        },
        {
          ref: "3:159",
          arabic: "\u0641\u064E\u0628\u0650\u0645\u064E\u0627 \u0631\u064E\u062D\u0652\u0645\u064E\u0629\u064D \u0645\u0651\u0650\u0646\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0644\u0650\u0646\u062A\u064E \u0644\u064E\u0647\u064F\u0645\u0652",
          ayahRef: "3:159",
          translation: "By the mercy of Allah, you were lenient with them.",
          context: "Allah addressing the Prophet \uFEDB about his conduct after a defeat caused in part by his own followers\u2019 disobedience. The quality that held the community together was not strength \u2014 it was softness. Had he hardened, they would have scattered.",
          color: "#e0a848",
        },
        {
          ref: "3:190\u2013191",
          arabic: "\u0631\u064E\u0628\u0651\u064E\u0646\u064E\u0627 \u0645\u064E\u0627 \u062E\u064E\u0644\u064E\u0642\u0652\u062A\u064E \u0647\u064E\u0670\u0630\u064E\u0627 \u0628\u064E\u0627\u0637\u0650\u0644\u064B\u0627 \u0633\u064F\u0628\u0652\u062D\u064E\u0627\u0646\u064E\u0643\u064E",
          ayahRef: "3:191",
          translation: "Our Lord, You did not create this without purpose. Exalted are You.",
          context: "The du\u2019a of the ulu al-albab. People who have been through the surah \u2014 the theology, the narrative, the wound of Uhud \u2014 and what remains is a declaration of trust by people who have seen enough to know that trust is the only posture that holds.",
          color: "#4dbb9b",
        },
      ],
    },

    // 4. Absence Map
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "200 ayahs of Madani revelation \u2014 and what they conspicuously leave out",
      absences: [
        {
          item: "Almost no legal rulings",
          note: "Al-Baqarah devotes long passages to marriage, divorce, fasting, pilgrimage, inheritance. Ali \u2018Imran \u2014 of comparable length \u2014 offers almost none of that. The community does not need more legislation in this moment. It needs its certainty rebuilt. The absence of law is a diagnosis.",
        },
        {
          item: "No sustained story of punishment",
          note: "The vivid akhirah imagery of Makki surahs is mostly absent. No extended hellfire tableau, no graphic reckoning scene. The surah\u2019s concern is this world, this wound, this community standing in the aftermath.",
        },
        {
          item: "No single named antagonist",
          note: "Unlike surahs that name Pharaoh, Abu Lahab, or Iblis as focal adversaries, Ali \u2018Imran diagnoses communal failure without a villain. The enemy at Uhud is named less than the community\u2019s own internal fractures.",
        },
        {
          item: "No rebuke of the Prophet",
          note: "After a military disaster caused partly by his followers\u2019 disobedience, the surah\u2019s address to the Prophet \uFEDB is not correction but affirmation: \u2018you were gentle with them.\u2019 The absence of blame toward leadership is itself an argument about what kind of authority survives crisis.",
        },
        {
          item: "No triumphant closing",
          note: "The final ayah is not celebration \u2014 it is four imperatives: persevere, endure, remain stationed, be conscious of Allah. The surah does not end with arrival. It ends with the instruction to keep standing.",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    { concept: "Muhkam and Mutashabih \u2014 the Quran\u2019s self-description", type: "surah-specific", articleSlug: "muhkam-mutashabih-3-7" },
    { concept: "The family of Imran \u2014 miracle as architecture", type: "surah-specific", articleSlug: "family-imran-miracle-architecture" },
    { concept: "Nudawiluhaa \u2014 the circulation of days", type: "surah-specific", articleSlug: "nudawiluhaa-circulation-days-3-140" },
    { concept: "Al-Zahrawayn \u2014 Al-Baqarah and Ali \u2018Imran as a pair", type: "cross-surah", articleSlug: "zahrawayn-baqarah-ali-imran-pair" },
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
      <span className="text-gold-500/50 text-sm">{"\u06DE"}</span>
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
          {playing ? "\u23F8" : "\u25B6"}
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
          200 ayahs · 5 movements · The crisis manual
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
                  <span className="ml-1 text-gold-500">{"\u2726"}</span>
                )}
              </span>
              <span className="text-xs text-cream-muted/50 font-sans">{sec.ayahs}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-cream-muted/50 font-sans">
        The Uhud reckoning &mdash; 55 ayahs &mdash; is the longest sustained battle narrative in the Quran
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
                    {"\u2726"} Structural pivot &mdash; the surah turns here
                  </div>
                )}
                {sec.keyAyahs && (
                  <div className="flex flex-wrap gap-2">
                    {sec.keyAyahs.map((ka, j) => (
                      <span
                        key={j}
                        className="text-xs rounded-full px-2.5 py-1 bg-gold-500/15 text-gold-500 font-sans"
                      >
                        {ka.ref} &mdash; {ka.label}
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
                {expanded === i ? "\u25BE" : "\u25B8"}
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
            <div className="text-sm font-semibold text-[#e07a8a] font-sans">{"\u2205"} {a.item}</div>
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
