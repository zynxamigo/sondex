import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";

function keyFor(userId: string): Buffer {
  const secret =
    process.env.BETTER_AUTH_SECRET ||
    process.env.XAI_API_KEY ||
    "apogee-preview-pepper";
  return createHash("sha256").update(`apogee:core:${userId}:${secret}`).digest();
}

export function sealToken(
  userId: string,
  token: string,
): { cipher: string; hint: string } {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", keyFor(userId), iv);
  const enc = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    cipher: Buffer.concat([iv, tag, enc]).toString("base64"),
    hint: token.slice(-4),
  };
}

export function openToken(userId: string, cipherText: string): string {
  const buf = Buffer.from(cipherText, "base64");
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const enc = buf.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", keyFor(userId), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}

export function tokenHint(token: string): string {
  return token.slice(-4);
}
