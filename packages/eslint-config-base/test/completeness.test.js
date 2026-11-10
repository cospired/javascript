import assert from 'node:assert/strict';
import test from 'node:test';

import { redundantRules, unconfiguredRules } from '../../../test-utils/lint.js';
import { baseNamespaces, pluginRules, typescriptNamespaces } from '../../../test-utils/plugins.js';
import jsConfig from '../src/index.js';
import { createNodeConfig } from '../src/node.js';
import { createTypescriptConfig } from '../src/typescript.js';

// A rule counts as configured when a recommended preset or one of our files sets it (on or off).
const cases = [
  ['base JS', jsConfig, baseNamespaces],
  ['base TypeScript', createTypescriptConfig(), typescriptNamespaces],
  ['node', createNodeConfig(), typescriptNamespaces],
];

for (const [name, config, namespaces] of cases) {
  test(`${name}: every non-deprecated rule of ${namespaces.map((n) => n || 'eslint').join(', ')} is configured`, () => {
    assert.deepEqual(unconfiguredRules(config, namespaces, pluginRules), []);
  });

  test(`${name}: our overrides only repeat nothing the presets already set`, () => {
    assert.deepEqual(redundantRules(config), []);
  });
}
