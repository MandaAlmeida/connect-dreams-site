import { useEffect, useRef, useState } from 'react';
import { CONFIG, NAV } from '../content';
import { BrandMark } from './BrandMark';
import { Icon } from './Icon';
import './Header.css';

type Props = { active: string; theme: 'light' | 'dark'; onToggleTheme: () => void };

export function Header({ active, theme, onToggleTheme }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtn.current?.focus();
      }
    };
    // Close the panel if the viewport grows past the mobile breakpoint.
    const mq = window.matchMedia('(min-width: 960px)');
    const onMq = () => mq.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const themeLabel = theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro';

  return (
    <header className={'site-header' + (scrolled ? ' is-scrolled' : '')}>
      <div className="site-header__bar">
        <a href="#inicio" className="brand" onClick={close}>
          <BrandMark />
          <span>{CONFIG.companyName}</span>
        </a>

        <nav aria-label="Principal" className="site-nav">
          <ul>
            {NAV.slice(1).map((n) => (
              <li key={n.id}>
                <a href={'#' + n.id} aria-current={active === n.id ? 'location' : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button type="button" className="btn btn-icon btn-secondary theme-toggle" onClick={onToggleTheme} aria-label={themeLabel} title={themeLabel}>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>
          <a href="#contato" className="btn btn-primary site-header__cta">
            Vamos conversar <Icon name="arrowRight" size={16} className="btn-arrow" />
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="btn btn-icon btn-secondary menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Principal (celular)" className="mobile-nav" hidden={!menuOpen}>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.id} style={{ animationDelay: i * 30 + 'ms' }}>
              <a href={'#' + n.id} onClick={close} aria-current={active === n.id ? 'location' : undefined}>
                <span className="mobile-nav__num">{String(i + 1).padStart(2, '0')}</span>
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contato" className="btn btn-primary btn-lg mobile-nav__cta" onClick={close}>
              Vamos conversar <Icon name="arrowRight" size={18} className="btn-arrow" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
