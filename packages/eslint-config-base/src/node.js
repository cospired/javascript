import globals from 'globals';

import { jsFiles } from './rules/typescript.js';
import { createTypescriptConfig } from './typescript.js';

export { globalIgnores } from './ignores.js';

/**
 * Node.js/backend TypeScript config: `createTypescriptConfig` plus node globals.
 * Takes the same options.
 *
 * @param {Parameters<typeof createTypescriptConfig>[0]} [options]
 * @returns {import('eslint').Linter.Config[]}
 */
export function createNodeConfig(options = {}) {
  const { files = ['**/*.{ts,tsx,mts,cts}'] } = options;

  return [
    ...createTypescriptConfig(options),
    { languageOptions: { sourceType: 'module', globals: globals.node } },
    {
      files,
      ignores: jsFiles,
      rules: {
        // String `||` is deliberate empty-string fallthrough (env vars, trimmed input) that `??` would silently drop.
        '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true } }],
      },
    },
  ];
}
