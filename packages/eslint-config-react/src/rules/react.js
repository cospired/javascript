import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

import { errorOnly } from './errors.js';

const hooks = reactHooks.configs.flat.recommended;

/** React: hooks, refresh (Vite HMR), browser globals, JSX in plain JS. Values are placeholders until the rule review. */
export default [
  // ESLint lints only .js/.mjs/.cjs by default; .jsx must be opted in.
  { files: ['**/*.jsx'] },
  { ...hooks, rules: errorOnly(hooks.rules) },
  {
    plugins: { 'react-refresh': reactRefresh },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
    },
  },
];
