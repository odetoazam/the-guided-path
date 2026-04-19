'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import posthog from 'posthog-js'

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/'
  const errorParam = searchParams.get('error')

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(errorParam ?? null)
  const [message, setMessage] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace(next)
    })
  }, [])

  async function handleGoogleSignIn() {
    setError(null)
    setLoading(true)
    posthog.capture('google_sign_in_clicked')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) { setError(error.message); setLoading(false) }
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      })
      if (error) {
        setError(error.message)
        posthog.capture('auth_error', { mode: 'signup' })
      } else {
        if (subscribeNewsletter) {
          // Fire-and-forget — don't block the UX on this
          fetch('/api/subscribers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source: 'auth_signup' }),
          }).catch(() => {})
        }
        posthog.identify(email, { email })
        posthog.capture('user_signed_up', { subscribed_newsletter: subscribeNewsletter })
        setMessage('Check your email to confirm your account.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
        posthog.capture('auth_error', { mode: 'signin' })
      } else {
        posthog.identify(email, { email })
        posthog.capture('user_signed_in', { method: 'email' })
        router.replace(next)
        router.refresh()
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-navy-dark px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-decoration-none">
            <span className="font-serif text-2xl font-bold text-gold-gradient">AyahGuide</span>
          </Link>
          <p className="mt-2 text-sm text-zinc-500 dark:text-cream/50">
            {mode === 'signin' ? 'Sign in to continue your journey' : 'Begin your journey'}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-navy-medium bg-white dark:bg-zinc-900/50 p-8 shadow-sm">
          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="mb-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-800 dark:text-cream/90 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-60"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700/50" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700/50" />
          </div>

          {/* Email/password */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-cream/60">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-cream/90 placeholder-zinc-400 outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-colors"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-cream/60">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Min. 8 characters"
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-cream/90 placeholder-zinc-400 outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-colors"
              />
            </div>

            {mode === 'signup' && (
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={e => setSubscribeNewsletter(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 dark:border-zinc-600 accent-gold-500"
                />
                <span className="text-xs text-zinc-500 dark:text-cream/40 leading-snug">
                  Receive reflections on the path when they&apos;re ready
                </span>
              </label>
            )}

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}
            {message && (
              <p className="text-xs text-gold-500">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold-600 disabled:opacity-60"
            >
              {loading ? '...' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-zinc-500 dark:text-cream/40">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); setMessage(null) }}
              className="text-gold-500 font-medium hover:text-gold-600 transition-colors"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400 dark:text-cream/30">
          <Link href="/" className="hover:text-gold-500 transition-colors">
            Back to AyahGuide
          </Link>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-navy-dark">
        <div className="h-64 w-80 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900/50" />
      </div>
    }>
      <SignInContent />
    </Suspense>
  )
}
