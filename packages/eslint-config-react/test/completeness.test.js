import assert from 'node:assert/strict';
import test from 'node:test';

import { redundantRules, unconfiguredRules } from '../../../test-utils/lint.js';
import { baseNamespaces, pluginRules, reactNamespaces, typescriptNamespaces } from '../../../test-utils/plugins.js';
import jsConfig from '../src/index.js';
import { createReactTypescriptConfig } from '../src/typescript.js';

const cases = [
  ['react JS', jsConfig, [...baseNamespaces, ...reactNamespaces]],
  ['react TypeScript', createReactTypescriptConfig(), [...typescriptNamespaces, ...reactNamespaces]],
];

for (const [name, config, namespaces] of cases) {
  test(`${name}: every non-deprecated rule of ${namespaces.map((n) => n || 'eslint').join(', ')} is configured`, () => {
    assert.deepEqual(unconfiguredRules(config, namespaces, pluginRules), []);
  });

  test(`${name}: our overrides only repeat nothing the presets already set`, () => {
    assert.deepEqual(redundantRules(config), []);
  });
}
