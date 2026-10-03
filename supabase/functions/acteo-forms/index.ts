const allowedOrigins = new Set([
  'https://landing.acteomanagement.com',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
]);

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

function corsHeaders(origin: string | null) {
  return {
    'Access-Control-Allow-Origin': origin && allowedOrigins.has(origin) ? origin : 'https://landing.acteomanagement.com',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

function response(body: Record<string, unknown>, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...jsonHeaders, ...corsHeaders(origin) },
  });
}

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getSecretKey() {
  const direct = Deno.env.get('SUPABASE_SECRET_KEY');
  if (direct) return direct;

  const keys = Deno.env.get('SUPABASE_SECRET_KEYS');
  if (!keys) return '';

  try {
    return JSON.parse(keys).default ?? '';
  } catch {
    return '';
  }
}

async function insertRow(table: string, payload: Record<string, string>, mergeDuplicates = false) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const secretKey = getSecretKey();
  const query = mergeDuplicates ? '?on_conflict=email' : '';
  const result = await fetch(`${supabaseUrl}/rest/v1/${table}${query}`, {
    method: 'POST',
    headers: {
      apikey: secretKey,
      'Content-Type': 'application/json',
      Prefer: mergeDuplicates ? 'resolution=merge-duplicates,return=minimal' : 'return=minimal',
    },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    console.error('Supabase insert failed', result.status, await result.text());
    throw new Error('Database insert failed');
  }
}

async function sendEmail(payload: Record<string, unknown>) {
  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY') ?? ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!result.ok) {
    console.error('Resend delivery failed', result.status, await result.text());
    throw new Error('Email delivery failed');
  }
}

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== 'POST' || (origin && !allowedOrigins.has(origin))) {
    return response({ error: 'Not allowed' }, 405, origin);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return response({ error: 'Invalid request' }, 400, origin);
  }

  if (clean(body.website, 100)) {
    return response({ ok: true }, 200, origin);
  }

  const type = clean(body.type, 20);
  const email = clean(body.email, 254).toLowerCase();
  if (!validEmail(email)) {
    return response({ error: 'Invalid email' }, 400, origin);
  }

  const from = Deno.env.get('RESEND_FROM') ?? 'Acteo Management <d.bessot@acteomanagement.com>';
  const contactTo = Deno.env.get('CONTACT_TO') ?? 'd.bessot@acteomanagement.com';

  try {
    if (type === 'newsletter') {
      await insertRow('newsletter_subscriptions', {
        email,
        status: 'active',
        source: 'landing',
      }, true);

      await Promise.all([
        sendEmail({
          from,
          to: [email],
          subject: 'Bienvenue au Brief Acteo',
          html: '<p>Bonjour,</p><p>Votre inscription au Brief Acteo est confirmée.</p><p>Vous recevrez chaque mois un point de vue court et concret sur le leadership, la performance et la transformation des organisations.</p><p>À bientôt,<br>Acteo Management</p>',
        }),
        sendEmail({
          from,
          to: [contactTo],
          subject: 'Nouvelle inscription au Brief Acteo',
          html: `<p>Nouvelle inscription à la newsletter :</p><p><strong>${escapeHtml(email)}</strong></p>`,
        }),
      ]);

      return response({ ok: true }, 200, origin);
    }

    if (type === 'contact') {
      const name = clean(body.name, 120);
      const service = clean(body.service, 160);
      const message = clean(body.message, 4000);

      if (name.length < 2 || !service || message.length < 10) {
        return response({ error: 'Missing fields' }, 400, origin);
      }

      await insertRow('contact_submissions', {
        name,
        email,
        service,
        message,
        status: 'new',
        source: 'landing',
      });

      await Promise.all([
        sendEmail({
          from,
          to: [contactTo],
          reply_to: email,
          subject: `Nouvelle demande Acteo — ${service}`,
          html: `<p><strong>Nom :</strong> ${escapeHtml(name)}</p><p><strong>Email :</strong> ${escapeHtml(email)}</p><p><strong>Besoin :</strong> ${escapeHtml(service)}</p><p><strong>Message :</strong></p><p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>`,
        }),
        sendEmail({
          from,
          to: [email],
          reply_to: contactTo,
          subject: 'Nous avons bien reçu votre demande',
          html: `<p>Bonjour ${escapeHtml(name)},</p><p>Merci pour votre message. Nous l’avons bien reçu et nous revenons vers vous rapidement pour identifier le format le plus utile.</p><p>À bientôt,<br>Acteo Management</p>`,
        }),
      ]);

      return response({ ok: true }, 200, origin);
    }

    return response({ error: 'Unknown form' }, 400, origin);
  } catch (error) {
    console.error(error);
    return response({ error: 'Temporary failure' }, 500, origin);
  }
});
