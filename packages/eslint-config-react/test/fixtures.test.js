import assert from 'node:assert/strict';
import test from 'node:test';

import { ids, jsConfig } from './helpers.js';

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
