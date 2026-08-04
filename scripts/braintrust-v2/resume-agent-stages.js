// Braintrust v2 — RESUME script for the agent stages (run after the 9:50pm PT session-limit reset).
// Seeds the pool from the 36 already-verified insights on disk (GRAPH/BRACKET/RAREADJ), mines only the
// 3 remaining lenses (VOICE @high, PHRASE @xhigh, SCENE @xhigh) + verifies them, then runs the full
// advisor -> critique -> skeptic -> deliberation pipeline. Preserves the high-vs-xhigh A/B intent
// (xhigh = PHRASE + SCENE). Launch with: Workflow({scriptPath: "<this file>"})
export const meta = {
  name: 'braintrust-v2-resume',
  description: 'Braintrust v2 resume: mine 3 remaining lenses (VOICE/PHRASE/SCENE) over the 36 pre-verified insights, then advisor proposals + cross-critique + skeptic vetoes + portfolio deliberation',
  phases: [
    { title: 'Mine', detail: 'VOICE @high, PHRASE @xhigh, SCENE @xhigh' },
    { title: 'Verify', detail: 'mechanically re-run every new count' },
    { title: 'Propose', detail: '4 standing advisors draft proposals over full pool' },
    { title: 'Critique', detail: 'advisors cross-critique all outside slates' },
    { title: 'Skeptic', detail: 'adversarial refuter per top-10, veto power' },
    { title: 'Deliberate', detail: 'recommended-3 portfolio + ranked reserve + A/B tally' },
  ],
}

const REPO = '/Users/azamkhan/the-guided-path'
const LEDGERS = REPO + '/scripts/braintrust-v2/ledgers'
const MEMDIR = '/Users/azamkhan/.claude/projects/-Users-azamkhan-the-guided-path/memory'
const runDate = '2026-07-16'

const DATA_BLOCK = `
DATA FILES (paths relative to ${REPO}, your working directory):
1. scripts/.corpus-cache/quranic-corpus.json (15MB) — dict keyed "S:A" (6,236 entries, mushaf order). Value = LIST of segments: {"loc","word","pos","root"(or null),"lemma","features"}. Verb features: PERF/IMPF/IMPV | VF:1..10 | PASS(only if passive) | ROOT:x | LEM:x | person-gender-number | MOOD. Dict key load-order = mushaf order.
2. node_modules/quran-validator/data/quran-verses.json — list of 6,236 {"id","surah","ayah","text"(Uthmani),"textSimple"(no diacritics)}. Use textSimple for phrase sweeps.
3. scripts/graph-lab/edges-typed.json — {"meta","edges":[13,286: {"src","tgt","type","confidence","basis","source","shared_roots","min_df","same_surah"}]}.
`
const RULES_BLOCK = `
NON-NEGOTIABLE (from Azam): every count from a python3 script you actually ran (Bash); scope every claim (root vs lemma vs exact phrase) and SAY the scope; first/last = MUSHAF order, never chronology; no unprovable superlatives; QURAN-ONLY payoff (no hadith-dependent reveals — policy 2026-07-17); simple layman language; check overlap against ${REPO}/scripts/braintrust-v2/published-articles.md (185 shipped).
`
const INSIGHT_SHAPE = `
Each insight: { "id":"<LENS>-<n>", "title_idea", "claim"(precise+scoped+falsifiable, exact numbers+scope+mushaf-order), "evidence"(counts+refs your script produced), "refs":["S:A"], "verify_method"(recipe to re-derive every number), "overlap_note"(nearest published + how different, or 'none'), "angle"(why a reader stops scrolling) }
`

