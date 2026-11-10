import assert from 'node:assert/strict';
import test from 'node:test';

import { redundantRules, unconfiguredRules } from '../../../test-utils/lint.js';
import { baseNamespaces, pluginRules, reactNamespaces } from '../../../test-utils/plugins.js';
import jsConfig from '../src/index.js';

const namespaces = [...baseNamespaces, ...reactNamespaces];

test(`every non-deprecated rule of ${namespaces.map((n) => n || 'eslint').join(', ')} is configured`, () => {
  assert.deepEqual(unconfiguredRules(jsConfig, namespaces, pluginRules), []);
});

test('our overrides only repeat nothing the presets already set', () => {
  assert.deepEqual(redundantRules(jsConfig), []);
});
