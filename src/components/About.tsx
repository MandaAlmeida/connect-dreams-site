import { ABOUT, CONFIG } from '../content';
import { reveal, stagger } from '../hooks/useReveal';
import './About.css';

export function About() {
  return (
    <section id="sobre" className="section container" aria-labelledby="sobre-title">
      <div className="about">
        <div className="about__intro" ref={reveal} data-reveal>
          <p className="kicker"><span>05</span><span>Sobre nós</span></p>
          <h2 id="sobre-title" className="about__title">
            Todo projeto começa pelo entendimento e termina em algo que funciona.
          </h2>
          <p className="about__lede">
            Antes de escrever código, queremos entender o seu negócio, as pessoas que vão usar o sistema e o que precisa
            mudar. O resultado é uma solução útil, escalável e bem construída, feita para durar além da primeira entrega.
          </p>
        </div>
        <ul className="about__grid">
          {ABOUT.map((a, i) => (
            <li key={a.title} className="about__item" ref={reveal} data-reveal style={stagger(i % 2)}>
              <div className="about__item-head">
                <h3>{a.title}</h3>
                {CONFIG.showDemoLabels && a.placeholder && (
                  <span className="tag tag-accent">{a.draft ? 'Sugestão: revise' : 'Provisório'}</span>
                )}
              </div>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
