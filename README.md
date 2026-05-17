# talkie-backend

Chat API for Talkie — 1:1 and group messaging.

## Stack

Bun · Express · TypeScript · Zod · Pino

## Setup

```bash
bun install
cp .env.example .env
bun dev
```

## Scripts

| Command | Does |
| --- | --- |
| `bun dev` | Start with watch |
| `bun start` | Start |
| `bun run typecheck` | Type check |
| `bun test` | Run tests |
| `bun run db:up` | Start Postgres |
| `bun run db:down` | Stop Postgres |

## Structure

```text
src/
  libs/
    env.ts        validated environment
    logger.ts     pino
    shutdown.ts   graceful shutdown
  server.ts
```

## Endpoints

| Method | Path | Returns |
| --- | --- | --- |
| GET | `/health` | `{ status, uptime, timestamp }` |
