import { getColors } from '../theme';
import { projects } from '../data/projects';
import AnimatedSection from '../components/AnimatedSection';

const STATUS_COLOR = (status, COLORS) => {
  if (status === '進行中') return COLORS.warning;
  if (status === '已上線') return COLORS.success;
  return COLORS.accent;
};

export default function ProjectsPage({ isDark }) {
  const COLORS = getColors(isDark);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)', position: 'relative', zIndex: 1 }}>
      <AnimatedSection>
        <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '2rem', color: COLORS.secondary, fontFamily: 'monospace' }}>
          $ ls -la ./projects/
        </h2>
      </AnimatedSection>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
        {projects.map((project, idx) => (
          <AnimatedSection key={idx} delay={idx * 80}>
            <div
              className="project-card"
              style={{
                background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
                border: `1px solid ${project.highlight ? COLORS.highlight + '80' : COLORS.secondary + '60'}`,
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backdropFilter: 'blur(10px)',
                '--hover-color': project.highlight ? COLORS.highlight : COLORS.secondary,
              }}
            >
              {/* 標題 + 狀態 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: project.highlight ? COLORS.highlight : COLORS.secondary, fontFamily: 'monospace', margin: 0, lineHeight: 1.4, flex: 1 }}>
                  {project.name}
                </h3>
                <span style={{ padding: '0.25rem 0.75rem', background: STATUS_COLOR(project.status, COLORS) + '22', border: `1px solid ${STATUS_COLOR(project.status, COLORS)}`, color: STATUS_COLOR(project.status, COLORS), borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                  {project.status}
                </span>
              </div>

              <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.92rem)', color: COLORS.textDim, lineHeight: '1.75', marginBottom: '1.5rem', flex: '1' }}>
                {project.description}
              </p>

              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: project.link ? '1.2rem' : '0' }}>
                  {project.tech.map((t) => (
                    <span key={t} style={{ padding: '0.2rem 0.6rem', background: `${COLORS.accent}18`, border: `1px solid ${COLORS.accent}50`, borderRadius: '4px', fontSize: '0.72rem', color: COLORS.accent, fontFamily: 'monospace' }}>
                      {t}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{ '--c': project.highlight ? COLORS.highlight : COLORS.primary, '--bg': COLORS.bg }}
                  >
                    查看專案 →
                  </a>
                )}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <style>{`
        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px color-mix(in srgb, var(--hover-color) 25%, transparent);
          border-color: var(--hover-color) !important;
        }
        .project-link {
          display: inline-block;
          padding: 0.45rem 1rem;
          background: transparent;
          border: 1px solid var(--c);
          border-radius: 6px;
          color: var(--c);
          text-decoration: none;
          font-family: monospace;
          font-size: 0.85rem;
          transition: all 0.25s;
        }
        .project-link:hover {
          background: var(--c);
          color: var(--bg);
          box-shadow: 0 0 16px color-mix(in srgb, var(--c) 50%, transparent);
        }
      `}</style>
    </div>
  );
}
