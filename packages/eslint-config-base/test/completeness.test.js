import assert from 'node:assert/strict';
import test from 'node:test';

import { redundantRules, unconfiguredRules } from '../../../test-utils/lint.js';
import { baseNamespaces, pluginRules } from '../../../test-utils/plugins.js';
import jsConfig from '../src/index.js';
import nodeJs from '../src/node.js';

// A rule counts as configured when a recommended preset or one of our files sets it (on or off).
const cases = [
  ['base JS', jsConfig, baseNamespaces],
  ['node', nodeJs, baseNamespaces],
];

for (const [name, config, namespaces] of cases) {
  test(`${name}: every non-deprecated rule of ${namespaces.map((n) => n || 'eslint').join(', ')} is configured`, () => {
    assert.deepEqual(unconfiguredRules(config, namespaces, pluginRules), []);
  });

  test(`${name}: our overrides only repeat nothing the presets already set`, () => {
    assert.deepEqual(redundantRules(config), []);
  });
}
