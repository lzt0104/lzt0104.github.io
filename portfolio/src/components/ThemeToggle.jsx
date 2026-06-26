import { getColors } from '../theme';

export default function ThemeToggle({ isDark, toggleTheme }) {
  const COLORS = getColors(isDark);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.secondary}20)`,
        border: `2px solid ${COLORS.primary}`,
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 4px 12px ${COLORS.primary}30`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
        e.currentTarget.style.boxShadow = `0 6px 20px ${COLORS.primary}50`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        e.currentTarget.style.boxShadow = `0 4px 12px ${COLORS.primary}30`;
      }}
    >
      <span style={{ fontSize: '1.2rem', transition: 'transform 0.4s', transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)' }}>
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
