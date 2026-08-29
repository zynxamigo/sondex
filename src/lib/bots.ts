import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { kindFromPath, newId } from "@/lib/ids";
import { STARTER_FILES } from "@/lib/starter";
import type {
  BotDetail,
  BotFile,
  BotStatus,
  BotSummary,
  FileKind,
  Stability,
  TelemetryEvent,
} from "@/lib/types";

type BotRow = {
  id: string;
  name: string;
  description: string;
  status: BotStatus;
  token_cipher: string | null;
  token_hint: string | null;
  bot_snowflake: string | null;
  bot_username: string | null;
  bot_avatar: string | null;
  published_at: string | null;
  last_heartbeat_at: string | null;
  uptime_ms: number;
  crash_count: number;
  event_count: number;
  stability: Stability;
  created_at: string;
  updated_at: string;
  file_count?: number;
};

type FileRow = {
  id: string;
  path: string;
  content: string;
  kind: FileKind;
  updated_at: string;
};

function toSummary(row: BotRow, fileCount: number): BotSummary {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    tokenHint: row.token_hint,
    hasToken: Boolean(row.token_cipher),
    botSnowflake: row.bot_snowflake,
    botUsername: row.bot_username,
    botAvatar: row.bot_avatar,
    publishedAt: row.published_at,
    lastHeartbeatAt: row.last_heartbeat_at,
    uptimeMs: Number(row.uptime_ms) || 0,
    crashCount: Number(row.crash_count) || 0,
    eventCount: Number(row.event_count) || 0,
    stability: row.stability,
    fileCount,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toFile(row: FileRow): BotFile {
  return {
    id: row.id,
    path: row.path,
    content: row.content,
    kind: row.kind,
    updatedAt: row.updated_at,
  };
}

async function appendEvent(
  userId: string,
  botId: string,
  kind: string,
  payload: string,
) {
  const sql = await getSql();
  await sql`insert into bot_events (bot_id, user_id, kind, payload)
    values (${botId}, ${userId}, ${kind}, ${payload})`;
  await sql`delete from bot_events
    where bot_id = ${botId}
      and user_id = ${userId}
      and id not in (
        select id from bot_events
        where bot_id = ${botId} and user_id = ${userId}
        order by id desc
        limit 80
      )`;
}

export const listBots = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<BotRow>`
      select b.*,
        (select count(*)::int from bot_files f where f.bot_id = b.id) as file_count
      from bots b
      where b.user_id = ${context.userId}
      order by b.updated_at desc`;
    return rows.map((row) => toSummary(row, Number(row.file_count) || 0));
  });

export const getBot = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }): Promise<BotDetail | null> => {
    const sql = await getSql();
    const rows = await sql<BotRow>`
      select * from bots where id = ${id} and user_id = ${context.userId} limit 1`;
    const row = rows[0];
    if (!row) return null;
    const files = await sql<FileRow>`
      select id, path, content, kind, updated_at
      from bot_files
      where bot_id = ${id} and user_id = ${context.userId}
      order by path asc`;
    return { ...toSummary(row, files.length), files: files.map(toFile) };
  });

export const createBot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name: string; description?: string }) => ({
    name: input.name.trim().slice(0, 48),
    description: (input.description ?? "").trim().slice(0, 180),
  }))
  .handler(async ({ context, data }) => {
    if (!data.name) throw new Error("Dê um nome à sonda.");
    const sql = await getSql();
    const id = newId();
    await sql`insert into bots (id, user_id, name, description)
      values (${id}, ${context.userId}, ${data.name}, ${data.description})`;
    for (const file of STARTER_FILES) {
      await sql`insert into bot_files (id, bot_id, user_id, path, content, kind)
        values (${newId()}, ${id}, ${context.userId}, ${file.path}, ${file.content}, ${file.kind})`;
    }
    await appendEvent(context.userId, id, "dock", "Casco montado no estaleiro.");
    const bot = await getBot({ data: id });
    if (!bot) throw new Error("Falha ao montar a sonda.");
    return bot;
  });

