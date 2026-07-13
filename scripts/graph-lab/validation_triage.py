#!/usr/bin/env python3
"""
VALIDATION BURN-DOWN TRIAGE   (NORTH-STAR substrate work-item #1)
================================================================
844 `validated: false` tadabbur files are the single biggest safe-graph lever —
clearing them ≈ doubles the traversable validated-only graph. But "844 files"
was only ever a list. This turns it into a burn rate with a number today.

It runs the two AUTOMATABLE validators over every false file and buckets by the
real failure mode (parsing validator OUTPUT, not exit codes — the validators
exit 0 on a file with no Arabic/morphology tags, so exit-code triage would
falsely promote un-enriched stubs):

  verify_arabic.mjs     PASS  tagged verses all match Uthmani text
                        EMPTY no tagged Arabic to check
                        FAIL  a tagged verse mismatches
  verify_morphology.mjs PASS  morphology claims all verify
                        EMPTY no morphology claims to check
                        FAIL  a claim mismatches the Leeds corpus

Buckets (NOTE: AUTO-VERIFIED is NOT "validated" — see the hard line below):
  AUTO-VERIFIED  arabic PASS + morphology PASS. The two PROVABLE-against-ground-
                 truth gates clear (verse matches the Uthmani mushaf; roots/POS
                 match the Leeds corpus). The INTERPRETIVE layer is UNCHECKED.
                 -> interpretive-review queue, NOT a validated:true flip.
  DEFECT         arabic FAIL or morphology FAIL -> priority regen queue (via
                 /quranic-tadabbur skill; never mechanically "fixed" here).
  UNENRICHED     no morphology claims (and/or no Arabic) -> can't be checked at
                 all; needs the enrichment pass first. Not a defect, a gap.

THE HARD LINE (why this tool never flips validated:true):
  cross_reference_tafsir guards INTERPRETIVE soundness — whether the tadabbur's
  reading holds against classical scholarship. It is a human-read report, not a
  binary gate, and it is exactly where reputational risk on sacred content lives.
  "validated" means all three cleared, including the interpretive read by the
  trusted process. Flipping on the two automated gates alone would label content
  "validated" when it was not — itself a false claim. So this tool only TRIAGES;
  it produces the human work-queue and never mutates a validated: flag.

  python3 scripts/graph-lab/validation_triage.py            # sample 40 (fast)
  python3 scripts/graph-lab/validation_triage.py --all      # full 840 (~5 min)
  python3 scripts/graph-lab/validation_triage.py --all -j 12 # more parallelism

Outputs (graph-lab artifacts; writes NOTHING into content/):
  validation-triage.json    per-file verdicts
  validation-triage.md      bucketed report + per-surah burn-down + queues
"""
import re, glob, sys, json, subprocess
from concurrent.futures import ThreadPoolExecutor

ARABIC = 'scripts/verify_arabic.mjs'
MORPH = 'scripts/verify_morphology.mjs'
OUT_JSON = 'scripts/graph-lab/validation-triage.json'
OUT_MD = 'scripts/graph-lab/validation-triage.md'

JOBS = 8
if '-j' in sys.argv:
    JOBS = int(sys.argv[sys.argv.index('-j') + 1])
ALL = '--all' in sys.argv
SAMPLE = 40


def false_files():
    out = []
    for f in glob.glob('content/tadabbur/*/ayah*.md'):
        if any(x in f for x in ('_superseded', '.validation', 'report')):
            continue
        txt = open(f, encoding='utf-8', errors='ignore').read()
        fm = txt.split('---')[1] if txt.count('---') >= 2 else ''
        if re.search(r'^validated:\s*false', fm, re.M):
            out.append(f)
    return sorted(out)


def run(script, f):
    try:
        r = subprocess.run(['node', script, f], capture_output=True, text=True, timeout=60)
        return r.stdout + r.stderr
    except subprocess.TimeoutExpired:
        return '__TIMEOUT__'


def classify_arabic(o):
    if o == '__TIMEOUT__':
        return 'UNKNOWN'
    if 'No tagged Arabic' in o or 'Tagged references found: 0' in o:
        return 'EMPTY'
    failed = re.search(r'Failed:\s*(\d+)', o)
    passed = re.search(r'Passed:\s*(\d+)', o)
    if failed and int(failed.group(1)) > 0:
        return 'FAIL'
    if (passed and int(passed.group(1)) > 0) or 'verified against authentic' in o:
        return 'PASS'
    # verse matched but with diacritics-only differences (Passed:0 Warnings:N
    # Failed:0) — a soft pass, not a defect (skill treats diacritics warnings as ok)
    if 'All verses matched' in o and (not failed or int(failed.group(1)) == 0):
        return 'PASS'
    return 'UNKNOWN'


