import React, { useEffect, useRef } from "react";
import "./ParticleBackground.css";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight; // Changed: Use viewport height instead of full scroll
    }
    resize();
    window.addEventListener("resize", resize);

    const particleCount = 100; // Increased from 80
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8, // Slightly faster movement
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2.5 + 1, // Slightly larger particles
    }));

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)"; // Slightly more visible
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) { // Increased connection distance from 120
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 150) * 0.5})`; // More visible lines
            ctx.lineWidth = 0.6; // Thicker lines
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update particle positions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="particle-background-wrapper">
      <canvas ref={canvasRef} className="particle-background-canvas"></canvas>
      
      {/* Background Blobs - BIGGER & MORE VIBRANT */}
      <div className="bg-shape bg1"></div>
      <div className="bg-shape bg2"></div>
      <div className="bg-shape bg3"></div>
      <div className="bg-shape bg4"></div> {/* NEW */}
    </div>
  );
}
