"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH ABASA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/abasa
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Abasa",
  arabicName: "عَبَسَ",
  meaning: "He Frowned",
  number: 80,
  ayahCount: 42,
  period: "Makki",
  juz: 30,
  movements: 5,
  thesis:
    "A surah that catches the best of human beings in a moment of ordinary social calculation — a single frown — and uses it to dismantle every hierarchy the human heart constructs between those who matter and those who do not.",
  reflectionUrl: "/surahs/abasa",
  readTime: "20 min read",

  sciencesActive: [{"key":"balaghah","english":"Rhetoric"},{"key":"sarf","english":"Morphology"},{"key":"nazm","english":"Structural Coherence"}],
  heartVerse: {
    arabic: "عَبَسَ وَتَوَلَّىٰ ﴿١﴾ أَن جَاءَهُ الْأَعْمَىٰ",
    ayahRef: "80:1–2",
    translation: "He frowned and turned away — because the blind man came to him.",
    why: "The most startling opening in scripture: God rebukes His own Messenger in revelation that will be recited until the end of time. The blind man could not see the frown. Allah saw it anyway. The correction came not in private counsel but in permanent text.",
  },

  audio: { surahNumber: 80, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "عَبَسَ وَتَوَلَّىٰ", translation: "He frowned and turned away —" },
    { ayah: 2, arabic: "أَن جَاءَهُ الْأَعْمَىٰ", translation: "because the blind man came to him." },
    { ayah: 3, arabic: "وَمَا يُدْرِيكَ لَعَلَّهُ يَزَّكَّىٰ", translation: "And what would make you know? Perhaps he would purify himself," },
    { ayah: 4, arabic: "أَوْ يَذَّكَّرُ فَتَنفَعَهُ الذِّكْرَىٰ", translation: "or be reminded, and the reminder would benefit him." },
    { ayah: 5, arabic: "أَمَّا مَنِ اسْتَغْنَىٰ", translation: "As for the one who considers himself self-sufficient —" },
    { ayah: 6, arabic: "فَأَنتَ لَهُ تَصَدَّىٰ", translation: "to him you give your attention." },
    { ayah: 7, arabic: "وَمَا عَلَيْكَ أَلَّا يَزَّكَّىٰ", translation: "Though it is not upon you if he does not purify himself." },
    { ayah: 8, arabic: "وَأَمَّا مَن جَاءَكَ يَسْعَىٰ", translation: "But as for the one who came to you striving —" },
    { ayah: 9, arabic: "وَهُوَ يَخْشَىٰ", translation: "while he fears Allah —" },
    { ayah: 10, arabic: "فَأَنتَ عَنْهُ تَلَهَّىٰ", translation: "from him you are distracted." },
    { ayah: 11, arabic: "كَلَّا إِنَّهَا تَذْكِرَةٌ", translation: "No indeed! This is a reminder —" },
    { ayah: 12, arabic: "فَمَن شَاءَ ذَكَرَهُ", translation: "so whoever wills may take heed." },
    { ayah: 13, arabic: "فِي صُحُفٍ مُّكَرَّمَةٍ", translation: "In honored pages," },
    { ayah: 14, arabic: "مَّرْفُوعَةٍ مُّطَهَّرَةٍ", translation: "exalted and purified," },
    { ayah: 15, arabic: "بِأَيْدِي سَفَرَةٍ", translation: "carried by the hands of scribes —" },
    { ayah: 16, arabic: "كِرَامٍ بَرَرَةٍ", translation: "noble and dutiful." },
    { ayah: 17, arabic: "قُتِلَ الْإِنسَانُ مَا أَكْفَرَهُ", translation: "Destroyed is the human being — how ungrateful he is!" },
    { ayah: 18, arabic: "مِنْ أَيِّ شَيْءٍ خَلَقَهُ", translation: "From what thing did He create him?" },
    { ayah: 19, arabic: "مِن نُّطْفَةٍ خَلَقَهُ فَقَدَّرَهُ", translation: "From a drop of fluid He created him and determined his path," },
    { ayah: 20, arabic: "ثُمَّ السَّبِيلَ يَسَّرَهُ", translation: "then made the way easy for him," },
    { ayah: 21, arabic: "ثُمَّ أَمَاتَهُ فَأَقْبَرَهُ", translation: "then caused him to die and had him buried," },
    { ayah: 22, arabic: "ثُمَّ إِذَا شَاءَ أَنشَرَهُ", translation: "then when He wills, He will raise him." },
    { ayah: 23, arabic: "كَلَّا لَمَّا يَقْضِ مَا أَمَرَهُ", translation: "No — he has not yet accomplished what He commanded him." },
    { ayah: 24, arabic: "فَلْيَنظُرِ الْإِنسَانُ إِلَىٰ طَعَامِهِ", translation: "Let the human being look at his food —" },
    { ayah: 25, arabic: "أَنَّا صَبَبْنَا الْمَاءَ صَبًّا", translation: "how We poured water in abundance," },
    { ayah: 26, arabic: "ثُمَّ شَقَقْنَا الْأَرْضَ شَقًّا", translation: "then split the earth in fragments," },
    { ayah: 27, arabic: "فَأَنبَتْنَا فِيهَا حَبًّا", translation: "and caused grain to grow within it," },
    { ayah: 28, arabic: "وَعِنَبًا وَقَضْبًا", translation: "and grapes and fresh vegetation," },
    { ayah: 29, arabic: "وَزَيْتُونًا وَنَخْلًا", translation: "and olive trees and date palms," },
    { ayah: 30, arabic: "وَحَدَائِقَ غُلْبًا", translation: "and dense gardens," },
    { ayah: 31, arabic: "وَفَاكِهَةً وَأَبًّا", translation: "and fruits and grasses —" },
    { ayah: 32, arabic: "مَّتَاعًا لَّكُمْ وَلِأَنْعَامِكُمْ", translation: "provision for you and your livestock." },
    { ayah: 33, arabic: "فَإِذَا جَاءَتِ الصَّاخَّةُ", translation: "When the Deafening Blast comes —" },
    { ayah: 34, arabic: "يَوْمَ يَفِرُّ الْمَرْءُ مِنْ أَخِيهِ", translation: "the Day a man will flee from his brother," },
    { ayah: 35, arabic: "وَأُمِّهِ وَأَبِيهِ", translation: "and his mother and his father," },
    { ayah: 36, arabic: "وَصَاحِبَتِهِ وَبَنِيهِ", translation: "and his wife and his children —" },
    { ayah: 37, arabic: "لِكُلِّ امْرِئٍ مِّنْهُمْ يَوْمَئِذٍ شَأْنٌ يُغْنِيهِ", translation: "every one of them, that Day, will have enough concern to occupy him." },
    { ayah: 38, arabic: "وُجُوهٌ يَوْمَئِذٍ مُّسْفِرَةٌ", translation: "Faces that Day will be bright," },
    { ayah: 39, arabic: "ضَاحِكَةٌ مُّسْتَبْشِرَةٌ", translation: "laughing, rejoicing." },
    { ayah: 40, arabic: "وَوُجُوهٌ يَوْمَئِذٍ عَلَيْهَا غَبَرَةٌ", translation: "And faces that Day will have dust upon them," },
    { ayah: 41, arabic: "تَرْهَقُهَا قَتَرَةٌ", translation: "covered in darkness —" },
    { ayah: 42, arabic: "أُولَٰئِكَ هُمُ الْكَفَرَةُ الْفَجَرَةُ", translation: "those are the disbelievers, the wicked ones." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Redirect",
      subtitle: "Five movements: correction → revelation → origin → provision → reckoning",
      sections: [
        { ayahs: "1–10", title: "The Frown", color: "#e07a8a", desc: "Allah narrates the Prophet's own action back to him in third person — a grammatical distancing that is the rebuke itself. The blind man who came striving in reverence is contrasted with the self-sufficient leader who felt no need. The ascending list of the blind man's spiritual qualities (purification, remembrance, awe) makes the inversion devastating." },
        { ayahs: "11–16", title: "The Noble Record", color: "#C9A84C", isPivot: true, desc: "Kalla pivots the surah from correction to declaration. The revelation itself is described as inherently noble — on honored pages, carried by purified angelic scribes. A message this dignified should not be withheld from anyone who seeks it. The dignity belongs to the message and to whoever desires it." },
        { ayahs: "17–23", title: "The Ingrate", color: "#9b7fd4", desc: "Without transition, the surah drops to the raw material of human existence. From a drop of fluid to a path to death to a grave to resurrection — the entire arc compressed into seven ayahs. The man who considers himself self-sufficient was a drop of fluid. He has not yet fulfilled his purpose." },
        { ayahs: "24–32", title: "The Provision", color: "#4ecdc4", desc: "Let the human being look at his food. Rain poured, earth split, grain grown, grapes, olives, date palms, dense gardens — a chain of provision the self-sufficient man did not author. Everything that sustains him is authored by the One he ignored." },
        { ayahs: "33–42", title: "The Shattering", color: "#e07a8a", desc: "The Deafening Blast — al-sakhkha, a word found only here in the Quran. A man flees from brother, mother, father, wife, children. Each bond closer than the last. Two kinds of faces: bright and laughing, or dust-covered and dark. The surah that opened with a face ends with faces." },
      ],
    },
    chiasticRing: {
      title: "The Mirror",
      subtitle: "The surah's opening and closing form a precise inversion — faces bookend the entire structure",
      pairs: [
        {
          left: { label: "The Frown", ayahs: "1–2", desc: "A face contracts — abasa — expressing a judgment about who is worth the Prophet's time" },
          right: { label: "The Faces", ayahs: "38–42", desc: "Faces bright with laughter or covered in dust — the eternal version of the momentary frown" },
          color: "#e07a8a",
        },
        {
          left: { label: "The Seeker Ignored", ayahs: "3–10", desc: "The blind man who came striving and fearing is turned away in favor of the self-sufficient" },
          right: { label: "The Flight", ayahs: "33–37", desc: "Each person so consumed by their own reckoning that no one has capacity for anyone else — yughnihi echoes istaghna" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Revelation's Nobility", ayahs: "11–16", desc: "Honored pages, purified scribes — what God has given spiritually" },
          right: { label: "Creation's Provision", ayahs: "24–32", desc: "Rain, grain, gardens, fruit — what God has given materially" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Drop", ayahs: "17–23",
        desc: "Destroyed is the human being — how ungrateful he is! From a drop of fluid to a grave to resurrection, and he has still not fulfilled his purpose.",
        note: "The gravitational core: the raw fact of human dependency that makes both social arrogance and spiritual indifference incoherent.",
      },
    },
    deductiveFunnel: {
      title: "The Thread",
      subtitle: "The root gh-n-y (self-sufficiency) connects the opening rebuke to the final reckoning",
      layers: [
        { depth: 1, label: "Social Arrogance", ayah: "5", arabic: "أَمَّا مَنِ اسْتَغْنَىٰ", desc: "Istaghna — the Qurayshi elite considers himself self-sufficient, above needing guidance. This is the disease named in the abstract in Al-Alaq (96:7) and shown in real time here.", color: "#e07a8a" },
        { depth: 2, label: "Illusory Independence", ayah: "17–19", arabic: "قُتِلَ الْإِنسَانُ مَا أَكْفَرَهُ", desc: "The self-sufficient man was a drop of fluid. Every stage of his journey — creation, path, death, burial, resurrection — is measured and decided by another.", color: "#9b7fd4" },
        { depth: 3, label: "Unearned Provision", ayah: "24–25", arabic: "فَلْيَنظُرِ الْإِنسَانُ إِلَىٰ طَعَامِهِ", desc: "Look at your food. You did not send the rain. You did not split the earth. Your self-sufficiency is an illusion sustained by provision you did not author.", color: "#4ecdc4" },
        { depth: 4, label: "Terrible Self-Sufficiency", ayah: "37", arabic: "شَأْنٌ يُغْنِيهِ", desc: "Yughnihi — same root as istaghna. On that Day, each person is self-sufficient in the worst sense: so consumed by their own reckoning that they flee from everyone they love. The word that described worldly arrogance now describes eschatological isolation.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah's silences are as precise as its words — every absence is a theological statement",
      absences: [
        { item: "No engagement with Quraysh theology", note: "Most Makkan surahs argue against idolatry. Abasa spends no time on the disbelievers' worldview. The elite are mentioned only to be set aside — the surah is more interested in the blind man they would have ignored." },
        { item: "No direct address to the mushrikun", note: "The real audience is the Prophet and, through him, every person who will carry the message. The correction is internal. It is about the hearts of the believers, not the arguments of the deniers." },
        { item: "No condemnation of the Prophet", note: "The rebuke is real but exists within a relationship intimate enough to bear it. A stranger does not correct you this way. A parent does. The feeling is being lovingly but firmly redirected." },
        { item: "No path to repentance for the elite", note: "The self-sufficient man is not offered guidance within the surah's frame. The surah is not interested in converting him — it is interested in redirecting the Prophet's attention away from him." },
        { item: "No named characters", note: "Neither the Prophet nor Abdullah ibn Umm Maktum nor the Qurayshi leader is named. The anonymity makes the pattern universal — a verdict on a tendency, not a person." },
      ],
    },
  },

  contentNodes: [
    { concept: "The gh-n-y thread — istaghna to yughnihi", type: "surah-specific", articleSlug: "ghany-thread-abasa-80" },
    { concept: "The two kalla pivots (ayahs 11 and 23)", type: "surah-specific", articleSlug: "kalla-pivots-abasa-80" },
    { concept: "Abasa–Takwir diptych — moral blindness and cosmic unraveling", type: "cross-surah", articleSlug: "abasa-takwir-diptych" },
    { concept: "Istaghna in Al-Alaq and Abasa — the same diagnosis", type: "cross-surah", articleSlug: "istaghna-alaq-abasa" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "mirror", label: "Mirror" },
  { id: "thread", label: "Thread" },
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
        Social arrogance → illusory independence → unearned provision → eschatological isolation
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
              <div className="text-2xl font-bold text-gold-500 font-serif">2</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Kalla Pivots</div>
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
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "mirror" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "thread" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
