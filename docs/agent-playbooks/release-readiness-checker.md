# Release Readiness Checker

## Goal
Run final quality checks before publishing template changes.

## Trigger
Use before release tags, pushes, or public sharing.

## Checklist
1. `pnpm install --no-frozen-lockfile`
2. `pnpm lint`
3. `pnpm build`
4. Smoke test: `pnpm run create -- demo-check ...`
5. Verify generated `template.config.json`
6. Verify README and `docs/INIT_GUIDE.md` commands
7. Remove temporary demo output

## Output
Provide pass/fail with commands run, errors, and exact files needing fixes.
