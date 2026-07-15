#!/usr/bin/env python3
"""
GENERATE MISSING TAFSIR REPORTS  (closes the true blocker behind enrichment)
============================================================================
The validation burn-down's 566 UNENRICHED files can't be enriched because
their tafsir reports were never generated (Codex-era surahs predate the
report step). Generation is FULLY MECHANICAL — cross_reference_tafsir.mjs
fetches classical text (Ibn Kathir, al-Tabari, al-Muyassar, al-Jalalayn)
from the free spa5k/tafsir_api CDN. No LLM, no API key, zero model usage.

For each unenriched tadabbur file whose passage has no verified report in
scripts/tafsir-index.json:
  - surah + range derive from the file's PATH (dir number + filename),
    the same deterministic keys the whole re-key pipeline uses
  - writes content/tadabbur/<dir>/tafsir-report-<lo>[-<hi>].md
    (the existing in-content convention, 795 files strong)
  - NEVER overwrites; skips existing targets (natural resume)
  - verifies after write: >=1 '## dir_surah:a' header inside the range,
    else the file is removed and the failure logged

Usage:
  python3 scripts/generate-missing-tafsir.py            # the unenriched bucket
  python3 scripts/generate-missing-tafsir.py --limit 5  # smoke test
Then: python3 scripts/rekey_tafsir.py   # re-index; coverage + eligibility jump
"""
import json, re, subprocess, sys, time
from pathlib import Path

REPO = Path('.')
LIMIT = None
if '--limit' in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index('--limit') + 1])

idx = json.loads(Path('scripts/tafsir-index.json').read_text())['by_ayah']
tri = json.loads(Path('scripts/graph-lab/validation-triage.json').read_text())['results']
targets = []
for r in tri:
    if r['bucket'] != 'UNENRICHED':
        continue
    p = Path('content/tadabbur') / r['file']
    dm = re.match(r'(\d+)', p.parent.name)
    nums = [int(n) for n in re.findall(r'\d+', p.stem.replace('ayah', '').replace('ayahs', ''))]
    if not dm or not nums:
        continue
    surah = int(dm.group(1)); lo, hi = nums[0], (nums[1] if len(nums) > 1 else nums[0])
    if f"{surah}:{lo}" in idx:
        continue                       # already has a verified report
    stem = f"tafsir-report-{lo:03d}" + (f"-{hi:03d}" if hi != lo else "")
    out = p.parent / f"{stem}.md"
    targets.append((p, surah, lo, hi, out))

if LIMIT:
    targets = targets[:LIMIT]
print(f"passages needing a report: {len(targets)}")

HDR = re.compile(r'^##\s+(\d+):(\d+)\s*$', re.M)
done = skipped = failed = 0
for i, (p, surah, lo, hi, out) in enumerate(targets, 1):
    if out.exists():
        skipped += 1
        continue
    r = subprocess.run(['node', 'scripts/cross_reference_tafsir.mjs',
                        '--surah', str(surah), '--ayahs',
                        f"{lo}-{hi}" if hi != lo else str(lo),
                        '--output', str(out)],
                       capture_output=True, text=True, timeout=180)
    ok = out.exists()
    if ok:  # verify: headers must confirm dir surah + range
        hs = {(int(s), int(a)) for s, a in HDR.findall(out.read_text(errors='ignore'))}
        ok = any(s == surah and lo <= a <= hi for s, a in hs)
    if not ok:
        if out.exists():
            out.unlink()               # never leave an unverified report behind
        failed += 1
        print(f"  FAIL {out} :: {r.stderr.strip()[:100]}")
    else:
        done += 1
    if i % 25 == 0:
        print(f"  … {i}/{len(targets)}  (ok={done} skip={skipped} fail={failed})")
    time.sleep(0.3)                    # polite to the CDN

print(f"\ndone={done}  already-existed={skipped}  failed={failed}")
print("next: python3 scripts/rekey_tafsir.py   (re-index and confirm eligibility)")
