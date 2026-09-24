import { useEffect, useState } from 'react';
import { SECTIONS, BUILD_DATE } from '../lib/site';
import { profile } from '../data/profile';

function useActive() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

export default function Nav() {
  const active = useActive();
  return (
    <>
      <header className="topnav">
        <div className="page">
          <a href="#top" className="me">{profile.name}</a>
          <nav className="links" aria-label="區塊">
            {SECTIONS.map(s => <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : ''}>{s.label}</a>)}
          </nav>
          {BUILD_DATE && <span className="upd">最後更新 {BUILD_DATE}</span>}
        </div>
      </header>
      <nav className="tabs" aria-label="索引">
        {SECTIONS.map(s => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : ''} style={{ '--c': s.color }}>{s.label}</a>
        ))}
      </nav>
    </>
  );
}
