import { CONFIG, enabledServices, pad } from '../content';
import { reveal, stagger } from '../hooks/useReveal';
import { Icon } from './Icon';
import { SectionHead } from './SectionHead';
import './Services.css';

type Props = { onRequest: (type: string) => void };

export function Services({ onRequest }: Props) {
  return (
    <section id="servicos" className="band-wrap" aria-labelledby="servicos-title">
      <div className="band">
        <div className="container section">
          <SectionHead
            num="03"
            kicker="Serviços"
            titleId="servicos-title"
            title="Do primeiro rascunho ao sistema em produção."
            lede="Atuamos onde fazemos diferença de verdade. Se o seu desafio não se encaixa exatamente em um destes formatos, conte para a gente: o escopo se ajusta ao problema."
          />
          <ul className="service-grid">
            {enabledServices.map((s, i) => (
              <li key={s.title} ref={reveal} data-reveal style={stagger(i % 3)}>
                <div className="service">
                  <div className="service__top">
                    <span className="service__icon"><Icon name={s.icon} size={22} /></span>
                    <span className="service__num">{pad(i + 1)}</span>
                  </div>
                  <h3 className="service__title">{s.title}</h3>
                  <p className="service__desc">{s.description}</p>
                  <ul className="service__benefits">
                    {s.benefits.map((b) => (
                      <li key={b}><Icon name="check" size={14} />{b}</li>
                    ))}
                  </ul>
                  <button type="button" className="btn service__cta" onClick={() => onRequest(s.title)}>
                    Solicitar informações <Icon name="arrowRight" size={16} className="btn-arrow" />
                    <span className="sr-only"> sobre {s.title}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {CONFIG.showDemoLabels && (
            <p className="config-hint">Configuração: ative ou desative cada serviço em SERVICES (campo enabled) conforme a atuação real da empresa.</p>
          )}
        </div>
      </div>
    </section>
  );
}
