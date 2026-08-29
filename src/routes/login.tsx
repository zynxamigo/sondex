import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6 text-fg">
      <div className="w-full max-w-sm">
        <Link to="/" className="inline-flex">
          <BrandMark />
        </Link>
        <h1 className="mt-10 font-display text-3xl font-medium italic">
          Entre para abrir o estaleiro.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Cada sonda, token e placa de casco fica na sua malha.
        </p>
        <div className="mt-8 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/app" })}
              >
                Continuar com {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Entrada desligada.</p>
          )}
        </div>
      </div>
    </main>
  );
}