export const deleteBot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql`delete from bot_events where bot_id = ${id} and user_id = ${context.userId}`;
    await sql`delete from bot_files where bot_id = ${id} and user_id = ${context.userId}`;
    await sql`delete from bots where id = ${id} and user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const renameBot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string; name: string; description: string }) => ({
    id: input.id,
    name: input.name.trim().slice(0, 48),
    description: input.description.trim().slice(0, 180),
  }))
  .handler(async ({ context, data }) => {
    if (!data.name) throw new Error("Nome vazio.");
    const sql = await getSql();
    await sql`update bots
      set name = ${data.name},
          description = ${data.description},
          updated_at = now()
      where id = ${data.id} and user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const saveFiles = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: { botId: string; files: { id: string; content: string }[] }) =>
      input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    for (const file of data.files) {
      await sql`update bot_files
        set content = ${file.content}, updated_at = now()
        where id = ${file.id}
          and bot_id = ${data.botId}
          and user_id = ${context.userId}`;
    }
    await sql`update bots set updated_at = now()
      where id = ${data.botId} and user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const addFile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { botId: string; path: string; content?: string }) => ({
    botId: input.botId,
    path: input.path.trim().replace(/^\/+/, "").slice(0, 120),
    content: input.content ?? "",
  }))
  .handler(async ({ context, data }) => {
    if (!data.path || data.path.includes("..")) {
      throw new Error("Caminho inválido.");
    }
    const sql = await getSql();
    const owned = await sql<{ id: string }>`
      select id from bots where id = ${data.botId} and user_id = ${context.userId}`;
    if (!owned[0]) throw new Error("Sonda não encontrada.");
    const id = newId();
    const kind = kindFromPath(data.path);
    await sql`insert into bot_files (id, bot_id, user_id, path, content, kind)
      values (${id}, ${data.botId}, ${context.userId}, ${data.path}, ${data.content}, ${kind})`;
    await sql`update bots set updated_at = now()
      where id = ${data.botId} and user_id = ${context.userId}`;
    return {
      id,
      path: data.path,
      content: data.content,
      kind,
      updatedAt: new Date().toISOString(),
    } satisfies BotFile;
  });

export const deleteFile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { botId: string; fileId: string }) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`delete from bot_files
      where id = ${data.fileId}
        and bot_id = ${data.botId}
        and user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const renameFile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { botId: string; fileId: string; path: string }) => ({
    botId: input.botId,
    fileId: input.fileId,
    path: input.path.trim().replace(/^\/+/, "").slice(0, 120),
  }))
  .handler(async ({ context, data }) => {
    if (!data.path || data.path.includes("..")) {
      throw new Error("Caminho inválido.");
    }
    const sql = await getSql();
    const kind = kindFromPath(data.path);
    await sql`update bot_files
      set path = ${data.path}, kind = ${kind}, updated_at = now()
      where id = ${data.fileId}
        and bot_id = ${data.botId}
        and user_id = ${context.userId}`;
    return { ok: true as const, kind };
  });

export const sealCore = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { botId: string; token: string }) => ({
    botId: input.botId,
    token: input.token.trim(),
  }))
  .handler(async ({ context, data }) => {
    const { sealToken } = await import("@/lib/token-vault.server");
    const { validateBotToken } = await import("@/lib/discord.server");
    const check = await validateBotToken(data.token);
    const sealed = sealToken(context.userId, data.token);
    const sql = await getSql();

    if (check.ok) {
      await sql`update bots set
        token_cipher = ${sealed.cipher},
        token_hint = ${sealed.hint},
        bot_snowflake = ${check.identity.id},
        bot_username = ${check.identity.username},
        bot_avatar = ${check.avatarUrl},
        updated_at = now()
        where id = ${data.botId} and user_id = ${context.userId}`;
      await appendEvent(
        context.userId,
        data.botId,
        "core",
        `Núcleo selado. Identidade ${check.identity.username}.`,
      );
      return {
        ok: true as const,
        linked: true as const,
        hint: sealed.hint,
        username: check.identity.username,
        snowflake: check.identity.id,
        avatar: check.avatarUrl,
      };
    }

    await sql`update bots set
      token_cipher = ${sealed.cipher},
      token_hint = ${sealed.hint},
      bot_snowflake = null,
      bot_username = null,
      bot_avatar = null,
      updated_at = now()
      where id = ${data.botId} and user_id = ${context.userId}`;
    await appendEvent(
      context.userId,
      data.botId,
      "core",
      `Núcleo selado em modo sandbox. ${check.error}`,
    );
    return {
      ok: true as const,
      linked: false as const,
      hint: sealed.hint,
      error: check.error,
    };
  });

