import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { HighlightStyle, syntaxHighlighting, bracketMatching } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { useEffect, useRef } from "react";
import type { FileKind } from "@/lib/types";

const highlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#f4f1ea", fontWeight: "500" },
  { tag: tags.string, color: "#7d9a7e" },
  { tag: tags.comment, color: "#6b6964", fontStyle: "italic" },
  { tag: tags.number, color: "#8b93a0" },
  { tag: tags.bool, color: "#8b93a0" },
  { tag: tags.function(tags.variableName), color: "#8b93a0" },
  { tag: tags.definition(tags.variableName), color: "#f4f1ea" },
  { tag: tags.propertyName, color: "#d8d4cc" },
  { tag: tags.operator, color: "#8a8880" },
  { tag: tags.className, color: "#f4f1ea" },
  { tag: tags.heading, color: "#f4f1ea", fontWeight: "500" },
  { tag: tags.processingInstruction, color: "#8b93a0" },
]);

const theme = EditorView.theme(
  {
    "&": {
      backgroundColor: "transparent",
      color: "#f4f1ea",
      height: "100%",
    },
    ".cm-gutters": {
      backgroundColor: "transparent",
      color: "#6b6964",
      border: "none",
    },
    ".cm-activeLine": { backgroundColor: "rgba(244,241,234,0.04)" },
    ".cm-activeLineGutter": { backgroundColor: "transparent" },
    ".cm-cursor": { borderLeftColor: "#d8d4cc" },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: "rgba(139,147,160,0.28)",
    },
    ".cm-content": { caretColor: "#d8d4cc" },
  },
  { dark: true },
);

function langFor(kind: FileKind) {
  if (kind === "json") return json();
  if (kind === "md") return markdown();
  return javascript();
}

export function FilamentEditor({
  fileId,
  value,
  kind,
  onChange,
}: {
  fileId: string;
  value: string;
  kind: FileKind;
  onChange: (next: string) => void;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const initialRef = useRef(value);
  initialRef.current = value;

  useEffect(() => {
    if (!parentRef.current) return;
    const state = EditorState.create({
      doc: initialRef.current,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        drawSelection(),
        history(),
        bracketMatching(),
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        langFor(kind),
        syntaxHighlighting(highlight),
        theme,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
        EditorView.lineWrapping,
      ],
    });
    const view = new EditorView({ state, parent: parentRef.current });
    return () => {
      view.destroy();
    };
  }, [fileId, kind]);

  return <div ref={parentRef} className="h-full min-h-0 overflow-hidden" />;
}
