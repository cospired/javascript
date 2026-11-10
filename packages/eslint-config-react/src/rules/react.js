import globals from 'globals';

/** Browser globals, and JSX in plain JS files. */
export default [
  // ESLint lints only .js/.mjs/.cjs by default; .jsx must be opted in.
  { name: 'cospired/react-files', files: ['**/*.jsx'] },
  {
    name: 'cospired/react',
    languageOptions: { globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true } } },
  },
];
