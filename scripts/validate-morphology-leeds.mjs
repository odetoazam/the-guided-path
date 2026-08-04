#!/usr/bin/env node
/**
 * Morphology Validator — Leeds Corpus Edition
 *
 * Reads a tadabbur file, extracts every root and verb-form claim from prose
 * and the Step 0 morphology table, and verifies each claim against the
 * peer-reviewed Leeds Quranic Arabic Corpus (Kais Dukes, 2011).
 *
 * Catches:
 *   - Fabricated roots (claim "root X-Y-Z" when Leeds shows different root)
 *   - Wrong verb forms (claim "Form IV" when Leeds shows Form I, II, V, etc.)
 *   - Roots claimed for an ayah that don't appear in any of its words
 *
 * Usage:
 *   node scripts/validate-morphology-leeds.mjs <file.md>
 */

import { readFileSync } from 'fs';
import path from 'path';
import { lookupAyah, rootsInAyah, normalizeRoot } from './morphology-lookup.mjs';

// ── Parse frontmatter ────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { surah: null, ayahStart: null, ayahEnd: null };
  const fm = m[1];
  const surahM = fm.match(/^surah:\s*(\d+)/m);
  const startM = fm.match(/^ayah_start:\s*(\d+)/m);
  const endM   = fm.match(/^ayah_end:\s*(\d+)/m);
  return {
    surah: surahM ? parseInt(surahM[1]) : null,
    ayahStart: startM ? parseInt(startM[1]) : null,
    ayahEnd: endM ? parseInt(endM[1]) : null,
  };
}

// ── Extract root claims from prose ───────────────────────────────────────────

