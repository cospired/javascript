import fs from 'node:fs';
import path from 'node:path';

import globals from 'globals';

import baseConfig, { globalIgnores } from './index.js';

export { globalIgnores };

/** `module` when the nearest package.json at or above `cwd` says `"type": "module"`, otherwise `commonjs`. */
function detectSourceType(cwd) {
  for (let dir = path.resolve(cwd); ; dir = path.dirname(dir)) {
    const file = path.join(dir, 'package.json');

    if (fs.existsSync(file)) {
      try {
        return JSON.parse(fs.readFileSync(file, 'utf8')).type === 'module' ? 'module' : 'commonjs';
      } catch {
        return 'commonjs';
      }
    }
    if (path.dirname(dir) === dir) return 'commonjs';
  }
}

/**
 * Node.js JavaScript config: base JS rules, Node globals, and `.js` files parsed as CommonJS or ESM depending on
 * the package's `"type"`. `.cjs`/`.mjs` keep ESLint's own defaults.
 *
 * @param {{ cwd?: string }} [options] Directory whose package.json decides the module type; defaults to the working directory.
 * @returns {import('eslint').Linter.Config[]}
 */
export function createNodeJsConfig({ cwd = process.cwd() } = {}) {
  const sourceType = detectSourceType(cwd);

  return [
    ...baseConfig,
    {
      name: 'cospired/node-js',
      // CommonJS wrappers (require, module, __dirname) are only defined in CommonJS packages.
      languageOptions: { globals: sourceType === 'module' ? globals.nodeBuiltin : globals.node },
    },
    { name: 'cospired/node-js-source-type', files: ['**/*.js'], languageOptions: { sourceType } },
  ];
}

/** Node JavaScript config with defaults, ready to use as `export { default } from '@cospired/eslint-config-base/node-js'`. */
export default createNodeJsConfig();
