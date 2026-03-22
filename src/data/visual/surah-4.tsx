"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AN-NISA — Visual Architecture Page (v3 — brand-aligned, Long Surah)
// Generated from vetted written article at /surahs/an-nisa
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name: "An-Nisa",
  arabicName: "\u0627\u0644\u0646\u0651\u0650\u0633\u064E\u0627\u0621",
  meaning: "The Women",
  number: 4,
  ayahCount: 176,
  period: "Madani",
  juz: "4\u20136",
  movements: 5,
  thesis:
    "A surah that arrived when the household was shattered and rebuilt it, brick by brick, from the single soul all humans share to the last inheritance ruling for the one who has almost no family left \u2014 and never once separated the legal from the sacred.",
  reflectionUrl: "/surahs/an-nisa",
  readTime: "27 min read",

  // ── Heart Verse ───────────────────────────────────────────────────────────
  heartVerse: {
    arabic: "\u064A\u064E\u0627 \u0623\u064E\u064A\u0651\u064F\u0647\u064E\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0622\u0645\u064E\u0646\u064F\u0648\u0627 \u0643\u064F\u0648\u0646\u064F\u0648\u0627 \u0642\u064E\u0648\u0651\u064E\u0627\u0645\u0650\u064A\u0646\u064E \u0628\u0650\u0627\u0644\u0652\u0642\u0650\u0633\u0652\u0637\u0650 \u0634\u064F\u0647\u064E\u062F\u064E\u0627\u0621\u064E \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0648\u064E\u0644\u064E\u0648\u0652 \u0639\u064E\u0644\u064E\u0649\u0670 \u0623\u064E\u0646\u0641\u064F\u0633\u0650\u0643\u064F\u0645\u0652",
    ayahRef: "4:135",
    translation: "O you who believe, be persistently standing firmly in justice, as witnesses for Allah, even if it be against yourselves.",
    why: "The summit of the surah\u2019s justice theme. The word qawwamin \u2014 the same root as qiwama in ayah 34 \u2014 now describes every believer\u2019s responsibility before God. Justice is not a posture you take when convenient. It is a station you occupy permanently, at cost, against your own interests if necessary.",
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  audio: { surahNumber: 4, reciter: "ar.alafasy" },

  // ── Section Map (long surah — replaces full text) ─────────────────────────
  sectionMap: [
    { ayahs: "1\u201335", label: "The Human Family Rebuilt", color: "#4ecdc4", size: 35 },
    { ayahs: "36\u201370", label: "The Anatomy of Half-Heartedness", color: "#9b7fd4", size: 35 },
    { ayahs: "71\u2013104", label: "The Community Under Pressure", color: "#e07a8a", size: 34 },
    { ayahs: "105\u2013135", label: "The Treachery Within", color: "#e0a848", size: 31, isPivot: true },
    { ayahs: "136\u2013176", label: "The Theological Foundation", color: "#4dbb9b", size: 41 },
  ],

  // ── Diagrams ──────────────────────────────────────────────────────────────
  diagrams: {
    // 1. Section Journey — 5 movements through the surah
    sectionJourney: {
      title: "The Journey",
      subtitle: "Five movements: household \u2192 character \u2192 battlefield \u2192 exposure \u2192 theology",
      sections: [
        {
          ayahs: "1\u201335",
          title: "The Human Family Rebuilt",
          color: "#4ecdc4",
          desc: "Opens with the widest possible address \u2014 ya ayyuha al-nas, O people \u2014 and the most intimate origin: a single soul, its mate, and from those two, multitudes. The word yatama (orphans) appears four times in the first ten ayahs. Then the inheritance verses (11\u201312): divine arithmetic specifying shares for parents, children, spouses, siblings. In pre-Islamic practice, women and minors could be excluded. An-Nisa severed that link. A daughter inherits by right, not by generosity.",
          keyAyahs: [
            { ref: "4:1", label: "One soul" },
            { ref: "4:11\u201312", label: "Inheritance shares" },
          ],
        },
        {
          ayahs: "36\u201370",
          title: "The Anatomy of Half-Heartedness",
          color: "#9b7fd4",
          desc: "Ayah 36 maps the ecology of moral obligation concentrically: from God outward to parents, relatives, orphans, the poor, the near neighbor, the far neighbor, the companion, the traveler. Then the diagnosis: people who claim belief but seek judgment from taghut when the Quranic ruling is inconvenient. Ayah 59 establishes the chain of obedience. Ayah 69 promises companionship with the prophets \u2014 not that you will become one, but that you will sit with them.",
          keyAyahs: [
            { ref: "4:36", label: "The ecology of care" },
            { ref: "4:69", label: "With the prophets" },
          ],
        },
        {
          ayahs: "71\u2013104",
          title: "The Community Under Pressure",
          color: "#e07a8a",
          desc: "The surah watches how people behave when belief is tested by stakes. Ayah 72 names the one who calibrates loyalty to outcome \u2014 present in victory, absent in defeat. The central passage is salat al-khawf (ayahs 101\u2013103): prayer performed mid-battle. The congregation splits so that worship never pauses even under attack. There is no condition under which prayer becomes dispensable. Faith adapts. It does not yield.",
          keyAyahs: [
            { ref: "4:95", label: "Those who strive vs. those who sit" },
            { ref: "4:101\u2013103", label: "Salat al-khawf" },
          ],
        },
        {
          ayahs: "105\u2013135",
          title: "The Treachery Within",
          color: "#e0a848",
          isPivot: true,
          desc: "The hinge. The Prophet \uFEDB is told: do not advocate for the treacherous. Tribal loyalty is not a defense. Then the hypocrites receive their most psychologically penetrating portrait: \u2018wavering between this and that, belonging neither to these nor to those.\u2019 The section climbs to ayah 135: stand firmly in justice, even against yourselves. The word qawwamin, from the same root as qiwama in ayah 34, now applies to every believer.",
          keyAyahs: [
            { ref: "4:105", label: "Do not advocate for the treacherous" },
            { ref: "4:135", label: "Justice against yourselves" },
            { ref: "4:142\u2013143", label: "The wavering hypocrite" },
          ],
        },
        {
          ayahs: "136\u2013176",
          title: "The Theological Foundation",
          color: "#4dbb9b",
          desc: "\u2018O you who believe, believe\u2019 \u2014 faith is not a threshold crossed once but an ongoing act of renewal. Ayah 163 presents the prophetic chain: Nuh through Sulayman. Musa is separated from the chain in ayah 164 \u2014 \u2018to Musa Allah spoke directly\u2019 \u2014 the emphatic construction keeping two arguments distinct. Ayahs 157\u2013158 deny the crucifixion. Ayah 171 corrects Trinitarian excess with the cadence of a physician: \u2018do not commit excess \u2014 desist, it is better for you.\u2019 The final ayah is an inheritance ruling for the kalalah.",
          keyAyahs: [
            { ref: "4:136", label: "Believe again" },
            { ref: "4:171", label: "Do not say three" },
            { ref: "4:176", label: "Kalalah ruling" },
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
          label: "Nafs Wahida \u2192 Kalalah",
          from: "4:1",
          to: "4:176",
          fromLabel: "All humanity from one soul",
          toLabel: "One person, almost no family",
          color: "#4ecdc4",
          desc: "The surah moves from the fullest vision of the human family \u2014 one soul, its mate, multitudes \u2014 to the most depleted: one person, no parents, no children, perhaps a sibling. Between those poles, everything the surah does is the work of holding the human family together. The closing inheritance ruling is not anticlimax. It is the surah\u2019s final proof: the law still cares, even when the family it was built to protect has nearly disappeared.",
        },
        {
          label: "Justice Ascending",
          from: "4:3",
          to: "4:135",
          fromLabel: "Justice in marriage",
          toLabel: "Justice against yourself",
          color: "#e0a848",
          desc: "The word \u2018adl tracks a progression through the surah. Ayah 3: justice as the condition bounding polygyny. Ayah 58: judge between people with justice. Ayah 129: you will never achieve perfect justice between wives. Ayah 135: stand for justice even against yourselves. Each occurrence demands more than the last. Justice begins in the household, moves to the courtroom, and arrives at the self.",
        },
        {
          label: "The Orphan Thread",
          from: "4:2",
          to: "4:127",
          fromLabel: "Give orphans their property",
          toLabel: "The orphan girl returns",
          color: "#e07a8a",
          desc: "Yatama appears in ayahs 2, 3, 6, 10, 36, 127. The opening cluster establishes urgency. Then the word disappears through the middle sections. In ayah 127, near the end of the legislative arc, the surah turns back: the orphan girl has not left the conversation. The surah carried her through a hundred ayahs of other concerns and returned to her.",
        },
      ],
    },

    // 3. Key Ayahs — landmark verses in the surah
    keyAyahs: {
      title: "Landmarks",
      subtitle: "Five verses that define the surah\u2019s landscape",
      verses: [
        {
          ref: "4:1",
          arabic: "\u064A\u064E\u0627 \u0623\u064E\u064A\u0651\u064F\u0647\u064E\u0627 \u0627\u0644\u0646\u0651\u064E\u0627\u0633\u064F \u0627\u062A\u0651\u064E\u0642\u064F\u0648\u0627 \u0631\u064E\u0628\u0651\u064E\u0643\u064F\u0645\u064F \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u062E\u064E\u0644\u064E\u0642\u064E\u0643\u064F\u0645 \u0645\u0651\u0650\u0646 \u0646\u0651\u064E\u0641\u0652\u0633\u064D \u0648\u064E\u0627\u062D\u0650\u062F\u064E\u0629\u064D",
          ayahRef: "4:1",
          translation: "O people, be conscious of your Lord who created you from a single soul.",
          context: "The widest possible address before a single ruling. All humanity from one nafs. The orphan three ayahs later is not a stranger \u2014 she is kin. The law protecting her is kinship remembered.",
          color: "#4ecdc4",
        },
        {
          ref: "4:41",
          arabic: "\u0641\u064E\u0643\u064E\u064A\u0652\u0641\u064E \u0625\u0650\u0630\u064E\u0627 \u062C\u0650\u0626\u0652\u0646\u064E\u0627 \u0645\u0650\u0646 \u0643\u064F\u0644\u0651\u0650 \u0623\u064F\u0645\u0651\u064E\u0629\u064D \u0628\u0650\u0634\u064E\u0647\u0650\u064A\u062F\u064D \u0648\u064E\u062C\u0650\u0626\u0652\u0646\u064E\u0627 \u0628\u0650\u0643\u064E \u0639\u064E\u0644\u064E\u0649\u0670 \u0647\u064E\u0640\u0670\u0624\u064F\u0644\u064E\u0627\u0621\u0650 \u0634\u064E\u0647\u0650\u064A\u062F\u064B\u0627",
          ayahRef: "4:41",
          translation: "How will it be when We bring from every nation a witness and We bring you as a witness against these people?",
          context: "The ayah that made the Prophet \uFEDB weep when Ibn Mas\u2019ud recited it to him. The surah\u2019s most personal weight: the one who built the community will be called to account for how it was received.",
          color: "#9b7fd4",
        },
        {
          ref: "4:101\u2013103",
          arabic: "\u0648\u064E\u0625\u0650\u0630\u064E\u0627 \u0643\u064F\u0646\u062A\u064E \u0641\u0650\u064A\u0647\u0650\u0645\u0652 \u0641\u064E\u0623\u064E\u0642\u064E\u0645\u0652\u062A\u064E \u0644\u064E\u0647\u064F\u0645\u064F \u0627\u0644\u0635\u0651\u064E\u0644\u064E\u0627\u0629\u064E",
          ayahRef: "4:102",
          translation: "And when you are among them and lead them in prayer...",
          context: "Salat al-khawf \u2014 the only place in the Quran where the physical mechanics of congregational prayer are adjusted for a specific circumstance. The congregation divides so that worship and watchfulness continue simultaneously. Prayer does not pause for battle.",
          color: "#e07a8a",
        },
        {
          ref: "4:135",
          arabic: "\u0643\u064F\u0648\u0646\u064F\u0648\u0627 \u0642\u064E\u0648\u0651\u064E\u0627\u0645\u0650\u064A\u0646\u064E \u0628\u0650\u0627\u0644\u0652\u0642\u0650\u0633\u0652\u0637\u0650 \u0634\u064F\u0647\u064E\u062F\u064E\u0627\u0621\u064E \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0648\u064E\u0644\u064E\u0648\u0652 \u0639\u064E\u0644\u064E\u0649\u0670 \u0623\u064E\u0646\u0641\u064F\u0633\u0650\u0643\u064F\u0645\u0652",
          ayahRef: "4:135",
          translation: "Stand firmly in justice as witnesses for Allah, even against yourselves.",
          context: "The summit. The word qawwamin redefines the qiwama concept from ayah 34. What was described as male responsibility in the household now applies to every believer before God. Justice is a station occupied permanently, at cost.",
          color: "#e0a848",
        },
        {
          ref: "4:176",
          arabic: "\u064A\u064E\u0633\u0652\u062A\u064E\u0641\u0652\u062A\u064F\u0648\u0646\u064E\u0643\u064E \u0642\u064F\u0644\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u064A\u064F\u0641\u0652\u062A\u0650\u064A\u0643\u064F\u0645\u0652 \u0641\u0650\u064A \u0627\u0644\u0652\u0643\u064E\u0644\u064E\u0627\u0644\u064E\u0629\u0650",
          ayahRef: "4:176",
          translation: "They ask you for a ruling. Say: Allah gives you a ruling concerning the kalalah.",
          context: "The surah\u2019s final act: an inheritance ruling for the person whose family has nearly disappeared. No closing doxology. No evocation of the Day of Judgment. The law still cares when the family it was built to protect has almost gone.",
          color: "#4dbb9b",
        },
      ],
    },

    // 4. Absence Map
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "176 ayahs that build a constitution \u2014 and what they leave out",
      absences: [
        {
          item: "Almost no natural imagery",
          note: "Stars, seas, the alternation of night and day, growing things \u2014 the Quran\u2019s habitual vocabulary of signs is nearly absent. The community does not need to be convinced that God exists. It needs to know how to live given that He does. Structure, for a community in crisis, is a form of mercy.",
        },
        {
          item: "No extended prophetic narratives",
          note: "Al-Baqarah has Adam. Ali \u2018Imran has the family of Imran and Jesus. An-Nisa \u2014 despite being longer than all of them except Al-Baqarah \u2014 tells no sustained story. There are references to prophets but no narrative arc given room to unfold. The community does not need a parable. It needs a constitution.",
        },
        {
          item: "No personal consolation to the Prophet",
          note: "The tenderness of Al-Duha, the reassurance of Al-Inshirah \u2014 that register is absent. The address to the Prophet \uFEDB in ayah 105 is a demand: do not be an advocate for those who betray themselves. The surah speaks to him as judge, not as beloved.",
        },
        {
          item: "No closing celebration",
          note: "After 175 ayahs of household ethics, communal diagnosis, battlefield law, theological argument \u2014 the final act is an inheritance ruling for the kalalah. The surah does not end with triumph. It ends with the law reaching the person who has almost no one left.",
        },
        {
          item: "No release from difficulty",
          note: "Makki surahs often move from warning to promise, from threat to gardens. An-Nisa provides no emotional release. The sixteen addresses to \u2018O you who believe\u2019 are not praise \u2014 they are demands. This is a text that keeps turning to look at you.",
        },
      ],
    },
  },

  // ── Content Nodes (future article seeds) ──────────────────────────────────
  contentNodes: [
    { concept: "Salat al-Khawf \u2014 prayer under fire", type: "surah-specific", articleSlug: "salat-al-khawf-prayer-under-fire-4-101" },
    { concept: "The kalalah ruling \u2014 law at the edge of depletion", type: "surah-specific", articleSlug: "kalalah-ruling-family-depleted-4-176" },
    { concept: "Qawwamin \u2014 from household to cosmic justice", type: "surah-specific", articleSlug: "qawwamin-justice-ascending-4-34-135" },
    { concept: "An-Nisa and Al-Baqarah \u2014 public identity vs. private architecture", type: "cross-surah", articleSlug: "nisa-baqarah-public-private-architecture" },
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
          176 ayahs · 5 movements · The architecture of protection
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
        From nafs wahida to kalalah &mdash; the fullest family to the most depleted
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