const LENSES = [
  { key: 'VOICE', tier: 'high', name: 'Grammatical voice & verb-form mechanisms',
    brief: `Hunt active/passive flips and verb-form (VF I-X) substitutions under near-identical frames. Template: /posts/budge-root-voice-flip-death-quran (root زحزح exactly 2x: active-denied 2:96, passive-granted 3:185). Zaynab flagged voice as the most underused mechanism. Sweep: (a) roots whose occurrences split active/passive meaningfully; (b) same root in two VFs in parallel contexts where the form substitution carries the meaning; (c) verbs passive EVERY time (divine agency hidden) or active every time. Use PASS flag + VF:n. Do NOT re-propose زحزح.` },
  { key: 'PHRASE', tier: 'xhigh', name: 'Exactly-N phrase sets (phrase-level n-grams, DF<=10)',
    brief: `Twice-told / complete-set method at PHRASE level. Sweep textSimple for word n-grams (n=2..6), document frequency <=10 across 6,236 verses, tokenize on whitespace. Hunt: (a) phrases appearing EXACTLY twice in wildly different contexts (twin-verse — shipped: ayat-al-kursi-throne-twin, afrigh-pour-patience, arini-show-me, hunalika, aftuni, ibni-li — find NEW ones); (b) small exactly-N complete sets sharing a hidden property (jamil-seven template); (c) exactly-3x progressions. Many 2-word vocatives/imperatives are mined — go LONGER (3-6 words).` },
  { key: 'SCENE', tier: 'xhigh', name: 'Repeated-scene variation',
    brief: `Same event told 2-3+ times, wording forks mapped to each surah's theme. Template: /posts/musa-fire-three-tellings-quran. Hunt OTHER multiply-told scenes with a load-bearing VERBAL fork (different verb/word for the same beat, verified side-by-side in corpus): Nuh's flood, Lut's guests / messengers to Ibrahim, sea-splitting, Musa & magicians, Isa's cradle, creation-of-Adam dialogues. The reveal must be a verbal fork, not just 'story appears twice'. Check overlap hard — many narratives are covered; the wording-fork mechanism is what's new.` },
]

function minerPrompt(l) {
  return `You are corpus miner "${l.key}" in AyahGuide's article braintrust v2 (run ${runDate}). AyahGuide publishes corpus-verified "connection-reveal" articles — each rests on one mechanically checkable corpus fact with a human payoff.
YOUR LENS: ${l.name}.
${l.brief}
${DATA_BLOCK}${RULES_BLOCK}
NOTE: 36 insights from 3 other lenses (GRAPH/BRACKET/RAREADJ) are already verified; avoid duplicating their roots/phrases where you can see overlap (ledger: ${LEDGERS}/verified-pool.json).
DELIVERABLE: 8-12 insights, quality over quantity — each needs a shippable reveal (fact + reason to care).
${INSIGHT_SHAPE}
OUTPUT CONTRACT: 1) Write insights JSON array to ${LEDGERS}/mine-${l.key}.json. 2) Return { "insights":[...], "ledger_path":"..." }.`
}
const INSIGHTS_SCHEMA = { type:'object', required:['insights','ledger_path'], properties:{
  insights:{type:'array',items:{type:'object',required:['id','title_idea','claim','evidence','verify_method'],properties:{
    id:{type:'string'},title_idea:{type:'string'},claim:{type:'string'},evidence:{type:'string'},
    refs:{type:'array',items:{type:'string'}},verify_method:{type:'string'},overlap_note:{type:'string'},angle:{type:'string'}}}},
  ledger_path:{type:'string'} } }

const VERIFY_SCHEMA = { type:'object', required:['results','ledger_path'], properties:{
  results:{type:'array',items:{type:'object',required:['id','verdict','notes'],properties:{
    id:{type:'string'},verdict:{type:'string',enum:['CONFIRMED','CORRECTED','REFUTED']},corrected_claim:{type:'string'},notes:{type:'string'}}}},
  ledger_path:{type:'string'} } }
