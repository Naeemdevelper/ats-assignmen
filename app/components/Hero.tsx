"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const numParticles = 90;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: numParticles }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    // 🧭 Track Mouse Movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 💫 Mouse interaction effect
        if (distance < mouse.current.radius) {
          const forceDirX = dx / distance;
          const forceDirY = dy / distance;
          const maxForce = (mouse.current.radius - distance) / mouse.current.radius;
          const force = maxForce * 2; // increase to make stronger
          p.vx -= forceDirX * force * 0.1;
          p.vy -= forceDirY * force * 0.1;
        }

        // move particle
        p.x += p.vx;
        p.y += p.vy;

        // edges bounce
        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        // connect nearby dots
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - dist / 400})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white bg-black">

      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src="https://dl.dropboxusercontent.com/s/7hfmpplgj4dxqp1dynv7h/hero-bg.mp4?rlkey=w6un8bm0vm8hxlscbd8rljr1c&st=l98ewe0x&dl=0"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

 
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />


      <div className="relative z-20 text-center px-6">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tight"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-indigo-400">ATS</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Revolutionizing Accounting with Modern Tech & Innovation
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-full text-white font-semibold shadow-lg shadow-indigo-500/40 transition-all"
        >
          Join Waitlist
        </motion.button>
      </div>
    </section>
  );
}
