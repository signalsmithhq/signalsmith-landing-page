"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

const GRID = 48;
const RADIUS = 190;
const LOCAL_ALPHA = 0.90;
const SIGNAL_ALPHA = 0.90;
const STOPS = [
  { at: 0.25, color: [172, 184, 190] },
  { at: 0.45, color: [255, 93, 158] },
  { at: 0.72, color: [52, 195, 242] },
  { at: 1, color: [255, 178, 56] },
];

function colorAt(progress: number) {
  if (progress <= STOPS[0].at) return STOPS[0].color;
  for (let i = 1; i < STOPS.length; i += 1) {
    const previous = STOPS[i - 1];
    const current = STOPS[i];
    if (progress <= current.at) {
      const amount = (progress - previous.at) / (current.at - previous.at);
      return previous.color.map((channel, index) => Math.round(channel + (current.color[index] - channel) * amount));
    }
  }
  return STOPS[STOPS.length - 1].color;
}

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let scale = 1;
    let pointer: Point | null = null;
    let current: Point = { x: 0, y: 0 };
    let strength = 0;
    let frame = 0;

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const draw = () => {
      if (pointer) {
        current.x += (pointer.x - current.x) * 0.16;
        current.y += (pointer.y - current.y) * 0.16;
        strength += (1 - strength) * 0.12;
      } else {
        strength *= 0.88;
      }

      context.clearRect(0, 0, width, height);
      if (strength > 0.01) {
        const progress = Math.max(0, Math.min(1, current.x / Math.max(width, 1)));
        const [red, green, blue] = colorAt(progress);
        const startX = Math.floor((current.x - RADIUS) / GRID) * GRID;
        const endX = Math.ceil((current.x + RADIUS) / GRID) * GRID;
        const startY = Math.floor((current.y - RADIUS) / GRID) * GRID;
        const endY = Math.ceil((current.y + RADIUS) / GRID) * GRID;

        for (let x = startX; x <= endX; x += GRID) {
          for (let y = startY; y <= endY; y += GRID) {
            const distance = Math.hypot(x - current.x, y - current.y);
            const influence = Math.max(0, 1 - distance / RADIUS) * strength;
            if (influence <= 0) continue;
            const alpha = influence * (progress > 0.55 && progress < 0.8 ? SIGNAL_ALPHA : LOCAL_ALPHA);
            context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
            context.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }

      if (pointer || strength > 0.01) frame = requestAnimationFrame(draw);
      else frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onPointerLeave = () => {
      pointer = null;
      if (!frame) frame = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />;
}
