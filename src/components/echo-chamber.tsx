import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BotFile } from "@/lib/types";
import type { RuntimeIn, RuntimeOut } from "@/workers/bot-runtime";

type ChatItem = {
  id: string;
  who: "you" | "bot" | "sys";
  name: string;
  text: string;
};

export function EchoChamber({
  files,
  entry,
  botName,
  running,
  onRuntimeEvent,
}: {
  files: BotFile[];
  entry: string | null;
  botName: string;
  running: boolean;
  onRuntimeEvent: (kind: "log" | "error" | "crash" | "ready", payload: string) => void;
}) {
  const workerRef = useRef<Worker | null>(null);
  const eventRef = useRef(onRuntimeEvent);
  eventRef.current = onRuntimeEvent;
  const filesRef = useRef(files);
  filesRef.current = files;
  const [items, setItems] = useState<ChatItem[]>([]);
  const [draft, setDraft] = useState("");
  const [ready, setReady] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [items]);

  useEffect(() => {
    if (!running || !entry) {
      workerRef.current?.terminate();
      workerRef.current = null;
      setReady(false);
      return;
    }

    const worker = new Worker(new URL("../workers/bot-runtime.ts", import.meta.url), {
      type: "module",
    });
    workerRef.current = worker;
    setItems((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        who: "sys",
        name: "mesh",
        text: "Acendendo runtime isolado…",
      },
    ]);

    worker.onmessage = (ev: MessageEvent<RuntimeOut>) => {
      const msg = ev.data;
      if (msg.type === "ready") {
        setReady(true);
        setItems((prev) => [
          ...prev,
          { id: `rdy-${Date.now()}`, who: "sys", name: "mesh", text: `Pronto. ${msg.tag}` },
        ]);
        eventRef.current("ready", msg.tag);
      } else if (msg.type === "log") {
        eventRef.current("log", msg.message);
      } else if (msg.type === "reply" || msg.type === "send" || msg.type === "edit") {
        setItems((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}-${Math.random()}`,
            who: "bot",
            name: botName,
            text: msg.content,
          },
        ]);
      } else if (msg.type === "error") {
        eventRef.current("error", msg.message);
        setItems((prev) => [
          ...prev,
          { id: `err-${Date.now()}`, who: "sys", name: "mesh", text: msg.message },
        ]);
      } else if (msg.type === "crash") {
        eventRef.current("crash", msg.message);
        setItems((prev) => [
          ...prev,
          { id: `crash-${Date.now()}`, who: "sys", name: "mesh", text: `Queda: ${msg.message}` },
        ]);
      }
    };

    const map: Record<string, string> = {};
    for (const file of filesRef.current) map[file.path] = file.content;
    const boot: RuntimeIn = {
      type: "boot",
      files: map,
      entry,
      botUser: { id: "1", username: botName.replace(/\s+/g, "") || "Probe" },
    };
    worker.postMessage(boot);

    return () => {
      worker.terminate();
      if (workerRef.current === worker) workerRef.current = null;
    };
  }, [running, entry, botName]);

  const send = (content: string) => {
    const text = content.trim();
    if (!text || !workerRef.current) return;
    const id = `m-${Date.now()}`;
    setItems((prev) => [...prev, { id, who: "you", name: "você", text }]);
    const msg: RuntimeIn = {
      type: "message",
      id,
      content: text,
      author: { id: "42", username: "operador", bot: false },
    };
    workerRef.current.postMessage(msg);
    setDraft("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Eco</p>
          <p className="text-xs text-subtle">
            {running ? (ready ? "Canal aberto" : "Sincronizando") : "Lance para falar com o bot"}
          </p>
        </div>
        <Button variant="ghost" size="sm" disabled={!ready} onClick={() => send("!ping")}>
          !ping
        </Button>
      </div>
      <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-3">
        {items.length === 0 ? (
          <p className="text-sm text-subtle">
            O Eco é uma sala de rádio. Seu JavaScript roda de verdade, isolado.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="text-sm">
              <p className="text-xs text-subtle">{item.name}</p>
              <p className={item.who === "sys" ? "text-muted" : "text-fg"}>{item.text}</p>
            </div>
          ))
        )}
      </div>
      <form
        className="flex gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={ready ? "Mensagem para o bot" : "Aguardando órbita"}
          disabled={!ready}
          className="h-11"
        />
        <Button type="submit" disabled={!ready || !draft.trim()}>
          Enviar
        </Button>
      </form>
    </div>
  );
}
