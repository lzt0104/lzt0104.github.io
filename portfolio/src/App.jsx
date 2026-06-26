import { useState, useEffect } from 'react';
import { getColors } from './theme';
import Scanlines from './components/Scanlines';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import CalendarPage from './pages/CalendarPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const COLORS = getColors(isDark);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(saved === 'dark');
  }, []);

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
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <Scanlines isDark={isDark} />
      <Navbar page={page} setPage={setPage} isDark={isDark} toggleTheme={toggleTheme} />

      <div style={{ flex: 1 }}>
        {page === 'home'       && <HomePage       setPage={setPage} isDark={isDark} />}
        {page === 'about'      && <AboutPage      isDark={isDark} />}
        {page === 'projects'   && <ProjectsPage   isDark={isDark} />}
        {page === 'experience' && <ExperiencePage isDark={isDark} />}
        {page === 'calendar'   && <CalendarPage   isDark={isDark} />}
      </div>

      <Footer isDark={isDark} />

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      `}</style>
    </div>
  );
}
