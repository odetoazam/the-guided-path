import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatDate, isRTL } from '@/lib/utils'
import { NewsletterSignup } from '@/components/blog/newsletter-signup'
import { Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/constants'

interface Props {
  params: Promise<{ slug: string }>
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Not Found' }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || '',
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || '',
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: [SITE_NAME],
      images: post.featured_image ? [{ url: post.featured_image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || '',
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const hasArabic = isRTL(post.content_html || '')

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* Back link */}
        <Link
          href="/tadabbur"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-gold-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to reflections
        </Link>

        {/* Header */}
        <header className="mb-12">
          {post.tags && post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="rounded-full bg-gold-500/10 px-3 py-1 text-sm text-gold-600 dark:text-gold-400">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-white sm:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-xl text-zinc-500 leading-relaxed">{post.excerpt}</p>
          )}

          <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500">
            {post.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time>{formatDate(post.published_at)}</time>
              </div>
            )}
            {post.reading_time_minutes && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time_minutes} min read</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured image */}
        {post.featured_image && (
          <div className="mb-12 overflow-hidden rounded-2xl">
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
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />

        {/* Share */}
        <div className="mt-12 flex items-center gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <span className="text-sm text-zinc-500">Share this reflection:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE_URL}/tadabbur/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-gold-500 transition-colors"
          >
            Twitter/X
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${SITE_URL}/tadabbur/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-gold-500 transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this reflection: ${SITE_URL}/tadabbur/${post.slug}`)}`}
            className="text-zinc-400 hover:text-gold-500 transition-colors"
          >
            Email
          </a>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 p-8 text-center">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Enjoyed this reflection?</h3>
          <p className="mt-2 text-zinc-500">Get weekly tadabbur delivered to your inbox.</p>
          <div className="mt-6 mx-auto max-w-md">
            <NewsletterSignup />
          </div>
        </div>
      </article>
    </>
  )
}
