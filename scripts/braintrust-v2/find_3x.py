import pickle, json
from collections import defaultdict
data = pickle.load(open('scripts/braintrust-v2/.ngram_cache.pkl','rb'))
NV = data['ngram_verses']
verses = json.load(open('node_modules/quran-validator/data/quran-verses.json'))
simple = {f"{v['surah']}:{v['ayah']}": v['textSimple'] for v in verses}
toks = {k:v.split() for k,v in simple.items()}
def surah(k): return int(k.split(':')[0])

# exactly-3x phrases, n>=4 words, spanning >=2 surahs (progressions/sets)
groups=defaultdict(list)
for g,keys in NV.items():
    if len(keys)!=3: continue
    n=g.count(' ')+1
    if n<4: continue
    surahs={surah(k) for k in keys}
    if len(surahs)<2: continue
    groups[tuple(sorted(keys))].append(g)

# for each triple, longest phrase; dedupe by keeping maximal
rows=[]
for triple,phrases in groups.items():
    longest=max(phrases,key=lambda p:p.count(' '))
    rows.append((longest.count(' ')+1,longest,triple))
rows.sort(key=lambda r:-r[0])
print(f"=== exactly-3x phrases n>=4w across >=2 surahs: {len(rows)} triples ===")
for maxlen,longest,triple in rows:
    if maxlen>6: 
        # still show but note
        pass
    print(f"\n[{maxlen}w] '{longest}'  {list(triple)}")
    for k in triple:
        print(f"   {k}: {simple[k][:90]}")
