"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TAWBAH — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-tawbah
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Tawbah",
  arabicName: "التوبة",
  meaning: "The Repentance",
  number: 9,
  ayahCount: 129,
  period: "Madani",
  juz: "10–11",
  movements: 4,
  thesis:
    "The only surah that withholds mercy from its opening — so that mercy, when it arrives in two divine names resting on the Prophet, lands with the full weight of everything it cost to get there. Between severance and sufficiency, the surah walks through every form of human failure and finds, at the bottom of all of it, the ground that does not move.",
  reflectionUrl: "/surahs/at-tawbah",
  readTime: "30 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"nasikh","english":"Abrogation"},{"key":"usul_tafsir","english":"Principles of Interpretation"}],
  heartVerse: {
    arabic: "حَتَّىٰ إِذَا ضَاقَتْ عَلَيْهِمُ الْأَرْضُ بِمَا رَحُبَتْ وَضَاقَتْ عَلَيْهِمْ أَنفُسُهُمْ وَظَنُّوا أَن لَّا مَلْجَأَ مِنَ اللَّهِ إِلَّا إِلَيْهِ ثُمَّ تَابَ عَلَيْهِمْ لِيَتُوبُوا",
    ayahRef: "9:118",
    translation: "Until the earth, despite its vastness, closed in on them, and their own souls closed in on them, and they were certain that there is no refuge from God except in Him — then He turned to them so that they could repent.",
    why: "The surah's defining image. Three men who had no excuse and did not manufacture one sat in the weight of what they had done for fifty days while the world went narrow. God's turning preceded their repentance. The divine initiative came first. The grammar is the theology: taba 'alayhim — He turned toward them — before they could turn back.",
  },

  audio: { surahNumber: 9, reciter: "ar.alafasy" },

  fullText: "section-map",

  sectionMap: [
    { ayahs: "1–5", title: "The Severance", desc: "Bara'ah — a formal disavowal, no Bismillah. Treaties dissolved with those who violated them. The four-month grace period. Ayah 5 and its built-in qualifications." },
    { ayahs: "6–28", title: "The External Reckoning", desc: "Protection for those who seek it. Custodianship of sacred space belongs to the sincere. The polytheists should not approach the mosque after this year." },
    { ayahs: "29–37", title: "The Broader Framework", desc: "The People of the Book addressed. The sacred months. The transition from external to internal crisis." },
    { ayahs: "38–57", title: "Tabuk — The Excuses Begin", desc: "'Do not go out in the heat.' The surah records each excuse with transcript-like precision. Against them: the memory of Abu Bakr in the cave — la tahzan, do not grieve." },
    { ayahs: "58–72", title: "The Anatomy of Hypocrisy", desc: "Those who mock charity, who claim they were only joking. The taxonomy of nifaq. The contrasting portrait of true believers over whom mercy is placed." },
    { ayahs: "73–80", title: "Sealed Hearts", desc: "A sincere promise, made and broken, hardens into a spiritual condition. The seventy-times verse — a door closed from the inside." },
    { ayahs: "81–101", title: "The Excuse-Makers and the Imperfect", desc: "Those who stayed behind. Those who are tied up — genuine. And ayah 102: those who mixed good deeds with bad. Perhaps — 'asa — Allah will turn toward them." },
    { ayahs: "102–106", title: "The Category of Perhaps", desc: "The imperfect sincere — neither exemplary nor lost, just honest about being mixed. In a surah that closes doors, perhaps is the most generous word." },
    { ayahs: "107–112", title: "The Mosque of Dirar", desc: "A structure built for division, disguised as worship. Sacred infrastructure requires sincere foundation." },
    { ayahs: "113–117", title: "Ibrahim's Prayer and Divine Clarity", desc: "Ibrahim's prayer for his father — the limits of intercession. God does not let a people stray after guiding them until He has made clear what they should avoid." },
    { ayahs: "118–122", title: "The Three Who Were Left Behind", desc: "Fifty days of constriction. No excuse manufactured. The earth closed in, their selves closed in. Then God turned first. And: not all should fight — some must stay to learn." },
    { ayahs: "123–129", title: "The Closing — Mercy Relocated", desc: "Ra'uf, Rahim — two divine names placed on the Prophet after 127 ayahs of reckoning. Then: hasbiyallah — Allah is sufficient for me. The one bond that cannot be dissolved." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Reckoning",
      subtitle: "Four spiraling movements: external severance → communal exposure → individual anatomy → personal return",
      sections: [
        { ayahs: "1–37", title: "The External Crisis", color: "#e07a8a", desc: "Bara'ah — severance. Treaties dissolved with those who violated them, not those who honored them. The four-month grace period. Ayah 5 and its qualifications. Custodianship of sacred space is moral, not tribal. The external lines are drawn — and the surah turns, inevitably, to the lines inside." },
        { ayahs: "38–72", title: "The Internal-Collective", color: "#9b7fd4", desc: "Tabuk and its refusals. The heat, the harvest, the preference for comfort. Each excuse recorded with devastating precision. Against them: Abu Bakr in the cave — 'Do not grieve; God is with us.' The word is tahzan — grieve — not takhaf — fear. A finer emotional register." },
        { ayahs: "73–106", title: "The Internal-Individual", color: "#4ecdc4", desc: "Deeper anatomy. A sincere promise, made and broken, hardens into hypocrisy (ayah 77). The seventy-times verse closes a door. But ayah 102 opens one: those who mixed good with bad. Perhaps — 'asa — the most generous word in a surah that has closed doors with devastating finality." },
        { ayahs: "107–129", title: "The Internal-Personal", color: "#C9A84C", isPivot: true, desc: "The mosque built on lies. Then the three men — fifty days of honest constriction that led somewhere fifty excuses never reach. God turned first. And at the very end: Ra'uf, Rahim — the mercy withheld from the threshold placed on the Prophet. Hasbiyallah — the one bond that holds." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah opens by dissolving human bonds and closes with the one bond that cannot be dissolved",
      pairs: [
        {
          left: { label: "Bara'ah — Severance", ayahs: "1", desc: "A formal disavowal from God and His Messenger. The horizontal bonds revoked. No Bismillah — the mercy is withheld from the threshold" },
          right: { label: "Hasbiyallah — Sufficiency", ayahs: "129", desc: "Allah is sufficient for me. The vertical bond affirmed. One man standing alone if necessary, after everything" },
          color: "#e07a8a",
        },
        {
          left: { label: "External Grace Period", ayahs: "2–5", desc: "Four months given to the polytheists to move freely through the land — time as space for decision" },
          right: { label: "Internal Suspension", ayahs: "118", desc: "Fifty days imposed on three believers — time as space for constriction that becomes return. Both cases: time is the medium in which truth becomes visible" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Missing Bismillah", ayahs: "—", desc: "Al-Rahman, al-Rahim — the two names of mercy — withheld from the surah's opening for the first and only time" },
          right: { label: "Mercy Relocated", ayahs: "128", desc: "Ra'uf, Rahim — two names from God's own attributes placed on the Prophet. The mercy was never absent. It was moved from the threshold to the destination" },
          color: "#C9A84C",
        },
      ],
      center: {
        label: "The Category of Perhaps", ayahs: "102",
        desc: "Others have acknowledged their sins. They mixed a righteous deed with another that was bad. Perhaps God will turn toward them in mercy.",
        note: "In a surah that closes doors with devastating finality — sealed hearts, the seventy-times limit — this verse carves out space for the imperfect sincere. Neither exemplary nor lost. Just honest about being mixed.",
      },
    },
    deductiveFunnel: {
      title: "The Spiral Inward",
      subtitle: "Each section peels back a layer — from the collective and political toward the singular and devotional",
      layers: [
        { depth: 1, label: "External — Broken Treaties", ayah: "1–28", arabic: "بَرَاءَةٌ مِّنَ اللَّهِ وَرَسُولِهِ", desc: "The opening word carries no warmth: bara'ah — disavowal. Treaties dissolved with those who broke them. But ayah 4 exempts those who honored their agreements. Ayah 6: if any polytheist seeks your protection, grant it. The harshness is bounded by mercy the surah refuses to separate from it.", color: "#e07a8a" },
        { depth: 2, label: "Collective — Tabuk's Refusals", ayah: "38–57", arabic: "لَا تَنفِرُوا فِي الْحَرِّ", desc: "'Do not go out in the heat.' The surah responds: 'The fire of Hell is more intense in heat, if they only understood.' Each excuse is recognizable across fourteen centuries because the human impulse behind it has not changed.", color: "#9b7fd4" },
        { depth: 3, label: "Individual — Sealed Hearts", ayah: "73–80", arabic: "فَأَعْقَبَهُمْ نِفَاقًا فِي قُلُوبِهِمْ", desc: "A covenant with God, violated in the moment of comfort, becomes the architecture of one's own inner ruin. The sequence is moral, not arbitrary. The seventy-times verse is not a prohibition on mercy but a statement about a threshold.", color: "#4ecdc4" },
        { depth: 4, label: "The Imperfect — Perhaps", ayah: "102", arabic: "خَلَطُوا عَمَلًا صَالِحًا وَآخَرَ سَيِّئًا", desc: "Those who mixed good deeds with bad and confessed. In a surah that distinguishes sealed hypocrites from total believers, carving out a third category — the imperfect sincere — is one of the most generous structural choices in the Quran.", color: "#3d9bd4" },
        { depth: 5, label: "Personal — The Three Men", ayah: "118", arabic: "ضَاقَتْ عَلَيْهِمُ الْأَرْضُ بِمَا رَحُبَتْ", desc: "Three believers. No excuse. Fifty days of silence from the entire community. The earth closed in despite its vastness. Their selves closed in. Then taba 'alayhim — He turned toward them. God's turning preceded their repentance. The grammar is the theology.", color: "#C9A84C" },
        { depth: 6, label: "Devotional — Mercy Relocated", ayah: "128–129", arabic: "بِالْمُؤْمِنِينَ رَءُوفٌ رَّحِيمٌ", desc: "Two names the Quran elsewhere reserves for God — ra'uf, rahim — placed on the Prophet after 127 ayahs of reckoning. Then one man, alone if necessary: hasbiyallah. The surah that opened with the dissolution of human bonds closes with the one bond that cannot be dissolved.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's most defining feature is what it withholds — starting with mercy's name",
      absences: [
        { item: "No Bismillah", note: "The only surah in the Quran that does not open with 'In the name of God, the Most Merciful, the Especially Merciful.' The mercy is not gone — the root r-h-m appears repeatedly — but it is withheld from the threshold. You do not receive it upon entry. You arrive at it after walking through everything the surah demands." },
        { item: "No extended descriptions of Paradise or Hell", note: "The other long Madani surahs move into visions of the afterlife. At-Tawbah barely pauses for any of this. Its accountability is functional rather than devotional: 'You will be returned to the Knower of the unseen, and He will inform you.' The eschatology is not a vision but a verdict." },
        { item: "No prophetic narratives", note: "No stories of Musa, Ibrahim, or Nuh. Its only prophetic reference is Ibrahim's prayer for his father (ayah 114). The surah is not interested in historical precedent. It is interested in what is happening right now, among these specific people." },
        { item: "No comfort before commitment", note: "The surah does not offer the comfort of Paradise before demanding commitment. It demands commitment in the present tense. The reckoning is sustained across 127 ayahs before two words of tenderness arrive." },
        { item: "No binary — the middle is named", note: "In a surah that distinguishes sealed hypocrites from total believers, ayah 102 carves out a third category: the imperfect sincere. The people who failed and knew it. The surah does not flatten the moral spectrum into two poles. It names the middle and gives it hope." },
      ],
    },
  },

  contentNodes: [
    { concept: "The three who were left behind — repentance as divine initiative", type: "surah-specific", articleSlug: "three-left-behind-9-118" },
    { concept: "The absent Bismillah — mercy withheld then relocated", type: "surah-specific", articleSlug: "absent-bismillah-tawbah-9" },
    { concept: "Al-Anfal / At-Tawbah diptych — first test to final reckoning", type: "cross-surah", articleSlug: "anfal-tawbah-diptych-8-9" },
    { concept: "The imperfect sincere — ayah 102 and the category of perhaps", type: "cross-surah", articleSlug: "mixed-deeds-perhaps-9-102" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "reckoning", label: "Reckoning" },
  { id: "mirror", label: "Mirror" },
  { id: "spiral", label: "Spiral" },
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

  const seekTo = (clientX: number) => {
    if (!audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    seekTo(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 0) return;
    seekTo(e.clientX);
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
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"
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

function SectionMapText({ sections }: { sections: typeof SURAH_DATA.sectionMap }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-serif text-cream">Section Map</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">129 ayahs across 12 sections — tap any section for its scope</p>
      </div>
      <div className="space-y-2">
        {sections.map((sec, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gold-500 font-serif">{sec.title}</span>
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
          </div>
        ))}
      </div>
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
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Mercy relocated — the destination</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      {data.pairs.map((pair, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}>
            <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>
              {pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span>
            </div>
            <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p>
          </div>
          <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}>
            <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}>
              <span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}
            </div>
            <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p>
          </div>
        </div>
      ))}
      <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2">
        <div className="text-sm font-semibold text-gold-500 font-serif">
          ✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span>
        </div>
        <p className="text-sm italic text-cream font-body">{data.center.desc}</p>
        <p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p>
      </div>
    </div>
  );
}

function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.layers.map((layer, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? layer.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: layer.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span>
            </div>
            <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>
              {layer.arabic}
            </p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        External → collective → individual → imperfect → personal → devotional
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
            Surah {d.number} · {d.period} · Juz {d.juz}
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
              <div className="text-2xl font-bold text-gold-500 font-serif">50</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Days</div>
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
          {activeTab === "reckoning" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "spiral" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <SectionMapText sections={d.sectionMap} />
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
