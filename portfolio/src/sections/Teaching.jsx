import Title from '../components/Title';
import { log } from '../data/experience';
import { teachingBySchool, tilt } from '../lib/site';

export default function Teaching() {
  const schools = teachingBySchool();
  const duties = log.filter(e => e.type === '教學' && !e.school);

  return (
    <section id="teaching" className="sec">
      <div className="page">
        <Title note="去過的學校，一間蓋一個章。">教學</Title>
        <div className="stamps">
          {schools.map((s, i) => (
            <div key={s.school} className="stamp" style={{ '--r': tilt(i, 9) }}>
              <b>{s.school}</b>
              <span className="yrs">{s.years.join(' · ')}</span>
              <span className="kinds">{s.kinds.join('・')}</span>
            </div>
          ))}
        </div>

        <h3 className="sub">命題、試務和講座</h3>
        <ul className="checklist">
          {duties.map(d => (
            <li key={d.text}>{d.text}<span className="date">{d.year}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
