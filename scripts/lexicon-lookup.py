#!/usr/bin/env python3
"""
Lexical Lookup — Lane's Lexicon + Mufradat al-Raghib

Provides classical Arabic definitions for any root, sourced from:
  1. Lane's Arabic-English Lexicon (primary — 252MB SQLite)
  2. Mufradat al-Raghib al-Isfahani (Quranic-specific — JSON)
  3. Quran-scoped Lane's index (quick lookup — JSON)

Usage:
  python3 scripts/lexicon-lookup.py wly           # Buckwalter root
  python3 scripts/lexicon-lookup.py و-ل-ي        # Arabic root
  python3 scripts/lexicon-lookup.py --validate content/tadabbur/005-al-maidah/ayah-055.md
"""

import json
import re
import sqlite3
import sys
from pathlib import Path

CACHE = Path(__file__).parent / '.corpus-cache'
LANES_DB    = CACHE / 'lexicon.sqlite'
LANES_JSON  = CACHE / 'lanes-roots.json'
MUFRADAT    = CACHE / 'mufradat-raghib.json'

# ── Arabic to Buckwalter (same as morphology-lookup) ─────────────────────────
ARABIC_TO_BW = {
    'ا':'A','ب':'b','ت':'t','ث':'v','ج':'j','ح':'H','خ':'x','د':'d','ذ':'*',
    'ر':'r','ز':'z','س':'s','ش':'$','ص':'S','ض':'D','ط':'T','ظ':'Z','ع':'E',
    'غ':'g','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n','ه':'h','و':'w',
    'ي':'y','ى':'Y','ء':'A','أ':'A','إ':'A','ؤ':'A','ئ':'A','ة':'p',
}
BW_TO_ARABIC = {v: k for k, v in ARABIC_TO_BW.items() if k not in 'أإؤئء'}

def to_buckwalter(root: str) -> str:
    """Convert Arabic root string to Buckwalter (strip hyphens)."""
    clean = root.replace('-', '').replace('‐', '').replace('–', '').strip()
    result = ''
    for ch in clean:
        result += ARABIC_TO_BW.get(ch, ch)
    return result

def bw_to_arabic_str(bw: str) -> str:
    result = ''
    for ch in bw:
        result += BW_TO_ARABIC.get(ch, ch)
    return result

# ── Lane's JSON (Quran-scoped) ────────────────────────────────────────────────

_lanes_json = None
def load_lanes_json():
    global _lanes_json
    if _lanes_json is None and LANES_JSON.exists():
        _lanes_json = json.loads(LANES_JSON.read_text())
    return _lanes_json or {}

def lanes_quick(bw_root: str) -> dict | None:
    """Quick lookup from Quran-scoped Lane's index."""
    data = load_lanes_json()
    for arabic_root, entry in data.items():
        if entry.get('b', '').lower() == bw_root.lower():
            return {
                'root_arabic': arabic_root,
                'root_bw': entry['b'],
                'meaning': entry.get('m', ''),
                'frequency': entry.get('f', 0),
                'verses': entry.get('v', [])[:10],
                'source': "Lane's Lexicon (Quran-scoped)"
            }
    return None

# ── Lane's SQLite (full) ──────────────────────────────────────────────────────

_conn = None
def get_conn():
    global _conn
    if _conn is None and LANES_DB.exists():
        _conn = sqlite3.connect(str(LANES_DB))
    return _conn

def strip_xml(xml: str) -> str:
    text = re.sub(r'<[^>]+>', ' ', xml or '')
    return ' '.join(text.split())

def lanes_full(bw_root: str) -> list[dict]:
    """Full Lane's Lexicon lookup via SQLite."""
    conn = get_conn()
    if not conn:
        return []
    # Try exact Buckwalter match and Arabic match
    rows = conn.execute(
        "SELECT word, bword, xml FROM entry WHERE broot = ? OR broot = ? LIMIT 5",
        (bw_root, bw_root.lower())
    ).fetchall()
    if not rows:
        # Try partial — sometimes stored with vowels
        rows = conn.execute(
            "SELECT word, bword, xml FROM entry WHERE broot LIKE ? LIMIT 5",
            (f'%{bw_root}%',)
        ).fetchall()
    results = []
    for word, bword, xml in rows:
        text = strip_xml(xml)[:800]
        if text and len(text) > 20:
            results.append({
                'word': word,
                'bword': bword,
                'definition': text,
                'source': "Lane's Lexicon (full)"
            })
    return results

# ── Mufradat al-Raghib ────────────────────────────────────────────────────────

