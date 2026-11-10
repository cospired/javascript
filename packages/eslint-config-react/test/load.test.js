import assert from 'node:assert/strict';
import test from 'node:test';

import { ids, jsConfig } from './helpers.js';

test('JSX parses in .jsx under the JS config', async () => {
  assert.deepEqual(await ids(jsConfig, 'export const A = () => <div />;\n', 'src/a.jsx'), []);
});
