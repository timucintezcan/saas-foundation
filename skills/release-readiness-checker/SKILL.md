---
name: release-readiness-checker
description: Performs final pre-release checks for the SaaS Foundation template. Use before tagging, publishing, or sharing template updates.
---

# Release Readiness Checker

## Use This Skill When
- Preparing to push significant template changes.
- Validating docs + scripts after behavior updates.

## Checklist
1. Functional checks
- `pnpm install --no-frozen-lockfile`
- `pnpm lint`
- `pnpm build`
- Smoke test: `pnpm run create -- demo-check ...`

2. Config checks
- Confirm generated `template.config.json` includes expected infra/ui values.
- Confirm defaults resolve correctly with minimal flags.

3. Docs checks
- README quick start works as-written.
- `docs/INIT_GUIDE.md` matches accepted flags.
- Remove stale or deprecated flags from examples.

4. Cleanup
- Remove temporary demo folders.
- Ensure no generated noise is left unintentionally.

## Final Report
Return pass/fail with:
- Commands run
- Errors (if any)
- Exact files requiring fixes
