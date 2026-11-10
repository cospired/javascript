import assert from 'node:assert/strict';
import test from 'node:test';

import { loadedRules, lintText, missingRules, ruleIds } from './lint.js';

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

test('missingRules reports ids whose plugin or rule does not exist', () => {
  const config = [
    { plugins: { p: { rules: { real: {} } } }, rules: { 'p/real': 'error', 'p/fake': 'error', 'q/x': 'error', 'no-debugger': 'error', 'no-nope': 'error', 'gone/off': 'off', 'gone/zero': [0] } },
  ];

  assert.deepEqual(missingRules(config).sort(), ['no-nope', 'p/fake', 'q/x']);
});
