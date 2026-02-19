'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Supabase sends the user here with a hash fragment containing the access token
    // The client library picks it up automatically
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })
    // Also set ready if we already have a session (user clicked the link)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Password updated successfully!')
      router.push('/admin')
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-gold-gradient">AyahGuide</span>
          </h1>
          <p className="mt-2 text-zinc-400">Set your new password</p>
        </div>

        {!ready ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center space-y-4">
            <p className="text-sm text-zinc-400">
              Loading... If this takes too long, the reset link may have expired.
            </p>
            <Link
              href="/auth/forgot-password"
              className="inline-block text-sm text-gold-500 hover:text-gold-400 transition-colors"
            >
              Request a new reset link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
            <Input
              id="password"
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength={6}
              className="bg-zinc-900 border-zinc-700 text-white"
            />

            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              minLength={6}
              className="bg-zinc-900 border-zinc-700 text-white"
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Update Password
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-zinc-500">
          <Link href="/auth/login" className="hover:text-gold-500 transition-colors">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
