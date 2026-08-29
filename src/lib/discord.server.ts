export type DiscordBotIdentity = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
};

function avatarUrl(id: string, avatar: string | null): string | null {
  if (!avatar) return null;
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=64`;
}

export async function validateBotToken(
  token: string,
): Promise<
  | { ok: true; identity: DiscordBotIdentity; avatarUrl: string | null }
  | { ok: false; error: string }
> {
  const trimmed = token.trim();
  if (!trimmed || trimmed.length < 50) {
    return { ok: false, error: "Token curto demais para ser um token de bot." };
  }

  const res = await fetch("https://discord.com/api/v10/users/@me", {
    headers: { Authorization: `Bot ${trimmed}` },
  });

  if (res.status === 401) {
    return { ok: false, error: "Token recusado pela API do Discord." };
  }
  if (!res.ok) {
    return { ok: false, error: `Discord respondeu ${res.status}. Tente de novo.` };
  }

  const body = (await res.json()) as DiscordBotIdentity;
  return {
    ok: true,
    identity: body,
    avatarUrl: avatarUrl(body.id, body.avatar),
  };
}
