// Braintrust v3 — DIVERSIFIED ideation. Deliberately NOT frequency-counting (per Azam 2026-07-20:
// "the magic sauce is in the 'something else'"). Six non-count lenses hunt structural / rhetorical /
// dialogical / intertextual patterns. Verification shifts from "re-run the count" to "is the textual
// substrate right AND is the reading grounded in the tradition rather than imposed on the text."
// Pipeline: Mine -> Ground-check -> Propose -> Critique -> Skeptic(veto) -> Deliberate.
export const meta = {
  name: 'braintrust-v3-diversified',
  description: 'Diversified (non-count) article ideation: 6 structural/rhetorical/dialogical lenses, grounding-verified, 4-advisor panel + skeptic veto + portfolio deliberation',
  phases: [
    { title: 'Mine', detail: '6 non-count lenses (iltifat, nazm, ring, grammar-choice, intertext, divine-response)' },
    { title: 'Ground', detail: 'confirm textual substrate + reading is grounded, not imposed' },
    { title: 'Propose', detail: '4 advisors draft proposals' },
    { title: 'Critique', detail: 'advisors cross-critique all outside slates' },
    { title: 'Skeptic', detail: 'adversarial: is the pattern REAL or imposed? veto power' },
    { title: 'Deliberate', detail: 'recommended-3 portfolio + ranked reserve' },
  ],
}

const REPO = '/Users/azamkhan/the-guided-path'
const LEDGERS = REPO + '/scripts/braintrust-v2/ledgers'
const MEMDIR = '/Users/azamkhan/.claude/projects/-Users-azamkhan-the-guided-path/memory'
const runDate = '2026-07-20'

const DATA_BLOCK = `
DATA & TOOLS (paths relative to ${REPO}, your working dir):
- scripts/.corpus-cache/quranic-corpus.json — dict "S:A" -> [segments {loc,word,pos,root,lemma,features}], mushaf order. Verb/pronoun features encode PERSON-GENDER-NUMBER (1S,2MS,3MP,3FS...), PERF/IMPF/IMPV (tense/aspect), PASS (passive), MOOD, VF:1-10 (form). Pronoun person shifts, tense, voice, and word-order are all READABLE from features + segment order — so "the pronoun shifts from 3rd to 2nd here" or "this is past tense for a future event" is MECHANICALLY checkable.
- node_modules/quran-validator/data/quran-verses.json — [{surah,ayah,text(Uthmani),textSimple}].
- Bash: node scripts/cross_reference_tafsir.mjs --surah S --ayahs A[-B]  → pulls Ibn Kathir(EN), al-Tabari, al-Muyassar, al-Jalalayn for grounding. USE THIS to check whether the classical tradition SAW your pattern (iltifat, nazm, word-order, ring) — if a mufassir/balaghi noted it, the reveal is RECOVERED tafsir (strong). If none did, you MUST flag it as a modern reading offered as reflection.
`

const RULES_BLOCK = `
NON-NEGOTIABLE (from Azam):
- This run must NOT be about "how many times a word appears." Frequency counts may appear only as incidental support, never as the reveal. The reveal is a STRUCTURE, a CHOICE, a SHIFT, a DIALOGUE, or a DIVERGENCE.
- ANTI-FABRICATION (critical for non-count patterns — they're easy to invent): every reveal needs (a) a checkable textual substrate — exact verses + the specific grammatical/structural fact (pronoun person, tense, word-order, adjacency), and (b) grounding: EITHER a named classical source (mufassir or balaghi — al-Jurjani, al-Zamakhshari, al-Razi, al-Tabari, al-Baqillani) who read it this way, OR an explicit "this is a modern reading, offered as reflection not classical claim" flag. Zaynab's rule: mark literary observation as literary, balagha as balagha — never dress one as the other.
- Quran-only payoff (no hadith-dependent reveal — policy 2026-07-17). Simple layman prose. No unprovable superlatives. First/last = mushaf order.
- OVERLAP GUARD, hard: check scripts/braintrust-v2/published-articles.md (185 articles) AND remember the site also has ~293 ayah tadabbur files + 114 surah pages that may already note structural/rhetorical points. The count-run just got 4 proposals REFUTED for re-discovering the site's OWN content. If unsure a reveal is already live, say so in overlap_note and how yours differs.
`

