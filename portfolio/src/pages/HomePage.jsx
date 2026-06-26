import { useState, useEffect } from 'react';
import { getColors } from '../theme';
import { profile } from '../data/profile';
import Typewriter from '../components/Typewriter';

export default function HomePage({ setPage, isDark }) {
  const COLORS = getColors(isDark);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: 'calc(100vh - 300px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>

        {/* 打字機標題 */}
        <div style={{ fontSize: 'clamp(1rem, 4vw, 2rem)', marginBottom: '3rem', fontFamily: 'monospace', color: COLORS.text, wordBreak: 'break-word' }}>
          <span style={{ color: COLORS.highlight }}>{profile.name}</span>
          <span style={{ color: COLORS.primary }}>@blog</span>
          <span style={{ color: COLORS.primary }}>:~$ </span>
          <Typewriter text={profile.tagline} isDark={isDark} />
        </div>

        {show && (
          <>
            {/* 系統資訊卡片 */}
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.secondary}15)`,
              border: `2px solid ${COLORS.accent}`,
              borderRadius: '12px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              marginBottom: '2.5rem',
              boxShadow: `0 8px 32px ${COLORS.accent}20`,
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 'bold', marginBottom: '1.5rem', color: COLORS.highlight, fontFamily: 'monospace', textAlign: 'center' }}>
                ┌─┐ SYSTEM INFO ┌─┐
              </div>

              <div style={{ display: 'grid', gap: '1rem', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', fontFamily: 'monospace' }}>
                {profile.intro.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', textAlign: 'left' }}>
                    <span style={{ color: COLORS.warning, fontSize: '1.2rem', flexShrink: 0 }}>➜</span>
                    <span style={{ wordBreak: 'break-word' }}>
                      <span style={{ color: COLORS.accent, fontWeight: 'bold' }}>{item.label}:</span>
                      <span style={{ color: COLORS.text, marginLeft: '0.5rem' }}>{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem', height: '2px', background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)` }} />
            </div>

            {/* CTA 按鈕 */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setPage('projects')}
                style={{
                  background: COLORS.secondary,
                  color: COLORS.bg,
                  border: `2px solid ${COLORS.secondary}`,
                  padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: `0 4px 20px ${COLORS.secondary}40`,
                }}
              >
                [ 查看專案 ]
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
