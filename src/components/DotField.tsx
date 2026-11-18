'use client';

import { useEffect, useRef } from 'react';

const GAP = 16;

/** A field of dots that breathes slowly and swells away from the pointer. */
export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const dark = matchMedia('(prefers-color-scheme: dark)');
    const p = { x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0 };
    let raf = 0;
    let visible = true;
    let width = 0;
    let height = 0;
    let color = '#000';

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = getComputedStyle(canvas).color;
    };

    const draw = (t: number) => {
      const still = reduce.matches;
      const k = still ? 1 : 0.14;
      p.x += (p.tx - p.x) * k;
      p.y += (p.ty - p.y) * k;
      p.s += (p.ts - p.s) * (still ? 1 : 0.08);
      const time = still ? 0 : t / 1000;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      const ox = (width % GAP) / 2 + GAP / 2;
      const oy = (height % GAP) / 2 + GAP / 2;
      for (let y = oy; y < height; y += GAP) {
        for (let x = ox; x < width; x += GAP) {
          const dx = x - p.x;
          const dy = y - p.y;
          const f = Math.exp(-(dx * dx + dy * dy) / 5000) * p.s;
          const d = Math.hypot(dx, dy) || 1;
          const idle = Math.sin(time * 1.3 + x * 0.025 + y * 0.03);
          ctx.globalAlpha = 0.16 + 0.06 * idle + f * 0.7;
          ctx.beginPath();
          ctx.arc(x + (dx / d) * f * 8, y + (dy / d) * f * 8, Math.max(0.6, 1.15 + idle * 0.25 + f * 2.6), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      raf = visible && !reduce.matches ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (reduce.matches) draw(0);
      else if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const move = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      p.tx = event.clientX - box.left;
      p.ty = event.clientY - box.top;
      if (p.ts === 0 && p.s < 0.01) {
        p.x = p.tx;
        p.y = p.ty;
      }
      p.ts = 1;
      start();
    };
    const leave = () => {
      p.ts = 0;
      start();
    };
    const restyle = () => {
      resize();
      start();
    };

    const resizeObserver = new ResizeObserver(restyle);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    visibility.observe(canvas);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    dark.addEventListener('change', restyle);
    reduce.addEventListener('change', restyle);
    restyle();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
      dark.removeEventListener('change', restyle);
      reduce.removeEventListener('change', restyle);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-field" aria-hidden="true" />;
}