const LENSES = [
  { key:'ILTIFAT', tier:'xhigh', name:'Iltifat — the sudden shift in person/pronoun',
    brief:`The Quran shifts speaker or addressee mid-passage — 3rd person to 2nd ("about Him" -> "to You"), singular to plural, past to present — and the shift lands at a MEANINGFUL hinge. Zaynab al-Mansouri's PhD was on iltifat in Surah Yusuf. Seed: Al-Fatiha turns from "the Master of the Day" (about God) to "You alone we worship" (to God) exactly at the turn toward worship. Hunt passages where a person/number/tense shift is doing interpretive work, and pin WHY at that exact word. Read pronoun PERSON from corpus features. Check cross_reference_tafsir — classical balagha named iltifat explicitly, so many are recoverable. Do NOT re-use Al-Fatiha's main shift if already covered.` },
  { key:'NAZM', tier:'high', name:'Nazm — why THIS verse sits next to THAT one',
    brief:`Munasaba / nazm: the argument made by the SEAM between adjacent verses or sections, not by any word. Seed: "no compulsion in religion" (2:256) sits immediately before Ayat al-Kursi (2:255 precedes it actually — check order) / the transition from a law to a story to an oath. Hunt adjacencies where verse Y placed after verse X changes how you read both — a ruling followed by a divine name, a story cut off exactly before its resolution and resumed later, an oath whose object explains the preceding claim. Adjacency is trivially checkable (verse order); the reveal is the LOGIC of the placement. Ground in al-Razi/al-Biqa'i (masters of munasaba) via tafsir where possible.` },
  { key:'RING', tier:'high', name:'Ring composition — a passage built to point at its center',
    brief:`Chiastic / ring structure: a unit arranged ABCB'A' so the first element mirrors the last, the second the second-to-last, and the CENTER carries the point. Seed: Surah al-Kahf's stories; short surahs with mirror-framed openings/closings. Hunt a passage or short surah whose two ends echo (same word/theme/grammar) and whose middle is the pivot the whole thing turns on. The reveal is the ARCHITECTURE and what sits at dead center. Support the mirror with shared words/roots (that's fine — it's evidence, not the reveal). Be honest: ring-composition claims are contested; state which correspondences are strong vs suggestive.` },
  { key:'GRAMMAR-CHOICE', tier:'xhigh', name:'The single grammatical choice that could have been otherwise',
    brief:`One deliberate choice at one point, where the ordinary alternative would have meant something different. Types: taqdim/ta'khir (fronting a word for emphasis — iyyaka na'budu puts the object first = "You ALONE"); tense-dislocation (Judgment Day narrated in PAST tense = certainty, "the Trumpet WAS blown"); definite vs indefinite ("a fire" vs "the fire"); active vs passive with hidden agent; hadhf (a deliberately omitted word/answer). This is the "form-decision table" Zaynab praised: Word | form/order used | the ordinary alternative | what the choice gains. All mechanically anchored in corpus features/text. Ground the significance in balagha/tafsir. Seed the tense one, the taqdim one, the definiteness one — find fresh instances.` },
  { key:'INTERTEXT', tier:'xhigh', name:'Intertextual divergence — the Quran retells a known story to make a different point',
    brief:`The Quran narrates stories shared with the Bible (Yusuf/Joseph, Musa/Moses, Maryam/Mary, Adam, Nuh, the Queen of Sheba) — and where it DIVERGES (adds, omits, reorders, reframes) is where it argues. Yasmin Farid's domain; serves Khalil & Yusuf (readers facing academic critique). Seed: the Quran's Yusuf gives him a direct revelation in the well (12:15) that Genesis has no equivalent for; the Quran's Joseph resists with "ma'adha Allah" where Genesis frames it differently. Hunt ONE meaningful divergence and read it as a deliberate theological choice — NOT a "the Quran corrects the Bible gotcha," but the different POINT each version makes. Handle with dignity to both texts (Yasmin's standard). Ground the Quranic side in tafsir; the Biblical side you may reference from general knowledge but keep it minimal and accurate. Copyright: do NOT quote the Bible at length — paraphrase the narrative difference.` },
  { key:'DIVINE-RESPONSE', tier:'high', name:'The shape of the divine answer to a specific human speech',
    brief:`A human speaks — a du'a, an objection, a boast, a question — and the Quran records God's RESPONSE, whose form mirrors, reforms, or pointedly does-not-match the request. Seed: Musa asks "show me (Yourself)" (7:143) and Ibrahim asks "show me how You give life" (2:260) — same verb arini, and God answers each completely differently (Musa: the mountain crumbles, a refusal-that-teaches; Ibrahim: do it yourself with the birds, a granting-that-teaches). Hunt request↔response pairs where the ANSWER'S shape is the reveal: what God gives vs what was asked, the exact word echoed back, the objection answered before it's finished. Refs are checkable; the mirroring is the interpretive reveal — ground it.` },
]

