# @cospired/eslint-config-react

React flat config on top of [`@cospired/eslint-config-base`](../eslint-config-base): react-hooks, react-refresh (Vite), formatjs (i18n) and browser globals. Requires ESLint 10.

## Install

```sh
npm i -D @cospired/eslint-config-react eslint eslint-config-prettier globals \
  eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-formatjs
```

The peer dependencies of `@cospired/eslint-config-base` are required as well (see its README).

## Usage

No options needed. `eslint.config.js`:

```js
export { default } from '@cospired/eslint-config-react/typescript'; // or '@cospired/eslint-config-react' for JavaScript
```

`createReactTypescriptConfig` takes the same options as `createTypescriptConfig` in the base package (`tsconfigPath`, `tsconfigRootDir`, `typedTests`, ...). Add project-specific rules after the config, as described in the base README.

formatjs rules apply to all files except tests. jsx-a11y is not included yet: `eslint-plugin-jsx-a11y` does not support ESLint 10.
