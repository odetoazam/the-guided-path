#!/usr/bin/env node
/**
 * FIND QURAN-TEXT DEFECTS — the two classes no validator catches
 * ==============================================================
 * docs/morphology-review-queue.md records two defects that passed every
 * automated check, because verify_arabic only validates Arabic carrying an
 * `ayah:` tag:
 *
 *   1. FABRICATED — Arabic presented as a Quranic quotation that is not in the
 *      Quran at all (found in 005-al-maidah/ayah-105.md).
 *   2. ELISION — real Quranic words with something removed, changing the
 *      grammar. `زَادَهُمُ مَرَضًا` for `فَزَادَهُمُ ٱللَّهُ مَرَضًا` drops Allah as the
 *      subject (found in 002-al-baqarah/ayahs-006-017.md).
 *
 * Both were found by reading, not by a script. This is a detector.
 *
 * Method: for every substantial run of Arabic in a body that is NOT already an
 * `[ayah:S:A]` line, fold it and test it against the canonical text of the
 * verses the file declares:
 *   EXACT      — matches a declared verse. Fine (usually an untagged quotation).
 *   SUBSTRING  — is a proper substring of a declared verse. Candidate ELISION
 *                if it drops leading words; often a legitimate short phrase quote.
 *   GAPPED     — every word appears in a declared verse, in order, but with
 *                words MISSING in between. This is the elision signature.
 *   UNMATCHED  — matches nothing in the declared verses. Candidate FABRICATION,
 *                though it may legitimately be a cross-surah quotation or tafsir.
 *
 * This reports leads for a human. It changes nothing.
 *
 * Usage: node scripts/find_quran_text_defects.mjs [--all] [file.md ...]
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
  t.replace(/\u0670/g, 'ا').replace(MARKS, '').replace(/[آأإٱ]/g, 'ا').replace(/ى/g, 'ي')
   .replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
   .replace(/ء/g, '').replace(/[٠-٩]/g, '').replace(/[^؀-ۿ\s]/g, '')
   .replace(/\s+/g, ' ').trim();

let files = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!files.length)
  files = globSync('content/tadabbur/**/*.md').filter(
    (f) => !/tafsir[-_]report[-_]/.test(f) && !/_superseded/.test(f)
  );

const gapped = [], unmatched = [];

for (const file of files) {
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { continue; }
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) continue;
  const s = fm[1].match(/^surah:\s*(\d+)/m);
  const a1 = fm[1].match(/^ayah_start:\s*(\d+)/m);
  const a2 = fm[1].match(/^ayah_end:\s*(\d+)/m);
  if (!s || !a1) continue;
  const surah = +s[1], start = +a1[1], end = a2 ? +a2[1] : +a1[1];

  const verses = [];
  for (let a = start; a <= end; a++) {
    const c = canonical(surah, a);
    if (c) verses.push({ a, words: fold(c).split(' ') });
  }
  if (!verses.length) continue;

  const body = text.slice(fm.index + fm[0].length);
  for (const line of body.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('<!--') || /\[ayah:\d+:\d+\]/.test(t)) continue;
    const bare = t.replace(/^[*_>\s]+|[*_\s]+$/g, '');

    // An explicit ellipsis MARKS the omission, so it is honest quotation, not an
    // elision defect. The defect is text that LOOKS contiguous but isn't.
    if (/\.\.\.|…/.test(bare)) continue;
    // Skip prose: a line carrying English words is commentary with Arabic terms
    // embedded, not a presented quotation. Require it to be predominantly Arabic.
    if (/[A-Za-z]{3,}/.test(bare)) continue;
    if (t.startsWith('#') || t.startsWith('|') || t.startsWith('-')) continue;

    const f = fold(bare);
    if (!f) continue;
    const w = f.split(' ');
    if (w.length < 4) continue; // short phrase quotes are normal and expected

    let verdict = 'UNMATCHED', hit = null;
    for (const ve of verses) {
      const joined = ve.words.join(' ');
      if (joined === f) { verdict = 'EXACT'; hit = ve.a; break; }
      if (joined.includes(f)) { verdict = 'SUBSTRING'; hit = ve.a; break; }
      // in-order subsequence with gaps == the elision signature
      let i = 0;
      for (const word of ve.words) if (i < w.length && word === w[i]) i++;
      if (i === w.length) { verdict = 'GAPPED'; hit = ve.a; break; }
    }
    if (verdict === 'GAPPED')
      gapped.push({ file, ref: `${surah}:${hit}`, text: bare.slice(0, 90) });
    else if (verdict === 'UNMATCHED')
      unmatched.push({ file, range: `${surah}:${start}-${end}`, text: bare.slice(0, 90) });
  }
}

// ---- FABRICATION TEST -------------------------------------------------------
// UNMATCHED only means "not in the verses this file declares" — a cross-surah
// quotation lands there legitimately. The fabrication signature is text that
// appears NOWHERE in the Quran. Build the whole corpus once and test against it.
let whole = '';
for (let s = 1; s <= 114; s++) {
  for (let a = 1; ; a++) {
    const c = canonical(s, a);
    if (!c) break;
    whole += ' ' + fold(c);
  }
}
const notInQuran = unmatched.filter((u) => !whole.includes(fold(u.text)));

console.log(`files scanned: ${files.length}`);
console.log(`GAPPED   (elision signature — words missing from the middle): ${gapped.length}`);
console.log(`UNMATCHED (not in this file's declared verses): ${unmatched.length}`);
console.log(`  of those, NOT ANYWHERE IN THE QURAN (fabrication candidates): ${notInQuran.length}`);
console.log('\nNote: UNMATCHED includes legitimate cross-surah quotations and tafsir');
console.log('Arabic. GAPPED is the higher-signal list — start there.\n');
for (const g of gapped.slice(0, 40)) console.log(`  GAPPED ${g.ref}  ${g.file}\n         ${g.text}`);
for (const u of notInQuran.slice(0, 25)) console.log(`  NOT-IN-QURAN ${u.file}\n         ${u.text}`);
writeFileSync(
  'scripts/review-v2/quran-text-defect-leads.json',
  JSON.stringify({ gapped, notInQuran, unmatched }, null, 1)
);
console.log('\nwrote scripts/review-v2/quran-text-defect-leads.json');
