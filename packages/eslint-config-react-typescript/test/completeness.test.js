import assert from 'node:assert/strict';
import test from 'node:test';

import { redundantRules, unconfiguredRules } from '../../../test-utils/lint.js';
import { pluginRules, reactNamespaces, typescriptNamespaces } from '../../../test-utils/plugins.js';
import { createReactTypescriptConfig } from '../src/index.js';

const namespaces = [...typescriptNamespaces, ...reactNamespaces];
const config = createReactTypescriptConfig();

test(`every non-deprecated rule of ${namespaces.map((n) => n || 'eslint').join(', ')} is configured`, () => {
  assert.deepEqual(unconfiguredRules(config, namespaces, pluginRules), []);
});

test('our overrides only repeat nothing the presets already set', () => {
  assert.deepEqual(redundantRules(config), []);
});
