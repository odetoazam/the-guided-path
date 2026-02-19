import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const user = await verifyAuth(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const adminClient = createAdminClient()
    const { data, error } = await adminClient
      .from('settings')
      .select('*')

    if (error) {
      console.error('Settings fetch error:', error)
      return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
    }

    const settings: Record<string, any> = {}
    data?.forEach((s) => { settings[s.key] = s.value })

    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { key, value } = await request.json()
  const adminClient = createAdminClient()

  const { error } = await adminClient
    .from('settings')
    .upsert({ key, value, updated_by: user.id }, { onConflict: 'key' })

  if (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
