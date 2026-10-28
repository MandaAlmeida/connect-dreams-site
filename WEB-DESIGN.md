# WEB-DESIGN.md: Connect Dreams

Fonte da verdade de design. Leia antes de qualquer decisão de UI; atualize quando algo mudar.

## Site Read

```
SITE READ: site institucional de software house para donos de negócio e gestores,
linguagem moderna e acolhedora (formas arredondadas, cor por categoria, movimento suave),
leaning Vite + React + TS + CSS tokens.
devices: mobile first-class · desktop first-class
posture: content-site (one-page com seções âncora + detalhe de projeto em diálogo com URL)
```

## Dials

`DESIGN_EXPRESSION 7 · MOTION_INTENSITY 6 · VISUAL_DENSITY 4`

- **Elemento-assinatura:** o terminal animado no hero (janela escura, pipeline com barra de progresso, log rolando).
- **Ritmo da página:** seções claras alternadas com duas faixas arredondadas de cor cheia: Serviços (escura) e Contato (accent).
- **Movimento:** entrada do hero; revelação suave (uma vez) de títulos e cards ao rolar, em cascata; hover com elevação
  e microgiros (setas, ícones, marca). Tudo desliga com `prefers-reduced-motion`.

## Design System

Tokens em [src/styles/tokens.css](src/styles/tokens.css). Os componentes leem apenas esses tokens.

| Papel | Claro | Escuro |
|---|---|---|
| `--bg` | `#f7f5f2` | `#121110` |
| `--card` | `#ffffff` | `#1b1917` |
| `--text` | `#1a1816` | `#f1eee9` |
| `--accent` | `#c8331a` (texto branco: 5.3:1) | `#ff6b4a` (texto escuro: 6.7:1) |
| `--ink-bg` (faixa escura, terminal) | `#161412` | `#1c1a18` |

- **Cores por categoria** (`--h-1` … `--h-7`: coral, âmbar, sálvia, lilás, céu, verde-água, rosa) pintam capas, filtros e
  selos de projeto. Tinta sobre o fundo tingido passa 4.5:1 nos dois temas.
- **Forma:** `--radius-sm 10` · `--radius 16` · `--radius-lg 24` · `--radius-xl 24–40` · botões, chips e tags em pílula.
  Marcadores são círculos; não há quadrados decorativos.
- **Tipografia:** Archivo Variable. Corpo 400, ênfase 600, display 750. Títulos com tracking negativo forte (-0.035 a -0.04em).
- **Elevação:** `--shadow-1/2/3` suaves + `--shadow-accent` (brilho no terminal e no botão primário em hover).
- **Movimento:** `--ease-out` para entradas, `--ease-spring` para microinterações; revelação em [src/hooks/useReveal.ts](src/hooks/useReveal.ts).
- **Marca:** dois círculos que se cruzam ([src/components/BrandMark.tsx](src/components/BrandMark.tsx)).
- **Ícones:** uma família (Lucide, traço 2px), em [src/components/Icon.tsx](src/components/Icon.tsx).

### RISK register

```
RISK: accent vermelhão próprio no lugar do azul #2563eb (Tailwind blue-600)
gain: identidade distinta e calorosa
cost: muda a cor da marca; para voltar, troque --accent / --accent-hover / --accent-ink em tokens.css

RISK: sete cores de categoria além do accent
gain: vida e variedade nos projetos, e a cor carrega informação (a categoria)
cost: só podem ser usadas para categoria; fora disso a regra continua sendo um accent

RISK: único gradiente do site na palavra "negócios." do título
gain: ponto focal no hero
cost: nenhum outro gradiente decorativo deve ser adicionado (as linhas tracejadas do processo são funcionais)
```

## Nav Read

```
NAV READ
devices: mobile first-class · desktop first-class
primary nav (5 + marca): Projetos · Serviços · Sobre nós · Sobre mim · Contato   (marca → #inicio)
pattern: desktop cabeçalho em pílula flutuante (encolhe e ganha vidro ao rolar) · mobile (<960px) botão → painel suspenso
routes:
  /#inicio #projetos #servicos #processo #sobre #sobre-mim #contato   seções (âncoras inalteradas)
  /#/projetos/<id>                                                     diálogo de detalhe do projeto
overlays: project-detail (dialog nativo, com URL)
url state: ?categoria=<slug> (filtro de projetos) · #/projetos/<id>
entry points: detalhe ← card do projeto · formulário pré-preenchido ← "Solicitar informações" / "Vamos conversar"
back behavior: Voltar fecha o diálogo; link direto para um projeto abre o diálogo e, ao fechar, mostra a lista
max clicks to any core view: 1
```

Breakpoints: 400px (marca menor), 520px (terminal empilha), 720px (rodapé), 880px (Sobre nós deixa de ser sticky),
960px (nav desktop), 1024px (linha do tempo passa a horizontal).

## Conteúdo

Todo o conteúdo editável está em [src/content.ts](src/content.ts): `CONFIG` (contatos, endpoint do formulário,
`showDemoLabels`), `PROJECTS` (com `cover` e `gallery` opcionais), `SERVICES`, `STEPS`, `ABOUT`, `FOUNDER`, `ME`, `MY_STACK`.
Com `showDemoLabels: false`, selos "Demo/Provisório" e canais não configurados deixam de aparecer para visitantes.
