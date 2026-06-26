import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF</>{}[]';

export default function MatrixRain({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fontSize = 13;
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const columns = () => Math.floor(canvas.width / fontSize);
    let drops = Array(columns()).fill(1);

    const color = isDark ? '#00d9ff' : '#0066ff';
    const bg    = isDark ? 'rgba(10,14,39,0.05)' : 'rgba(248,249,252,0.05)';

    const draw = () => {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        // bright head, dim tail
        ctx.fillStyle = Math.random() > 0.92 ? '#ffffff' : `${color}${Math.random() > 0.5 ? '90' : '30'}`;
        ctx.fillText(ch, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animId = requestAnimationFrame(draw);
    };

    // throttle to ~20fps
    let last = 0;
    const throttled = (ts) => {
      if (ts - last > 50) { last = ts; draw(); }
      else animId = requestAnimationFrame(throttled);
    };
    animId = requestAnimationFrame(throttled);

    const onResize = () => {
      resize();
      drops = Array(columns()).fill(1);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        opacity: 0.12, pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
