import Title from '../components/Title';
import { competitions } from '../data/experience';

export default function Awards() {
  const top = competitions.filter(c => c.featured);
  const byYear = competitions.filter(c => !c.featured).reduce((acc, c) => {
    (acc[c.year] ||= []).push(c);
    return acc;
  }, {});

  return (
    <section id="awards" className="sec">
      <div className="page">
        <Title>得獎</Title>
        <div className="wins">
          {top.map(c => (
            <div key={c.name} className="note">
              <span className="tape" style={{ '--tape': 'var(--tape-b)', width: '60px' }} />
              <span className="date">{c.year}</span>
              <b>{c.result}</b>
              <p>{c.name}</p>
            </div>
          ))}
        </div>

        {Object.keys(byYear).sort().reverse().map(y => (
          <div key={y} className="list-year">
            <span>{y}</span>
            <ul>
              {byYear[y].map(c => <li key={c.name}>{c.name}<em>{c.result}</em></li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
