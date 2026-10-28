/* ============================================================
   CONTEÚDO EDITÁVEL: altere aqui sem mexer no layout.
   ============================================================ */
import type { IconName } from "./components/Icon";

export const CONFIG = {
  companyName: "Connect Dreams",
  // Mostra selos "Demo" / "Provisório" e avisos de configuração.
  showDemoLabels: true,
  // Endpoint que recebe POST JSON do formulário: a Edge Function `contact` do Supabase,
  // definida em VITE_CONTACT_ENDPOINT (.env.local). Vazio = valida, mas NÃO envia e avisa.
  form: { endpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? "" },
  contacts: {
    whatsapp: "5531999632923", // apenas dígitos com DDI, ex.: '5511999999999'
    email: "contatoconnectdreams@gmail.com", // ex.: 'contato@suaempresa.com.br'
    linkedin: "https://www.linkedin.com/in/amanda-almeida-bab4541ab/", // URL completa da página da empresa
    github: "https://github.com/MandaAlmeida", // URL completa da organização
  },
  profiles: {
    // links pessoais da seção "Sobre mim"
    linkedin: "https://www.linkedin.com/in/amanda-almeida-bab4541ab/",
    github: "https://github.com/MandaAlmeida",
    portfolio: "",
  },
  privacyUrl: "", // preencha quando a política estiver publicada
};

export const CATEGORIES = [
  "Aplicações web",
  "Sistemas empresariais",
  "Aplicativos mobile",
  "Inteligência artificial",
  "APIs e back-end",
  "Automações e integrações",
  "Projetos personalizados",
] as const;

export type Project = {
  /** Também é o endereço do projeto: #/projetos/<id> */
  id: string;
  demo?: boolean;
  published?: boolean;
  category: (typeof CATEGORIES)[number];
  name: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  demoUrl: string;
  /** Texto do botão do demoUrl. Padrão: "Ver demonstração". Use "Ver site" para sites em produção. */
  demoLabel?: string;
  repoUrl: string;
  /** URL da capa. Vazio = capa tipográfica gerada. */
  cover?: string;
  /** Capturas de tela (src + descrição para leitores de tela). Vazio = blocos de exemplo. */
  gallery: { src: string; alt: string }[];
};

/** Arquivos em public/ (funciona em qualquer subpasta de hospedagem). */
const asset = (path: string) => import.meta.env.BASE_URL + path;
const GTS = "projects/gestao-contabil-crm/";
const GTW = "projects/goldtech-site/";
const ATL = "projects/atual-autopecas/";
const GAL = "projects/galeria-de-arte/";

