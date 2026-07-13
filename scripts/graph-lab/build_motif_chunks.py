#!/usr/bin/env python3
"""
MOTIF CHUNK GENERATOR  (F4 — review at the motif level, not the pair level)
===========================================================================
The pair-level promotion queue asks the same question dozens of times: a rare
root shared by n passages spawns C(n,2) pairs, each reviewed separately. The
scholarly question is asked ONCE per root: "is this rare root a genuine
cross-surah munāsabāt motif, and which passages truly participate?"

This groups the discovery proposals into ROOT-MOTIF review units. Each unit =
one rare root (corpus DF ≤ threshold) + every cross-surah tadabbur passage whose
text contains it. One review confirms a hub-and-spoke of edges (exemplar ↔ each
participant) instead of a full clique — smaller, honester, and matching how
mawḍūʿāt scholarship actually thinks.

Resumable: skips roots already recorded in motifs-reviewed.json (the Fable
session appends there), so a killed session resumes at the next unreviewed motif.

  python3 scripts/graph-lab/build_motif_chunks.py            # DF<=6, default
  python3 scripts/graph-lab/build_motif_chunks.py --df 10 --chunk 25

Outputs (graph-lab artifacts; writes NOTHING into content/):
  motif-chunks.json   [{root, df, nodes:[{ref,surah,title,v}], already_linked:[[a,b]...]}]
  motif-chunks.md     human-readable, chunked, for eyeballing / pasting
"""
import re, glob, sys, json
from collections import defaultdict

CORPUS = 'scripts/.corpus-cache/quranic-corpus.json'
TYPED = 'scripts/graph-lab/edges-typed.json'
REVIEWED = 'scripts/graph-lab/motifs-reviewed.json'
OUT_JSON = 'scripts/graph-lab/motif-chunks.json'
OUT_MD = 'scripts/graph-lab/motif-chunks.md'

DF_MAX = 6
if '--df' in sys.argv:
    DF_MAX = int(sys.argv[sys.argv.index('--df') + 1])
CHUNK = 20
if '--chunk' in sys.argv:
    CHUNK = int(sys.argv[sys.argv.index('--chunk') + 1])
MIN_NODES = 2          # a motif needs at least 2 passages
MAX_NODES = 40         # per_root_cap — a root in >40 passages is ambient, skip

SURAH_NAMES = {}       # filled from folder names


def parse_ref(s, lo, hi): return f"{s}:{lo}" if lo == hi else f"{s}:{lo}-{hi}"


# ---------- corpus roots + DF ----------
corpus = json.load(open(CORPUS, encoding='utf-8'))
ayah_roots = {}
df = defaultdict(int)
for key, segs in corpus.items():
    roots = {s['root'] for s in segs if s.get('root')}
    ayah_roots[key] = roots
    for r in roots:
        df[r] += 1

# ---------- nodes ----------
nodes = {}
for f in glob.glob('content/tadabbur/*/ayah*.md'):
    if any(x in f for x in ('_superseded', '.validation', 'report')):
        continue
    folder = f.split('/')[-2]
    sm = re.match(r'(\d+)', folder)
    nums = [int(n) for n in re.findall(r'\d+', f.split('/')[-1].replace('ayah', '').replace('ayahs', ''))]
    if not sm or not nums:
        continue
    surah = int(sm.group(1)); lo, hi = nums[0], (nums[1] if len(nums) > 1 else nums[0])
    ref = parse_ref(surah, lo, hi)
    SURAH_NAMES[surah] = re.sub(r'^\d+-', '', folder)
    txt = open(f, encoding='utf-8', errors='ignore').read()
    fm = txt.split('---')[1] if txt.count('---') >= 2 else ''
    tm = re.search(r'title:\s*"?(.*?)"?\s*$', fm, re.M)
    vm = re.search(r'^validated:\s*(true|false)', fm, re.M)
    v = -1 if not vm else (1 if vm.group(1) == 'true' else 0)
    proots = set()
    for a in range(lo, hi + 1):
        proots |= ayah_roots.get(f"{surah}:{a}", set())
    nodes[ref] = {'surah': surah, 'lo': lo, 'title': (tm.group(1)[:75] if tm else ''),
                  'v': v, 'roots': proots}

