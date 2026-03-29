interface HeartVerseProps {
  verse: {
    arabic: string
    ayahRef: string
    translation: string
    why: string
    articleAnchor?: string
  }
}

export function HeartVerse({ verse }: HeartVerseProps) {
  return (
    <div className="border-l-2 border-gold-500 bg-white/[0.02] rounded-r-xl px-5 py-5 space-y-3">
      <p className="text-2xl leading-loose text-right text-cream font-amiri" style={{ direction: 'rtl' }}>
        {verse.arabic}
      </p>
      <p className="text-sm italic text-cream/70 font-body">{verse.translation}</p>
      <p className="text-xs text-cream-muted/60 leading-relaxed font-body">{verse.why}</p>
    </div>
  )
}
