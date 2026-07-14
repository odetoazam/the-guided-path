#!/usr/bin/env python3
"""
RUN-2 SALVAGE EXTRACTOR
=======================
The DF7-10 motif review ran as ~40 background sub-agents whose verdicts landed in
their task transcripts (…/tasks/*.output, JSONL) instead of the ledger. Their work
is good but scattered across three ref formats. This extracts every CONFIRM edge,
normalizes refs, validates against real nodes, dedups against the committed ledger,
and writes a STAGING file — it does NOT touch edges-promoted.json.

  python3 scripts/graph-lab/extract_run2.py

Output: scripts/graph-lab/run2-salvage/staged-edges.json  (review before merging)
"""
import re, json, glob, os

TASKS = os.path.expanduser(
    '/private/tmp/claude-501/-Users-azamkhan-the-guided-path/'
    '2d2eee89-70fa-4d0c-8435-f09d82ea876a/tasks')
OUT = 'scripts/graph-lab/run2-salvage/staged-edges.json'

# ---- valid node refs (for validation) ----
nodes = set(json.load(open('scripts/graph-lab/graph-export.json', encoding='utf-8'))['nodes'].keys())

# ---- normalize any of the 3 ref styles -> canonical "S:A" / "S:A-B" ----
def norm(ref):
    ref = ref.strip().strip('"\'').replace('.md', '')
    # style A: already colon form  "2:26-27"
    if ':' in ref:
        s, a = ref.split(':', 1)
        return f"{int(s)}:{a}"
    # style B: path "018-al-kahf/ayahs-042-044"  or "003-aal-imran/ayah-013"
    if '/' in ref:
        folder, fname = ref.split('/', 1)
        s = int(re.match(r'(\d+)', folder).group(1))
        nums = [int(n) for n in re.findall(r'\d+', fname)]
        if not nums:
            return None
        return f"{s}:{nums[0]}" if len(nums) == 1 else f"{s}:{nums[0]}-{nums[1]}"
    # style C: dash "034-034" or "021-011-013"
    parts = ref.split('-')
    if len(parts) >= 2 and all(p.isdigit() for p in parts):
        s = int(parts[0])
        if len(parts) == 2:
            return f"{s}:{int(parts[1])}"
        return f"{s}:{int(parts[1])}-{int(parts[2])}"
    return None

def canon_pair(a, b):
    a, b = norm(a), norm(b)
    if not a or not b or a == b:
        return None
    return a, b

# ---- pull assistant text from a JSONL transcript ----
def assistant_text(path):
    out = []
    for line in open(path, encoding='utf-8', errors='ignore'):
        try:
            o = json.loads(line)
        except Exception:
            continue
        if not isinstance(o, dict):
            continue
        msg = o.get('message')
        if not isinstance(msg, dict) or msg.get('role') != 'assistant':
            continue
        c = msg.get('content')
        if isinstance(c, str):
            out.append(c)
        elif isinstance(c, list):
            for b in c:
                if isinstance(b, dict) and b.get('type') == 'text':
                    out.append(b.get('text', ''))
    return '\n'.join(out)

# ---- extract {…"verdict":"CONFIRM"…} objects via brace matching ----
def extract_edges(text):
    edges = []
    for m in re.finditer(r'\{', text):
        i = m.start()
        depth = 0
        for j in range(i, min(i + 2000, len(text))):
            if text[j] == '{': depth += 1
            elif text[j] == '}':
                depth -= 1
                if depth == 0:
                    blob = text[i:j + 1]
                    if '"verdict"' in blob and 'CONFIRM' in blob and '"src"' in blob:
                        try:
                            edges.append(json.loads(blob))
                        except Exception:
                            pass
                    break
    return edges

# ---- existing ledger pairs (dedup target) ----
existing = set()
led = json.load(open('scripts/graph-lab/edges-promoted.json', encoding='utf-8'))
for e in led['edges']:
    p = canon_pair(e.get('src', ''), e.get('tgt', ''))
    if p: existing.add(frozenset(p))

SCRATCH = os.path.dirname(TASKS) + '/scratchpad'

staged, seen, invalid, dup = [], set(), 0, 0
reviewed_roots = set()
files_with_edges = 0

def ingest(edge_list, source_name):
    global invalid, dup, files_with_edges
    got = False
    for e in edge_list:
        if not isinstance(e, dict) or e.get('verdict') not in (None, 'CONFIRM'):
            continue
        if 'src' not in e or 'tgt' not in e:
            continue
        pair = canon_pair(e.get('src', ''), e.get('tgt', ''))
        if not pair:
            invalid += 1; continue
        s, t = pair
        if s not in nodes or t not in nodes:
            invalid += 1; continue
        key = frozenset(pair)
        if key in existing or key in seen:
            dup += 1; continue
        seen.add(key)
        got = True
        staged.append({
            'src': s, 'tgt': t, 'verdict': 'CONFIRM',
            'connection_type': e.get('connection_type', 'thematic-parallel'),
            'note': e.get('note', ''),
            'source_task': source_name,
        })
    if got:
        files_with_edges += 1

# 1) task transcripts (agents that returned edges in their message text)
for f in sorted(glob.glob(f'{TASKS}/*.output')):
    txt = assistant_text(f)
    ingest(extract_edges(txt), os.path.basename(f))
    # roots evidence embedded in returned JSON blobs
    for m in re.finditer(r'"roots":\s*\[(.*?)\]', txt, re.S):
        for r in re.findall(r'"([^"]+)"', m.group(1)):
            reviewed_roots.add(r)
    for m in re.finditer(r'"root":\s*"([^"]+)"', txt):
        reviewed_roots.add(m.group(1))

# 2) scratchpad result files (agents that wrote structured output to disk)
for f in sorted(glob.glob(f'{SCRATCH}/*result*.json')):
    try:
        d = json.load(open(f, encoding='utf-8'))
    except Exception:
        continue
    if isinstance(d, dict):
        ingest(d.get('edges', []), os.path.basename(f))
        for r in d.get('roots', []):
            reviewed_roots.add(r)

os.makedirs('scripts/graph-lab/run2-salvage', exist_ok=True)
json.dump({'meta': {'staged': len(staged), 'files_with_edges': files_with_edges,
                    'invalid_or_unresolved': invalid, 'duplicates_skipped': dup,
                    'reviewed_roots': len(reviewed_roots)},
           'edges': staged,
           'reviewed_roots': sorted(reviewed_roots)},
          open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

print(f"transcript files scanned: {len(glob.glob(f'{TASKS}/*.output'))}")
print(f"files yielding CONFIRM edges: {files_with_edges}")
print(f"staged NEW valid edges: {len(staged)}")
print(f"  dropped — invalid/unresolvable ref: {invalid}")
print(f"  dropped — dup of ledger or each other: {dup}")
print(f"wrote {OUT}")
from collections import Counter
ct = Counter(e['connection_type'] for e in staged)
print("by type:", dict(ct))
