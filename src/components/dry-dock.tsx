import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Rocket, Square } from "lucide-react";
import { toast } from "sonner";
import { CoreVault } from "@/components/core-vault";
import { EchoChamber } from "@/components/echo-chamber";
import { FileManifest } from "@/components/file-manifest";
import { FilamentEditor } from "@/components/filament-editor";
import { IntentLattice } from "@/components/intent-lattice";
import { LaunchOverlay } from "@/components/launch-overlay";
import { TelemetryPanel } from "@/components/telemetry-panel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeBot } from "@/lib/analyze";
import {
  addFile,
  clearCore,
  deleteFile,
  dockBot,
  getBot,
  launchBot,
  listEvents,
  pulseBot,
  saveFiles,
  sealCore,
} from "@/lib/bots";
import { liveUptimeMs } from "@/lib/format";
import type { BotDetail, BotFile, TelemetryEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

type MissionTab = "core" | "pulse" | "echo" | "net";

export function DryDock({ botId }: { botId: string }) {
  const [bot, setBot] = useState<BotDetail | null>(null);
  const [files, setFiles] = useState<BotFile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dirty, setDirty] = useState<Record<string, string>>({});
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [busy, setBusy] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [mission, setMission] = useState<MissionTab>("pulse");
  const [now, setNow] = useState(() => Date.now());
  const [loadError, setLoadError] = useState<string | null>(null);

  const mergedFiles = useMemo(
    () =>
      files.map((f) =>
        dirty[f.id] != null ? { ...f, content: dirty[f.id] } : f,
      ),
    [files, dirty],
  );
  const analysis = useMemo(() => analyzeBot(mergedFiles), [mergedFiles]);
  const active = mergedFiles.find((f) => f.id === activeId) ?? mergedFiles[0];

  const refreshEvents = useCallback(async () => {
    try {
      const list = await listEvents({ data: botId });
      setEvents(list);
    } catch {
      /* session may still be resolving */
    }
  }, [botId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const detail = await getBot({ data: botId });
        if (cancelled) return;
        if (!detail) {
          setLoadError("Sonda não encontrada.");
          return;
        }
        setBot(detail);
        setFiles(detail.files);
        setActiveId(detail.files[0]?.id ?? null);
        await refreshEvents();
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "Falha ao abrir o estaleiro.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [botId, refreshEvents]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const saveTimer = useRef<number | null>(null);
  const persist = useCallback(
    (nextDirty: Record<string, string>) => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        const payload = Object.entries(nextDirty).map(([id, content]) => ({
          id,
          content,
        }));
        if (!payload.length) return;
        void saveFiles({ data: { botId, files: payload } })
          .then(() => {
            setFiles((prev) =>
              prev.map((f) =>
                nextDirty[f.id] != null ? { ...f, content: nextDirty[f.id] } : f,
              ),
            );
            setDirty({});
          })
          .catch((err) => {
            toast.error(err instanceof Error ? err.message : "Falha ao gravar.");
          });
      }, 700);
    },
    [botId],
  );

  const onChange = (id: string, content: string) => {
    setDirty((prev) => {
      const next = { ...prev, [id]: content };
      persist(next);
      return next;
    });
  };

  const onRuntimeEvent = useCallback(
    (kind: "log" | "error" | "crash" | "ready", payload: string) => {
      void pulseBot({
        data: {
          botId,
          kind,
          payload,
          crashed: kind === "crash",
        },
      }).then((res) => {
        if (res.ok) {
          setBot((prev) =>
            prev
              ? {
                  ...prev,
                  status: res.status,
                  stability: res.stability,
                  crashCount: res.crashCount,
                  eventCount: prev.eventCount + 1,
                  lastHeartbeatAt: new Date().toISOString(),
                }
              : prev,
          );
          void refreshEvents();
        }
      });
    },
    [botId, refreshEvents],
  );

  const handleLaunch = async () => {
    if (!bot) return;
    setLaunching(true);
    setBusy(true);
    try {
      const payload = mergedFiles.map((f) => ({ id: f.id, content: f.content }));
      const stability =
        analysis.issues.some((i) => i.severity === "error") ? "unstable" : "stable";
      const res = await launchBot({
        data: { botId, files: payload, stability },
      });
      setDirty({});
      setFiles(mergedFiles);
      setBot((prev) =>
        prev
          ? {
              ...prev,
              status: res.status,
              stability,
              publishedAt: new Date().toISOString(),
              lastHeartbeatAt: new Date().toISOString(),
              crashCount: 0,
            }
          : prev,
      );
      setMission("echo");
      await refreshEvents();
      toast.success("Sonda em órbita.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no lançamento.");
      setLaunching(false);
    } finally {
      setBusy(false);
    }
  };

  const handleDock = async () => {
    setBusy(true);
    try {
      await dockBot({ data: botId });
      setBot((prev) =>
        prev ? { ...prev, status: "docked", stability: "unknown" } : prev,
      );
      toast.message("Sonda atracada.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao atracar.");
    } finally {
      setBusy(false);
    }
  };

  if (loadError) {
    return (
      <div className="grid flex-1 place-items-center p-8">
        <div className="text-center">
          <p className="font-display text-2xl">{loadError}</p>
          <Link to="/app" className="mt-4 inline-block text-sm text-steel hover:text-fg">
            Voltar ao controle
          </Link>
        </div>
      </div>
    );
  }

  if (!bot || !active) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted">
        Abrindo estaleiro…
      </div>
    );
  }

  const uptime = liveUptimeMs(bot.publishedAt, bot.status, bot.uptimeMs);
  const inOrbit = bot.status === "orbiting" || bot.status === "decaying";
  void now;

  const missionPanel = (
    <>
      {mission === "core" ? (
        <CoreVault
          bot={bot}
          busy={busy}
          onSeal={async (token) => {
            setBusy(true);
            try {
              const res = await sealCore({ data: { botId, token } });
              setBot((prev) =>
                prev
                  ? {
                      ...prev,
                      hasToken: true,
                      tokenHint: res.hint,
                      botUsername: res.linked ? res.username : prev.botUsername,
                      botSnowflake: res.linked ? res.snowflake : null,
                      botAvatar: res.linked ? res.avatar : null,
                    }
                  : prev,
              );
              if (res.linked) toast.success(`Identidade ${res.username} confirmada.`);
              else toast.message(res.error ?? "Selado em sandbox.");
              await refreshEvents();
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Falha ao selar.");
            } finally {
              setBusy(false);
            }
          }}
          onClear={async () => {
            setBusy(true);
            try {
              await clearCore({ data: botId });
              setBot((prev) =>
                prev
                  ? {
                      ...prev,
                      hasToken: false,
                      tokenHint: null,
                      botUsername: null,
                      botSnowflake: null,
                      botAvatar: null,
                    }
                  : prev,
              );
            } finally {
              setBusy(false);
            }
          }}
        />
      ) : null}
      {mission === "pulse" ? (
        <TelemetryPanel
          bot={bot}
          uptimeMs={uptime}
          analysis={analysis}
          events={events}
          files={mergedFiles}
        />
      ) : null}
      {mission === "echo" ? (
        <EchoChamber
          files={mergedFiles}
          entry={analysis.entry}
          botName={bot.botUsername ?? bot.name}
          running={inOrbit}
          onRuntimeEvent={onRuntimeEvent}
        />
      ) : null}
      {mission === "net" ? <IntentLattice analysis={analysis} /> : null}
    </>
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
        <Link
          to="/app"
          className="inline-flex h-11 items-center gap-2 text-sm text-muted hover:text-fg"
        >
          <ArrowLeft className="size-4" />
          Controle
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-medium">{bot.name}</p>
          <p className="truncate text-xs text-subtle">
            {bot.botUsername
              ? `Núcleo ${bot.botUsername}`
              : bot.hasToken
                ? "Núcleo sandbox"
                : "Núcleo aberto"}
            {dirty && Object.keys(dirty).length ? " · alterações no casco" : ""}
          </p>
        </div>
        {inOrbit ? (
          <Button variant="secondary" onClick={handleDock} disabled={busy}>
            <Square className="size-3.5" />
            Atracar
          </Button>
        ) : (
          <Button onClick={handleLaunch} disabled={busy}>
            <Rocket className="size-3.5" />
            Lançar
          </Button>
        )}
      </header>

      <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)_22rem]">
        <aside className="min-h-0 border-r border-border">
          <FileManifest
            files={mergedFiles}
            activeId={active.id}
            onOpen={(file) => setActiveId(file.id)}
            onAdd={async (path) => {
              try {
                const created = await addFile({ data: { botId, path } });
                setFiles((prev) => [...prev, created]);
                setActiveId(created.id);
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Não foi possível adicionar.");
              }
            }}
            onDelete={async (file) => {
              try {
                await deleteFile({ data: { botId, fileId: file.id } });
                setFiles((prev) => prev.filter((f) => f.id !== file.id));
                if (activeId === file.id) {
                  setActiveId(files.find((f) => f.id !== file.id)?.id ?? null);
                }
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Falha ao remover.");
              }
            }}
          />
        </aside>
        <section className="flex min-h-0 flex-col">
          <div className="flex gap-1 overflow-x-auto border-b border-border px-2 py-2">
            {mergedFiles.map((file) => (
              <button
                key={file.id}
                type="button"
                onClick={() => setActiveId(file.id)}
                className={cn(
                  "h-9 shrink-0 rounded-sm px-3 font-mono text-xs",
                  file.id === active.id ? "bg-bg-subtle text-fg" : "text-muted hover:text-fg",
                )}
              >
                {file.path.split("/").pop()}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1">
            <FilamentEditor
              fileId={active.id}
              value={active.content}
              kind={active.kind}
              onChange={(next) => onChange(active.id, next)}
            />
          </div>
        </section>
        <aside className="flex min-h-0 flex-col border-l border-border">
          <div className="flex gap-1 border-b border-border p-2">
            {(
              [
                ["core", "Núcleo"],
                ["pulse", "Pulso"],
                ["echo", "Eco"],
                ["net", "Rede"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMission(id)}
                className={cn(
                  "h-9 flex-1 rounded-sm text-xs",
                  mission === id ? "bg-bg-subtle text-fg" : "text-muted hover:text-fg",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1">{missionPanel}</div>
        </aside>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <Tabs defaultValue="code" className="flex min-h-0 flex-1 flex-col">
          <div className="px-3 pt-3">
            <TabsList className="w-full">
              <TabsTrigger value="code">Casco</TabsTrigger>
              <TabsTrigger value="core">Núcleo</TabsTrigger>
              <TabsTrigger value="pulse">Pulso</TabsTrigger>
              <TabsTrigger value="echo">Eco</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="code" className="flex min-h-0 flex-1 flex-col">
            <div className="max-h-40 overflow-y-auto border-b border-border">
              <FileManifest
                files={mergedFiles}
                activeId={active.id}
                onOpen={(file) => setActiveId(file.id)}
                onAdd={async (path) => {
                  const created = await addFile({ data: { botId, path } });
                  setFiles((prev) => [...prev, created]);
                  setActiveId(created.id);
                }}
                onDelete={async (file) => {
                  await deleteFile({ data: { botId, fileId: file.id } });
                  setFiles((prev) => prev.filter((f) => f.id !== file.id));
                }}
              />
            </div>
            <div className="min-h-0 flex-1">
              <FilamentEditor
                fileId={active.id}
                value={active.content}
                kind={active.kind}
                onChange={(next) => onChange(active.id, next)}
              />
            </div>
          </TabsContent>
          <TabsContent value="core" className="min-h-0 flex-1 overflow-y-auto">
            <CoreVault
              bot={bot}
              busy={busy}
              onSeal={async (token) => {
                setBusy(true);
                try {
                  const res = await sealCore({ data: { botId, token } });
                  setBot((prev) =>
                    prev
                      ? {
                          ...prev,
                          hasToken: true,
                          tokenHint: res.hint,
                          botUsername: res.linked ? res.username : prev.botUsername,
                          botSnowflake: res.linked ? res.snowflake : null,
                          botAvatar: res.linked ? res.avatar : null,
                        }
                      : prev,
                  );
                  if (res.linked) toast.success(`Identidade ${res.username} confirmada.`);
                  else toast.message(res.error ?? "Selado em sandbox.");
                  await refreshEvents();
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Falha ao selar.");
                } finally {
                  setBusy(false);
                }
              }}
              onClear={async () => {
                setBusy(true);
                try {
                  await clearCore({ data: botId });
                  setBot((prev) =>
                    prev
                      ? {
                          ...prev,
                          hasToken: false,
                          tokenHint: null,
                          botUsername: null,
                          botSnowflake: null,
                          botAvatar: null,
                        }
                      : prev,
                  );
                } finally {
                  setBusy(false);
                }
              }}
            />
          </TabsContent>
          <TabsContent value="pulse" className="min-h-0 flex-1 overflow-y-auto">
            <TelemetryPanel
              bot={bot}
              uptimeMs={uptime}
              analysis={analysis}
              events={events}
              files={mergedFiles}
            />
          </TabsContent>
          <TabsContent value="echo" className="flex min-h-0 flex-1 flex-col">
            <EchoChamber
              files={mergedFiles}
              entry={analysis.entry}
              botName={bot.botUsername ?? bot.name}
              running={inOrbit}
              onRuntimeEvent={onRuntimeEvent}
            />
          </TabsContent>
        </Tabs>
      </div>

      <LaunchOverlay
        open={launching}
        onDone={() => setLaunching(false)}
      />
    </div>
  );
}
