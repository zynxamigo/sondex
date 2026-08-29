import { createFileRoute } from "@tanstack/react-router";
import { MissionControl } from "@/components/mission-control";

export const Route = createFileRoute("/app/")({ component: AppIndex });

function AppIndex() {
  return <MissionControl />;
}
