export type BotStatus =
  | "docked"
  | "igniting"
  | "orbiting"
  | "decaying"
  | "crashed";

export type Stability = "stable" | "unstable" | "unknown";

export type FileKind = "js" | "json" | "md" | "txt";

export type BotSummary = {
  id: string;
  name: string;
  description: string;
  status: BotStatus;
  tokenHint: string | null;
  hasToken: boolean;
  botSnowflake: string | null;
  botUsername: string | null;
  botAvatar: string | null;
  publishedAt: string | null;
  lastHeartbeatAt: string | null;
  uptimeMs: number;
  crashCount: number;
  eventCount: number;
  stability: Stability;
  fileCount: number;
  createdAt: string;
  updatedAt: string;
};

export type BotFile = {
  id: string;
  path: string;
  content: string;
  kind: FileKind;
  updatedAt: string;
};

export type BotDetail = BotSummary & {
  files: BotFile[];
};

export type TelemetryEvent = {
  id: number;
  kind: string;
  payload: string;
  createdAt: string;
};

export type IntentFlag = {
  key: string;
  label: string;
  present: boolean;
};

export type DetectedHandler = {
  event: string;
  file: string;
  line: number;
};

export type DetectedCommand = {
  trigger: string;
  file: string;
  line: number;
};

export type AnalysisIssue = {
  severity: "error" | "warn" | "info";
  message: string;
  file?: string;
};

export type BotAnalysis = {
  score: number;
  intents: IntentFlag[];
  handlers: DetectedHandler[];
  commands: DetectedCommand[];
  issues: AnalysisIssue[];
  hasLogin: boolean;
  entry: string | null;
};
