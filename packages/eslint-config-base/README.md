# @cospired/eslint-config-base

Slightly opinionated ESLint flat config for JavaScript. Requires ESLint 10 and Node `^22.13 || >=24`.

| Entry | For |
|---|---|
| `@cospired/eslint-config-base` | JavaScript (environment neutral) |
| `@cospired/eslint-config-base/node` | Node.js JavaScript (Node globals; CommonJS and ESM) |

TypeScript: [`@cospired/eslint-config-typescript`](../eslint-config-typescript). React: [`@cospired/eslint-config-react`](../eslint-config-react) and [`-react-typescript`](../eslint-config-react-typescript).

## Install

```sh
npm i -D @cospired/eslint-config-base @eslint-community/eslint-plugin-eslint-comments @eslint/js @stylistic/eslint-plugin eslint eslint-config-prettier eslint-plugin-import-x eslint-plugin-todo-plz globals
```

## Usage

No options needed. `eslint.config.js`:

```js
export { default } from '@cospired/eslint-config-base/node'; // or the package root for environment-neutral JavaScript
```

The defaults ignore build output (`dist`, `build`, `coverage`, ...).

Add your own rules after the config:

```js
import config from '@cospired/eslint-config-base/node';

export default [
  ...config,
  {
    files: ['src/domain/**/*.js'],
    rules: {
      // project-specific layering rules belong in the project, not in the shared config
      'no-restricted-imports': ['error', { paths: [{ name: 'fastify', message: 'domain/ must not import fastify.' }] }],
    },
  },
];
```

## What it enforces

Every rule is organised per plugin in `src/rules/`, with a comment block (description, reasoning, link) per rule. A test fails when a plugin ships a rule that is neither in a recommended preset nor configured here, so new plugin releases cannot add gaps silently.

- `eslint-disable` comments need a reason (`-- why`); TODOs need a ticket (`TODO(#123): ...`).
- Alphabetized imports in groups separated by a blank line; devDependency imports only in test, config and script files.
- Blank line before `return` and after declarations.
- No `warn` severities: rules are `error` or off. Downgrade locally if you need to.
