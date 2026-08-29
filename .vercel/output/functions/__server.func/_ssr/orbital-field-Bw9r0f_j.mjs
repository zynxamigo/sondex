import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orbital-field-Bw9r0f_j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrbitalField({ bodies, className, onSelect, demo }) {
	const canvasRef = (0, import_react.useRef)(null);
	const bodiesRef = (0, import_react.useRef)(bodies);
	bodiesRef.current = bodies;
	const onSelectRef = (0, import_react.useRef)(onSelect);
	onSelectRef.current = onSelect;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let raf = 0;
		let t = 0;
		const hits = [];
		const stars = Array.from({ length: 48 }, () => ({
			x: Math.random(),
			y: Math.random(),
			a: .12 + Math.random() * .28
		}));
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
		const colorFor = (status) => {
			if (status === "orbiting") return {
				r: 125,
				g: 154,
				b: 126
			};
			if (status === "decaying" || status === "crashed") return {
				r: 193,
				g: 122,
				b: 90
			};
			return {
				r: 139,
				g: 147,
				b: 160
			};
		};
		const draw = () => {
			const rect = canvas.getBoundingClientRect();
			const w = rect.width;
			const h = rect.height;
			ctx.clearRect(0, 0, w, h);
			for (const star of stars) {
				ctx.fillStyle = `rgba(244,241,234,${star.a})`;
				ctx.fillRect(star.x * w, star.y * h, 1, 1);
			}
			const cx = w * .5;
			const cy = h * .52;
			const maxR = Math.min(w, h) * .38;
			ctx.strokeStyle = "rgba(244,241,234,0.08)";
			ctx.lineWidth = 1;
			for (let i = 1; i <= 3; i++) {
				ctx.beginPath();
				ctx.ellipse(cx, cy, maxR * (.38 + i * .2), maxR * (.22 + i * .12), -.4, 0, Math.PI * 2);
				ctx.stroke();
			}
			ctx.beginPath();
			ctx.fillStyle = "rgba(244,241,234,0.12)";
			ctx.arc(cx, cy, 3, 0, Math.PI * 2);
			ctx.fill();
			hits.length = 0;
			bodiesRef.current.forEach((body, i) => {
				const ring = .42 + i % 3 * .2;
				const rx = maxR * ring;
				const ry = maxR * (ring * .58);
				const speed = body.status === "crashed" ? 0 : body.status === "decaying" ? 35e-5 : body.status === "orbiting" ? 55e-5 : 18e-5;
				const base = i * 1.7;
				const wobble = body.status === "decaying" ? Math.sin(t * .004 + i) * 10 : 0;
				const crashedPull = body.status === "crashed" ? .45 : 1;
				const ang = reduce ? base : base + t * speed;
				const x = cx + Math.cos(ang) * rx * crashedPull;
				const y = cy + Math.sin(ang) * ry * crashedPull + wobble;
				const col = colorFor(body.status);
				const r = body.status === "docked" ? 4 : 5.5;
				ctx.beginPath();
				ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},0.35)`;
				ctx.lineWidth = 1;
				ctx.arc(x, y, r + 5, 0, Math.PI * 2);
				ctx.stroke();
				ctx.beginPath();
				ctx.fillStyle = `rgb(${col.r},${col.g},${col.b})`;
				ctx.arc(x, y, r, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = "rgba(244,241,234,0.72)";
				ctx.font = "11px 'IBM Plex Sans', sans-serif";
				ctx.textAlign = "center";
				ctx.fillText(body.name.slice(0, 18), x, y + 18);
				hits.push({
					id: body.id,
					x,
					y,
					r: 16
				});
			});
			if (!reduce) t += 16;
			raf = requestAnimationFrame(draw);
		};
		draw();
		const onClick = (ev) => {
			const rect = canvas.getBoundingClientRect();
			const x = ev.clientX - rect.left;
			const y = ev.clientY - rect.top;
			const hit = [...hits].reverse().find((h) => {
				const dx = h.x - x;
				const dy = h.y - y;
				return dx * dx + dy * dy <= h.r * h.r;
			});
			if (hit && onSelectRef.current) onSelectRef.current(hit.id);
		};
		canvas.addEventListener("click", onClick);
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			canvas.removeEventListener("click", onClick);
		};
	}, [demo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className,
		role: "img",
		"aria-label": "Campo orbital das sondas"
	});
}
//#endregion
export { OrbitalField as t };
