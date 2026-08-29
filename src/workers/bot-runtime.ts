export type RuntimeIn =
  | {
      type: "boot";
      files: Record<string, string>;
      entry: string;
      botUser: { id: string; username: string };
    }
  | {
      type: "message";
      id: string;
      content: string;
      author: { id: string; username: string; bot: boolean };
    }
  | { type: "stop" };

export type RuntimeOut =
  | { type: "ready"; tag: string }
  | { type: "log"; level: "info" | "warn" | "error"; message: string }
  | { type: "reply"; ref: string; content: string }
  | { type: "edit"; ref: string; content: string }
  | { type: "react"; ref: string; emoji: string }
  | { type: "send"; content: string }
  | { type: "error"; message: string }
  | { type: "crash"; message: string };

type Listener = (...args: unknown[]) => unknown;

class Emitter {
  private map = new Map<string, Listener[]>();

  on(event: string, fn: Listener) {
    const list = this.map.get(event) ?? [];
    list.push(fn);
    this.map.set(event, list);
    return this;
  }

  once(event: string, fn: Listener) {
    const wrap: Listener = (...args) => {
      this.off(event, wrap);
      return fn(...args);
    };
    return this.on(event, wrap);
  }

  off(event: string, fn: Listener) {
    const list = this.map.get(event);
    if (!list) return this;
    this.map.set(
      event,
      list.filter((x) => x !== fn),
    );
    return this;
  }

  emit(event: string, ...args: unknown[]) {
    const list = [...(this.map.get(event) ?? [])];
    for (const fn of list) {
      try {
        const result = fn(...args);
        if (result && typeof (result as Promise<unknown>).then === "function") {
          (result as Promise<unknown>).catch((err: unknown) => {
            post({
              type: "error",
              message: err instanceof Error ? err.message : String(err),
            });
          });
        }
      } catch (err) {
        post({
          type: "crash",
          message: err instanceof Error ? err.message : String(err),
        });
      }
    }
    return this;
  }
}

class Collection<V> extends Map<string, V> {
  map<T>(fn: (value: V) => T): T[] {
    return [...this.values()].map(fn);
  }
}

const GatewayIntentBits = {
  Guilds: 1,
  GuildMembers: 2,
  GuildModeration: 4,
  GuildEmojisAndStickers: 8,
  GuildIntegrations: 16,
  GuildWebhooks: 32,
  GuildInvites: 64,
  GuildVoiceStates: 128,
  GuildPresences: 256,
  GuildMessages: 512,
  GuildMessageReactions: 1024,
  GuildMessageTyping: 2048,
  DirectMessages: 4096,
  DirectMessageReactions: 8192,
  DirectMessageTyping: 16384,
  MessageContent: 32768,
  GuildScheduledEvents: 65536,
  AutoModerationConfiguration: 1048576,
  AutoModerationExecution: 2097152,
};

const Events = {
  ClientReady: "ready",
  Ready: "ready",
  MessageCreate: "messageCreate",
  InteractionCreate: "interactionCreate",
  GuildCreate: "guildCreate",
  Error: "error",
};

function post(msg: RuntimeOut) {
  self.postMessage(msg);
}

function makeMessage(
  payload: Extract<RuntimeIn, { type: "message" }>,
  botUser: { id: string; username: string },
) {
  const message = {
    id: payload.id,
    content: payload.content,
    createdTimestamp: Date.now(),
    author: {
      id: payload.author.id,
      username: payload.author.username,
      bot: payload.author.bot,
      tag: `${payload.author.username}#0000`,
    },
    channel: {
      id: "eco-1",
      send: async (content: string) => {
        post({ type: "send", content: String(content) });
        return { id: `s-${Date.now()}`, content, edit: async () => ({}) };
      },
    },
    reply: async (content: string) => {
      post({ type: "reply", ref: payload.id, content: String(content) });
      return {
        id: `r-${payload.id}`,
        content,
        edit: async (next: string) => {
          post({ type: "edit", ref: payload.id, content: String(next) });
          return {};
        },
      };
    },
    react: async (emoji: string) => {
      post({ type: "react", ref: payload.id, emoji: String(emoji) });
    },
    guild: { id: "apogee-echo", name: "Eco" },
    member: null,
    client: { user: botUser },
  };
  return message;
}

function resolvePath(from: string, spec: string): string {
  if (!spec.startsWith(".")) return spec;
  const fromDir = from.includes("/") ? from.slice(0, from.lastIndexOf("/")) : "";
  const parts = `${fromDir}/${spec}`.split("/");
  const out: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return out.join("/");
}

