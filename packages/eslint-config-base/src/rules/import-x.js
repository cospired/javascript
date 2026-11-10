import importX, { flatConfigs } from 'eslint-plugin-import-x';

import { withMonorepoTwins } from '../globs.js';

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
      /*
        Ensure all imports appear before other statements.
        Imports come before other statements. Tests are exempt, because `vi.mock()`/`jest.mock()`
        calls are hoisted above imports.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/first.md
      */
      'import-x/first': 'error',

      /*
        Enforce a newline after import statements.
        A blank line after the last import visually separates the import block from the code.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md
      */
      'import-x/newline-after-import': 'error',

      /*
        Forbid import of modules using absolute paths.
        Absolute file system paths break on every other machine; import by package name or relative
        path.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-absolute-path.md
      */
      'import-x/no-absolute-path': 'error',

      /*
        Forbid AMD `require` and `define` calls.
        AMD `require`/`define` has no place in an ES module codebase.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-amd.md
      */
      'import-x/no-amd': 'error',

      /*
        Forbid a module from importing a module with a dependency path back to itself.
        Import cycles make load order fragile; external packages are ignored.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md
      */
      'import-x/no-cycle': ['error', { ignoreExternal: true }],

      /*
        Forbid imported names marked with `@deprecated` documentation tag.
        Using symbols marked @deprecated is flagged.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-deprecated.md
      */
      'import-x/no-deprecated': 'error',

      /*
        Forbid repeated import of the same module in multiple places.
        The same module imported twice in one file should be one import statement.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-duplicates.md
      */
      'import-x/no-duplicates': 'error',

      /*
        Forbid `require()` calls with expressions.
        `require(variable)` cannot be analyzed by bundlers or by this plugin.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-dynamic-require.md
      */
      'import-x/no-dynamic-require': 'error',

      /*
        Forbid empty named import blocks.
        `import {} from 'x'` is almost always a leftover after removing a name.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-empty-named-blocks.md
      */
      'import-x/no-empty-named-blocks': 'error',

      /*
        Forbid the use of extraneous packages.
        Only declared dependencies may be imported; devDependencies and peer dependencies are
        allowed where listed (tests, scripts, config files).
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md
      */
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: devDependencyGlobs, peerDependencies: true }],

      /*
        Forbid import statements with CommonJS module.exports.
        A file mixing ES `import` with `module.exports` breaks bundlers and Node's module detection.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-import-module-exports.md
      */
      'import-x/no-import-module-exports': 'error',

      /*
        Forbid the use of mutable exports with `var` or `let`.
        An exported `let` can change behind the importer's back; export constants.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-mutable-exports.md
      */
      'import-x/no-mutable-exports': 'error',

      /*
        Forbid named default exports.
        `import { default as x }` is just `import x`.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-default.md
      */
      'import-x/no-named-default': 'error',

      /*
        Forbid importing packages through relative paths.
        Import a workspace package by its name, not through `../../other-package/src`.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-packages.md
      */
      'import-x/no-relative-packages': 'error',

      /*
        Forbid a module from importing itself.
        A module importing itself is always a mistake.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-self-import.md
      */
      'import-x/no-self-import': 'error',

      /*
        Forbid unnecessary path segments in import and require statements.
        `./a/../b` is just `./b`. `index.js` stays explicit because ESM has no directory imports.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-useless-path-segments.md
      */
      'import-x/no-useless-path-segments': 'error',

      /*
        Forbid webpack loader syntax in imports.
        `import 'style-loader!./a.css'` ties the source to one bundler; configure loaders in the
        build.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-webpack-loader-syntax.md
      */
      'import-x/no-webpack-loader-syntax': 'error',

      /*
        Enforce a convention in module import order.
        Groups (built-in, external, internal, parent, sibling, index) separated by a blank line and
        sorted A-Z inside; `pathGroups` lets projects place `#alias` imports.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md
      */
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          ...(pathGroups && { pathGroups, pathGroupsExcludedImportTypes: ['builtin'] }),
        },
      ],

      /*
        Forbid use of exported name as identifier of default export.
        Off: plugins default-export an object whose members also ship as named exports.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default.md
      */
      'import-x/no-named-as-default': 'off',

      /*
        Forbid use of exported name as property of default export.
        Off: plugins default-export an object whose members also ship as named exports.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default-member.md
      */
      'import-x/no-named-as-default-member': 'off',

      /*
        Forbid authoring of barrel files.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/avoid-barrel-files.md
      */
      'import-x/avoid-barrel-files': 'off',

      /*
        Enforce or ban the use of inline type-only markers for named imports.
        One style for type imports: inline specifiers, one import statement per module.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/consistent-type-specifier-style.md
      */
      'import-x/consistent-type-specifier-style': 'off',

      /*
        Forbid importing barrel files.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/avoid-importing-barrel-files.md
      */
      'import-x/avoid-importing-barrel-files': 'off',

      /*
        Forbid namespace imports.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/avoid-namespace-import.md
      */
      'import-x/avoid-namespace-import': 'off',

      /*
        Forbid re-exporting * from a module.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/avoid-re-export-all.md
      */
      'import-x/avoid-re-export-all': 'off',

      /*
        Enforce a leading comment with the webpackChunkName for dynamic imports.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/dynamic-import-chunkname.md
      */
      'import-x/dynamic-import-chunkname': 'off',

      /*
        Ensure all exports appear after other statements.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/exports-last.md
      */
      'import-x/exports-last': 'off',

      /*
        Ensure consistent use of file extension within the import path.
        Off: file extension rules differ per project (Node ESM vs bundlers).
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
      */
      'import-x/extensions': 'off',

      /*
        Prefer named exports to be grouped together in a single export declaration.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/group-exports.md
      */
      'import-x/group-exports': 'off',

      /*
        Enforce the maximum number of dependencies a module can have.
        Off: needs a project-specific threshold.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/max-dependencies.md
      */
      'import-x/max-dependencies': 'off',

      /*
        Forbid anonymous values as default exports.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-anonymous-default-export.md
      */
      'import-x/no-anonymous-default-export': 'off',

      /*
        Forbid CommonJS `require` calls and `module.exports` or `exports.*`.
        Off: config files and scripts may stay CommonJS; mixing both in one file is caught by no-
        import-module-exports.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-commonjs.md
      */
      'import-x/no-commonjs': 'off',

      /*
        Forbid default exports.
        Off: config files require default exports.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-default-export.md
      */
      'import-x/no-default-export': 'off',

      /*
        Forbid importing the submodules of other modules.
        Off: configured per project.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-internal-modules.md
      */
      'import-x/no-internal-modules': 'off',

      /*
        Forbid named exports.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-export.md
      */
      'import-x/no-named-export': 'off',

      /*
        Forbid namespace (a.k.a. "wildcard" `*`) imports.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-namespace.md
      */
      'import-x/no-namespace': 'off',

      /*
        Forbid Node.js builtin modules.
        Off: this config targets Node.js as well.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-nodejs-modules.md
      */
      'import-x/no-nodejs-modules': 'off',

      /*
        Forbid importing modules from parent directories.
        Off: parent imports are normal in most layouts.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-parent-imports.md
      */
      'import-x/no-relative-parent-imports': 'off',

      /*
        Forbid importing a default export by a different name.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-rename-default.md
      */
      'import-x/no-rename-default': 'off',

      /*
        Enforce which files can be imported in a given folder.
        Off: configured per project; the shared config has no zones to restrict.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-restricted-paths.md
      */
      'import-x/no-restricted-paths': 'off',

      /*
        Forbid unassigned imports.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unassigned-import.md
      */
      'import-x/no-unassigned-import': 'off',

      /*
        Forbid modules without exports, or exports without matching import in another module.
        Off: slow and noisy in monorepos.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unused-modules.md
      */
      'import-x/no-unused-modules': 'off',

      /*
        Prefer a default export if module exports a single name or multiple names.
        Off: named exports are easier to refactor and to find.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/prefer-default-export.md
      */
      'import-x/prefer-default-export': 'off',

      /*
        Enforce using namespace imports for specific modules, like `react`/`react-dom`, etc.
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/prefer-namespace-import.md
      */
      'import-x/prefer-namespace-import': 'off',

      /*
        Forbid potentially ambiguous parse goal (`script` vs. `module`).
        Off: opinion, project-specific, or too costly for a shared config.
        https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/unambiguous.md
      */
      'import-x/unambiguous': 'off',

    },
  };
}
