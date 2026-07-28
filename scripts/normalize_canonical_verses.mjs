#!/usr/bin/env node
/**
 * NORMALIZE CANONICAL VERSES — post-enrichment Arabic repair
 * ===========================================================
 * Enrichment agents rewrite ayah lines and reintroduce diacritic drift away
 * from the canonical Uthmani text. This restores byte-exactness.
 *
 * Normalizes, in every file given:
 *   1. `[ayah:S:A] <arabic>` body lines
 *   2. the frontmatter `arabic:` field (single verse, or a range joined by ۝)
 *
 * SAFETY INVARIANT — the reason this is safe to run unattended:
 *   A verse is replaced ONLY when the existing text is equal to the canonical
 *   text after stripping diacritics/tatweel and folding hamza+alif variants.
 *   So pure diacritic drift is repaired, but text that genuinely differs in
 *   its letters (a dropped word, an elision, a fabricated quotation) is left
 *   alone and REPORTED — those are content defects for a human, and silently
 *   overwriting them would erase the evidence.
 *
 * Usage:
 *   node scripts/normalize_canonical_verses.mjs <file.md> [more.md ...]
 *   node scripts/normalize_canonical_verses.mjs --all       # whole corpus
 *   node scripts/normalize_canonical_verses.mjs --dry <...>  # report only
 */
import { QuranValidator } from 'quran-validator';
import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';

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

// Diacritics, Quranic annotation signs, tatweel, superscript alif
const MARKS = /[ً-ٰٟۖ-ۭـࣰ-ࣿ]/g;
function fold(t) {
  return t
    .replace(/\u0670/g, 'ا').replace(MARKS, '')
    .replace(/[آأإٱ]/g, 'ا') // آ أ إ ٱ -> ا
    .replace(/ى/g, 'ي')                     // ى -> ي
    .replace(/ة/g, 'ه')                     // ة -> ه
    .replace(/ؤ/g, 'و')                     // ؤ -> و
    .replace(/ئ/g, 'ي')                     // ئ -> ي
    .replace(/ء/g, '')                           // bare hamza
    .replace(/[٠-٩]/g, '')                  // Arabic-Indic verse numbers
    .replace(/[^؀-ۿ]/g, '')                 // drop spaces/punct/latin
    .trim();
}

// Arabic-Indic numerals, for the ﴿١﴾ verse-marker join style
function arNum(n) {
  return String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
}

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const doFm = args.includes('--frontmatter');
let files = args.filter((a) => !a.startsWith('--'));
if (args.includes('--all')) {
  files = globSync('content/tadabbur/**/*.md').filter(
    (f) => !/\/tafsir[-_]report[-_]/.test(f)
  );
}
if (!files.length) {
  console.error('usage: normalize_canonical_verses.mjs <file.md ...> | --all [--dry]');
  process.exit(2);
}

let filesChanged = 0, versesFixed = 0;
const mismatches = [], missing = [];

for (const file of files) {
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { continue; }
  const before = text;

  // --- 1. body [ayah:S:A] lines -------------------------------------------
  text = text.replace(
    /(\[ayah:(\d+):(\d+)\][ \t]*)([^\n]*)/g,
    (m, tag, s, a, body) => {
      const can = canonical(+s, +a);
      if (!can) { missing.push(`${file} ${s}:${a}`); return m; }
      const cur = body.trim();
      if (cur === can) return m;
      if (fold(cur) === fold(can)) { versesFixed++; return tag + can; }
      mismatches.push({ file, ref: `${s}:${a}`, where: 'body' });
      return m;
    }
  );

  // --- 2. frontmatter arabic: field (OPT-IN, --frontmatter) ---------------
  // Off by default and deliberately so: many files write this field in modern
  // imlāʾī orthography (إِسْرَائِيلَ) rather than Uthmani (إِسْرَٰٓءِيلَ).
  // That is a corpus convention, not drift. Rewriting it would be an
  // orthography migration, which is a separate decision from repairing the
  // diacritic drift enrichment agents introduce in the body ayah lines.
  const fm = doFm && text.match(/^---\n([\s\S]*?)\n---\n/);
  if (fm) {
    const sM = fm[1].match(/^surah:\s*(\d+)/m);
    const s1 = fm[1].match(/^ayah_start:\s*(\d+)/m);
    const s2 = fm[1].match(/^ayah_end:\s*(\d+)/m);
    const arM = fm[1].match(/^arabic:\s*"([\s\S]*?)"\s*$/m);
    if (sM && s1 && arM) {
      const s = +sM[1], a1 = +s1[1], a2 = s2 ? +s2[1] : a1;
      const refs = [];
      for (let a = a1; a <= a2; a++) refs.push(a);
      const cans = refs.map((a) => canonical(s, a));
      if (cans.every(Boolean)) {
        const cur = arM[1];
        // The corpus uses several multi-ayah join styles. Pick the one whose
        // FOLDED form matches what's already there, so the file keeps its own
        // convention and only the diacritics get repaired.
        const candidates = [
          cans.join(' '),
          cans.join(' ۝ '),
          // ﴿١﴾ ornate verse markers, trailing on each verse
          refs.map((a, i) => `${cans[i]} ﴿${arNum(a)}﴾`).join(' '),
          // ۝١ style
          refs.map((a, i) => `${cans[i]} ۝${arNum(a)}`).join(' '),
        ];
        const want = candidates.find((c) => fold(cur) === fold(c)) ?? null;
        if (want && cur !== want) {
          const head = text.slice(0, fm.index + 4);
          const newFm = fm[1].replace(/^arabic:\s*"[\s\S]*?"\s*$/m, `arabic: "${want}"`);
          text = head + newFm + text.slice(fm.index + 4 + fm[1].length);
          versesFixed++;
        } else if (!want) {
          mismatches.push({ file, ref: `${s}:${a1}-${a2}`, where: 'frontmatter' });
        }
      }
    }
  }

  if (text !== before) {
    filesChanged++;
    if (!dry) writeFileSync(file, text);
  }
}

console.log(
  `${dry ? '[dry] ' : ''}files scanned: ${files.length}  files changed: ${filesChanged}  verses normalized: ${versesFixed}`
);
if (missing.length) {
  console.log(`\nrefs not in the Quran database (${missing.length}):`);
  for (const m of missing.slice(0, 20)) console.log(`  ${m}`);
}
if (mismatches.length) {
  console.log(
    `\n⚠  LETTER-LEVEL MISMATCH — NOT auto-fixed, needs a human read (${mismatches.length}):`
  );
  for (const m of mismatches.slice(0, 40)) console.log(`  ${m.file}  ${m.ref}  (${m.where})`);
  console.log('  These differ from canonical by more than diacritics — dropped words,');
  console.log('  elisions, or non-Quranic text. That is the defect class no validator catches.');
}
