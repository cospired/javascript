import prettier from 'eslint-config-prettier';
import globals from 'globals';

import { anyTestGlobs, withMonorepoTwins } from './globs.js';
import { globalIgnores } from './ignores.js';
import eslintComments from './rules/eslint-comments.js';
import eslintCore from './rules/eslint.js';
import { createImportsConfig } from './rules/import-x.js';
import stylistic from './rules/stylistic.js';
import todoPlz from './rules/todo-plz.js';

export { anyTestGlobs, withMonorepoTwins } from './globs.js';
export { globalIgnores } from './ignores.js';

/**
 * eslint-config-prettier disables `curly`, so it must be re-enabled after it. Every config ends with these.
 * @type {import('eslint').Linter.Config[]}
 */
export const prettierLast = [prettier, { rules: { curly: ['error', 'multi-line'] } }];

/**
 * Language-agnostic rules. Prettier last.
 * @param {Parameters<typeof createImportsConfig>[0]} [importOptions]
 */
export function createBaseConfig(importOptions) {
  return [
    ...eslintCore,
    eslintComments,
    createImportsConfig(importOptions),
    { name: 'cospired/tests', files: anyTestGlobs, rules: { 'import-x/first': 'off' } }, // vi.mock()/jest.mock() hoisting runs before imports
    todoPlz,
    stylistic,
    // Build/CLI scripts run on Node and print to the console.
    { files: withMonorepoTwins(['scripts/**/*.{js,mjs,cjs,ts,mts,cts}']), languageOptions: { globals: globals.node }, rules: { 'no-console': 'off' } },
    ...prettierLast,
  ];
}

/** JavaScript config: ESLint recommended + cospired rules, ready to use as `export { default } from '@cospired/eslint-config-base'`. */
export default [globalIgnores, ...createBaseConfig()];
