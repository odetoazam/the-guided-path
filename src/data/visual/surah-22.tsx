"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-HAJJ — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-hajj
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Hajj",
  arabicName: "الحَجّ",
  meaning: "The Pilgrimage",
  number: 22,
  ayahCount: 78,
  period: "Madani",
  juz: 17,
  movements: 4,
  thesis:
    "A surah that shakes the ground to make you stand — framing all of worship between two prostrations, the one the cosmos already performs and the one only you can choose.",
  reflectionUrl: "/surahs/al-hajj",
  readTime: "25 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"aqeedah","english":"Theology"},{"key":"nasikh","english":"Abrogation"}],
  heartVerse: {
    arabic: "لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ",
    ayahRef: "22:37",
    translation: "Their meat will not reach Allah, nor will their blood, but what reaches Him is taqwa from you.",
    why: "The verb yanalu — to reach, to arrive at — is used for both the negation and the affirmation. The blood does not reach Him. The taqwa does. The entire theology of ritual Islam in a single construction.",
  },

  audio: { surahNumber: 22, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ ۚ إِنَّ زَلْزَلَةَ السَّاعَةِ شَيْءٌ عَظِيمٌ", translation: "O humanity, fear your Lord. Indeed, the convulsion of the Hour is a tremendous thing." },
    { ayah: 2, arabic: "يَوْمَ تَرَوْنَهَا تَذْهَلُ كُلُّ مُرْضِعَةٍ عَمَّا أَرْضَعَتْ وَتَضَعُ كُلُّ ذَاتِ حَمْلٍ حَمْلَهَا وَتَرَى النَّاسَ سُكَارَىٰ وَمَا هُم بِسُكَارَىٰ وَلَٰكِنَّ عَذَابَ اللَّهِ شَدِيدٌ", translation: "The Day you see it, every nursing mother will forget her nursling, and every pregnant woman will abort her pregnancy, and you will see people as if intoxicated while they are not intoxicated; but the punishment of Allah is severe." },
    { ayah: 5, arabic: "يَا أَيُّهَا النَّاسُ إِن كُنتُمْ فِي رَيْبٍ مِّنَ الْبَعْثِ فَإِنَّا خَلَقْنَاكُم مِّن تُرَابٍ ثُمَّ مِن نُّطْفَةٍ ثُمَّ مِنْ عَلَقَةٍ ثُمَّ مِن مُّضْغَةٍ مُّخَلَّقَةٍ وَغَيْرِ مُخَلَّقَةٍ", translation: "O people, if you are in doubt about the Resurrection — then We created you from dust, then from a drop, then from a clinging clot, then from a lump of flesh, formed and unformed." },
    { ayah: 11, arabic: "وَمِنَ النَّاسِ مَن يَعْبُدُ اللَّهَ عَلَىٰ حَرْفٍ", translation: "And among the people is he who worships Allah on an edge." },
    { ayah: 18, arabic: "أَلَمْ تَرَ أَنَّ اللَّهَ يَسْجُدُ لَهُ مَن فِي السَّمَاوَاتِ وَمَن فِي الْأَرْضِ وَالشَّمْسُ وَالْقَمَرُ وَالنُّجُومُ وَالْجِبَالُ وَالشَّجَرُ وَالدَّوَابُّ وَكَثِيرٌ مِّنَ النَّاسِ", translation: "Do you not see that to Allah prostrates whoever is in the heavens and whoever is on the earth, and the sun, the moon, the stars, the mountains, the trees, the moving creatures, and many of mankind?" },
    { ayah: 26, arabic: "وَإِذْ بَوَّأْنَا لِإِبْرَاهِيمَ مَكَانَ الْبَيْتِ أَن لَّا تُشْرِكْ بِي شَيْئًا وَطَهِّرْ بَيْتِيَ لِلطَّائِفِينَ وَالْقَائِمِينَ وَالرُّكَّعِ السُّجُودِ", translation: "And when We designated for Ibrahim the site of the House: 'Do not associate anything with Me, and purify My House for those who circumambulate it, and those who stand, and those who bow and prostrate.'" },
    { ayah: 37, arabic: "لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ", translation: "Their meat will not reach Allah, nor will their blood, but what reaches Him is taqwa from you." },
    { ayah: 39, arabic: "أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا ۚ وَإِنَّ اللَّهَ عَلَىٰ نَصْرِهِمْ لَقَدِيرٌ", translation: "Permission is granted to those who are fought against, because they have been wronged. And indeed, Allah is capable of giving them victory." },
    { ayah: 40, arabic: "الَّذِينَ أُخْرِجُوا مِن دِيَارِهِم بِغَيْرِ حَقٍّ إِلَّا أَن يَقُولُوا رَبُّنَا اللَّهُ", translation: "Those who have been expelled from their homes unjustly, only because they said: 'Our Lord is Allah.'" },
    { ayah: 46, arabic: "فَإِنَّهَا لَا تَعْمَى الْأَبْصَارُ وَلَٰكِن تَعْمَى الْقُلُوبُ الَّتِي فِي الصُّدُورِ", translation: "For indeed, it is not the eyes that are blind, but blind are the hearts which are within the breasts." },
    { ayah: 73, arabic: "إِنَّ الَّذِينَ تَدْعُونَ مِن دُونِ اللَّهِ لَن يَخْلُقُوا ذُبَابًا وَلَوِ اجْتَمَعُوا لَهُ", translation: "Indeed, those you invoke besides Allah will never create a fly, even if they gathered together for it." },
    { ayah: 77, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا ارْكَعُوا وَاسْجُدُوا وَاعْبُدُوا رَبَّكُمْ وَافْعَلُوا الْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ", translation: "O you who believe, bow and prostrate and worship your Lord and do good, that you may succeed." },
    { ayah: 78, arabic: "وَجَاهِدُوا فِي اللَّهِ حَقَّ جِهَادِهِ ۚ هُوَ اجْتَبَاكُمْ وَمَا جَعَلَ عَلَيْكُمْ فِي الدِّينِ مِنْ حَرَجٍ ۚ مِّلَّةَ أَبِيكُمْ إِبْرَاهِيمَ ۚ هُوَ سَمَّاكُمُ الْمُسْلِمِينَ", translation: "And strive in the cause of Allah with the striving due to Him. He has chosen you and has not placed upon you in the religion any hardship — the religion of your father Ibrahim. He named you Muslims." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Two Prostrations",
      subtitle: "Four movements: earthquake → pilgrimage → struggle → the command to bow",
      sections: [
        { ayahs: "1–24", title: "The Earthquake & Resurrection", color: "#e07a8a", desc: "The surah opens with the convulsion of the Hour — nursing mothers forget their infants, the earth heaves. Then the argument for resurrection drawn from embryology and the greening of barren earth. The first cosmic prostration (22:18) where the sun, moon, mountains, trees, and many of humankind already bow — and the reader joins them." },
        { ayahs: "25–37", title: "The Sacred House & Sacrifice", color: "#C9A84C", isPivot: true, desc: "Ibrahim and the Ka'bah. The call to pilgrimage — pilgrims arriving on foot and lean camels from every distant pass. The rites legislated, and the pivotal declaration: the meat and blood do not reach Allah. What reaches Him is your taqwa. The body bows, the animal bleeds — and what arrives at the Divine is invisible." },
        { ayahs: "38–60", title: "Permission to Fight & the Pattern", color: "#4ecdc4", desc: "The only verse in the Quran explicitly authorizing armed defense — conditioned, defensive, and grounded in the protection of all houses of worship: monasteries, churches, synagogues, and mosques. Then the rapid-fire catalog of destroyed nations and the diagnosis: it is not the eyes that are blind, but the hearts within the breasts." },
        { ayahs: "61–78", title: "Signs of Power & the Second Sajdah", color: "#9b7fd4", desc: "A gathering of proofs — night entering day, rain reviving earth, the heavens held from falling. The fly verse: all false gods gathered together cannot create a fly or recover what it steals. Then the second prostration (22:77) — not cosmic but volitional. The believers are commanded to join what the sun and mountains already know." },
      ],
    },
    chiasticRing: {
      title: "The Frame",
      subtitle: "The opening earthquake and the closing anchor form a precise inversion",
      pairs: [
        {
          left: { label: "Earth Shaking", ayahs: "1–2", desc: "The ground convulses, humanity staggers as though drunk, the world is unreliable" },
          right: { label: "Allah as Anchor", ayahs: "77–78", desc: "Bow, prostrate, hold fast to Allah — mawla and nasir, Protector and Helper" },
          color: "#e07a8a",
        },
        {
          left: { label: "Cosmic Prostration", ayahs: "18", desc: "Sun, moon, stars, mountains, trees — all bow. Many of mankind. Many — not all" },
          right: { label: "Commanded Prostration", ayahs: "77", desc: "O you who believe — bow, prostrate, worship your Lord. The cosmic made volitional" },
          color: "#9b7fd4",
        },
        {
          left: { label: "Al-Haqq (first)", ayahs: "6", desc: "Allah is the Truth — capping the argument for resurrection from embryology" },
          right: { label: "Al-Haqq (return)", ayahs: "62", desc: "Allah is the Truth — capping the argument against false gods. Same word, same weight" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Sacrifice Theology", ayahs: "37",
        desc: "Their meat will not reach Allah, nor their blood — but what reaches Him is taqwa from you.",
        note: "The surah named after the body's most demanding journey teaches that the journey is internal. The verb yanalu — to reach — carries the entire theology of ritual.",
      },
    },
    deductiveFunnel: {
      title: "The Convergences",
      subtitle: "Four things that other surahs separate — Al-Hajj holds in one place",
      layers: [
        { depth: 1, label: "Makki + Madani", ayah: "1–78", arabic: "زَلْزَلَةَ السَّاعَةِ", desc: "One of the few surahs blending both periods — eschatological thunder from Mecca beside legislative precision from Medina in the same breath.", color: "#e07a8a" },
        { depth: 2, label: "Cosmic + Ritual", ayah: "18, 26–29", arabic: "يَسْجُدُ لَهُ مَن فِي السَّمَاوَاتِ", desc: "The prostration of the sun and the moon beside the slaughter of a sacrificial animal. Cosmic worship and its earthly expression at the Ka'bah.", color: "#9b7fd4" },
        { depth: 3, label: "Intimate + Universal", ayah: "5, 1", arabic: "مِن تُرَابٍ ثُمَّ مِن نُّطْفَةٍ", desc: "The embryological stages of a single human being beside the shaking of the entire earth. The closest sign and the furthest event.", color: "#4ecdc4" },
        { depth: 4, label: "Evidence + Blindness", ayah: "46", arabic: "تَعْمَى الْقُلُوبُ الَّتِي فِي الصُّدُورِ", desc: "The surah presents evidence — embryological, cosmological, historical — then diagnoses why evidence alone is never sufficient. The hearts can go blind.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "Every absence is a design choice — Al-Hajj assumes you know the stories and cites them as evidence",
      absences: [
        { item: "No sustained prophetic narrative", note: "Ibrahim appears only to build the House. Nuh, 'Ad, Thamud, Lut, Madyan, Musa are compressed into three ayahs of rapid-fire catalog (22:42–44). The surah cites prophetic history as evidence, not as experience." },
        { item: "No address to the Prophet by name or title", note: "No 'O Prophet,' no 'O Messenger.' He is addressed only as part of the collective — 'O people,' 'O you who believe.' For a surah that legislates pilgrimage and authorizes warfare, both enacted through his direct leadership, this absence is striking." },
        { item: "No dialogue between prophets and their people", note: "No dramatic scenes of rejection and consequence. The space that would normally go to narrative is given to argument, evidence, and direct address." },
        { item: "No single pivot — two sajdahs instead", note: "The only surah in the Quran with two prescribed prostrations of recitation. The first is cosmic (22:18), the second volitional (22:77). The surah's argument lives in the distance between them." },
        { item: "No separation of the Makki and Madani voices", note: "Other surahs carry one or the other. Al-Hajj refuses to separate what other surahs distribute — eschatological terror beside legislative detail, cosmic vision beside ritual instruction." },
      ],
    },
  },

  contentNodes: [
    { concept: "The two sajdahs — cosmic and volitional prostration", type: "surah-specific", articleSlug: "two-sajdahs-hajj-18-77" },
    { concept: "Yanalu — what reaches Allah (22:37)", type: "surah-specific", articleSlug: "yanalu-sacrifice-theology-22-37" },
    { concept: "Heart-blindness: ta'ma al-qulub (22:46)", type: "cross-surah", articleSlug: "heart-blindness-22-46" },
    { concept: "The fly verse — measuring false gods (22:73)", type: "cross-surah", articleSlug: "fly-verse-false-gods-22-73" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "frame", label: "Frame" },
  { id: "converge", label: "Convergences" },
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
        Thunder + law → body + heart → evidence + blindness → proof + demand
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
              <div className="text-2xl font-bold text-gold-500 font-serif">2</div>
              <div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Sajdahs</div>
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
          {activeTab === "frame" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "converge" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
