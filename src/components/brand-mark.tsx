import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-fg", className)}>
      <svg
        viewBox="0 0 24 24"
        className="size-5 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="4.2"
          stroke="currentColor"
          strokeWidth="1.2"
          transform="rotate(-24 12 12)"
        />
        <circle cx="18" cy="9.2" r="1.7" fill="currentColor" />
      </svg>
      {wordmark ? (
        <span className="font-display text-lg font-medium tracking-tight">
          Apogee
        </span>
      ) : null}
    </span>
  );
}
