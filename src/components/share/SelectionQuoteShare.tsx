'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  /** Citation string to embed in the card (e.g., "Al-Baqarah 2:255 — AyahGuide") */
  cite: string
  /** Optional Arabic line to show above the English */
  arabic?: string
}

interface SelectionState {
  text: string
  x: number
  y: number
}

/**
 * When a reader selects text inside the wrapper, shows a floating "Share as card"
 * button near the selection. Clicking opens a preview of a generated quote card
 * using /api/og/quote and offers copy/share actions.
 *
 * Mount this as a sibling inside the article wrapper; it attaches to the nearest
 * parent element with data-quote-share-root.
 */
export function SelectionQuoteShare({ cite, arabic }: Props) {
  const [selection, setSelection] = useState<SelectionState | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [copied, setCopied] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)

  // Find the ancestor article container once on mount
  useEffect(() => {
    const node = document.querySelector('[data-quote-share-root]') as HTMLElement | null
    rootRef.current = node
  }, [])

  // Listen for selection changes
  useEffect(() => {
    function onSelectionChange() {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed) {
        setSelection(null)
        return
      }
      const text = sel.toString().trim()
      // Minimum useful length
      if (text.length < 20 || text.length > 320) {
        setSelection(null)
        return
      }
      const root = rootRef.current
      if (!root) return
      const anchor = sel.anchorNode
      if (!anchor || !root.contains(anchor)) {
        setSelection(null)
        return
      }
      const range = sel.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      setSelection({
        text,
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + window.scrollY - 8,
      })
    }

    document.addEventListener('selectionchange', onSelectionChange)
    return () => document.removeEventListener('selectionchange', onSelectionChange)
  }, [])

  function openShare() {
    if (!selection) return
    setSelectedText(selection.text)
    setModalOpen(true)
    setSelection(null)
    window.getSelection()?.removeAllRanges()
  }

  const ogUrl = selectedText
    ? `/api/og/quote?text=${encodeURIComponent(selectedText)}&cite=${encodeURIComponent(cite)}${arabic ? `&arabic=${encodeURIComponent(arabic)}` : ''}`
    : ''

  const shareText = `"${selectedText}" — ${cite}`

  async function copyShareText() {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: ignore
    }
  }

  return (
    <>
      {/* Floating button near selection */}
      {selection && (
        <button
          type="button"
          onClick={openShare}
          onMouseDown={(e) => e.preventDefault()}
          className="fixed z-40 -translate-x-1/2 -translate-y-full rounded-full border border-[#C9A84C]/40 bg-[#0b1a2e] px-3 py-1.5 text-[11px] font-medium text-[#C9A84C] shadow-lg hover:bg-[#102744] transition-colors"
          style={{ left: `${selection.x}px`, top: `${selection.y}px` }}
        >
          Share as card
        </button>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#0b1a2e] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h3 className="font-serif text-base font-semibold text-[#f0e6d2]">Share this quote</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-200 text-2xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="p-5">
              {/* Quote preview */}
              <blockquote className="mb-4 border-l-2 border-[#C9A84C]/50 pl-4 text-sm leading-relaxed text-zinc-300">
                &ldquo;{selectedText}&rdquo;
                <footer className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#C9A84C]/70">{cite}</footer>
              </blockquote>

              {/* Generated card preview */}
              <div className="mb-5 overflow-hidden rounded-lg border border-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ogUrl}
                  alt="Generated quote card"
                  className="block w-full"
                  loading="lazy"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyShareText}
                  className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5 text-xs text-zinc-300 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors"
                >
                  {copied ? 'Copied ✓' : 'Copy quote + citation'}
                </button>
                <a
                  href={ogUrl}
                  download={`ayahguide-${cite.replace(/\W+/g, '-').toLowerCase()}.png`}
                  className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5 text-xs text-zinc-300 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors"
                >
                  Download image
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5 text-xs text-zinc-300 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors"
                >
                  Twitter / X
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5 text-xs text-zinc-300 hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors"
                >
                  WhatsApp
                </a>
              </div>

              <p className="mt-4 text-[11px] text-zinc-500">
                Select any line from the reflection to create a shareable card. The image is
                generated on demand; right-click or long-press the preview to save it.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
