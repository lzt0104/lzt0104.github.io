import { getColors } from '../theme';

export default function Scanlines({ isDark }) {
  const COLORS = getColors(isDark);
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        background: `repeating-linear-gradient(0deg, ${COLORS.scanlineColor} 0px, transparent 2px)`,
        opacity: 0.4,
      }}
    />
  );
}
