import { useRef, useState, useCallback, useEffect } from 'react';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const FLIP_MS = 600;
const SHADE_MAX = 0.55;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/**
 * Interactive flippable book.
 *
 * - CSS 3D transforms (perspective, transform-style: preserve-3d, rotateY); each
 *   leaf has a front + back face (backface-visibility: hidden).
 * - Drag/swipe a page corner to turn it (Pointer Events → mouse + touch). Tap the
 *   right half to go forward, left half to go back. Arrow keys also work.
 * - A gradient overlay on the turning page intensifies with the flip angle for depth.
 * - Snaps animate via a GPU-friendly CSS transition (cubic-bezier easing) — no layout
 *   thrash, ~60fps. Pointer-move is rAF-throttled.
 * - `mode`: 'spread' (two-page) | 'single' (one-page width).
 * - Responsive: the book fills its container; page size is measured live on drag.
 * - `pages`: array of React nodes (images, HTML, anything) — faces pair onto leaves
 *   (front = pages[2i], back = pages[2i+1]).
 *
 * Transform/transition live in CSS (.ibook-leaf + data-flipped) so imperative
 * drag styles are never clobbered by React re-renders.
 */
export default function InteractiveBook({
  pages = [],
  mode = 'spread',
  startPage = 0,
  className = '',
  ariaLabel = 'Interactive book',
}) {
  const numLeaves = Math.max(1, Math.ceil(pages.length / 2));
  const [current, setCurrent] = useState(() => clamp(startPage, 0, numLeaves));
  const [dragging, setDragging] = useState(null);

  const containerRef = useRef(null);
  const leafRefs = useRef([]);
  const drag = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    setCurrent((c) => clamp(c, 0, numLeaves));
  }, [numLeaves]);

  useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  const paintLeaf = (i, angle, shade) => {
    const el = leafRefs.current[i];
    if (!el) return;
    el.style.transform = `rotateY(${angle}deg)`;
    el.querySelectorAll('[data-shade]').forEach((ov) => { ov.style.opacity = String(shade); });
    const curlPos = 50 + (angle / 180) * 50;
    const curlBg = `linear-gradient(90deg, transparent ${curlPos - 15}%, rgba(255,255,255,0.25) ${curlPos}%, transparent ${curlPos + 15}%)`;
    el.querySelectorAll('[data-curl]').forEach((ov) => { ov.style.background = curlBg; });
  };

  const onPointerMove = useCallback((e) => {
    const ds = drag.current;
    if (!ds) return;
    const dx = e.clientX - ds.startX;
    let angle;
    if (ds.dir === 'fwd') angle = clamp((180 * dx) / ds.pageWidth, -180, 0);
    else angle = clamp(-180 + (180 * dx) / ds.pageWidth, -180, 0);
    const shade = clamp(Math.abs(angle) / 180, 0, 1) * SHADE_MAX;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => paintLeaf(ds.leaf, angle, shade));
  }, []);

  const releaseLeaf = (i, targetAngle, commit) => {
    const el = leafRefs.current[i];
    if (!el) {
      if (commit) setCurrent((c) => c + (commit === 'fwd' ? 1 : -1));
      setDragging(null);
      return;
    }
    el.style.transition = `transform ${FLIP_MS}ms ${EASE}`;
    el.style.transform = `rotateY(${targetAngle}deg)`;
    el.querySelectorAll('[data-shade]').forEach((ov) => {
      ov.style.setProperty('--peak-shade', String(SHADE_MAX));
      ov.style.animation = `pageShadowArc ${FLIP_MS}ms ${EASE}`;
    });
    const done = (ev) => {
      if (ev.propertyName !== 'transform') return;
      el.removeEventListener('transitionend', done);
      el.style.transition = '';
      el.style.transform = '';
      el.querySelectorAll('[data-shade]').forEach((ov) => { ov.style.animation = ''; ov.style.opacity = ''; });
      if (commit) setCurrent((c) => c + (commit === 'fwd' ? 1 : -1));
      setDragging(null);
    };
    el.addEventListener('transitionend', done);
  };

  const onPointerUp = useCallback((e) => {
    const ds = drag.current;
    if (!ds) return;
    drag.current = null;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    if (raf.current) cancelAnimationFrame(raf.current);
    e.target.releasePointerCapture?.(e.pointerId);

    const dx = e.clientX - ds.startX;
    const moved = Math.abs(dx);
    let target, commit;
    if (ds.dir === 'fwd') {
      const progress = clamp(-dx / ds.pageWidth, 0, 1);
      if (moved < 6 || progress > 0.5) { target = -180; commit = 'fwd'; }
      else { target = 0; commit = null; }
    } else {
      const progress = clamp(dx / ds.pageWidth, 0, 1);
      if (moved < 6 || progress > 0.5) { target = 0; commit = 'back'; }
      else { target = -180; commit = null; }
    }
    releaseLeaf(ds.leaf, target, commit);
  }, [onPointerMove]);

  const onPointerDown = useCallback((e) => {
    if (drag.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pageWidth = mode === 'spread' ? rect.width / 2 : rect.width;
    const spineX = rect.left + (mode === 'spread' ? pageWidth : 0);
    const fwd = e.clientX >= spineX;
    const leaf = fwd ? current : current - 1;
    if (leaf < 0 || leaf >= numLeaves) return;
    e.preventDefault();
    drag.current = { leaf, dir: fwd ? 'fwd' : 'back', startX: e.clientX, pageWidth };
    e.target.setPointerCapture?.(e.pointerId);
    setDragging({ leaf });
    const el = leafRefs.current[leaf];
    if (el) {
      el.style.transition = 'none';
      el.style.transform = `rotateY(${fwd ? 0 : -180}deg)`;
    }
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, [current, numLeaves, mode, onPointerMove, onPointerUp]);

  useEffect(() => () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  }, [onPointerMove, onPointerUp]);

  const flip = useCallback((dir) => {
    const leaf = dir === 'fwd' ? current : current - 1;
    if (leaf < 0 || leaf >= numLeaves || drag.current) return;
    setDragging({ leaf });
    releaseLeaf(leaf, dir === 'fwd' ? -180 : 0, dir);
  }, [current, numLeaves]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' && current < numLeaves) { e.preventDefault(); flip('fwd'); }
    else if (e.key === 'ArrowLeft' && current > 0) { e.preventDefault(); flip('back'); }
  };

  const zFor = (i) => {
    if (dragging && i === dragging.leaf) return 1000;
    return i < current ? i + 1 : numLeaves - i + 2;
  };

  const shadeBg = 'linear-gradient(to right, rgba(0,0,0,0.30), rgba(0,0,0,0.06) 45%, transparent 75%)';

  return (
    <div
      ref={containerRef}
      className={`ibook relative select-none ${className}`}
      style={{ perspective: '2000px', touchAction: 'none' }}
      role="group"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className="ibook-inner relative"
        style={{
          width: '100%',
          aspectRatio: mode === 'spread' ? '4 / 3' : '2 / 3',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Page-block edge (right side) for thickness cue */}
        {mode === 'spread' && (
          <div
            className="absolute top-1 bottom-1"
            style={{ right: '-4px', width: '6px', background: 'linear-gradient(to bottom, #D6CCB5, #F5F2E8, #D6CCB5)', borderRadius: '1px', boxShadow: '2px 0 6px rgba(0,0,0,0.15)' }}
          />
        )}

        {Array.from({ length: numLeaves }).map((_, i) => {
          const front = pages[2 * i];
          const back = pages[2 * i + 1];
          return (
            <div
              key={i}
              ref={(el) => { leafRefs.current[i] = el; }}
              className="ibook-leaf"
              data-flipped={i < current ? 'true' : 'false'}
              style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: mode === 'spread' ? '50%' : '0',
                width: mode === 'spread' ? '50%' : '100%',
                zIndex: zFor(i),
              }}
            >
              {/* Front face */}
              <div
                className="ibook-face"
                style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', overflow: 'hidden', backgroundColor: '#F5F2E8' }}
              >
                {front}
                <div data-shade className="ibook-shade" style={{ position: 'absolute', inset: 0, background: shadeBg, pointerEvents: 'none' }} />
                <div data-curl style={{ position: 'absolute', inset: 0, background: 'transparent', pointerEvents: 'none' }} />
              </div>
              {/* Back face */}
              <div
                className="ibook-face"
                style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', overflow: 'hidden', backgroundColor: '#F5F2E8' }}
              >
                {back}
                <div data-shade className="ibook-shade" style={{ position: 'absolute', inset: 0, background: shadeBg, pointerEvents: 'none' }} />
                <div data-curl style={{ position: 'absolute', inset: 0, background: 'transparent', pointerEvents: 'none' }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact shadow */}
      <div
        aria-hidden
        style={{
          position: 'absolute', left: '4%', right: '4%', bottom: '-12px', height: '18px',
          background: 'radial-gradient(ellipse at center, rgba(17,21,26,0.35) 0%, rgba(17,21,26,0) 70%)',
          filter: 'blur(7px)', zIndex: -1,
        }}
      />
    </div>
  );
}