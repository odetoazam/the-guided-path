#!/usr/bin/env python3
"""Course substrate scan — what is actually under a course before you write a word.

Built 2026-08-26 for the Iblīs course, after two courses were built by hand-reading
files. Answers, for every ayah a proposed course touches:

  1. Is there a tadabbur reflection, and HAS ANYONE READ IT?
     v==1 ("validated") is NOT that. 2,141 of 2,222 validated nodes are mechanical-only
     — Arabic + morphology checked, the READING never examined. A course leans on the
     reading, so this is the field that matters. Reported as READ:PASS / READ:FLAG /
     MECHANICAL-ONLY / UNVALIDATED / NO-FILE.
  2. Is there a tafsir report, and how many editions?
     14 editions per ayah is canonical. 4 is the old thin generation and unusable —
     Course 2 got an ikhtilāf backwards working from thin substrate.
  3. What does the semantic graph connect it to?
     Typed edges (lex/cont/concept/echo/prom). Promoted edges carry a human reviewer
     note — those notes are the best course material in the building, and they are
     the one layer that is human-reviewed by construction.
  4. What is already published on it?
     Overlap risk. Every module must add something over the free layer.

Usage:
    python3 scripts/course-substrate-scan.py 38:71-85 7:11-27 15:26-44 2:34-38
    python3 scripts/course-substrate-scan.py --file docs/courses/iblis-footprint.txt
    python3 scripts/course-substrate-scan.py 38:71-85 --edges   # also dump graph edges

Exit code is always 0 — this is a report, not a gate. Read it.
"""
import json, os, re, sys, glob
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GRAPH = os.path.join(ROOT, 'scripts', 'graph-lab', 'graph-export.json')
TADABBUR = os.path.join(ROOT, 'content', 'tadabbur')

SURAH_DIRS = {}
for d in sorted(os.listdir(TADABBUR)):
    m = re.match(r'^(\d{3})-', d)
    if m:
        SURAH_DIRS[int(m.group(1))] = os.path.join(TADABBUR, d)


def parse_ref(ref):
    """'38:71-85' -> (38, 71, 85); '2:34' -> (2, 34, 34)"""
    s, a = ref.split(':')
    if '-' in a:
        lo, hi = a.split('-')
    else:
        lo = hi = a
    return int(s), int(lo), int(hi)


def find_file_for(surah, ayah):
    """The reflection file covering this ayah, if any (files cover ranges)."""
    d = SURAH_DIRS.get(surah)
    if not d:
        return None
    for f in sorted(os.listdir(d)):
        if not f.endswith('.md') or f.startswith('tafsir-report'):
            continue
        m = re.match(r'^ayahs?-(\d+)(?:-(\d+))?\.md$', f)
        if not m:
            continue
        lo = int(m.group(1)); hi = int(m.group(2) or m.group(1))
        if lo <= ayah <= hi:
            return os.path.join(d, f)
    return None


