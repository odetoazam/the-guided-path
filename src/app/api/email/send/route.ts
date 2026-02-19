import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { getResend, EMAIL_FROM } from '@/lib/email/resend'
import { NextResponse } from 'next/server'
import { SITE_URL, SITE_NAME } from '@/lib/constants'
import sanitizeHtml from 'sanitize-html'

const ALLOWED_HTML = {
  allowedTags: [
    'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'a', 'blockquote', 'pre', 'code',
    'img', 'hr', 'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target'],
    img: ['src', 'alt', 'width', 'height'],
    '*': ['style'],
  },
  allowedSchemes: ['https', 'http', 'mailto'],
}

function sanitizeContent(html: string): string {
  return sanitizeHtml(html, ALLOWED_HTML)
}

export async function POST(request: Request) {
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminClient = createAdminClient()

  const { postId, testEmail } = await request.json()

  const { data: post } = await adminClient
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single()

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  if (testEmail) {
    try {
      await getResend().emails.send({
        from: EMAIL_FROM,
        to: testEmail,
        subject: `[TEST] ${post.title} — ${SITE_NAME}`,
        html: generateNewsletterHtml(post, { unsubscribe_token: 'test' }),
      })
      return NextResponse.json({ message: 'Test email sent!' })
    } catch (error: any) {
      console.error('Test email error:', error)
      return NextResponse.json({ error: 'Failed to send test email' }, { status: 500 })
    }
  }

  const { data: subscribers } = await adminClient
    .from('subscribers')
    .select('email, unsubscribe_token')
    .eq('status', 'active')

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ error: 'No active subscribers' }, { status: 400 })
  }

  const emails = subscribers.map((sub) => ({
    from: EMAIL_FROM,
    to: sub.email,
    subject: `${post.title} — ${SITE_NAME}`,
    html: generateNewsletterHtml(post, sub),
  }))

  try {
    for (let i = 0; i < emails.length; i += 100) {
      await getResend().batch.send(emails.slice(i, i + 100))
    }

    await adminClient.from('email_logs').insert({
      post_id: postId,
      subscriber_count: subscribers.length,
      status: 'sent',
      sent_at: new Date().toISOString(),
    })

    await adminClient.from('posts').update({
      email_sent: true,
      email_sent_at: new Date().toISOString(),
    }).eq('id', postId)

    return NextResponse.json({ message: `Email sent to ${subscribers.length} subscribers` })
  } catch (error: any) {
    console.error('Newsletter send error:', error)
    return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 })
  }
}

function generateNewsletterHtml(post: any, subscriber: any): string {
  const unsubscribeUrl = `${SITE_URL}/api/subscribers/unsubscribe?token=${subscriber.unsubscribe_token}`
  const postUrl = `${SITE_URL}/tadabbur/${post.slug}`
  const safeContent = sanitizeContent(post.content_html || '')
  const safeExcerpt = post.excerpt ? sanitizeContent(post.excerpt) : ''

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,'Times New Roman',serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="text-align:center;margin-bottom:40px;">
          <h1 style="color:#D4AF37;font-size:24px;margin:0;">AyahGuide</h1>
          <p style="color:#71717a;font-size:14px;margin-top:8px;">Quranic Reflections</p>
        </div>
        <div style="background-color:#18181b;border-radius:12px;padding:32px;border:1px solid #27272a;">
          <h2 style="color:#ffffff;font-size:28px;margin:0 0 16px 0;line-height:1.3;">${sanitizeContent(post.title)}</h2>
          ${safeExcerpt ? `<p style="color:#a1a1aa;font-size:16px;line-height:1.6;margin-bottom:24px;">${safeExcerpt}</p>` : ''}
          <div style="color:#d4d4d8;font-size:16px;line-height:1.8;">${safeContent}</div>
        </div>
        <div style="text-align:center;margin-top:32px;">
          <a href="${postUrl}" style="display:inline-block;background-color:#D4AF37;color:#000;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Read on the Web</a>
        </div>
        <div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid #27272a;">
          <p style="color:#52525b;font-size:12px;">You received this because you subscribed to AyahGuide.</p>
          <a href="${unsubscribeUrl}" style="color:#71717a;font-size:12px;text-decoration:underline;">Unsubscribe</a>
        </div>
      </div>
    </body>
    </html>
  `
}
