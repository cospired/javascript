import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { ruleSeverity, warnRules } from '../../../test-utils/lint.js';

import { ids, jsConfig, root, tsConfig } from './helpers.js';

test('no rule resolves to "warn" in the React configs', async () => {
  assert.deepEqual(await warnRules(jsConfig, path.join(root, 'src/a.jsx'), root), []);
  assert.deepEqual(await warnRules(tsConfig, path.join(root, 'src/a.tsx'), root), []);
});

test('hooks exhaustive-deps, refresh and formatjs literal-string rules are errors', async () => {
  for (const id of ['react-hooks/exhaustive-deps', 'react-refresh/only-export-components', 'formatjs/no-literal-string-in-jsx']) {
    assert.equal(await ruleSeverity(jsConfig, id, path.join(root, 'src/a.jsx')), 2, id);
  }
});

test('no-unused-expressions is strict in React code (no short-circuit statements)', async () => {
  const code = 'export function f(a, g) {\n  a && g();\n}\n';
  assert.ok((await ids(jsConfig, code, 'src/a.jsx')).includes('no-unused-expressions'));
});

test('formatjs: enforce-description is off, no-camel-case is an error', async () => {
  assert.equal(await ruleSeverity(jsConfig, 'formatjs/enforce-description', path.join(root, 'src/a.jsx')), 0);
  assert.equal(await ruleSeverity(jsConfig, 'formatjs/no-camel-case', path.join(root, 'src/a.jsx')), 2);
});
