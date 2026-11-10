import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { ruleSeverity, warnRules } from '../../../test-utils/lint.js';

import { ids, jsConfig, root } from './helpers.js';

const hook = 'function useThing() {\n  return 1;\n}\n\nexport function A({ c }) {\n  if (c) {\n    useThing();\n  }\n\n  return null;\n}\n';

test('hooks rule flags a conditional hook call', async () => {
  assert.ok((await ids(jsConfig, hook, 'src/a.jsx')).includes('react-hooks/rules-of-hooks'));
});

test('browser globals are defined', async () => {
  assert.ok(!(await ids(jsConfig, 'export const w = window.innerWidth;\n', 'src/a.js')).includes('no-undef'));
});

test('react-refresh flags a non-component export next to a component', async () => {
  const code = 'export function A() {\n  return <div />;\n}\n\nexport function helper() {\n  return 1;\n}\n';

  assert.ok((await ids(jsConfig, code, 'src/a.jsx')).includes('react-refresh/only-export-components'));
});

test('no rule resolves to "warn": consumers lint with --max-warnings 0', async () => {
  assert.deepEqual(await warnRules(jsConfig, path.join(root, 'src/a.jsx'), root), []);
});

test('formatjs exempts test files', async () => {
  const severity = (file) => ruleSeverity(jsConfig, 'formatjs/enforce-default-message', path.join(root, file), root);

  assert.equal(await severity('src/a.jsx'), 2);
  for (const file of ['src/a.test.jsx', 'test/helpers.jsx', 'src/__tests__/a.jsx']) assert.notEqual(await severity(file), 2, file);
});
