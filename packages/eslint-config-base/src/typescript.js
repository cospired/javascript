import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

import { createBaseConfig } from './index.js';
import { importSettings, importXTypescript, sourceOnlyRules, testGlobs, typescriptRules } from './rules/typescript.js';

export { globalIgnores } from './ignores.js';

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
    : { projectService: true, tsconfigRootDir };

  return [
    ...createBaseConfig({ devDependencyGlobs, pathGroups: importOrder.pathGroups }),
    ...defineConfig({
      files,
      extends: [tseslint.configs.recommendedTypeChecked, tseslint.configs.stylisticTypeChecked, importXTypescript],
      languageOptions: { parserOptions },
      settings: importSettings(tsconfigPath),
      rules: typescriptRules,
    }),
    { files, ignores: testGlobs, rules: sourceOnlyRules },
    { files: ['**/*.{js,mjs,cjs}'], ...tseslint.configs.disableTypeChecked },
    prettier,
  ];
}
