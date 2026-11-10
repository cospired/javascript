import { createBaseConfig, globalIgnores, prettierLast } from '@cospired/eslint-config-base';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import { jsFiles, testGlobs, untypedGlobs } from './globs.js';
import { importSettings, importXTypescript, importXTypescriptRules } from './rules/import-x-typescript.js';
import { sourceOnlyRules, typescriptRules } from './rules/typescript-eslint.js';

export { globalIgnores };

/**
 * TypeScript config: base rules + typescript-eslint (type-checked) + cospired TS rules.
 *
 * @param {object} [options]
 * @param {string | string[]} [options.tsconfigPath] tsconfig(s) covering every linted TS file (including test-only projects).
 *   Without it typescript-eslint's project service finds them.
 * @param {string} [options.tsconfigRootDir] Pass `import.meta.dirname` when one ESLint run loads several workspace configs.
 * @param {string[]} [options.files] TS files to apply type-aware rules to.
 * @param {boolean} [options.typedTests] Lint test, config and script files with type information too (they must then belong to a tsconfig).
 * @param {string[]} [options.devDependencyGlobs] Files that may import devDependencies.
 * @param {{ pathGroups?: object[] }} [options.importOrder] Extra `import-x/order` path groups, e.g. `#alias/**` as `internal`.
 * @returns {import('eslint').Linter.Config[]}
 */
export function createTypescriptConfig({
  tsconfigPath,
  tsconfigRootDir,
  files = ['**/*.{ts,tsx,mts,cts}'],
  devDependencyGlobs,
  importOrder = {},
  typedTests = false,
} = {}) {
  const parserOptions = tsconfigPath
    ? { project: tsconfigPath, tsconfigRootDir }
    : { projectService: true, tsconfigRootDir };

  return [
    globalIgnores,
    ...createBaseConfig({ devDependencyGlobs, pathGroups: importOrder.pathGroups }),
    ...defineConfig({
      files,
      extends: [tseslint.configs.recommendedTypeChecked, tseslint.configs.stylisticTypeChecked, importXTypescript],
      languageOptions: { parserOptions },
      settings: importSettings(tsconfigPath),
    }),
    { name: 'cospired/typescript', files, rules: { ...typescriptRules, ...importXTypescriptRules } },
    { name: 'cospired/typescript-eslint', files, ignores: [...testGlobs, ...jsFiles], rules: sourceOnlyRules },
    { name: 'cospired/untyped-js', files: jsFiles, ...tseslint.configs.disableTypeChecked },
    ...(typedTests ? [] : [{ name: 'cospired/untyped', files: untypedGlobs, ...tseslint.configs.disableTypeChecked }]),
    ...prettierLast,
  ];
}

/** TypeScript config with defaults, ready to use as `export { default } from '@cospired/eslint-config-typescript'`. */
export default createTypescriptConfig();
