'use client'

import { Fragment, useCallback, useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import {
  FATIHA_HINGE_PAIR,
  FATIHA_OPENING,
  FATIHA_RING_NODES,
  FATIHA_RING_PAIRS,
} from '@/data/fatiha-ring'
import s from './RingExplorer.module.css'

interface RingExplorerProps {
  /** Title/subtitle from surah_visual_data.diagrams.ringStructure (optional). */
  data?: { title?: string; subtitle?: string }
}

const NODES = FATIHA_RING_NODES
const PAIRS = FATIHA_RING_PAIRS
const HINGE_NODE = NODES.findIndex((n) => n.pair === FATIHA_HINGE_PAIR)
const LINK_COUNT = 3
const DEFAULT_PAIR = 1
const TRACE_END = 6.7
const TRACE_SPEED = 0.8
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

/**
 * Interactive Ring explorer for Al-Fatiha (Overview → The Ring).
 * Layout math runs in a requestAnimationFrame loop and writes to DOM refs directly;
 * React owns the selection, fold direction and trace state.
 */
export function RingExplorer({ data }: RingExplorerProps) {
  const uid = useId()
  const gradientId = `${uid}-ribbon`
  const rangeId = `${uid}-fold`

  const [selected, setSelected] = useState(DEFAULT_PAIR)
  const [folded, setFolded] = useState(false)
  const [tracing, setTracing] = useState(false)

  // Animation state lives in refs so the RAF loop never closes over stale values.
  const foldRef = useRef(0)
  const targetRef = useRef(0)
  const traceRef = useRef(-1)
  const selectedRef = useRef(DEFAULT_PAIR)
  const widthRef = useRef(0)
  const heightRef = useRef(485)
  const rafRef = useRef(0)
  const lastRef = useRef(0)
  const reducedRef = useRef(false)
  const dragRef = useRef<{ x: number; start: number; id: number } | null>(null)

  const mapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const railRef = useRef<SVGPathElement>(null)
  const railShadowRef = useRef<SVGPathElement>(null)
  const spineRef = useRef<SVGPathElement>(null)
  const tracerRef = useRef<SVGCircleElement>(null)
  const linkPathRefs = useRef<(SVGPathElement | null)[]>([])
  const linkLabelRefs = useRef<(SVGTextElement | null)[]>([])
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([])
  const captionRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const rangeRef = useRef<HTMLInputElement>(null)

  const draw = useCallback(() => {
    const width = widthRef.current
    const map = mapRef.current
    if (!map || width <= 0) return
    const fold = foldRef.current
    const sel = selectedRef.current
    const narrow = width < 470
    map.dataset.narrow = String(narrow)

    const cw = narrow ? Math.min(109, (width - 70) / 2) : Math.min(139, (width - 150) / 2)
    const colL = narrow ? cw / 2 + 20 : cw / 2 + 30
    const colR = width - colL
    // Reading-order row: outer nodes (76px wide) sit fully inside the map with a 6px margin.
    const flatStep = (width - 88) / 6
    const ys = narrow ? [158, 252, 346, 444, 346, 252, 158] : [153, 241, 329, 415, 329, 241, 153]
    const ends = NODES.map((_, i) => ({ x: i < 3 ? colL : i === 3 ? width / 2 : colR, y: ys[i] }))
    const starts = NODES.map((_, i) => (narrow ? { x: width / 2, y: 124 + i * 53 } : { x: 44 + i * flatStep, y: 255 }))
    const mobileStep = (width - 58) / 6

    const positions = NODES.map((_, i) => {
      if (narrow && fold < 0.5) {
        const u = fold * 2
        const angle = (u * Math.PI) / 2
        const r = mix(53, mobileStep, u)
        const pivotY = mix(283, 300, u)
        return { x: width / 2 + (i - 3) * r * Math.sin(angle), y: pivotY + (i - 3) * r * Math.cos(angle) }
      }
      if (narrow) {
        const u = (fold - 0.5) * 2
        return { x: mix(width / 2 + (i - 3) * mobileStep, ends[i].x, u), y: mix(300, ends[i].y, u) }
      }
      return { x: mix(starts[i].x, ends[i].x, fold), y: mix(starts[i].y, ends[i].y, fold) }
    })

    const flatW = narrow ? 134 : Math.min(76, flatStep - 6)
    const compact = narrow ? 32 : 44
    const openAmount = Math.max(0, 1 - fold / 0.12)
    const closedAmount = Math.max(0, (fold - 0.86) / 0.14)
    const w = compact + (flatW - compact) * openAmount + (cw - compact) * closedAmount
    const h = compact + ((narrow ? 45 : 76) - compact) * openAmount + (79 - compact) * closedAmount

    nodeRefs.current.forEach((b, i) => {
      if (!b) return
      const pos = positions[i]
      b.style.left = '0px'
      b.style.top = '0px'
      b.style.width = `${w + (i === HINGE_NODE ? 10 * closedAmount : 0)}px`
      b.style.height = `${h}px`
      b.style.minHeight = `${compact}px`
      b.style.borderRadius = fold > 0.12 && fold < 0.86 ? '50%' : '8px'
      b.style.transform = `translate(${pos.x}px,${pos.y}px) translate(-50%,-50%)`
      b.dataset.showAr = String(closedAmount > 0.84)
      b.dataset.showTitle = String(openAmount > 0.5 || closedAmount > 0.65)
      b.dataset.smallNumber = String(narrow && fold < 0.3)
    })

    const d = 'M ' + positions.map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' L ')
    railRef.current?.setAttribute('d', d)
    spineRef.current?.setAttribute('d', d)
    railShadowRef.current?.setAttribute('d', d)

    for (let i = 0; i < LINK_COUNT; i++) {
      const path = linkPathRefs.current[i]
      const label = linkLabelRefs.current[i]
      if (!path || !label) continue
      const a = positions[i]
      const b = positions[6 - i]
      const vis = Math.max(0, (fold - 0.38) / 0.62)
      const startX = a.x + w / 2 + 5
      const endX = b.x - w / 2 - 5
      const y = (a.y + b.y) / 2
      path.setAttribute('d', `M ${startX} ${y} Q ${width / 2} ${y - 10 * (1 - fold)} ${endX} ${y}`)
      path.style.opacity = String(vis * (sel === i ? 0.95 : 0.16))
      label.setAttribute('x', String(width / 2))
      label.setAttribute('y', String(y - 9))
      label.style.opacity = String(vis * (sel === i ? 1 : 0))
      label.textContent = narrow ? PAIRS[i].lineLabelShort : PAIRS[i].lineLabel
    }

    const pct = Math.round(fold * 100)
    if (percentRef.current) percentRef.current.textContent = `${pct}% folded`
    if (rangeRef.current && document.activeElement !== rangeRef.current) rangeRef.current.value = String(pct)
    if (captionRef.current) {
      captionRef.current.textContent =
        fold < 0.08
          ? 'Reading order · verses 2–7'
          : fold > 0.92
            ? 'Three proposed pairs around ayah 5'
            : 'Follow the same passages as the sequence folds'
    }

    const trace = traceRef.current
    const tracer = tracerRef.current
    if (trace >= 0) {
      const idx = Math.min(5, Math.floor(trace))
      const u = Math.min(1, trace - idx)
      const a = positions[idx]
      const b = positions[idx + 1]
      if (tracer) {
        tracer.style.display = 'block'
        tracer.setAttribute('cx', String(mix(a.x, b.x, u)))
        tracer.setAttribute('cy', String(mix(a.y, b.y, u)))
      }
      const visiting = Math.min(6, Math.round(trace))
      nodeRefs.current.forEach((bt, i) => bt && (bt.dataset.visiting = String(i === visiting)))
    } else {
      if (tracer) tracer.style.display = 'none'
      nodeRefs.current.forEach((bt) => bt && (bt.dataset.visiting = 'false'))
    }
  }, [])

  const tick = useCallback(
    (now: number) => {
      rafRef.current = 0
      if (!mapRef.current?.isConnected) return
      const dt = lastRef.current ? Math.min((now - lastRef.current) / 1000, 0.07) : 0.016
      lastRef.current = now
      const target = targetRef.current
      foldRef.current = reducedRef.current ? target : mix(foldRef.current, target, 1 - Math.exp(-dt * 5))
      if (Math.abs(foldRef.current - target) < 0.001) foldRef.current = target
      if (traceRef.current >= 0) {
        traceRef.current += dt * TRACE_SPEED
        if (traceRef.current > TRACE_END) {
          traceRef.current = -1
          setTracing(false)
        }
      }
      draw()
      if (foldRef.current !== target || traceRef.current >= 0) rafRef.current = requestAnimationFrame(tick)
    },
    [draw],
  )

  const wake = useCallback(() => {
    if (!rafRef.current) {
      lastRef.current = 0
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [tick])

  // Measure, observe, and clean up.
  useEffect(() => {
    const map = mapRef.current
    const svg = svgRef.current
    if (!map || !svg) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedRef.current = mq.matches
    const onMq = (e: MediaQueryListEvent) => { reducedRef.current = e.matches }
    mq.addEventListener('change', onMq)

    const ro = new ResizeObserver(() => {
      const r = map.getBoundingClientRect()
      widthRef.current = r.width
      heightRef.current = r.height
      if (r.width > 0) {
        svg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`)
        draw()
      }
    })
    ro.observe(map)

    const onVisibility = () => {
      if (document.hidden && traceRef.current >= 0) {
        traceRef.current = -1
        setTracing(false)
        draw()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      mq.removeEventListener('change', onMq)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [draw])

  useEffect(() => {
    selectedRef.current = selected
    draw()
  }, [selected, draw])

  const toggleFold = () => {
    targetRef.current = targetRef.current > 0.5 ? 0 : 1
    setFolded(targetRef.current > 0.5)
    wake()
  }

  const onRange = (value: number) => {
    foldRef.current = targetRef.current = clamp01(value / 100)
    setFolded(targetRef.current > 0.5)
    draw()
  }

  const toggleTrace = () => {
    traceRef.current = traceRef.current >= 0 ? -1 : 0
    setTracing(traceRef.current >= 0)
    wake()
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    if (e.button !== 0) return
    dragRef.current = { x: e.clientX, start: foldRef.current, id: e.pointerId }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || e.pointerId !== drag.id) return
    foldRef.current = targetRef.current = clamp01(drag.start + (e.clientX - drag.x) / (widthRef.current * 0.65))
    setFolded(targetRef.current > 0.5)
    draw()
  }
  const endDrag = () => { dragRef.current = null }

  const pair = PAIRS[selected]
  const isHinge = selected === FATIHA_HINGE_PAIR
  const rootStyle = { '--rg-selected': pair.color } as CSSProperties

  return (
    <section
      className={s.root}
      style={rootStyle}
      aria-label="Interactive map of Al-Fatiha’s proposed ring structure"
    >
      <div className={s.heading}>
        <div>
          <div className={s.kicker}>{data?.subtitle ?? 'Seven ayahs. A different perspective.'}</div>
          <h3 className={s.title}>{data?.title ?? 'The Ring'}</h3>
        </div>
        <button type="button" className={s.fold} onClick={toggleFold} aria-pressed={folded}>
          {folded ? 'Unfold the surah' : 'Fold the surah'}
          <span aria-hidden="true">{folded ? '↙' : '↗'}</span>
        </button>
      </div>

      <div className={s.workspace}>
        <div className={s.mapSide}>
          <div
            ref={mapRef}
            className={s.map}
            role="group"
            aria-label="Foldable map of Al-Fatiha. Select a verse to inspect its proposed pair. Drag the open space to fold."
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className={s.basmala}>
              <span>{FATIHA_OPENING.ref} · THE OPENING</span>
              <div className={s.basmalaAr} lang="ar" dir="rtl">{FATIHA_OPENING.arabic}</div>
            </div>

            <svg ref={svgRef} className={s.svg} aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#244344" />
                  <stop offset=".5" stopColor="#6c5e39" />
                  <stop offset="1" stopColor="#244344" />
                </linearGradient>
              </defs>
              <path ref={railShadowRef} className={s.railShadow} />
              <path ref={railRef} className={s.rail} stroke={`url(#${gradientId})`} />
              <path ref={spineRef} className={s.spine} />
              <g>
                {PAIRS.slice(0, LINK_COUNT).map((p, i) => (
                  <Fragment key={p.pickerLabel}>
                    <path
                      ref={(el) => { linkPathRefs.current[i] = el }}
                      className={s.link}
                      stroke={p.color}
                      style={{ opacity: 0 }}
                    />
                    <text
                      ref={(el) => { linkLabelRefs.current[i] = el }}
                      className={s.linkLabel}
                      style={{ opacity: 0 }}
                    >
                      {p.lineLabel}
                    </text>
                  </Fragment>
                ))}
              </g>
              <circle ref={tracerRef} className={s.tracer} r={5} />
            </svg>

            <div className={s.nodes}>
              {NODES.map((n, i) => {
                const active = n.pair === selected
                const nodeStyle = { '--i': i, '--node-color': PAIRS[n.pair].color } as CSSProperties
                return (
                  <button
                    key={n.ref}
                    ref={(el) => { nodeRefs.current[i] = el }}
                    type="button"
                    className={`${s.node}${!active && i !== HINGE_NODE ? ` ${s.other}` : ''}`}
                    style={nodeStyle}
                    data-hinge={i === HINGE_NODE ? 'true' : undefined}
                    aria-pressed={active}
                    aria-label={`${n.ref} ${n.label}, ${n.pair === FATIHA_HINGE_PAIR ? 'inspect the hinge' : 'inspect paired passage'}`}
                    onClick={() => setSelected(n.pair)}
                  >
                    <span className={s.number}>{n.ref}</span>
                    <span className={s.nodeTitle}>{n.label}</span>
                    <span className={s.nodeAr} lang="ar" dir="rtl">{n.arabicExcerpt}</span>
                  </button>
                )
              })}
            </div>

            <div ref={captionRef} className={s.caption} aria-live="polite">
              Reading order · verses 2–7
            </div>
          </div>

          <div className={s.foldControl}>
            <div className={s.rangeLabels}>
              <label htmlFor={rangeId}>Reading order</label>
              <span ref={percentRef} className={s.percent}>0% folded</span>
              <span>Paired structure</span>
            </div>
            <input
              ref={rangeRef}
              id={rangeId}
              className={s.range}
              type="range"
              min={0}
              max={100}
              step={1}
              defaultValue={0}
              onChange={(e) => onRange(Number(e.target.value))}
              aria-label="Fold the surah from reading order to paired structure"
            />
            <div className={s.mapActions}>
              <span>Drag the slider or the open space in the map.</span>
              <button type="button" className={s.trace} onClick={toggleTrace} aria-pressed={tracing}>
                {tracing ? 'Stop tracing' : 'Trace reading order'}
              </button>
            </div>
          </div>

          <div className={s.pairPicker} role="group" aria-label="Explore a relationship">
            {PAIRS.map((p, i) => (
              <button key={p.pickerLabel} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>
                <span className={s.dot} style={{ background: p.color }} aria-hidden="true" />
                {p.pickerLabel}
              </button>
            ))}
          </div>
        </div>

        <aside className={s.inspector} aria-label="Selected relationship" aria-live="polite">
          <div className={s.detailKicker}>
            {isHinge ? 'Central verse · ' : 'Proposed pair · '}
            {pair.ids.map((j) => NODES[j].ref).join(' ↔ ')}
          </div>
          <h4 className={s.detailTitle}>
            {pair.title.map((line, k) => (
              <Fragment key={line}>
                {k > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h4>
          <div className={s.quotes}>
            {pair.ids.map((j) => {
              const n = NODES[j]
              return (
                <blockquote key={n.ref} className={s.quote}>
                  <div className={s.quoteRef}>
                    {n.ref} · {n.label}
                    {n.portion ? ' · portion of ayah 7' : ''}
                  </div>
                  <div className={s.quoteAr} lang="ar" dir="rtl">{n.arabicFull}</div>
                  <div className={s.quoteEn}>{n.translation}</div>
                </blockquote>
              )
            })}
          </div>
          <p className={s.relationship}>{pair.body}</p>
          <p className={s.kind}>
            <strong>{pair.kind}</strong>
            <br />
            {pair.note}
          </p>
        </aside>
      </div>

      <footer className={s.footer}>
        <span>Map labels use excerpts. 7a and 7b are portions of one ayah; verse 1 is shown separately.</span>
        <span>A proposed reading, not a claim of consensus.</span>
      </footer>
    </section>
  )
}
