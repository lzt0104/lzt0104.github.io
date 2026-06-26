import { getColors } from '../theme';
import { projects } from '../data/projects';
import AnimatedSection from '../components/AnimatedSection';

const STATUS_COLOR = (status, C) => {
  if (status === '進行中') return C.warning;
  if (status === '已上線') return C.success;
  return C.accent;
};

// Stable fake "file size" for each project (just for ls -la aesthetics)
const FAKE_SIZES = ['12.4K', ' 8.7K', '31.2K', '18.9K', ' 5.2K', '24.1K', '42.8K'];
const FAKE_DATES = ['Jun  2', 'May 18', 'Apr  7', 'Jan 14', 'Mar 22', 'Feb  9', 'Nov 30'];

export default function ProjectsPage({ isDark }) {
  const C = getColors(isDark);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)', position: 'relative', zIndex: 1 }}>

      {/* ── ls -la header ────────────────────────────────────────────── */}
      <AnimatedSection>
        <div style={{ fontFamily: 'monospace', marginBottom: '2rem' }}>
          <div style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)', color: C.secondary, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: C.success }}>❯</span>
            <span style={{ color: C.accent }}>~/projects</span>
            <span style={{ color: C.text }}> ls -la</span>
          </div>
          <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.78rem)', color: C.textDim, padding: '0.6rem 0', borderBottom: `1px solid ${C.accent}20`, display: 'flex', gap: 'clamp(0.8rem, 3vw, 2rem)', flexWrap: 'wrap' }}>
            <span>total {projects.length}</span>
            <span style={{ color: C.accent }}>drwxr-xr-x</span>
            <span>劉政廷</span>
            <span>portfolio</span>
            <span style={{ color: C.highlight }}>Jun 26 2026</span>
            <span style={{ color: C.success }}>.</span>
          </div>
          {/* ls rows */}
          {projects.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 'clamp(0.6rem, 2vw, 1.5rem)', fontSize: 'clamp(0.68rem, 1.6vw, 0.76rem)', color: C.textDim, padding: '0.2rem 0', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: C.accent + '99' }}>-rwxr--r--</span>
              <span style={{ color: C.textDim }}>1</span>
              <span style={{ color: C.textDim + '99', minWidth: '3.5rem', textAlign: 'right' }}>{FAKE_SIZES[i]}</span>
              <span style={{ color: C.textDim + '80' }}>{FAKE_DATES[i]}</span>
              <span style={{ color: p.highlight ? C.highlight : C.text }}>{p.name}</span>
              {p.highlight && <span style={{ color: C.success, fontSize: '0.65rem' }}>★ highlight</span>}
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ── Cards ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
        {projects.map((project, idx) => (
          <AnimatedSection key={idx} delay={idx * 70}>
            <div
              className="project-card"
              style={{
                background:     `linear-gradient(135deg, ${C.bgLight}ee, ${C.bg}ee)`,
                border:         `1px solid ${project.highlight ? C.highlight + '70' : C.secondary + '55'}`,
                borderRadius:   '16px',
                padding:        'clamp(1.25rem, 3vw, 1.8rem)',
                transition:     'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                display:        'flex',
                flexDirection:  'column',
                height:         '100%',
                backdropFilter: 'blur(12px)',
                position:       'relative',
                overflow:       'hidden',
                '--hc':         project.highlight ? C.highlight : C.secondary,
              }}
            >
              {/* Scan shimmer — pure CSS */}
              <div className="card-shimmer" />

              {/* Index badge */}
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: 'monospace', fontSize: '0.68rem', color: C.textDim }}>
                [{String(idx + 1).padStart(2, '0')}]
              </div>

              {/* Title + status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.9rem', flexWrap: 'wrap', gap: '0.5rem', paddingRight: '2rem' }}>
                <h3 style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)', color: project.highlight ? C.highlight : C.secondary, fontFamily: 'monospace', margin: 0, lineHeight: 1.4 }}>
                  {project.highlight && <span style={{ color: C.warning, marginRight: '0.3rem' }}>★</span>}
                  {project.name}
                </h3>
                <span style={{ padding: '0.2rem 0.65rem', background: STATUS_COLOR(project.status, C) + '20', border: `1px solid ${STATUS_COLOR(project.status, C)}`, color: STATUS_COLOR(project.status, C), borderRadius: '20px', fontSize: '0.72rem', fontWeight: 'bold', fontFamily: 'monospace', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {project.status}
                </span>
              </div>

              <p style={{ fontSize: 'clamp(0.82rem, 2vw, 0.9rem)', color: C.textDim, lineHeight: '1.8', marginBottom: '1.25rem', flex: '1' }}>
                {project.description}
              </p>

              <div style={{ marginTop: 'auto' }}>
                {/* Tech tags */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: project.link ? '1rem' : '0' }}>
                  {project.tech.map(t => (
                    <span key={t} style={{ padding: '0.18rem 0.55rem', background: `${C.accent}15`, border: `1px solid ${C.accent}45`, borderRadius: '4px', fontSize: '0.7rem', color: C.accent, fontFamily: 'monospace' }}>
                      {t}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="proj-link" style={{ '--c': project.highlight ? C.highlight : C.primary, '--bg': C.bg }}>
                    查看專案 →
                  </a>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* ── Footer summary ────────────────────────────────────────────── */}
      <AnimatedSection delay={projects.length * 70 + 100}>
        <div style={{ marginTop: '2rem', fontFamily: 'monospace', fontSize: '0.78rem', color: C.textDim, borderTop: `1px solid ${C.accent}20`, paddingTop: '1rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span><span style={{ color: C.accent }}>{projects.length}</span> projects found</span>
          <span><span style={{ color: C.highlight }}>{projects.filter(p => p.highlight).length}</span> highlighted</span>
          <span><span style={{ color: C.success }}>{projects.filter(p => p.status === '已上線' || p.status === '進行中').length}</span> active</span>
        </div>
      </AnimatedSection>

      <style>{`
        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px color-mix(in srgb, var(--hc) 20%, transparent);
          border-color: var(--hc) !important;
        }
        /* Shimmer sweep on hover */
        .card-shimmer {
          position: absolute;
          top: 0; left: -80%;
          width: 60%; height: 100%;
          background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%);
          pointer-events: none;
          transform: skewX(-18deg);
        }
        .project-card:hover .card-shimmer {
          animation: shimmerSweep 0.65s ease-out 1;
        }
        @keyframes shimmerSweep {
          from { left: -80%; }
          to   { left: 130%; }
        }
        .proj-link {
          display: inline-block;
          padding: 0.4rem 0.95rem;
          border: 1px solid var(--c);
          border-radius: 6px;
          color: var(--c);
          text-decoration: none;
          font-family: monospace;
          font-size: 0.83rem;
          transition: all 0.22s;
        }
        .proj-link:hover {
          background: var(--c);
          color: var(--bg);
          box-shadow: 0 0 18px color-mix(in srgb, var(--c) 45%, transparent);
        }
      `}</style>
    </div>
  );
}
