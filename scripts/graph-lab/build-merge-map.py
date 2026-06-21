#!/usr/bin/env python3
"""
Build the authoritative controlled-vocabulary merge map.

Output: scripts/graph-lab/merge-map.csv  (columns: alias,canonical,axis)

Sources:
  - ontology-v1.md      (multi-axis canonical vocabulary + aliases, prose format)
  - merge-map.json      (prior auto-parse, 189 canonicals captured)
  - unmapped-recurring.txt (287 terms recurring >=5x not yet mapped)

This file IS the spec: every alias->canonical->axis decision is encoded here
explicitly so the result is deterministic, auditable, and reversible.
"""

import csv
import re
import os

OUT = os.path.join(os.path.dirname(__file__), "merge-map.csv")

# axis vocabulary: theme, attribute, device, grammar, character, state, bridge, drop
# canonical -> (axis, [aliases])
# Every canonical also becomes its own alias row (added automatically below).

ONTOLOGY = {
    # ====================== A. THEME ======================
    # -- Theology & God-relationship --
    "tawhid": ("theme", ["tawhid"]),
    "shirk": ("theme", ["shirk", "idolatry", "false-gods", "idols", "taghut", "ittikhadh",
                        "tatayyur", "superstition", "ill-omen"]),
    "iman": ("theme", ["iman", "faith", "belief", "believers", "faith-and-works",
                        "faith-under-pressure"]),
    "kufr": ("theme", ["kufr", "kufr-as-covering", "disbelief", "juhud", "fisq",
                        "kufr-an-nima", "kufran"]),
    "nifaq": ("theme", ["nifaq", "hypocrisy", "munafiqun"]),
    "taqwa": ("theme", ["taqwa", "taqwa-as-shield", "fear-of-allah"]),
    "ihsan": ("theme", ["ihsan"]),
    "ibadah": ("theme", ["ibadah", "worship", "ubudiyyah", "servanthood", "servitude",
                          "cosmic-worship", "obedience", "ritual", "tahiyyah", "qunut"]),
    "tawakkul": ("theme", ["tawakkul", "trust", "dependence", "dependency", "tafwid"]),
    "tawbah": ("theme", ["tawbah", "tawba", "repentance", "inabah", "inaba", "ruju",
                         "return-to-allah", "awwab", "return"]),
    "dhikr": ("theme", ["dhikr", "remembrance", "tadhakkur", "dhikra", "reminder", "memory"]),
    "dua": ("theme", ["dua", "supplication", "najwa", "prophetic-prayer", "nida",
                      "divine-call", "istijaba", "divine-response"]),
    "salah": ("theme", ["salah", "prayer", "prostration", "sujud", "sajdah", "night-prayer",
                        "tahajjud", "qiyam-al-layl"]),
    "tasbih": ("theme", ["tasbih", "hamd"]),
    "istighfar": ("theme", ["istighfar"]),
    "maghfira": ("theme", ["maghfira", "forgiveness", "maghfirah", "afw", "afuw",
                           "divine-forgiveness", "pardon"]),
    "ikhlas": ("theme", ["ikhlas", "sincerity", "intention", "niyyah", "hanif"]),
    "tadabbur": ("theme", ["tadabbur", "tafakkur", "reflection"]),
    "tazkiyah": ("theme", ["tazkiyah", "purification", "purity", "tahara", "islah",
                           "self-purification"]),
    "fitrah": ("theme", ["fitrah", "fitra"]),

    # -- Revelation & prophethood --
    "hidayah": ("theme", ["hidayah", "guidance", "huda", "hudan", "rushd", "straight-path",
                          "sirat-mustaqim", "irat-mustaqim", "dalal", "misguidance", "sabil",
                          "basirah"]),
    "revelation": ("theme", ["revelation", "wahy", "tanzil", "gradual-revelation",
                            "divine-command", "imla"]),
    "quran": ("theme", ["quran", "kitab", "scripture", "furqan", "criterion", "tilawah",
                        "recitation", "lawh-mahfuz", "divine-record", "lawh"]),
    "prophethood": ("theme", ["prophethood", "prophetic-mission", "risalah", "prophecy",
                             "messengers", "rasul", "rusul", "prophets", "shahada",
                             "shahadah", "testimony", "prophetic-continuity"]),
    "prophetic-method": ("theme", ["prophetic-method", "prophetic-pattern", "dawah", "balagh",
                                   "indhar", "prophetic-confrontation", "prophetic-address",
                                   "prophetic-stories", "prophetic-history", "say",
                                   "prophetic-burden", "prophetic-vulnerability"]),
    "prophetic-consolation": ("theme", ["prophetic-consolation", "prophetic-comfort",
                                        "prophetic-grief", "prophetic-restraint",
                                        "prophetic-humility", "prophetic-authority",
                                        "divine-attention"]),
    "covenant": ("theme", ["covenant", "mithaq", "ahd"]),
    "muqattaat": ("theme", ["muqattaat"]),

    # -- Unseen & eschatology --
    "akhirah": ("theme", ["akhirah", "akhira", "hereafter", "afterlife", "the-last-day",
                         "dunya-akhira", "eschatology", "khulud", "eternity", "finality",
                         "masir", "meeting-allah", "liqa-allah", "wad"]),
    "ghayb": ("theme", ["ghayb", "unseen", "the-unseen", "ilm-al-ghayb", "malakut",
                       "mystery"]),
    "resurrection": ("theme", ["resurrection", "bath", "nushur", "revival", "gathering",
                              "hashr", "naba", "bas"]),
    "qiyamah": ("theme", ["qiyamah", "yawm-al-qiyamah", "day-of-judgment", "judgment-day",
                         "the-hour", "hour", "yawm-al-din", "yawm-al-fasl", "the-day"]),
    "accountability": ("theme", ["accountability", "hisab", "reckoning", "mizan", "scale",
                                "the-record", "individual-accountability", "self-accountability",
                                "collective-responsibility", "individual-responsibility",
                                "responsibility", "deeds", "righteous-deeds", "amal-salih",
                                "ajr", "ihbat-al-amal", "qada", "exposure", "witnessing",
                                "witness"]),
    "judgment": ("theme", ["judgment", "divine-judgment", "recompense", "jaza", "reward",
                          "ajr-reward", "fawz", "vindication"]),
    "punishment": ("theme", ["punishment", "adhab", "divine-punishment", "intiqam",
                            "disgrace", "humiliation", "divine-warning", "divine-forbearance",
                            "nakir", "wrath"]),
    "salvation": ("theme", ["salvation", "falah", "success", "fawz-salvation", "tamkin",
                           "tamkeen", "vindication-salvation"]),
    "jannah": ("theme", ["jannah", "paradise", "gardens", "tayyibat", "hasanah", "abrar"]),
    "jahannam": ("theme", ["jahannam", "hellfire", "hell", "fire"]),
    "barzakh": ("theme", ["barzakh"]),

    # -- Divine governance themes --
    "qadar": ("theme", ["qadar", "qadr", "divine-decree", "decree", "taqdir", "divine-will",
                        "mashiah", "mashia", "iradah", "divine-pattern", "sunnat-allah",
                        "sunnah-of-allah", "divine-timing", "ajal", "ajal-musamma",
                        "appointed-term", "divine-promise", "divine-pledge", "promise",
                        "providence", "contingency", "in-sha-allah"]),
    "divine-justice": ("theme", ["divine-justice", "justice", "adl", "qist",
                                "mercy-and-justice", "theodicy"]),
    "divine-mercy": ("theme", ["divine-mercy", "mercy", "rahmah", "rahma", "hidden-mercy",
                              "warning-as-mercy", "divine-grace", "grace", "fadl",
                              "divine-favor", "divine-favors", "nimah", "nima", "ala",
                              "ala-favors", "barakah", "blessing", "blessings", "abundance"]),
    "free-will": ("theme", ["free-will", "agency", "kasb", "choice", "freedom"]),
    "divine-testing": ("theme", ["divine-testing", "trial", "test", "testing", "ibtila",
                                "bala", "fitnah", "fitna", "hardship", "affliction",
                                "haraj", "kabad"]),
    "rizq": ("theme", ["rizq", "provision", "sustenance", "divine-provision", "divine-economy",
                      "divine-sustenance", "taysir"]),
    "divine-pedagogy": ("theme", ["divine-pedagogy", "istidraj", "respite", "imla-respite"]),

    # -- Human conduct / ethics --
    "gratitude": ("theme", ["gratitude", "shukr", "ingratitude", "kufr-as-ingratitude"]),
    "sabr": ("theme", ["sabr", "patience", "steadfastness", "perseverance", "thabat",
                      "firmness", "istiqamah", "istiqama", "discipline", "waiting", "habit"]),
    "knowledge": ("theme", ["knowledge", "ilm", "knowledge-of-the-unseen", "epistemology",
                           "epistemic-humility", "discernment", "ignorance"]),
    "wisdom": ("theme", ["wisdom", "hikmah", "divine-wisdom"]),
    "law-and-ethics": ("theme", ["law-and-ethics", "fiqh", "hukm", "hudud", "halal", "haram",
                                "boundaries", "taklif", "adab", "akhlaq", "character",
                                "speech-ethics", "modesty", "chastity", "hijab", "maruf",
                                "fahisha", "sin", "righteousness", "birr", "privacy",
                                "istidhan", "permission", "idhn", "divine-permission",
                                "concealment", "hospitality",
                                "amanah", "stewardship", "sacrifice", "tongue", "the-tongue",
                                "body-language"]),
    "social-justice": ("theme", ["social-justice", "oppression", "zulm", "dhulm", "tyranny",
                                "tughyan", "baghy", "fasad", "corruption", "wrongdoing",
                                "transgression"]),
    "charity": ("theme", ["charity", "infaq", "sadaqah", "zakat", "zakah", "spending",
                         "generosity", "qard-hasan"]),
    "family": ("theme", ["family", "marriage", "children", "parents", "motherhood",
                        "inheritance", "kinship", "lineage", "household", "prophetic-household",
                        "divorce", "mawaddah", "mawadda", "women", "companionship",
                        "reconciliation", "masakin"]),
    "community": ("theme", ["community", "ummah", "belonging", "unity", "sectarianism",
                           "fragmentation", "division", "social-fabric", "social-pressure",
                           "shura", "brotherhood", "separation", "universality", "disagreement"]),
    "leadership": ("theme", ["leadership", "authority", "succession", "istikhlaf", "hierarchy",
                            "sultan", "khilafah", "stewardship-leadership"]),
    "economics": ("theme", ["economics", "wealth", "materialism", "bukhl", "stinginess",
                           "israf", "reciprocity", "ownership", "divine-ownership",
                           "throne", "mata", "faqr"]),

    # -- Creation & cosmos --
    "creation": ("theme", ["creation", "khalq", "human-origin", "kun-fayakun", "taswiyah",
                          "human-nature", "bashar", "transformation", "tabdil", "purpose"]),
    "signs": ("theme", ["signs", "ayat", "signs-of-allah", "divine-signs", "ayat-allah",
                       "ayat-kawniyyah", "cosmic-signs", "signs-in-creation", "ayah-as-sign",
                       "sign", "ayah", "bayyinat", "bayyinah", "evidence", "dalil", "istidlal",
                       "burhan", "miracle", "beauty"]),
    "nature": ("theme", ["nature", "rain", "water", "wind", "mountains", "night", "darkness",
                        "light", "nur", "night-and-day", "cosmos", "earth", "cosmic-order",
                        "cosmology", "taskhir"]),
    "history": ("theme", ["history", "generations", "nations", "destroyed-nations", "ruins",
                         "civilizational-collapse", "destruction", "ihlak", "sayhah", "flood",
                         "qaryah", "qurun", "legacy", "baghtatan", "travel"]),

    # -- Conflict / society-under-stress --
    "jihad": ("theme", ["jihad", "struggle", "striving", "nusrah", "nasr", "victory",
                        "intisar", "divine-help", "strength-jihad"]),
    "persecution": ("theme", ["persecution", "hijrah", "hijra", "exile", "isolation",
                             "deliverance", "rescue", "najah", "najat", "escape", "weakness",
                             "faith-under-pressure-DUP"]),
    "polemic": ("theme", ["polemic", "jadal", "jidal", "disputation", "dispute", "hujjah",
                         "burden-of-proof", "challenge", "accusation", "fabrication", "iftira",
                         "falsehood", "slander", "qadhf", "ifk", "dialogue", "buhtan",
                         "excuses", "opposition"]),
    "kayd": ("theme", ["kayd", "makr", "plotting", "deception", "sihr", "magic", "waswasa",
                      "whisper", "futility"]),
    "ikhtilaf": ("theme", ["ikhtilaf"]),

    # -- Misc high-frequency themes --
    "denial": ("theme", ["denial", "takdhib", "takdhib-denial", "rejection", "refusal",
                        "turning-away", "tawalli", "irad", "avoidance", "mockery", "istihza"]),
    "heedlessness": ("theme", ["heedlessness", "ghaflah", "ghafla", "distraction", "lahw",
                              "laghw", "forgetting", "nisyan", "silence"]),
    "arrogance": ("theme", ["arrogance", "kibr", "istikbar", "takabbur", "pride", "ego",
                          "ghurur"]),
    "truth": ("theme", ["truth", "haqq", "al-haqq", "bil-haqq", "truthfulness", "sidq",
                       "tasdiq", "integrity", "clarity"]),
    "intercession": ("theme", ["intercession", "shafaah"]),
    "wilayah": ("theme", ["wilayah", "walaya", "awliya", "wali", "mawla", "loyalty",
                        "allegiance", "following", "ittiba", "baraa", "disavowal",
                        "dissociation"]),
    "divine-protection": ("theme", ["divine-protection", "protection", "hifz", "security",
                                   "amn", "divine-care", "divine-rescue", "refuge",
                                   "istiadha", "shelter"]),
    "dunya": ("theme", ["dunya", "impermanence", "transience", "illusion-of-permanence",
                       "permanence"]),
    "death": ("theme", ["death", "mawt", "mortality", "aging"]),

    # ====================== B. DIVINE-ATTRIBUTE ======================
    "ar-rahman": ("attribute", ["ar-rahman", "al-rahman", "ar-rahim"]),
    "al-aziz": ("attribute", ["al-aziz", "izzah", "izza", "aziz"]),
    "al-hakim": ("attribute", ["al-hakim", "khabir", "al-khabir"]),
    "al-ghani": ("attribute", ["al-ghani", "ghani", "ghina", "istighna", "self-sufficiency",
                              "divine-self-sufficiency", "divine-independence",
                              "divine-sufficiency", "sufficiency"]),
    "as-sami": ("attribute", ["as-sami", "sami-alim", "basir", "al-basir", "divine-sight",
                            "divine-hearing", "hearing", "sight", "al-alim", "alim"]),
    "al-qadir": ("attribute", ["al-qadir", "qadir", "qudrah", "divine-omnipotence"]),
    "al-wakil": ("attribute", ["al-wakil", "wakil"]),
    "al-jabbar": ("attribute", ["al-jabbar", "jabbar"]),
    "al-mulk": ("attribute", ["al-mulk", "mulk", "al-malik", "kingship", "dominion",
                            "sovereignty", "divine-sovereignty", "kingdom", "divine-throne"]),
    "rabb": ("attribute", ["rabb", "lordship", "rububiyyah", "rububiyya"]),
    "divine-mercy-attr": ("attribute", ["divine-mercy-attr", "divine-tenderness",
                                       "divine-intimacy", "divine-nearness", "nearness",
                                       "proximity", "maiyyah", "divine-presence",
                                       "divine-pleasure", "ridwan", "divine-generosity",
                                       "divine-craftsmanship"]),
    "divine-knowledge": ("attribute", ["divine-knowledge", "divine-omniscience", "omniscience",
                                      "divine-witness", "divine-witnessing", "surveillance",
                                      "being-seen", "being-known", "being-fully-known",
                                      "observation", "encompassment", "ihata"]),
    "divine-power": ("attribute", ["divine-power", "divine-agency"]),
    "divine-names": ("attribute", ["divine-names", "divine-attributes", "names-of-allah",
                                  "asma", "naming"]),
    "divine-speech": ("attribute", ["divine-speech-attr", "divine-address", "kalam"]),
    "tanzih": ("attribute", ["tanzih", "divine-transcendence", "transcendence", "tabaraka"]),

    # ====================== C. RHETORICAL-DEVICE ======================
    "iltifat": ("device", ["iltifat", "iltifat-address-shift", "asymmetric-address",
                          "asymmetric-grammar"]),
    "istifham-inkari": ("device", ["istifham-inkari", "rhetorical-question",
                                  "rhetorical-questions", "divine-questioning"]),
    "qasam": ("device", ["qasam", "oath", "oaths", "divine-oath", "jawab-al-qasam"]),
    "idrab": ("device", ["idrab"]),
    "qasr": ("device", ["qasr", "qasr-restriction", "hasr", "hasr-restriction", "restriction",
                       "restriction-particle", "innama-restriction"]),
    "taqdim": ("device", ["taqdim"]),
    "mathal": ("device", ["mathal", "parable", "parables"]),
    "mubalagha": ("device", ["mubalagha"]),
    "ijaz": ("device", ["ijaz", "ellipsis", "suppressed-apodosis", "unspecified-object"]),
    "istidlal-bil-mahsus": ("device", ["istidlal-bil-mahsus", "istidlal-al-maqul-bil-mahsus"]),
    "refrain": ("device", ["refrain", "refrain-structure", "repetition", "accumulation"]),
    "iltizam": ("device", ["iltizam", "tibaq", "muqabala", "contrast", "asymmetry",
                          "asymmetric-absence", "duality", "counterfactual"]),
    "irony": ("device", ["irony", "divine-irony", "divine-reversal", "reversal", "tazyin"]),
    "dual-address": ("device", ["dual-address", "taghlib"]),
    "bushra-indhar": ("device", ["bushra-indhar", "bushra", "glad-tidings", "nadhir", "nudhur",
                                "warner", "woe", "wayl", "warning"]),
    "divine-passive": ("device", ["divine-passive", "passive-voice-theology"]),

    # ====================== D. GRAMMATICAL-FEATURE ======================
    "form-ii": ("grammar", ["form-ii", "form-ii-intensification", "form-ii-intensive"]),
    "form-iv": ("grammar", ["form-iv", "form-iv-causative"]),
    "form-viii": ("grammar", ["form-viii", "form-viii-reflexive"]),
    "form-x": ("grammar", ["form-x", "form-x-seeking"]),
    "form-iii": ("grammar", ["form-iii", "form-iii-reciprocity"]),
    "active-participle": ("grammar", ["active-participle", "ism-fail"]),
    "cognate-accusative": ("grammar", ["cognate-accusative", "maful-mutlaq"]),
    "partitive-min": ("grammar", ["partitive-min"]),
    "nun-al-tawkid": ("grammar", ["nun-al-tawkid"]),
    "damir-al-fasl": ("grammar", ["damir-al-fasl"]),
    "nominal-sentence": ("grammar", ["nominal-sentence"]),
    "tense-asymmetry": ("grammar", ["tense-asymmetry", "perfect-vs-imperfect-tense"]),
    "passive-voice": ("grammar", ["passive-voice"]),
    "dual-grammar": ("grammar", ["dual-grammar", "dual-form"]),
    "hal-construction": ("grammar", ["hal-construction"]),
    "istithna": ("grammar", ["istithna", "exception", "am-munqatia"]),
    "fa-of-consequence": ("grammar", ["fa-of-consequence", "fa-sababiyya"]),
    "lam-of-purpose": ("grammar", ["lam-of-purpose"]),
    "qiraat": ("grammar", ["qiraat", "qiraat-variation"]),

    # ====================== E. CHARACTER / PEOPLE ======================
    "musa": ("character", ["musa", "moses"]),
    "ibrahim": ("character", ["ibrahim"]),
    "yusuf": ("character", ["yusuf"]),
    "nuh": ("character", ["nuh"]),
    "sulayman": ("character", ["sulayman"]),
    "dawud": ("character", ["dawud"]),
    "isa": ("character", ["isa"]),
    "lut": ("character", ["lut"]),
    "salih": ("character", ["salih"]),
    "hud": ("character", ["hud"]),
    "shuayb": ("character", ["shuayb"]),
    "harun": ("character", ["harun"]),
    "yaqub": ("character", ["yaqub"]),
    "yunus": ("character", ["yunus"]),
    "maryam": ("character", ["maryam"]),
    "adam": ("character", ["adam"]),
    "luqman": ("character", ["luqman"]),
    "dhul-qarnayn": ("character", ["dhul-qarnayn"]),
    "the-prophet": ("character", ["the-prophet", "prophet", "prophetic-character"]),
    "iblis": ("character", ["iblis"]),
    "shaytan": ("theme", ["shaytan", "enmity-of-shaytan"]),  # theme: enmity/whisper
    "pharaoh": ("character", ["pharaoh", "firawn"]),
    "qarun": ("character", ["qarun"]),
    "bilqis": ("character", ["bilqis"]),
    "samiri": ("character", ["samiri"]),
    "qarin": ("character", ["qarin"]),
    "magicians": ("character", ["magicians"]),
    "hoopoe": ("character", ["hoopoe"]),
    "dabbah": ("character", ["dabbah"]),
    "bani-israil": ("character", ["bani-israil", "bani-israel"]),
    "ahl-al-kitab": ("character", ["ahl-al-kitab", "people-of-the-book"]),
    "quraysh": ("character", ["quraysh"]),
    "thamud": ("character", ["thamud", "she-camel"]),
    "aad": ("character", ["aad"]),
    "madyan": ("character", ["madyan"]),
    "people-of-lut": ("character", ["people-of-lut"]),
    "jinn": ("character", ["jinn", "jinn-and-mankind", "thaqalan", "al-thaqalan"]),
    "angels": ("character", ["angels", "malaika", "malaikah"]),
    # Events (folded into E)
    "badr": ("character", ["badr"]),
    "uhud": ("character", ["uhud"]),
    "ahzab": ("character", ["ahzab", "battle-of-trench", "battle-of-the-trench"]),
    "hudaybiyya": ("character", ["hudaybiyya", "hudaybiyyah"]),
    "tabuk": ("character", ["tabuk"]),
    "banu-nadir": ("character", ["banu-nadir"]),

    # ====================== F. HUMAN-STATE ======================
    "fear": ("state", ["fear", "khawf", "khashyah", "khashya", "awe", "reverence", "ishfaq"]),
    "hope": ("state", ["hope", "raja", "fear-and-hope", "optimism", "husn-al-zann"]),
    "grief": ("state", ["grief", "suffering", "distress", "anxiety", "despair", "abandonment",
                       "iblas"]),
    "joy": ("state", ["joy", "comfort", "consolation", "ease", "rest", "contentment",
                     "inner-peace", "peace", "salam", "tranquility"]),
    "regret": ("state", ["regret", "blame", "confession", "conscience"]),
    "humility": ("state", ["humility", "surrender", "submission", "taslim", "islam"]),
    "love": ("state", ["love", "mahabbah", "attachment", "intimacy"]),
    "desire": ("state", ["desire", "hawa", "lust"]),
    "envy": ("state", ["envy", "hasad", "ghayz"]),
    "enmity": ("state", ["enmity", "betrayal"]),
    "courage": ("state", ["courage", "strength"]),
    "certainty": ("state", ["certainty", "yaqin", "yaqeen", "conviction"]),
    "doubt": ("state", ["doubt", "conjecture", "zann", "suspicion", "uncertainty"]),
    "self-deception": ("state", ["self-deception", "delusion", "illusion", "false-security"]),
    "hardness-of-heart": ("state", ["hardness-of-heart", "blindness", "spiritual-blindness"]),
    "restraint": ("state", ["restraint", "divine-restraint", "hilm", "forbearance",
                          "divine-patience"]),
    "impatience": ("state", ["impatience", "haste", "istijal", "procrastination"]),
    "khushu": ("state", ["khushu", "presence", "attention", "listening", "dhawq", "taste"]),
    "dignity": ("state", ["dignity", "honor", "human-dignity", "status", "vulnerability"]),
    "qalb": ("state", ["qalb", "the-heart", "heart", "hearts"]),
    "nafs": ("state", ["nafs", "the-nafs", "soul", "the-soul", "the-self", "self-knowledge",
                      "self-examination", "inner-life", "interior-life", "identity"]),
    "aql": ("state", ["aql", "intellect", "reason", "faculties", "perception", "recognition",
                     "cognition"]),
    "martyrdom": ("state", ["martyrdom", "shahid", "salihin"]),

    # ====================== G. MODERN-BRIDGE ======================
    "motivated-reasoning": ("bridge", ["motivated-reasoning", "psychology-of-disbelief",
                                      "psychology-of-rejection", "projection", "rationalization"]),
    "cognitive-dissonance": ("bridge", ["cognitive-dissonance"]),
    "hedonic-adaptation": ("bridge", ["hedonic-adaptation", "hedonic-treadmill"]),
    "temporal-discounting": ("bridge", ["temporal-discounting", "time-and-urgency"]),
    "scarcity-mindset": ("bridge", ["scarcity-mindset", "scarcity"]),
    "social-proof": ("bridge", ["social-proof", "taqlid", "inherited-belief", "conformity"]),
    "illusion-of-control": ("bridge", ["illusion-of-control"]),
    "identity-protective-cognition": ("bridge", ["identity-protective-cognition", "tribalism"]),

    # ====================== NOISE (explicit drop) ======================
    "DROP": ("drop", [
        # generic English abstractions with no technical anchor (ontology §3)
        "time", "power", "speech", "purpose-generic", "control", "loss", "consequence",
        "presence-generic", "clarity-generic", "recognition-generic", "attention-generic",
        "silence-generic", "language", "waiting-generic", "journey", "habit-generic",
        "scale-generic", "balance", "legacy-generic", "comfort-generic", "success-generic",
        # process / meta tags describing the document, not content
        "morphology", "rhetoric", "balaghah", "surah-architecture", "surah-closing",
        "closing-ayah", "the-open-door", "juz-amma", "tafsir", "hawamim", "threshold",
        "sacred-space",
        # ambiguous fragment with no clean anchor
        "halu",
    ]),
}

