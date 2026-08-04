#!/usr/bin/env python3
"""
apply_interpretive_reads.py

Consumes interpretive-read verdicts (the Fable first-pass output collected in
scripts/graph-lab/interpretive-reads/verdicts-*.json) and applies the agreed
workflow:

  PASS  -> frontmatter gains `validated: true` (the flag the graph's
           validated-only view keys on) plus an `interpretive_read:` stamp
           recording who read it and when. Only files whose triage bucket is
           AUTO-VERIFIED are eligible — the mechanical gates must already pass.
  FLAG  -> file is left untouched; the flag lands in REVIEW-QUEUE.md with its
           quoted evidence for Azam's final call. Automated systems do not
           clear their own flags (content-validation-policy: a human clears
           the review queue).

Every action, including skips, is appended to audit-log.jsonl. Idempotent: a
file already stamped with this read id is skipped.

Usage:
  python3 scripts/graph-lab/apply_interpretive_reads.py --read-id fable-2026-07-31 [--dry]
"""
import argparse
import glob
import json
import os
import re
import sys
from datetime import date

LAB = os.path.dirname(os.path.abspath(__file__))
READS = os.path.join(LAB, 'interpretive-reads')
CONTENT = os.path.join(LAB, '..', '..', 'content', 'tadabbur')
AUDIT = os.path.join(READS, 'audit-log.jsonl')
QUEUE = os.path.join(READS, 'REVIEW-QUEUE.md')
TRIAGE = os.path.join(LAB, 'validation-triage.json')


def load_verdicts():
    verdicts = []
    for path in sorted(glob.glob(os.path.join(READS, 'verdicts-*.json'))):
        with open(path, encoding='utf-8') as fh:
            batch = json.load(fh)
        for v in batch:
            v['_source'] = os.path.basename(path)
        verdicts.extend(batch)
    return verdicts


def eligible_files():
    with open(TRIAGE, encoding='utf-8') as fh:
        triage = json.load(fh)
    return {r['file'] for r in triage['results'] if r['bucket'] == 'AUTO-VERIFIED'}


def flip(path, read_id, dry):
    with open(path, encoding='utf-8') as fh:
        text = fh.read()
    if f'interpretive_read: "{read_id}"' in text:
        return 'already-stamped'
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m:
        return 'no-frontmatter'
    fm = m.group(1)
    if re.search(r'^validated:\s*false\s*$', fm, re.M):
        fm2 = re.sub(r'^validated:\s*false\s*$', 'validated: true', fm, count=1, flags=re.M)
    elif re.search(r'^validated:\s*true\s*$', fm, re.M):
        fm2 = fm  # already true; just stamp
    else:
        return 'no-validated-field'
    fm2 += f'\ninterpretive_read: "{read_id}"'
    if not dry:
        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(text.replace(m.group(0), f'---\n{fm2}\n---\n', 1))
    return 'flipped'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--read-id', required=True)
    ap.add_argument('--dry', action='store_true')
    args = ap.parse_args()

    verdicts = load_verdicts()
    eligible = eligible_files()
    if not verdicts:
        sys.exit('no verdicts-*.json found in ' + READS)

    passed, flagged, skipped = [], [], []
    audit_rows = []

    for v in verdicts:
        rel = v['file']
        row = {'date': str(date.today()), 'read_id': args.read_id, 'file': rel,
               'verdict': v['verdict'], 'thesis_grounding': v.get('thesis_grounding'),
               'claims_checked': v.get('claims_checked'), 'claims_failed': v.get('claims_failed'),
               'source': v.get('_source')}
        if rel not in eligible:
            row['action'] = 'skip:not-auto-verified'
            skipped.append(rel)
        elif v['verdict'] == 'PASS':
            result = flip(os.path.join(CONTENT, rel), args.read_id, args.dry)
            row['action'] = ('dry:' if args.dry else '') + result
            (passed if result in ('flipped', 'already-stamped') else skipped).append(rel)
        else:
            row['action'] = 'flag:queued-for-human'
            flagged.append(v)
        audit_rows.append(row)

    if not args.dry:
        with open(AUDIT, 'a', encoding='utf-8') as fh:
            for row in audit_rows:
                fh.write(json.dumps(row, ensure_ascii=False) + '\n')

        lines = [f'# Interpretive-read review queue — {args.read_id}', '',
                 'Files the Fable first pass FLAGGED. Human final call required; a file',
                 'stays `validated: false` until Azam clears or fixes it.', '']
        for v in flagged:
            lines.append(f"## {v['file']}")
            lines.append(f"- thesis: {v.get('thesis', '?')}  [{v.get('thesis_grounding', '?')}]")
            lines.append(f"- claims: {v.get('claims_failed', '?')}/{v.get('claims_checked', '?')} failed")
            for f in v.get('flags', []):
                lines.append(f"- **{f.get('severity', '?')}**: {f.get('issue', '')}")
                if f.get('quote'):
                    lines.append(f"  > {f['quote'][:300]}")
            if v.get('notes'):
                lines.append(f"- notes: {v['notes']}")
            lines.append('')
        with open(QUEUE, 'w', encoding='utf-8') as fh:
            fh.write('\n'.join(lines))

    print(f"verdicts: {len(verdicts)} | PASS applied: {len(passed)} | "
          f"FLAG queued: {len(flagged)} | skipped: {len(skipped)}{' (DRY)' if args.dry else ''}")
    for v in flagged:
        sev = max((f.get('severity', 'minor') for f in v.get('flags', [])),
                  key=lambda s: ['minor', 'moderate', 'critical'].index(s) if s in ('minor', 'moderate', 'critical') else 0,
                  default='?')
        print(f"  FLAG [{sev}] {v['file']}")


if __name__ == '__main__':
    main()
