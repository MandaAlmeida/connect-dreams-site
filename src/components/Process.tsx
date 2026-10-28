import { STEPS, pad } from '../content';
import { reveal, stagger } from '../hooks/useReveal';
import { Icon } from './Icon';
import './Process.css';

export function Process() {
  return (
    <section id="processo" className="section container" aria-labelledby="processo-title">
      <div className="process-head" ref={reveal} data-reveal>
        <p className="kicker"><span>04</span><span>Como trabalhamos</span></p>
        <h2 id="processo-title" className="section-title">Cinco etapas. Nenhuma surpresa.</h2>
      </div>
      <ol className="timeline">
        {STEPS.map((s, i) => (
          <li key={s.title} className="timeline__item" ref={reveal} data-reveal style={stagger(i)}>
            <div className="timeline__node" aria-hidden="true">
              <span className="timeline__num">{pad(i + 1)}</span>
            </div>
            <div className="timeline__card">
              <span className="timeline__icon"><Icon name={s.icon} size={20} /></span>
              <h3 className="timeline__title">{s.title}</h3>
              <p className="timeline__text">{s.text}</p>
              <p className="timeline__output">
                <span className="label label-accent">Você recebe</span>
                {s.output}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
