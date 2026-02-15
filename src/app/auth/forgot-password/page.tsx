'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      setSent(true)
      toast.success('Check your email for the reset link')
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
            <span className="text-gold-gradient">The Guided Path</span>
          </h1>
          <p className="mt-2 text-zinc-400">Reset your password</p>
        </div>

        {sent ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center space-y-4">
            <div className="text-4xl">📧</div>
            <h2 className="text-lg font-semibold text-white">Check your email</h2>
            <p className="text-sm text-zinc-400">
              We sent a password reset link to <span className="text-gold-500">{email}</span>.
              Click the link in the email to set a new password.
            </p>
            <Link
              href="/auth/login"
              className="inline-block text-sm text-gold-500 hover:text-gold-400 transition-colors"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
            <p className="text-sm text-zinc-400">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="bg-zinc-900 border-zinc-700 text-white"
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Send Reset Link
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
