-- Mensagens do formulário de contato do site.
-- RLS ligado e nenhuma policy: só a Edge Function `contact` (service role) lê e grava.

create table public.contact_messages (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  name               text not null check (char_length(name) between 2 and 120),
  email              text not null check (char_length(email) between 3 and 160),
  company            text check (char_length(company) <= 120),
  phone              text check (char_length(phone) <= 30),
  project_type       text not null check (char_length(project_type) <= 80),
  budget             text check (char_length(budget) <= 60),
  message            text not null check (char_length(message) between 20 and 4000),
  contact_preference text not null check (contact_preference in ('E-mail', 'WhatsApp', 'Ligação')),
  status             text not null default 'novo' check (status in ('novo', 'respondido', 'arquivado')),
  email_notified     boolean not null default false,
  ip_hash            text,
  user_agent         text check (char_length(user_agent) <= 400)
);

comment on table public.contact_messages is 'Contatos enviados pelo site (formulário da seção Contato).';
comment on column public.contact_messages.status is 'Fluxo manual: novo -> respondido -> arquivado.';
comment on column public.contact_messages.ip_hash is 'SHA-256 do IP com salt, usado só para limitar envios repetidos.';

alter table public.contact_messages enable row level security;

create index contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index contact_messages_ip_hash_idx on public.contact_messages (ip_hash, created_at desc);