function verifyPrompt(chunk, lensKey, ci) {
  return `You are a mechanical verifier in AyahGuide braintrust v2. Re-derive from scratch (your own python3 via Bash) every load-bearing number and set-membership claim below. Working dir ${REPO}.
${DATA_BLOCK}
Per insight: CONFIRMED (all exact, correct scope) / CORRECTED (pattern holds, fix numbers/scope/refs in corrected_claim as a full precise replacement) / REFUTED (a load-bearing claim false). Be strict on scope (root vs lemma vs phrase). Check first/last by mushaf-order iteration. NOTE: counts labeled "tagged segments" mean TOKENS (segment count), which differ from verse counts — verify against the unit the claim states.
INSIGHTS:
${JSON.stringify(chunk, null, 1)}
OUTPUT CONTRACT: 1) Write results JSON to ${LEDGERS}/verify-${lensKey}-${ci}.json. 2) Return { "results":[...], "ledger_path":"..." }.`
}

const ADVISORS = [
  { key:'ZAYNAB', name:'Dr. Zaynab al-Mansouri (Arabic linguistics & classical balaghah)', memfile: MEMDIR+'/advisor_zaynab_al_mansouri.md' },
  { key:'HASAN', name:'Dr. Hasan al-Qasimi (classical tafsir, Al-Azhar + Oxford)', memfile: MEMDIR+'/advisor_hasan_al_qasimi.md' },
  { key:'YASMIN', name:'Dr. Yasmin Farid (academic Quranic studies, U Chicago)', memfile: MEMDIR+'/advisor_yasmin_farid.md' },
  { key:'KHALID', name:'Ustadh Khalid Siddiqui (digital dawah, Muslim youth)', memfile: MEMDIR+'/advisor_khalid_siddiqui.md' },
]
const PERSONA_BLOCK = `
FOUR READER PERSONAS (score 1-5 each; files at ${MEMDIR}/persona_*.md):
- Amina (Reconnector,25-38): born Muslim arriving on her own terms; largest segment; contested-verse search; needs permission + depth w/o Arabic prereqs.
- Khalil (Convert,24-38): intellectual convert; top recommender; needs verifiable citations, ikhtilaf honesty, morphological transparency.
- Sara (Questioning Parent,32-45): teen asks hard questions; WhatsApp sharer; needs something she can SAY, teen-readable.
- Yusuf (Student,18-28): faces academic critique; MSA multiplier; needs citable rigor.
`
const PROPOSALS_SCHEMA = { type:'object', required:['proposals','ledger_path'], properties:{
  proposals:{type:'array',items:{type:'object',required:['id','title','thesis','exhibits'],properties:{
    id:{type:'string'},title:{type:'string'},thesis:{type:'string'},exhibits:{type:'array',items:{type:'string'}},
    personas:{type:'object'},risks:{type:'string'},why_now:{type:'string'}}}}, ledger_path:{type:'string'} } }
function advisorPrompt(a, poolIndex) {
  return `You are ${a.name}, standing advisor to AyahGuide. FIRST read your full persona file at ${a.memfile} and inhabit it. Run ${runDate}.
A 6-lens corpus mine produced insights; every load-bearing count is mechanically verified. REFUTED excluded; for CORRECTED insights the corrected_claim is authoritative. Full evidence/refs in ${LEDGERS}/verified-pool.json + mine-*.json + verify-*.json — read what you build on.
VERIFIED POOL INDEX:
${poolIndex}
TASK: draft 5-6 article proposals through YOUR lens. May combine insights across lenses. Each: { "id":"${a.key}-<n>","title"(layman, simple),"thesis"(2-3 plain sentences: reveal + why it matters),"exhibits":["<insight ids>"],"personas":{"amina":1-5,"khalil":1-5,"sara":1-5,"yusuf":1-5,"note":"..."},"risks":"...","why_now":"..." }
HARD: Quran-only payoff; check overlap vs ${REPO}/scripts/braintrust-v2/published-articles.md (185 shipped — read it); scope every claim; first/last=mushaf; no superlatives; simple prose.
${PERSONA_BLOCK}
OUTPUT CONTRACT: 1) Write proposals JSON to ${LEDGERS}/propose-${a.key}.json. 2) Return { "proposals":[...], "ledger_path":"..." }.`
}
const CRITIQUE_SCHEMA = { type:'object', required:['critiques','ledger_path'], properties:{
  critiques:{type:'array',items:{type:'object',required:['proposal_id','accuracy','freshness','audience','shippability','notes'],properties:{
    proposal_id:{type:'string'},accuracy:{type:'number'},freshness:{type:'number'},audience:{type:'number'},shippability:{type:'number'},fatal:{type:'boolean'},notes:{type:'string'}}}}, ledger_path:{type:'string'} } }
