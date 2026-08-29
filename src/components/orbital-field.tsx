import { useEffect, useRef } from "react";
import type { BotStatus, Stability } from "@/lib/types";

export type OrbitBody = {
  id: string;
  name: string;
  status: BotStatus;
  stability: Stability;
};

type Props = {
  bodies: OrbitBody[];
  className?: string;
  onSelect?: (id: string) => void;
  demo?: boolean;
};

export function OrbitalField({ bodies, className, onSelect, demo }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodiesRef = useRef(bodies);
  bodiesRef.current = bodies;
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    const hits: { id: string; x: number; y: number; r: number }[] = [];

    const stars = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      a: 0.12 + Math.random() * 0.28,
    }));

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

    const colorFor = (status: BotStatus) => {
      if (status === "orbiting") return { r: 125, g: 154, b: 126 };
      if (status === "decaying" || status === "crashed")
        return { r: 193, g: 122, b: 90 };
      return { r: 139, g: 147, b: 160 };
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      for (const star of stars) {
        ctx.fillStyle = `rgba(244,241,234,${star.a})`;
        ctx.fillRect(star.x * w, star.y * h, 1, 1);
      }

      const cx = w * 0.5;
      const cy = h * 0.52;
      const maxR = Math.min(w, h) * 0.38;

      ctx.strokeStyle = "rgba(244,241,234,0.08)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, maxR * (0.38 + i * 0.2), maxR * (0.22 + i * 0.12), -0.4, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.fillStyle = "rgba(244,241,234,0.12)";
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      hits.length = 0;
      const list = bodiesRef.current;
      list.forEach((body, i) => {
        const ring = 0.42 + (i % 3) * 0.2;
        const rx = maxR * ring;
        const ry = maxR * (ring * 0.58);
        const speed =
          body.status === "crashed"
            ? 0
            : body.status === "decaying"
              ? 0.00035
              : body.status === "orbiting"
                ? 0.00055
                : 0.00018;
        const base = i * 1.7;
        const wobble = body.status === "decaying" ? Math.sin(t * 0.004 + i) * 10 : 0;
        const crashedPull = body.status === "crashed" ? 0.45 : 1;
        const ang = reduce ? base : base + t * speed;
        const x = cx + Math.cos(ang) * rx * crashedPull;
        const y = cy + Math.sin(ang) * ry * crashedPull + wobble;
        const col = colorFor(body.status);
        const r = body.status === "docked" ? 4 : 5.5;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},0.35)`;
        ctx.lineWidth = 1;
        ctx.arc(x, y, r + 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgb(${col.r},${col.g},${col.b})`;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(244,241,234,0.72)";
        ctx.font = "11px 'IBM Plex Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(body.name.slice(0, 18), x, y + 18);

        hits.push({ id: body.id, x, y, r: 16 });
      });

      if (!reduce) t += 16;
      raf = requestAnimationFrame(draw);
    };

    draw();

    const onClick = (ev: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      const hit = [...hits].reverse().find((h) => {
        const dx = h.x - x;
        const dy = h.y - y;
        return dx * dx + dy * dy <= h.r * h.r;
      });
      if (hit && onSelectRef.current) onSelectRef.current(hit.id);
    };
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("click", onClick);
    };
  }, [demo]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label="Campo orbital das sondas"
    />
  );
}
