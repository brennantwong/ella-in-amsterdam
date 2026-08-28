import { useEffect, useRef } from 'react';

/**
 * Subtle ink-trail + glow cursor for a literary, mysterious feel.
 * - A canvas trail of soft orange dots that lag behind the pointer (rAF-lerped).
 * - A larger glow that trails with easing + a crisp core that tracks directly.
 * - Pointer-events: none; disabled on touch / coarse pointers.
 */
export default function CursorEffect() {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dot = dotRef.current;
    const glow = glowRef.current;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const target = { x: w / 2, y: h / 2 };
    const glowPos = { x: target.x, y: target.y };
    const trail = [];
    const MAX = 24;
    let raf = 0;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot) dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const tick = () => {
      // easing lag for the glow
      glowPos.x += (target.x - glowPos.x) * 0.16;
      glowPos.y += (target.y - glowPos.y) * 0.16;
      if (glow) glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) translate(-50%, -50%)`;

      trail.push({ x: glowPos.x, y: glowPos.y, life: 1 });
      if (trail.length > MAX) trail.shift();

      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const t = i / trail.length; // 0 oldest → 1 newest
        const radius = (2 + t * 5) * 4;
        const alpha = t * 0.18;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, `rgba(227, 82, 5, ${alpha})`);
        grad.addColorStop(1, 'rgba(227, 82, 5, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        p.life -= 0.045;
      }
      while (trail.length && trail[0].life <= 0) trail.shift();

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0 }} />
      <div
        ref={glowRef}
        style={{
          position: 'fixed', left: 0, top: 0, width: '34px', height: '34px', borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(227,82,5,0.32) 0%, rgba(227,82,5,0) 70%)',
          willChange: 'transform', filter: 'blur(2px)',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed', left: 0, top: 0, width: '6px', height: '6px', borderRadius: '9999px',
          backgroundColor: 'rgba(227,82,5,0.85)', willChange: 'transform',
        }}
      />
    </div>
  );
}