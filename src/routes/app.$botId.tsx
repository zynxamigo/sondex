import { createFileRoute } from "@tanstack/react-router";
import { DryDock } from "@/components/dry-dock";

export const Route = createFileRoute("/app/$botId")({ component: BotDock });

function BotDock() {
  const { botId } = Route.useParams();
  return <DryDock botId={botId} />;
}
