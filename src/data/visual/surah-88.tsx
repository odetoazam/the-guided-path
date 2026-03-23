"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-GHASHIYA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-ghashiya
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Ghashiya",
  arabicName: "الغاشية",
  meaning: "The Overwhelming Event",
  number: 88,
  ayahCount: 26,
  period: "Makki",
  juz: 30,
  movements: 3,
  thesis:
    "A twenty-six-ayah surah that argues the evidence for everything unseen is already kneeling at your feet — and your only task is to look.",
  reflectionUrl: "/surahs/al-ghashiya",
  readTime: "18 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"nazm","english":"Structural Coherence"},{"key":"amthal","english":"Parables"}],
  heartVerse: {
    arabic: "فَذَكِّرْ إِنَّمَا أَنتَ مُذَكِّرٌ",
    ayahRef: "88:21",
    translation: "So remind — you are only a reminder.",
    why: "The surah circumscribes the entire prophetic mission in six words. The word mudhakkir defines the function: to cause others to remember what they already know. Paired with musaytir in the next ayah — the one word in the entire Quran that names the specific temptation the Prophet must refuse — this is where the boundary of reminding is drawn most clearly.",
  },

  audio: { surahNumber: 88, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ", translation: "Has the news of the Overwhelming Event reached you?" },
    { ayah: 2, arabic: "وُجُوهٌ يَوْمَئِذٍ خَاشِعَةٌ", translation: "Faces on that Day will be humbled," },
    { ayah: 3, arabic: "عَامِلَةٌ نَّاصِبَةٌ", translation: "laboring, exhausted —" },
    { ayah: 4, arabic: "تَصْلَىٰ نَارًا حَامِيَةً", translation: "entering a scorching fire," },
    { ayah: 5, arabic: "تُسْقَىٰ مِنْ عَيْنٍ آنِيَةٍ", translation: "drinking from a boiling spring." },
    { ayah: 6, arabic: "لَّيْسَ لَهُمْ طَعَامٌ إِلَّا مِن ضَرِيعٍ", translation: "They will have no food except bitter thorns —" },
    { ayah: 7, arabic: "لَّا يُسْمِنُ وَلَا يُغْنِي مِن جُوعٍ", translation: "which neither nourishes nor satisfies hunger." },
    { ayah: 8, arabic: "وُجُوهٌ يَوْمَئِذٍ نَّاعِمَةٌ", translation: "Faces on that Day will be radiant," },
    { ayah: 9, arabic: "لِّسَعْيِهَا رَاضِيَةٌ", translation: "satisfied with their effort," },
    { ayah: 10, arabic: "فِي جَنَّةٍ عَالِيَةٍ", translation: "in an elevated garden," },
    { ayah: 11, arabic: "لَّا تَسْمَعُ فِيهَا لَاغِيَةً", translation: "hearing no idle talk in it." },
    { ayah: 12, arabic: "فِيهَا عَيْنٌ جَارِيَةٌ", translation: "In it is a flowing spring," },
    { ayah: 13, arabic: "فِيهَا سُرُرٌ مَّرْفُوعَةٌ", translation: "raised couches," },
    { ayah: 14, arabic: "وَأَكْوَابٌ مَّوْضُوعَةٌ", translation: "placed cups," },
    { ayah: 15, arabic: "وَنَمَارِقُ مَصْفُوفَةٌ", translation: "lined cushions," },
    { ayah: 16, arabic: "وَزَرَابِيُّ مَبْثُوثَةٌ", translation: "and spread carpets." },
    { ayah: 17, arabic: "أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ", translation: "Do they not look at the camels — how they were created?" },
    { ayah: 18, arabic: "وَإِلَى السَّمَاءِ كَيْفَ رُفِعَتْ", translation: "And at the sky — how it was raised?" },
    { ayah: 19, arabic: "وَإِلَى الْجِبَالِ كَيْفَ نُصِبَتْ", translation: "And at the mountains — how they were set firm?" },
    { ayah: 20, arabic: "وَإِلَى الْأَرْضِ كَيْفَ سُطِحَتْ", translation: "And at the earth — how it was spread out?" },
    { ayah: 21, arabic: "فَذَكِّرْ إِنَّمَا أَنتَ مُذَكِّرٌ", translation: "So remind — you are only a reminder." },
    { ayah: 22, arabic: "لَّسْتَ عَلَيْهِم بِمُصَيْطِرٍ", translation: "You are not over them a controller." },
    { ayah: 23, arabic: "إِلَّا مَن تَوَلَّىٰ وَكَفَرَ", translation: "But the one who turns away and disbelieves —" },
    { ayah: 24, arabic: "فَيُعَذِّبُهُ اللَّهُ الْعَذَابَ الْأَكْبَرَ", translation: "Allah will punish him with the greatest punishment." },
    { ayah: 25, arabic: "إِنَّ إِلَيْنَا إِيَابَهُمْ", translation: "Indeed, to Us is their return," },
    { ayah: 26, arabic: "ثُمَّ إِنَّ عَلَيْنَا حِسَابَهُمْ", translation: "then indeed, upon Us is their account." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Three Registers",
      subtitle: "The unseen \u2192 the seen \u2192 the address",
      sections: [
        { ayahs: "1\u201316", title: "The Unseen: Two Faces", color: "#e07a8a", desc: "The surah opens by announcing the Overwhelming Event and immediately splits into two scenes. Faces humbled \u2014 laboring, scorched, drinking from boiling springs, eating thorns that neither nourish nor satisfy. Then faces radiant \u2014 satisfied with their effort, in an elevated garden, hearing no idle talk, surrounded by furnishings placed and waiting. Paradise as a room prepared for someone expected." },
        { ayahs: "17\u201320", title: "The Seen: Four Signs", color: "#C9A84C", isPivot: true, desc: "The surah\u2019s most striking structural move. After painting two afterlife scenes, it turns away from the unseen entirely and plants itself in the visible world. Four questions, four objects, four passive verbs \u2014 camels, sky, mountains, earth. The evidence is already in front of you. The surah is asking why you haven\u2019t looked." },
        { ayahs: "21\u201326", title: "The Address: Remind and Return", color: "#9b7fd4", desc: "Direct address to the Prophet: you are only a reminder, not a controller. The word musaytir \u2014 used only here in the entire Quran \u2014 names the exact temptation to refuse. The closing gathers everything: to Us is their return, upon Us is their account. The question of ayah 1 meets its answer in ayah 26." },
      ],
    },
    contrastPairs: {
      title: "The Two Faces",
      subtitle: "The surah\u2019s argument is built on juxtaposition \u2014 two realities placed side by side",
      pairs: [
        {
          left: { label: "Humbled Faces", ayahs: "2\u20137", items: [
            { arabic: "\u062E\u0627\u0634\u0650\u0639\u0629", term: "kh\u0101shi\u02BFa", meaning: "Humbled, subdued \u2014 resistance has collapsed" },
            { arabic: "\u0639\u0627\u0645\u0650\u0644\u0629 \u0646\u0627\u0635\u0650\u0628\u0629", term: "\u02BF\u0101mila n\u0101\u1E63iba", meaning: "Laboring, exhausted \u2014 effort without end" },
            { arabic: "\u0636\u064E\u0631\u0650\u064A\u0639", term: "\u1E0Dar\u012B\u02BF", meaning: "Bitter thorns \u2014 food that fills without nourishing" },
          ]},
          right: { label: "Radiant Faces", ayahs: "8\u201316", items: [
            { arabic: "\u0646\u0627\u0639\u0650\u0645\u0629", term: "n\u0101\u02BFima", meaning: "Soft, radiant, at ease" },
            { arabic: "\u0644\u0650\u0633\u064E\u0639\u0652\u064A\u0647\u0627 \u0631\u0627\u0636\u0650\u064A\u0629", term: "li-sa\u02BFyih\u0101 r\u0101\u1E0Diya", meaning: "Satisfied with their effort \u2014 labor validated" },
            { arabic: "\u0644\u0627 \u062A\u064E\u0633\u0652\u0645\u064E\u0639 \u0641\u064A\u0647\u0627 \u0644\u0627\u063A\u064A\u0629", term: "l\u0101ghiya", meaning: "No idle talk \u2014 the first luxury is silence" },
          ]},
          color: "#e07a8a",
        },
      ],
    },
    fourSigns: {
      title: "The Four Signs",
      subtitle: "From what kneels beside you to what stretches beyond sight",
      signs: [
        { ayah: "17", arabic: "\u0627\u0644\u0625\u0650\u0628\u0650\u0644", label: "The Camel", verb: "khuliqat \u2014 created", desc: "The most intimate encounter with divine engineering in daily life. An animal that carries impossible loads, survives without water, kneels to be loaded. The surah begins with what is closest and most familiar.", color: "#C9A84C" },
        { ayah: "18", arabic: "\u0627\u0644\u0633\u0651\u064E\u0645\u0627\u0621", label: "The Sky", verb: "rufi\u02BFat \u2014 raised", desc: "Lifted, elevated. The verb is specific to its object. The sky as raised ceiling \u2014 creation read as architecture.", color: "#4ecdc4" },
        { ayah: "19", arabic: "\u0627\u0644\u0652\u062C\u0650\u0628\u0627\u0644", label: "The Mountains", verb: "nu\u1E63ibat \u2014 set firm", desc: "Erected like tent poles. Load-bearing pillars of the earth. The same God who raised couches in paradise set these in place.", color: "#9b7fd4" },
        { ayah: "20", arabic: "\u0627\u0644\u0623\u064E\u0631\u0652\u0636", label: "The Earth", verb: "su\u1E6Di\u1E25at \u2014 spread out", desc: "Flattened for habitation. A prepared floor. The domestic imagery of paradise echoes in the architecture of the world.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What\u2019s Missing",
      subtitle: "The surah strips the eschatological scene to human scale",
      absences: [
        { item: "No prophetic stories", note: "No M\u016Bs\u0101, no Ibr\u0101h\u012Bm, no destroyed nations. The argument is built entirely on contrast, creation-signs, and direct address." },
        { item: "No named antagonists", note: "The word k\u0101fir\u016Bn does not appear. The one who turns away is described by action, not label." },
        { item: "No cosmic phenomena", note: "Despite announcing the Day of Judgment, the surah skips earthquakes, trumpet blasts, and darkened stars. The judgment is read on faces, not in the sky." },
        { item: "No moral commands", note: "No \u2018feed the orphan,\u2019 no behavioral instructions. The surah shows, juxtaposes, and asks you to look \u2014 it never tells you what to do beyond reminding." },
        { item: "No description beyond faces", note: "The Day of Judgment itself is described only through its effects on faces. Al-Gh\u0101shiya reads the reckoning on the skin, not in the cosmos." },
      ],
    },
  },

  contentNodes: [
    { concept: "Musaytir \u2014 the word used only once in the Quran", type: "surah-specific", articleSlug: "musaytir-controller-88" },
    { concept: "Paradise as domestic space: cups, cushions, carpets", type: "surah-specific", articleSlug: "paradise-domestic-88" },
    { concept: "Al-A\u2019la and Al-Ghashiya as liturgical pair", type: "cross-surah", articleSlug: "ala-ghashiya-pair" },
    { concept: "The four creation-signs and Surah Qaf parallel", type: "cross-surah", articleSlug: "four-signs-qaf-parallel" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "registers", label: "Registers" },
  { id: "faces", label: "Faces" },
  { id: "signs", label: "Signs" },
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
          {playing ? "\u23F8" : "\u25B6"}
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

function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) {
  return (
    <div className="space-y-5">
      {verses.map((v) => (
        <div key={v.ayah} className="space-y-1">
          <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>
            {v.arabic}{" "}
            <span className="text-sm text-cream-muted/50">{"\uFD3E"}{v.ayah}{"\uFD3F"}</span>
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
            {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">{"\u2726"} Structural pivot</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContrastPairs({ data }: { data: typeof SURAH_DATA.diagrams.contrastPairs }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      {data.pairs.map((pair, i) => (
        <div key={i} className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="text-xs font-semibold font-sans text-[#e07a8a] mb-2">
                {pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span>
              </div>
              {pair.left.items.map((item, j) => (
                <div key={j} className="rounded-xl p-3 border border-white/[0.06] mb-2" style={{ borderLeftWidth: "3px", borderLeftColor: "#e07a8a" }}>
                  <p className="text-base text-cream-muted/50 text-right font-amiri" style={{ direction: "rtl" }}>{item.arabic}</p>
                  <p className="text-xs font-semibold text-[#e07a8a] mt-1 font-sans">{item.term}</p>
                  <p className="text-xs text-cream/60 mt-0.5 font-body">{item.meaning}</p>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold font-sans text-[#4ecdc4] mb-2 text-right">
                <span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}
              </div>
              {pair.right.items.map((item, j) => (
                <div key={j} className="rounded-xl p-3 border border-white/[0.06] mb-2" style={{ borderRightWidth: "3px", borderRightColor: "#4ecdc4" }}>
                  <p className="text-base text-cream-muted/50 text-right font-amiri" style={{ direction: "rtl" }}>{item.arabic}</p>
                  <p className="text-xs font-semibold text-[#4ecdc4] mt-1 font-sans text-right">{item.term}</p>
                  <p className="text-xs text-cream/60 mt-0.5 text-right font-body">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FourSigns({ data }: { data: typeof SURAH_DATA.diagrams.fourSigns }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-serif text-cream">{data.title}</h3>
        <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.signs.map((sign, i) => (
          <button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]"
            style={{
              backgroundColor: expanded === i ? sign.color + "12" : "transparent",
              borderLeftWidth: "3px",
              borderLeftColor: sign.color,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans" style={{ color: sign.color }}>{sign.label}</span>
              <span className="text-xs text-cream-muted/50 font-sans">v.{sign.ayah}</span>
            </div>
            <p className="text-2xl text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>
              {sign.arabic}
            </p>
            <p className="text-xs text-cream-muted/40 mt-1 italic font-body">{sign.verb}</p>
            {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{sign.desc}</p>}
          </button>
        ))}
      </div>
      <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">
        Touchable {"\u2192"} vast {"\u2192"} anchored {"\u2192"} spread
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

        {/* -- Hero --------------------------------------------------------- */}
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">
            Surah {d.number} {"\u00B7"} {d.period}
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

        {/* -- Tab bar ------------------------------------------------------ */}
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

        {/* -- Tab content -------------------------------------------------- */}
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "registers" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "faces" && <ContrastPairs data={d.diagrams.contrastPairs} />}
          {activeTab === "signs" && <FourSigns data={d.diagrams.fourSigns} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
              <OrnamentDivider />
              <HeartVerse verse={d.heartVerse} />
            </div>
          )}
        </div>

        {/* -- Go Deeper --------------------------------------------------- */}
        <OrnamentDivider />
        <a
          href={d.reflectionUrl}
          className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all"
        >
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} {"\u00B7"} The complete written exploration</div>
        </a>

      </div>
    </div>
  );
}
