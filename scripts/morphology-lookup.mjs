#!/usr/bin/env node
/**
 * Leeds Quranic Corpus Morphology Lookup
 *
 * Provides root/form/POS data per word for any ayah, sourced from the
 * peer-reviewed Leeds Quranic Arabic Corpus (Kais Dukes, 2011).
 *
 * Usage:
 *   node scripts/morphology-lookup.mjs 5:55          # all words in 5:55
 *   node scripts/morphology-lookup.mjs 5:55 --json   # JSON output
 *   import {lookupAyah, lookupRoot} from this module — programmatic use
 *
 * Data format per word (segment-merged):
 *   { surah, ayah, word, arabic, root, lemma, pos, verbForm, features }
 */

import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS_PATH = path.join(__dirname, '.corpus-cache', 'quranic-corpus-morphology.txt');

let _index = null;

/**
 * Parse Buckwalter transliteration features. Returns merged metadata for one word.
 * Multiple segments (PREFIX/STEM/SUFFIX) get merged: STEM is primary, others are noted.
 */
function parseFeatures(featStr) {
  const out = {};
  const parts = featStr.split('|');
  for (const p of parts) {
    if (p === 'STEM' || p === 'PREFIX' || p === 'SUFFIX') continue;
    if (p.startsWith('ROOT:'))   out.root  = p.slice(5);
    else if (p.startsWith('LEM:')) out.lemma = p.slice(4);
    else if (p.startsWith('POS:')) out.pos  = p.slice(4);
    else if (p.startsWith('(') && p.endsWith(')')) {
      // Verb form (II)–(X) like "(IV)" or "(VIII)"
      out.verbForm = p.slice(1, -1);
    }
    else if (p === 'PERF')  out.tense = 'perfect';
    else if (p === 'IMPF')  out.tense = 'imperfect';
    else if (p === 'IMPV')  out.tense = 'imperative';
    else if (p === 'PASS')  out.voice = 'passive';
    else if (p === 'ACT')   out.voice = 'active';
    else if (p === 'NOM' || p === 'GEN' || p === 'ACC') out.case = p;
    else if (p === 'M' || p === 'F' || p === 'MS' || p === 'MP' || p === 'FS' || p === 'FP') out.gender = p;
    else if (p === 'DEF')   out.definite = true;
    else if (p === 'INDEF') out.definite = false;
  }
  return out;
}

function buildIndex() {
  console.error('Loading Leeds corpus...');
  const data = readFileSync(CORPUS_PATH, 'utf8');
  const lines = data.split('\n');

  const index = new Map();   // key: "S:A" → array of word objects
  const rootIndex = new Map(); // key: root → array of locations

  for (const line of lines) {
    if (!line || line.startsWith('#') || line.startsWith('LOCATION')) continue;
    const tabs = line.split('\t');
    if (tabs.length < 4) continue;

    const loc = tabs[0];           // (S:A:W:Seg)
    const form = tabs[1];          // buckwalter form
    const tag = tabs[2];           // POS tag
    const features = tabs[3];      // features string

    const m = loc.match(/^\((\d+):(\d+):(\d+):(\d+)\)$/);
    if (!m) continue;
    const [, s, a, w, seg] = m.map(Number);
    const ayahKey = `${s}:${a}`;

    if (!index.has(ayahKey)) index.set(ayahKey, []);
    const ayahWords = index.get(ayahKey);

    // Find or create the word entry (segment 1 is the stem typically)
    let word = ayahWords.find(x => x.word === w);
    if (!word) {
      word = {
        surah: s, ayah: a, word: w,
        segments: [],
        arabic: '',
      };
      ayahWords.push(word);
    }

    const parsedFeat = parseFeatures(features);
    word.segments.push({
      seg, form, tag, features, ...parsedFeat,
    });

    // Concatenate Buckwalter forms (rough Arabic reassembly)
    word.arabic += form;

    // Promote stem-level data to word-level (the STEM segment carries root/lemma/pos)
    if (parsedFeat.root) {
      word.root = parsedFeat.root;
      if (!rootIndex.has(parsedFeat.root)) rootIndex.set(parsedFeat.root, []);
      rootIndex.get(parsedFeat.root).push(`${s}:${a}:${w}`);
    }
    if (parsedFeat.lemma) word.lemma = parsedFeat.lemma;
    if (parsedFeat.pos)   word.pos = parsedFeat.pos;
    if (parsedFeat.verbForm) word.verbForm = parsedFeat.verbForm;
    if (parsedFeat.tense) word.tense = parsedFeat.tense;
    if (parsedFeat.case)  word.case = parsedFeat.case;
    if (parsedFeat.gender) word.gender = parsedFeat.gender;
  }

  console.error(`Indexed ${index.size} ayahs, ${rootIndex.size} unique roots.`);
  return { index, rootIndex };
}