# ---------------------------------------------------------------------------
# Surah/period references (axis H) are explicitly OUT of scope of this merge
# map per ontology §H ("generate programmatically ... do not curate by hand").
# The unmapped-recurring list contains many surah names + period variants.
# We route them to DROP so they are explicitly excluded from the concept
# vocabulary (they belong on the auto-derived SURAH / REVELATION-PERIOD axes).
SURAH_AND_PERIOD = [
    # period variants -> belong on REVELATION-PERIOD facet, not concept vocab
    "makkan", "meccan", "makkah", "mecca", "makki", "makkan-surahs", "makkan-surah",
    "makkan-period", "meccan-period", "meccan-surah",
    # surah-name references -> belong on auto SURAH axis
    "al-kahf", "ar-rum", "surah-qaf", "qaf", "ankabut", "az-zumar", "ya-sin", "yasin",
    "an-najm", "al-fath", "an-naml", "naml", "ghafir", "an-nur", "surah-an-nur", "fatir",
    "surah-al-qamar", "al-qamar", "surah-sad", "at-tur", "az-zukhruf", "ta-ha", "anbiya",
    "hajj", "an-naba", "saba", "surah-saba", "as-saffat", "qasas", "adh-dhariyat",
    "surah-muhammad", "fussilat", "taghabun", "al-waqiah", "al-qalam", "al-jathiyah",
    "al-insan", "al-mursalat", "al-ahqaf", "ahqaf", "al-layl", "al-maarij", "al-hashr",
    "al-falaq", "surah-shuara", "al-furqan", "al-hadid", "muminun", "al-hujurat",
    "kaaba", "masjid-al-haram",  # loci, not concepts
]
for s in SURAH_AND_PERIOD:
    ONTOLOGY["DROP"][1].append(s)


