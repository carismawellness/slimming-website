import { NextResponse } from 'next/server';

/**
 * Native Slimming quiz → GoHighLevel lead (Carisma Slimming sub-account).
 *
 * Receives the full quiz answers + contact details from components/quiz/SlimmingQuiz
 * and creates-or-updates the contact in GHL via /contacts/upsert (matches on
 * email/phone, so returning leads update instead of failing on duplicates), then
 * attaches a note with the full breakdown.
 *
 * Requires env var:
 *   GHL_API_KEY — Private Integration Token for the Carisma Slimming sub-account.
 */

const GHL_API_URL = 'https://services.leadconnectorhq.com';
const GHL_LOCATION_ID = 'imWIWDcnmOfijW0lltPq';

// Custom fields in the Carisma Slimming sub-account.
const GHL_CUSTOM_FIELDS = {
  goals: '8nZxyaAMzd1eKMwv7Aa3',
  problemAreas: '48Iwqxn55gjBfGWqBx7D',
  referralSource: 'bqaVYgeCsodjVHdZVMo0',
  consultation: '6FZDpYVVy74Qdg2U7U7s',
};

type LeadBody = {
  firstName?: string;
  surname?: string;
  email?: string;
  phone?: string;
  goals?: string[];
  areas?: string[];
  timeline?: string;
  medication?: string;
  previousAttempts?: string;
  referral?: string;
  consultation?: string;
};

const validEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const firstName = (body.firstName || '').trim();
  const surname = (body.surname || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();

  if (!firstName || !surname || !validEmail(email) || phone.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ ok: false, error: 'Please provide your name, a valid email and phone number.' }, { status: 400 });
  }

  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) {
    console.error('[quiz-lead] GHL_API_KEY is not set — cannot save lead to GoHighLevel.');
    // Don't fail the user's results experience; report a soft error.
    return NextResponse.json({ ok: false, error: 'Lead capture is temporarily unavailable.' }, { status: 503 });
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
  };

  const goals = (body.goals || []).join(', ');
  const problemAreas = (body.areas || []).join(', ');
  const timeline = body.timeline || '';
  const medication = body.medication || '';
  const previousAttempts = body.previousAttempts || '';
  const referral = body.referral || '';
  const consultation = body.consultation || '';

  const contactPayload = {
    locationId: GHL_LOCATION_ID,
    firstName,
    lastName: surname,
    email,
    phone,
    source: 'Slimming Quiz (Website)',
    tags: [
      'slimming-quiz-lead',
      `timeline:${timeline}`,
      `medication:${medication}`,
      `consultation:${consultation}`,
      `heard-via:${referral}`,
    ],
    customFields: [
      { id: GHL_CUSTOM_FIELDS.goals, value: goals },
      { id: GHL_CUSTOM_FIELDS.problemAreas, value: problemAreas },
      { id: GHL_CUSTOM_FIELDS.referralSource, value: referral },
      { id: GHL_CUSTOM_FIELDS.consultation, value: consultation },
    ],
  };

  // Create or update in a single call. If the full payload is rejected (e.g. a
  // custom-field issue) fall back to the bare contact so we never lose a way to
  // reach the lead.
  const upsert = async (payload: object) => {
    const r = await fetch(`${GHL_API_URL}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    return r.json().catch(() => null);
  };

  try {
    let result = await upsert(contactPayload);
    let contactId: string | null = result?.contact?.id || null;

    if (!contactId) {
      result = await upsert({
        locationId: GHL_LOCATION_ID,
        firstName,
        lastName: surname,
        email,
        phone,
        source: 'Slimming Quiz (Website)',
        tags: ['slimming-quiz-lead'],
      });
      contactId = result?.contact?.id || null;
    }

    if (!contactId) {
      console.error('[quiz-lead] GHL upsert returned no contactId:', JSON.stringify(result));
      return NextResponse.json({ ok: false, error: 'Failed to save lead.' }, { status: 502 });
    }

    // Full breakdown as a note.
    const noteBody = [
      '--- Slimming Quiz Lead (Website) ---',
      `Goals: ${goals}`,
      `Problem Areas: ${problemAreas}`,
      `Timeline: ${timeline}`,
      `Open to Medication: ${medication}`,
      `Previous Attempts: ${previousAttempts}`,
      `Where They Heard About Us: ${referral}`,
      `Consultation Type: ${consultation}`,
    ].join('\n');

    await fetch(`${GHL_API_URL}/contacts/${contactId}/notes/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ body: noteBody }),
    }).catch(() => null);

    return NextResponse.json({ ok: true, contactId });
  } catch (err) {
    console.error('[quiz-lead] GHL request error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to save lead.' }, { status: 502 });
  }
}
