import { useEffect, useMemo, useRef, useState } from 'react';
import { SECTIONS } from '../lib/site';
import { projects } from '../data/projects';
import { profile } from '../data/profile';

function buildItems(onToggleTheme) {
  return [
    ...SECTIONS.map(s => ({
      kind: '前往', label: `${s.no} ${s.label} · ${s.en}`,
      run: () => document.getElementById(s.id)?.scrollIntoView(),
    })),
    ...projects.filter(p => p.link).map(p => ({
      kind: '專案', label: p.name, run: () => window.open(p.link, '_blank', 'noopener'),
    })),
    ...profile.links.map(l => ({
      kind: '連結', label: `${l.name} — ${l.label}`, run: () => window.open(l.url, '_blank', 'noopener'),
    })),
    { kind: '設定', label: '切換深色／淺色', run: onToggleTheme },
  ];
}

export default function CommandPalette({ open, onClose, onToggleTheme }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const listRef = useRef(null);

  const items = useMemo(() => buildItems(onToggleTheme), [onToggleTheme]);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter(i => `${i.kind} ${i.label}`.toLowerCase().includes(s)) : items;
  }, [q, items]);

  useEffect(() => { setSel(0); }, [q, open]);
  useEffect(() => { if (!open) setQ(''); }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('li.on')?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  if (!open) return null;

  const run = (item) => { onClose(); item.run(); };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && results[sel]) { e.preventDefault(); run(results[sel]); }
    else if (e.key === 'Escape') onClose();
  };

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div className="palette" role="dialog" aria-label="指令面板" onMouseDown={e => e.stopPropagation()}>
        <input
          autoFocus
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={onKey}
          placeholder="找區塊、專案或連結…"
          aria-label="搜尋"
        />
        {results.length === 0 ? (
          <div className="empty">找不到「{q}」</div>
        ) : (
          <ul ref={listRef}>
            {results.map((item, i) => (
              <li key={item.kind + item.label} className={i === sel ? 'on' : ''}>
                <button onMouseEnter={() => setSel(i)} onClick={() => run(item)}>
                  <span>{item.kind}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="palette-foot">
          <span>↑↓ 選擇</span><span>↵ 執行</span><span>esc 關閉</span>
        </div>
      </div>
    </div>
  );
}
