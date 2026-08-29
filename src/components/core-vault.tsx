import { Lock, ShieldCheck, Unplug } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BotDetail } from "@/lib/types";

export function CoreVault({
  bot,
  busy,
  onSeal,
  onClear,
}: {
  bot: BotDetail;
  busy: boolean;
  onSeal: (token: string) => void;
  onClear: () => void;
}) {
  const [token, setToken] = useState("");
  const [reveal, setReveal] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 overflow-y-auto p-4">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Núcleo
        </p>
        <h3 className="mt-1 font-display text-xl font-medium">Cofre do token</h3>
        <p className="mt-2 text-sm text-muted">
          O token entra uma vez, é cifrado e nunca volta ao editor. A Apogee
          confirma a identidade na API do Discord.
        </p>
      </div>

      {bot.hasToken ? (
        <div className="rounded-lg bg-bg-subtle p-4 shadow-[var(--shadow-border)]">
          <div className="flex items-center gap-3">
            {bot.botAvatar ? (
              <img
                src={bot.botAvatar}
                alt=""
                className="size-10 rounded-full outline outline-1 -outline-offset-1 outline-fg/10"
              />
            ) : (
              <span className="grid size-10 place-items-center rounded-full bg-bg text-steel">
                <ShieldCheck className="size-4" />
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {bot.botUsername ?? "Núcleo selado"}
              </p>
              <p className="font-mono text-xs text-muted">
                ••••{bot.tokenHint}{" "}
                {bot.botSnowflake ? `· ${bot.botSnowflake}` : "· sandbox"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3"
            onClick={onClear}
            disabled={busy}
          >
            <Unplug className="size-3.5" />
            Esvaziar núcleo
          </Button>
        </div>
      ) : (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!token.trim()) return;
            onSeal(token.trim());
            setToken("");
          }}
        >
          <Label htmlFor="token">Token do bot</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-3.5 left-3 size-4 text-subtle" />
            <Input
              id="token"
              autoComplete="off"
              spellCheck={false}
              type={reveal ? "text" : "password"}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Cole o token aqui"
              className="pl-10 font-mono"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="h-11 text-xs text-muted hover:text-fg"
              onClick={() => setReveal((v) => !v)}
            >
              {reveal ? "Ocultar" : "Mostrar"}
            </button>
            <Button type="submit" disabled={busy || !token.trim()}>
              Selar núcleo
            </Button>
          </div>
        </form>
      )}

      <p className="text-xs leading-relaxed text-subtle">
        Sem token válido a sonda ainda lança em modo sandbox: o Eco executa o
        código, mas a identidade Discord permanece desligada.
      </p>
    </div>
  );
}
