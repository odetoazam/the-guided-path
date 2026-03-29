interface FullSurahTextProps {
  verses: Array<{
    ayah: number
    arabic: string
    ayahRef: string
    translation: string
  }>
}

export function FullSurahText({ verses }: FullSurahTextProps) {
  return (
    <div className="space-y-5">
      {verses.map((v) => (
        <div key={v.ayah} className="space-y-1">
          <p className="text-xl leading-loose text-right text-cream font-amiri" style={{ direction: 'rtl' }}>
            {v.arabic}{' '}
            <span className="text-sm text-cream-muted/50">﴿{v.ayah}﴾</span>
          </p>
          <p className="text-sm text-cream-muted/60 font-body">{v.translation}</p>
        </div>
      ))}
    </div>
  )
}
