import assert from 'node:assert/strict';
import test from 'node:test';

import { redundantRules, unconfiguredRules } from '../../../test-utils/lint.js';
import { pluginRules, typescriptNamespaces } from '../../../test-utils/plugins.js';
import { createTypescriptConfig } from '../src/index.js';
import { createNodeConfig } from '../src/node.js';

// A rule counts as configured when a recommended preset or one of our files sets it (on or off).
const cases = [
  ['TypeScript', createTypescriptConfig()],
  ['node', createNodeConfig()],
];

for (const [name, config] of cases) {
  test(`${name}: every non-deprecated rule of ${typescriptNamespaces.map((n) => n || 'eslint').join(', ')} is configured`, () => {
    assert.deepEqual(unconfiguredRules(config, typescriptNamespaces, pluginRules), []);
  });

  test(`${name}: our overrides only repeat nothing the presets already set`, () => {
    assert.deepEqual(redundantRules(config), []);
  });
}
