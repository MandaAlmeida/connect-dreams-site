import { useEffect, useState } from 'react';
import { enabledServices, pad } from '../content';
import { reveal, stagger } from '../hooks/useReveal';
import { Icon } from './Icon';
import './Hero.css';

const LOG: [string, string][] = [
  ['✓', 'lint ·················· ok'], ['✓', 'testes unitários ······ ok'], ['✓', 'testes de integração ·· ok'],
  ['✓', 'build de produção ····· ok'], ['›', 'migração do banco ····· ok'], ['›', 'deploy · homologação ·· ok'],
  ['✓', 'verificação de saúde ·· ok'], ['›', 'deploy · produção ····· ok'],
];
const PIPE = ['Código', 'Testes', 'Build', 'Deploy'];

function useTick(ms: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let id: number | undefined;
    const start = () => { id = window.setInterval(() => setTick((t) => t + 1), ms); };
    const stop = () => window.clearInterval(id);
    // Pause while the tab is hidden.
    const onVis = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener('visibilitychange', onVis);
    return () => { stop(); document.removeEventListener('visibilitychange', onVis); };
  }, [ms]);
  return tick;
}

export function Hero() {
  const tick = useTick(1400);
  const stage = tick % (PIPE.length + 1);
  const progress = Math.min(stage / PIPE.length, 1);
  const lines = [2, 1, 0].map((k) => ({ k, line: LOG[(tick - k + LOG.length * 10) % LOG.length] }));

  return (
    <section id="inicio" className="hero container" aria-labelledby="hero-title">
      <p className="hero__eyebrow rise">
        <span className="hero__dot" aria-hidden="true" /> Software sob medida
      </p>
      <h1 id="hero-title" className="hero__title rise rise-2">
        Transformamos ideias em soluções digitais que impulsionam <em>negócios.</em>
      </h1>
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="hero__lede rise rise-3">
            Partimos do problema real do seu negócio, não da tecnologia da moda. Entendemos o contexto, desenhamos a
            arquitetura certa e construímos software que funciona, escala e continua fácil de evoluir.
          </p>
          <div className="hero__actions rise rise-4">
            <a href="#contato" className="btn btn-primary btn-lg">
              Vamos conversar <Icon name="arrowRight" size={18} className="btn-arrow" />
            </a>
            <a href="#projetos" className="btn btn-secondary btn-lg">Conheça nossos projetos</a>
          </div>
        </div>

        <figure className="terminal rise rise-3" aria-label="Ilustração do fluxo de entrega: código, testes, build e deploy">
          <div className="terminal__bar" aria-hidden="true">
            <span className="terminal__dots"><i /><i /><i /></span>
            <span className="terminal__path">projeto / api</span>
            <span className="terminal__branch"><Icon name="branch" size={13} /> main</span>
          </div>
          <div className="terminal__body" aria-hidden="true">
            <pre className="terminal__code">
              <span className="k">export async function</span> criarPedido(req) {'{'}
              {'\n  '}<span className="c">// 1. valida a entrada</span>
              {'\n  '}const dados = Pedido.parse(req.body)
              {'\n  '}<span className="c">// 2. regra de negócio</span>
              {'\n  '}const total = calcular(dados.itens)
              {'\n  '}<span className="c">// 3. persiste e notifica</span>
              {'\n  '}const pedido = await db.pedidos
              {'\n    '}.create({'{'} ...dados, total {'}'})
              {'\n  '}await fila.publicar(pedido)
              {'\n  '}<span className="k">return</span> pedido
              {'\n}'}
            </pre>
            <div className="terminal__side">
              <p className="terminal__pipe-head">Pipeline</p>
              <div className="terminal__progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
              <ol className="terminal__pipe">
                {PIPE.map((label, i) => {
                  const state = i < stage ? 'done' : i === stage ? 'running' : 'queued';
                  return (
                    <li key={label} className={'step step--' + state}>
                      <span className="step__dot">{state === 'done' && <Icon name="check" size={10} />}</span>
                      <span className="step__label">{label}</span>
                      <span className="step__status">{state === 'done' ? 'ok' : state === 'running' ? 'rodando' : 'na fila'}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="terminal__log" aria-hidden="true">
            {lines.map(({ k, line }) => (
              <div key={tick - k} className={'log log--' + k}>
                <span className="log__mark">{line[0]}</span>
                <span>{line[1]}</span>
              </div>
            ))}
          </div>
        </figure>
      </div>

      <ul className="hero__services">
        {enabledServices.slice(0, 4).map((s, i) => (
          <li key={s.title} ref={reveal} data-reveal style={stagger(i)}>
            <a href="#servicos" className="hero-service">
              <span className="hero-service__icon"><Icon name={s.icon} size={22} /></span>
              <span className="hero-service__title">{s.title}</span>
              <span className="hero-service__num">{pad(i + 1)}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
