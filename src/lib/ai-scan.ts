import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";

export const scanWithGrok = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name: string; files: { path: string; content: string }[] }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Varredura Grok indisponível neste ambiente." };
    }

    const bundle = data.files
      .slice(0, 8)
      .map((f) => `// FILE ${f.path}\n${f.content.slice(0, 2500)}`)
      .join("\n\n")
      .slice(0, 12000);

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content:
              "Você é o oficial de telemetria da Apogee, um foundry de bots Discord. Responda em português, curto, em 4 a 6 linhas. Aponte intents faltando, handlers frágeis, e um ajuste concreto. Sem markdown pesado.",
          },
          {
            role: "user",
            content: `Sonda: ${data.name}\n\n${bundle}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Varredura falhou (${res.status}).` };
    }
    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    const text = body.choices[0]?.message?.content ?? "";
    return { ok: true as const, text };
  });
