import { createAdminClient } from '@/lib/supabase/admin'
import { getResend, EMAIL_FROM } from '@/lib/email/resend'
import { NextResponse } from 'next/server'
import { correctionSchema } from '@/lib/validators'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import crypto from 'crypto'

/**
 * Public corrections / contact intake.
 *
 * The site promises that corrections are reviewed within fourteen days, and
 * published five addresses to send them to. None of those mailboxes existed —
 * the domain sends mail but has never received any. This route is what makes
 * the promise true: submissions land in the `corrections` table and a
 * notification goes out through the same Resend account the newsletter uses.
 *
 * CORRECTIONS_NOTIFY_EMAIL controls where the notification goes, so the
 * destination can change without a deploy and is never exposed to the client.
 */
const NOTIFY_TO = process.env.CORRECTIONS_NOTIFY_EMAIL

export async function POST(request: Request) {
  // 5 submissions per IP per 10 minutes, matching the subscribe endpoint.
  const ip = getClientIp(request)
  const { allowed } = checkRateLimit(`corrections:${ip}`, { maxRequests: 5, windowSeconds: 600 })
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again shortly.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = correctionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Please check the form and try again' },
      { status: 400 },
    )
  }
  const input = parsed.data

  // Hash the IP rather than storing it: enough to spot abuse patterns, not a
  // record of who wrote in about a verse.
  const ipHash = crypto
    .createHash('sha256')
    .update(`${ip}:${process.env.CRON_SECRET ?? 'ayahguide'}`)
    .digest('hex')
    .slice(0, 32)

  // Storage and notification are independent failure paths. A correction is
  // someone taking the trouble to tell us we got sacred content wrong, so it is
  // only lost if BOTH the table and the mail fail.
  const adminClient = createAdminClient()
  const { data, error } = await adminClient
    .from('corrections')
    .insert({
      kind: input.kind,
      name: input.name,
      email: input.email,
      credentials: input.credentials || null,
      page_url: input.page_url || null,
      message: input.message,
      ip_hash: ipHash,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Correction insert error:', error)
  }
  const stored = !error

  // Notification is best-effort: the submission is already saved, so a mail
  // failure must not tell the sender their correction was lost.
  let notified = false
  if (NOTIFY_TO) {
    try {
      const esc = (s: string) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      await getResend().emails.send({
        from: EMAIL_FROM,
        to: NOTIFY_TO,
        replyTo: input.email,
        subject: `[${input.kind}] ${input.name}`,
        html: `
          <p><strong>Kind:</strong> ${esc(input.kind)}</p>
          <p><strong>From:</strong> ${esc(input.name)} &lt;${esc(input.email)}&gt;</p>
          ${input.credentials ? `<p><strong>Credentials:</strong> ${esc(input.credentials)}</p>` : ''}
          ${input.page_url ? `<p><strong>Page:</strong> ${esc(input.page_url)}</p>` : ''}
          <hr />
          <p style="white-space:pre-wrap">${esc(input.message)}</p>
          <hr />
          <p style="color:#888;font-size:12px">${stored ? `id ${data?.id}` : 'NOT STORED — the corrections table is missing; this email is the only copy.'}</p>
        `,
      })
      notified = true
    } catch (mailError) {
      console.error('Correction notification failed:', mailError)
    }
  }

  if (!stored && !notified) {
    return NextResponse.json({ error: 'Could not record your message' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null })
}
