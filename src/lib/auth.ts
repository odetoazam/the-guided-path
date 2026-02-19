import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Verify a user's access token server-side.
 * Works reliably regardless of cookie state.
 *
 * Usage in API routes:
 *   const user = await verifyAuth(request)
 *   if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
 */
export async function verifyAuth(request: Request) {
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) return null

  try {
    const adminClient = createAdminClient()
    const { data: { user }, error } = await adminClient.auth.getUser(token)

    if (error || !user) return null

    // Verify user is an admin
    const { data: profile } = await adminClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') return null

    return user
  } catch {
    return null
  }
}
