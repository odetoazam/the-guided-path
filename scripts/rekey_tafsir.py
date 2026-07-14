#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TAFSIR RE-KEY — content-verified index + pairing + eyeball sample
=================================================================
Executes Phases 1-3 of scripts/TAFSIR-REKEY-PLAN.md in one run. Pure Python,
ZERO AI, zero network. Unsticks the semantic-enrich pipeline, which currently
pairs tadabbur files to tafsir reports by FILENAME — ambiguous for 86% of
reports (`tafsir-ayah-005.md` could belong to ~50 surahs), so the fail-safe
guard refuses to enrich almost everything.

The fix: every report self-identifies via `## {surah}:{ayah}` section headers.
We index BOTH report collections by their own content:
  A) scripts/tadabbur-output/*.md          (surah-blind filenames, ~809)
  B) content/tadabbur/<NNN-surah>/tafsir-report-*.md  (surah-scoped, ~795;
     dir surah MUST agree with header surah — double verification)

WRITES (sidecars only — no content file is touched, no renames):
  scripts/tafsir-index.json           report -> verified surah:ayah range
  scripts/tadabbur-tafsir-pairs.json  every tadabbur file -> its report + bucket

Usage:
  python3 scripts/rekey_tafsir.py                # full run + 30-pair sample
  python3 scripts/rekey_tafsir.py --sample 50    # bigger eyeball sample
"""
import re, glob, json, sys, random
from collections import defaultdict

SAMPLE = 30
if '--sample' in sys.argv:
    SAMPLE = int(sys.argv[sys.argv.index('--sample') + 1])

HDR = re.compile(r'^##\s+(\d+):(\d+)\s*$', re.M)


def headers_by_surah(path):
    """-> {surah: set(ayahs)} from ## S:A headers (cross-refs included)."""
    txt = open(path, encoding='utf-8', errors='ignore').read()
    out = defaultdict(set)
    for s, a in HDR.findall(txt):
        out[int(s)].add(int(a))
    return out


def fname_range(path):
    """tafsir-report-018-020 / tafsir-ayah-005 / tafsir-ayahs-176-180 -> (lo,hi)."""
    stem = path.split('/')[-1]
    nums = [int(n) for n in re.findall(r'\d+', stem)]
    if not nums:
        return None
    return (nums[0], nums[1] if len(nums) > 1 else nums[0])


def resolve_report(path):
    """-> ((surah, lo, hi), None) or (None, flag).

    These are CROSS-REFERENCE reports: they carry '## S:A' headers for the
    primary passage AND for cross-quoted ayahs from other surahs, so header
    order/majority is unreliable. Resolution:
      in-content  -> surah = parent dir (strongest signal); range = filename;
                     VERIFIED by requiring >=1 header 'dir_surah:a' inside range.
      output-dir  -> surah = the unique surah whose headers overlap the
                     filename range; ambiguity or no match -> flagged, excluded.
    """
    hs = headers_by_surah(path)
    if not hs:
        return None, 'NO_HEADERS'
    rng = fname_range(path)
    if not rng:
        return None, 'NO_FILENAME_RANGE'
    lo, hi = rng
    want = set(range(lo, hi + 1))

    if path.startswith('content/tadabbur/'):
        dm = re.match(r'(\d+)', path.split('/')[-2])
        if not dm:
            return None, 'NO_DIR_SURAH'
        surah = int(dm.group(1))
        if not (hs.get(surah, set()) & want):
            return None, 'CONTENT_MISMATCH'      # no header confirms dir+range
        return (surah, lo, hi), None

    # surah-blind output dir: which surah's headers cover the filename range?
    candidates = [s for s, ayahs in hs.items() if ayahs & want]
    if len(candidates) == 1:
        return (candidates[0], lo, hi), None
    # prefer a candidate whose headers cover the FULL range
    full = [s for s in candidates if want <= hs[s]]
    if len(full) == 1:
        return (full[0], lo, hi), None
    return None, ('AMBIGUOUS_PRIMARY' if candidates else 'CONTENT_MISMATCH')


# ---------------- Phase 1: index both report collections ----------------
by_ayah = {}          # "S:A" -> report path (in-content sibling wins)
by_passage = {}       # "S:lo-hi" -> report path
flags = defaultdict(list)
n_indexed = {'in_content': 0, 'output_dir': 0}

def register(path, key_priority):
    parsed, flag = resolve_report(path)
    if flag:
        flags[flag].append(path)
        return
    surah, lo, hi = parsed
    pkey = f"{surah}:{lo}-{hi}"
    if pkey in by_passage and by_passage[pkey] != path:
        flags['DUPLICATE_PASSAGE'].append(f"{pkey}: {by_passage[pkey]} vs {path}")
        # keep the first registered (in-content preferred via registration order)
        return
    by_passage[pkey] = path
    for a in range(lo, hi + 1):
        k = f"{surah}:{a}"
        if k not in by_ayah or key_priority == 0:
            by_ayah[k] = path
    n_indexed['in_content' if key_priority == 0 else 'output_dir'] += 1

# priority 0: in-content (sibling, double-verified) — register first
for f in sorted(glob.glob('content/tadabbur/*/tafsir-report-*.md')):
    register(f, 0)