def clean(token: str):
    """Lowercase, strip parentheticals/editorial noise; return None if it should be skipped."""
    t = token.strip().lower()
    # skip editorial-noise markers
    if "??" in t or "→" in t or t.startswith("no") or t == "no":
        return None
    # our own internal markers for tokens to skip entirely
    if t.endswith("?drop") or t.endswith("?dup") or t.endswith("-dup"):
        return None
    # strip parentheticals
    t = re.sub(r"\(.*?\)", "", t)
    t = t.strip()
    # keep only slug chars
    t = re.sub(r"[^a-z0-9-]", "", t)
    if not t:
        return None
    return t


def main():
    rows = {}  # alias -> (canonical, axis)  (first writer wins; conflicts logged)
    conflicts = []

    for canonical, (axis, aliases) in ONTOLOGY.items():
        # canonical as its own alias (skip for DROP bucket which has no real canonical)
        all_aliases = list(aliases)
        if canonical != "DROP":
            all_aliases = [canonical] + all_aliases
        for raw in all_aliases:
            a = clean(raw)
            if a is None:
                continue
            if a in rows and rows[a] != (canonical, axis):
                conflicts.append((a, rows[a], (canonical, axis)))
                continue
            rows[a] = (canonical, axis)

    # write CSV sorted: real canonicals first by axis, DROP last; aliases alpha within
    def sort_key(item):
        alias, (canonical, axis) = item
        axis_order = {"theme": 0, "attribute": 1, "device": 2, "grammar": 3,
                      "character": 4, "state": 5, "bridge": 6, "drop": 7}
        return (axis_order.get(axis, 9), canonical, alias != canonical, alias)

    ordered = sorted(rows.items(), key=sort_key)

    with open(OUT, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["alias", "canonical", "axis"])
        for alias, (canonical, axis) in ordered:
            w.writerow([alias, canonical, axis])

    # report
    canon = sorted({c for c, _ in rows.values() if c != "DROP"})
    by_axis = {}
    for _, (c, ax) in rows.items():
        by_axis.setdefault(ax, set())
    for c, (ax, _) in ONTOLOGY.items():
        if c != "DROP":
            by_axis.setdefault(ax, set()).add(c)
    axis_alias_counts = {}
    for _, (c, ax) in rows.items():
        axis_alias_counts[ax] = axis_alias_counts.get(ax, 0) + 1

    print(f"Wrote {OUT}")
    print(f"Total rows (incl header excluded): {len(rows)}")
    print(f"Distinct canonicals (excl DROP): {len(canon)}")
    print("Alias rows per axis:")
    for ax in ["theme", "attribute", "device", "grammar", "character", "state", "bridge", "drop"]:
        print(f"  {ax}: {axis_alias_counts.get(ax,0)}")
    print("Canonicals per axis:")
    for ax in ["theme", "attribute", "device", "grammar", "character", "state", "bridge"]:
        print(f"  {ax}: {len(by_axis.get(ax,set()))}")
    if conflicts:
        print(f"\nCONFLICTS ({len(conflicts)}):")
        for a, old, new in conflicts:
            print(f"  {a}: kept {old} vs dropped {new}")


if __name__ == "__main__":
    main()
