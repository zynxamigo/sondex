import type {
  AnalysisIssue,
  BotAnalysis,
  BotFile,
  DetectedCommand,
  DetectedHandler,
  IntentFlag,
} from "./types";

const INTENT_MAP: { key: string; label: string; pattern: RegExp }[] = [
  { key: "Guilds", label: "Guilds", pattern: /GatewayIntentBits\.Guilds\b/ },
  {
    key: "GuildMessages",
    label: "Mensagens",
    pattern: /GatewayIntentBits\.GuildMessages\b/,
  },
  {
    key: "MessageContent",
    label: "Conteúdo",
    pattern: /GatewayIntentBits\.MessageContent\b/,
  },
  {
    key: "GuildMembers",
    label: "Membros",
    pattern: /GatewayIntentBits\.GuildMembers\b/,
  },
  {
    key: "GuildVoiceStates",
    label: "Voz",
    pattern: /GatewayIntentBits\.GuildVoiceStates\b/,
  },
  {
    key: "DirectMessages",
    label: "DM",
    pattern: /GatewayIntentBits\.DirectMessages\b/,
  },
];

const HANDLER_RE =
  /\.(?:on|once)\(\s*(?:Events\.(\w+)|['"](\w+)['"])/g;

const COMMAND_RE =
  /(?:content\s*(?:===|==)\s*['"](![\w-]+)['"]|name:\s*['"]([\w-]+)['"]|startsWith\(\s*['"](!)['"]\s*\))/g;

const DANGEROUS =
  /\b(?:eval|Function|child_process|fs\.|process\.exit|fetch\(['"]https?:\/\/(?!discord\.com))/;

export function analyzeBot(files: BotFile[]): BotAnalysis {
  const issues: AnalysisIssue[] = [];
  const handlers: DetectedHandler[] = [];
  const commands: DetectedCommand[] = [];
  const joined = files.map((f) => f.content).join("\n");

  const intents: IntentFlag[] = INTENT_MAP.map((item) => ({
    key: item.key,
    label: item.label,
    present: item.pattern.test(joined),
  }));

  const entry =
    files.find((f) => f.path === "index.js")?.path ??
    files.find((f) => f.path.endsWith(".js"))?.path ??
    null;

  let hasLogin = false;

  for (const file of files) {
    if (file.kind === "js") {
      try {
        // Syntax-only check; runtime is the worker.
        // eslint-disable-next-line no-new-func
        new Function(file.content);
      } catch (err) {
        issues.push({
          severity: "error",
          file: file.path,
          message: err instanceof Error ? err.message : "Erro de sintaxe",
        });
      }
    }

    if (file.kind === "json") {
      try {
        JSON.parse(file.content);
      } catch {
        issues.push({
          severity: "error",
          file: file.path,
          message: "JSON inválido",
        });
      }
    }

    const lines = file.content.split("\n");
    lines.forEach((line, i) => {
      HANDLER_RE.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = HANDLER_RE.exec(line))) {
        handlers.push({
          event: match[1] ?? match[2] ?? "unknown",
          file: file.path,
          line: i + 1,
        });
      }

      COMMAND_RE.lastIndex = 0;
      while ((match = COMMAND_RE.exec(line))) {
        const trigger = match[1] ?? match[2] ?? match[3];
        if (trigger) {
          commands.push({
            trigger: trigger.startsWith("!") ? trigger : `!${trigger}`,
            file: file.path,
            line: i + 1,
          });
        }
      }
    });

    if (/client\.login\s*\(/.test(file.content)) hasLogin = true;
    if (DANGEROUS.test(file.content)) {
      issues.push({
        severity: "warn",
        file: file.path,
        message: "Padrão sensível detectado. O runtime isolado bloqueia I/O nativo.",
      });
    }
  }

  if (!entry) {
    issues.push({
      severity: "error",
      message: "Nenhum arquivo de entrada (.js) no casco.",
    });
  }
  if (!hasLogin) {
    issues.push({
      severity: "warn",
      message: "Nenhum client.login encontrado — o bot pode não acordar.",
    });
  }
  if (!intents.find((i) => i.key === "MessageContent")?.present) {
    issues.push({
      severity: "info",
      message: "Sem MessageContent o Eco não lê o texto das mensagens.",
    });
  }
  if (handlers.length === 0) {
    issues.push({
      severity: "warn",
      message: "Nenhum handler de evento encontrado.",
    });
  }

  const uniqueCommands = uniqueBy(commands, (c) => c.trigger);
  const uniqueHandlers = uniqueBy(handlers, (h) => `${h.event}:${h.file}:${h.line}`);

  const errors = issues.filter((i) => i.severity === "error").length;
  const warns = issues.filter((i) => i.severity === "warn").length;
  let score = 100 - errors * 28 - warns * 10;
  if (uniqueHandlers.length) score += 4;
  if (uniqueCommands.length) score += 4;
  if (hasLogin) score += 4;
  score = Math.max(0, Math.min(100, score));

  return {
    score,
    intents,
    handlers: uniqueHandlers,
    commands: uniqueCommands,
    issues,
    hasLogin,
    entry,
  };
}

function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}
