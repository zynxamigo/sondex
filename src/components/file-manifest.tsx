import { FilePlus, Folder, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { BotFile } from "@/lib/types";

type Node = {
  name: string;
  path: string;
  file?: BotFile;
  children?: Node[];
};

function buildTree(files: BotFile[]): Node[] {
  const root: Node[] = [];
  for (const file of files) {
    const parts = file.path.split("/").filter(Boolean);
    let level = root;
    let acc = "";
    parts.forEach((part, i) => {
      acc = acc ? `${acc}/${part}` : part;
      const isFile = i === parts.length - 1;
      let node = level.find((n) => n.name === part);
      if (!node) {
        node = { name: part, path: acc, children: isFile ? undefined : [], file: isFile ? file : undefined };
        level.push(node);
      }
      if (!isFile) {
        node.children = node.children ?? [];
        level = node.children;
      } else {
        node.file = file;
      }
    });
  }
  const sort = (nodes: Node[]) => {
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

function KindMark({ kind }: { kind: string }) {
  if (kind === "json") {
    return <span className="mt-1 size-1.5 rotate-45 bg-steel" />;
  }
  if (kind === "md") {
    return <span className="mt-1.5 h-px w-2.5 bg-muted" />;
  }
  return <span className="mt-1 size-1.5 rounded-full bg-accent" />;
}

function Row({
  node,
  depth,
  activeId,
  onOpen,
  onDelete,
}: {
  node: Node;
  depth: number;
  activeId: string | null;
  onOpen: (file: BotFile) => void;
  onDelete: (file: BotFile) => void;
}) {
  const [open, setOpen] = useState(true);
  if (node.children) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-full items-center gap-2 px-2 text-left text-xs text-muted hover:text-fg"
          style={{ paddingLeft: 8 + depth * 12 }}
        >
          <Folder className="size-3.5" />
          <span className="truncate">{node.name}</span>
        </button>
        {open
          ? node.children.map((child) => (
              <Row
                key={child.path}
                node={child}
                depth={depth + 1}
                activeId={activeId}
                onOpen={onOpen}
                onDelete={onDelete}
              />
            ))
          : null}
      </div>
    );
  }
  if (!node.file) return null;
  const file = node.file;
  return (
    <div
      className={cn(
        "group flex h-9 items-center gap-1 pr-1",
        activeId === file.id ? "bg-bg-subtle" : "hover:bg-bg-subtle/60",
      )}
      style={{ paddingLeft: 8 + depth * 12 }}
    >
      <button
        type="button"
        onClick={() => onOpen(file)}
        className="flex min-w-0 flex-1 items-center gap-2 text-left text-xs"
      >
        <KindMark kind={file.kind} />
        <span className="truncate text-fg">{node.name}</span>
      </button>
      <button
        type="button"
        className="grid size-8 place-items-center text-subtle opacity-0 hover:text-rust group-hover:opacity-100"
        onClick={() => onDelete(file)}
        aria-label={`Remover ${file.path}`}
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}

export function FileManifest({
  files,
  activeId,
  onOpen,
  onAdd,
  onDelete,
}: {
  files: BotFile[];
  activeId: string | null;
  onOpen: (file: BotFile) => void;
  onAdd: (path: string) => void;
  onDelete: (file: BotFile) => void;
}) {
  const tree = useMemo(() => buildTree(files), [files]);
  const [draft, setDraft] = useState("");
  const [adding, setAdding] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between px-3 py-3">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">
          Casco
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          onClick={() => setAdding(true)}
          aria-label="Nova placa"
        >
          <FilePlus className="size-4" />
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pb-3">
        {tree.map((node) => (
          <Row
            key={node.path}
            node={node}
            depth={0}
            activeId={activeId}
            onOpen={onOpen}
            onDelete={onDelete}
          />
        ))}
      </div>
      {adding ? (
        <form
          className="flex gap-2 border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            onAdd(draft.trim());
            setDraft("");
            setAdding(false);
          }}
        >
          <Input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="commands/novo.js"
            className="h-9 font-mono text-xs"
          />
          <Button type="submit" size="sm">
            Add
          </Button>
        </form>
      ) : null}
    </div>
  );
}
