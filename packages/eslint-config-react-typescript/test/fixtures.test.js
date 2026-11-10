import assert from 'node:assert/strict';
import test from 'node:test';

import { createReactTypescriptConfig } from '../src/index.js';

import { ids, tsConfig } from './helpers.js';

const message = 'declare const intl: { formatMessage: (d: { id: string }) => string };\n\nexport const m = intl.formatMessage({ id: "a" });\n';

test('formatjs flags a missing defaultMessage in src, not in tests', async () => {
  assert.ok((await ids(tsConfig, message, 'src/component.tsx')).includes('formatjs/enforce-default-message'));
  assert.ok(!(await ids(tsConfig, message, 'src/a.test.tsx')).includes('formatjs/enforce-default-message'));
});

test('two calls to createReactTypescriptConfig return independent arrays', () => {
  const a = createReactTypescriptConfig({ tsconfigRootDir: '/a' });
  const b = createReactTypescriptConfig({ tsconfigRootDir: '/b' });

  assert.notEqual(a, b);
  a.length = 0;
  assert.ok(b.length > 0);
});