function withExt(files: Record<string, string>, path: string): string | null {
  if (files[path] != null) return path;
  for (const ext of [".js", ".json", ".cjs", ".mjs"]) {
    if (files[path + ext] != null) return path + ext;
  }
  if (files[`${path}/index.js`] != null) return `${path}/index.js`;
  return null;
}

let clientRef: Emitter | null = null;
let botUser = { id: "0", username: "Probe" };
let booted = false;

function boot(files: Record<string, string>, entry: string) {
  const cache = new Map<string, { exports: unknown }>();

  const discord = {
    Client: class Client extends Emitter {
      user = { ...botUser, tag: `${botUser.username}#0000` };
      commands = new Collection<unknown>();
      options: unknown;
      constructor(opts?: unknown) {
        super();
        this.options = opts;
        clientRef = this;
      }
      async login(_token?: string) {
        this.user = { ...botUser, tag: `${botUser.username}#0000` };
        queueMicrotask(() => {
          this.emit("ready", this);
          this.emit("clientReady", this);
          post({ type: "ready", tag: this.user.tag });
        });
        return "sealed";
      }
      destroy() {
        post({ type: "log", level: "info", message: "Client destroyed" });
      }
    },
    GatewayIntentBits,
    Events,
    Collection,
    Partials: {},
    SlashCommandBuilder: class {
      setName() {
        return this;
      }
      setDescription() {
        return this;
      }
    },
    EmbedBuilder: class {
      setTitle() {
        return this;
      }
      setDescription() {
        return this;
      }
      setColor() {
        return this;
      }
      toJSON() {
        return {};
      }
    },
  };

  const runtimeConsole = {
    log: (...args: unknown[]) =>
      post({ type: "log", level: "info", message: args.map(String).join(" ") }),
    info: (...args: unknown[]) =>
      post({ type: "log", level: "info", message: args.map(String).join(" ") }),
    warn: (...args: unknown[]) =>
      post({ type: "log", level: "warn", message: args.map(String).join(" ") }),
    error: (...args: unknown[]) =>
      post({ type: "log", level: "error", message: args.map(String).join(" ") }),
  };

  const processShim = {
    env: { DISCORD_TOKEN: "sealed", NODE_ENV: "production" },
    cwd: () => "/",
  };

  function load(path: string): unknown {
    const resolved = withExt(files, path);
    if (!resolved) throw new Error(`Módulo não encontrado: ${path}`);
    const cached = cache.get(resolved);
    if (cached) return cached.exports;
    const module = { exports: {} as unknown };
    cache.set(resolved, module);
    const source = files[resolved] ?? "";
    if (resolved.endsWith(".json")) {
      module.exports = JSON.parse(source);
      return module.exports;
    }
    const requireFn = (spec: string) => {
      if (spec === "discord.js" || spec.startsWith("discord.js/")) return discord;
      if (!spec.startsWith(".")) {
        throw new Error(`Módulo bloqueado no runtime: ${spec}`);
      }
      return load(resolvePath(resolved, spec));
    };
    const rewritten = source
      .replace(
        /import\s+\{([^}]+)\}\s+from\s+['"]discord\.js['"]\s*;?/g,
        "const {$1} = require('discord.js');",
      )
      .replace(
        /import\s+(\w+)\s+from\s+['"](\.[^'"]+)['"]\s*;?/g,
        "const $1 = require('$2');",
      )
      .replace(/export\s+default\s+/g, "module.exports = ")
      .replace(/export\s+module\.exports/g, "module.exports");
    const fn = new Function(
      "module",
      "exports",
      "require",
      "process",
      "console",
      rewritten,
    );
    fn(module, module.exports, requireFn, processShim, runtimeConsole);
    return module.exports;
  }

  load(entry.replace(/^\.\//, ""));
  booted = true;
  if (!clientRef) {
    post({
      type: "log",
      level: "warn",
      message: "Nenhum Client instanciado. O Eco não tem para quem falar.",
    });
  }
}

self.onmessage = (ev: MessageEvent<RuntimeIn>) => {
  const data = ev.data;
  try {
    if (data.type === "stop") {
      clientRef = null;
      booted = false;
      return;
    }
    if (data.type === "boot") {
      clientRef = null;
      booted = false;
      botUser = data.botUser;
      boot(data.files, data.entry);
      return;
    }
    if (data.type === "message") {
      if (!booted || !clientRef) {
        post({ type: "error", message: "Runtime ainda não está em órbita." });
        return;
      }
      const message = makeMessage(data, botUser);
      clientRef.emit("messageCreate", message);
    }
  } catch (err) {
    post({
      type: "crash",
      message: err instanceof Error ? err.message : String(err),
    });
  }
};
