import { useState, useEffect, useRef } from 'react';
import { getColors } from '../theme';

export default function CustomCursor({ isDark }) {
  const C = getColors(isDark);
  const [pos,      setPos]     = useState({ x: -200, y: -200 });
  const [hovered,  setHovered] = useState(false);
  const [visible,  setVisible] = useState(false);
  const [isTouch,  setIsTouch] = useState(false);
  const rafRef = useRef(null);
  const pending = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Detect touch — hide on touch devices
    const onTouch = () => setIsTouch(true);
    window.addEventListener('touchstart', onTouch, { once: true });

    const onMove = (e) => {
      pending.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPos({ ...pending.current });
          rafRef.current = null;
        });
      }
    };

    const onOver = (e) => {
      const el = e.target.closest('a, button, input, select, [role="button"], [onclick], label');
      setHovered(!!el);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('touchstart', onTouch);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouch) return null;

  const size  = hovered ? 24 : 14;
  const color = hovered ? C.highlight : C.primary;

  return (
    <div
      aria-hidden="true"
      style={{
        position:      'fixed',
        left:          pos.x - size / 2,
        top:           pos.y - size / 2,
        width:         size,
        height:        size,
        border:        `2px solid ${color}`,
        background:    hovered ? color + '22' : 'transparent',
        pointerEvents: 'none',
        zIndex:        99999,
        transition:    'width 0.12s, height 0.12s, border-color 0.12s, background 0.12s, opacity 0.2s',
        opacity:       visible ? 1 : 0,
        boxShadow:     `0 0 ${hovered ? 10 : 6}px ${color}88`,
        animation:     hovered ? 'none' : 'cursorPulse 2s ease-in-out infinite',
      }}
    />
  );
}
