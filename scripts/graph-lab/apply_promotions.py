#!/usr/bin/env python3
"""
APPLY PROMOTED EDGES → frontmatter  (morning sign-off step; DO NOT run unattended)
==================================================================================
Reads edges-promoted.json (CONFIRM verdicts from the promotion review) and
appends each confirmed edge's target ref to the SRC file's `related_ayahs:`
frontmatter array — and vice versa where the reverse file also exists.

DISCIPLINE (enricher-incident lessons — mechanical preservation):
  - APPEND-ONLY. Never rewrites, reorders, or removes existing refs.
  - Touches ONLY the `related_ayahs:` line inside the frontmatter block.
    Body, tags, morphology comments, everything else: byte-identical.
  - Files without a `related_ayahs:` field get one inserted after `tags:`
    (or before the closing `---` if no tags line).
  - Completeness gate: after writing, re-parses every touched file and
    verifies (a) frontmatter still parses, (b) all pre-existing refs still
    present, (c) new ref present. Any failure → restores the original bytes
    and reports.
  - --dry-run (default) prints the diff plan without writing. Run with
    --apply to write.

Usage:
  python3 scripts/graph-lab/apply_promotions.py            # dry-run plan
  python3 scripts/graph-lab/apply_promotions.py --apply    # write + verify
"""
import re, glob, json, sys

PROMOTED = 'scripts/graph-lab/edges-promoted.json'
APPLY = '--apply' in sys.argv

# ── DEPRECATED (adversarial-deliberation F2) ──────────────────────────────────
# Writing a bare ref into related_ayahs LOSES the reviewer's connection_type +
# note, and on the next typing pass the edge re-enters as source='related_ayahs
# frontmatter' — indistinguishable from a human-authored tadabbur edge. That
# launders unverified→objective. type_edges.py now merges edges-promoted.json as
# a provenance-carrying OVERLAY (source='promotion-review') instead, so promoted
# edges reach the graph WITHOUT mutating sacred files and keep their basis.
# This script is retained only for the eventual structured-frontmatter migration
# (ref -> {ref,type,basis,source}); it refuses to run until then.
if '--i-understand-this-launders-provenance' not in sys.argv:
    sys.exit(
        "apply_promotions.py is DEPRECATED — it launders review provenance (F2).\n"
        "Promoted edges now enter via the type_edges.py overlay; just run:\n"
        "    npm run graph\n"
        "No frontmatter mutation needed. See the header comment for details."
    )

# ref -> file (same glob discipline as the other lab scripts)
def parse_ref(s, lo, hi): return f"{s}:{lo}" if lo == hi else f"{s}:{lo}-{hi}"
ref_file = {}
for f in glob.glob('content/tadabbur/*/ayah*.md'):
    if any(x in f for x in ('.validation', 'report')): continue
    sm = re.match(r'(\d+)', f.split('/')[-2])
    nums = [int(n) for n in re.findall(r'\d+', f.split('/')[-1].replace('ayah', '').replace('ayahs', ''))]
    if not sm or not nums: continue
    ref_file[parse_ref(int(sm.group(1)), nums[0], nums[1] if len(nums) > 1 else nums[0])] = f

data = json.load(open(PROMOTED, encoding='utf-8'))
confirmed = [e for e in data['edges'] if e['verdict'] == 'CONFIRM']

# plan: file -> set of refs to append
plan = {}
def queue(ref_owner, ref_new):
    f = ref_file.get(ref_owner)
    if not f: return
    plan.setdefault(f, set()).add(ref_new)

for e in confirmed:
    queue(e['src'], e['tgt'])
    queue(e['tgt'], e['src'])

def read_related(fm):
    m = re.search(r'^related_ayahs:\s*\[(.*?)\]', fm, re.M | re.S)
    if not m: return None, None
    refs = [x.strip().strip('"\'') for x in m.group(1).split(',') if x.strip().strip('"\'')]
    return m, refs

wrote, skipped, failed = 0, 0, []
for f, new_refs in sorted(plan.items()):
    orig = open(f, encoding='utf-8').read()
    parts = orig.split('---')
    if len(parts) < 3:
        failed.append((f, 'no frontmatter block')); continue
    fm = parts[1]
    m, existing = read_related(fm)
    existing = existing or []
    to_add = sorted(r for r in new_refs if r not in existing)
    if not to_add:
        skipped += 1; continue

    if m:  # append inside the existing array
        joined = ', '.join([f'"{r}"' for r in existing + to_add])
        new_fm = fm[:m.start()] + f'related_ayahs: [{joined}]' + fm[m.end():]
    else:  # insert a new field after tags: (or at end of frontmatter)
        line = f'related_ayahs: [{", ".join(f_ for f_ in (f'"{r}"' for r in to_add))}]\n'
        tm = re.search(r'^tags:.*$', fm, re.M)
        if tm:
            new_fm = fm[:tm.end()] + '\n' + line.rstrip('\n') + fm[tm.end():]
        else:
            new_fm = fm.rstrip('\n') + '\n' + line
    new_txt = '---'.join([parts[0], new_fm] + parts[2:])

    if not APPLY:
        print(f"[dry-run] {f}: +{to_add}")
        wrote += 1
        continue

    open(f, 'w', encoding='utf-8').write(new_txt)
    # completeness gate
    chk = open(f, encoding='utf-8').read()
    cparts = chk.split('---')
    ok = len(cparts) >= 3
    if ok:
        _, crefs = read_related(cparts[1])
        crefs = crefs or []
        ok = all(r in crefs for r in existing) and all(r in crefs for r in to_add)
        # body must be byte-identical
        ok = ok and ('---'.join(cparts[2:]) == '---'.join(parts[2:]))
    if not ok:
        open(f, 'w', encoding='utf-8').write(orig)   # restore
        failed.append((f, 'verification failed — restored original'))
    else:
        wrote += 1
        print(f"applied {f}: +{to_add}")

mode = 'APPLIED' if APPLY else 'DRY-RUN'
print(f"\n[{mode}] confirmed edges: {len(confirmed)} | files touched: {wrote} | already-present: {skipped} | failed: {len(failed)}")
for f, why in failed:
    print(f"  FAILED {f}: {why}")
if not APPLY:
    print("\nRun with --apply to write. Then: python3 scripts/graph-lab/type_edges.py && python3 scripts/graph-lab/build_export.py")
