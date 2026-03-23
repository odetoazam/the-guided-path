"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MA'IDAH — Visual Architecture Page (v3 — brand-aligned, Long Surah)
// Generated from vetted written article at /surahs/al-maidah
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "Al-Ma'idah",
  arabicName: "المائدة",
  meaning: "The Table Spread",
  number: 5,
  ayahCount: 120,
  period: "Madani",
  juz: "6–7",
  movements: 6,
  thesis:
    "The surah of the last word — a final testament that seals the religion as complete, catalogs every covenant ever broken, and closes with Jesus standing before God demonstrating what a perfectly honored covenant looks like.",
  reflectionUrl: "/surahs/al-maidah",
  readTime: "22 min read",

  sciencesActive: [{"key":"nasikh","english":"Abrogation"},{"key":"makki_madani","english":"Revelation Context"},{"key":"usul_tafsir","english":"Principles of Interpretation"}],
  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِى وَرَضِيتُ لَكُمُ ٱلْإِسْلَـٰمَ دِينًا",
    ayahRef: "5:3",
    translation:
      "Today I have perfected your religion for you, completed My favor upon you, and chosen Islam as your way.",
    why: "The single most consequential sentence in the history of revelation. Embedded between rulings on carrion and stone altars, it arrived at Arafat on a Friday. The camel knelt under the weight of revelation. 'Umar wept — because perfection meant the Prophet's mission was drawing to its close.",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: {
    surahNumber: 5,
    reciter: "ar.alafasy",
  },

  // ── Section Map (long surah — replaces full text) ─────────────────────────
  sectionMap: [
    { ayahs: "1–11", label: "The Covenant Declared", color: "#4ecdc4", size: 11 },
    { ayahs: "12–26", label: "The Broken Covenants", color: "#e07a8a", size: 15 },
    { ayahs: "27–32", label: "The First Murder", color: "#9b7fd4", size: 6, isPivot: true },
    { ayahs: "33–50", label: "Law & Judgment", color: "#e0a848", size: 18 },
    { ayahs: "51–86", label: "People of the Book", color: "#4dbb9b", size: 36 },
    { ayahs: "87–108", label: "Final Legislation", color: "#d4a853", size: 22 },
    { ayahs: "109–120", label: "Jesus & the Table", color: "#C9A84C", size: 12 },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Section Journey — 6 movements through the surah
    sectionJourney: {
      title: "The Capstone",
      subtitle: "Six movements: covenant → broken covenants → first murder → law → People of the Book → Jesus & the table",
      sections: [
        {
          ayahs: "1–11",
          title: "The Covenant Declared",
          color: "#4ecdc4",
          desc: "The surah opens with a word found nowhere else as a Quranic opening: fulfill your contracts. The word 'uqud sets the key in the first sentence. Immediately: food laws, the verse of completion (5:3), the command to cooperate in righteousness and never let hatred of a people lead you to abandon justice.",
        },
        {
          ayahs: "12–26",
          title: "The Broken Covenants",
          color: "#e07a8a",
          desc: "God took a covenant from the Children of Israel — twelve leaders, divine support — and they broke it. He took a covenant from the Christians, and they forgot a portion of what they were reminded of. Partial forgetting is more dangerous than total rejection. The Israelites at the Holy Land refuse to enter: 'Go, you and your Lord, and fight. We will sit right here.'",
        },
        {
          ayahs: "27–32",
          title: "The First Murder",
          color: "#9b7fd4",
          isPivot: true,
          desc: "The surah reaches back to the first human family. Both offered a sacrifice — one accepted, one not. The rejected brother's silence becomes rage, and the rage becomes murder. The accepted brother refuses to mirror the violence: 'I fear God.' A crow teaches the first funeral. From this story: 'Whoever kills a soul, it is as if he killed all of humanity.'",
        },
        {
          ayahs: "33–50",
          title: "Law, Corruption, and Judgment",
          color: "#e0a848",
          desc: "The densest legislative passage. Criminal law, the sanctity of life, and the triple declaration: whoever does not judge by what God revealed — they are the disbelievers, the wrongdoers, the transgressors (5:44, 45, 47). The Torah, the Gospel, and the Quran named in sequence as stages of one revelation. The Quran stands as muhaymin — watchful guardian — over all previous scripture.",
        },
        {
          ayahs: "51–86",
          title: "Navigating the People of the Book",
          color: "#4dbb9b",
          desc: "The longest sustained section addresses the community's relationship with Jewish and Christian communities. Do not take them as awliya' — governing allies in communal direction, not casual friends. But the surah draws distinctions within communities: some among the Christians, who weep when they hear the Quran, are nearest in affection to the believers (5:82).",
        },
        {
          ayahs: "87–120",
          title: "The Final Legislation & Jesus",
          color: "#C9A84C",
          desc: "Prohibition of intoxicants, gambling, divination. The Ka'bah named as a standing-place for humanity. The warning against asking for specificity that narrows permissibility (5:101). Then the closing: Jesus's miracles, the table from heaven, and the extraordinary scene where God asks Jesus directly — 'Did you say to the people, take me and my mother as gods?' His answer is prophetic speech at its most transparent.",
          keyAyahs: [
            { ref: "5:3", label: "Religion perfected" },
            { ref: "5:32", label: "One soul = all humanity" },
            { ref: "5:116", label: "Jesus questioned" },
          ],
        },
      ],
    },

    // 2. Structural Arcs — the large-scale literary movements
    structuralArcs: {
      title: "The Arcs",
      subtitle: "Three structural threads that span the surah",
      arcs: [
        {
          label: "Covenant → Sovereignty",
          from: "5:1",
          to: "5:120",
          fromLabel: "Fulfill your covenants",
          toLabel: "To God belongs the dominion",
          color: "#4ecdc4",
          desc: "The opening places the human being inside an obligation. The closing places that obligation inside God's total ownership. Covenants matter because everything belongs to God, and to break your word is to violate the order of a creation you do not own.",
        },
        {
          label: "Broken Covenants → Perfect Covenant",
          from: "5:12–26",
          to: "5:116–118",
          fromLabel: "Israel & Christians broke",
          toLabel: "Jesus honored perfectly",
          color: "#e07a8a",
          desc: "Every broken covenant the surah catalogues — the Israelites who refused, the Christians who forgot — is answered by Jesus's closing speech. He says only what he was commanded. He claims nothing for himself. His final speech is what a perfectly fulfilled covenant looks like.",
        },
        {
          label: "Sign → Obligation → Judgment",
          from: "5:27",
          to: "5:115",
          fromLabel: "The fire & the offering",
          toLabel: "The table from heaven",
          color: "#9b7fd4",
          desc: "Three stories of covenants with visible signs: the promised land, the fire that consumed the offering, the table from heaven. In each case, the community's failure comes after the sign. Seeing the evidence is not enough. The table descends, and the covenant can still be broken.",
        },
      ],
    },

    // 3. Key Ayahs — landmark verses
    keyAyahs: {
      title: "Landmarks",
      subtitle: "Five verses that define the surah's landscape",
      verses: [
        {
          ref: "5:3",
          arabic: "ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِى",
          ayahRef: "5:3",
          translation: "Today I have perfected your religion for you and completed My favor upon you.",
          context: "The single most momentous declaration in revelation — embedded within food-law rulings. Two distinct completions: akmaltu (perfected in structure) and atmamtu (completed in favor). Everything before this was building. After it, the building is done.",
          color: "#C9A84C",
        },
        {
          ref: "5:8",
          arabic: "وَلَا يَجْرِمَنَّكُمْ شَنَـَٔانُ قَوْمٍ عَلَىٰٓ أَلَّا تَعْدِلُوا۟ ۚ ٱعْدِلُوا۟",
          ayahRef: "5:8",
          translation: "Do not let the hatred of a people prevent you from being just. Be just.",
          context: "Justice as covenant obligation — not contingent on who the other party is. The command is repeated for emphasis: 'be just — that is nearer to piety.'",
          color: "#4ecdc4",
        },
        {
          ref: "5:32",
          arabic: "مَن قَتَلَ نَفْسًا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِى ٱلْأَرْضِ فَكَأَنَّمَا قَتَلَ ٱلنَّاسَ جَمِيعًا",
          ayahRef: "5:32",
          translation: "Whoever kills a soul — unless for a soul or corruption in the land — it is as if he killed all of humanity.",
          context: "The legislation of the sanctity of life grows directly from the narrative of its first violation. The first broken covenant between human beings was a brother's blood.",
          color: "#9b7fd4",
        },
        {
          ref: "5:48",
          arabic: "وَأَنزَلْنَآ إِلَيْكَ ٱلْكِتَـٰبَ بِٱلْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ مِنَ ٱلْكِتَـٰبِ وَمُهَيْمِنًا عَلَيْهِ",
          ayahRef: "5:48",
          translation: "We revealed to you the Book in truth, confirming what came before it and as a guardian over it.",
          context: "Muhaymin — watchful protector. The Quran does not replace previous scripture. It guards it. The relationship to earlier revelation defined in a single word.",
          color: "#e0a848",
        },
        {
          ref: "5:118",
          arabic: "إِن تُعَذِّبْهُمْ فَإِنَّهُمْ عِبَادُكَ ۖ وَإِن تَغْفِرْ لَهُمْ فَإِنَّكَ أَنتَ ٱلْعَزِيزُ ٱلْحَكِيمُ",
          ayahRef: "5:118",
          translation: "If You punish them, they are Your servants. And if You forgive them, You are the Mighty, the Wise.",
          context: "Jesus's final Quranic words. He does not say 'the Merciful, the Forgiving.' He says al-'Aziz al-Hakim — forgiveness as sovereign wisdom, not sentiment. Among the most theologically precise moments in the Quran.",
          color: "#e07a8a",
        },
      ],
    },

    // 4. Absence Map
    absenceMap: {
      title: "What's Missing",
      subtitle: "What a surah of final instructions conspicuously leaves out",
      absences: [
        {
          item: "No sense of uncertainty about the community's direction",
          note: "The earlier Madani surahs — Al-Baqarah, Ali 'Imran, An-Nisa — are still forming the community, still responding to crises. Al-Ma'idah assumes the infrastructure exists. It is finalizing, not founding.",
        },
        {
          item: "No tone of community-building",
          note: "The community-building register of Al-Baqarah is gone. In its place is something closer to a charge — final instructions given to people who are expected to know, by now, how to carry them.",
        },
        {
          item: "No extended afterlife scenes",
          note: "For a 120-ayah surah, the absence of detailed paradise or hellfire imagery is striking. The surah is concerned with the covenant in this world — how it is honored, how it is broken, and what it looks like in a human being standing before God.",
        },
        {
          item: "No path back from the first murder",
          note: "The brother who kills is not offered repentance within the narrative. He is ashamed that he is less capable than a crow — not remorseful for the killing. The moral collapse is complete, and the surah does not attempt to reverse it.",
        },
        {
          item: "No soft names in Jesus's final words",
          note: "Jesus says al-'Aziz al-Hakim — the Mighty, the Wise — not al-Ghafur al-Rahim. Forgiveness belongs to the One with full authority and full knowledge. The choice of divine names is conspicuously deliberate.",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    {
      concept: "5:3 — The day the religion was perfected",
      type: "surah-specific" as const,
      articleSlug: "religion-perfected-5-3-arafat",
    },
    {
      concept: "The first murder — Adam's two sons",
      type: "surah-specific" as const,
      articleSlug: "first-murder-two-sons-adam-5-27",
    },
    {
      concept: "Muhaymin — the Quran as guardian of scripture",
      type: "cross-surah" as const,
      articleSlug: "muhaymin-quran-guardian-5-48",
    },
    {
      concept: "Jesus's closing speech — prophetic self-defense as worship",
      type: "cross-surah" as const,
      articleSlug: "jesus-closing-speech-5-116-118",
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
        The longest section — People of the Book — is 36 ayahs navigating the community&apos;s most complex social reality
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
                    ✦ Structural pivot — the center of gravity
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
              <SectionMap sections={d.sectionMap} ayahCount={d.ayahCount} note="The capstone of revelation" />
              <KeyAyahs data={d.diagrams.keyAyahs} />
            </div>
          )}
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "arcs" && <StructuralArcs data={d.diagrams.structuralArcs} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMap sections={d.sectionMap} ayahCount={d.ayahCount} note="The capstone of revelation" />
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
