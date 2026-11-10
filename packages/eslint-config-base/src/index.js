import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

import comments from './rules/comments.js';
import general from './rules/general.js';
import { createImportsConfig } from './rules/imports.js';
import style from './rules/style.js';

export { globalIgnores } from './ignores.js';
export { createImportsConfig, defaultDevDependencyGlobs } from './rules/imports.js';

/**
 * Language-agnostic rules. Prettier last.
 * @param {Parameters<typeof createImportsConfig>[0]} [importOptions]
 */
export function createBaseConfig(importOptions) {
  return [js.configs.recommended, comments, createImportsConfig(importOptions), style, general, prettier];
}

/** JavaScript config: ESLint recommended + cospired rules. */
export default createBaseConfig();
