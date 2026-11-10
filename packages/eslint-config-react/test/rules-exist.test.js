import assert from 'node:assert/strict';
import test from 'node:test';

import { loadedRules, missingRules } from '../../../test-utils/lint.js';

import { jsConfig } from './helpers.js';

test('every configured rule exists', () => {
  assert.deepEqual(missingRules(jsConfig), []);
});

test('React JS config contains no @typescript-eslint rules', () => {
  assert.deepEqual([...loadedRules(jsConfig)].filter((id) => id.startsWith('@typescript-eslint/')), []);
});

test('React config enables hooks, refresh and formatjs rules', () => {
  const rules = loadedRules(jsConfig);

  for (const id of ['react-hooks/rules-of-hooks', 'react-refresh/only-export-components', 'formatjs/enforce-default-message']) assert.ok(rules.has(id), id);
});
