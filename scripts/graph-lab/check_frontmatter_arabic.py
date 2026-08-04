#!/usr/bin/env python3
"""
check_frontmatter_arabic.py

Catches wrong CASE VOWELS (fatha / damma / kasra) in the frontmatter `arabic:`
field, checked against the Uthmani text.

Why this exists: the interpretive-read pilot (2026-07-31) found a one-character
defect in 009-at-tawbah/ayahs-102-104.md — a damma on the ism al-jalalah after
`inna`, where the canon has fatha (it is the ism of inna, so it takes nasb).
The body text was right and every mechanical validator passed, because
verify_arabic scans the BODY and never reads the frontmatter. That field is not
decoration: it feeds `ayah_records.arabic_text` and the passage headers.

Scanning the whole corpus then found two more, both also in At-Tawbah, one of
them the identical inna + ism al-jalalah construction. All three are fixed.

WHY ONLY CASE VOWELS: a naive full-text diff of this field is useless. The
corpus mixes mushaf notation conventions, and ~300 files differ from the
reference in ways that are NOT errors — tatweel before superscript alif, the
iqlab meem, sukun vs. the small dotless head of khah, the open fathatan glyph
(U+08F0), the rub-el-hizb sign, silent-alif marking on waw al-jamaa, idgham
shadda. Every one of those is a rendering variant. Filtering to differences in
fatha/damma/kasra on the SAME letter isolates real grammatical errors: it took
the signal from ~300 noisy hits down to 3 true positives, all confirmed by hand.

Deliberately NOT checked here:
  - files with no `arabic:` field at all (~138) — an older frontmatter schema
    that keys the passage as `ayah: "3:7"`. A migration question, not a defect.
  - files whose `arabic:` holds one representative verse of a longer range —
    an existing convention for long passages.

Usage:  python3 scripts/graph-lab/check_frontmatter_arabic.py
Exit 1 if any mismatch is found, so it can gate a pipeline.
"""
import json
import os
import re
import sys
import unicodedata

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
CONTENT = os.path.join(ROOT, 'content', 'tadabbur')
VERSES = os.path.join(ROOT, 'node_modules', 'quran-validator', 'data', 'quran-verses.json')

CASE = {'َ': 'fatha', 'ُ': 'damma', 'ِ': 'kasra'}
LETTER = re.compile(r'[ؠ-يٱ-ۓ]')


def norm(text):
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFC', text or '')).strip()


def field(block, key):
    for line in block.split('\n'):
        m = re.match(rf'^{key}:\s*"?(.*?)"?\s*$', line)
        if m:
            return m.group(1)
    return None


def letter_cases(text):
    """[(letter, case-vowel or None)] — every other diacritic is ignored."""
    out = []
    text = norm(text)
    for i, ch in enumerate(text):
        if not LETTER.match(ch):
            continue
        vowel = None
        for j in range(i + 1, min(i + 4, len(text))):
            if text[j] in CASE:
                vowel = CASE[text[j]]
                break
            if LETTER.match(text[j]) or text[j] == ' ':
                break
        out.append((ch, vowel))
    return out


def main():
    verses = json.load(open(VERSES, encoding='utf-8'))
    canon = {(v['surah'], v['ayah']): v['text'] for v in verses}

    checked = 0
    hits = []

    for dirpath, _dirs, filenames in os.walk(CONTENT):
        if '_superseded' in dirpath:
            continue
        for name in sorted(filenames):
            if not name.endswith('.md'):
                continue
            path = os.path.join(dirpath, name)
            raw = open(path, encoding='utf-8').read()
            fm = re.match(r'^---\n(.*?)\n---\n', raw, re.S)
            if not fm:
                continue
            block = fm.group(1)
            arabic = field(block, 'arabic')
            surah, start, end = field(block, 'surah'), field(block, 'ayah_start'), field(block, 'ayah_end')
            if not (arabic and arabic.strip() and surah and start):
                continue
            try:
                s, a0 = int(surah), int(start)
                a1 = int(end) if end else a0
            except ValueError:
                continue
            expected = ' '.join(canon.get((s, a), '') for a in range(a0, a1 + 1))
            if not expected.strip():
                continue

            got, exp = letter_cases(arabic), letter_cases(expected)
            if len(got) != len(exp):
                continue  # different range or representative verse — out of scope
            checked += 1

            text = norm(arabic)
            positions = [i for i, ((lg, cg), (le, ce)) in enumerate(zip(got, exp))
                         if lg == le and cg and ce and cg != ce]
            for i in positions:
                letters = [k for k, ch in enumerate(text) if LETTER.match(ch)]
                at = letters[i] if i < len(letters) else 0
                hits.append((os.path.relpath(path, CONTENT), got[i][1], exp[i][1],
                             text[max(0, at - 20):at + 8]))

    print(f'checked {checked} files (frontmatter arabic covering its declared range)')
    if not hits:
        print('  no case-vowel mismatches')
        return 0
    print(f'  {len(hits)} CASE-VOWEL MISMATCH(ES):')
    for rel, got, exp, ctx in hits:
        print(f'\n  {rel}\n      file has {got} where the canon has {exp}\n      near: …{ctx}…')
    return 1


if __name__ == '__main__':
    sys.exit(main())
