# Supabase: formulário de contato

```
site (React) ──POST JSON──▶ Edge Function `contact` ──insert──▶ public.contact_messages
                                    └──────────── e-mail de aviso ──▶ Resend ──▶ você
```

- [migrations/20261027000000_contact_messages.sql](migrations/20261027000000_contact_messages.sql): tabela com RLS ativo e
  nenhuma policy (só a função, com service role, lê e grava).
- [functions/contact/index.ts](functions/contact/index.ts): valida (mesmas regras do site), ignora bots (honeypot),
  limita 5 envios por IP a cada 10 min, grava e envia o aviso. Se o e-mail falhar, a mensagem continua salva
  (`email_notified = false`).

## Deploy

```bash
# 1. Projeto (a senha do banco está em .env.supabase.local)
supabase projects create connect-dreams --org-id <ORG_ID> --region sa-east-1 --db-password "$SUPABASE_DB_PASSWORD"
supabase link --project-ref <PROJECT_REF>

# 2. Tabela e função
supabase db push
supabase functions deploy contact --no-verify-jwt

# 3. E-mail (crie a chave em resend.com > API Keys)
supabase secrets set RESEND_API_KEY=re_xxx CONTACT_TO_EMAIL=voce@exemplo.com
# opcional, depois de verificar um domínio no Resend:
supabase secrets set RESEND_FROM="Connect Dreams <contato@seudominio.com.br>"
# opcional, restringe quem pode chamar a função:
supabase secrets set ALLOWED_ORIGINS=https://seudominio.com.br,http://localhost:5173

# 4. Site
echo "VITE_CONTACT_ENDPOINT=https://<PROJECT_REF>.supabase.co/functions/v1/contact" > .env.local
```

Sem domínio verificado, o Resend só entrega para o e-mail da própria conta Resend: use esse endereço em `CONTACT_TO_EMAIL`.

## Ler as mensagens

Painel do Supabase > Table Editor > `contact_messages`. Mude `status` para `respondido` ou `arquivado` conforme for atendendo.