function minerPrompt(l) {
  return `You are a corpus reader "${l.key}" in AyahGuide's DIVERSIFIED article braintrust (run ${runDate}). AyahGuide publishes corpus-grounded reveal articles. THIS run deliberately avoids frequency-counting — we want structural/rhetorical/dialogical patterns, the "something else."
YOUR LENS: ${l.name}.
${l.brief}
${DATA_BLOCK}${RULES_BLOCK}
METHOD: don't grep for counts. READ passages closely (corpus text + run cross_reference_tafsir.mjs to see what the mufassirun noticed). Quality over quantity: 6-9 candidates, each a genuine structural/rhetorical move with a human payoff, not a statistic.
Each candidate:
{ "id":"${l.key}-<n>", "title_idea":"<layman title>", "reveal":"<the structural/rhetorical/dialogical move, in plain language + why it matters>", "substrate":"<the CHECKABLE textual facts: exact verses + the specific grammatical/structural fact — pronoun persons, tense, word-order, adjacency, mirror-correspondences>", "refs":["S:A",...], "grounding":"<named classical source who read it this way (mufassir/balaghi), OR 'modern reading — offered as reflection' if none>", "overlap_note":"<nearest published article/tadabbur + how this differs, or 'none found'>", "imposed_check":"<one sentence: why this pattern is genuinely IN the text, not projected onto it>", "angle":"<why a reader stops scrolling>" }
OUTPUT CONTRACT: 1) Write candidates JSON array to ${LEDGERS}/v3-mine-${l.key}.json. 2) Return { "insights":[...], "ledger_path":"..." }.`
}
const INSIGHTS_SCHEMA = { type:'object', required:['insights'], properties:{
  insights:{type:'array',items:{type:'object',required:['id','title_idea','reveal','substrate','refs'],properties:{
    id:{type:'string'},title_idea:{type:'string'},reveal:{type:'string'},substrate:{type:'string'},
    refs:{type:'array',items:{type:'string'}},grounding:{type:'string'},overlap_note:{type:'string'},imposed_check:{type:'string'},angle:{type:'string'}}}} } }

const GROUND_SCHEMA = { type:'object', required:['results'], properties:{
  results:{type:'array',items:{type:'object',required:['id','verdict','notes'],properties:{
    id:{type:'string'},verdict:{type:'string',enum:['CONFIRMED','NEEDS_HEDGE','REJECTED']},corrected:{type:'string'},notes:{type:'string'}}}} } }
