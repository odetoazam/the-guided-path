#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function readBody(filePath: string): string {
  const raw = fs.readFileSync(filePath, 'utf-8')
  let content = raw.replace(/^---[\s\S]*?---\s*/m, '')
  content = content.replace(/<!--[\s\S]*?-->\s*/gm, '')
  return content.trim()
}

async function main() {
  const filePath = '/Users/azamkhan/the-guided-path/content/tadabbur/059-al-hashr/ayahs-022-024.md'
  const body = readBody(filePath)

  const record = {
    surah_number: 59,
    ayah_start: 22,
    ayah_end: 24,
    arabic_text: 'هُوَ ٱللَّهُ ٱلَّذِى لَآ إِلَـٰهَ إِلَّا هُوَ ۖ عَـٰلِمُ ٱلْغَيْبِ وَٱلشَّهَـٰدَةِ ۖ هُوَ ٱلرَّحْمَـٰنُ ٱلرَّحِيمُ ﴿٢٢﴾ هُوَ ٱللَّهُ ٱلَّذِى لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْمَلِكُ ٱلْقُدُّوسُ ٱلسَّلَـٰمُ ٱلْمُؤْمِنُ ٱلْمُهَيْمِنُ ٱلْعَزِيزُ ٱلْجَبَّارُ ٱلْمُتَكَبِّرُ ۚ سُبْحَـٰنَ ٱللَّهِ عَمَّا يُشْرِكُونَ ﴿٢٣﴾ هُوَ ٱللَّهُ ٱلْخَـٰلِقُ ٱلْبَارِئُ ٱلْمُصَوِّرُ ۖ لَهُ ٱلْأَسْمَآءُ ٱلْحُسْنَىٰ ۚ يُسَبِّحُ لَهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۖ وَهُوَ ٱلْعَزِيزُ ٱلْحَكِيمُ ﴿٢٤﴾',
    translation: 'He is Allah — there is no deity except Him. Knower of the unseen and the witnessed. He is the Most Merciful, the Especially Merciful. He is Allah — there is no deity except Him. The Sovereign, the Absolutely Holy, the Source of Peace, the Granter of Security, the Watchful Guardian, the Almighty, the Compeller, the Supreme in Grandeur. Exalted is Allah above whatever they associate with Him. He is Allah — the Creator, the Originator, the Fashioner. To Him belong the most beautiful names. Whatever is in the heavens and the earth glorifies Him. And He is the Almighty, the All-Wise.',
    title: 'Twelve Names and Nothing Left to Look For — The Closing Cascade of Al-Hashr',
    layer_a: { body },
    status: 'published',
  }

  // Check if already exists
  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', 59)
    .eq('ayah_start', 22)
    .single()

  if (existing) {
    console.log(`Already exists (ID: ${existing.id}) — updating`)
    const { error } = await supabase
      .from('ayah_records')
      .update(record)
      .eq('id', existing.id)
    if (error) console.error('Update failed:', error.message)
    else console.log('✓ Updated')
    return
  }

  const { data, error } = await supabase
    .from('ayah_records')
    .insert(record)
    .select('id')
    .single()

  if (error || !data) {
    console.error('✗ Insert failed:', error?.message ?? 'unknown')
    return
  }

  console.log(`✓ Inserted with ID: ${data.id}`)
}

main().catch(console.error)
