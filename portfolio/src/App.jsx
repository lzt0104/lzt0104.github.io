import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import CommandPalette from './components/CommandPalette';
import Hero from './sections/Hero';
import Now from './sections/Now';
import Work from './sections/Work';
import Research from './sections/Research';
import Teaching from './sections/Teaching';
import Awards from './sections/Awards';
import Log from './sections/Log';
import Certs from './sections/Certs';
import Schedule from './sections/Schedule';
import Contact from './sections/Contact';
import { profile } from './data/profile';
import { BUILD_DATE } from './lib/site';

const currentTheme = () => document.documentElement.dataset.theme || 'dark';

export default function App() {
  const [theme, setTheme] = useState(currentTheme);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* 無痕模式等情況 */ }
    setTheme(next);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setPaletteOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <Now />
        <Work />
        <Research />
        <Teaching />
        <Awards />
        <Log />
        <Certs />
        <Schedule />
        <Contact />
      </main>
      <footer className="foot">
        <div className="wrap">
          <span>© {new Date().getFullYear()} {profile.name} {profile.nameEn}</span>
          <span>React + Vite · Cloudflare Pages{BUILD_DATE && ` · build ${BUILD_DATE}`}</span>
          <a href="https://github.com/lzt0104/lzt0104.github.io" target="_blank" rel="noopener noreferrer">原始碼 ↗</a>
        </div>
      </footer>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onToggleTheme={toggleTheme} />
    </>
  );
}
