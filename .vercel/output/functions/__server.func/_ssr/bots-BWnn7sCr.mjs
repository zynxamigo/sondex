import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-C51aEXRO.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./router-CSQI5SkU.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bots-BWnn7sCr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-11 w-full rounded-sm bg-bg-subtle px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel/50 disabled:opacity-40", className),
	ref,
	...props
}));
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-xs font-medium tracking-wide text-muted", className),
	...props
}));
Label.displayName = "Label";
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-bg-subtle text-muted",
		stable: "bg-sage/15 text-sage",
		unstable: "bg-rust/15 text-rust",
		docked: "bg-bg-subtle text-muted"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function formatUptime(ms) {
	if (ms < 0) ms = 0;
	const s = Math.floor(ms / 1e3);
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	const sec = s % 60;
	const pad = (n) => n.toString().padStart(2, "0");
	if (h > 99) return `${h}:${pad(m)}:${pad(sec)}`;
	return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}
function liveUptimeMs(publishedAt, status, stored) {
	if (!publishedAt) return stored;
	if (status === "docked") return 0;
	if (status === "crashed") return stored;
	return Date.now() - new Date(publishedAt).getTime();
}
function statusLabel(status) {
	switch (status) {
		case "docked": return "Atracado";
		case "igniting": return "Ignição";
		case "orbiting": return "Em órbita";
		case "decaying": return "Decaindo";
		case "crashed": return "Queda";
	}
}
function stabilityLabel(stability) {
	switch (stability) {
		case "stable": return "Estável";
		case "unstable": return "Instável";
		case "unknown": return "Indefinido";
	}
}
function relativeTime(iso) {
	if (!iso) return "—";
	const delta = Date.now() - new Date(iso).getTime();
	const s = Math.floor(delta / 1e3);
	if (s < 10) return "agora";
	if (s < 60) return `${s}s`;
	const m = Math.floor(s / 60);
	if (m < 60) return `${m}min`;
	const h = Math.floor(m / 60);
	if (h < 48) return `${h}h`;
	return `${Math.floor(h / 24)}d`;
}
function StatusChip({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: status === "orbiting" ? "stable" : status === "decaying" || status === "crashed" ? "unstable" : "docked",
		children: statusLabel(status)
	});
}
function StabilityChip({ stability }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: stability === "stable" ? "stable" : stability === "unstable" ? "unstable" : "default",
		children: stabilityLabel(stability)
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listBots = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("fcd5f66709665ca47bdca5a35e4256975d3b5f99d9fbcd36537fcb4cc86f77ba"));
var getBot = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("d3dfe8e9d29d6c429f1a5033d38baf53d254f0a2b019457b12fe2e44d098cf7a"));
var createBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: input.name.trim().slice(0, 48),
	description: (input.description ?? "").trim().slice(0, 180)
})).handler(createSsrRpc("3053c09a380f76a7e2fa32cdc321e2a27d863e9ad1426e8d576096ca4d18638b"));
var deleteBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("02ba5de5c12d0483beb3349dbee5cd1bbb16e61f9cc76c848a2def8cb7026697"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: input.id,
	name: input.name.trim().slice(0, 48),
	description: input.description.trim().slice(0, 180)
})).handler(createSsrRpc("6d4aedb881bb8dad7c7c10cc3fd711b4b55d7c821f7a87f4c11f22fa3ae0ee96"));
var saveFiles = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("e89e16667632b023fc49a4d893f86729ccb32bc9f16de3d881628b4f44502146"));
var addFile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	botId: input.botId,
	path: input.path.trim().replace(/^\/+/, "").slice(0, 120),
	content: input.content ?? ""
})).handler(createSsrRpc("763ed2a6163eeb7688eee629ca063eb69ad3b7dde991bcbe6475c63479d692ff"));
var deleteFile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("e0dd87e07a34684c1a93ab9cfdc72bb1327f5535f315c746b3fdd6bab82253ef"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	botId: input.botId,
	fileId: input.fileId,
	path: input.path.trim().replace(/^\/+/, "").slice(0, 120)
})).handler(createSsrRpc("1f8b146da5a656a630dbdf8614c7e74e7b753228c4d6bcc639a25e40b4963819"));
var sealCore = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	botId: input.botId,
	token: input.token.trim()
})).handler(createSsrRpc("b9badcf8de3ad6bf6316db2acfad23ef4e41fa31b7a66154129c21a00e3c9dea"));
var clearCore = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((botId) => botId).handler(createSsrRpc("c4353a76c1a14d83502e54484226cdce55d4aa7abc036396474bbe21d5f4e958"));
var launchBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("f8add5235342a6bb970092bf2ae841d82d802916d6fafd55e23c70740a40aa82"));
var dockBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((botId) => botId).handler(createSsrRpc("91a3a98ca7d771911b1c964207f9ae7cdb5355d95f3388cbad1b7106e25e373b"));
var pulseBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("a766492245316eceb04e369f25a9ed2413e8cabdd0af0b67f29fd6829b6af595"));
var listEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((botId) => botId).handler(createSsrRpc("fb575dd81437eaee2f9981630b78bffbcbff2ccafafd74b009acf50d16e9c957"));
//#endregion
export { liveUptimeMs as _, addFile as a, saveFiles as b, createSsrRpc as c, dockBot as d, formatUptime as f, listEvents as g, listBots as h, StatusChip as i, deleteBot as l, launchBot as m, Label as n, clearCore as o, getBot as p, StabilityChip as r, createBot as s, Input as t, deleteFile as u, pulseBot as v, sealCore as x, relativeTime as y };
