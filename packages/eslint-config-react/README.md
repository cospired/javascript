# @cospired/eslint-config-react

React flat config (JavaScript) on top of [`@cospired/eslint-config-base`](../eslint-config-base): react-hooks, react-refresh (Vite), formatjs (i18n) and browser globals. Requires ESLint 10. For TypeScript use [`@cospired/eslint-config-react-typescript`](../eslint-config-react-typescript).

## Install

```sh
npm i -D @cospired/eslint-config-react @eslint-community/eslint-plugin-eslint-comments @eslint/js @stylistic/eslint-plugin eslint eslint-config-prettier eslint-plugin-import-x eslint-plugin-todo-plz globals eslint-plugin-formatjs eslint-plugin-react-hooks eslint-plugin-react-refresh
```

## Usage

No options needed. `eslint.config.js`:

```js
export { default } from '@cospired/eslint-config-react';
```

Add project-specific rules after the config, as described in the base README. formatjs rules apply to all files except tests. jsx-a11y is not included yet: `eslint-plugin-jsx-a11y` does not support ESLint 10.

The `/parts` entry exports the React-specific config objects (`reactParts`) for the TypeScript package.
