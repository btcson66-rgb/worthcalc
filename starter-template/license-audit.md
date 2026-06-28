# License Audit

## Purpose

Track licenses for all third-party dependencies before shipping each of the 5 sites created from this starter. Re-run the audit before each release and whenever dependencies change.

## Project License

This starter uses an MIT license placeholder. Adjust the project's own license before publishing if your site requires a different license.

## Direct Dependency License Table

| Package | Version range | License | Notes |
| --- | --- | --- | --- |
| `astro` | See `package.json` | MIT | To be re-verified by audit command. |
| `@astrojs/sitemap` | See `package.json` | MIT | To be re-verified by audit command. |
| `@astrojs/check` | See `package.json` | MIT | To be re-verified by audit command. |
| `typescript` | See `package.json` | Apache-2.0 | To be re-verified by audit command. |
| `eslint` | See `package.json` | MIT | To be re-verified by audit command. |
| `@eslint/js` | See `package.json` | MIT | To be re-verified by audit command. |
| `@typescript-eslint/parser` | See `package.json` | MIT | To be re-verified by audit command. |
| `@typescript-eslint/eslint-plugin` | See `package.json` | MIT | To be re-verified by audit command. |
| `eslint-plugin-astro` | See `package.json` | MIT | To be re-verified by audit command. |
| `globals` | See `package.json` | MIT | To be re-verified by audit command. |

## Audit Workflow

1. Run `npm install`.
2. Run `npm ls --all --depth=0` to confirm direct installed versions.
3. Run a license checker, such as `npx license-checker --summary` or `npx licensee`.
4. Review copyleft licenses such as GPL, AGPL, and LGPL. None are expected in the starter's known direct dependencies.
5. Document any exceptions, replacement decisions, or license obligations in this file.
6. Re-run the audit before each release and after dependency updates.
7. Keep the dependency table and last audited date current.

Last audited: ____
