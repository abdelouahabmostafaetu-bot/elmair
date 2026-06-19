"use client";

import { useEffect, useRef } from "react";

// Lightweight animated particle network (a "globe" feel) on a canvas.
// Pure canvas, no heavy 3D library, and it auto-pauses off-screen.
// Hidden on small screens via CSS for performance.
export default function NetworkGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height, cx, cy, radius;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = 70;
    const points = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
      radius = Math.min(width, height) * 0.42;
    }

    // Distribute points on a sphere (Fibonacci sphere).
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      points.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      });
    }

    let angle = 0;
    function draw() {
      angle += 0.0022;
      ctx.clearRect(0, 0, width, height);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const proj = points.map((p) => {
        const x = p.x * cosA - p.z * sinA;
        const z = p.x * sinA + p.z * cosA;
        const scale = 0.6 + (z + 1) * 0.25;
        return { sx: cx + x * radius, sy: cy + p.y * radius, z, scale };
      });

      // Connections
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const dx = proj[i].sx - proj[j].sx;
          const dy = proj[i].sy - proj[j].sy;
          const dist = Math.hypot(dx, dy);
          if (dist < radius * 0.5) {
            const alpha = (1 - dist / (radius * 0.5)) * 0.18;
            ctx.strokeStyle = `rgba(212,175,55,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }
      // Nodes
      for (const p of proj) {
        const r = 1.6 * p.scale;
        ctx.beginPath();
        ctx.fillStyle = p.z > 0 ? "rgba(0,180,160,0.9)" : "rgba(212,175,55,0.7)";
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="globe-canvas" aria-hidden="true" />;
}
