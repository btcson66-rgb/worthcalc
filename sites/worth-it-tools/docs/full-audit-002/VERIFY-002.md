# 2026-09-24 local verification

- `npm.cmd run verify` in `sites/worth-it-tools/`: exit code **0**. This includes calculation engine tests, build, Astro check, ESLint, link/indexation checks, the new canonical homepage link guard, editorial and locale checks. The guard output was `PASS — 181 indexable canonical pages, 0 /en/ homepage links`.
- `npm.cmd run lint` after adding the audit scripts: exit code **0**.
- `git diff --cached --check`: exit code **0** after staging the candidate.
- `full-calculator-e2e-002.mjs`: 18/18 applicable interaction PASS, 0 actual calculator failures. Nine GrowthCalculator Reset buttons passed; Reset is `NOT_APPLICABLE` for nine legacy auto-calculators. All 18 passed route, render, calculation, validation, negative/edge, locale, mobile width, fresh context, and console checks. Three financial fixtures, Growth Copy/CSV/Print, Budget Builder persistence, and Subscription Audit persistence passed.
- `export-gate-e2e-002.mjs`: seven checks PASS, including source and rendered-page audit proving no live email-export entry, Privacy feature truth, and mock endpoint success/failure. No real email sent.

The full local command logs are retained in this worktree as `verify-002.log`, `lint-002.log`, and `calculator-e2e-run.log`. The structured JSON E2E results and crawl rows are committed with this report.
