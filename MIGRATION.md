# Migrating from 7.x to 8.0

8.0 is a rewrite. Both packages keep their names.

- **Flat config only, ESLint 10.** `.eslintrc` is gone; use `eslint.config.js` (see the package READMEs).
- **No airbnb.** `eslint-config-airbnb(-base)` and `airbnb-typescript` are no longer used or needed. The airbnb rules we kept are listed in [docs/rules.md](docs/rules.md); the rest are dropped. New rule set: ESLint and typescript-eslint recommended plus the rules in that table.
- **No hapi plugin.** `@hapi/scope-start` (a blank line at the start of function bodies) cannot coexist with Prettier and is dropped. `@hapi/no-arrowception` is dropped. Blank lines before `return` and after declarations are enforced via `@stylistic/padding-line-between-statements`.
- **TypeScript is a first-class entry:** `@cospired/eslint-config-base/typescript` (and `/node`, `@cospired/eslint-config-react/typescript`). The unpublished `@cospired/eslint-config-typescript-base` package is gone.
- **No `warn`.** Every rule is `error` or off.
- **Peers changed:** `@hapi/eslint-plugin`, `eslint-plugin-import`, `eslint-plugin-eslint-comments`, `eslint-plugin-react`, `eslint-plugin-jsx-a11y` are no longer used. New: `eslint-plugin-import-x`, `@eslint-community/eslint-plugin-eslint-comments`, `eslint-plugin-todo-plz`, `@stylistic/eslint-plugin`, `typescript-eslint`, `eslint-import-resolver-typescript`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-formatjs`.
- **React:** the `/hooks` convenience export is gone (hooks rules are part of the default). `eslint-plugin-react` rules and jsx-a11y are not included; jsx-a11y returns when the plugin supports ESLint 10.
- **Rules you will notice:** disable comments need `-- reason`; TODOs need a ticket `#123`; imports are alphabetized; `no-console` allows only `warn`/`error`; `eqeqeq`, `no-shadow`, `no-nested-ternary`, `prefer-template`, `no-await-in-loop` and others are errors; TypeScript files require explicit return types outside tests.
