'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Props {
  slug: string
  type?: 'post' | 'surah'
}

const MAX_LEN = 5000
const SAVE_DEBOUNCE_MS = 1200

type Status = 'idle' | 'saving' | 'saved' | 'error'

export function ReflectionEditor({ slug, type = 'post' }: Props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState('')
  const [savedValue, setSavedValue] = useState('')
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [expanded, setExpanded] = useState(false)
  const supabase = createClient()
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let cancelled = false
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return
      if (!session) {
        setLoggedIn(false)
        setLoading(false)
        return
      }
      setLoggedIn(true)
      const { data } = await supabase
        .from('user_reflections')
        .select('content, updated_at')
        .eq('user_id', session.user.id)
        .eq('slug', slug)
        .eq('content_type', type)
        .maybeSingle()
      if (cancelled) return
      if (data) {
        setValue(data.content)
        setSavedValue(data.content)
        setUpdatedAt(data.updated_at)
        setExpanded(true)
      }
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [slug, type])

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [])

  function scheduleSave(next: string) {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    const trimmed = next.trim()
    if (trimmed === savedValue.trim()) {
      setStatus(savedValue ? 'saved' : 'idle')
      return
    }
    if (trimmed.length === 0) {
      // Clearing: delete existing reflection
      if (!savedValue) { setStatus('idle'); return }
      saveTimer.current = setTimeout(async () => {
        setStatus('saving')
        const res = await fetch('/api/reflections', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, type }),
        })
        if (res.ok) {
          setSavedValue('')
          setUpdatedAt(null)
          setStatus('idle')
        } else {
          setStatus('error')
        }
      }, SAVE_DEBOUNCE_MS)
      return
    }
    if (trimmed.length > MAX_LEN) {
      setStatus('error')
      return
    }
    saveTimer.current = setTimeout(async () => {
      setStatus('saving')
      const res = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type, content: trimmed }),
      })
      if (res.ok) {
        const json = await res.json().catch(() => null)
        setSavedValue(trimmed)
        if (json?.reflection?.updated_at) setUpdatedAt(json.reflection.updated_at)
        else setUpdatedAt(new Date().toISOString())
        setStatus('saved')
      } else {
        setStatus('error')
      }
    }, SAVE_DEBOUNCE_MS)
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const next = e.target.value.slice(0, MAX_LEN)
    setValue(next)
    scheduleSave(next)
  }

  if (loading) return null

  if (!loggedIn) {
    return (
      <section className="mt-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 p-6">
        <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-white">
          Your reflection
        </h3>
        <p className="mt-2 text-sm text-zinc-500 dark:text-cream/50">
          Sign in to keep a private note on this reflection — only you can see it.
        </p>
        <Link
          href={`/auth/sign-in?next=${type === 'post' ? `/posts/${slug}` : `/surahs/${slug}`}`}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium text-gold-500 hover:bg-gold-500/20 transition-colors"
        >
          Sign in to write
        </Link>
      </section>
    )
  }

  const charsLeft = MAX_LEN - value.length
  const statusLabel =
    status === 'saving' ? 'Saving…' :
    status === 'saved' && updatedAt ? `Saved ${formatRelative(updatedAt)}` :
    status === 'error' ? 'Could not save' :
    updatedAt ? `Last saved ${formatRelative(updatedAt)}` :
    'Only you can see this'

  return (
    <section className="mt-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/30 p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-base font-semibold text-zinc-900 dark:text-white">
          Your reflection
        </h3>
        <span
          className={[
            'text-xs',
            status === 'error' ? 'text-red-500' : 'text-zinc-400 dark:text-cream/40',
          ].join(' ')}
        >
          {statusLabel}
        </span>
      </div>

      {!expanded && !value ? (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 w-full text-left rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-4 text-sm text-zinc-500 dark:text-cream/50 hover:border-gold-500/40 hover:text-gold-500 transition-colors"
        >
          What stood out to you? Write a short note — private to you.
        </button>
      ) : (
        <>
          <textarea
            value={value}
            onChange={handleChange}
            placeholder="What did you notice? What will you carry with you?"
            rows={6}
            maxLength={MAX_LEN}
            className="mt-3 w-full resize-y rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 px-4 py-3 text-sm leading-relaxed text-zinc-800 dark:text-cream/90 placeholder:text-zinc-400 dark:placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-400 dark:text-cream/30">
            <span>Private to you. Changes save automatically.</span>
            <span className={charsLeft < 200 ? 'text-amber-500' : ''}>{charsLeft}</span>
          </div>
        </>
      )}
    </section>
  )
}

function formatRelative(iso: string): string {
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diffSec = Math.max(0, Math.floor((now - then) / 1000))
  if (diffSec < 10) return 'just now'
  if (diffSec < 60) return `${diffSec}s ago`
  const m = Math.floor(diffSec / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