_mufradat = None
def load_mufradat():
    global _mufradat
    if _mufradat is None and MUFRADAT.exists():
        _mufradat = json.loads(MUFRADAT.read_text())
    return _mufradat or {}

def mufradat_lookup(bw_root: str) -> str | None:
    """Look up root in Mufradat al-Raghib."""
    data = load_mufradat()
    # Try Arabic form
    arabic = bw_to_arabic_str(bw_root)
    for key, entry in data.items():
        root_field = entry.get('r', '') if isinstance(entry, dict) else ''
        if key == arabic or root_field == arabic:
            text = entry.get('t', '') if isinstance(entry, dict) else str(entry)
            return text[:600]
    return None

# ── Combined lookup ───────────────────────────────────────────────────────────

def lookup(root: str) -> dict:
    """Look up a root in all available sources."""
    bw = to_buckwalter(root) if any(c in 'ء-يА-я' for c in root) else root

    result = {
        'root_bw': bw,
        'root_arabic': bw_to_arabic_str(bw),
        'lanes_quick': lanes_quick(bw),
        'lanes_full': lanes_full(bw),
        'mufradat': mufradat_lookup(bw),
    }
    return result

# ── Validate meaning claims in a tadabbur file ────────────────────────────────

def extract_meaning_claims(content: str) -> list[dict]:
    """Extract 'root X means Y' claims from prose."""
    claims = []
    patterns = [
        # "root ك-ت-ب means 'to write'" or similar
        r'root\s+([ء-ي](?:\s*[-‐–—]\s*[ء-ي]){2,3})\s+(?:means?|carries?|conveys?|signifies?)\s+["\']?([^"\'،,\n.]+)',
        # "the root ... meaning X"
        r'root\s+([ء-ي](?:\s*[-‐–—]\s*[ء-ي]){2,3})[^،,\n.]*?meaning\s+["\']?([^"\'،,\n.]{5,80})',
        # Buckwalter in prose: "root w-l-y means authority"
        r'root\s+([a-z]\s*-\s*[a-z]\s*-\s*[a-z])[^،,\n.]*?(?:means?|carries?)\s+["\']?([^"\'،,\n.]{5,80})',
    ]
    for pat in patterns:
        for m in re.finditer(pat, content, re.IGNORECASE):
            root_raw = m.group(1).strip()
            meaning  = m.group(2).strip()
            bw = to_buckwalter(root_raw)
            claims.append({'root': root_raw, 'bw': bw, 'claimed_meaning': meaning})
    return claims

def validate_file(filepath: str) -> None:
    content = Path(filepath).read_text()
    claims = extract_meaning_claims(content)
    print(f"\nMeaning validation: {Path(filepath).name}")
    print(f"Claims found: {len(claims)}\n")

    for c in claims:
        r = lookup(c['bw'])
        lanes = r['lanes_quick']
        muft = r['mufradat']

        print(f"  Claimed: root {c['root']} means \"{c['claimed_meaning']}\"")
        if lanes:
            print(f"  Lane's: {lanes['meaning'][:200]}")
        full = r['lanes_full']
        if full and not lanes:
            print(f"  Lane's (full): {full[0]['definition'][:200]}")
        if muft:
            print(f"  Mufradat: {muft[:200]}")
        if not lanes and not full and not muft:
            print(f"  ⚠ No match found in any lexicon for root {c['bw']}")
        print()

# ── CLI ───────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/lexicon-lookup.py <root | --validate <file>>")
        sys.exit(1)

    if sys.argv[1] == '--validate':
        if len(sys.argv) < 3:
            print("Usage: python3 scripts/lexicon-lookup.py --validate <file.md>")
            sys.exit(1)
        validate_file(sys.argv[2])
    else:
        root = sys.argv[1]
        r = lookup(root)
        print(f"\nRoot: {root} (Buckwalter: {r['root_bw']})\n")

        if r['lanes_quick']:
            q = r['lanes_quick']
            print(f"LANE'S (Quran-scoped):")
            print(f"  {q['meaning']}")
            print(f"  Appears in: {', '.join(q['verses'][:8])}")
            print()

        if r['lanes_full']:
            print("LANE'S (full):")
            for entry in r['lanes_full'][:2]:
                print(f"  [{entry['word']}] {entry['definition'][:400]}")
                print()

        if r['mufradat']:
            print("MUFRADAT AL-RAGHIB:")
            print(f"  {r['mufradat'][:400]}")
            print()

        if not any([r['lanes_quick'], r['lanes_full'], r['mufradat']]):
            print("No entries found in any lexicon.")
