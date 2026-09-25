import { useState } from 'react';
import Title from '../components/Title';
import { competitions } from '../data/experience';

// 預設只展開最近幾年，其餘收起來
const RECENT_YEARS = 3;

export default function Awards() {
  const [expanded, setExpanded] = useState(false);
  const top = competitions.filter(c => c.featured);
  const byYear = competitions.filter(c => !c.featured).reduce((acc, c) => {
    (acc[c.year] ||= []).push(c);
    return acc;
  }, {});
  const allYears = Object.keys(byYear).sort().reverse();
  const years = expanded ? allYears : allYears.slice(0, RECENT_YEARS);
  const hidden = allYears.slice(RECENT_YEARS);

  return (
    <section id="awards" className="sec">
      <div className="page">
        <Title note="從高職的文書處理比賽一路比到現在。">比賽</Title>
        <div className="wins">
          {top.map(c => (
            <div key={c.year + c.name} className="note">
              <span className="tape" style={{ '--tape': 'var(--tape-b)', width: '60px' }} />
              <span className="date">{c.year}</span>
              <b>{c.result}</b>
              <p>{c.name}</p>
            </div>
          ))}
        </div>

        {years.map(y => (
          <div key={y} className="list-year">
            <span>{y}</span>
            <ul>
              {byYear[y].map(c => (
                <li key={c.name}>
                  <div>
                    {c.name}
                    {c.work && <small>作品：{c.work}</small>}
                  </div>
                  <em>{c.result}</em>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {!expanded && hidden.length > 0 && (
          <button className="more" onClick={() => setExpanded(true)}>
            翻到更早的頁面（{hidden.join('、')}，還有 {hidden.reduce((n, y) => n + byYear[y].length, 0)} 筆）
          </button>
        )}
      </div>
    </section>
  );
}
