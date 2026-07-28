#!/usr/bin/env python3
"""
APPLY ENRICH BATCH — guard + apply + validate, one shot, for all ready drafts
==============================================================================
For every scripts/enrich-drafts/*.draft.md whose corresponding content file
still exists: run the mechanical guard, apply if it passes, run verify_arabic
+ verify_morphology, and — per standing policy — NEVER let `validated` flip
to true from an agent's own judgment. Reverts it back to whatever it was
before, every time, no exceptions.

Prints one line per file + a final tally. Skips (leaves alone) any draft
that starts with TRUNCATED_SOURCE reasoning (agent already refused those —
none should reach this stage, but double-checked here too).

Usage: python3 scripts/apply_enrich_batch.py
"""
import re, glob, json, subprocess, sys, shutil
from pathlib import Path
sys.path.insert(0, 'scripts')
from enrich_guard import apply_guard

# Named drafts win over the whole directory. This is the race-condition fix:
# promoting the whole directory captures drafts an agent is still mid-write
# (observed 2026-07-24 — At-Tawbah 9:107-110 committed 129 words short). Passing
# only the drafts whose agents have REPORTED lets waves overlap safely.
#
#   python3 scripts/apply_enrich_batch.py                       # whole dir (legacy)
#   python3 scripts/apply_enrich_batch.py a.draft.md b.draft.md # only these
ARGS = [a for a in sys.argv[1:] if not a.startswith('-')]
if ARGS:
    DRAFTS = sorted(ARGS)
    missing = [d for d in DRAFTS if not Path(d).exists()]
    if missing:
        print("named drafts do not exist:")
        for m in missing:
            print(f"  {m}")
        sys.exit(1)
else:
    DRAFTS = sorted(glob.glob('scripts/enrich-drafts/*.draft.md'))
    print("NOTE: promoting the ENTIRE drafts directory. Safe only if every agent "
          "in the batch has reported. Pass named drafts to overlap waves.")
if not DRAFTS:
    print("no drafts found in scripts/enrich-drafts/")
    sys.exit(0)

def draft_to_content_path(draft_path):
    stem = Path(draft_path).stem.replace('.draft', '')
    # 021-al-anbiya-ayah-005 -> content/tadabbur/021-al-anbiya/ayah-005.md
    parts = stem.split('-')
    # dir is everything up to the 'ayah'/'ayahs' token
    for i, p in enumerate(parts):
        if p in ('ayah', 'ayahs'):
            dir_name = '-'.join(parts[:i])
            file_name = '-'.join(parts[i:]) + '.md'
            return f'content/tadabbur/{dir_name}/{file_name}'
    return None

applied, refused, truncated, val_reverted = [], [], [], []

for draft_path in DRAFTS:
    content_path = draft_to_content_path(draft_path)
    if not content_path or not Path(content_path).exists():
        refused.append((draft_path, 'cannot resolve content path'))
        continue
    draft_text = open(draft_path, encoding='utf-8').read()
    if draft_text.strip().startswith('TRUNCATED_SOURCE'):
        truncated.append((content_path, draft_text.strip()[:150]))
        continue
    original = open(content_path, encoding='utf-8').read()
    final, ok, reason = apply_guard(original, draft_text)
    if not ok:
        refused.append((content_path, reason))
        continue

    # capture original validated: value, revert unconditionally after apply
    om = re.search(r'^validated:\s*(true|false)\s*$', original, re.M)
    orig_validated = om.group(1) if om else None

    Path(content_path).write_text(final, encoding='utf-8')

    if orig_validated is not None:
        cur = open(content_path, encoding='utf-8').read()
        fixed = re.sub(r'^validated:\s*(true|false)\s*$',
                       f'validated: {orig_validated}', cur, count=1, flags=re.M)
        if fixed != cur:
            Path(content_path).write_text(fixed, encoding='utf-8')
            val_reverted.append(content_path)

    # validators
    def run(script):
        r = subprocess.run(['node', script, content_path], capture_output=True, text=True, timeout=60)
        return r.stdout + r.stderr

    a = run('scripts/verify_arabic.mjs')
    m = run('scripts/verify_morphology.mjs')
    a_fail = bool(re.search(r'Failed:\s*[1-9]', a))
    m_fail = bool(re.search(r'Failed:\s*[1-9]', m))
    applied.append((content_path, 'FAIL' if (a_fail or m_fail) else 'ok'))

print(f"applied: {len(applied)}   refused (guard): {len(refused)}   "
      f"truncated-source (skipped): {len(truncated)}")
print(f"validated-flag reverted on: {len(val_reverted)} (policy: agent judgment never flips it)")
val_fails = [p for p, s in applied if s == 'FAIL']
print(f"validator FAILURES: {len(val_fails)}")
for p in val_fails:
    print(f"  FAIL {p}")
if truncated:
    print("\nTRUNCATED SOURCE files (untouched, need /quranic-tadabbur regen):")
    for p, msg in truncated:
        print(f"  {p}: {msg}")
if refused:
    print("\nGUARD-REFUSED (untouched):")
    for p, why in refused:
        print(f"  {p}: {why}")

# cleanup consumed drafts (successful applies only; leave failures/truncated for inspection)
for content_path, status in applied:
    stem = content_path.replace('content/tadabbur/', '').replace('/', '-').replace('.md', '')
    dp = f'scripts/enrich-drafts/{stem}.draft.md'
    if Path(dp).exists():
        Path(dp).unlink()

print(f"\napplied files (for git add):")
for p, _ in applied:
    print(f"  {p}")
