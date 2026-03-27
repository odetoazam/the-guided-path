'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface EntityData {
  slug: string
  name_arabic: string
  name_translit: string
  one_line: string
  root_letters: string | null
  root_meaning: string | null
}

interface GlossaryPopoverProps {
  slug: string
  children: React.ReactNode
}

// Simple in-memory cache
const cache = new Map<string, EntityData>()

export function GlossaryPopover({ slug, children }: GlossaryPopoverProps) {
  const [open, setOpen] = useState(false)
  const [entity, setEntity] = useState<EntityData | null>(null)
  const [loading, setLoading] = useState(false)
  const [above, setAbove] = useState(true)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const fetchEntity = useCallback(async () => {
    if (cache.has(slug)) {
      setEntity(cache.get(slug)!)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/entities/${slug}`)
      if (!res.ok) return
      const data = await res.json()
      cache.set(slug, data)
      setEntity(data)
    } catch {
      // Silently fail — popover just won't show data
    } finally {
      setLoading(false)
    }
  }, [slug])

  const handleToggle = useCallback(() => {
    if (!open) {
      fetchEntity()

      // Decide above vs below based on viewport position
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        setAbove(rect.top > 240)
      }
    }
    setOpen((prev) => !prev)
  }, [open, fetchEntity])

  // Dismiss on click outside
  useEffect(() => {
    if (!open) return

    function handleClick(e: MouseEvent) {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        popoverRef.current?.contains(e.target as Node)
      ) {
        return
      }
      setOpen(false)
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleToggle()
          }
        }}
        className="cursor-pointer border-b border-gold-500/40 text-gold-500 transition-colors hover:border-gold-500/70 hover:text-gold-400"
      >
        {children}
      </span>

      {open && (
        <div
          ref={popoverRef}
          className={`absolute left-1/2 z-50 w-72 -translate-x-1/2 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-white/[0.08] dark:bg-navy-dark ${
            above ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {loading && !entity ? (
            <div className="flex items-center justify-center py-4">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gold-500/30 border-t-gold-500" />
            </div>
          ) : entity ? (
            <div>
              {/* Arabic name */}
              <div
                className="mb-1 text-center text-2xl leading-tight text-[rgba(201,168,76,0.85)]"
                style={{
                  fontFamily: "var(--font-amiri,'Amiri'),'Scheherazade New',serif",
                  direction: 'rtl',
                }}
              >
                {entity.name_arabic}
              </div>

              {/* Transliteration */}
              <div className="mb-2 text-center font-serif text-sm font-semibold text-navy-dark dark:text-cream">
                {entity.name_translit}
              </div>

              {/* One-line */}
              <p className="mb-3 text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {entity.one_line}
              </p>

              {/* Root info */}
              {entity.root_letters && (
                <div className="mb-3 flex items-center justify-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                  <span
                    className="text-sm text-[rgba(201,168,76,0.7)]"
                    style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
                  >
                    {entity.root_letters}
                  </span>
                  {entity.root_meaning && (
                    <>
                      <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
                      <span>{entity.root_meaning}</span>
                    </>
                  )}
                </div>
              )}

              {/* Link */}
              <Link
                href={`/glossary/${slug}`}
                className="block text-center text-xs font-medium text-gold-500 transition-colors hover:text-gold-400"
                onClick={() => setOpen(false)}
              >
                View full entry &rarr;
              </Link>
            </div>
          ) : (
            <p className="py-2 text-center text-xs text-zinc-400">
              Could not load entry.
            </p>
          )}
        </div>
      )}
    </span>
  )
}
