import type { BotStatus, Stability } from "./types";

export function formatUptime(ms: number): string {
  if (ms < 0) ms = 0;
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (h > 99) return `${h}:${pad(m)}:${pad(sec)}`;
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

export function liveUptimeMs(
  publishedAt: string | null,
  status: BotStatus,
  stored: number,
): number {
  if (!publishedAt) return stored;
  if (status === "docked") return 0;
  if (status === "crashed") return stored;
  return Date.now() - new Date(publishedAt).getTime();
}

export function statusLabel(status: BotStatus): string {
  switch (status) {
    case "docked":
      return "Atracado";
    case "igniting":
      return "Ignição";
    case "orbiting":
      return "Em órbita";
    case "decaying":
      return "Decaindo";
    case "crashed":
      return "Queda";
  }
}

export function stabilityLabel(stability: Stability): string {
  switch (stability) {
    case "stable":
      return "Estável";
    case "unstable":
      return "Instável";
    case "unknown":
      return "Indefinido";
  }
}

export function relativeTime(iso: string | null): string {
  if (!iso) return "—";
  const delta = Date.now() - new Date(iso).getTime();
  const s = Math.floor(delta / 1000);
  if (s < 10) return "agora";
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}min`;
  const h = Math.floor(m / 60);
  if (h < 48) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}
