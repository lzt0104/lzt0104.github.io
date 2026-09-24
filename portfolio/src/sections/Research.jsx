import Title from '../components/Title';
import { profile } from '../data/profile';
import { tilt } from '../lib/site';

export default function Research() {
  return (
    <section id="research" className="sec">
      <div className="page">
        <Title note="國科會大專學生研究計畫，兩個都在做醫療衛教的聊天機器人。">研究</Title>
        <div className="cards">
          {profile.research.map((r, i) => (
            <article key={r.id} className="index-card" style={{ '--r': tilt(i + 1, 0.8) }}>
              <div className="year">{r.year} 年度 · {r.status}</div>
              <h3>{r.title}</h3>
              <div className="meta">
                <span>{r.id}</span>
                {r.grade && <span>評等 {r.grade}</span>}
                {r.amount && <span>核定 NT$ {r.amount}</span>}
              </div>
            </article>
          ))}
        </div>

        {profile.publications.map(p => (
          <a key={p.title} className="clip" href={p.link} target="_blank" rel="noopener noreferrer">
            <span className="date">{p.year} · 論文 · ACL Anthology ↗</span>
            <h3>{p.title}</h3>
            <p>{p.venue}</p>
            <p>{p.note}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