function critiquePrompt(a, othersJson) {
  return `You are ${a.name}, standing advisor to AyahGuide. Read your persona file at ${a.memfile} and inhabit it. CROSS-CRITIQUE stage: below are all proposals from the OTHER three advisors (your slate excluded). Verified ledgers at ${LEDGERS}/.
Score EVERY proposal 1-10 through your lens on: accuracy (penalize scope-shift, superlatives, hadith-dependence), freshness (read ${REPO}/scripts/braintrust-v2/published-articles.md; penalize near-duplicates), audience (persona pull), shippability (writable this week). Set "fatal":true only if it must NOT ship as-is (say why). Notes: 1-3 sharp sentences in your voice.
PROPOSALS:
${othersJson}
OUTPUT CONTRACT: 1) Write critiques JSON to ${LEDGERS}/critique-${a.key}.json. 2) Return { "critiques":[...], "ledger_path":"..." }.`
}
const SKEPTIC_SCHEMA = { type:'object', required:['proposal_id','verdict','notes'], properties:{
  proposal_id:{type:'string'},verdict:{type:'string',enum:['SURVIVES','REFUTED']},broken_claims:{type:'array',items:{type:'string'}},required_corrections:{type:'string'},notes:{type:'string'} } }
function skepticPrompt(p, exhibitsJson) {
  return `You are an adversarial fact-checker with VETO power in AyahGuide braintrust v2. BREAK the proposal below; if you can't after genuine effort, it survives. Working dir ${REPO}.
${DATA_BLOCK}
ATTACK (own python3): 1) re-derive EVERY count; 2) scope-shift (root vs lemma vs phrase; silent mixing?); 3) counterexample hunt for always/never/only/exactly-N; 4) first/last by mushaf iteration + hidden-chronology check; 5) overlap vs ${REPO}/scripts/braintrust-v2/published-articles.md; 6) Quran-only (hadith payoff -> REFUTED); 7) hostile-reader one-tweet rebuttal. Every soft spot -> required_corrections; a load-bearing failure -> REFUTED.
PROPOSAL:
${JSON.stringify(p, null, 1)}
EXHIBITS:
${exhibitsJson}
OUTPUT CONTRACT: 1) Write verdict JSON to ${LEDGERS}/skeptic-${p.id}.json. 2) Return { "proposal_id","verdict","broken_claims","required_corrections","notes" }.`
}
const DELIB_SCHEMA = { type:'object', required:['recommended','reserve','rationale'], properties:{
  recommended:{type:'array',items:{type:'object',required:['proposal_id','title','why'],properties:{proposal_id:{type:'string'},title:{type:'string'},why:{type:'string'},personas:{type:'object'},corrections_to_apply:{type:'string'}}}},
  reserve:{type:'array',items:{type:'object',required:['proposal_id','title','why'],properties:{proposal_id:{type:'string'},title:{type:'string'},why:{type:'string'}}}},
  rationale:{type:'string'} } }

// ==================== EXECUTION ====================
const fs = { read: (p) => { try { return require('fs').readFileSync(p, 'utf8') } catch (e) { return null } } }

// seed pool from the 36 already-verified insights on disk
let seeded = []
try {
  const vp = JSON.parse(require('fs').readFileSync(LEDGERS + '/verified-pool.json', 'utf8'))
  seeded = (vp.insights || []).map(i => ({ ...i, verdict: i.verdict || 'CONFIRMED' }))
} catch (e) { log('WARN: could not read verified-pool.json: ' + e.message) }
log('Seeded ' + seeded.length + ' pre-verified insights (GRAPH/BRACKET/RAREADJ)')

