# Notes

## Untrack a file in git

```bash
git rm --cached <file>        # untrack, keep on disk
git rm -r --cached <folder>/  # for folders
git commit -m "chore: untrack <file>"
```

## Env files

| File | Values | Git |
| --- | --- | --- |
| `.env` | real, local | ignored |
| `.env.example` | same keys, safe values | committed |

## Logging

```ts
pino({
  level: isProd ? "info" : "debug",
  redact: ["req.headers.authorization", "*.password", "*.token"],
});
```

JSON in prod, `pino-pretty` in dev. Redact catches secrets from accidental `logger.info({ req })` — logs are permanent.
