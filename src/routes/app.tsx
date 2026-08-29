import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { AccountChip } from "@/components/account-chip";
import { BrandMark } from "@/components/brand-mark";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/app")({ component: AppShell });

function AppShell() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <div className="flex min-h-dvh flex-col bg-bg text-fg">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
          <BrandMark />
        </header>
        <div className="grid flex-1 place-items-center px-6">
          <p className="text-sm text-muted">Abrindo a malha…</p>
        </div>
      </div>
    );
  }

  if (!user) return <RedirectToSignIn />;

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <Link to="/" className="inline-flex">
          <BrandMark />
        </Link>
        <AccountChip />
      </header>
      <div className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
}
