import Section from '../components/Section';
import { log } from '../data/experience';
import { teachingBySchool } from '../lib/site';

const KINDS = [
  ['指導', '文書處理職種選手指導'],
  ['研習', '教師研習講師'],
  ['工作坊', '工作坊講師'],
];

export default function Teaching() {
  const { years, rows } = teachingBySchool();
  const duties = log.filter(e => e.type === '教學' && !e.school);

  return (
    <Section id="teaching" aside="從 MOS 選手，變成帶選手的人。">
      <p className="lead">
        從比 MOS Word Expert 開始，後來變成到各地高職帶<em>文書處理職種</em>的選手、幫老師上排版研習，
        也參與統測命題編校和全國自辦模擬賽的命題。
      </p>

      <div className="sub">學校 × 年度</div>
      <div className="matrix">
        <table>
          <colgroup><col className="school" />{years.map(y => <col key={y} />)}</colgroup>
          <thead>
            <tr>
              <th>學校</th>
              {years.map(y => <th key={y}>{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.school}>
                <td>{r.school}<small>{r.total} 次</small></td>
                {years.map(y => (
                  <td key={y}>
                    <div className="cell">
                      {(r.byYear[y] || []).map(k => <span key={k} className={`k k-${k}`}>{k}</span>)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="legend">
        {KINDS.map(([k, desc]) => (
          <span key={k}><span className={`k k-${k}`}>{k}</span>{desc}</span>
        ))}
      </div>

      <div className="sub" style={{ marginTop: 44 }}>命題、試務與講座</div>
      <div>
        {duties.map(d => (
          <div className="duty" key={d.text}>
            <span>{d.year}</span>
            <div>{d.text}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
