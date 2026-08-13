import { verifyAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!UUID_REGEX.test(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    // Admin only — see the note on the collection route. A single record is the
    // whole reflection, so an unauthenticated read here leaked the same content
    // one id at a time.
    const user = await verifyAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const adminClient = createAdminClient()

    const { data, error } = await adminClient
      .from('ayah_records')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Ayah record not found' }, { status: 404 })
      }
      console.error('Ayah record fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch ayah record' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Ayah record fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch ayah record' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = params

    if (!UUID_REGEX.test(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 })
    }

    const body = await request.json()

    const adminClient = createAdminClient()

    const { data, error } = await adminClient
      .from('ayah_records')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Ayah record not found' }, { status: 404 })
      }
      console.error('Ayah record update error:', error)
      return NextResponse.json({ error: 'Failed to update ayah record' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Ayah record update error:', error)
    return NextResponse.json({ error: 'Failed to update ayah record' }, { status: 500 })
  }
}
