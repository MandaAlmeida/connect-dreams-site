import { CATEGORIES, CONFIG, pad, publishedProjects } from '../content';
import { useCategoryFilter } from '../hooks/useCategoryFilter';
import { projectHref } from '../hooks/useProjectRoute';
import { reveal, stagger } from '../hooks/useReveal';
import { Icon } from './Icon';
import { hueOf, ProjectCover } from './ProjectCover';
import { SectionHead } from './SectionHead';
import './Projects.css';

export function Projects() {
  const [filter, setFilter] = useCategoryFilter(CATEGORIES);
  const visible = filter === 'all' ? publishedProjects : publishedProjects.filter((p) => p.category === filter);

  const filters = [{ key: 'all', label: 'Todos', count: publishedProjects.length }]
    .concat(CATEGORIES.map((c) => ({ key: c, label: c, count: publishedProjects.filter((p) => p.category === c).length })))
    .filter((f) => f.key === 'all' || f.count > 0 || f.key === filter);

  return (
    <section id="projetos" className="section container" aria-labelledby="projetos-title">
      <SectionHead
        num="02"
        kicker="Projetos"
        titleId="projetos-title"
        title="Software construído para resolver problemas reais."
        lede="Cada projeto mostra o problema, a solução e as decisões técnicas por trás dela. Filtre por categoria e abra os detalhes para ver tecnologias, links e capturas de tela."
      />

      <div className="filters" role="group" aria-label="Filtrar projetos por categoria">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={'chip' + (f.key === 'all' ? '' : ' hue-' + hueOf(f.key)) + (filter === f.key ? ' is-active' : '')}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.key !== 'all' && <span className="chip__dot" aria-hidden="true" />}
            {f.label}
            <span className="chip__count">{f.count}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length === 1 ? '1 projeto' : visible.length + ' projetos'}
      </p>

      {visible.length > 0 ? (
        <ul className="project-grid">
          {visible.map((p, i) => {
            const num = pad(publishedProjects.indexOf(p) + 1);
            return (
              <li key={p.id} ref={reveal} data-reveal style={stagger(i % 3)}>
                <article className="project-card">
                  <div className="project-card__media">
                    <ProjectCover project={p} num={num} />
                    {CONFIG.showDemoLabels && p.demo && <span className="tag tag-strong project-card__badge">Demo</span>}
                  </div>
                  <div className="project-card__body">
                    <h3 className="project-card__title">
                      {/* One link per card; its ::after makes the whole card clickable. */}
                      <a href={projectHref(p.id)} className="project-card__link">{p.name}</a>
                    </h3>
                    <p className="project-card__summary">{p.summary}</p>
                    <div className="project-card__foot">
                      <ul className="project-card__stack" aria-label="Tecnologias">
                        {p.stack.slice(0, 3).map((t) => (
                          <li key={t} className="tag">{t}</li>
                        ))}
                      </ul>
                      <span className="project-card__go" aria-hidden="true">
                        <Icon name="arrowUpRight" size={18} />
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="empty">
          <p>Ainda não há projetos publicados nesta categoria.</p>
          <button type="button" className="btn btn-secondary" onClick={() => setFilter('all')}>Ver todos os projetos</button>
        </div>
      )}
    </section>
  );
}