function groundPrompt(chunk, lensKey, ci) {
  return `You are a GROUNDING verifier in AyahGuide's diversified braintrust. Non-count patterns are easy to invent, so your job is two-part, per candidate below:
(1) TEXTUAL SUBSTRATE — mechanically confirm the checkable facts with your own python3 (Bash) over scripts/.corpus-cache/quranic-corpus.json + quran-verses.json: verse refs exist, the claimed pronoun PERSON shift (read 1S/2MS/3MP etc. from features), tense (PERF/IMPF), voice (PASS), word-order/fronting, or adjacency is ACTUALLY there.
(2) IS IT IMPOSED? — judge whether the reading is genuinely in the text or projected onto it. Run cross_reference_tafsir.mjs (Bash) on the key verses to see if the classical tradition noticed it.
Verdict per candidate:
- CONFIRMED: substrate facts correct AND the reading is either classically grounded or a fair, clearly-flaggable modern reflection that the text actually supports.
- NEEDS_HEDGE: substrate correct but the reading overreaches / needs a "modern reading, not classical" flag / needs a correspondence downgraded from strong to suggestive — put the fixed framing in "corrected".
- REJECTED: a substrate fact is WRONG, or the pattern is imposed (not really in the text), or it's actually a disguised frequency-count, or it duplicates existing site content.
Working dir ${REPO}.
${DATA_BLOCK}
CANDIDATES:
${JSON.stringify(chunk, null, 1)}
OUTPUT CONTRACT: 1) Write results JSON to ${LEDGERS}/v3-ground-${lensKey}-${ci}.json. 2) Return { "results":[...] }.`
}

const MEM = MEMDIR
const ADVISORS = [
  { key:'ZAYNAB', name:'Dr. Zaynab al-Mansouri (Arabic linguistics & classical balaghah; iltifat is her specialty)', memfile: MEM+'/advisor_zaynab_al_mansouri.md' },
  { key:'HASAN', name:'Dr. Hasan al-Qasimi (classical tafsir, Al-Azhar + Oxford)', memfile: MEM+'/advisor_hasan_al_qasimi.md' },
  { key:'YASMIN', name:'Dr. Yasmin Farid (academic Quranic studies; intertextual/comparative is her domain)', memfile: MEM+'/advisor_yasmin_farid.md' },
  { key:'KHALID', name:'Ustadh Khalid Siddiqui (digital dawah, Muslim youth)', memfile: MEM+'/advisor_khalid_siddiqui.md' },
]
const PERSONA_BLOCK = `
FOUR READER PERSONAS (score 1-5; files at ${MEM}/persona_*.md): Amina (Reconnector, largest segment, contested-verse search, needs depth w/o Arabic prereqs); Khalil (Convert, top recommender, needs citations + ikhtilaf honesty); Sara (Questioning Parent, WhatsApp sharer, needs something she can SAY); Yusuf (Student, MSA multiplier, needs citable rigor).`
const ALREADY_SHIPPED = `Also avoid the 6 shipped this week (not yet in published-articles.md): qatalahum-allah-curse, orphan-shove-voice-flip, ibrahim-wife-laugh-strike, yusuf-decree-worship-none-but-him, two-who-wronged-themselves, khawiya-collapsed-roofs.`

const PROPOSALS_SCHEMA = { type:'object', required:['proposals'], properties:{ proposals:{type:'array',items:{type:'object',required:['id','title','thesis','exhibits'],properties:{
  id:{type:'string'},title:{type:'string'},thesis:{type:'string'},exhibits:{type:'array',items:{type:'string'}},personas:{type:'object'},risks:{type:'string'},why_now:{type:'string'}}}} } }
const CRITIQUE_SCHEMA = { type:'object', required:['critiques'], properties:{ critiques:{type:'array',items:{type:'object',required:['proposal_id','accuracy','freshness','audience','shippability','notes'],properties:{
  proposal_id:{type:'string'},accuracy:{type:'number'},freshness:{type:'number'},audience:{type:'number'},shippability:{type:'number'},fatal:{type:'boolean'},notes:{type:'string'}}}} } }
const SKEPTIC_SCHEMA = { type:'object', required:['proposal_id','verdict','notes'], properties:{
  proposal_id:{type:'string'},verdict:{type:'string',enum:['SURVIVES','REFUTED']},broken_claims:{type:'array',items:{type:'string'}},required_corrections:{type:'string'},notes:{type:'string'} } }
