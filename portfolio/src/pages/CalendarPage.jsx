import { getColors } from '../theme';
import { profile } from '../data/profile';

export default function CalendarPage({ isDark }) {
  const COLORS = getColors(isDark);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
        border: `2px solid ${COLORS.success}`,
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: `0 8px 32px ${COLORS.success}20`,
      }}>
        <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '2rem', color: COLORS.success, fontFamily: 'monospace' }}>
          $ cat schedule.ics
        </h2>

        <div style={{ width: '100%', height: 'clamp(400px, 60vh, 600px)', border: `2px solid ${COLORS.success}50`, borderRadius: '12px', overflow: 'hidden' }}>
          <iframe
            title="Google Calendar"
            style={{ width: '100%', height: '100%', border: 'none' }}
            src={profile.calendar.embedUrl}
          />
        </div>
      </div>
    </div>
  );
}
