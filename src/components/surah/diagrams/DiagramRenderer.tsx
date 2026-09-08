'use client'

import { RingStructure } from './RingStructure'
import { RingExplorer } from './RingExplorer'
import { SectionJourney } from './SectionJourney'
import { DeductiveFunnel } from './DeductiveFunnel'
import { AbsenceMap } from './AbsenceMap'
import { CompressionViz } from './CompressionViz'
import { StructuralArcs } from './StructuralArcs'
import { LandmarkVerses } from './LandmarkVerses'
import { ContrastMap } from './ContrastMap'
import { PolarMap } from './PolarMap'
import { FourConditions } from './FourConditions'
import { WordMirror } from './WordMirror'
import { RefrainPattern } from './RefrainPattern'
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
  /** Lets surah-specific interactive renderers replace the generic one. */
  surahNumber?: number
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const RENDERERS: Record<string, React.ComponentType<{ data: any }>> = {
  ring: RingStructure,
  journey: SectionJourney,
  funnel: DeductiveFunnel,
  absence: AbsenceMap,
  compression: CompressionViz,
  arcs: StructuralArcs,
  landmark: LandmarkVerses,
  contrast: ContrastMap,
  polar: PolarMap,
  conditions: FourConditions,
  wordmirror: WordMirror,
  refrain: RefrainPattern,
}

export function DiagramRenderer({ tab, diagrams, fullText, heartVerse, surahNumber }: DiagramRendererProps) {
  if (tab.renderer === 'text') {
    return (
      <div className="space-y-6">
        {Array.isArray(fullText) && fullText.length > 0 && <FullSurahText verses={fullText} />}
        {Array.isArray(fullText) && fullText.length > 0 && heartVerse && <OrnamentDivider />}
        {heartVerse && <HeartVerse verse={heartVerse} />}
      </div>
    )
  }

  const key = tab.diagramKey
  if (!key) return null

  const data = diagrams[key]
  if (!data) return null

  // Al-Fatiha's Ring is the interactive fold explorer; other surahs keep the static ring.
  if (tab.renderer === 'ring' && surahNumber === 1) return <RingExplorer data={data} />

  const Renderer = RENDERERS[tab.renderer]
  if (!Renderer) return null

  return <Renderer data={data} />
}