// Para ocultar um projeto sem apagá-lo, use published: false.
export const PROJECTS: Project[] = [
  {
    id: "gestao-contabil-crm",
    published: true,
    category: "Sistemas empresariais",
    name: "Gestão para escritórios de contabilidade",
    summary:
      "CRM e ERP web que reúne clientes, mensalidades, serviços, certificados digitais, renovações e Sintegra em um só painel.",
    problem:
      "Escritórios de contabilidade acompanham clientes, cobranças, certificados digitais e obrigações fiscais em controles separados, e os vencimentos acabam passando sem aviso.",
    solution:
      "Sistema web com dashboards de clientes e financeiro, contas a pagar e receber, serviços com NF-e e NFC-e, despesas fixas, controle de validade de certificados e renovações, prazos do Sintegra, anotações e calendário de tarefas. Notificações automáticas de vencimento (inclusive push no navegador) e relatórios em PDF e Excel. Login com recuperação de senha, tema claro e escuro.",
    stack: [
      "React",
      "TypeScript",
      "Firebase",
      "Tailwind CSS",
      "shadcn/ui",
      "Recharts",
    ],
    demoUrl: "https://gestao-contabil-crm.vercel.app/",
    repoUrl: "https://github.com/MandaAlmeida/gestao-contabil-crm",
    cover: asset(GTS + "dashboard-clientes.jpg"),
    gallery: [
      {
        src: asset(GTS + "dashboard-financeiro.jpg"),
        alt: "Dashboard financeiro com total de entradas, saídas, saldo, recebimentos por tipo e pendências em atraso",
      },
      {
        src: asset(GTS + "clientes.jpg"),
        alt: "Lista de clientes com busca, filtros por responsável e data de cadastro, tipo fiscal ou gerencial e ações",
      },
      {
        src: asset(GTS + "financeiro.jpg"),
        alt: "Tela financeiro com resumo de recebidas e vencidas, filtros e cobranças com status pendente ou pago",
      },
      {
        src: asset(GTS + "servicos.jpg"),
        alt: "Tela de serviços com valores a receber, vencimentos e campos para anexar NF-e e NFC-e",
      },
      {
        src: asset(GTS + "despesas.jpg"),
        alt: "Histórico de despesas com totais pagos e vencidos, despesas fixas e status de pagamento",
      },
      {
        src: asset(GTS + "certificados.jpg"),
        alt: "Lista de certificados digitais A1 e A3 por cliente, com vencimento e status",
      },
      {
        src: asset(GTS + "renovacao.jpg"),
        alt: "Renovações de serviços com totais por status, resumo do mês e exportação em PDF e Excel",
      },
      {
        src: asset(GTS + "sintegra.jpg"),
        alt: "Obrigações do Sintegra por cliente, com prazo, acesso remoto e status",
      },
      {
        src: asset(GTS + "anotacoes.jpg"),
        alt: "Quadro de anotações em cartões coloridos",
      },
      {
        src: asset(GTS + "calendario.jpg"),
        alt: "Calendário de tarefas com a agenda do dia, horário, categoria e cliente vinculado",
      },
      {
        src: asset(GTS + "configuracoes.jpg"),
        alt: "Configurações do perfil do usuário e preferências de notificação por e-mail",
      },
    ],
  },
  {
    id: "goldtech-site",
    published: true,
    category: "Aplicações web",
    name: "Site da Gold Tech Sistemas",
    summary:
      "Landing page institucional de um ERP para varejo de Sete Lagoas, feita para apresentar o sistema e gerar pedidos de demonstração.",
    problem:
      "A Gold Tech precisava de uma presença digital que mostrasse de forma clara o que o ERP faz, para quais segmentos serve e por que confiar nele, e que transformasse visitas em contatos comerciais.",
    solution:
      "Página única com contadores de resultados, história da empresa, carrossel de segmentos atendidos, grade com os nove módulos do ERP, telas reais do sistema, depoimentos de clientes, FAQ em acordeão e formulário de contato integrado ao Formspree, além de WhatsApp flutuante. HTML, CSS e JavaScript puros, sem build, responsivo do celular ao desktop.",
    stack: ["HTML", "CSS", "JavaScript", "Formspree", "Vercel"],
    demoUrl: "https://goldtechsistemas.vercel.app/",
    demoLabel: "Ver site",
    repoUrl: "https://github.com/goldtechsistemas/Goldtechsistemas",
    cover: asset(GTW + "hero.jpg"),
    gallery: [
      {
        src: asset(GTW + "sobre.jpg"),
        alt: "Seção Nossa História com a trajetória e a proposta de valor da Gold Tech",
      },
      {
        src: asset(GTW + "nichos.jpg"),
        alt: "Carrossel de segmentos atendidos, como restaurantes, óticas, açougues e padarias",
      },
      {
        src: asset(GTW + "recursos.jpg"),
        alt: "Grade com os nove módulos do ERP: fiscal, estoque, financeiro, PDV, relatórios e outros",
      },
      {
        src: asset(GTW + "interfaces.jpg"),
        alt: "Telas reais do sistema: dashboard, frente de caixa e financeiro",
      },
      {
        src: asset(GTW + "depoimentos.jpg"),
        alt: "Depoimentos de clientes com foto, nome e empresa",
      },
      {
        src: asset(GTW + "contato.jpg"),
        alt: "Formulário de contato e canais diretos por WhatsApp, e-mail e Instagram",
      },
    ],
  },
  {
    id: "atual-autopecas",
    published: true,
    category: "Aplicações web",
    name: "Site da Atual Autopeças",
    summary:
      "Site institucional de uma rede de autopeças de Sete Lagoas, feito para levar quem pesquisa direto ao orçamento pelo WhatsApp.",
    problem:
      "Quem procura peças pela internet precisa descobrir rápido se a loja tem o que o carro precisa, se as marcas são confiáveis, onde ela fica e como pedir um orçamento sem perder tempo.",
    solution:
      "Site leve e responsivo com hero na fachada da loja, categorias de produtos que abrem o orçamento já direcionado no WhatsApp, vitrine de marcas, seção institucional com o estoque, avaliações do Google, mapa com rota até a loja e botão flutuante de contato. Publicado em domínio próprio, com Google Tag Manager para medir os contatos.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Phosphor Icons",
      "Google Maps",
      "Google Tag Manager",
    ],
    demoUrl: "https://atualautopecassetelagoas.com.br/",
    demoLabel: "Ver site",
    repoUrl: "https://github.com/MandaAlmeida/atual-autopecas",
    cover: asset(ATL + "inicio.jpg"),
    gallery: [
      {
        src: asset(ATL + "produtos.jpg"),
        alt: "Seção de produtos com seis categorias, de suspensão a acessórios, cada uma com link para consultar preço",
      },
      {
        src: asset(ATL + "marcas.jpg"),
        alt: "Vitrine de marcas parceiras e vantagens da loja, como equipe especializada e maior estoque da cidade",
      },
      {
        src: asset(ATL + "quem-somos.jpg"),
        alt: "Seção quem somos com foto do estoque, texto sobre a rede e garantias de nota fiscal e orçamento rápido",
      },
    ],
  },
  {
    id: "galeria-de-arte",
    published: true,
    category: "Aplicações web",
    name: "Galeria de Arte: Mestres da Pintura",
    summary:
      "Museu digital educativo com dez grandes pintores, do Renascimento à arte contemporânea, cada um com uma sala própria.",
    problem:
      "Conteúdo sobre história da arte costuma chegar aos estudantes como texto corrido e imagens soltas, sem a experiência de percorrer uma exposição e comparar artistas e épocas.",
    solution:
      "Site em React com uma sala por artista (biografia, linha do tempo, estilo, obras, curiosidades e legado, cada sala com paleta própria), acervo de 39 obras com filtros por artista, movimento e período, visita virtual pelas dez salas navegável pelo teclado, busca e visualização ampliada das imagens. Obras em domínio público. Desenvolvido sob encomenda para a professora Bruna Neves.",
    stack: ["React", "Vite", "JavaScript", "CSS", "Phosphor Icons"],
    demoUrl: "https://galeria-de-arte-tan.vercel.app/",
    demoLabel: "Ver site",
    repoUrl: "https://github.com/MandaAlmeida/galeria-de-arte",
    cover: asset(GAL + "inicio.jpg"),
    gallery: [
      {
        src: asset(GAL + "obras.jpg"),
        alt: "Acervo com 39 obras e filtros por título, artista, movimento e período",
      },
      {
        src: asset(GAL + "sala-artista.jpg"),
        alt: "Sala de Vincent van Gogh com ficha biográfica, retrato, obras e nota da curadoria sobre fundo inspirado na pintura",
      },
      {
        src: asset(GAL + "visita-virtual.jpg"),
        alt: "Visita virtual na sala 1 de 10, com obras emolduradas, legendas e mapa da exposição",
      },
    ],
  },
];

