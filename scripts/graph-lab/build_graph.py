#!/usr/bin/env python3
"""
GRAPH BUILD ORCHESTRATOR + FRESHNESS GATE   (adversarial-deliberation F1)
========================================================================
The typed-edge layer drifted three weeks stale under the corpus once before
(edges-typed.json built Jun 20; 1,226 content files changed under it) because
the rebuild order lived only in a comment at the bottom of apply_promotions.py.
Instructions are not enforcement — the enricher-incident lesson, applied to the
graph. This is the enforcement.

One command rebuilds the whole projection from frontmatter, in the only correct
order, and stamps the export with a content hash of content/tadabbur so staleness
is *detectable* rather than silent:

    python3 scripts/graph-lab/build_graph.py            # rebuild everything
    python3 scripts/graph-lab/build_graph.py --check    # CI/pre-gen: fail if stale

--check exits non-zero (no rebuild) when the on-disk projection was built against
a different corpus than exists now. Wire it before any pass that *reads* the
projection (promotion review, an AI-surface consumer) so nothing ever reasons
over a stale substrate again.

Pipeline (source of truth = frontmatter; every output is a derived projection):
    1. type_edges.py       related_ayahs frontmatter -> edges-typed.json
    2. build_export.py     edges-typed + merge-map + nodes -> graph-export.json
    3. write_gap_report.py quarantine tier -> gap-report.md
Then invariants:
    - corpus content hash stamped into graph-export.json meta.corpus_hash
    - overlapping-node claim check (F: 49 ayahs claimed by >1 node -> edge
      attachment is glob-order-arbitrary). Warns; does not fail the build.
"""
import re, glob, sys, json, hashlib, subprocess
from collections import defaultdict

LAB = 'scripts/graph-lab'
EXPORT = f'{LAB}/graph-export.json'
CONTENT_GLOB = 'content/tadabbur/*/ayah*.md'
PASSES = ['type_edges.py', 'build_export.py', 'write_gap_report.py']


def content_files():
    return sorted(f for f in glob.glob(CONTENT_GLOB)
                  if not any(x in f for x in ('.validation', 'report')))


def corpus_hash():
    """Hash of (path, size, mtime_ns) over every node file. Cheap, and changes
    whenever a tadabbur file is added, edited, or removed — the exact trigger
    for a rebuild. (mtime not content-bytes: fast, and edits touch mtime.)"""
    import os
    h = hashlib.sha256()
    for f in content_files():
        st = os.stat(f)
        h.update(f.encode()); h.update(str(st.st_size).encode()); h.update(str(st.st_mtime_ns).encode())
    return h.hexdigest()[:16]


def overlap_report():
    """Ayahs claimed by more than one node. Edge resolution attaches a cited
    ayah to whichever node the glob happened to register last -> arbitrary. Not
    fatal, but every overlap is a reconciliation TODO."""
    claims = defaultdict(list)
    for f in content_files():
        sm = re.match(r'(\d+)', f.split('/')[-2])
        nums = [int(n) for n in re.findall(r'\d+', f.split('/')[-1].replace('ayah', '').replace('ayahs', ''))]
        if not sm or not nums:
            continue
        s = int(sm.group(1)); lo, hi = nums[0], (nums[1] if len(nums) > 1 else nums[0])
        ref = f"{s}:{lo}" if lo == hi else f"{s}:{lo}-{hi}"
        for a in range(lo, hi + 1):
            claims[(s, a)].append(ref)
    return {k: v for k, v in claims.items() if len(v) > 1}


def stamp_hash(h):
    data = json.load(open(EXPORT, encoding='utf-8'))
    data['meta']['corpus_hash'] = h
    data['meta']['corpus_files'] = len(content_files())
    json.dump(data, open(EXPORT, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))


def check():
    """Return (fresh: bool, message)."""
    try:
        meta = json.load(open(EXPORT, encoding='utf-8'))['meta']
    except FileNotFoundError:
        return False, f"{EXPORT} does not exist — run without --check to build it."
    stamped = meta.get('corpus_hash')
    if stamped is None:
        return False, "projection predates the freshness gate (no corpus_hash) — rebuild."
    now = corpus_hash()
    if stamped != now:
        return False, (f"STALE: projection built against corpus {stamped} "
                       f"({meta.get('corpus_files', '?')} files); disk is now {now} "
                       f"({len(content_files())} files). Run: python3 {__file__.split('/')[-1]}")
    return True, f"fresh: projection matches corpus {now} ({len(content_files())} files)."


def build():
    for p in PASSES:
        print(f"\n=== {p} ===")
        r = subprocess.run([sys.executable, f'{LAB}/{p}'], capture_output=True, text=True)
        sys.stdout.write(r.stdout[-800:])
        if r.returncode != 0:
            sys.stderr.write(r.stderr)
            sys.exit(f"\nBUILD FAILED in {p}")
    h = corpus_hash()
    stamp_hash(h)
    print(f"\n=== invariants ===")
    print(f"corpus_hash stamped: {h}  ({len(content_files())} files)")
    ov = overlap_report()
    if ov:
        print(f"⚠  {len(ov)} ayah(s) claimed by >1 node (edge attachment is glob-order-arbitrary):")
        for k, v in list(ov.items())[:8]:
            print(f"     {k[0]}:{k[1]}  {v}")
        if len(ov) > 8:
            print(f"     … +{len(ov) - 8} more")
    else:
        print("✓  no overlapping node claims")
    fresh, msg = check()
    print(f"{'✓' if fresh else '✗'}  {msg}")


if __name__ == '__main__':
    if '--check' in sys.argv:
        fresh, msg = check()
        print(msg)
        sys.exit(0 if fresh else 1)
    build()
