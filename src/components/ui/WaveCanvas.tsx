import React, { useRef, useEffect } from 'react';

interface Blob {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  speedX: number;
  speedY: number;
  color: string;
  phase: number;
  pulseSpeed: number;
  wobbleAmount: number;
  update: (time: number, canvas: HTMLCanvasElement) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
  reset: (canvas: HTMLCanvasElement) => void;
  update: (canvas: HTMLCanvasElement) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const colors = {
  darkBg: '#0d1117',
  green1: 'rgba(124, 179, 66, 0.5)',
  green2: 'rgba(85, 139, 47, 0.45)',
  green3: 'rgba(51, 105, 30, 0.4)',
  green4: 'rgba(124, 179, 66, 0.25)',
  accent: 'rgba(156, 204, 101, 0.35)',
  highlight: 'rgba(180, 220, 120, 0.3)',
  shadow: 'rgba(20, 50, 10, 0.6)',
};

const createBlob = (
  x: number,
  y: number,
  radius: number,
  speedX: number,
  speedY: number,
  color: string
): Blob => {
  const phase = Math.random() * Math.PI * 2;
  const pulseSpeed = 0.3 + Math.random() * 0.4;
  const wobbleAmount = 0.15 + Math.random() * 0.1;

  return {
    baseX: x,
    baseY: y,
    x,
    y,
    radius,
    baseRadius: radius,
    speedX,
    speedY,
    color,
    phase,
    pulseSpeed,
    wobbleAmount,
    update(time: number, canvas: HTMLCanvasElement) {
      this.x = this.baseX + Math.sin(time * this.speedX + this.phase) * (canvas.width * 0.1);
      this.y = this.baseY + Math.cos(time * this.speedY + this.phase) * (canvas.height * 0.08);
      this.radius = this.baseRadius * (1 + Math.sin(time * this.pulseSpeed) * this.wobbleAmount);
    },
    draw(ctx: CanvasRenderingContext2D) {
      const rgbaMatch = this.color.match(/[\d.]+/g);
      if (!rgbaMatch) return;
      const r = rgbaMatch[0];
      const g = rgbaMatch[1];
      const b = rgbaMatch[2];
      const a = parseFloat(rgbaMatch[3]);

      // Single radial gradient — no blur, no shadow pass
      const gradient = ctx.createRadialGradient(
        this.x - this.radius * 0.3,
        this.y - this.radius * 0.3,
        0,
        this.x,
        this.y,
        this.radius * 1.2
      );
      gradient.addColorStop(
        0,
        `rgba(${Math.min(255, parseInt(r) + 80)}, ${Math.min(255, parseInt(g) + 60)}, ${Math.min(255, parseInt(b) + 40)}, ${a * 0.8})`
      );
      gradient.addColorStop(0.4, this.color);
      gradient.addColorStop(1, 'transparent');

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  };
};

const createParticle = (canvas: HTMLCanvasElement): Particle => {
  const particle: Particle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 1 + Math.random() * 2,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    opacity: 0.1 + Math.random() * 0.3,
    pulse: Math.random() * Math.PI * 2,
    reset(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = 1 + Math.random() * 2;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = 0.1 + Math.random() * 0.3;
      this.pulse = Math.random() * Math.PI * 2;
    },
    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += 0.02;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset(canvas);
      }
    },
    draw(ctx: CanvasRenderingContext2D) {
      const currentOpacity = this.opacity * (0.5 + Math.sin(this.pulse) * 0.5);
      // Simple filled circle — no radialGradient per particle
      ctx.save();
      ctx.globalAlpha = currentOpacity;
      ctx.fillStyle = 'rgba(156, 204, 101, 1)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
  };
  return particle;
};

