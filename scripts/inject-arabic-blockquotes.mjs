#!/usr/bin/env node
/**
 * inject-arabic-blockquotes.mjs
 * Injects Arabic text into blockquotes missing it across all draft files.
 */
import fs from 'fs';
import path from 'path';

const corpusPath = '/Users/azamkhan/the-guided-path/scripts/.corpus-cache/quranic-corpus.json';
const draftsDir = '/Users/azamkhan/the-guided-path/scripts/drafts';

const corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf8'));

function getArabicForAyah(surah, ayah) {
  const key = `${surah}:${ayah}`;
  const tokens = corpus[key];
  if (!tokens) return null;
  const words = {};
  for (const t of tokens) {
    const parts = t.loc.split(':');
    const wordIdx = parseInt(parts[2]);
    if (!words[wordIdx]) words[wordIdx] = [];
    words[wordIdx].push(t.word);
  }
  const wordNums = Object.keys(words).map(Number).sort((a, b) => a - b);
  return wordNums.map(w => words[w].join('')).join(' ');
}

function getArabicForRange(surah, startAyah, endAyah) {
  const parts = [];
  for (let a = startAyah; a <= endAyah; a++) {
    const text = getArabicForAyah(surah, a);
    if (text) parts.push(text);
    else console.warn(`  WARNING: No corpus entry for ${surah}:${a}`);
  }
  return parts.join(' ');
}

// Surah name to number mapping
const surahNumbers = {
  'Al-Fatihah': 1, 'Al-Baqarah': 2, 'Aal-e-Imran': 3, 'An-Nisa': 4, 'Al-Maidah': 5,
  'Al-Anam': 6, 'Al-Araf': 7, 'Al-Anfal': 8, 'At-Tawbah': 9, 'Yunus': 10,
  'Hud': 11, 'Yusuf': 12, 'Ar-Rad': 13, 'Ibrahim': 14, 'Al-Hijr': 15,
  'An-Nahl': 16, 'Al-Isra': 17, 'Al-Kahf': 18, 'Maryam': 19, 'Ta-Ha': 20,
  'Al-Anbiya': 21, 'Al-Hajj': 22, 'Al-Muminun': 23, 'An-Nur': 24, 'Al-Furqan': 25,
  'Ash-Shuara': 26, 'An-Naml': 27, 'Al-Qasas': 28, 'Al-Ankabut': 29, 'Ar-Rum': 30,
  'Luqman': 31, 'As-Sajdah': 32, 'Al-Ahzab': 33, 'Saba': 34, 'Fatir': 35,
  'Ya-Sin': 36, 'As-Saffat': 37, 'Sad': 38, 'Az-Zumar': 39, 'Ghafir': 40,
  'Fussilat': 41, 'Ash-Shura': 42, 'Az-Zukhruf': 43, 'Ad-Dukhan': 44, 'Al-Jathiyah': 45,
  'Al-Ahqaf': 46, 'Muhammad': 47, 'Al-Fath': 48, 'Al-Hujurat': 49, 'Qaf': 50,
  'Adh-Dhariyat': 51, 'At-Tur': 52, 'An-Najm': 53, 'Al-Qamar': 54, 'Ar-Rahman': 55,
  'Al-Waqiah': 56, 'Al-Hadid': 57, 'Al-Mujadila': 58, 'Al-Hashr': 59, 'Al-Mumtahanah': 60,
  'As-Saff': 61, 'Al-Jumuah': 62, 'Al-Munafiqun': 63, 'At-Taghabun': 64, 'At-Talaq': 65,
  'At-Tahrim': 66, 'Al-Mulk': 67, 'Al-Qalam': 68, 'Al-Haqqah': 69, 'Al-Maarij': 70,
  'Nuh': 71, 'Al-Jinn': 72, 'Al-Muzzammil': 73, 'Al-Muddaththir': 74, 'Al-Qiyamah': 75,
  'Al-Insan': 76, 'Al-Mursalat': 77, 'An-Naba': 78, 'An-Naziat': 79, 'Abasa': 80,
  'At-Takwir': 81, 'Al-Infitar': 82, 'Al-Mutaffifin': 83, 'Al-Inshiqaq': 84, 'Al-Buruj': 85,
  'At-Tariq': 86, 'Al-Ala': 87, 'Al-Ghashiyah': 88, 'Al-Fajr': 89, 'Al-Balad': 90,
  'Ash-Shams': 91, 'Al-Layl': 92, 'Ad-Duha': 93, 'Ash-Sharh': 94, 'At-Tin': 95,
  'Al-Alaq': 96, 'Al-Qadr': 97, 'Al-Bayyinah': 98, 'Az-Zalzalah': 99, 'Al-Adiyat': 100,
  'Al-Qariah': 101, 'At-Takathur': 102, 'Al-Asr': 103, 'Al-Humazah': 104, 'Al-Fil': 105,
  'Quraysh': 106, 'Al-Maun': 107, 'Al-Kawthar': 108, 'Al-Kafirun': 109, 'An-Nasr': 110,
  'Al-Masad': 111, 'Al-Ikhlas': 112, 'Al-Falaq': 113, 'An-Nas': 114,
};

