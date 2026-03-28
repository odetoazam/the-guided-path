"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-MUMTAHINA — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-mumtahana
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Mumtahina",
  arabicName: "الممتحنة",
  meaning: "The Examined Woman",
  number: 60,
  ayahCount: 13,
  period: "Madani",
  juz: 28,
  movements: 5,
  thesis:
    "A surah that draws the line between loyalty and betrayal and then places hope at the center of the line — commanding the severance of alliances for the sake of faith while promising that the God who commands separation holds the power to transform enmity into love.",
  reflectionUrl: "/surahs/al-mumtahana",
  readTime: "22 min read",

  sciencesActive: [{"key":"makki_madani","english":"Revelation Context"},{"key":"usul_tafsir","english":"Principles of Interpretation"},{"key":"nasikh","english":"Abrogation"}],
  heartVerse: {
    arabic: "عَسَى اللَّهُ أَن يَجْعَلَ بَيْنَكُمْ وَبَيْنَ الَّذِينَ عَادَيْتُم مِّنْهُم مَّوَدَّةً",
    ayahRef: "60:7",
    translation: "Perhaps Allah will place between you and those of them with whom you have been at enmity, affection.",
    why: "The surah's hinge. In ayah 1, mawaddah (affection) was the forbidden emotion — extended secretly toward the enemy. In ayah 4, Ibrahim declared enmity. And now in ayah 7, Allah promises to transform that enmity into mawaddah. The same word, the same emotion, but the agency has shifted from human scheming to divine power. Fulfilled within two years when the Quraysh embraced Islam.",
  },

  audio: { surahNumber: 60, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَتَّخِذُوا عَدُوِّي وَعَدُوَّكُمْ أَوْلِيَاءَ تُلْقُونَ إِلَيْهِم بِالْمَوَدَّةِ", translation: "O you who believe, do not take My enemies and your enemies as allies, extending to them affection." },
    { ayah: 4, arabic: "قَدْ كَانَتْ لَكُمْ أُسْوَةٌ حَسَنَةٌ فِي إِبْرَاهِيمَ", translation: "There has already been for you an excellent example in Ibrahim." },
    { ayah: 7, arabic: "عَسَى اللَّهُ أَن يَجْعَلَ بَيْنَكُمْ وَبَيْنَ الَّذِينَ عَادَيْتُم مِّنْهُم مَّوَدَّةً", translation: "Perhaps Allah will place between you and those of them with whom you have been at enmity, affection." },
    { ayah: 8, arabic: "لَّا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ لَمْ يُقَاتِلُوكُمْ فِي الدِّينِ", translation: "Allah does not forbid you from those who do not fight you because of religion —" },
    { ayah: 9, arabic: "إِنَّمَا يَنْهَاكُمُ اللَّهُ عَنِ الَّذِينَ قَاتَلُوكُمْ فِي الدِّينِ", translation: "Allah only forbids you from those who fight you because of religion." },
    { ayah: 10, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا جَاءَكُمُ الْمُؤْمِنَاتُ مُهَاجِرَاتٍ فَامْتَحِنُوهُنَّ", translation: "O you who believe, when the believing women come to you as emigrants, examine them." },
    { ayah: 12, arabic: "يَا أَيُّهَا النَّبِيُّ إِذَا جَاءَكَ الْمُؤْمِنَاتُ يُبَايِعْنَكَ", translation: "O Prophet, when the believing women come to you pledging to you —" },
    { ayah: 13, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَتَوَلَّوْا قَوْمًا غَضِبَ اللَّهُ عَلَيْهِمْ", translation: "O you who believe, do not make allies of a people with whom Allah has become angry." },
  ],

  diagrams: {
    sectionJourney: {
      title: "The Anatomy of Allegiance",
      subtitle: "Five stages: betrayal → model → promise → distinction → examination",
      sections: [
        { ayahs: "1–3", title: "The Betrayal", color: "#e07a8a", desc: "Hatib ibn Abi Balta'ah — a Badr veteran — sent a secret letter to the Quraysh warning them of the Muslim army. Not a hypocrite but a man caught between two loyalties. The surah opens by naming the act: you convey to them information out of mawaddah. The forbidden emotion is love misdirected." },
        { ayahs: "4–6", title: "Ibrahim's Model", color: "#9b7fd4", desc: "An excellent example — uswah hasanah — a designation given only to Ibrahim and Muhammad in the entire Quran. Ibrahim's declaration: we are dissociated from you, enmity and hatred forever until you believe. Then the exception: Ibrahim still prayed for his father. Even the model struggled with the emotional cost." },
        { ayahs: "7", title: "The Promise", color: "#C9A84C", isPivot: true, desc: "Perhaps Allah will place between you and those you have taken as enemies, mawaddah. The same word from ayah 1 — but now in God's hands, not human scheming. The promise was fulfilled when the Quraysh embraced Islam after the conquest. A single ayah. The surah's hinge." },
        { ayahs: "8–9", title: "The Distinction", color: "#4ecdc4", desc: "The scalpel-thin line that prevents the command of dissociation from becoming blanket hostility. Toward those who do not fight you: birr — the same word for the highest kindness owed to parents. Toward those who wage war: no alliance. Allah loves those who act justly." },
        { ayahs: "10–13", title: "The Examination and the Pledge", color: "#e07a8a", desc: "Emigrant women examined — imtahinuhunna — tested by pressing, like metal in fire. The women's bay'ah: obedience in what is ma'ruf — conditioned on what is right. Women pledge independently, as moral agents. The surah closes where it opened: do not take as allies those with whom Allah is angry." },
      ],
    },
    chiasticRing: {
      title: "The Chiasm of Loyalty",
      subtitle: "The surah begins and ends with the same prohibition — but the individual case has become a universal principle",
      pairs: [
        {
          left: { label: "Prohibition (Personal)", ayahs: "1–3", desc: "Do not take My enemies as allies — the Hatib incident. Mawaddah extended secretly, family loyalty competing with faith." },
          right: { label: "Prohibition (Communal)", ayahs: "10–13", desc: "Examine the emigrant women. The bay'ah. The closing prohibition. The individual case has become institutional principle." },
          color: "#e07a8a",
        },
        {
          left: { label: "Ibrahim's Dissociation", ayahs: "4–6", desc: "Enmity and hatred forever — the total break. But even Ibrahim could not stop praying for his father." },
          right: { label: "Birr and Qist", ayahs: "8–9", desc: "The qualification: dissociation is from combatants, not from peaceful neighbors. Birr — parental-level kindness — toward those who live in peace." },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Promise", ayahs: "7",
        desc: "Perhaps Allah will place between you and those you have taken as enemies, mawaddah — affection.",
        note: "The word mawaddah completes its arc: forbidden in human hands (ayah 1), now promised in divine hands (ayah 7). Every structural element points to this center — the reason for patience, the hope that makes separation endurable.",
      },
    },
    deductiveFunnel: {
      title: "The Journey of Mawaddah",
      subtitle: "A single Arabic word — mawaddah, deep affection — tracks the surah's entire argument",
      layers: [
        { depth: 1, label: "Mawaddah Forbidden", ayah: "1", arabic: "تُلْقُونَ إِلَيْهِم بِالْمَوَدَّةِ", desc: "Affection extended secretly toward the enemy. Hatib's letter — driven by love for family, not treachery, but still forbidden. You cannot manufacture reconciliation through secret diplomacy.", color: "#e07a8a" },
        { depth: 2, label: "'Adawah Declared", ayah: "4", arabic: "بَدَا بَيْنَنَا وَبَيْنَكُمُ الْعَدَاوَةُ وَالْبَغْضَاءُ أَبَدًا", desc: "Ibrahim's declaration: enmity and hatred forever. The opposite of mawaddah — a surgical separation. The model shows what the surah demands: principled dissociation, not cold indifference.", color: "#9b7fd4" },
        { depth: 3, label: "Mawaddah Promised", ayah: "7", arabic: "عَسَى اللَّهُ أَن يَجْعَلَ بَيْنَكُمْ ... مَّوَدَّةً", desc: "The same emotion, now in God's hands. The human attempt at reconciliation through betrayal was wrong. The divine act of reconciliation through transformation of hearts is promised. Fulfilled when Quraysh embraced Islam.", color: "#C9A84C" },
        { depth: 4, label: "Birr Commanded", ayah: "8", arabic: "أَن تَبَرُّوهُمْ وَتُقْسِطُوا إِلَيْهِمْ", desc: "Active goodness — birr — toward peaceful non-Muslims. The same word used for kindness owed to parents. The surah lands not on mawaddah but on birr: not secret affection but principled, visible justice.", color: "#4ecdc4" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah argues for costly allegiance without the expected motivational structure",
      absences: [
        { item: "No afterlife", note: "No paradise, no hellfire, no reckoning. For a surah commanding such costly allegiance, the expected motivation — do this and you will be rewarded — is entirely missing. The argument rests on Ibrahim's example, divine power over hearts, and the dignity of principled commitment." },
        { item: "No condemnation of Hatib", note: "The Prophet said: perhaps Allah has looked at the people of Badr and said: do what you wish, for I have forgiven you. The surah confronts the act but does not destroy the man. He was sincere — his error was in method, not loyalty." },
        { item: "No male mediation of women's pledge", note: "The bay'ah in ayah 12 is taken directly from women, on their own terms. Their covenant is with the Prophet, not mediated through male guardians. One of the earliest recognitions of independent female political agency." },
        { item: "No blanket hostility", note: "The surah draws the sharpest distinction: dissociation from combatants, birr toward non-combatants. The absence of any command to hate peaceful neighbors is itself a ruling." },
        { item: "No permanent enmity", note: "Ibrahim said 'forever' — but ayah 7 promises that God can dissolve the enmity. The surah refuses the assumption that the separation is the final word." },
      ],
    },
  },

  contentNodes: [
    { concept: "Mawaddah — the word that tracks the surah's entire argument", type: "surah-specific", articleSlug: "mawaddah-journey-60" },
    { concept: "The women's bay'ah — independent female political agency", type: "surah-specific", articleSlug: "womens-bayah-60-12" },
    { concept: "Ibrahim's dissociation across Al-Mumtahina and Al-Tawbah", type: "cross-surah", articleSlug: "ibrahim-dissociation-60-9" },
    { concept: "Birr — parental kindness applied to interfaith ethics", type: "cross-surah", articleSlug: "birr-interfaith-ethics-60-8" },
  ],
};

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "chiasm", label: "Chiasm" },
  { id: "mawaddah", label: "Mawaddah" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

function OrnamentDivider() { return ( <div className="flex items-center gap-3 py-2"> <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /> <span className="text-gold-500/50 text-sm">۞</span> <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /> </div> ); }
function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) { const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const audioRef = useRef<HTMLAudioElement>(null); const progressRef = useRef<HTMLDivElement>(null); const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`; const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); }; const seekTo = (clientX: number) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => { e.preventDefault(); (e.target as HTMLDivElement).setPointerCapture(e.pointerId); seekTo(e.clientX); };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (e.buttons === 0) return; seekTo(e.clientX); }; const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; }; return ( <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"> <div className="flex items-center gap-3"> <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button> <div className="flex-1 min-w-0"> <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div> <div ref={progressRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative touch-none"> <div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div> </div> </div> <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div> </div> <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} /> </div> ); }
function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return ( <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"> <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p> <p className="text-sm italic text-cream/70 font-body">{verse.translation}</p> <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p> </div> ); }
function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) { return ( <div className="space-y-5">{verses.map((v) => ( <div key={v.ayah} className="space-y-1"> <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic}{" "}<span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p> <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p> </div> ))}</div> ); }
function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-3">{data.sections.map((sec, i) => ( <div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span> <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span> </div> <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p> {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>} </div> ))}</div> </div> ); }
function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> {data.pairs.map((pair, i) => ( <div key={i} className="flex gap-2"> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}> <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div> <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p> </div> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}> <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div> <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p> </div> </div> ))} <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"> <div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div> <p className="text-sm italic text-cream font-body">{data.center.desc}</p> <p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p> </div> </div> ); }
function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) { const [expanded, setExpanded] = useState<number | null>(null); return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-2">{data.layers.map((layer, i) => ( <button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span> <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span> </div> <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p> {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>} </button> ))}</div> <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Forbidden affection → declared enmity → promised love → commanded justice</div> </div> ); }
function AbsenceMap({ data }: { data: typeof SURAH_DATA.diagrams.absenceMap }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-3">{data.absences.map((a, i) => ( <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 space-y-2"> <div className="text-sm font-semibold text-[#e07a8a] font-sans">∅ {a.item}</div> <p className="text-sm text-cream/70 leading-relaxed font-body">{a.note}</p> </div> ))}</div> </div> ); }

export default function SurahArchitecture() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const d = SURAH_DATA;
  return (
    <div className="min-h-screen bg-navy-dark text-cream">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-0">
        <header className="text-center space-y-3 pb-4">
          <p className="text-xs tracking-[0.3em] text-cream-muted/50 uppercase font-sans">Surah {d.number} · {d.period}</p>
          <p className="text-5xl text-gold-500 font-amiri">{d.arabicName}</p>
          <h1 className="text-2xl font-serif text-cream">{d.name}</h1>
          <p className="text-sm text-cream-muted/60 font-sans">{d.meaning}</p>
          <p className="text-sm text-cream/70 leading-relaxed max-w-md mx-auto pt-1 font-body italic">{d.thesis}</p>
          <div className="flex justify-center gap-10 pt-4">
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.ayahCount}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Ayahs</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">{d.movements}</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Movements</div></div>
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">1</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Pivot</div></div>
          </div>
        </header>
        <OrnamentDivider />


        <AudioPlayer audio={d.audio} />
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => ( <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button> ))}
          </div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "chiasm" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "mawaddah" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
          {activeTab === "absent" && <AbsenceMap data={d.diagrams.absenceMap} />}
          {activeTab === "text" && ( <div className="space-y-6"> <FullSurahText verses={d.fullText} /> <OrnamentDivider /> <HeartVerse verse={d.heartVerse} /> <AudioPlayer audio={d.audio} /> </div> )}
        </div>
        <OrnamentDivider />
        <a href={d.reflectionUrl} className="block rounded-xl bg-gold-500/5 border border-gold-500/20 p-5 text-center space-y-1 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all">
          <div className="text-sm font-semibold text-gold-500 tracking-wide font-sans uppercase">Go Deeper</div>
          <div className="text-sm text-cream font-serif">Read the Full Reflection</div>
          <div className="text-xs text-cream-muted/50 font-sans">{d.readTime} · The complete written exploration</div>
        </a>
      </div>
    </div>
  );
}
