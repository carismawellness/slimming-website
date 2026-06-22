import { NextResponse } from 'next/server';

/**
 * Slimming Guide order enquiry → email to the clinic.
 *
 * Receives the popup order form (name, email, phone, optional message), and
 * emails info@carismaslimming.com so the team can contact the customer and take
 * payment for the €30 guide. Uses the Resend HTTP API directly (no SDK dep).
 *
 * Requires env vars:
 *   RESEND_API_KEY        — Resend API key (Vercel env)
 *   ORDER_FROM (optional) — verified sender, defaults to guide@carismaslimming.com
 *                           (the carismaslimming.com domain must be verified in Resend)
 */

const TO = 'info@carismaslimming.com';
const FROM = process.env.ORDER_FROM || 'Carisma Slimming <guide@carismaslimming.com>';

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

export async function POST(req: Request) {
  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const message = (body.message || '').trim();

  // Minimal validation.
  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || phone.replace(/\D/g, '').length < 6) {
    return NextResponse.json({ ok: false, error: 'Please enter your name, a valid email and phone number.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[order-guide] RESEND_API_KEY is not set — cannot send order email.');
    return NextResponse.json({ ok: false, error: 'Ordering is temporarily unavailable. Please call us on +356 27802062.' }, { status: 503 });
  }

  const html = `
    <h2 style="font-family:sans-serif;color:#024C27">New Slimming Guide order enquiry</h2>
    <p style="font-family:sans-serif;color:#333">A customer wants to buy the Carisma Slimming Guide (€30). Please contact them to arrange payment and delivery.</p>
    <table style="font-family:sans-serif;color:#333;font-size:15px;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
      ${message ? `<tr><td style="padding:4px 12px 4px 0;vertical-align:top"><strong>Message</strong></td><td>${escapeHtml(message)}</td></tr>` : ''}
    </table>
    <p style="font-family:sans-serif;color:#777;font-size:12px">Sent from the carismaslimming.com Slimming Guide order form.</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `New Slimming Guide order — ${name}`,
        html,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[order-guide] Resend send failed:', res.status, detail);
      return NextResponse.json({ ok: false, error: 'Something went wrong sending your request. Please try again or call us.' }, { status: 502 });
    }
  } catch (err) {
    console.error('[order-guide] Resend request error:', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again or call us.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
