import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatDate, isRTL } from '@/lib/utils'
import { NewsletterSignup } from '@/components/blog/newsletter-signup'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import type { Entity, EntityCategory } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

const CATEGORY_STYLES: Record<EntityCategory, string> = {
  states_of_the_heart: 'bg-rose-500/10 text-rose-300/70 border-rose-500/15',
  the_unseen: 'bg-violet-500/10 text-violet-300/70 border-violet-500/15',
  quranic_characters: 'bg-amber-500/10 text-amber-300/70 border-amber-500/15',
  nations_and_peoples: 'bg-teal-500/10 text-teal-300/70 border-teal-500/15',
  concepts_of_existence: 'bg-sky-500/10 text-sky-300/70 border-sky-500/15',
  theology_and_ethics: 'bg-indigo-500/10 text-indigo-300/70 border-indigo-500/15',
  study_terms: 'bg-zinc-500/10 text-zinc-300/70 border-zinc-500/15',
}

async function getPost(slug: string) {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    return data
  } catch {
    return null
  }
}

async function getPostEntityTags(postId: string) {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('entity_tags')
      .select('is_primary, entities(*)')
      .eq('post_id', postId)
    return (data || []).map((row: any) => ({
      ...(row.entities as Entity),
      is_primary: row.is_primary as boolean,
    }))
  } catch {
    return []
  }
}

async function getRelatedPosts(postId: string, primaryEntityIds: string[]) {
  if (primaryEntityIds.length === 0) return []
  try {
    const supabase = await createClient()
    // Find other posts that share primary entities with this post
    const { data } = await supabase
      .from('entity_tags')
      .select('post_id, posts(id, title, slug, excerpt, featured_image, published_at)')
      .in('entity_id', primaryEntityIds)
      .eq('is_primary', true)
      .not('post_id', 'is', null)
      .neq('post_id', postId)
    if (!data) return []

    // Deduplicate by post_id and filter to published posts
    const seen = new Set<string>()
    const posts: any[] = []
    for (const row of data) {
      const p = row.posts as any
      if (p && !seen.has(p.id)) {
        seen.add(p.id)
        posts.push(p)
      }
    }
    return posts.slice(0, 3)
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Not Found' }

  const postUrl = `${CANONICAL_URL}/posts/${slug}`
  const title = post.seo_title || post.title
  const description = post.seo_description || post.excerpt || `A deep Quranic reflection (tadabbur) on ${post.title} by AyahGuide.`

  return {
    title,
    description,
    keywords: post.tags?.join(', '),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: postUrl,
      siteName: SITE_NAME,
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at || undefined,
      authors: [SITE_NAME],
      images: post.featured_image
        ? [{ url: post.featured_image, alt: title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  // Fetch entity tags and related posts in parallel
  const entityTags = await getPostEntityTags(post.id)
  const primaryEntities = entityTags.filter((e) => e.is_primary)
  const relatedPosts = await getRelatedPosts(
    post.id,
    primaryEntities.map((e) => e.id)
  )

  const postUrl = `${CANONICAL_URL}/posts/${slug}`
  const description = post.seo_description || post.excerpt || `A deep Quranic reflection (tadabbur) on ${post.title} by AyahGuide.`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image: post.featured_image || undefined,
    url: postUrl,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: CANONICAL_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: CANONICAL_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags?.join(', '),
    inLanguage: 'en-US',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: CANONICAL_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Posts',
        item: `${CANONICAL_URL}/posts`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  // Strip leading H1 from content_html to avoid duplicate H1
  const contentHtml = post.content_html?.replace(/^<h1[^>]*>.*?<\/h1>\s*/i, '') || ''

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-2xl px-5 py-12 sm:px-6 sm:py-16">
        {/* Back link */}
        <Link
          href="/posts"
          className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-gold-500 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Posts
        </Link>

        {/* Header */}
        <header className="mb-10 sm:mb-14">
          {/* Primary entity tags as clickable badges (replaces plain string tags) */}
          {primaryEntities.length > 0 ? (
            <div className="mb-5 flex flex-wrap gap-2">
              {primaryEntities.map((entity) => (
                <Link
                  key={entity.id}
                  href={`/hub/${entity.slug}`}
                  className={`rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase transition-opacity hover:opacity-80 ${CATEGORY_STYLES[entity.category] || 'bg-gold-500/10 text-gold-400 border-gold-500/15'}`}
                >
                  {entity.name_translit}
                </Link>
              ))}
            </div>
          ) : post.tags && post.tags.length > 0 ? (
            <div className="mb-5 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-medium tracking-wide uppercase text-gold-600 dark:text-gold-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="font-serif text-3xl font-bold leading-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 font-body text-lg text-zinc-500 leading-relaxed sm:text-xl">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500">
            {post.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              </div>
            )}
            {post.reading_time_minutes && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.reading_time_minutes} min read</span>
              </div>
            )}
          </div>

          {/* Ornamental divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
            <span className="text-gold-500/50 text-sm">۞</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          </div>
        </header>

        {/* Featured image */}
        {post.featured_image && (
          <div className="mb-10 sm:mb-14 overflow-hidden rounded-2xl">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Entity tag pills — all tagged entities (primary + secondary) */}
        {entityTags.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
              Topics in this article
            </p>
            <div className="flex flex-wrap gap-2">
              {entityTags.map((entity) => (
                <Link
                  key={entity.id}
                  href={`/hub/${entity.slug}`}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80 ${CATEGORY_STYLES[entity.category] || 'bg-gold-500/10 text-gold-400 border-gold-500/15'}`}
                >
                  {entity.name_translit}
                  {entity.name_english && (
                    <span className="ml-1 opacity-60">({entity.name_english})</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom divider */}
        <div className="mt-12 sm:mt-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <span className="text-gold-500/50 text-sm">۞</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <span className="text-zinc-500">Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-gold-500 transition-colors font-medium"
          >
            Twitter/X
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${postUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-gold-500 transition-colors font-medium"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this reflection: ${postUrl}`)}`}
            className="text-zinc-400 hover:text-gold-500 transition-colors font-medium"
          >
            Email
          </a>
        </div>

        {/* Related Content */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 sm:mt-20">
            <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-6">
              Related Reflections
            </h2>
            <div className="grid gap-4">
              {relatedPosts.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/posts/${related.slug}`}
                  className="group block rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 transition-all hover:border-gold-500/30 hover:bg-gold-500/5"
                >
                  <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-white group-hover:text-gold-500 transition-colors">
                    {related.title}
                  </h3>
                  {related.excerpt && (
                    <p className="mt-1.5 text-sm text-zinc-500 line-clamp-2 font-body">
                      {related.excerpt}
                    </p>
                  )}
                  {related.published_at && (
                    <p className="mt-2 text-xs text-zinc-400">
                      {formatDate(related.published_at)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-14 sm:mt-20 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-8 sm:p-10 text-center">
          <p className="text-gold-500/60 text-sm mb-3">۞</p>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
            Enjoyed this reflection?
          </h2>
          <p className="mt-2 text-zinc-500 font-body">
            Get tadabbur delivered to your inbox.
          </p>
          <div className="mt-6 mx-auto max-w-md">
            <NewsletterSignup />
          </div>
        </div>
      </article>
    </>
  )
}
