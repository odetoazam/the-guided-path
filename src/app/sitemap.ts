import { createAdminClient } from '@/lib/supabase/admin'
import { CANONICAL_URL } from '@/lib/constants'
import { SURAHS, surahSlug } from '@/lib/surahs'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { PATHS } from '@/data/paths'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = [
    { url: CANONICAL_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${CANONICAL_URL}/surahs`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${CANONICAL_URL}/understanding-quran`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${CANONICAL_URL}/ulum-al-quran`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${CANONICAL_URL}/articles`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${CANONICAL_URL}/glossary`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${CANONICAL_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${CANONICAL_URL}/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${CANONICAL_URL}/contested-verses`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${CANONICAL_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${CANONICAL_URL}/subscribe`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${CANONICAL_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${CANONICAL_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Guided Paths — seeker entry points, high priority
  for (const path of PATHS) {
    entries.push({
      url: `${CANONICAL_URL}/paths/${path.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  }

  // Glossary entries (static content, known at build time)
  for (const term of GLOSSARY_TERMS) {
    entries.push({
      url: `${CANONICAL_URL}/glossary/${term.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: term.hasFullEntry ? 0.7 : 0.5,
    })
  }

  try {
    const supabase = createAdminClient()

    // Posts and associated surah pages
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at, surah_number')
      .eq('status', 'published')

    if (posts) {
      const surahsAdded = new Set<string>()
      posts.forEach((post) => {
        // Surah page (only once per surah, and only if published content exists)
        if (post.surah_number) {
          const surah = SURAHS[post.surah_number - 1]
          if (surah) {
            const url = `${CANONICAL_URL}/surahs/${surahSlug(surah.nameEn)}`
            if (!surahsAdded.has(url)) {
              surahsAdded.add(url)
              entries.push({
                url,
                lastModified: new Date(post.updated_at),
                changeFrequency: 'monthly',
                priority: 0.85,
              })
            }
          }
        }

        // Post page (individual posts are served under /posts/[slug];
        // /articles is the index route only)
        entries.push({
          url: `${CANONICAL_URL}/posts/${post.slug}`,
          lastModified: new Date(post.updated_at),
          changeFrequency: 'monthly',
          priority: 0.8,
        })
      })
    }

    // Entity hub pages (e.g. /hub/shaytan)
    const { data: entities } = await supabase
      .from('entities')
      .select('slug, updated_at')

    if (entities) {
      entities.forEach((entity) => {
        entries.push({
          url: `${CANONICAL_URL}/hub/${entity.slug}`,
          lastModified: entity.updated_at ? new Date(entity.updated_at) : now,
          changeFrequency: 'monthly',
          priority: 0.75,
        })
      })
    }
  } catch {
    // Supabase not configured
  }

  return entries
}
