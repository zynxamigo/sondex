import { Badge } from "@/components/ui/badge";
import { stabilityLabel, statusLabel } from "@/lib/format";
import type { BotStatus, Stability } from "@/lib/types";

export function StatusChip({ status }: { status: BotStatus }) {
  const variant =
    status === "orbiting"
      ? "stable"
      : status === "decaying" || status === "crashed"
        ? "unstable"
        : "docked";
  return <Badge variant={variant}>{statusLabel(status)}</Badge>;
}

export function StabilityChip({ stability }: { stability: Stability }) {
  const variant =
    stability === "stable"
      ? "stable"
      : stability === "unstable"
        ? "unstable"
        : "default";
  return <Badge variant={variant}>{stabilityLabel(stability)}</Badge>;
}
