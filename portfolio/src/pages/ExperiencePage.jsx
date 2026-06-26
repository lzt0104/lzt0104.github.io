import { getColors } from '../theme';
import { experiences, competitions, certifications } from '../data/experience';
import AnimatedSection from '../components/AnimatedSection';

// Generate a pseudo-hash for a year (purely visual)
const pseudoHash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(16).padStart(7, '0').slice(0, 7);
};

export default function ExperiencePage({ isDark }) {
  const C = getColors(isDark);
  const sortedDesc = (obj) => Object.keys(obj).sort().reverse();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>

      {/* ── git log: Experience ──────────────────────────────────────── */}
      <AnimatedSection>
        <div style={{
          background:    `linear-gradient(135deg, ${C.bgLight}ee, ${C.bg}ee)`,
          border:        `1px solid ${C.accent}40`,
          borderRadius:  '18px',
          padding:       'clamp(1.25rem, 4vw, 2.5rem)',
          marginBottom:  '1.5rem',
          backdropFilter: 'blur(12px)',
          position:      'relative',
          zIndex:         1,
        }}>
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: C.accent, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: C.success }}>❯</span>
            <span>git log --graph --all</span>
          </div>

          {sortedDesc(experiences).map((year, yi) => {
            const hash = pseudoHash(year);
            const isLatest = yi === 0;
            return (
              <AnimatedSection key={year} delay={yi * 70}>
                {/* Commit header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  {/* Graph node */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: '14px', height: '14px', borderRadius: '50%',
                      background: isLatest ? C.highlight : C.accent,
                      border:     `2px solid ${isLatest ? C.highlight : C.accent}`,
                      boxShadow:  `0 0 12px ${isLatest ? C.highlight : C.accent}80`,
                    }} />
                  </div>
                  {/* Hash */}
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: C.warning }}>{hash}</span>
                  {/* Year tag */}
                  <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', background: `${C.accent}20`, border: `1px solid ${C.accent}50`, color: C.accent, padding: '1px 10px', borderRadius: '4px' }}>
                    {year}
                  </span>
                  {/* HEAD tag for latest */}
                  {isLatest && (
                    <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', background: C.highlight, color: '#000', padding: '1px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                      HEAD
                    </span>
                  )}
                  {/* Entry count */}
                  <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: C.textDim, marginLeft: 'auto' }}>
                    {experiences[year].length} entries
                  </span>
                </div>

                {/* Commit body — entries with graph line */}
                <div style={{ marginLeft: '6px', borderLeft: `2px solid ${C.accent}35`, paddingLeft: '1.5rem', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>
                  {experiences[year].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.55rem', alignItems: 'flex-start', fontSize: 'clamp(0.82rem, 2vw, 0.9rem)' }}>
                      <span style={{ color: C.accent, fontFamily: 'monospace', flexShrink: 0, fontSize: '0.8rem', marginTop: '2px' }}>
                        {idx === experiences[year].length - 1 ? '└─' : '├─'}
                      </span>
                      <span style={{ color: C.text, lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </AnimatedSection>

      {/* ── Competitions ──────────────────────────────────────────────── */}
      <AnimatedSection delay={100}>
        <div style={{
          background:    `linear-gradient(135deg, ${C.bgLight}ee, ${C.bg}ee)`,
          border:        `1px solid ${C.secondary}40`,
          borderRadius:  '18px',
          padding:       'clamp(1.25rem, 4vw, 2.5rem)',
          marginBottom:  '1.5rem',
          backdropFilter: 'blur(12px)',
          position:      'relative',
          zIndex:         1,
        }}>
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: C.secondary, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: C.success }}>❯</span>
            <span>./run_competitions --all --sort=year</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {sortedDesc(competitions).map((year, yi) => (
              <AnimatedSection key={year} delay={yi * 90}>
                <div style={{ background: `${C.secondary}08`, border: `1px solid ${C.secondary}25`, borderRadius: '12px', overflow: 'hidden' }}>
                  {/* Year header */}
                  <div style={{ background: `${C.secondary}18`, padding: '0.6rem 1rem', fontFamily: 'monospace', fontSize: '0.88rem', color: C.secondary, borderBottom: `1px solid ${C.secondary}25`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>[ {year} ]</span>
                    <span style={{ fontSize: '0.7rem', color: C.textDim }}>{competitions[year].length} events</span>
                  </div>
                  {/* Competition list */}
                  <div style={{ padding: '0.75rem 1rem', display: 'grid', gap: '0.75rem' }}>
                    {competitions[year].map((comp, idx) => (
                      <div key={idx}>
                        <div style={{ fontSize: 'clamp(0.78rem, 2vw, 0.86rem)', color: C.text, lineHeight: 1.55, marginBottom: '0.35rem' }}>
                          {comp.name}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                          {comp.awards.map((award, ai) => (
                            <span key={ai} className="award-badge" style={{
                              background: `${C.success}18`, border: `1px solid ${C.success}50`,
                              color: C.success, padding: '1px 8px', borderRadius: '4px',
                              fontSize: '0.7rem', fontWeight: 'bold', fontFamily: 'monospace',
                              transition: 'all 0.2s',
                            }}>
                              ✓ {award}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Certifications ────────────────────────────────────────────── */}
      <AnimatedSection delay={200}>
        <div style={{
          background:    `linear-gradient(135deg, ${C.bgLight}ee, ${C.bg}ee)`,
          border:        `1px solid ${C.warning}40`,
          borderRadius:  '18px',
          padding:       'clamp(1.25rem, 4vw, 2.5rem)',
          backdropFilter: 'blur(12px)',
          position:      'relative',
          zIndex:         1,
        }}>
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: C.warning, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: C.success }}>❯</span>
            <span>apt list --installed 2&gt;/dev/null</span>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: C.textDim, marginBottom: '1.25rem' }}>
            Listing... {certifications.length} packages installed.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
            {certifications.map((cert, idx) => (
              <div key={idx} className="cert-pkg" style={{
                padding:    '0.55rem 0.85rem',
                background: `${C.warning}0c`,
                border:     `1px solid ${C.warning}30`,
                borderRadius: '7px',
                fontSize:   'clamp(0.72rem, 1.8vw, 0.8rem)',
                color:      C.text,
                fontFamily: 'monospace',
                transition: 'all 0.22s',
                display:    'flex',
                alignItems: 'center',
                gap:        '0.4rem',
              }}>
                <span style={{ color: C.success, flexShrink: 0, fontSize: '0.65rem' }}>✓</span>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <style>{`
        .award-badge:hover {
          background: color-mix(in srgb, ${C.success} 25%, transparent) !important;
          box-shadow: 0 2px 10px ${C.success}40;
          transform: translateY(-1px);
        }
        .cert-pkg:hover {
          background: color-mix(in srgb, ${C.warning} 12%, transparent) !important;
          border-color: ${C.warning} !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px ${C.warning}25;
        }
      `}</style>
    </div>
  );
}
