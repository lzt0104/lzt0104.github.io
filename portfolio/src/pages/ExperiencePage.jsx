import { getColors } from '../theme';
import { experiences, competitions, certifications } from '../data/experience';

export default function ExperiencePage({ isDark }) {
  const COLORS = getColors(isDark);

  const sectionCard = (borderColor) => ({
    background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
    border: `2px solid ${borderColor}`,
    borderRadius: '16px',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    marginBottom: '2rem',
    boxShadow: `0 8px 32px ${borderColor}20`,
  });

  const sortedDesc = (obj) => Object.keys(obj).sort().reverse();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>

      {/* 經歷 */}
      <div style={sectionCard(COLORS.accent)}>
        <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '2rem', color: COLORS.accent, fontFamily: 'monospace' }}>
          $ cat /etc/history
        </h2>
        <div style={{ display: 'grid', gap: '2rem' }}>
          {sortedDesc(experiences).map((year) => (
            <div key={year} style={{ borderLeft: `3px solid ${COLORS.accent}`, paddingLeft: '1.5rem' }}>
              <div style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', fontWeight: 'bold', marginBottom: '1rem', color: COLORS.highlight, fontFamily: 'monospace' }}>
                [{year}]
              </div>
              {experiences[year].map((item, idx) => (
                <div key={idx} style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', marginBottom: '0.8rem', color: COLORS.text, display: 'flex', gap: '0.5rem', wordBreak: 'break-word' }}>
                  <span style={{ color: COLORS.warning, flexShrink: 0 }}>➜</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 競賽 */}
      <div style={sectionCard(COLORS.secondary)}>
        <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '2rem', color: COLORS.secondary, fontFamily: 'monospace' }}>
          $ ./run competitions --all
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {sortedDesc(competitions).map((year) => (
            <div key={year}>
              <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', marginBottom: '1rem', color: COLORS.highlight, fontFamily: 'monospace' }}>
                {year}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.8rem' }}>
                {competitions[year].map((comp, idx) => (
                  <li key={idx} style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', color: COLORS.text, lineHeight: '1.6', wordBreak: 'break-word' }}>
                    {comp.name}
                    <div style={{ marginTop: '0.3rem' }}>
                      {comp.awards.map((award, aIdx) => (
                        <span key={aIdx} style={{ display: 'inline-block', background: COLORS.success, color: COLORS.bg, padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: 'clamp(0.7rem, 2vw, 0.75rem)', marginRight: '0.4rem', marginBottom: '0.4rem', fontWeight: 'bold' }}>
                          {award}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 證照 */}
      <div style={sectionCard(COLORS.warning)}>
        <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '2rem', color: COLORS.warning, fontFamily: 'monospace' }}>
          $ ./list --certs
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem' }}>
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              style={{ padding: '0.8rem 1rem', background: `${COLORS.warning}10`, border: `1px solid ${COLORS.warning}40`, borderRadius: '6px', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: COLORS.text, transition: 'all 0.3s', wordBreak: 'break-word' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.warning}20`; e.currentTarget.style.borderColor = COLORS.warning; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = `${COLORS.warning}10`; e.currentTarget.style.borderColor = `${COLORS.warning}40`; }}
            >
              {cert}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
