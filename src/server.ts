import express from "express";

import { env } from "@/libs/env";

const app = express();

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.listen(env.PORT, () => {
  console.log(`Server is listening on port: ${env.PORT}`);
});
