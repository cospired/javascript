import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { flatConfigs as importX } from 'eslint-plugin-import-x';

export const tsExtensions = ['.ts', '.tsx', '.mts', '.cts'];
/** JS files can be matched by a consumer's `files`; they are never type-checked. */
export const jsFiles = ['**/*.{js,jsx,mjs,cjs}'];
export const testGlobs = ['**/*.{test,spec}.{ts,tsx,mts,cts}', 'test/**', 'tests/**', '**/__tests__/**'];

/** Rules on top of typescript-eslint's recommended/stylistic type-checked sets. Severities are placeholders until the rule review. */
export const typescriptRules = {
  '@typescript-eslint/default-param-last': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-generated-empty-object-type': 'error',
  '@typescript-eslint/no-misused-promises': ['error', { checksConditionals: { flagUnions: 'strict' } }],
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
  '@typescript-eslint/no-use-before-define': 'error',
  // Core versions replaced by the typescript-eslint ones above; the compiler's noImplicitReturns covers consistent-return.
  'consistent-return': 'off',
  'default-param-last': 'off',
  'no-shadow': 'off',
  'no-use-before-define': 'off',
  'import-x/consistent-type-specifier-style': ['error', 'prefer-inline'],
};

/** Rules typescript-eslint's recommended sets leave off (or do not set) that cospired wants on for source files. */
export const sourceOnlyRules = {
  '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
};

export const importXTypescript = importX.typescript;

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
