# 2026-09-24 local verification

- `npm.cmd run verify` in `sites/worth-it-tools/`: exit code **0**. This includes calculation engine tests, build, Astro check, ESLint, link/indexation checks, the new canonical homepage link guard, editorial and locale checks. The guard output was `PASS — 181 indexable canonical pages, 0 /en/ homepage links`.
- `npm.cmd run lint` after adding the audit scripts: exit code **0**.
- `git diff --cached --check`: exit code **0** after staging the candidate.
- `full-calculator-e2e-002.mjs`: 9/18 full interaction PASS; the other nine fail the Reset criterion because their legacy pages have no reset control. All 18 passed route, render, calculation, validation, negative/edge, locale, mobile width, and console checks. Three financial fixtures and Budget Builder persistence passed.
- `export-gate-e2e-002.mjs`: five checks PASS using a mocked endpoint; no real email sent.

The full local command logs are retained in this worktree as `verify-002.log`, `lint-002.log`, and `calculator-e2e-run.log`. The structured JSON E2E results and crawl rows are committed with this report.
