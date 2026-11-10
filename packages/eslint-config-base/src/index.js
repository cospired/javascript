import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

import comments from './rules/comments.js';
import general from './rules/general.js';
import { createImportsConfig } from './rules/imports.js';
import style from './rules/style.js';

export { globalIgnores } from './ignores.js';
export { createImportsConfig, defaultDevDependencyGlobs } from './rules/imports.js';

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
    js.configs.recommended,
    comments,
    createImportsConfig(importOptions),
    style,
    general,
    // CLI output is expected in scripts.
    { files: ['scripts/**/*.{mjs,js,ts}'], rules: { 'no-console': 'off' } },
    ...prettierLast,
  ];
}

/** JavaScript config: ESLint recommended + cospired rules. */
export default createBaseConfig();
