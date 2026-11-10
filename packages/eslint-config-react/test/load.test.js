import assert from 'node:assert/strict';
import test from 'node:test';

import { ids, jsConfig, tsConfig } from './helpers.js';

test('JSX parses in .jsx under the JS config', async () => {
  assert.deepEqual(await ids(jsConfig, 'export const A = () => <div />;\n', 'src/a.jsx'), []);
});

test('JSX parses in .tsx under the TS config', async () => {
  const found = await ids(tsConfig, 'export const A = (): unknown => <div />;\n', 'src/a.tsx');

  assert.ok(Array.isArray(found));
});
