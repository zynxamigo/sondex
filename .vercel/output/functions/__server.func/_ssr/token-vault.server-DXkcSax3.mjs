import { createCipheriv, createHash, randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/token-vault.server-DXkcSax3.js
function keyFor(userId) {
	const secret = process.env.BETTER_AUTH_SECRET || process.env.XAI_API_KEY || "apogee-preview-pepper";
	return createHash("sha256").update(`apogee:core:${userId}:${secret}`).digest();
}
function sealToken(userId, token) {
	const iv = randomBytes(12);
	const cipher = createCipheriv("aes-256-gcm", keyFor(userId), iv);
	const enc = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
	const tag = cipher.getAuthTag();
	return {
		cipher: Buffer.concat([
			iv,
			tag,
			enc
		]).toString("base64"),
		hint: token.slice(-4)
	};
}
//#endregion
export { sealToken };
