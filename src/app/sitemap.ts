import { createAdminClient } from '@/lib/supabase/admin'
import { CANONICAL_URL } from '@/lib/constants'
import { SURAHS, surahSlug } from '@/lib/surahs'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: CANONICAL_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${CANONICAL_URL}/surahs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${CANONICAL_URL}/understanding-quran`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${CANONICAL_URL}/articles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${CANONICAL_URL}/subscribe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${CANONICAL_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${CANONICAL_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  try {
    const supabase = createAdminClient()
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at, surah_number')
      .eq('status', 'published')

    if (posts) {
      posts.forEach((post) => {
        // Surah page (only if published content exists)
        if (post.surah_number) {
          const surah = SURAHS[post.surah_number - 1]
          if (surah) {
            entries.push({
              url: `${CANONICAL_URL}/surahs/${surahSlug(surah.nameEn)}`,
              lastModified: new Date(post.updated_at),
              changeFrequency: 'monthly',
              priority: 0.85,
            })
          }
        }

        // Post page
        entries.push({
          url: `${CANONICAL_URL}/articles/${post.slug}`,
          lastModified: new Date(post.updated_at),
          changeFrequency: 'monthly',
          priority: 0.8,
        })
      })
    }
  } catch {
    // Supabase not configured
  }

  return entries
}
