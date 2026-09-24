import { useEffect, useState } from 'react';
import { SECTIONS } from '../lib/site';

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
});

function useClock() {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const t = setInterval(() => setNow(fmt.format(new Date())), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

// 目前捲到哪個區塊
function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return active;
}

export default function Header({ theme, onToggleTheme, onOpenPalette }) {
  const clock = useClock();
  const active = useActiveSection();
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className="head">
      <div className="wrap">
        <a href="#top" className="brand">
          <span className="brand-mark">LZT</span>
          <span>劉政廷</span>
        </a>

        <nav className="nav" aria-label="區塊">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : ''}>
              <span>{s.no}</span>{s.label}
            </a>
          ))}
        </nav>

        <div className="head-tools">
          <span className="clock" title="台北時間">TPE <b>{clock}</b></span>
          <button className="tool" onClick={onToggleTheme} aria-label="切換深色／淺色">
            {theme === 'dark' ? '◐ 淺色' : '◑ 深色'}
          </button>
          <button className="tool" onClick={onOpenPalette} aria-label="開啟指令面板">
            搜尋 <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
