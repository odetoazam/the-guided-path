#!/usr/bin/env node
/**
 * DETECT TAFSIR HEADING OFFSET — closing the last open measurement
 * =================================================================
 * docs/morphology-review-queue.md records that commentators' blocks sometimes
 * sit under the WRONG `## S:A` heading, and says the scale is "unknown and
 * deliberately not asserted" because earlier attempts kept matching al-Tabari's
 * footnote and narration numbers instead of ayah markers.
 *
 * This sidesteps that entirely. It never parses a number. Instead it reads the
 * ARABIC each block actually quotes and asks which verse that text belongs to:
 *
 *   for each `## S:A` section, for each `### <source>` block, pull every run of
 *   Arabic >= MINW words, fold it, and find which ayah of the report's own
 *   passage contains it. If the quotations point at an ayah that is not the
 *   heading, the block is misfiled.
 *
 * This is the same method the enrichment agents were told to use by hand, so it
 * measures exactly the thing they keep catching.
 *
 * Reports only. Changes nothing.
 * Usage: node scripts/detect_tafsir_offset.mjs [report.md ...]
 */
import { QuranValidator } from 'quran-validator';
import { readFileSync, writeFileSync, globSync } from 'node:fs';

const v = new QuranValidator();
const cache = new Map();
function canonical(s, a) {
  const k = `${s}:${a}`;
  if (!cache.has(k)) {
    const r = v.getVerse(s, a);
    cache.set(k, r && r.text ? r.text.trim() : null);
  }
  return cache.get(k);
}
const MARKS = /[ً-ٰٟۖ-ۭـࣰ-ࣿ]/g;
const fold = (t) =>
  t.replace(/ٰ/g, 'ا').replace(MARKS, '').replace(/[آأإٱ]/g, 'ا')
   .replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
   .replace(/ء/g, '').replace(/[٠-٩]/g, '').replace(/[^؀-ۿ\s]/g, '')
   .replace(/\s+/g, ' ').trim();

const MINW = 3; // a 3-word run is long enough to locate a verse, short enough to find

let files = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!files.length) files = globSync('content/tadabbur/**/tafsir-report-*.md');

let examined = 0, offset = 0;
const hits = [];

for (const file of files) {
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { continue; }
  const secs = text.split(/\n##\s+(\d+:\d+)\s*\n/);
  if (secs.length < 3) continue;
  const heads = [], bodies = [];
  for (let i = 1; i < secs.length; i += 2) { heads.push(secs[i]); bodies.push(secs[i + 1]); }
  if (heads.length < 2) continue;

  // folded text of every ayah this report covers
  const verses = heads.map((h) => {
    const [s, a] = h.split(':').map(Number);
    const c = canonical(s, a);
    return { head: h, folded: c ? fold(c) : null };
  });
  if (verses.some((x) => !x.folded)) continue;

  for (let i = 0; i < heads.length; i++) {
    for (const m of bodies[i].matchAll(/###\s+([^\n]+?)\s*\n([\s\S]*?)(?=\n###\s|\Z)/g)) {
      const source = m[1].trim();
      const blk = m[2];
      // every Arabic run in the block
      const runs = (blk.match(/[؀-ۿ][؀-ۿ\s]{8,}/g) || [])
        .map(fold).filter((r) => r.split(' ').length >= MINW);
      if (!runs.length) continue;

      // score each ayah by how many runs it contains
      const score = verses.map((ve) => runs.filter((r) => ve.folded.includes(r)).length);
      const best = Math.max(...score);
      if (best === 0) continue; // quotes nothing from this passage — can't judge
      const ownIdx = i;
      if (score[ownIdx] === best) continue; // consistent with its heading
      const winner = verses[score.indexOf(best)].head;
      examined++;
      offset++;
      hits.push({ file, heading: heads[i], source, actually: winner, own: score[ownIdx], bestScore: best });
    }
  }
  examined++;
}

console.log(`multi-ayah reports scanned: ${files.length}`);
console.log(`BLOCKS FILED UNDER THE WRONG AYAH: ${hits.length}`);
const bySrc = {};
for (const h of hits) bySrc[h.source] = (bySrc[h.source] || 0) + 1;
console.log('\nby commentator:');
for (const [k, n] of Object.entries(bySrc).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(5)}  ${k}`);
const byFile = new Set(hits.map((h) => h.file));
console.log(`\naffected reports: ${byFile.size}`);
console.log('\nsample:');
for (const h of hits.slice(0, 15))
  console.log(`  ${h.file}\n     under ## ${h.heading}  [${h.source}]  -> actually quotes ${h.actually}`);
writeFileSync('scripts/review-v2/tafsir-offset-blocks.json', JSON.stringify(hits, null, 1));
console.log('\nwrote scripts/review-v2/tafsir-offset-blocks.json');
