import { reveal } from '../hooks/useReveal';

type Props = { num: string; kicker: string; title: string; titleId: string; lede?: string };

export function SectionHead({ num, kicker, title, titleId, lede }: Props) {
  return (
    <div className="section-head" ref={reveal} data-reveal>
      <div>
        <p className="kicker">
          <span>{num}</span>
          <span>{kicker}</span>
        </p>
        <h2 id={titleId} className="section-title">{title}</h2>
      </div>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}
