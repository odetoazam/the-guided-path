#!/usr/bin/env node
/**
 * Quranic Morphology Verifier
 *
 * Validates linguistic claims (root analysis, POS, morphological form) against
 * the Quranic Arabic Corpus data (corpus.quran.com).
 *
 * Uses the open-source corpus data available via multiple mirrors/APIs.
 * Falls back to bundled morphology data for offline use.
 *
 * Usage:
 *   node verify_morphology.mjs <file>                     # Validate linguistic claims
 *   node verify_morphology.mjs --word "كتب" --ref 2:2     # Direct lookup
 *   node verify_morphology.mjs --setup                    # Download corpus data
 *
 * Claim format in source files (extracted from Step 0 tables or inline):
 *   <!-- morphology:2:2:3 root=k-t-b pos=N form=noun -->
 *   | كِتَابِ | ك ت ب | Noun | ... | HIGH |
 *
 * Data source: Quranic Arabic Corpus (corpus.quran.com)
 *              Mirrors: tanzil.net, qurananalysis.com
 *
 * Dependencies: npm install node-fetch (or use Node 18+ built-in fetch)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CORPUS_CACHE_DIR = join(__dirname, '.corpus-cache');
const CORPUS_FILE = join(CORPUS_CACHE_DIR, 'quranic-corpus.json');

// ── Corpus data sources ──────────────────────────────────────────────────

// Primary: morphology data from the Quranic Arabic Corpus
// These are open mirrors of the corpus.quran.com data
const CORPUS_URLS = [
  'https://raw.githubusercontent.com/AhmedAli2003/quran_data/main/morphology.json',
  'https://raw.githubusercontent.com/nicookn/quran-corpus-morphology/main/data/morphology.json',
];

// ── Root mappings for common Arabic roots ────────────────────────────────
// This is a fallback when API isn't available. Maps transliterated roots
// to their Arabic three-letter forms for matching.

const ROOT_TRANSLITERATION = {
  'k-t-b': 'كتب', 'q-r-a': 'قرأ', 'a-m-n': 'أمن', 'h-d-y': 'هدي',
  's-l-m': 'سلم', 'a-l-h': 'أله', 'r-b-b': 'ربب', 'a-r-d': 'أرض',
  's-m-w': 'سمو', 'n-z-l': 'نزل', 'j-a-l': 'جعل', 'q-w-l': 'قول',
  'a-y-h': 'أيه', 'n-f-s': 'نفس', 'h-f-z': 'حفظ', 'd-k-r': 'ذكر',
  'r-h-m': 'رحم', 'a-k-l': 'أكل', 'sh-r-k': 'شرك', 'z-l-m': 'ظلم',
  'f-t-h': 'فتح', 'n-s-r': 'نصر', 's-b-r': 'صبر', 'sh-k-r': 'شكر',
  't-w-b': 'توب', 'gh-f-r': 'غفر', 'a-m-r': 'أمر', 'w-l-y': 'ولي',
  'h-q-q': 'حقق', 'b-y-n': 'بين', 'j-n-n': 'جنن', 'n-a-r': 'نار',
  'w-h-d': 'وحد', 'kh-l-q': 'خلق', 'j-h-d': 'جهد', 'm-l-k': 'ملك',
  'w-q-y': 'وقي', 'h-s-b': 'حسب', 'r-z-q': 'رزق', 'k-f-r': 'كفر',
  // Extend as needed
};

// ── Parse arguments ───────────────────────────────────────────────────────

const args = process.argv.slice(2);
const doSetup = args.includes('--setup');
const wordFlag = args.indexOf('--word');
const refFlag = args.indexOf('--ref');
let directWord = wordFlag !== -1 ? args[wordFlag + 1] : null;
let directRef = refFlag !== -1 ? args[refFlag + 1] : null;
let file = args.find(a => !a.startsWith('--') && a !== directWord && a !== directRef);

// ── Setup: download corpus data ──────────────────────────────────────────

async function setupCorpus() {
  if (!existsSync(CORPUS_CACHE_DIR)) mkdirSync(CORPUS_CACHE_DIR, { recursive: true });

  console.log('Downloading Quranic Arabic Corpus morphology data...');

  for (const url of CORPUS_URLS) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.text();
        writeFileSync(CORPUS_FILE, data, 'utf-8');
        console.log(`✅ Corpus data downloaded and cached (${(data.length / 1024).toFixed(0)} KB)`);
        return true;
      }
    } catch (e) {
      console.log(`  Failed to fetch from ${url}: ${e.message}`);
    }
  }

  console.log('⚠️  Could not download corpus data from any mirror.');
  console.log('    Falling back to API-based lookups (slower, requires network).');
  return false;
}

// ── Load corpus data ─────────────────────────────────────────────────────

let corpusData = null;

function loadCorpus() {
  if (existsSync(CORPUS_FILE)) {
    try {
      corpusData = JSON.parse(readFileSync(CORPUS_FILE, 'utf-8'));
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

// ── Look up morphology for a word at a specific reference ────────────────

async function lookupMorphology(surah, ayah, wordIndex) {
  // Try cached corpus first
  if (corpusData) {
    const key = `${surah}:${ayah}`;
    const ayahData = corpusData[key];
    if (ayahData) {
      // Data is an array of word entries with { loc, word, pos, root, lemma, features }
      const words = Array.isArray(ayahData) ? ayahData : ayahData.words;
      if (words) {
        const word = words[wordIndex - 1]; // 1-indexed
        if (word) return word;
      }
    }
  }

  // Try API fallback
  try {
    const url = `https://api.corpus.quran.com/morphology/${surah}/${ayah}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (response.ok) {
      const data = await response.json();
      if (data.words) return data.words[wordIndex - 1];
    }
  } catch (e) {
    // API not available
  }

  return null;
}

// ── Extract morphological claims from file ───────────────────────────────

function extractClaims(content) {
  const claims = [];

  // Pattern 1: HTML/JSX comment tags
  // <!-- morphology:S:A:W root=xxx pos=XXX -->
  const tagPattern = /<!--\s*morphology:(\d+):(\d+):(\d+)\s+(.*?)-->/g;
  let match;
  while ((match = tagPattern.exec(content)) !== null) {
    const props = {};
    match[4].split(/\s+/).forEach(pair => {
      const [k, v] = pair.split('=');
      if (k && v) props[k] = v;
    });
    claims.push({
      surah: parseInt(match[1]),
      ayah: parseInt(match[2]),
      wordIndex: parseInt(match[3]),
      claimedRoot: props.root,
      claimedPOS: props.pos,
      claimedForm: props.form,
    });
  }

  // Pattern 2: Markdown table rows (Step 0 table format)
  // | # | Arabic | Root | POS | Form | Meaning | Sonic | Confidence |
  const tableRowPattern = /\|\s*(\d+)\s*\|\s*([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+[^\|]*)\|\s*([^\|]+)\|\s*([^\|]+)\|\s*([^\|]+)\|/g;
  while ((match = tableRowPattern.exec(content)) !== null) {
    const wordNum = parseInt(match[1]);
    const arabicWord = match[2].trim();
    const root = match[3].trim();
    const pos = match[4].trim();
    const form = match[5].trim();

    if (wordNum > 0 && root.length > 0) {
      claims.push({
        wordIndex: wordNum,
        arabicWord,
        claimedRoot: root,
        claimedPOS: pos,
        claimedForm: form,
        fromTable: true,
      });
    }
  }

  // Pattern 3: Inline root claims
  // "root ك ت ب" or "root: k-t-b" or "from the root حفظ"
  const inlineRootPattern = /(?:root|جذر)\s*[:\s]?\s*([\u0600-\u06FF]\s*[\u0600-\u06FF]\s*[\u0600-\u06FF]|[a-z]+-[a-z]+-[a-z]+)/gi;
  while ((match = inlineRootPattern.exec(content)) !== null) {
    claims.push({
      claimedRoot: match[1].trim(),
      inline: true,
      context: content.substring(Math.max(0, match.index - 40), match.index + match[0].length + 40),
    });
  }

  return claims;
}

// ── Validate claims ──────────────────────────────────────────────────────

async function validateClaims(claims) {
  const results = [];

  for (const claim of claims) {
    if (claim.surah && claim.ayah && claim.wordIndex) {
      const corpusWord = await lookupMorphology(claim.surah, claim.ayah, claim.wordIndex);

      if (corpusWord) {
        const rootMatch = !claim.claimedRoot || corpusWord.root === claim.claimedRoot ||
          ROOT_TRANSLITERATION[claim.claimedRoot] === corpusWord.root;
        const posMatch = !claim.claimedPOS || corpusWord.pos?.toLowerCase().includes(claim.claimedPOS.toLowerCase());

        results.push({
          ...claim,
          corpusRoot: corpusWord.root,
          corpusPOS: corpusWord.pos,
          corpusForm: corpusWord.morphology,
          rootMatch,
          posMatch,
          verified: rootMatch && posMatch,
        });
      } else {
        results.push({
          ...claim,
          verified: null,
          note: 'Corpus data not available for this word',
        });
      }
    } else {
      // Claims without specific references can only be flagged for manual review
      results.push({
        ...claim,
        verified: null,
        note: 'No specific ayah reference — manual review needed',
      });
    }
  }

  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  if (doSetup) {
    await setupCorpus();
    return;
  }

  // Try to load cached corpus
  const hasCorpus = loadCorpus();
  if (!hasCorpus) {
    console.log('⚠️  No cached corpus data. Run with --setup first for best results.');
    console.log('    Falling back to API lookups.\n');
  }

  console.log(`\n╔══════════════════════════════════════════════╗`);
  console.log(`║  Morphology Verifier (corpus.quran.com)      ║`);
  console.log(`╚══════════════════════════════════════════════╝\n`);

  if (directWord && directRef) {
    // Direct lookup mode
    const [surah, ayah] = directRef.split(':').map(Number);
    console.log(`Looking up: ${directWord} at ${surah}:${ayah}\n`);
    // For direct lookup we'd need word index — show all words in the ayah
    for (let w = 1; w <= 20; w++) {
      const word = await lookupMorphology(surah, ayah, w);
      if (!word) break;
      console.log(`  Word ${w}: ${word.arabic || '?'} | Root: ${word.root || '?'} | POS: ${word.pos || '?'} | Form: ${word.morphology || '?'}`);
    }
    return;
  }

  if (!file) {
    console.error('Usage: node verify_morphology.mjs <file>');
    console.error('       node verify_morphology.mjs --word "كتب" --ref 2:2');
    console.error('       node verify_morphology.mjs --setup');
    process.exit(1);
  }

  const content = readFileSync(file, 'utf-8');
  const claims = extractClaims(content);

  console.log(`File: ${file}`);
  console.log(`Morphological claims found: ${claims.length}\n`);

  if (claims.length === 0) {
    console.log('No morphological claims detected.');
    console.log('Tip: Tag claims with <!-- morphology:S:A:W root=xxx pos=XXX --> for verification.');
    process.exit(0);
  }

  const results = await validateClaims(claims);

  let passed = 0;
  let failed = 0;
  let unverified = 0;

  for (const r of results) {
    if (r.verified === true) {
      console.log(`  ✅ Word ${r.wordIndex || '?'} at ${r.surah || '?'}:${r.ayah || '?'} — root: ${r.claimedRoot} ✓, POS: ${r.claimedPOS || 'n/a'} ✓`);
      passed++;
    } else if (r.verified === false) {
      console.log(`  ❌ Word ${r.wordIndex || '?'} at ${r.surah || '?'}:${r.ayah || '?'}`);
      if (!r.rootMatch) console.log(`     Root: claimed "${r.claimedRoot}" but corpus says "${r.corpusRoot}"`);
      if (!r.posMatch) console.log(`     POS: claimed "${r.claimedPOS}" but corpus says "${r.corpusPOS}"`);
      failed++;
    } else {
      console.log(`  ⚠️  ${r.note || 'Unverified'}: ${r.claimedRoot || r.arabicWord || '?'}`);
      unverified++;
    }
  }

  console.log(`\n── Summary ──`);
  console.log(`  Verified:   ${passed}`);
  console.log(`  Failed:     ${failed}`);
  console.log(`  Unverified: ${unverified}`);

  if (failed > 0) {
    console.log(`\n⛔ ${failed} morphological claim(s) do not match the Quranic Arabic Corpus.`);
    process.exit(1);
  } else {
    console.log(`\n✅ All verifiable claims match corpus data.`);
  }
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
