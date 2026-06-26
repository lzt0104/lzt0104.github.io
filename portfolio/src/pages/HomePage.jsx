import { useState, useEffect } from 'react';
import { getColors } from '../theme';
import { profile } from '../data/profile';
import Typewriter from '../components/Typewriter';
import AnimatedSection from '../components/AnimatedSection';

export default function HomePage({ setPage, isDark }) {
  const COLORS = getColors(isDark);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: 'calc(100vh - 300px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>

        {/* Glitch name */}
        <div style={{ marginBottom: '1rem' }}>
          <span className="glitch-text" data-text={profile.name} style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: 'bold',
            color: COLORS.highlight,
            letterSpacing: '0.05em',
            display: 'inline-block',
          }}>
            {profile.name}
          </span>
        </div>

        {/* Typewriter prompt */}
        <div style={{ fontSize: 'clamp(0.9rem, 3vw, 1.5rem)', marginBottom: '3rem', fontFamily: 'monospace', color: COLORS.text, wordBreak: 'break-word' }}>
          <span style={{ color: COLORS.primary }}>@blog</span>
          <span style={{ color: COLORS.primary }}>:~$ </span>
          <Typewriter text={profile.tagline} isDark={isDark} />
        </div>

        {show && (
          <>
            {/* System info card */}
            <AnimatedSection delay={0}>
              <div style={{
                background: `linear-gradient(135deg, ${COLORS.accent}12, ${COLORS.secondary}12)`,
                border: `1px solid ${COLORS.accent}60`,
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                marginBottom: '2.5rem',
                backdropFilter: 'blur(16px)',
                animation: 'neonPulse 3s ease-in-out infinite',
                '--glow': `${COLORS.accent}44`,
              }}>
                <div style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontWeight: 'bold', marginBottom: '1.5rem', color: COLORS.highlight, fontFamily: 'monospace', letterSpacing: '0.15em' }}>
                  ┌─[ SYSTEM INFO ]──────────────────┐
                </div>

                <div style={{ display: 'grid', gap: '0.85rem', fontSize: 'clamp(0.82rem, 2.5vw, 0.98rem)', fontFamily: 'monospace' }}>
                  {profile.intro.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', textAlign: 'left' }}>
                      <span style={{ color: COLORS.warning, flexShrink: 0 }}>❯</span>
                      <span style={{ wordBreak: 'break-word' }}>
                        <span style={{ color: COLORS.accent }}>{item.label}:</span>
                        <span style={{ color: COLORS.text, marginLeft: '0.5rem' }}>{item.value}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem', height: '1px', background: `linear-gradient(90deg, transparent, ${COLORS.accent}80, transparent)` }} />
                <div style={{ marginTop: '0.5rem', fontFamily: 'monospace', fontSize: '0.75rem', color: `${COLORS.accent}80`, textAlign: 'right' }}>
                  └─────────────────────────────────────────────┘
                </div>
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={150}>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPage('about')}
                  className="cta-btn"
                  style={{ '--c': COLORS.accent, '--bg': COLORS.bg }}
                >
                  [ whoami ]
                </button>
                <button
                  onClick={() => setPage('projects')}
                  className="cta-btn"
                  style={{ '--c': COLORS.secondary, '--bg': COLORS.bg }}
                >
                  [ 查看專案 ]
                </button>
              </div>
            </AnimatedSection>
          </>
        )}
      </div>

      <style>{`
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0; top: 0;
          width: 100%;
          color: inherit;
          font: inherit;
        }
        .glitch-text::before {
          animation: glitch-1 3.5s infinite linear;
          color: #00d9ff;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
        }
        .glitch-text::after {
          animation: glitch-2 3.5s infinite linear;
          color: #ff79c6;
          clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
        }
        @keyframes glitch-1 {
          0%,90%,100% { transform: translate(0); opacity: 0; }
          91%          { transform: translate(-3px, 1px); opacity: 0.8; }
          93%          { transform: translate(3px, -1px); opacity: 0.8; }
          95%          { transform: translate(-2px, 0); opacity: 0.8; }
          97%          { transform: translate(0); opacity: 0; }
        }
        @keyframes glitch-2 {
          0%,85%,100% { transform: translate(0); opacity: 0; }
          86%          { transform: translate(3px, 2px); opacity: 0.7; }
          88%          { transform: translate(-3px, -2px); opacity: 0.7; }
          90%          { transform: translate(0); opacity: 0; }
        }
        .cta-btn {
          background: transparent;
          border: 1px solid var(--c);
          color: var(--c);
          padding: 0.8rem 2rem;
          font-family: monospace;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.05em;
        }
        .cta-btn:hover {
          background: var(--c);
          color: var(--bg);
          box-shadow: 0 0 20px var(--c), 0 0 40px color-mix(in srgb, var(--c) 30%, transparent);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