// Canvas rendered at half resolution — CSS stretches it to fill; 75% fewer pixels
const RESOLUTION = 0.5;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export const WaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);
  const blobsRef = useRef<Blob[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * RESOLUTION);
      canvas.height = Math.floor(window.innerHeight * RESOLUTION);

      blobsRef.current = [
        createBlob(canvas.width * 0.2,  canvas.height * 0.3,  150, 0.2,  0.15, colors.green1),
        createBlob(canvas.width * 0.8,  canvas.height * 0.25, 188, 0.15, 0.2,  colors.green2),
        createBlob(canvas.width * 0.5,  canvas.height * 0.7,  210, 0.18, 0.12, colors.green3),
        createBlob(canvas.width * 0.15, canvas.height * 0.8,  135, 0.22, 0.18, colors.accent),
        createBlob(canvas.width * 0.85, canvas.height * 0.65, 165, 0.12, 0.25, colors.green4),
      ];

      particlesRef.current = Array.from({ length: 20 }, () => createParticle(canvas));
    };

    resize();
    window.addEventListener('resize', resize);

    const drawWave = (
      yOffset: number,
      amplitude: number,
      frequency: number,
      speed: number,
      color: string,
      phase: number = 0
    ) => {
      const time = timeRef.current;
      // Step every 4px instead of 2px — half the points
      const points: { x: number; y: number }[] = [];
      for (let x = -10; x <= canvas.width + 10; x += 4) {
        const y =
          yOffset +
          Math.sin(x * frequency + time * speed + phase) * amplitude +
          Math.sin(x * frequency * 0.5 + time * speed * 0.7 + phase) * (amplitude * 0.5);
        points.push({ x, y });
      }

      const rgbaMatch = color.match(/[\d.]+/g);
      if (!rgbaMatch) return;
      const r = rgbaMatch[0];
      const g = rgbaMatch[1];
      const b = rgbaMatch[2];
      const a = parseFloat(rgbaMatch[3]);

      const drawCurve = (pts: { x: number; y: number }[]) => {
        if (pts.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 0; i < pts.length - 1; i++) {
          const xMid = (pts[i].x + pts[i + 1].x) / 2;
          const yMid = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xMid, yMid);
        }
        const last = pts[pts.length - 1];
        ctx.lineTo(last.x, last.y);
      };

      // Main wave fill — no blur, single pass
      const waveGradient = ctx.createLinearGradient(0, yOffset - amplitude, 0, canvas.height);
      waveGradient.addColorStop(
        0,
        `rgba(${Math.min(255, parseInt(r) + 40)}, ${Math.min(255, parseInt(g) + 30)}, ${Math.min(255, parseInt(b) + 20)}, ${a * 1.2})`
      );
      waveGradient.addColorStop(0.4, color);
      waveGradient.addColorStop(
        1,
        `rgba(${Math.floor(parseInt(r) * 0.3)}, ${Math.floor(parseInt(g) * 0.3)}, ${Math.floor(parseInt(b) * 0.3)}, ${a * 0.3})`
      );

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      drawCurve(points);
      ctx.lineTo(canvas.width + 10, canvas.height + 10);
      ctx.lineTo(-10, canvas.height + 10);
      ctx.closePath();
      ctx.fillStyle = waveGradient;
      ctx.fill();
      ctx.restore();

      // Thin highlight stroke — no blur
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.strokeStyle = `rgba(${Math.min(255, parseInt(r) + 100)}, ${Math.min(255, parseInt(g) + 80)}, ${Math.min(255, parseInt(b) + 60)}, ${a * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      drawCurve(points);
      ctx.stroke();
      ctx.restore();
    };

    const isVisible = { current: true };

    const animate = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(animate);

      if (!isVisible.current) return;

      // Cap to TARGET_FPS
      const elapsed = timestamp - lastFrameRef.current;
      if (elapsed < FRAME_INTERVAL) return;
      lastFrameRef.current = timestamp - (elapsed % FRAME_INTERVAL);

      // Background
      const bgGradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      );
      bgGradient.addColorStop(0, '#0f1a12');
      bgGradient.addColorStop(0.5, '#0d1117');
      bgGradient.addColorStop(1, '#080c0a');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blobs
      blobsRef.current.forEach((blob) => {
        blob.update(timeRef.current, canvas);
        blob.draw(ctx);
      });

      // 5 waves — no blur, single pass each
      drawWave(canvas.height * 0.60, 25, 0.002,  0.6, colors.green3,    0);
      drawWave(canvas.height * 0.65, 22, 0.0025, 0.7, colors.green2,    Math.PI * 0.4);
      drawWave(canvas.height * 0.70, 20, 0.003,  0.8, colors.green1,    Math.PI * 0.8);
      drawWave(canvas.height * 0.75, 17, 0.0035, 0.9, colors.accent,    Math.PI * 1.2);
      drawWave(canvas.height * 0.80, 14, 0.004,  1.0, colors.highlight, Math.PI * 1.6);

      // Particles
      particlesRef.current.forEach((p) => {
        p.update(canvas);
        p.draw(ctx);
      });

      // Vignette
      const vignette = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, canvas.height * 0.3,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.9
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.012;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      blobsRef.current = [];
      particlesRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="home__hero-wave-canvas"
    />
  );
};
