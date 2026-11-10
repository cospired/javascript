import assert from 'node:assert/strict';
import test from 'node:test';

import { ids, tsConfig } from './helpers.js';

test('JSX parses in .tsx under the TS config', async () => {
  const found = await ids(tsConfig, 'export const A = (): unknown => <div />;\n', 'src/component.tsx');

  assert.ok(Array.isArray(found));
});
