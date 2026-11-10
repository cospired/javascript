import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import { globalIgnores } from './ignores.js';
import { createBaseConfig, prettierLast } from './index.js';
import { jsFiles, testGlobs } from './globs.js';
import { importSettings, importXTypescript, importXTypescriptRules } from './rules/import-x.js';
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
} = {}) {
  const parserOptions = tsconfigPath
    ? { project: tsconfigPath, tsconfigRootDir }
    : { projectService: { allowDefaultProject: ['*.config.{ts,mts,cts}'] }, tsconfigRootDir };

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
    { files: jsFiles, ...tseslint.configs.disableTypeChecked },
    ...prettierLast,
  ];
}

/** TypeScript config with defaults, ready to use as `export { default } from '@cospired/eslint-config-base/typescript'`. */
export default createTypescriptConfig();
