import { verifyAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { ayahRecordSchema } from '@/lib/validators'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const surah = searchParams.get('surah')
    const ayah = searchParams.get('ayah')

    const user = await verifyAuth(request).catch(() => null)
    const isAdmin = !!user

    const adminClient = createAdminClient()

    let query = adminClient
      .from('ayah_records')
      .select('*')
      .order('surah_number', { ascending: true })
      .order('ayah_start', { ascending: true })

    if (!isAdmin) {
      query = query.eq('status', 'published')
    }

    if (surah) {
      const surahNum = parseInt(surah, 10)
      if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
        return NextResponse.json({ error: 'Invalid surah number' }, { status: 400 })
      }
      query = query.eq('surah_number', surahNum)
    }

    if (ayah) {
      const ayahNum = parseInt(ayah, 10)
      if (isNaN(ayahNum) || ayahNum < 1) {
        return NextResponse.json({ error: 'Invalid ayah number' }, { status: 400 })
      }
      query = query.lte('ayah_start', ayahNum).gte('ayah_end', ayahNum)
    }

    const { data, error } = await query

    if (error) {
      console.error('Ayah records list error:', error)
      return NextResponse.json({ error: 'Failed to fetch ayah records' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Ayah records list error:', error)
    return NextResponse.json({ error: 'Failed to fetch ayah records' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const parsed = ayahRecordSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const adminClient = createAdminClient()

    const { data, error } = await adminClient
      .from('ayah_records')
      .insert(parsed.data)
      .select()
      .single()

    if (error) {
      console.error('Ayah record create error:', error)
      return NextResponse.json({ error: 'Failed to create ayah record' }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Ayah record create error:', error)
    return NextResponse.json({ error: 'Failed to create ayah record' }, { status: 500 })
  }
}
