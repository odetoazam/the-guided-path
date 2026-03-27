import { verifyAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { entityTagSchema } from '@/lib/validators'
import { NextResponse } from 'next/server'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const entityId = searchParams.get('entity_id')
    const postId = searchParams.get('post_id')
    const primary = searchParams.get('primary')

    const adminClient = createAdminClient()

    let query = adminClient
      .from('entity_tags')
      .select('*, entities(*)')
      .order('created_at', { ascending: false })

    if (entityId) {
      if (!UUID_REGEX.test(entityId)) {
        return NextResponse.json({ error: 'Invalid entity_id format' }, { status: 400 })
      }
      query = query.eq('entity_id', entityId)

      if (primary === 'true') {
        query = query.eq('is_primary', true)
      }
    }

    if (postId) {
      if (!UUID_REGEX.test(postId)) {
        return NextResponse.json({ error: 'Invalid post_id format' }, { status: 400 })
      }
      query = query.eq('post_id', postId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Entity tags list error:', error)
      return NextResponse.json({ error: 'Failed to fetch entity tags' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Entity tags list error:', error)
    return NextResponse.json({ error: 'Failed to fetch entity tags' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const parsed = entityTagSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const adminClient = createAdminClient()

    const { data, error } = await adminClient
      .from('entity_tags')
      .insert(parsed.data)
      .select()
      .single()

    if (error) {
      console.error('Entity tag create error:', error)
      return NextResponse.json({ error: 'Failed to create entity tag' }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Entity tag create error:', error)
    return NextResponse.json({ error: 'Failed to create entity tag' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await verifyAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const entityId = searchParams.get('entity_id')
    const postId = searchParams.get('post_id')
    const ayahRecordId = searchParams.get('ayah_record_id')

    if (!entityId) {
      return NextResponse.json({ error: 'entity_id is required' }, { status: 400 })
    }

    if (!UUID_REGEX.test(entityId)) {
      return NextResponse.json({ error: 'Invalid entity_id format' }, { status: 400 })
    }

    if (!postId && !ayahRecordId) {
      return NextResponse.json(
        { error: 'Either post_id or ayah_record_id is required' },
        { status: 400 }
      )
    }

    if (postId && !UUID_REGEX.test(postId)) {
      return NextResponse.json({ error: 'Invalid post_id format' }, { status: 400 })
    }

    if (ayahRecordId && !UUID_REGEX.test(ayahRecordId)) {
      return NextResponse.json({ error: 'Invalid ayah_record_id format' }, { status: 400 })
    }

    const adminClient = createAdminClient()

    let query = adminClient
      .from('entity_tags')
      .delete()
      .eq('entity_id', entityId)

    if (postId) {
      query = query.eq('post_id', postId)
    } else {
      query = query.eq('ayah_record_id', ayahRecordId!)
    }

    const { error } = await query

    if (error) {
      console.error('Entity tag delete error:', error)
      return NextResponse.json({ error: 'Failed to delete entity tag' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Entity tag delete error:', error)
    return NextResponse.json({ error: 'Failed to delete entity tag' }, { status: 500 })
  }
}
