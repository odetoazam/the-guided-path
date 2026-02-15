import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quranic Reflections (Tadabbur)',
  description: 'Browse all Quranic reflections and tadabbur from The Guided Path.',
}

async function getPosts() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, featured_image, published_at, reading_time_minutes, tags')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

export default async function TadabburArchive() {
  const posts = await getPosts()

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">Quranic Reflections</h1>
        <p className="mt-2 text-lg text-zinc-500">
          Deep tadabbur — contemplative reflections on the Quran
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-20 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-zinc-400 mb-4" />
          <p className="text-xl text-zinc-500">Reflections coming soon</p>
          <p className="mt-2 text-zinc-400">Subscribe to be the first to know when new tadabbur are published.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <Link
              key={post.id}
              href={`/tadabbur/${post.slug}`}
              className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 transition-all hover:border-gold-500/50 hover:shadow-lg hover:shadow-gold-500/5"
            >
              {post.featured_image && (
                <div className="mb-4 overflow-hidden rounded-xl">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 mb-3">
                {post.published_at && (
                  <time>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                )}
                {post.reading_time_minutes && (
                  <>
                    <span>·</span>
                    <span>{post.reading_time_minutes} min read</span>
                  </>
                )}
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-3">{post.excerpt}</p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="rounded-full bg-gold-500/10 px-2.5 py-0.5 text-xs text-gold-600 dark:text-gold-400">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gold-600 dark:text-gold-400">
                Read more <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
