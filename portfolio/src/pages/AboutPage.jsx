import { getColors } from '../theme';
import { profile } from '../data/profile';

export default function AboutPage({ isDark }) {
  const COLORS = getColors(isDark);
  const { education, skills, research, bio, currentRole } = profile;

  const card = {
    background: `linear-gradient(135deg, ${COLORS.bgLight}F2, ${COLORS.bg}F2)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${COLORS.accent}40`,
    borderRadius: '20px',
    padding: 'clamp(1.5rem, 4vw, 3rem)',
    boxShadow: `0 10px 40px -10px ${COLORS.accent}20`,
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      <div style={card}>

        {/* Header */}
        <div style={{ fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: `1px solid ${COLORS.accent}30`, paddingBottom: '1rem' }}>
          <span style={{ color: COLORS.success }}>&#x279E;</span>
          <span style={{ color: COLORS.accent }}>~</span>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: COLORS.text }}>
            whoami<span className="blinking-cursor">_</span>
          </h2>
        </div>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: COLORS.textDim }}>
          {bio}
          <br />
          <strong style={{ color: COLORS.text }}>目前身分：</strong>{currentRole}
        </p>

        {/* Grid: Education + Skills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '2.5rem' }}>

          {/* 學歷 */}
          <div>
            <h3 style={{ fontFamily: 'monospace', color: COLORS.secondary, marginBottom: '1rem', fontSize: '1.2rem' }}>
              $ cat education.log
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              {education.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0', borderLeft: `2px solid ${COLORS.bgLight}`, paddingLeft: '1rem' }}>
                  <div style={{ minWidth: '85px', fontFamily: 'monospace', color: item.highlight ? COLORS.accent : COLORS.textDim, fontWeight: item.highlight ? 'bold' : 'normal' }}>
                    {item.year}
                  </div>
                  <div style={{ color: item.highlight ? COLORS.text : COLORS.textDim }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 技能 */}
          <div>
            <h3 style={{ fontFamily: 'monospace', color: COLORS.secondary, marginBottom: '1rem', fontSize: '1.2rem' }}>
              $ ./check_skills.sh
            </h3>
            <div style={{ display: 'grid', gap: '1.2rem' }}>
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                    <span style={{ color: COLORS.text }}>{skill.name}</span>
                    <span style={{ fontFamily: 'monospace', color: COLORS.accent }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '6px', background: COLORS.bgLight, borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary})`,
                      boxShadow: `0 0 10px ${COLORS.accent}66`,
                      borderRadius: '3px',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 研究計畫（支援多筆） */}
        <div style={{ marginTop: '2.5rem', display: 'grid', gap: '1rem' }}>
          {research.map((r, i) => (
            <div key={i} style={{ padding: '1.5rem', background: `linear-gradient(90deg, ${COLORS.secondary}10, transparent)`, borderLeft: `4px solid ${COLORS.secondary}`, borderRadius: '0 8px 8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ background: COLORS.highlight, color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  NSTC PROJECT
                </span>
                <span style={{ color: COLORS.highlight, fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {r.id}
                </span>
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: COLORS.text, fontSize: '1.1rem' }}>{r.title}</h4>
              <div style={{ fontSize: '0.9rem', color: COLORS.textDim, fontFamily: 'monospace' }}>
                {r.grade && (
                  <span>Result: <span style={{ color: COLORS.success, fontWeight: 'bold' }}>Grade {r.grade}</span></span>
                )}
                {r.grade && r.amount && ' | '}
                {r.amount && (
                  <span>Grant: <span style={{ color: COLORS.warning }}>${r.amount}</span></span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .blinking-cursor { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
