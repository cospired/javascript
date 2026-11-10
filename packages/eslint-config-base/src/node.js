import globals from 'globals';

import { jsFiles, untypedGlobs } from './globs.js';

export { globalIgnores } from './ignores.js';
import { createTypescriptConfig } from './typescript.js';


/**
 * Node.js/backend TypeScript config: `createTypescriptConfig` plus node globals.
 * Takes the same options.
 *
 * @param {Parameters<typeof createTypescriptConfig>[0]} [options]
 * @returns {import('eslint').Linter.Config[]}
 */
export function createNodeConfig(options = {}) {
  const { files = ['**/*.{ts,tsx,mts,cts}'], typedTests = false } = options;

  return [
    ...createTypescriptConfig(options),
    { languageOptions: { sourceType: 'module', globals: globals.node } },
    {
      files,
      ignores: typedTests ? jsFiles : [...jsFiles, ...untypedGlobs],
      rules: {
        // String `||` is deliberate empty-string fallthrough (env vars, trimmed input) that `??` would silently drop.
        '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true } }],
      },
    },
  ];
}

/** Node TypeScript config with defaults, ready to use as `export { default } from '@cospired/eslint-config-base/node'`. */
export default createNodeConfig();
