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
