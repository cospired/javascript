import assert from 'node:assert/strict';
import test from 'node:test';

import { loadedRules, missingRules } from '../../../test-utils/lint.js';

import { tsConfig } from './helpers.js';

test('every configured rule exists', () => {
  assert.deepEqual(missingRules(tsConfig), []);
});

test('React TypeScript config enables hooks, refresh, formatjs and typescript-eslint rules', () => {
  const rules = loadedRules(tsConfig);

  for (const id of ['react-hooks/rules-of-hooks', 'react-refresh/only-export-components', 'formatjs/enforce-default-message', '@typescript-eslint/no-non-null-assertion']) assert.ok(rules.has(id), id);
});