phase('Mine')
log('Mining 3 remaining lenses: VOICE @high, PHRASE @xhigh, SCENE @xhigh')
const mined = await pipeline(
  LENSES,
  l => agent(minerPrompt(l), { label: 'mine:' + l.key, phase: 'Mine', schema: INSIGHTS_SCHEMA, effort: l.tier }),
  (res, l) => {
    if (!res || !res.insights || !res.insights.length) return null
    const insights = res.insights.map(i => ({ ...i, lens: l.key, tier: l.tier }))
    const chunks = []
    for (let i = 0; i < insights.length; i += 4) chunks.push(insights.slice(i, i + 4))
    return parallel(chunks.map((ch, ci) => () =>
      agent(verifyPrompt(ch, l.key, ci), { label: 'verify:' + l.key + '-' + ci, phase: 'Verify', schema: VERIFY_SCHEMA, effort: 'low' })
        .then(v => ({ chunk: ch, verify: v }))))
  }
)
const newPool = []
for (const lr of mined.filter(Boolean)) for (const pair of lr.filter(Boolean)) {
  const vd = {}; if (pair.verify && pair.verify.results) for (const r of pair.verify.results) vd[r.id] = r
  for (const ins of pair.chunk) { const v = vd[ins.id] || { verdict:'UNVERIFIED', notes:'no verifier result' }
    newPool.push({ ...ins, verdict:v.verdict, corrected_claim:v.corrected_claim||null, verify_notes:v.notes||'' }) }
}
const pool = seeded.concat(newPool)
const usable = pool.filter(i => i.verdict === 'CONFIRMED' || i.verdict === 'CORRECTED')
log('Pool total ' + pool.length + ' (' + seeded.length + ' seeded + ' + newPool.length + ' new); usable ' + usable.length)

// A/B tally: high vs xhigh mining tier survival
const ab = {}
for (const t of ['high','xhigh']) { const m = pool.filter(i => i.tier === t)
  ab[t] = { mined:m.length, confirmed:m.filter(i=>i.verdict==='CONFIRMED').length, corrected:m.filter(i=>i.verdict==='CORRECTED').length, refuted:m.filter(i=>i.verdict==='REFUTED').length } }

phase('Propose')
const poolIndex = usable.map(i => `[${i.id}] (${i.lens}/${i.tier},${i.verdict}) "${i.title_idea}" — ${i.verdict==='CORRECTED'?i.corrected_claim:i.claim}`).join('\n')
const slates = await parallel(ADVISORS.map(a => () =>
  agent(advisorPrompt(a, poolIndex), { label:'propose:'+a.key, phase:'Propose', schema:PROPOSALS_SCHEMA, effort:'high' })
    .then(r => ({ advisor:a.key, proposals:(r&&r.proposals)||[] }))))
const allProposals = []
for (const s of slates.filter(Boolean)) for (const p of s.proposals) allProposals.push({ ...p, advisor:s.advisor })
log(allProposals.length + ' proposals drafted')

phase('Critique')
const critiques = await parallel(ADVISORS.map(a => () => {
  const others = allProposals.filter(p => p.advisor !== a.key)
  return agent(critiquePrompt(a, JSON.stringify(others,null,1)), { label:'critique:'+a.key, phase:'Critique', schema:CRITIQUE_SCHEMA, effort:'high' })
    .then(r => ({ advisor:a.key, critiques:(r&&r.critiques)||[] })) }))
const scoreMap = {}
for (const c of critiques.filter(Boolean)) for (const cr of c.critiques) {
  if (!scoreMap[cr.proposal_id]) scoreMap[cr.proposal_id] = { total:0,n:0,fatals:0,notes:[] }
  const s = scoreMap[cr.proposal_id]; s.total += (cr.accuracy||0)+(cr.freshness||0)+(cr.audience||0)+(cr.shippability||0); s.n+=1
  if (cr.fatal) s.fatals+=1; s.notes.push(c.advisor+': '+(cr.notes||'')) }
