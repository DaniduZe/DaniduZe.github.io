import { useEffect, useRef } from 'react';

interface AsciiCell {
  col: number;
  row: number;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  luma: number;
  baseCharIndex: number;
  baseChar: string;
  currentChar: string;
  revealDelay: number;
  energy: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  thickness: number;
  strength: number;
}

export interface AsciiPortraitProps {
  imageSrc?: string;
  cols?: number;
  fontSize?: number;
  contrast?: number;
  brightness?: number;
  mouseRadius?: number;
  mouseForce?: number;
  idleGlitchRate?: number;
  className?: string;
}

const RAMP = ' .,:;~+-?[]{}/|()1*oahkbdpqwmZO0QLCJUYXzcvunxrjft#MW&8%B@$';

export function AsciiPortrait({
  imageSrc = '/portrait-head.png',
  cols = 84,
  fontSize = 11,
  contrast = 1.32,
  brightness = 1.06,
  mouseRadius = 95,
  mouseForce = 18,
  idleGlitchRate = 0.012,
  className = '',
}: AsciiPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cancelled = false;
    let rafId: number | null = null;
    let isVisible = true;
    let logicalWidth = 620;
    let logicalHeight = 720;
    let cells: AsciiCell[] = [];
    const shockwaves: Shockwave[] = [];
    const mouse = { x: -9999, y: -9999 };
    let startTime = performance.now();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const triggerShockwave = (x = logicalWidth / 2, y = logicalHeight / 2) => {
      if (prefersReducedMotion) return;
      shockwaves.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.hypot(logicalWidth, logicalHeight) * 0.75,
        speed: 11.5,
        thickness: 58,
        strength: 24,
      });
    };

    const getCanvasCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return { x: -9999, y: -9999 };
      return {
        x: ((clientX - rect.left) * logicalWidth) / rect.width,
        y: ((clientY - rect.top) * logicalHeight) / rect.height,
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const pt = getCanvasCoords(e.clientX, e.clientY);
      mouse.x = pt.x;
      mouse.y = pt.y;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onClick = (e: MouseEvent) => {
      const pt = getCanvasCoords(e.clientX, e.clientY);
      triggerShockwave(pt.x, pt.y);
    };

    const drawStaticFrame = () => {
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);
      ctx.font = `600 ${fontSize}px "JetBrains Mono", "Fira Code", "Courier New", monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const shade = Math.round(52 + cell.luma * 203);
        const alpha = Math.min(1, 0.48 + cell.luma * 0.52);
        ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${alpha.toFixed(2)})`;
        ctx.fillText(cell.baseChar, cell.homeX, cell.homeY);
      }
    };

    const animate = (now: number) => {
      if (cancelled) return;
      if (!isVisible) {
        rafId = null;
        return;
      }

      const elapsed = now - startTime;

      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);
      ctx.font = `600 ${fontSize}px "JetBrains Mono", "Fira Code", "Courier New", monospace`;
      ctx.textBaseline = 'top';

      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const wave = shockwaves[s];
        wave.radius += wave.speed;
        if (wave.radius > wave.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      const scanlineRow = ((elapsed * 0.016) % 120) - 20;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        if (elapsed < cell.revealDelay) continue;
        const timeSinceReveal = elapsed - cell.revealDelay;
        const isDecoding = timeSinceReveal < 400;

        // 1. Cursor repulsion & subtle luminance energy
        const dx = cell.x - mouse.x;
        const dy = cell.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouseRadius && dist > 0.01) {
          const factor = Math.pow(1 - dist / mouseRadius, 2);
          const angle = Math.atan2(dy, dx);
          cell.vx += Math.cos(angle) * factor * mouseForce * 0.22;
          cell.vy += Math.sin(angle) * factor * mouseForce * 0.22;
          cell.energy = Math.min(1, cell.energy + factor * 0.45);
        }

        // 2. Click-to-glitch radial shockwaves
        for (let s = 0; s < shockwaves.length; s++) {
          const wave = shockwaves[s];
          const wdx = cell.homeX - wave.x;
          const wdy = cell.homeY - wave.y;
          const wdist = Math.hypot(wdx, wdy);
          const ringDelta = Math.abs(wdist - wave.radius);

          if (ringDelta < wave.thickness && wdist > 0.01) {
            const ringFactor = Math.cos((ringDelta / wave.thickness) * (Math.PI / 2));
            const fade = 1 - wave.radius / wave.maxRadius;
            const push = ringFactor * fade * wave.strength * 0.14;
            cell.vx += (wdx / wdist) * push;
            cell.vy += (wdy / wdist) * push;
            cell.energy = Math.min(1.2, cell.energy + ringFactor * fade * 0.65);
          }
        }

        // 3. Spring-damper return to home grid coordinate
        const springX = (cell.homeX - cell.x) * 0.14;
        const springY = (cell.homeY - cell.y) * 0.14;
        cell.vx = (cell.vx + springX) * 0.78;
        cell.vy = (cell.vy + springY) * 0.78;
        cell.x += cell.vx;
        cell.y += cell.vy;
        cell.energy *= 0.9;

        // 4. Character glitch mutation
        if (isDecoding) {
          if (Math.random() < 0.35) {
            cell.currentChar = RAMP[1 + Math.floor(Math.random() * (RAMP.length - 1))];
          }
        } else if (cell.energy > 0.14) {
          const offset = Math.floor((Math.random() - 0.25) * 16);
          const idx = Math.max(1, Math.min(RAMP.length - 1, cell.baseCharIndex + offset));
          cell.currentChar = RAMP[idx];
        } else if (Math.random() < idleGlitchRate) {
          const jitter = Math.floor(Math.random() * 5) - 2;
          const idx = Math.max(1, Math.min(RAMP.length - 1, cell.baseCharIndex + jitter));
          cell.currentChar = RAMP[idx];
        } else if (Math.random() < 0.12) {
          cell.currentChar = cell.baseChar;
        }

        // 5. Luminance-matched high-contrast monochrome shading
        const scanBoost = Math.max(0, 1 - Math.abs(cell.row - scanlineRow) / 7) * 0.11;
        const effectiveLuma = Math.min(1, cell.luma + cell.energy * 0.45 + scanBoost);

        const shade = Math.round(52 + effectiveLuma * 203);
        const alpha = Math.min(1, 0.48 + effectiveLuma * 0.52);

        ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${alpha.toFixed(2)})`;
        ctx.fillText(cell.currentChar, cell.x, cell.y);
      }

      rafId = requestAnimationFrame(animate);
    };

    const buildGrid = (img: HTMLImageElement) => {
      const charWidth = fontSize * 0.61;
      const charHeight = fontSize * 1.06;

      const aspect = img.height / img.width;
      const rows = Math.round(cols * aspect * (charWidth / charHeight));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      logicalWidth = Math.ceil(cols * charWidth + 56);
      logicalHeight = Math.ceil(rows * charHeight + 56);

      canvas.width = Math.round(logicalWidth * dpr);
      canvas.height = Math.round(logicalHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offscreen = document.createElement('canvas');
      offscreen.width = cols;
      offscreen.height = rows;
      const octx = offscreen.getContext('2d');
      if (!octx) return;

      octx.drawImage(img, 0, 0, img.width, img.height, 0, 0, cols, rows);
      const imgData = octx.getImageData(0, 0, cols, rows).data;

      cells = [];
      const offsetX = 28;
      const offsetY = 28;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = (row * cols + col) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3] / 255;

          if (a < 0.1 || a <= 0.08) continue;

          let luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          luma = ((luma - 0.5) * contrast + 0.5) * brightness;
          // Preserve subtle punctuation density in dark hair & beard
          luma = (0.09 + 0.91 * Math.max(0, Math.min(1, luma))) * a;

          if (luma < 0.06) continue;

          const charIndex = Math.max(
            1,
            Math.min(RAMP.length - 1, Math.floor(luma * (RAMP.length - 1)))
          );

          const homeX = offsetX + col * charWidth;
          const homeY = offsetY + row * charHeight;

          cells.push({
            col,
            row,
            homeX,
            homeY,
            x: homeX,
            y: homeY,
            vx: 0,
            vy: 0,
            luma,
            baseCharIndex: charIndex,
            baseChar: RAMP[charIndex],
            currentChar: RAMP[Math.floor(Math.random() * RAMP.length)],
            revealDelay: row * 13 + Math.random() * 340,
            energy: 0,
          });
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        isVisible = visible;
        if (visible && !prefersReducedMotion && !cancelled && cells.length > 0 && rafId === null) {
          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      if (cancelled) return;
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // Proceed with fallback monospace if font promise rejects
        }
      }
      if (cancelled) return;
      buildGrid(img);
      startTime = performance.now();
      if (prefersReducedMotion) {
        drawStaticFrame();
      } else {
        rafId = requestAnimationFrame(animate);
      }
    };
    img.src = imageSrc;

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, [imageSrc, cols, fontSize, contrast, brightness, mouseRadius, mouseForce, idleGlitchRate]);

  return (
    <div className={`relative select-none ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive monochrome ASCII portrait of Danidu Sennath"
        title="Move cursor to interact · Click to trigger ASCII pulse"
        className="block h-auto w-full cursor-crosshair bg-[#0A0A0A]"
        style={{ aspectRatio: '620 / 720' }}
      />
      {/* Soft edge feathering so the canvas dissolves seamlessly into #0A0A0A */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 42px 18px #0A0A0A',
        }}
      />
    </div>
  );
}
