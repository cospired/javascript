import assert from 'node:assert/strict';
import test from 'node:test';

import { loadedRules, lintText, ruleIds } from './lint.js';

test('lintText reports no-debugger for "debugger;"', async () => {
  const messages = await lintText(
    [{ rules: { 'no-debugger': 'error' } }],
    'debugger;',
    { filePath: 'x.js' },
  );
  assert.deepEqual(ruleIds(messages), ['no-debugger']);
});

test('loadedRules ignores off rules', () => {
  const rules = loadedRules([
    { rules: { 'no-debugger': 'error', 'no-var': 'off', eqeqeq: ['warn'] } },
    { rules: { 'no-console': 0 } },
  ]);
  assert.deepEqual([...rules].sort(), ['eqeqeq', 'no-debugger']);
});