# priority 1: surah-blind output dir
for f in sorted(glob.glob('scripts/tadabbur-output/tafsir-*.md')):
    register(f, 1)

json.dump({'by_passage': by_passage, 'by_ayah': by_ayah,
           'flags': {k: v for k, v in flags.items()},
           'meta': {'indexed': n_indexed,
                    'distinct_ayahs_covered': len(by_ayah),
                    'generator': 'scripts/rekey_tafsir.py (content-verified, no LLM)'}},
          open('scripts/tafsir-index.json', 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

# ---------------- Phase 2: pair every tadabbur file ----------------
pairs = []
buckets = defaultdict(int)
for f in sorted(glob.glob('content/tadabbur/*/ayah*.md')):
    if any(x in f for x in ('_superseded', '.validation', 'report')):
        continue
    dm = re.match(r'(\d+)', f.split('/')[-2])
    nums = [int(n) for n in re.findall(r'\d+', f.split('/')[-1].replace('ayah', '').replace('ayahs', ''))]
    if not dm or not nums:
        continue
    surah = int(dm.group(1))
    lo, hi = nums[0], (nums[1] if len(nums) > 1 else nums[0])
    report = by_ayah.get(f"{surah}:{lo}")
    if not report:
        bucket = 'MISSING'
    else:
        # report's verified range
        parsed, _ = resolve_report(report)
        _, rlo, rhi = parsed
        covered = all(rlo <= a <= rhi for a in range(lo, hi + 1))
        bucket = 'EXACT' if (rlo == lo and rhi == hi) else ('COVERED' if covered else 'PARTIAL')
    buckets[bucket] += 1
    pairs.append({'file': f, 'surah': surah, 'lo': lo, 'hi': hi,
                  'report': report, 'bucket': bucket})

json.dump({'meta': {'buckets': dict(buckets), 'total': len(pairs)}, 'pairs': pairs},
          open('scripts/tadabbur-tafsir-pairs.json', 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

# ---------------- Phase 3: eyeball sample ----------------
print("=" * 72)
print("TAFSIR RE-KEY — content-verified index")
print("=" * 72)
print(f"reports indexed: {n_indexed['in_content']} in-content + {n_indexed['output_dir']} output-dir"
      f" = {n_indexed['in_content'] + n_indexed['output_dir']}")
for k, v in flags.items():
    print(f"  flag {k}: {len(v)}")
print(f"distinct ayahs with a verified report: {len(by_ayah)} / 6236"
      f"  ({100 * len(by_ayah) / 6236:.1f}%)")
print()
print("TADABBUR PAIRING BUCKETS:")
for b in ('EXACT', 'COVERED', 'PARTIAL', 'MISSING'):
    print(f"  {b:8s} {buckets.get(b, 0):5d}")
print()

# sample weighted toward formerly-ambiguous stems (single-ayah files) + range files
matched = [p for p in pairs if p['report']]
random.seed(26)  # deterministic sample
singles = [p for p in matched if p['lo'] == p['hi']]
ranges_ = [p for p in matched if p['lo'] != p['hi']]
sample = random.sample(singles, min(SAMPLE * 2 // 3, len(singles))) + \
         random.sample(ranges_, min(SAMPLE - SAMPLE * 2 // 3, len(ranges_)))
print(f"EYEBALL SAMPLE ({len(sample)} pairings — confirm report matches passage):")
for p in sample:
    parsed, _ = resolve_report(p['report'])
    _, rlo, rhi = parsed
    txt = open(p['report'], encoding='utf-8', errors='ignore').read()
    # first non-empty prose line after the first header (proof of content match)
    hm = HDR.search(txt)
    opening = '(empty report?)'
    if hm:
        for line in txt[hm.end():].splitlines():
            line = line.strip().lstrip('*#>- ').strip()
            if len(line) > 15:
                opening = line[:90] + ('…' if len(line) > 90 else '')
                break
    ok = '✓' if p['bucket'] in ('EXACT', 'COVERED') else '✗'
    print(f"  [{ok} {p['bucket']:7s}] {p['file'].replace('content/tadabbur/', ''):42s}"
          f" ← {p['report'].split('/')[-1]} (## {p['surah']}:{rlo}"
          + (f"–{rhi}" if rhi != rlo else "") + ")")
    print(f"      {opening}")
print()
print("wrote scripts/tafsir-index.json + scripts/tadabbur-tafsir-pairs.json (sidecars only)")
print("NO content files touched. Next step after your eyeball check: patch")
print("semantic-enrich.py to read tafsir-index.json (Phase 4 of the plan).")