export type Service = {
  enabled: boolean;
  icon: IconName;
  title: string;
  description: string;
  benefits: string[];
};

// enabled: false oculta o serviço do site.
export const SERVICES: Service[] = [
  {
    enabled: true,
    icon: "code",
    title: "Sistemas web",
    description:
      "Aplicações web completas, do front-end ao banco de dados, pensadas para quem vai usá-las todos os dias.",
    benefits: [
      "Interfaces rápidas e acessíveis",
      "Arquitetura preparada para crescer",
      "Código documentado e testável",
    ],
  },
  {
    enabled: true,
    icon: "layers",
    title: "Desenvolvimento fullstack",
    description:
      "Um mesmo time cuidando da interface, das regras de negócio e da infraestrutura, com menos ruído entre as partes.",
    benefits: [
      "Decisões técnicas consistentes",
      "Entregas incrementais",
      "Menos dependência de terceiros",
    ],
  },
  {
    enabled: false,
    icon: "share",
    title: "APIs e integrações",
    description:
      "APIs bem desenhadas e integrações confiáveis entre os sistemas que o seu negócio já usa.",
    benefits: [
      "Contratos claros e documentados",
      "Tratamento de falhas e reprocessamento",
      "Segurança e autenticação adequadas",
    ],
  },
  {
    enabled: true,
    icon: "phone",
    title: "Aplicativos",
    description:
      "Aplicativos mobile para clientes ou equipes internas, conectados ao restante da sua operação.",
    benefits: [
      "Uma base de código para iOS e Android",
      "Modo offline quando necessário",
      "Publicação nas lojas",
    ],
  },
  {
    enabled: true,
    icon: "package",
    title: "Plataformas personalizadas",
    description:
      "Quando nenhum software pronto resolve, construímos a ferramenta que se encaixa no seu processo.",
    benefits: [
      "Feito para o seu fluxo real",
      "Sem licenças por usuário",
      "Evolução sob seu controle",
    ],
  },
  {
    enabled: false,
    icon: "sparkles",
    title: "Integrações com IA",
    description:
      "Uso prático de inteligência artificial para classificar, resumir, extrair dados e apoiar decisões.",
    benefits: [
      "Casos de uso com retorno claro",
      "Revisão humana onde importa",
      "Custos e privacidade sob controle",
    ],
  },
  {
    enabled: false,
    icon: "zap",
    title: "Automação de processos",
    description:
      "Tarefas repetitivas transformadas em fluxos automáticos, monitorados e fáceis de ajustar.",
    benefits: [
      "Menos trabalho manual",
      "Menos erros de digitação",
      "Histórico de cada execução",
    ],
  },
  {
    enabled: false,
    icon: "compass",
    title: "Consultoria e evolução",
    description:
      "Diagnóstico de sistemas existentes e um plano realista para modernizá-los sem parar a operação.",
    benefits: [
      "Mapa de riscos e prioridades",
      "Modernização gradual",
      "Apoio às decisões de arquitetura",
    ],
  },
  {
    enabled: false,
    icon: "wrench",
    title: "Manutenção e otimização",
    description:
      "Correção de problemas, melhoria de desempenho e atualização de dependências em sistemas em produção.",
    benefits: [
      "Diagnóstico de gargalos",
      "Atualizações seguras",
      "Acompanhamento contínuo",
    ],
  },
];