const DELIB_SCHEMA = { type:'object', required:['recommended','reserve','rationale'], properties:{
  recommended:{type:'array',items:{type:'object',required:['proposal_id','title','why'],properties:{proposal_id:{type:'string'},title:{type:'string'},why:{type:'string'},personas:{type:'object'},corrections_to_apply:{type:'string'}}}},
  reserve:{type:'array',items:{type:'object',required:['proposal_id','title','why'],properties:{proposal_id:{type:'string'},title:{type:'string'},why:{type:'string'}}}},
  rationale:{type:'string'} } }

function advisorPrompt(a, poolIndex) {
  return `You are ${a.name}, standing advisor to AyahGuide. FIRST read your persona file at ${a.memfile} and inhabit it. Run ${runDate}.
This is the DIVERSIFIED run — deliberately NOT frequency-counting. The pool below is structural/rhetorical/dialogical/intertextual reveals; each textual substrate was mechanically confirmed and each reading grounding-checked (REJECTED ones removed; for NEEDS_HEDGE the corrected framing is authoritative). Full details in ${LEDGERS}/v3-mine-*.json + v3-ground-*.json.
VERIFIED POOL:
${poolIndex}
TASK: draft 5-6 article proposals through YOUR lens (you may combine). Each: { "id":"${a.key}-<n>","title"(layman, simple),"thesis"(2-3 plain sentences: the STRUCTURAL/rhetorical reveal + why it matters),"exhibits":["<ids>"],"personas":{"amina":1-5,"khalil":1-5,"sara":1-5,"yusuf":1-5,"note":"..."},"risks":"...","why_now":"..." }
HARD: Quran-only; the reveal must be a structure/choice/shift/dialogue/divergence, NOT a word-count; every rhetorical claim marked as classical-balagha vs modern-reading; check overlap vs ${REPO}/scripts/braintrust-v2/published-articles.md. ${ALREADY_SHIPPED}
${PERSONA_BLOCK}
OUTPUT: 1) Write proposals JSON to ${LEDGERS}/v3-propose-${a.key}.json. 2) Return { "proposals":[...] }.`
}
function critiquePrompt(a, othersJson) {
  return `You are ${a.name}, standing advisor to AyahGuide. Read your persona file at ${a.memfile} and inhabit it. CROSS-CRITIQUE: proposals from the OTHER three advisors below (your slate excluded).
Score EVERY proposal 1-10 through your lens: accuracy (is the structural/rhetorical claim REAL and correctly marked classical-vs-modern? penalize imposed readings, superlatives, disguised counts), freshness (read ${REPO}/scripts/braintrust-v2/published-articles.md; ${ALREADY_SHIPPED} penalize anything the site likely already says), audience (persona pull), shippability. "fatal":true only if it must NOT ship as-is. Notes: 1-3 sharp sentences in your voice.
PROPOSALS:
${othersJson}
OUTPUT: 1) Write critiques JSON to ${LEDGERS}/v3-critique-${a.key}.json. 2) Return { "critiques":[...] }.`
}
function skepticPrompt(p, exhibitsJson) {
  return `You are an adversarial fact-checker with VETO power in AyahGuide's diversified braintrust. BREAK the proposal below. For NON-COUNT patterns your PRIMARY attack is: IS THE PATTERN REAL OR IMPOSED? Working dir ${REPO}.
${DATA_BLOCK}
ATTACK (own python3 + cross_reference_tafsir via Bash): 1) confirm the textual substrate (refs, pronoun person, tense, voice, word-order, adjacency, mirror-correspondences) — any wrong fact that the reveal leans on -> REFUTED; 2) IMPOSED TEST — is this reading actually in the text or projected? Did ANY classical source see it, or is it a modern claim wearing classical clothes (Zaynab's cardinal sin)? If it's presented as classical balagha but no one read it so, REFUTED unless reframed as modern reflection; 3) DISGUISED-COUNT test — if the "reveal" secretly reduces to "this word appears N times," REFUTED (this run is meant to avoid that); 4) overlap vs ${REPO}/scripts/braintrust-v2/published-articles.md AND the site's own tadabbur/surah pages — the last run lost 4 proposals to self-overlap, so hunt it; 5) Quran-only (hadith payoff -> REFUTED); 6) hostile one-tweet rebuttal. Soft spots -> required_corrections; load-bearing failure -> REFUTED.
PROPOSAL:
${JSON.stringify(p, null, 1)}
EXHIBITS:
${exhibitsJson}
OUTPUT: 1) Write verdict JSON to ${LEDGERS}/v3-skeptic-${p.id}.json. 2) Return { "proposal_id","verdict","broken_claims","required_corrections","notes" }.`
}

