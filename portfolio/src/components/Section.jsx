import { SECTIONS } from '../lib/site';

export default function Section({ id, aside, children }) {
  const meta = SECTIONS.find(s => s.id === id);
  return (
    <section id={id} className="section">
      <div className="wrap section-grid">
        <header className="section-head">
          <span className="section-no">§{meta.no}</span>
          <h2>{meta.label}</h2>
          <span className="section-en">{meta.en}</span>
          {aside && <p className="section-aside">{aside}</p>}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}
