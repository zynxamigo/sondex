export function newId(): string {
  return crypto.randomUUID();
}

export function kindFromPath(path: string): "js" | "json" | "md" | "txt" {
  const lower = path.toLowerCase();
  if (lower.endsWith(".json")) return "json";
  if (lower.endsWith(".md")) return "md";
  if (lower.endsWith(".js") || lower.endsWith(".cjs") || lower.endsWith(".mjs")) {
    return "js";
  }
  return "txt";
}
