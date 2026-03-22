"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AN-NABA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/an-naba
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "An-Naba",
  arabicName: "النَّبَأ",
  meaning: "The Great News",
  number: 78,
  ayahCount: 40,
  period: "Makki",
  juz: 30,
  movements: 4,
  thesis:
    "A forty-ayah prosecution that takes the ground beneath your feet, the rain above your head, and the sleep in your bones, and asks you to follow the evidence to its verdict — the resurrection you treat as a debate is the reality you will stand inside.",
  reflectionUrl: "/surahs/an-naba",
  readTime: "20 min read",

  heartVerse: {
    arabic: "يَوْمَ يَنظُرُ ٱلْمَرْءُ مَا قَدَّمَتْ يَدَاهُ وَيَقُولُ ٱلْكَافِرُ يَٰلَيْتَنِى كُنتُ تُرَٰبًۢا",
    ayahRef: "78:40",
    translation: "The Day when a person will see what his hands have put forth, and the disbeliever will say, 'Oh, I wish I were dust!'",
    why: "The only human speech in the entire surah. For forty ayahs God has been questioning, describing, warning, offering. At the very end, a single voice breaks through — and all it can say is a wish for nonexistence. The person who refused to believe the earth could give up its dead now wants the earth to swallow him permanently.",
  },

  audio: { surahNumber: 78, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "عَمَّ يَتَسَآءَلُونَ", translation: "About what are they asking one another?" },
    { ayah: 2, arabic: "عَنِ ٱلنَّبَإِ ٱلْعَظِيمِ", translation: "About the Great News —" },
    { ayah: 3, arabic: "ٱلَّذِى هُمْ فِيهِ مُخْتَلِفُونَ", translation: "over which they are in disagreement." },
    { ayah: 4, arabic: "كَلَّا سَيَعْلَمُونَ", translation: "No! They are going to know." },
    { ayah: 5, arabic: "ثُمَّ كَلَّا سَيَعْلَمُونَ", translation: "Then, no! They are going to know." },
    { ayah: 6, arabic: "أَلَمْ نَجْعَلِ ٱلْأَرْضَ مِهَٰدًۭا", translation: "Have We not made the earth a resting place?" },
    { ayah: 7, arabic: "وَٱلْجِبَالَ أَوْتَادًۭا", translation: "And the mountains as stakes?" },
    { ayah: 8, arabic: "وَخَلَقْنَٰكُمْ أَزْوَٰجًۭا", translation: "And We created you in pairs," },
    { ayah: 9, arabic: "وَجَعَلْنَا نَوْمَكُمْ سُبَاتًۭا", translation: "and made your sleep a means for rest," },
    { ayah: 10, arabic: "وَجَعَلْنَا ٱلَّيْلَ لِبَاسًۭا", translation: "and made the night as clothing," },
    { ayah: 11, arabic: "وَجَعَلْنَا ٱلنَّهَارَ مَعَاشًۭا", translation: "and made the day for livelihood," },
    { ayah: 12, arabic: "وَبَنَيْنَا فَوْقَكُمْ سَبْعًۭا شِدَادًۭا", translation: "and constructed above you seven strong heavens," },
    { ayah: 13, arabic: "وَجَعَلْنَا سِرَاجًۭا وَهَّاجًۭا", translation: "and made therein a burning lamp," },
    { ayah: 14, arabic: "وَأَنزَلْنَا مِنَ ٱلْمُعْصِرَٰتِ مَآءًۭ ثَجَّاجًۭا", translation: "and sent down from the rain clouds pouring water," },
    { ayah: 15, arabic: "لِّنُخْرِجَ بِهِۦ حَبًّۭا وَنَبَاتًۭا", translation: "that We may bring forth thereby grain and vegetation," },
    { ayah: 16, arabic: "وَجَنَّٰتٍ أَلْفَافًا", translation: "and gardens of entwined growth." },
    { ayah: 17, arabic: "إِنَّ يَوْمَ ٱلْفَصْلِ كَانَ مِيقَٰتًۭا", translation: "Indeed, the Day of Decision is an appointed time —" },
    { ayah: 18, arabic: "يَوْمَ يُنفَخُ فِى ٱلصُّورِ فَتَأْتُونَ أَفْوَاجًۭا", translation: "the Day the Horn is blown and you come forth in multitudes," },
    { ayah: 19, arabic: "وَفُتِحَتِ ٱلسَّمَآءُ فَكَانَتْ أَبْوَٰبًۭا", translation: "and the heaven is opened and becomes gateways," },
    { ayah: 20, arabic: "وَسُيِّرَتِ ٱلْجِبَالُ فَكَانَتْ سَرَابًا", translation: "and the mountains are set in motion and become a mirage." },
    { ayah: 21, arabic: "إِنَّ جَهَنَّمَ كَانَتْ مِرْصَادًۭا", translation: "Indeed, Jahannam has been lying in ambush," },
    { ayah: 22, arabic: "لِّلطَّٰغِينَ مَـَٔابًۭا", translation: "for the transgressors, a place of return." },
    { ayah: 23, arabic: "لَّٰبِثِينَ فِيهَآ أَحْقَابًۭا", translation: "They will remain therein for ages unending." },
    { ayah: 24, arabic: "لَّا يَذُوقُونَ فِيهَا بَرْدًۭا وَلَا شَرَابًا", translation: "They will not taste therein any coolness or drink," },
    { ayah: 25, arabic: "إِلَّا حَمِيمًۭا وَغَسَّاقًۭا", translation: "except scalding water and foul purulence —" },
    { ayah: 26, arabic: "جَزَآءًۭ وِفَاقًا", translation: "a fitting recompense." },
    { ayah: 27, arabic: "إِنَّهُمْ كَانُوا۟ لَا يَرْجُونَ حِسَابًۭا", translation: "Indeed, they were not expecting an account," },
    { ayah: 28, arabic: "وَكَذَّبُوا۟ بِـَٔايَٰتِنَا كِذَّابًۭا", translation: "and they denied Our signs with emphatic denial." },
    { ayah: 29, arabic: "وَكُلَّ شَىْءٍ أَحْصَيْنَٰهُ كِتَٰبًۭا", translation: "But all things We have recorded in writing." },
    { ayah: 30, arabic: "فَذُوقُوا۟ فَلَن نَّزِيدَكُمْ إِلَّا عَذَابًا", translation: "So taste — for never will We increase you except in torment." },
    { ayah: 31, arabic: "إِنَّ لِلْمُتَّقِينَ مَفَازًا", translation: "Indeed, for the God-conscious is attainment —" },
    { ayah: 32, arabic: "حَدَآئِقَ وَأَعْنَٰبًۭا", translation: "gardens and grapevines," },
    { ayah: 33, arabic: "وَكَوَاعِبَ أَتْرَابًۭا", translation: "and companions of equal age," },
    { ayah: 34, arabic: "وَكَأْسًۭا دِهَاقًۭا", translation: "and a cup filled to the brim." },
    { ayah: 35, arabic: "لَّا يَسْمَعُونَ فِيهَا لَغْوًۭا وَلَا كِذَّٰبًۭا", translation: "No ill speech will they hear therein, nor any falsehood —" },
    { ayah: 36, arabic: "جَزَآءًۭ مِّن رَّبِّكَ عَطَآءً حِسَابًۭا", translation: "a reward from your Lord, a generous gift made due by account." },
    { ayah: 37, arabic: "رَّبِّ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ وَمَا بَيْنَهُمَا ٱلرَّحْمَٰنِ ۖ لَا يَمْلِكُونَ مِنْهُ خِطَابًۭا", translation: "Lord of the heavens and the earth and all between them, the Most Merciful. They possess not from Him the right of address." },
    { ayah: 38, arabic: "يَوْمَ يَقُومُ ٱلرُّوحُ وَٱلْمَلَٰٓئِكَةُ صَفًّۭا ۖ لَّا يَتَكَلَّمُونَ إِلَّا مَنْ أَذِنَ لَهُ ٱلرَّحْمَٰنُ وَقَالَ صَوَابًۭا", translation: "The Day the Spirit and the angels stand in rows — none shall speak except whom the Most Merciful permits, and he will say only what is right." },
    { ayah: 39, arabic: "ذَٰلِكَ ٱلْيَوْمُ ٱلْحَقُّ ۖ فَمَن شَآءَ ٱتَّخَذَ إِلَىٰ رَبِّهِۦ مَـَٔابًا", translation: "That is the True Day. So whoever wills, let him take a path back to his Lord." },
    { ayah: 40, arabic: "إِنَّآ أَنذَرْنَٰكُمْ عَذَابًۭا قَرِيبًۭا يَوْمَ يَنظُرُ ٱلْمَرْءُ مَا قَدَّمَتْ يَدَاهُ وَيَقُولُ ٱلْكَافِرُ يَٰلَيْتَنِى كُنتُ تُرَٰبًۢا", translation: "Indeed, We have warned you of a near punishment — the Day when a person will see what his hands have put forth, and the disbeliever will say, 'Oh, I wish I were dust!'" },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Prosecution",
      subtitle: "Four movements: question → evidence → verdict → sentence",
      sections: [
        { ayahs: "1–5", title: "The Disputed Question", color: "#e07a8a", desc: "The surah opens in the murmur of the Makkan streets — they keep asking each other about the Great News, the resurrection, unable to settle the matter. The doubled warning (kalla sa-ya'lamun, thumma kalla sa-ya'lamun) converts an intellectual debate into a countdown: they will know once at death, and again at resurrection." },
        { ayahs: "6–16", title: "The Evidence from Creation", color: "#4ecdc4", desc: "Ten signs delivered in rapid pairs: earth and mountains, pairs and sleep, night and day, the seven heavens and the blazing lamp, rain clouds and grain, gardens of entwined growth. Each exhibit is something the Makkan listener had direct experience of. The surah turns their daily existence into an argument they cannot escape without denying their own senses." },
        { ayahs: "17–20", title: "The Day of Decision", color: "#C9A84C", isPivot: true, desc: "Yawm al-fasl — the Day of Separation. The trumpet is blown, crowds stream toward judgment, the sky splits into gateways, the mountains dissolve into mirage. The creation signs from the evidence section are systematically undone: the bed shaken, the pegs dissolved, the canopy torn. What proved God's power to create now proves His power to uncreate." },
        { ayahs: "21–30", title: "The Ambush", color: "#9b7fd4", desc: "Jahannam described as mirsad — a predator lying in ambush, waiting with patience. For the transgressors: ages of suffering, no coolness, no drink — only boiling water and festering discharge. The crime named: they were not expecting an account. And every action was being written down anyway." },
        { ayahs: "31–36", title: "The Garden", color: "#4ecdc4", desc: "For the God-conscious: gardens, grapevines, a cup filled to the brim, no idle talk and no lying. The word kidhdhab — the same intensive denial that defined the damned in ayah 28 — is the quality banished from Paradise. The reward section is shorter than the punishment: six ayahs to ten. Paradise is offered, not argued for." },
        { ayahs: "37–40", title: "The Sovereign Silence", color: "#e07a8a", desc: "On that Day, no one speaks. The Most Merciful — the name most associated with gentleness — silences the universe. The Spirit and the angels stand in rows. Then: 'That is the True Day.' The surah closes with the only human voice — the disbeliever wishing he were dust. The word turaba circles back to the earth of ayah 6." },
      ],
    },
    chiasticRing: {
      title: "The Ring",
      subtitle: "The surah's evidence and consequence form a precise mirror",
      pairs: [
        {
          left: { label: "The Question", ayahs: "1–5", desc: "What are they asking about? The Great News — the resurrection they debate and dismiss. They will know." },
          right: { label: "The Answer", ayahs: "37–40", desc: "That is the True Day. They now know. The wish for dust. No disagreement remains — only the disbeliever's cry." },
          color: "#e07a8a",
        },
        {
          left: { label: "Creation Built", ayahs: "6–16", desc: "Earth as bed, mountains as pegs, sky as canopy, rain producing gardens — ten signs of divine construction." },
          right: { label: "Creation Fulfilled / Inverted", ayahs: "21–36", desc: "Jahannam as ambush for the transgressors; gardens and full cups for the God-conscious. The same gardens, two destinations." },
          color: "#9b7fd4",
        },
      ],
      center: {
        label: "The Day of Decision", ayahs: "17–20",
        desc: "The trumpet, the crowds, the sky becoming gateways, the mountains becoming mirage.",
        note: "The fulcrum. Everything before it builds the case. Everything after it lives inside the verdict. The creation signs are undone — the bed shaken, the pegs dissolved, the canopy split.",
      },
    },
    keywordThread: {
      title: "The Return",
      subtitle: "The word ma'ab — 'place of return' — appears twice, and the entire argument lives between them",
      layers: [
        { depth: 1, label: "Jahannam as Return", ayah: "22", arabic: "لِّلطَّٰغِينَ مَـَٔابًۭا", desc: "The transgressors' ma'ab — their place of returning. Jahannam is not a destination they are sent to unwillingly. It is where they were headed all along. The word implies they belong there.", color: "#e07a8a" },
        { depth: 2, label: "The Evidence Between", ayah: "6–16", arabic: "أَلَمْ نَجْعَلِ ٱلْأَرْضَ مِهَٰدًۭا", desc: "Between the two uses of ma'ab lies the entire creation argument: earth, mountains, sleep, rain, gardens. The evidence that should have redirected their return.", color: "#4ecdc4" },
        { depth: 3, label: "The Denial", ayah: "27–28", arabic: "كَذَّبُوا۟ بِـَٔايَٰتِنَا كِذَّابًۭا", desc: "They were not expecting an account and denied the signs with emphatic, persistent denial. The same intensive form kidhdhab returns in ayah 35 — banished from Paradise.", color: "#9b7fd4" },
        { depth: 4, label: "Return to the Lord", ayah: "39", arabic: "فَمَن شَآءَ ٱتَّخَذَ إِلَىٰ رَبِّهِۦ مَـَٔابًا", desc: "The listener's ma'ab — 'whoever wills, let him take a path back to his Lord.' The same word, the opposite direction. You are returning somewhere. The only question is where.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "An-Naba sets aside the standard Makkan toolkit — every absence is a choice",
      absences: [
        { item: "No prophets, no destroyed nations", note: "No Musa, no Ibrahim, no Thamud. For a Makkan surah, this is striking — the standard warning-by-historical-precedent is set aside entirely. The surah has a different method: evidence from creation, not from history." },
        { item: "No ethical commands", note: "No 'pray,' 'give,' 'be patient.' The surah's concern is entirely ontological: what is real, what is coming, what have you already been shown. The audience has a prior problem — they have not yet accepted the reality that would make moral instruction meaningful." },
        { item: "No dialogue, no voices — until the last ayah", note: "For thirty-nine ayahs, God alone speaks — questioning, describing, warning. The only human voice in the surah is the disbeliever's final cry: 'I wish I were dust.' Forty ayahs of divine prosecution, one line of human response." },
        { item: "No named audience", note: "No 'O you who believe,' no 'O mankind,' no 'O Messenger.' The surah speaks to no one in particular and therefore to everyone. The prosecution has no named defendant because the indictment is universal." },
        { item: "No mercy vocabulary until the close", note: "The name al-Rahman appears only in the final section (ayahs 37-38), and even there it is the name that silences the universe. Mercy is present, but it does not soften the prosecution — it presides over the court." },
      ],
    },
  },

  contentNodes: [
    { concept: "Ma'ab — the two returns", type: "surah-specific", articleSlug: "maab-two-returns-78" },
    { concept: "Mirsad — Jahannam as predator in ambush", type: "surah-specific", articleSlug: "mirsad-ambush-78-21" },
    { concept: "An-Naba / An-Naziat diptych", type: "cross-surah", articleSlug: "naba-naziat-diptych" },
    { concept: "Turaba — dust as final word", type: "cross-surah", articleSlug: "turaba-dust-creation-return" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "prosecution", label: "Prosecution" },
  { id: "ring", label: "Ring" },
  { id: "return", label: "Return" },
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

function KeywordThread({ data }: { data: typeof SURAH_DATA.diagrams.keywordThread }) {
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
        Jahannam as return → evidence between → denial named → return to the Lord
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
          {activeTab === "prosecution" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "return" && <KeywordThread data={d.diagrams.keywordThread} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && (
            <div className="space-y-6">
              <FullSurahText verses={d.fullText} />
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
