# Connect Dreams

Site institucional da **Connect Dreams**, empresa de desenvolvimento de software sob medida de Sete Lagoas (MG):
sistemas web, APIs, aplicativos, integrações com IA e automação de processos.

O site apresenta serviços, processo de trabalho, a empresa e um portfólio de projetos reais, e recebe pedidos de
contato por um formulário que grava no Supabase e avisa por e-mail.

## Tecnologias

- **React 18 + TypeScript + Vite**
- **CSS com design tokens** (variáveis CSS em `src/styles/tokens.css`, tema claro e escuro)
- **Supabase**: tabela `contact_messages` e Edge Function `contact` (validação, limite de envios, aviso por e-mail via Resend)
- Fonte Archivo (Fontsource) e ícones Lucide

## Funcionalidades

- Portfólio com filtro por categoria (na URL: `?categoria=`) e detalhe de cada projeto com URL própria (`#/projetos/<id>`)
- Tema claro/escuro que segue o sistema e lembra a escolha
- Formulário de contato com validação no navegador e no servidor, proteção contra bots e mensagens de erro claras
- Acessível por teclado (link para pular ao conteúdo, foco visível, diálogo nativo) e responsivo do celular ao desktop
- Animações suaves que respeitam a preferência de "reduzir movimento"

## Como rodar

```bash
npm install
cp .env.example .env.local   # preencha VITE_CONTACT_ENDPOINT
npm run dev                  # http://localhost:5173
npm run build                # gera dist/
```

Sem `VITE_CONTACT_ENDPOINT`, o formulário valida mas não envia, e avisa que o envio não está configurado.

## Editar o conteúdo

Todo o texto do site (contatos, projetos, serviços, etapas, "Sobre nós") fica em [`src/content.ts`](src/content.ts).
As imagens dos projetos ficam em `public/projects/<projeto>/`.

## Formulário de contato (Supabase)

Migração, função e passos de deploy estão em [`supabase/README.md`](supabase/README.md).

## Design

As decisões de design (tokens, cores, tipografia, navegação) estão documentadas em [`WEB-DESIGN.md`](WEB-DESIGN.md).
