import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-C51aEXRO.mjs";
import { a as Square, d as FilePlus, f as ArrowLeft, i as Trash2, l as Lock, n as Unplug, o as ShieldCheck, s as Rocket, u as Folder } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$1, r as cn } from "./router-CSQI5SkU.mjs";
import { t as Button } from "./button-DistbWZR.mjs";
import { _ as liveUptimeMs, a as addFile, b as saveFiles, c as createSsrRpc, d as dockBot, f as formatUptime, g as listEvents, i as StatusChip, m as launchBot, n as Label, o as clearCore, p as getBot, r as StabilityChip, t as Input, u as deleteFile, v as pulseBot, x as sealCore, y as relativeTime } from "./bots-BWnn7sCr.mjs";
import { $ as tags, F as keymap, I as lineNumbers, M as EditorView, N as drawSelection, P as highlightActiveLine, V as EditorState, a as HighlightStyle, f as bracketMatching, k as syntaxHighlighting } from "../_libs/@codemirror/autocomplete+[...].mjs";
import { r as javascript } from "../_libs/@codemirror/lang-html+[...].mjs";
import { t as json } from "../_libs/@codemirror/lang-json+[...].mjs";
import { t as markdown } from "../_libs/@codemirror/lang-markdown+[...].mjs";
import { i as indentWithTab, n as history, r as historyKeymap, t as defaultKeymap } from "../_libs/codemirror__commands.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app._botId-CwAYkMb9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoreVault({ bot, busy, onSeal, onClear }) {
	const [token, setToken] = (0, import_react.useState)("");
	const [reveal, setReveal] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col gap-5 overflow-y-auto p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Núcleo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-xl font-medium",
					children: "Cofre do token"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "O token entra uma vez, é cifrado e nunca volta ao editor. A Apogee confirma a identidade na API do Discord."
				})
			] }),
			bot.hasToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-bg-subtle p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [bot.botAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: bot.botAvatar,
						alt: "",
						className: "size-10 rounded-full outline outline-1 -outline-offset-1 outline-fg/10"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 place-items-center rounded-full bg-bg text-steel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: bot.botUsername ?? "Núcleo selado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-muted",
							children: [
								"••••",
								bot.tokenHint,
								" ",
								bot.botSnowflake ? `· ${bot.botSnowflake}` : "· sandbox"
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "mt-3",
					onClick: onClear,
					disabled: busy,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unplug, { className: "size-3.5" }), "Esvaziar núcleo"]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					if (!token.trim()) return;
					onSeal(token.trim());
					setToken("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "token",
						children: "Token do bot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute top-3.5 left-3 size-4 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "token",
							autoComplete: "off",
							spellCheck: false,
							type: reveal ? "text" : "password",
							value: token,
							onChange: (e) => setToken(e.target.value),
							placeholder: "Cole o token aqui",
							className: "pl-10 font-mono"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 text-xs text-muted hover:text-fg",
							onClick: () => setReveal((v) => !v),
							children: reveal ? "Ocultar" : "Mostrar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy || !token.trim(),
							children: "Selar núcleo"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-subtle",
				children: "Sem token válido a sonda ainda lança em modo sandbox: o Eco executa o código, mas a identidade Discord permanece desligada."
			})
		]
	});
}
function EchoChamber({ files, entry, botName, running, onRuntimeEvent }) {
	const workerRef = (0, import_react.useRef)(null);
	const eventRef = (0, import_react.useRef)(onRuntimeEvent);
	eventRef.current = onRuntimeEvent;
	const filesRef = (0, import_react.useRef)(files);
	filesRef.current = files;
	const [items, setItems] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [ready, setReady] = (0, import_react.useState)(false);
	const scroller = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
	}, [items]);
	(0, import_react.useEffect)(() => {
		if (!running || !entry) {
			workerRef.current?.terminate();
			workerRef.current = null;
			setReady(false);
			return;
		}
		const worker = new Worker(new URL("../workers/bot-runtime.ts", import.meta.url), { type: "module" });
		workerRef.current = worker;
		setItems((prev) => [...prev, {
			id: `sys-${Date.now()}`,
			who: "sys",
			name: "mesh",
			text: "Acendendo runtime isolado…"
		}]);
		worker.onmessage = (ev) => {
			const msg = ev.data;
			if (msg.type === "ready") {
				setReady(true);
				setItems((prev) => [...prev, {
					id: `rdy-${Date.now()}`,
					who: "sys",
					name: "mesh",
					text: `Pronto. ${msg.tag}`
				}]);
				eventRef.current("ready", msg.tag);
			} else if (msg.type === "log") eventRef.current("log", msg.message);
			else if (msg.type === "reply" || msg.type === "send" || msg.type === "edit") setItems((prev) => [...prev, {
				id: `bot-${Date.now()}-${Math.random()}`,
				who: "bot",
				name: botName,
				text: msg.content
			}]);
			else if (msg.type === "error") {
				eventRef.current("error", msg.message);
				setItems((prev) => [...prev, {
					id: `err-${Date.now()}`,
					who: "sys",
					name: "mesh",
					text: msg.message
				}]);
			} else if (msg.type === "crash") {
				eventRef.current("crash", msg.message);
				setItems((prev) => [...prev, {
					id: `crash-${Date.now()}`,
					who: "sys",
					name: "mesh",
					text: `Queda: ${msg.message}`
				}]);
			}
		};
		const map = {};
		for (const file of filesRef.current) map[file.path] = file.content;
		const boot = {
			type: "boot",
			files: map,
			entry,
			botUser: {
				id: "1",
				username: botName.replace(/\s+/g, "") || "Probe"
			}
		};
		worker.postMessage(boot);
		return () => {
			worker.terminate();
			if (workerRef.current === worker) workerRef.current = null;
		};
	}, [
		running,
		entry,
		botName
	]);
	const send = (content) => {
		const text = content.trim();
		if (!text || !workerRef.current) return;
		const id = `m-${Date.now()}`;
		setItems((prev) => [...prev, {
			id,
			who: "you",
			name: "você",
			text
		}]);
		const msg = {
			type: "message",
			id,
			content: text,
			author: {
				id: "42",
				username: "operador",
				bot: false
			}
		};
		workerRef.current.postMessage(msg);
		setDraft("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Eco"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: running ? ready ? "Canal aberto" : "Sincronizando" : "Lance para falar com o bot"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					disabled: !ready,
					onClick: () => send("!ping"),
					children: "!ping"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scroller,
				className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-3",
				children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: "O Eco é uma sala de rádio. Seu JavaScript roda de verdade, isolado."
				}) : items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: item.who === "sys" ? "text-muted" : "text-fg",
						children: item.text
					})]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2 border-t border-border p-3",
				onSubmit: (e) => {
					e.preventDefault();
					send(draft);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: ready ? "Mensagem para o bot" : "Aguardando órbita",
					disabled: !ready,
					className: "h-11"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !ready || !draft.trim(),
					children: "Enviar"
				})]
			})
		]
	});
}
function buildTree(files) {
	const root = [];
	for (const file of files) {
		const parts = file.path.split("/").filter(Boolean);
		let level = root;
		let acc = "";
		parts.forEach((part, i) => {
			acc = acc ? `${acc}/${part}` : part;
			const isFile = i === parts.length - 1;
			let node = level.find((n) => n.name === part);
			if (!node) {
				node = {
					name: part,
					path: acc,
					children: isFile ? void 0 : [],
					file: isFile ? file : void 0
				};
				level.push(node);
			}
			if (!isFile) {
				node.children = node.children ?? [];
				level = node.children;
			} else node.file = file;
		});
	}
	const sort = (nodes) => {
		nodes.sort((a, b) => {
			const ad = a.children ? 0 : 1;
			const bd = b.children ? 0 : 1;
			if (ad !== bd) return ad - bd;
			return a.name.localeCompare(b.name);
		});
		nodes.forEach((n) => n.children && sort(n.children));
	};
	sort(root);
	return root;
}
function KindMark({ kind }) {
	if (kind === "json") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 rotate-45 bg-steel" });
	if (kind === "md") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-px w-2.5 bg-muted" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 rounded-full bg-accent" });
}
function Row({ node, depth, activeId, onOpen, onDelete }) {
	const [open, setOpen] = (0, import_react.useState)(true);
	if (node.children) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen((v) => !v),
		className: "flex h-9 w-full items-center gap-2 px-2 text-left text-xs text-muted hover:text-fg",
		style: { paddingLeft: 8 + depth * 12 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: node.name
		})]
	}), open ? node.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
		node: child,
		depth: depth + 1,
		activeId,
		onOpen,
		onDelete
	}, child.path)) : null] });
	if (!node.file) return null;
	const file = node.file;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group flex h-9 items-center gap-1 pr-1", activeId === file.id ? "bg-bg-subtle" : "hover:bg-bg-subtle/60"),
		style: { paddingLeft: 8 + depth * 12 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onOpen(file),
			className: "flex min-w-0 flex-1 items-center gap-2 text-left text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindMark, { kind: file.kind }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-fg",
				children: node.name
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "grid size-8 place-items-center text-subtle opacity-0 hover:text-rust group-hover:opacity-100",
			onClick: () => onDelete(file),
			"aria-label": `Remover ${file.path}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
		})]
	});
}
function FileManifest({ files, activeId, onOpen, onAdd, onDelete }) {
	const tree = (0, import_react.useMemo)(() => buildTree(files), [files]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [adding, setAdding] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Casco"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "size-9",
					onClick: () => setAdding(true),
					"aria-label": "Nova placa",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto pb-3",
				children: tree.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					node,
					depth: 0,
					activeId,
					onOpen,
					onDelete
				}, node.path))
			}),
			adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2 border-t border-border p-3",
				onSubmit: (e) => {
					e.preventDefault();
					if (!draft.trim()) return;
					onAdd(draft.trim());
					setDraft("");
					setAdding(false);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					autoFocus: true,
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "commands/novo.js",
					className: "h-9 font-mono text-xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "sm",
					children: "Add"
				})]
			}) : null
		]
	});
}
var highlight = HighlightStyle.define([
	{
		tag: tags.keyword,
		color: "#f4f1ea",
		fontWeight: "500"
	},
	{
		tag: tags.string,
		color: "#7d9a7e"
	},
	{
		tag: tags.comment,
		color: "#6b6964",
		fontStyle: "italic"
	},
	{
		tag: tags.number,
		color: "#8b93a0"
	},
	{
		tag: tags.bool,
		color: "#8b93a0"
	},
	{
		tag: tags.function(tags.variableName),
		color: "#8b93a0"
	},
	{
		tag: tags.definition(tags.variableName),
		color: "#f4f1ea"
	},
	{
		tag: tags.propertyName,
		color: "#d8d4cc"
	},
	{
		tag: tags.operator,
		color: "#8a8880"
	},
	{
		tag: tags.className,
		color: "#f4f1ea"
	},
	{
		tag: tags.heading,
		color: "#f4f1ea",
		fontWeight: "500"
	},
	{
		tag: tags.processingInstruction,
		color: "#8b93a0"
	}
]);
var theme = EditorView.theme({
	"&": {
		backgroundColor: "transparent",
		color: "#f4f1ea",
		height: "100%"
	},
	".cm-gutters": {
		backgroundColor: "transparent",
		color: "#6b6964",
		border: "none"
	},
	".cm-activeLine": { backgroundColor: "rgba(244,241,234,0.04)" },
	".cm-activeLineGutter": { backgroundColor: "transparent" },
	".cm-cursor": { borderLeftColor: "#d8d4cc" },
	".cm-selectionBackground, &.cm-focused .cm-selectionBackground": { backgroundColor: "rgba(139,147,160,0.28)" },
	".cm-content": { caretColor: "#d8d4cc" }
}, { dark: true });
function langFor(kind) {
	if (kind === "json") return json();
	if (kind === "md") return markdown();
	return javascript();
}
function FilamentEditor({ fileId, value, kind, onChange }) {
	const parentRef = (0, import_react.useRef)(null);
	const onChangeRef = (0, import_react.useRef)(onChange);
	onChangeRef.current = onChange;
	const initialRef = (0, import_react.useRef)(value);
	initialRef.current = value;
	(0, import_react.useEffect)(() => {
		if (!parentRef.current) return;
		const state = EditorState.create({
			doc: initialRef.current,
			extensions: [
				lineNumbers(),
				highlightActiveLine(),
				drawSelection(),
				history(),
				bracketMatching(),
				keymap.of([
					...defaultKeymap,
					...historyKeymap,
					indentWithTab
				]),
				langFor(kind),
				syntaxHighlighting(highlight),
				theme,
				EditorView.updateListener.of((update) => {
					if (update.docChanged) onChangeRef.current(update.state.doc.toString());
				}),
				EditorView.lineWrapping
			]
		});
		const view = new EditorView({
			state,
			parent: parentRef.current
		});
		return () => {
			view.destroy();
		};
	}, [fileId, kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: parentRef,
		className: "h-full min-h-0 overflow-hidden"
	});
}
function IntentLattice({ analysis }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: "Rede de intents"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: analysis.intents.map((intent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-2 rounded-md px-3 py-2 text-xs shadow-[var(--shadow-border)]", intent.present ? "text-fg" : "text-subtle"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", intent.present ? "bg-sage" : "bg-border") }), intent.label]
				}, intent.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Handlers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1",
					children: analysis.handlers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-xs text-subtle",
						children: "Nenhum evento ligado."
					}) : analysis.handlers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "font-mono text-xs text-fg",
						children: [h.event, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-subtle",
							children: [
								" ",
								"· ",
								h.file,
								":",
								h.line
							]
						})]
					}, `${h.file}:${h.line}:${h.event}`))
				})]
			})
		]
	});
}
var STAGES = [
	"Selando o núcleo",
	"Compilando o casco",
	"Travando intents",
	"Ignição",
	"Inserção orbital"
];
function LaunchOverlay({ open, onDone }) {
	const [stage, setStage] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!open) {
			setStage(0);
			return;
		}
		setStage(0);
		const timers = [];
		STAGES.forEach((_, i) => {
			timers.push(window.setTimeout(() => {
				setStage(i);
				if (i === STAGES.length - 1) timers.push(window.setTimeout(onDone, 700));
			}, i * 520));
		});
		return () => timers.forEach((id) => window.clearTimeout(id));
	}, [open, onDone]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-bg/92 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl font-medium italic",
				children: "Lançamento"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 space-y-2 text-sm",
				children: STAGES.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: i <= stage ? "text-fg" : "text-subtle",
					children: label
				}, label))
			})]
		})
	});
}
function PulseRibbon({ status, className }) {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let raf = 0;
		let t = 0;
		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.max(1, Math.floor(rect.width * dpr));
			canvas.height = Math.max(1, Math.floor(rect.height * dpr));
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);
		const draw = () => {
			const rect = canvas.getBoundingClientRect();
			const w = rect.width;
			const h = rect.height;
			ctx.clearRect(0, 0, w, h);
			ctx.beginPath();
			ctx.strokeStyle = status === "orbiting" ? "rgba(125,154,126,0.85)" : status === "decaying" || status === "crashed" ? "rgba(193,122,90,0.85)" : "rgba(139,147,160,0.7)";
			ctx.lineWidth = 1.4;
			const mid = h / 2;
			for (let x = 0; x <= w; x += 2) {
				const beat = status === "docked" ? 0 : status === "crashed" ? 0 : Math.exp(-Math.pow((x + (reduce ? 0 : t)) % 90 - 18, 2) / 40);
				const noise = status === "decaying" ? Math.sin((x + t) * .2) * 2.4 : 0;
				const y = mid - beat * (h * .38) + noise;
				if (x === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.stroke();
			if (!reduce) t += status === "orbiting" ? 1.6 : 1.1;
			raf = requestAnimationFrame(draw);
		};
		draw();
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	}, [status]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className,
		"aria-hidden": "true"
	});
}
var scanWithGrok = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("6df1da0008df754925e3cc608f8a5ff58c3443b2a1db9f6d96c25c758cd0f7f6"));
function TelemetryPanel({ bot, uptimeMs, analysis, events, files }) {
	const [scan, setScan] = (0, import_react.useState)(null);
	const [scanning, setScanning] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-muted uppercase",
						children: "Pulso"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-3xl tabular-nums tracking-tight",
							children: formatUptime(uptimeMs)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: "tempo ativo"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-end gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: bot.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StabilityChip, { stability: bot.stability })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PulseRibbon, {
						status: bot.status,
						className: "mt-4 h-12 w-full"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-3 gap-2 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-bg-subtle px-2 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-subtle",
									children: "Score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-mono text-lg tabular-nums",
									children: analysis.score
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-bg-subtle px-2 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-subtle",
									children: "Eventos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-mono text-lg tabular-nums",
									children: bot.eventCount
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-bg-subtle px-2 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-subtle",
									children: "Quedas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-mono text-lg tabular-nums",
									children: bot.crashCount
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-subtle",
						children: ["Último pulso ", relativeTime(bot.lastHeartbeatAt)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						className: "mt-4",
						disabled: scanning,
						onClick: async () => {
							setScanning(true);
							try {
								const res = await scanWithGrok({ data: {
									name: bot.name,
									files: files.map((f) => ({
										path: f.path,
										content: f.content
									}))
								} });
								setScan(res.ok ? res.text : res.error);
							} finally {
								setScanning(false);
							}
						},
						children: scanning ? "Varrendo…" : "Varredura Grok"
					}),
					scan ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm whitespace-pre-wrap text-muted",
						children: scan
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Anomalias"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: analysis.issues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted",
						children: "Casco limpo."
					}) : analysis.issues.map((issue, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: issue.severity === "error" ? "text-rust" : issue.severity === "warn" ? "text-steel" : "text-muted",
								children: issue.severity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-fg",
								children: [" ", issue.message]
							}),
							issue.file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-mono text-xs text-subtle",
								children: issue.file
							}) : null
						]
					}, `${issue.message}-${i}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Diário"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-subtle",
						children: "Sem registros ainda."
					}) : events.slice(0, 12).map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-steel",
							children: ev.kind
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" ", ev.payload]
						})]
					}, ev.id))
				})]
			})
		]
	});
}
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("flex items-center gap-1 rounded-md bg-bg-subtle p-1", className),
	...props
}));
TabsList.displayName = "TabsList";
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex h-9 flex-1 items-center justify-center rounded-sm px-3 text-xs font-medium text-muted transition-colors duration-150 data-[state=active]:bg-bg-elevated data-[state=active]:text-fg", className),
	...props
}));
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-3 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = "TabsContent";
var INTENT_MAP = [
	{
		key: "Guilds",
		label: "Guilds",
		pattern: /GatewayIntentBits\.Guilds\b/
	},
	{
		key: "GuildMessages",
		label: "Mensagens",
		pattern: /GatewayIntentBits\.GuildMessages\b/
	},
	{
		key: "MessageContent",
		label: "Conteúdo",
		pattern: /GatewayIntentBits\.MessageContent\b/
	},
	{
		key: "GuildMembers",
		label: "Membros",
		pattern: /GatewayIntentBits\.GuildMembers\b/
	},
	{
		key: "GuildVoiceStates",
		label: "Voz",
		pattern: /GatewayIntentBits\.GuildVoiceStates\b/
	},
	{
		key: "DirectMessages",
		label: "DM",
		pattern: /GatewayIntentBits\.DirectMessages\b/
	}
];
var HANDLER_RE = /\.(?:on|once)\(\s*(?:Events\.(\w+)|['"](\w+)['"])/g;
var COMMAND_RE = /(?:content\s*(?:===|==)\s*['"](![\w-]+)['"]|name:\s*['"]([\w-]+)['"]|startsWith\(\s*['"](!)['"]\s*\))/g;
var DANGEROUS = /\b(?:eval|Function|child_process|fs\.|process\.exit|fetch\(['"]https?:\/\/(?!discord\.com))/;
function analyzeBot(files) {
	const issues = [];
	const handlers = [];
	const commands = [];
	const joined = files.map((f) => f.content).join("\n");
	const intents = INTENT_MAP.map((item) => ({
		key: item.key,
		label: item.label,
		present: item.pattern.test(joined)
	}));
	const entry = files.find((f) => f.path === "index.js")?.path ?? files.find((f) => f.path.endsWith(".js"))?.path ?? null;
	let hasLogin = false;
	for (const file of files) {
		if (file.kind === "js") try {
			new Function(file.content);
		} catch (err) {
			issues.push({
				severity: "error",
				file: file.path,
				message: err instanceof Error ? err.message : "Erro de sintaxe"
			});
		}
		if (file.kind === "json") try {
			JSON.parse(file.content);
		} catch {
			issues.push({
				severity: "error",
				file: file.path,
				message: "JSON inválido"
			});
		}
		file.content.split("\n").forEach((line, i) => {
			HANDLER_RE.lastIndex = 0;
			let match;
			while (match = HANDLER_RE.exec(line)) handlers.push({
				event: match[1] ?? match[2] ?? "unknown",
				file: file.path,
				line: i + 1
			});
			COMMAND_RE.lastIndex = 0;
			while (match = COMMAND_RE.exec(line)) {
				const trigger = match[1] ?? match[2] ?? match[3];
				if (trigger) commands.push({
					trigger: trigger.startsWith("!") ? trigger : `!${trigger}`,
					file: file.path,
					line: i + 1
				});
			}
		});
		if (/client\.login\s*\(/.test(file.content)) hasLogin = true;
		if (DANGEROUS.test(file.content)) issues.push({
			severity: "warn",
			file: file.path,
			message: "Padrão sensível detectado. O runtime isolado bloqueia I/O nativo."
		});
	}
	if (!entry) issues.push({
		severity: "error",
		message: "Nenhum arquivo de entrada (.js) no casco."
	});
	if (!hasLogin) issues.push({
		severity: "warn",
		message: "Nenhum client.login encontrado — o bot pode não acordar."
	});
	if (!intents.find((i) => i.key === "MessageContent")?.present) issues.push({
		severity: "info",
		message: "Sem MessageContent o Eco não lê o texto das mensagens."
	});
	if (handlers.length === 0) issues.push({
		severity: "warn",
		message: "Nenhum handler de evento encontrado."
	});
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
		entry
	};
}
function uniqueBy(items, key) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const item of items) {
		const k = key(item);
		if (seen.has(k)) continue;
		seen.add(k);
		out.push(item);
	}
	return out;
}
function DryDock({ botId }) {
	const [bot, setBot] = (0, import_react.useState)(null);
	const [files, setFiles] = (0, import_react.useState)([]);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [dirty, setDirty] = (0, import_react.useState)({});
	const [events, setEvents] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [launching, setLaunching] = (0, import_react.useState)(false);
	const [mission, setMission] = (0, import_react.useState)("pulse");
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	const mergedFiles = (0, import_react.useMemo)(() => files.map((f) => dirty[f.id] != null ? {
		...f,
		content: dirty[f.id]
	} : f), [files, dirty]);
	const analysis = (0, import_react.useMemo)(() => analyzeBot(mergedFiles), [mergedFiles]);
	const active = mergedFiles.find((f) => f.id === activeId) ?? mergedFiles[0];
	const refreshEvents = (0, import_react.useCallback)(async () => {
		try {
			const list = await listEvents({ data: botId });
			setEvents(list);
		} catch {}
	}, [botId]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const detail = await getBot({ data: botId });
				if (cancelled) return;
				if (!detail) {
					setLoadError("Sonda não encontrada.");
					return;
				}
				setBot(detail);
				setFiles(detail.files);
				setActiveId(detail.files[0]?.id ?? null);
				await refreshEvents();
			} catch (err) {
				if (!cancelled) setLoadError(err instanceof Error ? err.message : "Falha ao abrir o estaleiro.");
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [botId, refreshEvents]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	const saveTimer = (0, import_react.useRef)(null);
	const persist = (0, import_react.useCallback)((nextDirty) => {
		if (saveTimer.current) window.clearTimeout(saveTimer.current);
		saveTimer.current = window.setTimeout(() => {
			const payload = Object.entries(nextDirty).map(([id, content]) => ({
				id,
				content
			}));
			if (!payload.length) return;
			saveFiles({ data: {
				botId,
				files: payload
			} }).then(() => {
				setFiles((prev) => prev.map((f) => nextDirty[f.id] != null ? {
					...f,
					content: nextDirty[f.id]
				} : f));
				setDirty({});
			}).catch((err) => {
				toast.error(err instanceof Error ? err.message : "Falha ao gravar.");
			});
		}, 700);
	}, [botId]);
	const onChange = (id, content) => {
		setDirty((prev) => {
			const next = {
				...prev,
				[id]: content
			};
			persist(next);
			return next;
		});
	};
	const onRuntimeEvent = (0, import_react.useCallback)((kind, payload) => {
		pulseBot({ data: {
			botId,
			kind,
			payload,
			crashed: kind === "crash"
		} }).then((res) => {
			if (res.ok) {
				setBot((prev) => prev ? {
					...prev,
					status: res.status,
					stability: res.stability,
					crashCount: res.crashCount,
					eventCount: prev.eventCount + 1,
					lastHeartbeatAt: (/* @__PURE__ */ new Date()).toISOString()
				} : prev);
				refreshEvents();
			}
		});
	}, [botId, refreshEvents]);
	const handleLaunch = async () => {
		if (!bot) return;
		setLaunching(true);
		setBusy(true);
		try {
			const payload = mergedFiles.map((f) => ({
				id: f.id,
				content: f.content
			}));
			const stability = analysis.issues.some((i) => i.severity === "error") ? "unstable" : "stable";
			const res = await launchBot({ data: {
				botId,
				files: payload,
				stability
			} });
			setDirty({});
			setFiles(mergedFiles);
			setBot((prev) => prev ? {
				...prev,
				status: res.status,
				stability,
				publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
				lastHeartbeatAt: (/* @__PURE__ */ new Date()).toISOString(),
				crashCount: 0
			} : prev);
			setMission("echo");
			await refreshEvents();
			toast.success("Sonda em órbita.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Falha no lançamento.");
			setLaunching(false);
		} finally {
			setBusy(false);
		}
	};
	const handleDock = async () => {
		setBusy(true);
		try {
			await dockBot({ data: botId });
			setBot((prev) => prev ? {
				...prev,
				status: "docked",
				stability: "unknown"
			} : prev);
			toast.message("Sonda atracada.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Falha ao atracar.");
		} finally {
			setBusy(false);
		}
	};
	if (loadError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid flex-1 place-items-center p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: loadError
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app",
				className: "mt-4 inline-block text-sm text-steel hover:text-fg",
				children: "Voltar ao controle"
			})]
		})
	});
	if (!bot || !active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-1 items-center justify-center text-sm text-muted",
		children: "Abrindo estaleiro…"
	});
	const uptime = liveUptimeMs(bot.publishedAt, bot.status, bot.uptimeMs);
	const inOrbit = bot.status === "orbiting" || bot.status === "decaying";
	const missionPanel = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		mission === "core" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreVault, {
			bot,
			busy,
			onSeal: async (token) => {
				setBusy(true);
				try {
					const res = await sealCore({ data: {
						botId,
						token
					} });
					setBot((prev) => prev ? {
						...prev,
						hasToken: true,
						tokenHint: res.hint,
						botUsername: res.linked ? res.username : prev.botUsername,
						botSnowflake: res.linked ? res.snowflake : null,
						botAvatar: res.linked ? res.avatar : null
					} : prev);
					if (res.linked) toast.success(`Identidade ${res.username} confirmada.`);
					else toast.message(res.error ?? "Selado em sandbox.");
					await refreshEvents();
				} catch (err) {
					toast.error(err instanceof Error ? err.message : "Falha ao selar.");
				} finally {
					setBusy(false);
				}
			},
			onClear: async () => {
				setBusy(true);
				try {
					await clearCore({ data: botId });
					setBot((prev) => prev ? {
						...prev,
						hasToken: false,
						tokenHint: null,
						botUsername: null,
						botSnowflake: null,
						botAvatar: null
					} : prev);
				} finally {
					setBusy(false);
				}
			}
		}) : null,
		mission === "pulse" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelemetryPanel, {
			bot,
			uptimeMs: uptime,
			analysis,
			events,
			files: mergedFiles
		}) : null,
		mission === "echo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoChamber, {
			files: mergedFiles,
			entry: analysis.entry,
			botName: bot.botUsername ?? bot.name,
			running: inOrbit,
			onRuntimeEvent
		}) : null,
		mission === "net" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntentLattice, { analysis }) : null
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-3 border-b border-border px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app",
						className: "inline-flex h-11 items-center gap-2 text-sm text-muted hover:text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Controle"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-lg font-medium",
							children: bot.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-subtle",
							children: [bot.botUsername ? `Núcleo ${bot.botUsername}` : bot.hasToken ? "Núcleo sandbox" : "Núcleo aberto", dirty && Object.keys(dirty).length ? " · alterações no casco" : ""]
						})]
					}),
					inOrbit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: handleDock,
						disabled: busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5" }), "Atracar"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleLaunch,
						disabled: busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "size-3.5" }), "Lançar"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden min-h-0 flex-1 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)_22rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "min-h-0 border-r border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileManifest, {
							files: mergedFiles,
							activeId: active.id,
							onOpen: (file) => setActiveId(file.id),
							onAdd: async (path) => {
								try {
									const created = await addFile({ data: {
										botId,
										path
									} });
									setFiles((prev) => [...prev, created]);
									setActiveId(created.id);
								} catch (err) {
									toast.error(err instanceof Error ? err.message : "Não foi possível adicionar.");
								}
							},
							onDelete: async (file) => {
								try {
									await deleteFile({ data: {
										botId,
										fileId: file.id
									} });
									setFiles((prev) => prev.filter((f) => f.id !== file.id));
									if (activeId === file.id) setActiveId(files.find((f) => f.id !== file.id)?.id ?? null);
								} catch (err) {
									toast.error(err instanceof Error ? err.message : "Falha ao remover.");
								}
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex min-h-0 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 overflow-x-auto border-b border-border px-2 py-2",
							children: mergedFiles.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setActiveId(file.id),
								className: cn("h-9 shrink-0 rounded-sm px-3 font-mono text-xs", file.id === active.id ? "bg-bg-subtle text-fg" : "text-muted hover:text-fg"),
								children: file.path.split("/").pop()
							}, file.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilamentEditor, {
								fileId: active.id,
								value: active.content,
								kind: active.kind,
								onChange: (next) => onChange(active.id, next)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "flex min-h-0 flex-col border-l border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1 border-b border-border p-2",
							children: [
								["core", "Núcleo"],
								["pulse", "Pulso"],
								["echo", "Eco"],
								["net", "Rede"]
							].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMission(id),
								className: cn("h-9 flex-1 rounded-sm text-xs", mission === id ? "bg-bg-subtle text-fg" : "text-muted hover:text-fg"),
								children: label
							}, id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1",
							children: missionPanel
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "code",
					className: "flex min-h-0 flex-1 flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 pt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "code",
										children: "Casco"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "core",
										children: "Núcleo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "pulse",
										children: "Pulso"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "echo",
										children: "Eco"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "code",
							className: "flex min-h-0 flex-1 flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-40 overflow-y-auto border-b border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileManifest, {
									files: mergedFiles,
									activeId: active.id,
									onOpen: (file) => setActiveId(file.id),
									onAdd: async (path) => {
										const created = await addFile({ data: {
											botId,
											path
										} });
										setFiles((prev) => [...prev, created]);
										setActiveId(created.id);
									},
									onDelete: async (file) => {
										await deleteFile({ data: {
											botId,
											fileId: file.id
										} });
										setFiles((prev) => prev.filter((f) => f.id !== file.id));
									}
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-h-0 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilamentEditor, {
									fileId: active.id,
									value: active.content,
									kind: active.kind,
									onChange: (next) => onChange(active.id, next)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "core",
							className: "min-h-0 flex-1 overflow-y-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreVault, {
								bot,
								busy,
								onSeal: async (token) => {
									setBusy(true);
									try {
										const res = await sealCore({ data: {
											botId,
											token
										} });
										setBot((prev) => prev ? {
											...prev,
											hasToken: true,
											tokenHint: res.hint,
											botUsername: res.linked ? res.username : prev.botUsername,
											botSnowflake: res.linked ? res.snowflake : null,
											botAvatar: res.linked ? res.avatar : null
										} : prev);
										if (res.linked) toast.success(`Identidade ${res.username} confirmada.`);
										else toast.message(res.error ?? "Selado em sandbox.");
										await refreshEvents();
									} catch (err) {
										toast.error(err instanceof Error ? err.message : "Falha ao selar.");
									} finally {
										setBusy(false);
									}
								},
								onClear: async () => {
									setBusy(true);
									try {
										await clearCore({ data: botId });
										setBot((prev) => prev ? {
											...prev,
											hasToken: false,
											tokenHint: null,
											botUsername: null,
											botSnowflake: null,
											botAvatar: null
										} : prev);
									} finally {
										setBusy(false);
									}
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "pulse",
							className: "min-h-0 flex-1 overflow-y-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelemetryPanel, {
								bot,
								uptimeMs: uptime,
								analysis,
								events,
								files: mergedFiles
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "echo",
							className: "flex min-h-0 flex-1 flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoChamber, {
								files: mergedFiles,
								entry: analysis.entry,
								botName: bot.botUsername ?? bot.name,
								running: inOrbit,
								onRuntimeEvent
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LaunchOverlay, {
				open: launching,
				onDone: () => setLaunching(false)
			})
		]
	});
}
function BotDock() {
	const { botId } = Route$1.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DryDock, { botId });
}
//#endregion
export { BotDock as component };
