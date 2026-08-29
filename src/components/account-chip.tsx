import { useState } from "react";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Skeleton } from "@/components/ui/skeleton";

export function AccountChip() {
  const { user, isPending } = useCurrentUserState();
  const [signingOut, setSigningOut] = useState(false);

  if (isPending) {
    return <Skeleton className="h-11 w-36 rounded-sm" />;
  }
  if (!user) return null;

  const label = user.displayName ?? user.primaryEmail ?? "Conta";

  return (
    <div className="flex items-center gap-2">
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt=""
          className="size-8 rounded-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
        />
      ) : (
        <span className="grid size-8 place-items-center rounded-full bg-bg-subtle text-xs font-medium">
          {label.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="hidden max-w-32 truncate text-sm sm:inline">{label}</span>
      <button
        type="button"
        disabled={signingOut}
        onClick={() => {
          setSigningOut(true);
          void signOut().catch(() => setSigningOut(false));
        }}
        className="h-11 px-1 text-xs text-muted hover:text-fg disabled:opacity-50"
      >
        {signingOut ? "Saindo…" : "Sair"}
      </button>
    </div>
  );
}
