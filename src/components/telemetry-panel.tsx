import { useState } from "react";
import { PulseRibbon } from "@/components/pulse-ribbon";
import { StabilityChip, StatusChip } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { scanWithGrok } from "@/lib/ai-scan";
import { formatUptime, relativeTime } from "@/lib/format";
import type { BotAnalysis, BotDetail, BotFile, TelemetryEvent } from "@/lib/types";

export function TelemetryPanel({
  bot,
  uptimeMs,
  analysis,
  events,
  files,
}: {
  bot: BotDetail;
  uptimeMs: number;
  analysis: BotAnalysis;
  events: TelemetryEvent[];
  files: BotFile[];
}) {
  const [scan, setScan] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      <div className="p-4">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Pulso
        </p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-3xl tabular-nums tracking-tight">
              {formatUptime(uptimeMs)}
            </p>
            <p className="mt-1 text-xs text-subtle">tempo ativo</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StatusChip status={bot.status} />
            <StabilityChip stability={bot.stability} />
          </div>
        </div>
        <PulseRibbon status={bot.status} className="mt-4 h-12 w-full" />
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-bg-subtle px-2 py-3">
            <dt className="text-xs text-subtle">Score</dt>
            <dd className="font-mono text-lg tabular-nums">{analysis.score}</dd>
          </div>
          <div className="rounded-md bg-bg-subtle px-2 py-3">
            <dt className="text-xs text-subtle">Eventos</dt>
            <dd className="font-mono text-lg tabular-nums">{bot.eventCount}</dd>
          </div>
          <div className="rounded-md bg-bg-subtle px-2 py-3">
            <dt className="text-xs text-subtle">Quedas</dt>
            <dd className="font-mono text-lg tabular-nums">{bot.crashCount}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-subtle">
          Último pulso {relativeTime(bot.lastHeartbeatAt)}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          disabled={scanning}
          onClick={async () => {
            setScanning(true);
            try {
              const res = await scanWithGrok({
                data: {
                  name: bot.name,
                  files: files.map((f) => ({ path: f.path, content: f.content })),
                },
              });
              setScan(res.ok ? res.text : res.error);
            } finally {
              setScanning(false);
            }
          }}
        >
          {scanning ? "Varrendo…" : "Varredura Grok"}
        </Button>
        {scan ? <p className="mt-3 text-sm whitespace-pre-wrap text-muted">{scan}</p> : null}
      </div>
      <div className="border-t border-border p-4">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Anomalias
        </p>
        <ul className="mt-3 space-y-2">
          {analysis.issues.length === 0 ? (
            <li className="text-sm text-muted">Casco limpo.</li>
          ) : (
            analysis.issues.map((issue, i) => (
              <li key={`${issue.message}-${i}`} className="text-sm">
                <span
                  className={
                    issue.severity === "error"
                      ? "text-rust"
                      : issue.severity === "warn"
                        ? "text-steel"
                        : "text-muted"
                  }
                >
                  {issue.severity}
                </span>
                <span className="text-fg"> {issue.message}</span>
                {issue.file ? (
                  <span className="block font-mono text-xs text-subtle">
                    {issue.file}
                  </span>
                ) : null}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="border-t border-border p-4">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Diário
        </p>
        <ul className="mt-3 space-y-2">
          {events.length === 0 ? (
            <li className="text-sm text-subtle">Sem registros ainda.</li>
          ) : (
            events.slice(0, 12).map((ev) => (
              <li key={ev.id} className="text-xs">
                <span className="font-mono text-steel">{ev.kind}</span>
                <span className="text-muted"> {ev.payload}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
