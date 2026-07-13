#!/usr/bin/env python3
"""Persist the cited-but-unwritten gap report from the quarantine tier."""
import json
from collections import Counter, defaultdict

d = json.load(open('scripts/graph-lab/edges-typed.json', encoding='utf-8'))
missing = Counter()
citers = defaultdict(list)
for e in d['edges']:
    if e['type'] == 'unresolved':
        tgt = e['tgt'].split('-')[0].strip()
        missing[tgt] += 1
        citers[tgt].append(e['src'])

lines = [
    "# Cited-but-unwritten ayahs — gap report",
    "",
    "Derived from the edge-typing salvage pass (type_edges.py quarantine tier).",
    "These ayahs are referenced by existing tadabbur related_ayahs edges but have",
    "no standalone tadabbur node on disk, so the edge cannot be traversed. Ranked by",
    "citation count = a content-priority signal (the corpus is asking for these).",
    "",
    f"Total quarantined edges: {sum(missing.values())} | distinct unwritten ayahs: {len(missing)}",
    "",
    "| ayah | times cited | cited by (sample) |",
    "|------|-------------|-------------------|",
]
for ref, c in missing.most_common():
    cb = ', '.join(sorted(set(citers[ref]))[:6])
    lines.append(f"| {ref} | {c} | {cb} |")

open('scripts/graph-lab/gap-report.md', 'w', encoding='utf-8').write('\n'.join(lines) + '\n')

sur = Counter(int(r.split(':')[0]) for r in missing)
print('wrote scripts/graph-lab/gap-report.md |', len(missing), 'unwritten ayahs')
print('top surahs by unwritten-but-cited count:', sur.most_common(8))