// ==================== EXECUTION ====================
phase('Mine')
log('Diversified run: 6 non-count lenses (iltifat/grammar-choice/intertext @ xhigh, nazm/ring/divine-response @ high)')
const mined = await pipeline(
  LENSES,
  l => agent(minerPrompt(l), { label:'mine:'+l.key, phase:'Mine', schema:INSIGHTS_SCHEMA, effort:l.tier }),
  (res, l) => {
    if (!res || !res.insights || !res.insights.length) return null
    const insights = res.insights.map(i => ({ ...i, lens:l.key, tier:l.tier }))
    const chunks = []; for (let i=0;i<insights.length;i+=4) chunks.push(insights.slice(i,i+4))
    return parallel(chunks.map((ch,ci) => () =>
      agent(groundPrompt(ch, l.key, ci), { label:'ground:'+l.key+'-'+ci, phase:'Ground', schema:GROUND_SCHEMA, effort:'medium' })
        .then(v => ({ chunk:ch, ground:v }))))
  }
)
const pool = []
for (const lr of mined.filter(Boolean)) for (const pair of lr.filter(Boolean)) {
  const vd={}; if (pair.ground && pair.ground.results) for (const r of pair.ground.results) vd[r.id]=r
  for (const ins of pair.chunk) { const v=vd[ins.id]||{verdict:'UNVERIFIED',notes:'no grounding result'}
    pool.push({ ...ins, verdict:v.verdict, corrected:v.corrected||null, ground_notes:v.notes||'' }) }
}
const usable = pool.filter(i => i.verdict==='CONFIRMED' || i.verdict==='NEEDS_HEDGE')
log('Pool '+pool.length+' mined; '+usable.length+' grounded ('+pool.filter(i=>i.verdict==='REJECTED').length+' rejected as imposed/wrong/duplicate)')
const abTier={}; for (const t of ['high','xhigh']){ const m=pool.filter(i=>i.tier===t); abTier[t]={mined:m.length,confirmed:m.filter(i=>i.verdict==='CONFIRMED').length,hedge:m.filter(i=>i.verdict==='NEEDS_HEDGE').length,rejected:m.filter(i=>i.verdict==='REJECTED').length} }

if (usable.length < 6) { log('Too few grounded reveals — stopping before advisor spend'); return { aborted:'insufficient grounded pool', pool, abTier } }

phase('Propose')
const poolIndex = usable.map(i => `[${i.id}] (${i.lens},${i.verdict}) "${i.title_idea}" — ${i.verdict==='NEEDS_HEDGE'&&i.corrected?i.corrected:i.reveal} | SUBSTRATE: ${i.substrate} | REFS ${(i.refs||[]).join(',')} | GROUNDING: ${i.grounding||'?'} | OVERLAP: ${i.overlap_note||'?'}`).join('\n')
const POOL_BY_ID={}; for (const i of usable) POOL_BY_ID[i.id]=i
const slates = await parallel(ADVISORS.map(a => () =>
  agent(advisorPrompt(a, poolIndex), { label:'propose:'+a.key, phase:'Propose', schema:PROPOSALS_SCHEMA, effort:'high' })
    .then(r => ({ advisor:a.key, proposals:(r&&r.proposals)||[] }))))
const allProposals=[]; for (const s of slates.filter(Boolean)) for (const p of s.proposals) allProposals.push({ ...p, advisor:s.advisor })
log(allProposals.length+' proposals drafted')

phase('Critique')
const critiques = await parallel(ADVISORS.map(a => () => {
  const others = allProposals.filter(p => p.advisor !== a.key)
  return agent(critiquePrompt(a, JSON.stringify(others,null,1)), { label:'critique:'+a.key, phase:'Critique', schema:CRITIQUE_SCHEMA, effort:'high' })
    .then(r => ({ advisor:a.key, critiques:(r&&r.critiques)||[] })) }))
