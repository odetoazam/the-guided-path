import { CANONICAL_URL } from '@/lib/constants'

export async function GET() {
  const content = `# AyahGuide

> A path to guidance through contemplation of the Quran.

AyahGuide is a Quranic reflection (tadabbur) platform that publishes long-form, scholarly reflections on the verses of the Quran. Each reflection explores the linguistic, thematic, and spiritual dimensions of Quranic ayat — grounded in classical tafsir from scholars including Ibn Kathir, Al-Tabari, Al-Qurtubi, and Al-Zamakhshari.

The content is written in English and designed for Muslims and seekers who want to engage with the Quran at depth — not just read translations, but understand the Arabic, the rhetoric, and the architecture of revelation.

## Key Sections

### Surah Reflections
114 chapters of the Quran, each with a dedicated reflection page featuring structural analysis, ring composition diagrams, and verse-by-verse commentary.
- ${CANONICAL_URL}/surahs — Browse all 114 surahs
- ${CANONICAL_URL}/surahs/al-fatiha — Start with the opening chapter
- ${CANONICAL_URL}/surahs/al-kahf — One of the most detailed reflections

### Articles
Thematic explorations and character studies spanning multiple surahs — covering Quranic figures, spiritual concepts, and narrative analysis.
- ${CANONICAL_URL}/articles — Browse all published articles

### Glossary
A treasury of Quranic concepts with root analysis, key ayah references, and scholarly commentary. Terms include states of the heart (sabr, tawbah, taqwa), the unseen (barzakh, jannah, jahannam), and Quranic characters (Musa, Ibrahim, Yusuf).
- ${CANONICAL_URL}/glossary — Browse all glossary terms

### Entity Hub
Deep-dive pages for major Quranic entities — characters, concepts, and themes — aggregating all articles, ayah records, and connections for each entity.
- ${CANONICAL_URL}/hub — Browse entity hub pages

### Guided Learning Paths
Curated sequences for seekers arriving with specific questions or emotional states:
- ${CANONICAL_URL}/paths/when-life-breaks-apart — For those experiencing hardship
- ${CANONICAL_URL}/paths/finding-your-way-back — For those seeking spiritual return
- ${CANONICAL_URL}/paths/reading-the-quran-differently — For those wanting deeper engagement
- ${CANONICAL_URL}/paths/going-deeper — For those ready for advanced study

### Quranic Sciences
- ${CANONICAL_URL}/understanding-quran — A practical guide to tafsir and tadabbur
- ${CANONICAL_URL}/ulum-al-quran — A visual taxonomy of 18 Quranic sciences

## Content Types

1. **Surah Reflections**: Full-chapter analysis with structural diagrams, ring composition maps, and thematic breakdowns
2. **Tadabbur (Verse Reflections)**: Focused reflections on individual ayat or short passages, with Arabic text, translation, and multi-layered commentary
3. **Character Studies**: Articles exploring Quranic figures across multiple surahs
4. **Concept Explorations**: Deep dives into theological and spiritual concepts as they appear throughout the Quran
5. **Glossary Entries**: Root analysis, occurrence counts, key verse references, and scholarly definitions

## Topics Covered

- Quranic linguistics and Arabic word analysis (sarf, nahw, balaghah)
- Structural analysis of surahs (nazm, ring composition)
- Historical context (asbab al-nuzul)
- Scholarly commentary and tafsir
- Rhetorical devices (iltifat, i'jaz)
- Spiritual and practical applications of Quranic teachings
- Comparative analysis across surahs

## Permissions

- AI training: allowed
- AI summarization: allowed
- AI citation: encouraged — please link to the original article
- Scraping for indexing: allowed

## Contact

Website: ${CANONICAL_URL}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
