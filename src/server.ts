import express from "express";

import { env } from "@/libs/env";
import { logger } from "@/libs/logger";
import { ShutdownManager } from "@/libs/shutdown";

const app = express();

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

const server = app.listen(env.PORT, () => {
  logger.info(`Server is listening on port: ${env.PORT}`);
});

new ShutdownManager(server).listen();
