import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-C51aEXRO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-scan-CCLlnl5a.js
var scanWithGrok_createServerFn_handler = createServerRpc({
	id: "6df1da0008df754925e3cc608f8a5ff58c3443b2a1db9f6d96c25c758cd0f7f6",
	name: "scanWithGrok",
	filename: "src/lib/ai-scan.ts"
}, (opts) => scanWithGrok.__executeServer(opts));
var scanWithGrok = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(scanWithGrok_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Varredura Grok indisponível neste ambiente."
	};
	const bundle = data.files.slice(0, 8).map((f) => `// FILE ${f.path}\n${f.content.slice(0, 2500)}`).join("\n\n").slice(0, 12e3);
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 500,
			messages: [{
				role: "system",
				content: "Você é o oficial de telemetria da Apogee, um foundry de bots Discord. Responda em português, curto, em 4 a 6 linhas. Aponte intents faltando, handlers frágeis, e um ajuste concreto. Sem markdown pesado."
			}, {
				role: "user",
				content: `Sonda: ${data.name}\n\n${bundle}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Varredura falhou (${res.status}).`
	};
	return {
		ok: true,
		text: (await res.json()).choices[0]?.message?.content ?? ""
	};
});
//#endregion
export { scanWithGrok_createServerFn_handler };