function ensureLoaded() {
  if (!_index) _index = buildIndex();
  return _index;
}

/**
 * Returns array of word objects for the given S:A reference.
 * Each word has: word#, arabic, root, lemma, pos, verbForm (if verb), case, gender, etc.
 */
export function lookupAyah(surah, ayah) {
  const { index } = ensureLoaded();
  return index.get(`${surah}:${ayah}`) || [];
}

/**
 * Find all occurrences of a given root across the Quran.
 * Returns array of locations like ["5:55:2", "5:51:5", ...]
 */
export function lookupRoot(root) {
  const { rootIndex } = ensureLoaded();
  return rootIndex.get(root) || [];
}

/**
 * For a given ayah, return the set of all roots present.
 * Used to verify "root X-Y-Z" claims against actual word data.
 */
export function rootsInAyah(surah, ayah) {
  const words = lookupAyah(surah, ayah);
  return new Set(words.filter(w => w.root).map(w => w.root));
}

/**
 * Normalize a root claim from prose to Leeds-corpus Buckwalter form.
 * Handles common transliterations: "و-ل-ي" → "wly", "ka-ta-ba" → "ktb", etc.
 * Returns null if cannot normalize.
 */
export function normalizeRoot(claim) {
  const ARABIC_TO_BUCKWALTER = {
    'ا':'A','ب':'b','ت':'t','ث':'v','ج':'j','ح':'H','خ':'x','د':'d','ذ':'*',
    'ر':'r','ز':'z','س':'s','ش':'$','ص':'S','ض':'D','ط':'T','ظ':'Z','ع':'E',
    'غ':'g','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n','ه':'h','و':'w',
    'ي':'y','ى':'Y',
    // IMPORTANT: Leeds normalizes hamza variants to plain alef in ROOT strings.
    // أ، إ، ء، ؤ، ئ all become 'A' in roots (not '>', '<', "'", '&', '}').
    'ء':'A','أ':'A','إ':'A','ؤ':'A','ئ':'A','ة':'p',
  };
  const clean = claim.replace(/[-‐–—\s]/g, '');
  let buck = '';
  for (const ch of clean) {
    if (ARABIC_TO_BUCKWALTER[ch]) buck += ARABIC_TO_BUCKWALTER[ch];
    else if (/[a-zA-Z*'<>&{}\[\]@`,\.\?]/.test(ch)) buck += ch;
    else return null;
  }
  return buck;
}

// CLI mode
if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node scripts/morphology-lookup.mjs <surah:ayah> [--json]');
    process.exit(1);
  }
  const [s, a] = arg.split(':').map(Number);
  const json = process.argv.includes('--json');
  const words = lookupAyah(s, a);

  if (json) {
    console.log(JSON.stringify(words, null, 2));
  } else {
    console.log(`\nSurah ${s}, Ayah ${a} — ${words.length} words\n`);
    console.log('  W#  Arabic                  Root      Form  POS    Case  Gender');
    console.log('  ──  ──────────────────────  ────────  ────  ─────  ────  ──────');
    for (const w of words) {
      const arab = (w.arabic || '').padEnd(22);
      const root = (w.root || '').padEnd(8);
      const form = (w.verbForm || '').padEnd(4);
      const pos = (w.pos || '').padEnd(5);
      const cs = (w.case || '').padEnd(4);
      const gen = w.gender || '';
      console.log(`  ${String(w.word).padStart(2)}  ${arab}  ${root}  ${form}  ${pos}  ${cs}  ${gen}`);
    }
  }
}