def classify_morph(o):
    if o == '__TIMEOUT__':
        return 'UNKNOWN'
    if 'No morphological claims' in o or 'Morphological claims found: 0' in o:
        return 'EMPTY'
    failed = re.search(r'Failed:\s*(\d+)', o)
    verified = re.search(r'Verified:\s*(\d+)', o)
    if failed and int(failed.group(1)) > 0:
        return 'FAIL'
    if verified and int(verified.group(1)) > 0:
        return 'PASS'
    return 'UNKNOWN'


def triage_one(f):
    a = classify_arabic(run(ARABIC, f))
    m = classify_morph(run(MORPH, f))
    if a == 'FAIL' or m == 'FAIL':
        bucket = 'DEFECT'
    elif m == 'EMPTY' or a == 'EMPTY':
        bucket = 'UNENRICHED'
    elif a == 'PASS' and m == 'PASS':
        bucket = 'AUTO-VERIFIED'
    else:
        bucket = 'REVIEW'   # UNKNOWN from a validator — needs eyes
    return {'file': f.replace('content/tadabbur/', ''), 'surah': f.split('/')[-2],
            'arabic': a, 'morphology': m, 'bucket': bucket}


def main():
    files = false_files()
    if not ALL:
        files = files[:SAMPLE]
    print(f"triaging {len(files)} validated:false files  (jobs={JOBS}, "
          f"{'FULL' if ALL else f'SAMPLE {SAMPLE} — use --all for all'})\n")
    results = []
    with ThreadPoolExecutor(max_workers=JOBS) as ex:
        for i, r in enumerate(ex.map(triage_one, files), 1):
            results.append(r)
            if i % 40 == 0:
                print(f"  … {i}/{len(files)}")

    buckets = {}
    per_surah = {}
    for r in results:
        buckets.setdefault(r['bucket'], []).append(r)
        ps = per_surah.setdefault(r['surah'], {})
        ps[r['bucket']] = ps.get(r['bucket'], 0) + 1

    order = ['AUTO-VERIFIED', 'DEFECT', 'UNENRICHED', 'REVIEW']
    meta = {'triaged': len(results), 'scope': 'all' if ALL else f'sample-{SAMPLE}',
            'buckets': {b: len(buckets.get(b, [])) for b in order}}
    json.dump({'meta': meta, 'results': results}, open(OUT_JSON, 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)

    # markdown report
    L = ['# Validation triage (automated gates only — no validated: flips)', '',
         f"*Scope: {meta['scope']} · {len(results)} `validated:false` files · "
         "automated gates = verify_arabic + verify_morphology (tafsir = human spot-check)*", '',
         '## Buckets', '', '| bucket | count | meaning |', '|---|---|---|']
    desc = {'AUTO-VERIFIED': 'arabic+morphology verify (provable gates); INTERPRETIVE review still owed — NOT validated:true',
            'DEFECT': 'a tagged verse or morphology claim FAILS → priority /quranic-tadabbur regen',
            'UNENRICHED': 'no morphology/Arabic to check → needs enrichment pass, not a flag flip',
            'REVIEW': 'a validator returned UNKNOWN → needs eyes'}
    for b in order:
        L.append(f"| **{b}** | {len(buckets.get(b, []))} | {desc[b]} |")
    L += ['', '## Per-surah burn-down', '', '| surah | auto-verified | defect | unenriched | review |',
          '|---|---|---|---|---|']
    for s in sorted(per_surah, key=lambda s: -sum(per_surah[s].values())):
        p = per_surah[s]
        L.append(f"| {s} | {p.get('AUTO-VERIFIED',0)} | {p.get('DEFECT',0)} | "
                 f"{p.get('UNENRICHED',0)} | {p.get('REVIEW',0)} |")
    for b in ('AUTO-VERIFIED', 'DEFECT'):
        L += ['', f'## {b} queue', '']
        for r in sorted(buckets.get(b, []), key=lambda r: r['file']):
            L.append(f"- `{r['file']}`  (arabic={r['arabic']} morph={r['morphology']})")
    open(OUT_MD, 'w', encoding='utf-8').write('\n'.join(L) + '\n')

    print("\n=== BUCKETS ===")
    for b in order:
        print(f"  {b:12s} {len(buckets.get(b, [])):4d}")
    print(f"\nwrote {OUT_JSON} + {OUT_MD}")
    if not ALL:
        print("\nSAMPLE only. Run with --all for the full 840-file burn-down.")


if __name__ == '__main__':
    main()
