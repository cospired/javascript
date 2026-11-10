import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

import comments from './rules/comments.js';
import general from './rules/general.js';
import { createImportsConfig } from './rules/imports.js';
import style from './rules/style.js';

export { globalIgnores } from './ignores.js';
export { createImportsConfig, defaultDevDependencyGlobs } from './rules/imports.js';

/** JavaScript config: ESLint recommended + cospired rules. Prettier last. */
export default [js.configs.recommended, comments, createImportsConfig(), style, general, prettier];
