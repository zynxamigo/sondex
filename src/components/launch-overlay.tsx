import { useEffect, useState } from "react";

const STAGES = [
  "Selando o núcleo",
  "Compilando o casco",
  "Travando intents",
  "Ignição",
  "Inserção orbital",
];

export function LaunchOverlay({
  open,
  onDone,
}: {
  open: boolean;
  onDone: () => void;
}) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!open) {
      setStage(0);
      return;
    }
    setStage(0);
    const timers: number[] = [];
    STAGES.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setStage(i);
          if (i === STAGES.length - 1) {
            timers.push(window.setTimeout(onDone, 700));
          }
        }, i * 520),
      );
    });
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [open, onDone]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-bg/92 px-6">
      <div className="w-full max-w-sm text-center">
        <p className="font-display text-3xl font-medium italic">Lançamento</p>
        <ol className="mt-8 space-y-2 text-sm">
          {STAGES.map((label, i) => (
            <li
              key={label}
              className={i <= stage ? "text-fg" : "text-subtle"}
            >
              {label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
