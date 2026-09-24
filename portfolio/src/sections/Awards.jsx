import Section from '../components/Section';
import { competitions } from '../data/experience';

export default function Awards() {
  const top = competitions.filter(c => c.featured);
  const rest = competitions.filter(c => !c.featured);

  return (
    <Section id="awards" aside="文書處理和程式競賽為主，偶爾跨去金融、ESG 和微電影。">
      <div className="podium">
        {top.map(c => (
          <div key={c.name}>
            <span className="mono">{c.year}</span>
            <b>{c.result}</b>
            <p>{c.name}</p>
          </div>
        ))}
      </div>

      <div className="sub" style={{ marginTop: 44 }}>完整紀錄 · {competitions.length}</div>
      <div>
        {rest.map((c, i) => (
          <div key={c.year + c.name} className={`award${i > 0 && rest[i - 1].year !== c.year ? ' gap' : ''}`}>
            <span className="y">{c.year}</span>
            <span>{c.name}</span>
            <span className="r">{c.result}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
