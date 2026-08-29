import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { OrbitalField } from "@/components/orbital-field";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { AccountChip } from "@/components/account-chip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DEMO = [
  { id: "a", name: "Norte", status: "orbiting" as const, stability: "stable" as const },
  { id: "b", name: "Vela", status: "decaying" as const, stability: "unstable" as const },
  { id: "c", name: "Doca", status: "docked" as const, stability: "unknown" as const },
];

export function LandingPage() {
  const { user, isPending } = useCurrentUserState();
  const signedIn = Boolean(user);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <BrandMark />
        <div className="flex items-center gap-3">
          {isPending ? (
            <Skeleton className="h-11 w-28" />
          ) : signedIn ? (
            <>
              <Button asChild variant="secondary">
                <Link to="/app">Controle</Link>
              </Button>
              <AccountChip />
            </>
          ) : (
            <Button asChild>
              <Link to="/login">Entrar</Link>
            </Button>
          )}
        </div>
      </header>

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-10">
        <div>
          <p className="text-xs font-medium tracking-wide text-steel uppercase">
            Foundry orbital
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-medium italic sm:text-5xl">
            O ponto mais alto da órbita do seu bot.
          </h1>
          <p className="mt-5 max-w-lg text-base text-muted">
            Escreva o casco num estaleiro — não num clone de editor. Sele o
            token no núcleo. Lance. A Apogee mostra o pulso, a estabilidade e
            um Eco onde o JavaScript roda de verdade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {signedIn ? (
              <Button asChild size="lg">
                <Link to="/app">Abrir a malha</Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/login">Colocar em órbita</Link>
              </Button>
            )}
            <Button asChild variant="ghost" size="lg">
              <a href="#como">Como funciona</a>
            </Button>
          </div>
        </div>
        <div className="relative h-72 overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)] sm:h-96">
          <OrbitalField bodies={DEMO} className="h-full w-full" demo />
        </div>
      </section>

      <section id="como" className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-px bg-border px-0 sm:grid-cols-3">
          {[
            {
              k: "01",
              t: "Casco",
              d: "Arquivos como placas. Pastas como nervuras. Um filament editor com o pulso dos handlers na margem — sem barra de atividades, sem tema de IDE alheia.",
            },
            {
              k: "02",
              t: "Núcleo",
              d: "O token entra uma vez, é cifrado e some. A identidade é lida na API do Discord. Nada volta ao cliente além das últimas quatro letras.",
            },
            {
              k: "03",
              t: "Órbita",
              d: "Lançar acende o mesh. Tempo ativo, estável ou instável, diário de anomalias. No Eco você fala com o bot — o código executa isolado.",
            },
          ].map((item) => (
            <article key={item.k} className="bg-bg px-6 py-10 sm:px-8">
              <p className="font-mono text-xs text-steel">{item.k}</p>
              <h2 className="mt-3 font-display text-2xl font-medium">{item.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-8 text-xs text-subtle">
        <span>Apogee</span>
        <span>Estaleiro de bots Discord</span>
      </footer>
    </div>
  );
}
