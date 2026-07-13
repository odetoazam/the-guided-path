#!/usr/bin/env python3
"""Validate that every seed in situations.json is a canonical node in merge-map.csv."""
import csv, json

valid = set()
for row in csv.DictReader(open('scripts/graph-lab/merge-map.csv', encoding='utf-8')):
    if row['axis'].strip().lower() != 'drop':
        valid.add(row['canonical'].strip().lower())

sits = json.load(open('scripts/graph-lab/situations.json', encoding='utf-8'))['situations']
bad = []
for s in sits:
    for seed in s['seeds']:
        if seed not in valid:
            bad.append((s['slug'], seed))

print(f"situations: {len(sits)} | distinct seeds used: {len({x for s in sits for x in s['seeds']})}")
if bad:
    print(f"INVALID seeds ({len(bad)}):")
    for slug, seed in bad:
        print(f"   {slug}: {seed!r}")
else:
    print("all seeds are canonical ✓")
