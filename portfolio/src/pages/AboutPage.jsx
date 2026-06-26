import { useEffect, useRef, useState } from 'react';
import { getColors } from '../theme';
import { profile } from '../data/profile';
import AnimatedSection from '../components/AnimatedSection';

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, active, speed = 32) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active) return;
    setIdx(0);
    let i = 0;
    const t = setInterval(() => {
      if (i >= text.length) { clearInterval(t); return; }
      setIdx(++i);
    }, speed);
    return () => clearInterval(t);
  }, [active, text, speed]);
  return { displayed: text.slice(0, idx), done: idx >= text.length };
}

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillRow({ skill, isDark }) {
  const C = getColors(isDark);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setWidth(skill.level), 60); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [skill.level]);

  const filled = Math.round(skill.level / 10);
  const bar    = '█'.repeat(filled) + '░'.repeat(10 - filled);

  return (
    <div ref={ref} style={{ fontFamily: 'monospace', fontSize: 'clamp(0.78rem, 2vw, 0.9rem)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ color: C.text }}>{skill.name}</span>
        <span style={{ color: C.accent }}>{skill.level}%</span>
      </div>
      {/* Animated pixel bar */}
      <div style={{ position: 'relative', height: '7px', background: C.bgLight, borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          width: `${width}%`,
          background: `linear-gradient(90deg, ${C.accent}, ${C.secondary})`,
          boxShadow: `0 0 14px ${C.accent}70`,
          borderRadius: '3px',
          transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      {/* ASCII bar (fades in after width animates) */}
      <div style={{ color: C.textDim, fontSize: '0.68rem', marginTop: '0.2rem', opacity: width > 0 ? 0.7 : 0, transition: 'opacity 0.5s 0.8s' }}>
        [{bar}]
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AboutPage({ isDark }) {
  const C = getColors(isDark);
  const { education, skills, research, bio, currentRole, intro } = profile;

  // Typewriter — activate when bio section enters viewport
  const bioRef = useRef(null);
  const [bioActive, setBioActive] = useState(false);
  const { displayed: bioText, done: bioDone } = useTypewriter(bio, bioActive, 28);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBioActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (bioRef.current) obs.observe(bioRef.current);
    return () => obs.disconnect();
  }, []);

  // Current processes — blink each dot every 2s
  const processes = [
    { pid: '1131', name: 'college.edu',        status: '雲科大 資管系' },
    { pid: '2024', name: 'yuanhe.studio',      status: '源核工作室 CEO' },
    { pid: '2025', name: 'huoxinren.co',       status: '火心壬 工程師' },
    { pid: '2026', name: 'nstc.research',      status: 'NSTC 計畫研究員' },
  ];

  const card = (accent) => ({
    background:    `linear-gradient(135deg, ${C.bgLight}ee, ${C.bg}ee)`,
    backdropFilter: 'blur(18px)',
    border:        `1px solid ${accent}40`,
    borderRadius:  '18px',
    padding:       'clamp(1.5rem, 4vw, 2.5rem)',
    position:      'relative',
    zIndex:        1,
    boxShadow:     `0 12px 40px -10px ${accent}18`,
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>

      {/* ── Bio card ──────────────────────────────────────────────────── */}
      <AnimatedSection>
        <div style={card(C.accent)}>
          {/* Terminal header */}
          <div style={{ fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: `1px solid ${C.accent}25`, paddingBottom: '0.9rem' }}>
            <span style={{ color: C.success }}>❯</span>
            <span style={{ color: C.accent }}>~</span>
            <span style={{ color: C.text, fontSize: 'clamp(1rem, 3vw, 1.4rem)', fontWeight: 'bold' }}>
              whoami<span className="tw-cursor">_</span>
            </span>
          </div>

          {/* Typewriter bio */}
          <div ref={bioRef} style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', lineHeight: '1.95', color: C.text, fontFamily: 'sans-serif', minHeight: '3em' }}>
              {bioText || ' '}
              {!bioDone && <span className="tw-cursor">▌</span>}
            </p>
          </div>

          {/* Process list — ps aux style */}
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.7rem, 2vw, 0.82rem)', background: `${C.bgLight}99`, border: `1px solid ${C.accent}20`, borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '3.5rem 1fr 1fr', gap: '0.3rem', padding: '0.5rem 1rem', background: `${C.accent}12`, color: C.textDim, borderBottom: `1px solid ${C.accent}15`, letterSpacing: '0.06em', fontSize: '0.72rem' }}>
              <span>PID</span><span>PROCESS</span><span>STATUS</span>
            </div>
            {processes.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '3.5rem 1fr 1fr', gap: '0.3rem', padding: '0.45rem 1rem', borderBottom: i < processes.length - 1 ? `1px solid ${C.accent}10` : 'none', color: C.text }}>
                <span style={{ color: C.textDim }}>{p.pid}</span>
                <span style={{ color: C.primary }}>{p.name}</span>
                <span className="process-running" style={{ color: C.success }}>● {p.status}</span>
              </div>
            ))}
          </div>

          {/* Role tag */}
          <div style={{ marginTop: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {currentRole.split(' / ').map((r, i) => (
              <span key={i} style={{ fontFamily: 'monospace', fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: `${C.secondary}18`, border: `1px solid ${C.secondary}50`, borderRadius: '20px', color: C.secondary }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Grid: Education + Skills ─────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>

        {/* Education */}
        <AnimatedSection delay={80}>
          <div style={card(C.secondary)}>
            <h3 style={{ fontFamily: 'monospace', color: C.secondary, marginBottom: '1.25rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
              $ cat education.log
            </h3>
            <div style={{ position: 'relative', paddingLeft: '1.2rem', borderLeft: `2px solid ${C.secondary}40` }}>
              {education.map((item, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: '0.75rem', paddingTop: '0.1rem' }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute', left: '-1.57rem', top: '0.35rem',
                    width: item.highlight ? '12px' : '8px',
                    height: item.highlight ? '12px' : '8px',
                    borderRadius: '50%',
                    background: item.highlight ? C.secondary : C.bgLight,
                    border: `2px solid ${item.highlight ? C.secondary : C.textDim}`,
                    boxShadow: item.highlight ? `0 0 10px ${C.secondary}80` : 'none',
                    transition: 'all 0.3s',
                    marginTop: '2px',
                  }} />
                  <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: item.highlight ? C.secondary : C.textDim, marginBottom: '0.2rem', letterSpacing: '0.04em' }}>
                    {item.year}
                  </div>
                  <div style={{ fontSize: 'clamp(0.82rem, 2vw, 0.92rem)', color: item.highlight ? C.text : C.textDim, lineHeight: 1.5 }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Skills */}
        <AnimatedSection delay={160}>
          <div style={card(C.accent)}>
            <h3 style={{ fontFamily: 'monospace', color: C.accent, marginBottom: '1.25rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
              $ ./check_skills --verbose
            </h3>
            <div style={{ display: 'grid', gap: '1.3rem' }}>
              {skills.map(s => <SkillRow key={s.name} skill={s} isDark={isDark} />)}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ── Research ─────────────────────────────────────────────────── */}
      <AnimatedSection delay={240}>
        <div style={{ ...card(C.highlight), marginTop: '1.5rem' }}>
          <h3 style={{ fontFamily: 'monospace', color: C.highlight, marginBottom: '1.5rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
            $ grep -r "research" ~/nstc/
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {research.map((r, i) => (
              <div key={i} className="research-card" style={{
                padding: '1.25rem 1.5rem',
                background: `linear-gradient(90deg, ${C.highlight}10, transparent 60%)`,
                borderLeft: `3px solid ${C.highlight}`,
                borderRadius: '0 12px 12px 0',
                transition: 'all 0.3s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{ background: C.highlight, color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 'bold', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
                    NSTC
                  </span>
                  <span style={{ color: C.highlight, fontFamily: 'monospace', fontSize: '0.8rem' }}>{r.id}</span>
                </div>
                <p style={{ margin: '0 0 0.6rem 0', color: C.text, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', lineHeight: 1.6 }}>{r.title}</p>
                <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: C.textDim, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {r.grade  && <span>grade: <span style={{ color: C.success, fontWeight: 'bold' }}>Grade {r.grade}</span></span>}
                  {r.amount && <span>grant: <span style={{ color: C.warning }}>NT$ {r.amount}</span></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <style>{`
        .tw-cursor { animation: twBlink 0.8s step-end infinite; color: inherit; }
        @keyframes twBlink { 50% { opacity: 0; } }
        .process-running { display: flex; align-items: center; gap: 0.3rem; }
        .research-card:hover { background: linear-gradient(90deg, ${C.highlight}18, transparent 60%) !important; transform: translateX(4px); }
      `}</style>
    </div>
  );
}
