'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface AyahGrounding {
  surah_number: number
  ayah_start: number
  ayah_end: number
  title: string
  linguistic_html: string // short grounding excerpt
}

interface ArticleContentProps {
  html: string
  ayahGroundings: AyahGrounding[]
}

/**
 * Parses a <cite> text like "Al-Hijr, 15:33" or "Al-Baqarah (2:168)"
 * and returns { surah, ayahStart, ayahEnd }
 */
function parseCiteRef(citeText: string): { surah: number; ayahStart: number; ayahEnd: number } | null {
  // Match patterns like "15:33", "7:16-17", "2:168", "114:1-6"
  const match = citeText.match(/(\d+):(\d+)(?:-(\d+))?/)
  if (!match) return null
  return {
    surah: parseInt(match[1]),
    ayahStart: parseInt(match[2]),
    ayahEnd: match[3] ? parseInt(match[3]) : parseInt(match[2]),
  }
}

/**
 * Check if an ayah grounding covers a given reference.
 * A grounding for 7:16-17 should match a cite for 7:16, 7:17, or 7:16-17.
 */
function findGrounding(
  groundings: AyahGrounding[],
  ref: { surah: number; ayahStart: number; ayahEnd: number }
): AyahGrounding | null {
  return groundings.find((g) => {
    if (g.surah_number !== ref.surah) return false
    // Check if the cite's range overlaps with the grounding's range
    return ref.ayahStart >= g.ayah_start && ref.ayahEnd <= g.ayah_end
  }) || null
}

