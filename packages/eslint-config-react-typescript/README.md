# @cospired/eslint-config-react-typescript

React flat config for TypeScript: [`@cospired/eslint-config-typescript`](../eslint-config-typescript) plus the React rules of [`@cospired/eslint-config-react`](../eslint-config-react). Requires ESLint 10.

## Install

```sh
npm i -D @cospired/eslint-config-react-typescript @eslint-community/eslint-plugin-eslint-comments @eslint/js @stylistic/eslint-plugin eslint eslint-config-prettier eslint-plugin-import-x eslint-plugin-todo-plz globals eslint-import-resolver-typescript typescript typescript-eslint eslint-plugin-formatjs eslint-plugin-react-hooks eslint-plugin-react-refresh
```

## Usage

No options needed. `eslint.config.js`:

```js
export { default } from '@cospired/eslint-config-react-typescript';
```

`createReactTypescriptConfig` takes the same options as `createTypescriptConfig` in the TypeScript package (`tsconfigPath`, `tsconfigRootDir`, `typedTests`, ...). Add project-specific rules after the config.
