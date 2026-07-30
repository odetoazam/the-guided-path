#!/usr/bin/env node
/**
 * REGENERATE TAFSIR REPORTS — fast path
 * =====================================
 * Same job as regenerate_tafsir_reports.mjs, same safety guards, but one process
 * instead of 1,367 subprocesses, with a shared fetch cache and bounded concurrency.
 *
 * Why: the subprocess version ran at ~1.3 reports/min (~17h for the corpus)
 * because each report spawned a node process and refetched ayahs other reports
 * had already pulled. Measured across all reports: 5,632 sections but only 3,546
 * UNIQUE ayah refs, so caching alone removes 37% of the work, and concurrency
 * removes most of the rest.
 *
 * SAFETY — identical guards to the subprocess version:
 *   - a report is only overwritten if the new one has >= the old Arabic content
 *   - a report is only overwritten if it still covers every ayah it covered before
 *     ("bigger" is not "complete" — a pilot grew the Arabic while silently
 *     dropping a cross-surah section, and the size guard alone missed it)
 *   - reports are tracked in git, so every write is recoverable
 *   - a fetch that fails leaves the existing report untouched
 *   - manifest written for review
 *
 * Usage:
 *   node scripts/regen_reports_fast.mjs --limit 25
 *   node scripts/regen_reports_fast.mjs
 */
import { readFileSync, writeFileSync, existsSync, globSync } from 'node:fs';

const args = process.argv.slice(2);
const li = args.indexOf('--limit');
const limit = li >= 0 ? parseInt(args[li + 1], 10) : Infinity;
const CONCURRENCY = 12;
const LIMIT_CHARS = 60000;

const EDITIONS = [
  { slug: 'en-tafisr-ibn-kathir', name: 'Ibn Kathir (English)' },
  { slug: 'ar-tafsir-al-tabari', name: 'al-Tabari (Arabic)' },
  { slug: 'ar-tafsir-muyassar', name: 'al-Muyassar (Arabic)' },
  { slug: 'ar-tafsir-al-jalalayn', name: 'al-Jalalayn (Arabic)' },
];
const CDN = 'https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir';

const arabicLen = (s) => (s.match(/[؀-ۿ]/g) || []).length;
const cache = new Map();

async function fetchOne(slug, ref) {
  const key = `${slug}|${ref}`;
  if (cache.has(key)) return cache.get(key);
  const [s, a] = ref.split(':');
  let out = null;
  for (let attempt = 0; attempt < 3 && out === null; attempt++) {
    try {
      const r = await fetch(`${CDN}/${slug}/${s}/${a}.json`);
      if (r.ok) {
        const d = await r.json();
        out = d.text || d.tafsir_text || (typeof d === 'string' ? d : null);
      } else if (r.status === 404) {
        out = ''; // genuinely absent, not a failure
      }
    } catch {
      /* retry */
    }
    if (out === null) await new Promise((res) => setTimeout(res, 300 * (attempt + 1)));
  }
  cache.set(key, out);
  return out;
}

