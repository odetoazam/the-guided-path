import { verifyAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const entityCreateSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  name_arabic: z.string().min(1),
  name_translit: z.string().min(1),
  name_english: z.string().optional().nullable(),
  category: z.enum([
    'states_of_the_heart',
    'the_unseen',
    'quranic_characters',
    'nations_and_peoples',
    'study_terms',
    'concepts_of_existence',
    'theology_and_ethics',
  ]),
  one_line: z.string().min(1),
  pronunciation: z.string().optional().nullable(),
  root_letters: z.string().optional().nullable(),
  root_translit: z.string().optional().nullable(),
  root_meaning: z.string().optional().nullable(),
  root_elaboration: z.string().optional().nullable(),
  occurrence_count: z.number().int().optional().nullable(),
  occurrence_note: z.string().optional().nullable(),
  glossary_data: z.record(z.string(), z.any()).default({}),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const adminClient = createAdminClient()

    let query = adminClient
      .from('entities')
      .select('*')
      .order('name_translit', { ascending: true })

    if (category) {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.or(
        `name_translit.ilike.%${search}%,name_arabic.ilike.%${search}%,name_english.ilike.%${search}%,one_line.ilike.%${search}%`
      )
    }

    const { data, error } = await query

    if (error) {
      console.error('Entity list error:', error)
      return NextResponse.json({ error: 'Failed to fetch entities' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Entity list error:', error)
    return NextResponse.json({ error: 'Failed to fetch entities' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const parsed = entityCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const adminClient = createAdminClient()

    const { data, error } = await adminClient
      .from('entities')
      .insert(parsed.data)
      .select()
      .single()

    if (error) {
      console.error('Entity create error:', error)
      return NextResponse.json({ error: 'Failed to create entity' }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Entity create error:', error)
    return NextResponse.json({ error: 'Failed to create entity' }, { status: 500 })
  }
}
