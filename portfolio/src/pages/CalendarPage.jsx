import { getColors } from '../theme';
import { profile } from '../data/profile';

export default function CalendarPage({ isDark }) {
  const C = getColors(isDark);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)', position: 'relative', zIndex: 1 }}>
      {/* Terminal window */}
      <div style={{
        background:    `linear-gradient(135deg, ${C.bgLight}ee, ${C.bg}ee)`,
        border:        `1px solid ${C.success}40`,
        borderRadius:  '18px',
        overflow:      'hidden',
        backdropFilter: 'blur(18px)',
        boxShadow:     `0 20px 60px ${C.success}10`,
      }}>
        {/* macOS-style title bar */}
        <div style={{ background: isDark ? 'rgba(16,22,50,0.98)' : 'rgba(210,215,235,0.98)', padding: '0.65rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: `1px solid ${C.success}18`, userSelect: 'none' }}>
          {['#ff5f56','#ffbd2e','#27c93f'].map((col, i) => (
            <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: col, flexShrink: 0 }} />
          ))}
          <span style={{ marginLeft: '0.9rem', fontFamily: 'monospace', fontSize: '0.77rem', color: C.textDim }}>
            gcal — 劉政廷@blog
          </span>
          <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: '0.7rem', color: C.textDim + '80' }}>
            Google Calendar
          </span>
        </div>

        {/* Command line */}
        <div style={{ background: isDark ? 'rgba(10,14,39,0.85)' : 'rgba(240,242,250,0.85)', padding: '0.7rem 1.2rem', borderBottom: `1px solid ${C.success}15`, fontFamily: 'monospace', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: C.success }}>劉政廷@blog</span>
          <span style={{ color: C.textDim }}>:~$</span>
          <span style={{ color: C.text }}> gcal show --all --tz Asia/Taipei</span>
          <span style={{ color: C.success, marginLeft: '0.25rem', animation: 'twBlink 0.9s step-end infinite' }}>▌</span>
        </div>

        {/* Status bar */}
        <div style={{ background: isDark ? 'rgba(10,14,39,0.5)' : 'rgba(240,242,250,0.5)', padding: '0.4rem 1.2rem', borderBottom: `1px solid ${C.success}12`, fontFamily: 'monospace', fontSize: '0.72rem', color: C.textDim, display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span>timezone: <span style={{ color: C.success }}>Asia/Taipei (UTC+8)</span></span>
          <span>view: <span style={{ color: C.accent }}>monthly</span></span>
          <span style={{ color: C.success }}>● connected</span>
        </div>

        {/* Calendar iframe */}
        <div style={{ width: '100%', height: 'clamp(420px, 62vh, 640px)', position: 'relative' }}>
          <iframe
            title="Google Calendar"
            style={{
              width:        '100%',
              height:       '100%',
              border:       'none',
              display:      'block',
              filter:       isDark ? 'invert(1) hue-rotate(180deg) saturate(0.9) brightness(0.92)' : 'none',
            }}
            src={profile.calendar.embedUrl}
          />
        </div>

        {/* Footer */}
        <div style={{ background: isDark ? 'rgba(16,22,50,0.8)' : 'rgba(210,215,235,0.8)', padding: '0.5rem 1.2rem', fontFamily: 'monospace', fontSize: '0.7rem', color: C.textDim, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', borderTop: `1px solid ${C.success}15` }}>
          <span>zhengtingliu0104@gmail.com</span>
          <span>Google Calendar API v3</span>
        </div>
      </div>

      <style>{`
        @keyframes twBlink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
