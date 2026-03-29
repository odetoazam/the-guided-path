'use client'

import { RingStructure } from './RingStructure'
import { SectionJourney } from './SectionJourney'
import { DeductiveFunnel } from './DeductiveFunnel'
import { AbsenceMap } from './AbsenceMap'
import { CompressionViz } from './CompressionViz'
import { FullSurahText } from './FullSurahText'
import { HeartVerse } from './HeartVerse'
import { OrnamentDivider } from './OrnamentDivider'

interface Tab {
  id: string
  label: string
  diagramKey?: string
  renderer: string
}

interface DiagramRendererProps {
  tab: Tab
  diagrams: Record<string, any>
  fullText?: any[]
  heartVerse?: any
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const RENDERERS: Record<string, React.ComponentType<{ data: any }>> = {
  ring: RingStructure,
  journey: SectionJourney,
  funnel: DeductiveFunnel,
  absence: AbsenceMap,
  compression: CompressionViz,
}

export function DiagramRenderer({ tab, diagrams, fullText, heartVerse }: DiagramRendererProps) {
  if (tab.renderer === 'text') {
    return (
      <div className="space-y-6">
        {fullText && fullText.length > 0 && <FullSurahText verses={fullText} />}
        {fullText && fullText.length > 0 && heartVerse && <OrnamentDivider />}
        {heartVerse && <HeartVerse verse={heartVerse} />}
      </div>
    )
  }

  const key = tab.diagramKey
  if (!key) return null

  const data = diagrams[key]
  if (!data) return null

  const Renderer = RENDERERS[tab.renderer]
  if (!Renderer) return null

  return <Renderer data={data} />
}
