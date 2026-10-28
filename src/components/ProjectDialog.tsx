import { useEffect, useRef } from 'react';
import { CONFIG, pad, publishedProjects, type Project } from '../content';
import { Icon } from './Icon';
import { hueOf, ProjectCover } from './ProjectCover';
import './ProjectDialog.css';

type Props = {
  openId: string | null;
  onClose: (to?: string) => void;
  onTalk: (project: Project) => void;
};

export function ProjectDialog({ openId, onClose, onTalk }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const project = openId ? publishedProjects.find((p) => p.id === openId) ?? null : null;
  const unknown = openId !== null && project === null;

  // Drive the native dialog from the URL: showModal() gives focus trap + Escape for free.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) {
      d.showModal();
      d.scrollTop = 0;
    } else if (!project && d.open) d.close();
  }, [project]);

  // A stale or mistyped #/projetos/<id>: fall back to the list.
  useEffect(() => {
    if (unknown) onClose();
  }, [unknown, onClose]);

  const num = project ? pad(publishedProjects.indexOf(project) + 1) : '';

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="proj-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Click on the backdrop (the dialog box itself, outside the panel) closes.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="project-dialog__panel">
          <div className="project-dialog__bar">
            <span className="project-dialog__num">{num}</span>
            <span className={'project-dialog__cat hue-' + hueOf(project.category)}>{project.category}</span>
            {CONFIG.showDemoLabels && project.demo && <span className="tag tag-strong">Demo</span>}
            <button type="button" className="btn btn-icon btn-secondary project-dialog__close" onClick={() => onClose()} aria-label="Fechar detalhes">
              <Icon name="x" size={18} />
            </button>
          </div>

          <div className="project-dialog__body">
            <h2 id="proj-title" className="project-dialog__title">{project.name}</h2>
            <p className="project-dialog__summary">{project.summary}</p>

            <div className="project-dialog__cover">
              <ProjectCover project={project} num={num} large />
            </div>

            <div className="project-dialog__cols">
              <section>
                <h3 className="label label-accent">O problema</h3>
                <p>{project.problem}</p>
              </section>
              <section>
                <h3 className="label label-accent">A solução</h3>
                <p>{project.solution}</p>
              </section>
            </div>

            <section className="project-dialog__stack">
              <h3 className="label">Tecnologias</h3>
              <ul>
                {project.stack.map((t) => (
                  <li key={t} className="tag tag-outline">{t}</li>
                ))}
              </ul>
            </section>

            <div className="project-dialog__links">
              {project.demoUrl ? (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {project.demoLabel ?? 'Ver demonstração'} <Icon name="arrowUpRight" size={18} className="btn-arrow-up btn-arrow" />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              ) : (
                <span className="btn btn-secondary" aria-disabled="true">Demonstração indisponível</span>
              )}
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Icon name="github" size={16} /> Repositório no GitHub
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              ) : (
                <span className="btn btn-secondary" aria-disabled="true">Repositório privado</span>
              )}
            </div>

            {(project.gallery.length > 0 || CONFIG.showDemoLabels) && (
              <section className="project-dialog__gallery">
                <h3 className="label">Galeria</h3>
                <ul>
                  {project.gallery.length > 0
                    ? project.gallery.map((g) => (
                        <li key={g.src}>
                          <a href={g.src} target="_blank" rel="noopener noreferrer" className="shot">
                            <img src={g.src} alt={g.alt} loading="lazy" width={1600} />
                            <span className="sr-only">(abre a imagem em tamanho real em nova aba)</span>
                          </a>
                        </li>
                      ))
                    : [1, 2, 3].map((i) => (
                        <li key={i} className="shot-placeholder">
                          <span>Captura de tela {i}</span>
                        </li>
                      ))}
                </ul>
              </section>
            )}

            <div className="project-dialog__cta">
              <span>Tem um desafio parecido?</span>
              <button type="button" className="btn btn-primary" onClick={() => onTalk(project)}>
                Vamos conversar <Icon name="arrowRight" size={16} className="btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