def find_report_for(surah, ayah):
    d = SURAH_DIRS.get(surah)
    if not d:
        return None, 0
    for f in sorted(os.listdir(d)):
        m = re.match(r'^tafsir-report-(\d+)(?:-(\d+))?\.md$', f)
        if not m:
            continue
        lo = int(m.group(1)); hi = int(m.group(2) or m.group(1))
        if lo <= ayah <= hi:
            p = os.path.join(d, f)
            span = hi - lo + 1
            heads = len(re.findall(r'^### ', open(p, encoding='utf-8').read(), re.M))
            return p, (heads // span if span else heads)
    return None, 0


def node_status(node):
    """Human-readable read-status from a graph node dict."""
    if node is None:
        return 'NOT-IN-GRAPH'
    v = node.get('v', -1)
    lv = node.get('lv')
    rv = node.get('rv')
    if lv == 'read':
        return f'READ:{rv or "?"}'
    if v == 1:
        return 'MECHANICAL-ONLY'
    if v == 0:
        return 'UNVALIDATED'
    return 'UNFLAGGED'


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    show_edges = '--edges' in sys.argv
    if '--file' in sys.argv:
        p = sys.argv[sys.argv.index('--file') + 1]
        args = [l.strip() for l in open(p) if l.strip() and not l.startswith('#')]
    if not args:
        print(__doc__)
        sys.exit(2)

    graph = json.load(open(GRAPH, encoding='utf-8'))
    nodes, edges = graph['nodes'], graph['edges']

    # index edges by endpoint
    by_node = defaultdict(list)
    for e in edges:
        by_node[e[0]].append(e)
        by_node[e[1]].append(e)

    # node keys are ranges like '38:71-72'; map every ayah to its node key
    ayah_to_node = {}
    for key in nodes:
        try:
            s, lo, hi = parse_ref(key)
        except Exception:
            continue
        for a in range(lo, hi + 1):
            ayah_to_node[(s, a)] = key

    counts = defaultdict(int)
    seen_files, seen_nodes = set(), set()
    thin_reports, unread, missing = [], [], []

    print('\n═══ COURSE SUBSTRATE SCAN ═══\n')
    for ref in args:
        surah, lo, hi = parse_ref(ref)
        print(f'── {surah}:{lo}-{hi} ' + '─' * 46)
        for ayah in range(lo, hi + 1):
            f = find_file_for(surah, ayah)
            rep, eds = find_report_for(surah, ayah)
            nkey = ayah_to_node.get((surah, ayah))
            node = nodes.get(nkey) if nkey else None
            status = node_status(node)

            # collapse: only print once per covering file
            tag = f or f'{surah}:{ayah}'
            if tag in seen_files:
                continue
            seen_files.add(tag)
            if nkey:
                seen_nodes.add(nkey)

            counts[status] += 1
            name = os.path.basename(f) if f else 'NO REFLECTION FILE'
            if not f:
                missing.append(f'{surah}:{ayah}')
            if status in ('MECHANICAL-ONLY', 'UNVALIDATED', 'UNFLAGGED', 'NOT-IN-GRAPH'):
                unread.append(f'{surah}:{ayah} ({name})')
            edcount = f'{eds}ed' if rep else 'NO REPORT'
            if rep and eds < 10:
                thin_reports.append(f'{surah}:{ayah} — {eds} editions')
            title = node.get('t', '') if node else ''
            print(f'  {surah}:{ayah:<4} {status:<16} {edcount:<10} {name}')
            if title:
                print(f'          “{title}”')

    # ── graph connections across the whole footprint ──
    print('\n── GRAPH EDGES FROM THIS FOOTPRINT ' + '─' * 28)
    kind_counts = defaultdict(int)
    promoted = []
    for nkey in seen_nodes:
        for e in by_node.get(nkey, []):
            kind_counts[e[2]] += 1
            if e[2] == 'prom' and len(e) == 5:
                other = e[1] if e[0] == nkey else e[0]
                meta = e[4] if isinstance(e[4], dict) else {}
                promoted.append((nkey, other, meta.get('k', '?'), meta.get('why', '')))
    for k, n in sorted(kind_counts.items(), key=lambda x: -x[1]):
        print(f'  {k:<10} {n}')

    if promoted:
        print(f'\n  ⭐ {len(promoted)} PROMOTED edges (human-reviewed — the best course material):')
        for a, b, kind, why in promoted[:40]:
            print(f'    {a} ↔ {b}  [{kind}]')
            print(f'      {why[:260]}')

    if show_edges:
        print('\n── ALL EDGES ' + '─' * 50)
        for nkey in sorted(seen_nodes):
            for e in by_node.get(nkey, []):
                other = e[1] if e[0] == nkey else e[0]
                print(f'  {nkey} —{e[2]}/{e[3]}→ {other}')

    # ── verdict ──
    print('\n── SUBSTRATE VERDICT ' + '─' * 42)
    for k, n in sorted(counts.items(), key=lambda x: -x[1]):
        print(f'  {k:<16} {n}')
    if missing:
        print(f'\n  ⛔ NO REFLECTION FILE: {", ".join(missing)}')
    if thin_reports:
        print(f'\n  ⛔ THIN TAFSIR REPORTS (<10 editions — regenerate before drafting):')
        for t in thin_reports:
            print(f'     {t}')
    if unread:
        print(f'\n  ⚠️  {len(unread)} file(s) NOT interpretively read — treat as UNTRUSTED.')
        print('     Build from the 14-edition tafsir report directly, never from the')
        print('     reflection\'s reading. (Azam 2026-08-26: "some reflection files are')
        print('     still being improved" — this is the list that matters.)')
        for u in unread[:30]:
            print(f'     · {u}')
    print()


if __name__ == '__main__':
    main()
