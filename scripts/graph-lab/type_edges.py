#!/usr/bin/env python3
"""
EDGE TYPING / SALVAGE PASS  (architecture-v1.md, build step 3)
==============================================================
Type the ~14,257 hand-authored `related_ayahs:` edges and tier them by
confidence so the graph can decide which are traversable.

Every edge gets {src, tgt, type, basis, source, confidence, shared_roots, min_df}.

Confidence tiers (govern product behaviour):
  objective         -> traversable, high confidence
  thematic-asserted -> traversable, LABELLED interpretive
  quarantine        -> non-traversable until human-promoted

Mechanical typing (no LLM):
  lexical-root        objective    shares >=1 distinctive Arabic root (DF<=THRESH)
  story-continuation  objective    same surah, no distinctive shared root
                                    (architecture: same-surah edges are almost
                                     always structural/continuation, trust-high)
  shared-concept      thematic     cross-surah, no shared root, but shares a
                                    canonical theme/state tag
  thematic-echo       thematic     cross-surah, no shared root, no shared tag
                                    (author-asserted resonance; basis lives in
                                     the tadabbur prose)
  unresolved          quarantine   target ayah resolves to no node on disk

The richer semantic types (naskh / contrast / rhetorical-parallel) are NOT
mechanically derivable; they live inside the thematic-asserted tier awaiting a
later light LLM/scholar typing pass. This pass captures the objective tier
cheaply and quarantines only what cannot be located.

Outputs:
  scripts/graph-lab/edges-typed.json   the derived edge file (source of truth
                                       stays the frontmatter; this is a rebuildable
                                       projection)
Re-runnable; reads only the corpus cache + frontmatter.
"""
import re, glob, json, csv, unicodedata
from collections import defaultdict, Counter

ROOT = ''  # run from repo root
CORPUS = 'scripts/.corpus-cache/quranic-corpus.json'
MERGEMAP = 'scripts/graph-lab/merge-map.csv'
PROMOTED = 'scripts/graph-lab/edges-promoted.json'   # promotion-review overlay (F2)
REMOVED = 'scripts/graph-lab/edges-removed.json'     # reviewer-flagged removals (F3)
OUT = 'scripts/graph-lab/edges-typed.json'

# Promotion review confirmed a discovered cross-surah connection by READING both
# passages. That basis is richer than a bare related_ayahs ref — so promoted
# edges enter here as a first-class overlay carrying {connection_type, note},
# NOT by laundering a basis-less ref into frontmatter (adversarial-deliberation
# F2: "we trust the basis, not the edge"). source='promotion-review' keeps them
# forever distinguishable from tadabbur-authored edges. connection_type -> tier:
PROMOTED_OBJECTIVE = {'twin-ruling', 'retelling', 'shared-scene', 'shared-epithet'}
# (verbatim / near-verbatim shared material) — the rest ('deliberate-echo',
# 'thematic-parallel') are interpretive resonance -> thematic-asserted.

# A shared root only signals a genuine intertextual ("twin-verse") link when it
# is distinctive. The top ~42 roots (DF>200, i.e. appear in >3.2% of ayahs) are
# ambient/function-ish (Allah, qul, kawn, rabb, ʿilm, amana...) -> two verses
# both using them says nothing. Roots at or below 200 carry lexical signal.
DISTINCTIVE_DF = 200
STRONG_DF      = 50   # <=50 = strong distinctive link (sub-label only)
# same-surah edges are structural ("continuation") only when the verses are
# close: 93% of same-surah edges fall within 30 ayahs (median gap 3). Beyond
# that they are intra-surah thematic call-backs, not adjacency -> demote.
CONT_GAP       = 30

