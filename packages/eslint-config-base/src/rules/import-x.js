import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importX, { flatConfigs } from 'eslint-plugin-import-x';

import { tsExtensions, withMonorepoTwins } from '../globs.js';

/**
 * Where a devDependency import is allowed. Patterns are relative to the directory of the eslint config file;
 * the `{apps,packages}/*` twins cover one root config linting a whole monorepo (e.g. from lint-staged).
 */
export const defaultDevDependencyGlobs = withMonorepoTwins([
  '**/*.{test,spec}.{ts,tsx,js,jsx,mjs,cjs}',
  'test/**',
  'tests/**',
  '**/__tests__/**',
  'scripts/**',
  '*.config.{ts,js,mjs,cjs}',
]);

/**
 * @param {{ devDependencyGlobs?: string[], pathGroups?: object[] }} [options] `pathGroups` is passed to
 *   `import-x/order`, e.g. to place `#alias/**` imports in another group.
 */
export function createImportsConfig({ devDependencyGlobs = defaultDevDependencyGlobs, pathGroups } = {}) {
  return {
    name: 'cospired/import-x',
    plugins: { 'import-x': importX },
    rules: {
      ...flatConfigs.recommended.rules,

      // --- on
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-absolute-path': 'error',
      'import-x/no-amd': 'error',
      'import-x/no-cycle': ['error', { ignoreExternal: true }],
      'import-x/no-deprecated': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-dynamic-require': 'error',
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: devDependencyGlobs, peerDependencies: true }],
      'import-x/no-import-module-exports': 'error',
      'import-x/no-mutable-exports': 'error',
      'import-x/no-named-default': 'error',
      'import-x/no-relative-packages': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-useless-path-segments': 'error',
      'import-x/no-webpack-loader-syntax': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          ...(pathGroups && { pathGroups, pathGroupsExcludedImportTypes: ['builtin'] }),
        },
      ],

      // --- off: plugins default-export objects whose members also ship as named exports
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',

      // --- off: opinion, project-specific, or too costly for a shared config
      'import-x/avoid-barrel-files': 'off',
      'import-x/consistent-type-specifier-style': 'off',
      'import-x/avoid-importing-barrel-files': 'off',
      'import-x/avoid-namespace-import': 'off',
      'import-x/avoid-re-export-all': 'off',
      'import-x/dynamic-import-chunkname': 'off',
      'import-x/exports-last': 'off',
      'import-x/extensions': 'off',
      'import-x/group-exports': 'off',
      'import-x/max-dependencies': 'off',
      'import-x/no-anonymous-default-export': 'off',
      'import-x/no-commonjs': 'off',
      'import-x/no-default-export': 'off',
      'import-x/no-internal-modules': 'off',
      'import-x/no-named-export': 'off',
      'import-x/no-namespace': 'off',
      'import-x/no-nodejs-modules': 'off',
      'import-x/no-relative-parent-imports': 'off',
      'import-x/no-rename-default': 'off',
      'import-x/no-restricted-paths': 'off',
      'import-x/no-unassigned-import': 'off',
      'import-x/no-unused-modules': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/prefer-namespace-import': 'off',
      'import-x/unambiguous': 'off',
    },
  };
}

/** TypeScript-only import-x config: the typescript preset and a type-import style that matches `consistent-type-imports`. */
export const importXTypescript = flatConfigs.typescript;
export const importXTypescriptRules = { 'import-x/consistent-type-specifier-style': ['error', 'prefer-inline'] };

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
