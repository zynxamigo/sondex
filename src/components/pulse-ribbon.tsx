import { useEffect, useRef } from "react";
import type { BotStatus } from "@/lib/types";

export function PulseRibbon({
  status,
  className,
}: {
  status: BotStatus;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      ctx.strokeStyle =
        status === "orbiting"
          ? "rgba(125,154,126,0.85)"
          : status === "decaying" || status === "crashed"
            ? "rgba(193,122,90,0.85)"
            : "rgba(139,147,160,0.7)";
      ctx.lineWidth = 1.4;
      const mid = h / 2;
      for (let x = 0; x <= w; x += 2) {
        const beat =
          status === "docked"
            ? 0
            : status === "crashed"
              ? 0
              : Math.exp(-Math.pow(((x + (reduce ? 0 : t)) % 90) - 18, 2) / 40);
        const noise =
          status === "decaying" ? Math.sin((x + t) * 0.2) * 2.4 : 0;
        const y = mid - beat * (h * 0.38) + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      if (!reduce) t += status === "orbiting" ? 1.6 : 1.1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [status]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
