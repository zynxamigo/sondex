import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Plus, i as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as cn } from "./router-CSQI5SkU.mjs";
import { t as Button } from "./button-DistbWZR.mjs";
import { _ as liveUptimeMs, f as formatUptime, h as listBots, i as StatusChip, l as deleteBot, n as Label, r as StabilityChip, s as createBot, t as Input } from "./bots-BWnn7sCr.mjs";
import { t as OrbitalField } from "./orbital-field-Bw9r0f_j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.index-DklQryoJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = "DialogOverlay";
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-bg-elevated p-6 shadow-[var(--shadow-border)] duration-250 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-4 right-4 text-muted hover:text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Fechar"
		})]
	})]
})] }));
DialogContent.displayName = "DialogContent";
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-2 pr-6", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-display text-xl font-medium text-fg", className),
	...props
}));
DialogTitle.displayName = "DialogTitle";
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted", className),
	...props
}));
DialogDescription.displayName = "DialogDescription";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	className: cn("flex min-h-24 w-full rounded-md bg-bg-subtle px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel/50 disabled:opacity-40", className),
	ref,
	...props
}));
Textarea.displayName = "Textarea";
function CreateBotDialog({ open, onOpenChange, onCreate }) {
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nova sonda" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Montamos o casco com um bot Discord.js pronto para o Eco." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-4 space-y-4",
			onSubmit: async (e) => {
				e.preventDefault();
				if (!name.trim()) return;
				setBusy(true);
				try {
					await onCreate({
						name: name.trim(),
						description: description.trim()
					});
					setName("");
					setDescription("");
					onOpenChange(false);
				} finally {
					setBusy(false);
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "bot-name",
						children: "Nome"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "bot-name",
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Sonda Norte",
						maxLength: 48
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "bot-desc",
						children: "Notas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "bot-desc",
						value: description,
						onChange: (e) => setDescription(e.target.value),
						placeholder: "O que esta sonda faz",
						maxLength: 180
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy || !name.trim(),
						children: "Montar casco"
					})
				})
			]
		})] })
	});
}
function MissionControl() {
	const navigate = useNavigate();
	const [bots, setBots] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listBots().then((rows) => {
			if (!cancelled) setBots(rows);
		}).catch((err) => {
			if (!cancelled) {
				toast.error(err instanceof Error ? err.message : "Falha ao ler a malha.");
				setBots([]);
			}
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	const openBot = (id) => {
		navigate({
			to: "/app/$botId",
			params: { botId: id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-56 overflow-hidden border-b border-border sm:h-72",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitalField, {
						bodies: bots ?? [],
						className: "h-full w-full",
						onSelect: openBot
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: "Controle de missão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-3xl font-medium",
							children: "Malha"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute right-4 bottom-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Nova sonda"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-full max-w-5xl flex-1 px-4 py-6",
				children: bots === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Lendo a malha…"
				}) : bots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-bg-elevated px-6 py-12 text-center shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: "Estaleiro vazio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-2 max-w-md text-sm text-muted",
							children: "Monte uma sonda, sele o token no núcleo, escreva o casco e lance. O Eco executa o JavaScript de verdade."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6",
							onClick: () => setOpen(true),
							children: "Montar a primeira"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3 sm:grid-cols-2",
					children: bots.map((bot) => {
						const up = liveUptimeMs(bot.publishedAt, bot.status, bot.uptimeMs);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openBot(bot.id),
								className: "min-w-0 flex-1 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-medium",
											children: bot.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: bot.status })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 truncate text-sm text-muted",
										children: bot.botUsername ?? (bot.description || "Sem identidade Discord")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 font-mono text-xs tabular-nums text-subtle",
										children: [
											formatUptime(up),
											" · ",
											bot.fileCount,
											" placas ·",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StabilityChip, { stability: bot.stability })
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-11 place-items-center text-subtle hover:text-rust",
								"aria-label": `Desmontar ${bot.name}`,
								onClick: async () => {
									if (!confirm(`Desmontar ${bot.name}?`)) return;
									try {
										await deleteBot({ data: bot.id });
										setBots((prev) => prev?.filter((b) => b.id !== bot.id) ?? []);
									} catch (err) {
										toast.error(err instanceof Error ? err.message : "Falha.");
									}
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}) }, bot.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateBotDialog, {
				open,
				onOpenChange: setOpen,
				onCreate: async (input) => {
					const bot = await createBot({ data: input });
					toast.success("Casco montado.");
					openBot(bot.id);
				}
			})
		]
	});
}
function AppIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionControl, {});
}
//#endregion
export { AppIndex as component };
