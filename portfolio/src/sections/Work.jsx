import Section from '../components/Section';
import { projects } from '../data/projects';
import { hostOf, statusClass } from '../lib/site';

const pad = (n) => String(n).padStart(2, '0');

export default function Work() {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <Section id="work" aside="大部分是學校或身邊的人遇到問題，我寫個系統把它解掉。有網址的都可以直接點進去用。">
      <div className="sub">主要專案</div>
      <div className="featured">
        {featured.map((p, i) => (
          <a key={p.name} className="card" href={p.link} target="_blank" rel="noopener noreferrer">
            <div className="card-bar">
              <span className="url">{hostOf(p.link)}</span>
              <span className="arrow">↗</span>
            </div>
            <div className="card-body">
              <span className="card-no">{pad(i + 1)}</span>
              <h3>{p.name}</h3>
              <div className="for">給 {p.for}</div>
              <p>{p.description}</p>
              <div className="card-foot">
                <div className="tags">{p.tech.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <span className={`status ${statusClass(p.status)}`}>{p.status}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="sub" style={{ marginTop: 44 }}>其他專案 · {rest.length}</div>
      <div className="index">
        {rest.map((p, i) => {
          const Row = p.link ? 'a' : 'div';
          return (
            <Row key={p.name} className="index-row" {...(p.link ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <span className="index-no">{pad(featured.length + i + 1)}</span>
              <div className="index-main">
                <span className="index-name">{p.name}</span>
                <span className="index-desc">{p.description}</span>
              </div>
              <div className="index-meta">
                <span className="index-for">{p.for}</span>
                <span className="mono" style={{ fontSize: 11 }}>{p.tech.join(' · ')}</span>
              </div>
              <span className={`status ${statusClass(p.status)}`}>{p.status}</span>
            </Row>
          );
        })}
      </div>
    </Section>
  );
}
