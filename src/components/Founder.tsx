import { CONFIG, FOUNDER, ME, MY_STACK } from '../content';
import { reveal, stagger } from '../hooks/useReveal';
import { Icon, type IconName } from './Icon';
import './Founder.css';

export function Founder() {
  const pr = CONFIG.profiles;
  const links: { label: string; icon: IconName; href: string }[] = [
    { label: 'LinkedIn', icon: 'linkedin', href: pr.linkedin },
    { label: 'GitHub', icon: 'github', href: pr.github },
    { label: 'Portfólio', icon: 'globe', href: pr.portfolio },
  ];
  const shown = links.filter((l) => l.href || CONFIG.showDemoLabels);

  return (
    <section id="sobre-mim" className="section container" aria-labelledby="sobre-mim-title">
      <p className="kicker"><span>06</span><span>Sobre mim</span></p>
      <div className="founder">
        <div className="founder__aside" ref={reveal} data-reveal>
          <div className="founder__photo">
            {FOUNDER.photo ? (
              <img src={FOUNDER.photo} alt={'Foto de ' + FOUNDER.name} width={880} height={1100} loading="lazy" />
            ) : (
              <div className="founder__photo-empty" aria-hidden="true">
                <span className="founder__orb founder__orb--a" />
                <span className="founder__orb founder__orb--b" />
                {CONFIG.showDemoLabels && <span className="founder__photo-hint">Sua foto profissional</span>}
              </div>
            )}
          </div>
          {shown.length > 0 && (
            <ul className="founder__links">
              {shown.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      <Icon name={l.icon} size={16} /> {l.label}
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  ) : (
                    <span className="btn btn-secondary" aria-disabled="true" title="Defina o link em CONFIG.profiles">
                      <Icon name={l.icon} size={16} /> {l.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div ref={reveal} data-reveal style={stagger(1)}>
          <div className="founder__name-row">
            <h2 id="sobre-mim-title" className="section-title">{FOUNDER.name}</h2>
            {CONFIG.showDemoLabels && FOUNDER.placeholder && <span className="tag tag-accent">Texto provisório</span>}
          </div>
          <p className="founder__role">{FOUNDER.role}</p>
          <p className="founder__bio">{FOUNDER.bio}</p>

          <dl className="founder__facts">
            {ME.map((m) => (
              <div key={m.title}>
                <dt className="label">{m.title}</dt>
                <dd>{m.text}</dd>
              </div>
            ))}
          </dl>

          <div className="founder__stack">
            <h3 className="label">
              Tecnologias {CONFIG.showDemoLabels && <span className="founder__stack-note">(exemplo, ajuste à sua stack real)</span>}
            </h3>
            <ul>
              {MY_STACK.map((t) => (
                <li key={t} className="tag tag-outline">{t}</li>
              ))}
            </ul>
          </div>

          <blockquote className="founder__quote">{FOUNDER.quote}</blockquote>
        </div>
      </div>
    </section>
  );
}
