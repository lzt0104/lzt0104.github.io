import { useState } from 'react';
import Title from '../components/Title';
import { log } from '../data/experience';
import { TYPE_COLOR } from '../lib/site';

const TYPES = Object.keys(TYPE_COLOR);

export default function Log() {
  const [filter, setFilter] = useState('全部');
  const [expanded, setExpanded] = useState(false);

  const shown = filter === '全部' ? log : log.filter(e => e.type === filter);
  const allYears = [...new Set(shown.map(e => e.year))].sort((a, b) => b - a);
  // 「全部」時預設只展開最近兩年
  const collapsed = filter === '全部' && !expanded && allYears.length > 2;
  const years = collapsed ? allYears.slice(0, 2) : allYears;
  const hidden = shown.filter(e => !years.includes(e.year)).length;

  return (
    <section id="log" className="sec">
      <div className="page">
        <Title note="做過的事，一行一筆。">日記</Title>

        <div className="filters" role="group" aria-label="篩選類別">
          {['全部', ...TYPES].map(t => (
            <button key={t} aria-pressed={filter === t} onClick={() => setFilter(t)}>
              {t}<i>{t === '全部' ? log.length : log.filter(e => e.type === t).length}</i>
            </button>
          ))}
        </div>

        {years.map(y => {
          const items = shown.filter(e => e.year === y);
          return (
            <div key={y} className="diary-year">
              <h3>{y}<small>{items.length} 件事</small></h3>
              <ul>
                {items.map(e => (
                  <li key={e.text}>
                    <span className="t" style={{ '--c': TYPE_COLOR[e.type] }}>{e.type}</span>
                    {e.text}
                    {e.hours && <span className="h">{e.hours} 小時</span>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {collapsed && (
          <button className="more" onClick={() => setExpanded(true)}>
            翻到更早的頁面（{allYears.slice(2).join('、')}，還有 {hidden} 件）
          </button>
        )}
      </div>
    </section>
  );
}