const scoreMap={}
for (const c of critiques.filter(Boolean)) for (const cr of c.critiques) {
  if (!scoreMap[cr.proposal_id]) scoreMap[cr.proposal_id]={total:0,n:0,fatals:0,notes:[]}
  const s=scoreMap[cr.proposal_id]; s.total+=(cr.accuracy||0)+(cr.freshness||0)+(cr.audience||0)+(cr.shippability||0); s.n+=1
  if(cr.fatal)s.fatals+=1; s.notes.push(c.advisor+': '+(cr.notes||'')) }
const ranked = allProposals.map(p=>({p,avg:scoreMap[p.id]?scoreMap[p.id].total/scoreMap[p.id].n:0,fatals:scoreMap[p.id]?scoreMap[p.id].fatals:0,critNotes:scoreMap[p.id]?scoreMap[p.id].notes:[]})).sort((x,y)=>y.avg-x.avg)
const top10 = ranked.filter(r=>r.fatals<2).slice(0,10)
log('Top 10 -> skeptic; '+ranked.filter(r=>r.fatals>=2).length+' killed by double-fatal')

phase('Skeptic')
const skeptics = await parallel(top10.map(r => () => {
  const ex=(r.p.exhibits||[]).map(id=>POOL_BY_ID[id]).filter(Boolean)
  return agent(skepticPrompt(r.p, JSON.stringify(ex,null,1)), { label:'skeptic:'+r.p.id, phase:'Skeptic', schema:SKEPTIC_SCHEMA, effort:'xhigh' }) }))
const skById={}; for (const s of skeptics.filter(Boolean)) skById[s.proposal_id]=s
const survivors = top10.filter(r=>skById[r.p.id]&&skById[r.p.id].verdict==='SURVIVES')
log(survivors.length+'/'+top10.length+' survived skeptic')

phase('Deliberate')
const delibInput = survivors.map(r=>({proposal:r.p,avg_critique_score:Number(r.avg.toFixed(2)),critique_notes:r.critNotes,skeptic:{verdict:'SURVIVES',required_corrections:skById[r.p.id].required_corrections||'',notes:skById[r.p.id].notes||''}}))
const delib = await agent(`You are the editorial deliberator for AyahGuide's DIVERSIFIED braintrust (run ${runDate}). Below: proposals that survived non-count mining, grounding-verification, 4-advisor critique, and an adversarial "is-it-imposed" skeptic. These are STRUCTURAL/rhetorical/dialogical/intertextual reveals — the deliberate move away from frequency-counting. Choose a RECOMMENDED-3 PORTFOLIO that showcases DIFFERENT analytical modes (do NOT pick three of the same lens — the whole point is diversity), ideally one acquisition/search-doorway piece, one classical-recovery flagship, one high-shareability piece. Plus a ranked reserve. Score each recommended 1-5 per persona (read ${MEM}/persona_*.md) and place it in the catalog (${REPO}/scripts/braintrust-v2/published-articles.md + the 6 shipped this week). Fold each skeptic's required_corrections into corrections_to_apply. House rules: Quran-only, simple titles, mark classical-vs-modern, no superlatives, no disguised counts.
SURVIVING PROPOSALS:
${JSON.stringify(delibInput,null,1)}
OUTPUT: 1) Write deliberation JSON to ${LEDGERS}/v3-deliberation.json. 2) Return { "recommended":[...], "reserve":[...], "rationale":"..." }.`,
  { label:'deliberate', phase:'Deliberate', schema:DELIB_SCHEMA, effort:'high' })

return { runDate, pool_size:pool.length, usable:usable.length, ab_by_tier:abTier, proposals:allProposals.length,
  ranked: ranked.map(r=>({id:r.p.id,title:r.p.title,advisor:r.p.advisor,avg:Number(r.avg.toFixed(2)),fatals:r.fatals})),
  skeptic_verdicts: skeptics.filter(Boolean).map(s=>({id:s.proposal_id,verdict:s.verdict,notes:s.notes})),
  deliberation: delib }
