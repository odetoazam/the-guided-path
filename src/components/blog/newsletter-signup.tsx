'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'landing_page' }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong')
      } else {
        setSubscribed(true)
        toast.success('Check your email to confirm your subscription!')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (subscribed) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-8">
        <CheckCircle className="h-10 w-10 text-green-500" />
        <p className="text-lg font-medium text-zinc-900 dark:text-white">You're almost there!</p>
        <p className="text-zinc-500">Check your email to confirm your subscription.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
      />
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
        />
        <Button type="submit" loading={loading} className="shrink-0">
          <Mail className="mr-2 h-4 w-4" />
          Subscribe
        </Button>
      </div>
      <p className="text-xs text-zinc-400">Free, weekly. Unsubscribe anytime.</p>
    </form>
  )
}
