"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH SAD — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/sad
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Sad",
  arabicName: "ص",
  meaning: "The Letter Sad",
  number: 38,
  ayahCount: 88,
  period: "Makki",
  juz: 23,
  movements: 4,
  thesis:
    "A surah where every throne in creation — earthly, heavenly, and infernal — is shown to be borrowed, and the only figure who claimed otherwise is the one standing in exile.",
  reflectionUrl: "/surahs/sad",
  readTime: "25 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"nazm","english":"Structural Coherence"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "أَنَا خَيْرٌ مِّنْهُ ۖ خَلَقْتَنِي مِن نَّارٍ وَخَلَقْتَهُ مِن طِينٍ",
    ayahRef: "38:76",
    translation: "I am better than him. You created me from fire and created him from clay.",
    why: "Seven words in Arabic. The first recorded argument for the superiority of one created being over another based on origin material. The logic that looked at the raw ingredient and refused to see the finished work — the divine breath, the proportioning, the command to honor.",
  },

  audio: { surahNumber: 38, reciter: "ar.alafasy" },

  // ── Section-map approach for medium surahs ──────────────────────────────
  sectionMap: [
    { ayahs: "1–6", label: "The Oath & the Diagnosis", arabic: "ص ۚ وَالْقُرْآنِ ذِي الذِّكْرِ", summary: "The letter Sad. An oath by the Quran full of dhikr. The Quraysh diagnosed: their resistance is 'izzah (pride that hardens into fracture) and shiqaq (splitting from truth). A warner from among themselves — and they marvel." },
    { ayahs: "7–11", label: "The Mockers", arabic: "امْشُوا وَاصْبِرُوا عَلَىٰ آلِهَتِكُمْ", summary: "The Quraysh leaders walk away saying: hold to your gods. They mock the idea that the message could be true. Is their dominion so vast they control the ropes of heaven?" },
    { ayahs: "12–16", label: "The Roll-Call of Denial", arabic: "كَذَّبَتْ قَبْلَهُمْ قَوْمُ نُوحٍ", summary: "Nuh, Ad, Fir'awn of the stakes, Thamud, Lut, the companions of the thicket — each named in a single breath. A wall of precedent. Then: they are only waiting for a single blast, with no delay." },
    { ayahs: "17–20", label: "Dawud: The Servant of Strength", arabic: "اصْبِرْ عَلَىٰ مَا يَقُولُونَ وَاذْكُرْ عَبْدَنَا دَاوُودَ", summary: "Remember Our servant Dawud — possessor of strength, one who repeatedly turned back. Mountains and birds glorify with him. His kingdom strengthened, given wisdom and fasl al-khitab." },
    { ayahs: "21–26", label: "Dawud: The Trial", arabic: "وَظَنَّ دَاوُودُ أَنَّمَا فَتَنَّاهُ", summary: "Two litigants scale his private wall. Ninety-nine ewes against one. Dawud rules — and mid-sentence realizes the parable is about him. Falls into sajdah without delay. Forgiven. Told: you are a khalifah on earth — judge with truth." },
    { ayahs: "27–33", label: "Sulayman: The Horses", arabic: "إِنِّي أَحْبَبْتُ حُبَّ الْخَيْرِ عَن ذِكْرِ رَبِّي", summary: "Sulayman — what an excellent servant. Magnificent horses displayed before him at evening. He realizes their beauty distracted him from remembrance. He acts decisively: return them. A king who chose dhikr over beauty." },
    { ayahs: "34–40", label: "Sulayman: The Throne", arabic: "وَلَقَدْ فَتَنَّا سُلَيْمَانَ", summary: "A body placed on his throne — the enigmatic test. He turns back to Allah, asks for a kingdom no one after him will match. Wind, jinn, builders, divers, rebels in chains — all placed at his service. 'This is Our gift — grant or withhold without account.'" },
    { ayahs: "41–44", label: "Ayyub: The Grass", arabic: "وَاذْكُرْ عَبْدَنَا أَيُّوبَ", summary: "Ayyub calls out from his suffering. Told: strike with your foot — a cool washing place. Family restored, doubled. The oath resolved with a handful of soft grass. What an excellent servant." },
    { ayahs: "45–48", label: "The Roll-Call of Strength", arabic: "أُولِي الْأَيْدِي وَالْأَبْصَارِ", summary: "Ibrahim, Ishaq, Ya'qub, Isma'il, Alyasa', Dhul-Kifl — possessors of strength and vision. Purified by one exclusive quality: remembrance of the final abode." },
    { ayahs: "49–58", label: "The Two Destinations", arabic: "هَٰذَا ذِكْرٌ", summary: "Gardens of Eden, gates flung open, reclining thrones, fruit and drink. Stated as fact and left. The fire receives more attention — and more dialogue." },
    { ayahs: "59–64", label: "The Quarrel in the Fire", arabic: "هَٰذَا فَوْجٌ مُّقْتَحِمٌ مَّعَكُمْ", summary: "Leaders cursed by followers. Followers search for the believers they once mocked — and cannot find them among the damned. The absent are conspicuous. The quarreling (takhasum) echoes the litigants (khasm) who came to Dawud." },
    { ayahs: "65–70", label: "The Warner's Declaration", arabic: "قُلْ إِنَّمَا أَنَا مُنذِرٌ", summary: "I am only a warner. There is no deity except Allah, the One, the Prevailing. A mighty announcement from which you are turning away. I had no knowledge of the exalted assembly when they disputed." },
    { ayahs: "71–85", label: "The Heavenly Assembly", arabic: "إِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي خَالِقٌ بَشَرًا مِّن طِينٍ", summary: "Allah announces He will create a human from clay, breathe His spirit into him, and commands prostration. All bow — except Iblis. 'I am better than him.' Exile, curse, respite granted. His vow: I will mislead them all — except Your sincere servants." },
    { ayahs: "86–88", label: "After a Time", arabic: "وَلَتَعْلَمُنَّ نَبَأَهُ بَعْدَ حِينٍ", summary: "I ask no payment. I am not of the pretenders. It is nothing but a dhikr to the worlds. And you will surely know its truth — after a time." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Theatre of Thrones",
      subtitle: "Four movements: confrontation → tested kings → cosmic courtroom → the Word",
      sections: [
        { ayahs: "1–16", title: "The Diagnosis", color: "#4ecdc4", desc: "An oath by the Quran of dhikr. The Quraysh's disease named in two words: 'izzah (pride hardened to fracture) and shiqaq (splitting from truth). A rapid roll-call of destroyed nations — Nuh, Ad, Fir'awn of the stakes, Thamud, Lut — each in a single breath. A wall of precedent. They mock the idea of judgment while the single blast approaches." },
        { ayahs: "17–48", title: "The Tested Kings", color: "#9b7fd4", desc: "Three prophets, each introduced as 'abd — servant. Dawud: given strength and kingdom, tested by litigants who mirror his own story, falls in sajdah mid-sentence. Sulayman: given beauty, chooses dhikr over horses, receives a kingdom without account. Ayyub: tested by suffering, healed by a spring, an oath resolved with soft grass. Each word 'abd builds the architecture of servanthood the surah will set against Iblis." },
        { ayahs: "49–64", title: "The Two Destinations", color: "#e07a8a", isPivot: true, desc: "Paradise stated briefly. The Fire staged as courtroom drama — leaders and followers cursing each other. The believers they mocked are conspicuously absent from the damned. The word takhasum (quarreling) echoes khasm (litigants) from Dawud's trial — the courtroom imagery binds the prophetic narrative to the afterlife." },
        { ayahs: "65–88", title: "The Origin Story", color: "#C9A84C", desc: "The heavenly assembly before creation. Allah announces Adam. The angels bow. Iblis refuses: 'I am better — fire over clay.' Exile, curse, respite. His vow to mislead all except the sincere (mukhlasin). The surah closes: it is dhikr to the worlds — and you will know its truth after a time." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Courtrooms",
      subtitle: "Every level of the surah stages a trial — and the same root word (kh-s-m) connects them",
      pairs: [
        {
          left: { label: "The Quraysh Mock Judgment", ayahs: "1–16", desc: "Pride and fracture. They say: hasten our share before the Day of Account — as a joke" },
          right: { label: "The Surah's Final Word", ayahs: "86–88", desc: "Dhikr to the worlds. You will know its truth — after a time. The delay has a terminus" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Dawud's Earthly Court", ayahs: "17–26", desc: "Two litigants (khasm) scale the wall. The king judges and is judged — falls in sajdah" },
          right: { label: "The Quarrel in the Fire", ayahs: "49–64", desc: "Leaders and followers in takhasum — the same root. The earthly court and the infernal court mirror each other" },
          color: "#e07a8a",
        },
      ],
      center: {
        label: "The Heavenly Assembly", ayahs: "71–85",
        desc: "The primordial courtroom — Iblis tried, found guilty, sentenced to exile. The origin of every test that came before.",
        note: "This scene does not add another story to the sequence. It reveals the source code of every story that preceded it. The delay Iblis was granted is the space in which every human life unfolds.",
      },
    },
    deductiveFunnel: {
      title: "The Architecture of 'Abd",
      subtitle: "The surah's most important word — servant — traces a deliberate path through every narrative",
      layers: [
        { depth: 1, label: "Dawud", ayah: "17", arabic: "عَبْدَنَا دَاوُودَ", desc: "Our servant Dawud. Introduced by his servanthood before his kingship. Strength and repentance as a single inseparable profile — dha al-ayd, innahu awwab.", color: "#4ecdc4" },
        { depth: 2, label: "Sulayman", ayah: "30", arabic: "نِعْمَ الْعَبْدُ", desc: "What an excellent servant. Given the greatest earthly kingdom — and the title that matters is still 'abd. His excellence is measured not by what he possesses but by how he holds it.", color: "#9b7fd4" },
        { depth: 3, label: "Ayyub", ayah: "44", arabic: "نِعْمَ الْعَبْدُ", desc: "The same words — ni'ma al-'abd. Patience under affliction and gratitude under abundance are the same quality viewed from different angles. The word 'abd unites them.", color: "#e07a8a" },
        { depth: 4, label: "The Sincere", ayah: "83", arabic: "عِبَادَكَ الْمُخْلَصِينَ", desc: "Your sincere servants — the only category beyond Iblis's reach. The word 'abd, built through three case studies, now names the only immunity the surah recognizes.", color: "#C9A84C" },
        { depth: 5, label: "Iblis: The Refusal", ayah: "76", arabic: "أَنَا خَيْرٌ مِّنْهُ", desc: "Against the entire chain stands Iblis, who refused servanthood. His refusal to prostrate is, in structural terms, a refusal to occupy the position of 'abd. Fire that will not bow to clay.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "A surah of thrones and trials — with deliberate silences",
      absences: [
        { item: "No legal commands", note: "For a surah deeply concerned with justice, there is no specific legislation. It teaches justice through parable — watching a king be corrected — rather than through prescription." },
        { item: "No cosmic signs (ayat al-afaq)", note: "Mountains, rain, livestock, night and day — the nature passages that populate Makkan surahs are absent. Sad uses historical and cosmic evidence: the record of tested kings and the primordial scene that explains why tests exist." },
        { item: "No explicit content of Dawud's sin", note: "The Quran deliberately leaves a gap between the parable and Dawud's recognition. The classical tradition fills it variously, but the text's silence is the design — what matters is the speed of his repentance." },
        { item: "No resistance to correction", note: "Dawud does not defend himself. Sulayman does not hesitate. Ayyub does not question. Every servant's first instinct, when tested, is to turn back. No figure in the prophetic sequence argues with God." },
        { item: "No repentance for Iblis", note: "Unlike the prophets, Iblis is offered no path back. His exile is permanent. The only creature in the surah who refuses servanthood is the only one for whom the door does not reopen." },
      ],
    },
  },

  contentNodes: [
    { concept: "Iblis's argument: fire over clay (38:76)", type: "surah-specific", articleSlug: "iblis-fire-clay-38-76" },
    { concept: "Dawud's sajdah and the velocity of repentance", type: "surah-specific", articleSlug: "dawud-sajdah-38-24" },
    { concept: "The handful of grass — Ayyub's oath (38:44)", type: "surah-specific", articleSlug: "ayyub-grass-38-44" },
    { concept: "Khalifah in Al-Baqarah and Sad — the same word, answered", type: "cross-surah", articleSlug: "khalifah-baqarah-sad" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "theatre", label: "Theatre" },
  { id: "ring", label: "Ring" },
  { id: "abd", label: "'Abd" },
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

function SectionMapText({ sections }: { sections: typeof SURAH_DATA.sectionMap }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {sections.map((sec, i) => (
        <button
          key={i}
          onClick={() => setExpanded(expanded === i ? null : i)}
          className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
          style={{ backgroundColor: expanded === i ? "rgba(201,168,76,0.06)" : "transparent" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gold-500 font-sans">{sec.label}</span>
            <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
          </div>
          <p className="text-base text-cream-muted/50 text-right font-amiri leading-relaxed" style={{ direction: "rtl" }}>
            {sec.arabic}
          </p>
          {expanded === i && (
            <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{sec.summary}</p>
          )}
        </button>
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
              <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p>
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>}
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
              marginLeft: `${layer.depth * 6}px`,
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
        Dawud ('abdana) → Sulayman (ni'ma al-'abd) → Ayyub (ni'ma al-'abd) → the sincere → Iblis (the refusal)
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
              <div className="text-2xl font-bold text-gold-500 font-serif">1</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Sajdah</div>
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
          {activeTab === "theatre" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "abd" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
