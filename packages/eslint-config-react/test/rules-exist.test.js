import assert from 'node:assert/strict';
import test from 'node:test';

import { loadedRules, missingRules } from '../../../test-utils/lint.js';

import { jsConfig, tsConfig } from './helpers.js';

test('every configured rule exists (JS and TS)', () => {
  assert.deepEqual(missingRules(jsConfig), []);
  assert.deepEqual(missingRules(tsConfig), []);
});

test('React JS config contains no @typescript-eslint rules', () => {
  assert.deepEqual([...loadedRules(jsConfig)].filter((id) => id.startsWith('@typescript-eslint/')), []);
});

test('React configs enable hooks, refresh and formatjs rules', () => {
  for (const cfg of [jsConfig, tsConfig]) {
    const rules = loadedRules(cfg);

    for (const id of ['react-hooks/rules-of-hooks', 'react-refresh/only-export-components', 'formatjs/enforce-default-message']) assert.ok(rules.has(id), id);
  }
});