# ---------- existing edges (to mark already-linked pairs) ----------
existing = set()
for e in json.load(open(TYPED, encoding='utf-8'))['edges']:
    existing.add(frozenset((e['src'], e['tgt'])))

# ---------- already-reviewed roots (resume) ----------
reviewed_roots = set()
try:
    reviewed_roots = set(json.load(open(REVIEWED, encoding='utf-8')).get('roots', []))
except FileNotFoundError:
    pass

# ---------- build motifs: rare root -> cross-surah node set ----------
root_nodes = defaultdict(list)
for ref, n in nodes.items():
    for r in n['roots']:
        if df[r] <= DF_MAX:
            root_nodes[r].append(ref)

motifs = []
for r, refs in root_nodes.items():
    if r in reviewed_roots:
        continue
    surahs = {nodes[x]['surah'] for x in refs}
    if len(refs) < MIN_NODES or len(surahs) < 2 or len(refs) > MAX_NODES:
        continue
    refs = sorted(refs, key=lambda x: (nodes[x]['surah'], nodes[x]['lo']))
    already = [sorted(p) for p in
               ({frozenset((a, b)) for i, a in enumerate(refs) for b in refs[i + 1:]
                 if frozenset((a, b)) in existing})]
    n_val = sum(1 for x in refs if nodes[x]['v'] == 1)
    motifs.append({
        'root': r, 'df': df[r], 'n_nodes': len(refs), 'n_surahs': len(surahs),
        'n_validated': n_val, 'already_linked': already,
        'nodes': [{'ref': x, 'surah': SURAH_NAMES.get(nodes[x]['surah'], nodes[x]['surah']),
                   'title': nodes[x]['title'], 'v': nodes[x]['v']} for x in refs],
    })

# rarest root first; then most-validated, most cross-surah (best signal on top)
motifs.sort(key=lambda m: (m['df'], -m['n_validated'], -m['n_surahs']))

meta = {'df_max': DF_MAX, 'motifs': len(motifs),
        'total_nodes_touched': sum(m['n_nodes'] for m in motifs),
        'already_reviewed_roots': len(reviewed_roots),
        'note': 'one review per motif replaces C(n,2) pairwise reviews'}
json.dump({'meta': meta, 'chunk_size': CHUNK, 'motifs': motifs},
          open(OUT_JSON, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# markdown, chunked
L = ['# Motif review chunks', '',
     f"*DF≤{DF_MAX} · {len(motifs)} motifs · {meta['total_nodes_touched']} node-slots · "
     f"chunk size {CHUNK} · {len(reviewed_roots)} roots already reviewed (skipped)*", '',
     'Each motif = one rare Arabic root + every cross-surah passage using it. Review ONCE: '
     'is it a genuine munāsabāt motif? Which passages participate? Pick the exemplar.', '']
for ci in range(0, len(motifs), CHUNK):
    L.append(f'\n## Chunk {ci // CHUNK + 1}  (motifs {ci + 1}–{min(ci + CHUNK, len(motifs))})\n')
    for m in motifs[ci:ci + CHUNK]:
        L.append(f"### root `{m['root']}`  (DF={m['df']} · {m['n_nodes']} passages · "
                 f"{m['n_surahs']} surahs · {m['n_validated']} validated)")
        for nd in m['nodes']:
            vflag = {1: '✓', 0: '✗', -1: '·'}[nd['v']]
            L.append(f"  - [{vflag}] `{nd['ref']}` {nd['surah']} — {nd['title']}")
        if m['already_linked']:
            L.append(f"  _already linked: {m['already_linked']}_")
        L.append('')
open(OUT_MD, 'w', encoding='utf-8').write('\n'.join(L) + '\n')

print(f"motifs (DF<={DF_MAX}): {len(motifs)}  |  node-slots: {meta['total_nodes_touched']}"
      f"  |  reviewed-roots skipped: {len(reviewed_roots)}")
print(f"chunks of {CHUNK}: {(len(motifs) + CHUNK - 1) // CHUNK}")
print(f"wrote {OUT_JSON} + {OUT_MD}")
print("\nTOP 12 motifs (rarest root, most-validated first):")
for m in motifs[:12]:
    print(f"  {m['root']:8s} DF={m['df']:<2} {m['n_nodes']} passages / {m['n_surahs']} surahs"
          f" ({m['n_validated']} val)  {[nd['ref'] for nd in m['nodes'][:5]]}")
