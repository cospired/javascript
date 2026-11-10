import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { flatConfigs } from 'eslint-plugin-import-x';

import { tsExtensions } from '../globs.js';

/** TypeScript-only import-x config: the typescript preset and a type-import style that matches `consistent-type-imports`. */
export const importXTypescript = flatConfigs.typescript;
export const importXTypescriptRules = {
  /*
    Enforce or ban the use of inline type-only markers for named imports.
    One style for type imports: inline specifiers, one import statement per module.
    https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/consistent-type-specifier-style.md
  */
  'import-x/consistent-type-specifier-style': ['error', 'prefer-inline'],

};

/** import-x settings so `#alias`, tsconfig `paths` and `.js`-to-`.ts` imports resolve. */
export function importSettings(project) {
  return {
    'import-x/extensions': ['.js', '.jsx', '.mjs', '.cjs', ...tsExtensions],
    'import-x/parsers': { '@typescript-eslint/parser': tsExtensions },
    'import-x/resolver-next': [
      // Several projects is the intended shape (app + test-only tsconfigs); the suggested `references` fix needs `composite`.
      createTypeScriptImportResolver({ alwaysTryTypes: true, noWarnOnMultipleProjects: true, ...(project && { project }) }),
    ],
  };
}
