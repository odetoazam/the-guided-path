"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AN-NUR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/an-nur
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "An-Nur",
  arabicName: "النُّور",
  meaning: "The Light",
  number: 24,
  ayahCount: 64,
  period: "Madani",
  juz: 18,
  movements: 5,
  thesis:
    "A surah that builds a house for light — laying every brick of law, evidence, privacy, and restraint so that the lamp of ayah 35 has a niche to burn in and a community that can see by it.",
  reflectionUrl: "/surahs/an-nur",
  readTime: "25 min read",

  sciencesActive: [{"key":"usul_tafsir","english":"Principles of Interpretation"},{"key":"amthal","english":"Parables"},{"key":"makki_madani","english":"Revelation Context"}],
  heartVerse: {
    arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ ۚ مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ ۖ الْمِصْبَاحُ فِي زُجَاجَةٍ ۖ الزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌ دُرِّيٌّ",
    ayahRef: "24:35",
    translation: "Allah is the Light of the heavens and the earth. The example of His light is like a niche within which is a lamp, the lamp within glass, the glass as if it were a radiant star.",
    why: "The image is nested: the niche holds the lamp, the lamp sits in the glass, the glass receives light from the oil, the oil is itself already luminous. Each container holds something brighter than itself. The laws of the surah are the niche. The light is what lives inside them.",
  },

  audio: { surahNumber: 24, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "سُورَةٌ أَنزَلْنَاهَا وَفَرَضْنَاهَا وَأَنزَلْنَا فِيهَا آيَاتٍ بَيِّنَاتٍ لَّعَلَّكُمْ تَذَكَّرُونَ", translation: "A surah which We have sent down and made obligatory, and in which We have sent down clear signs that you might remember." },
    { ayah: 2, arabic: "الزَّانِيَةُ وَالزَّانِي فَاجْلِدُوا كُلَّ وَاحِدٍ مِّنْهُمَا مِائَةَ جَلْدَةٍ", translation: "The fornicating woman and the fornicating man — lash each one of them with a hundred lashes." },
    { ayah: 4, arabic: "وَالَّذِينَ يَرْمُونَ الْمُحْصَنَاتِ ثُمَّ لَمْ يَأْتُوا بِأَرْبَعَةِ شُهَدَاءَ فَاجْلِدُوهُمْ ثَمَانِينَ جَلْدَةً", translation: "And those who accuse chaste women and then do not produce four witnesses — lash them with eighty lashes." },
    { ayah: 11, arabic: "إِنَّ الَّذِينَ جَاءُوا بِالْإِفْكِ عُصْبَةٌ مِّنكُمْ ۚ لَا تَحْسَبُوهُ شَرًّا لَّكُم ۖ بَلْ هُوَ خَيْرٌ لَّكُمْ", translation: "Indeed, those who brought the slander are a group among you. Do not think it bad for you; rather, it is good for you." },
    { ayah: 22, arabic: "أَلَا تُحِبُّونَ أَن يَغْفِرَ اللَّهُ لَكُمْ", translation: "Do you not love that Allah should forgive you?" },
    { ayah: 26, arabic: "الطَّيِّبَاتُ لِلطَّيِّبِينَ وَالطَّيِّبُونَ لِلطَّيِّبَاتِ", translation: "Good women are for good men, and good men are for good women." },
    { ayah: 30, arabic: "قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ", translation: "Tell the believing men to lower their gaze and guard their private parts." },
    { ayah: 35, arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ ۚ مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ", translation: "Allah is the Light of the heavens and the earth. The example of His light is like a niche within which is a lamp." },
    { ayah: 36, arabic: "فِي بُيُوتٍ أَذِنَ اللَّهُ أَن تُرْفَعَ وَيُذْكَرَ فِيهَا اسْمُهُ", translation: "In houses which Allah has permitted to be raised and in which His name is remembered." },
    { ayah: 39, arabic: "وَالَّذِينَ كَفَرُوا أَعْمَالُهُمْ كَسَرَابٍ بِقِيعَةٍ يَحْسَبُهُ الظَّمْآنُ مَاءً", translation: "And those who disbelieve — their deeds are like a mirage in a desert plain, which the thirsty one thinks is water." },
    { ayah: 40, arabic: "أَوْ كَظُلُمَاتٍ فِي بَحْرٍ لُّجِّيٍّ يَغْشَاهُ مَوْجٌ مِّن فَوْقِهِ مَوْجٌ مِّن فَوْقِهِ سَحَابٌ ۚ ظُلُمَاتٌ بَعْضُهَا فَوْقَ بَعْضٍ", translation: "Or like layers of darkness in a deep ocean, covered by waves, upon which are waves, upon which are clouds — darknesses, some of them upon others." },
    { ayah: 55, arabic: "وَعَدَ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَعَمِلُوا الصَّالِحَاتِ لَيَسْتَخْلِفَنَّهُمْ فِي الْأَرْضِ", translation: "Allah has promised those of you who believe and do righteous deeds that He will surely make them successors on earth." },
    { ayah: 64, arabic: "أَلَا إِنَّ لِلَّهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ ۖ قَدْ يَعْلَمُ مَا أَنتُمْ عَلَيْهِ", translation: "Unquestionably, to Allah belongs whatever is in the heavens and the earth. He already knows what you are upon." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Niche",
      subtitle: "Five movements: law → slander crisis → privacy → light and darkness → the household returns",
      sections: [
        { ayahs: "1–9", title: "The First Laws", color: "#e07a8a", desc: "The surah opens by naming itself — the only surah that does. Then immediate legislation: the punishment for fornication, the even greater gravity of false accusation (eighty lashes without four witnesses), and the li'an oath-procedure for a husband who accuses his wife with no witness but himself." },
        { ayahs: "10–26", title: "The Slander Crisis", color: "#C9A84C", isPivot: true, desc: "The ifk — the inversion. A lie about Aisha spread through the believing community for a month. The surah anatomizes how a lie travels: the failure to reject it, the passing along with tongues, the law la ('if only') constructions piling up like doors that should have been closed. Then the gentlest verse in the passage: 'Do you not love that Allah should forgive you?' And the verdict: good women for good men." },
        { ayahs: "27–34", title: "The Architecture of Privacy", color: "#4ecdc4", desc: "Having shown what happens when boundaries collapse, the surah builds them. Seek permission before entering homes. Lower the gaze — the root ghadd carries the image of holding back, diminishing. Encourage marriage. The walls that make domestic trust possible, legislated brick by brick after a specific collapse." },
        { ayahs: "35–40", title: "The Light and the Darkness", color: "#9b7fd4", desc: "Allah is the Light of the heavens and the earth. The nested metaphor: niche → lamp → glass → radiant star → oil from a blessed olive tree that nearly glows before fire touches it. Nur 'ala nur — light upon light. Then the counter-image: deeds of disbelievers as a mirage, then as layers of ocean darkness where you cannot see your own hand." },
        { ayahs: "41–64", title: "Cosmic Order & the Household Returns", color: "#4ecdc4", desc: "Everything in the heavens and earth glorifies Allah. The political promise: He will make the believers successors on earth. Then the surah returns to the domestic interior — children and servants seeking permission at three times of undress, the relaxation of dress norms for elderly women, permission to eat freely in relatives' homes. The final verse: He already knows what you are upon." },
      ],
    },
    chiasticRing: {
      title: "The Frame",
      subtitle: "The surah opens and closes in the household — divine legislation at the opening, divine knowledge at the closing",
      pairs: [
        {
          left: { label: "Self-Declaration", ayahs: "1", desc: "A surah We have sent down and made obligatory — the only surah that names its own genre" },
          right: { label: "Omniscience", ayahs: "64", desc: "He already knows what you are upon — the God who commands is the God who sees" },
          color: "#C9A84C",
        },
        {
          left: { label: "Sexual Ethics", ayahs: "2–9", desc: "The punishment for fornication and false accusation — the first laws, severe and immediate" },
          right: { label: "Household Returns", ayahs: "58–61", desc: "Children knocking before bedrooms, elderly women relaxing dress, eating together freely" },
          color: "#e07a8a",
        },
        {
          left: { label: "Slander & Collapse", ayahs: "10–26", desc: "The ifk crisis — trust shattered, boundaries breached, the community's darkest hour" },
          right: { label: "Succession & Security", ayahs: "55–57", desc: "Allah promises to make them successors — fear replaced by security, as light returns" },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Light Verse", ayahs: "35",
        desc: "Allah is the Light of the heavens and the earth — niche, lamp, glass, radiant star, oil that nearly glows without fire.",
        note: "The laws are the niche. The light is what lives inside them. Without the walls, the lamp is exposed. Without the lamp, the walls are dark.",
      },
    },
    deductiveFunnel: {
      title: "Light Upon Light",
      subtitle: "The nested metaphor of ayah 35 — each container holds something brighter than itself",
      layers: [
        { depth: 1, label: "The Niche (Mishkah)", ayah: "35a", arabic: "كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ", desc: "The outermost container — a recess in a wall that focuses and amplifies the light within it. The laws of the surah, the boundaries of the household, the protocols of privacy: these are the niche.", color: "#4ecdc4" },
        { depth: 2, label: "The Glass (Zujajah)", ayah: "35b", arabic: "الزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌ دُرِّيٌّ", desc: "The glass like a radiant star — kawkabun durriyyun. Not just transparent but luminous. The glass does not merely transmit light; it becomes a source of beauty in its own right.", color: "#9b7fd4" },
        { depth: 3, label: "The Blessed Tree", ayah: "35c", arabic: "زَيْتُونَةٍ لَّا شَرْقِيَّةٍ وَلَا غَرْبِيَّةٍ", desc: "An olive tree neither eastern nor western — la sharqiyyah wa la gharbiyyah. Universal, or otherworldly, or the point at which geography dissolves into metaphysics. The oil that fuels everything.", color: "#C9A84C" },
        { depth: 4, label: "Light Upon Light", ayah: "35d", arabic: "نُّورٌ عَلَىٰ نُورٍ", desc: "Nur 'ala nur. Illumination sourced by a deeper illumination, all the way down to a light that nearly shines without any external cause at all. Allah guides to His light whom He wills.", color: "#e07a8a" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "An-Nur generates its warning from within — from the community's own recent failure",
      absences: [
        { item: "No narratives of previous prophets", note: "No Musa, no Ibrahim, no destroyed nations. For a Madani surah of 64 ayahs, that is a striking omission. The surah is concerned entirely with the present community and its immediate moral life." },
        { item: "No discussion of the afterlife until the very end", note: "Its horizon is overwhelmingly this-worldly: how you live together, how you protect each other's honor, how you maintain the conditions in which light can dwell." },
        { item: "No appeal to sacred history for warnings", note: "The past it invokes is not Pharaoh's Egypt but last month's gossip. The ifk crisis — the slander of Aisha — is the surah's emotional engine. The severity of the punishments reflects the severity of the wound." },
        { item: "No mystical digression in the Light Verse", note: "Despite being the most celebrated metaphysical passage in the Quran, the Light Verse arrives not as an interruption of the legal material but as its explanation. The laws are the niche. The light is what lives inside them." },
        { item: "No separation between law and light", note: "Other surahs separate legislation from contemplation. An-Nur insists they are the same thing — moral order and divine light are identical. The community is always choosing between nur 'ala nur and zulumat ba'duha fawqa ba'd." },
      ],
    },
  },

  contentNodes: [
    { concept: "The Light Verse — mishkah, misbah, zujajah (24:35)", type: "surah-specific", articleSlug: "light-verse-24-35" },
    { concept: "The ifk — anatomy of how a lie travels (24:11–26)", type: "surah-specific", articleSlug: "ifk-slander-anatomy-24" },
    { concept: "Zulumat ba'duha fawqa ba'd — darkness upon darkness (24:40)", type: "cross-surah", articleSlug: "darkness-layers-24-40" },
    { concept: "The olive tree — from provision (23:20) to illumination (24:35)", type: "cross-surah", articleSlug: "olive-tree-provision-to-light" },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "niche", label: "Niche" },
  { id: "frame", label: "Frame" },
  { id: "light", label: "Light" },
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
        Niche → glass → blessed tree → light upon light
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
          {activeTab === "niche" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "frame" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "light" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
