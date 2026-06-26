import { useState } from 'react';
import meIcon from '../assets/me.svg';
import ThemeToggle from './ThemeToggle';
import { getColors } from '../theme';

const NAV_ITEMS = ['about', 'projects', 'experience', 'calendar'];

export default function Navbar({ page, setPage, isDark, toggleTheme }) {
  const COLORS = getColors(isDark);
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: COLORS.navBg,
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${COLORS.accent}40`,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Logo */}
          <button
            onClick={() => { setPage('home'); setOpen(false); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', fontWeight: 'bold', color: COLORS.primary }}
          >
            <img src={meIcon} alt="Icon" style={{ width: '40px', height: '40px', verticalAlign: 'middle', marginRight: '5px' }} />
            <span style={{ color: COLORS.highlight }}>劉政廷</span>
            <span style={{ color: COLORS.primary }}>@</span>
            <span style={{ color: COLORS.secondary }}>blog</span>
            <span style={{ color: COLORS.primary }}> ~$</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

            {/* 手機選單按鈕 */}
            <button
              onClick={() => setOpen(!open)}
              className="mobile-menu"
              style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', color: COLORS.primary, cursor: 'pointer' }}
            >
              {open ? '✕' : '☰'}
            </button>

            {/* 桌面導覽 */}
            <div style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    color: page === item ? COLORS.accent : COLORS.text,
                    transition: 'all 0.3s',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                  }}
                >
                  ./{item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 手機下拉選單 */}
        {open && (
          <div className="mobile-nav" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '1rem',
            padding: '1rem',
            background: COLORS.bgLight,
            borderRadius: '8px',
            border: `1px solid ${COLORS.accent}40`,
          }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => { setPage(item); setOpen(false); }}
                style={{
                  background: page === item ? `${COLORS.accent}20` : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  color: page === item ? COLORS.accent : COLORS.text,
                  padding: '0.8rem',
                  borderRadius: '4px',
                  textAlign: 'left',
                  transition: 'all 0.3s',
                }}
              >
                ./{item}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
