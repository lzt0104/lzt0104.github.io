import { getColors } from '../theme';
import { profile } from '../data/profile';

export default function Footer({ isDark }) {
  const COLORS = getColors(isDark);

  return (
    <footer style={{ borderTop: `1px solid ${COLORS.accent}40`, padding: '2rem 1rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {profile.links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: COLORS.primary, textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.9rem' }}
            >
              [{link.name}]
            </a>
          ))}
        </div>
        <div style={{ fontSize: '0.8rem', color: COLORS.textDim, fontFamily: 'monospace' }}>
          {profile.copyright}
        </div>
      </div>
    </footer>
  );
}
