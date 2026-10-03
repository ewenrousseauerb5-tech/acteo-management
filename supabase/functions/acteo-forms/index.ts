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

const siteUrl = 'https://landing.acteomanagement.com';

function emailLayout({
  preheader,
  eyebrow,
  title,
  intro,
  content = '',
  ctaLabel,
  ctaUrl,
  footerNote = 'Conseil, coaching et formation pour dirigeants et équipes.',
}: {
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  content?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  footerNote?: string;
}) {
  const button = ctaLabel && ctaUrl
    ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px">
        <tr>
          <td bgcolor="#4fb987" style="border-radius:6px">
            <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;padding:14px 22px;color:#071019;font-family:Arial,sans-serif;font-size:14px;font-weight:700;line-height:18px;text-decoration:none">${escapeHtml(ctaLabel)} &nbsp;→</a>
          </td>
        </tr>
      </table>`
    : '';

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f7f9;color:#172033">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}&#847;&zwnj;&nbsp;&#8199;&#65279;</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f7f9">
      <tr>
        <td align="center" style="padding:28px 12px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e1e7ec;border-radius:8px;overflow:hidden">
            <tr>
              <td bgcolor="#071019" style="padding:24px 38px;border-bottom:4px solid #4fb987">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="middle">
                      <img src="${siteUrl}/logo-acteo.png" width="42" height="42" alt="Acteo Management" style="display:block;width:42px;height:42px;border:0">
                    </td>
                    <td align="right" valign="middle" style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;line-height:16px;letter-spacing:1.4px;color:#ffffff">ACTEO MANAGEMENT</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:42px 38px 38px">
                <p style="margin:0 0 13px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;line-height:16px;letter-spacing:1.6px;color:#277655">${escapeHtml(eyebrow.toUpperCase())}</p>
                <h1 style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:32px;font-weight:600;line-height:38px;color:#071019;letter-spacing:0">${escapeHtml(title)}</h1>
                <p style="margin:0;font-family:Arial,sans-serif;font-size:16px;line-height:26px;color:#52606d">${escapeHtml(intro)}</p>
                ${content}
                ${button}
              </td>
            </tr>
            <tr>
              <td bgcolor="#0e1c2c" style="padding:26px 38px">
                <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;line-height:18px;color:#ffffff">${escapeHtml(footerNote)}</p>
                <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:20px;color:#aeb8c3">France · Espagne · International<br><a href="${siteUrl}" style="color:#7ed8ab;text-decoration:none">landing.acteomanagement.com</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRow(label: string, value: string) {
  return `<tr>
    <td valign="top" style="width:112px;padding:8px 16px 8px 0;border-bottom:1px solid #e1e7ec;font-family:Arial,sans-serif;font-size:12px;font-weight:700;line-height:20px;color:#667085">${escapeHtml(label).toUpperCase()}</td>
    <td valign="top" style="padding:8px 0;border-bottom:1px solid #e1e7ec;font-family:Arial,sans-serif;font-size:14px;line-height:20px;color:#172033">${escapeHtml(value)}</td>
  </tr>`;
}

function detailTable(rows: string) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:26px;border-top:1px solid #e1e7ec">${rows}</table>`;
}

function messageBlock(message: string) {
  return `<div style="margin-top:24px;padding:20px;background:#f4f7f9;border-left:3px solid #4fb987;border-radius:0 6px 6px 0">
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;line-height:16px;letter-spacing:1.2px;color:#277655">MESSAGE</p>
    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#344054">${escapeHtml(message).replaceAll('\n', '<br>')}</p>
  </div>`;
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
          text: 'Bienvenue au Brief Acteo. Votre inscription est confirmée. Vous recevrez chaque mois un point de vue court et concret sur le leadership, la performance et la transformation des organisations.',
          html: emailLayout({
            preheader: 'Votre inscription au Brief Acteo est confirmée.',
            eyebrow: 'Le Brief Acteo',
            title: 'Bienvenue dans le Brief Acteo.',
            intro: 'Votre inscription est confirmée. Une fois par mois, nous partageons une idée utile, issue du terrain, pour mieux décider et mieux faire agir.',
            content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;background:#f4f7f9;border-radius:6px">
              <tr><td style="padding:20px 22px;font-family:Arial,sans-serif;font-size:14px;line-height:23px;color:#344054"><strong style="color:#071019">Court.</strong> Un format qui va à l’essentiel.<br><strong style="color:#071019">Concret.</strong> Des repères applicables sur le terrain.<br><strong style="color:#071019">Exigeant.</strong> Sans bruit, ni recettes toutes faites.</td></tr>
            </table>`,
            ctaLabel: 'Découvrir Acteo',
            ctaUrl: siteUrl,
          }),
        }),
        sendEmail({
          from,
          to: [contactTo],
          subject: 'Nouvelle inscription au Brief Acteo',
          text: `Nouvelle inscription au Brief Acteo : ${email}`,
          html: emailLayout({
            preheader: `Nouvelle inscription : ${email}`,
            eyebrow: 'Nouvelle inscription',
            title: 'Le Brief Acteo accueille un nouvel abonné.',
            intro: 'Une nouvelle inscription vient d’être enregistrée depuis la landing.',
            content: detailTable(detailRow('Email', email)),
            ctaLabel: 'Voir la landing',
            ctaUrl: siteUrl,
          }),
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
          text: `Nouvelle demande Acteo\n\nNom : ${name}\nEmail : ${email}\nBesoin : ${service}\n\nMessage :\n${message}`,
          html: emailLayout({
            preheader: `${name} souhaite échanger au sujet de ${service}.`,
            eyebrow: 'Nouvelle demande',
            title: 'Un nouveau besoin à qualifier.',
            intro: 'Une demande vient d’arriver depuis la landing Acteo. Vous pouvez répondre directement à cet email.',
            content: detailTable([
              detailRow('Nom', name),
              detailRow('Email', email),
              detailRow('Besoin', service),
            ].join('')) + messageBlock(message),
            ctaLabel: `Répondre à ${name}`,
            ctaUrl: `mailto:${email}`,
          }),
        }),
        sendEmail({
          from,
          to: [email],
          reply_to: contactTo,
          subject: 'Nous avons bien reçu votre demande',
          text: `Bonjour ${name},\n\nMerci pour votre message. Nous l’avons bien reçu et nous revenons vers vous rapidement pour identifier le format le plus utile.\n\nVotre besoin : ${service}\n\nÀ bientôt,\nActeo Management`,
          html: emailLayout({
            preheader: 'Votre demande a bien été transmise à l’équipe Acteo.',
            eyebrow: 'Demande reçue',
            title: `Merci, ${name}.`,
            intro: 'Votre message a bien été transmis à l’équipe. Nous revenons vers vous rapidement pour comprendre votre contexte et identifier le format le plus utile.',
            content: detailTable(detailRow('Votre besoin', service)) + messageBlock(message),
            ctaLabel: 'Découvrir les formations',
            ctaUrl: `${siteUrl}/#courses`,
          }),
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
