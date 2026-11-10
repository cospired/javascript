import { prettierLast } from '@cospired/eslint-config-base';
import { createTypescriptConfig, globalIgnores } from '@cospired/eslint-config-base/typescript';

import formatjs from './rules/formatjs.js';
import react from './rules/react.js';
import reactHooks from './rules/react-hooks.js';
import reactRefresh from './rules/react-refresh.js';

export { globalIgnores };

/**
 * React TypeScript config: base TypeScript + React rules. Takes the same options as `createTypescriptConfig`.
 *
 * @param {Parameters<typeof createTypescriptConfig>[0]} [options]
 * @returns {import('eslint').Linter.Config[]}
 */
export function createReactTypescriptConfig(options = {}) {
  return [...createTypescriptConfig(options), ...react, ...reactHooks, reactRefresh, formatjs, ...prettierLast];
}
