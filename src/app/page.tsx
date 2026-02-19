import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { ArrowRight, BookOpen, Mail } from 'lucide-react'
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
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200/10 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-amiri text-xl font-bold">
            <span className="text-gold-gradient">AyahGuide</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/tadabbur"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Reflections
            </Link>
            <ThemeToggle />
            <Link
              href="#subscribe"
              className="rounded-full bg-[#D4AF37] px-5 py-2 text-sm font-medium text-black hover:bg-[#B8960C] transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_40%,_rgba(212,175,55,0.08),_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_800px_600px_at_50%_60%,_rgba(212,175,55,0.04),_transparent)]" />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Bismillah */}
          <div className="mb-10 font-amiri text-4xl sm:text-5xl text-gold-500/40 leading-relaxed select-none" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-zinc-900 dark:text-white">Uncover what lies</span>
            <br />
            <span className="text-gold-gradient">beneath each ayah</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Go beyond translation into the layered meanings, linguistic beauty,
            and timeless wisdom woven into every verse of the Quran.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#subscribe"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3.5 text-base font-semibold text-black hover:bg-[#B8960C] transition-colors shadow-lg shadow-gold-500/20"
            >
              <Mail className="h-5 w-5" />
              Begin the Journey
            </Link>
            <Link
              href="/tadabbur"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-8 py-3.5 text-base font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Read Reflections
            </Link>
          </div>

          {/* Ornament divider */}
          <div className="mt-16 font-amiri text-2xl text-gold-500/30 select-none">
            ۞
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 flex flex-col items-center gap-2 animate-gentle-bounce">
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold-500/50 animate-scroll-dot" />
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-28">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-gold-500/70 mb-3">
                Recent Reflections
              </p>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
                Journey deeper into the Quran
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post: any, i: number) => (
              <ScrollReveal key={post.id} delay={i * 150}>
                <Link
                  href={`/tadabbur/${post.slug}`}
                  className="group block rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-6 transition-all duration-300 hover:border-gold-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/10"
                >
                  {post.featured_image && (
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                    {post.published_at && (
                      <time>
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
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
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gold-600 dark:text-gold-400">
                    Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300}>
            <div className="mt-14 text-center">
              <Link
                href="/tadabbur"
                className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-medium hover:underline underline-offset-4"
              >
                View all reflections <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Subscribe Section */}
      <section id="subscribe" className="relative border-t border-zinc-200 dark:border-zinc-800/50 py-28 px-6">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_300px_at_50%_50%,_rgba(212,175,55,0.05),_transparent)]" />

        <div className="relative mx-auto max-w-xl text-center">
          <ScrollReveal>
            {/* Ornament */}
            <div className="mb-8 font-amiri text-3xl text-gold-500/30 select-none" dir="rtl">
              ﷽
            </div>

            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              An invitation to journey deeper
            </h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Receive contemplative Quranic reflections in your inbox — each one crafted to
              help you see familiar verses with new eyes and a softer heart.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-10">
              <NewsletterSignup />
            </div>
            <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
              No spam, ever. Unsubscribe with a single click.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/50 py-12 px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-6">
          <Link href="/" className="font-amiri text-lg">
            <span className="text-gold-gradient">AyahGuide</span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/tadabbur" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Reflections
            </Link>
            <Link href="#subscribe" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Subscribe
            </Link>
          </div>

          <div className="font-amiri text-lg text-gold-500/20 select-none">۞</div>

          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} AyahGuide. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
