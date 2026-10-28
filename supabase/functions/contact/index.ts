// Edge Function `contact`: recebe o formulário do site, valida, grava em contact_messages
// e avisa por e-mail (Resend). Deploy com --no-verify-jwt: o site chama sem chave.
//
// Secrets (supabase secrets set ...):
//   RESEND_API_KEY     chave da API do Resend (sem ela a mensagem é salva, mas nenhum e-mail sai)
//   CONTACT_TO_EMAIL   quem recebe o aviso (o e-mail da sua conta Resend, enquanto não houver domínio verificado)
//   RESEND_FROM        remetente, ex.: "Connect Dreams <contato@seudominio.com.br>" (padrão: onboarding@resend.dev)
//   ALLOWED_ORIGINS    origens permitidas, separadas por vírgula (padrão: qualquer origem)
//   IP_HASH_SALT       salt para o hash do IP (opcional)
import { createClient } from 'npm:@supabase/supabase-js@2.118.0';

const PREFS = ['E-mail', 'WhatsApp', 'Ligação'];
const MAX_BODY = 16_000;
const RATE_WINDOW_MIN = 10;
const RATE_MAX = 5;

type Payload = {
  name?: unknown; email?: unknown; company?: unknown; phone?: unknown; projectType?: unknown;
  budget?: unknown; message?: unknown; contactPreference?: unknown; website?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// Same rules as src/hooks/useContactForm.ts (validate).
function validate(p: Payload) {
  const f = {
    name: str(p.name, 120), email: str(p.email, 160), company: str(p.company, 120), phone: str(p.phone, 30),
    projectType: str(p.projectType, 80), budget: str(p.budget, 60), message: str(p.message, 4000),
    contactPreference: str(p.contactPreference, 20),
  };
  const errors: Record<string, string> = {};
  if (f.name.length < 2) errors.name = 'Informe seu nome.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) errors.email = 'E-mail inválido.';
  const digits = f.phone.replace(/\D/g, '');
  if (f.phone && (digits.length < 10 || digits.length > 13)) errors.phone = 'Telefone inválido.';
  if (!f.projectType) errors.projectType = 'Selecione o tipo de projeto.';
  if (f.message.length < 20) errors.message = 'Mensagem muito curta.';
  if (!PREFS.includes(f.contactPreference)) errors.contactPreference = 'Forma de contato inválida.';
  else if (f.contactPreference !== 'E-mail' && !digits) errors.phone = 'Informe um telefone.';
  return { f, errors };
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = (Deno.env.get('ALLOWED_ORIGINS') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const allow = allowed.length === 0 ? '*' : origin && allowed.includes(origin) ? origin : allowed[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, accept',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

async function sha256(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

async function notify(f: ReturnType<typeof validate>['f'], id: string) {
  const key = Deno.env.get('RESEND_API_KEY');
  const to = Deno.env.get('CONTACT_TO_EMAIL');
  if (!key || !to) {
    console.warn('contact: RESEND_API_KEY ou CONTACT_TO_EMAIL ausente; e-mail não enviado', { id });
    return false;
  }
  const rows: [string, string][] = [
    ['Nome', f.name], ['E-mail', f.email], ['Empresa', f.company || '-'], ['Telefone', f.phone || '-'],
    ['Tipo de projeto', f.projectType], ['Orçamento', f.budget || 'Não informado'], ['Prefere contato por', f.contactPreference],
  ];
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#1a1816">
      <h2 style="margin:0 0 16px">Novo contato pelo site</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b6762;white-space:nowrap">${k}</td><td style="padding:6px 0">${esc(v)}</td></tr>`).join('')}
      </table>
      <p style="margin:20px 0 6px;color:#6b6762;font-size:14px">Mensagem</p>
      <p style="margin:0;padding:14px 16px;background:#f4f2ee;border-radius:12px;white-space:pre-wrap;font-size:15px;line-height:1.55">${esc(f.message)}</p>
      <p style="margin:20px 0 0;color:#6b6762;font-size:12px">Responda este e-mail para falar direto com ${esc(f.name)}. ID: ${id}</p>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMensagem:\n${f.message}\n\nID: ${id}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: Deno.env.get('RESEND_FROM') ?? 'Connect Dreams <onboarding@resend.dev>',
      to: to.split(',').map((s) => s.trim()),
      reply_to: f.email,
      subject: `Novo contato: ${f.name} (${f.projectType})`,
      html,
      text,
    }),
  });
  if (!res.ok) {
    console.error('contact: Resend falhou', res.status, await res.text());
    return false;
  }
  return true;
}

Deno.serve(async (req) => {
  const cors = corsHeaders(req.headers.get('origin'));
  const json = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return json(405, { ok: false, error: 'Método não permitido.' });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, error: 'Mensagem grande demais.' });
  let payload: Payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: 'JSON inválido.' });
  }

  // Honeypot: bots preenchem o campo escondido. Finge sucesso e não grava nada.
  if (str(payload.website, 200)) return json(200, { ok: true });

  const { f, errors } = validate(payload);
  if (Object.keys(errors).length) return json(422, { ok: false, error: 'Dados inválidos.', fields: errors });

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
    auth: { persistSession: false },
  });

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
  const ipHash = ip ? await sha256(ip + (Deno.env.get('IP_HASH_SALT') ?? 'connect-dreams')) : null;

  if (ipHash) {
    const since = new Date(Date.now() - RATE_WINDOW_MIN * 60_000).toISOString();
    const { count } = await supabase
      .from('contact_messages')
      .select('id', { count: 'exact', head: true })
      .eq('ip_hash', ipHash)
      .gte('created_at', since);
    if ((count ?? 0) >= RATE_MAX) {
      return json(429, { ok: false, error: 'Muitas mensagens em pouco tempo. Tente novamente em alguns minutos.' });
    }
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      name: f.name, email: f.email, company: f.company || null, phone: f.phone || null,
      project_type: f.projectType, budget: f.budget || null, message: f.message,
      contact_preference: f.contactPreference, ip_hash: ipHash,
      user_agent: (req.headers.get('user-agent') ?? '').slice(0, 400) || null,
    })
    .select('id')
    .single();
  if (error || !data) {
    console.error('contact: insert falhou', error);
    return json(500, { ok: false, error: 'Não foi possível salvar a mensagem.' });
  }

  // The message is already saved: an e-mail failure is logged, never shown as an error to the visitor.
  try {
    if (await notify(f, data.id)) {
      await supabase.from('contact_messages').update({ email_notified: true }).eq('id', data.id);
    }
  } catch (e) {
    console.error('contact: erro ao notificar', e);
  }

  return json(200, { ok: true, id: data.id });
});
