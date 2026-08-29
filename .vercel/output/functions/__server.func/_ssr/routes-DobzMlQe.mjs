import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Skeleton, r as useCurrentUserState, t as AccountChip } from "./account-chip-CuF5hxPo.mjs";
import { t as BrandMark } from "./brand-mark-sRn9tv7r.mjs";
import { t as Button } from "./button-DistbWZR.mjs";
import { t as OrbitalField } from "./orbital-field-Bw9r0f_j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DobzMlQe.js
var import_jsx_runtime = require_jsx_runtime();
var DEMO = [
	{
		id: "a",
		name: "Norte",
		status: "orbiting",
		stability: "stable"
	},
	{
		id: "b",
		name: "Vela",
		status: "decaying",
		stability: "unstable"
	},
	{
		id: "c",
		name: "Doca",
		status: "docked",
		stability: "unknown"
	}
];
function LandingPage() {
	const { user, isPending } = useCurrentUserState();
	const signedIn = Boolean(user);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3",
					children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-11 w-28" }) : signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app",
							children: "Controle"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountChip, {})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Entrar"
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-steel uppercase",
						children: "Foundry orbital"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-xl font-display text-4xl font-medium italic sm:text-5xl",
						children: "O ponto mais alto da órbita do seu bot."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-lg text-base text-muted",
						children: "Escreva o casco num estaleiro — não num clone de editor. Sele o token no núcleo. Lance. A Apogee mostra o pulso, a estabilidade e um Eco onde o JavaScript roda de verdade."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app",
								children: "Abrir a malha"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Colocar em órbita"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#como",
								children: "Como funciona"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-72 overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)] sm:h-96",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitalField, {
						bodies: DEMO,
						className: "h-full w-full",
						demo: true
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "como",
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid w-full max-w-6xl gap-px bg-border px-0 sm:grid-cols-3",
					children: [
						{
							k: "01",
							t: "Casco",
							d: "Arquivos como placas. Pastas como nervuras. Um filament editor com o pulso dos handlers na margem — sem barra de atividades, sem tema de IDE alheia."
						},
						{
							k: "02",
							t: "Núcleo",
							d: "O token entra uma vez, é cifrado e some. A identidade é lida na API do Discord. Nada volta ao cliente além das últimas quatro letras."
						},
						{
							k: "03",
							t: "Órbita",
							d: "Lançar acende o mesh. Tempo ativo, estável ou instável, diário de anomalias. No Eco você fala com o bot — o código executa isolado."
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "bg-bg px-6 py-10 sm:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-steel",
								children: item.k
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-2xl font-medium",
								children: item.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted",
								children: item.d
							})
						]
					}, item.k))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-8 text-xs text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Apogee" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Estaleiro de bots Discord" })]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {});
}
//#endregion
export { Home as component };
