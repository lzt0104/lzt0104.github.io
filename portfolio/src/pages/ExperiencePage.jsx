import { getColors } from '../theme';
import { experiences, competitions, certifications } from '../data/experience';
import AnimatedSection from '../components/AnimatedSection';

export default function ExperiencePage({ isDark }) {
  const COLORS = getColors(isDark);
  const sortedDesc = (obj) => Object.keys(obj).sort().reverse();

  const sectionCard = (borderColor) => ({
    background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
    border: `1px solid ${borderColor}60`,
    borderRadius: '16px',
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    marginBottom: '2rem',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 1,
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>

      {/* 經歷 */}
      <AnimatedSection>
        <div style={sectionCard(COLORS.accent)}>
          <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '2rem', color: COLORS.accent, fontFamily: 'monospace' }}>
            $ cat /etc/history
          </h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {sortedDesc(experiences).map((year, yi) => (
              <AnimatedSection key={year} delay={yi * 60}>
                <div style={{ borderLeft: `2px solid ${COLORS.accent}60`, paddingLeft: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-9px', top: '4px', width: '16px', height: '16px', borderRadius: '50%', background: COLORS.bg, border: `2px solid ${COLORS.accent}`, boxShadow: `0 0 10px ${COLORS.accent}60` }} />
                  <div style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontWeight: 'bold', marginBottom: '1rem', color: COLORS.highlight, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                    [{year}]
                  </div>
                  {experiences[year].map((item, idx) => (
                    <div key={idx} style={{ fontSize: 'clamp(0.83rem, 2.5vw, 0.93rem)', marginBottom: '0.7rem', color: COLORS.text, display: 'flex', gap: '0.5rem', wordBreak: 'break-word' }}>
                      <span style={{ color: COLORS.warning, flexShrink: 0, marginTop: '1px' }}>❯</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 競賽 */}
      <AnimatedSection delay={100}>
        <div style={sectionCard(COLORS.secondary)}>
          <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '2rem', color: COLORS.secondary, fontFamily: 'monospace' }}>
            $ ./run competitions --all
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {sortedDesc(competitions).map((year, yi) => (
              <AnimatedSection key={year} delay={yi * 80}>
                <div>
                  <h3 style={{ fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', marginBottom: '1rem', color: COLORS.highlight, fontFamily: 'monospace', borderBottom: `1px solid ${COLORS.secondary}40`, paddingBottom: '0.5rem' }}>
                    {year}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.8rem' }}>
                    {competitions[year].map((comp, idx) => (
                      <li key={idx} style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.88rem)', color: COLORS.text, lineHeight: '1.6', wordBreak: 'break-word' }}>
                        {comp.name}
                        <div style={{ marginTop: '0.3rem', display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {comp.awards.map((award, aIdx) => (
                            <span key={aIdx} style={{ background: `${COLORS.success}22`, border: `1px solid ${COLORS.success}60`, color: COLORS.success, padding: '0.15rem 0.55rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 'bold' }}>
                              {award}
                            </span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 證照 */}
      <AnimatedSection delay={200}>
        <div style={sectionCard(COLORS.warning)}>
          <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '2rem', color: COLORS.warning, fontFamily: 'monospace' }}>
            $ ./list --certs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.6rem' }}>
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="cert-card"
                style={{ padding: '0.75rem 1rem', background: `${COLORS.warning}0e`, border: `1px solid ${COLORS.warning}35`, borderRadius: '8px', fontSize: 'clamp(0.75rem, 2vw, 0.83rem)', color: COLORS.text, wordBreak: 'break-word', transition: 'all 0.25s' }}
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <style>{`
        .cert-card:hover {
          background: color-mix(in srgb, #ffb86c 12%, transparent) !important;
          border-color: #ffb86c !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px color-mix(in srgb, #ffb86c 20%, transparent);
        }
      `}</style>
    </div>
  );
}
