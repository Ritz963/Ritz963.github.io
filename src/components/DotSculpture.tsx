'use client';

import { useEffect, useRef, useState } from 'react';

type Shape = 'orbit' | 'wave' | 'bloom';
const shapes: Shape[] = ['orbit', 'wave', 'bloom'];

export default function DotSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shape, setShape] = useState<Shape>('orbit');
  const rotation = useRef({ x: .5, y: .55 });
  const drawRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let frame = 0;
    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.scale(ratio, ratio);
      context.fillStyle = getComputedStyle(canvas).color;
      const points: number[][] = [];
      const rx = rotation.current.x, ry = rotation.current.y;
      for (let i = 0; i < 48; i++) {
        for (let j = 0; j < 28; j++) {
          const u = i / 48 * Math.PI * 2, v = j / 28 * Math.PI * 2;
          let x, y, z;
          if (shape === 'orbit') {
            x = (.72 + .28 * Math.cos(v)) * Math.cos(u);
            y = (.72 + .28 * Math.cos(v)) * Math.sin(u);
            z = .28 * Math.sin(v);
          } else if (shape === 'wave') {
            x = (i / 47 - .5) * 2;
            y = (j / 27 - .5) * 2;
            z = .27 * Math.sin(x * 3 + y * 2);
          } else {
            const r = .63 + .23 * Math.cos(5 * u) * Math.sin(v);
            x = r * Math.sin(v) * Math.cos(u);
            y = r * Math.sin(v) * Math.sin(u);
            z = r * Math.cos(v);
          }
          const xx = x * Math.cos(ry) + z * Math.sin(ry);
          const zz = -x * Math.sin(ry) + z * Math.cos(ry);
          points.push([xx, y * Math.cos(rx) - zz * Math.sin(rx), y * Math.sin(rx) + zz * Math.cos(rx)]);
        }
      }
      const scale = Math.min(width * .37, height * .4);
      points.sort((a, b) => a[2] - b[2]);
      for (const [x, y, z] of points) {
        context.globalAlpha = Math.min(1, .25 + (z + 1) * .3);
        context.beginPath();
        context.arc(width / 2 + x * scale, height / 2 + y * scale, Math.max(.6, .95 + z * .3), 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); };
    drawRef.current = schedule;
    const observer = new ResizeObserver(schedule);
    observer.observe(canvas);
    const theme = matchMedia('(prefers-color-scheme: dark)');
    theme.addEventListener('change', schedule);
    draw();
    return () => { observer.disconnect(); theme.removeEventListener('change', schedule); cancelAnimationFrame(frame); drawRef.current = () => {}; };
  }, [shape]);

  return <div className="sculpture">
    <canvas ref={canvasRef} role="img" aria-label={`${shape} dot sculpture. Move your pointer to rotate; use the buttons below to change shape or rotate.`}
      onPointerMove={event => {
        if (event.pointerType === 'touch' && !event.buttons) return;
        const box = event.currentTarget.getBoundingClientRect();
        rotation.current = { x: (event.clientY - box.top) / box.height * 1.5 - .75, y: (event.clientX - box.left) / box.width * 2 - 1 };
        drawRef.current();
      }}>
      Interactive geometric dot sculpture.
    </canvas>
    <div className="sculpture-controls" aria-label="Sculpture controls">
      {shapes.map((item, i) => <button key={item} type="button" aria-pressed={shape === item} onClick={() => setShape(item)}>{String(i + 1).padStart(2, '0')} / {item}</button>)}
      <button type="button" aria-label="Rotate sculpture" onClick={() => { rotation.current.y += Math.PI / 6; drawRef.current(); }}>↻</button>
    </div>
  </div>;
}
