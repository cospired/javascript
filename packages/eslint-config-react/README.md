# @cospired/eslint-config-react

React flat config on top of [`@cospired/eslint-config-base`](../eslint-config-base): react-hooks, react-refresh (Vite), formatjs (i18n) and browser globals. Requires ESLint 10.

## Install

```sh
npm i -D @cospired/eslint-config-react eslint eslint-config-prettier globals \
  eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-formatjs
```

The peer dependencies of `@cospired/eslint-config-base` are required as well (see its README).

## Usage

```js
// JavaScript
import config, { globalIgnores } from '@cospired/eslint-config-react';

export default [globalIgnores, ...config];
```

```js
// TypeScript: same options as createTypescriptConfig in the base package
import { createReactTypescriptConfig, globalIgnores } from '@cospired/eslint-config-react/typescript';

export default [
  globalIgnores,
  ...createReactTypescriptConfig({ tsconfigRootDir: import.meta.dirname, tsconfigPath: ['tsconfig.app.json'] }),
];
```

formatjs rules apply to all files except `*.test`/`*.spec`. jsx-a11y is not included yet: `eslint-plugin-jsx-a11y` does not support ESLint 10.
