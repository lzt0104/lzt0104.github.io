import Section from '../components/Section';
import { profile } from '../data/profile';

export default function Research() {
  return (
    <Section id="research" aside="國科會大專學生研究計畫，以及一篇研討會論文。">
      <p className="lead">
        兩個計畫問的是同一件事：<em>醫療衛教的對話代理，能不能講話更像人、又守得住隱私？</em>
        第一個做乳癌病患照護，第二個把 RAG 接進來，換到女性更年期的情境。
      </p>

      <div className="sub">研究計畫</div>
      {profile.research.map(r => (
        <article className="grant" key={r.id}>
          <div className="grant-year">{r.year}<small>年度</small></div>
          <div>
            <h3>{r.title}</h3>
            <div className="grant-meta">
              <span>{r.id}</span>
              {r.grade && <span>評等 <b>{r.grade}</b></span>}
              {r.amount && <span>核定 <b>NT$ {r.amount}</b></span>}
              <span className={`status ${r.status === '執行中' ? 'wip' : ''}`}>{r.status}</span>
            </div>
          </div>
        </article>
      ))}

      <div className="sub" style={{ marginTop: 44 }}>論文發表</div>
      {profile.publications.map(p => (
        <a className="pub" key={p.title} href={p.link} target="_blank" rel="noopener noreferrer">
          <span className="mono dim" style={{ fontSize: 11 }}>{p.year} · ACL Anthology ↗</span>
          <h3>{p.title}</h3>
          <p>{p.venue}</p>
          <p>{p.note}</p>
        </a>
      ))}
    </Section>
  );
}
