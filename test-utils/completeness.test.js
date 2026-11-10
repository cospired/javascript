import assert from 'node:assert/strict';
import test from 'node:test';

import { redundantRules, unconfiguredRules } from './lint.js';

const plugins = { '': { a: {}, b: {}, gone: { meta: { deprecated: true } } }, p: { x: {}, y: {} } };

test('unconfiguredRules lists non-deprecated rules no config item sets (on or off)', () => {
  const config = [{ rules: { a: 'error', 'p/x': 'off' } }];

  assert.deepEqual(unconfiguredRules(config, ['', 'p'], plugins), ['b', 'p/y']);
});

test('unconfiguredRules only checks the requested namespaces', () => {
  assert.deepEqual(unconfiguredRules([], [''], plugins), ['a', 'b']);
});

test('redundantRules flags a named config item that repeats the value already in effect', () => {
  const config = [
    { rules: { a: ['error', { x: 1 }], b: 'warn' } },
    { name: 'cospired/test', rules: { a: [2, { x: 1 }], b: 'error', c: 'off' } },
  ];

  assert.deepEqual(redundantRules(config), ['a']);
});
