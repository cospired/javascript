import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { warnRules } from '../../../test-utils/lint.js';

import { root, tsConfig } from './helpers.js';

test('no rule resolves to "warn" in the React TypeScript config', async () => {
  assert.deepEqual(await warnRules(tsConfig, path.join(root, 'src/a.tsx'), root), []);
});
