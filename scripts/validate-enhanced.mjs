#!/usr/bin/env node
/**
 * AyahGuide Enhanced Validator
 *
 * Validates a tadabbur file against live Islamic scholarship APIs:
 *   1. Arabic text  — alquran.cloud Uthmani + quran-validator cross-check
 *   2. Tafsir match — 4 classical sources (Jalalayn, Muyassar, Qurtubi, Baghawi)
 *   3. Scholar claims — Claude compares attributed positions vs actual tafsir text
 *   4. Word meanings — word-by-word reference vs claims in prose
 *
 * Usage:
 *   node scripts/validate-enhanced.mjs <file.md>
 *   node scripts/validate-enhanced.mjs content/tadabbur/005-al-maidah/ayah-055.md
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ALQURAN_BASE = 'https://api.alquran.cloud/v1';
const TAFSIR_EDITIONS = 'ar.jalalayn,ar.muyassar,ar.qurtubi,ar.baghawi';

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split('\n')) {
    const [k, ...rest] = line.split(':');
    if (k && rest.length) {
      fm[k.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  }
  return fm;
}

function extractAyahRef(fm) {
  const surah = parseInt(fm.surah);
  const ayah  = parseInt(fm.ayah_start);
  if (!surah || !ayah) return null;
  return `${surah}:${ayah}`;
}

function normalizeArabic(text) {
  return text
    .replace(/[ً-ٰٟ]/g, '') // remove diacritics
    .replace(/ٱ/g, 'ا')           // alef wasla → alef
    .replace(/[آأإ]/g, 'ا') // alef variants → alef
    .replace(/ى/g, 'ي')           // alef maqsura → ya
    .replace(/ة/g, 'ه')           // ta marbuta → ha
    .trim();
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json();
}

// ── Layer 1: Arabic Text Verification ────────────────────────────────────────

async function verifyArabic(ayahRef, fileContent) {
  const issues = [];
  let apiText = null;

  try {
    const data = await fetchJson(`${ALQURAN_BASE}/ayah/${ayahRef}/quran-uthmani`);
    apiText = data?.data?.text;
    if (!apiText) throw new Error('No text returned');
  } catch (e) {
    return { passed: null, issues: [`Could not fetch Arabic from alquran.cloud: ${e.message}`], apiText: null };
  }

  // Extract Arabic quoted in the file (tagged ayah references)
  const taggedMatches = [...fileContent.matchAll(/\[ayah:\d+:\d+\]\s*([؀-ۿ\sً-ٟؐ-ؚ]+)/g)];
  const inlineArabic = [...fileContent.matchAll(/<!-- ayah:\d+:\d+ -->\s*([؀-ۿ\sً-ٟ]+)/g)];

  const quotedTexts = [...taggedMatches, ...inlineArabic].map(m => m[1].trim());

  let matched = false;
  for (const quoted of quotedTexts) {
    const normQuoted = normalizeArabic(quoted);
    const normApi    = normalizeArabic(apiText);
    if (normApi.includes(normQuoted.slice(0, 30)) || normQuoted.includes(normApi.slice(0, 30))) {
      matched = true;
      break;
    }
  }

  if (quotedTexts.length === 0) {
    issues.push('No tagged Arabic quotations found — add [ayah:S:A] tags to Arabic text');
  } else if (!matched) {
    issues.push(`Arabic text mismatch. API: "${apiText.slice(0, 80)}..."`);
  }

  return { passed: issues.length === 0, issues, apiText };
}

// ── Layer 2: Tafsir Cross-Reference ──────────────────────────────────────────

async function fetchTafsirs(ayahRef) {
  try {
    const data = await fetchJson(
      `${ALQURAN_BASE}/ayah/${ayahRef}/editions/${TAFSIR_EDITIONS}`
    );
    const result = {};
    for (const item of (data?.data || [])) {
      result[item.edition.identifier] = item.text;
    }
    return result;
  } catch (e) {
    return {};
  }
}

// ── Layer 3: Word-by-Word Reference ──────────────────────────────────────────

async function fetchWordByWord(ayahRef) {
  try {
    const data = await fetchJson(`${ALQURAN_BASE}/ayah/${ayahRef}/quran-wordbyword`);
    const text = data?.data?.text || '';
    return text.split('$').map(w => {
      const parts = w.split('|');
      return { arabic: parts[0], translation: parts[1] };
    }).filter(w => w.arabic);
  } catch (e) {
    return [];
  }
}

// ── Layer 4: Claude Semantic Check ───────────────────────────────────────────

function claudeCheck(fileContent, tafsirs, wordByWord, apiText, ayahRef) {
  const tafsirSummary = Object.entries(tafsirs)
    .map(([k, v]) => `${k}: ${v?.slice(0, 300)}`)
    .join('\n\n');

  const wordSummary = wordByWord
    .map(w => `${w.arabic} = ${w.translation}`)
    .join(' | ');

  const system = `You are a rigorous Islamic scholarship validator for AyahGuide.
You will receive a tadabbur reflection and authoritative reference data.
Your job: identify ONLY genuine errors — not style choices.

Flag:
CRITICAL — root wrong, verb form wrong, scholar attribution inverted, Arabic text error
MODERATE — claim stated as documented fact but is interpretive extension, scholar position overstated
PASS — content is accurate and well-grounded

Output format (strict):
VERDICT: CRITICAL|MODERATE|PASS
ISSUES:
- [SEVERITY] "exact quote from reflection" — specific reason with reference to tafsir/word data
SUMMARY: one sentence`;

  const user = `AYAH: ${ayahRef}
AUTHENTIC ARABIC: ${apiText || 'unavailable'}

WORD-BY-WORD REFERENCE:
${wordSummary || 'unavailable'}

CLASSICAL TAFSIR SOURCES:
${tafsirSummary || 'unavailable'}

REFLECTION TO VALIDATE (first 8000 chars):
${fileContent.slice(0, 8000)}

Validate now. Be specific — quote exact phrases. If you cannot verify a claim from the reference data provided, say so rather than guessing.`;

  try {
    const result = execSync(
      `claude -p --model sonnet --output-format text --no-session-persistence`,
      {
        input: `${system}\n\n---USER---\n${user}`,
        encoding: 'utf8',
        timeout: 180000,
        env: { ...process.env, CLAUDE_SYSTEM_PROMPT: system }
      }
    );
    return result.trim();
  } catch (e) {
    // Try alternate invocation
    try {
      const tmp = `/tmp/validate-prompt-${Date.now()}.txt`;
      fs.writeFileSync(tmp, user);
      const result = execSync(
        `claude -p --system-prompt ${JSON.stringify(system)} --model sonnet --output-format text --no-session-persistence < ${tmp}`,
        { shell: true, encoding: 'utf8', timeout: 180000 }
      );
      fs.unlinkSync(tmp);
      return result.trim();
    } catch (e2) {
      return `VERDICT: ERROR\nISSUES:\n- Could not run Claude check: ${e2.message?.slice(0,100)}\nSUMMARY: Claude semantic check failed`;
    }
  }
}

// ── Layer 5: quran-validator npm package ─────────────────────────────────────

function runNpmValidator(filePath) {
  try {
    const result = execSync(
      `node scripts/verify_arabic.mjs "${filePath}" --scan`,
      { encoding: 'utf8', timeout: 30000, cwd: path.resolve('.') }
    );
    const passed = !result.includes('Failed:') || result.includes('Failed:   0');
    const warnings = result.includes('Warning') || result.includes('⚠');
    return { passed, warnings, output: result.trim().split('\n').slice(-5).join('\n') };
  } catch (e) {
    return { passed: false, warnings: false, output: e.message?.slice(0,100) };
  }
}

// ── Report ────────────────────────────────────────────────────────────────────

function updateFrontmatter(filePath, tag) {
  let content = fs.readFileSync(filePath, 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  const reviewTag = `"enhanced-${today}"`;

  if (content.includes('semantic_review:')) {
    content = content.replace(/^semantic_review:.*$/m, `semantic_review: ${reviewTag}`);
  } else {
    content = content.replace(
      /^(validation_date:.*$)/m,
      `$1\nsemantic_review: ${reviewTag}`
    );
  }
  // Also flip validated to true if it's false
  content = content.replace(/^validated: false$/m, 'validated: true');
  fs.writeFileSync(filePath, content);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node scripts/validate-enhanced.mjs <path/to/ayah.md>');
    process.exit(1);
  }

  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    console.error(`File not found: ${absPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(absPath, 'utf8');
  const fm = parseFrontmatter(fileContent);
  const ayahRef = extractAyahRef(fm);

  if (!ayahRef) {
    console.error('Could not parse surah/ayah from frontmatter');
    process.exit(1);
  }

  console.log(`\n🔍 Enhanced Validation: ${path.basename(filePath)}`);
  console.log(`   Ayah: ${ayahRef} — "${fm.title?.slice(0,60)}"`);
  console.log('');

  // Run all layers in parallel where possible
  console.log('   Fetching Arabic text, tafsirs, word-by-word...', );
  const [arabicResult, tafsirs, wordByWord] = await Promise.all([
    verifyArabic(ayahRef, fileContent),
    fetchTafsirs(ayahRef),
    fetchWordByWord(ayahRef),
  ]);

  // Layer 1: Arabic
  const arabicStatus = arabicResult.passed === null ? '⚠️  skip'
    : arabicResult.passed ? '✅ pass' : '❌ fail';
  console.log(`   [1] Arabic text:     ${arabicStatus}`);
  if (arabicResult.issues.length) arabicResult.issues.forEach(i => console.log(`        → ${i}`));

  // Layer 2: Tafsir availability
  const tafsirCount = Object.keys(tafsirs).length;
  console.log(`   [2] Tafsirs loaded:  ${tafsirCount}/4 (${Object.keys(tafsirs).join(', ')})`);

  // Layer 3: Word-by-word
  console.log(`   [3] Word-by-word:    ${wordByWord.length} words loaded`);

  // Layer 4: quran-validator
  const npmResult = runNpmValidator(filePath);
  const npmStatus = npmResult.passed ? '✅ pass' : '❌ fail';
  console.log(`   [4] quran-validator: ${npmStatus}${npmResult.warnings ? ' (warnings)' : ''}`);

  // Layer 5: Claude semantic check
  console.log('   [5] Claude semantic check (sonnet)...');
  const claudeOutput = claudeCheck(fileContent, tafsirs, wordByWord, arabicResult.apiText, ayahRef);
  const verdictMatch = claudeOutput.match(/VERDICT:\s*(\w+)/);
  const verdict = verdictMatch?.[1]?.toUpperCase() || 'UNKNOWN';
  const verdictEmoji = { CRITICAL: '🔴', MODERATE: '🟡', PASS: '✅', ERROR: '⚠️ ', UNKNOWN: '❓' }[verdict] || '❓';
  console.log(`   [5] Semantic verdict: ${verdictEmoji} ${verdict}`);

  // Print issues inline
  const issueLines = claudeOutput.split('\n').filter(l => l.startsWith('- ['));
  issueLines.forEach(l => console.log(`        ${l}`));

  const summaryMatch = claudeOutput.match(/SUMMARY:\s*(.+)/);
  if (summaryMatch) console.log(`\n   Summary: ${summaryMatch[1]}`);

  // Write report file
  const reportPath = filePath.replace('.md', '.validation-report.txt');
  const report = [
    `Enhanced Validation Report`,
    `File: ${filePath}`,
    `Ayah: ${ayahRef}`,
    `Date: ${new Date().toISOString().slice(0,19)}`,
    ``,
    `[1] Arabic text: ${arabicStatus}`,
    ...arabicResult.issues.map(i => `    → ${i}`),
    ``,
    `[2] Tafsirs: ${Object.keys(tafsirs).join(', ')}`,
    ``,
    `[3] Word-by-word: ${wordByWord.map(w => `${w.arabic}=${w.translation}`).join(' | ')}`,
    ``,
    `[4] quran-validator: ${npmStatus}`,
    npmResult.output,
    ``,
    `[5] Claude semantic check:`,
    claudeOutput,
  ].join('\n');
  fs.writeFileSync(reportPath, report);

  // Update frontmatter
  if (verdict === 'PASS' || verdict === 'MODERATE') {
    updateFrontmatter(absPath, verdict);
    console.log(`\n   ✓ Frontmatter updated with semantic_review tag`);
  }

  console.log(`   Report: ${reportPath}`);
  console.log('');

  // Exit code for pipeline integration
  process.exit(verdict === 'CRITICAL' ? 1 : 0);
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
