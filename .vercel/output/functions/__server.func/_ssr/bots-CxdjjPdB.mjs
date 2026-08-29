import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-C51aEXRO.mjs";
import { r as getSql } from "./db-DDUfVDKV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bots-CxdjjPdB.js
function newId() {
	return crypto.randomUUID();
}
function kindFromPath(path) {
	const lower = path.toLowerCase();
	if (lower.endsWith(".json")) return "json";
	if (lower.endsWith(".md")) return "md";
	if (lower.endsWith(".js") || lower.endsWith(".cjs") || lower.endsWith(".mjs")) return "js";
	return "txt";
}
var STARTER_FILES = [
	{
		path: "index.js",
		kind: "js",
		content: `const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
const config = require("./config.json");
const ping = require("./commands/ping");
const help = require("./commands/help");
const echo = require("./commands/echo");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
client.commands.set(ping.name, ping);
client.commands.set(help.name, help);
client.commands.set(echo.name, echo);

client.once(Events.ClientReady, (readyClient) => {
  console.log(\`Helix lock. Online as \${readyClient.user.tag}\`);
  console.log(\`Prefix \${config.prefix} · \${client.commands.size} commands loaded\`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/\\s+/);
  const name = args.shift()?.toLowerCase();
  const command = client.commands.get(name);
  if (!command) return;

  try {
    await command.execute(message, args, { client, config });
  } catch (err) {
    console.error(err);
    await message.reply("Falha no comando. Telemetria registrou o erro.");
  }
});

client.login(process.env.DISCORD_TOKEN);
`
	},
	{
		path: "config.json",
		kind: "json",
		content: `{
  "prefix": "!",
  "name": "Apogee Probe",
  "status": "in orbit"
}
`
	},
	{
		path: "commands/ping.js",
		kind: "js",
		content: `module.exports = {
  name: "ping",
  description: "Mede o pulso do bot.",
  async execute(message) {
    const sent = await message.reply("Medindo pulso…");
    const latency = Date.now() - message.createdTimestamp;
    await sent.edit(\`Pong. Pulso \${latency}ms.\`);
  },
};
`
	},
	{
		path: "commands/help.js",
		kind: "js",
		content: `module.exports = {
  name: "help",
  description: "Lista os comandos em órbita.",
  async execute(message, _args, { client, config }) {
    const lines = client.commands.map(
      (cmd) => \`\${config.prefix}\${cmd.name} — \${cmd.description}\`,
    );
    await message.reply("Comandos:\\n" + lines.join("\\n"));
  },
};
`
	},
	{
		path: "commands/echo.js",
		kind: "js",
		content: `module.exports = {
  name: "echo",
  description: "Repete o que você enviar.",
  async execute(message, args) {
    const text = args.join(" ").trim();
    if (!text) {
      await message.reply("Uso: !echo <texto>");
      return;
    }
    await message.reply(text);
  },
};
`
	},
	{
		path: "README.md",
		kind: "md",
		content: `# Sonda

Este é o casco inicial da Apogee. Não é um clone do VS Code —
é um estaleiro. Cada arquivo é uma placa do casco.

## Como usar

1. Sele o token do bot no **Núcleo**.
2. Edite os comandos em \`commands/\`.
3. Lance para colocar o bot em órbita.
4. Abra o **Eco** e envie \`!ping\`, \`!help\` ou \`!echo olá\`.

O código roda num runtime isolado. O token nunca volta para o editor.
`
	}
];
function toSummary(row, fileCount) {
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
		updatedAt: row.updated_at
	};
}
function toFile(row) {
	return {
		id: row.id,
		path: row.path,
		content: row.content,
		kind: row.kind,
		updatedAt: row.updated_at
	};
}
async function appendEvent(userId, botId, kind, payload) {
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
var listBots_createServerFn_handler = createServerRpc({
	id: "fcd5f66709665ca47bdca5a35e4256975d3b5f99d9fbcd36537fcb4cc86f77ba",
	name: "listBots",
	filename: "src/lib/bots.ts"
}, (opts) => listBots.__executeServer(opts));
var listBots = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listBots_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select b.*,
        (select count(*)::int from bot_files f where f.bot_id = b.id) as file_count
      from bots b
      where b.user_id = ${context.userId}
      order by b.updated_at desc`).map((row) => toSummary(row, Number(row.file_count) || 0));
});
var getBot_createServerFn_handler = createServerRpc({
	id: "d3dfe8e9d29d6c429f1a5033d38baf53d254f0a2b019457b12fe2e44d098cf7a",
	name: "getBot",
	filename: "src/lib/bots.ts"
}, (opts) => getBot.__executeServer(opts));
var getBot = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getBot_createServerFn_handler, async ({ context, data: id }) => {
	const sql = await getSql();
	const row = (await sql`
      select * from bots where id = ${id} and user_id = ${context.userId} limit 1`)[0];
	if (!row) return null;
	const files = await sql`
      select id, path, content, kind, updated_at
      from bot_files
      where bot_id = ${id} and user_id = ${context.userId}
      order by path asc`;
	return {
		...toSummary(row, files.length),
		files: files.map(toFile)
	};
});
var createBot_createServerFn_handler = createServerRpc({
	id: "3053c09a380f76a7e2fa32cdc321e2a27d863e9ad1426e8d576096ca4d18638b",
	name: "createBot",
	filename: "src/lib/bots.ts"
}, (opts) => createBot.__executeServer(opts));
var createBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: input.name.trim().slice(0, 48),
	description: (input.description ?? "").trim().slice(0, 180)
})).handler(createBot_createServerFn_handler, async ({ context, data }) => {
	if (!data.name) throw new Error("Dê um nome à sonda.");
	const sql = await getSql();
	const id = newId();
	await sql`insert into bots (id, user_id, name, description)
      values (${id}, ${context.userId}, ${data.name}, ${data.description})`;
	for (const file of STARTER_FILES) await sql`insert into bot_files (id, bot_id, user_id, path, content, kind)
        values (${newId()}, ${id}, ${context.userId}, ${file.path}, ${file.content}, ${file.kind})`;
	await appendEvent(context.userId, id, "dock", "Casco montado no estaleiro.");
	const bot = await getBot({ data: id });
	if (!bot) throw new Error("Falha ao montar a sonda.");
	return bot;
});
var deleteBot_createServerFn_handler = createServerRpc({
	id: "02ba5de5c12d0483beb3349dbee5cd1bbb16e61f9cc76c848a2def8cb7026697",
	name: "deleteBot",
	filename: "src/lib/bots.ts"
}, (opts) => deleteBot.__executeServer(opts));
var deleteBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deleteBot_createServerFn_handler, async ({ context, data: id }) => {
	const sql = await getSql();
	await sql`delete from bot_events where bot_id = ${id} and user_id = ${context.userId}`;
	await sql`delete from bot_files where bot_id = ${id} and user_id = ${context.userId}`;
	await sql`delete from bots where id = ${id} and user_id = ${context.userId}`;
	return { ok: true };
});
var renameBot_createServerFn_handler = createServerRpc({
	id: "6d4aedb881bb8dad7c7c10cc3fd711b4b55d7c821f7a87f4c11f22fa3ae0ee96",
	name: "renameBot",
	filename: "src/lib/bots.ts"
}, (opts) => renameBot.__executeServer(opts));
var renameBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: input.id,
	name: input.name.trim().slice(0, 48),
	description: input.description.trim().slice(0, 180)
})).handler(renameBot_createServerFn_handler, async ({ context, data }) => {
	if (!data.name) throw new Error("Nome vazio.");
	await (await getSql())`update bots
      set name = ${data.name},
          description = ${data.description},
          updated_at = now()
      where id = ${data.id} and user_id = ${context.userId}`;
	return { ok: true };
});
var saveFiles_createServerFn_handler = createServerRpc({
	id: "e89e16667632b023fc49a4d893f86729ccb32bc9f16de3d881628b4f44502146",
	name: "saveFiles",
	filename: "src/lib/bots.ts"
}, (opts) => saveFiles.__executeServer(opts));
var saveFiles = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveFiles_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	for (const file of data.files) await sql`update bot_files
        set content = ${file.content}, updated_at = now()
        where id = ${file.id}
          and bot_id = ${data.botId}
          and user_id = ${context.userId}`;
	await sql`update bots set updated_at = now()
      where id = ${data.botId} and user_id = ${context.userId}`;
	return { ok: true };
});
var addFile_createServerFn_handler = createServerRpc({
	id: "763ed2a6163eeb7688eee629ca063eb69ad3b7dde991bcbe6475c63479d692ff",
	name: "addFile",
	filename: "src/lib/bots.ts"
}, (opts) => addFile.__executeServer(opts));
var addFile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	botId: input.botId,
	path: input.path.trim().replace(/^\/+/, "").slice(0, 120),
	content: input.content ?? ""
})).handler(addFile_createServerFn_handler, async ({ context, data }) => {
	if (!data.path || data.path.includes("..")) throw new Error("Caminho inválido.");
	const sql = await getSql();
	if (!(await sql`
      select id from bots where id = ${data.botId} and user_id = ${context.userId}`)[0]) throw new Error("Sonda não encontrada.");
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
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
});
var deleteFile_createServerFn_handler = createServerRpc({
	id: "e0dd87e07a34684c1a93ab9cfdc72bb1327f5535f315c746b3fdd6bab82253ef",
	name: "deleteFile",
	filename: "src/lib/bots.ts"
}, (opts) => deleteFile.__executeServer(opts));
var deleteFile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(deleteFile_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`delete from bot_files
      where id = ${data.fileId}
        and bot_id = ${data.botId}
        and user_id = ${context.userId}`;
	return { ok: true };
});
var renameFile_createServerFn_handler = createServerRpc({
	id: "1f8b146da5a656a630dbdf8614c7e74e7b753228c4d6bcc639a25e40b4963819",
	name: "renameFile",
	filename: "src/lib/bots.ts"
}, (opts) => renameFile.__executeServer(opts));
var renameFile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	botId: input.botId,
	fileId: input.fileId,
	path: input.path.trim().replace(/^\/+/, "").slice(0, 120)
})).handler(renameFile_createServerFn_handler, async ({ context, data }) => {
	if (!data.path || data.path.includes("..")) throw new Error("Caminho inválido.");
	const sql = await getSql();
	const kind = kindFromPath(data.path);
	await sql`update bot_files
      set path = ${data.path}, kind = ${kind}, updated_at = now()
      where id = ${data.fileId}
        and bot_id = ${data.botId}
        and user_id = ${context.userId}`;
	return {
		ok: true,
		kind
	};
});
var sealCore_createServerFn_handler = createServerRpc({
	id: "b9badcf8de3ad6bf6316db2acfad23ef4e41fa31b7a66154129c21a00e3c9dea",
	name: "sealCore",
	filename: "src/lib/bots.ts"
}, (opts) => sealCore.__executeServer(opts));
var sealCore = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	botId: input.botId,
	token: input.token.trim()
})).handler(sealCore_createServerFn_handler, async ({ context, data }) => {
	const { sealToken } = await import("./token-vault.server-DXkcSax3.mjs");
	const { validateBotToken } = await import("./discord.server-CIvHXrfo.mjs");
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
		await appendEvent(context.userId, data.botId, "core", `Núcleo selado. Identidade ${check.identity.username}.`);
		return {
			ok: true,
			linked: true,
			hint: sealed.hint,
			username: check.identity.username,
			snowflake: check.identity.id,
			avatar: check.avatarUrl
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
	await appendEvent(context.userId, data.botId, "core", `Núcleo selado em modo sandbox. ${check.error}`);
	return {
		ok: true,
		linked: false,
		hint: sealed.hint,
		error: check.error
	};
});
var clearCore_createServerFn_handler = createServerRpc({
	id: "c4353a76c1a14d83502e54484226cdce55d4aa7abc036396474bbe21d5f4e958",
	name: "clearCore",
	filename: "src/lib/bots.ts"
}, (opts) => clearCore.__executeServer(opts));
var clearCore = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((botId) => botId).handler(clearCore_createServerFn_handler, async ({ context, data: botId }) => {
	await (await getSql())`update bots set
      token_cipher = null,
      token_hint = null,
      bot_snowflake = null,
      bot_username = null,
      bot_avatar = null,
      updated_at = now()
      where id = ${botId} and user_id = ${context.userId}`;
	await appendEvent(context.userId, botId, "core", "Núcleo esvaziado.");
	return { ok: true };
});
var launchBot_createServerFn_handler = createServerRpc({
	id: "f8add5235342a6bb970092bf2ae841d82d802916d6fafd55e23c70740a40aa82",
	name: "launchBot",
	filename: "src/lib/bots.ts"
}, (opts) => launchBot.__executeServer(opts));
var launchBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(launchBot_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	for (const file of data.files) await sql`update bot_files
        set content = ${file.content}, updated_at = now()
        where id = ${file.id}
          and bot_id = ${data.botId}
          and user_id = ${context.userId}`;
	const status = data.stability === "unstable" ? "decaying" : "orbiting";
	await sql`update bots set
      status = ${status},
      stability = ${data.stability},
      published_at = now(),
      last_heartbeat_at = now(),
      crash_count = 0,
      uptime_ms = 0,
      updated_at = now()
      where id = ${data.botId} and user_id = ${context.userId}`;
	await appendEvent(context.userId, data.botId, "launch", status === "orbiting" ? "Inserção orbital concluída." : "Inserção com anomalia. Órbita em decaimento.");
	return {
		ok: true,
		status
	};
});
var dockBot_createServerFn_handler = createServerRpc({
	id: "91a3a98ca7d771911b1c964207f9ae7cdb5355d95f3388cbad1b7106e25e373b",
	name: "dockBot",
	filename: "src/lib/bots.ts"
}, (opts) => dockBot.__executeServer(opts));
var dockBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((botId) => botId).handler(dockBot_createServerFn_handler, async ({ context, data: botId }) => {
	const sql = await getSql();
	const row = (await sql`
      select published_at, uptime_ms from bots
      where id = ${botId} and user_id = ${context.userId}`)[0];
	let uptime = Number(row?.uptime_ms) || 0;
	if (row?.published_at) uptime = Date.now() - new Date(row.published_at).getTime();
	await sql`update bots set
      status = 'docked',
      stability = 'unknown',
      uptime_ms = ${uptime},
      updated_at = now()
      where id = ${botId} and user_id = ${context.userId}`;
	await appendEvent(context.userId, botId, "dock", "Sonda atracada.");
	return { ok: true };
});
var pulseBot_createServerFn_handler = createServerRpc({
	id: "a766492245316eceb04e369f25a9ed2413e8cabdd0af0b67f29fd6829b6af595",
	name: "pulseBot",
	filename: "src/lib/bots.ts"
}, (opts) => pulseBot.__executeServer(opts));
var pulseBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(pulseBot_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const row = (await sql`
      select * from bots where id = ${data.botId} and user_id = ${context.userId} limit 1`)[0];
	if (!row) return { ok: false };
	const crashed = Boolean(data.crashed);
	const crashCount = crashed ? Number(row.crash_count) + 1 : Number(row.crash_count);
	let status = row.status;
	let stability = row.stability;
	if (row.status === "orbiting" || row.status === "decaying") {
		if (crashed) {
			status = crashCount >= 3 ? "crashed" : "decaying";
			stability = "unstable";
		} else if (row.status === "decaying" && crashCount === 0) {
			status = "orbiting";
			stability = "stable";
		}
	}
	const uptime = row.published_at && status !== "docked" ? Date.now() - new Date(row.published_at).getTime() : Number(row.uptime_ms) || 0;
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
	return {
		ok: true,
		status,
		stability,
		crashCount
	};
});
var listEvents_createServerFn_handler = createServerRpc({
	id: "fb575dd81437eaee2f9981630b78bffbcbff2ccafafd74b009acf50d16e9c957",
	name: "listEvents",
	filename: "src/lib/bots.ts"
}, (opts) => listEvents.__executeServer(opts));
var listEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((botId) => botId).handler(listEvents_createServerFn_handler, async ({ context, data: botId }) => {
	return (await (await getSql())`
      select id, kind, payload, created_at
      from bot_events
      where bot_id = ${botId} and user_id = ${context.userId}
      order by id desc
      limit 60`).map((row) => ({
		id: Number(row.id),
		kind: row.kind,
		payload: row.payload,
		createdAt: row.created_at
	}));
});
//#endregion
export { addFile_createServerFn_handler, clearCore_createServerFn_handler, createBot_createServerFn_handler, deleteBot_createServerFn_handler, deleteFile_createServerFn_handler, dockBot_createServerFn_handler, getBot_createServerFn_handler, launchBot_createServerFn_handler, listBots_createServerFn_handler, listEvents_createServerFn_handler, pulseBot_createServerFn_handler, renameBot_createServerFn_handler, renameFile_createServerFn_handler, saveFiles_createServerFn_handler, sealCore_createServerFn_handler };
