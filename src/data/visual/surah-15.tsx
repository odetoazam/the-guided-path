"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-HIJR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-hijr
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Hijr",
  arabicName: "الحِجر",
  meaning: "The Stone Tract",
  number: 15,
  ayahCount: 99,
  period: "Makki",
  juz: 14,
  movements: 5,
  thesis:
    "A surah of guarded things — the Quran preserved, the heavens sealed, the sincere protected — that closes with the most intimate consolation the Quran ever speaks to the Prophet: you have been given enough. Worship until the certainty comes.",
  reflectionUrl: "/surahs/al-hijr",
  readTime: "24 min read",

  sciencesActive: [{"key":"qasas","english":"Quranic Narratives"},{"key":"nazm","english":"Structural Coherence"},{"key":"balaghah","english":"Rhetoric"}],
  heartVerse: {
    arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
    ayahRef: "15:9",
    translation: "Indeed, it is We who sent down the Reminder, and indeed, We will be its Guardian.",
    why: "The most concise statement of Quranic preservation in all of scripture. The pronoun 'We' appears twice in emphatic position. Everything else in the surah radiates from this promise — the heavens are guarded, the sincere are guarded, and the Book itself is under divine custody. The ruins of Thamud still stand; the Quran that described their destruction remains exactly as revealed.",
  },

  audio: { surahNumber: 15, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "الر ۚ تِلْكَ آيَاتُ الْكِتَابِ وَقُرْآنٍ مُّبِينٍ", translation: "Alif Lam Ra. These are the verses of the Book and a clear Quran." },
    { ayah: 2, arabic: "رُّبَمَا يَوَدُّ الَّذِينَ كَفَرُوا لَوْ كَانُوا مُسْلِمِينَ", translation: "Perhaps those who disbelieve will wish they had been Muslims." },
    { ayah: 3, arabic: "ذَرْهُمْ يَأْكُلُوا وَيَتَمَتَّعُوا وَيُلْهِهِمُ الْأَمَلُ ۖ فَسَوْفَ يَعْلَمُونَ", translation: "Let them eat and enjoy themselves and be diverted by false hope, for they will come to know." },
    { ayah: 9, arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ", translation: "Indeed, it is We who sent down the Reminder, and indeed, We will be its Guardian." },
    { ayah: 14, arabic: "وَلَوْ فَتَحْنَا عَلَيْهِم بَابًا مِّنَ السَّمَاءِ فَظَلُّوا فِيهِ يَعْرُجُونَ", translation: "And even if We opened for them a gate from the sky and they continued to ascend through it —" },
    { ayah: 15, arabic: "لَقَالُوا إِنَّمَا سُكِّرَتْ أَبْصَارُنَا بَلْ نَحْنُ قَوْمٌ مَّسْحُورُونَ", translation: "they would say: 'Our eyes have been dazzled. Rather, we are a people bewitched.'" },
    { ayah: 17, arabic: "وَحَفِظْنَاهَا مِن كُلِّ شَيْطَانٍ رَّجِيمٍ", translation: "And We have protected it from every expelled devil." },
    { ayah: 21, arabic: "وَإِن مِّن شَيْءٍ إِلَّا عِندَنَا خَزَائِنُهُ وَمَا نُنَزِّلُهُ إِلَّا بِقَدَرٍ مَّعْلُومٍ", translation: "And there is not a thing but that with Us are its treasuries, and We do not send it down except in a known measure." },
    { ayah: 23, arabic: "وَإِنَّا لَنَحْنُ نُحْيِي وَنُمِيتُ وَنَحْنُ الْوَارِثُونَ", translation: "And indeed, it is We who give life and cause death, and We are the Inheritor." },
    { ayah: 26, arabic: "وَلَقَدْ خَلَقْنَا الْإِنسَانَ مِن صَلْصَالٍ مِّنْ حَمَإٍ مَّسْنُونٍ", translation: "And We did certainly create man from dried clay, from dark mud molded into shape." },
    { ayah: 28, arabic: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي خَالِقٌ بَشَرًا مِّن صَلْصَالٍ مِّنْ حَمَإٍ مَّسْنُونٍ", translation: "And when your Lord said to the angels: 'I will create a human being from dried clay, from dark mud molded into shape.'" },
    { ayah: 29, arabic: "فَإِذَا سَوَّيْتُهُ وَنَفَخْتُ فِيهِ مِن رُّوحِي فَقَعُوا لَهُ سَاجِدِينَ", translation: "So when I have proportioned him and breathed into him of My spirit, fall down to him in prostration." },
    { ayah: 33, arabic: "قَالَ لَمْ أَكُن لِّأَسْجُدَ لِبَشَرٍ خَلَقْتَهُ مِن صَلْصَالٍ مِّنْ حَمَإٍ مَّسْنُونٍ", translation: "He said: 'I am not one to prostrate to a human whom You created from dried clay, from dark mud molded into shape.'" },
    { ayah: 39, arabic: "قَالَ رَبِّ بِمَا أَغْوَيْتَنِي لَأُزَيِّنَنَّ لَهُمْ فِي الْأَرْضِ وَلَأُغْوِيَنَّهُمْ أَجْمَعِينَ", translation: "He said: 'My Lord, because You have put me in error, I will surely make disobedience attractive to them on earth, and I will mislead them all —'" },
    { ayah: 40, arabic: "إِلَّا عِبَادَكَ مِنْهُمُ الْمُخْلَصِينَ", translation: "'except, among them, Your sincere servants.'" },
    { ayah: 42, arabic: "إِنَّ عِبَادِي لَيْسَ لَكَ عَلَيْهِمْ سُلْطَانٌ إِلَّا مَنِ اتَّبَعَكَ مِنَ الْغَاوِينَ", translation: "'Indeed, My servants — no authority will you have over them, except those who follow you of the deviators.'" },
    { ayah: 44, arabic: "لَهَا سَبْعَةُ أَبْوَابٍ لِّكُلِّ بَابٍ مِّنْهُمْ جُزْءٌ مَّقْسُومٌ", translation: "It has seven gates; for every gate is a portion assigned." },
    { ayah: 49, arabic: "نَبِّئْ عِبَادِي أَنِّي أَنَا الْغَفُورُ الرَّحِيمُ", translation: "Inform My servants that I am the Forgiving, the Merciful." },
    { ayah: 56, arabic: "قَالَ وَمَن يَقْنَطُ مِن رَّحْمَةِ رَبِّهِ إِلَّا الضَّالُّونَ", translation: "He said: 'And who despairs of the mercy of his Lord except the lost?'" },
    { ayah: 75, arabic: "إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّلْمُتَوَسِّمِينَ", translation: "Indeed, in that are signs for those who discern." },
    { ayah: 82, arabic: "وَكَانُوا يَنْحِتُونَ مِنَ الْجِبَالِ بُيُوتًا آمِنِينَ", translation: "And they used to carve from the mountains, homes, feeling secure." },
    { ayah: 85, arabic: "وَمَا خَلَقْنَا السَّمَاوَاتِ وَالْأَرْضَ وَمَا بَيْنَهُمَا إِلَّا بِالْحَقِّ ۗ وَإِنَّ السَّاعَةَ لَآتِيَةٌ ۖ فَاصْفَحِ الصَّفْحَ الْجَمِيلَ", translation: "And We did not create the heavens and the earth and what is between them except in truth. And indeed, the Hour is coming; so forgive with gracious forgiveness." },
    { ayah: 87, arabic: "وَلَقَدْ آتَيْنَاكَ سَبْعًا مِّنَ الْمَثَانِي وَالْقُرْآنَ الْعَظِيمَ", translation: "And We have certainly given you the seven oft-repeated verses and the great Quran." },
    { ayah: 88, arabic: "لَا تَمُدَّنَّ عَيْنَيْكَ إِلَىٰ مَا مَتَّعْنَا بِهِ أَزْوَاجًا مِّنْهُمْ وَلَا تَحْزَنْ عَلَيْهِمْ وَاخْفِضْ جَنَاحَكَ لِلْمُؤْمِنِينَ", translation: "Do not extend your eyes toward that by which We have given enjoyment to categories of them, and do not grieve over them, and lower your wing to the believers." },
    { ayah: 94, arabic: "فَاصْدَعْ بِمَا تُؤْمَرُ وَأَعْرِضْ عَنِ الْمُشْرِكِينَ", translation: "Then declare what you are commanded and turn away from the polytheists." },
    { ayah: 95, arabic: "إِنَّا كَفَيْنَاكَ الْمُسْتَهْزِئِينَ", translation: "Indeed, We are sufficient for you against the mockers." },
    { ayah: 97, arabic: "وَلَقَدْ نَعْلَمُ أَنَّكَ يَضِيقُ صَدْرُكَ بِمَا يَقُولُونَ", translation: "And We already know that your breast is constrained by what they say." },
    { ayah: 98, arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَكُن مِّنَ السَّاجِدِينَ", translation: "So glorify the praises of your Lord and be of those who prostrate." },
    { ayah: 99, arabic: "وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ", translation: "And worship your Lord until there comes to you the certainty." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Guardian",
      subtitle: "Five movements: preservation → creation signs → Iblis → ruins → consolation",
      sections: [
        { ayahs: "1–15", title: "The Promise & the Psychology of Denial", color: "#4ecdc4", desc: "The Quran is preserved. The disbelievers will wish they had submitted. Even if a gate were opened in the sky and they were ascending through it, they would say their eyes were dazzled. Rejection is not an intellectual problem — it is a condition of the heart." },
        { ayahs: "16–25", title: "The Signs in Creation", color: "#9b7fd4", desc: "Constellations guarded from every expelled devil. The earth spread out with everything growing in measured balance. Winds sent as pollinators. Provisions descending from inexhaustible treasuries in known measure. And the quiet culmination: 'We give life and cause death, and We are the Inheritor.'" },
        { ayahs: "26–44", title: "Adam and Iblis", color: "#e07a8a", isPivot: true, desc: "The surah's dramatic core. Adam made from salsal — dried clay that rings when struck. Then the breath of God's spirit. Iblis refuses because he cannot see past the material. His strategy: beautification. His limitation: the sincere servants are beyond his reach. The straight path leads to God Himself." },
        { ayahs: "45–84", title: "The Ruins", color: "#C9A84C", desc: "Ibrahim's guests bring news of a son. Lot's people are destroyed. The Companions of the Wood are seized. The people of Al-Hijr carved homes into mountains and believed stone walls made them secure — the blast took them at morning. Each nation was given signs; each refused; each was taken." },
        { ayahs: "85–99", title: "The Consolation", color: "#4ecdc4", desc: "Everything before was preparation. Forgive with gracious forgiveness. You have been given the seven oft-repeated verses and the great Quran. Do not look at what they have. Do not grieve. Lower your wing to the believers. We are sufficient for you against the mockers. Worship until the certainty comes." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "From the preserved Book to the personal gift — the universal becomes intimate",
      pairs: [
        {
          left: { label: "The Preserved Reminder", ayahs: "1–15", desc: "The Quran described as a guarded Reminder — objective, cosmic, addressed to everyone" },
          right: { label: "The Personal Gift", ayahs: "85–99", desc: "The Quran described as a personal gift to one man — 'We have given you...' — intimate, consoling" },
          color: "#4ecdc4",
        },
        {
          left: { label: "Creation Signs", ayahs: "16–25", desc: "Heavens adorned and guarded, earth spread with measured provision, God as the Inheritor" },
          right: { label: "The Destructions", ayahs: "45–84", desc: "What happens when the guarded signs are refused — nation after nation warned, given time, then taken" },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Breath and the Refusal", ayahs: "26–44",
        desc: "Adam made from clay, then given the breath of God's spirit. Iblis sees only the clay. His sin is a failure of perception so total that he looks at the same creature God described and sees only mud.",
        note: "Both Adam and Muhammad received divine breath entering the world through a vessel — Adam the spirit of life, Muhammad the Quran of guidance. The surah places these in structural parallel: the Quran is to Muhammad what the spirit was to Adam.",
      },
    },
    deductiveFunnel: {
      title: "Guarded Things",
      subtitle: "The surah keeps returning to what is under divine protection — and what forfeits it",
      layers: [
        { depth: 1, label: "The Book Guarded", ayah: "9", arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ", desc: "The Quran under divine custody. The pronoun nahnu appears twice in emphatic position. The theological and civilizational weight of hafizun — guardian, preserver — grounds the Muslim confidence that the text remains exactly as revealed.", color: "#4ecdc4" },
        { depth: 2, label: "The Heavens Guarded", ayah: "17", arabic: "وَحَفِظْنَاهَا مِن كُلِّ شَيْطَانٍ رَّجِيمٍ", desc: "The sky sealed from every expelled devil. The same verb — hafiza — used for the Quran's preservation. What God protects is protected at every level, from scripture to cosmos.", color: "#9b7fd4" },
        { depth: 3, label: "The Sincere Guarded", ayah: "40", arabic: "إِلَّا عِبَادَكَ مِنْهُمُ الْمُخْلَصِينَ", desc: "Iblis himself admits the boundary: the mukhlasin — the sincere — are beyond his reach. His strategy of beautification cannot touch those whose orientation is genuinely toward God.", color: "#C9A84C" },
        { depth: 4, label: "The Prophet Guarded", ayah: "95", arabic: "إِنَّا كَفَيْنَاكَ الْمُسْتَهْزِئِينَ", desc: "We are sufficient for you against the mockers. The surah's final layer of protection: the one who carries the preserved Book is himself preserved. Worship until the certainty comes.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah is diagnosis, not prescription — every absence shapes the argument",
      absences: [
        { item: "No legal content whatsoever", note: "No commands about prayer times, dietary laws, inheritance, or social conduct. No direct addresses to the believers as a community. The surah speaks almost entirely in the third person about those who reject — and then, in its most intimate moments, directly to the Prophet alone." },
        { item: "No community addressed", note: "No 'O you who believe.' The believing community is present only by implication, as the 'sincere servants' whom Iblis cannot reach. This absence shapes everything: Al-Hijr is trying to show you what denial looks like from the inside, so thoroughly that you recognize it before it takes root." },
        { item: "No resolution for the mockery", note: "The surah does not promise the Prophet that the mockers will stop. It promises something different: 'We are sufficient for you against them.' The mockery continues. What changes is the Prophet's relationship to it — from something he must defeat to something God is handling." },
        { item: "No explanation for Iblis's respite", note: "God grants Iblis respite until the Day of Resurrection without explaining why. The surah does not resolve the theodicy. It leaves the question open and instead shows you the boundary: the sincere are protected regardless of how long the test runs." },
        { item: "No promise of success — only endurance", note: "The surah's final command is not 'you will triumph' or 'they will believe.' It is: 'Worship your Lord until the certainty comes.' The certainty is death. The entire instruction is to keep going until the end. No timeline, no victory condition — only faithfulness." },
      ],
    },
  },

  contentNodes: [
    { concept: "The preservation of the Quran — hafizun as divine custody", type: "surah-specific", articleSlug: "quran-preservation-15-9" },
    { concept: "Salsal — the ringing clay and the breath of the spirit", type: "surah-specific", articleSlug: "salsal-clay-spirit-15-26" },
    { concept: "Ibrahim–Al-Hijr–An-Nahl triptych: prayer, warning, evidence", type: "cross-surah", articleSlug: "ibrahim-hijr-nahl-triptych" },
    { concept: "Iblis's strategy of beautification across the Quran", type: "cross-surah", articleSlug: "iblis-beautification-strategy" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "guardian", label: "Guardian" },
  { id: "ring", label: "Ring" },
  { id: "guarded", label: "Guarded" },
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
        Book → heavens → sincere → Prophet
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
          {activeTab === "guardian" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "guarded" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
