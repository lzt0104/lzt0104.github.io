import { useState, useEffect } from 'react';
import { getColors } from './theme';
import Scanlines from './components/Scanlines';
import MatrixRain from './components/MatrixRain';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TerminalHomePage from './pages/TerminalHomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import CalendarPage from './pages/CalendarPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [transKey, setTransKey] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const COLORS = getColors(isDark);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(saved === 'dark');
  }, []);

  const navigate = (p) => {
    setPage(p);
    setTransKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: COLORS.bgGradient,
      color: COLORS.text,
      position: 'relative',
      transition: 'background 0.5s, color 0.5s',
    }}>
      <MatrixRain isDark={isDark} />
      <Scanlines isDark={isDark} />
      <Navbar page={page} setPage={navigate} isDark={isDark} toggleTheme={toggleTheme} />

      <div key={transKey} style={{ flex: 1, animation: 'pageIn 0.45s cubic-bezier(0.22,1,0.36,1)', position: 'relative', zIndex: 1 }}>
        {page === 'home'       && <TerminalHomePage setPage={navigate} isDark={isDark} />}
        {page === 'about'      && <AboutPage      isDark={isDark} />}
        {page === 'projects'   && <ProjectsPage   isDark={isDark} />}
        {page === 'experience' && <ExperiencePage isDark={isDark} />}
        {page === 'calendar'   && <CalendarPage   isDark={isDark} />}
      </div>

      <Footer isDark={isDark} />

      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 8px var(--glow, #00d9ff44); }
          50%       { box-shadow: 0 0 24px var(--glow, #00d9ff88); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      `}</style>
    </div>
  );
}
