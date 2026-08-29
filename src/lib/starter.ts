import type { FileKind } from "./types";

export type StarterFile = {
  path: string;
  content: string;
  kind: FileKind;
};

export const STARTER_FILES: StarterFile[] = [
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
`,
  },
  {
    path: "config.json",
    kind: "json",
    content: `{
  "prefix": "!",
  "name": "Apogee Probe",
  "status": "in orbit"
}
`,
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
`,
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
`,
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
`,
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
`,
  },
];