function extractRootClaims(text) {
  const claims = [];
  // Pattern 1: "root X-Y-Z" or "root: X-Y-Z" with Arabic letters
  const pArabic = /root[:\s]+([ء-ي])\s*[-‐–—]\s*([ء-ي])\s*[-‐–—]\s*([ء-ي])(?:\s*[-‐–—]\s*([ء-ي]))?/gi;
  let m;
  while ((m = pArabic.exec(text)) !== null) {
    const root = (m[1] + m[2] + m[3] + (m[4] || '')).replace(/[-‐–—\s]/g, '');
    claims.push({ raw: m[0], rootArabic: root, type: 'arabic' });
  }

  // Pattern 2: "root w-l-y" or "root: w-l-y" in Latin transliteration
  const pLatin = /root[:\s]+([a-z'<>&*$])(?:\s*[-‐–—]\s*)([a-z'<>&*$])(?:\s*[-‐–—]\s*)([a-z'<>&*$])/gi;
  while ((m = pLatin.exec(text)) !== null) {
    claims.push({ raw: m[0], rootLatin: (m[1]+m[2]+m[3]).toLowerCase(), type: 'latin' });
  }

  // Pattern 3: Morphology table rows: | word | root X-Y-Z | ...
  const tablePattern = /\|\s*([^|]+?)\s*\|\s*([ء-ي](?:\s*[-‐–—]?\s*[ء-ي]){2,3})\s*\|/g;
  while ((m = tablePattern.exec(text)) !== null) {
    const cleanWord = m[1].trim();
    const cleanRoot = m[2].replace(/[-‐–—\s]/g, '');
    if (cleanRoot.length >= 3 && cleanRoot.length <= 4) {
      claims.push({ raw: m[0], wordArabic: cleanWord, rootArabic: cleanRoot, type: 'table' });
    }
  }

  // Pattern 4: HTML morphology comments <!-- morphology:S:A:W root=XXX -->
  const commentPattern = /<!--\s*morphology:\s*(\d+):(\d+):(\d+)\s+root=([^\s>]+)/g;
  while ((m = commentPattern.exec(text)) !== null) {
    claims.push({
      raw: m[0],
      surah: parseInt(m[1]),
      ayah: parseInt(m[2]),
      word: parseInt(m[3]),
      rootArabic: m[4],
      type: 'comment',
    });
  }

  return claims;
}

// ── Extract verb form claims ─────────────────────────────────────────────────

function extractVerbFormClaims(text) {
  const claims = [];
  // "Form IV" or "Form II" or "Form VIII"
  const formPattern = /\bForm\s+(I{1,3}|IV|VI{0,3}|IX|X)\b/g;
  let m;
  while ((m = formPattern.exec(text)) !== null) {
    // Look back 100 chars for an Arabic word context
    const back = text.slice(Math.max(0, m.index - 150), m.index);
    const arabicCtx = back.match(/([ء-يً-ٰ]{2,})/g);
    claims.push({
      raw: m[0],
      formRoman: m[1],
      contextWord: arabicCtx ? arabicCtx[arabicCtx.length - 1] : null,
      contextBefore: back.slice(-60),
    });
  }
  // "Form II"/"III" — also match (II)–(X) in parens for the morphology table
  const parenPattern = /\((I{1,3}|IV|VI{0,3}|IX|X)\)/g;
  while ((m = parenPattern.exec(text)) !== null) {
    const back = text.slice(Math.max(0, m.index - 150), m.index);
    const arabicCtx = back.match(/([ء-يً-ٰ]{2,})/g);
    claims.push({
      raw: m[0],
      formRoman: m[1],
      contextWord: arabicCtx ? arabicCtx[arabicCtx.length - 1] : null,
    });
  }
  return claims;
}

// ── Validate a single root claim ─────────────────────────────────────────────

function validateRootClaim(claim, surah, ayahStart, ayahEnd) {
  // Convert Arabic root to Buckwalter
  const buckRoot = claim.rootArabic
    ? normalizeRoot(claim.rootArabic)
    : (claim.rootLatin || '').toLowerCase();

  if (!buckRoot) return { status: 'unverified', reason: 'could not normalize root' };

  // Check if this root appears in any word in the ayah range
  for (let a = ayahStart; a <= ayahEnd; a++) {
    const roots = rootsInAyah(surah, a);
    if (roots.has(buckRoot)) {
      return { status: 'pass', foundIn: `${surah}:${a}` };
    }
  }

  // Check if it's a derivational root (e.g., تولي vs ولي — the latter is the root)
  // Try last 3 chars
  if (buckRoot.length === 4) {
    const tail3 = buckRoot.slice(-3);
    for (let a = ayahStart; a <= ayahEnd; a++) {
      const roots = rootsInAyah(surah, a);
      if (roots.has(tail3)) {
        return {
          status: 'derived',
          reason: `claimed root "${buckRoot}" is a derivation; actual root is "${tail3}"`,
          foundIn: `${surah}:${a}`,
        };
      }
    }
  }

  return {
    status: 'fail',
    reason: `root "${buckRoot}" not found in any word of ${surah}:${ayahStart}-${ayahEnd}`,
  };
}

// ── Validate verb form claim ─────────────────────────────────────────────────

function validateVerbForm(claim, surah, ayahStart, ayahEnd) {
  if (!claim.contextWord) return { status: 'unverified', reason: 'no word context' };

  // Form I is NEVER explicitly tagged in Leeds — it's the default base form.
  // If the file claims "Form I", check that at least one verb (any form) exists.
  if (claim.formRoman === 'I') {
    for (let a = ayahStart; a <= ayahEnd; a++) {
      const words = lookupAyah(surah, a);
      const hasVerb = words.some(w => w.pos === 'V');
      // Form I = verb with no explicit form annotation
      const hasFormI = words.some(w => w.pos === 'V' && !w.verbForm);
      if (hasFormI) {
        return { status: 'pass', foundIn: `${surah}:${a}`, note: 'Form I (default, untagged in Leeds)' };
      }
    }
    return { status: 'unverified', reason: 'Form I claim — no untagged verb found in range' };
  }

  for (let a = ayahStart; a <= ayahEnd; a++) {
    const words = lookupAyah(surah, a);
    const verbForms = new Set(words.filter(w => w.verbForm).map(w => w.verbForm));
    if (verbForms.has(claim.formRoman)) {
      return { status: 'pass', foundIn: `${surah}:${a}`, allFormsInAyah: [...verbForms] };
    }
  }

  const allForms = new Set();
  for (let a = ayahStart; a <= ayahEnd; a++) {
    const words = lookupAyah(surah, a);
    words.filter(w => w.verbForm).forEach(w => allForms.add(w.verbForm));
  }

  return {
    status: 'fail',
    reason: `Form ${claim.formRoman} not present in ${surah}:${ayahStart}-${ayahEnd}; actual forms in ayah: ${[...allForms].join(', ') || 'none'}`,
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node scripts/validate-morphology-leeds.mjs <file.md>');
    process.exit(1);
  }

  const content = readFileSync(filePath, 'utf8');
  const { surah, ayahStart, ayahEnd } = parseFrontmatter(content);

  if (!surah || !ayahStart) {
    console.error('Could not parse surah/ayah from frontmatter');
    process.exit(1);
  }

  const aEnd = ayahEnd || ayahStart;

  console.log(`\nMorphology validation: ${path.basename(filePath)}`);
  console.log(`Ayah range: ${surah}:${ayahStart}${aEnd > ayahStart ? '-' + aEnd : ''}`);
  console.log('');

  // What Leeds knows about this ayah
  const expectedRoots = new Set();
  const expectedForms = new Set();
  for (let a = ayahStart; a <= aEnd; a++) {
    rootsInAyah(surah, a).forEach(r => expectedRoots.add(r));
    lookupAyah(surah, a).filter(w => w.verbForm).forEach(w => expectedForms.add(w.verbForm));
  }
  console.log(`Leeds corpus says ayah contains:`);
  console.log(`  Roots: ${[...expectedRoots].join(', ')}`);
  console.log(`  Verb forms: ${[...expectedForms].join(', ') || '(none)'}`);
  console.log('');

  // Extract claims
  const rootClaims = extractRootClaims(content);
  const formClaims = extractVerbFormClaims(content);

  console.log(`Claims found: ${rootClaims.length} roots, ${formClaims.length} verb forms`);
  console.log('');

  let critical = 0, moderate = 0, passed = 0;

  // Validate roots
  if (rootClaims.length) {
    console.log('ROOT CLAIMS:');
    for (const c of rootClaims) {
      const r = validateRootClaim(c, surah, ayahStart, aEnd);
      const arab = c.rootArabic || c.rootLatin || '?';
      if (r.status === 'pass') {
        console.log(`  ✓ ${arab} — found in ${r.foundIn}`);
        passed++;
      } else if (r.status === 'derived') {
        console.log(`  ⚠ ${arab} — ${r.reason}`);
        moderate++;
      } else if (r.status === 'fail') {
        console.log(`  ✗ ${arab} — ${r.reason}`);
        critical++;
      } else {
        console.log(`  ? ${arab} — ${r.reason}`);
      }
    }
    console.log('');
  }

  // Validate verb forms (only meaningful if file actually claims specific forms)
  if (formClaims.length) {
    console.log('VERB FORM CLAIMS:');
    const seen = new Set();
    for (const c of formClaims) {
      const key = c.formRoman + '|' + (c.contextWord || '');
      if (seen.has(key)) continue;
      seen.add(key);

      const r = validateVerbForm(c, surah, ayahStart, aEnd);
      if (r.status === 'pass') {
        console.log(`  ✓ Form ${c.formRoman} — present in ${r.foundIn}`);
        passed++;
      } else if (r.status === 'fail') {
        console.log(`  ✗ Form ${c.formRoman} — ${r.reason}`);
        critical++;
      }
    }
    console.log('');
  }

  console.log(`${'─'.repeat(50)}`);
  console.log(`Summary:  ${passed} ✓  |  ${moderate} ⚠  |  ${critical} ✗`);
  process.exit(critical > 0 ? 1 : 0);
}

main();
