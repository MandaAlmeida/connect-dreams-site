import { CATEGORIES, type Project } from '../content';
import './ProjectCover.css';

type Props = { project: Project; num: string; large?: boolean };

/** Hue slot (1-7) for a category; the colors live in tokens.css (--h-1 … --h-7). */
export const hueOf = (category: string) => (CATEGORIES as readonly string[]).indexOf(category) + 1 || 1;

/** Real cover when `project.cover` is set; otherwise a colored cover built from the project data. */
export function ProjectCover({ project, num, large }: Props) {
  const cls = 'cover hue-' + hueOf(project.category) + (large ? ' cover--large' : '');
  if (project.cover) {
    return (
      <div className={cls}>
        <img src={project.cover} alt="" loading="lazy" decoding="async" width={1600} height={1000} />
      </div>
    );
  }
  return (
    <div className={cls + ' cover--generated'} aria-hidden="true">
      <span className="cover__orb cover__orb--a" />
      <span className="cover__orb cover__orb--b" />
      <span className="cover__cat">{project.category}</span>
      <span className="cover__num">{num}</span>
      <ul className="cover__stack">
        {project.stack.slice(0, 3).map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
