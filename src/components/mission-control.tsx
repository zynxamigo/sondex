import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CreateBotDialog } from "@/components/create-bot-dialog";
import { OrbitalField } from "@/components/orbital-field";
import { StabilityChip, StatusChip } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { createBot, deleteBot, listBots } from "@/lib/bots";
import { formatUptime, liveUptimeMs } from "@/lib/format";
import type { BotSummary } from "@/lib/types";

export function MissionControl() {
  const navigate = useNavigate();
  const [bots, setBots] = useState<BotSummary[] | null>(null);
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;
    listBots()
      .then((rows) => {
        if (!cancelled) setBots(rows);
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Falha ao ler a malha.");
          setBots([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const openBot = (id: string) => {
    void navigate({ to: "/app/$botId", params: { botId: id } });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative h-56 overflow-hidden border-b border-border sm:h-72">
        <OrbitalField
          bodies={bots ?? []}
          className="h-full w-full"
          onSelect={openBot}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              Controle de missão
            </p>
            <h1 className="mt-1 font-display text-3xl font-medium">Malha</h1>
          </div>
        </div>
        <div className="absolute right-4 bottom-4">
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            Nova sonda
          </Button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        {bots === null ? (
          <p className="text-sm text-muted">Lendo a malha…</p>
        ) : bots.length === 0 ? (
          <div className="rounded-xl bg-bg-elevated px-6 py-12 text-center shadow-[var(--shadow-border)]">
            <p className="font-display text-2xl">Estaleiro vazio</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Monte uma sonda, sele o token no núcleo, escreva o casco e lance.
              O Eco executa o JavaScript de verdade.
            </p>
            <Button className="mt-6" onClick={() => setOpen(true)}>
              Montar a primeira
            </Button>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {bots.map((bot) => {
              const up = liveUptimeMs(bot.publishedAt, bot.status, bot.uptimeMs);
              void now;
              return (
                <li key={bot.id}>
                  <div className="flex items-start gap-3 rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]">
                    <button
                      type="button"
                      onClick={() => openBot(bot.id)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <p className="truncate font-medium">{bot.name}</p>
                        <StatusChip status={bot.status} />
                      </div>
                      <p className="mt-1 truncate text-sm text-muted">
                        {bot.botUsername ?? (bot.description || "Sem identidade Discord")}
                      </p>
                      <p className="mt-3 font-mono text-xs tabular-nums text-subtle">
                        {formatUptime(up)} · {bot.fileCount} placas ·{" "}
                        <StabilityChip stability={bot.stability} />
                      </p>
                    </button>
                    <button
                      type="button"
                      className="grid size-11 place-items-center text-subtle hover:text-rust"
                      aria-label={`Desmontar ${bot.name}`}
                      onClick={async () => {
                        if (!confirm(`Desmontar ${bot.name}?`)) return;
                        try {
                          await deleteBot({ data: bot.id });
                          setBots((prev) => prev?.filter((b) => b.id !== bot.id) ?? []);
                        } catch (err) {
                          toast.error(err instanceof Error ? err.message : "Falha.");
                        }
                      }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <CreateBotDialog
        open={open}
        onOpenChange={setOpen}
        onCreate={async (input) => {
          const bot = await createBot({ data: input });
          toast.success("Casco montado.");
          openBot(bot.id);
        }}
      />
    </div>
  );
}
