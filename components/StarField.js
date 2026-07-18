'use client';

import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let w, h, t, rafId;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.documentElement.scrollHeight;
      buildStars();
    }

    function buildStars() {
      const count = Math.floor((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.3,
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    t = 0;
    function draw() {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const twinkle = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
        ctx.globalAlpha = s.baseAlpha * twinkle;
        ctx.fillStyle = '#fbf3e6';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas id="sky" ref={canvasRef} aria-hidden="true" />;
}
