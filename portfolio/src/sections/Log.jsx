import { useState } from 'react';
import Section from '../components/Section';
import { log } from '../data/experience';

const TYPES = ['教學', '自治', '研究', '工作', '榮譽', '研習'];

export default function Log() {
  const [filter, setFilter] = useState('全部');
  const [expanded, setExpanded] = useState(false);
  const shown = filter === '全部' ? log : log.filter(e => e.type === filter);
  const allYears = [...new Set(shown.map(e => e.year))].sort((a, b) => b - a);
  // 「全部」時預設只展開最近兩年，避免一次列出太長
  const collapsed = filter === '全部' && !expanded && allYears.length > 2;
  const years = collapsed ? allYears.slice(0, 2) : allYears;
  const hiddenCount = shown.filter(e => !years.includes(e.year)).length;
  const count = (t) => log.filter(e => e.type === t).length;

  return (
    <Section id="log" aside="所有做過的事，一行一筆。可以用上面的標籤篩選。">
      <div className="filters" role="group" aria-label="篩選類別">
        {['全部', ...TYPES].map(t => (
          <button key={t} className="chip" aria-pressed={filter === t} onClick={() => setFilter(t)}>
            {t}<i>{t === '全部' ? log.length : count(t)}</i>
          </button>
        ))}
      </div>

      {years.map(y => {
        const items = shown.filter(e => e.year === y);
        return (
          <div className="year" key={y}>
            <div className="year-label">{y}<small>{items.length} 筆</small></div>
            <div className="entries">
              {items.map(e => (
                <div className="entry" key={e.text}>
                  <span className={`t t-${e.type}`}>{e.type}</span>
                  <div>{e.text}{e.hours && <span className="h">{e.hours}h</span>}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {collapsed && (
        <button className="chip more" onClick={() => setExpanded(true)}>
          顯示更早的紀錄<i>{allYears.slice(2).join(' · ')} · {hiddenCount} 筆</i>
        </button>
      )}
    </Section>
  );
}
