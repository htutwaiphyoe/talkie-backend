import pino from "pino";

import { env } from "@/libs/env";

export const logger = pino({
  level: env.isProd ? "info" : "debug",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "*.password",
    "*.token",
    "*.refreshToken",
  ],
  transport: env.isProd
    ? undefined
    : {
        target: "pino-pretty",
        options: { translateTime: "HH:MM:ss", ignore: "pid,hostname" },
      },
});