export const clearCore = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((botId: string) => botId)
  .handler(async ({ context, data: botId }) => {
    const sql = await getSql();
    await sql`update bots set
      token_cipher = null,
      token_hint = null,
      bot_snowflake = null,
      bot_username = null,
      bot_avatar = null,
      updated_at = now()
      where id = ${botId} and user_id = ${context.userId}`;
    await appendEvent(context.userId, botId, "core", "Núcleo esvaziado.");
    return { ok: true as const };
  });

export const launchBot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      botId: string;
      files: { id: string; content: string }[];
      stability: Stability;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    for (const file of data.files) {
      await sql`update bot_files
        set content = ${file.content}, updated_at = now()
        where id = ${file.id}
          and bot_id = ${data.botId}
          and user_id = ${context.userId}`;
    }
    const status: BotStatus =
      data.stability === "unstable" ? "decaying" : "orbiting";
    await sql`update bots set
      status = ${status},
      stability = ${data.stability},
      published_at = now(),
      last_heartbeat_at = now(),
      crash_count = 0,
      uptime_ms = 0,
      updated_at = now()
      where id = ${data.botId} and user_id = ${context.userId}`;
    await appendEvent(
      context.userId,
      data.botId,
      "launch",
      status === "orbiting"
        ? "Inserção orbital concluída."
        : "Inserção com anomalia. Órbita em decaimento.",
    );
    return { ok: true as const, status };
  });

export const dockBot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((botId: string) => botId)
  .handler(async ({ context, data: botId }) => {
    const sql = await getSql();
    const rows = await sql<{ published_at: string | null; uptime_ms: number }>`
      select published_at, uptime_ms from bots
      where id = ${botId} and user_id = ${context.userId}`;
    const row = rows[0];
    let uptime = Number(row?.uptime_ms) || 0;
    if (row?.published_at) {
      uptime = Date.now() - new Date(row.published_at).getTime();
    }
    await sql`update bots set
      status = 'docked',
      stability = 'unknown',
      uptime_ms = ${uptime},
      updated_at = now()
      where id = ${botId} and user_id = ${context.userId}`;
    await appendEvent(context.userId, botId, "dock", "Sonda atracada.");
    return { ok: true as const };
  });

export const pulseBot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      botId: string;
      kind: string;
      payload: string;
      crashed?: boolean;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<BotRow>`
      select * from bots where id = ${data.botId} and user_id = ${context.userId} limit 1`;
    const row = rows[0];
    if (!row) return { ok: false as const };

    const crashed = Boolean(data.crashed);
    const crashCount = crashed ? Number(row.crash_count) + 1 : Number(row.crash_count);
    let status: BotStatus = row.status;
    let stability: Stability = row.stability;
    if (row.status === "orbiting" || row.status === "decaying") {
      if (crashed) {
        status = crashCount >= 3 ? "crashed" : "decaying";
        stability = "unstable";
      } else if (row.status === "decaying" && crashCount === 0) {
        status = "orbiting";
        stability = "stable";
      }
    }

    const uptime =
      row.published_at && status !== "docked"
        ? Date.now() - new Date(row.published_at).getTime()
        : Number(row.uptime_ms) || 0;

    await sql`update bots set
      last_heartbeat_at = now(),
      event_count = event_count + 1,
      crash_count = ${crashCount},
      status = ${status},
      stability = ${stability},
      uptime_ms = ${uptime},
      updated_at = now()
      where id = ${data.botId} and user_id = ${context.userId}`;
    await appendEvent(context.userId, data.botId, data.kind, data.payload.slice(0, 400));
    return { ok: true as const, status, stability, crashCount };
  });

export const listEvents = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((botId: string) => botId)
  .handler(async ({ context, data: botId }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      kind: string;
      payload: string;
      created_at: string;
    }>`
      select id, kind, payload, created_at
      from bot_events
      where bot_id = ${botId} and user_id = ${context.userId}
      order by id desc
      limit 60`;
    return rows.map(
      (row): TelemetryEvent => ({
        id: Number(row.id),
        kind: row.kind,
        payload: row.payload,
        createdAt: row.created_at,
      }),
    );
  });