# ---------- fold helper (diacritics -> ascii) --------------------------------
def fold(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode('ascii')
    s = s.strip().strip('"\'').lower()
    s = re.sub(r'[^a-z0-9\- ]', '', s).strip()
    return s

# ---------- 1. corpus: per-ayah root sets + document frequency ----------------
corpus = json.load(open(CORPUS, encoding='utf-8'))
ayah_roots = {}                 # "s:a" -> {roots}
df = Counter()
for key, segs in corpus.items():
    roots = {s['root'] for s in segs if s.get('root')}
    ayah_roots[key] = roots
    for r in roots:
        df[r] += 1
N_AYAHS = len(corpus)

# ---------- 2. canonical merge map (for shared-concept detection) -------------
merge = {}
with open(MERGEMAP, newline='', encoding='utf-8') as fh:
    for row in csv.DictReader(fh):
        a = fold(row['alias']); c = fold(row['canonical']); ax = row['axis'].strip().lower()
        if not a or ax == 'drop':
            continue
        merge[a] = (c, ax)

# ---------- 3. parse frontmatter -> nodes, ayah_index, raw edges --------------
files = [f for f in glob.glob('content/tadabbur/*/ayah*.md')
         if not any(x in f for x in ('.validation', 'report'))]
nodes = {}          # ref -> {surah, lo, hi, file, title, themes, roots}
ayah_index = {}     # "s:a" -> ref
raw_edges = []      # (src_ref, raw_target_string)

def parse_ref(s, lo, hi): return f"{s}:{lo}" if lo == hi else f"{s}:{lo}-{hi}"

for f in files:
    txt = open(f, encoding='utf-8', errors='ignore').read()
    fm = txt.split('---')[1] if txt.count('---') >= 2 else txt[:3000]
    sm = re.match(r'(\d+)', f.split('/')[-2])
    if not sm:
        continue
    surah = int(sm.group(1))
    nums = [int(n) for n in re.findall(r'\d+', f.split('/')[-1].replace('ayah', '').replace('ayahs', ''))]
    if not nums:
        continue
    lo, hi = nums[0], (nums[1] if len(nums) > 1 else nums[0])
    ref = parse_ref(surah, lo, hi)
    tm = re.search(r'title:\s*"?(.*?)"?\s*$', fm, re.M)
    title = (tm.group(1)[:70] if tm else '')
    # canonical themes (theme + state axes only -> the "is this the same topic" signal)
    themes = set()
    for field in ('concepts', 'tags'):
        m = re.search(rf'{field}:\s*\[(.*?)\]', fm, re.S)
        if not m:
            continue
        for x in m.group(1).split(','):
            a = fold(x)
            if a in merge:
                c, ax = merge[a]
                # bridge axis is QUARANTINED from classical theme pooling
                # (advisor panel call 9): a shared modern-construct tag must not
                # by itself create a traversable shared-concept edge.
                if ax in ('theme', 'state', 'attribute'):
                    themes.add(c)
    # passage roots = union over the ayah range
    proots = set()
    for a in range(lo, hi + 1):
        proots |= ayah_roots.get(f"{surah}:{a}", set())
    nodes[ref] = {'surah': surah, 'lo': lo, 'hi': hi, 'file': f,
                  'title': title, 'themes': themes, 'roots': proots}
    for a in range(lo, hi + 1):
        ayah_index[f"{surah}:{a}"] = ref
    mr = re.search(r'related_ayahs:\s*\[(.*?)\]', fm, re.S)
    if mr:
        for x in mr.group(1).split(','):
            x = x.strip().strip('"\'')
            if ':' in x:
                raw_edges.append((ref, x))

# ---------- 4. type every edge ------------------------------------------------
def resolve(raw):
    """raw target string -> (node_ref or None). Ranges resolve via their start."""
    start = raw.split('-')[0].strip()
    return ayah_index.get(start)

edge_records = []
seen = set()            # dedup unordered pair + keep first authored direction
type_counts = Counter()
conf_counts = Counter()
shared_any = 0          # edges sharing ANY root (incl. ambient) -> for reporting

for src, raw in raw_edges:
    # non-Quranic targets (e.g. "Psalm-37:29") are deliberate external-scripture
    # citations, not gaps. They are an objective basis but terminal in the
    # in-Quran graph.
    surah_tok = raw.split('-')[0].split(':')[0].strip()
    if not surah_tok.isdigit():
        key = ('__external__', src, raw)
        if key not in seen:
            seen.add(key)
            edge_records.append({
                'src': src, 'tgt': raw, 'type': 'external-reference',
                'confidence': 'objective',
                'basis': 'explicit external-scripture citation (terminal in the Quran graph)',
                'source': 'related_ayahs frontmatter',
                'shared_roots': [], 'min_df': None,
            })
            type_counts['external-reference'] += 1
            conf_counts['objective'] += 1
        continue

    tgt = resolve(raw)
    if not tgt or tgt == src:
        if not tgt:
            key = ('__unresolved__', src, raw)
            if key in seen:
                continue
            seen.add(key)
            edge_records.append({
                'src': src, 'tgt': raw, 'type': 'unresolved',
                'confidence': 'quarantine',
                'basis': 'target ayah resolves to no tadabbur node on disk',
                'source': 'related_ayahs frontmatter',
                'shared_roots': [], 'min_df': None,
            })
            type_counts['unresolved'] += 1
            conf_counts['quarantine'] += 1
        continue

    pair = frozenset((src, tgt))
    if pair in seen:
        continue
    seen.add(pair)

    s_roots, t_roots = nodes[src]['roots'], nodes[tgt]['roots']
    shared = s_roots & t_roots
    if shared:
        shared_any += 1
    distinctive = sorted(((r, df[r]) for r in shared if df.get(r, 0) <= DISTINCTIVE_DF),
                         key=lambda rd: rd[1])
    same_surah = nodes[src]['surah'] == nodes[tgt]['surah']
    shared_themes = sorted(nodes[src]['themes'] & nodes[tgt]['themes'])

    gap = abs(nodes[src]['lo'] - nodes[tgt]['lo']) if same_surah else None

    if distinctive:
        min_df = distinctive[0][1]
        strength = 'strong' if min_df <= STRONG_DF else 'moderate'
        rec = {
            'src': src, 'tgt': tgt, 'type': 'lexical-root', 'confidence': 'objective',
            'strength': strength,
            'basis': f"shared distinctive root(s) [{strength}]: "
                     + ", ".join(f"{r}(DF={d})" for r, d in distinctive[:6]),
            'source': 'related_ayahs frontmatter',
            'shared_roots': [{'root': r, 'df': d} for r, d in distinctive],
            'min_df': min_df,
            'same_surah': same_surah,
        }
    elif same_surah and gap <= CONT_GAP:
        rec = {
            'src': src, 'tgt': tgt, 'type': 'story-continuation', 'confidence': 'objective',
            'basis': f'same-surah structural adjacency (gap={gap} ayahs, trust-high, '
                     'not lexically verified)',
            'source': 'related_ayahs frontmatter',
            'shared_roots': [], 'min_df': None, 'same_surah': True, 'gap': gap,
        }
    elif same_surah:
        rec = {
            'src': src, 'tgt': tgt, 'type': 'thematic-echo', 'confidence': 'thematic-asserted',
            'basis': f'same-surah long-range call-back (gap={gap} ayahs; thematic, '
                     'not structural adjacency)',
            'source': 'related_ayahs frontmatter',
            'shared_roots': [], 'min_df': None, 'same_surah': True, 'gap': gap,
        }
    elif shared_themes:
        rec = {
            'src': src, 'tgt': tgt, 'type': 'shared-concept', 'confidence': 'thematic-asserted',
            'basis': 'shared canonical theme(s): ' + ", ".join(shared_themes[:5]),
            'source': 'related_ayahs frontmatter',
            'shared_roots': [], 'min_df': None, 'same_surah': False,
            'shared_themes': shared_themes,
        }
    else:
        rec = {
            'src': src, 'tgt': tgt, 'type': 'thematic-echo', 'confidence': 'thematic-asserted',
            'basis': 'author-asserted resonance (no shared root or canonical tag; '
                     'basis lives in the tadabbur prose — needs light review/LLM typing)',
            'source': 'related_ayahs frontmatter',
            'shared_roots': [], 'min_df': None, 'same_surah': False,
        }
    edge_records.append(rec)
    type_counts[rec['type']] += 1
    conf_counts[rec['confidence']] += 1

# ---------- 4b. promotion-review overlay (F2 — provenance-preserving) ---------
# Merge confirmed promoted edges WITHOUT touching frontmatter. Each carries the
# reviewer's connection_type + note as basis, so on every rebuild the graph shows
# WHY the edge was promoted instead of re-deriving a generic "author-asserted"
# label. Deduped against the same `seen` set, so a pair an author later writes
# into frontmatter is never double-counted.
promoted_added = 0
try:
    prom = json.load(open(PROMOTED, encoding='utf-8'))
    for e in prom.get('edges', []):
        if e.get('verdict') != 'CONFIRM':
            continue
        src, tgt = ayah_index.get(e['src'].split('-')[0]), ayah_index.get(e['tgt'].split('-')[0])
        # promoted refs are node refs already; fall back to the literal ref
        src = src or (e['src'] if e['src'] in nodes else None)
        tgt = tgt or (e['tgt'] if e['tgt'] in nodes else None)
        if not src or not tgt or src == tgt:
            continue
        pair = frozenset((src, tgt))
        if pair in seen:
            continue
        seen.add(pair)
        ctype = e.get('connection_type', 'thematic-parallel')
        conf = 'objective' if ctype in PROMOTED_OBJECTIVE else 'thematic-asserted'
        edge_records.append({
            'src': src, 'tgt': tgt, 'type': f'promoted:{ctype}', 'confidence': conf,
            'basis': e.get('note', 'promotion review confirmed (both passages read)'),
            'source': 'promotion-review',
            'shared_roots': [], 'min_df': None, 'same_surah': nodes[src]['surah'] == nodes[tgt]['surah'],
        })
        type_counts[f'promoted:{ctype}'] += 1
        conf_counts[conf] += 1
        promoted_added += 1
except FileNotFoundError:
    pass

# ---------- 4c. reviewer-flagged removals (F3 — provenance-preserving) --------
# Motif review flagged some AUTHORED edges as coincidental same-root matches
# (cross-sense links). The frontmatter stays untouched; edges-removed.json is
# the reversible ledger of record. Filtering here (after all sources merge)
# suppresses a flagged pair no matter which path produced it.
removed_pairs, removed_count = set(), 0
try:
    _rem = json.load(open(REMOVED, encoding='utf-8'))
    removed_pairs = {frozenset((r['src'], r['tgt'])) for r in _rem.get('removed', [])}
except FileNotFoundError:
    pass
if removed_pairs:
    _before = len(edge_records)
    kept_records = []
    for rec in edge_records:
        if frozenset((rec['src'], rec['tgt'])) in removed_pairs:
            type_counts[rec['type']] -= 1
            conf_counts[rec['confidence']] -= 1
            continue
        kept_records.append(rec)
    edge_records = kept_records
    removed_count = _before - len(edge_records)

# ---------- 5. write + report -------------------------------------------------
meta = {
    'generator': 'scripts/graph-lab/type_edges.py',
    'corpus_ayahs': N_AYAHS,
    'distinctive_df_threshold': DISTINCTIVE_DF,
    'strong_df_threshold': STRONG_DF,
    'raw_edges_parsed': len(raw_edges),
    'promoted_overlay_edges': promoted_added,
    'reviewer_removed_edges': removed_count,
    'unique_edges': len(edge_records),
    'type_counts': dict(type_counts),
    'confidence_counts': dict(conf_counts),
}
json.dump({'meta': meta, 'edges': edge_records}, open(OUT, 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

bar = "=" * 70
print(bar); print("EDGE TYPING / SALVAGE PASS"); print(bar)
print(f"corpus ayahs: {N_AYAHS}  | distinct roots: {len(df)}")
print(f"distinctive-root threshold: DF<={DISTINCTIVE_DF}  (strong<={STRONG_DF})")
print(f"raw related_ayahs edges parsed: {len(raw_edges)}")
print(f"promotion-review overlay edges merged (F2): {promoted_added}")
print(f"unique edges after dedup (unordered pairs + unresolved): {len(edge_records)}")
print(f"edges sharing ANY root (incl. ambient): {shared_any}")
print()
total = sum(conf_counts.values())
print("BY CONFIDENCE TIER (governs traversability):")
for tier in ('objective', 'thematic-asserted', 'quarantine'):
    c = conf_counts.get(tier, 0)
    print(f"   {tier:18s} {c:6d}  ({100*c/max(1,total):4.1f}%)")
print()
print("BY TYPE:")
for t, c in type_counts.most_common():
    print(f"   {t:20s} {c:6d}  ({100*c/max(1,total):4.1f}%)")
print()
print(f"reviewer-flagged edges removed (F3): {removed_count}")
print(f"written -> {OUT}")

# strength breakdown of the lexical-root (objective) tier
lex = [e for e in edge_records if e['type'] == 'lexical-root']
strong = sum(1 for e in lex if e['min_df'] is not None and e['min_df'] <= STRONG_DF)
cont = sum(1 for e in edge_records if e['type'] == 'story-continuation')
print(f"\nlexical-root tier: {len(lex)} edges  |  strong (rarest root DF<={STRONG_DF}): {strong}"
      f"  moderate: {len(lex)-strong}")
print("OBJECTIVE-TIER SENSITIVITY (carry the evidence, let the query layer choose):")
print(f"   strict   (strong lexical + story-continuation only): {strong+cont}  "
      f"({100*(strong+cont)/max(1,total):4.1f}%)")
print(f"   lenient  (any distinctive root + story-continuation): {len(lex)+cont}  "
      f"({100*(len(lex)+cont)/max(1,total):4.1f}%)  <- current 'objective' tier")

# a few worked examples for eyeballing
print("\nSAMPLE lexical-root edges (rarest shared root first):")
for e in sorted(lex, key=lambda e: e['min_df'])[:8]:
    print(f"   {e['src']:9s} -> {e['tgt']:9s}  {e['basis']}")
print("\nSAMPLE thematic-echo edges (the light-review queue):")
for e in [e for e in edge_records if e['type'] == 'thematic-echo'][:5]:
    print(f"   {e['src']:9s} -> {e['tgt']:9s}")