const ranked = allProposals.map(p => ({ p, avg: scoreMap[p.id]?scoreMap[p.id].total/scoreMap[p.id].n:0, fatals: scoreMap[p.id]?scoreMap[p.id].fatals:0, critNotes: scoreMap[p.id]?scoreMap[p.id].notes:[] })).sort((x,y)=>y.avg-x.avg)
const top10 = ranked.filter(r => r.fatals < 2).slice(0,10)
log('Top 10 -> skeptic; ' + ranked.filter(r=>r.fatals>=2).length + ' killed by double-fatal')

phase('Skeptic')
const usableById = {}; for (const i of usable) usableById[i.id] = i
const skeptics = await parallel(top10.map(r => () => {
  const ex = (r.p.exhibits||[]).map(id => usableById[id]).filter(Boolean)
  return agent(skepticPrompt(r.p, JSON.stringify(ex,null,1)), { label:'skeptic:'+r.p.id, phase:'Skeptic', schema:SKEPTIC_SCHEMA, effort:'xhigh' }) }))
const skById = {}; for (const s of skeptics.filter(Boolean)) skById[s.proposal_id] = s
const survivors = top10.filter(r => skById[r.p.id] && skById[r.p.id].verdict === 'SURVIVES')
log(survivors.length + '/' + top10.length + ' survived skeptic')

phase('Deliberate')
const delibInput = survivors.map(r => ({ proposal:r.p, avg_critique_score:Number(r.avg.toFixed(2)), critique_notes:r.critNotes,
  skeptic:{ verdict:'SURVIVES', required_corrections:skById[r.p.id].required_corrections||'', notes:skById[r.p.id].notes||'' } }))
const delib = await agent(`You are the editorial deliberator for AyahGuide braintrust v2 (run ${runDate}). Below: proposals that survived 6-lens verified mining, 4-advisor drafting, cross-critique, and adversarial skeptic veto. Choose a RECOMMENDED-3 PORTFOLIO (not just top-3 scores — ideally one acquisition/search-doorway piece, one classical-recovery flagship, one high-shareability piece; avoid three of one mechanism), plus a ranked reserve. Score each recommended piece 1-5 per persona (read ${MEMDIR}/persona_*.md) and place it in the 185-article catalog (${REPO}/scripts/braintrust-v2/published-articles.md — what gap does each fill?). Fold each skeptic's required_corrections into corrections_to_apply. House rules: Quran-only, simple layman titles, exact scoping, mushaf-order, no superlatives.
SURVIVING PROPOSALS:
${JSON.stringify(delibInput,null,1)}
OUTPUT CONTRACT: 1) Write deliberation JSON to ${LEDGERS}/deliberation.json. 2) Return { "recommended":[...], "reserve":[...], "rationale":"..." }.`,
  { label:'deliberate', phase:'Deliberate', schema:DELIB_SCHEMA, effort:'high' })

// A/B downstream: skeptic survival by mining tier (via exhibits)
const tierOf = {}; for (const i of pool) tierOf[i.id] = i.tier
function tiersUsed(p){ const t=new Set(); for (const e of (p.exhibits||[])) if (tierOf[e]) t.add(tierOf[e]); return [...t] }
const abFinal = { high:{inTop10:0,survived:0}, xhigh:{inTop10:0,survived:0} }
for (const r of top10) for (const t of tiersUsed(r.p)) abFinal[t].inTop10+=1
for (const r of survivors) for (const t of tiersUsed(r.p)) abFinal[t].survived+=1

return { runDate, ab_mining:ab, ab_downstream:abFinal, pool_size:pool.length, usable:usable.length,
  proposals:allProposals.length,
  ranked: ranked.map(r => ({ id:r.p.id, title:r.p.title, advisor:r.p.advisor, avg:Number(r.avg.toFixed(2)), fatals:r.fatals })),
  skeptic_verdicts: skeptics.filter(Boolean).map(s => ({ id:s.proposal_id, verdict:s.verdict, notes:s.notes })),
  deliberation: delib }