export const STEPS: {
  icon: IconName;
  title: string;
  text: string;
  output: string;
}[] = [
  {
    icon: "search",
    title: "Entendimento",
    text: "Conhecemos a necessidade, os objetivos e os desafios do cliente, e quem vai usar a solução.",
    output: "Resumo do problema e objetivos",
  },
  {
    icon: "branch",
    title: "Planejamento",
    text: "Definimos escopo, prioridades, arquitetura e estratégia de entrega.",
    output: "Escopo, cronograma e arquitetura",
  },
  {
    icon: "code",
    title: "Desenvolvimento",
    text: "Construímos a solução em ciclos curtos, com boas práticas de engenharia e revisões frequentes.",
    output: "Versões funcionais a cada ciclo",
  },
  {
    icon: "checks",
    title: "Validação",
    text: "Testamos com dados e usuários reais, corrigimos e refinamos a aplicação.",
    output: "Testes e ajustes aprovados",
  },
  {
    icon: "rocket",
    title: "Entrega e evolução",
    text: "Publicamos a solução, acompanhamos o uso e planejamos melhorias quando necessário.",
    output: "Sistema em produção e documentação",
  },
];

// placeholder: true = texto provisório a ser substituído. draft: true = sugestão para revisar.
export const ABOUT: {
  title: string;
  placeholder?: boolean;
  draft?: boolean;
  text: string;
}[] = [
  {
    title: "Nossa história",
    text: "A Connect Dreams nasceu em 2025, em Sete Lagoas (MG), fundada por Amanda Almeida. Nosso primeiro desafio foi ajudar a Gold Tech Sistemas a organizar a gestão de clientes: saímos das planilhas de Excel e criamos um sistema de gestão completo, feito sob medida para o jeito deles de trabalhar.",
  },
  {
    title: "Como surgiu a ideia",
    text: "A Connect Dreams surgiu do sonho de melhorar o dia a dia das pessoas no trabalho. Vimos que muitas empresas perdiam tempo com processos manuais e tinham dificuldade de entrar no mercado digital, e decidimos ajudar a mudar isso.",
  },
  {
    title: "Propósito e missão",
    text: "Conectar seus sonhos ao mundo. Transformamos ideias em soluções digitais que simplificam processos, colocam empresas no mercado digital e impulsionam o crescimento dos negócios.",
  },
  {
    title: "Visão de futuro",
    text: "Ser referência em soluções digitais sob medida em Minas Gerais e além, reconhecida por ajudar pequenas e médias empresas a crescer com tecnologia feita do jeito delas.",
  },
  {
    title: "Valores",
    text: "Proximidade com o cliente, soluções feitas sob medida, transparência nas decisões, responsabilidade com o que entregamos e compromisso com a evolução de cada negócio.",
  },
  {
    title: "Diferenciais",
    text: "Não entregamos sistemas prontos e genéricos: cada solução é construída a partir da forma como sua empresa já trabalha. Acompanhamos de perto, desde a ideia até o sistema funcionando, com atendimento próximo e direto.",
  },
  {
    title: "Nosso compromisso",
    text: "Qualidade de código, segurança dos dados, desempenho em produção e inovação com propósito, não como enfeite.",
  },
];

