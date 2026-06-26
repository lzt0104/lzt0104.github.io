import { useState, useEffect } from 'react';
import { getColors } from '../theme';

export default function Typewriter({ text, speed = 80, isDark }) {
  const COLORS = getColors(isDark);
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplay((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span style={{ fontFamily: 'monospace', color: COLORS.primary }}>
      {display}
      <span style={{ animation: 'blink 1s infinite' }}>▊</span>
    </span>
  );
}
