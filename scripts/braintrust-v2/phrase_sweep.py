import json, re
from collections import defaultdict

verses = json.load(open('node_modules/quran-validator/data/quran-verses.json'))
# key S:A -> textSimple tokens
V = {}
order = []
for v in verses:
    key = f"{v['surah']}:{v['ayah']}"
    toks = v['textSimple'].split()
    V[key] = toks
    order.append(key)

def surah(k): return int(k.split(':')[0])
def ayah(k): return int(k.split(':')[1])

# Build n-gram -> set of verse keys (document frequency)
# For n=2..6
ngram_verses = defaultdict(set)   # ngram -> set of keys (df)
ngram_count = defaultdict(int)    # ngram -> total token-occurrence count
for key, toks in V.items():
    L = len(toks)
    for n in range(2,7):
        for i in range(L-n+1):
            g = ' '.join(toks[i:i+n])
            ngram_verses[g].add(key)
            ngram_count[g]+=1

# Save summary of ngrams by df
# We want df between 2 and 10
import pickle
with open('scripts/braintrust-v2/.ngram_cache.pkl','wb') as f:
    pickle.dump({'ngram_verses':{g:sorted(s) for g,s in ngram_verses.items() if 2<=len(s)<=10},
                 'ngram_count':dict(ngram_count)}, f)
print("total distinct ngrams (n2-6):", len(ngram_verses))
print("with 2<=df<=10:", sum(1 for s in ngram_verses.values() if 2<=len(s)<=10))