export const FOUNDER = {
  name: "[Seu nome]",
  role: "[Cargo, ex.: fundador e responsável técnico]",
  bio: "[Apresente-se em duas ou três frases: quem você é, o que te levou ao desenvolvimento de software e que tipo de problema você mais gosta de resolver.]",
  quote:
    "[Sua filosofia de trabalho em uma frase: o princípio que guia como você constrói software.]",
  photo: "", // URL da foto. Vazio = bloco com iniciais.
  placeholder: true,
};

export const ME = [
  {
    title: "Formação",
    text: "[Curso, instituição e período. Inclua especializações e certificações reais, se houver.]",
  },
  {
    title: "Experiência",
    text: "[Principais experiências profissionais e o tipo de sistema em que você trabalhou.]",
  },
  {
    title: "Especialidades",
    text: "[Ex.: desenvolvimento fullstack, APIs, bancos de dados, cloud, IA aplicada. Mantenha apenas o que se aplica.]",
  },
  {
    title: "Como eu trabalho",
    text: "[Como você conduz um projeto: comunicação, prioridades, qualidade e acompanhamento.]",
  },
];

export const MY_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Azure",
];

export const BUDGETS = [
  "Até R$ 2 mil",
  "R$ 2 mil a R$ 5 mil",
  "R$ 5 mil a R$ 10 mil",
  "R$ 10 mil a R$ 30 mil",
  "R$ 30 mil a R$ 80 mil",
  "Acima de R$ 80 mil",
  "Ainda não sei",
];

export const CONTACT_PREFS = ["E-mail", "WhatsApp", "Ligação"] as const;

export const NAV = [
  { id: "inicio", label: "Início" },
  { id: "projetos", label: "Projetos" },
  { id: "servicos", label: "Serviços" },
  { id: "sobre", label: "Sobre nós" },
  // { id: 'sobre-mim', label: 'Sobre mim' }, // seção desativada por enquanto (ver App.tsx)
  { id: "contato", label: "Contato" },
];

/* ============================================================ */

export const publishedProjects = PROJECTS.filter((p) => p.published !== false);
export const enabledServices = SERVICES.filter((s) => s.enabled);
export const projectTypes = [
  ...CATEGORIES,
  ...enabledServices
    .map((s) => s.title)
    .filter((t) => !(CATEGORIES as readonly string[]).includes(t)),
  "Outro",
];
export const pad = (n: number) => String(n).padStart(2, "0");
