# @cospired ESLint configs for 2026/2027 — design

## Intent

Cospired projects currently copy a hand-built TypeScript ESLint config between repos (the one in `eventured/packages/eslint-config`) because the published `@cospired/eslint-config-*` packages are stuck on ESLint 8, the legacy `.eslintrc` format and airbnb, and have no working TypeScript support. Goal: one published package family that every project installs, replacing both. Released as a new major version.

## Goals

- Flat config, ESLint 10, typescript-eslint 8+, ESM. No airbnb (`eslint-config-airbnb-base`/`-typescript` are unmaintained and eslintrc-only).
- Four configs, in two packages (**my call**, keeps existing package names):
  - `@cospired/eslint-config-base` — `.` (JS), `./typescript` (TS)
  - `@cospired/eslint-config-react` — `.` (JS), `./typescript` (TS); react-hooks, jsx-a11y, formatjs. Replaces the old `eslint-config-typescript` package branch work.
- Rule set built on `@eslint/js` / typescript-eslint recommended (+ stylistic, type-checked for the TS variant). Every custom rule is compared against what recommended already sets and kept only on clean-code merit, decided with Dirk one by one (see "Rule review").
- Carry over from eventured: `eslint-disable` needs a `-- reason`, TODOs need a ticket ref (`todo-plz`), alphabetized `import-x/order`, devDependency imports only in test/config/script files.
- Carry over from the old packages: eslint-comments rules, formatjs (i18n) rules, jsx-a11y extras, the useful import rules, `no-unused-vars` with `^_` ignore.
- Replace the hapi plugin. Keep its readability intent (blank line after function open / before return) via a non-hapi rule — candidate: `padding-line-between-statements` from `@stylistic/eslint-plugin` (to verify it coexists with Prettier; core version is deprecated). `no-arrowception` replacement: a core rule such as `no-confusing-arrow` / `no-return-assign` family, or drop. Decide during review.
- Tests that prove completeness: every config loads in ESLint 10; every configured rule exists in the installed plugin versions (replaces `eslint-find-rules`); fixture files assert expected errors/non-errors (including blank-line, disable-reason, TODO-ticket, import-order, and a11y/formatjs cases); JS configs contain no TS-only rules; base contains no React rules.
- Tooling modernized: drop Babel, tape, `eslint-find-rules`, `in-publish`, `safe-publish-latest`, Travis scripts. Use `node:test` + the ESLint Node API, npm workspaces, changesets for versioning/publish. Turbo only if it earns its place for two packages (**my call: no**).

## Non-goals

- No formatting rules that Prettier owns (`eslint-config-prettier` stays last).
- No support for ESLint < 10 or legacy `.eslintrc`.
- No new rule categories beyond what is listed (no security, unicorn, sonarjs, etc.) in this pass.
- No migration of consuming projects (eventured etc.); only a migration note in the README.

## Anti-goals

- A config that loads but silently misses rules (typos, renamed/removed rules, wrong plugin namespace).
- Rules kept only because airbnb or hapi had them.
- Forcing React/formatjs/a11y peer dependencies onto non-React users.

## Constraints

