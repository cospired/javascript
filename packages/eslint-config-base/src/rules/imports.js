import importX from 'eslint-plugin-import-x';

/**
 * Where a devDependency import is allowed. Anchored rather than `**`-prefixed so a path like
 * `src/lib/scripts/x.ts` can't claim one; import-x matches against the lint cwd, which is the
 * package root under Turbo and the repo root under lint-staged, hence both spellings.
 */
export const defaultDevDependencyGlobs = [
  '**/*.{test,spec}.{ts,tsx,js,jsx,mjs,cjs}',
  'test/**',
  'src/test/**',
  'src/__tests__/**',
  'scripts/**',
  '*.config.{ts,js,mjs,cjs}',
].flatMap((glob) => [glob, `{apps,packages}/*/${glob}`]);

/**
 * @param {{ devDependencyGlobs?: string[], pathGroups?: object[] }} [options] `pathGroups` is passed to
 *   `import-x/order`, e.g. to place `#alias/**` imports in the `internal` group.
 */
export function createImportsConfig({ devDependencyGlobs = defaultDevDependencyGlobs, pathGroups } = {}) {
  return {
    plugins: { 'import-x': importX },
    rules: {
      ...importX.flatConfigs.recommended.rules,
      // Plugins default-export objects whose members also ship as named exports.
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/newline-after-import': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: devDependencyGlobs, peerDependencies: true }],
      'import-x/no-import-module-exports': 'error',
      'import-x/no-relative-packages': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          ...(pathGroups && { pathGroups, pathGroupsExcludedImportTypes: ['builtin'] }),
        },
      ],
    },
  };
}
