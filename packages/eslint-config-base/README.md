# @cospired/eslint-config-base

Slightly opinionated ESLint flat config for JavaScript and TypeScript. Requires ESLint 10 and Node `^20.19 || ^22.13 || >=24`.

## Install

```sh
npm i -D @cospired/eslint-config-base eslint @eslint/js typescript-eslint typescript globals \
  @eslint-community/eslint-plugin-eslint-comments @stylistic/eslint-plugin eslint-config-prettier \
  eslint-import-resolver-typescript eslint-plugin-import-x eslint-plugin-todo-plz
```

## Usage

JavaScript:

```js
import config, { globalIgnores } from '@cospired/eslint-config-base';

export default [globalIgnores, ...config];
```

TypeScript (type-aware):

```js
import { createTypescriptConfig, globalIgnores } from '@cospired/eslint-config-base/typescript';

export default [
  globalIgnores,
  ...createTypescriptConfig({
    tsconfigRootDir: import.meta.dirname,
    tsconfigPath: ['tsconfig.json', 'test/tsconfig.json'], // optional; every linted file must belong to one
    importOrder: { pathGroups: [{ pattern: '#shared/**', group: 'internal', position: 'before' }] }, // optional
  }),
];
```

Node backends: `createNodeConfig` from `@cospired/eslint-config-base/node` (same options, plus Node globals).

Options: `tsconfigPath` (string or array), `tsconfigRootDir`, `files`, `devDependencyGlobs` (files allowed to import devDependencies; defaults to tests, `scripts/`, `*.config.*`), `importOrder.pathGroups`.

## What it enforces

Highlights; the complete table is in [docs/rules.md](../../docs/rules.md).

- `eslint-disable` comments need a reason (`-- why`); TODOs need a ticket (`TODO(#123): ...`).
- Alphabetized imports in groups separated by a blank line; devDependency imports only in test/config/script files.
- Blank line before `return` and after declarations.
- No `warn` severities: rules are `error` or off. Downgrade locally if you need to.
- TypeScript: type-checked recommended + stylistic, explicit return types in non-test files, `no-misused-promises`.

Project-specific rules (for example `no-restricted-imports` for layer boundaries) belong in your own `eslint.config.js`.
