"use client";

import { useEffect, useRef } from "react";

interface ParticleOverlayProps {
  weather?: "sun" | "rain" | "fog" | "fireflies";
}

export default function ParticleOverlay({ weather = "sun" }: ParticleOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse particle trail
    const mouseTrail: { x: number; y: number; alpha: number; size: number; color: string }[] = [];
    const handleMouseMove = (e: MouseEvent) => {
      mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.5 ? "rgba(245, 158, 11, " : "rgba(251, 191, 36, ",
      });
      if (mouseTrail.length > 25) mouseTrail.shift();
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Particle instances
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxAlpha: number;
      alphaSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = weather === "rain" ? 120 : weather === "fireflies" ? 60 : 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: weather === "rain" ? (Math.random() - 0.5) * 1.5 : (Math.random() - 0.5) * 0.8,
        vy: weather === "rain" ? Math.random() * 12 + 8 : -Math.random() * 1.2 - 0.3,
        size: weather === "rain" ? Math.random() * 2 + 1 : Math.random() * 3 + 1,
        alpha: Math.random(),
        maxAlpha: Math.random() * 0.7 + 0.3,
        alphaSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Mouse Sparks
      for (let i = mouseTrail.length - 1; i >= 0; i--) {
        const p = mouseTrail[i];
        p.alpha -= 0.04;
        p.y -= 0.5;
        p.size *= 0.95;

        if (p.alpha <= 0) {
          mouseTrail.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      // Render Weather / Background Ambient Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        p.alpha += p.alphaSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Reset boundaries
        if (weather === "rain") {
          if (p.y > height) {
            p.y = 0;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
        }

        ctx.beginPath();
        if (weather === "rain") {
          ctx.strokeStyle = `rgba(186, 230, 253, ${p.alpha * 0.6})`;
          ctx.lineWidth = p.size;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 2, p.y + 15);
          ctx.stroke();
        } else if (weather === "fireflies") {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          gradient.addColorStop(0, `rgba(163, 230, 53, ${p.alpha})`);
          gradient.addColorStop(1, "rgba(163, 230, 53, 0)");
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (weather === "fog") {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 20);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.08})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.size * 20, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Sun / Ember Sparks
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          gradient.addColorStop(0, `rgba(245, 158, 11, ${p.alpha})`);
          gradient.addColorStop(1, "rgba(245, 158, 11, 0)");
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weather]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full opacity-80"
    />
  );
}
