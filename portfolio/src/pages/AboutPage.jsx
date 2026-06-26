import { useEffect, useRef, useState } from 'react';
import { getColors } from '../theme';
import { profile } from '../data/profile';
import AnimatedSection from '../components/AnimatedSection';

function AnimatedSkillBar({ skill, isDark }) {
  const COLORS = getColors(isDark);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setWidth(skill.level), 80); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [skill.level]);

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
        <span style={{ color: COLORS.text, fontFamily: 'monospace' }}>{skill.name}</span>
        <span style={{ fontFamily: 'monospace', color: COLORS.accent }}>{skill.level}%</span>
      </div>
      <div style={{ height: '6px', background: `${COLORS.bgLight}`, borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          width: `${width}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary})`,
          boxShadow: `0 0 12px ${COLORS.accent}80`,
          borderRadius: '3px',
          transition: 'width 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </div>
    </div>
  );
}

export default function AboutPage({ isDark }) {
  const COLORS = getColors(isDark);
  const { education, skills, research, bio, currentRole } = profile;

  const card = {
    background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
    backdropFilter: 'blur(16px)',
    border: `1px solid ${COLORS.accent}40`,
    borderRadius: '20px',
    padding: 'clamp(1.5rem, 4vw, 3rem)',
    boxShadow: `0 10px 40px -10px ${COLORS.accent}20`,
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      <AnimatedSection>
        <div style={card}>

          {/* Header */}
          <div style={{ fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: `1px solid ${COLORS.accent}30`, paddingBottom: '1rem' }}>
            <span style={{ color: COLORS.success }}>&#x279E;</span>
            <span style={{ color: COLORS.accent }}>~</span>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: COLORS.text }}>
              whoami<span className="blinking-cursor">_</span>
            </h2>
          </div>

          <p style={{ fontSize: '1.05rem', lineHeight: '1.9', color: COLORS.textDim }}>
            {bio}
            <br />
            <strong style={{ color: COLORS.text }}>目前身分：</strong>{currentRole}
          </p>

          {/* Grid: Education + Skills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '2.5rem' }}>

            {/* 學歷 */}
            <AnimatedSection delay={80}>
              <div>
                <h3 style={{ fontFamily: 'monospace', color: COLORS.secondary, marginBottom: '1rem', fontSize: '1.1rem' }}>
                  $ cat education.log
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {education.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '1rem', padding: '0.55rem 0 0.55rem 1rem',
                      borderLeft: `2px solid ${item.highlight ? COLORS.accent + '80' : COLORS.bgLight}`,
                      position: 'relative',
                    }}>
                      {item.highlight && (
                        <div style={{ position: 'absolute', left: '-5px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: COLORS.accent, boxShadow: `0 0 8px ${COLORS.accent}` }} />
                      )}
                      <div style={{ minWidth: '85px', fontFamily: 'monospace', fontSize: '0.82rem', color: item.highlight ? COLORS.accent : COLORS.textDim, fontWeight: item.highlight ? 'bold' : 'normal' }}>
                        {item.year}
                      </div>
                      <div style={{ color: item.highlight ? COLORS.text : COLORS.textDim, fontSize: '0.9rem' }}>
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* 技能 */}
            <AnimatedSection delay={160}>
              <div>
                <h3 style={{ fontFamily: 'monospace', color: COLORS.secondary, marginBottom: '1rem', fontSize: '1.1rem' }}>
                  $ ./check_skills.sh
                </h3>
                <div style={{ display: 'grid', gap: '1.2rem' }}>
                  {skills.map((skill) => (
                    <AnimatedSkillBar key={skill.name} skill={skill} isDark={isDark} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* 研究計畫 */}
          <AnimatedSection delay={240}>
            <div style={{ marginTop: '2.5rem', display: 'grid', gap: '1rem' }}>
              {research.map((r, i) => (
                <div key={i} style={{
                  padding: '1.5rem',
                  background: `linear-gradient(90deg, ${COLORS.secondary}15, transparent)`,
                  borderLeft: `3px solid ${COLORS.secondary}`,
                  borderRadius: '0 12px 12px 0',
                  transition: 'all 0.3s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ background: COLORS.highlight, color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                      NSTC PROJECT
                    </span>
                    <span style={{ color: COLORS.highlight, fontFamily: 'monospace', fontSize: '0.85rem' }}>{r.id}</span>
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.text, fontSize: '1rem', lineHeight: 1.5 }}>{r.title}</h4>
                  <div style={{ fontSize: '0.88rem', color: COLORS.textDim, fontFamily: 'monospace' }}>
                    {r.grade && <span>Result: <span style={{ color: COLORS.success, fontWeight: 'bold' }}>Grade {r.grade}</span></span>}
                    {r.grade && r.amount && ' | '}
                    {r.amount && <span>Grant: <span style={{ color: COLORS.warning }}>${r.amount}</span></span>}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

        </div>
      </AnimatedSection>

      <style>{`
        .blinking-cursor { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
