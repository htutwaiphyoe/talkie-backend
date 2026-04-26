import type { Server } from "node:http";

import { logger } from "@/libs/logger";

export class ShutdownManager {
  private shuttingDown = false;

  constructor(
    private readonly server: Server,
    private readonly timeoutMs = 10_000,
  ) {}

  listen() {
    process.on("SIGTERM", () => this.shutdown("SIGTERM"));

    process.on("SIGINT", () => this.shutdown("SIGINT"));

    process.on("unhandledRejection", (err) => {
      logger.fatal({ err }, "Unhandled rejection");
      this.shutdown("unhandledRejection", 1);
    });

    process.on("uncaughtException", (err) => {
      logger.fatal({ err }, "Uncaught exception");
      this.shutdown("uncaughtException", 1);
    });
  }

  private shutdown(reason: string, exitCode = 0) {
    if (this.shuttingDown) {
      logger.warn({ reason }, "Already shutting down, forcing exit");
      process.exit(1);
    }

    this.shuttingDown = true;

    logger.info({ reason }, "Shutting down");

    const forceExit = setTimeout(() => {
      logger.error("Shutdown timed out, forcing exit");
      process.exit(1);
    }, this.timeoutMs);

    forceExit.unref();

    this.server.close(() => {
      clearTimeout(forceExit);
      logger.info({ exitCode }, "Shutdown complete");
      process.exit(exitCode);
    });

    this.server.closeIdleConnections();
  }
}
