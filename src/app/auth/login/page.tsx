'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/admin'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Welcome back!')
      router.push(redirectTo)
      router.refresh()
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
      <Input
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@ayahguide.com"
        required
        className="bg-zinc-900 border-zinc-700 text-white"
      />

      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        className="bg-zinc-900 border-zinc-700 text-white"
      />

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Sign In
      </Button>

      <div className="text-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-zinc-500 hover:text-gold-500 transition-colors"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-gold-gradient">AyahGuide</span>
          </h1>
          <p className="mt-2 text-zinc-400">Sign in to the admin panel</p>
        </div>

        <Suspense fallback={<div className="h-64 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50" />}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-sm text-zinc-500">
          <Link href="/" className="hover:text-gold-500 transition-colors">
            Back to AyahGuide
          </Link>
        </p>
      </div>
    </div>
  )
}