export function ArticleContent({ html, ayahGroundings }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [expandedRefs, setExpandedRefs] = useState<Set<string>>(new Set())

  const toggleRef = useCallback((refKey: string) => {
    setExpandedRefs((prev) => {
      const next = new Set(prev)
      if (next.has(refKey)) {
        next.delete(refKey)
      } else {
        next.add(refKey)
      }
      return next
    })
  }, [])

  useEffect(() => {
    if (!contentRef.current || ayahGroundings.length === 0) return

    const blockquotes = contentRef.current.querySelectorAll('blockquote.ayah-quote')

    blockquotes.forEach((bq) => {
      const cite = bq.querySelector('cite')
      if (!cite) return

      const ref = parseCiteRef(cite.textContent || '')
      if (!ref) return

      const grounding = findGrounding(ayahGroundings, ref)
      if (!grounding) return

      // Don't add if already enhanced
      if (bq.querySelector('.ayah-grounding-toggle')) return

      const refKey = `${ref.surah}:${ref.ayahStart}-${ref.ayahEnd}`

      // Create the toggle button
      const toggleBtn = document.createElement('button')
      toggleBtn.className = 'ayah-grounding-toggle'
      toggleBtn.setAttribute('data-ref', refKey)
      toggleBtn.setAttribute('data-title', grounding.title)
      toggleBtn.innerHTML = `
        <span class="toggle-icon">✦</span>
        <span class="toggle-text">Linguistic insight</span>
        <svg class="toggle-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="m6 9 6 6 6-6" />
        </svg>
      `

      // Create the expandable panel
      const panel = document.createElement('div')
      panel.className = 'ayah-grounding-panel'
      panel.setAttribute('data-ref', refKey)
      panel.innerHTML = `
        <div class="grounding-title">${grounding.title}</div>
        <div class="grounding-body">${grounding.linguistic_html}</div>
      `

      // Insert after the cite
      bq.appendChild(toggleBtn)
      bq.appendChild(panel)
    })
  }, [ayahGroundings])

  // Handle toggle clicks via event delegation
  useEffect(() => {
    const container = contentRef.current
    if (!container) return

    const handleClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.ayah-grounding-toggle')
      if (!btn) return

      const refKey = btn.getAttribute('data-ref')
      if (!refKey) return

      const panel = container.querySelector(`.ayah-grounding-panel[data-ref="${refKey}"]`)
      if (!panel) return

      const isOpen = panel.classList.contains('open')
      panel.classList.toggle('open', !isOpen)
      btn.classList.toggle('open', !isOpen)
    }

    container.addEventListener('click', handleClick)
    return () => container.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <div
        ref={contentRef}
        className="prose-blog"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <style jsx global>{`
        /* ── Reset blockquote inheritance ────────────────── */
        .ayah-grounding-toggle,
        .ayah-grounding-panel,
        .ayah-grounding-panel * {
          font-style: normal !important;
          quotes: none !important;
        }

        /* ── Ayah Grounding Toggle ────────────────────────── */
        .ayah-grounding-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 8px 14px;
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 8px;
          background: rgba(201, 168, 76, 0.04);
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
          font-style: normal !important;
        }

        .ayah-grounding-toggle:hover {
          background: rgba(201, 168, 76, 0.08);
          border-color: rgba(201, 168, 76, 0.25);
        }

        .ayah-grounding-toggle .toggle-icon {
          color: rgba(201, 168, 76, 0.6);
          font-size: 10px;
          flex-shrink: 0;
        }

        .ayah-grounding-toggle .toggle-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: rgba(201, 168, 76, 0.7);
          flex: 1;
        }

        .ayah-grounding-toggle .toggle-chevron {
          flex-shrink: 0;
          color: rgba(201, 168, 76, 0.5);
          transition: transform 0.2s ease;
        }

        .ayah-grounding-toggle.open .toggle-chevron {
          transform: rotate(180deg);
        }

        /* ── Grounding Panel ─────────────────────────────── */
        .ayah-grounding-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease, padding 0.3s ease;
          opacity: 0;
          margin-top: 0;
          padding: 0;
          border-radius: 10px;
          background: rgba(201, 168, 76, 0.03);
          border: 1px solid transparent;
        }

        .ayah-grounding-panel.open {
          max-height: 800px;
          opacity: 1;
          margin-top: 12px;
          padding: 16px 18px;
          border-color: rgba(201, 168, 76, 0.1);
        }

        /* ── Mobile optimizations ─────────────────────────── */
        @media (max-width: 480px) {
          .ayah-grounding-toggle {
            padding: 10px 12px;
            min-height: 44px; /* iOS touch target */
            gap: 8px;
          }

          .ayah-grounding-toggle .toggle-text {
            font-size: 12px;
          }

          .ayah-grounding-panel.open {
            padding: 14px 14px;
            margin-top: 10px;
          }

          .ayah-grounding-panel .grounding-body {
            font-size: 13px !important;
            line-height: 1.7 !important;
          }

          .ayah-grounding-panel .grounding-body p {
            font-size: 13px !important;
            margin: 0 0 10px 0 !important;
          }

          .ayah-grounding-panel .grounding-title {
            font-size: 11px !important;
            margin: 0 0 8px 0 !important;
          }
        }

        .ayah-grounding-panel .grounding-title {
          font-family: var(--font-serif);
          font-size: 12px !important;
          font-weight: 600;
          font-style: normal !important;
          color: rgba(201, 168, 76, 0.75);
          margin: 0 0 10px 0 !important;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(201, 168, 76, 0.1);
          letter-spacing: 0.01em;
        }

        .ayah-grounding-panel .grounding-body {
          font-size: 13px !important;
          line-height: 1.75 !important;
          font-style: normal !important;
          font-family: var(--font-body) !important;
          color: rgba(161, 161, 170, 0.9);
        }

        .ayah-grounding-panel .grounding-body p {
          font-size: 13px !important;
          line-height: 1.75 !important;
          font-style: normal !important;
          margin: 0 0 8px 0 !important;
        }

        .ayah-grounding-panel .grounding-body p:last-child {
          margin-bottom: 0 !important;
        }

        .ayah-grounding-panel .grounding-body strong {
          color: rgba(228, 228, 231, 0.95);
          font-weight: 600;
          font-style: normal !important;
          font-size: 12px !important;
        }

        .ayah-grounding-panel .grounding-body em {
          color: rgba(201, 168, 76, 0.7);
          font-style: italic !important;
        }

        /* Light mode */
        .light .ayah-grounding-panel .grounding-body,
        :root:not(.dark) .ayah-grounding-panel .grounding-body {
          color: rgba(82, 82, 91, 0.9);
        }

        .light .ayah-grounding-panel .grounding-body strong,
        :root:not(.dark) .ayah-grounding-panel .grounding-body strong {
          color: rgba(39, 39, 42, 0.9);
        }

        .light .ayah-grounding-panel,
        :root:not(.dark) .ayah-grounding-panel {
          background: rgba(201, 168, 76, 0.03);
        }

        /* ── Dark mode explicit ─────────────────────────── */
        .dark .ayah-grounding-panel .grounding-body {
          color: rgba(161, 161, 170, 0.9);
        }

        .dark .ayah-grounding-panel .grounding-body strong {
          color: rgba(228, 228, 231, 0.95);
        }
      `}</style>
    </>
  )
}
