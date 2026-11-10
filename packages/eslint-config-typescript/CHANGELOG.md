# @cospired/eslint-config-typescript

## 8.0.0

### Major Changes

- 58726c8: Rewrite for ESLint 10 flat config, replacing airbnb and the hapi plugin.

  Four packages: `base` (JavaScript, plus `/node`), `typescript` (plus `/node`), `react` and `react-typescript`. `base` and `react` keep their names; `typescript` and `react-typescript` are new, so JavaScript-only projects no longer need the TypeScript peers. Every entry works with no options: `export { default } from '@cospired/eslint-config-typescript/node';` is a complete `eslint.config.js`.

  Migrating from 7.x:

  - **Flat config only, ESLint 10, Node `^22.13 || >=24`.** `.eslintrc` is gone; use `eslint.config.js`.
  - **No airbnb, no hapi.** The airbnb rules we kept are documented in the rule files (`src/rules/`); the rest are dropped. hapi `scope-start` cannot coexist with Prettier and `no-arrowception` is dropped. Blank lines before `return` and after declarations come from `@stylistic/padding-line-between-statements`.
  - **Every rule is configured** (on, or off with a reason) for ESLint, typescript-eslint, import-x, @stylistic, eslint-comments, todo-plz, react-hooks, react-refresh and formatjs. Each rule has a comment block with description, reasoning and link. Rules left off that you want can be turned on in your own config.
  - **No `warn` severities:** every rule is `error` or off.
  - **Peers changed:** `@hapi/eslint-plugin`, `eslint-plugin-import`, `eslint-plugin-eslint-comments`, `eslint-plugin-react` and `eslint-plugin-jsx-a11y` are no longer used. New: `eslint-plugin-import-x`, `@eslint-community/eslint-plugin-eslint-comments`, `eslint-plugin-todo-plz`, `@stylistic/eslint-plugin`, `typescript-eslint`, `eslint-import-resolver-typescript`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-formatjs`.
  - **React:** the `/hooks` export is gone (hooks rules are part of the default). jsx-a11y returns when the plugin supports ESLint 10.
  - **Type-aware linting:** source files are linted with type information through typescript-eslint's project service and must belong to a tsconfig. Tests, scripts and TypeScript files at the package root (bundler, test runner or ORM configs) are linted without type information because build tsconfigs usually exclude them; `typedTests: true` type-checks those too (they must then be in a tsconfig).
  - **Rules you will notice:** disable comments need `-- reason`; TODOs need a ticket (`#123`); imports are alphabetized; `no-console` allows only `warn`/`error`; `eqeqeq`, `no-shadow`, `no-nested-ternary`, `prefer-template` and `no-await-in-loop` are errors; TypeScript source files need explicit return types.

### Patch Changes

- Updated dependencies [58726c8]
  - @cospired/eslint-config-base@8.0.0
