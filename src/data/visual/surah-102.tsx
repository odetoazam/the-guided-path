"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AT-TAKATHUR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/at-takathur
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "At-Takathur",
  arabicName: "التَّكاثُر",
  meaning: "The Competition for More",
  number: 102,
  ayahCount: 8,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "An eight-ayah intervention that grabs you by the collar — diagnosing the competition for more as the fundamental human distraction, driving you through three escalating degrees of certainty, and closing with a question that reframes the entire surah: not what you hoarded, but what you enjoyed.",
  reflectionUrl: "/surahs/at-takathur",
  readTime: "15 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"nahw","english":"Grammar"},{"key":"ijaz","english":"Inimitability"}],
  heartVerse: {
    arabic: "ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ",
    ayahRef: "102:8",
    translation: "Then, on that Day, you will surely be asked about the blessings.",
    why: "The surah that began with excess ends with the ordinary. The interrogation is not only about what you hoarded — it is about what you enjoyed. Every pleasure, not just the ones you competed for, becomes the subject of divine inquiry. The final word — al-na'im — transforms the entire surah retroactively. You started thinking the problem was greed. You end realizing the problem is the failure to recognize that every good thing was a trust, not a possession.",
  },

  audio: { surahNumber: 102, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "أَلْهَاكُمُ التَّكَاثُرُ", translation: "The competition for more distracted you —" },
    { ayah: 2, arabic: "حَتَّىٰ زُرْتُمُ الْمَقَابِرَ", translation: "until you visited the graves." },
    { ayah: 3, arabic: "كَلَّا سَوْفَ تَعْلَمُونَ", translation: "No indeed! You will come to know." },
    { ayah: 4, arabic: "ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ", translation: "Then again — no indeed! You will come to know." },
    { ayah: 5, arabic: "كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ", translation: "No indeed! If only you knew with the knowledge of certainty —" },
    { ayah: 6, arabic: "لَتَرَوُنَّ الْجَحِيمَ", translation: "you would surely see the Blaze." },
    { ayah: 7, arabic: "ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ", translation: "Then you would see it with the eye of certainty." },
    { ayah: 8, arabic: "ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ", translation: "Then, on that Day, you will surely be asked about the blessings." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Intervention",
      subtitle: "Three movements: diagnosis → alarm → reckoning",
      sections: [
        { ayahs: "1–2", title: "The Diagnosis", color: "#e07a8a", desc: "The surah begins mid-accusation. No preamble, no oath. The first word is the verdict: alhakum — it distracted you. The root l-h-w carries the image of a child absorbed in play, unaware that something serious is happening. Takathur is not about having wealth; it is about the competition to have more than the next person. The disease is comparative. And the distraction continued until you visited the graves — the word zurtum is the language of a social call. You visited death the way you might visit a neighbor." },
        { ayahs: "3–5", title: "The Alarm", color: "#C9A84C", isPivot: true, desc: "Three repetitions of kalla — the Quran's most forceful negation. The first: sawfa ta'lamun — you will know. The second adds thumma, marking temporal sequence: then you will know again. The third breaks the pattern entirely — shifting from threat to lament: law ta'lamuna 'ilm al-yaqin — if only you knew with the knowledge of certainty. The anger has turned to sorrow. The particle law introduces a condition that is contrary to fact: you do not know." },
        { ayahs: "6–8", title: "The Reckoning", color: "#9b7fd4", desc: "Three hammer-blows sharing identical grammar: each begins with la- (the emphatic lam of oath) and ends with the heavy nun of emphasis. You will see the Blaze. You will see it with 'ayn al-yaqin — the certainty of your own eyes. And then the blow that reframes everything: you will be asked about al-na'im — the blessings. Not punishment for sins, but an accounting of gifts. Cool water, the shade of a tree, the love of a child. The surah that began with greed ends with gratitude's absence." },
      ],
    },
    chiasticRing: {
      title: "The Inversion",
      subtitle: "The opening and closing form one of the most precise pairings in the Quran",
      pairs: [
        {
          left: { label: "Takathur", ayahs: "1–2", desc: "The competition to accumulate — the feverish pursuit of more that consumed you until the grave" },
          right: { label: "Na'im", ayahs: "8", desc: "The blessings — what you competed to accumulate becomes the subject of your interrogation" },
          color: "#e07a8a",
        },
        {
          left: { label: "You Will Know", ayahs: "3–4", desc: "Doubled warning: sawfa ta'lamun — future knowledge, still abstract, still distant" },
          right: { label: "You Will See", ayahs: "6–7", desc: "Doubled vision: la-tarawunna — you will see the Blaze, then see it with the eye of certainty" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Knowledge of Certainty", ayahs: "5",
        desc: "If only you knew with 'ilm al-yaqin — the knowledge of certainty.",
        note: "The structural center names what the surah is building toward: yaqin. The three degrees — 'ilm al-yaqin (knowledge), 'ayn al-yaqin (sight), haqq al-yaqin (implied, withheld) — form the surah's invisible ladder. The third degree belongs to the moment of death itself, which the surah refuses to narrate.",
      },
    },
    deductiveFunnel: {
      title: "The Ladder of Certainty",
      subtitle: "Each stage strips away one more layer of distance between you and the Real",
      layers: [
        { depth: 1, label: "Heedlessness", ayah: "1–2", arabic: "أَلْهَاكُمُ التَّكَاثُرُ", desc: "The starting condition: total distraction. The root l-h-w implies the distraction was already in motion before you noticed it. You did not choose to be distracted. The competition for more crept in and colonized your attention. The entire surah is addressed to people who do not yet know they are asleep.", color: "#e07a8a" },
        { depth: 2, label: "Warning", ayah: "3–4", arabic: "كَلَّا سَوْفَ تَعْلَمُونَ", desc: "The first rupture. Kalla — stop. The doubled sawfa ta'lamun is not repetition for emphasis alone; thumma marks temporal sequence. First you will know at death, then — after another stage — you will know at resurrection. Knowledge arrives in waves.", color: "#C9A84C" },
        { depth: 3, label: "Knowledge of Certainty", ayah: "5", arabic: "عِلْمَ الْيَقِينِ", desc: "The conditional pivot: if only you possessed 'ilm al-yaqin — certainty through transmitted knowledge, what the prophets brought, what revelation teaches. This is the first degree. The contrary-to-fact conditional (law) confirms: you do not possess it.", color: "#4ecdc4" },
        { depth: 4, label: "Eye of Certainty", ayah: "6–7", arabic: "عَيْنَ الْيَقِينِ", desc: "Sight replaces hearing. You will see the Blaze — not hear about it, not believe in it abstractly — see it. The first seeing might be distant, the way you see a fire on the horizon. The second is the seeing that removes all doubt. 'Ayn al-yaqin is the second degree: direct witnessing.", color: "#9b7fd4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every silence in this surah is a mirror held up to the listener",
      absences: [
        { item: "No mention of Allah by name", note: "God is not named, not addressed, not praised anywhere in eight ayahs of warning about the afterlife and the Blazing Fire. The surah does not frame the warning as coming from a divine authority. It frames it as reality itself confronting you — as if the structure of existence is enough to convict you." },
        { item: "No mention of what was accumulated", note: "The surah never names what you were competing for — wealth, children, status, land. The content of takathur is irrelevant. The disease is the competition itself, not its object. The mechanism is universal." },
        { item: "No moral commands", note: "No 'pray' or 'give charity' or 'be patient.' No prophets mentioned, no destroyed nations, no believers held up as models. The surah strips away every element of religious instruction except the bare diagnosis. The austerity is itself the argument." },
        { item: "No haqq al-yaqin", note: "The surah names two of the three degrees of certainty — 'ilm and 'ayn — but withholds the third: haqq al-yaqin, the certainty of experience. That space where it would go is filled instead by the question about na'im. The structural substitution suggests the real reckoning is not the Fire but the conversation about what you did with every good thing." },
        { item: "No escape clause", note: "No tawba offered, no 'except those who believe.' The surah closes the file. The question about blessings in ayah 8 is not an invitation — it is a subpoena." },
      ],
    },
  },

  contentNodes: [
    { concept: "The three degrees of yaqin — 'ilm, 'ayn, haqq", type: "surah-specific", articleSlug: "three-degrees-yaqin-102" },
    { concept: "Takathur — competition as the default setting of the heart", type: "surah-specific", articleSlug: "takathur-competition-disease-102" },
    { concept: "Humaza-Takathur diptych", type: "cross-surah", articleSlug: "takathur-humaza-diptych" },
    { concept: "Al-na'im — the question that reframes everything", type: "surah-specific", articleSlug: "naim-blessings-question-102-8" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "intervention", label: "Intervention" },
  { id: "inversion", label: "Inversion" },
  { id: "certainty", label: "Certainty" },
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
        Heedlessness → warning → knowledge → sight
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
              <div className="text-2xl font-bold text-gold-500 font-serif">3</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Degrees</div>
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
          {activeTab === "intervention" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "inversion" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "certainty" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
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
