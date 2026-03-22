"use client";
import React, { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SURAH AL-HASHR — Visual Architecture Page (v3 — brand-aligned)
// Generated from vetted written article at /surahs/al-hashr
// ══════════════════════════════════════════════════════════════════════════════

const SURAH_DATA = {
  name: "Al-Hashr",
  arabicName: "الحشر",
  meaning: "The Gathering / The Exile",
  number: 59,
  ayahCount: 24,
  period: "Madani",
  juz: 28,
  movements: 4,
  thesis:
    "A surah that demolishes every false fortress, exposes every hollow alliance, and then — in the clearing that remains — names God with a density and beauty that makes the demolition feel like mercy.",
  reflectionUrl: "/surahs/al-hashr",
  readTime: "24 min read",

  heartVerse: {
    arabic: "لَوْ أَنزَلْنَا هَـٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ",
    ayahRef: "59:21",
    translation: "Had We sent down this Quran upon a mountain, you would have seen it humbled, cracking apart from the fear of Allah.",
    why: "A mountain — the most stable, massive, immovable thing in the human landscape — would shatter under the weight of this revelation. If stone would crack, what should a human heart do? The image is both a rebuke and an invitation, placed just before the cascade of divine Names that closes the surah.",
  },

  audio: { surahNumber: 59, reciter: "ar.alafasy" },

  fullText: [
    { ayah: 1, arabic: "سَبَّحَ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۖ وَهُوَ الْعَزِيزُ الْحَكِيمُ", translation: "Whatever is in the heavens and whatever is on earth has declared the perfection of Allah, and He is the Almighty, the Wise." },
    { ayah: 2, arabic: "هُوَ الَّذِي أَخْرَجَ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ مِن دِيَارِهِمْ", translation: "He is the One who expelled those who disbelieved among the People of the Book from their homes." },
    { ayah: 9, arabic: "وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ", translation: "They prefer others over themselves, even though they are in dire need." },
    { ayah: 10, arabic: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ", translation: "Our Lord, forgive us and our brothers who preceded us in faith." },
    { ayah: 16, arabic: "كَمَثَلِ الشَّيْطَانِ إِذْ قَالَ لِلْإِنسَانِ اكْفُرْ", translation: "Like the example of Satan when he says to a human being: Disbelieve." },
    { ayah: 19, arabic: "نَسُوا اللَّهَ فَأَنسَاهُمْ أَنفُسَهُمْ", translation: "They forgot Allah, so He made them forget themselves." },
    { ayah: 21, arabic: "لَوْ أَنزَلْنَا هَـٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ", translation: "Had We sent down this Quran upon a mountain, you would have seen it humbled, cracking apart from the fear of Allah." },
    { ayah: 22, arabic: "هُوَ اللَّهُ الَّذِي لَا إِلَـٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ ۖ هُوَ الرَّحْمَـٰنُ الرَّحِيمُ", translation: "He is Allah, other than whom there is no deity, Knower of the unseen and the witnessed. He is the Most Merciful, the Especially Merciful." },
    { ayah: 23, arabic: "هُوَ اللَّهُ الَّذِي لَا إِلَـٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ", translation: "He is Allah — the Sovereign, the Pure, the Perfection, the Bestower of Faith, the Overseer, the Almighty, the Compeller, the Supreme." },
    { ayah: 24, arabic: "هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ ۖ لَهُ الْأَسْمَاءُ الْحُسْنَىٰ", translation: "He is Allah, the Creator, the Originator, the Fashioner. To Him belong the most beautiful names." },
  ],

  diagrams: {
    sectionJourney: {
      title: "From Fortress to Names",
      subtitle: "Four movements: exile → wealth's flow → hollow alliances → the Names unveiled",
      sections: [
        { ayahs: "1–5", title: "The Exile", color: "#e07a8a", desc: "Everything glorifies Allah — then immediately: He expelled those who disbelieved. They thought their fortresses would protect them. But Allah came from where they did not expect. They destroyed their own homes with their own hands. The most permanent structures reduced to rubble by the very people who built them." },
        { ayahs: "6–10", title: "Fay' and the Believing Community", color: "#4ecdc4", desc: "Wealth that was not won in battle but restored to its rightful purpose — fay'. The principle: wealth must not become a perpetual circulation among the rich. The Muhajirun who lost everything, the Ansar who preferred others over themselves even in poverty, and the prayer that knits every generation: forgive us and our brothers who preceded us in faith." },
        { ayahs: "11–17", title: "Hollow Alliances and the Shaytan Parable", color: "#9b7fd4", isPivot: true, desc: "The hypocrites promised: if you are expelled, we will leave with you. Allah testifies: they are liars. They fear the believers more than they fear God. Then the parable — Shaytan says 'disbelieve,' and when his victim complies, says 'I am free of you — I fear Allah.' The pattern of every false alliance: incitement followed by abandonment." },
        { ayahs: "18–24", title: "The Reckoning and the Names", color: "#C9A84C", desc: "Let every soul look to what it has sent forward for tomorrow. Those who forgot Allah were made to forget themselves. A mountain would crack under this Quran. And then the Names arrive — al-Malik, al-Quddus, as-Salam, al-Mu'min, al-Muhaymin — sixteen names in three ayahs, a divine self-portrait painted in a single breath. The surah ends where it began: everything glorifies Him." },
      ],
    },
    chiasticRing: {
      title: "The Ring of Tasbeeh",
      subtitle: "Opens with glorification as a fact — closes with glorification as an arrival, after you know who is being glorified",
      pairs: [
        {
          left: { label: "Tasbeeh (Past)", ayahs: "1", desc: "Sabbaha — has glorified. Past tense. Creation already accomplished this. The human listener enters a surah already in motion." },
          right: { label: "Tasbeeh (Ongoing)", ayahs: "24", desc: "Yusabbihu — glorifies. Present/continuous. After everything the surah has shown, the declaration is now lived reality, not just stated fact." },
          color: "#C9A84C",
        },
        {
          left: { label: "Fortresses Demolished", ayahs: "2–5", desc: "Banu Nadir expelled — walls that could not protect against Allah. Physical structures crumbled by their own builders." },
          right: { label: "Mountain Crumbles", ayahs: "21", desc: "A mountain — stronger than any fortress — imagined cracking before the Quran. If walls cannot protect and mountains cannot withstand, what remains?" },
          color: "#e07a8a",
        },
        {
          left: { label: "Wealth Flows", ayahs: "6–10", desc: "Fay' distributed — Muhajirun, Ansar, and the prayer for every generation. Wealth as circulation, not accumulation." },
          right: { label: "Taqwa Called", ayahs: "18–20", desc: "Be mindful of Allah — let every soul see what it has prepared for tomorrow. Those who forgot Him were made to forget themselves." },
          color: "#4ecdc4",
        },
      ],
      center: {
        label: "The Shaytan Parable", ayahs: "16–17",
        desc: "Like Shaytan when he says 'Disbelieve' — then when the human disbelieves, he says: 'I am free of you. I fear Allah.'",
        note: "The pivot universalizes the historical narrative. The betrayal of Banu Nadir and the hypocrites becomes the permanent pattern of every false alliance: incitement, then abandonment. Both end in the Fire.",
      },
    },
    deductiveFunnel: {
      title: "The Taxonomy of Fear",
      subtitle: "Three kinds of fear — and the surah asks which one governs you",
      layers: [
        { depth: 1, label: "Ru'b — Terror", ayah: "2", arabic: "وَقَذَفَ فِي قُلُوبِهِمُ الرُّعْبَ", desc: "The terror Allah cast into the hearts of Banu Nadir. Involuntary, overwhelming, destructive — the fear of those who built on the wrong foundation and discovered it too late.", color: "#e07a8a" },
        { depth: 2, label: "Disordered Fear", ayah: "13", arabic: "لَأَنتُمْ أَشَدُّ رَهْبَةً فِي صُدُورِهِم مِّنَ اللَّهِ", desc: "The hypocrites fear social consequences more than they fear God. Their courage calculus is entirely wrong — their hierarchy of fears inverted.", color: "#9b7fd4" },
        { depth: 3, label: "Nisyan — Forgetting", ayah: "19", arabic: "نَسُوا اللَّهَ فَأَنسَاهُمْ أَنفُسَهُمْ", desc: "They forgot Allah, so He made them forget themselves. Not fear but the absence of it — the loss of self that comes from losing awareness of the One who made you.", color: "#4ecdc4" },
        { depth: 4, label: "Khashya — Awe", ayah: "21", arabic: "خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ", desc: "A mountain cracking from khashya — reverential awe, appropriate fear, recognition of what you are standing before. The right fear. The one that leads to the Names.", color: "#C9A84C" },
      ],
    },
    absenceMap: {
      title: "What's Missing",
      subtitle: "The surah strips away every false support, then shows you what remains",
      absences: [
        { item: "No battlefield imagery", note: "The Banu Nadir were expelled after a siege, but the surah explicitly says no horses or camels were ridden against them. The victory came through terror cast into hearts. Combat language is absent — the point is what Allah does when human effort is secondary." },
        { item: "No previous prophets' stories", note: "For a surah about a community rejecting prophetic authority, there is no parade of earlier prophets. No Musa, no Nuh. The weight of precedent is replaced by the weight of the divine Names at the end." },
        { item: "No gradual introduction of the Names", note: "The Names arrive in a flood — sixteen in three ayahs. The surah does not prepare you gently. It demolishes, clears, warns, and then opens the floodgates." },
        { item: "No escape from the Shaytan pattern", note: "The parable offers no third option — the inciter and the incited both end in the Fire. The shared destination despite the disavowal is the parable's final cut." },
        { item: "No self-knowledge without God-knowledge", note: "Those who forgot Allah were made to forget themselves. The surah insists you cannot know yourself while ignoring the One who made you." },
      ],
    },
  },

  contentNodes: [
    { concept: "The sixteen Names — 59:22-24's concentrated divine portrait", type: "surah-specific", articleSlug: "sixteen-names-59-22-24" },
    { concept: "Ithar — the Ansar's selfless generosity in 59:9", type: "surah-specific", articleSlug: "ithar-ansar-59-9" },
    { concept: "The Shaytan parable across Al-Anfal and Al-Hashr", type: "cross-surah", articleSlug: "shaytan-parable-8-48-59-16" },
    { concept: "The Musabbihat family — surahs that open with glorification", type: "cross-surah", articleSlug: "musabbihat-family" },
  ],
};

const TABS = [
  { id: "journey", label: "Journey" },
  { id: "ring", label: "Ring" },
  { id: "fear", label: "Fear" },
  { id: "absent", label: "Absences" },
  { id: "text", label: "Text" },
];

function OrnamentDivider() { return ( <div className="flex items-center gap-3 py-2"> <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /> <span className="text-gold-500/50 text-sm">۞</span> <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" /> </div> ); }
function AudioPlayer({ audio }: { audio: typeof SURAH_DATA.audio }) { const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [currentTime, setCurrentTime] = useState(0); const [duration, setDuration] = useState(0); const audioRef = useRef<HTMLAudioElement>(null); const progressRef = useRef<HTMLDivElement>(null); const src = `https://cdn.islamic.network/quran/audio-surah/128/${audio.reciter}/${audio.surahNumber}.mp3`; const toggle = () => { if (!audioRef.current) return; playing ? audioRef.current.pause() : audioRef.current.play(); setPlaying(!playing); }; const seek = (e: React.MouseEvent<HTMLDivElement>) => { if (!audioRef.current || !progressRef.current) return; const rect = progressRef.current.getBoundingClientRect(); const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)); audioRef.current.currentTime = pct * audioRef.current.duration; }; const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, "0")}`; }; return ( <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 space-y-2"> <div className="flex items-center gap-3"> <button onClick={toggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-dark text-sm transition-colors hover:bg-gold-400" aria-label={playing ? "Pause" : "Play"}>{playing ? "⏸" : "▶"}</button> <div className="flex-1 min-w-0"> <div className="text-xs text-cream-muted/60 mb-1 font-sans">Mishary Rashid Alafasy</div> <div ref={progressRef} onClick={seek} className="h-1.5 rounded-full bg-white/[0.06] cursor-pointer group relative"> <div className="h-full rounded-full bg-gold-500 transition-all duration-200 relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" /></div> </div> </div> <div className="text-xs text-cream-muted/60 tabular-nums shrink-0 font-sans">{fmt(currentTime)}/{fmt(duration)}</div> </div> <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onTimeUpdate={(e) => { const t = e.currentTarget; setCurrentTime(t.currentTime); setProgress(t.duration ? (t.currentTime / t.duration) * 100 : 0); }} onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }} /> </div> ); }
function HeartVerse({ verse }: { verse: typeof SURAH_DATA.heartVerse }) { return ( <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3"> <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{verse.arabic}</p> <p className="text-sm italic text-cream/70 font-body">{verse.translation}</p> <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p> </div> ); }
function FullSurahText({ verses }: { verses: typeof SURAH_DATA.fullText }) { return ( <div className="space-y-5">{verses.map((v) => ( <div key={v.ayah} className="space-y-1"> <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: "rtl" }}>{v.arabic}{" "}<span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span></p> <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p> </div> ))}</div> ); }
function SectionJourney({ data }: { data: typeof SURAH_DATA.diagrams.sectionJourney }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-3">{data.sections.map((sec, i) => ( <div key={i} className={`rounded-xl p-4 space-y-2 border ${sec.isPivot ? "border-gold-500/40" : "border-white/[0.06]"}`} style={{ backgroundColor: sec.color + "0a", borderLeftWidth: "3px", borderLeftColor: sec.color }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-serif" style={{ color: sec.color }}>{sec.title}</span> <span className="text-xs text-cream-muted/50 font-sans">Ayahs {sec.ayahs}</span> </div> <p className="text-sm text-cream/70 leading-relaxed font-body">{sec.desc}</p> {sec.isPivot && <div className="text-xs text-gold-500 font-medium font-sans">✦ Structural pivot</div>} </div> ))}</div> </div> ); }
function ChiasticRing({ data }: { data: typeof SURAH_DATA.diagrams.chiasticRing }) { return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> {data.pairs.map((pair, i) => ( <div key={i} className="flex gap-2"> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderLeftWidth: "3px", borderLeftColor: pair.color }}> <div className="text-xs font-semibold font-sans" style={{ color: pair.color }}>{pair.left.label} <span className="text-cream-muted/50">v.{pair.left.ayahs}</span></div> <p className="text-xs text-cream/60 mt-1 font-body">{pair.left.desc}</p> </div> <div className="flex-1 rounded-xl p-3 border border-white/[0.06]" style={{ borderRightWidth: "3px", borderRightColor: pair.color }}> <div className="text-xs font-semibold text-right font-sans" style={{ color: pair.color }}><span className="text-cream-muted/50">v.{pair.right.ayahs}</span> {pair.right.label}</div> <p className="text-xs text-cream/60 mt-1 text-right font-body">{pair.right.desc}</p> </div> </div> ))} <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 text-center space-y-2"> <div className="text-sm font-semibold text-gold-500 font-serif">✦ {data.center.label} <span className="text-cream-muted/50 font-sans text-xs">v.{data.center.ayahs}</span></div> <p className="text-sm italic text-cream font-body">{data.center.desc}</p> <p className="text-xs text-cream-muted/60 font-body">{data.center.note}</p> </div> </div> ); }
function DeductiveFunnel({ data }: { data: typeof SURAH_DATA.diagrams.deductiveFunnel }) { const [expanded, setExpanded] = useState<number | null>(null); return ( <div className="space-y-5"> <div> <h3 className="text-lg font-serif text-cream">{data.title}</h3> <p className="text-sm text-cream-muted/60 mt-1 font-body">{data.subtitle}</p> </div> <div className="space-y-2">{data.layers.map((layer, i) => ( <button key={i} onClick={() => setExpanded(expanded === i ? null : i)} className="w-full text-left rounded-xl p-4 transition-all border border-white/[0.06] hover:border-white/[0.12]" style={{ backgroundColor: expanded === i ? layer.color + "12" : "transparent", borderLeftWidth: "3px", borderLeftColor: layer.color, marginLeft: `${layer.depth * 6}px` }}> <div className="flex items-center justify-between"> <span className="text-sm font-semibold font-sans" style={{ color: layer.color }}>{layer.depth}. {layer.label}</span> <span className="text-xs text-cream-muted/50 font-sans">v.{layer.ayah}</span> </div> <p className="text-base text-cream-muted/50 mt-1 text-right font-amiri" style={{ direction: "rtl" }}>{layer.arabic}</p> {expanded === i && <p className="text-sm text-cream/70 mt-3 leading-relaxed font-body">{layer.desc}</p>} </button> ))}</div> <div className="text-center text-xs text-cream-muted/50 font-sans tracking-wide">Terror → disordered fear → forgetting → awe</div> </div> ); }
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
            <div className="text-center"><div className="text-2xl font-bold text-gold-500 font-serif">16</div><div className="text-[10px] tracking-wider text-cream-muted/50 uppercase font-sans">Names</div></div>
          </div>
        </header>
        <OrnamentDivider />
        <div className="sticky z-40 bg-navy-dark/95 backdrop-blur-sm pt-2 pb-0" style={{ top: 67 }}>
          <div className="flex gap-1 rounded-xl bg-white/[0.03] p-1">
            {TABS.map((tab) => ( <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 rounded-lg py-2.5 text-xs font-medium font-sans transition-all ${activeTab === tab.id ? "bg-gold-500 text-navy-dark shadow-sm" : "text-cream-muted/60 hover:text-cream hover:bg-white/[0.04]"}`}>{tab.label}</button> ))}
          </div>
        </div>
        <div className="min-h-[400px] pt-6 pb-8">
          {activeTab === "journey" && <SectionJourney data={d.diagrams.sectionJourney} />}
          {activeTab === "ring" && <ChiasticRing data={d.diagrams.chiasticRing} />}
          {activeTab === "fear" && <DeductiveFunnel data={d.diagrams.deductiveFunnel} />}
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
