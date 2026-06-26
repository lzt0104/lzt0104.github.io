import { getColors } from '../theme';
import { projects } from '../data/projects';

const STATUS_COLOR = (status, COLORS) => {
  if (status === '進行中') return COLORS.warning;
  if (status === '已上線') return COLORS.success;
  return COLORS.accent;
};

export default function ProjectsPage({ isDark }) {
  const COLORS = getColors(isDark);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 2rem)' }}>
      <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '2rem', color: COLORS.secondary, fontFamily: 'monospace' }}>
        $ ls -la ./projects/
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
        {projects.map((project, idx) => (
          <div
            key={idx}
            style={{
              background: `linear-gradient(135deg, ${COLORS.bgLight}ee, ${COLORS.bg}ee)`,
              border: `2px solid ${project.highlight ? COLORS.highlight : COLORS.secondary}`,
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              boxShadow: `0 8px 32px ${project.highlight ? COLORS.highlight : COLORS.secondary}20`,
              transition: 'all 0.3s',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 12px 40px ${project.highlight ? COLORS.highlight : COLORS.secondary}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 8px 32px ${project.highlight ? COLORS.highlight : COLORS.secondary}20`;
            }}
          >
            {/* 標題 + 狀態 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: project.highlight ? COLORS.highlight : COLORS.secondary, fontFamily: 'monospace', margin: 0, lineHeight: 1.4, flex: 1 }}>
                {project.name}
              </h3>
              <span style={{ padding: '0.3rem 0.8rem', background: STATUS_COLOR(project.status, COLORS), color: COLORS.bg, borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                {project.status}
              </span>
            </div>

            {/* 描述 */}
            <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', color: COLORS.text, lineHeight: '1.7', marginBottom: '1.5rem', flex: '1' }}>
              {project.description}
            </p>

            {/* 技術標籤 + 連結 */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: project.link ? '1.5rem' : '0' }}>
                {project.tech.map((t) => (
                  <span key={t} style={{ padding: '0.3rem 0.7rem', background: `${COLORS.accent}20`, border: `1px solid ${COLORS.accent}`, borderRadius: '4px', fontSize: '0.75rem', color: COLORS.accent, fontFamily: 'monospace' }}>
                    {t}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'transparent', border: `1px solid ${COLORS.primary}`, borderRadius: '6px', color: COLORS.primary, textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.85rem', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.target.style.background = COLORS.primary; e.target.style.color = COLORS.bg; }}
                  onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = COLORS.primary; }}
                >
                  查看專案 →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
