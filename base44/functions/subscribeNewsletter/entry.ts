const MAILCHIMP_HOST = 'https://cachettegroup.us8.list-manage.com';
const MAILCHIMP_U = '14bb0aad703a768aa9ca92853';
const MAILCHIMP_ID = 'be7a2bde96';

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default async function (req) {
  try {
    const data = await req.json().catch(() => ({}));
    const email = (data?.email || '').toString().trim().slice(0, 200);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const body = new URLSearchParams({
      u: MAILCHIMP_U,
      id: MAILCHIMP_ID,
      EMAIL: email,
      [`b_${MAILCHIMP_U}_${MAILCHIMP_ID}`]: '',
    });

    const res = await fetch(`${MAILCHIMP_HOST}/subscribe/post?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Referer: 'https://ellainamsterdam.com/',
        Origin: 'https://ellainamsterdam.com',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      body: body.toString(),
      signal: AbortSignal.timeout(15000),
    });

    const text = htmlToText(await res.text());

    if (/thank you for subscribing|has been confirmed|almost finished/i.test(text)) {
      return Response.json({ ok: true });
    }
    if (/already subscribed/i.test(text)) {
      return Response.json({ ok: true, alreadySubscribed: true });
    }
    if (/fake or invalid|errors below|looks fake/i.test(text)) {
      return Response.json({ ok: false, error: 'Please enter a valid email address.' });
    }

    console.log(`Unexpected Mailchimp response: ${text.slice(0, 300)}`);
    return Response.json({ ok: false, error: 'Signup is temporarily unavailable. Please try again.' });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}