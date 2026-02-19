import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ArrowRight, BookOpen, Mail, Sparkles } from 'lucide-react'
import { NewsletterSignup } from '@/components/blog/newsletter-signup'

async function getFeaturedPosts() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, featured_image, published_at, reading_time_minutes, tags')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3)
    return data || []
  } catch {
    return []
  }
}

export default async function LandingPage() {
  const featuredPosts = await getFeaturedPosts()

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold">
            <span className="text-gold-gradient">AyahGuide</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/tadabbur" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Reflections
            </Link>
            <ThemeToggle />
            <Link
              href="#subscribe"
              className="rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-medium text-black hover:bg-[#B8960C] transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-4 py-1.5 text-sm text-gold-600 dark:text-gold-400">
            <Sparkles className="h-4 w-4" />
            Deep Quranic Reflections
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-zinc-900 dark:text-white">Journey through the</span>
            <br />
            <span className="text-gold-gradient">Quran with Insight</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Weekly tadabbur — contemplative reflections that go beyond translation.
            Discover the linguistic beauty, thematic depth, and timeless wisdom of the Quran.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#subscribe"
              className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-8 py-3.5 text-base font-semibold text-black hover:bg-[#B8960C] transition-colors"
            >
              <Mail className="h-5 w-5" />
              Join the Journey
            </Link>
            <Link
              href="/tadabbur"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-8 py-3.5 text-base font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Read Reflections
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Latest Reflections</h2>
            <p className="mt-2 text-zinc-500">Recent tadabbur from AyahGuide</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post: any) => (
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
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
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
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-2">{post.excerpt}</p>
                )}
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gold-600 dark:text-gold-400">
                  Read more <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/tadabbur"
              className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-medium hover:underline"
            >
              View all reflections <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Subscribe Section */}
      <section id="subscribe" className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 py-24 px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Never miss a reflection
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Get weekly Quranic tadabbur delivered to your inbox. No spam, unsubscribe anytime.
          </p>
          <div className="mt-8">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} AyahGuide. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/tadabbur" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Reflections</Link>
            <Link href="#subscribe" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Subscribe</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
