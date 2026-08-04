import pickle, json
data = pickle.load(open('scripts/braintrust-v2/.ngram_cache.pkl','rb'))
NV = data['ngram_verses']  # only 2<=df<=10 kept
verses = json.load(open('node_modules/quran-validator/data/quran-verses.json'))
simple = {f"{v['surah']}:{v['ayah']}": v['textSimple'] for v in verses}

def surah(k): return int(k.split(':')[0])
def ayah(k): return int(k.split(':')[1])

# Find DF==2 ngrams, n>=4 words, in DIFFERENT surahs
twins = []
for g, keys in NV.items():
    if len(keys)!=2: continue
    n = g.count(' ')+1
    if n < 4: continue
    k1,k2 = keys
    if surah(k1)==surah(k2): continue  # different surah
    twins.append((n, g, k1, k2))

# sort by n desc, then dedupe: skip if this ngram is a substring of a longer twin with same pair
twins.sort(key=lambda x:(-x[0]))
# Build maximal only: a phrase is "contained" if it's substring of a longer one sharing same verse pair
seen_pairs = {}
maximal = []
for n,g,k1,k2 in twins:
    pair = tuple(sorted([k1,k2]))
    # check if g substring of an already-recorded longer phrase for same pair
    contained = False
    for (mg,mp) in maximal:
        if mp==pair and g in mg:
            contained=True; break
    if not contained:
        maximal.append((g,pair))

print("=== DF==2 phrases n>=4 words, different surahs (maximal) ===")
print("count:", len(maximal))
for g,pair in maximal:
    n=g.count(' ')+1
    print(f"\n[{n}w] '{g}'")
    for k in pair:
        print(f"   {k}: {simple[k]}")