function parseCiteRef(citeText) {
  // e.g. "Al-Baqarah (2:40-41)" or "Ar-Rahman (55:60)" or "Al-Baqarah (2:83-84)"
  const match = citeText.match(/\((\d+):(\d+)(?:-(\d+))?\)/);
  if (!match) return null;
  const surah = parseInt(match[1]);
  const startAyah = parseInt(match[2]);
  const endAyah = match[3] ? parseInt(match[3]) : startAyah;
  return { surah, startAyah, endAyah };
}

const ARABIC_TAG = `  <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already has arabic tags
  if (content.includes('class="arabic"')) {
    console.log(`  SKIP (already has Arabic): ${path.basename(filePath)}`);
    return false;
  }

  // Find all blockquotes and process them
  // Pattern: <blockquote class="ayah-quote">\n  <p class="translation">...</p>\n  <cite>...</cite>\n</blockquote>
  let modified = content;
  let changed = false;

  // Use regex to find each blockquote that doesn't have arabic
  const blockquoteRegex = /<blockquote class="ayah-quote">\s*\n(\s*)<p class="translation">([\s\S]*?)<\/p>\s*\n(\s*)<cite>(.*?)<\/cite>\s*\n(\s*)<\/blockquote>/g;

  modified = content.replace(blockquoteRegex, (match, indent1, translationContent, indent2, citeContent, indent3) => {
    const ref = parseCiteRef(citeContent);
    if (!ref) {
      console.warn(`  WARNING: Could not parse cite: "${citeContent}"`);
      return match;
    }

    const arabicText = getArabicForRange(ref.surah, ref.startAyah, ref.endAyah);
    if (!arabicText) {
      console.warn(`  WARNING: No Arabic found for ${ref.surah}:${ref.startAyah}-${ref.endAyah}`);
      return match;
    }

    changed = true;
    return `<blockquote class="ayah-quote">
${ARABIC_TAG}
    ${arabicText}
  </p>
  <p class="translation">${translationContent}</p>
  <cite>${citeContent}</cite>
</blockquote>`;
  });

  if (changed) {
    fs.writeFileSync(filePath, modified, 'utf8');
    console.log(`  UPDATED: ${path.basename(filePath)}`);
    return true;
  } else {
    console.log(`  NO CHANGE: ${path.basename(filePath)}`);
    return false;
  }
}

// Find all draft files
const folders = fs.readdirSync(draftsDir);
let totalUpdated = 0;
let totalSkipped = 0;

for (const folder of folders) {
  const folderPath = path.join(draftsDir, folder);
  if (!fs.statSync(folderPath).isDirectory()) continue;
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
  console.log(`\nProcessing folder: ${folder} (${files.length} files)`);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const updated = processFile(filePath);
    if (updated) totalUpdated++;
    else totalSkipped++;
  }
}

console.log(`\n=== Done: ${totalUpdated} files updated, ${totalSkipped} files skipped ===`);
