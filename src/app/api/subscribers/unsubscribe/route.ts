import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(`${SITE_URL}?unsubscribe=invalid`)
  }

  const adminClient = createAdminClient()

  const { error } = await adminClient
    .from('subscribers')
    .update({
      status: 'unsubscribed',
      unsubscribed_at: new Date().toISOString(),
    })
    .eq('unsubscribe_token', token)

  if (error) {
    return NextResponse.redirect(`${SITE_URL}?unsubscribe=error`)
  }

  return NextResponse.redirect(`${SITE_URL}?unsubscribe=success`)
}
