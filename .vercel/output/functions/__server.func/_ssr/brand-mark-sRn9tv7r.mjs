import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as cn } from "./router-CSQI5SkU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brand-mark-sRn9tv7r.js
var import_jsx_runtime = require_jsx_runtime();
function BrandMark({ className, wordmark = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5 text-fg", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			className: "size-5 shrink-0",
			"aria-hidden": "true",
			fill: "none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "12",
				cy: "12",
				rx: "9",
				ry: "4.2",
				stroke: "currentColor",
				strokeWidth: "1.2",
				transform: "rotate(-24 12 12)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "9.2",
				r: "1.7",
				fill: "currentColor"
			})]
		}), wordmark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-lg font-medium tracking-tight",
			children: "Apogee"
		}) : null]
	});
}
//#endregion
export { BrandMark as t };
