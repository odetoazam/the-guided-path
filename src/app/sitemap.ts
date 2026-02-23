import { createAdminClient } from '@/lib/supabase/admin'
import { CANONICAL_URL } from '@/lib/constants'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: CANONICAL_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${CANONICAL_URL}/tadabbur`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${CANONICAL_URL}/subscribe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  try {
    const supabase = createAdminClient()
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at')
      .eq('status', 'published')

    if (posts) {
      posts.forEach((post) => {
        entries.push({
          url: `${CANONICAL_URL}/tadabbur/${post.slug}`,
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
