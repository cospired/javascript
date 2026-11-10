# @cospired/eslint-config-base

Slightly opinionated ESLint flat config for JavaScript and TypeScript. Requires ESLint 10 and Node `^20.19 || ^22.13 || >=24`.

| Entry | For |
|---|---|
| `@cospired/eslint-config-base` | JavaScript (environment neutral) |
| `@cospired/eslint-config-base/node-js` | Node.js JavaScript (Node globals, CommonJS or ESM from your `package.json` `type`) |
| `@cospired/eslint-config-base/typescript` | TypeScript, type-aware |
| `@cospired/eslint-config-base/node` | Node.js TypeScript (Node globals) |

## Install

```sh
npm i -D @cospired/eslint-config-base eslint @eslint/js typescript-eslint typescript globals \
  @eslint-community/eslint-plugin-eslint-comments @stylistic/eslint-plugin eslint-config-prettier \
  eslint-import-resolver-typescript eslint-plugin-import-x eslint-plugin-todo-plz
```

## Usage

No options needed. `eslint.config.js`:

```js
export { default } from '@cospired/eslint-config-base/node'; // or /typescript, /node-js, or the package root
```

The defaults ignore build output (`dist`, `build`, `coverage`, ...), use typescript-eslint's project service to find your tsconfigs, and lint tests, scripts and package-root TypeScript files (`vitest.config.ts`, ...) without type information, since build tsconfigs usually exclude them.

Add your own rules after the config:

```js
import config from '@cospired/eslint-config-base/node';

export default [
  ...config,
  {
    files: ['src/domain/**/*.ts'],
    rules: {
      // project-specific layering rules belong in the project, not in the shared config
      'no-restricted-imports': ['error', { paths: [{ name: 'fastify', message: 'domain/ must not import fastify.' }] }],
    },
  },
];
```

### Options

`createTypescriptConfig` and `createNodeConfig` (from `.../typescript` and `.../node`) take:

| Option | Default | |
|---|---|---|
| `tsconfigPath` | project service | tsconfig(s), string or array; every linted file must belong to one |
| `tsconfigRootDir` | cwd | pass `import.meta.dirname` when one ESLint run loads several workspace configs |
| `typedTests` | `false` | lint tests, scripts and root config files type-aware too (they must then be in a tsconfig) |
| `files` | all TS files | files that get type-aware rules |
| `devDependencyGlobs` | tests, `scripts/`, `*.config.*` | files that may import devDependencies |
| `importOrder.pathGroups` | none | extra `import-x/order` groups |

`createNodeJsConfig({ cwd })` from `.../node-js` takes the directory whose `package.json` decides CommonJS vs ESM.

## What it enforces

Every rule is organised per plugin in `src/rules/` and listed with its decision in [docs/rules.md](../../docs/rules.md). A test fails when a plugin ships a rule that is neither in a recommended preset nor configured here, so new plugin releases cannot add gaps silently.

- `eslint-disable` comments need a reason (`-- why`); TODOs need a ticket (`TODO(#123): ...`).
- Alphabetized imports in groups separated by a blank line; devDependency imports only in test, config and script files.
- Blank line before `return` and after declarations.
- No `warn` severities: rules are `error` or off. Downgrade locally if you need to.
- TypeScript: type-checked recommended + stylistic, explicit return types outside tests, `no-misused-promises`.