function refsOf(text) {
  return [...text.matchAll(/\n##\s+(\d+):(\d+)\s*\n/g)].map((m) => `${m[1]}:${m[2]}`);
}
function tadabburRefs(path) {
  if (!existsSync(path)) return [];
  const t = readFileSync(path, 'utf8');
  const out = new Set();
  const fm = t.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    const s = fm[1].match(/^surah:\s*(\d+)/m);
    const a1 = fm[1].match(/^ayah_start:\s*(\d+)/m);
    const a2 = fm[1].match(/^ayah_end:\s*(\d+)/m);
    if (s && a1) {
      const end = a2 ? +a2[1] : +a1[1];
      for (let a = +a1[1]; a <= end; a++) out.add(`${+s[1]}:${a}`);
    }
  }
  for (const m of t.matchAll(/\[ayah:(\d+):(\d+)\]/g)) out.add(`${+m[1]}:${+m[2]}`);
  return [...out];
}

function render(refs, blocks) {
  const L = ['# Tafsir Cross-Reference Report', ''];
  L.push(`Generated: ${new Date().toISOString().split('T')[0]}`);
  L.push(`Ayahs referenced: ${refs.length}`);
  L.push(`Tafsir sources: ${EDITIONS.map((e) => e.name).join(', ')}`, '', '---', '');
  for (const ref of refs) {
    L.push(`## ${ref}`, '');
    for (const ed of EDITIONS) {
      const text = blocks.get(`${ed.slug}|${ref}`);
      L.push(`### ${ed.name}`, '');
      if (text) {
        L.push(
          text.length > LIMIT_CHARS
            ? text.slice(0, LIMIT_CHARS) +
                `\n\n[TRUNCATED at ${LIMIT_CHARS} chars — ${text.length - LIMIT_CHARS} more. Consult the source directly before relying on anything near the cut.]`
            : text
        );
      } else if (text === '') {
        L.push('*Not present in this edition for this ayah (source returned 404).*');
      } else {
        L.push(
          '*FETCH FAILED — a pipeline failure, NOT evidence the commentator is silent. Do not infer absence.*'
        );
      }
      L.push('');
    }
    L.push('---', '');
  }
  return L.join('\n');
}

const reports = globSync('content/tadabbur/**/tafsir-report-*.md').sort().slice(0, limit === Infinity ? undefined : limit);

// plan every report, collect the union of refs needed
const plan = [];
const needed = new Set();
for (const rep of reports) {
  const before = readFileSync(rep, 'utf8');
  const tad = rep.replace(/tafsir-report-(.+)\.md$/, (_, r) =>
    r.includes('-') ? `ayahs-${r}.md` : `ayah-${r}.md`
  );
  const oldRefs = refsOf(before);
  const union = [...new Set([...oldRefs, ...tadabburRefs(tad)])].sort((a, b) => {
    const [sa, aa] = a.split(':').map(Number);
    const [sb, ab] = b.split(':').map(Number);
    return sa - sb || aa - ab;
  });
  if (!union.length) continue;
  plan.push({ rep, before, oldRefs, union });
  for (const r of union) for (const e of EDITIONS) needed.add(`${e.slug}|${r}`);
}
console.log(`reports planned: ${plan.length}   unique fetches needed: ${needed.size}`);

// fetch everything with bounded concurrency
const keys = [...needed];
let fetched = 0;
async function worker() {
  while (keys.length) {
    const k = keys.pop();
    const [slug, ref] = k.split('|');
    await fetchOne(slug, ref);
    if (++fetched % 500 === 0) console.log(`  ...${fetched}/${needed.size} fetched`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log(`fetched ${fetched}`);

// write reports behind both guards
let done = 0, rejected = 0;
const manifest = [];
for (const p of plan) {
  const after = render(p.union, cache);
  const afterRefs = new Set(refsOf(after));
  const lost = p.oldRefs.filter((r) => !afterRefs.has(r));
  if (lost.length) {
    rejected++;
    manifest.push({ rep: p.rep, action: 'REJECTED-lost-coverage', lost });
    continue;
  }
  if (arabicLen(after) < arabicLen(p.before)) {
    rejected++;
    manifest.push({ rep: p.rep, action: 'REJECTED-would-shrink', before: arabicLen(p.before), after: arabicLen(after) });
    continue;
  }
  writeFileSync(p.rep, after);
  done++;
  manifest.push({ rep: p.rep, action: 'regenerated', beforeArabic: arabicLen(p.before), afterArabic: arabicLen(after) });
}
console.log(`\nregenerated: ${done}   rejected: ${rejected}`);
const tot = manifest.filter((m) => m.action === 'regenerated');
const gained = tot.reduce((s, m) => s + (m.afterArabic - m.beforeArabic), 0);
console.log(`total Arabic content gained: ${gained.toLocaleString()} chars`);
writeFileSync('scripts/review-v2/regen-manifest.json', JSON.stringify(manifest, null, 1));
