import { CONFIG, NAV } from '../content';
import { BrandMark } from './BrandMark';
import { contactChannels } from './Contact';
import './Footer.css';

export function Footer() {
  const channels = contactChannels().filter((c) => c.href || CONFIG.showDemoLabels);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <p className="brand"><BrandMark />{CONFIG.companyName}</p>
            <p className="site-footer__about">
              Desenvolvimento de software sob medida: sistemas web, APIs, aplicativos, integrações com IA e automação de processos.
            </p>
          </div>
          <nav aria-label="Rodapé">
            <h2 className="label">Navegação</h2>
            <ul>
              {NAV.map((n) => (
                <li key={n.id}><a href={'#' + n.id}>{n.label}</a></li>
              ))}
            </ul>
          </nav>
          {channels.length > 0 && (
            <div>
              <h2 className="label">Contato e redes</h2>
              <ul>
                {channels.map((c) => (
                  <li key={c.label}>
                    {c.href ? (
                      <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{c.label}</a>
                    ) : (
                      <span className="site-footer__missing">{c.label} (a configurar)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="site-footer__legal">
          <span>© {new Date().getFullYear()} {CONFIG.companyName}. Todos os direitos reservados.</span>
          {CONFIG.privacyUrl && <a href={CONFIG.privacyUrl}>Política de privacidade</a>}
          <a href="#inicio" className="site-footer__top">Voltar ao topo ↑</a>
        </div>
      </div>
    </footer>
  );
}