- Node/ESLint/typescript-eslint floors: ESLint 10, current Node LTS at release (builder: confirm against ESLint 10's own `engines`).
- Peer dependencies are ranges, not the exact pins eventured uses.
- Type-aware linting options (`tsconfigRootDir`, project paths, multiple tsconfigs, import-x resolver settings) from eventured's `base.js`/`node.js` must survive in the TS variant.
- New major; old packages' last 7.x line stays on npm unchanged.

## Rule review (process, decided with Dirk)

Builder produces a table of every custom rule: source (airbnb-override / cospired / eventured / hapi), our setting, recommended's setting, difference. Conflicts and divergences are presented to Dirk and decided one at a time on clean-code grounds; the decisions are recorded in the repo (rule comments or `docs/rules.md`). Hapi `scope-start`/`no-arrowception` and the eventured-vs-cospired conflicts (e.g. `no-unused-vars` severity, `import/order` newlines, `no-console`, React `no-unused-expressions` relaxations) are the first items.

## Delivery phases and settled details

- **Two phases.** (1) Infrastructure: workspace, tooling, loader/existence tests, a first port of eventured's rules, rule-comparison table. (2) Interactive rule review with Dirk, one rule/conflict at a time; fixture tests are written alongside each decision, not before. The builder never ships rule decisions by default; until reviewed, conflicts keep eventured's setting as a placeholder and are listed as open.
- **Sources.** Eventured config: `/Users/dh/projects/eventured/eventured/packages/eslint-config/src/{base,node,react}.js` (local sibling checkout, readable). Old rules: `packages/eslint-config-{base,react}/rules/*.js` on `main`.
- **Versioning (my call).** Both packages release as `8.0.0`. The unpublished `eslint-config-typescript` (0.1.0) package is deleted; its work is superseded by the `./typescript` exports.
- **Layering (my call).** `react` depends on `base` as a regular dependency and composes it; `react/typescript` extends `base/typescript`. `base` contains no React rules and no React peer dependencies; React/formatjs/a11y plugins are peers of `react` only.
- **devDependency globs (my call).** Default to eventured's glob list (test/spec files, `test/`, `__tests__/`, `scripts/`, `*.config.*`), overridable via an option.
- **Prettier fallback (my call).** If `@stylistic` blank-line rules conflict with Prettier, fall back to core `padding-line-between-statements` if still present in ESLint 10; otherwise drop the blank-line rule and tell Dirk.
- **CI/publish (my call).** Repo is on GitHub (`cospired/javascript`): GitHub Actions running tests, plus the changesets release action. Dirk supplies the npm token / trusted-publishing setup.

## Findings from eventured consumers (apps/api, apps/frontend, packages/api-contracts)

What the three consumer configs add on top of the shared package, and what that means for the new package:

- **Node config is needed.** `apps/api` uses `createNodeConfig` (type-aware, node globals, `prefer-nullish-coalescing` with string `||` allowed, import-x resolver with `noWarnOnMultipleProjects`). The two-package layout had no node variant. **My call:** `@cospired/eslint-config-base/node` (TS only), built on base/typescript. Dirk to confirm.
- **Multiple tsconfigs + absolute paths + `tsconfigRootDir`.** api lints with three tsconfigs (`tsconfig.json`, `tsconfig.lint.json`, `test/tsconfig.json`) from both package root (Turbo) and repo root (lint-staged). `tsconfigPath` must accept an array; `tsconfigRootDir` stays an option. Test this scenario.
- **Import order needs extensible alias groups.** api overrides `import-x/order` to place `#shared/#data/#domain/#services/#entrypoints` aliases as an `internal` group before relative imports. The config should take `importOrder.pathGroups` (or treat Node `#` subpath imports as internal by default — decide in rule review) so consumers stop copy-pasting the whole rule.
- **`explicit-function-return-type`.** Base turns it off; api and api-contracts both turn it back on (`allowExpressions: true`, not for tests), and frontend uses disables for it (4×). Candidate to become a default (non-test files). Rule review item.
- **Type-aware extras both consumers add:** `no-misused-promises` (`checksConditionals: {flagUnions: 'strict'}`), `no-generated-empty-object-type`. Candidates for defaults.
- **formatjs is configured locally in frontend** from `formatjs.configs.recommended` plus: `no-invalid-icu` error, `no-camel-case` error, `enforce-description` off, test files excluded, `no-literal-string-in-jsx` left at warn. Old cospired `format.js` differs (enforce-description on, camel-case off, many extras). The new react config should own one reconciled formatjs preset, test files excluded by default. Rule review item.
- **No jsx-a11y in eventured frontend** (UI is react-aria based). Old cospired react config enables jsx-a11y. Open question for rule review: keep jsx-a11y by default, make it opt-in, or drop. react-hooks and react-refresh are used in eventured (React 19, Vite) but absent from the old react package; add both.
- **`no-restricted-imports` stays local.** All uses (icon subpath imports, layered-architecture bans, `#` alias rules) are project-specific; the package does not ship them, but the README should show the pattern.
- **Warnings are failures.** All lint scripts run `--report-unused-disable-directives --max-warnings 0`, so `warn` severity == `error` in practice. Rule review should settle a policy (prefer `error`/`off`; `warn` only for rules needing a transition period).
- **Misc:** CommonJS override for `*.config.{js,mjs}` (api-contracts), local `ignores`, `**/*.d.ts` globally ignored, `scripts/**` gets node globals with `no-console` off. `no-console` is disabled inline 10×, so the default stays `warn`/`error` with scripts exempted. Consumers pin exact versions via pnpm and use ESLint 10, typescript-eslint 8.72, TypeScript 6, Prettier 3.9; the package peers should be ranges that include these.
- **Acceptance check:** after the new package exists, the three eventured configs should be reproducible from it with only the local additions above, lint output on the eventured repo should match the current one except for deliberate rule decisions (diff list produced for Dirk).

## Left to the builder

File layout, test harness details, fixture format, changesets config, CI (existing is Travis; choose a current setup), README/migration docs, exact plugin versions.
