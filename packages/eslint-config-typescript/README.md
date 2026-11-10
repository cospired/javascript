# @cospired/eslint-config-typescript

Slightly opinionated, type-aware ESLint flat config for TypeScript, on top of [`@cospired/eslint-config-base`](../eslint-config-base). Requires ESLint 10 and Node `^22.13 || >=24`.

| Entry | For |
|---|---|
| `@cospired/eslint-config-typescript` | TypeScript |
| `@cospired/eslint-config-typescript/node` | Node.js TypeScript (Node globals) |

## Install

```sh
npm i -D @cospired/eslint-config-typescript @eslint-community/eslint-plugin-eslint-comments @eslint/js @stylistic/eslint-plugin eslint eslint-config-prettier eslint-plugin-import-x eslint-plugin-todo-plz globals eslint-import-resolver-typescript typescript typescript-eslint
```

## Usage

No options needed. `eslint.config.js`:

```js
export { default } from '@cospired/eslint-config-typescript/node'; // or the package root
```

It uses typescript-eslint's project service to find your tsconfigs, ignores build output, and lints tests, scripts and package-root TypeScript files (bundler, test runner or ORM configs) without type information, since build tsconfigs usually exclude them.

### Options

`createTypescriptConfig` (and `createNodeConfig` from `/node`) take:

| Option | Default | |
|---|---|---|
| `tsconfigPath` | project service | tsconfig(s), string or array; every linted file must belong to one |
| `tsconfigRootDir` | cwd | pass `import.meta.dirname` when one ESLint run loads several workspace configs |
| `typedTests` | `false` | lint tests, scripts and root config files type-aware too (they must then be in a tsconfig) |
| `files` | all TS files | files that get type-aware rules |
| `devDependencyGlobs` | tests, `scripts/`, `*.config.*` | files that may import devDependencies |
| `importOrder.pathGroups` | none | extra `import-x/order` groups |

```js
import { createNodeConfig } from '@cospired/eslint-config-typescript/node';

export default [...createNodeConfig({ tsconfigPath: ['tsconfig.json', 'test/tsconfig.json'], typedTests: true })];
```

## What it adds to the base config

typescript-eslint type-checked recommended + stylistic, explicit return types outside tests, `no-misused-promises`, `consistent-type-imports` (inline), and every typescript-eslint rule configured.
