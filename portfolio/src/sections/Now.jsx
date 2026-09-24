import Section from '../components/Section';
import { profile } from '../data/profile';

const statusClass = (s) => (['營運中', '執行中', '培訓中'].includes(s) ? 'wip' : 'live');

export default function Now() {
  return (
    <Section id="now" aside={`${profile.nowAsOf}的狀態。同時在跑的事情有點多，但每一件都還在動。`}>
      <div className="sub">進行中</div>
      <div className="rows">
        {profile.now.map(n => (
          <div className="now-row" key={n.org}>
            <span className={`status ${statusClass(n.status)}`}>{n.status}</span>
            <div>
              <h3>{n.link ? <a href={n.link} target="_blank" rel="noopener noreferrer">{n.org} ↗</a> : n.org}</h3>
              <div className="role">{n.role}</div>
            </div>
            <p>{n.note}</p>
          </div>
        ))}
      </div>

      <div className="sub" style={{ marginTop: 44 }}>常用工具</div>
      <dl className="stack">
        {profile.stack.map(g => (
          <div key={g.group}>
            <dt>{g.group}</dt>
            <dd>{g.items.map(i => <span key={i}>{i}</span>)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
