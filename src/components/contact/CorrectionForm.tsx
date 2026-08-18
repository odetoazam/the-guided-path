'use client'

import { useState } from 'react'

/**
 * The receiving end for the site's correction and contact promises.
 *
 * These were mailto: links to five addresses on a domain with no inbound mail,
 * so every message sent to them bounced while the pages promised a fourteen-day
 * review. This posts to /api/corrections, which stores the submission and
 * notifies an address held in server config.
 */

const KINDS = [
  { value: 'correction', label: 'Correction', hint: 'A mis-cited report, an Arabic error, a flattened ikhtilāf, a wrong attribution.' },
  { value: 'scholar', label: 'Scholars & teachers', hint: 'Methodology feedback, collaboration, review or advisory enquiries.' },
  { value: 'press', label: 'Press & media', hint: 'Journalists and researchers writing on the Qurʾān.' },
  { value: 'general', label: 'General', hint: 'Anything else.' },
] as const

export function CorrectionForm({ defaultKind = 'correction' }: { defaultKind?: string }) {
  const [kind, setKind] = useState<string>(defaultKind)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const active = KINDS.find(k => k.value === kind) ?? KINDS[0]

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending'); setError('')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/corrections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind,
          name: fd.get('name'),
          email: fd.get('email'),
          credentials: fd.get('credentials') || '',
          message: fd.get('message'),
          page_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      const json = await res.json()
      if (!res.ok) { setStatus('error'); setError(json.error || 'Something went wrong'); return }
      setStatus('sent')
    } catch {
      setStatus('error'); setError('Could not reach the server. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.06)] p-6 text-center">
        <p className="font-serif text-base font-semibold text-zinc-900 dark:text-white">Received.</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Your message is recorded. Corrections from a credentialed source are reviewed within fourteen days,
          and substantive corrections that affect interpretation are logged in the changelog.
        </p>
      </div>
    )
  }

  const field =
    'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-[rgba(212,175,55,0.6)] dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200 dark:placeholder:text-zinc-600'

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="flex flex-wrap gap-2">
        {KINDS.map(k => (
          <button
            key={k.value}
            type="button"
            onClick={() => setKind(k.value)}
            className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
              kind === k.value
                ? 'border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.12)] text-[#C9A84C]'
                : 'border-zinc-300 text-zinc-500 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300'
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">{active.hint}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input name="name" required maxLength={120} placeholder="Your name" className={field} />
        <input name="email" type="email" required maxLength={200} placeholder="Email" className={field} />
      </div>
      {(kind === 'correction' || kind === 'scholar') && (
        <input
          name="credentials"
          maxLength={500}
          placeholder="Credentials or affiliation (helps us prioritise)"
          className={`${field} mt-3`}
        />
      )}
      <textarea
        name="message"
        required
        minLength={20}
        maxLength={5000}
        rows={6}
        placeholder={kind === 'correction'
          ? 'Which page, which claim, and what the correct position is — with a source if you have one.'
          : 'Your message.'}
        className={`${field} mt-3 resize-y`}
      />

      {status === 'error' && <p className="mt-3 text-sm text-rose-500">{error}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-4 rounded-lg border border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.12)] px-4 py-2 text-sm font-medium text-[#C9A84C] transition-colors hover:bg-[rgba(212,175,55,0.18)] disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
