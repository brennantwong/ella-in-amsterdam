import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const RECIPIENT = 'e.cachette@gmail.com';
const APP_NAME = 'Ella in Amsterdam';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const data = await req.json().catch(() => ({}));

    const name = (data?.name || '').toString().trim().slice(0, 120);
    const email = (data?.email || '').toString().trim().slice(0, 200);
    const subject = (data?.subject || '').toString().trim().slice(0, 200);
    const message = (data?.message || '').toString().trim().slice(0, 4000);

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const emailSubject = subject ? `Inquiry: ${subject}` : `Inquiry from ${name}`;
    const body = [
      `New inquiry from the ${APP_NAME} contact form.`,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject || '—'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const record = await base44.asServiceRole.entities.ContactInquiry.create({
      name,
      email,
      subject,
      message,
      emailed: false,
    });

    let emailed = false;
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: RECIPIENT,
        subject: emailSubject,
        body,
        from_name: `${APP_NAME} Contact`,
      });
      emailed = true;
      await base44.asServiceRole.entities.ContactInquiry.update(record.id, { emailed: true });
    } catch (sendError) {
      console.log(`Inquiry saved but email not delivered: ${sendError.message}`);
    }

    return Response.json({ ok: true, emailed });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}