import { prettierLast } from '@cospired/eslint-config-base';
import { reactParts } from '@cospired/eslint-config-react/parts';
import { createTypescriptConfig, globalIgnores } from '@cospired/eslint-config-typescript';

export { globalIgnores };

/**
 * React TypeScript config: TypeScript rules + React rules. Takes the same options as `createTypescriptConfig`.
 *
 * @param {Parameters<typeof createTypescriptConfig>[0]} [options]
 * @returns {import('eslint').Linter.Config[]}
 */
export function createReactTypescriptConfig(options = {}) {
  return [...createTypescriptConfig(options), ...reactParts, ...prettierLast];
}

/** React TypeScript config with defaults, ready to use as `export { default } from '@cospired/eslint-config-react-typescript'`. */
export default createReactTypescriptConfig();
