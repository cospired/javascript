import assert from 'node:assert/strict';
import test from 'node:test';

import { loadedRules, missingRules } from '../../../test-utils/lint.js';
import config from '../src/index.js';

test('every configured rule exists', () => {
  assert.deepEqual(missingRules(config), []);
});

test('base contains no react rules', () => {
  const react = [...loadedRules(config)].filter((id) => id.startsWith('react/') || id.startsWith('react-hooks/'));

  assert.deepEqual(react, []);
});
