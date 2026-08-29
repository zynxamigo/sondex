import { cn } from "@/lib/utils";
import type { BotAnalysis } from "@/lib/types";

export function IntentLattice({ analysis }: { analysis: BotAnalysis }) {
  return (
    <div className="p-4">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">
        Rede de intents
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {analysis.intents.map((intent) => (
          <div
            key={intent.key}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-xs shadow-[var(--shadow-border)]",
              intent.present ? "text-fg" : "text-subtle",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                intent.present ? "bg-sage" : "bg-border",
              )}
            />
            {intent.label}
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="text-xs text-muted">Handlers</p>
        <ul className="mt-2 space-y-1">
          {analysis.handlers.length === 0 ? (
            <li className="text-xs text-subtle">Nenhum evento ligado.</li>
          ) : (
            analysis.handlers.map((h) => (
              <li
                key={`${h.file}:${h.line}:${h.event}`}
                className="font-mono text-xs text-fg"
              >
                {h.event}
                <span className="text-subtle">
                  {" "}
                  · {h.file}:{h.line}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
