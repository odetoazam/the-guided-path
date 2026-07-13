#!/usr/bin/env python3
"""
Apply the advisor-panel verdicts (Hasan / Zaynab / Tāriq) to merge-map.csv.

The CSV is bootstrapped by build-merge-map.py; this pass overlays the
scholar-adjudicated ontology decisions from ontology-v1.md §5 + the panel
review (2026-06-20). Idempotent: re-running is a no-op. Run AFTER
build-merge-map.py if the map is ever regenerated.

Verdicts implemented as alias re-keys (the CSV is alias -> canonical -> axis):
  Call 2  khashyah/khawf split out of the collapsed `fear` state
  Call 3  taqlīd removed from social-proof; blameworthy sense -> classical
          `ittiba-al-aba` theme (Tāriq: taqlīd is a positive usul term)
  Call 4  `aging` evicted from `death` -> `creation` (sign-of-power over the self)
  Call 5  `dalal`/misguidance split out of the `hidayah` super-cluster
  Call 6  `uluhiyya` aliases added -> `tawhid` (worship pole); rubūbiyya pole
          already on `rabb`/`al-mulk` attributes
  Call 7  `divine-passive` + `passive-voice-theology` collapsed into the single
          grammatical feature `passive-voice` (theology becomes an EDGE, not a slug)

Edge-layer verdicts (calls 1, 5-contrast, 7-payload, 9-quarantine) are NOT alias
re-keys — they govern the graph build and are recorded in ontology-v1.md §5 and
honoured in type_edges.py (bridge axis excluded from theme pooling).
"""
import csv

CSV = 'scripts/graph-lab/merge-map.csv'

# alias -> (new_canonical, new_axis). Applied to existing rows; missing aliases appended.
REKEY = {
    # --- Call 2: khashyah / khawf split (was all -> fear/state) -------------
    'khashyah':   ('khashyah', 'state'),
    'khashya':    ('khashyah', 'state'),
    'awe':        ('khashyah', 'state'),
    'reverence':  ('khashyah', 'state'),
    'khawf':      ('khawf', 'state'),
    'fear':       ('khawf', 'state'),
    'ishfaq':     ('khawf', 'state'),
    'dread':      ('khawf', 'state'),
    'fright':     ('khawf', 'state'),
    # --- Call 3: taqlīd removed; ancestral conformity -> classical theme ----
    'ittiba-al-aba':       ('ittiba-al-aba', 'theme'),
    'ancestral-conformity':('ittiba-al-aba', 'theme'),
    'following-forefathers':('ittiba-al-aba', 'theme'),
    'inherited-belief':    ('ittiba-al-aba', 'theme'),   # moved off the bridge axis
    # --- Call 4: aging -> creation cluster ----------------------------------
    'aging':      ('creation', 'theme'),
    # --- Call 5: dalāl / misguidance split out of hidayah -------------------
    'dalal':      ('dalal', 'theme'),
    'dalalah':    ('dalal', 'theme'),
    'misguidance':('dalal', 'theme'),
    'idlal':      ('dalal', 'theme'),
    'astray':     ('dalal', 'theme'),
    'going-astray':('dalal', 'theme'),
    # --- Call 6: ulūhiyya worship pole -> tawhid ----------------------------
    'uluhiyya':   ('tawhid', 'theme'),
    'uluhiyyah':  ('tawhid', 'theme'),
    'worship-worthiness': ('tawhid', 'theme'),
    # --- Call 7: collapse divine-passive triplet into the grammatical feature
    'divine-passive':         ('passive-voice', 'grammar'),
    'passive-voice-theology': ('passive-voice', 'grammar'),
}

# aliases to DELETE outright (Call 3: taqlīd is a legitimate fiqh term, must not
# auto-bridge to a blameworthy modern construct).
DELETE = {'taqlid'}

rows = list(csv.DictReader(open(CSV, newline='', encoding='utf-8')))
seen = {r['alias'].strip().lower() for r in rows}
changed = 0

out = []
for r in rows:
    a = r['alias'].strip().lower()
    if a in DELETE:
        changed += 1
        continue
    if a in REKEY:
        canon, axis = REKEY[a]
        if r['canonical'] != canon or r['axis'] != axis:
            r['canonical'], r['axis'] = canon, axis
            changed += 1
    out.append(r)

# append any REKEY aliases not already present
for a, (canon, axis) in REKEY.items():
    if a not in seen:
        out.append({'alias': a, 'canonical': canon, 'axis': axis})
        changed += 1

out.sort(key=lambda r: (r['axis'], r['canonical'], r['alias']))
with open(CSV, 'w', newline='', encoding='utf-8') as fh:
    w = csv.DictWriter(fh, fieldnames=['alias', 'canonical', 'axis'])
    w.writeheader()
    w.writerows(out)

print(f"applied scholar verdicts: {changed} row change(s) | total rows: {len(out)}")
# show resulting clusters
from collections import defaultdict
clusters = defaultdict(list)
for r in out:
    clusters[(r['canonical'], r['axis'])].append(r['alias'])
for canon in ('khashyah', 'khawf', 'taqwa', 'dalal', 'hidayah', 'ittiba-al-aba',
              'death', 'creation', 'passive-voice', 'tawhid'):
    for (c, ax), al in clusters.items():
        if c == canon:
            print(f"   {canon:16s} [{ax:9s}] <- {sorted(al)}")
